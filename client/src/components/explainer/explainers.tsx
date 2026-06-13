import { motion } from "framer-motion";
import type { ExplainerBeat } from "./AnimatedExplainer";

const ACCENT = "#2D7DFF";
const WEST = "#E6ECF7";

/* Number-line geometry shared by the distance/displacement beats. */
const Y = 120;
const x = (v: number) => 20 + (v + 1) * 35; // values -1..7

function NumberLineBase() {
  const ticks = [-1, 0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <>
      <line x1={x(-1)} y1={Y} x2={x(7)} y2={Y} stroke="rgb(244 246 251 / 0.25)" strokeWidth="2" />
      {ticks.map((t) => (
        <g key={t}>
          <line x1={x(t)} y1={Y - 5} x2={x(t)} y2={Y + 5} stroke="rgb(244 246 251 / 0.3)" strokeWidth="1.5" />
          <text x={x(t)} y={Y + 20} textAnchor="middle" fontSize="9" fill="rgb(244 246 251 / 0.45)" fontFamily="monospace">
            {t}
          </text>
        </g>
      ))}
    </>
  );
}

function Stage({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 320 180" width="100%" height="100%" className="max-h-full">
      {children}
    </svg>
  );
}

const distanceDisplacement: ExplainerBeat[] = [
  {
    caption: "Position is an object's location measured from a chosen origin (0).",
    visual: (
      <Stage>
        <NumberLineBase />
        <motion.circle
          cx={x(0)}
          cy={Y}
          r={8}
          fill={ACCENT}
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          style={{ transformOrigin: `${x(0)}px ${Y}px` }}
        />
        <text x={x(0)} y={Y - 18} textAnchor="middle" fontSize="10" fill={ACCENT} fontFamily="monospace">
          origin
        </text>
      </Stage>
    ),
  },
  {
    caption: "Walk 5 m east. The marker moves in the + direction.",
    visual: (
      <Stage>
        <NumberLineBase />
        <motion.line
          x1={x(0)} y1={Y} y2={Y} stroke={ACCENT} strokeWidth="4"
          initial={{ x2: x(0) }} animate={{ x2: x(5) }} transition={{ duration: 1.6, ease: "easeInOut" }}
        />
        <motion.circle
          cy={Y} r={8} fill={ACCENT}
          initial={{ cx: x(0) }} animate={{ cx: x(5) }} transition={{ duration: 1.6, ease: "easeInOut" }}
        />
        <text x={x(2.5)} y={Y - 14} textAnchor="middle" fontSize="10" fill={ACCENT}>+5 m</text>
      </Stage>
    ),
  },
  {
    caption: "Then walk 2 m back west. The marker reverses direction.",
    visual: (
      <Stage>
        <NumberLineBase />
        <line x1={x(0)} y1={Y} x2={x(5)} y2={Y} stroke={ACCENT} strokeWidth="4" opacity={0.35} />
        <motion.line
          x1={x(5)} y1={Y - 8} y2={Y - 8} stroke={WEST} strokeWidth="4"
          initial={{ x2: x(5) }} animate={{ x2: x(3) }} transition={{ duration: 1.2, ease: "easeInOut" }}
        />
        <motion.circle
          cy={Y} r={8} fill={WEST} stroke={ACCENT} strokeWidth="2"
          initial={{ cx: x(5) }} animate={{ cx: x(3) }} transition={{ duration: 1.2, ease: "easeInOut" }}
        />
        <text x={x(4)} y={Y - 18} textAnchor="middle" fontSize="10" fill={WEST}>−2 m</text>
      </Stage>
    ),
  },
  {
    caption: "Distance is the whole path (7 m). Displacement is the net change (+3 m).",
    visual: (
      <Stage>
        <NumberLineBase />
        {/* displacement arrow */}
        <line x1={x(0)} y1={Y + 34} x2={x(3)} y2={Y + 34} stroke={ACCENT} strokeWidth="3" />
        <path d={`M${x(3) - 6} ${Y + 30} L${x(3)} ${Y + 34} L${x(3) - 6} ${Y + 38} Z`} fill={ACCENT} />
        <text x={x(1.5)} y={Y + 52} textAnchor="middle" fontSize="10" fill={ACCENT}>displacement +3 m</text>
        {/* distance bracket */}
        <line x1={x(0)} y1={Y - 30} x2={x(5)} y2={Y - 30} stroke={WEST} strokeWidth="2" />
        <text x={x(2.5)} y={Y - 36} textAnchor="middle" fontSize="10" fill={WEST}>distance 7 m (5 + 2)</text>
        <circle cx={x(3)} cy={Y} r={8} fill={ACCENT} />
      </Stage>
    ),
  },
];

/** slug → animated explainer beats. Lessons without one fall back to video. */
const REGISTRY: Record<string, ExplainerBeat[]> = {
  "position-displacement-distance": distanceDisplacement,
};

export function getExplainer(slug: string): ExplainerBeat[] | null {
  return REGISTRY[slug] ?? null;
}
