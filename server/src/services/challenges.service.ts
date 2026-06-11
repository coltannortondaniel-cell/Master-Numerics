import { prisma } from "../lib/prisma.js";
import { awardXp } from "./xp.service.js";
import { addCoins } from "./economy.service.js";
import { notify } from "./notification.service.js";
import { badRequest } from "../utils/httpError.js";

interface ChallengeDef {
  key: string;
  label: string;
  metric: "lessonsToday" | "perfectToday" | "battlesToday" | "topicsWeek";
  goal: number;
  coin: number;
  xp: number;
  period: "daily" | "weekly";
}

// Fixed challenge set (Design §7). Progress resets via date-scoped counting.
const DAILY: ChallengeDef[] = [
  { key: "d-lessons2", label: "Complete 2 lessons", metric: "lessonsToday", goal: 2, coin: 40, xp: 30, period: "daily" },
  { key: "d-perfect", label: "Score 100% on a practice set", metric: "perfectToday", goal: 1, coin: 40, xp: 30, period: "daily" },
  { key: "d-battle", label: "Win a PvP battle", metric: "battlesToday", goal: 1, coin: 50, xp: 40, period: "daily" },
];
const WEEKLY: ChallengeDef = {
  key: "w-topics5", label: "Study 5 different topics this week", metric: "topicsWeek", goal: 5, coin: 200, xp: 150, period: "weekly",
};

const dayKey = (d = new Date()) => d.toISOString().slice(0, 10);
function weekKey(d = new Date()): string {
  const t = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const day = (t.getUTCDay() + 6) % 7; // Mon=0
  t.setUTCDate(t.getUTCDate() - day + 3); // nearest Thursday
  const week1 = new Date(Date.UTC(t.getUTCFullYear(), 0, 4));
  const wk = 1 + Math.round(((t.getTime() - week1.getTime()) / 86_400_000 - 3 + ((week1.getUTCDay() + 6) % 7)) / 7);
  return `${t.getUTCFullYear()}-W${String(wk).padStart(2, "0")}`;
}
const periodKey = (def: ChallengeDef) => (def.period === "weekly" ? weekKey() : dayKey());

async function metrics(userId: string) {
  const dayStart = new Date(`${dayKey()}T00:00:00.000Z`);
  const weekStart = new Date(Date.now() - 7 * 86_400_000);
  const [lessonsToday, battlesToday, perfectRows, weekLessons] = await Promise.all([
    prisma.userProgress.count({ where: { userId, completedAt: { gte: dayStart } } }),
    prisma.battleMatch.count({ where: { winnerId: userId, createdAt: { gte: dayStart } } }),
    prisma.quizAttempt.findMany({ where: { userId, scope: "PRACTICE", createdAt: { gte: dayStart } }, select: { score: true, total: true } }),
    prisma.userProgress.findMany({
      where: { userId, completedAt: { gte: weekStart } },
      select: { lesson: { select: { worldId: true } } },
    }),
  ]);
  return {
    lessonsToday,
    battlesToday,
    perfectToday: perfectRows.filter((r) => r.total > 0 && r.score === r.total).length,
    topicsWeek: new Set(weekLessons.map((l) => l.lesson.worldId)).size,
  };
}

export async function listChallenges(userId: string) {
  const m = await metrics(userId);
  const claims = await prisma.challengeClaim.findMany({
    where: { userId, OR: [{ day: dayKey() }, { day: weekKey() }] },
    select: { challengeKey: true, day: true },
  });
  const claimedSet = new Set(claims.map((c) => `${c.day}:${c.challengeKey}`));

  const build = (def: ChallengeDef) => {
    const progress = Math.min(m[def.metric], def.goal);
    const claimed = claimedSet.has(`${periodKey(def)}:${def.key}`);
    return {
      key: def.key,
      label: def.label,
      goal: def.goal,
      progress,
      coin: def.coin,
      xp: def.xp,
      period: def.period,
      claimed,
      canClaim: progress >= def.goal && !claimed,
    };
  };

  return { daily: DAILY.map(build), weekly: build(WEEKLY) };
}

export async function claimChallenge(userId: string, key: string) {
  const def = [...DAILY, WEEKLY].find((c) => c.key === key);
  if (!def) throw badRequest("Unknown challenge");
  const m = await metrics(userId);
  if (m[def.metric] < def.goal) throw badRequest("Challenge not complete yet", "NOT_COMPLETE");

  const day = periodKey(def);
  try {
    await prisma.challengeClaim.create({ data: { userId, day, challengeKey: key } });
  } catch {
    throw badRequest("Already claimed", "ALREADY_CLAIMED");
  }
  const coins = await addCoins(userId, def.coin);
  await awardXp(userId, def.xp, `CHALLENGE:${day}:${key}`);
  await notify(userId, { type: "system", title: "Challenge complete!", body: `${def.label} · +${def.coin} coins`, link: "/dashboard" });
  return { coins, xp: def.xp, coin: def.coin };
}
