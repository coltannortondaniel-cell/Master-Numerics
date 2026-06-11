import type { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { badRequest, notFound, unauthorized } from "../utils/httpError.js";
import { notify } from "../services/notification.service.js";

const liteSelect = { id: true, username: true, xp: true } as const;

const DAYS: Record<string, number> = { week: 7, month: 30 };

/** GET /api/social/leaderboard?scope=global|friends&period=all|week|month */
export async function leaderboard(req: Request, res: Response): Promise<void> {
  if (!req.auth) throw unauthorized();
  const userId = req.auth.sub;
  const scope = req.query.scope === "friends" ? "friends" : "global";
  const period = typeof req.query.period === "string" ? req.query.period : "all";

  // Friends scope is always all-time XP among you + your accepted friends.
  if (scope === "friends") {
    const fids = await acceptedFriendIds(userId);
    const ids = [...fids, userId];
    const users = await prisma.user.findMany({
      where: { id: { in: ids } },
      orderBy: { xp: "desc" },
      select: liteSelect,
    });
    res.json({
      scope,
      period: "all",
      entries: users.map((u, i) => ({ rank: i + 1, ...u, isMe: u.id === userId })),
      me: { rank: users.findIndex((u) => u.id === userId) + 1, xp: users.find((u) => u.id === userId)?.xp ?? 0 },
    });
    return;
  }

  // Period leaderboards aggregate XP events; all-time uses the denormalised total.
  if (period === "week" || period === "month") {
    const cutoff = new Date(Date.now() - DAYS[period] * 86_400_000);
    const grouped = await prisma.xpEvent.groupBy({
      by: ["userId"],
      _sum: { amount: true },
      where: { createdAt: { gte: cutoff } },
      orderBy: { _sum: { amount: "desc" } },
      take: 100,
    });
    const users = await prisma.user.findMany({
      where: { id: { in: grouped.map((g) => g.userId) } },
      select: { id: true, username: true },
    });
    const nameById = new Map(users.map((u) => [u.id, u.username]));
    const entries = grouped.map((g, i) => ({
      rank: i + 1,
      id: g.userId,
      username: nameById.get(g.userId) ?? "—",
      xp: g._sum.amount ?? 0,
      isMe: g.userId === userId,
    }));
    const mine = await prisma.xpEvent.aggregate({
      _sum: { amount: true },
      where: { userId, createdAt: { gte: cutoff } },
    });
    res.json({ scope, period, entries, me: { rank: entries.find((e) => e.isMe)?.rank ?? null, xp: mine._sum.amount ?? 0 } });
    return;
  }

  const top = await prisma.user.findMany({
    orderBy: { xp: "desc" },
    take: 100,
    select: liteSelect,
  });
  const me = await prisma.user.findUniqueOrThrow({ where: { id: userId }, select: { xp: true } });
  const ahead = await prisma.user.count({ where: { xp: { gt: me.xp } } });
  res.json({
    scope,
    period: "all",
    entries: top.map((u, i) => ({ rank: i + 1, ...u, isMe: u.id === userId })),
    me: { rank: ahead + 1, xp: me.xp },
  });
}

async function acceptedFriendIds(userId: string): Promise<string[]> {
  const fs = await prisma.friendship.findMany({
    where: { status: "ACCEPTED", OR: [{ requesterId: userId }, { addresseeId: userId }] },
    select: { requesterId: true, addresseeId: true },
  });
  return fs.map((f) => (f.requesterId === userId ? f.addresseeId : f.requesterId));
}

/** GET /api/social/users/search?q= */
export async function searchUsers(req: Request, res: Response): Promise<void> {
  if (!req.auth) throw unauthorized();
  const userId = req.auth.sub;
  const q = (typeof req.query.q === "string" ? req.query.q : "").trim();
  if (q.length < 2) {
    res.json({ users: [] });
    return;
  }
  const found = await prisma.user.findMany({
    where: { username: { contains: q, mode: "insensitive" }, NOT: { id: userId } },
    take: 10,
    select: liteSelect,
  });
  const rels = await prisma.friendship.findMany({
    where: {
      OR: [
        { requesterId: userId, addresseeId: { in: found.map((u) => u.id) } },
        { addresseeId: userId, requesterId: { in: found.map((u) => u.id) } },
      ],
    },
  });
  const relOf = (otherId: string) => {
    const r = rels.find((x) => x.requesterId === otherId || x.addresseeId === otherId);
    if (!r) return "none";
    if (r.status === "ACCEPTED") return "friends";
    return r.requesterId === userId ? "pending_out" : "pending_in";
  };
  res.json({ users: found.map((u) => ({ ...u, relation: relOf(u.id) })) });
}

/** GET /api/social/friends — accepted friends + incoming/outgoing requests. */
export async function listFriends(req: Request, res: Response): Promise<void> {
  if (!req.auth) throw unauthorized();
  const userId = req.auth.sub;
  const all = await prisma.friendship.findMany({
    where: { OR: [{ requesterId: userId }, { addresseeId: userId }] },
    include: {
      requester: { select: liteSelect },
      addressee: { select: liteSelect },
    },
    orderBy: { updatedAt: "desc" },
  });
  const friends = all
    .filter((f) => f.status === "ACCEPTED")
    .map((f) => (f.requesterId === userId ? f.addressee : f.requester));
  const incoming = all
    .filter((f) => f.status === "PENDING" && f.addresseeId === userId)
    .map((f) => ({ friendshipId: f.id, user: f.requester }));
  const outgoing = all
    .filter((f) => f.status === "PENDING" && f.requesterId === userId)
    .map((f) => ({ friendshipId: f.id, user: f.addressee }));
  res.json({ friends, incoming, outgoing });
}

const requestSchema = z.object({ username: z.string().min(1) });

/** POST /api/social/friends/request { username } */
export async function requestFriend(req: Request, res: Response): Promise<void> {
  if (!req.auth) throw unauthorized();
  const userId = req.auth.sub;
  const { username } = requestSchema.parse(req.body);

  const target = await prisma.user.findUnique({ where: { username }, select: { id: true } });
  if (!target) throw notFound("No explorer by that name");
  if (target.id === userId) throw badRequest("You can't friend yourself");

  const existing = await prisma.friendship.findFirst({
    where: {
      OR: [
        { requesterId: userId, addresseeId: target.id },
        { requesterId: target.id, addresseeId: userId },
      ],
    },
  });
  if (existing) {
    if (existing.status === "ACCEPTED") throw badRequest("You're already friends", "ALREADY_FRIENDS");
    // They already requested you → accept instead of duplicating.
    if (existing.addresseeId === userId) {
      await prisma.friendship.update({ where: { id: existing.id }, data: { status: "ACCEPTED" } });
      res.json({ ok: true, status: "ACCEPTED" });
      return;
    }
    throw badRequest("Request already sent", "ALREADY_REQUESTED");
  }

  await prisma.friendship.create({ data: { requesterId: userId, addresseeId: target.id } });
  await notify(target.id, {
    type: "friend_request",
    title: `@${req.auth.username} sent you a friend request`,
    link: "/friends",
  });
  res.status(201).json({ ok: true, status: "PENDING" });
}

/** POST /api/social/friends/:id/accept and /decline */
export async function respondFriend(req: Request, res: Response): Promise<void> {
  if (!req.auth) throw unauthorized();
  const userId = req.auth.sub;
  const accept = req.path.endsWith("/accept");
  const f = await prisma.friendship.findUnique({ where: { id: req.params.id } });
  if (!f || f.addresseeId !== userId || f.status !== "PENDING") throw notFound("Request not found");
  if (accept) {
    await prisma.friendship.update({ where: { id: f.id }, data: { status: "ACCEPTED" } });
    res.json({ ok: true, status: "ACCEPTED" });
  } else {
    await prisma.friendship.delete({ where: { id: f.id } });
    res.json({ ok: true, status: "DECLINED" });
  }
}

/** DELETE /api/social/friends/:id — remove a friend (or cancel a request). */
export async function removeFriend(req: Request, res: Response): Promise<void> {
  if (!req.auth) throw unauthorized();
  const userId = req.auth.sub;
  const f = await prisma.friendship.findUnique({ where: { id: req.params.id } });
  if (!f || (f.requesterId !== userId && f.addresseeId !== userId)) throw notFound("Not found");
  await prisma.friendship.delete({ where: { id: f.id } });
  res.json({ ok: true });
}
