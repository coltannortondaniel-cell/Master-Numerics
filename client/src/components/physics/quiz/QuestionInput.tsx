import type { Question, QuizResult, AnswerValue, MatchingOptions, GraphAnswer } from "../../../lib/physics";
import { samplePlot } from "../../../lib/grader";
import { Markdown } from "../../ui/Markdown";
import { MatchingInput } from "./inputs/MatchingInput";
import { FillBlankInput } from "./inputs/FillBlankInput";
import { OrderInput } from "./inputs/OrderInput";
import { DrawGraphInput } from "./inputs/DrawGraphInput";

/** Compact preview plot of the learner's function (target curve is hidden). */
function MiniPlot({ points, domain }: { points: { x: number; y: number }[]; domain: [number, number] }) {
  const W = 260, H = 130, pad = 8;
  const finite = points.filter((p) => Number.isFinite(p.y));
  let ymin = Math.min(...finite.map((p) => p.y));
  let ymax = Math.max(...finite.map((p) => p.y));
  if (!Number.isFinite(ymin) || !Number.isFinite(ymax) || ymin === ymax) { ymin = -5; ymax = 5; }
  const padY = (ymax - ymin) * 0.1 || 1;
  ymin -= padY; ymax += padY;
  const sx = (x: number) => pad + ((x - domain[0]) / (domain[1] - domain[0])) * (W - 2 * pad);
  const sy = (y: number) => H - pad - ((y - ymin) / (ymax - ymin)) * (H - 2 * pad);
  // Break the polyline at undefined / off-chart points.
  let d = "";
  let pen = false;
  for (const p of points) {
    if (!Number.isFinite(p.y) || p.y < ymin || p.y > ymax) { pen = false; continue; }
    d += `${pen ? "L" : "M"}${sx(p.x).toFixed(1)} ${sy(p.y).toFixed(1)}`;
    pen = true;
  }
  const x0 = sx(0), y0 = sy(0);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 w-full max-w-md rounded-xl border border-line/15 bg-base/40">
      {domain[0] <= 0 && domain[1] >= 0 && <line x1={x0} y1={pad} x2={x0} y2={H - pad} stroke="currentColor" className="text-line/20" />}
      {ymin <= 0 && ymax >= 0 && <line x1={pad} y1={y0} x2={W - pad} y2={y0} stroke="currentColor" className="text-line/20" />}
      {d && <path d={d} fill="none" stroke="#2D7DFF" strokeWidth="2" />}
    </svg>
  );
}

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
    case "PROOF":
      return Array.isArray(value) && value.length > 0;
    case "SYMBOLIC":
    case "GRAPH":
      return typeof value === "string" && value.trim() !== "";
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

  /* ---- SYMBOLIC (algebraic, graded locally) ---- */
  if (question.kind === "SYMBOLIC") {
    const str = typeof value === "string" ? value : "";
    return (
      <div>
        <input
          type="text"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          disabled={disabled}
          value={str}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type an expression, e.g. x_f - x_i"
          className={`w-full max-w-md rounded-xl border bg-base/50 px-4 py-3 font-mono outline-none transition-colors ${
            graded
              ? result!.correct
                ? "border-success text-success"
                : "border-alert text-alert"
              : "border-line/15 focus:border-accent"
          }`}
        />
        {str.trim() !== "" && (
          <div className="mt-2 flex items-center gap-2 text-sm text-fg/55">
            <span className="font-mono text-[0.7rem] uppercase tracking-widest text-fg/40">Preview</span>
            <Markdown>{`$${str}$`}</Markdown>
          </div>
        )}
      </div>
    );
  }

  /* ---- GRAPH (function entry or sketch, graded locally by sampling) ---- */
  if (question.kind === "GRAPH") {
    const ans = question.answer as GraphAnswer | undefined;
    /* ---- GRAPH · draw mode (sketch the curve on a canvas) ---- */
    if (ans?.mode === "draw") {
      return (
        <DrawGraphInput
          answer={ans}
          value={typeof value === "string" ? value : undefined}
          onChange={onChange}
          disabled={disabled}
          graded={graded}
          correct={result?.correct}
        />
      );
    }
    const str = typeof value === "string" ? value : "";
    const domain = ans?.domain ?? [-5, 5];
    const pts = str.trim() !== "" ? samplePlot(str, domain, 80, ans?.variable ?? "x") : [];
    return (
      <div>
        <input
          type="text"
          autoComplete="off"
          spellCheck={false}
          disabled={disabled}
          value={str}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type a function, e.g. 2*x + 1"
          className={`w-full max-w-md rounded-xl border bg-base/50 px-4 py-3 font-mono outline-none transition-colors ${
            graded
              ? result!.correct
                ? "border-success text-success"
                : "border-alert text-alert"
              : "border-line/15 focus:border-accent"
          }`}
        />
        <MiniPlot points={pts} domain={domain} />
      </div>
    );
  }

  /* ---- PROOF (assemble the argument in logical order) ---- */
  if (question.kind === "PROOF") {
    return (
      <div>
        <p className="mb-2 font-mono text-[0.7rem] uppercase tracking-widest text-fg/40">
          Drag the steps into a valid logical order
        </p>
        <OrderInput
          items={(question.options as string[]) ?? []}
          value={Array.isArray(value) ? value : []}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
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
