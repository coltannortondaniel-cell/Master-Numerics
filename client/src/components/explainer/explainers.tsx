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

/* ───────────────────────── Velocity & speed ───────────────────────── */
const velocity: ExplainerBeat[] = [
  {
    caption: "Velocity is displacement per unit time: v = Δx / Δt.",
    visual: (
      <Stage>
        <NumberLineBase />
        <motion.line x1={x(0)} y1={Y - 16} y2={Y - 16} stroke={ACCENT} strokeWidth="3"
          initial={{ x2: x(0) }} animate={{ x2: x(6) }} transition={{ duration: 2, ease: "linear" }} />
        <motion.circle cy={Y} r={8} fill={ACCENT}
          initial={{ cx: x(0) }} animate={{ cx: x(6) }} transition={{ duration: 2, ease: "linear" }} />
        <text x={x(3)} y={Y - 24} textAnchor="middle" fontSize="10" fill={ACCENT}>Δx = +6 m</text>
        <text x={x(3)} y={Y + 40} textAnchor="middle" fontSize="10" fill={WEST}>in Δt = 2 s → v = +3 m/s</text>
      </Stage>
    ),
  },
  {
    caption: "Go the same distance the other way and the velocity flips sign.",
    visual: (
      <Stage>
        <NumberLineBase />
        <motion.line x1={x(6)} y1={Y - 16} y2={Y - 16} stroke={WEST} strokeWidth="3"
          initial={{ x2: x(6) }} animate={{ x2: x(0) }} transition={{ duration: 2, ease: "linear" }} />
        <motion.circle cy={Y} r={8} fill={WEST} stroke={ACCENT} strokeWidth="2"
          initial={{ cx: x(6) }} animate={{ cx: x(0) }} transition={{ duration: 2, ease: "linear" }} />
        <text x={x(3)} y={Y - 24} textAnchor="middle" fontSize="10" fill={WEST}>v = −3 m/s</text>
      </Stage>
    ),
  },
  {
    caption: "Speed is the size of velocity — it drops the sign and is never negative.",
    visual: (
      <Stage>
        <NumberLineBase />
        <circle cx={x(3)} cy={Y} r={8} fill={ACCENT} />
        <text x={x(3)} y={Y - 22} textAnchor="middle" fontSize="11" fill={ACCENT}>|v| = 3 m/s</text>
      </Stage>
    ),
  },
];

/* ───────────────────────── Acceleration ───────────────────────── */
function GhostDots({ values, color }: { values: number[]; color: string }) {
  return (
    <>
      {values.map((v, i) => (
        <circle key={i} cx={x(v)} cy={Y} r={4} fill={color} opacity={0.25 + i * 0.12} />
      ))}
    </>
  );
}
const acceleration: ExplainerBeat[] = [
  {
    caption: "Acceleration is the rate that velocity changes. Watch the gaps grow.",
    visual: (
      <Stage>
        <NumberLineBase />
        <GhostDots values={[0, 0.5, 1.3, 2.5, 4, 6]} color={ACCENT} />
        <motion.circle cy={Y} r={8} fill={ACCENT}
          initial={{ cx: x(0) }} animate={{ cx: x(6) }} transition={{ duration: 2.2, ease: "easeIn" }} />
      </Stage>
    ),
  },
  {
    caption: "When acceleration points the same way as motion, you speed up.",
    visual: (
      <Stage>
        <NumberLineBase />
        <GhostDots values={[0, 0.5, 1.3, 2.5, 4, 6]} color={ACCENT} />
        <line x1={x(2)} y1={Y + 30} x2={x(4)} y2={Y + 30} stroke={ACCENT} strokeWidth="3" />
        <path d={`M${x(4) - 6} ${Y + 26} L${x(4)} ${Y + 30} L${x(4) - 6} ${Y + 34} Z`} fill={ACCENT} />
        <text x={x(3)} y={Y + 46} textAnchor="middle" fontSize="10" fill={ACCENT}>a, v same way</text>
      </Stage>
    ),
  },
  {
    caption: "When it opposes the motion, you slow down (the gaps shrink).",
    visual: (
      <Stage>
        <NumberLineBase />
        <GhostDots values={[0, 2, 3.7, 5, 5.7, 6]} color={WEST} />
        <line x1={x(4)} y1={Y + 30} x2={x(2)} y2={Y + 30} stroke={WEST} strokeWidth="3" />
        <path d={`M${x(2) + 6} ${Y + 26} L${x(2)} ${Y + 30} L${x(2) + 6} ${Y + 34} Z`} fill={WEST} />
        <text x={x(3)} y={Y + 46} textAnchor="middle" fontSize="10" fill={WEST}>a opposes v</text>
      </Stage>
    ),
  },
];

/* ───────────────────────── Fractions (math) ───────────────────────── */
const PCX = 160, PCY = 86, PR = 60;
function slicePath(a0: number, a1: number): string {
  const p = (a: number) => [PCX + PR * Math.cos(a), PCY + PR * Math.sin(a)];
  const [x0, y0] = p(a0);
  const [x1, y1] = p(a1);
  return `M${PCX} ${PCY} L${x0} ${y0} A${PR} ${PR} 0 0 1 ${x1} ${y1} Z`;
}
function Pie({ parts, shaded }: { parts: number; shaded: number }) {
  const step = (2 * Math.PI) / parts;
  const start = -Math.PI / 2;
  return (
    <>
      {Array.from({ length: parts }).map((_, i) => {
        const a0 = start + i * step;
        const a1 = a0 + step;
        const fill = i < shaded ? ACCENT : "transparent";
        return (
          <motion.path
            key={i}
            d={slicePath(a0, a1)}
            fill={fill}
            stroke="rgb(244 246 251 / 0.6)"
            strokeWidth="2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.12 }}
          />
        );
      })}
    </>
  );
}
const fractions: ExplainerBeat[] = [
  {
    caption: "A fraction names part of a whole — start with one whole pie.",
    visual: (
      <Stage>
        <circle cx={PCX} cy={PCY} r={PR} fill="none" stroke="rgb(244 246 251 / 0.6)" strokeWidth="2" />
      </Stage>
    ),
  },
  {
    caption: "Cut it into equal parts. The number of parts is the denominator (4).",
    visual: (
      <Stage>
        <Pie parts={4} shaded={0} />
        <text x={PCX} y={PCY + PR + 24} textAnchor="middle" fontSize="12" fill={WEST}>denominator = 4</text>
      </Stage>
    ),
  },
  {
    caption: "Shade the parts you take — the numerator. This is three-quarters, 3/4.",
    visual: (
      <Stage>
        <Pie parts={4} shaded={3} />
        <text x={PCX} y={PCY + PR + 24} textAnchor="middle" fontSize="14" fill={ACCENT} fontFamily="monospace">3 / 4</text>
      </Stage>
    ),
  },
];

/** slug → animated explainer beats. Lessons without one fall back to video. */
const REGISTRY: Record<string, ExplainerBeat[]> = {
  "position-displacement-distance": distanceDisplacement,
  "velocity-and-speed": velocity,
  "acceleration": acceleration,
  "understanding-fractions": fractions,
};

export function getExplainer(slug: string): ExplainerBeat[] | null {
  return REGISTRY[slug] ?? null;
}
