import { Mountain, Medal, Gem, Crown, Sparkles, type LucideIcon } from "lucide-react";
import type { RankId } from "../../lib/rank";

const MAP: Record<RankId, LucideIcon> = {
  stone: Mountain,
  bronze: Medal,
  silver: Medal,
  gold: Medal,
  diamond: Gem,
  master: Crown,
  cosmic: Sparkles,
};

/** Clean line-icon for a rank tier (replaces emoji). */
export function RankIcon({ id, size = 18, color, className }: { id: RankId; size?: number; color?: string; className?: string }) {
  const I = MAP[id] ?? Mountain;
  return <I size={size} color={color} className={className} strokeWidth={1.75} />;
}
