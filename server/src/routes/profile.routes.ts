import { Router } from "express";
import * as profile from "../controllers/profile.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const profileRouter = Router();

profileRouter.use(requireAuth);

profileRouter.get("/me", asyncHandler(profile.getMe));
profileRouter.post("/equip", asyncHandler(profile.equip));
profileRouter.post("/unequip", asyncHandler(profile.unequip));
profileRouter.patch("/color", asyncHandler(profile.setColor));
profileRouter.get("/:username", asyncHandler(profile.getProfile));
