import { Router } from "express";
import { makeContentController } from "../controllers/content.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireSubscription } from "../middleware/requireSubscription.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const math = makeContentController("MATH");

export const mathRouter = Router();

// The Math City shares the premium gate with the Physics Journey.
mathRouter.use(requireAuth, asyncHandler(requireSubscription));

mathRouter.get("/worlds", asyncHandler(math.getWorlds));
mathRouter.get("/worlds/:slug", asyncHandler(math.getWorld));
mathRouter.get("/lessons/:slug", asyncHandler(math.getLesson));
mathRouter.post("/lessons/:slug/quiz", asyncHandler(math.submitQuiz));
mathRouter.post("/lessons/:slug/complete", asyncHandler(math.completeLesson));
mathRouter.post("/lessons/:slug/time", asyncHandler(math.logTime));
