import { Router } from "express";
import * as users from "../controllers/users.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const usersRouter = Router();

usersRouter.get("/me", requireAuth, asyncHandler(users.me));
usersRouter.get("/profile/:username", asyncHandler(users.publicProfile));
