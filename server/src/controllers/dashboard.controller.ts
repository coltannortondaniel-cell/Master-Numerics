import type { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { unauthorized } from "../utils/httpError.js";
import { listChallenges, claimChallenge } from "../services/challenges.service.js";

const iso = (d: Date) => d.toISOString().slice(0, 10);

async function computeStreak(userId: string): Promise<number> {
  const events = await prisma.xpEvent.findMany({ where: { userId }, select: { createdAt: true } });
  const days = new Set(events.map((e) => iso(e.createdAt)));
  let streak = 0;
  const d = new Date();
  if (!days.has(iso(d))) d.setUTCDate(d.getUTCDate() - 1); // today not done yet → count from yesterday
  while (days.has(iso(d))) {
    streak++;
    d.setUTCDate(d.getUTCDate() - 1);
  }
  return streak;
}

async function continueFor(userId: string, subject: "PHYSICS" | "MATH") {
  const started = await prisma.userProgress.findFirst({
    where: { userId, status: "STARTED", lesson: { world: { subject } } },
    orderBy: { updatedAt: "desc" },
    include: { lesson: { include: { world: { select: { slug: true, name: true } } } } },
  });
  if (!started) return null;
  return {
    worldSlug: started.lesson.world.slug,
    worldName: started.lesson.world.name,
    lessonSlug: started.lesson.slug,
    title: started.lesson.title,
  };
}

/** GET /api/dashboard — the home-screen aggregate. */
export async function summary(req: Request, res: Response): Promise<void> {
  if (!req.auth) throw unauthorized();
  const userId = req.auth.sub;

  const [user, progressAgg, mastered, timeAgg, challenges, streak, contPhysics, contMath, friendships] =
    await Promise.all([
      prisma.user.findUniqueOrThrow({ where: { id: userId }, select: { username: true, xp: true, coins: true } }),
      prisma.userProgress.findMany({ where: { userId, status: { in: ["COMPLETED", "MASTERED"] } }, select: { bestScore: true } }),
      prisma.userProgress.count({ where: { userId, status: "MASTERED" } }),
      prisma.userProgress.aggregate({ where: { userId }, _sum: { timeSpentSec: true } }),
      listChallenges(userId),
      computeStreak(userId),
      continueFor(userId, "PHYSICS"),
      continueFor(userId, "MATH"),
      prisma.friendship.findMany({
        where: { status: "ACCEPTED", OR: [{ requesterId: userId }, { addresseeId: userId }] },
        select: { requesterId: true, addresseeId: true },
      }),
    ]);

  const scores = progressAgg.map((p) => p.bestScore).filter((s): s is number => s != null);
  const accuracy = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;

  // Friends' recent activity
  const friendIds = friendships.map((f) => (f.requesterId === userId ? f.addresseeId : f.requesterId));
  let activity: { username: string; text: string; at: Date | null }[] = [];
  if (friendIds.length) {
    const [lessons, battles, users] = await Promise.all([
      prisma.userProgress.findMany({
        where: { userId: { in: friendIds }, status: { in: ["COMPLETED", "MASTERED"] }, completedAt: { not: null } },
        orderBy: { completedAt: "desc" },
        take: 8,
        include: { user: { select: { username: true } }, lesson: { select: { title: true } } },
      }),
      prisma.battleMatch.findMany({
        where: { winnerId: { in: friendIds } },
        orderBy: { createdAt: "desc" },
        take: 4,
        select: { winnerId: true, createdAt: true },
      }),
      prisma.user.findMany({ where: { id: { in: friendIds } }, select: { id: true, username: true } }),
    ]);
    const nameById = new Map(users.map((u) => [u.id, u.username]));
    activity = [
      ...lessons.map((l) => ({ username: l.user.username, text: `completed “${l.lesson.title}”`, at: l.completedAt })),
      ...battles.map((b) => ({ username: nameById.get(b.winnerId!) ?? "A friend", text: "won a PvP battle", at: b.createdAt })),
    ]
      .sort((a, b) => (b.at && a.at ? b.at.getTime() - a.at.getTime() : 0))
      .slice(0, 6);
  }

  const unread = await prisma.notification.count({ where: { userId, read: false } });

  res.json({
    username: user.username,
    xp: user.xp,
    coins: user.coins,
    streak,
    stats: {
      lessonsCompleted: progressAgg.length,
      lessonsMastered: mastered,
      accuracy,
      studyTimeSec: timeAgg._sum.timeSpentSec ?? 0,
    },
    continue: { physics: contPhysics, math: contMath },
    challenges,
    activity,
    unreadNotifications: unread,
  });
}

const claimSchema = z.object({ key: z.string().min(1) });

/** POST /api/dashboard/challenges/claim { key } */
export async function claim(req: Request, res: Response): Promise<void> {
  if (!req.auth) throw unauthorized();
  const { key } = claimSchema.parse(req.body);
  const result = await claimChallenge(req.auth.sub, key);
  res.json({ ok: true, ...result });
}
