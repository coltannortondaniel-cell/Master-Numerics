import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import type { GraphAnswer } from "../../../../lib/physics";
import { samplePlot } from "../../../../lib/grader";

interface Props {
  answer: GraphAnswer;
  value: string | undefined;
  onChange: (v: string) => void;
  disabled?: boolean;
  graded?: boolean;
  correct?: boolean;
}

const W = 320;
const H = 220;
const PAD = 24;

/**
 * Sketch-the-curve canvas. The learner drags a row of nodes up and down to
 * trace a graph; the result is graded locally against the target function.
 * Deterministic (fixed node x-positions), and works with mouse and touch.
 */
export function DrawGraphInput({ answer, value, onChange, disabled, graded, correct }: Props) {
  const variable = answer.variable ?? "x";
  const [lo, hi] = answer.domain ?? [-5, 5];
  const n = Math.max(3, answer.samples ?? 9);

  const xs = useMemo(
    () => Array.from({ length: n }, (_, i) => lo + ((hi - lo) * i) / (n - 1)),
    [lo, hi, n]
  );

  // Visible vertical range, derived from the target so the scale is usable.
  // (Scale only — the curve's shape is not drawn until after grading.)
  const [yMin, yMax] = useMemo(() => {
    const pts = samplePlot(answer.expr, [lo, hi], 40, variable).map((p) => p.y).filter(Number.isFinite);
    if (pts.length === 0) return [-5, 5];
    let mn = Math.min(...pts);
    let mx = Math.max(...pts);
    const span = Math.max(1, mx - mn);
    mn -= Math.max(1, span * 0.6);
    mx += Math.max(1, span * 0.6);
    return [mn, mx];
  }, [answer.expr, lo, hi, variable]);

  const startY = useMemo(() => Math.min(Math.max(0, yMin), yMax), [yMin, yMax]);

  const [ys, setYs] = useState<number[]>(() => {
    if (typeof value === "string") {
      try {
        const p = JSON.parse(value);
        if (Array.isArray(p?.ys) && p.ys.length === n) return p.ys;
      } catch {
        /* fall through to default */
      }
    }
    return xs.map(() => startY);
  });

  // Make the question "answered" as soon as it renders, so Check is enabled
  // even if the learner submits the flat starting line.
  useEffect(() => {
    if (value === undefined) onChange(JSON.stringify({ xs, ys }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const svgRef = useRef<SVGSVGElement>(null);
  const dragging = useRef(false);

  const sx = (x: number) => PAD + ((x - lo) / (hi - lo)) * (W - 2 * PAD);
  const sy = (y: number) => H - PAD - ((y - yMin) / (yMax - yMin)) * (H - 2 * PAD);

  function commit(next: number[]) {
    setYs(next);
    onChange(JSON.stringify({ xs, ys: next }));
  }

  function pointerToNode(e: ReactPointerEvent) {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const vx = ((e.clientX - rect.left) / rect.width) * W;
    const vy = ((e.clientY - rect.top) / rect.height) * H;
    // nearest node by x
    const xVal = lo + ((vx - PAD) / (W - 2 * PAD)) * (hi - lo);
    let idx = Math.round(((xVal - lo) / (hi - lo)) * (n - 1));
    idx = Math.max(0, Math.min(n - 1, idx));
    // graph-y from pixel-y, clamped to the visible range
    let yVal = yMin + ((H - PAD - vy) / (H - 2 * PAD)) * (yMax - yMin);
    yVal = Math.max(yMin, Math.min(yMax, yVal));
    const next = ys.slice();
    next[idx] = yVal;
    commit(next);
  }

  function onDown(e: ReactPointerEvent) {
    if (disabled || graded) return;
    dragging.current = true;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    pointerToNode(e);
  }
  function onMove(e: ReactPointerEvent) {
    if (!dragging.current || disabled || graded) return;
    pointerToNode(e);
  }
  function onUp() {
    dragging.current = false;
  }

  const linePath = ys.map((y, i) => `${i ? "L" : "M"}${sx(xs[i]).toFixed(1)} ${sy(y).toFixed(1)}`).join(" ");
  const target = graded ? samplePlot(answer.expr, [lo, hi], 60, variable) : [];
  const targetPath = target
    .filter((p) => Number.isFinite(p.y) && p.y >= yMin && p.y <= yMax)
    .map((p, i) => `${i ? "L" : "M"}${sx(p.x).toFixed(1)} ${sy(p.y).toFixed(1)}`)
    .join(" ");

  const stroke = graded ? (correct ? "#22C55E" : "#F0506E") : "#2D7DFF";
  const x0 = sx(0), y0 = sy(0);

  return (
    <div>
      <p className="mb-2 font-mono text-[0.7rem] uppercase tracking-widest text-fg/40">
        Drag the points to sketch the curve
      </p>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full max-w-md touch-none select-none rounded-xl border border-line/15 bg-base/40"
        style={{ cursor: disabled || graded ? "default" : "ns-resize" }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        role="application"
        aria-label="Sketch the curve by dragging the points up and down"
      >
        {/* axes */}
        {lo <= 0 && hi >= 0 && <line x1={x0} y1={PAD} x2={x0} y2={H - PAD} stroke="currentColor" className="text-line/25" />}
        {yMin <= 0 && yMax >= 0 && <line x1={PAD} y1={y0} x2={W - PAD} y2={y0} stroke="currentColor" className="text-line/25" />}

        {/* target curve, revealed after grading */}
        {targetPath && <path d={targetPath} fill="none" stroke="#22C55E" strokeWidth="2" strokeDasharray="5 4" opacity={0.7} />}

        {/* learner's polyline */}
        <path d={linePath} fill="none" stroke={stroke} strokeWidth="2.5" />

        {/* draggable nodes */}
        {ys.map((y, i) => (
          <circle key={i} cx={sx(xs[i])} cy={sy(y)} r={6} fill={stroke} stroke="#0A0B14" strokeWidth={1.5} />
        ))}
      </svg>
      {graded && targetPath && (
        <p className="mt-1 text-xs text-fg/45">The dashed green line is the target curve.</p>
      )}
    </div>
  );
}
