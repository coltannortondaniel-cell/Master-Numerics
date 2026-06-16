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
  /** A short glyph/index shown inside the node (e.g. lesson number). */
  badge?: string;
  onClick?: () => void;
  /** Per-biome accent color (hex). Defaults to the global electric blue. */
  accent?: string;
}

const MUTED = "rgba(244,246,251,0.14)";

/**
 * A single node on the learning path: a mastery ring around a disc, a 1–3 star
 * rating above, and a label below. The disc style and the "current" pulse
 * communicate done / current / locked / coming-soon, and the node is tinted to
 * its biome's accent. State is conveyed by icon + shape + text (not color alone).
 */
export function PathNode({ name, gradeRange, mastery, stars, state, badge, onClick, accent = "#2D7DFF" }: Props) {
  // "locked" nodes (ahead of the learner) are still tappable to preview — no
  // charted node is ever a dead end. Only "soon" (genuinely empty) nodes are inert.
  const interactive = state !== "soon";
  const themed = state !== "locked" && state !== "soon";
  const ringColor = themed ? accent : MUTED;

  const stateLabel =
    state === "done" ? "completed" :
    state === "current" ? "current, in progress" :
    state === "soon" ? "coming soon" : "locked";
  const starLabel = state === "done" || state === "current" ? `, ${stars} of 3 stars` : "";
  const ariaLabel = `${name}${gradeRange ? `, ${gradeRange}` : ""}, ${stateLabel}${starLabel}`;

  const disc = (() => {
    switch (state) {
      case "done":
        return (
          <div className="flex h-full w-full items-center justify-center rounded-full text-white" style={{ background: accent }}>
            <Check size={30} strokeWidth={3} />
          </div>
        );
      case "current":
        return (
          <div className="flex h-full w-full items-center justify-center rounded-full border-2 bg-surface2" style={{ borderColor: accent, color: accent }}>
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
      {state === "current" && (
        <span
          className="rounded-full px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-white"
          style={{ background: accent }}
        >
          You are here
        </span>
      )}
      <StarRating count={state === "soon" || state === "locked" ? 0 : stars} />

      <div className="relative">
        {state === "current" && (
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{ boxShadow: `0 0 0 3px ${accent}` }}
            animate={{ scale: [1, 1.18, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        <button
          type="button"
          onClick={interactive ? onClick : undefined}
          disabled={!interactive}
          data-path-node
          aria-label={ariaLabel}
          className={`relative rounded-full transition-transform ${
            interactive ? "hover:scale-105 active:scale-95 cursor-pointer" : "cursor-default"
          }`}
        >
          <ProgressRing
            value={state === "done" ? 1 : mastery}
            size={88}
            stroke={6}
            color={ringColor}
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
