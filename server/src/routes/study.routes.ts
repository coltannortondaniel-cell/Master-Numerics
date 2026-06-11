import { Router } from "express";
import * as study from "../controllers/study.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const studyRouter = Router();

studyRouter.use(requireAuth);

// Notebook
studyRouter.get("/notes", asyncHandler(study.listNotes));
studyRouter.get("/notes/:lessonSlug", asyncHandler(study.getNote));
studyRouter.put("/notes/:lessonSlug", asyncHandler(study.saveNote));

// Flashcards
studyRouter.get("/decks", asyncHandler(study.decks));
studyRouter.post("/decks/from-lesson/:lessonSlug", asyncHandler(study.generateFromLesson));
studyRouter.post("/cards", asyncHandler(study.addCard));
studyRouter.get("/review", asyncHandler(study.dueCards));
studyRouter.post("/cards/:id/review", asyncHandler(study.review));
studyRouter.delete("/cards/:id", asyncHandler(study.deleteCard));

// Formula sheet
studyRouter.get("/formulas", asyncHandler(study.formulas));
studyRouter.post("/formulas/star", asyncHandler(study.starFormula));
