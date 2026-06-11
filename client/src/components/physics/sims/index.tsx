import type { ComponentType } from "react";
import { GravityDrop } from "./GravityDrop";
import { MoonPhases } from "./MoonPhases";
import { EarthSpin } from "./EarthSpin";
import { ForcePush } from "./ForcePush";
import { MagnetPoles } from "./MagnetPoles";
import { AirPressure } from "./AirPressure";
import { SeaBreeze } from "./SeaBreeze";
import { SkyScatter } from "./SkyScatter";
import { WingLift } from "./WingLift";

/** simId → interactive component. Keys match the `simId` fields in the seed data. */
const REGISTRY: Record<string, ComponentType> = {
  "gravity-drop": GravityDrop,
  "moon-phases": MoonPhases,
  "earth-spin": EarthSpin,
  "force-push": ForcePush,
  "magnet-poles": MagnetPoles,
  "air-pressure": AirPressure,
  "sea-breeze": SeaBreeze,
  "sky-scatter": SkyScatter,
  "wing-lift": WingLift,
};

/** Renders the simulation for a simId, or a tasteful placeholder if not yet built. */
export function SimulationHost({ simId }: { simId: string }) {
  const Sim = REGISTRY[simId];
  if (!Sim) {
    return (
      <div className="rounded-xl border border-dashed border-neutron/15 bg-space/40 px-5 py-8 text-center">
        <p className="text-2xl">🔭</p>
        <p className="mt-2 font-display font-semibold">Interactive coming online</p>
        <p className="mt-1 text-sm text-neutron/50">This simulation is being calibrated.</p>
      </div>
    );
  }
  return <Sim />;
}

export const KNOWN_SIM_IDS = Object.keys(REGISTRY);
