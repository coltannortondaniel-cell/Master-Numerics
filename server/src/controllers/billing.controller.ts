import type { Request, Response } from "express";
import Stripe from "stripe";
import { checkoutSchema } from "../utils/validation.js";
import {
  stripe,
  createCheckoutSession,
  createBillingPortalSession,
  syncSubscription,
} from "../services/stripe.service.js";
import { env } from "../lib/env.js";
import { unauthorized } from "../utils/httpError.js";
import { prisma } from "../lib/prisma.js";

export async function checkout(req: Request, res: Response): Promise<void> {
  if (!req.auth) throw unauthorized();
  const { plan } = checkoutSchema.parse(req.body);
  const url = await createCheckoutSession(req.auth.sub, plan);
  res.json({ url });
}

export async function billingPortal(req: Request, res: Response): Promise<void> {
  if (!req.auth) throw unauthorized();
  const url = await createBillingPortalSession(req.auth.sub);
  res.json({ url });
}

export async function subscriptionStatus(req: Request, res: Response): Promise<void> {
  if (!req.auth) throw unauthorized();
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: req.auth.sub },
    include: { subscription: true },
  });
  res.json({
    trialEndsAt: user.trialEndsAt,
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

/**
 * Stripe webhook. Mounted BEFORE express.json() with a raw body parser so the
 * signature can be verified against the exact bytes Stripe sent.
 */
export async function webhook(req: Request, res: Response): Promise<void> {
  const signature = req.headers["stripe-signature"];
  if (!signature) {
    res.status(400).send("Missing stripe-signature header");
    return;
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body as Buffer,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("[stripe] webhook signature verification failed:", err);
    res.status(400).send("Invalid signature");
    return;
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      if (session.mode === "subscription" && session.subscription) {
        const sub = await stripe.subscriptions.retrieve(
          session.subscription as string
        );
        await syncSubscription(sub);
      }
      break;
    }
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      await syncSubscription(event.data.object);
      break;
    }
    case "invoice.payment_failed": {
      const invoice = event.data.object;
      if (invoice.subscription) {
        const sub = await stripe.subscriptions.retrieve(
          invoice.subscription as string
        );
        await syncSubscription(sub); // becomes PAST_DUE
      }
      break;
    }
    default:
      break; // Unhandled event types are fine — acknowledge them.
  }

  res.json({ received: true });
}
