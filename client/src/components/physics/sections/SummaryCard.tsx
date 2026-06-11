import type { SummaryContent, Palette } from "../../../lib/physics";
import { Tex } from "../../ui/Tex";

/** SUMMARY — key takeaways + formula cards in a styled, palette-tinted panel. */
export function SummaryCard({ content, palette }: { content: SummaryContent; palette: Palette }) {
  return (
    <section
      className="rounded-2xl px-5 py-6 sm:px-8 sm:py-7"
      style={{
        background: `linear-gradient(160deg, ${palette.glow}22, rgba(16,18,32,0.6))`,
        border: `1px solid ${palette.accent}33`,
      }}
    >
      <p className="mb-3 font-mono text-[0.7rem] uppercase tracking-[0.25em]" style={{ color: palette.accent }}>
        Mission summary
      </p>
      <ul className="space-y-2">
        {content.takeaways.map((t, i) => (
          <li key={i} className="flex items-start gap-2 text-neutron/85">
            <span className="mt-1 text-success" aria-hidden>
              ✓
            </span>
            <span>{t}</span>
          </li>
        ))}
      </ul>

      {content.formulas.length > 0 && (
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {content.formulas.map((f, i) => (
            <div key={i} className="rounded-xl bg-space/60 px-4 py-3">
              <p className="mb-1 text-[0.7rem] uppercase tracking-wide text-neutron/45">{f.label}</p>
              <div className="overflow-x-auto">
                <Tex tex={f.tex} display />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
