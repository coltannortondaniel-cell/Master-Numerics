import type { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { badRequest, notFound, unauthorized } from "../utils/httpError.js";

const AVATAR_SLOTS = ["OUTFIT", "HAT", "AURA", "PET", "BACKGROUND"] as const;

/** Builds the equipped title/badge/avatar-layer view from a user's cosmetics. */
function equippedView(items: { equipped: boolean; cosmetic: { key: string; name: string; type: string } }[]) {
  const eq = items.filter((i) => i.equipped).map((i) => i.cosmetic);
  const bySlot = (type: string) => eq.find((c) => c.type === type) ?? null;
  return {
    title: bySlot("TITLE")?.name ?? null,
    badge: bySlot("BADGE")?.key ?? null,
    avatar: {
      outfit: bySlot("OUTFIT")?.key ?? null,
      hat: bySlot("HAT")?.key ?? null,
      aura: bySlot("AURA")?.key ?? null,
      pet: bySlot("PET")?.key ?? null,
      background: bySlot("BACKGROUND")?.key ?? null,
    },
  };
}

/** GET /api/profile/me — customization workshop state. */
export async function getMe(req: Request, res: Response): Promise<void> {
  if (!req.auth) throw unauthorized();
  const userId = req.auth.sub;
  const [user, items] = await Promise.all([
    prisma.user.findUniqueOrThrow({ where: { id: userId }, select: { avatarColor: true } }),
    prisma.userCosmetic.findMany({ where: { userId }, include: { cosmetic: true }, orderBy: { acquiredAt: "desc" } }),
  ]);
  res.json({
    avatarColor: user.avatarColor,
    ...equippedView(items),
    cosmetics: items.map((i) => ({
      key: i.cosmetic.key,
      name: i.cosmetic.name,
      type: i.cosmetic.type,
      rarity: i.cosmetic.rarity,
      description: i.cosmetic.description,
      equipped: i.equipped,
    })),
  });
}

const keySchema = z.object({ key: z.string().min(1) });

/** POST /api/profile/equip { key } — equip a cosmetic, replacing its slot. */
export async function equip(req: Request, res: Response): Promise<void> {
  if (!req.auth) throw unauthorized();
  const userId = req.auth.sub;
  const { key } = keySchema.parse(req.body);

  const owned = await prisma.userCosmetic.findFirst({
    where: { userId, cosmetic: { key } },
    include: { cosmetic: true },
  });
  if (!owned) throw badRequest("You don't own that cosmetic", "NOT_OWNED");

  await prisma.$transaction([
    prisma.userCosmetic.updateMany({
      where: { userId, cosmetic: { type: owned.cosmetic.type } },
      data: { equipped: false },
    }),
    prisma.userCosmetic.update({ where: { id: owned.id }, data: { equipped: true } }),
  ]);
  res.json({ ok: true });
}

/** POST /api/profile/unequip { key } */
export async function unequip(req: Request, res: Response): Promise<void> {
  if (!req.auth) throw unauthorized();
  const { key } = keySchema.parse(req.body);
  await prisma.userCosmetic.updateMany({
    where: { userId: req.auth.sub, cosmetic: { key } },
    data: { equipped: false },
  });
  res.json({ ok: true });
}

const colorSchema = z.object({ color: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Invalid colour") });

/** PATCH /api/profile/color { color } — base avatar colour. */
export async function setColor(req: Request, res: Response): Promise<void> {
  if (!req.auth) throw unauthorized();
  const { color } = colorSchema.parse(req.body);
  await prisma.user.update({ where: { id: req.auth.sub }, data: { avatarColor: color } });
  res.json({ ok: true, color });
}

/** GET /api/profile/:username — public profile. */
export async function getProfile(req: Request, res: Response): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { username: req.params.username },
    include: { cosmetics: { include: { cosmetic: true } } },
  });
  if (!user) throw notFound("No explorer by that name");

  const [lessonsCompleted, lessonsMastered, battlesWon, achievementsEarned, recentLessons, recentBattles] =
    await Promise.all([
      prisma.userProgress.count({ where: { userId: user.id, status: { in: ["COMPLETED", "MASTERED"] } } }),
      prisma.userProgress.count({ where: { userId: user.id, status: "MASTERED" } }),
      prisma.battleMatch.count({ where: { winnerId: user.id } }),
      prisma.userAchievement.count({ where: { userId: user.id } }),
      prisma.userProgress.findMany({
        where: { userId: user.id, status: { in: ["COMPLETED", "MASTERED"] }, completedAt: { not: null } },
        orderBy: { completedAt: "desc" },
        take: 5,
        include: { lesson: { include: { world: { select: { name: true } } } } },
      }),
      prisma.battleMatch.findMany({
        where: { OR: [{ playerAId: user.id }, { playerBId: user.id }] },
        orderBy: { createdAt: "desc" },
        take: 3,
      }),
    ]);

  const activity = [
    ...recentLessons.map((p) => ({
      type: "lesson",
      text: `Completed “${p.lesson.title}” in ${p.lesson.world.name}`,
      at: p.completedAt,
    })),
    ...recentBattles.map((b) => ({
      type: "battle",
      text: b.winnerId === user.id ? "Won a PvP battle" : b.winnerId === null ? "Drew a PvP battle" : "Fought a PvP battle",
      at: b.createdAt,
    })),
  ]
    .sort((a, b) => (b.at && a.at ? new Date(b.at).getTime() - new Date(a.at).getTime() : 0))
    .slice(0, 6);

  res.json({
    username: user.username,
    xp: user.xp,
    avatarColor: user.avatarColor,
    joinedAt: user.createdAt,
    ...equippedView(user.cosmetics),
    stats: {
      lessonsCompleted,
      lessonsMastered,
      battlesWon,
      achievementsEarned,
      cosmeticsOwned: user.cosmetics.length,
    },
    activity,
  });
}
