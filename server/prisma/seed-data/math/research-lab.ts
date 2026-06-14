import type { LessonSeed } from "../types.js";

/**
 * The Research Lab (grade 12 / undergraduate): calculus — the mathematics of
 * change. The derivative as instantaneous rate, the rules of differentiation,
 * and integration as antiderivative and area. SYMBOLIC/GRAPH/NUMERIC led, with
 * a PROOF of the power rule's first case. All original content.
 */
export const researchLabLessons: LessonSeed[] = [
  // ───────────────────────── 1. The Derivative ─────────────────────────
  {
    slug: "the-derivative",
    title: "The Derivative",
    tagline: "The slope at a single instant",
    estMinutes: 17,
    xpReward: 180,
    difficulty: 5,
    sections: [
      { kind: "HERO", content: { scene: "city", headline: "Instantaneous Change", sub: "How fast is something changing at one exact moment? The derivative answers — by taming a 0/0 with a limit." } },
      { kind: "CONTEXT", title: "Speed at an instant", content: { markdown: "A speedometer shows your speed *right now*, not your average over the trip. But speed is distance over time — and at a single instant, no time passes. The **derivative** resolves this paradox using limits, giving the exact rate of change at a point. It is the central object of differential calculus." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "The **derivative** of $f$ at $x$ is the slope of its graph there — the limit of the slope between $x$ and a nearby point as the gap shrinks to zero:\n\n$$f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}.$$\n\nIt measures the **instantaneous rate of change**: velocity is the derivative of position; acceleration is the derivative of velocity.\n\nThe workhorse is the **power rule**:\n\n$$\\frac{d}{dx}\\,x^{n} = n\\,x^{\\,n-1}.$$\n\nSo $\\dfrac{d}{dx}x^2 = 2x$, $\\dfrac{d}{dx}x^3 = 3x^2$, and the derivative of a constant is $0$ (a flat line has no slope). The derivative of $x$ itself is $1$.\n\nReading a derivative: where $f' > 0$ the function rises; where $f' < 0$ it falls; where $f' = 0$ it has a flat spot — a peak, valley, or plateau." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Power rule", problem: "Differentiate $f(x) = x^2$.", steps: ["Bring the power down, subtract one.", "$2x^{2-1} = 2x$."], answer: "$f'(x) = 2x$." },
        { title: "Evaluate a slope", problem: "For $f(x) = x^2$, find the slope at $x = 3$.", steps: ["$f'(x) = 2x$.", "$f'(3) = 6$."], answer: "Slope $= 6$." },
        { title: "Constant", problem: "Differentiate $f(x) = 7$.", steps: ["A constant never changes.", "Slope is 0."], answer: "$f'(x) = 0$." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Power rule: bring down the power, subtract one." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Differentiate, then evaluate slopes." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: deriving the power rule for x²", content: { markdown: "From the definition, $f'(x) = \\lim_{h\\to0}\\dfrac{(x+h)^2 - x^2}{h}$. Expand the top: $(x^2 + 2xh + h^2) - x^2 = 2xh + h^2$. Divide by $h$: $2x + h$. Now let $h \\to 0$: the $h$ vanishes, leaving $2x$. That's the power rule's first case, built straight from the limit — and every other derivative rule is proved the same patient way." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["The derivative is the instantaneous slope: a limit of average slopes.", "$f'(x) = \\lim_{h\\to0}\\frac{f(x+h)-f(x)}{h}$.", "Power rule: $\\frac{d}{dx}x^n = nx^{n-1}$.", "The derivative of a constant is 0.", "$f' > 0$ rising, $f' < 0$ falling, $f' = 0$ flat."], formulas: [{ label: "Derivative", tex: "f'(x) = \\lim_{h\\to0}\\dfrac{f(x+h)-f(x)}{h}" }, { label: "Power rule", tex: "\\dfrac{d}{dx}x^n = nx^{n-1}" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "The derivative of $x^2$ is:", options: ["$x$", "$2x$", "$x^2$", "$2$"], answer: 1, explanation: "Power rule: $2x^{2-1} = 2x$." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "For $f(x) = x^2$, find the slope $f'(3)$.", answer: { value: 6, tolerance: 0 }, explanation: "$f'(x) = 2x$, so $f'(3) = 6$." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "What is the derivative of the constant $f(x) = 7$?", answer: { value: 0, tolerance: 0 }, explanation: "A constant has zero slope." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "Differentiate $f(x) = x^3$. (Use $x$; type like `3x^2`.)", answer: { expr: "3*x^2", vars: ["x"] }, difficulty: 4, hint: "Bring the 3 down, subtract one from the power.", explanation: "$\\frac{d}{dx}x^3 = 3x^2$." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "Differentiate $f(x) = x^2$. (Use $x$.)", answer: { expr: "2*x", vars: ["x"] }, difficulty: 3, hint: "Power rule.", explanation: "$\\frac{d}{dx}x^2 = 2x$." },
      { scope: "PRACTICE", kind: "GRAPH", prompt: "The derivative of $f(x) = x^2$ is $f'(x) = 2x$. Graph the derivative (enter it as a function of $x$).", answer: { expr: "2*x", domain: [-5, 5], variable: "x" }, difficulty: 4, hint: "It's a straight line.", explanation: "$f'(x) = 2x$ — a line through the origin with slope 2." },
      { scope: "PRACTICE", kind: "PROOF", prompt: "Arrange the derivation of $\\frac{d}{dx}x^2 = 2x$ from the definition.", options: ["Start: $\\lim_{h\\to0}\\dfrac{(x+h)^2 - x^2}{h}$.", "Expand the numerator: $2xh + h^2$.", "Divide by $h$: $2x + h$.", "Let $h\\to0$: the limit is $2x$."], answer: [], difficulty: 5, hint: "Expand, divide, then take the limit.", explanation: "Expanding and dividing gives $2x + h$; sending $h\\to0$ yields $2x$." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "Where $f'(x) = 0$, the graph of $f$ has a flat spot (peak, valley, or plateau).", answer: true, hint: "Zero slope means level.", explanation: "A zero derivative means the tangent is horizontal." },
    ],
  },

  // ───────────────────────── 2. Rules of Differentiation ─────────────────────────
  {
    slug: "rules-of-differentiation",
    title: "Rules of Differentiation",
    tagline: "Building bigger derivatives",
    estMinutes: 16,
    xpReward: 170,
    difficulty: 5,
    sections: [
      { kind: "HERO", content: { scene: "city", headline: "Combine and Conquer", sub: "A few rules let you differentiate any polynomial — and, with more, almost any function you'll meet." } },
      { kind: "CONTEXT", title: "Beyond a single power", content: { markdown: "Real functions are sums and products of many terms. Rather than returning to the limit each time, calculus gives **rules** that combine known derivatives. Master a handful and you can differentiate any polynomial instantly." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "Building on the power rule, $\\dfrac{d}{dx}x^n = nx^{n-1}$:\n\n- **Constant multiple:** $\\dfrac{d}{dx}\\big(c\\,f(x)\\big) = c\\,f'(x)$. A constant factor rides along.\n- **Sum rule:** $\\dfrac{d}{dx}\\big(f + g\\big) = f' + g'$. Differentiate term by term.\n- **Constant:** the derivative of any constant is $0$.\n\nTogether these differentiate any polynomial. For $f(x) = 3x^2 + 5x - 4$:\n\n$$f'(x) = 3(2x) + 5(1) - 0 = 6x + 5.$$\n\nThe **second derivative** $f''(x)$ — the derivative of the derivative — measures how the rate itself changes (in motion, that's acceleration). For more complex functions there are the product, quotient, and chain rules, but the constant-multiple and sum rules already unlock all of polynomial calculus." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Polynomial", problem: "Differentiate $f(x) = 3x^2 + 5x - 4$.", steps: ["Term by term.", "$6x + 5 - 0$."], answer: "$f'(x) = 6x + 5$." },
        { title: "Constant multiple", problem: "Differentiate $f(x) = 5x^2$.", steps: ["Keep the 5, differentiate $x^2$.", "$5 \\cdot 2x$."], answer: "$f'(x) = 10x$." },
        { title: "Second derivative", problem: "For $f(x) = x^3$, find $f''(x)$.", steps: ["$f'(x) = 3x^2$.", "Differentiate again: $6x$."], answer: "$f''(x) = 6x$." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Differentiate term by term; constants vanish." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Apply the power, constant-multiple, and sum rules." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: the chain rule", content: { markdown: "Composite functions need the **chain rule**: $\\dfrac{d}{dx}f(g(x)) = f'(g(x))\\cdot g'(x)$ — differentiate the outer function, then multiply by the derivative of the inside. For example $\\dfrac{d}{dx}(x^2+1)^3 = 3(x^2+1)^2 \\cdot 2x$. The chain rule is the most-used rule in all of calculus, because almost every real function is a composition of simpler ones." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Constant multiple: $\\frac{d}{dx}(cf) = cf'$.", "Sum rule: differentiate term by term.", "The derivative of a constant is 0.", "These rules differentiate any polynomial.", "The second derivative is the derivative of the derivative."], formulas: [{ label: "Sum rule", tex: "(f+g)' = f' + g'" }, { label: "Constant multiple", tex: "(cf)' = c f'" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "SYMBOLIC", prompt: "Differentiate $f(x) = 3x^2 + 5x - 4$. (Use $x$.)", answer: { expr: "6*x + 5", vars: ["x"] }, difficulty: 4, hint: "Term by term; the constant drops.", explanation: "$6x + 5$." },
      { scope: "CONCEPT_CHECK", kind: "SYMBOLIC", prompt: "Differentiate $f(x) = 5x^2$. (Use $x$.)", answer: { expr: "10*x", vars: ["x"] }, difficulty: 3, hint: "Keep the 5; differentiate $x^2$.", explanation: "$5 \\cdot 2x = 10x$." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "For $f(x) = 3x^2 + 5x - 4$, evaluate $f'(2)$.", answer: { value: 17, tolerance: 0 }, explanation: "$f'(x) = 6x + 5$, so $f'(2) = 17$." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "Differentiate $f(x) = x^3 + x$. (Use $x$.)", answer: { expr: "3*x^2 + 1", vars: ["x"] }, difficulty: 4, hint: "Sum rule.", explanation: "$3x^2 + 1$." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "Find the second derivative of $f(x) = x^3$. (Use $x$.)", answer: { expr: "6*x", vars: ["x"] }, difficulty: 5, hint: "Differentiate $3x^2$ again.", explanation: "$f'(x) = 3x^2$, $f''(x) = 6x$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "For $f(x) = 4x^2$, evaluate $f'(3)$.", answer: { value: 24, tolerance: 0 }, hint: "$f'(x) = 8x$.", explanation: "$8 \\times 3 = 24$." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "The derivative of a sum is the sum of the derivatives.", answer: true, hint: "The sum rule.", explanation: "$(f+g)' = f' + g'$." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "Differentiate $f(x) = 2x^3 - x^2$. (Use $x$.)", answer: { expr: "6*x^2 - 2*x", vars: ["x"] }, difficulty: 4, hint: "Each term by the power rule.", explanation: "$6x^2 - 2x$." },
    ],
  },

  // ───────────────────────── 3. Introduction to Integration ─────────────────────────
  {
    slug: "introduction-to-integration",
    title: "Introduction to Integration",
    tagline: "Adding up the infinitesimal",
    estMinutes: 17,
    xpReward: 180,
    difficulty: 5,
    sections: [
      { kind: "HERO", content: { scene: "city", headline: "Reverse the Derivative", sub: "Integration runs differentiation backward — and, astonishingly, computes the area under any curve." } },
      { kind: "CONTEXT", title: "From rate back to total", content: { markdown: "If a derivative turns position into velocity, can we go the other way — from velocity back to distance travelled? Yes: that's **integration**. It both reverses differentiation and measures accumulated quantities — the area under a curve, the distance from a speed graph, the total from a rate." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "An **antiderivative** of $f$ is a function $F$ whose derivative is $f$: $F'(x) = f(x)$. Reversing the power rule:\n\n$$\\int x^{n}\\,dx = \\frac{x^{\\,n+1}}{n+1} + C \\quad (n \\ne -1).$$\n\nAdd one to the power, divide by the new power. The $+C$ is the **constant of integration** — any constant differentiates to zero, so antiderivatives form a family. For example $\\int 2x\\,dx = x^2 + C$.\n\nThe **definite integral** $\\int_a^b f(x)\\,dx$ is the **signed area** under $f$ between $a$ and $b$. The **Fundamental Theorem of Calculus** ties the two together:\n\n$$\\int_a^b f(x)\\,dx = F(b) - F(a),$$\n\nwhere $F$ is any antiderivative. So areas — once found by painstaking limits of rectangles — collapse to evaluating an antiderivative at two points." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Antiderivative", problem: "Find $\\int 2x\\,dx$.", steps: ["Reverse the power rule.", "$x^{2} + C$."], answer: "$x^2 + C$." },
        { title: "Power rule for integrals", problem: "Find $\\int x^2\\,dx$.", steps: ["Add one to the power, divide.", "$x^3/3 + C$."], answer: "$\\tfrac{x^3}{3} + C$." },
        { title: "Definite integral", problem: "Evaluate $\\int_0^3 2x\\,dx$.", steps: ["Antiderivative $x^2$.", "$3^2 - 0^2 = 9$."], answer: "$9$." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Integration adds one to the power and divides." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Find antiderivatives; evaluate definite integrals as $F(b)-F(a)$." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: why area and antiderivatives are the same", content: { markdown: "Let $A(x)$ be the area under $f$ from a fixed start up to $x$. Nudge $x$ by a tiny $h$: the extra area is a sliver of width $h$ and height about $f(x)$, so $A(x+h) - A(x) \\approx f(x)\\,h$. Divide by $h$ and let $h\\to0$: $A'(x) = f(x)$. The area function *is* an antiderivative — that is the Fundamental Theorem of Calculus, the bridge uniting the two halves of the subject." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["An antiderivative $F$ satisfies $F' = f$.", "Power rule for integrals: $\\int x^n dx = \\frac{x^{n+1}}{n+1} + C$.", "The $+C$ reflects the family of antiderivatives.", "A definite integral is the signed area under the curve.", "Fundamental Theorem: $\\int_a^b f\\,dx = F(b) - F(a)$."], formulas: [{ label: "Power rule (integral)", tex: "\\int x^n\\,dx = \\dfrac{x^{n+1}}{n+1} + C" }, { label: "Fundamental Theorem", tex: "\\int_a^b f\\,dx = F(b) - F(a)" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "An antiderivative of $f$ is a function $F$ such that:", options: ["$F = f$", "$F' = f$", "$F'' = f$", "$F = f'$"], answer: 1, explanation: "Integration reverses differentiation: $F' = f$." },
      { scope: "CONCEPT_CHECK", kind: "SYMBOLIC", prompt: "Find $\\int 2x\\,dx$ (take $C = 0$). (Use $x$.)", answer: { expr: "x^2", vars: ["x"] }, difficulty: 4, hint: "What differentiates to $2x$?", explanation: "$\\frac{d}{dx}x^2 = 2x$, so $\\int 2x\\,dx = x^2 + C$." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "Evaluate $\\int_0^3 2x\\,dx$.", answer: { value: 9, tolerance: 0 }, explanation: "Antiderivative $x^2$: $3^2 - 0 = 9$." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "Find $\\int x^2\\,dx$ (take $C = 0$). (Use $x$; type like `x^3/3`.)", answer: { expr: "x^3/3", vars: ["x"] }, difficulty: 5, hint: "Add one to the power, divide by it.", explanation: "$\\int x^2\\,dx = \\tfrac{x^3}{3} + C$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Evaluate $\\int_0^2 x\\,dx$ (antiderivative $x^2/2$).", answer: { value: 2, tolerance: 0 }, hint: "$\\tfrac{2^2}{2} - 0$.", explanation: "$\\tfrac{4}{2} = 2$." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "A definite integral can be computed as $F(b) - F(a)$ for an antiderivative $F$.", answer: true, hint: "The Fundamental Theorem.", explanation: "That is exactly the Fundamental Theorem of Calculus." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "Find $\\int 3x^2\\,dx$ (take $C = 0$). (Use $x$.)", answer: { expr: "x^3", vars: ["x"] }, difficulty: 4, hint: "What differentiates to $3x^2$?", explanation: "$\\frac{d}{dx}x^3 = 3x^2$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Evaluate $\\int_1^3 2x\\,dx$ (antiderivative $x^2$).", answer: { value: 8, tolerance: 0 }, hint: "$3^2 - 1^2$.", explanation: "$9 - 1 = 8$." },
    ],
  },
];
