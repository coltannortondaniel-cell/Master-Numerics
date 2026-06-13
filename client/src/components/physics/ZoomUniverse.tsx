import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { WorldSummary, ContinueTarget } from "../../lib/physics";
import { useWarp } from "./WarpTransition";
import { Button } from "../ui/Button";

/**
 * Continuous true-scale zoom: scroll to fly from the Moon out to the entire
 * observable universe. Each world is a celestial "stop" rendered with real
 * NASA/ESA imagery (public domain) over a procedural fallback, scaling and
 * cross-fading as you pass through it (a Powers-of-Ten feel).
 */

// Wikimedia Commons filenames (public domain). Special:FilePath redirects to
// the file; ?width gives a thumbnail. Unmapped worlds use the procedural body.
const IMAGE: Record<string, string> = {
  "the-moon": "FullMoon2010.jpg",
  "earths-surface": "The_Earth_seen_from_Apollo_17.jpg",
  "inner-solar-system": "OSIRIS_Mars_true_color.jpg",
  "outer-solar-system": "Saturn_during_Equinox.jpg",
  "the-sun": "The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA's_Solar_Dynamics_Observatory.jpg",
  "clusters-nebulae": "Orion_Nebula_-_Hubble_2006_mosaic_18000.jpg",
  supernovae: "Crab_Nebula.jpg",
  "black-holes": "Black_hole_-_Messier_87_crop_max_res.jpg",
  "milky-way": "Milky_Way_Arch.jpg",
  "galaxy-clusters": "Hubble_ultra_deep_field_high_rez_edit1.jpg",
  "observable-universe": "Hubble_ultra_deep_field_high_rez_edit1.jpg",
  cosmology: "WMAP_2010.png",
};
const imgUrl = (file: string) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=900`;

function CelestialBody({ world, d }: { world: WorldSummary; d: number }) {
  const [imgOk, setImgOk] = useState(true);
  const file = IMAGE[world.slug];
  // d = p - index. ahead (d<0): small & fading in. passed (d>0): grows & fades out.
  const scale = d <= 0 ? 1 - Math.min(1, -d) * 0.82 : 1 + Math.min(1.2, d) * 3.6;
  const opacity = Math.max(0, 1 - Math.abs(d) / 1.05);
  const size = `min(64vmin, 560px)`;

  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2"
      style={{
        width: size,
        height: size,
        transform: `translate(-50%,-50%) scale(${scale})`,
        opacity,
        zIndex: Math.round((d + 2) * 10),
        transition: "transform 60ms linear, opacity 60ms linear",
      }}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 34% 30%, ${world.palette.accent}, ${world.palette.glow} 60%, #04060d 100%)`,
          boxShadow: `0 0 90px 10px ${world.palette.glow}66, inset -20px -20px 60px rgba(0,0,0,0.5)`,
        }}
      />
      {file && imgOk && (
        <img
          src={imgUrl(file)}
          alt={world.name}
          loading="lazy"
          onError={() => setImgOk(false)}
          className="absolute inset-0 h-full w-full rounded-full object-cover"
          style={{ boxShadow: `0 0 90px 10px ${world.palette.glow}55` }}
        />
      )}
    </div>
  );
}

export function ZoomUniverse({
  worlds,
  continueTarget,
}: {
  worlds: WorldSummary[];
  continueTarget: ContinueTarget | null;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  const { warp } = useWarp();
  const reduce = useReducedMotion();
  const N = worlds.length;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const total = track.offsetHeight - window.innerHeight;
        const scrolled = Math.min(Math.max(-track.getBoundingClientRect().top, 0), Math.max(1, total));
        setP((scrolled / Math.max(1, total)) * (N - 1));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [N]);

  const current = Math.min(N - 1, Math.max(0, Math.round(p)));
  const w = worlds[current];

  function jumpTo(i: number) {
    const track = trackRef.current;
    if (!track) return;
    const total = track.offsetHeight - window.innerHeight;
    const top = window.scrollY + track.getBoundingClientRect().top + (i / (N - 1)) * total;
    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <div ref={trackRef} className="relative bg-space" style={{ height: `${N * 85}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* deep-space backdrop + drifting stars */}
        <div className="absolute inset-0 bg-space" />
        <div className="starfield" aria-hidden />
        <div
          className="nebula-glow"
          style={{ background: w?.palette.glow, opacity: 0.18, top: "-25vmax", right: "-15vmax", transition: "background 600ms" }}
          aria-hidden
        />

        {/* celestial bodies */}
        {worlds.map((world, i) => {
          const d = p - i;
          if (Math.abs(d) > 1.15) return null;
          return <CelestialBody key={world.slug} world={world} d={d} />;
        })}

        {/* scale rail (right) */}
        <div className="absolute right-3 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-1.5 sm:flex">
          {worlds.map((world, i) => (
            <button
              key={world.slug}
              onClick={() => jumpTo(i)}
              className="group flex items-center justify-end gap-2"
              aria-label={`Go to ${world.name}`}
            >
              <span
                className={`whitespace-nowrap font-mono text-[0.65rem] transition-opacity ${
                  i === current ? "opacity-90 text-neutron" : "opacity-0 group-hover:opacity-60 text-neutron"
                }`}
              >
                {world.name}
              </span>
              <span
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: i === current ? 22 : 8,
                  background: i === current ? world.palette.accent : "rgba(240,244,255,0.3)",
                }}
              />
            </button>
          ))}
        </div>

        {/* info overlay */}
        {w && (
          <div className="absolute inset-x-0 bottom-0 z-30 bg-gradient-to-t from-space via-space/80 to-transparent px-6 pb-10 pt-24">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: w.palette.accent }}>
                {String(w.orderIndex).padStart(2, "0")} · scale {w.scaleLabel} · {w.gradeRange}
              </p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold">{w.name}</h2>
              <p className="mt-1 text-neutron/60">{w.subtitle}</p>
              <div className="mt-4">
                {w.lessonCount > 0 ? (
                  <Button onClick={() => warp(`/journey/${w.slug}`, w.palette.accent)}>
                    Enter · {w.completedCount}/{w.lessonCount} lessons
                  </Button>
                ) : (
                  <span className="inline-block rounded-xl border border-neutron/15 px-5 py-3 text-sm text-neutron/45">
                    Charting soon
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* continue + hint (top) */}
        <div className="absolute inset-x-0 top-16 z-30 flex flex-col items-center gap-2 px-4 text-center">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-neutron/40">
            Scroll to zoom from the Moon to the cosmos
          </p>
          {continueTarget && p < 0.3 && (
            <button
              onClick={() => warp(`/journey/${continueTarget.worldSlug}/${continueTarget.lessonSlug}`, "#6B21D6")}
              className="rounded-full border border-cosmic/40 bg-white/[0.03] px-4 py-1.5 text-sm hover:border-cosmic"
            >
              Continue: <span className="font-semibold">{continueTarget.title}</span> →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
