/** XP rank tiers (Design §5a). Shared by the header, dashboard, and leaderboard. */
export type RankId = "stone" | "bronze" | "silver" | "gold" | "diamond" | "master" | "cosmic";

export interface Rank {
  name: string;
  id: RankId;
  min: number;
  next: number | null;
  color: string;
}

const TIERS: Omit<Rank, "next">[] = [
  { name: "Stone", id: "stone", min: 0, color: "#9CA3AF" },
  { name: "Bronze", id: "bronze", min: 500, color: "#CD7F32" },
  { name: "Silver", id: "silver", min: 2000, color: "#C0C7D0" },
  { name: "Gold", id: "gold", min: 6000, color: "#E8B33A" },
  { name: "Diamond", id: "diamond", min: 15000, color: "#5AD1E6" },
  { name: "Master", id: "master", min: 35000, color: "#B07CFF" },
  { name: "Cosmic", id: "cosmic", min: 75000, color: "#9AA7FF" },
];

export function rankForXp(xp: number): Rank {
  let idx = 0;
  for (let i = 0; i < TIERS.length; i++) {
    if (xp >= TIERS[i].min) idx = i;
  }
  const tier = TIERS[idx];
  const next = TIERS[idx + 1]?.min ?? null;
  return { ...tier, next };
}

/** Progress (0–1) toward the next rank, and XP remaining. */
export function rankProgress(xp: number): { ratio: number; remaining: number | null; rank: Rank } {
  const rank = rankForXp(xp);
  if (rank.next == null) return { ratio: 1, remaining: null, rank };
  const span = rank.next - rank.min;
  const into = xp - rank.min;
  return { ratio: Math.min(1, into / span), remaining: rank.next - xp, rank };
}
