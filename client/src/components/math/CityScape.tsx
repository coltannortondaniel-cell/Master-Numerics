import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Sun, Moon, Lock } from "lucide-react";
import type { WorldSummary, ContinueTarget } from "../../lib/physics";
import { useWarp } from "../physics/WarpTransition";

/** Deterministic building height per district — a varied, rising skyline. */
function buildingHeight(i: number, total: number): number {
  const base = 150 + (i / total) * 230; // taller as the curriculum advances
  const wobble = ((i * 37) % 5) * 14; // gentle variation
  return Math.round(base + wobble);
}

function Building({ world, index, total, night }: { world: WorldSummary; index: number; total: number; night: boolean }) {
  const { warp } = useWarp();
  const enterable = world.lessonCount > 0;
  const ratio = world.lessonCount ? world.completedCount / world.lessonCount : 0;
  const h = buildingHeight(index, total);
  const w = 132;
  const cols = 4;
  const rows = Math.max(4, Math.round(h / 34));
  const totalWindows = cols * rows;
  const litCount = Math.round(ratio * totalWindows);

  const onEnter = () => enterable && warp(`/city/${world.slug}`, world.palette.accent);

  return (
    <div className="group relative flex shrink-0 flex-col items-center justify-end" style={{ width: w + 28 }}>
      {/* hover peek card */}
      <div className="pointer-events-none absolute bottom-full z-20 mb-2 w-56 -translate-y-1 rounded-xl border border-neutron/15 bg-[#0c0e1a]/95 p-3 text-center opacity-0 shadow-2xl transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
        <p className="font-display text-lg font-semibold">{world.name}</p>
        <p className="text-xs text-neutron/55">{world.subtitle}</p>
        <p className="mt-1 font-mono text-[0.65rem] text-neutron/40">{world.scaleLabel} · {world.gradeRange}</p>
        <p className="mt-2 text-xs">
          {enterable ? (
            <span style={{ color: world.palette.accent }}>{world.completedCount}/{world.lessonCount} lessons · enter →</span>
          ) : (
            <span className="text-neutron/40">Opening soon</span>
          )}
        </p>
      </div>

      <button
        onClick={onEnter}
        disabled={!enterable}
        aria-label={enterable ? `Enter ${world.name}` : `${world.name} (opening soon)`}
        className="relative origin-bottom transition-transform duration-300 group-hover:-translate-y-1 disabled:cursor-not-allowed"
        style={{ width: w, height: h }}
      >
        {/* building body */}
        <div
          className="absolute inset-0 rounded-t-md"
          style={{
            background: enterable
              ? `linear-gradient(180deg, #20243a, #0d1020)`
              : `linear-gradient(180deg, #14161f, #0b0c12)`,
            border: "1px solid rgba(240,244,255,0.08)",
            borderBottom: "none",
          }}
        />
        {/* rooftop accent */}
        <div
          className="absolute -top-1 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full"
          style={{ background: enterable ? world.palette.accent : "#2a2d45", opacity: enterable ? 0.9 : 0.4 }}
        />
        {/* windows */}
        <div className="absolute inset-x-3 bottom-10 top-4 grid gap-1.5" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
          {Array.from({ length: totalWindows }).map((_, k) => {
            const lit = enterable && k >= totalWindows - litCount;
            return (
              <span
                key={k}
                className="rounded-[1px]"
                style={{
                  background: lit ? (night ? "#FFE9A8" : "#bcd4ff") : night ? "rgba(240,244,255,0.06)" : "rgba(10,11,20,0.35)",
                  boxShadow: lit && night ? "0 0 6px rgba(255,233,168,0.7)" : "none",
                  aspectRatio: "1 / 1.3",
                }}
              />
            );
          })}
        </div>
        {/* door / sign plate */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center">
          <div
            className="mb-1 w-[88%] rounded-sm px-1 py-1 text-center"
            style={{ background: "rgba(0,0,0,0.5)", borderTop: `2px solid ${enterable ? world.palette.accent : "#2a2d45"}` }}
          >
            <span className="block truncate font-display text-[0.72rem] font-semibold leading-tight text-neutron/90">
              {world.name}
            </span>
          </div>
        </div>
        {!enterable && (
          <Lock size={14} className="absolute right-2 top-2 text-neutron/30" />
        )}
      </button>

      {/* lamppost */}
      <div className="relative mt-0 h-0">
        {night && enterable && (
          <span className="absolute -top-2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#FFE9A8] shadow-[0_0_10px_3px_rgba(255,233,168,0.5)]" />
        )}
      </div>
    </div>
  );
}

export function CityScape({
  worlds,
  continueTarget,
}: {
  worlds: WorldSummary[];
  continueTarget: ContinueTarget | null;
}) {
  const [night, setNight] = useState(true);
  const reduce = useReducedMotion();

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-5 flex items-end justify-between gap-4 px-1">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-neutron/50">Math Journey</p>
          <h1 className="mt-1 font-display text-3xl sm:text-4xl font-bold">The City of Numbers</h1>
          <p className="mt-1 text-sm text-neutron/55">Stroll the districts — hover a building to peek, click to enter.</p>
        </div>
        <button
          onClick={() => setNight((n) => !n)}
          className="flex items-center gap-2 rounded-full border border-neutron/15 px-3 py-1.5 text-sm text-neutron/70 hover:border-neutron/40"
        >
          {night ? <Moon size={15} /> : <Sun size={15} />}
          {night ? "Night" : "Day"}
        </button>
      </div>

      {continueTarget && (
        <Link
          to={`/city/${continueTarget.worldSlug}/${continueTarget.lessonSlug}`}
          className="mb-4 flex items-center justify-between gap-4 rounded-xl border border-neutron/15 bg-white/[0.03] px-5 py-3 transition-all hover:border-neutron/30"
        >
          <div className="min-w-0">
            <p className="font-mono text-[0.7rem] uppercase tracking-widest text-neutron/45">Continue</p>
            <p className="truncate font-display font-semibold">{continueTarget.title}</p>
          </div>
          <span className="shrink-0 text-sm font-semibold text-neutron/70">Resume →</span>
        </Link>
      )}

      {/* The cityscape */}
      <div
        className="relative overflow-x-auto overflow-y-hidden rounded-2xl border border-neutron/10"
        style={{
          background: night
            ? "linear-gradient(180deg,#0a0c18 0%,#141832 55%,#2a2350 100%)"
            : "linear-gradient(180deg,#9fc4f0 0%,#c9d8ec 55%,#e8eef6 100%)",
        }}
      >
        {/* sky elements */}
        {night && (
          <div className="pointer-events-none absolute inset-0">
            {Array.from({ length: 40 }).map((_, i) => (
              <span
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${(i * 53) % 100}%`,
                  top: `${(i * 29) % 55}%`,
                  width: i % 5 === 0 ? 2 : 1,
                  height: i % 5 === 0 ? 2 : 1,
                  opacity: 0.6,
                }}
              />
            ))}
          </div>
        )}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute right-12 top-8 rounded-full"
          style={{
            width: 56, height: 56,
            background: night ? "radial-gradient(circle at 35% 30%,#fff,#d8dce6)" : "radial-gradient(circle,#fff6d8,#ffd86e)",
            boxShadow: night ? "0 0 30px rgba(216,220,230,0.5)" : "0 0 50px rgba(255,184,0,0.6)",
          }}
          animate={reduce ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        {/* buildings row */}
        <div className="relative flex items-end gap-2 px-8 pb-0 pt-32" style={{ minWidth: worlds.length * 160 }}>
          {worlds.map((w, i) => (
            <Building key={w.slug} world={w} index={i} total={worlds.length} night={night} />
          ))}
        </div>
        {/* street */}
        <div className="relative h-6" style={{ background: night ? "#0a0b12" : "#5b6472" }}>
          <div className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2" style={{ backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,0.4) 0 16px, transparent 16px 34px)" }} />
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-neutron/35">← scroll to walk the whole city →</p>
    </div>
  );
}
