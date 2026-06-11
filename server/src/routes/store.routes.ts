import { Router } from "express";
import * as store from "../controllers/store.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const storeRouter = Router();

storeRouter.use(requireAuth);

storeRouter.get("/", asyncHandler(store.getStore));
storeRouter.get("/inventory", asyncHandler(store.inventory));
storeRouter.post("/crates/open", asyncHandler(store.open));
storeRouter.post("/buy", asyncHandler(store.buy));
