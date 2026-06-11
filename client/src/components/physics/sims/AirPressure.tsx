import { useState } from "react";
import { SimFrame, SliderControl, Readout } from "./SimControls";

/**
 * air-pressure — air has weight, so the higher you climb the less of it presses
 * down. A sealed balloon swells as the outside pressure drops.
 */
const P0 = 101.3; // kPa at sea level
const H = 8; // km scale height

export function AirPressure() {
  const [alt, setAlt] = useState(0); // km
  const p = P0 * Math.exp(-alt / H);
  const balloon = Math.min(6, P0 / p); // Boyle's law: volume ∝ 1/pressure
  const radius = 26 * Math.cbrt(balloon);

  // marker position on a 0–30 km gauge
  const topPct = 100 - (alt / 30) * 100;

  return (
    <SimFrame>
      <div className="grid grid-cols-[80px_1fr] gap-4">
        {/* altitude gauge */}
        <div className="relative h-52 w-full rounded-lg bg-gradient-to-b from-[#0b1e3a] via-[#1e6fb8] to-[#9fd4ff]">
          <div
            className="absolute left-0 right-0 flex items-center"
            style={{ top: `calc(${topPct}% - 8px)` }}
          >
            <div className="h-0.5 w-full bg-neutron" />
            <span className="absolute right-1 -top-4 font-mono text-[0.65rem] text-neutron">
              {alt.toFixed(0)}km
            </span>
          </div>
          <span className="absolute bottom-1 left-1 font-mono text-[0.6rem] text-white/70">sea level</span>
          <span className="absolute top-1 left-1 font-mono text-[0.6rem] text-space/70">space</span>
        </div>

        {/* balloon */}
        <div className="grid place-items-center rounded-lg border border-neutron/10 bg-space/50">
          <div className="flex flex-col items-center">
            <div
              className="rounded-full bg-gradient-to-br from-[#FF6E9C] to-[#b83a66] shadow-glow transition-all duration-300"
              style={{ width: radius * 2, height: radius * 2.2 }}
            />
            <div className="h-3 w-px bg-neutron/40" />
            <p className="mt-1 text-xs text-neutron/50">sealed balloon</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <SliderControl
          label="Altitude"
          value={alt}
          min={0}
          max={30}
          step={0.5}
          unit="km"
          onChange={setAlt}
          format={(v) => v.toFixed(1)}
        />
      </div>
      <div className="mt-3">
        <Readout
          items={[
            { label: "Pressure", value: `${p.toFixed(1)} kPa`, color: "#4FB6FF" },
            { label: "% of sea level", value: `${Math.round((p / P0) * 100)}%` },
            { label: "Balloon volume", value: `${balloon.toFixed(1)}×`, color: "#FF6E9C" },
          ]}
        />
      </div>
      <p className="mt-2 text-xs text-neutron/50">
        At the cruising height of a jet (~10 km) less than a third of the atmosphere is still above
        you — which is why cabins must be pressurised.
      </p>
    </SimFrame>
  );
}
