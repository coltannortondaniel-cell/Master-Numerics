import type { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { badRequest, notFound, unauthorized } from "../utils/httpError.js";
import { CRATES, openCrate } from "../services/economy.service.js";
import { checkAchievements } from "../services/achievements.service.js";

/** GET /api/store — coin balance, crate definitions, and featured cosmetics. */
export async function getStore(req: Request, res: Response): Promise<void> {
  if (!req.auth) throw unauthorized();
  const userId = req.auth.sub;
  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId }, select: { coins: true } });

  const featured = await prisma.cosmetic.findMany({ where: { coinPrice: { gt: 0 } }, orderBy: { rarity: "asc" } });
  const owned = await prisma.userCosmetic.findMany({
    where: { userId, cosmeticId: { in: featured.map((c) => c.id) } },
    select: { cosmeticId: true },
  });
  const ownedSet = new Set(owned.map((o) => o.cosmeticId));

  res.json({
    coins: user.coins,
    crates: Object.values(CRATES).map((c) => ({ key: c.key, name: c.name, cost: c.cost, blurb: c.blurb, odds: c.odds })),
    featured: featured.map((c) => ({
      key: c.key,
      name: c.name,
      type: c.type,
      rarity: c.rarity,
      description: c.description,
      coinPrice: c.coinPrice,
      owned: ownedSet.has(c.id),
    })),
  });
}

const openSchema = z.object({ crateKey: z.string().min(1) });

/** POST /api/store/crates/open { crateKey } — server-authoritative crate roll. */
export async function open(req: Request, res: Response): Promise<void> {
  if (!req.auth) throw unauthorized();
  const { crateKey } = openSchema.parse(req.body);
  const result = await openCrate(req.auth.sub, crateKey);
  const achievements = await checkAchievements(req.auth.sub);
  res.json({ ...result, achievements });
}

/** GET /api/store/inventory — the user's owned cosmetics. */
export async function inventory(req: Request, res: Response): Promise<void> {
  if (!req.auth) throw unauthorized();
  const items = await prisma.userCosmetic.findMany({
    where: { userId: req.auth.sub },
    include: { cosmetic: true },
    orderBy: { acquiredAt: "desc" },
  });
  res.json({
    cosmetics: items.map((i) => ({
      key: i.cosmetic.key,
      name: i.cosmetic.name,
      type: i.cosmetic.type,
      rarity: i.cosmetic.rarity,
      description: i.cosmetic.description,
      equipped: i.equipped,
      acquiredAt: i.acquiredAt,
    })),
  });
}

const buySchema = z.object({ key: z.string().min(1) });

/** POST /api/store/buy { key } — direct cosmetic purchase with coins. */
export async function buy(req: Request, res: Response): Promise<void> {
  if (!req.auth) throw unauthorized();
  const userId = req.auth.sub;
  const { key } = buySchema.parse(req.body);

  const cosmetic = await prisma.cosmetic.findUnique({ where: { key } });
  if (!cosmetic || cosmetic.coinPrice <= 0) throw notFound("That item isn't for sale");

  const existing = await prisma.userCosmetic.findUnique({
    where: { userId_cosmeticId: { userId, cosmeticId: cosmetic.id } },
  });
  if (existing) throw badRequest("You already own that", "ALREADY_OWNED");

  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId }, select: { coins: true } });
  if (user.coins < cosmetic.coinPrice) throw badRequest("Not enough NumCoins", "INSUFFICIENT_COINS");

  const updated = await prisma.$transaction(async (tx) => {
    await tx.userCosmetic.create({ data: { userId, cosmeticId: cosmetic.id } });
    return tx.user.update({
      where: { id: userId },
      data: { coins: { decrement: cosmetic.coinPrice } },
      select: { coins: true },
    });
  });
  const achievements = await checkAchievements(userId);

  res.json({
    ok: true,
    newBalance: updated.coins,
    cosmetic: { key: cosmetic.key, name: cosmetic.name, type: cosmetic.type, rarity: cosmetic.rarity },
    achievements,
  });
}
