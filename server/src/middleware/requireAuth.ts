import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken, type AccessTokenPayload } from "../services/token.service.js";
import { unauthorized } from "../utils/httpError.js";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      auth?: AccessTokenPayload;
    }
  }
}

/** Verifies the Bearer access token and attaches the payload to req.auth. */
export function requireAuth(req: Request, _res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return next(unauthorized("Missing access token", "TOKEN_MISSING"));
  }
  try {
    req.auth = verifyAccessToken(header.slice(7));
    next();
  } catch {
    next(unauthorized("Access token is invalid or expired", "TOKEN_INVALID"));
  }
}

export function requireAdmin(req: Request, _res: Response, next: NextFunction): void {
  if (req.auth?.role !== "ADMIN") {
    return next(unauthorized("Admin access required", "ADMIN_ONLY"));
  }
  next();
}
