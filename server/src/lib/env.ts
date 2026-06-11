import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(4000),
  // Same-origin in production; defaults to Render's URL when present.
  CLIENT_ORIGIN: z.string().url().default(process.env.RENDER_EXTERNAL_URL ?? "http://localhost:5173"),
  DATABASE_URL: z.string().min(1),
  REDIS_URL: z.string().min(1).default("redis://localhost:6379"),
  JWT_ACCESS_SECRET: z.string().min(32, "JWT_ACCESS_SECRET must be at least 32 chars"),
  JWT_REFRESH_SECRET: z.string().min(32, "JWT_REFRESH_SECRET must be at least 32 chars"),
  ACCESS_TOKEN_TTL: z.string().default("15m"),
  REFRESH_TOKEN_TTL_DAYS: z.coerce.number().default(30),
  // Stripe is optional for a free-demo deploy — these default to inert
  // placeholders so the app boots; billing only runs when PAYWALL_ENABLED.
  STRIPE_SECRET_KEY: z.string().min(1).default("sk_test_unconfigured"),
  STRIPE_WEBHOOK_SECRET: z.string().min(1).default("whsec_unconfigured"),
  STRIPE_PRICE_MONTHLY: z.string().min(1).default("price_unconfigured_monthly"),
  STRIPE_PRICE_YEARLY: z.string().min(1).default("price_unconfigured_yearly"),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  EMAIL_FROM: z.string().default("Master Numerics <no-reply@localhost>"),
  // When false, all premium content is open (free-demo mode).
  PAYWALL_ENABLED: z.string().default("false").transform((v) => v === "true"),
  // Absolute path to the built client (server serves it in production).
  CLIENT_DIST: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  console.error("❌ Invalid environment configuration:");
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
export const isProd = env.NODE_ENV === "production";
