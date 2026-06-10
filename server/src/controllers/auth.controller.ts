import crypto from "node:crypto";
import argon2 from "argon2";
import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { env } from "../lib/env.js";
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../utils/validation.js";
import { conflict, unauthorized, badRequest } from "../utils/httpError.js";
import {
  signAccessToken,
  issueRefreshToken,
  rotateRefreshToken,
  revokeRefreshToken,
  revokeAllUserTokens,
  clearRefreshCookie,
  refreshCookieName,
  hashToken,
} from "../services/token.service.js";
import { sendPasswordResetEmail } from "../services/email.service.js";

const TRIAL_HOURS = 24;

const publicUser = (u: {
  id: string;
  email: string;
  username: string;
  gradeLevel: string;
  role: string;
  xp: number;
  trialEndsAt: Date;
  createdAt: Date;
}) => ({
  id: u.id,
  email: u.email,
  username: u.username,
  gradeLevel: u.gradeLevel,
  role: u.role,
  xp: u.xp,
  trialEndsAt: u.trialEndsAt,
  createdAt: u.createdAt,
});

export async function register(req: Request, res: Response): Promise<void> {
  const data = registerSchema.parse(req.body);

  const existing = await prisma.user.findFirst({
    where: { OR: [{ email: data.email.toLowerCase() }, { username: data.username }] },
    select: { email: true, username: true },
  });
  if (existing) {
    throw existing.email === data.email.toLowerCase()
      ? conflict("An account with that email already exists", "EMAIL_TAKEN")
      : conflict("That username is taken", "USERNAME_TAKEN");
  }

  const passwordHash = await argon2.hash(data.password);
  const user = await prisma.user.create({
    data: {
      email: data.email.toLowerCase(),
      username: data.username,
      passwordHash,
      dateOfBirth: data.dateOfBirth,
      gradeLevel: data.gradeLevel,
      trialEndsAt: new Date(Date.now() + TRIAL_HOURS * 60 * 60 * 1000),
    },
  });

  const accessToken = signAccessToken({
    sub: user.id,
    role: user.role,
    username: user.username,
  });
  await issueRefreshToken(res, user.id);

  res.status(201).json({ user: publicUser(user), accessToken });
}

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password, rememberMe } = loginSchema.parse(req.body);

  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
  // Same error either way — don't leak which emails exist.
  if (!user || !(await argon2.verify(user.passwordHash, password))) {
    throw unauthorized("Email or password is incorrect", "BAD_CREDENTIALS");
  }

  const accessToken = signAccessToken({
    sub: user.id,
    role: user.role,
    username: user.username,
  });
  await issueRefreshToken(res, user.id, rememberMe);

  res.json({ user: publicUser(user), accessToken });
}

export async function refresh(req: Request, res: Response): Promise<void> {
  const raw = req.cookies?.[refreshCookieName] as string | undefined;
  if (!raw) throw unauthorized("No session", "NO_REFRESH");

  const rotated = await rotateRefreshToken(res, raw);
  if (!rotated) {
    clearRefreshCookie(res);
    throw unauthorized("Session expired — sign in again", "REFRESH_INVALID");
  }

  const user = await prisma.user.findUnique({
    where: { id: rotated.userId },
    include: { subscription: true },
  });
  if (!user) {
    clearRefreshCookie(res);
    throw unauthorized("Account no longer exists", "USER_GONE");
  }

  const accessToken = signAccessToken({
    sub: user.id,
    role: user.role,
    username: user.username,
  });
  res.json({
    user: publicUser(user),
    accessToken,
    subscription: user.subscription
      ? {
          status: user.subscription.status,
          plan: user.subscription.plan,
          currentPeriodEnd: user.subscription.currentPeriodEnd,
          cancelAtPeriodEnd: user.subscription.cancelAtPeriodEnd,
        }
      : null,
  });
}

export async function logout(req: Request, res: Response): Promise<void> {
  const raw = req.cookies?.[refreshCookieName] as string | undefined;
  if (raw) await revokeRefreshToken(raw);
  clearRefreshCookie(res);
  res.json({ ok: true });
}

export async function forgotPassword(req: Request, res: Response): Promise<void> {
  const { email } = forgotPasswordSchema.parse(req.body);
  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });

  // Always respond identically so the endpoint can't be used to enumerate emails.
  if (user) {
    const raw = crypto.randomBytes(32).toString("base64url");
    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        tokenHash: hashToken(raw),
        expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
      },
    });
    const resetUrl = `${env.CLIENT_ORIGIN}/reset-password?token=${raw}`;
    await sendPasswordResetEmail(user.email, user.username, resetUrl).catch((e) =>
      console.error("[email] failed to send reset:", e)
    );
  }

  res.json({ ok: true, message: "If that email has an account, a reset link is on its way." });
}

export async function resetPassword(req: Request, res: Response): Promise<void> {
  const { token, password } = resetPasswordSchema.parse(req.body);

  const row = await prisma.passwordResetToken.findUnique({
    where: { tokenHash: hashToken(token) },
  });
  if (!row || row.usedAt || row.expiresAt < new Date()) {
    throw badRequest("This reset link is invalid or has expired", "RESET_INVALID");
  }

  const passwordHash = await argon2.hash(password);
  await prisma.$transaction([
    prisma.user.update({ where: { id: row.userId }, data: { passwordHash } }),
    prisma.passwordResetToken.update({
      where: { id: row.id },
      data: { usedAt: new Date() },
    }),
  ]);
  // Changing the password signs out every other device.
  await revokeAllUserTokens(row.userId);

  res.json({ ok: true, message: "Password updated. Sign in with your new password." });
}
