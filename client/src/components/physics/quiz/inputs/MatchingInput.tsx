import { useMemo } from "react";
import { X } from "lucide-react";
import type { MatchingOptions } from "../../../../lib/physics";
import { InlineMath } from "../../../ui/InlineMath";

interface Props {
  options: MatchingOptions;
  /** Chosen right value per left index ("" = unset). */
  value: string[];
  onChange: (v: string[]) => void;
  disabled?: boolean;
}

/**
 * Tap-to-pair matching: tap a right-hand chip to drop it into the next open
 * left slot; tap an assigned chip to release it. One-to-one assignment.
 */
export function MatchingInput({ options, value, onChange, disabled }: Props) {
  const { left, right } = options;
  const assigned = value.length === left.length ? value : left.map(() => "");

  const usedSet = useMemo(() => new Set(assigned.filter(Boolean)), [assigned]);

  function assign(chip: string) {
    if (disabled || usedSet.has(chip)) return;
    const next = [...assigned];
    const open = next.findIndex((v) => !v);
    if (open === -1) return;
    next[open] = chip;
    onChange(next);
  }

  function release(idx: number) {
    if (disabled) return;
    const next = [...assigned];
    next[idx] = "";
    onChange(next);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* left rows with their drop slots */}
      <div className="flex flex-col gap-2">
        {left.map((l, i) => {
          const filled = assigned[i];
          return (
            <div key={i} className="flex items-center gap-3">
              <div className="flex-1 rounded-lg border border-line/12 bg-base/40 px-3 py-2.5 text-sm">
                <InlineMath text={l} />
              </div>
              <span className="text-fg/30">→</span>
              <button
                type="button"
                disabled={disabled || !filled}
                onClick={() => release(i)}
                className={`flex min-h-[2.6rem] flex-1 items-center justify-between gap-2 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors ${
                  filled
                    ? "border-accent bg-accent/10 text-fg"
                    : "border-dashed border-line/20 text-fg/35"
                }`}
              >
                {filled ? <InlineMath text={filled} /> : "Tap a match below"}
                {filled && !disabled && <X size={14} className="shrink-0 text-fg/50" />}
              </button>
            </div>
          );
        })}
      </div>

      {/* pool of right chips */}
      <div className="flex flex-wrap gap-2">
        {right.map((chip, i) => {
          const used = usedSet.has(chip);
          return (
            <button
              key={i}
              type="button"
              disabled={disabled || used}
              onClick={() => assign(chip)}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all ${
                used
                  ? "border-line/8 text-fg/20 line-through"
                  : "border-line/20 hover:border-accent hover:bg-accent/5"
              }`}
            >
              <InlineMath text={chip} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
