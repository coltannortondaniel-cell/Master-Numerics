import { useMemo, useState } from "react";
import { SimFrame, SimButton, Readout } from "./SimControls";

/** shape-sorter — name each shape by counting its sides and corners. */
type Kind = "circle" | "triangle" | "square" | "rectangle";

const LABELS: Record<Kind, string> = {
  circle: "Circle",
  triangle: "Triangle",
  square: "Square",
  rectangle: "Rectangle",
};

function ShapeSvg({ kind, color }: { kind: Kind; color: string }) {
  const s = 96;
  const common = { fill: color, stroke: "#0A0B14", strokeWidth: 3 } as const;
  return (
    <svg width={s} height={s} viewBox="0 0 96 96">
      {kind === "circle" && <circle cx={48} cy={48} r={38} {...common} />}
      {kind === "triangle" && <polygon points="48,10 86,82 10,82" {...common} />}
      {kind === "square" && <rect x={14} y={14} width={68} height={68} rx={4} {...common} />}
      {kind === "rectangle" && <rect x={8} y={26} width={80} height={44} rx={4} {...common} />}
    </svg>
  );
}

const shuffle = <T,>(a: T[]) => [...a].sort(() => Math.random() - 0.5);

export function ShapeSorter() {
  const [queue, setQueue] = useState<Kind[]>(() =>
    shuffle(["circle", "triangle", "square", "rectangle", "triangle", "square"])
  );
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState<Kind | null>(null);

  const current = queue[idx];
  const finished = idx >= queue.length;
  const color = useMemo(
    () => ({ circle: "#1E90FF", triangle: "#FFB800", square: "#22D3A0", rectangle: "#FF6E9C" })[current ?? "circle"],
    [current]
  );

  function choose(kind: Kind) {
    if (finished) return;
    if (kind === current) {
      setScore((s) => s + 1);
      setWrong(null);
      setIdx((i) => i + 1);
    } else {
      setWrong(kind);
    }
  }

  function restart() {
    setQueue(shuffle(["circle", "triangle", "square", "rectangle", "triangle", "square"]));
    setIdx(0);
    setScore(0);
    setWrong(null);
  }

  return (
    <SimFrame>
      {finished ? (
        <div className="py-6 text-center">
          <p className="text-4xl">🏆</p>
          <p className="mt-2 font-display text-xl font-bold">All sorted!</p>
          <p className="text-neutron/60">You named {score} of {queue.length} shapes.</p>
          <div className="mt-4">
            <SimButton onClick={restart} active>Play again</SimButton>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center">
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-neutron/45">
              What shape is this?
            </p>
            <ShapeSvg kind={current} color={color} />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2">
            {(Object.keys(LABELS) as Kind[]).map((k) => (
              <button
                key={k}
                onClick={() => choose(k)}
                className={`rounded-lg border px-4 py-3 font-semibold transition-all ${
                  wrong === k
                    ? "border-alert bg-alert/15"
                    : "border-neutron/15 hover:border-cosmic hover:bg-white/5"
                }`}
              >
                {LABELS[k]}
              </button>
            ))}
          </div>
          {wrong && <p className="mt-3 text-center text-sm text-alert">Not quite — count the sides and try again.</p>}
          <div className="mt-4">
            <Readout
              items={[
                { label: "Shape", value: `${idx + 1} of ${queue.length}` },
                { label: "Correct", value: String(score), color: "#22D3A0" },
              ]}
            />
          </div>
        </>
      )}
    </SimFrame>
  );
}
