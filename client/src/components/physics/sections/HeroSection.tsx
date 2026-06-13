import { motion, useReducedMotion } from "framer-motion";
import type { HeroContent, Palette } from "../../../lib/physics";

/** Per-scene gradient for the cinematic lesson opener (space + city themes). */
const SCENES: Record<string, { from: string; to: string }> = {
  // Physics — Scale of the Cosmos
  moon: { from: "#1a1c28", to: "#3a3d4a" },
  earth: { from: "#0b2a4a", to: "#0e8c6b" },
  atmosphere: { from: "#0b1e3a", to: "#1e6fb8" },
  sun: { from: "#3a1e00", to: "#FFB800" },
  // Math — The City of Numbers
  park: { from: "#0e2a1c", to: "#22D3A0" },
  school: { from: "#2a1e00", to: "#FFB800" },
  bakery: { from: "#2a0f1e", to: "#FF9E5C" },
  market: { from: "#0b2a2a", to: "#22D3A0" },
  city: { from: "#10121f", to: "#7FB3FF" },
};

export function HeroSection({ content, palette }: { content: HeroContent; palette: Palette }) {
  const reduce = useReducedMotion();
  const scene = SCENES[content.scene] ?? { from: palette.glow, to: palette.accent };

  return (
    <div
      className="relative overflow-hidden rounded-2xl px-6 py-12 sm:px-12 sm:py-16"
      style={{
        background: `radial-gradient(120% 130% at 80% 10%, ${scene.to}55, transparent 55%), linear-gradient(160deg, ${scene.from}, #0A0B14 80%)`,
        border: "1px solid rgba(240,244,255,0.08)",
      }}
    >
      {/* faint brand sigma watermark */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -right-2 top-1/2 -translate-y-1/2 font-brand font-bold leading-none select-none"
        style={{ fontSize: "11rem", color: palette.accent, opacity: 0.12 }}
        initial={reduce ? false : { opacity: 0.12, y: "-50%" }}
        animate={reduce ? undefined : { y: ["-52%", "-48%", "-52%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        Σ
      </motion.span>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative max-w-2xl"
      >
        <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight">{content.headline}</h2>
        <p className="mt-4 text-lg text-neutron/75 max-w-xl">{content.sub}</p>
      </motion.div>
    </div>
  );
}
