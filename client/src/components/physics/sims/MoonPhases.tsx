import { useEffect, useRef, useState } from "react";
import { SimFrame, SliderControl, SimButton } from "./SimControls";

/**
 * moon-phases — the same Moon shown two ways: from space (its lit half always
 * faces the Sun) and from Earth (the phase you'd actually see). Drag the orbit
 * position or press play to sweep all eight phases.
 */

function phaseName(p: number): string {
  const e = 0.03;
  if (p < e || p > 1 - e) return "New Moon";
  if (Math.abs(p - 0.25) < e) return "First Quarter";
  if (Math.abs(p - 0.5) < e) return "Full Moon";
  if (Math.abs(p - 0.75) < e) return "Last Quarter";
  if (p < 0.25) return "Waxing Crescent";
  if (p < 0.5) return "Waxing Gibbous";
  if (p < 0.75) return "Waning Gibbous";
  return "Waning Crescent";
}

/** Geometrically correct phase disc. k = illuminated fraction, waxing = lit on right. */
function PhaseDisc({ p, size = 120 }: { p: number; size?: number }) {
  const r = size / 2 - 4;
  const k = (1 + Math.cos(Math.PI - 2 * Math.PI * p)) / 2; // 0 new → 1 full
  const waxing = p < 0.5;
  const lit = "#E9ECF2";
  const dark = "#23262f";

  let base: string;
  let sliver: string | null = null;
  let sliverColor = lit;

  if (k <= 0.5) {
    base = dark;
    const rx = r * (1 - 2 * k);
    sliver = `M 0 ${-r} A ${r} ${r} 0 0 1 0 ${r} A ${rx} ${r} 0 0 0 0 ${-r} Z`;
    sliverColor = lit;
  } else {
    base = lit;
    const rx = r * (2 * k - 1);
    sliver = `M 0 ${-r} A ${r} ${r} 0 0 0 0 ${r} A ${rx} ${r} 0 0 1 0 ${-r} Z`;
    sliverColor = dark;
  }

  return (
    <svg width={size} height={size} viewBox={`${-size / 2} ${-size / 2} ${size} ${size}`}>
      <circle r={r} fill={base} stroke="#3a3d4a" strokeWidth={1} />
      {sliver && (
        <g transform={waxing ? undefined : "scale(-1,1)"}>
          <path d={sliver} fill={sliverColor} />
        </g>
      )}
      {/* subtle craters */}
      <g opacity={0.12} fill="#000">
        <circle cx={-r * 0.3} cy={-r * 0.2} r={r * 0.12} />
        <circle cx={r * 0.2} cy={r * 0.3} r={r * 0.18} />
        <circle cx={r * 0.35} cy={-r * 0.35} r={r * 0.08} />
      </g>
    </svg>
  );
}

function SpaceView({ p, size = 200 }: { p: number; size?: number }) {
  const R = size * 0.32;
  const beta = Math.PI - 2 * Math.PI * p;
  const mx = R * Math.cos(beta);
  const my = R * Math.sin(beta);
  const mr = size * 0.07;

  return (
    <svg width={size} height={size} viewBox={`${-size / 2} ${-size / 2} ${size} ${size}`}>
      <defs>
        <radialGradient id="sunG" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF6D8" />
          <stop offset="60%" stopColor="#9FB6D4" />
          <stop offset="100%" stopColor="#C77F00" />
        </radialGradient>
      </defs>
      {/* Sun rays from the left */}
      <rect x={-size / 2} y={-size / 2} width={size} height={size} fill="transparent" />
      {/* Sun */}
      <circle cx={-size / 2 + 12} cy={0} r={size * 0.13} fill="url(#sunG)" />
      {[-30, -15, 0, 15, 30].map((dy) => (
        <line
          key={dy}
          x1={-size / 2 + 28}
          y1={dy}
          x2={-size * 0.1}
          y2={dy}
          stroke="#9FB6D455"
          strokeWidth={1.5}
          strokeDasharray="3 5"
        />
      ))}
      {/* Orbit */}
      <circle r={R} fill="none" stroke="rgba(240,244,255,0.14)" strokeWidth={1} strokeDasharray="4 5" />
      {/* Earth */}
      <circle r={size * 0.06} fill="#2D7DFF" />
      {/* Earth→Moon line */}
      <line x1={0} y1={0} x2={mx} y2={my} stroke="rgba(240,244,255,0.12)" strokeWidth={1} />
      {/* Moon: left (Sun-facing) half lit */}
      <g transform={`translate(${mx} ${my})`}>
        <circle r={mr} fill="#23262f" />
        <path d={`M 0 ${-mr} A ${mr} ${mr} 0 0 0 0 ${mr} Z`} fill="#E9ECF2" />
      </g>
    </svg>
  );
}

export function MoonPhases() {
  const [p, setP] = useState(0.0);
  const [playing, setPlaying] = useState(false);
  const raf = useRef<number>();
  const last = useRef(0);

  useEffect(() => {
    if (!playing) return;
    last.current = performance.now();
    const tick = () => {
      const now = performance.now();
      const dt = (now - last.current) / 1000;
      last.current = now;
      setP((prev) => (prev + dt * 0.12) % 1);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [playing]);

  return (
    <SimFrame>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        <div className="flex flex-col items-center">
          <p className="mb-1 text-xs uppercase tracking-widest text-neutron/45">From space</p>
          <SpaceView p={p} />
        </div>
        <div className="flex flex-col items-center">
          <p className="mb-1 text-xs uppercase tracking-widest text-neutron/45">From Earth</p>
          <PhaseDisc p={p} />
          <p className="mt-2 font-display font-semibold text-lg">{phaseName(p)}</p>
          <p className="font-mono text-xs text-neutron/50">
            {Math.round(((1 + Math.cos(Math.PI - 2 * Math.PI * p)) / 2) * 100)}% lit
          </p>
        </div>
      </div>
      <div className="mt-4 space-y-3">
        <SliderControl
          label="Orbit position"
          value={p}
          min={0}
          max={0.999}
          step={0.001}
          onChange={(v) => {
            setPlaying(false);
            setP(v);
          }}
          format={(v) => `${Math.round(v * 29.5)} / 29 days`}
        />
        <SimButton onClick={() => setPlaying((x) => !x)} active={playing}>
          {playing ? "Pause" : "Play orbit"}
        </SimButton>
      </div>
    </SimFrame>
  );
}
