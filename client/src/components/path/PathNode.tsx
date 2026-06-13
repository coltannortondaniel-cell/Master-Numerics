import { motion } from "framer-motion";
import { Check, Lock, Play, Sparkles } from "lucide-react";
import { ProgressRing } from "../ui/ProgressRing";
import { StarRating } from "../ui/StarRating";

export type NodeState = "done" | "current" | "locked" | "soon";

interface Props {
  name: string;
  gradeRange?: string;
  /** Mastery fraction 0–1 (drives the ring). */
  mastery: number;
  /** Earned stars 0–3. */
  stars: number;
  state: NodeState;
  /** A short glyph/index shown inside the node (e.g. unit number). */
  badge?: string;
  onClick?: () => void;
}

const ACCENT = "#2D7DFF";
const MUTED = "rgba(244,246,251,0.14)";

/**
 * A single unit node on the learning path: a mastery ring around a disc,
 * with a 1–3 star rating above and the unit name below. The disc style and
 * the "current" pulse communicate done / current / locked / coming-soon.
 */
export function PathNode({ name, gradeRange, mastery, stars, state, badge, onClick }: Props) {
  const interactive = state === "done" || state === "current";

  const disc = (() => {
    switch (state) {
      case "done":
        return (
          <div className="flex h-full w-full items-center justify-center rounded-full bg-accent text-white">
            <Check size={30} strokeWidth={3} />
          </div>
        );
      case "current":
        return (
          <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-accent bg-surface2 text-accent">
            <Play size={26} strokeWidth={2.5} className="ml-0.5" fill="currentColor" />
          </div>
        );
      case "soon":
        return (
          <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-dashed border-line/20 text-fg/35">
            <Sparkles size={22} strokeWidth={1.75} />
          </div>
        );
      default:
        return (
          <div className="flex h-full w-full items-center justify-center rounded-full border border-line/10 bg-surface text-fg/30">
            <Lock size={22} strokeWidth={2} />
          </div>
        );
    }
  })();

  return (
    <div className="flex flex-col items-center gap-2">
      <StarRating count={state === "soon" || state === "locked" ? 0 : stars} />

      <div className="relative">
        {state === "current" && (
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{ boxShadow: `0 0 0 3px ${ACCENT}` }}
            animate={{ scale: [1, 1.18, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        <button
          type="button"
          onClick={interactive ? onClick : undefined}
          disabled={!interactive}
          aria-label={`${name}${state === "locked" ? " (locked)" : state === "soon" ? " (coming soon)" : ""}`}
          className={`relative rounded-full transition-transform ${
            interactive ? "hover:scale-105 active:scale-95 cursor-pointer" : "cursor-default"
          }`}
        >
          <ProgressRing
            value={state === "done" ? 1 : mastery}
            size={88}
            stroke={6}
            color={state === "locked" || state === "soon" ? MUTED : ACCENT}
            trackColor="rgba(244,246,251,0.08)"
          >
            <div className="absolute inset-[7px]">{disc}</div>
          </ProgressRing>
        </button>
        {badge && state !== "soon" && (
          <span className="absolute -right-1 -top-1 grid h-6 min-w-6 place-items-center rounded-full border border-line/10 bg-base px-1.5 font-mono text-[0.65rem] font-semibold text-fg/70">
            {badge}
          </span>
        )}
      </div>

      <div className="max-w-[12rem] text-center">
        <p
          className={`font-display text-sm font-semibold leading-tight ${
            interactive ? "text-fg" : "text-fg/45"
          }`}
        >
          {name}
        </p>
        {gradeRange && (
          <p className="mt-0.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-fg/40">
            {state === "soon" ? "Coming soon" : gradeRange}
          </p>
        )}
      </div>
    </div>
  );
}
