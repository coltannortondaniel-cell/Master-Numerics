import type { Question, QuizResult, AnswerValue, MatchingOptions } from "../../../lib/physics";
import { Markdown } from "../../ui/Markdown";
import { MatchingInput } from "./inputs/MatchingInput";
import { FillBlankInput } from "./inputs/FillBlankInput";
import { OrderInput } from "./inputs/OrderInput";

interface Props {
  question: Question;
  value: AnswerValue | undefined;
  onChange: (v: AnswerValue) => void;
  result?: QuizResult;
  disabled?: boolean;
}

/** Has the user provided a complete answer for this question? */
export function isAnswered(question: Question, value: AnswerValue | undefined): boolean {
  switch (question.kind) {
    case "MCQ":
      return typeof value === "number";
    case "TRUE_FALSE":
      return typeof value === "boolean";
    case "NUMERIC":
      return typeof value === "number" && !Number.isNaN(value);
    case "MATCHING": {
      const left = (question.options as MatchingOptions | null)?.left ?? [];
      return Array.isArray(value) && value.length === left.length && value.every(Boolean);
    }
    case "FILL_BLANK": {
      const blanks = question.prompt.split("___").length - 1;
      return Array.isArray(value) && value.length === blanks && value.every((v) => v.trim() !== "");
    }
    case "ORDER":
      return Array.isArray(value) && value.length > 0;
  }
}

/** A polished, theme-aware renderer for every question kind. */
export function QuestionInput({ question, value, onChange, result, disabled }: Props) {
  const graded = !!result;

  /* ---- MCQ ---- */
  if (question.kind === "MCQ") {
    const opts = (question.options as string[]) ?? [];
    const correctIdx = opts.findIndex((o) => o === result?.correctAnswer);
    return (
      <div className="grid grid-cols-1 gap-2.5">
        {opts.map((opt, i) => {
          let cls = "border-line/15 hover:border-accent hover:bg-accent/5";
          if (graded) {
            if (i === correctIdx) cls = "border-success bg-success/15";
            else if (value === i) cls = "border-alert bg-alert/15";
            else cls = "border-line/10 opacity-60";
          } else if (value === i) cls = "border-accent bg-accent/15";
          return (
            <button
              key={i}
              disabled={disabled}
              onClick={() => onChange(i)}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all disabled:cursor-default ${cls}`}
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line/15 font-mono text-xs">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="min-w-0">{opt}</span>
            </button>
          );
        })}
      </div>
    );
  }

  /* ---- TRUE / FALSE ---- */
  if (question.kind === "TRUE_FALSE") {
    return (
      <div className="flex gap-3">
        {[true, false].map((b) => {
          const chosen = value === b;
          let cls = "border-line/15 hover:border-accent";
          if (graded) {
            const isCorrect = result!.correctAnswer === (b ? "True" : "False");
            if (isCorrect) cls = "border-success bg-success/15";
            else if (chosen) cls = "border-alert bg-alert/15";
            else cls = "opacity-60";
          } else if (chosen) cls = "border-accent bg-accent/15";
          return (
            <button
              key={String(b)}
              disabled={disabled}
              onClick={() => onChange(b)}
              className={`flex-1 rounded-xl border px-4 py-3 font-semibold transition-all disabled:cursor-default ${cls}`}
            >
              {b ? "True" : "False"}
            </button>
          );
        })}
      </div>
    );
  }

  /* ---- NUMERIC ---- */
  if (question.kind === "NUMERIC") {
    return (
      <input
        type="number"
        inputMode="decimal"
        disabled={disabled}
        value={value === undefined || (typeof value === "number" && Number.isNaN(value)) ? "" : String(value)}
        onChange={(e) => onChange(e.target.value === "" ? NaN : parseFloat(e.target.value))}
        placeholder="Your answer"
        className={`w-44 rounded-xl border bg-base/50 px-4 py-3 font-mono outline-none transition-colors ${
          graded
            ? result!.correct
              ? "border-success text-success"
              : "border-alert text-alert"
            : "border-line/15 focus:border-accent"
        }`}
      />
    );
  }

  /* ---- MATCHING ---- */
  if (question.kind === "MATCHING") {
    return (
      <MatchingInput
        options={question.options as MatchingOptions}
        value={Array.isArray(value) ? value : []}
        onChange={onChange}
        disabled={disabled}
      />
    );
  }

  /* ---- FILL IN THE BLANK ---- */
  if (question.kind === "FILL_BLANK") {
    return (
      <FillBlankInput
        prompt={question.prompt}
        value={Array.isArray(value) ? value : []}
        onChange={onChange}
        disabled={disabled}
        correct={result?.correct}
      />
    );
  }

  /* ---- ORDER ---- */
  if (question.kind === "ORDER") {
    return (
      <OrderInput
        items={(question.options as string[]) ?? []}
        value={Array.isArray(value) ? value : []}
        onChange={onChange}
        disabled={disabled}
      />
    );
  }

  return <Markdown>{"_Unsupported question type._"}</Markdown>;
}
