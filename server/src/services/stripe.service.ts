import Stripe from "stripe";
import { env } from "../lib/env.js";
import { prisma } from "../lib/prisma.js";
import type { SubscriptionPlan, SubscriptionStatus } from "@prisma/client";

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

const PRICE_BY_PLAN: Record<SubscriptionPlan, string> = {
  MONTHLY: env.STRIPE_PRICE_MONTHLY, // $4.99 / month
  YEARLY: env.STRIPE_PRICE_YEARLY, // $39.99 / year (save 33%)
};

const PLAN_BY_PRICE: Record<string, SubscriptionPlan> = {
  [env.STRIPE_PRICE_MONTHLY]: "MONTHLY",
  [env.STRIPE_PRICE_YEARLY]: "YEARLY",
};

export async function getOrCreateCustomer(userId: string): Promise<string> {
  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });
  if (user.stripeCustomerId) return user.stripeCustomerId;

  const customer = await stripe.customers.create({
    email: user.email,
    metadata: { userId: user.id, username: user.username },
  });
  await prisma.user.update({
    where: { id: userId },
    data: { stripeCustomerId: customer.id },
  });
  return customer.id;
}

export async function createCheckoutSession(
  userId: string,
  plan: SubscriptionPlan
): Promise<string> {
  const customerId = await getOrCreateCustomer(userId);
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    line_items: [{ price: PRICE_BY_PLAN[plan], quantity: 1 }],
    success_url: `${env.CLIENT_ORIGIN}/dashboard?checkout=success`,
    cancel_url: `${env.CLIENT_ORIGIN}/subscribe?checkout=cancelled`,
    metadata: { userId },
    subscription_data: { metadata: { userId } },
    allow_promotion_codes: true,
  });
  if (!session.url) throw new Error("Stripe did not return a checkout URL");
  return session.url;
}

export async function createBillingPortalSession(userId: string): Promise<string> {
  const customerId = await getOrCreateCustomer(userId);
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${env.CLIENT_ORIGIN}/dashboard`,
  });
  return session.url;
}

function mapStatus(s: Stripe.Subscription.Status): SubscriptionStatus {
  switch (s) {
    case "active":
      return "ACTIVE";
    case "trialing":
      return "TRIALING";
    case "past_due":
    case "unpaid":
      return "PAST_DUE";
    case "canceled":
      return "CANCELED";
    default:
      return "INCOMPLETE";
  }
}

/** Upserts our local subscription row from a Stripe subscription object. */
export async function syncSubscription(sub: Stripe.Subscription): Promise<void> {
  const userId = sub.metadata.userId;
  if (!userId) {
    console.warn(`[stripe] subscription ${sub.id} has no userId metadata; skipping`);
    return;
  }
  const priceId = sub.items.data[0]?.price.id ?? "";
  const plan = PLAN_BY_PRICE[priceId] ?? "MONTHLY";

  await prisma.subscription.upsert({
    where: { stripeSubscriptionId: sub.id },
    create: {
      userId,
      stripeSubscriptionId: sub.id,
      status: mapStatus(sub.status),
      plan,
      currentPeriodEnd: new Date(sub.current_period_end * 1000),
      cancelAtPeriodEnd: sub.cancel_at_period_end,
    },
    update: {
      status: mapStatus(sub.status),
      plan,
      currentPeriodEnd: new Date(sub.current_period_end * 1000),
      cancelAtPeriodEnd: sub.cancel_at_period_end,
    },
  });
}
