/**
 * Content validator — the quality gate for the curriculum-as-data pipeline.
 * Loads every seeded world/lesson/question and checks, without a database:
 *
 *   • notation is balanced ($…$ and { } pairs render-safe)
 *   • every question's answer is well-formed and machine-gradable
 *   • SYMBOLIC/GRAPH expressions actually compile (and self-verify)
 *   • difficulty is in range; explanations are present
 *
 * Run: `tsx prisma/validate-content.ts` (exits non-zero on any error).
 */
import type { WorldSeed, QuestionSeed } from "./seed-data/types.js";
import { worlds } from "./seed-data/worlds.js";
import { districts } from "./seed-data/math/districts.js";
import { isValidExpr, symbolicEquivalent, graphEquivalent } from "../src/utils/symbolic.js";

let errors = 0;
let warnings = 0;
let checked = 0;

function err(where: string, msg: string) { console.error(`  ✗ ${where}: ${msg}`); errors++; }
function warn(where: string, msg: string) { console.warn(`  ! ${where}: ${msg}`); warnings++; }

/** Cheap KaTeX-safety check: balanced inline-math $ and balanced braces. */
function notationOk(s: string): string | null {
  const dollars = (s.match(/(?<!\\)\$/g) || []).length;
  if (dollars % 2 !== 0) return "unbalanced $ math delimiters";
  let depth = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "{" && s[i - 1] !== "\\") depth++;
    else if (s[i] === "}" && s[i - 1] !== "\\") depth--;
    if (depth < 0) return "unbalanced { } braces";
  }
  if (depth !== 0) return "unbalanced { } braces";
  return null;
}

function checkQuestion(where: string, q: QuestionSeed) {
  checked++;
  // notation
  for (const [field, text] of [["prompt", q.prompt], ["explanation", q.explanation]] as const) {
    if (!text || !text.trim()) { err(where, `empty ${field}`); continue; }
    const n = notationOk(text);
    if (n) err(where, `${field}: ${n}`);
  }
  if (q.difficulty != null && (q.difficulty < 1 || q.difficulty > 5)) err(where, `difficulty ${q.difficulty} out of 1–5`);

  // gradability per kind
  switch (q.kind) {
    case "MCQ": {
      const opts = q.options as string[] | undefined;
      if (!Array.isArray(opts) || opts.length < 2) { err(where, "MCQ needs ≥2 options"); break; }
      if (typeof q.answer !== "number" || q.answer < 0 || q.answer >= opts.length) err(where, "MCQ answer index out of range");
      break;
    }
    case "TRUE_FALSE":
      if (typeof q.answer !== "boolean") err(where, "TRUE_FALSE answer must be boolean");
      break;
    case "NUMERIC": {
      const a = q.answer as { value: number; tolerance: number };
      if (!a || typeof a.value !== "number" || typeof a.tolerance !== "number") err(where, "NUMERIC answer needs {value,tolerance}");
      break;
    }
    case "MATCHING": {
      const o = q.options as { left: string[]; right: string[] } | undefined;
      const a = q.answer as string[];
      if (!o || !Array.isArray(o.left) || !Array.isArray(o.right)) { err(where, "MATCHING needs {left,right}"); break; }
      if (!Array.isArray(a) || a.length !== o.left.length) err(where, "MATCHING answer length must equal left length");
      break;
    }
    case "FILL_BLANK": {
      const blanks = q.prompt.split("___").length - 1;
      const a = q.answer as string[][];
      if (blanks < 1) err(where, "FILL_BLANK prompt has no ___ blanks");
      if (!Array.isArray(a) || a.length !== blanks) err(where, `FILL_BLANK answer must have ${blanks} blank group(s)`);
      break;
    }
    case "ORDER":
    case "PROOF": {
      const opts = q.options as string[] | undefined;
      if (!Array.isArray(opts) || opts.length < 2) err(where, `${q.kind} needs ≥2 ordered steps`);
      break;
    }
    case "SYMBOLIC": {
      const a = q.answer as { expr: string; vars?: string[] };
      if (!a || !a.expr) { err(where, "SYMBOLIC needs {expr}"); break; }
      if (!isValidExpr(a.expr)) { err(where, `SYMBOLIC expr does not parse: "${a.expr}"`); break; }
      if (!symbolicEquivalent(a.expr, a.expr, a.vars)) warn(where, "SYMBOLIC expr failed self-equivalence (constant/odd domain?)");
      break;
    }
    case "GRAPH": {
      const a = q.answer as { expr: string; domain?: [number, number]; variable?: string };
      if (!a || !a.expr) { err(where, "GRAPH needs {expr}"); break; }
      if (!isValidExpr(a.expr)) { err(where, `GRAPH expr does not parse: "${a.expr}"`); break; }
      if (!graphEquivalent(a.expr, a.expr, a.domain, a.variable)) warn(where, "GRAPH expr failed self-check over domain");
      break;
    }
    default:
      err(where, `unknown kind ${(q as { kind: string }).kind}`);
  }
}

function checkWorlds(subject: string, list: WorldSeed[]) {
  for (const w of list) {
    for (const l of w.lessons) {
      if (l.difficulty != null && (l.difficulty < 1 || l.difficulty > 5)) err(`${subject}/${l.slug}`, `lesson difficulty ${l.difficulty} out of 1–5`);
      l.questions.forEach((q, i) => checkQuestion(`${subject}/${l.slug}#${i + 1}`, q));
    }
  }
}

console.log("Validating curriculum content…\n");
checkWorlds("physics", worlds);
checkWorlds("math", districts);
console.log(`\n${checked} questions checked · ${warnings} warning(s) · ${errors} error(s)`);
if (errors > 0) { console.error("\n❌ Content validation failed."); process.exit(1); }
console.log("\n✅ Content validation passed.");
