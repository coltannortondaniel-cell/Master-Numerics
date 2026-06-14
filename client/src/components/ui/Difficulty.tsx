/** Compact difficulty meter (1 → 5). Quiet by default; the brief's "color is a
 *  reward signal" rule keeps this on the structural accent, not a reward hue. */
export function Difficulty({ level, max = 5, label }: { level: number; max?: number; label?: boolean }) {
  const clamped = Math.max(1, Math.min(max, Math.round(level)));
  return (
    <span className="inline-flex items-center gap-1.5" title={`Difficulty ${clamped} / ${max}`}>
      {label && <span className="font-mono text-[0.65rem] uppercase tracking-widest text-fg/40">Difficulty</span>}
      <span className="inline-flex items-center gap-1">
        {Array.from({ length: max }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-1.5 rounded-full ${i < clamped ? "bg-accent" : "bg-line/20"}`}
          />
        ))}
      </span>
    </span>
  );
}
