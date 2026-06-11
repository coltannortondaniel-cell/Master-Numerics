/**
 * A small, dependency-free math expression compiler for the graphing
 * calculator. Tokenises an infix expression, converts to RPN (shunting-yard),
 * and returns a fast evaluator closure `(scope) => number`.
 *
 * Supports: + - * / ^, unary minus, parentheses, implicit multiplication
 * (2x, 3sin(x), 2(x+1)), constants (pi, e), the variable x, slider parameters,
 * and common functions.
 */

export type Scope = Record<string, number>;
export type Compiled = (scope: Scope) => number;

const FUNCTIONS: Record<string, (...a: number[]) => number> = {
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  asin: Math.asin,
  acos: Math.acos,
  atan: Math.atan,
  sinh: Math.sinh,
  cosh: Math.cosh,
  tanh: Math.tanh,
  sqrt: Math.sqrt,
  cbrt: Math.cbrt,
  abs: Math.abs,
  ln: Math.log,
  log: (x: number) => Math.log10(x),
  log2: (x: number) => Math.log2(x),
  exp: Math.exp,
  floor: Math.floor,
  ceil: Math.ceil,
  round: Math.round,
  sign: Math.sign,
  min: Math.min,
  max: Math.max,
  mod: (a: number, b: number) => ((a % b) + b) % b,
};

const CONSTANTS: Record<string, number> = {
  pi: Math.PI,
  e: Math.E,
  tau: Math.PI * 2,
  infinity: Infinity,
};

type Tok =
  | { t: "num"; v: number }
  | { t: "var"; v: string }
  | { t: "fn"; v: string }
  | { t: "op"; v: string }
  | { t: "lp" }
  | { t: "rp" }
  | { t: "comma" };

const isDigit = (c: string) => c >= "0" && c <= "9";
const isAlpha = (c: string) => (c >= "a" && c <= "z") || (c >= "A" && c <= "Z");

function tokenize(input: string): Tok[] {
  const s = input;
  const out: Tok[] = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (c === " " || c === "\t" || c === "\n") { i++; continue; } // space separates factors
    if (isDigit(c) || (c === "." && isDigit(s[i + 1]))) {
      let num = "";
      while (i < s.length && (isDigit(s[i]) || s[i] === ".")) num += s[i++];
      out.push({ t: "num", v: parseFloat(num) });
      continue;
    }
    if (isAlpha(c)) {
      let id = "";
      while (i < s.length && (isAlpha(s[i]) || isDigit(s[i]) || s[i] === "_")) id += s[i++];
      const lower = id.toLowerCase();
      if (s[i] === "(" && FUNCTIONS[lower]) out.push({ t: "fn", v: lower });
      else if (FUNCTIONS[lower] && s[i] === "(") out.push({ t: "fn", v: lower });
      else out.push({ t: "var", v: lower });
      continue;
    }
    if (c === "(") { out.push({ t: "lp" }); i++; continue; }
    if (c === ")") { out.push({ t: "rp" }); i++; continue; }
    if (c === ",") { out.push({ t: "comma" }); i++; continue; }
    if ("+-*/^".includes(c)) { out.push({ t: "op", v: c }); i++; continue; }
    throw new Error(`Unexpected character: ${c}`);
  }
  return insertImplicitMul(out);
}

/** Insert * between adjacent factors: 2x, 2(x), )(, x y, 2pi, )x … */
function insertImplicitMul(toks: Tok[]): Tok[] {
  const out: Tok[] = [];
  for (let i = 0; i < toks.length; i++) {
    const cur = toks[i];
    const next = toks[i + 1];
    out.push(cur);
    if (!next) continue;
    const curEnds = cur.t === "num" || cur.t === "var" || cur.t === "rp";
    const nextStarts = next.t === "num" || next.t === "var" || next.t === "fn" || next.t === "lp";
    if (curEnds && nextStarts) out.push({ t: "op", v: "*" });
  }
  return out;
}

const PREC: Record<string, number> = { "+": 1, "-": 1, "*": 2, "/": 2, "^": 3 };
const U_PREC = 2.5; // unary minus/plus: tighter than * but looser than ^
const RIGHT = new Set(["^"]);

/** Shunting-yard → RPN, with unary-minus handled as a special op "u-". */
function toRPN(toks: Tok[]): Tok[] {
  const output: Tok[] = [];
  const stack: Tok[] = [];
  let prev: Tok | null = null;
  for (const tok of toks) {
    if (tok.t === "num" || tok.t === "var") {
      output.push(tok);
    } else if (tok.t === "fn") {
      stack.push(tok);
    } else if (tok.t === "comma") {
      while (stack.length && stack[stack.length - 1].t !== "lp") output.push(stack.pop()!);
    } else if (tok.t === "op") {
      const unary =
        (tok.v === "-" || tok.v === "+") &&
        (prev === null || prev.t === "op" || prev.t === "lp" || prev.t === "comma");
      if (unary) {
        // Prefix operator: precedence U_PREC (between * and ^), right-associative.
        // Pushing without popping makes `-x^2` parse as -(x^2) while `2^-1` still
        // binds the minus to the exponent.
        stack.push({ t: "op", v: tok.v === "-" ? "u-" : "u+" });
      } else {
        const p = PREC[tok.v];
        while (stack.length) {
          const top = stack[stack.length - 1];
          if (top.t !== "op") break;
          const tp = top.v.startsWith("u") ? U_PREC : PREC[top.v];
          if (tp > p || (tp === p && !RIGHT.has(top.v))) output.push(stack.pop()!);
          else break;
        }
        stack.push(tok);
      }
    } else if (tok.t === "lp") {
      stack.push(tok);
    } else if (tok.t === "rp") {
      while (stack.length && stack[stack.length - 1].t !== "lp") output.push(stack.pop()!);
      if (!stack.length) throw new Error("Mismatched parentheses");
      stack.pop(); // remove lp
      if (stack.length && stack[stack.length - 1].t === "fn") output.push(stack.pop()!);
    }
    prev = tok;
  }
  while (stack.length) {
    const top = stack.pop()!;
    if (top.t === "lp" || top.t === "rp") throw new Error("Mismatched parentheses");
    output.push(top);
  }
  return output;
}

/** Compile an expression into a reusable evaluator. Throws on syntax errors. */
export function compile(input: string): Compiled {
  const rpn = toRPN(tokenize(input));
  return (scope: Scope): number => {
    const st: number[] = [];
    for (const tok of rpn) {
      if (tok.t === "num") st.push(tok.v);
      else if (tok.t === "var") {
        if (tok.v in scope) st.push(scope[tok.v]);
        else if (tok.v in CONSTANTS) st.push(CONSTANTS[tok.v]);
        else st.push(NaN);
      } else if (tok.t === "fn") {
        const fn = FUNCTIONS[tok.v];
        // min/max/mod take 2 args; everything else 1.
        const arity = tok.v === "min" || tok.v === "max" || tok.v === "mod" ? 2 : 1;
        const args: number[] = [];
        for (let k = 0; k < arity; k++) args.unshift(st.pop() ?? NaN);
        st.push(fn(...args));
      } else if (tok.t === "op") {
        if (tok.v === "u-") st.push(-(st.pop() ?? NaN));
        else if (tok.v === "u+") st.push(st.pop() ?? NaN);
        else {
          const b = st.pop() ?? NaN;
          const a = st.pop() ?? NaN;
          switch (tok.v) {
            case "+": st.push(a + b); break;
            case "-": st.push(a - b); break;
            case "*": st.push(a * b); break;
            case "/": st.push(a / b); break;
            case "^": st.push(Math.pow(a, b)); break;
          }
        }
      }
    }
    return st.length ? st[st.length - 1] : NaN;
  };
}

/** Returns the set of free variable names in an expression (excluding constants/functions). */
export function freeVars(input: string): Set<string> {
  const vars = new Set<string>();
  try {
    for (const tok of tokenize(input)) {
      if (tok.t === "var" && !(tok.v in CONSTANTS)) vars.add(tok.v);
    }
  } catch {
    /* ignore parse errors while typing */
  }
  return vars;
}

/** True if the expression compiles without throwing. */
export function isValid(input: string): boolean {
  try {
    compile(input)({ x: 1 });
    return true;
  } catch {
    return false;
  }
}
