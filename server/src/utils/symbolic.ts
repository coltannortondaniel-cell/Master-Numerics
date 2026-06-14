/**
 * A tiny, dependency-free symbolic-equivalence checker for grading algebraic
 * answers locally on the server (mirrors the client engine in lib/grader.ts).
 *
 * It never tries to *simplify* — instead it samples both expressions at many
 * random points and accepts them as equal when they agree everywhere within a
 * tolerance. That robustly handles `1/2 == 0.5 == 2/4`, `(x+1)^2 == x^2+2x+1`,
 * trig identities, etc., without a full CAS.
 */

type Fn = (...a: number[]) => number;

const FUNCTIONS: Record<string, Fn> = {
  sin: Math.sin, cos: Math.cos, tan: Math.tan,
  asin: Math.asin, acos: Math.acos, atan: Math.atan,
  sinh: Math.sinh, cosh: Math.cosh, tanh: Math.tanh,
  sqrt: Math.sqrt, cbrt: Math.cbrt, abs: Math.abs,
  ln: Math.log, log: (x) => Math.log10(x), log2: Math.log2,
  exp: Math.exp, floor: Math.floor, ceil: Math.ceil, round: Math.round,
};
const CONSTANTS: Record<string, number> = { pi: Math.PI, e: Math.E };

type Tok = { t: "num"; v: number } | { t: "var"; v: string } | { t: "fn"; v: string } | { t: "op"; v: string } | { t: "paren"; v: "(" | ")" };

function tokenize(src: string): Tok[] {
  const s = src.replace(/\s+/g, "").replace(/\*\*/g, "^");
  const out: Tok[] = [];
  let i = 0;
  const prev = () => out[out.length - 1];
  while (i < s.length) {
    const c = s[i];
    if (/[0-9.]/.test(c)) {
      let j = i + 1;
      while (j < s.length && /[0-9.eE]/.test(s[j])) {
        if ((s[j] === "e" || s[j] === "E") && (s[j + 1] === "+" || s[j + 1] === "-")) j++;
        j++;
      }
      out.push({ t: "num", v: parseFloat(s.slice(i, j)) });
      i = j;
      continue;
    }
    if (/[a-zA-Z_]/.test(c)) {
      let j = i + 1;
      while (j < s.length && /[a-zA-Z_0-9]/.test(s[j])) j++;
      const name = s.slice(i, j);
      // implicit multiplication: 2x, )x, x y
      const p = prev();
      if (p && (p.t === "num" || p.t === "var" || (p.t === "paren" && p.v === ")"))) out.push({ t: "op", v: "*" });
      if (s[j] === "(" && FUNCTIONS[name]) out.push({ t: "fn", v: name });
      else if (name in CONSTANTS) out.push({ t: "num", v: CONSTANTS[name] });
      else out.push({ t: "var", v: name });
      i = j;
      continue;
    }
    if (c === "(") {
      const p = prev();
      if (p && (p.t === "num" || p.t === "var" || (p.t === "paren" && p.v === ")"))) out.push({ t: "op", v: "*" });
      out.push({ t: "paren", v: "(" });
      i++;
      continue;
    }
    if (c === ")") { out.push({ t: "paren", v: ")" }); i++; continue; }
    if ("+-*/^".includes(c)) { out.push({ t: "op", v: c }); i++; continue; }
    throw new Error(`Unexpected character: ${c}`);
  }
  return out;
}

const PREC: Record<string, number> = { "+": 1, "-": 1, "*": 2, "/": 2, "^": 3 };
const RIGHT = new Set(["^"]);

/** Shunting-yard → RPN, with unary-minus handled as (0 - x). */
function toRpn(tokens: Tok[]): Tok[] {
  const out: Tok[] = [];
  const ops: Tok[] = [];
  let prevType: string | null = null;
  for (const tok of tokens) {
    if (tok.t === "num" || tok.t === "var") { out.push(tok); prevType = tok.t; continue; }
    if (tok.t === "fn") { ops.push(tok); prevType = "fn"; continue; }
    if (tok.t === "op") {
      // unary minus / plus
      if ((tok.v === "-" || tok.v === "+") && (prevType === null || prevType === "op" || prevType === "(")) {
        out.push({ t: "num", v: 0 });
      }
      while (
        ops.length &&
        ops[ops.length - 1].t === "op" &&
        (PREC[ops[ops.length - 1].v] > PREC[tok.v] ||
          (PREC[ops[ops.length - 1].v] === PREC[tok.v] && !RIGHT.has(tok.v)))
      ) {
        out.push(ops.pop()!);
      }
      ops.push(tok);
      prevType = "op";
      continue;
    }
    if (tok.t === "paren" && tok.v === "(") { ops.push(tok); prevType = "("; continue; }
    if (tok.t === "paren" && tok.v === ")") {
      while (ops.length && !(ops[ops.length - 1].t === "paren")) out.push(ops.pop()!);
      ops.pop(); // discard "("
      if (ops.length && ops[ops.length - 1].t === "fn") out.push(ops.pop()!);
      prevType = ")";
      continue;
    }
  }
  while (ops.length) out.push(ops.pop()!);
  return out;
}

export function compile(src: string): { eval: (scope: Record<string, number>) => number; vars: Set<string> } {
  const rpn = toRpn(tokenize(src));
  const vars = new Set<string>();
  for (const t of rpn) if (t.t === "var") vars.add(t.v);
  return {
    vars,
    eval(scope) {
      const st: number[] = [];
      for (const t of rpn) {
        if (t.t === "num") st.push(t.v);
        else if (t.t === "var") st.push(scope[t.v] ?? NaN);
        else if (t.t === "fn") st.push(FUNCTIONS[t.v](st.pop()!));
        else if (t.t === "op") {
          const b = st.pop()!, a = st.pop()!;
          st.push(t.v === "+" ? a + b : t.v === "-" ? a - b : t.v === "*" ? a * b : t.v === "/" ? a / b : Math.pow(a, b));
        }
      }
      return st.pop()!;
    },
  };
}

export function isValidExpr(src: string): boolean {
  try { compile(src); return true; } catch { return false; }
}

/**
 * True when `a` and `b` are numerically equivalent across random samples of
 * their free variables. `vars` may be supplied to fix the variable set.
 */
export function symbolicEquivalent(a: string, b: string, vars?: string[], tolerance = 1e-6): boolean {
  let ca, cb;
  try { ca = compile(a); cb = compile(b); } catch { return false; }
  const names = vars && vars.length ? vars : [...new Set([...ca.vars, ...cb.vars])];
  let agreed = 0;
  for (let trial = 0; trial < 24; trial++) {
    const scope: Record<string, number> = {};
    for (const n of names) scope[n] = (Math.random() * 4 - 2) || 0.7; // sample in [-2,2], avoid 0
    const va = ca.eval(scope);
    const vb = cb.eval(scope);
    if (!Number.isFinite(va) || !Number.isFinite(vb)) continue; // skip domain holes (e.g. sqrt of negative)
    const scale = Math.max(1, Math.abs(va), Math.abs(vb));
    if (Math.abs(va - vb) > tolerance * scale) return false;
    agreed++;
  }
  return agreed >= 6; // require enough valid samples to trust the verdict
}
