import { useState } from "react";
import { Lightbulb } from "lucide-react";
import type { Question, QuizResult, AnswerValue } from "../../../lib/physics";
import { Markdown } from "../../ui/Markdown";

interface Props {
  question: Question;
  index: number;
  value: AnswerValue | undefined;
  onChange: (v: AnswerValue) => void;
  result?: QuizResult;
  allowHint?: boolean;
  disabled?: boolean;
}

export function QuestionCard({
  question,
  index,
  value,
  onChange,
  result,
  allowHint,
  disabled,
}: Props) {
  const [hintOpen, setHintOpen] = useState(false);
  const graded = !!result;

  const optionState = (i: number): "idle" | "correct" | "wrong" | "chosen" => {
    if (!graded) return value === i ? "chosen" : "idle";
    // After grading: highlight the user's pick and (for MCQ) the right one.
    const correctIdx = question.options?.findIndex((o) => o === result!.correctAnswer);
    if (i === correctIdx) return "correct";
    if (value === i && !result!.correct) return "wrong";
    return "idle";
  };

  const optionClasses: Record<string, string> = {
    idle: "border-neutron/15 hover:border-cosmic/50 hover:bg-white/5",
    chosen: "border-cosmic bg-cosmic/15",
    correct: "border-success bg-success/15 text-neutron",
    wrong: "border-alert bg-alert/15 text-neutron",
  };

  return (
    <div className="rounded-xl border border-neutron/10 bg-space/50 p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/10 font-mono text-xs font-bold">
          {index + 1}
        </span>
        <div className="min-w-0 flex-1 font-medium">
          <Markdown>{question.prompt}</Markdown>
        </div>
      </div>

      <div className="mt-3 pl-9">
        {question.kind === "MCQ" && (
          <div className="grid grid-cols-1 gap-2">
            {(question.options ?? []).map((opt, i) => {
              const state = optionState(i);
              return (
                <button
                  key={i}
                  disabled={disabled}
                  onClick={() => onChange(i)}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-all disabled:cursor-default ${optionClasses[state]}`}
                >
                  <span className="font-mono text-xs text-neutron/50">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
        )}

        {question.kind === "TRUE_FALSE" && (
          <div className="flex gap-2">
            {[true, false].map((b) => {
              const chosen = value === b;
              let cls = "border-neutron/15 hover:border-cosmic/50";
              if (graded) {
                const isCorrect = result!.correctAnswer === (b ? "True" : "False");
                if (isCorrect) cls = "border-success bg-success/15";
                else if (chosen) cls = "border-alert bg-alert/15";
              } else if (chosen) cls = "border-cosmic bg-cosmic/15";
              return (
                <button
                  key={String(b)}
                  disabled={disabled}
                  onClick={() => onChange(b)}
                  className={`flex-1 rounded-lg border px-4 py-2 text-sm font-semibold transition-all disabled:cursor-default ${cls}`}
                >
                  {b ? "True" : "False"}
                </button>
              );
            })}
          </div>
        )}

        {question.kind === "NUMERIC" && (
          <input
            type="number"
            inputMode="decimal"
            disabled={disabled}
            value={value === undefined ? "" : String(value)}
            onChange={(e) => onChange(e.target.value === "" ? NaN : parseFloat(e.target.value))}
            placeholder="Your answer"
            className={`w-40 rounded-lg border bg-space/70 px-3 py-2 font-mono text-sm outline-none transition-colors ${
              graded
                ? result!.correct
                  ? "border-success"
                  : "border-alert"
                : "border-neutron/15 focus:border-cosmic"
            }`}
          />
        )}
      </div>

      {/* Hint (practice only, pre-grade) */}
      {allowHint && question.hint && !graded && (
        <div className="mt-3 pl-9">
          {hintOpen ? (
            <p className="flex items-center gap-2 rounded-lg bg-solar/10 px-3 py-2 text-sm text-solar/90">
              <Lightbulb size={14} strokeWidth={1.75} className="shrink-0" /> {question.hint}
            </p>
          ) : (
            <button
              onClick={() => setHintOpen(true)}
              className="text-xs font-semibold text-solar/80 hover:text-solar"
            >
              Need a hint?
            </button>
          )}
        </div>
      )}

      {/* Feedback */}
      {graded && (
        <div className="mt-3 pl-9">
          <p className={`text-sm font-semibold ${result!.correct ? "text-success" : "text-alert"}`}>
            {result!.correct ? "✓ Correct" : `✗ Not quite — answer: ${result!.correctAnswer}`}
          </p>
          <div className="mt-1 text-sm text-neutron/65">
            <Markdown>{result!.explanation}</Markdown>
          </div>
        </div>
      )}
    </div>
  );
}
