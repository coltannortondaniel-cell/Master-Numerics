import { useEffect, useRef } from "react";
import type { Compiled, Scope } from "../../lib/mathEval";

export interface PlotExpr {
  id: string;
  compiled: Compiled | null;
  kind: "yx" | "xy"; // y=f(x) or x=f(y)
  color: string;
  visible: boolean;
}

export interface Viewport {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}

interface Props {
  exprs: PlotExpr[];
  scope: Scope;
  view: Viewport;
  onView: (v: Viewport) => void;
  theme: "dark" | "light";
  canvasRef?: React.RefObject<HTMLCanvasElement>;
}

/** 1-2-5 "nice" gridline step for a given span and target count. */
function niceStep(span: number, target: number): number {
  const raw = span / target;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const norm = raw / mag;
  const step = norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10;
  return step * mag;
}

const fmt = (n: number) => {
  if (n === 0) return "0";
  if (Math.abs(n) >= 1e4 || Math.abs(n) < 1e-3) return n.toExponential(0);
  return parseFloat(n.toFixed(3)).toString();
};

export function Graph({ exprs, scope, view, onView, theme, canvasRef }: Props) {
  const innerRef = useRef<HTMLCanvasElement>(null);
  const ref = canvasRef ?? innerRef;
  const drag = useRef<{ x: number; y: number; view: Viewport } | null>(null);

  const colors =
    theme === "dark"
      ? { bg: "#0A0B14", grid: "rgba(240,244,255,0.07)", axis: "rgba(240,244,255,0.35)", text: "rgba(240,244,255,0.5)" }
      : { bg: "#F0F4FF", grid: "rgba(10,11,20,0.08)", axis: "rgba(10,11,20,0.45)", text: "rgba(10,11,20,0.55)" };

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const W = rect.width;
    const H = rect.height;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    const ctx = canvas.getContext("2d")!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const { xMin, xMax, yMin, yMax } = view;
    const sx = (x: number) => ((x - xMin) / (xMax - xMin)) * W;
    const sy = (y: number) => H - ((y - yMin) / (yMax - yMin)) * H;

    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, W, H);

    // Gridlines
    const xStep = niceStep(xMax - xMin, 10);
    const yStep = niceStep(yMax - yMin, 8);
    ctx.lineWidth = 1;
    ctx.font = "11px 'IBM Plex Mono', monospace";
    ctx.fillStyle = colors.text;

    ctx.strokeStyle = colors.grid;
    ctx.beginPath();
    for (let x = Math.ceil(xMin / xStep) * xStep; x <= xMax; x += xStep) {
      ctx.moveTo(sx(x), 0);
      ctx.lineTo(sx(x), H);
    }
    for (let y = Math.ceil(yMin / yStep) * yStep; y <= yMax; y += yStep) {
      ctx.moveTo(0, sy(y));
      ctx.lineTo(W, sy(y));
    }
    ctx.stroke();

    // Axes
    ctx.strokeStyle = colors.axis;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    const x0 = sx(0);
    const y0 = sy(0);
    if (x0 >= 0 && x0 <= W) { ctx.moveTo(x0, 0); ctx.lineTo(x0, H); }
    if (y0 >= 0 && y0 <= H) { ctx.moveTo(0, y0); ctx.lineTo(W, y0); }
    ctx.stroke();

    // Tick labels
    const labelY = Math.min(H - 4, Math.max(12, y0 + 14));
    for (let x = Math.ceil(xMin / xStep) * xStep; x <= xMax; x += xStep) {
      if (Math.abs(x) < xStep / 2) continue;
      ctx.fillText(fmt(x), sx(x) + 2, labelY);
    }
    const labelX = Math.min(W - 24, Math.max(4, x0 + 4));
    for (let y = Math.ceil(yMin / yStep) * yStep; y <= yMax; y += yStep) {
      if (Math.abs(y) < yStep / 2) continue;
      ctx.fillText(fmt(y), labelX, sy(y) - 3);
    }

    // Plot each expression
    const N = Math.ceil(W);
    for (const e of exprs) {
      if (!e.visible || !e.compiled) continue;
      ctx.strokeStyle = e.color;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      let pen = false;
      let prevScreen = 0;
      for (let px = 0; px <= N; px++) {
        let X: number, Y: number, screenA: number, screenB: number;
        if (e.kind === "yx") {
          X = xMin + (px / N) * (xMax - xMin);
          Y = e.compiled({ ...scope, x: X });
          screenA = sx(X);
          screenB = sy(Y);
        } else {
          // x = f(y): sample over y across the vertical pixels
          Y = yMin + (px / N) * (yMax - yMin);
          X = e.compiled({ ...scope, y: Y });
          screenA = sx(X);
          screenB = sy(Y);
        }
        const bad = !Number.isFinite(e.kind === "yx" ? Y : X);
        // Break the path on discontinuities (large jumps) or invalid values
        const jump = pen && Math.abs((e.kind === "yx" ? screenB : screenA) - prevScreen) > H * 0.9;
        if (bad || jump) {
          pen = false;
        } else {
          if (pen) ctx.lineTo(screenA, screenB);
          else { ctx.moveTo(screenA, screenB); pen = true; }
          prevScreen = e.kind === "yx" ? screenB : screenA;
        }
      }
      ctx.stroke();
    }
  }, [exprs, scope, view, theme, ref, colors.axis, colors.bg, colors.grid, colors.text]);

  // ── Interaction: wheel zoom (cursor-centred) + drag pan ──
  function onWheel(ev: React.WheelEvent) {
    ev.preventDefault();
    const canvas = ref.current!;
    const rect = canvas.getBoundingClientRect();
    const fx = (ev.clientX - rect.left) / rect.width;
    const fy = 1 - (ev.clientY - rect.top) / rect.height;
    const factor = ev.deltaY > 0 ? 1.1 : 1 / 1.1;
    const { xMin, xMax, yMin, yMax } = view;
    const cx = xMin + fx * (xMax - xMin);
    const cy = yMin + fy * (yMax - yMin);
    onView({
      xMin: cx - (cx - xMin) * factor,
      xMax: cx + (xMax - cx) * factor,
      yMin: cy - (cy - yMin) * factor,
      yMax: cy + (yMax - cy) * factor,
    });
  }

  function onPointerDown(ev: React.PointerEvent) {
    (ev.target as HTMLElement).setPointerCapture(ev.pointerId);
    drag.current = { x: ev.clientX, y: ev.clientY, view };
  }
  function onPointerMove(ev: React.PointerEvent) {
    if (!drag.current) return;
    const canvas = ref.current!;
    const rect = canvas.getBoundingClientRect();
    const dx = ((ev.clientX - drag.current.x) / rect.width) * (drag.current.view.xMax - drag.current.view.xMin);
    const dy = ((ev.clientY - drag.current.y) / rect.height) * (drag.current.view.yMax - drag.current.view.yMin);
    onView({
      xMin: drag.current.view.xMin - dx,
      xMax: drag.current.view.xMax - dx,
      yMin: drag.current.view.yMin + dy,
      yMax: drag.current.view.yMax + dy,
    });
  }
  function onPointerUp() {
    drag.current = null;
  }

  return (
    <canvas
      ref={ref}
      className="h-full w-full touch-none select-none"
      style={{ cursor: drag.current ? "grabbing" : "grab" }}
      onWheel={onWheel}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    />
  );
}
