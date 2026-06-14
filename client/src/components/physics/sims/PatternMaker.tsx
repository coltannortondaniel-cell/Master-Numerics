import { useState } from "react";
import { SimFrame, SimButton, Readout } from "./SimControls";

/** pattern-maker — find the repeating unit and fill the missing piece. */
interface Puzzle {
  seq: string[]; // includes "?" for the missing slot (always last)
  answer: string;
  choices: string[];
}

const PUZZLES: Puzzle[] = [
  { seq: ["🔴", "🔵", "🔴", "🔵", "🔴", "?"], answer: "🔵", choices: ["🔴", "🔵", "🟢"] },
  { seq: ["🔺", "⬛", "🔺", "⬛", "?"], answer: "🔺", choices: ["⬛", "🔺", "⭕"] },
  { seq: ["🍎", "🍎", "🍌", "🍎", "🍎", "?"], answer: "🍌", choices: ["🍎", "🍌", "🍇"] },
  { seq: ["⭐", "🌙", "🌙", "⭐", "🌙", "🌙", "?"], answer: "⭐", choices: ["⭐", "🌙", "☀️"] },
  { seq: ["🟩", "🟦", "🟪", "🟩", "🟦", "?"], answer: "🟪", choices: ["🟩", "🟦", "🟪"] },
];

export function PatternMaker() {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);

  const finished = idx >= PUZZLES.length;
  const p = PUZZLES[idx];
  const correct = picked === p?.answer;

  function pick(c: string) {
    if (picked) return;
    setPicked(c);
    if (c === p.answer) setScore((s) => s + 1);
  }
  function next() {
    setPicked(null);
    setIdx((i) => i + 1);
  }
  function restart() {
    setIdx(0);
    setScore(0);
    setPicked(null);
  }

  if (finished) {
    return (
      <SimFrame>
        <div className="py-6 text-center">
          <p className="text-4xl">🎯</p>
          <p className="mt-2 font-display text-xl font-bold">Pattern master!</p>
          <p className="text-neutron/60">You solved {score} of {PUZZLES.length}.</p>
          <div className="mt-4">
            <SimButton onClick={restart} active>Play again</SimButton>
          </div>
        </div>
      </SimFrame>
    );
  }

  return (
    <SimFrame>
      <p className="mb-3 text-center font-mono text-xs uppercase tracking-widest text-neutron/45">
        What comes next?
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2 text-4xl">
        {p.seq.map((c, i) => (
          <span
            key={i}
            className={`grid h-14 w-14 place-items-center rounded-lg ${
              c === "?" ? "border-2 border-dashed border-cosmic/60 text-cosmic" : "bg-white/5"
            }`}
          >
            {c === "?" ? (picked ?? "?") : c}
          </span>
        ))}
      </div>

      <div className="mt-5 flex justify-center gap-3 text-3xl">
        {p.choices.map((c) => (
          <button
            key={c}
            onClick={() => pick(c)}
            disabled={!!picked}
            className={`grid h-16 w-16 place-items-center rounded-xl border transition-all ${
              picked && c === p.answer
                ? "border-success bg-success/15"
                : picked === c
                  ? "border-alert bg-alert/15"
                  : "border-neutron/15 hover:border-cosmic hover:bg-white/5"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {picked && (
        <div className="mt-4 text-center">
          <p className={`font-semibold ${correct ? "text-success" : "text-alert"}`}>
            {correct ? "✓ That finishes the pattern!" : "✗ Look for the repeating unit."}
          </p>
          <div className="mt-2">
            <SimButton onClick={next} active>
              {idx === PUZZLES.length - 1 ? "See results" : "Next pattern"}
            </SimButton>
          </div>
        </div>
      )}

      <div className="mt-4">
        <Readout
          items={[
            { label: "Puzzle", value: `${idx + 1} of ${PUZZLES.length}` },
            { label: "Solved", value: String(score), color: "#2D7DFF" },
          ]}
        />
      </div>
    </SimFrame>
  );
}
