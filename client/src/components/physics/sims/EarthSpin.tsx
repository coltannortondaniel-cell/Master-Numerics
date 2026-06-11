import { useEffect, useRef, useState } from "react";
import { SimFrame, SliderControl, SegmentedControl, Readout } from "./SimControls";

/**
 * earth-spin — one full spin is one day. Watch the explorer cross from day into
 * night. Switch to slow "Moon mode" to feel how long a lunar day really is.
 */
type Mode = "earth" | "moon";

export function EarthSpin() {
  const [mode, setMode] = useState<Mode>("earth");
  const [speed, setSpeed] = useState(1);
  const [angle, setAngle] = useState(-Math.PI / 2);
  const raf = useRef<number>();
  const last = useRef(0);

  useEffect(() => {
    last.current = performance.now();
    const baseRate = mode === "earth" ? 0.9 : 0.9 / 29.5; // Moon spins ~29.5× slower
    const tick = () => {
      const now = performance.now();
      const dt = (now - last.current) / 1000;
      last.current = now;
      setAngle((a) => a + dt * baseRate * speed);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [mode, speed]);

  const size = 220;
  const r = size * 0.34;
  const ex = r * Math.cos(angle);
  const ey = r * Math.sin(angle);
  const isDay = Math.cos(angle) > 0; // Sun on the right

  // Local solar time: noon when facing Sun (angle 0), midnight at angle π.
  const frac = (((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)) / (2 * Math.PI);
  const hours = (frac * 24 + 12) % 24;
  const hh = Math.floor(hours);
  const mm = Math.floor((hours - hh) * 60);

  return (
    <SimFrame>
      <div className="flex justify-center">
        <svg width={size} height={size} viewBox={`${-size / 2} ${-size / 2} ${size} ${size}`}>
          <defs>
            <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF6D8" />
              <stop offset="100%" stopColor="#FFB800" />
            </radialGradient>
            <clipPath id="planet">
              <circle r={r} />
            </clipPath>
          </defs>
          {/* Sun */}
          <circle cx={size / 2 - 14} cy={0} r={14} fill="url(#sunGlow)" />
          {/* Planet body */}
          <circle r={r} fill={mode === "earth" ? "#15406b" : "#3a3d4a"} />
          <g clipPath="url(#planet)">
            {/* lit dayside on the right */}
            <rect x={0} y={-r} width={r} height={2 * r} fill={mode === "earth" ? "#2E86DE" : "#9aa0ad"} />
            {mode === "earth" && (
              <>
                <ellipse cx={-r * 0.3} cy={-r * 0.2} rx={r * 0.35} ry={r * 0.22} fill="#22D3A0" opacity={0.7} />
                <ellipse cx={r * 0.35} cy={r * 0.3} rx={r * 0.3} ry={r * 0.25} fill="#22D3A0" opacity={0.7} />
              </>
            )}
            {/* night shading */}
            <rect x={-r} y={-r} width={r} height={2 * r} fill="#000" opacity={0.45} />
          </g>
          <circle r={r} fill="none" stroke="rgba(240,244,255,0.15)" />
          {/* terminator */}
          <line x1={0} y1={-r} x2={0} y2={r} stroke="rgba(0,0,0,0.5)" strokeWidth={1} />
          {/* Explorer */}
          <g transform={`translate(${ex} ${ey})`}>
            <circle r={5} fill={isDay ? "#FFB800" : "#6CF0FF"} stroke="#0A0B14" strokeWidth={1.5} />
          </g>
          <text x={ex} y={ey - 10} textAnchor="middle" fontSize="12">
            {isDay ? "☀️" : "🌙"}
          </text>
        </svg>
      </div>

      <div className="mt-4 space-y-3">
        <SegmentedControl<Mode>
          label="Planet"
          value={mode}
          onChange={setMode}
          options={[
            { value: "earth", label: "Earth (24 h)" },
            { value: "moon", label: "Moon (slow)" },
          ]}
        />
        <SliderControl label="Spin speed" value={speed} min={0.2} max={6} step={0.1} unit="×" onChange={setSpeed} format={(v) => v.toFixed(1)} />
        <Readout
          items={[
            { label: "Explorer", value: isDay ? "Daytime" : "Night", color: isDay ? "#FFB800" : "#6CF0FF" },
            { label: "Local time", value: `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}` },
            { label: "Day length", value: mode === "earth" ? "24 hours" : "~29.5 days" },
          ]}
        />
      </div>
    </SimFrame>
  );
}
