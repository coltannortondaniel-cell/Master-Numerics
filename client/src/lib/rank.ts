/** XP rank tiers (Design §5a). Shared by the header, dashboard, and later the leaderboard. */
export interface Rank {
  name: string;
  icon: string;
  min: number;
  next: number | null;
  color: string;
}

const TIERS: Omit<Rank, "next">[] = [
  { name: "Stone", icon: "🪨", min: 0, color: "#9CA3AF" },
  { name: "Bronze", icon: "🥉", min: 500, color: "#CD7F32" },
  { name: "Silver", icon: "🥈", min: 2000, color: "#C0C7D0" },
  { name: "Gold", icon: "🥇", min: 6000, color: "#FFB800" },
  { name: "Diamond", icon: "💎", min: 15000, color: "#5AD1E6" },
  { name: "Master", icon: "👑", min: 35000, color: "#B07CFF" },
  { name: "Cosmic", icon: "🌌", min: 75000, color: "#6B21D6" },
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
