import { useEffect, useRef, useState } from "react";
import { SimFrame, SliderControl, SimButton, Readout } from "./SimControls";

/**
 * motion-graphs — set initial velocity v₀ and constant acceleration a, then
 * watch the object move while its position–time and velocity–time graphs draw
 * in real time. Reinforces x(t)=v₀t+½at² and v(t)=v₀+at.
 */
const T_MAX = 6; // seconds shown on the graphs

export function MotionGraphs() {
  const [v0, setV0] = useState(4);
  const [a, setA] = useState(-1);
  const [t, setT] = useState(0);
  const [running, setRunning] = useState(false);
  const raf = useRef<number>();
  const last = useRef(0);

  useEffect(() => {
    if (!running) return;
    last.current = performance.now();
    const tick = () => {
      const now = performance.now();
      const dt = (now - last.current) / 1000;
      last.current = now;
      setT((prev) => {
        const nt = prev + dt;
        if (nt >= T_MAX) {
          setRunning(false);
          return T_MAX;
        }
        return nt;
      });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [running]);

  const x = (tt: number) => v0 * tt + 0.5 * a * tt * tt;
  const v = (tt: number) => v0 + a * tt;

  // Graph geometry
  const W = 150;
  const H = 90;
  const xs: number[] = [];
  for (let i = 0; i <= 60; i++) xs.push((i / 60) * T_MAX);
  const xVals = xs.map(x);
  const vVals = xs.map(v);
  const xMax = Math.max(1, ...xVals.map(Math.abs));
  const vMax = Math.max(1, ...vVals.map(Math.abs));
  const path = (vals: number[], scaleMax: number) =>
    vals
      .map((val, i) => {
        const px = (xs[i] / T_MAX) * W;
        const py = H / 2 - (val / scaleMax) * (H / 2 - 6);
        return `${i === 0 ? "M" : "L"}${px.toFixed(1)} ${py.toFixed(1)}`;
      })
      .join(" ");

  // position track marker (map x range symmetric around current span)
  const trackFrac = 0.5 + (x(t) / (xMax * 2 || 1)) * 0.9;

  function start() {
    setT(0);
    setRunning(true);
  }

  const Graph = ({ label, d, color, markY }: { label: string; d: string; color: string; markY: number }) => (
    <div className="flex-1">
      <p className="mb-1 text-[0.65rem] uppercase tracking-wide text-neutron/45">{label}</p>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} className="rounded-md bg-space/60">
        <line x1="0" y1={H / 2} x2={W} y2={H / 2} stroke="rgba(240,244,255,0.15)" strokeWidth="1" />
        <path d={d} fill="none" stroke={color} strokeWidth="2" />
        <circle cx={(t / T_MAX) * W} cy={markY} r="3" fill={color} />
      </svg>
    </div>
  );

  return (
    <SimFrame>
      {/* position track */}
      <div className="relative mb-4 h-12 rounded-lg border border-neutron/10 bg-space/60">
        <div className="absolute top-1/2 left-2 right-2 h-px -translate-y-1/2 bg-neutron/15" />
        <div
          className="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full"
          style={{
            left: `calc(${Math.max(2, Math.min(98, trackFrac * 100))}% - 10px)`,
            background: "radial-gradient(circle at 35% 30%, #fff, #1E90FF)",
            boxShadow: "0 0 12px #1E90FF",
          }}
        />
      </div>

      <div className="mb-4 flex gap-3">
        <Graph label="position x(t)" d={path(xVals, xMax)} color="#22D3A0" markY={H / 2 - (x(t) / xMax) * (H / 2 - 6)} />
        <Graph label="velocity v(t)" d={path(vVals, vMax)} color="#FFB800" markY={H / 2 - (v(t) / vMax) * (H / 2 - 6)} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <SliderControl label="Initial velocity v₀" value={v0} min={-10} max={10} step={0.5} unit="m/s" onChange={setV0} format={(n) => n.toFixed(1)} />
        <SliderControl label="Acceleration a" value={a} min={-5} max={5} step={0.5} unit="m/s²" onChange={setA} format={(n) => n.toFixed(1)} />
      </div>
      <div className="mt-3 flex items-center gap-2">
        <SimButton onClick={start} active={running}>{running ? "Running…" : "Play"}</SimButton>
        <SimButton onClick={() => { setRunning(false); setT(0); }}>Reset</SimButton>
      </div>
      <div className="mt-3">
        <Readout
          items={[
            { label: "Time", value: `${t.toFixed(2)} s` },
            { label: "Position", value: `${x(t).toFixed(1)} m`, color: "#22D3A0" },
            { label: "Velocity", value: `${v(t).toFixed(1)} m/s`, color: "#FFB800" },
          ]}
        />
      </div>
    </SimFrame>
  );
}
