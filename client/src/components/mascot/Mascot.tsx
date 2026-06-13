import { motion } from "framer-motion";

export type Mood = "idle" | "happy" | "thinking" | "sad" | "wave" | "celebrate";

interface Props {
  mood?: Mood;
  /** Pixel size of the square character. */
  size?: number;
  className?: string;
}

/**
 * The Σ mascot — a friendly orbiting orb built from the brand mark.
 * SVG + Framer Motion expressions (idle bob, happy bounce, thinking tilt,
 * sad droop, wave, celebrate). Self-contained so a hand-crafted Lottie can
 * replace the internals later without touching call sites.
 */
export function Mascot({ mood = "idle", size = 120, className = "" }: Props) {
  const float = {
    idle: { y: [0, -6, 0], rotate: 0 },
    happy: { y: [0, -12, 0], rotate: 0 },
    thinking: { y: [0, -3, 0], rotate: [-4, 4, -4] },
    sad: { y: [0, 3, 0], rotate: 0 },
    wave: { y: [0, -6, 0], rotate: 0 },
    celebrate: { y: [0, -16, 0], rotate: [-6, 6, -6] },
  }[mood];

  const duration = mood === "celebrate" ? 0.7 : mood === "happy" ? 1 : 2.4;

  // Mouth path per mood.
  const mouth: Record<Mood, string> = {
    idle: "M40 64 Q50 70 60 64",
    happy: "M38 62 Q50 76 62 62",
    celebrate: "M37 60 Q50 80 63 60",
    wave: "M38 62 Q50 74 62 62",
    thinking: "M44 66 Q50 70 56 66",
    sad: "M40 70 Q50 62 60 70",
  };

  return (
    <motion.div
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size }}
      animate={float}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden
    >
      <svg viewBox="0 0 100 100" width={size} height={size}>
        {/* orbit ring */}
        <ellipse
          cx="50"
          cy="52"
          rx="46"
          ry="18"
          fill="none"
          stroke="rgb(var(--c-accent) / 0.4)"
          strokeWidth="1.5"
          transform="rotate(-20 50 52)"
        />
        {/* body */}
        <circle cx="50" cy="50" r="34" fill="rgb(var(--c-surface-2))" stroke="rgb(var(--c-fg))" strokeWidth="3" />
        {/* Σ brand mark on the belly, faint */}
        <text
          x="50"
          y="58"
          textAnchor="middle"
          fontFamily="Cinzel, serif"
          fontWeight="700"
          fontSize="20"
          fill="rgb(var(--c-accent) / 0.25)"
        >
          Σ
        </text>
        {/* eyes */}
        {mood === "thinking" ? (
          <>
            <circle cx="40" cy="46" r="3.5" fill="rgb(var(--c-fg))" />
            <path d="M56 46 q4 -3 8 0" stroke="rgb(var(--c-fg))" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx="40" cy="46" r="4" fill="rgb(var(--c-fg))" />
            <circle cx="60" cy="46" r="4" fill="rgb(var(--c-fg))" />
            {(mood === "happy" || mood === "celebrate") && (
              <>
                <circle cx="41.4" cy="44.6" r="1.3" fill="rgb(var(--c-base))" />
                <circle cx="61.4" cy="44.6" r="1.3" fill="rgb(var(--c-base))" />
              </>
            )}
          </>
        )}
        {/* mouth */}
        <path
          d={mouth[mood]}
          stroke="rgb(var(--c-fg))"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* orbiting accent dot */}
        <motion.circle
          r="3.5"
          fill="rgb(var(--c-accent))"
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "50px 52px" }}
          cx="50"
          cy="14"
        />
      </svg>

      {/* waving / celebrating accents */}
      {mood === "wave" && (
        <motion.span
          className="absolute -right-1 top-6 text-2xl"
          animate={{ rotate: [0, 20, -10, 20, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          👋
        </motion.span>
      )}
      {mood === "celebrate" && (
        <motion.span
          className="absolute -top-2 left-1/2 -translate-x-1/2 text-xl"
          animate={{ y: [0, -8, 0], opacity: [1, 1, 0.4] }}
          transition={{ duration: 0.7, repeat: Infinity }}
        >
          ✨
        </motion.span>
      )}
    </motion.div>
  );
}
