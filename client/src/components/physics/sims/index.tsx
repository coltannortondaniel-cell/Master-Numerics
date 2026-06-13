import type { ComponentType } from "react";
import { Telescope } from "lucide-react";
import { GravityDrop } from "./GravityDrop";
import { MoonPhases } from "./MoonPhases";
import { EarthSpin } from "./EarthSpin";
import { ForcePush } from "./ForcePush";
import { MagnetPoles } from "./MagnetPoles";
import { AirPressure } from "./AirPressure";
import { SeaBreeze } from "./SeaBreeze";
import { SkyScatter } from "./SkyScatter";
import { WingLift } from "./WingLift";
import { CountAlong } from "./CountAlong";
import { ShapeSorter } from "./ShapeSorter";
import { PatternMaker } from "./PatternMaker";
import { CompareBalance } from "./CompareBalance";
import { MotionGraphs } from "./MotionGraphs";
import { Incline } from "./Incline";

/** simId → interactive component. Keys match the `simId` fields in the seed data. */
const REGISTRY: Record<string, ComponentType> = {
  // Physics
  "gravity-drop": GravityDrop,
  "moon-phases": MoonPhases,
  "earth-spin": EarthSpin,
  "force-push": ForcePush,
  "magnet-poles": MagnetPoles,
  "air-pressure": AirPressure,
  "sea-breeze": SeaBreeze,
  "sky-scatter": SkyScatter,
  "wing-lift": WingLift,
  // Physics — mechanics
  "motion-graphs": MotionGraphs,
  "incline-plane": Incline,
  // Math
  "count-along": CountAlong,
  "shape-sorter": ShapeSorter,
  "pattern-maker": PatternMaker,
  "compare-balance": CompareBalance,
};

/** Renders the simulation for a simId, or a tasteful placeholder if not yet built. */
export function SimulationHost({ simId }: { simId: string }) {
  const Sim = REGISTRY[simId];
  if (!Sim) {
    return (
      <div className="rounded-xl border border-dashed border-neutron/15 bg-space/40 px-5 py-8 text-center">
        <Telescope size={26} strokeWidth={1.4} className="mx-auto text-neutron/40" />
        <p className="mt-2 font-display font-semibold">Interactive coming online</p>
        <p className="mt-1 text-sm text-neutron/50">This simulation is being calibrated.</p>
      </div>
    );
  }
  return <Sim />;
}

export const KNOWN_SIM_IDS = Object.keys(REGISTRY);
