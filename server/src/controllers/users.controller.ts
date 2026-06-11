import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { unauthorized, notFound } from "../utils/httpError.js";

export async function me(req: Request, res: Response): Promise<void> {
  if (!req.auth) throw unauthorized();
  const user = await prisma.user.findUnique({
    where: { id: req.auth.sub },
    include: { subscription: true },
  });
  if (!user) throw unauthorized();
  res.json({
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      gradeLevel: user.gradeLevel,
      role: user.role,
      xp: user.xp,
      trialEndsAt: user.trialEndsAt,
      createdAt: user.createdAt,
    },
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

/** Public profile — only non-sensitive fields. Expanded in Phase 7. */
export async function publicProfile(req: Request, res: Response): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { username: req.params.username },
    select: { username: true, gradeLevel: true, createdAt: true },
  });
  if (!user) throw notFound("No explorer by that name");
  res.json({ profile: user });
}
