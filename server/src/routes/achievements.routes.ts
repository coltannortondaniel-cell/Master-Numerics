import { Router } from "express";
import * as achievements from "../controllers/achievements.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const achievementsRouter = Router();

achievementsRouter.use(requireAuth);
achievementsRouter.get("/", asyncHandler(achievements.list));
