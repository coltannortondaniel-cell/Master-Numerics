import { Fragment, useMemo } from "react";
import { InlineMath } from "../../../ui/InlineMath";

interface Props {
  /** Prompt text with `___` marking each blank. */
  prompt: string;
  value: string[];
  onChange: (v: string[]) => void;
  disabled?: boolean;
  /** Per-blank correctness once graded (optional). */
  correct?: boolean;
}

/** Renders the prompt as flowing text with an inline input at each `___`. */
export function FillBlankInput({ prompt, value, onChange, disabled, correct }: Props) {
  const segments = useMemo(() => prompt.split("___"), [prompt]);
  const blanks = segments.length - 1;
  const vals = value.length === blanks ? value : Array.from({ length: blanks }, (_, i) => value[i] ?? "");

  function setAt(i: number, v: string) {
    const next = [...vals];
    next[i] = v;
    onChange(next);
  }

  return (
    <p className="text-base leading-loose">
      {segments.map((seg, i) => (
        <Fragment key={i}>
          <InlineMath text={seg} />
          {i < blanks && (
            <input
              type="text"
              disabled={disabled}
              value={vals[i] ?? ""}
              onChange={(e) => setAt(i, e.target.value)}
              aria-label={`Blank ${i + 1}`}
              className={`mx-1 inline-block w-28 rounded-md border-b-2 bg-base/40 px-2 py-1 text-center text-sm outline-none transition-colors ${
                disabled
                  ? correct
                    ? "border-success text-success"
                    : "border-alert text-alert"
                  : "border-accent/50 focus:border-accent"
              }`}
            />
          )}
        </Fragment>
      ))}
    </p>
  );
}
