import { Flame } from "lucide-react";
import { ProgressRing } from "../ui/ProgressRing";

const STAR = "#F5B83C";

/** Streak flame + day count. Greys out at 0. */
export function StreakBadge({ streak, size = 15 }: { streak: number; size?: number }) {
  const alive = streak > 0;
  return (
    <span
      className="flex items-center gap-1.5 rounded-full bg-line/5 px-3 py-1.5"
      title={`${streak}-day streak`}
    >
      <Flame
        size={size}
        strokeWidth={1.75}
        className={alive ? "text-star" : "text-fg/30"}
        fill={alive ? STAR : "none"}
      />
      <span className="font-mono text-sm font-semibold tabular-nums text-fg/90">{streak}</span>
    </span>
  );
}

/** Circular daily-goal progress (today's XP toward the target). */
export function DailyGoalRing({
  todayXp,
  goalXp,
  size = 64,
}: {
  todayXp: number;
  goalXp: number;
  size?: number;
}) {
  const pct = goalXp > 0 ? Math.min(1, todayXp / goalXp) : 0;
  const done = pct >= 1;
  return (
    <ProgressRing value={pct} size={size} stroke={6} color={done ? STAR : "#2D7DFF"}>
      <span className="flex flex-col items-center leading-none">
        {done ? (
          <Flame size={20} className="text-star" fill={STAR} />
        ) : (
          <>
            <span className="font-display text-sm font-bold tabular-nums">{todayXp}</span>
            <span className="text-[0.55rem] text-fg/45">/ {goalXp}</span>
          </>
        )}
      </span>
    </ProgressRing>
  );
}

/** Dashboard card combining the daily-goal ring, streak, and a gentle nudge. */
export function DailyGoalCard({
  todayXp,
  goalXp,
  streak,
}: {
  todayXp: number;
  goalXp: number;
  streak: number;
}) {
  const remaining = Math.max(0, goalXp - todayXp);
  const done = remaining === 0;
  return (
    <div className="glass flex items-center gap-5 px-5 py-5 sm:px-6">
      <DailyGoalRing todayXp={todayXp} goalXp={goalXp} size={84} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-display text-lg font-bold">Daily goal</h3>
          <StreakBadge streak={streak} />
        </div>
        <p className="mt-1 text-sm text-fg/65">
          {done ? (
            <>Goal met — your <span className="font-semibold text-star">{streak}-day streak</span> is safe today.</>
          ) : (
            <>
              <span className="font-semibold text-accent">{remaining} XP</span> to go.{" "}
              {streak > 0
                ? `Finish to keep your ${streak}-day streak alive.`
                : "Hit your goal to start a streak."}
            </>
          )}
        </p>
      </div>
    </div>
  );
}
