import type { LessonSeed } from "../types.js";

/**
 * The University Campus (grades 11–12): pre-calculus and the threshold of higher
 * math — exponential growth, logarithms, and a first encounter with limits.
 * GRAPH/NUMERIC led, with SYMBOLIC. All original content.
 */
export const universityCampusLessons: LessonSeed[] = [
  // ───────────────────────── 1. Exponential Growth & Decay ─────────────────────────
  {
    slug: "exponential-growth-and-decay",
    title: "Exponential Growth & Decay",
    tagline: "When the rate depends on the amount",
    estMinutes: 15,
    xpReward: 160,
    difficulty: 4,
    sections: [
      { kind: "HERO", content: { scene: "city", headline: "Doubling and Halving", sub: "Multiply by the same factor again and again, and quantities explode — or vanish — astonishingly fast." } },
      { kind: "CONTEXT", title: "From rumors to radioactivity", content: { markdown: "A rumor that doubles its reach each hour, a savings account compounding interest, a radioactive sample halving every few years — all follow the same law. **Exponential** change multiplies by a constant factor each step, in contrast to **linear** change, which adds a constant. The difference becomes staggering quickly." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "An **exponential function** has the variable in the **exponent**:\n\n$$f(x) = a\\,b^{x},$$\n\nwhere $a$ is the starting value and $b$ is the **growth factor**.\n\n- If $b > 1$, it's **growth** (e.g. $b = 2$ doubles each step).\n- If $0 < b < 1$, it's **decay** (e.g. $b = \\tfrac12$ halves each step).\n\nKey contrasts with linear functions:\n\n- Linear *adds* a fixed amount; exponential *multiplies* by a fixed factor.\n- Exponential growth has a constant **doubling time**; decay has a constant **half-life**.\n- The graph of $b^x$ is always positive, rising steeply (growth) or falling toward zero (decay) but never reaching it.\n\nThe special base $e \\approx 2.718$ gives the smoothest, 'natural' exponential $e^x$, central to all of calculus and continuous growth." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Evaluate", problem: "For $f(x) = 2^x$, find $f(3)$.", steps: ["$2^3$.", "$= 8$."], answer: "$f(3) = 8$." },
        { title: "Decay", problem: "A sample halves each year, starting at $80\\,\\text{g}$. How much after 2 years?", steps: ["Year 1: $40$.", "Year 2: $20$."], answer: "$20\\,\\text{g}$." },
        { title: "Growth vs linear", problem: "Compare adding 3 each step vs tripling each step, from 1, after 3 steps.", steps: ["Linear: $1,4,7,10$.", "Exponential: $1,3,9,27$."], answer: "Exponential reaches 27 vs 10." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Growth multiplies; decay shrinks toward zero." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Evaluate and graph exponentials." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: why e is natural", content: { markdown: "Compound interest at rate $100\\%$ split into more and more periods approaches a limit: $\\left(1 + \\tfrac1n\\right)^n \\to e$ as $n \\to \\infty$. The function $e^x$ is the unique exponential whose **rate of growth equals its own value** — its derivative is itself. That self-replicating property makes $e^x$ the backbone of continuous growth, differential equations, and the link between exponentials and the trigonometric waves via Euler's formula." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Exponential functions $f(x) = a\\,b^x$ put the variable in the exponent.", "$b > 1$ is growth; $0 < b < 1$ is decay.", "Exponentials multiply by a fixed factor; linear functions add.", "Growth has a doubling time; decay has a half-life.", "The natural base $e \\approx 2.718$ gives $e^x$, central to calculus."], formulas: [{ label: "Exponential", tex: "f(x) = a\\,b^{x}" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "For $f(x) = 2^x$, find $f(3)$.", answer: { value: 8, tolerance: 0 }, explanation: "$2^3 = 8$." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "If the base $b$ satisfies $0 < b < 1$, the function shows:", options: ["growth", "decay", "linear change", "no change"], answer: 1, explanation: "A base below 1 shrinks each step — decay." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "A sample halves each year from $80\\,\\text{g}$. How much remains after 2 years (grams)?", answer: { value: 20, tolerance: 0 }, explanation: "$80 \\to 40 \\to 20$." },
      { scope: "PRACTICE", kind: "GRAPH", prompt: "Graph the exponential $f(x) = 2^x$. Enter it as a function of $x$.", answer: { expr: "2^x", domain: [-3, 4], variable: "x" }, difficulty: 4, hint: "Doubles each step; always positive.", explanation: "$2^x$ rises steeply and never touches zero." },
      { scope: "PRACTICE", kind: "GRAPH", prompt: "Graph the decay $f(x) = (1/2)^x$. Enter it as a function of $x$ (type like `(1/2)^x`).", answer: { expr: "(1/2)^x", domain: [-3, 4], variable: "x" }, difficulty: 4, hint: "Halves each step.", explanation: "$(1/2)^x$ falls toward zero as $x$ grows." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "For $f(x) = 3^x$, find $f(2)$.", answer: { value: 9, tolerance: 0 }, hint: "$3^2$.", explanation: "$3^2 = 9$." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "Exponential growth eventually overtakes any linear growth.", answer: true, hint: "Multiplying beats adding in the long run.", explanation: "For a base > 1, exponential growth outpaces any line eventually." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "The natural base $e$ is approximately:", options: ["2.718", "3.142", "1.618", "1.414"], answer: 0, hint: "Not π or the golden ratio.", explanation: "$e \\approx 2.718$." },
    ],
  },

  // ───────────────────────── 2. Logarithms ─────────────────────────
  {
    slug: "logarithms",
    title: "Logarithms",
    tagline: "Undoing the exponent",
    estMinutes: 15,
    xpReward: 160,
    difficulty: 4,
    sections: [
      { kind: "HERO", content: { scene: "city", headline: "The Inverse Question", sub: "Exponentials ask 'what do we get?' Logarithms ask the reverse: 'what power was used?'" } },
      { kind: "CONTEXT", title: "Taming huge numbers", content: { markdown: "Earthquakes, sound levels, acidity, star brightness — all are measured on **logarithmic** scales, because the raw quantities span billions. A logarithm compresses enormous ranges into manageable numbers by asking a single question: *to what power must we raise the base?*" } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "A **logarithm** is the inverse of an exponential. By definition,\n\n$$\\log_b y = x \\iff b^{x} = y.$$\n\nIn words: $\\log_b y$ is the power you raise $b$ to in order to get $y$. For example $\\log_2 8 = 3$ because $2^3 = 8$.\n\nCommon bases: $\\log_{10}$ ('log', used for pH and decibels) and $\\log_e = \\ln$ (the 'natural log').\n\nThe **laws of logarithms** turn multiplication into addition:\n\n$$\\log(xy) = \\log x + \\log y, \\quad \\log\\!\\frac{x}{y} = \\log x - \\log y, \\quad \\log(x^n) = n\\log x.$$\n\nThese laws are why logarithms historically powered slide rules and hand computation, and why they appear whenever we solve for a variable stuck in an exponent." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Evaluate", problem: "Find $\\log_2 8$.", steps: ["Ask: $2$ to what power is $8$?", "$2^3 = 8$."], answer: "$\\log_2 8 = 3$." },
        { title: "Base 10", problem: "Find $\\log_{10} 1000$.", steps: ["$10$ to what power is $1000$?", "$10^3 = 1000$."], answer: "$3$." },
        { title: "Product law", problem: "Write $\\log(8 \\cdot 4)$ as a sum, base 2.", steps: ["$\\log_2 8 + \\log_2 4$.", "$3 + 2$."], answer: "$= 5$." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "A log asks: what power gives this number?" } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Translate between exponent and log form." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: solving for an unknown exponent", content: { markdown: "Logs are the tool for equations like $2^x = 50$. Take a log of both sides: $x\\log 2 = \\log 50$, so $x = \\dfrac{\\log 50}{\\log 2} \\approx 5.64$. This 'take the log of both sides' move solves for any variable trapped in an exponent — exactly what's needed for half-life problems, compound interest, and the time constants of every charging capacitor and cooling cup of coffee." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["A logarithm is the inverse of an exponential: $\\log_b y = x \\iff b^x = y$.", "$\\log_b y$ is the power giving $y$ from base $b$.", "Common logs: base 10 ('log') and base $e$ ('ln').", "Product → sum: $\\log(xy) = \\log x + \\log y$; powers come down: $\\log(x^n) = n\\log x$.", "Logs solve for a variable in an exponent."], formulas: [{ label: "Definition", tex: "\\log_b y = x \\iff b^x = y" }, { label: "Product law", tex: "\\log(xy) = \\log x + \\log y" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "Find $\\log_2 8$.", answer: { value: 3, tolerance: 0 }, explanation: "$2^3 = 8$." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "Find $\\log_{10} 1000$.", answer: { value: 3, tolerance: 0 }, explanation: "$10^3 = 1000$." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "$\\log_b y = x$ means the same as:", options: ["$b\\cdot x = y$", "$b^x = y$", "$x^b = y$", "$y^x = b$"], answer: 1, explanation: "A log is an exponent: $b^x = y$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Find $\\log_2 16$.", answer: { value: 4, tolerance: 0 }, hint: "$2$ to what power is 16?", explanation: "$2^4 = 16$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Using $\\log_2(8\\cdot 4) = \\log_2 8 + \\log_2 4$, evaluate it.", answer: { value: 5, tolerance: 0 }, hint: "$3 + 2$.", explanation: "$\\log_2 32 = 5$." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "$\\log(xy) = \\log x + \\log y$.", answer: true, hint: "Products become sums.", explanation: "This is the product law of logarithms." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Find $\\ln(e)$ (natural log of $e$).", answer: { value: 1, tolerance: 0.001 }, hint: "What power of $e$ gives $e$?", explanation: "$\\ln e = 1$ since $e^1 = e$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Logarithms turn multiplication into:", options: ["division", "addition", "subtraction", "powers"], answer: 1, hint: "The product law.", explanation: "$\\log(xy) = \\log x + \\log y$ — products become sums." },
    ],
  },

  // ───────────────────────── 3. Introduction to Limits ─────────────────────────
  {
    slug: "introduction-to-limits",
    title: "Introduction to Limits",
    tagline: "Approaching without arriving",
    estMinutes: 16,
    xpReward: 170,
    difficulty: 5,
    sections: [
      { kind: "HERO", content: { scene: "city", headline: "What It Heads Toward", sub: "The single idea — what a function approaches near a point — is the doorway to all of calculus." } },
      { kind: "CONTEXT", title: "The threshold of calculus", content: { markdown: "On the steps of the university, mathematics changes character. Instead of asking 'what is the value here?', we ask 'what value does the function **approach** as we get arbitrarily close?' That subtle shift — the **limit** — is what lets us handle instantaneous speed, the slope of a curve, and the area under it." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "The **limit** of $f(x)$ as $x$ approaches $a$ is the value $f(x)$ gets arbitrarily close to as $x$ gets close to $a$ — written\n\n$$\\lim_{x \\to a} f(x) = L.$$\n\nCrucially, the limit is about the **approach**, not the value *at* $a$ — the function need not even be defined there.\n\n- For a 'nice' (continuous) function, just substitute: $\\lim_{x\\to 2}(x^2) = 4$.\n- The famous case is $f(x) = \\dfrac{x^2 - 1}{x - 1}$. At $x = 1$ it's $\\tfrac00$ — undefined. But for every other $x$ it simplifies to $x + 1$, so as $x \\to 1$ the function approaches $2$. The limit is $2$ even though $f(1)$ doesn't exist.\n\nA limit exists only if the approach from the **left** and from the **right** agree." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Substitute", problem: "Find $\\lim_{x\\to 3}(2x + 1)$.", steps: ["Continuous — substitute.", "$2(3) + 1 = 7$."], answer: "$7$." },
        { title: "Indeterminate form", problem: "Find $\\lim_{x\\to 1}\\dfrac{x^2 - 1}{x - 1}$.", steps: ["Factor: $\\dfrac{(x-1)(x+1)}{x-1}$.", "Cancel: $x + 1$.", "As $x\\to1$: $2$."], answer: "$2$." },
        { title: "One-sided check", problem: "Why might a limit fail to exist?", steps: ["Left and right approaches differ.", "Then there's no single value."], answer: "The two sides disagree." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "A limit is what the function approaches, not its value at the point." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Substitute when continuous; factor to resolve 0/0." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: limits build the derivative", content: { markdown: "The slope of a curve at a single point is a $\\tfrac00$ puzzle — you'd need two points to find a slope, but you only have one. Limits resolve it: take the slope between $x$ and a nearby $x + h$, then let $h \\to 0$. That limit, $\\displaystyle\\lim_{h\\to 0}\\dfrac{f(x+h)-f(x)}{h}$, is the **derivative** — the exact instantaneous rate of change. Every idea in differential calculus rests on the limit you've just met." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["A limit is the value $f(x)$ approaches as $x \\to a$.", "It concerns the approach, not the value at $a$.", "For continuous functions, substitute to evaluate.", "Factor and cancel to resolve $0/0$ forms.", "A limit exists only if left and right approaches agree."], formulas: [{ label: "Limit", tex: "\\lim_{x\\to a} f(x) = L" }, { label: "Derivative (preview)", tex: "\\lim_{h\\to 0}\\dfrac{f(x+h)-f(x)}{h}" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "Evaluate $\\lim_{x\\to 3}(2x + 1)$.", answer: { value: 7, tolerance: 0 }, explanation: "Continuous — substitute: $2(3)+1 = 7$." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "Evaluate $\\lim_{x\\to 2}(x^2)$.", answer: { value: 4, tolerance: 0 }, explanation: "$2^2 = 4$." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "A function must be defined at $x = a$ for $\\lim_{x\\to a} f(x)$ to exist.", answer: false, explanation: "The limit is about the approach, not the value at $a$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Evaluate $\\lim_{x\\to 1}\\dfrac{x^2 - 1}{x - 1}$ (factor and cancel).", answer: { value: 2, tolerance: 0 }, hint: "$\\dfrac{(x-1)(x+1)}{x-1} = x+1$.", explanation: "It simplifies to $x + 1 \\to 2$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Evaluate $\\lim_{x\\to 0}(5 - 3x)$.", answer: { value: 5, tolerance: 0 }, hint: "Substitute 0.", explanation: "$5 - 0 = 5$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A two-sided limit exists only if:", options: ["the function is defined there", "left and right limits agree", "the function is linear", "$x = 0$"], answer: 1, hint: "Both approaches must match.", explanation: "The limit exists when the left and right approaches give the same value." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Evaluate $\\lim_{x\\to 4}\\sqrt{x}$.", answer: { value: 2, tolerance: 0 }, hint: "Continuous — substitute.", explanation: "$\\sqrt{4} = 2$." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "The derivative is defined as a limit.", answer: true, hint: "Slope between points as the gap shrinks.", explanation: "The derivative is the limit of the difference quotient as $h \\to 0$." },
    ],
  },
];
