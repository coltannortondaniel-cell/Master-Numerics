import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { HttpError } from "../utils/httpError.js";
import { isProd } from "../lib/env.js";

export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({ error: "Route not found" });
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof ZodError) {
    res.status(400).json({
      error: "Validation failed",
      code: "VALIDATION",
      fields: err.flatten().fieldErrors,
    });
    return;
  }
  if (err instanceof HttpError) {
    res.status(err.status).json({ error: err.message, code: err.code });
    return;
  }
  console.error("[unhandled]", err);
  res.status(500).json({
    error: isProd ? "Something went wrong" : String(err),
  });
}
