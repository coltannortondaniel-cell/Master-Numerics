/**
 * Local, explainable answer-checking engine — runs entirely in the browser,
 * no network round-trip and no third-party service. Phase 0 covers the two
 * machine-checkable free-response types:
 *
 *   • numeric  — tolerance comparison (a units pass can layer on later)
 *   • symbolic — algebraic equivalence by random sampling (1/2 == 0.5 == 2/4,
 *                (x+1)^2 == x^2+2x+1, etc.) using the existing expression
 *                compiler, mirroring the server grader in utils/symbolic.ts.
 *
 * Every result returns *why* it was right or wrong so the player can teach,
 * not just judge.
 */
import { compile, freeVars, isValid } from "./mathEval";
import type { SymbolicAnswer } from "./physics";

export interface LocalGrade {
  correct: boolean;
  /** Short, learner-facing reason (markdown/KaTeX allowed). */
  feedback: string;
}

/** Numeric answer with a tolerance band. */
export function gradeNumeric(input: string, value: number, tolerance: number): LocalGrade {
  const num = parseFloat(input);
  if (!Number.isFinite(num)) return { correct: false, feedback: "That isn't a number — try again." };
  const ok = Math.abs(num - value) <= tolerance;
  return ok
    ? { correct: true, feedback: "Exactly right." }
    : { correct: false, feedback: `Not quite — the value is ${value}.` };
}

/**
 * Symbolic equivalence by sampling. Both expressions are evaluated at many
 * random points over their shared variables; they're equivalent when they
 * agree everywhere within tolerance.
 */
export function gradeSymbolic(input: string, key: SymbolicAnswer): LocalGrade {
  const cleaned = input.trim();
  if (cleaned === "") return { correct: false, feedback: "Enter an expression." };
  if (!isValid(cleaned)) {
    return { correct: false, feedback: "I couldn't read that expression — check your symbols and brackets." };
  }

  const tolerance = key.tolerance ?? 1e-6;
  const names = key.vars && key.vars.length ? key.vars : [...new Set([...freeVars(cleaned), ...freeVars(key.expr)])];

  let evalIn: (s: Record<string, number>) => number;
  let evalKey: (s: Record<string, number>) => number;
  try {
    evalIn = compile(cleaned);
    evalKey = compile(key.expr);
  } catch {
    return { correct: false, feedback: "I couldn't evaluate that expression." };
  }

  let valid = 0;
  for (let trial = 0; trial < 24; trial++) {
    const scope: Record<string, number> = {};
    for (const n of names) scope[n] = Math.random() * 4 - 2 || 0.7; // sample in [-2,2], avoid 0
    const a = evalIn(scope);
    const b = evalKey(scope);
    if (!Number.isFinite(a) || !Number.isFinite(b)) continue; // skip domain holes
    const scale = Math.max(1, Math.abs(a), Math.abs(b));
    if (Math.abs(a - b) > tolerance * scale) {
      return { correct: false, feedback: `Not equivalent to the target. The correct answer is $${key.expr}$.` };
    }
    valid++;
  }
  if (valid < 6) return { correct: false, feedback: "I couldn't verify that — try a simpler equivalent form." };
  return { correct: true, feedback: "Correct — that's algebraically equivalent." };
}
