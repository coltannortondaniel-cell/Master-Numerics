import type { SimulationContent } from "../../../lib/physics";
import { SimulationHost } from "../sims";

/** SIMULATION — intro blurb plus the interactive widget for this simId. */
export function SimulationSection({
  title,
  content,
}: {
  title?: string | null;
  content: SimulationContent;
}) {
  return (
    <section className="glass px-5 py-6 sm:px-8 sm:py-7">
      <p className="mb-1 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-success">
        Try it
      </p>
      {title && <h3 className="mb-2 font-display text-2xl font-bold">{title}</h3>}
      <p className="mb-4 text-neutron/70">{content.intro}</p>
      <SimulationHost simId={content.simId} />
    </section>
  );
}
