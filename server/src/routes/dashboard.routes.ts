import { Router } from "express";
import * as dashboard from "../controllers/dashboard.controller.js";
import * as notifications from "../controllers/notifications.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const dashboardRouter = Router();
dashboardRouter.use(requireAuth);
dashboardRouter.get("/", asyncHandler(dashboard.summary));
dashboardRouter.get("/daily", asyncHandler(dashboard.daily));
dashboardRouter.post("/daily-goal", asyncHandler(dashboard.setDailyGoal));
dashboardRouter.post("/challenges/claim", asyncHandler(dashboard.claim));

export const notificationsRouter = Router();
notificationsRouter.use(requireAuth);
notificationsRouter.get("/", asyncHandler(notifications.list));
notificationsRouter.post("/read", asyncHandler(notifications.markRead));
