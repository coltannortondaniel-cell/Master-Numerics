import { useState } from "react";
import { SimFrame, SliderControl, Readout } from "./SimControls";

/**
 * sky-scatter — sunlight scatters off air molecules; blue scatters most. With
 * the Sun overhead the sky is blue, but a low Sun sends light through far more
 * air, scattering the blue away and leaving a red sunset.
 */
export function SkyScatter() {
  const [elev, setElev] = useState(75); // degrees above horizon
  const rad = (elev * Math.PI) / 180;
  const pathLen = 1 / Math.max(0.08, Math.sin(rad)); // air masses

  // Sky colour shifts from day-blue to sunset-orange as the Sun lowers.
  const tBlue = Math.min(1, Math.max(0, (elev - 8) / 60));
  const top = elev > 25 ? "#1E6FB8" : "#2a3a6a";
  const horizon =
    elev > 40 ? "#7FB8FF" : elev > 18 ? "#FF9E5C" : "#FF5A3C";

  const W = 320;
  const Hh = 170;
  const sunCx = W / 2 + (90 - elev) * 1.4;
  const sunCy = Hh - 30 - Math.sin(rad) * 120;

  return (
    <SimFrame>
      <svg width="100%" viewBox={`0 0 ${W} ${Hh}`} className="rounded-lg">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={top} />
            <stop offset="100%" stopColor={horizon} />
          </linearGradient>
        </defs>
        <rect x={0} y={0} width={W} height={Hh - 24} fill="url(#sky)" />
        {/* ground */}
        <rect x={0} y={Hh - 24} width={W} height={24} fill="#0d2a14" />
        {/* sun */}
        <circle cx={Math.max(20, Math.min(W - 20, sunCx))} cy={Math.max(16, sunCy)} r={16} fill={elev > 20 ? "#FFF6D8" : "#FF7A3C"} opacity={0.95} />
        {/* scattered dots (more blue dispersion when sun is high) */}
        <g fill="#cfe6ff" opacity={tBlue * 0.5}>
          {Array.from({ length: 14 }).map((_, i) => (
            <circle key={i} cx={(i * 53) % W} cy={(i * 37) % (Hh - 40)} r={1.4} />
          ))}
        </g>
        <text x={W / 2} y={Hh - 8} textAnchor="middle" fontSize="11" fill="#cfe6ff">
          horizon
        </text>
      </svg>

      <div className="mt-4">
        <SliderControl
          label="Sun elevation"
          value={elev}
          min={2}
          max={90}
          step={1}
          unit="°"
          onChange={setElev}
        />
      </div>
      <div className="mt-3">
        <Readout
          items={[
            { label: "Air to cross", value: `${pathLen.toFixed(1)}× `, color: "#9FB6D4" },
            { label: "Sky", value: elev > 25 ? "Blue" : elev > 12 ? "Orange" : "Deep red", color: horizon },
            { label: "Time feel", value: elev > 60 ? "Midday" : elev > 20 ? "Afternoon" : "Sunset" },
          ]}
        />
      </div>
      <p className="mt-2 text-xs text-neutron/50">
        Blue light has a short wavelength, so it scatters about ten times more than red. A low Sun's
        light runs a long gauntlet of air — the blue is scattered away before it reaches you.
      </p>
    </SimFrame>
  );
}
