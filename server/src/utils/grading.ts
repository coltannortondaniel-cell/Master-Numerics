import type { QuizQuestion } from "@prisma/client";

export type SubmittedAnswer = { questionId: string; answer: unknown };

/** Server-side grading — the correct answer never leaves the API ungraded. */
export function gradeAnswer(question: QuizQuestion, submitted: unknown): boolean {
  switch (question.kind) {
    case "MCQ": {
      const correct = question.answer as number;
      return Number(submitted) === correct;
    }
    case "TRUE_FALSE": {
      const correct = question.answer as boolean;
      if (typeof submitted === "boolean") return submitted === correct;
      if (submitted === "true" || submitted === "false") {
        return (submitted === "true") === correct;
      }
      return false;
    }
    case "NUMERIC": {
      const { value, tolerance } = question.answer as { value: number; tolerance: number };
      const num =
        typeof submitted === "number" ? submitted : parseFloat(String(submitted));
      if (!Number.isFinite(num)) return false;
      return Math.abs(num - value) <= tolerance;
    }
  }
}

/** Human-readable correct answer for the post-grade reveal. */
export function revealAnswer(question: QuizQuestion): string {
  switch (question.kind) {
    case "MCQ": {
      const options = (question.options as string[]) ?? [];
      return options[question.answer as number] ?? "";
    }
    case "TRUE_FALSE":
      return (question.answer as boolean) ? "True" : "False";
    case "NUMERIC": {
      const { value } = question.answer as { value: number; tolerance: number };
      return String(value);
    }
  }
}
