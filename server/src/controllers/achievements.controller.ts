import type { Request, Response } from "express";
import { unauthorized } from "../utils/httpError.js";
import { listForUser } from "../services/achievements.service.js";

/** GET /api/achievements — the full grid with earned state + progress. */
export async function list(req: Request, res: Response): Promise<void> {
  if (!req.auth) throw unauthorized();
  const achievements = await listForUser(req.auth.sub);
  res.json({
    achievements,
    earned: achievements.filter((a) => a.earned).length,
    total: achievements.length,
  });
}
