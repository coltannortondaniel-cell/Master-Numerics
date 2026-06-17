import { useEffect, useMemo, useRef, type KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import { Atom, Sigma, ArrowRight, Lock, Check } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import type { WorldSummary, ContinueTarget } from "../../lib/physics";
import { CelestialBody, BODY_KIND } from "./CelestialBody";
import { ProgressRing } from "../ui/ProgressRing";
import { StarRating } from "../ui/StarRating";
import { useWarp } from "./WarpTransition";

interface Props {
  worlds: WorldSummary[];
  continueTarget: ContinueTarget | null;
  basePath: string; // "/journey"
  subject: "physics" | "math";
}

const PREMIUM = "#4DA3FF";
const WHITE = "#ECEEF3";

type WorldState = "done" | "current" | "locked";

/** Body diameter grows with path order — the voyage's mass progression. */
function bodySize(i: number, n: number): number {
  return Math.round(70 + (i / Math.max(1, n - 1)) * 120); // 70 → 190px
}

function SubjectToggle({ subject }: { subject: "physics" | "math" }) {
  const items = [
    { key: "physics", label: "Physics", to: "/journey", icon: <Atom size={16} /> },
    { key: "math", label: "Math", to: "/city", icon: <Sigma size={16} /> },
  ] as const;
  return (
    <div className="inline-flex rounded-full border border-line/15 bg-base/60 p-1">
      {items.map((it) => {
        const active = it.key === subject;
        return (
          <Link key={it.key} to={it.to}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              active ? "bg-accent text-on-accent" : "text-fg/60 hover:text-fg"
            }`}
            aria-current={active ? "page" : undefined}>
            {it.icon}{it.label}
          </Link>
        );
      })}
    </div>
  );
}

export function StarChart({ worlds, continueTarget, basePath, subject }: Props) {
  const { warp } = useWarp();
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<HTMLButtonElement>(null);

  // Order worlds, gate them, and lay out a winding flight path.
  const { nodes, width, height } = useMemo(() => {
    const sorted = [...worlds].sort((a, b) => a.orderIndex - b.orderIndex);
    let foundCurrent = false;
    const gap = 96;
    const baseY = 300;
    const amp = 130;
    let x = 80;
    const placed = sorted.map((w, i) => {
      const done = w.lessonCount > 0 && w.completedCount === w.lessonCount;
      let state: WorldState;
      if (done) state = "done";
      else if (!foundCurrent) { state = "current"; foundCurrent = true; }
      else state = "locked";
      const size = bodySize(i, sorted.length);
      const cx = x + size / 2;
      const cy = baseY + amp * Math.sin(i * 0.7);
      x += size + gap;
      const ratio = w.lessonCount ? w.completedCount / w.lessonCount : 0;
      return { w, i, state, size, cx, cy, ratio };
    });
    return { nodes: placed, width: x + 80, height: baseY + amp + 160 };
  }, [worlds]);

  // Bring the current body into view on mount.
  useEffect(() => {
    currentRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", inline: "center", block: "nearest" });
  }, [reduce, nodes]);

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) return;
    const btns = Array.from(trackRef.current?.querySelectorAll<HTMLButtonElement>("button[data-body]:not([disabled])") ?? []);
    const idx = btns.indexOf(document.activeElement as HTMLButtonElement);
    if (idx === -1) return;
    e.preventDefault();
    const fwd = e.key === "ArrowRight" || e.key === "ArrowDown";
    const next = fwd ? Math.min(idx + 1, btns.length - 1) : Math.max(idx - 1, 0);
    btns[next]?.focus();
    btns[next]?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", inline: "center", block: "nearest" });
  }

  const curName = nodes.find((n) => n.state === "current")?.w.name ?? nodes[nodes.length - 1]?.w.name ?? "";

  return (
    <div className="mx-auto max-w-6xl">
      <a href="#current-body"
        className="sr-only rounded bg-accent px-3 py-2 text-sm font-semibold text-on-accent focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50">
        Skip to your current destination
      </a>
      <p className="sr-only" role="status" aria-live="polite">
        {`Physics voyage: ${nodes.length} destinations, currently approaching ${curName}.`}
      </p>

      {/* header */}
      <div className="mb-6 flex flex-col items-center gap-4 text-center">
        <SubjectToggle subject={subject} />
        <div>
          <h1 className="font-display text-3xl font-bold sm:text-4xl">Physics Voyage</h1>
          <p className="mx-auto mt-1 max-w-md text-sm text-fg/55">
            Chart a course deeper into space — each destination a new object, growing in scale from a launch pad to a black hole.
          </p>
        </div>
        {continueTarget && (
          <button
            onClick={() => warp(`${basePath}/${continueTarget.worldSlug}/${continueTarget.lessonSlug}`, WHITE)}
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition-transform hover:scale-[1.02] active:scale-95">
            Resume · {continueTarget.title}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        )}
      </div>

      {/* the chart — horizontally scrollable voyage */}
      <div
        ref={trackRef}
        onKeyDown={onKeyDown}
        className="relative overflow-x-auto overflow-y-hidden rounded-2xl border border-line/10 bg-base/30"
        aria-label="Star chart. Use arrow keys to move between destinations."
      >
        <div className="relative" style={{ width, height }}>
          {/* dashed flight trajectory */}
          <svg className="absolute inset-0 pointer-events-none" width={width} height={height} aria-hidden>
            <polyline
              points={nodes.map((n) => `${n.cx},${n.cy}`).join(" ")}
              fill="none" stroke="rgba(236,238,243,0.18)" strokeWidth={1.5} strokeDasharray="2 8" strokeLinecap="round"
            />
          </svg>

          {nodes.map((n) => {
            const { w, state, size, cx, cy, ratio } = n;
            const locked = state === "locked";
            const stars = state === "done" ? 3 : ratio >= 0.66 ? 2 : ratio > 0 ? 1 : 0;
            const ringColor = state === "current" ? PREMIUM : WHITE;
            return (
              <div key={w.slug} className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                style={{ left: cx, top: cy, width: size + 40 }}>
                {/* unit label above */}
                <span className="mb-1 max-w-[180px] truncate font-mono text-[0.6rem] uppercase tracking-[0.18em] text-fg/45">
                  {w.subtitle.split("·").pop()?.trim()}
                </span>

                <button
                  data-body
                  ref={state === "current" ? currentRef : undefined}
                  id={state === "current" ? "current-body" : undefined}
                  type="button"
                  disabled={locked}
                  onClick={() => warp(`${basePath}/${w.slug}`, WHITE)}
                  aria-label={`${w.name}: ${w.subtitle}. ${w.completedCount} of ${w.lessonCount} lessons complete.${locked ? " Locked." : ""}${state === "current" ? " You are here." : ""}`}
                  className={`relative grid place-items-center rounded-full transition-transform ${locked ? "cursor-not-allowed" : "hover:scale-105 active:scale-95"}`}
                  style={{ width: size, height: size }}
                >
                  {/* progress ring */}
                  <span className="absolute inset-0">
                    <ProgressRing value={ratio} size={size} stroke={Math.max(3, size * 0.03)} color={ringColor} trackColor="rgba(236,238,243,0.1)" />
                  </span>
                  {/* the body */}
                  <CelestialBody kind={BODY_KIND[w.slug] ?? "moon"} size={Math.round(size * 0.82)} uid={w.slug} dim={locked} />

                  {/* state badges */}
                  {state === "done" && (
                    <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-accent text-on-accent">
                      <Check size={14} strokeWidth={3} />
                    </span>
                  )}
                  {locked && (
                    <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-surface2 text-fg/60">
                      <Lock size={12} />
                    </span>
                  )}
                  {state === "current" && !reduce && (
                    <span className="absolute -inset-1.5 rounded-full animate-pulse" style={{ border: `2px solid ${PREMIUM}` }} />
                  )}
                </button>

                {/* name + scale + stars below */}
                <div className="mt-2 flex flex-col items-center text-center">
                  <span className="max-w-[180px] truncate font-display text-sm font-bold">{w.name}</span>
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-fg/40">
                    {w.gradeRange} · {w.scaleLabel}
                  </span>
                  {stars > 0 && <StarRating count={stars} size={13} className="mt-0.5" />}
                  {state === "current" && (
                    <span className="mt-1 rounded-full px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide"
                      style={{ background: PREMIUM, color: "#04050a" }}>
                      You are here
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-fg/40">Scroll sideways, or use the arrow keys, to travel the voyage.</p>
    </div>
  );
}
