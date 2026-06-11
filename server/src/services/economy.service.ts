import type { Rarity } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import { badRequest, notFound } from "../utils/httpError.js";

export interface CrateConfig {
  key: string;
  name: string;
  cost: number;
  blurb: string;
  odds: Partial<Record<Rarity, number>>;
}

/** The four crates (Design §7). Odds are weights; they need not sum to 100. */
export const CRATES: Record<string, CrateConfig> = {
  explorer: {
    key: "explorer",
    name: "Explorer Crate",
    cost: 100,
    blurb: "Mostly commons, with a chance at uncommon.",
    odds: { COMMON: 75, UNCOMMON: 25 },
  },
  scholar: {
    key: "scholar",
    name: "Scholar Crate",
    cost: 250,
    blurb: "Uncommon and up, with a shot at rare.",
    odds: { UNCOMMON: 60, RARE: 35, EPIC: 5 },
  },
  cosmic: {
    key: "cosmic",
    name: "Cosmic Crate",
    cost: 500,
    blurb: "Rare and up — epics and legendaries await.",
    odds: { RARE: 55, EPIC: 30, LEGENDARY: 14, MYTHIC: 1 },
  },
  mythic: {
    key: "mythic",
    name: "Mythic Capsule",
    cost: 1000,
    blurb: "Epic guaranteed. Small chance at Mythic.",
    odds: { EPIC: 60, LEGENDARY: 34, MYTHIC: 6 },
  },
};

const PITY_THRESHOLD = 50; // opens without Legendary+ guarantees one
const DUPLICATE_REFUND: Record<Rarity, number> = {
  COMMON: 15,
  UNCOMMON: 40,
  RARE: 100,
  EPIC: 250,
  LEGENDARY: 600,
  MYTHIC: 1500,
};

function rollRarity(odds: Partial<Record<Rarity, number>>): Rarity {
  const entries = Object.entries(odds) as [Rarity, number][];
  const total = entries.reduce((s, [, w]) => s + w, 0);
  let r = Math.random() * total;
  for (const [rarity, w] of entries) {
    r -= w;
    if (r < 0) return rarity;
  }
  return entries[entries.length - 1][0];
}

export interface CrateResult {
  rarity: Rarity;
  cosmetic: { key: string; name: string; type: string; rarity: Rarity; description: string };
  duplicate: boolean;
  refund: number;
  newBalance: number;
  pity: boolean;
}

/** Opens a crate: deducts coins, rolls a reward server-side, grants or refunds. */
export async function openCrate(userId: string, crateKey: string): Promise<CrateResult> {
  const crate = CRATES[crateKey];
  if (!crate) throw notFound("No such crate");

  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId }, select: { coins: true } });
  if (user.coins < crate.cost) throw badRequest("Not enough NumCoins", "INSUFFICIENT_COINS");

  // Pity: count opens of this crate since the user's last Legendary+ from it.
  const lastBig = await prisma.crateOpen.findFirst({
    where: { userId, crateKey, rarity: { in: ["LEGENDARY", "MYTHIC"] } },
    orderBy: { createdAt: "desc" },
    select: { createdAt: true },
  });
  const sinceBig = await prisma.crateOpen.count({
    where: { userId, crateKey, ...(lastBig ? { createdAt: { gt: lastBig.createdAt } } : {}) },
  });
  const pity = sinceBig >= PITY_THRESHOLD - 1 && (crate.odds.LEGENDARY || crate.odds.MYTHIC) != null;

  const rarity: Rarity = pity ? "LEGENDARY" : rollRarity(crate.odds);

  // Pick a random cosmetic of that rarity (fallback to any if the pool is empty).
  const pool = await prisma.cosmetic.findMany({ where: { rarity } });
  const chosen = pool.length
    ? pool[Math.floor(Math.random() * pool.length)]
    : (await prisma.cosmetic.findFirstOrThrow({ orderBy: { rarity: "desc" } }));

  const owned = await prisma.userCosmetic.findUnique({
    where: { userId_cosmeticId: { userId, cosmeticId: chosen.id } },
  });
  const duplicate = !!owned;
  const refund = duplicate ? DUPLICATE_REFUND[chosen.rarity] : 0;

  const result = await prisma.$transaction(async (tx) => {
    if (!duplicate) {
      await tx.userCosmetic.create({ data: { userId, cosmeticId: chosen.id } });
    }
    await tx.crateOpen.create({ data: { userId, crateKey, rarity: chosen.rarity } });
    const updated = await tx.user.update({
      where: { id: userId },
      data: { coins: { increment: refund - crate.cost } },
      select: { coins: true },
    });
    return updated;
  });

  return {
    rarity: chosen.rarity,
    cosmetic: {
      key: chosen.key,
      name: chosen.name,
      type: chosen.type,
      rarity: chosen.rarity,
      description: chosen.description,
    },
    duplicate,
    refund,
    newBalance: result.coins,
    pity,
  };
}

/** Adds (or removes) coins; never lets a balance go negative. */
export async function addCoins(userId: string, amount: number): Promise<number> {
  const updated = await prisma.user.update({
    where: { id: userId },
    data: { coins: { increment: amount } },
    select: { coins: true },
  });
  if (updated.coins < 0) {
    const fixed = await prisma.user.update({ where: { id: userId }, data: { coins: 0 }, select: { coins: true } });
    return fixed.coins;
  }
  return updated.coins;
}
