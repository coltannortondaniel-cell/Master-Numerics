import { Router } from "express";
import * as admin from "../controllers/admin.controller.js";
import { requireAuth, requireAdmin } from "../middleware/requireAuth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const adminRouter = Router();

// Admin-only across the board.
adminRouter.use(requireAuth, requireAdmin);

adminRouter.get("/overview", asyncHandler(admin.overview));
adminRouter.get("/users", asyncHandler(admin.listUsers));
adminRouter.patch("/users/:id", asyncHandler(admin.updateUser));
adminRouter.post("/users/:id/grant", asyncHandler(admin.grantCosmetic));
adminRouter.get("/lessons", asyncHandler(admin.listLessons));
adminRouter.patch("/lessons/:slug", asyncHandler(admin.updateLesson));
