import { useState } from "react";
import { SimFrame, SimButton } from "./SimControls";

/** count-along — tap each acorn once; the last number you say is how many. */
export function CountAlong() {
  const [total, setTotal] = useState(5);
  const [order, setOrder] = useState<number[]>([]); // indices in the order tapped

  const tap = (i: number) => {
    if (order.includes(i)) return;
    setOrder((o) => [...o, i]);
  };
  const reset = () => setOrder([]);
  const fresh = () => {
    setTotal(Math.floor(Math.random() * 8) + 3); // 3–10
    setOrder([]);
  };

  const count = order.length;
  const done = count === total;

  return (
    <SimFrame>
      <div className="mb-4 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-neutron/45">You have counted</p>
        <p className="font-display text-6xl font-bold tabular-nums" style={{ color: done ? "#2D7DFF" : "#9FB6D4" }}>
          {count}
        </p>
        {done && <p className="font-display font-semibold text-success">That's {total} acorns! 🎉</p>}
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {Array.from({ length: total }).map((_, i) => {
          const pos = order.indexOf(i);
          const counted = pos >= 0;
          return (
            <button
              key={i}
              onClick={() => tap(i)}
              className="relative grid h-14 w-14 place-items-center rounded-full text-3xl transition-all"
              style={{
                background: counted ? "rgba(45,125,255,0.15)" : "rgba(255,255,255,0.05)",
                border: counted ? "1.5px solid #2D7DFF" : "1px solid rgba(255,255,255,0.12)",
                transform: counted ? "scale(1.05)" : "scale(1)",
              }}
              aria-label={counted ? `Acorn ${pos + 1}, counted` : "Acorn, not counted"}
            >
              🌰
              {counted && (
                <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-success text-[0.7rem] font-bold text-space">
                  {pos + 1}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex justify-center gap-2">
        <SimButton onClick={reset}>Start over</SimButton>
        <SimButton onClick={fresh} active>New pile</SimButton>
      </div>
    </SimFrame>
  );
}
