import type { LessonSeed } from "../types.js";

/**
 * The Engineering District (grades 9–10): functions and their graphs — the
 * input-output machines that model the world. Function notation, linear
 * functions & slope, and quadratic functions. Heavy use of the locally graded
 * GRAPH and SYMBOLIC types. All original content.
 */
export const engineeringDistrictLessons: LessonSeed[] = [
  // ───────────────────────── 1. What Is a Function ─────────────────────────
  {
    slug: "what-is-a-function",
    title: "What Is a Function?",
    tagline: "One input, one output",
    estMinutes: 14,
    xpReward: 150,
    difficulty: 3,
    sections: [
      { kind: "HERO", content: { scene: "city", headline: "The Machine Rule", sub: "Feed in a number, get exactly one number out. That reliable, single-valued rule is a function." } },
      { kind: "CONTEXT", title: "Machines on Gear Street", content: { markdown: "Every machine in the district takes an input and produces an output: put in raw steel, get out a bolt; put in $3$, get out $7$. A **function** is the mathematical version — a rule that assigns to each input **exactly one** output. That predictability is what makes functions the language of science and engineering." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "A **function** assigns to every input exactly **one** output. We write\n\n$$f(x) = 2x + 1,$$\n\nread '$f$ of $x$ equals $2x+1$'. Here $x$ is the **input**; $f(x)$ is the **output**.\n\n- To **evaluate**, substitute: $f(3) = 2(3) + 1 = 7$.\n- The **domain** is the set of allowed inputs; the **range** is the set of outputs produced.\n- The defining rule: **one input → one output**. A relation that sends one input to two different outputs is *not* a function.\n\n**Vertical line test:** on a graph, if any vertical line crosses the curve more than once, it fails — that input would have two outputs, so it isn't a function." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Evaluate", problem: "For $f(x) = 2x + 1$, find $f(3)$.", steps: ["Substitute $x = 3$.", "$2(3) + 1 = 7$."], answer: "$f(3) = 7$." },
        { title: "Evaluate at a negative", problem: "For $f(x) = x^2 - 1$, find $f(-2)$.", steps: ["$(-2)^2 - 1$.", "$4 - 1 = 3$."], answer: "$f(-2) = 3$." },
        { title: "Function or not?", problem: "Does the rule 'output any number whose square is the input' define a function?", steps: ["Input 9 could give 3 or −3.", "One input, two outputs."], answer: "No — it is not a function." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "One input, exactly one output." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Substitute carefully; watch signs." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: composing functions", content: { markdown: "Functions can be chained: the output of one becomes the input of the next. If $f(x) = 2x$ and $g(x) = x + 1$, then $f(g(x)) = f(x+1) = 2(x+1) = 2x + 2$. This **composition**, written $(f \\circ g)(x)$, is how complex processes are built from simple steps — and reversing a function gives its **inverse**, the idea behind logarithms and square roots." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["A function gives each input exactly one output.", "$f(x)$ notation: input $x$, output $f(x)$.", "Evaluate by substituting the input.", "Domain = allowed inputs; range = outputs produced.", "Vertical line test: one input can't have two outputs."], formulas: [{ label: "Function notation", tex: "y = f(x)" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "For $f(x) = 2x + 1$, find $f(3)$.", answer: { value: 7, tolerance: 0 }, explanation: "$2(3)+1 = 7$." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "For $f(x) = x^2 - 1$, find $f(-2)$.", answer: { value: 3, tolerance: 0 }, explanation: "$(-2)^2 - 1 = 3$." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "A function may assign two different outputs to the same input.", answer: false, explanation: "Exactly one output per input — that's the definition." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "For $f(x) = 5 - 3x$, find $f(2)$.", answer: { value: -1, tolerance: 0 }, hint: "Substitute then compute.", explanation: "$5 - 3(2) = 5 - 6 = -1$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "The vertical line test checks whether a graph:", options: ["passes through the origin", "is a straight line", "is a function", "has positive slope"], answer: 2, hint: "It guards the one-output rule.", explanation: "If a vertical line hits the curve twice, one input has two outputs — not a function." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "For $f(x) = 2x$ and $g(x) = x + 1$, write $f(g(x))$ in simplest form. (Use $x$.)", answer: { expr: "2*(x + 1)", vars: ["x"] }, difficulty: 4, hint: "Put $g(x)$ inside $f$.", explanation: "$f(g(x)) = 2(x+1) = 2x + 2$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "For $f(x) = x^2 + 2x$, find $f(3)$.", answer: { value: 15, tolerance: 0 }, hint: "$9 + 6$.", explanation: "$3^2 + 2(3) = 9 + 6 = 15$." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "The domain of a function is the set of its allowed inputs.", answer: true, hint: "Inputs vs outputs.", explanation: "Domain = inputs; range = outputs." },
    ],
  },

  // ───────────────────────── 2. Linear Functions & Slope ─────────────────────────
  {
    slug: "linear-functions-and-slope",
    title: "Linear Functions & Slope",
    tagline: "Straight lines and steady rates",
    estMinutes: 15,
    xpReward: 150,
    difficulty: 3,
    sections: [
      { kind: "HERO", content: { scene: "city", headline: "A Constant Rate", sub: "A linear function changes by the same amount every step. Its graph is a straight line, and its slope is its rate." } },
      { kind: "CONTEXT", title: "Steady machines", content: { markdown: "A conveyor that adds the same number of parts each minute, a tank that drains at a fixed rate — these are **linear** processes. Their defining feature is a **constant rate of change**, which shows up as a straight-line graph. Linear functions are the simplest and most common model in all of engineering." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "A **linear function** has the form\n\n$$f(x) = mx + b,$$\n\nwhose graph is a straight line.\n\n- $m$ is the **slope** — the change in output per unit change in input: $m = \\dfrac{\\Delta y}{\\Delta x} = \\dfrac{\\text{rise}}{\\text{run}}$.\n- $b$ is the **$y$-intercept** — the output when $x = 0$, where the line crosses the vertical axis.\n\nSlope between two points $(x_1, y_1)$ and $(x_2, y_2)$:\n\n$$m = \\frac{y_2 - y_1}{x_2 - x_1}.$$\n\nA positive slope rises, a negative slope falls, a zero slope is horizontal. The bigger $|m|$, the steeper the line." } },
      { kind: "SIMULATION", title: "Try it: number line", content: { simId: "number-line", intro: "See how scaling and shifting move points — the one-dimensional view of slope and intercept." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Slope from two points", problem: "Find the slope through $(1, 2)$ and $(3, 8)$.", steps: ["$m = \\dfrac{8 - 2}{3 - 1}$.", "$= \\dfrac{6}{2} = 3$."], answer: "Slope $m = 3$." },
        { title: "Read the line", problem: "Give the slope and intercept of $f(x) = -2x + 5$.", steps: ["Compare to $mx + b$.", "$m = -2$, $b = 5$."], answer: "Slope $-2$, intercept $5$." },
        { title: "Evaluate", problem: "For $f(x) = 3x - 4$, find $f(2)$.", steps: ["$3(2) - 4$.", "$6 - 4 = 2$."], answer: "$f(2) = 2$." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Slope is rise over run; $b$ is the intercept." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Find slopes, read lines, and graph them." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: parallel and perpendicular", content: { markdown: "Two lines are **parallel** exactly when they have the **same slope** — they rise at the same rate and never meet. They are **perpendicular** when their slopes are **negative reciprocals**: if one has slope $m$, the other has slope $-\\tfrac{1}{m}$ (so $2$ and $-\\tfrac12$). These slope relationships turn geometry questions about lines into quick algebra." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Linear functions $f(x) = mx + b$ graph as straight lines.", "Slope $m$ = rise/run = change in output per unit input.", "$b$ is the $y$-intercept (output at $x = 0$).", "Slope between points: $(y_2-y_1)/(x_2-x_1)$.", "Parallel lines share a slope; perpendicular slopes are negative reciprocals."], formulas: [{ label: "Slope", tex: "m = \\dfrac{y_2 - y_1}{x_2 - x_1}" }, { label: "Linear function", tex: "f(x) = mx + b" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "Find the slope of the line through $(1, 2)$ and $(3, 8)$.", answer: { value: 3, tolerance: 0 }, explanation: "$(8-2)/(3-1) = 6/2 = 3$." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "For $f(x) = -2x + 5$, what is the $y$-intercept?", answer: { value: 5, tolerance: 0 }, explanation: "$b = 5$." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "A line with slope $0$ is:", options: ["vertical", "horizontal", "rising", "falling"], answer: 1, explanation: "Zero slope means no rise — horizontal." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "For $f(x) = 3x - 4$, find $f(2)$.", answer: { value: 2, tolerance: 0 }, hint: "Substitute $x = 2$.", explanation: "$3(2) - 4 = 2$." },
      { scope: "PRACTICE", kind: "GRAPH", prompt: "Graph the linear function $f(x) = -2x + 5$. Enter it as a function of $x$.", answer: { expr: "-2*x + 5", domain: [-3, 5], variable: "x" }, difficulty: 3, hint: "Slope −2, intercept 5.", explanation: "A line falling 2 for every step right, crossing the $y$-axis at 5." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A line parallel to $y = 3x + 1$ has slope:", options: ["$-3$", "$\\tfrac13$", "$3$", "$-\\tfrac13$"], answer: 2, hint: "Parallel lines share a slope.", explanation: "Same slope, $3$." },
      { scope: "PRACTICE", kind: "GRAPH", prompt: "Graph the line through the origin with slope $\\tfrac12$. Enter $y$ as a function of $x$.", answer: { expr: "x/2", domain: [-6, 6], variable: "x" }, difficulty: 3, hint: "Slope ½, intercept 0.", explanation: "$y = \\tfrac12 x$ — a gentle line through the origin." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Find the slope through $(2, 1)$ and $(6, 9)$.", answer: { value: 2, tolerance: 0 }, hint: "Rise over run.", explanation: "$(9-1)/(6-2) = 8/4 = 2$." },
    ],
  },

  // ───────────────────────── 3. Quadratic Functions ─────────────────────────
  {
    slug: "quadratic-functions",
    title: "Quadratic Functions",
    tagline: "The shape of a parabola",
    estMinutes: 16,
    xpReward: 160,
    difficulty: 4,
    sections: [
      { kind: "HERO", content: { scene: "city", headline: "The Curve of a Throw", sub: "Squaring the input bends the straight line into a parabola — the arc of every thrown ball and cable bridge." } },
      { kind: "CONTEXT", title: "Arcs in the skyline", content: { markdown: "The cable of a suspension bridge, the spray of a fountain, the path of a tossed wrench — all trace the same curve, a **parabola**. It's the graph of a **quadratic function**, the next step up from linear, and the first time a graph bends." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "A **quadratic function** has the form\n\n$$f(x) = ax^2 + bx + c, \\qquad a \\ne 0.$$\n\nIts graph is a **parabola**.\n\n- If $a > 0$ the parabola opens **upward** (a valley); if $a < 0$ it opens **downward** (a hill).\n- The turning point is the **vertex** — the minimum or maximum.\n- The parabola is **symmetric** about the vertical line through its vertex.\n- The simplest case $f(x) = x^2$ has its vertex at the origin and opens upward.\n\nAdding a constant shifts it vertically: $x^2 - 4$ is $x^2$ slid down 4, crossing the $x$-axis at $x = \\pm 2$ (its **roots**, where $f(x) = 0$)." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Evaluate", problem: "For $f(x) = x^2 - 4$, find $f(3)$.", steps: ["$3^2 - 4$.", "$9 - 4 = 5$."], answer: "$f(3) = 5$." },
        { title: "Find the roots", problem: "Where does $f(x) = x^2 - 9$ equal zero?", steps: ["$x^2 - 9 = 0$.", "$x^2 = 9$, so $x = \\pm 3$."], answer: "$x = 3$ and $x = -3$." },
        { title: "Expand", problem: "Write $(x + 1)(x + 2)$ as a quadratic.", steps: ["Multiply out.", "$x^2 + 2x + x + 2$."], answer: "$x^2 + 3x + 2$." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Parabolas open up if $a>0$, down if $a<0$." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Evaluate, expand, and graph parabolas." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: the vertex form", content: { markdown: "Any quadratic can be rewritten as $f(x) = a(x - h)^2 + k$, where $(h, k)$ is the **vertex**. This **vertex form** makes the graph's position obvious: $h$ shifts it horizontally, $k$ vertically. Getting there from $ax^2 + bx + c$ is called **completing the square** — the same algebraic move that produces the quadratic formula $x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$ for the roots." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Quadratics $f(x) = ax^2 + bx + c$ graph as parabolas.", "$a > 0$ opens up (min); $a < 0$ opens down (max).", "The vertex is the turning point; the parabola is symmetric about it.", "Roots are where $f(x) = 0$ (x-axis crossings).", "Vertex form $a(x-h)^2 + k$ reveals the vertex $(h,k)$."], formulas: [{ label: "Quadratic", tex: "f(x) = ax^2 + bx + c" }, { label: "Roots", tex: "x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "For $f(x) = x^2 - 4$, find $f(3)$.", answer: { value: 5, tolerance: 0 }, explanation: "$9 - 4 = 5$." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "The graph of a quadratic function is a:", options: ["straight line", "parabola", "circle", "zigzag"], answer: 1, explanation: "Quadratics graph as parabolas." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "If $a < 0$ in $ax^2 + bx + c$, the parabola opens:", options: ["upward", "downward", "sideways", "it doesn't"], answer: 1, explanation: "Negative leading coefficient opens downward." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "Expand $(x + 1)(x + 2)$. (Use $x$.)", answer: { expr: "x^2 + 3*x + 2", vars: ["x"] }, difficulty: 4, hint: "Multiply each pair of terms.", explanation: "$(x+1)(x+2) = x^2 + 3x + 2$." },
      { scope: "PRACTICE", kind: "GRAPH", prompt: "Graph the parabola $f(x) = x^2 - 4$. Enter it as a function of $x$.", answer: { expr: "x^2 - 4", domain: [-3, 3], variable: "x" }, difficulty: 4, hint: "$x^2$ shifted down 4.", explanation: "A valley parabola with vertex $(0,-4)$, crossing the axis at $x = \\pm 2$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "The roots of $f(x) = x^2 - 9$ are:", options: ["$x = 9$ only", "$x = 3$ and $x = -3$", "$x = 0$", "no real roots"], answer: 1, hint: "Solve $x^2 = 9$.", explanation: "$x = \\pm 3$." },
      { scope: "PRACTICE", kind: "GRAPH", prompt: "Graph $f(x) = x^2$. Enter it as a function of $x$.", answer: { expr: "x^2", domain: [-3, 3], variable: "x" }, difficulty: 3, hint: "The basic parabola.", explanation: "Vertex at the origin, opening upward." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "For $f(x) = 2x^2 + 1$, find $f(2)$.", answer: { value: 9, tolerance: 0 }, hint: "$2(4) + 1$.", explanation: "$2(2)^2 + 1 = 8 + 1 = 9$." },
    ],
  },
];
