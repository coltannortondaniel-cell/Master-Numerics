/**
 * Monochrome city landmarks for the math "ascending city" map (brief §3.3).
 *
 * The math journey climbs from a ground-level park up to towering institutions.
 * Each district is a distinct greyscale building/landmark; the parent CityChart
 * stacks them bottom-to-top and scales later districts larger so the skyline
 * grows as you advance. Color is never used here — the only colored element on
 * the map is the premium "you are here" marker, applied by the parent.
 */
import type { ReactNode } from "react";

export type BuildingKind =
  | "park" | "school" | "shop" | "market" | "hall" | "draft" | "exchange"
  | "factory" | "observatory" | "campus" | "lab" | "skyscraper" | "institute" | "spire";

/** Stable slug → landmark map (slugs never change; see math/districts.ts). */
export const BUILDING_KIND: Record<string, BuildingKind> = {
  "kindergarten-park": "park",
  "elementary-school-st": "school",
  "the-bakery": "shop",
  "the-market": "market",
  "city-hall-plaza": "hall",
  "architects-quarter": "draft",
  "stock-exchange": "exchange",
  "engineering-district": "factory",
  "observatory-bridge": "observatory",
  "university-campus": "campus",
  "research-lab": "lab",
  "data-science-tower": "skyscraper",
  "quantum-institute": "institute",
  "graduate-school": "spire",
};

const RIM = "rgba(255,255,255,0.28)";
const LINE = "rgba(236,238,243,0.7)";
const FAINT = "rgba(236,238,243,0.32)";
const GROUND = 210;

function grad(id: string) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#cfd3db" />
        <stop offset="55%" stopColor="#8d93a1" />
        <stop offset="100%" stopColor="#3a3f4b" />
      </linearGradient>
    </defs>
  );
}

/** A window grid filling the given body box. */
function windows(x: number, y: number, w: number, h: number, seed: number) {
  const cols = Math.max(2, Math.round(w / 16));
  const rows = Math.max(2, Math.round(h / 18));
  const gx = w / cols, gy = h / rows;
  const cells: ReactNode[] = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      const lit = ((r * 7 + c * 3 + seed) % 5) < 2;
      cells.push(
        <rect key={`${r}-${c}`} x={x + c * gx + gx * 0.22} y={y + r * gy + gy * 0.22}
          width={gx * 0.56} height={gy * 0.56} rx={0.5}
          fill={lit ? "rgba(236,238,243,0.85)" : "rgba(236,238,243,0.18)"} />
      );
    }
  return <g>{cells}</g>;
}

function body(id: string, cx: number, w: number, topY: number) {
  return <rect x={cx - w / 2} y={topY} width={w} height={GROUND - topY} fill={`url(#${id})`} stroke={RIM} strokeWidth={0.8} />;
}

export function CityBuilding({ kind, size, uid, dim = false }: { kind: BuildingKind; size: number; uid: string; dim?: boolean }) {
  const id = `bld-${uid}`;
  const cx = 60;
  let art: ReactNode;

  switch (kind) {
    case "park":
      art = (<>{grad(id)}
        {[[28, 8], [60, 11], [92, 7]].map(([x, r], i) => (
          <g key={i}><rect x={x - 2} y={GROUND - 22} width={4} height={22} fill="#5a606e" />
            <circle cx={x} cy={GROUND - 30} r={(r as number) + 6} fill={`url(#${id})`} stroke={RIM} strokeWidth={0.6} /></g>
        ))}
        <rect x={44} y={GROUND - 8} width={32} height={4} rx={1} fill={LINE} />
        <line x1={48} y1={GROUND - 4} x2={48} y2={GROUND} stroke={LINE} strokeWidth={2} />
        <line x1={72} y1={GROUND - 4} x2={72} y2={GROUND} stroke={LINE} strokeWidth={2} />
      </>);
      break;
    case "school":
      art = (<>{grad(id)}{body(id, cx, 78, 120)}{windows(cx - 39, 120, 78, GROUND - 120, 1)}
        <polygon points={`${cx - 44},120 ${cx},96 ${cx + 44},120`} fill={`url(#${id})`} stroke={RIM} strokeWidth={0.8} />
        <rect x={cx - 4} y={92} width={8} height={12} fill={`url(#${id})`} /><circle cx={cx} cy={92} r={3} fill={LINE} />
      </>);
      break;
    case "shop":
      art = (<>{grad(id)}{body(id, cx, 84, 130)}{windows(cx - 42, 130, 84, 40, 2)}
        <rect x={cx - 44} y={168} width={88} height={10} fill={FAINT} />
        {Array.from({ length: 8 }, (_, i) => <rect key={i} x={cx - 44 + i * 11} y={168} width={5.5} height={10} fill={LINE} />)}
        <rect x={cx - 12} y={178} width={24} height={GROUND - 178} fill="rgba(20,22,28,0.5)" stroke={RIM} strokeWidth={0.6} />
      </>);
      break;
    case "market":
      art = (<>{grad(id)}
        {[[36, 1], [60, 0], [84, 1]].map(([x], i) => (
          <g key={i}><polygon points={`${x - 16},168 ${x},150 ${x + 16},168`} fill={`url(#${id})`} stroke={RIM} strokeWidth={0.6} />
            <rect x={x - 14} y={168} width={28} height={GROUND - 168} fill="rgba(20,22,28,0.4)" stroke={RIM} strokeWidth={0.5} /></g>
        ))}
      </>);
      break;
    case "hall":
      art = (<>{grad(id)}{body(id, cx, 90, 124)}
        {Array.from({ length: 6 }, (_, i) => <rect key={i} x={cx - 40 + i * 15} y={150} width={6} height={GROUND - 150} fill="rgba(20,22,28,0.45)" />)}
        <polygon points={`${cx - 48},124 ${cx},108 ${cx + 48},124`} fill={`url(#${id})`} stroke={RIM} strokeWidth={0.8} />
        <path d={`M ${cx - 18} 108 A 18 18 0 0 1 ${cx + 18} 108`} fill={`url(#${id})`} stroke={RIM} strokeWidth={0.8} />
        <line x1={cx} y1={90} x2={cx} y2={78} stroke={LINE} strokeWidth={1.4} /><polygon points={`${cx},78 ${cx + 12},82 ${cx},86`} fill={LINE} />
      </>);
      break;
    case "draft":
      art = (<>{grad(id)}{body(id, cx, 72, 96)}{windows(cx - 36, 96, 72, GROUND - 96, 3)}
        {[110, 140, 170, 200].map((y) => <line key={y} x1={cx + 36} y1={y} x2={cx + 50} y2={y} stroke={FAINT} strokeWidth={0.8} />)}
        <line x1={cx + 50} y1={96} x2={cx + 50} y2={GROUND} stroke={FAINT} strokeWidth={0.8} />
        <line x1={cx + 12} y1={96} x2={cx + 12} y2={62} stroke={LINE} strokeWidth={1.4} />
        <line x1={cx + 12} y1={62} x2={cx + 40} y2={62} stroke={LINE} strokeWidth={1.4} />
        <line x1={cx + 40} y1={62} x2={cx + 40} y2={72} stroke={FAINT} strokeWidth={0.8} />
      </>);
      break;
    case "exchange":
      art = (<>{grad(id)}{body(id, cx, 92, 110)}
        {Array.from({ length: 7 }, (_, i) => <rect key={i} x={cx - 42 + i * 13} y={130} width={6} height={GROUND - 130} fill="rgba(20,22,28,0.45)" />)}
        <polygon points={`${cx - 50},110 ${cx},92 ${cx + 50},110`} fill={`url(#${id})`} stroke={RIM} strokeWidth={0.8} />
        <polyline points={`${cx - 30},150 ${cx - 12},138 ${cx + 6},146 ${cx + 30},124`} fill="none" stroke={LINE} strokeWidth={1.6} />
        <polygon points={`${cx + 30},124 ${cx + 22},124 ${cx + 30},132`} fill={LINE} />
      </>);
      break;
    case "factory":
      art = (<>{grad(id)}{body(id, cx, 88, 132)}{windows(cx - 44, 132, 88, GROUND - 132, 4)}
        <rect x={cx + 8} y={104} width={12} height={28} fill={`url(#${id})`} stroke={RIM} strokeWidth={0.6} />
        <rect x={cx + 28} y={116} width={10} height={16} fill={`url(#${id})`} stroke={RIM} strokeWidth={0.6} />
        {[[cx + 14, 100], [cx + 12, 92]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={3 - i} fill={FAINT} />)}
        <circle cx={cx - 24} cy={120} r={9} fill="none" stroke={LINE} strokeWidth={1.4} /><circle cx={cx - 24} cy={120} r={2.5} fill={LINE} />
      </>);
      break;
    case "observatory":
      art = (<>{grad(id)}{body(id, cx, 70, 140)}{windows(cx - 35, 140, 70, GROUND - 140, 5)}
        <path d={`M ${cx - 36} 140 A 36 36 0 0 1 ${cx + 36} 140`} fill={`url(#${id})`} stroke={RIM} strokeWidth={0.8} />
        <line x1={cx - 4} y1={120} x2={cx + 14} y2={104} stroke="rgba(20,22,28,0.6)" strokeWidth={4} />
        <line x1={0} y1={GROUND} x2={cx - 35} y2={GROUND - 6} stroke={FAINT} strokeWidth={1.4} />
      </>);
      break;
    case "campus":
      art = (<>{grad(id)}{body(id, cx, 84, 128)}{windows(cx - 42, 128, 84, GROUND - 128, 6)}
        <rect x={cx - 12} y={92} width={24} height={36} fill={`url(#${id})`} stroke={RIM} strokeWidth={0.8} />
        <circle cx={cx} cy={108} r={7} fill="rgba(20,22,28,0.5)" stroke={LINE} strokeWidth={0.8} />
        <line x1={cx} y1={108} x2={cx} y2={103} stroke={LINE} strokeWidth={1} /><line x1={cx} y1={108} x2={cx + 4} y2={108} stroke={LINE} strokeWidth={1} />
        <polygon points={`${cx - 14},92 ${cx},82 ${cx + 14},92`} fill={`url(#${id})`} stroke={RIM} strokeWidth={0.8} />
      </>);
      break;
    case "lab":
      art = (<>{grad(id)}{body(id, cx, 76, 104)}{windows(cx - 38, 104, 76, GROUND - 104, 7)}
        <line x1={cx + 20} y1={104} x2={cx + 20} y2={74} stroke={LINE} strokeWidth={1.2} />
        <path d={`M ${cx + 12} 80 A 10 10 0 0 1 ${cx + 28} 80`} fill="none" stroke={LINE} strokeWidth={1.2} />
        <circle cx={cx + 20} cy={74} r={2} fill={LINE} />
      </>);
      break;
    case "skyscraper":
      art = (<>{grad(id)}{body(id, cx, 60, 64)}{windows(cx - 30, 64, 60, GROUND - 64, 8)}
        <rect x={cx - 30} y={64} width={60} height={4} fill={FAINT} />
        <line x1={cx} y1={64} x2={cx} y2={46} stroke={LINE} strokeWidth={1.6} /><circle cx={cx} cy={46} r={2.4} fill="#ffffff" />
      </>);
      break;
    case "institute":
      art = (<>{grad(id)}{body(id, cx, 56, 88)}{windows(cx - 28, 88, 56, GROUND - 88, 9)}
        <ellipse cx={cx} cy={70} rx={40} ry={14} fill="none" stroke={LINE} strokeWidth={1.2} transform={`rotate(20 ${cx} 70)`} />
        <ellipse cx={cx} cy={70} rx={40} ry={14} fill="none" stroke={FAINT} strokeWidth={1} transform={`rotate(-20 ${cx} 70)`} />
        <circle cx={cx} cy={70} r={4} fill="#ffffff" />
      </>);
      break;
    case "spire":
      art = (<>{grad(id)}{body(id, cx, 58, 96)}{windows(cx - 29, 96, 58, GROUND - 96, 10)}
        <polygon points={`${cx - 18},96 ${cx},44 ${cx + 18},96`} fill={`url(#${id})`} stroke={RIM} strokeWidth={0.8} />
        <line x1={cx} y1={44} x2={cx} y2={30} stroke={LINE} strokeWidth={1.6} />
        <path d="M50 30 L52 36 L58 38 L52 40 L50 46 L48 40 L42 38 L48 36 Z" transform={`translate(${cx - 50} -4)`} fill="#ffffff" />
      </>);
      break;
  }

  return (
    <svg width={size} height={size * (220 / 120)} viewBox="0 0 120 220"
      style={{ opacity: dim ? 0.4 : 1, filter: dim ? "grayscale(1)" : undefined }} aria-hidden>
      {art}
      <line x1={0} y1={GROUND} x2={120} y2={GROUND} stroke={FAINT} strokeWidth={1} />
    </svg>
  );
}
