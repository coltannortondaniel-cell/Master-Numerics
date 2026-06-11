import { useState } from "react";
import { motion } from "framer-motion";
import {
  physicsApi,
  type Question,
  type QuizResult,
  type QuizResponse,
  type AnswerValue,
} from "../../../lib/physics";
import { parseApiError } from "../../../lib/api";
import { Button } from "../../ui/Button";
import { QuestionCard } from "./QuestionCard";

const answered = (v: AnswerValue | undefined) =>
  v !== undefined && !(typeof v === "number" && Number.isNaN(v));

/**
 * Graded PRACTICE set — hints available, server-scored. Reports each submission
 * up to the lesson so it can unlock completion and track mastery.
 */
export function PracticeSet({
  slug,
  intro,
  questions,
  onSubmitted,
}: {
  slug: string;
  intro?: string;
  questions: Question[];
  onSubmitted?: (res: QuizResponse) => void;
}) {
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [results, setResults] = useState<Map<string, QuizResult> | null>(null);
  const [summary, setSummary] = useState<QuizResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const allAnswered = questions.every((q) => answered(answers[q.id]));

  async function submit() {
    setLoading(true);
    setError("");
    try {
      const res = await physicsApi.submitQuiz(
        slug,
        "PRACTICE",
        questions.map((q) => ({ questionId: q.id, answer: answers[q.id] }))
      );
      setResults(new Map(res.results.map((r) => [r.questionId, r])));
      setSummary(res);
      onSubmitted?.(res);
    } catch (e) {
      setError(parseApiError(e).message);
    } finally {
      setLoading(false);
    }
  }

  function retry() {
    setResults(null);
    setSummary(null);
    setAnswers({});
  }

  const percent = summary?.percent ?? 0;
  const mastered = summary?.status === "MASTERED";

  return (
    <section className="glass px-5 py-6 sm:px-8 sm:py-7">
      <p className="mb-1 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-solar">
        Practice problems
      </p>
      {intro && <p className="mb-4 text-neutron/70">{intro}</p>}

      {summary && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-5 flex items-center justify-between gap-4 rounded-xl px-5 py-4"
          style={{
            background: percent >= 90 ? "rgba(34,211,160,0.12)" : "rgba(107,33,214,0.12)",
            border: "1px solid rgba(240,244,255,0.08)",
          }}
        >
          <div>
            <p className="font-display text-3xl font-bold tabular-nums">{percent}%</p>
            <p className="text-sm text-neutron/60">
              {summary.score} / {summary.total} correct
              {summary.bestScore != null && ` · best ${summary.bestScore}%`}
            </p>
          </div>
          <div className="text-right">
            {mastered ? (
              <p className="font-display font-semibold text-[#C9B6FF]">👑 Mastered!</p>
            ) : percent >= 90 ? (
              <p className="font-display font-semibold text-success">Brilliant!</p>
            ) : percent >= 60 ? (
              <p className="font-display font-semibold text-solar">Nicely done</p>
            ) : (
              <p className="font-display font-semibold text-neutron/70">Keep going</p>
            )}
          </div>
        </motion.div>
      )}

      <div className="flex flex-col gap-3">
        {questions.map((q, i) => (
          <QuestionCard
            key={q.id}
            question={q}
            index={i}
            value={answers[q.id]}
            onChange={(v) => setAnswers((a) => ({ ...a, [q.id]: v }))}
            result={results?.get(q.id)}
            allowHint
            disabled={!!results}
          />
        ))}
      </div>

      {error && <p className="mt-3 text-sm text-alert">{error}</p>}

      <div className="mt-4 flex items-center gap-3">
        {summary ? (
          <Button variant="ghost" onClick={retry}>
            Try again
          </Button>
        ) : (
          <Button onClick={() => void submit()} loading={loading} disabled={!allAnswered}>
            {allAnswered ? "Submit answers" : "Answer all to submit"}
          </Button>
        )}
      </div>
    </section>
  );
}
