import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import type { WorldSummary, ContinueTarget } from "../../lib/physics";
import { useWarp } from "../physics/WarpTransition";
import { ProgressRing } from "../ui/ProgressRing";

/** A stylised city block whose lit windows fill in as you complete lessons. */
function Building({ palette, ratio, enterable }: { palette: { accent: string; glow: string }; ratio: number; enterable: boolean }) {
  const windows = 9;
  const lit = Math.round(ratio * windows);
  return (
    <div className="relative shrink-0" style={{ width: 54, height: 64 }}>
      <div
        className="absolute bottom-0 left-0 right-0 rounded-t-md"
        style={{
          height: 60,
          background: `linear-gradient(160deg, ${palette.accent}, ${palette.glow})`,
          opacity: enterable ? 1 : 0.4,
          boxShadow: enterable ? `0 0 22px ${palette.glow}88` : "none",
        }}
      />
      <div className="absolute bottom-2 left-1/2 grid -translate-x-1/2 grid-cols-3 gap-1">
        {Array.from({ length: windows }).map((_, i) => (
          <span
            key={i}
            className="h-2.5 w-2.5 rounded-[2px]"
            style={{ background: i < lit && enterable ? "#FFF6D8" : "rgba(10,11,20,0.55)" }}
          />
        ))}
      </div>
    </div>
  );
}

function DistrictNode({ world, index }: { world: WorldSummary; index: number }) {
  const { warp } = useWarp();
  const reduce = useReducedMotion();
  const enterable = world.lessonCount > 0;
  const ratio = world.lessonCount ? world.completedCount / world.lessonCount : 0;
  const done = enterable && world.completedCount === world.lessonCount;

  const body = (
    <div className="flex items-center gap-4 flex-1 min-w-0">
      <Building palette={world.palette} ratio={ratio} enterable={enterable} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-display text-lg font-bold truncate">{world.name}</h3>
          <span className="font-mono text-[0.65rem] rounded bg-white/5 px-1.5 py-0.5 text-neutron/50">
            {world.gradeRange}
          </span>
        </div>
        <p className="text-sm text-neutron/55 truncate">{world.subtitle}</p>
        <p className="font-mono text-[0.7rem] text-neutron/35 mt-0.5">{world.scaleLabel}</p>
      </div>
      {enterable ? (
        <ProgressRing value={ratio} color={done ? "#22D3A0" : world.palette.accent}>
          <span className="text-neutron/70">
            {world.completedCount}/{world.lessonCount}
          </span>
        </ProgressRing>
      ) : (
        <span className="shrink-0 font-mono text-[0.65rem] uppercase tracking-widest text-neutron/35">
          Opening<br />soon
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
    >
      {enterable ? (
        <button
          onClick={() => warp(`/city/${world.slug}`, world.palette.accent)}
          className="glass w-full text-left px-4 py-4 transition-all duration-300 hover:border-cosmic/40 hover:shadow-glow focus-visible:shadow-glow"
          aria-label={`Enter ${world.name}`}
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

export function CityMap({
  worlds,
  continueTarget,
}: {
  worlds: WorldSummary[];
  continueTarget: ContinueTarget | null;
}) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="text-center mb-8">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-solar">Math Journey</p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold">The City of Numbers</h1>
        <p className="mt-2 text-neutron/55 max-w-lg mx-auto">
          Fourteen districts where mathematics lives in the streets — count in the park, slice pies
          at the bakery, trade at the market, and climb toward the graduate towers.
        </p>
      </div>

      {continueTarget && (
        <Link
          to={`/city/${continueTarget.worldSlug}/${continueTarget.lessonSlug}`}
          className="glass mb-8 flex items-center justify-between gap-4 px-5 py-4 border border-cosmic/30 hover:border-cosmic/60 hover:shadow-glow transition-all"
        >
          <div className="min-w-0">
            <p className="font-mono text-[0.7rem] uppercase tracking-widest text-cosmic">Continue learning</p>
            <p className="font-display font-semibold truncate">{continueTarget.title}</p>
            <p className="text-xs text-neutron/50 truncate">{continueTarget.worldName}</p>
          </div>
          <span className="shrink-0 font-display font-semibold text-cosmic">Resume →</span>
        </Link>
      )}

      <div className="flex flex-col gap-3">
        {worlds.map((w, i) => (
          <DistrictNode key={w.slug} world={w} index={i} />
        ))}
      </div>
    </div>
  );
}
