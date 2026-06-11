import { useMemo, useState } from "react";
import { type Question, type QuizResult, type AnswerValue } from "../../../lib/physics";
import { useContentApi } from "../../../lib/contentApi";
import { parseApiError } from "../../../lib/api";
import { Button } from "../../ui/Button";
import { QuestionCard } from "./QuestionCard";

const answered = (v: AnswerValue | undefined) =>
  v !== undefined && !(typeof v === "number" && Number.isNaN(v));

/** Inline CONCEPT_CHECK — answer all, check once, get instant per-question feedback. */
export function ConceptCheck({
  slug,
  intro,
  questions,
}: {
  slug: string;
  intro?: string;
  questions: Question[];
}) {
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [results, setResults] = useState<Map<string, QuizResult> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const contentApi = useContentApi();

  const allAnswered = questions.every((q) => answered(answers[q.id]));
  const score = useMemo(
    () => (results ? [...results.values()].filter((r) => r.correct).length : 0),
    [results]
  );

  async function check() {
    setLoading(true);
    setError("");
    try {
      const res = await contentApi.submitQuiz(
        slug,
        "CONCEPT_CHECK",
        questions.map((q) => ({ questionId: q.id, answer: answers[q.id] }))
      );
      setResults(new Map(res.results.map((r) => [r.questionId, r])));
    } catch (e) {
      setError(parseApiError(e).message);
    } finally {
      setLoading(false);
    }
  }

  function retry() {
    setResults(null);
    setAnswers({});
  }

  return (
    <section className="glass px-5 py-6 sm:px-8 sm:py-7">
      <p className="mb-1 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-nebula">
        Quick check
      </p>
      {intro && <p className="mb-4 text-neutron/70">{intro}</p>}

      <div className="flex flex-col gap-3">
        {questions.map((q, i) => (
          <QuestionCard
            key={q.id}
            question={q}
            index={i}
            value={answers[q.id]}
            onChange={(v) => setAnswers((a) => ({ ...a, [q.id]: v }))}
            result={results?.get(q.id)}
            disabled={!!results}
          />
        ))}
      </div>

      {error && <p className="mt-3 text-sm text-alert">{error}</p>}

      <div className="mt-4 flex items-center gap-3">
        {results ? (
          <>
            <p className="font-display font-semibold">
              You got <span className="text-success">{score}</span> / {questions.length}
            </p>
            <Button variant="ghost" onClick={retry}>
              Try again
            </Button>
          </>
        ) : (
          <Button onClick={() => void check()} loading={loading} disabled={!allAnswered}>
            {allAnswered ? "Check answers" : "Answer all to check"}
          </Button>
        )}
      </div>
    </section>
  );
}
