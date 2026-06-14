import { useState } from "react";
import { SimFrame, SimButton, Readout } from "./SimControls";

/** compare-balance — add acorns to each pan; the heavier side tips down. */
export function CompareBalance() {
  const [left, setLeft] = useState(3);
  const [right, setRight] = useState(1);

  const diff = right - left; // >0 → right heavier
  const tilt = Math.max(-16, Math.min(16, diff * 4));
  const rel =
    left === right ? "equal" : left > right ? "left" : "right";

  const clamp = (n: number) => Math.max(0, Math.min(8, n));

  const Pan = ({ n, side }: { n: number; side: "left" | "right" }) => (
    <div className="flex flex-col items-center gap-2">
      <div className="grid h-20 w-24 grid-cols-3 content-end gap-0.5 rounded-b-xl border border-neutron/20 bg-white/5 p-1">
        {Array.from({ length: n }).map((_, i) => (
          <span key={i} className="text-center text-sm leading-none">🌰</span>
        ))}
      </div>
      <p className="font-mono text-lg font-bold tabular-nums" style={{ color: "#9FB6D4" }}>{n}</p>
      <div className="flex gap-1">
        <button
          className="h-7 w-7 rounded bg-white/10 font-bold hover:bg-white/20"
          onClick={() => (side === "left" ? setLeft((v) => clamp(v - 1)) : setRight((v) => clamp(v - 1)))}
          aria-label={`Remove from ${side}`}
        >
          −
        </button>
        <button
          className="h-7 w-7 rounded bg-cosmic/40 font-bold hover:bg-cosmic/60"
          onClick={() => (side === "left" ? setLeft((v) => clamp(v + 1)) : setRight((v) => clamp(v + 1)))}
          aria-label={`Add to ${side}`}
        >
          +
        </button>
      </div>
    </div>
  );

  return (
    <SimFrame>
      <div className="relative mx-auto h-44 w-full max-w-sm">
        {/* fulcrum */}
        <div className="absolute bottom-0 left-1/2 h-24 w-2 -translate-x-1/2 bg-neutron/20" />
        <div className="absolute bottom-0 left-1/2 h-3 w-20 -translate-x-1/2 rounded bg-neutron/20" />
        {/* beam */}
        <div
          className="absolute left-1/2 top-8 flex w-72 -translate-x-1/2 items-center justify-between transition-transform duration-500"
          style={{ transform: `translateX(-50%) rotate(${tilt}deg)` }}
        >
          <div className="h-1 flex-1 rounded bg-neutron/40" />
          <div className="absolute left-0 -translate-x-1/2 translate-y-6">
            <Pan n={left} side="left" />
          </div>
          <div className="absolute right-0 translate-x-1/2 translate-y-6">
            <Pan n={right} side="right" />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Readout
          items={[
            { label: "Left", value: String(left) },
            {
              label: "Compare",
              value: rel === "equal" ? "Equal" : rel === "left" ? "Left has more" : "Right has more",
              color: rel === "equal" ? "#2D7DFF" : "#9FB6D4",
            },
            { label: "Right", value: String(right) },
          ]}
        />
      </div>
      {rel === "equal" && (
        <p className="mt-2 text-center text-sm text-success">⚖️ Balanced! Both sides are equal.</p>
      )}
      <div className="mt-3 flex justify-center">
        <SimButton onClick={() => { setLeft(3); setRight(1); }}>Reset</SimButton>
      </div>
    </SimFrame>
  );
}
