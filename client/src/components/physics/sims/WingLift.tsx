import { useState } from "react";
import { SimFrame, SliderControl, Readout } from "./SimControls";

/**
 * wing-lift — lift grows with the square of airspeed and with the angle of
 * attack… until the wing stalls past ~15° and the airflow breaks away.
 */
export function WingLift() {
  const [aoa, setAoa] = useState(6); // angle of attack, degrees
  const [speed, setSpeed] = useState(60); // m/s

  const stalled = aoa > 15;
  // Simplified lift coefficient: linear rise, sharp drop after stall.
  const cl = stalled ? Math.max(0.2, 1.6 - (aoa - 15) * 0.12) : aoa * 0.1;
  const lift = 0.5 * 1.2 * speed * speed * 1 * cl; // ½ρv²·A·Cl  (A=1)
  const liftArrow = Math.min(90, lift / 60);

  const W = 320;
  const Hh = 160;

  return (
    <SimFrame>
      <svg width="100%" viewBox={`0 0 ${W} ${Hh}`} className="rounded-lg bg-gradient-to-b from-[#0b1e3a] to-[#1e6fb8]">
        {/* streamlines */}
        <g stroke="#bfe0ff" strokeWidth={1.5} fill="none" opacity={0.55}>
          {[40, 70, 100, 120].map((y) => (
            <path
              key={y}
              d={`M0 ${y} C 120 ${y - (stalled ? 0 : (120 - y) * 0.12)}, 200 ${
                y - (stalled ? -6 : (120 - y) * 0.12)
              }, ${W} ${y + (stalled ? 8 : 0)}`}
              strokeDasharray={stalled && y < 90 ? "4 4" : undefined}
            />
          ))}
        </g>
        {/* airfoil */}
        <g transform={`translate(${W / 2} 90) rotate(${-aoa})`}>
          <path d="M-60 0 C -40 -14, 40 -10, 60 0 C 40 6, -40 6, -60 0 Z" fill="#F0F4FF" />
        </g>
        {/* lift arrow */}
        <g transform={`translate(${W / 2} 90)`} stroke="#2D7DFF" strokeWidth={3} fill="none">
          <line x1={0} y1={0} x2={0} y2={-liftArrow} />
          <path d={`M-5 ${-liftArrow + 6} L0 ${-liftArrow} L5 ${-liftArrow + 6}`} />
        </g>
        {stalled && (
          <text x={W / 2} y={24} textAnchor="middle" fontSize="13" fill="#FF4757" fontWeight="bold">
            ⚠ STALL
          </text>
        )}
      </svg>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <SliderControl label="Angle of attack" value={aoa} min={0} max={22} step={1} unit="°" onChange={setAoa} />
        <SliderControl label="Airspeed" value={speed} min={10} max={120} step={1} unit="m/s" onChange={setSpeed} />
      </div>
      <div className="mt-3">
        <Readout
          items={[
            { label: "Lift", value: `${Math.round(lift)} N`, color: stalled ? "#FF4757" : "#2D7DFF" },
            { label: "Lift coeff.", value: cl.toFixed(2) },
            { label: "Status", value: stalled ? "Stalled" : "Flying", color: stalled ? "#FF4757" : "#2D7DFF" },
          ]}
        />
      </div>
      <p className="mt-2 text-xs text-neutron/50">
        Double the airspeed and lift quadruples (v²). Raise the nose too far, though, and the smooth
        airflow separates — the wing stalls and lift collapses.
      </p>
    </SimFrame>
  );
}
