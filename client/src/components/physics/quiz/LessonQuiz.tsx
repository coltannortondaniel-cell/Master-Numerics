import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Lightbulb, Check, X, ArrowRight, RotateCcw } from "lucide-react";
import type {
  Question,
  QuizResult,
  QuizResponse,
  QuestionScope,
  AnswerValue,
} from "../../../lib/physics";
import { useContentApi } from "../../../lib/contentApi";
import { parseApiError } from "../../../lib/api";
import { gradeSymbolic, gradeGraph, gradeDrawnGraph } from "../../../lib/grader";
import type { GraphAnswer, SymbolicAnswer } from "../../../lib/physics";
import { Button } from "../../ui/Button";
import { Markdown } from "../../ui/Markdown";
import { Difficulty } from "../../ui/Difficulty";
import { Mascot } from "../../mascot/Mascot";
import { QuestionInput, isAnswered } from "./QuestionInput";
import type { QuestionDiagnostic } from "../../../lib/physics";

/** Does the student's submission match a diagnostic's `when`, by question kind? */
function diagnosticMatches(kind: string, when: QuestionDiagnostic["when"], value: unknown): boolean {
  const norm = (s: unknown) => String(s).trim().toLowerCase();
  if (typeof when === "number") return Number(value) === when;
  if (typeof when === "boolean") return value === when;
  if (Array.isArray(when)) return when.includes(Number(value));
  if (typeof when === "string") {
    if (Array.isArray(value)) return value.some((v) => norm(v) === norm(when));
    return norm(value) === norm(when);
  }
  if (when && typeof when === "object" && "value" in when) {
    const num = parseFloat(String(value));
    const tol = when.tolerance ?? Math.abs(when.value) * 1e-3 + 1e-9;
    return Number.isFinite(num) && Math.abs(num - when.value) <= tol;
  }
  if (when && typeof when === "object" && "expr" in when) {
    try {
      return (kind === "GRAPH" ? gradeGraph : gradeSymbolic)(String(value), { expr: when.expr } as never).correct;
    } catch {
      return norm(value) === norm(when.expr);
    }
  }
  return false;
}

function diagnose(q: Question, value: unknown): string | null {
  if (!q.diagnostics?.length) return null;
  for (const d of q.diagnostics) if (diagnosticMatches(q.kind, d.when, value)) return d.says;
  return null;
}

interface Props {
  slug: string;
  scope: QuestionScope;
  intro?: string;
  questions: Question[];
  onSubmitted?: (res: QuizResponse) => void;
}

/**
 * Duolingo-style stepped quiz: one question at a time, instant per-question
 * feedback (via the no-record /check endpoint), then a summary. PRACTICE sets
 * record one official scored attempt at the end. No hearts — wrong answers are
 * corrected and you keep going.
 */
export function LessonQuiz({ slug, scope, intro, questions, onSubmitted }: Props) {
  const contentApi = useContentApi();
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [checking, setChecking] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [finished, setFinished] = useState(false);
  const [summary, setSummary] = useState<QuizResponse | null>(null);
  const [error, setError] = useState("");
  const [hintsShown, setHintsShown] = useState(0);

  const q = questions[idx];
  const total = questions.length;
  const value = answers[q?.id];
  const isLast = idx === total - 1;
  // Authored hint ladder (falls back to the single legacy `hint`).
  const hintList = q?.hints?.length ? q.hints : q?.hint ? [q.hint] : [];
  const diagnosis = result && !result.correct ? diagnose(q, value) : null;

  // Seed ORDER questions with their (shuffled) starting order so any
  // arrangement is submittable.
  useEffect(() => {
    if ((q?.kind === "ORDER" || q?.kind === "PROOF") && answers[q.id] === undefined && Array.isArray(q.options)) {
      setAnswers((a) => ({ ...a, [q.id]: q.options as string[] }));
    }
    setHintsShown(0);
  }, [idx, q]);

  async function check() {
    if (!isAnswered(q, value)) return;
    setError("");

    // SYMBOLIC / GRAPH are graded locally (sampling) — instant, no network.
    if ((q.kind === "SYMBOLIC" || q.kind === "GRAPH") && q.answer) {
      const key = q.answer as GraphAnswer;
      const g =
        q.kind === "SYMBOLIC"
          ? gradeSymbolic(String(value), q.answer as SymbolicAnswer)
          : key.mode === "draw"
            ? gradeDrawnGraph(String(value), key)
            : gradeGraph(String(value), key);
      const r = {
        questionId: q.id,
        correct: g.correct,
        correctAnswer: (q.answer as SymbolicAnswer | GraphAnswer).expr,
        explanation: q.explanation ?? g.feedback,
      };
      setResult(r);
      if (r.correct) setCorrectCount((c) => c + 1);
      return;
    }

    setChecking(true);
    try {
      const res = await contentApi.check(slug, [{ questionId: q.id, answer: value! }]);
      const r = res.results[0];
      setResult(r);
      if (r.correct) setCorrectCount((c) => c + 1);
    } catch (e) {
      setError(parseApiError(e).message);
    } finally {
      setChecking(false);
    }
  }

  async function next() {
    setResult(null);
    if (!isLast) {
      setIdx((i) => i + 1);
      return;
    }
    // End of set.
    if (scope === "PRACTICE") {
      setSubmitting(true);
      try {
        const res = await contentApi.submitQuiz(
          slug,
          "PRACTICE",
          questions.map((qq) => ({ questionId: qq.id, answer: answers[qq.id]! }))
        );
        setSummary(res);
        onSubmitted?.(res);
      } catch (e) {
        setError(parseApiError(e).message);
      } finally {
        setSubmitting(false);
      }
    }
    setFinished(true);
  }

  function retry() {
    setIdx(0);
    setAnswers({});
    setResult(null);
    setCorrectCount(0);
    setFinished(false);
    setSummary(null);
    setError("");
  }

  const eyebrow = scope === "PRACTICE" ? "Practice" : "Quick check";

  /* ---------- Summary screen ---------- */
  if (finished) {
    const pct = summary?.percent ?? Math.round((correctCount / total) * 100);
    const great = pct >= 80;
    return (
      <section className="glass px-5 py-8 text-center sm:px-8">
        <Mascot mood={great ? "celebrate" : "happy"} size={130} className="mx-auto" />
        <h3 className="mt-3 font-display text-2xl font-bold">
          {great ? "Brilliant work!" : "Nice effort!"}
        </h3>
        <p className="mt-1 text-fg/65">
          You got <span className="font-semibold text-fg">{correctCount}</span> / {total}{" "}
          ({pct}%){summary?.bestScore != null && ` · best ${summary.bestScore}%`}
        </p>
        {summary?.status === "MASTERED" && (
          <p className="mt-2 font-display font-semibold text-star">★ Lesson mastered!</p>
        )}
        <div className="mt-6">
          <Button variant="ghost" onClick={retry}>
            <RotateCcw size={16} /> Try again
          </Button>
        </div>
      </section>
    );
  }

  /* ---------- Question screen ---------- */
  return (
    <section className="glass px-5 py-6 sm:px-8 sm:py-7">
      {/* progress */}
      <div className="mb-5">
        <div className="mb-2 flex items-center justify-between">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-nebula">
            {eyebrow} · {idx + 1} / {total}
          </p>
          {q.difficulty != null && <Difficulty level={q.difficulty} label />}
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-line/15">
          <motion.div
            className="h-full rounded-full bg-accent"
            animate={{ width: `${((idx + (result ? 1 : 0)) / total) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {intro && idx === 0 && !result && <p className="mb-4 text-sm text-fg/60">{intro}</p>}

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {q.kind !== "FILL_BLANK" && (
            <div className="mb-4 font-display text-lg font-medium">
              <Markdown>{q.prompt}</Markdown>
            </div>
          )}

          <QuestionInput
            question={q}
            value={value}
            onChange={(v) => setAnswers((a) => ({ ...a, [q.id]: v }))}
            result={result ?? undefined}
            disabled={!!result}
          />
        </motion.div>
      </AnimatePresence>

      {/* progressive hint ladder (pre-grade) */}
      {hintList.length > 0 && !result && (
        <div className="mt-4 space-y-2">
          {hintList.slice(0, hintsShown).map((h, i) => (
            <div key={i} className="flex items-start gap-2 rounded-lg border border-line/12 bg-surface2/60 px-3 py-2 text-sm text-fg/80 [&_p]:m-0 [&_p]:inline">
              <Lightbulb size={14} className="mt-0.5 shrink-0 text-fg/50" />
              <span><span className="font-semibold text-fg/60">Hint {i + 1}: </span><Markdown>{h}</Markdown></span>
            </div>
          ))}
          {hintsShown < hintList.length && (
            <button
              onClick={() => setHintsShown((n) => n + 1)}
              className="text-xs font-semibold text-fg/60 underline-offset-2 hover:text-fg hover:underline"
            >
              {hintsShown === 0 ? "Need a hint?" : `Show another hint (${hintList.length - hintsShown} left)`}
            </button>
          )}
        </div>
      )}

      {/* feedback */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 rounded-xl border px-4 py-3 ${
              result.correct ? "border-success/40 bg-success/10" : "border-alert/40 bg-alert/10"
            }`}
          >
            <p className={`flex items-center gap-2 font-display font-semibold ${result.correct ? "text-success" : "text-alert"}`}>
              {result.correct ? <Check size={18} /> : <X size={18} />}
              {result.correct ? "Correct!" : `Answer: ${result.correctAnswer}`}
            </p>
            {diagnosis && (
              <div className="mt-2 flex items-start gap-2 rounded-lg border border-line/15 bg-base/40 px-3 py-2 text-sm text-fg/80 [&_p]:m-0 [&_p]:inline">
                <Mascot mood="thinking" size={28} className="-mt-0.5 shrink-0" />
                <span><span className="font-semibold text-fg/60">Spotting the slip: </span><Markdown>{diagnosis}</Markdown></span>
              </div>
            )}
            <div className="mt-2 text-sm text-fg/70">
              <Markdown>{result.explanation}</Markdown>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && <p className="mt-3 text-sm text-alert">{error}</p>}

      {/* action */}
      <div className="mt-5 flex justify-end">
        {result ? (
          <Button onClick={() => void next()} loading={submitting}>
            {isLast ? (scope === "PRACTICE" ? "Finish & submit" : "See results") : "Continue"}
            <ArrowRight size={16} />
          </Button>
        ) : (
          <Button onClick={() => void check()} loading={checking} disabled={!isAnswered(q, value)}>
            Check
          </Button>
        )}
      </div>
    </section>
  );
}
