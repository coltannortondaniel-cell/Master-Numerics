import { useEffect, useState } from "react";
import { studyApi, type FormulaGroup } from "../lib/study";
import { parseApiError } from "../lib/api";
import { Tex } from "../components/ui/Tex";
import { CosmicBackground } from "../components/physics/CosmicBackground";
import { JourneyHeader } from "../components/layout/JourneyHeader";

export default function Formulas() {
  const [groups, setGroups] = useState<FormulaGroup[] | null>(null);
  const [error, setError] = useState("");
  const [starredOnly, setStarredOnly] = useState(false);

  useEffect(() => {
    studyApi.formulas().then(setGroups).catch((e) => setError(parseApiError(e).message));
  }, []);

  async function toggleStar(ref: string) {
    const starred = await studyApi.starFormula(ref);
    setGroups((gs) =>
      gs
        ? gs.map((g) => ({ ...g, items: g.items.map((it) => (it.ref === ref ? { ...it, starred } : it)) }))
        : gs
    );
  }

  const visible = (groups ?? [])
    .map((g) => ({ ...g, items: starredOnly ? g.items.filter((i) => i.starred) : g.items }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="relative min-h-screen">
      <CosmicBackground palette={{ accent: "#FFB800", glow: "#6B21D6" }} />
      <div className="print:hidden">
        <JourneyHeader back={{ to: "/dashboard", label: "Dashboard" }} />
      </div>
      <main className="relative z-10 mx-auto max-w-2xl px-4 sm:px-6 py-10 print:text-black">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-solar print:hidden">Reference</p>
            <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold">Formula Sheet</h1>
          </div>
          <div className="flex gap-2 print:hidden">
            <button
              onClick={() => setStarredOnly((s) => !s)}
              className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${starredOnly ? "bg-solar text-space" : "bg-white/5 text-neutron/60"}`}
            >
              ★ Starred
            </button>
            <button onClick={() => window.print()} className="rounded-lg border border-neutron/15 px-3 py-1.5 text-sm font-semibold hover:border-cosmic">
              Export PDF
            </button>
          </div>
        </div>

        {error && <p className="mb-4 text-sm text-alert">{error}</p>}

        {!groups ? (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="skeleton h-24 w-full" />
            ))}
          </div>
        ) : visible.length === 0 ? (
          <div className="glass px-6 py-10 text-center">
            <p className="text-3xl">📐</p>
            <p className="mt-2 font-display font-semibold">
              {starredOnly ? "No starred formulas yet" : "No formulas yet"}
            </p>
            <p className="mt-1 text-sm text-neutron/55">
              Complete lessons with formulas and they'll be collected here automatically.
            </p>
          </div>
        ) : (
          visible.map((g) => (
            <section key={g.topic} className="mb-6">
              <p className="mb-2 font-mono text-[0.7rem] uppercase tracking-widest text-neutron/45">
                {g.topic}
              </p>
              <div className="flex flex-col gap-2">
                {g.items.map((it) => (
                  <div key={it.ref} className="glass flex items-center justify-between gap-3 px-4 py-3 print:border print:border-gray-300">
                    <div className="min-w-0">
                      <p className="text-xs text-neutron/45">{it.label}</p>
                      <div className="overflow-x-auto">
                        <Tex tex={it.tex} display />
                      </div>
                    </div>
                    <button
                      onClick={() => toggleStar(it.ref)}
                      className={`shrink-0 text-xl print:hidden ${it.starred ? "text-solar" : "text-neutron/30 hover:text-solar"}`}
                      aria-label="Star formula"
                    >
                      {it.starred ? "★" : "☆"}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </main>
    </div>
  );
}
