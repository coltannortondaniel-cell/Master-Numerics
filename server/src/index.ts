import express from "express";
import http from "node:http";
import path from "node:path";
import fs from "node:fs";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./lib/env.js";
import { redis } from "./lib/redis.js";
import { apiLimiter } from "./middleware/rateLimit.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { authRouter } from "./routes/auth.routes.js";
import { billingRouter } from "./routes/billing.routes.js";
import { usersRouter } from "./routes/users.routes.js";
import { contentRouter } from "./routes/content.routes.js";
import { physicsRouter } from "./routes/physics.routes.js";
import { mathRouter } from "./routes/math.routes.js";
import { socialRouter } from "./routes/social.routes.js";
import { storeRouter } from "./routes/store.routes.js";
import { achievementsRouter } from "./routes/achievements.routes.js";
import { profileRouter } from "./routes/profile.routes.js";
import { studyRouter } from "./routes/study.routes.js";
import { worksheetRouter } from "./routes/worksheet.routes.js";
import { dashboardRouter, notificationsRouter } from "./routes/dashboard.routes.js";
import { adminRouter } from "./routes/admin.routes.js";
import { webhook } from "./controllers/billing.controller.js";
import { asyncHandler } from "./utils/asyncHandler.js";
import { attachBattleSocket } from "./socket/index.js";

const app = express();
app.set("trust proxy", 1);

// CSP/COEP relaxed so the SPA, KaTeX fonts, ytimg thumbnails, and YouTube
// embeds load when Express serves the client. Other Helmet protections stay on.
app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));
app.use(
  cors({
    origin: env.CLIENT_ORIGIN,
    credentials: true,
  })
);

// Stripe webhook must read the raw body — mount it before express.json().
app.post("/api/billing/webhook", express.raw({ type: "application/json" }), asyncHandler(webhook));

app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use("/api", apiLimiter);

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "master-numerics", ts: new Date().toISOString() });
});

app.use("/api/auth", authRouter);
app.use("/api/billing", billingRouter);
app.use("/api/users", usersRouter);
app.use("/api/content", contentRouter);
app.use("/api/physics", physicsRouter);
app.use("/api/math", mathRouter);
app.use("/api/social", socialRouter);
app.use("/api/store", storeRouter);
app.use("/api/achievements", achievementsRouter);
app.use("/api/profile", profileRouter);
app.use("/api/study", studyRouter);
app.use("/api/worksheet", worksheetRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/notifications", notificationsRouter);
app.use("/api/admin", adminRouter);

// Serve the built client in a single-service production deploy. The SPA
// fallback returns index.html for any non-API/non-socket route.
const clientDist = env.CLIENT_DIST || path.resolve(process.cwd(), "..", "client", "dist");
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api") || req.path.startsWith("/socket.io")) return next();
    res.sendFile(path.join(clientDist, "index.html"));
  });
  console.log(`✓ Serving client from ${clientDist}`);
}

app.use(notFoundHandler);
app.use(errorHandler);

async function main() {
  try {
    await redis.connect();
    console.log("✓ Redis connected");
  } catch {
    console.warn("⚠ Redis unavailable — continuing without cache (dev only)");
  }
  const server = http.createServer(app);
  attachBattleSocket(server);
  server.listen(env.PORT, () => {
    console.log(`🚀 Master Numerics API + battle socket on http://localhost:${env.PORT}`);
  });
}

main();
