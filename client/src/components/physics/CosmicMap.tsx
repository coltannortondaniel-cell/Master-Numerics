import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import type { WorldSummary, ContinueTarget } from "../../lib/physics";
import { useWarp } from "./WarpTransition";
import { ProgressRing } from "../ui/ProgressRing";

/** Orb diameter grows gently with the cosmic scale to hint at the zoom-out. */
function orbSize(orderIndex: number): number {
  return 40 + Math.round((orderIndex / 18) * 44); // 40 → ~84px
}

function WorldNode({ world, index }: { world: WorldSummary; index: number }) {
  const { warp } = useWarp();
  const reduce = useReducedMotion();
  const enterable = world.lessonCount > 0;
  const ratio = world.lessonCount ? world.completedCount / world.lessonCount : 0;
  const done = world.lessonCount > 0 && world.completedCount === world.lessonCount;
  const size = orbSize(world.orderIndex);

  const orb = (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 32% 30%, ${world.palette.accent}, ${world.palette.glow} 72%, #05060c)`,
          boxShadow: enterable ? `0 0 28px ${world.palette.glow}aa` : "none",
          opacity: enterable ? 1 : 0.4,
        }}
      />
      {!reduce && enterable && (
        <div
          className="absolute -inset-1 rounded-full animate-pulse"
          style={{ border: `1px solid ${world.palette.accent}55` }}
        />
      )}
    </div>
  );

  const body = (
    <div className="flex items-center gap-4 flex-1 min-w-0">
      {orb}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-[0.7rem] text-neutron/40">
            {String(world.orderIndex).padStart(2, "0")}
          </span>
          <h3 className="font-display text-lg font-bold truncate">{world.name}</h3>
          <span className="font-mono text-[0.65rem] rounded bg-white/5 px-1.5 py-0.5 text-neutron/50">
            {world.gradeRange}
          </span>
        </div>
        <p className="text-sm text-neutron/55 truncate">{world.subtitle}</p>
        <p className="font-mono text-[0.7rem] text-neutron/35 mt-0.5">scale {world.scaleLabel}</p>
      </div>
      {enterable ? (
        <ProgressRing
          value={ratio}
          color={done ? "#22D3A0" : world.palette.accent}
        >
          <span className="text-neutron/70">
            {world.completedCount}/{world.lessonCount}
          </span>
        </ProgressRing>
      ) : (
        <span className="shrink-0 font-mono text-[0.65rem] uppercase tracking-widest text-neutron/35">
          Charting<br />soon
        </span>
      )}
    </div>
  );

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: Math.min(index, 8) * 0.04 }}
      className="relative pl-6"
    >
      {/* Spine connector */}
      <span
        className="absolute left-[7px] top-0 bottom-0 w-px"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(240,244,255,0.12), transparent)" }}
        aria-hidden
      />
      <span
        className="absolute left-[3px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full"
        style={{ background: enterable ? world.palette.accent : "#2a2d45" }}
        aria-hidden
      />
      {enterable ? (
        <button
          onClick={() => warp(`/journey/${world.slug}`, world.palette.accent)}
          className="glass w-full text-left px-4 py-4 transition-all duration-300 hover:border-cosmic/40 hover:shadow-glow focus-visible:shadow-glow"
          aria-label={`Enter ${world.name} (${world.completedCount} of ${world.lessonCount} lessons complete)`}
        >
          {body}
        </button>
      ) : (
        <div className="glass w-full px-4 py-4 opacity-70 cursor-not-allowed" aria-disabled>
          {body}
        </div>
      )}
    </motion.div>
  );
}

interface Props {
  worlds: WorldSummary[];
  continueTarget: ContinueTarget | null;
}

export function CosmicMap({ worlds, continueTarget }: Props) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="text-center mb-8">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-nebula">Physics Journey</p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold">Scale of the Cosmos</h1>
        <p className="mt-2 text-neutron/55 max-w-lg mx-auto">
          Eighteen worlds, from the dust of the Moon to the birth of the universe. Each location is
          a lesson — travel outward and the physics grows with you.
        </p>
      </div>

      {continueTarget && (
        <Link
          to={`/journey/${continueTarget.worldSlug}/${continueTarget.lessonSlug}`}
          className="glass mb-8 flex items-center justify-between gap-4 px-5 py-4 border border-cosmic/30 hover:border-cosmic/60 hover:shadow-glow transition-all"
        >
          <div className="min-w-0">
            <p className="font-mono text-[0.7rem] uppercase tracking-widest text-cosmic">
              Continue learning
            </p>
            <p className="font-display font-semibold truncate">{continueTarget.title}</p>
            <p className="text-xs text-neutron/50 truncate">{continueTarget.worldName}</p>
          </div>
          <span className="shrink-0 font-display font-semibold text-cosmic">Resume →</span>
        </Link>
      )}

      <div className="flex flex-col gap-3">
        {worlds.map((w, i) => (
          <WorldNode key={w.slug} world={w} index={i} />
        ))}
      </div>
    </div>
  );
}
