import type { QuizQuestion } from "@prisma/client";
import { symbolicEquivalent } from "./symbolic.js";

export type SubmittedAnswer = { questionId: string; answer: unknown };

export type SymbolicAnswer = { expr: string; vars?: string[]; tolerance?: number };

/** Normalise a free-text answer for case/whitespace-insensitive comparison. */
function normalize(s: unknown): string {
  return String(s ?? "").trim().toLowerCase().replace(/\s+/g, " ");
}

function arraysEqual(a: unknown[], b: unknown[]): boolean {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

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
    case "MATCHING": {
      // answer = correct right-value for each left, in left order.
      const right = question.answer as string[];
      if (!Array.isArray(submitted) || submitted.length !== right.length) return false;
      return submitted.every((v, i) => normalize(v) === normalize(right[i]));
    }
    case "FILL_BLANK": {
      // answer = list of accepted strings per blank.
      const accepted = question.answer as string[][];
      if (!Array.isArray(submitted) || submitted.length !== accepted.length) return false;
      return submitted.every((v, i) =>
        accepted[i].some((opt) => normalize(opt) === normalize(v))
      );
    }
    case "ORDER": {
      // options holds the canonical correct order; submitted is the user's order.
      const correct = (question.options as string[]) ?? [];
      if (!Array.isArray(submitted)) return false;
      return arraysEqual(submitted.map(normalize), correct.map(normalize));
    }
    case "SYMBOLIC": {
      const { expr, vars, tolerance } = question.answer as SymbolicAnswer;
      if (typeof submitted !== "string" || submitted.trim() === "") return false;
      return symbolicEquivalent(submitted, expr, vars, tolerance);
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
    case "MATCHING": {
      const { left } = question.options as { left: string[]; right: string[] };
      const right = question.answer as string[];
      return left.map((l, i) => `${l} → ${right[i]}`).join("   ·   ");
    }
    case "FILL_BLANK": {
      const accepted = question.answer as string[][];
      return accepted.map((opts) => opts[0]).join(", ");
    }
    case "ORDER": {
      const correct = (question.options as string[]) ?? [];
      return correct.join("  →  ");
    }
    case "SYMBOLIC": {
      return (question.answer as SymbolicAnswer).expr;
    }
  }
}
