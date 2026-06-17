/**
 * Monochrome celestial bodies for the physics star-chart (brief §3.2).
 *
 * Each physics unit is a distinct object you fly out to. Everything is rendered
 * in greyscale (lit from the upper-left) so the map reads as black-and-white;
 * the only color on the chart is the premium "you are here" marker, applied by
 * the parent StarChart — never here. Shapes are deliberately simple SVG so 14 of
 * them animate cheaply.
 */

import type { ReactNode } from "react";

export type BodyKind =
  | "launch" | "asteroids" | "moon" | "comets" | "sun" | "ringed"
  | "binary" | "nebula" | "blaze" | "plasma" | "current" | "magnetar"
  | "starlight" | "blackhole";

/** Stable slug → body-kind map (slugs never change; see worlds.ts). */
export const BODY_KIND: Record<string, BodyKind> = {
  "earth-moon-system": "launch",
  "inner-solar-system": "asteroids",
  "outer-solar-system": "moon",
  "oort-cloud": "comets",
  "the-sun": "sun",
  "interstellar-space": "ringed",
  "binary-stars": "binary",
  "stellar-nebulae": "nebula",
  "galaxy-clusters": "blaze",
  "plasma-fields": "plasma",
  "stellar-currents": "current",
  magnetar: "magnetar",
  "distant-starlight": "starlight",
  supernovae: "blackhole",
};

const RIM = "rgba(255,255,255,0.28)";
const LINE = "rgba(236,238,243,0.7)";
const FAINT = "rgba(236,238,243,0.35)";

function Sphere({ id, r = 30, cx = 50, cy = 50 }: { id: string; r?: number; cx?: number; cy?: number }) {
  return <circle cx={cx} cy={cy} r={r} fill={`url(#${id})`} stroke={RIM} strokeWidth={0.8} />;
}

function defs(id: string, bright = false) {
  return (
    <defs>
      <radialGradient id={id} cx="35%" cy="30%" r="78%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset={bright ? "55%" : "45%"} stopColor={bright ? "#dfe3ea" : "#b9bec9"} />
        <stop offset="100%" stopColor={bright ? "#5a606e" : "#2a2e38"} />
      </radialGradient>
      <radialGradient id={`${id}-soft`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(220,224,232,0.45)" />
        <stop offset="100%" stopColor="rgba(220,224,232,0)" />
      </radialGradient>
    </defs>
  );
}

function ray(cx: number, cy: number, ang: number, r1: number, r2: number, w = 1) {
  const a = (ang * Math.PI) / 180;
  return (
    <line
      key={ang}
      x1={cx + r1 * Math.cos(a)} y1={cy + r1 * Math.sin(a)}
      x2={cx + r2 * Math.cos(a)} y2={cy + r2 * Math.sin(a)}
      stroke={LINE} strokeWidth={w} strokeLinecap="round"
    />
  );
}

export function CelestialBody({ kind, size, uid, dim = false }: { kind: BodyKind; size: number; uid: string; dim?: boolean }) {
  const id = `cb-${uid}`;
  let art: ReactNode;

  switch (kind) {
    case "launch":
      art = (<>
        {defs(id)}
        <circle cx={50} cy={118} r={66} fill={`url(#${id})`} stroke={RIM} strokeWidth={0.8} />
        <ellipse cx={50} cy={50} rx={34} ry={13} fill="none" stroke={FAINT} strokeWidth={0.8} strokeDasharray="3 4" transform="rotate(-18 50 50)" />
        <g transform="translate(70 32)">
          <rect x={-3} y={-5} width={6} height={10} rx={1.5} fill={LINE} />
          <rect x={-9} y={-2} width={5} height={4} fill={FAINT} />
          <rect x={4} y={-2} width={5} height={4} fill={FAINT} />
        </g>
      </>);
      break;
    case "asteroids":
      art = (<>
        {defs(id)}
        {[[30, 44, 11], [62, 36, 8], [50, 64, 13], [72, 60, 7], [38, 70, 6], [64, 76, 5], [24, 58, 5]].map(([x, y, r], i) => (
          <polygon key={i}
            points={Array.from({ length: 7 }, (_, k) => {
              const a = (k / 7) * Math.PI * 2;
              const rr = r * (0.7 + ((i + k) % 3) * 0.15);
              return `${x + rr * Math.cos(a)},${y + rr * Math.sin(a)}`;
            }).join(" ")}
            fill={`url(#${id})`} stroke={RIM} strokeWidth={0.6} />
        ))}
      </>);
      break;
    case "moon":
      art = (<>
        {defs(id)}
        <Sphere id={id} r={31} />
        {[[40, 42, 5], [60, 55, 6], [52, 36, 3.5], [46, 60, 4], [64, 40, 3]].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="rgba(20,22,28,0.35)" stroke="rgba(255,255,255,0.18)" strokeWidth={0.5} />
        ))}
      </>);
      break;
    case "comets":
      art = (<>
        {defs(id)}
        {[[40, 44, 8, 1], [66, 64, 6, 1]].map(([x, y, r, s], i) => (
          <g key={i}>
            <polygon points={`${x},${y - r} ${x},${y + r} ${x + 34 * (s as number)},${y + 2}`} fill={`url(#${id}-soft)`} />
            <circle cx={x} cy={y} r={r as number} fill={`url(#${id})`} stroke={RIM} strokeWidth={0.7} />
          </g>
        ))}
      </>);
      break;
    case "sun":
      art = (<>
        {defs(id, true)}
        <circle cx={50} cy={50} r={40} fill={`url(#${id}-soft)`} />
        {Array.from({ length: 16 }, (_, k) => ray(50, 50, k * 22.5, 31, 40, 1.4))}
        <Sphere id={id} r={27} />
      </>);
      break;
    case "ringed":
      art = (<>
        {defs(id)}
        <path d="M 14 56 A 36 12 0 0 0 86 44" fill="none" stroke={FAINT} strokeWidth={2.2} transform="rotate(-16 50 50)" />
        <Sphere id={id} r={26} />
        <path d="M 86 44 A 36 12 0 0 1 14 56" fill="none" stroke={LINE} strokeWidth={2.6} transform="rotate(-16 50 50)" />
      </>);
      break;
    case "binary":
      art = (<>
        {defs(id)}
        <ellipse cx={50} cy={50} rx={32} ry={12} fill="none" stroke={FAINT} strokeWidth={0.8} strokeDasharray="3 4" transform="rotate(-12 50 50)" />
        <Sphere id={id} r={19} cx={36} cy={45} />
        <Sphere id={id} r={12} cx={67} cy={57} />
      </>);
      break;
    case "nebula":
      art = (<>
        {defs(id)}
        {[[42, 46, 30], [60, 52, 24], [50, 64, 22], [64, 40, 18]].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill={`url(#${id}-soft)`} opacity={0.8} />
        ))}
        {[[34, 38], [66, 44], [52, 66], [44, 58], [70, 62]].map(([x, y], i) => (
          <circle key={`s${i}`} cx={x} cy={y} r={1.2} fill="#ffffff" />
        ))}
      </>);
      break;
    case "blaze":
      art = (<>
        {defs(id, true)}
        <circle cx={50} cy={50} r={42} fill={`url(#${id}-soft)`} />
        {[0, 90, 180, 270].map((a) => ray(50, 50, a, 24, 46, 2.4))}
        {[45, 135, 225, 315].map((a) => ray(50, 50, a, 24, 36, 1.2))}
        <Sphere id={id} r={22} />
      </>);
      break;
    case "plasma":
      art = (<>
        {defs(id)}
        <Sphere id={id} r={25} />
        {[20, 140, 260].map((deg) => {
          const a = (deg * Math.PI) / 180;
          const x = 50 + 25 * Math.cos(a), y = 50 + 25 * Math.sin(a);
          return <polyline key={deg} points={`${x},${y} ${x + 7 * Math.cos(a) - 3},${y + 7 * Math.sin(a) + 3} ${x + 14 * Math.cos(a) + 3},${y + 14 * Math.sin(a)} ${x + 20 * Math.cos(a)},${y + 20 * Math.sin(a)}`} fill="none" stroke={LINE} strokeWidth={1.2} />;
        })}
      </>);
      break;
    case "current":
      art = (<>
        {defs(id)}
        <Sphere id={id} r={24} />
        <ellipse cx={50} cy={50} rx={38} ry={14} fill="none" stroke={LINE} strokeWidth={1.4} transform="rotate(28 50 50)" />
        <circle cx={82} cy={38} r={2.6} fill="#ffffff" />
      </>);
      break;
    case "magnetar":
      art = (<>
        {defs(id, true)}
        <Sphere id={id} r={18} />
        {[26, 34, 42].map((rx, i) => (
          <g key={i} opacity={0.7 - i * 0.15}>
            <path d={`M 50 ${50 - 6} C ${50 - rx} ${50 - rx} ${50 - rx} ${50 + rx} 50 ${50 + 6}`} fill="none" stroke={LINE} strokeWidth={1} />
            <path d={`M 50 ${50 - 6} C ${50 + rx} ${50 - rx} ${50 + rx} ${50 + rx} 50 ${50 + 6}`} fill="none" stroke={LINE} strokeWidth={1} />
          </g>
        ))}
      </>);
      break;
    case "starlight":
      art = (<>
        {defs(id, true)}
        {Array.from({ length: 12 }, (_, k) => ray(50, 50, k * 30, 14, k % 3 === 0 ? 46 : 30, k % 3 === 0 ? 1.6 : 0.8))}
        <path d="M50 32 L54 46 L68 50 L54 54 L50 68 L46 54 L32 50 L46 46 Z" fill="#ffffff" stroke={RIM} strokeWidth={0.5} />
      </>);
      break;
    case "blackhole":
      art = (<>
        {defs(id, true)}
        <ellipse cx={50} cy={50} rx={44} ry={16} fill="none" stroke={`url(#${id}-soft)`} strokeWidth={6} transform="rotate(-18 50 50)" />
        <circle cx={50} cy={50} r={36} fill={`url(#${id}-soft)`} opacity={0.5} />
        <circle cx={50} cy={50} r={21} fill="#04050a" stroke={LINE} strokeWidth={1.4} />
        <ellipse cx={50} cy={50} rx={44} ry={16} fill="none" stroke={LINE} strokeWidth={1.8} transform="rotate(-18 50 50)" strokeDasharray="60 120" />
      </>);
      break;
  }

  return (
    <svg
      width={size} height={size} viewBox="0 0 100 100"
      style={{ opacity: dim ? 0.4 : 1, filter: dim ? "grayscale(1)" : undefined }}
      aria-hidden
    >
      {art}
    </svg>
  );
}
