import { PrismaClient } from "@prisma/client";
import { env } from "./env.js";

// Pass the URL explicitly (env.ts normalizes a missing DATABASE_URL to an inert
// placeholder) so the client always constructs — a misconfigured DB degrades
// API routes at runtime instead of crashing the whole server at import.
export const prisma = new PrismaClient({
  datasources: { db: { url: env.DATABASE_URL } },
  log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
});
