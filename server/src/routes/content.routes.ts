import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireSubscription } from "../middleware/requireSubscription.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/**
 * Placeholder premium route proving the subscription gate works end-to-end.
 * Phase 2 replaces this with the real lessons API.
 */
export const contentRouter = Router();

contentRouter.get(
  "/ping",
  requireAuth,
  asyncHandler(requireSubscription),
  (_req, res) => {
    res.json({ ok: true, message: "Premium access confirmed. The cosmos awaits." });
  }
);
