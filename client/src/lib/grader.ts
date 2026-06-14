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
import type { SymbolicAnswer, GraphAnswer } from "./physics";

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

/** Graph: does the entered function match the target across a domain? */
export function gradeGraph(input: string, key: GraphAnswer): LocalGrade {
  const cleaned = input.trim();
  if (cleaned === "") return { correct: false, feedback: "Enter a function." };
  if (!isValid(cleaned)) return { correct: false, feedback: "I couldn't read that function — check your syntax." };

  const variable = key.variable ?? "x";
  const [lo, hi] = key.domain ?? [-5, 5];
  const tol = key.tolerance ?? 1e-3;
  let fIn: (s: Record<string, number>) => number;
  let fKey: (s: Record<string, number>) => number;
  try {
    fIn = compile(cleaned);
    fKey = compile(key.expr);
  } catch {
    return { correct: false, feedback: "I couldn't evaluate that function." };
  }

  const N = 40;
  let valid = 0;
  for (let i = 0; i <= N; i++) {
    const x = lo + ((hi - lo) * i) / N;
    const a = fIn({ [variable]: x });
    const b = fKey({ [variable]: x });
    if (!Number.isFinite(a) || !Number.isFinite(b)) continue;
    const scale = Math.max(1, Math.abs(a), Math.abs(b));
    if (Math.abs(a - b) > tol * scale) {
      return { correct: false, feedback: `That curve doesn't match. The target is $y = ${key.expr}$.` };
    }
    valid++;
  }
  if (valid < N * 0.6) return { correct: false, feedback: "I couldn't verify that over the domain — check for gaps." };
  return { correct: true, feedback: "Correct — your curve matches the target." };
}

/**
 * Drawn graph: the learner sketches a curve by dragging nodes, producing a set
 * of (x, y) samples. We grade by comparing each drawn y to the target function
 * at that x, with a generous tolerance (it's a sketch, not an equation). The
 * drawn value arrives JSON-encoded as { xs: number[]; ys: number[] }.
 */
export function gradeDrawnGraph(value: string, key: GraphAnswer): LocalGrade {
  let parsed: { xs?: number[]; ys?: number[] };
  try {
    parsed = JSON.parse(value);
  } catch {
    return { correct: false, feedback: "Sketch the curve first by dragging the points." };
  }
  const xs = parsed.xs ?? [];
  const ys = parsed.ys ?? [];
  if (xs.length === 0 || xs.length !== ys.length) {
    return { correct: false, feedback: "Drag the points to draw the curve." };
  }

  const variable = key.variable ?? "x";
  let fKey: (s: Record<string, number>) => number;
  try {
    fKey = compile(key.expr);
  } catch {
    return { correct: false, feedback: "I couldn't evaluate the target curve." };
  }

  const targets = xs.map((x) => fKey({ [variable]: x }));
  const finite = targets.filter((t) => Number.isFinite(t));
  if (finite.length === 0) return { correct: false, feedback: "I couldn't check that curve." };
  const span = Math.max(1, Math.max(...finite) - Math.min(...finite));
  // Generous by default (it's a freehand sketch): within 15% of the target's span.
  const tol = (key.tolerance ?? 0.15) * span;

  let ok = 0;
  let n = 0;
  for (let i = 0; i < xs.length; i++) {
    const t = targets[i];
    if (!Number.isFinite(t)) continue;
    n++;
    if (Math.abs(ys[i] - t) <= tol) ok++;
  }
  if (n === 0) return { correct: false, feedback: "I couldn't check that curve." };
  if (ok / n >= 0.8) return { correct: true, feedback: "Nicely sketched — your curve matches the target shape." };
  return { correct: false, feedback: `Not quite — aim for the shape of $y = ${key.expr}$.` };
}

/** Plot points for a function over a domain, for live previews. Returns NaN
 *  where the function is undefined so callers can break the polyline. */
export function samplePlot(expr: string, domain: [number, number], n = 80, variable = "x"): { x: number; y: number }[] {
  if (!isValid(expr)) return [];
  let f: (s: Record<string, number>) => number;
  try { f = compile(expr); } catch { return []; }
  const [lo, hi] = domain;
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i <= n; i++) {
    const x = lo + ((hi - lo) * i) / n;
    pts.push({ x, y: f({ [variable]: x }) });
  }
  return pts;
}
