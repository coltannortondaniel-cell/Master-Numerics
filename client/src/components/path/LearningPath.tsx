import { useMemo, useRef, type KeyboardEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Atom, Sigma, ArrowRight } from "lucide-react";
import type { WorldSummary, ContinueTarget } from "../../lib/physics";
import { PathNode, type NodeState } from "./PathNode";

interface Props {
  worlds: WorldSummary[];
  continueTarget: ContinueTarget | null;
  /** "/journey" for physics, "/city" for math. */
  basePath: string;
  subject: "physics" | "math";
}

/** Stars from a mastery fraction: >0 → 1, ≥60% → 2, 100% → 3. */
function starsFor(mastery: number): number {
  if (mastery >= 1) return 3;
  if (mastery >= 0.6) return 2;
  if (mastery > 0) return 1;
  return 0;
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
              active ? "bg-accent text-white" : "text-fg/60 hover:text-fg"
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

export function LearningPath({ worlds, continueTarget, basePath, subject }: Props) {
  const navigate = useNavigate();

  const nodes = useMemo(() => {
    const sorted = [...worlds].sort((a, b) => a.orderIndex - b.orderIndex);
    // The "current" unit is the first populated one that isn't fully complete.
    const currentIndex = sorted.findIndex(
      (w) => w.lessonCount > 0 && w.completedCount < w.lessonCount
    );
    const curIdx = currentIndex === -1 ? sorted.length - 1 : currentIndex;

    return sorted.map((w, i) => {
      const mastery = w.lessonCount > 0 ? w.completedCount / w.lessonCount : 0;
      const fullyDone = w.lessonCount > 0 && w.completedCount >= w.lessonCount;
      // Unlock in order: units before the current one are done; the current one
      // is active; everything after is locked (unless it already has progress).
      let state: NodeState;
      if (w.lessonCount === 0) state = "soon";
      else if (fullyDone) state = "done";
      else if (i === curIdx) state = "current";
      else if (i < curIdx || w.completedCount > 0) state = "done";
      else state = "locked";
      return { world: w, mastery, stars: starsFor(mastery), state };
    });
  }, [worlds]);

  const olRef = useRef<HTMLOListElement>(null);
  const currentIdx = Math.max(0, nodes.findIndex((n) => n.state === "current"));
  const curName = nodes[currentIdx]?.world.name ?? "";

  // Up/Down arrows roving-focus between path nodes (WCAG keyboard operability).
  function onPathKeyDown(e: KeyboardEvent<HTMLOListElement>) {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    const btns = Array.from(
      olRef.current?.querySelectorAll<HTMLButtonElement>("button[data-path-node]:not([disabled])") ?? []
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
      ? "From the everyday to the edge of the universe — one unit at a time."
      : "Numbers in the world around you — from counting to the calculus of the city.";

  return (
    <div className="mx-auto max-w-2xl">
      <a
        href="#current-unit"
        className="sr-only rounded bg-accent px-3 py-2 text-sm font-semibold text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
      >
        Skip to your current unit
      </a>
      {/* Polite announcement of where the learner is on the path. */}
      <p className="sr-only" role="status" aria-live="polite">
        {`${heading}: unit ${currentIdx + 1} of ${nodes.length}, current unit ${curName}.`}
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
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02] active:scale-95"
          >
            Continue · {continueTarget.title}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>

      {/* The winding path */}
      <div className="relative py-4">
        {/* dashed spine behind the nodes */}
        <div
          aria-hidden
          className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 border-l-2 border-dashed border-line/12"
        />
        <ol
          ref={olRef}
          onKeyDown={onPathKeyDown}
          aria-label={`${heading} units, in order`}
          className="relative flex flex-col items-center gap-12"
        >
          {nodes.map(({ world, mastery, stars, state }, i) => (
            <motion.li
              key={world.slug}
              id={state === "current" ? "current-unit" : undefined}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: Math.min(i, 6) * 0.04 }}
            >
              <PathNode
                name={world.name}
                gradeRange={world.gradeRange}
                mastery={mastery}
                stars={stars}
                state={state}
                badge={String(i + 1)}
                onClick={() => navigate(`${basePath}/${world.slug}`)}
              />
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  );
}
