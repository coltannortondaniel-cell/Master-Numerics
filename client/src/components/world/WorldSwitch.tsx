import { useLocation } from "react-router-dom";
import { Rocket, Trees } from "lucide-react";
import { useWarp } from "../physics/WarpTransition";

/**
 * The cinematic bridge between the two worlds. Physics is a journey out into
 * the cosmos; Math is a journey through the city and nature. Switching plays
 * the signature zoom-warp (reduced-motion users jump straight across).
 *
 *   • → Physics warps with a deep-space blue (zoom out to the stars)
 *   • → Math warps with a nature green (zoom in to Earth)
 */
const PHYSICS_BLUE = "#2D7DFF";
const MATH_GREEN = "#22C55E";

export function WorldSwitch() {
  const { pathname } = useLocation();
  const { warp } = useWarp();

  // Only meaningful on the two world maps.
  const onPhysics = pathname.startsWith("/journey");
  const onMath = pathname.startsWith("/city");
  if (!onPhysics && !onMath) return null;

  const seg = (active: boolean) =>
    `flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
      active ? "bg-accent text-on-accent" : "text-fg/55 hover:text-fg"
    }`;

  return (
    <div className="flex items-center rounded-full border border-line/15 bg-white/5 p-0.5" role="tablist" aria-label="Switch world">
      <button
        role="tab"
        aria-selected={onPhysics}
        className={seg(onPhysics)}
        onClick={() => !onPhysics && warp("/journey", PHYSICS_BLUE)}
      >
        <Rocket size={14} strokeWidth={2} /> Physics
      </button>
      <button
        role="tab"
        aria-selected={onMath}
        className={seg(onMath)}
        onClick={() => !onMath && warp("/city", MATH_GREEN)}
      >
        <Trees size={14} strokeWidth={2} /> Math
      </button>
    </div>
  );
}
