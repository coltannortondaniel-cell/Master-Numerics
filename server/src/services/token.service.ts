import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import type { Response } from "express";
import { env, isProd } from "../lib/env.js";
import { prisma } from "../lib/prisma.js";

export interface AccessTokenPayload {
  sub: string; // user id
  role: "USER" | "ADMIN";
  username: string;
}

const REFRESH_COOKIE = "mn_refresh";

export function signAccessToken(payload: AccessTokenPayload): string {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: env.ACCESS_TOKEN_TTL,
  } as jwt.SignOptions);
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as AccessTokenPayload;
}

const hashToken = (raw: string) =>
  crypto.createHash("sha256").update(raw).digest("hex");

/**
 * Issues an opaque refresh token, stores only its SHA-256 hash, and sets it
 * as an httpOnly cookie. Tokens are rotated on every refresh (the old row is
 * revoked), so a stolen token is only usable once.
 */
export async function issueRefreshToken(
  res: Response,
  userId: string,
  rememberMe = true
): Promise<void> {
  const raw = crypto.randomBytes(48).toString("base64url");
  const expiresAt = new Date(
    Date.now() + env.REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000
  );

  await prisma.refreshToken.create({
    data: { userId, tokenHash: hashToken(raw), expiresAt },
  });

  res.cookie(REFRESH_COOKIE, raw, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/api/auth",
    // Session cookie unless "remember me" was checked
    ...(rememberMe ? { expires: expiresAt } : {}),
  });
}

export async function rotateRefreshToken(
  res: Response,
  rawToken: string
): Promise<{ userId: string } | null> {
  const row = await prisma.refreshToken.findUnique({
    where: { tokenHash: hashToken(rawToken) },
  });
  if (!row || row.revokedAt || row.expiresAt < new Date()) return null;

  await prisma.refreshToken.update({
    where: { id: row.id },
    data: { revokedAt: new Date() },
  });
  await issueRefreshToken(res, row.userId);
  return { userId: row.userId };
}

export async function revokeRefreshToken(rawToken: string): Promise<void> {
  await prisma.refreshToken.updateMany({
    where: { tokenHash: hashToken(rawToken), revokedAt: null },
    data: { revokedAt: new Date() },
  });
}

export async function revokeAllUserTokens(userId: string): Promise<void> {
  await prisma.refreshToken.updateMany({
    where: { userId, revokedAt: null },
    data: { revokedAt: new Date() },
  });
}

export function clearRefreshCookie(res: Response): void {
  res.clearCookie(REFRESH_COOKIE, { path: "/api/auth" });
}

export const refreshCookieName = REFRESH_COOKIE;
export { hashToken };
