import { prisma } from "../lib/prisma.js";
import { awardXp } from "./xp.service.js";
import { addCoins } from "./economy.service.js";
import { notify } from "./notification.service.js";

export type Stats = Record<string, number>;

/** Computes every metric an achievement can key off, for one user. */
export async function computeStats(userId: string): Promise<Stats> {
  const [
    lessonsCompleted,
    lessonsMastered,
    practiceAttempts,
    battlesWon,
    friendsCount,
    cratesOpened,
    cosmeticsOwned,
    mythicOwned,
  ] = await Promise.all([
    prisma.userProgress.count({ where: { userId, status: { in: ["COMPLETED", "MASTERED"] } } }),
    prisma.userProgress.count({ where: { userId, status: "MASTERED" } }),
    prisma.quizAttempt.findMany({ where: { userId, scope: "PRACTICE" }, select: { score: true, total: true } }),
    prisma.battleMatch.count({ where: { winnerId: userId } }),
    prisma.friendship.count({ where: { status: "ACCEPTED", OR: [{ requesterId: userId }, { addresseeId: userId }] } }),
    prisma.crateOpen.count({ where: { userId } }),
    prisma.userCosmetic.count({ where: { userId } }),
    prisma.userCosmetic.count({ where: { userId, cosmetic: { rarity: "MYTHIC" } } }),
  ]);

  return {
    lessonsCompleted,
    lessonsMastered,
    perfectQuizzes: practiceAttempts.filter((a) => a.total > 0 && a.score === a.total).length,
    battlesWon,
    friendsCount,
    cratesOpened,
    cosmeticsOwned,
    mythicOwned,
  };
}

export interface GrantedAchievement {
  key: string;
  name: string;
  xpReward: number;
  coinReward: number;
}

/** Grants any newly-earned achievements; returns them (for toasts). */
export async function checkAchievements(userId: string): Promise<GrantedAchievement[]> {
  const [defs, earned, stats] = await Promise.all([
    prisma.achievement.findMany(),
    prisma.userAchievement.findMany({ where: { userId }, select: { achievementId: true } }),
    computeStats(userId),
  ]);
  const earnedSet = new Set(earned.map((e) => e.achievementId));
  const granted: GrantedAchievement[] = [];

  for (const a of defs) {
    if (earnedSet.has(a.id)) continue;
    if ((stats[a.metric] ?? 0) < a.threshold) continue;
    try {
      await prisma.userAchievement.create({ data: { userId, achievementId: a.id } });
    } catch {
      continue; // raced — already earned
    }
    if (a.xpReward > 0) await awardXp(userId, a.xpReward, `ACHIEVEMENT:${a.key}`);
    if (a.coinReward > 0) await addCoins(userId, a.coinReward);
    await notify(userId, { type: "achievement", title: `Achievement unlocked: ${a.name}`, link: "/achievements" });
    granted.push({ key: a.key, name: a.name, xpReward: a.xpReward, coinReward: a.coinReward });
  }
  return granted;
}

/** Full achievement list for the grid, with earned state + progress. */
export async function listForUser(userId: string) {
  const [defs, earned, stats] = await Promise.all([
    prisma.achievement.findMany({ orderBy: [{ category: "asc" }, { threshold: "asc" }] }),
    prisma.userAchievement.findMany({ where: { userId } }),
    computeStats(userId),
  ]);
  const earnedById = new Map(earned.map((e) => [e.achievementId, e.earnedAt]));

  return defs.map((a) => {
    const earnedAt = earnedById.get(a.id) ?? null;
    const hidden = a.secret && !earnedAt;
    return {
      key: a.key,
      name: hidden ? "???" : a.name,
      description: hidden ? "A secret achievement." : a.description,
      category: a.category,
      xpReward: a.xpReward,
      coinReward: a.coinReward,
      threshold: a.threshold,
      secret: a.secret,
      earned: !!earnedAt,
      earnedAt,
      progress: Math.min(stats[a.metric] ?? 0, a.threshold),
    };
  });
}
