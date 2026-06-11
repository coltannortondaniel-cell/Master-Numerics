import { motion, useReducedMotion } from "framer-motion";
import type { HeroContent, Palette } from "../../../lib/physics";

/** Per-scene gradient + motif for the cinematic lesson opener. */
const SCENES: Record<string, { from: string; to: string; motif: string }> = {
  moon: { from: "#1a1c28", to: "#3a3d4a", motif: "🌙" },
  earth: { from: "#0b2a4a", to: "#0e8c6b", motif: "🌍" },
  atmosphere: { from: "#0b1e3a", to: "#1e6fb8", motif: "☁️" },
  sun: { from: "#3a1e00", to: "#FFB800", motif: "☀️" },
};

export function HeroSection({ content, palette }: { content: HeroContent; palette: Palette }) {
  const reduce = useReducedMotion();
  const scene = SCENES[content.scene] ?? { from: palette.glow, to: palette.accent, motif: "✦" };

  return (
    <div
      className="relative overflow-hidden rounded-2xl px-6 py-12 sm:px-12 sm:py-16"
      style={{
        background: `radial-gradient(120% 130% at 80% 10%, ${scene.to}55, transparent 55%), linear-gradient(160deg, ${scene.from}, #0A0B14 80%)`,
        border: "1px solid rgba(240,244,255,0.08)",
      }}
    >
      {/* floating motif */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-6 top-6 text-7xl sm:text-8xl opacity-80 drop-shadow-[0_0_30px_rgba(255,255,255,0.25)]"
        initial={reduce ? false : { y: 0 }}
        animate={reduce ? undefined : { y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ filter: `drop-shadow(0 0 24px ${palette.glow})` }}
      >
        {scene.motif}
      </motion.div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative max-w-2xl"
      >
        <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight">
          {content.headline}
        </h2>
        <p className="mt-4 text-lg text-neutron/75 max-w-xl">{content.sub}</p>
      </motion.div>
    </div>
  );
}
