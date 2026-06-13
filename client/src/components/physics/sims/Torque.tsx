import { useState } from "react";
import { SimFrame, SliderControl, Readout } from "./SimControls";

/**
 * torque-balance — a seesaw with a weight on each side of a pivot. Adjust each
 * mass and its distance from the pivot to see the torque τ = r·F on each side.
 * The plank tips toward the larger torque and balances exactly when
 * m₁d₁ = m₂d₂ (the law of the lever).
 */
const G = 9.8;

export function Torque() {
  const [m1, setM1] = useState(3);
  const [d1, setD1] = useState(2);
  const [m2, setM2] = useState(2);
  const [d2, setD2] = useState(3);

  const t1 = m1 * G * d1; // counter-clockwise (left side)
  const t2 = m2 * G * d2; // clockwise (right side)
  const net = t1 - t2;
  const balanced = Math.abs(net) < 0.05;
  // tilt angle (capped) — left heavier => left down (positive angle visually)
  const tilt = Math.max(-14, Math.min(14, (net / Math.max(t1, t2, 1)) * 14));

  const W = 320;
  const H = 170;
  const cx = W / 2;
  const pivotY = 120;
  const half = 120; // half-length of plank in px
  const rad = (tilt * Math.PI) / 180;

  // endpoints of the plank
  const lx = cx - half * Math.cos(rad);
  const ly = pivotY - half * Math.sin(rad) * -1; // left goes down when net>0
  const rx = cx + half * Math.cos(rad);
  const ry = pivotY + half * Math.sin(rad) * -1;

  // weight box positions along the plank (proportional to distance, max at end)
  const frac1 = d1 / 5;
  const frac2 = d2 / 5;
  const w1x = cx + (lx - cx) * frac1;
  const w1y = pivotY + (ly - pivotY) * frac1;
  const w2x = cx + (rx - cx) * frac2;
  const w2y = pivotY + (ry - pivotY) * frac2;
  const size = (m: number) => 8 + m * 2.5;

  return (
    <SimFrame>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} className="rounded-lg bg-space/60">
        {/* pivot triangle */}
        <polygon points={`${cx},${pivotY} ${cx - 14},${pivotY + 34} ${cx + 14},${pivotY + 34}`} fill="rgba(240,244,255,0.3)" />
        {/* plank */}
        <line x1={lx} y1={ly} x2={rx} y2={ry} stroke="rgba(240,244,255,0.6)" strokeWidth="5" strokeLinecap="round" />
        {/* left weight */}
        <rect x={w1x - size(m1) / 2} y={w1y - size(m1)} width={size(m1)} height={size(m1)} rx="2" fill="#7FB3FF" stroke="#0A0B14" strokeWidth="1.2" />
        <text x={w1x} y={w1y - size(m1) - 3} fontSize="9" textAnchor="middle" fill="#7FB3FF">{m1}kg</text>
        {/* right weight */}
        <rect x={w2x - size(m2) / 2} y={w2y - size(m2)} width={size(m2)} height={size(m2)} rx="2" fill="#FFB800" stroke="#0A0B14" strokeWidth="1.2" />
        <text x={w2x} y={w2y - size(m2) - 3} fontSize="9" textAnchor="middle" fill="#FFB800">{m2}kg</text>
        {/* status */}
        <text x={cx} y={20} fontSize="12" textAnchor="middle" fill={balanced ? "#22D3A0" : "#FF8C42"} fontWeight="bold">
          {balanced ? "Balanced" : net > 0 ? "Tips left" : "Tips right"}
        </text>
      </svg>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <SliderControl label="Left mass" value={m1} min={1} max={6} step={1} unit="kg" onChange={setM1} />
        <SliderControl label="Left distance" value={d1} min={1} max={5} step={0.5} unit="m" onChange={setD1} format={(n) => n.toFixed(1)} />
        <SliderControl label="Right mass" value={m2} min={1} max={6} step={1} unit="kg" onChange={setM2} />
        <SliderControl label="Right distance" value={d2} min={1} max={5} step={0.5} unit="m" onChange={setD2} format={(n) => n.toFixed(1)} />
      </div>
      <div className="mt-3">
        <Readout
          items={[
            { label: "Left torque r·F", value: `${t1.toFixed(1)} N·m`, color: "#7FB3FF" },
            { label: "Right torque r·F", value: `${t2.toFixed(1)} N·m`, color: "#FFB800" },
            { label: "Net torque", value: `${net.toFixed(1)} N·m`, color: balanced ? "#22D3A0" : "#FF8C42" },
          ]}
        />
      </div>
      <p className="mt-2 text-xs text-neutron/50">
        It balances when the torques match: $m_1 d_1 = m_2 d_2$. A small mass far out beats a big mass up close.
      </p>
    </SimFrame>
  );
}
