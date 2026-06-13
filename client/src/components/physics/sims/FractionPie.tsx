import { useState } from "react";
import { SimFrame, SliderControl, Readout } from "./SimControls";

/**
 * fraction-pie — slice a pie into equal parts and shade some of them. Shows the
 * fraction numerator/denominator alongside its decimal and percent forms, so a
 * fraction, a decimal, and a percent are seen as three views of one amount.
 */
export function FractionPie() {
  const [den, setDen] = useState(4); // denominator (equal slices)
  const [num, setNum] = useState(3); // numerator (shaded slices)

  const n = Math.min(num, den);
  const decimal = n / den;
  const percent = decimal * 100;

  const R = 70;
  const cx = 90;
  const cy = 90;

  // build the shaded wedge paths
  const slice = (i: number) => {
    const a0 = (i / den) * 2 * Math.PI - Math.PI / 2;
    const a1 = ((i + 1) / den) * 2 * Math.PI - Math.PI / 2;
    const x0 = cx + R * Math.cos(a0);
    const y0 = cy + R * Math.sin(a0);
    const x1 = cx + R * Math.cos(a1);
    const y1 = cy + R * Math.sin(a1);
    const large = a1 - a0 > Math.PI ? 1 : 0;
    return `M ${cx} ${cy} L ${x0} ${y0} A ${R} ${R} 0 ${large} 1 ${x1} ${y1} Z`;
  };

  function setDenClamped(d: number) {
    setDen(d);
    if (num > d) setNum(d);
  }

  return (
    <SimFrame>
      <svg width="100%" viewBox="0 0 180 180" className="mx-auto block max-w-[220px]">
        {Array.from({ length: den }).map((_, i) => (
          <path
            key={i}
            d={slice(i)}
            fill={i < n ? "#FF9E5C" : "rgba(255,255,255,0.05)"}
            stroke="#0A0B14"
            strokeWidth="1.5"
          />
        ))}
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(240,244,255,0.3)" strokeWidth="1.5" />
      </svg>

      <div className="my-3 text-center">
        <span className="inline-flex flex-col items-center font-mono text-2xl leading-none">
          <span className="text-solar">{n}</span>
          <span className="my-1 h-px w-6 bg-neutron/60" />
          <span className="text-neutron">{den}</span>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <SliderControl label="Equal slices (denominator)" value={den} min={2} max={12} step={1} onChange={setDenClamped} />
        <SliderControl label="Shaded slices (numerator)" value={n} min={0} max={den} step={1} onChange={setNum} />
      </div>
      <div className="mt-3">
        <Readout
          items={[
            { label: "Fraction", value: `${n}/${den}`, color: "#FF9E5C" },
            { label: "Decimal", value: decimal.toFixed(4).replace(/0+$/, "").replace(/\.$/, ".0") },
            { label: "Percent", value: `${percent.toFixed(1)}%` },
          ]}
        />
      </div>
      <p className="mt-2 text-xs text-neutron/50">
        A fraction, a decimal, and a percent are three ways to write the same part of a whole.
      </p>
    </SimFrame>
  );
}
