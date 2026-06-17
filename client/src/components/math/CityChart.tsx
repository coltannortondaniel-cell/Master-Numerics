import { useEffect, useMemo, useRef, type KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import { Atom, Sigma, ArrowRight, Lock, Check } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import type { WorldSummary, ContinueTarget } from "../../lib/physics";
import { CityBuilding, BUILDING_KIND } from "./CityBuilding";
import { ProgressRing } from "../ui/ProgressRing";
import { StarRating } from "../ui/StarRating";
import { useWarp } from "../physics/WarpTransition";

interface Props {
  worlds: WorldSummary[];
  continueTarget: ContinueTarget | null;
  basePath: string; // "/city"
  subject: "physics" | "math";
}

const PREMIUM = "#4DA3FF";
const WHITE = "#ECEEF3";
const W = 680;
const AMP = 120;

type WorldState = "done" | "current" | "locked";

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

export function CityChart({ worlds, continueTarget, basePath, subject }: Props) {
  const { warp } = useWarp();
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<HTMLButtonElement>(null);

  // Order, gate, and lay districts out bottom-to-top along a winding street.
  const { nodes, height } = useMemo(() => {
    const sorted = [...worlds].sort((a, b) => a.orderIndex - b.orderIndex);
    const n = sorted.length;
    let foundCurrent = false;
    const items = sorted.map((w, i) => {
      const done = w.lessonCount > 0 && w.completedCount === w.lessonCount;
      let state: WorldState;
      if (done) state = "done";
      else if (!foundCurrent) { state = "current"; foundCurrent = true; }
      else state = "locked";
      const bw = 86 + (i / Math.max(1, n - 1)) * 70; // 86 → 156
      const bh = bw * (220 / 120);
      const cx = W / 2 + AMP * Math.sin(i * 0.8);
      return { w, i, state, bw, bh, cx, cy: 0, ratio: w.lessonCount ? w.completedCount / w.lessonCount : 0 };
    });
    // place from the top (last) downward so order 1 sits at the bottom
    let cursor = 70;
    for (let k = n - 1; k >= 0; k--) {
      const tileH = items[k].bh + 84;
      items[k].cy = cursor + tileH / 2;
      cursor += tileH + 36;
    }
    return { nodes: items, height: cursor + 40 };
  }, [worlds]);

  useEffect(() => {
    currentRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  }, [reduce, nodes]);

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) return;
    const btns = Array.from(trackRef.current?.querySelectorAll<HTMLButtonElement>("button[data-body]:not([disabled])") ?? []);
    const idx = btns.indexOf(document.activeElement as HTMLButtonElement);
    if (idx === -1) return;
    e.preventDefault();
    // buttons are in DOM order = path order (bottom→top); Up climbs to next
    const up = e.key === "ArrowUp" || e.key === "ArrowRight";
    const next = up ? Math.min(idx + 1, btns.length - 1) : Math.max(idx - 1, 0);
    btns[next]?.focus();
    btns[next]?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  }

  const curName = nodes.find((n) => n.state === "current")?.w.name ?? nodes[0]?.w.name ?? "";

  return (
    <div className="mx-auto max-w-3xl">
      <a href="#current-district"
        className="sr-only rounded bg-accent px-3 py-2 text-sm font-semibold text-on-accent focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50">
        Skip to your current district
      </a>
      <p className="sr-only" role="status" aria-live="polite">
        {`Math city: ${nodes.length} districts, currently in ${curName}.`}
      </p>

      <div className="mb-6 flex flex-col items-center gap-4 text-center">
        <SubjectToggle subject={subject} />
        <div>
          <h1 className="font-display text-3xl font-bold sm:text-4xl">The Math City</h1>
          <p className="mx-auto mt-1 max-w-md text-sm text-fg/55">
            Climb the city from the ground-level park to its highest towers — each district a new neighborhood of mathematics.
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

      <div ref={trackRef} onKeyDown={onKeyDown}
        className="relative max-h-[78vh] overflow-auto rounded-2xl border border-line/10 bg-base/30"
        aria-label="City map. Use the up and down arrow keys to move between districts.">
        <div className="relative mx-auto" style={{ width: W, height }}>
          {/* winding street */}
          <svg className="absolute inset-0 pointer-events-none" width={W} height={height} aria-hidden>
            <polyline points={nodes.map((n) => `${n.cx},${n.cy}`).join(" ")}
              fill="none" stroke="rgba(236,238,243,0.16)" strokeWidth={2} strokeDasharray="2 9" strokeLinecap="round" />
          </svg>

          {nodes.map((n) => {
            const { w, state, bw, bh, cx, cy, ratio } = n;
            const locked = state === "locked";
            const stars = state === "done" ? 3 : ratio >= 0.66 ? 2 : ratio > 0 ? 1 : 0;
            return (
              <div key={w.slug} className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                style={{ left: cx, top: cy, width: bw + 80 }}>
                <span className="mb-1 max-w-[200px] truncate font-mono text-[0.6rem] uppercase tracking-[0.16em] text-fg/45">
                  {w.subtitle}
                </span>
                <button
                  data-body
                  ref={state === "current" ? currentRef : undefined}
                  id={state === "current" ? "current-district" : undefined}
                  type="button"
                  disabled={locked}
                  onClick={() => warp(`${basePath}/${w.slug}`, WHITE)}
                  aria-label={`${w.name}: ${w.subtitle}. ${w.completedCount} of ${w.lessonCount} lessons complete.${locked ? " Locked." : ""}${state === "current" ? " You are here." : ""}`}
                  className={`relative grid place-items-end rounded-xl transition-transform ${locked ? "cursor-not-allowed" : "hover:scale-[1.03] active:scale-95"}`}
                  style={{ width: bw, height: bh }}
                >
                  <CityBuilding kind={BUILDING_KIND[w.slug] ?? "school"} size={bw} uid={w.slug} dim={locked} />
                  {state === "current" && !reduce && (
                    <span className="absolute -inset-1.5 rounded-xl animate-pulse" style={{ border: `2px solid ${PREMIUM}` }} />
                  )}
                  {state === "done" && (
                    <span className="absolute right-0 top-0 grid h-6 w-6 place-items-center rounded-full bg-accent text-on-accent">
                      <Check size={14} strokeWidth={3} />
                    </span>
                  )}
                  {locked && (
                    <span className="absolute right-0 top-0 grid h-6 w-6 place-items-center rounded-full bg-surface2 text-fg/60">
                      <Lock size={12} />
                    </span>
                  )}
                </button>

                <div className="mt-2 flex flex-col items-center text-center">
                  <span className="max-w-[200px] truncate font-display text-sm font-bold">{w.name}</span>
                  <div className="mt-1 flex items-center gap-2">
                    <ProgressRing value={ratio} size={28} stroke={3} color={state === "current" ? PREMIUM : WHITE} trackColor="rgba(236,238,243,0.12)" />
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-fg/45">
                      {w.completedCount}/{w.lessonCount} · {w.gradeRange}
                    </span>
                  </div>
                  {stars > 0 && <StarRating count={stars} size={13} className="mt-1" />}
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
      <p className="mt-3 text-center text-xs text-fg/40">Scroll up to climb the city, or use the arrow keys.</p>
    </div>
  );
}
