import type { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";
import { env } from "../lib/env.js";
import { forbidden, unauthorized } from "../utils/httpError.js";

/**
 * Gate for premium content. Access is allowed while either:
 *  - the 1-day free trial is still running, or
 *  - the user has an ACTIVE / TRIALING Stripe subscription whose period
 *    hasn't ended (PAST_DUE gets a small grace via currentPeriodEnd).
 */
export async function requireSubscription(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  if (!req.auth) return next(unauthorized());

  // Free-demo mode: the paywall is disabled, so all content is open.
  if (!env.PAYWALL_ENABLED) return next();

  const user = await prisma.user.findUnique({
    where: { id: req.auth.sub },
    include: { subscription: true },
  });
  if (!user) return next(unauthorized());

  const now = new Date();
  const trialActive = user.trialEndsAt > now;
  const sub = user.subscription;
  const subActive =
    !!sub &&
    (sub.status === "ACTIVE" || sub.status === "TRIALING") &&
    sub.currentPeriodEnd > now;

  if (!trialActive && !subActive) {
    return next(
      forbidden("Your free trial has ended. Subscribe to keep learning.", "SUBSCRIPTION_REQUIRED")
    );
  }
  next();
}
