import { Router } from "express";
import * as social from "../controllers/social.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const socialRouter = Router();

// Social features need an account but not a subscription.
socialRouter.use(requireAuth);

socialRouter.get("/leaderboard", asyncHandler(social.leaderboard));
socialRouter.get("/users/search", asyncHandler(social.searchUsers));
socialRouter.get("/friends", asyncHandler(social.listFriends));
socialRouter.post("/friends/request", asyncHandler(social.requestFriend));
socialRouter.post("/friends/:id/accept", asyncHandler(social.respondFriend));
socialRouter.post("/friends/:id/decline", asyncHandler(social.respondFriend));
socialRouter.delete("/friends/:id", asyncHandler(social.removeFriend));
