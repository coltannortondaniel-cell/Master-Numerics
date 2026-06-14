import { useEffect, useRef, useState } from "react";
import { SimFrame, SliderControl, SimButton, Readout } from "./SimControls";

/**
 * incline-plane — a block on a ramp. Adjust the angle θ and friction μ to see
 * the gravity component mg·sinθ, the normal force mg·cosθ, friction μmg·cosθ,
 * whether it slides (tanθ > μ), and the resulting acceleration g(sinθ − μcosθ).
 */
const G = 9.8;
const M = 2; // kg (cancels out of acceleration, shown for force magnitudes)

export function Incline() {
  const [angle, setAngle] = useState(25); // degrees
  const [mu, setMu] = useState(0.3);
  const [pos, setPos] = useState(0); // 0..1 along ramp
  const [running, setRunning] = useState(false);
  const raf = useRef<number>();
  const last = useRef(0);
  const vel = useRef(0);

  const rad = (angle * Math.PI) / 180;
  const along = M * G * Math.sin(rad); // gravity component down-slope (N)
  const normal = M * G * Math.cos(rad); // N
  const maxFriction = mu * normal; // N
  const slides = Math.tan(rad) > mu + 1e-9;
  const friction = slides ? maxFriction : Math.min(along, maxFriction);
  const netForce = slides ? along - maxFriction : 0;
  const accel = slides ? G * (Math.sin(rad) - mu * Math.cos(rad)) : 0;

  useEffect(() => {
    if (!running) return;
    last.current = performance.now();
    const tick = () => {
      const now = performance.now();
      const dt = Math.min(0.05, (now - last.current) / 1000);
      last.current = now;
      vel.current += accel * dt * 0.12; // scaled for the small ramp
      setPos((p) => {
        const np = p + vel.current * dt;
        if (np >= 1) {
          setRunning(false);
          vel.current = 0;
          return 1;
        }
        return np;
      });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, accel]);

  function release() {
    if (!slides) return;
    vel.current = 0;
    setPos(0);
    setRunning(true);
  }
  function reset() {
    setRunning(false);
    vel.current = 0;
    setPos(0);
  }

  // SVG geometry: right triangle ramp
  const W = 320;
  const H = 180;
  const x0 = 30,
    y0 = 150; // bottom-left (foot of ramp)
  const rampLen = 260;
  const tx = x0 + rampLen * Math.cos(rad);
  const ty = y0 - rampLen * Math.sin(rad);
  // block position along ramp (from top down): start near top
  const startFrac = 0.12;
  const f = startFrac + pos * (0.85 - startFrac);
  const bx = tx + (x0 - tx) * f; // interpolate from top(tx,ty) toward foot(x0,y0)
  const by = ty + (y0 - ty) * f;

  return (
    <SimFrame>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} className="rounded-lg bg-space/60">
        {/* ramp triangle */}
        <polygon points={`${x0},${y0} ${tx},${ty} ${tx},${y0}`} fill="rgba(127,179,255,0.12)" stroke="rgba(240,244,255,0.25)" strokeWidth="1.5" />
        <line x1={x0 - 10} y1={y0} x2={tx + 10} y2={y0} stroke="rgba(240,244,255,0.4)" strokeWidth="1.5" />
        {/* angle arc label */}
        <text x={x0 + 26} y={y0 - 6} fontSize="11" fill="#7FB3FF">θ = {angle}°</text>
        {/* block */}
        <g transform={`translate(${bx} ${by}) rotate(${-angle})`}>
          <rect x={-12} y={-22} width="24" height="18" rx="3" fill="#9FB6D4" stroke="#0A0B14" strokeWidth="1.5" />
        </g>
        {/* force arrows from block center */}
        {(() => {
          const cx = bx + Math.sin(rad) * -11;
          const cy = by - Math.cos(rad) * 11;
          // gravity (down), normal (perpendicular out of ramp), friction (up-slope)
          const gv = { x: 0, y: M * G * 3 };
          const nv = { x: -Math.sin(rad) * normal * 3, y: -Math.cos(rad) * normal * 3 };
          const fr = { x: Math.cos(rad) * friction * 3, y: -Math.sin(rad) * friction * 3 };
          const arrow = (v: { x: number; y: number }, color: string, key: string) => {
            const len = Math.hypot(v.x, v.y);
            if (len < 1) return null;
            return (
              <line key={key} x1={cx} y1={cy} x2={cx + v.x} y2={cy + v.y} stroke={color} strokeWidth="2.5" markerEnd={`url(#ar-${key})`} />
            );
          };
          return (
            <g>
              <defs>
                {["g", "n", "f"].map((k) => (
                  <marker key={k} id={`ar-${k}`} markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
                    <path d="M0 0 L6 3 L0 6 Z" fill={k === "g" ? "#FF4757" : k === "n" ? "#2D7DFF" : "#7FB3FF"} />
                  </marker>
                ))}
              </defs>
              {arrow(gv, "#FF4757", "g")}
              {arrow(nv, "#2D7DFF", "n")}
              {arrow(fr, "#7FB3FF", "f")}
            </g>
          );
        })()}
      </svg>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <SliderControl label="Ramp angle θ" value={angle} min={0} max={60} step={1} unit="°" onChange={setAngle} />
        <SliderControl label="Friction coefficient μ" value={mu} min={0} max={1} step={0.05} unit="" onChange={setMu} format={(n) => n.toFixed(2)} />
      </div>
      <div className="mt-3 flex items-center gap-2">
        <SimButton onClick={release} active={running}>{slides ? (running ? "Sliding…" : "Release") : "Won't slide"}</SimButton>
        <SimButton onClick={reset}>Reset</SimButton>
      </div>
      <div className="mt-3">
        <Readout
          items={[
            { label: "Along ramp mg·sinθ", value: `${along.toFixed(1)} N`, color: "#FF4757" },
            { label: "Normal mg·cosθ", value: `${normal.toFixed(1)} N`, color: "#2D7DFF" },
            { label: "Friction (max)", value: `${maxFriction.toFixed(1)} N`, color: "#7FB3FF" },
            { label: "Slides?", value: slides ? "Yes" : "No", color: slides ? "#9FB6D4" : "#9CA3AF" },
            { label: "Net force", value: `${netForce.toFixed(1)} N` },
            { label: "Acceleration", value: `${accel.toFixed(2)} m/s²`, color: "#9FB6D4" },
          ]}
        />
      </div>
      <p className="mt-2 text-xs text-neutron/50">It slides when tan θ &gt; μ. Then a = g(sin θ − μ cos θ), independent of mass.</p>
    </SimFrame>
  );
}
