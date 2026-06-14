import { useEffect, useRef, useState } from "react";
import { SimFrame, SliderControl, SimButton, Readout } from "./SimControls";

/**
 * energy-bars — drop a ball from a chosen height and watch gravitational
 * potential energy convert into kinetic energy while the total stays constant.
 * Demonstrates conservation of mechanical energy: U = mgh, K = ½mv², E = U + K.
 */
const G = 9.8;
const M = 1; // kg

export function EnergyBars() {
  const [h0, setH0] = useState(5); // initial height (m)
  const [h, setH] = useState(5); // current height
  const [running, setRunning] = useState(false);
  const v = useRef(0);
  const last = useRef(0);
  const raf = useRef<number>();

  const U = M * G * h; // current potential energy
  const K = 0.5 * M * v.current * v.current; // current kinetic energy
  const E = M * G * h0; // total (conserved)

  useEffect(() => {
    if (!running) return;
    last.current = performance.now();
    const tick = () => {
      const now = performance.now();
      const dt = Math.min(0.04, (now - last.current) / 1000);
      last.current = now;
      v.current += G * dt;
      setH((prev) => {
        const nh = prev - v.current * dt;
        if (nh <= 0) {
          setRunning(false);
          v.current = Math.sqrt(2 * G * h0); // impact speed
          return 0;
        }
        return nh;
      });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, h0]);

  function drop() {
    v.current = 0;
    setH(h0);
    setRunning(true);
  }
  function reset() {
    setRunning(false);
    v.current = 0;
    setH(h0);
  }
  function setStart(v0: number) {
    setH0(v0);
    setRunning(false);
    v.current = 0;
    setH(v0);
  }

  // SVG: ball drop column on the left, energy bars on the right
  const W = 320;
  const H = 200;
  const maxH = 10;
  const groundY = 175;
  const topY = 20;
  const ballX = 45;
  const by = groundY - (h / maxH) * (groundY - topY);

  const bar = (val: number, x: number, color: string) => {
    const frac = E > 0 ? val / E : 0;
    const bh = frac * (groundY - topY);
    return { x, y: groundY - bh, w: 38, h: bh, color };
  };
  const uBar = bar(U, 150, "#7FB3FF");
  const kBar = bar(K, 205, "#9FB6D4");
  const eBar = bar(E, 260, "#2D7DFF");

  return (
    <SimFrame>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} className="rounded-lg bg-space/60">
        {/* ground */}
        <line x1={10} y1={groundY} x2={W - 10} y2={groundY} stroke="rgba(240,244,255,0.4)" strokeWidth="1.5" />
        {/* drop track */}
        <line x1={ballX} y1={topY} x2={ballX} y2={groundY} stroke="rgba(240,244,255,0.12)" strokeWidth="1.5" strokeDasharray="3 3" />
        {/* ball */}
        <circle cx={ballX} cy={by} r="9" fill="#F0F4FF" stroke="#0A0B14" strokeWidth="1.5" />
        {/* bars */}
        {[uBar, kBar, eBar].map((b, i) => (
          <rect key={i} x={b.x} y={b.y} width={b.w} height={Math.max(0, b.h)} rx="2" fill={b.color} opacity="0.85" />
        ))}
        {/* bar labels */}
        <text x={uBar.x + 19} y={groundY + 14} fontSize="9" textAnchor="middle" fill="#7FB3FF">PE</text>
        <text x={kBar.x + 19} y={groundY + 14} fontSize="9" textAnchor="middle" fill="#9FB6D4">KE</text>
        <text x={eBar.x + 19} y={groundY + 14} fontSize="9" textAnchor="middle" fill="#2D7DFF">Total</text>
      </svg>

      <div className="mt-4">
        <SliderControl label="Drop height" value={h0} min={1} max={10} step={0.5} unit="m" onChange={setStart} format={(n) => n.toFixed(1)} />
      </div>
      <div className="mt-3 flex items-center gap-2">
        <SimButton onClick={drop} active={running}>{running ? "Falling…" : "Drop"}</SimButton>
        <SimButton onClick={reset}>Reset</SimButton>
      </div>
      <div className="mt-3">
        <Readout
          items={[
            { label: "Height", value: `${h.toFixed(2)} m` },
            { label: "Speed", value: `${v.current.toFixed(2)} m/s` },
            { label: "PE = mgh", value: `${U.toFixed(1)} J`, color: "#7FB3FF" },
            { label: "KE = ½mv²", value: `${K.toFixed(1)} J`, color: "#9FB6D4" },
            { label: "Total E", value: `${E.toFixed(1)} J`, color: "#2D7DFF" },
          ]}
        />
      </div>
      <p className="mt-2 text-xs text-neutron/50">
        As the ball falls, PE turns into KE — but the <span className="text-success">total</span> never changes. Energy is conserved (mass = 1 kg).
      </p>
    </SimFrame>
  );
}
