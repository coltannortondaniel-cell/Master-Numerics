import { Router } from "express";
import * as billing from "../controllers/billing.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const billingRouter = Router();

billingRouter.post("/checkout", requireAuth, asyncHandler(billing.checkout));
billingRouter.post("/portal", requireAuth, asyncHandler(billing.billingPortal));
billingRouter.get("/status", requireAuth, asyncHandler(billing.subscriptionStatus));
