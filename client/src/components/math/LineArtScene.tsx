import { motion } from "framer-motion";

/**
 * Sharp black & white line-art scenes for the Math City, with electric-blue
 * accents and a touch of motion. Strokes use currentColor so they adapt to the
 * theme; set a text colour on the wrapper.
 */
const ACCENT = "#2D7DFF";
const S = { fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function Bakery() {
  return (
    <svg viewBox="0 0 200 150" width="100%" height="100%">
      <rect x="30" y="60" width="140" height="70" {...S} />
      {/* awning */}
      <path d="M22 60 H178 L168 44 H32 Z" {...S} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line key={i} x1={32 + i * 24} y1="44" x2={22 + i * 24} y2="60" {...S} strokeWidth={1.4} />
      ))}
      {/* door + window */}
      <rect x="46" y="86" width="34" height="44" {...S} />
      <rect x="100" y="84" width="48" height="32" {...S} />
      {/* cupcake in window */}
      <path d="M112 110 h24 l-4 -14 h-16 z" {...S} strokeWidth={1.8} />
      <path d="M112 96 a12 8 0 0 1 24 0" fill={ACCENT} opacity={0.85} stroke="none" />
      {/* steam */}
      {[120, 128].map((cx, i) => (
        <motion.path
          key={cx}
          d={`M${cx} 80 q4 -6 0 -12 q-4 -6 0 -12`}
          {...S}
          strokeWidth={1.6}
          stroke={ACCENT}
          animate={{ opacity: [0, 1, 0], y: [0, -6, -12] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.6 }}
        />
      ))}
    </svg>
  );
}

function Market() {
  return (
    <svg viewBox="0 0 200 150" width="100%" height="100%">
      {/* stall */}
      <path d="M30 60 H170 L160 40 H40 Z" {...S} />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <line key={i} x1={40 + i * 20} y1="40" x2={30 + i * 20} y2="60" {...S} strokeWidth={1.4} />
      ))}
      <line x1="36" y1="60" x2="36" y2="128" {...S} />
      <line x1="164" y1="60" x2="164" y2="128" {...S} />
      <rect x="36" y="96" width="128" height="32" {...S} />
      {/* produce */}
      <circle cx="64" cy="86" r="9" {...S} />
      <circle cx="86" cy="86" r="9" fill={ACCENT} stroke="none" opacity={0.85} />
      <circle cx="108" cy="86" r="9" {...S} />
      {/* scale */}
      <line x1="138" y1="74" x2="138" y2="92" {...S} />
      <path d="M126 74 H150" {...S} />
      <path d="M126 74 a6 4 0 0 0 12 0" {...S} strokeWidth={1.6} />
      <path d="M138 74 a6 4 0 0 0 12 0" {...S} strokeWidth={1.6} />
    </svg>
  );
}

function Park() {
  return (
    <svg viewBox="0 0 200 150" width="100%" height="100%">
      {/* sun */}
      <motion.g animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "150px 40px" }}>
        <circle cx="150" cy="40" r="12" fill={ACCENT} stroke="none" opacity={0.85} />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <line key={a} x1="150" y1="40" x2={150 + 20 * Math.cos((a * Math.PI) / 180)} y2={40 + 20 * Math.sin((a * Math.PI) / 180)} stroke={ACCENT} strokeWidth={1.4} />
        ))}
      </motion.g>
      {/* ground */}
      <line x1="20" y1="120" x2="180" y2="120" {...S} />
      {/* tree */}
      <line x1="56" y1="120" x2="56" y2="92" {...S} />
      <motion.circle cx="56" cy="78" r="20" {...S} animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 3, repeat: Infinity }} style={{ transformOrigin: "56px 78px" }} />
      {/* bench */}
      <path d="M104 120 v-14 H150 v14" {...S} />
      <line x1="104" y1="112" x2="150" y2="112" {...S} />
    </svg>
  );
}

function School() {
  return (
    <svg viewBox="0 0 200 150" width="100%" height="100%">
      <rect x="40" y="64" width="120" height="66" {...S} />
      <path d="M34 64 L100 36 L166 64" {...S} />
      {/* clock */}
      <circle cx="100" cy="58" r="9" {...S} strokeWidth={1.6} />
      <line x1="100" y1="58" x2="100" y2="53" {...S} strokeWidth={1.4} />
      <line x1="100" y1="58" x2="104" y2="58" {...S} strokeWidth={1.4} />
      {/* door + windows */}
      <rect x="88" y="98" width="24" height="32" {...S} />
      <rect x="54" y="80" width="20" height="18" {...S} strokeWidth={1.6} />
      <rect x="126" y="80" width="20" height="18" fill={ACCENT} stroke="none" opacity={0.85} />
      {/* flag */}
      <line x1="100" y1="36" x2="100" y2="20" {...S} strokeWidth={1.6} />
      <motion.path d="M100 22 h16 l-4 4 l4 4 h-16 z" fill={ACCENT} stroke="none" animate={{ skewX: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }} />
    </svg>
  );
}

function City() {
  return (
    <svg viewBox="0 0 200 150" width="100%" height="100%">
      <line x1="16" y1="128" x2="184" y2="128" {...S} />
      {[
        { x: 28, h: 60, a: false },
        { x: 60, h: 88, a: true },
        { x: 96, h: 48, a: false },
        { x: 124, h: 76, a: false },
        { x: 156, h: 64, a: true },
      ].map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={128 - b.h} width="26" height={b.h} {...S} fill={b.a ? ACCENT : "none"} stroke={b.a ? "none" : "currentColor"} opacity={b.a ? 0.85 : 1} />
          {!b.a &&
            [0, 1, 2].map((r) =>
              [0, 1].map((c) => (
                <rect key={`${r}-${c}`} x={b.x + 5 + c * 11} y={128 - b.h + 8 + r * 14} width="6" height="8" stroke="currentColor" strokeWidth={1} fill="none" />
              ))
            )}
        </g>
      ))}
    </svg>
  );
}

const SCENES: Record<string, () => JSX.Element> = {
  bakery: Bakery,
  market: Market,
  park: Park,
  school: School,
  city: City,
};

export function isLineArtScene(scene: string): boolean {
  return scene in SCENES;
}

export function LineArtScene({ scene, className = "" }: { scene: string; className?: string }) {
  const Comp = SCENES[scene];
  if (!Comp) return null;
  return (
    <div className={`text-fg/85 ${className}`}>
      <Comp />
    </div>
  );
}
