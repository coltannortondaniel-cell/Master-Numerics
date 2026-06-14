import "dotenv/config";
import { z } from "zod";

// A syntactically valid Postgres URL used only when DATABASE_URL is missing or
// empty (e.g. an expired free database). It lets the server boot and serve the
// client; DB-backed routes error until a real URL is set, instead of the whole
// service crash-looping and Render keeping the previous (old) build live.
const DB_PLACEHOLDER = "postgresql://unconfigured:unconfigured@localhost:5432/unconfigured";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(4000),
  // Same-origin in production; defaults to Render's URL when present.
  CLIENT_ORIGIN: z.string().url().default(process.env.RENDER_EXTERNAL_URL ?? "http://localhost:5173"),
  // Tolerant on purpose: never fail the whole boot just because the DB is
  // unconfigured. Falls back to an inert placeholder (see above).
  DATABASE_URL: z
    .string()
    .optional()
    .transform((v) => (v && v.trim().length > 0 ? v : DB_PLACEHOLDER)),
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
// Keep process.env in sync so Prisma's env("DATABASE_URL") resolves to the same
// value (placeholder included) and PrismaClient can construct without throwing.
process.env.DATABASE_URL = env.DATABASE_URL;
if (env.DATABASE_URL === DB_PLACEHOLDER) {
  console.warn("⚠ DATABASE_URL is not configured — starting with an inert placeholder. Database features will not work until it is set.");
}
export const isProd = env.NODE_ENV === "production";
