import { Router } from "express";
import * as auth from "../controllers/auth.controller.js";
import { authLimiter } from "../middleware/rateLimit.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const authRouter = Router();

authRouter.post("/register", authLimiter, asyncHandler(auth.register));
authRouter.post("/login", authLimiter, asyncHandler(auth.login));
authRouter.post("/refresh", asyncHandler(auth.refresh));
authRouter.post("/logout", asyncHandler(auth.logout));
authRouter.post("/forgot-password", authLimiter, asyncHandler(auth.forgotPassword));
authRouter.post("/reset-password", authLimiter, asyncHandler(auth.resetPassword));
