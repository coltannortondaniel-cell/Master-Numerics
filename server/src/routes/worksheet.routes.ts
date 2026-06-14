import { Router } from "express";
import { worksheet } from "../controllers/worksheet.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const worksheetRouter = Router();
worksheetRouter.use(requireAuth);
worksheetRouter.get("/:slug", asyncHandler(worksheet));
