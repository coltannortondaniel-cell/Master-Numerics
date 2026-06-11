import type { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { badRequest, notFound } from "../utils/httpError.js";

const MONTHLY_PRICE = 4.99;
const YEARLY_PRICE = 39.99;

/** GET /api/admin/overview — headline metrics. */
export async function overview(_req: Request, res: Response): Promise<void> {
  const dayAgo = new Date(Date.now() - 86_400_000);
  const monthAgo = new Date(Date.now() - 30 * 86_400_000);
  const [totalUsers, dau, mau, monthlySubs, yearlySubs, lessonsCompleted, battles, crates] = await Promise.all([
    prisma.user.count(),
    prisma.xpEvent.findMany({ where: { createdAt: { gte: dayAgo } }, distinct: ["userId"], select: { userId: true } }),
    prisma.xpEvent.findMany({ where: { createdAt: { gte: monthAgo } }, distinct: ["userId"], select: { userId: true } }),
    prisma.subscription.count({ where: { status: { in: ["ACTIVE", "TRIALING"] }, plan: "MONTHLY" } }),
    prisma.subscription.count({ where: { status: { in: ["ACTIVE", "TRIALING"] }, plan: "YEARLY" } }),
    prisma.userProgress.count({ where: { status: { in: ["COMPLETED", "MASTERED"] } } }),
    prisma.battleMatch.count(),
    prisma.crateOpen.count(),
  ]);
  const mrr = monthlySubs * MONTHLY_PRICE + yearlySubs * (YEARLY_PRICE / 12);
  res.json({
    totalUsers,
    dau: dau.length,
    mau: mau.length,
    activeSubscriptions: monthlySubs + yearlySubs,
    mrr: Math.round(mrr * 100) / 100,
    lessonsCompleted,
    battles,
    cratesOpened: crates,
  });
}

/** GET /api/admin/users?q= */
export async function listUsers(req: Request, res: Response): Promise<void> {
  const q = (typeof req.query.q === "string" ? req.query.q : "").trim();
  const users = await prisma.user.findMany({
    where: q ? { OR: [{ username: { contains: q, mode: "insensitive" } }, { email: { contains: q, mode: "insensitive" } }] } : {},
    orderBy: { createdAt: "desc" },
    take: 50,
    include: { subscription: { select: { status: true, plan: true } } },
  });
  res.json({
    users: users.map((u) => ({
      id: u.id,
      username: u.username,
      email: u.email,
      role: u.role,
      banned: u.banned,
      xp: u.xp,
      coins: u.coins,
      subscription: u.subscription?.status ?? null,
      createdAt: u.createdAt,
    })),
  });
}

const updateSchema = z.object({
  xpDelta: z.number().int().optional(),
  coinDelta: z.number().int().optional(),
  banned: z.boolean().optional(),
  role: z.enum(["USER", "ADMIN"]).optional(),
});

/** PATCH /api/admin/users/:id — adjust coins/XP, ban, or set role. */
export async function updateUser(req: Request, res: Response): Promise<void> {
  const { xpDelta, coinDelta, banned, role } = updateSchema.parse(req.body);
  const user = await prisma.user.findUnique({ where: { id: req.params.id } });
  if (!user) throw notFound("User not found");
  const updated = await prisma.user.update({
    where: { id: user.id },
    data: {
      ...(xpDelta ? { xp: { increment: xpDelta } } : {}),
      ...(coinDelta ? { coins: { increment: coinDelta } } : {}),
      ...(banned !== undefined ? { banned } : {}),
      ...(role ? { role } : {}),
    },
    select: { id: true, xp: true, coins: true, banned: true, role: true },
  });
  res.json({ ok: true, user: updated });
}

const grantSchema = z.object({ cosmeticKey: z.string().min(1) });

/** POST /api/admin/users/:id/grant { cosmeticKey } */
export async function grantCosmetic(req: Request, res: Response): Promise<void> {
  const { cosmeticKey } = grantSchema.parse(req.body);
  const cosmetic = await prisma.cosmetic.findUnique({ where: { key: cosmeticKey } });
  if (!cosmetic) throw badRequest("No such cosmetic");
  await prisma.userCosmetic.upsert({
    where: { userId_cosmeticId: { userId: req.params.id, cosmeticId: cosmetic.id } },
    create: { userId: req.params.id, cosmeticId: cosmetic.id },
    update: {},
  });
  res.json({ ok: true });
}

/** GET /api/admin/lessons */
export async function listLessons(_req: Request, res: Response): Promise<void> {
  const lessons = await prisma.lesson.findMany({
    include: { world: { select: { name: true, subject: true, orderIndex: true } } },
    orderBy: [{ world: { orderIndex: "asc" } }, { orderIndex: "asc" }],
  });
  res.json({
    lessons: lessons.map((l) => ({
      slug: l.slug,
      title: l.title,
      world: l.world.name,
      subject: l.world.subject,
      published: l.published,
    })),
  });
}

const pubSchema = z.object({ published: z.boolean() });

/** PATCH /api/admin/lessons/:slug — toggle visibility. */
export async function updateLesson(req: Request, res: Response): Promise<void> {
  const { published } = pubSchema.parse(req.body);
  const lesson = await prisma.lesson.findUnique({ where: { slug: req.params.slug } });
  if (!lesson) throw notFound("Lesson not found");
  await prisma.lesson.update({ where: { id: lesson.id }, data: { published } });
  res.json({ ok: true });
}
