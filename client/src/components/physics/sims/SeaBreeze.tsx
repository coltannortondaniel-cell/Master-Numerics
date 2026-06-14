import { useEffect, useRef, useState } from "react";
import { SimFrame, SegmentedControl, Readout } from "./SimControls";

/**
 * sea-breeze — land heats and cools faster than the sea, so a convection loop
 * forms. By day the surface wind blows from sea to land; at night it reverses.
 */
type Time = "day" | "night";

export function SeaBreeze() {
  const [time, setTime] = useState<Time>("day");
  const [t, setT] = useState(0);
  const raf = useRef<number>();

  useEffect(() => {
    let last = performance.now();
    const tick = () => {
      const now = performance.now();
      setT((x) => x + (now - last) / 1000);
      last = now;
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  const W = 320;
  const Hh = 170;
  const dir = time === "day" ? 1 : -1; // day: surface wind sea→land (left→right)

  // 6 particles travelling around an elliptical convection loop
  const particles = Array.from({ length: 6 }, (_, i) => {
    const phase = (t * 0.25 + i / 6) % 1;
    const ang = phase * Math.PI * 2 * dir;
    const cx = W / 2 + Math.cos(ang) * 90;
    const cy = 70 + Math.sin(ang) * 42;
    return { cx, cy, key: i };
  });

  return (
    <SimFrame>
      <svg width="100%" viewBox={`0 0 ${W} ${Hh}`} className="rounded-lg">
        {/* sky */}
        <rect x={0} y={0} width={W} height={Hh} fill={time === "day" ? "#1e6fb8" : "#0b1733"} />
        {/* sun / moon */}
        <circle cx={time === "day" ? W * 0.2 : W * 0.8} cy={28} r={14} fill={time === "day" ? "#9FB6D4" : "#C9CED6"} />
        {/* sea (left) */}
        <rect x={0} y={Hh - 46} width={W / 2} height={46} fill="#2D7DFF" />
        {/* land (right) */}
        <rect x={W / 2} y={Hh - 52} width={W / 2} height={52} fill={time === "day" ? "#8a6d3b" : "#4a3a22"} />
        <text x={W * 0.25} y={Hh - 16} textAnchor="middle" fontSize="11" fill="#fff">
          sea
        </text>
        <text x={W * 0.75} y={Hh - 18} textAnchor="middle" fontSize="11" fill="#fff">
          land {time === "day" ? "🔥" : "❄️"}
        </text>
        {/* convection arrows */}
        <g stroke={time === "day" ? "#FFD27A" : "#9AB6FF"} strokeWidth={2} fill="none" opacity={0.8}>
          <path d={dir > 0 ? "M70 120 H250" : "M250 120 H70"} markerEnd="url(#arr)" />
          <path d={dir > 0 ? "M250 40 H70" : "M70 40 H250"} markerEnd="url(#arr)" />
        </g>
        <defs>
          <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill={time === "day" ? "#FFD27A" : "#9AB6FF"} />
          </marker>
        </defs>
        {particles.map((p) => (
          <circle key={p.key} cx={p.cx} cy={p.cy} r={3} fill="#F0F4FF" opacity={0.8} />
        ))}
      </svg>

      <div className="mt-4">
        <SegmentedControl<Time>
          label="Time of day"
          value={time}
          onChange={setTime}
          options={[
            { value: "day", label: "☀️ Day" },
            { value: "night", label: "🌙 Night" },
          ]}
        />
      </div>
      <div className="mt-3">
        <Readout
          items={[
            { label: "Warmer surface", value: time === "day" ? "Land" : "Sea", color: "#9FB6D4" },
            { label: "Air rises over", value: time === "day" ? "Land" : "Sea" },
            { label: "Surface wind", value: time === "day" ? "Sea → Land" : "Land → Sea", color: "#4FB6FF" },
          ]}
        />
      </div>
    </SimFrame>
  );
}
