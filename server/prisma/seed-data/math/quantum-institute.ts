import type { LessonSeed } from "../types.js";

/**
 * The Quantum Institute (undergraduate): differential equations — the language
 * of change. What a differential equation is, exponential growth/decay models,
 * and the harmonic oscillator. SYMBOLIC/NUMERIC/GRAPH led. All original content.
 */
export const quantumInstituteLessons: LessonSeed[] = [
  // ───────────────────────── 1. What Is a Differential Equation ─────────────────────────
  {
    slug: "what-is-a-differential-equation",
    title: "What Is a Differential Equation?",
    tagline: "Equations about rates of change",
    estMinutes: 15,
    xpReward: 180,
    difficulty: 5,
    sections: [
      { kind: "HERO", content: { scene: "city", headline: "Laws as Equations of Change", sub: "Most laws of nature don't give a quantity directly — they give how fast it changes. That's a differential equation." } },
      { kind: "CONTEXT", title: "How nature writes its rules", content: { markdown: "Newton's second law, radioactive decay, population growth, the flow of heat, the Schrödinger equation — nearly every law of physics is a **differential equation**, a relationship between a quantity and its **derivatives**. Solving one means finding the function that obeys the rule." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "A **differential equation (DE)** relates a function to its derivatives. For example\n\n$$\\frac{dy}{dt} = k\\,y$$\n\nsays 'the rate of change of $y$ is proportional to $y$ itself'.\n\nA **solution** is a function that satisfies the equation. Crucially, solutions are **families** of functions; a specific **initial condition** (a known value at one time) pins down which one.\n\n- The **order** of a DE is the highest derivative it contains. $\\dfrac{dy}{dt} = ky$ is first-order; $\\dfrac{d^2x}{dt^2} = -\\omega^2 x$ is second-order.\n- To **check** a proposed solution, differentiate it and substitute. For $\\dfrac{dy}{dt} = 2y$, try $y = e^{2t}$: its derivative is $2e^{2t} = 2y$. ✓\n\nThe leap from algebra is profound: the unknown isn't a number, it's an entire **function**." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Check a solution", problem: "Is $y = e^{2t}$ a solution of $\\dfrac{dy}{dt} = 2y$?", steps: ["$dy/dt = 2e^{2t}$.", "$2y = 2e^{2t}$. They match."], answer: "Yes." },
        { title: "Order", problem: "What order is $\\dfrac{d^2x}{dt^2} = -x$?", steps: ["Highest derivative is the second.", "Order 2."], answer: "Second-order." },
        { title: "Family of solutions", problem: "Why isn't a DE solution unique?", steps: ["Constants differentiate away.", "Need an initial condition to fix them."], answer: "An initial condition selects one solution." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "A DE links a function to its derivatives; check by substituting." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Identify order and verify solutions." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: modeling with DEs", content: { markdown: "The art is translating a sentence into a DE. 'Cooling is proportional to the temperature gap' becomes Newton's law of cooling $\\dfrac{dT}{dt} = -k(T - T_{\\text{env}})$. 'Population grows but is capped by resources' becomes the logistic equation. Once written, the DE is solved (by hand or numerically) and its solution **predicts the future** — which is exactly how weather, epidemics, and spacecraft trajectories are forecast." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["A differential equation relates a function to its derivatives.", "A solution is a function that satisfies it.", "Solutions come in families; an initial condition picks one.", "Order = the highest derivative present.", "Check a solution by differentiating and substituting."], formulas: [{ label: "Growth equation", tex: "\\dfrac{dy}{dt} = ky" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "A differential equation relates a function to its:", options: ["inverse", "derivatives", "square", "graph only"], answer: 1, explanation: "DEs involve derivatives of the unknown function." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "The unknown in a differential equation is a function, not a single number.", answer: true, explanation: "We solve for an entire function." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "The order of $\\dfrac{d^2x}{dt^2} = -x$ is:", options: ["first", "second", "third", "zero"], answer: 1, explanation: "The highest derivative is the second." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "$y = e^{2t}$ satisfies $\\dfrac{dy}{dt} = 2y$.", answer: true, hint: "Differentiate $e^{2t}$.", explanation: "$dy/dt = 2e^{2t} = 2y$. ✓" },
      { scope: "PRACTICE", kind: "MCQ", prompt: "What extra information selects one solution from the family?", options: ["the order", "an initial condition", "the variable name", "nothing"], answer: 1, hint: "A known value at one point.", explanation: "An initial condition pins down the constants." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "For $\\dfrac{dy}{dt} = ky$ with $y = e^{kt}$, what is $\\dfrac{dy}{dt}$ at $t = 0$ when $k = 3$? (Note $y(0) = 1$.)", answer: { value: 3, tolerance: 0 }, hint: "$dy/dt = ky$, and $y(0) = 1$.", explanation: "$ky = 3\\cdot1 = 3$." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "Newton's second law $F = ma$ is a differential equation, since $a$ is the second derivative of position.", answer: true, hint: "$a = d^2x/dt^2$.", explanation: "Acceleration is a second derivative, making it a DE." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A first-order DE contains derivatives up to the:", options: ["zeroth", "first", "second", "third"], answer: 1, hint: "Order = highest derivative.", explanation: "First-order means the first derivative is the highest." },
    ],
  },

  // ───────────────────────── 2. Exponential Models ─────────────────────────
  {
    slug: "exponential-models",
    title: "Growth & Decay Models",
    tagline: "Solving dy/dt = ky",
    estMinutes: 15,
    xpReward: 170,
    difficulty: 5,
    sections: [
      { kind: "HERO", content: { scene: "city", headline: "The Exponential Solution", sub: "When the rate of change is proportional to the amount, the answer is always an exponential." } },
      { kind: "CONTEXT", title: "Decay, interest, and epidemics", content: { markdown: "Radioactive decay, continuously compounded interest, the early spread of a disease — all obey the same DE, $\\dfrac{dy}{dt} = ky$. Its solution is the single most important function in applied mathematics: the exponential." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "The DE $\\dfrac{dy}{dt} = k\\,y$ — rate proportional to amount — has the general solution\n\n$$y(t) = y_0\\,e^{kt},$$\n\nwhere $y_0 = y(0)$ is the initial value.\n\n- If $k > 0$: **exponential growth** (population, interest).\n- If $k < 0$: **exponential decay** (radioactivity, cooling).\n\nWhy $e$? Because $\\dfrac{d}{dt}e^{kt} = k\\,e^{kt}$ — the exponential is the unique function (up to scale) whose derivative is proportional to itself, exactly what the DE demands.\n\nThe **half-life** (decay) or **doubling time** (growth) is constant and depends only on $|k|$: doubling time $= \\dfrac{\\ln 2}{k}$. This is why carbon dating works — decay is perfectly regular." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Write the solution", problem: "Solve $\\dfrac{dy}{dt} = 3y$ with $y_0 = 2$.", steps: ["General: $y_0 e^{kt}$.", "$k = 3$, $y_0 = 2$."], answer: "$y = 2e^{3t}$." },
        { title: "Growth or decay", problem: "Does $\\dfrac{dy}{dt} = -0.1y$ grow or decay?", steps: ["$k = -0.1 < 0$.", "Decay."], answer: "Exponential decay." },
        { title: "Verify", problem: "Check $y = 5e^{2t}$ solves $y' = 2y$.", steps: ["$y' = 10e^{2t}$.", "$2y = 10e^{2t}$."], answer: "Yes — it matches." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Solution of $y' = ky$ is $y_0 e^{kt}$." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Identify growth vs decay and write solutions." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: separation of variables", content: { markdown: "Where does $e^{kt}$ come from? **Separate the variables**: rewrite $\\dfrac{dy}{dt} = ky$ as $\\dfrac{dy}{y} = k\\,dt$, then integrate both sides: $\\ln|y| = kt + C$. Exponentiating gives $y = e^{kt+C} = y_0 e^{kt}$. This separation technique solves a whole class of first-order DEs — the workhorse method before you reach the more powerful integrating-factor and transform methods." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["$\\dfrac{dy}{dt} = ky$ has solution $y = y_0 e^{kt}$.", "$k > 0$ is growth; $k < 0$ is decay.", "$e^{kt}$ works because its derivative is proportional to itself.", "Doubling time / half-life depends only on $|k|$.", "Separation of variables derives the solution."], formulas: [{ label: "Exponential model", tex: "y(t) = y_0 e^{kt}" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "The solution of $\\dfrac{dy}{dt} = ky$ is:", options: ["$y = kt$", "$y = y_0 e^{kt}$", "$y = y_0 + kt$", "$y = k/t$"], answer: 1, explanation: "Exponential: $y_0 e^{kt}$." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "If $k < 0$ in $\\dfrac{dy}{dt} = ky$, the quantity:", options: ["grows", "decays", "stays constant", "oscillates"], answer: 1, explanation: "Negative $k$ gives decay." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "$y = 5e^{2t}$ satisfies $y' = 2y$.", answer: true, explanation: "$y' = 10e^{2t} = 2y$." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "Solve $\\dfrac{dy}{dt} = 3y$ with $y_0 = 2$. Write $y(t)$. (Use $t$; type like `2*e^(3*t)`.)", answer: { expr: "2*e^(3*t)", vars: ["t"] }, difficulty: 5, hint: "$y_0 e^{kt}$ with $y_0 = 2$, $k = 3$.", explanation: "$y = 2e^{3t}$." },
      { scope: "PRACTICE", kind: "GRAPH", prompt: "Graph the decay $y = e^{-t}$ (i.e. $k = -1$, $y_0 = 1$). Enter $y$ as a function of $t$ (use $x$ for $t$; type like `e^(-x)`).", answer: { expr: "e^(-x)", domain: [0, 5], variable: "x" }, difficulty: 5, hint: "Starts at 1, decays toward 0.", explanation: "$y = e^{-t}$ — exponential decay." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "For $y = y_0 e^{kt}$, what is $y$ at $t = 0$ if $y_0 = 7$?", answer: { value: 7, tolerance: 0 }, hint: "$e^0 = 1$.", explanation: "$y(0) = y_0 = 7$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Carbon dating works because radioactive decay has a:", options: ["random rate", "constant half-life", "growing rate", "zero rate"], answer: 1, hint: "Regular, predictable decay.", explanation: "A fixed half-life makes decay a reliable clock." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "Separation of variables can solve $\\dfrac{dy}{dt} = ky$.", answer: true, hint: "Move all $y$ to one side, $t$ to the other.", explanation: "Separating and integrating yields $y = y_0 e^{kt}$." },
    ],
  },
];
