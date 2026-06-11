import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { unauthorized } from "../utils/httpError.js";

/** GET /api/notifications — recent notifications + unread count. */
export async function list(req: Request, res: Response): Promise<void> {
  if (!req.auth) throw unauthorized();
  const userId = req.auth.sub;
  const [items, unread] = await Promise.all([
    prisma.notification.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take: 30 }),
    prisma.notification.count({ where: { userId, read: false } }),
  ]);
  res.json({
    unread,
    notifications: items.map((n) => ({
      id: n.id,
      type: n.type,
      title: n.title,
      body: n.body,
      link: n.link,
      read: n.read,
      createdAt: n.createdAt,
    })),
  });
}

/** POST /api/notifications/read — mark all as read (or one via ?id). */
export async function markRead(req: Request, res: Response): Promise<void> {
  if (!req.auth) throw unauthorized();
  const id = typeof req.query.id === "string" ? req.query.id : undefined;
  await prisma.notification.updateMany({
    where: { userId: req.auth.sub, read: false, ...(id ? { id } : {}) },
    data: { read: true },
  });
  res.json({ ok: true });
}
