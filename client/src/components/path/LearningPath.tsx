import { useMemo, useRef, type KeyboardEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Atom, Sigma, ArrowRight, Flag } from "lucide-react";
import type { WorldSummary, ContinueTarget } from "../../lib/physics";
import { PathNode, type NodeState } from "./PathNode";

interface Props {
  worlds: WorldSummary[];
  continueTarget: ContinueTarget | null;
  /** "/journey" for physics, "/city" for math. */
  basePath: string;
  subject: "physics" | "math";
}

/** Stars from a practice best-score once the lesson is done. */
function starsForScore(done: boolean, score: number | null): number {
  if (!done) return 0;
  if (score != null && score >= 90) return 3;
  if (score != null && score >= 70) return 2;
  return 1;
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
          <Link
            key={it.key}
            to={it.to}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              active ? "bg-accent text-on-accent" : "text-fg/60 hover:text-fg"
            }`}
            aria-current={active ? "page" : undefined}
          >
            {it.icon}
            {it.label}
          </Link>
        );
      })}
    </div>
  );
}

/** Larger end-of-unit milestone that visually gates the next biome. */
function Checkpoint({ name, accent, complete, onClick }: { name: string; accent: string; complete: boolean; onClick: () => void }) {
  return (
    <div className="flex flex-col items-center gap-2 pt-1">
      <button
        type="button"
        onClick={onClick}
        data-path-node
        aria-label={`${name} checkpoint, ${complete ? "region cleared" : "not yet complete"}`}
        className="grid h-16 w-16 place-items-center rounded-2xl border-2 transition-transform hover:scale-105 active:scale-95"
        style={{ borderColor: accent, background: complete ? accent : "transparent", color: complete ? "#060708" : accent }}
      >
        <Flag size={26} strokeWidth={2.4} />
      </button>
      <p className="font-display text-xs font-semibold text-fg/70">
        {complete ? "Region cleared" : "Region checkpoint"}
      </p>
    </div>
  );
}

export function LearningPath({ worlds, continueTarget, basePath, subject }: Props) {
  const navigate = useNavigate();

  // Flatten into biomes of lesson nodes. The first not-yet-completed lesson
  // (globally, in order) is "current"; everything after it is locked.
  const biomes = useMemo(() => {
    const sorted = [...worlds].sort((a, b) => a.orderIndex - b.orderIndex);
    let foundCurrent = false;
    return sorted.map((w) => {
      const lessons = w.lessons.map((l) => {
        const done = l.status === "COMPLETED" || l.status === "MASTERED";
        let state: NodeState;
        if (done) state = "done";
        else if (!foundCurrent) {
          state = "current";
          foundCurrent = true;
        } else state = "locked";
        const mastery = done ? 1 : l.status === "STARTED" ? 0.12 : 0;
        return { ...l, state, mastery, stars: starsForScore(done, l.bestScore) };
      });
      const total = w.lessons.length;
      const doneCount = w.lessons.filter((l) => l.status === "COMPLETED" || l.status === "MASTERED").length;
      return { world: w, lessons, total, doneCount, unitComplete: total > 0 && doneCount === total };
    });
  }, [worlds]);

  const currentBiomeIdx = Math.max(0, biomes.findIndex((b) => b.lessons.some((l) => l.state === "current")));
  const curName = biomes[currentBiomeIdx]?.world.name ?? "";

  const pathRef = useRef<HTMLDivElement>(null);
  // Up/Down arrows roving-focus between every node + checkpoint (WCAG).
  function onPathKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    const btns = Array.from(
      pathRef.current?.querySelectorAll<HTMLButtonElement>("button[data-path-node]:not([disabled])") ?? []
    );
    const idx = btns.indexOf(document.activeElement as HTMLButtonElement);
    if (idx === -1) return;
    e.preventDefault();
    const next = e.key === "ArrowDown" ? Math.min(idx + 1, btns.length - 1) : Math.max(idx - 1, 0);
    btns[next]?.focus();
  }

  const heading = subject === "physics" ? "Physics Journey" : "Math City";
  const blurb =
    subject === "physics"
      ? "A journey deeper into space — one lesson at a time, from near-Earth motion to the violent frontier."
      : "Numbers in the world around you — from counting to the calculus of the city.";

  return (
    <div className="mx-auto max-w-2xl">
      <a
        href="#current-unit"
        className="sr-only rounded bg-accent px-3 py-2 text-sm font-semibold text-on-accent focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
      >
        Skip to your current unit
      </a>
      <p className="sr-only" role="status" aria-live="polite">
        {`${heading}: ${biomes.length} regions, currently in ${curName}.`}
      </p>

      {/* Header: subject toggle + continue CTA */}
      <div className="mb-8 flex flex-col items-center gap-4 text-center">
        <SubjectToggle subject={subject} />
        <div>
          <h1 className="font-display text-3xl font-bold sm:text-4xl">{heading}</h1>
          <p className="mx-auto mt-1 max-w-md text-sm text-fg/55">{blurb}</p>
        </div>
        {continueTarget && (
          <Link
            to={`${basePath}/${continueTarget.worldSlug}/${continueTarget.lessonSlug}`}
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent shadow-glow transition-transform hover:scale-[1.02] active:scale-95"
          >
            Continue · {continueTarget.title}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>

      {/* The continuous winding path through every biome */}
      <div ref={pathRef} onKeyDown={onPathKeyDown}>
        {biomes.map((b, bi) => (
          <section
            key={b.world.slug}
            id={bi === currentBiomeIdx ? "current-unit" : undefined}
            aria-label={`${b.world.name} — ${b.world.subtitle}`}
            className="relative pb-8"
          >
            {/* biome header */}
            <div className="mb-6 flex flex-col items-center gap-1 text-center">
              <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-fg/50">
                {b.world.subtitle}
              </span>
              <h2 className="font-display text-xl font-bold">{b.world.name}</h2>
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-fg/40">
                {b.world.gradeRange} · {b.doneCount}/{b.total} complete
              </span>
            </div>

            {/* dashed spine + lesson nodes + checkpoint */}
            <div className="relative">
              <div
                aria-hidden
                className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 border-l-2 border-dashed border-line/12"
              />
              <ol className="relative flex flex-col items-center gap-10">
                {b.lessons.map((l, li) => (
                  <motion.li
                    key={l.slug}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.3 }}
                  >
                    <PathNode
                      name={l.title}
                      mastery={l.mastery}
                      stars={l.stars}
                      state={l.state}
                      accent={l.state === "current" ? "#4DA3FF" : "#ECEEF3"}
                      badge={String(li + 1)}
                      onClick={() => navigate(`${basePath}/${b.world.slug}/${l.slug}`)}
                    />
                  </motion.li>
                ))}
                <li>
                  <Checkpoint
                    name={b.world.name}
                    accent="#ECEEF3"
                    complete={b.unitComplete}
                    onClick={() => navigate(`${basePath}/${b.world.slug}`)}
                  />
                </li>
              </ol>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
