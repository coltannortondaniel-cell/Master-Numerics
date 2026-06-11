import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { compile, freeVars, type Compiled, type Scope } from "../lib/mathEval";
import { Graph, type PlotExpr, type Viewport } from "../components/calculator/Graph";
import { ExpressionList, type ExprRow } from "../components/calculator/ExpressionList";
import { Sliders, type Param } from "../components/calculator/Sliders";
import { Logo } from "../components/ui/Logo";

const PALETTE = ["#6B21D6", "#1E90FF", "#FFB800", "#22D3A0", "#FF4757", "#FF6E9C", "#5AD1E6", "#B07CFF"];

let idSeq = 1;
const newId = () => `e${idSeq++}`;

const DEFAULT_ROWS: ExprRow[] = [
  { id: newId(), raw: "y = a x^2", color: PALETTE[0], visible: true },
  { id: newId(), raw: "y = sin(x)", color: PALETTE[1], visible: true },
];

interface SavedState {
  e: { r: string; c: string; v: boolean }[];
  p: Record<string, number>;
  vw: Viewport;
}

function parseRow(raw: string): { kind: "yx" | "xy"; body: string } {
  if (raw.includes("=")) {
    const i = raw.indexOf("=");
    const left = raw.slice(0, i).trim().toLowerCase();
    const right = raw.slice(i + 1);
    if (left === "x") return { kind: "xy", body: right };
    return { kind: "yx", body: right };
  }
  return { kind: "yx", body: raw };
}

export default function Calculator() {
  const [rows, setRows] = useState<ExprRow[]>(DEFAULT_ROWS);
  const [paramVals, setParamVals] = useState<Record<string, number>>({ a: 1 });
  const [view, setView] = useState<Viewport>({ xMin: -10, xMax: 10, yMin: -6.5, yMax: 6.5 });
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const loadedHash = useRef(false);

  // Restore shared state from the URL hash, once.
  useEffect(() => {
    if (loadedHash.current) return;
    loadedHash.current = true;
    const h = window.location.hash.slice(1);
    if (!h) return;
    try {
      const s: SavedState = JSON.parse(decodeURIComponent(atob(h)));
      setRows(s.e.map((x) => ({ id: newId(), raw: x.r, color: x.c, visible: x.v })));
      setParamVals(s.p ?? {});
      if (s.vw) setView(s.vw);
    } catch {
      /* malformed hash — ignore */
    }
  }, []);

  // Compiled plot expressions + detected parameters.
  const { plot, params } = useMemo(() => {
    const names = new Set<string>();
    const plot: PlotExpr[] = rows.map((row) => {
      const { kind, body } = parseRow(row.raw);
      for (const v of freeVars(body)) if (v !== "x" && v !== "y") names.add(v);
      let compiled: Compiled | null = null;
      try {
        compiled = body.trim() ? compile(body) : null;
      } catch {
        compiled = null;
      }
      return { id: row.id, compiled, kind, color: row.color, visible: row.visible };
    });
    const params: Param[] = [...names].sort().map((name) => ({
      name,
      value: paramVals[name] ?? 1,
      min: -10,
      max: 10,
      step: 0.1,
    }));
    return { plot, params };
  }, [rows, paramVals]);

  const scope: Scope = useMemo(() => {
    const s: Scope = {};
    for (const p of params) s[p.name] = p.value;
    return s;
  }, [params]);

  function updateRow(id: string, patch: Partial<ExprRow>) {
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }
  function addRow() {
    setRows((rs) => [
      ...rs,
      { id: newId(), raw: "", color: PALETTE[rs.length % PALETTE.length], visible: true },
    ]);
  }
  function removeRow(id: string) {
    setRows((rs) => (rs.length > 1 ? rs.filter((r) => r.id !== id) : rs));
  }

  function zoom(factor: number) {
    setView((v) => {
      const cx = (v.xMin + v.xMax) / 2;
      const cy = (v.yMin + v.yMax) / 2;
      return {
        xMin: cx - (cx - v.xMin) * factor,
        xMax: cx + (v.xMax - cx) * factor,
        yMin: cy - (cy - v.yMin) * factor,
        yMax: cy + (v.yMax - cy) * factor,
      };
    });
  }
  function reset() {
    setView({ xMin: -10, xMax: 10, yMin: -6.5, yMax: 6.5 });
  }

  function share() {
    const state: SavedState = {
      e: rows.map((r) => ({ r: r.raw, c: r.color, v: r.visible })),
      p: paramVals,
      vw: view,
    };
    const hash = btoa(encodeURIComponent(JSON.stringify(state)));
    const url = `${window.location.origin}/calculator#${hash}`;
    window.history.replaceState(null, "", `#${hash}`);
    void navigator.clipboard?.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  function exportPng() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "numpad-graph.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  const btn =
    "rounded-lg border border-neutron/15 px-3 py-1.5 text-sm font-semibold text-neutron hover:border-cosmic hover:text-white transition-colors";

  return (
    <div className="flex h-screen flex-col bg-space">
      {/* Toolbar */}
      <header className="flex items-center justify-between gap-3 border-b border-neutron/10 px-4 py-3">
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="text-sm text-neutron/60 hover:text-neutron">←</Link>
          <Logo />
          <span className="hidden font-mono text-xs uppercase tracking-widest text-cosmic sm:inline">
            NumPad Pro
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className={btn} onClick={() => zoom(1 / 1.4)} aria-label="Zoom in">＋</button>
          <button className={btn} onClick={() => zoom(1.4)} aria-label="Zoom out">－</button>
          <button className={btn} onClick={reset}>Reset</button>
          <button className={btn} onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}>
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <button className={btn} onClick={exportPng}>Export</button>
          <button className={`${btn} border-cosmic/50 text-cosmic`} onClick={share}>
            {copied ? "Copied!" : "Share"}
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <aside className="flex max-h-[42vh] w-full flex-col border-b border-neutron/10 bg-[#0c0e1a] md:max-h-none md:w-[340px] md:border-b-0 md:border-r">
          <div className="min-h-0 flex-1 overflow-y-auto">
            <ExpressionList rows={rows} onChange={updateRow} onAdd={addRow} onRemove={removeRow} />
          </div>
          <Sliders
            params={params}
            onChange={(name, value) => setParamVals((p) => ({ ...p, [name]: value }))}
          />
        </aside>
        <main className="relative min-h-0 flex-1">
          <Graph exprs={plot} scope={scope} view={view} onView={setView} theme={theme} canvasRef={canvasRef} />
        </main>
      </div>
    </div>
  );
}
