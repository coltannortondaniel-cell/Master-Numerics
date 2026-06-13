import { useEffect, useRef, useState } from "react";
import { SimFrame, SliderControl, SegmentedControl, SimButton, Readout } from "./SimControls";

/**
 * collision — two carts on a frictionless track. Set masses and speeds, choose
 * an elastic or perfectly inelastic collision, and watch total momentum stay
 * conserved through the impact: p = m1 v1 + m2 v2 is the same before and after.
 */
type Mode = "elastic" | "inelastic";

export function Collision() {
  const [m1, setM1] = useState(2);
  const [m2, setM2] = useState(1);
  const [v1, setV1] = useState(3);
  const [v2, setV2] = useState(-1);
  const [mode, setMode] = useState<Mode>("elastic");
  const [running, setRunning] = useState(false);

  // live positions/velocities
  const x1 = useRef(20);
  const x2 = useRef(80);
  const cv1 = useRef(v1);
  const cv2 = useRef(v2);
  const collided = useRef(false);
  const last = useRef(0);
  const raf = useRef<number>();
  const [, force] = useState(0);

  const pBefore = m1 * v1 + m2 * v2;

  function resolve() {
    const a = cv1.current;
    const b = cv2.current;
    if (mode === "inelastic") {
      const vf = (m1 * a + m2 * b) / (m1 + m2);
      cv1.current = vf;
      cv2.current = vf;
    } else {
      cv1.current = ((m1 - m2) * a + 2 * m2 * b) / (m1 + m2);
      cv2.current = ((m2 - m1) * b + 2 * m1 * a) / (m1 + m2);
    }
    collided.current = true;
  }

  useEffect(() => {
    if (!running) return;
    last.current = performance.now();
    const tick = () => {
      const now = performance.now();
      const dt = Math.min(0.04, (now - last.current) / 1000);
      last.current = now;
      const scale = 8; // position units per (m/s · s)
      x1.current += cv1.current * dt * scale;
      x2.current += cv2.current * dt * scale;
      // collision when carts meet
      const r1 = 6 + m1 * 2;
      const r2 = 6 + m2 * 2;
      if (!collided.current && x1.current + r1 >= x2.current - r2 && cv1.current > cv2.current) {
        resolve();
      }
      // stop when off-track
      if (x1.current < 2 || x2.current > 98 || x1.current > 98 || x2.current < 2) {
        setRunning(false);
      }
      force((n) => n + 1);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, mode, m1, m2]);

  function go() {
    x1.current = 20;
    x2.current = 80;
    cv1.current = v1;
    cv2.current = v2;
    collided.current = false;
    setRunning(true);
  }
  function reset() {
    setRunning(false);
    x1.current = 20;
    x2.current = 80;
    cv1.current = v1;
    cv2.current = v2;
    collided.current = false;
    force((n) => n + 1);
  }

  const pAfter = m1 * cv1.current + m2 * cv2.current;
  const W = 320;
  const H = 90;
  const trackY = 60;
  const px = (x: number) => (x / 100) * (W - 20) + 10;
  const r1 = 6 + m1 * 2;
  const r2 = 6 + m2 * 2;

  return (
    <SimFrame>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} className="rounded-lg bg-space/60">
        <line x1={6} y1={trackY + 14} x2={W - 6} y2={trackY + 14} stroke="rgba(240,244,255,0.35)" strokeWidth="1.5" />
        {/* cart 1 */}
        <g>
          <rect x={px(x1.current) - r1} y={trackY - r1 + 7} width={r1 * 2} height={r1 * 2} rx="3" fill="#7FB3FF" stroke="#0A0B14" strokeWidth="1.5" />
          <text x={px(x1.current)} y={trackY + 11} fontSize="9" textAnchor="middle" fill="#0A0B14" fontWeight="bold">{m1}</text>
        </g>
        {/* cart 2 */}
        <g>
          <rect x={px(x2.current) - r2} y={trackY - r2 + 7} width={r2 * 2} height={r2 * 2} rx="3" fill="#FFB800" stroke="#0A0B14" strokeWidth="1.5" />
          <text x={px(x2.current)} y={trackY + 11} fontSize="9" textAnchor="middle" fill="#0A0B14" fontWeight="bold">{m2}</text>
        </g>
      </svg>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <SliderControl label="Mass 1 (blue)" value={m1} min={1} max={5} step={1} unit="kg" onChange={(v) => { setM1(v); reset(); }} />
        <SliderControl label="Mass 2 (gold)" value={m2} min={1} max={5} step={1} unit="kg" onChange={(v) => { setM2(v); reset(); }} />
        <SliderControl label="Speed 1" value={v1} min={-4} max={4} step={1} unit="m/s" onChange={(v) => { setV1(v); reset(); }} />
        <SliderControl label="Speed 2" value={v2} min={-4} max={4} step={1} unit="m/s" onChange={(v) => { setV2(v); reset(); }} />
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <SegmentedControl
          label="Collision type"
          options={[{ value: "elastic", label: "Elastic" }, { value: "inelastic", label: "Stick together" }]}
          value={mode}
          onChange={(v) => { setMode(v); reset(); }}
        />
        <div className="ml-auto flex gap-2">
          <SimButton onClick={go} active={running}>{running ? "Running…" : "Launch"}</SimButton>
          <SimButton onClick={reset}>Reset</SimButton>
        </div>
      </div>
      <div className="mt-3">
        <Readout
          items={[
            { label: "Momentum before", value: `${pBefore.toFixed(1)} kg·m/s`, color: "#22D3A0" },
            { label: "Momentum now", value: `${pAfter.toFixed(1)} kg·m/s`, color: "#22D3A0" },
            { label: "Cart 1 v", value: `${cv1.current.toFixed(2)} m/s`, color: "#7FB3FF" },
            { label: "Cart 2 v", value: `${cv2.current.toFixed(2)} m/s`, color: "#FFB800" },
          ]}
        />
      </div>
      <p className="mt-2 text-xs text-neutron/50">
        Total momentum $p = m_1 v_1 + m_2 v_2$ is the <span className="text-success">same</span> before and after — collisions conserve momentum.
      </p>
    </SimFrame>
  );
}
