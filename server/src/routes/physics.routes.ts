import { Router } from "express";
import { makeContentController } from "../controllers/content.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireSubscription } from "../middleware/requireSubscription.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const physics = makeContentController("PHYSICS");

export const physicsRouter = Router();

// All journey content is premium: trial or active subscription required.
physicsRouter.use(requireAuth, asyncHandler(requireSubscription));

physicsRouter.get("/worlds", asyncHandler(physics.getWorlds));
physicsRouter.get("/worlds/:slug", asyncHandler(physics.getWorld));
physicsRouter.get("/lessons/:slug", asyncHandler(physics.getLesson));
physicsRouter.post("/lessons/:slug/check", asyncHandler(physics.checkAnswers));
physicsRouter.post("/lessons/:slug/quiz", asyncHandler(physics.submitQuiz));
physicsRouter.post("/lessons/:slug/complete", asyncHandler(physics.completeLesson));
physicsRouter.post("/lessons/:slug/time", asyncHandler(physics.logTime));
