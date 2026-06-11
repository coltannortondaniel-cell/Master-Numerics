import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * The signature zoom-warp. `warp(path, color)` plays a hyperspace streak +
 * color flash, navigates mid-animation, then clears — so moving between the
 * Cosmic Map and a world feels like physically zooming through space.
 */
interface WarpCtx {
  warp: (to: string, color: string) => void;
}

const Ctx = createContext<WarpCtx | null>(null);

export function useWarp(): WarpCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useWarp must be used within <WarpProvider>");
  return ctx;
}

const STREAKS = Array.from({ length: 48 }, (_, i) => (i * 360) / 48);

function WarpOverlay({ color }: { color: string }) {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
    >
      {/* Color wash zooming toward the viewer */}
      <motion.div
        className="absolute inset-0"
        style={{ background: `radial-gradient(circle at center, ${color} 0%, #0A0B14 62%)` }}
        initial={{ scale: 0.2, opacity: 0.2 }}
        animate={{ scale: 1.6, opacity: 1 }}
        transition={{ duration: 0.85, ease: [0.5, 0, 0.75, 0] }}
      />
      {/* Hyperspace streaks flying outward from the center */}
      <div className="absolute left-1/2 top-1/2 h-0 w-0">
        {STREAKS.map((deg, i) => (
          <motion.span
            key={deg}
            className="absolute left-0 top-0 origin-left"
            style={{
              rotate: `${deg}deg`,
              width: "60vmax",
              height: i % 3 === 0 ? 2 : 1,
              background: `linear-gradient(90deg, transparent, ${i % 4 === 0 ? color : "#F0F4FF"})`,
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: [0, 1, 0] }}
            transition={{ duration: 0.7, delay: 0.05 + (i % 6) * 0.015, ease: "easeIn" }}
          />
        ))}
      </div>
      {/* Final white flash */}
      <motion.div
        className="absolute inset-0 bg-neutron"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.9, 0] }}
        transition={{ duration: 0.9, times: [0, 0.7, 0.85, 1] }}
      />
    </motion.div>
  );
}

export function WarpProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const [warpColor, setWarpColor] = useState<string | null>(null);
  const busy = useRef(false);

  const warp = useCallback(
    (to: string, color: string) => {
      if (busy.current) return;
      // Respect reduced-motion: navigate instantly, no streaks.
      if (reduce) {
        navigate(to);
        return;
      }
      busy.current = true;
      setWarpColor(color);
      window.setTimeout(() => navigate(to), 560);
      window.setTimeout(() => {
        setWarpColor(null);
        busy.current = false;
      }, 1000);
    },
    [navigate, reduce]
  );

  return (
    <Ctx.Provider value={{ warp }}>
      {children}
      <AnimatePresence>{warpColor && <WarpOverlay color={warpColor} />}</AnimatePresence>
    </Ctx.Provider>
  );
}
