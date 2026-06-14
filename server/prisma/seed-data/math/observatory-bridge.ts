import type { LessonSeed } from "../types.js";

/**
 * The Observatory Bridge (grades 10–11): trigonometry — triangles and circles
 * describing everything that turns and oscillates. Right-triangle ratios, the
 * unit circle & radians, and the graphs of sine and cosine. GRAPH and NUMERIC
 * led, with a SYMBOLIC identity. All original content.
 */
export const observatoryBridgeLessons: LessonSeed[] = [
  // ───────────────────────── 1. Right-Triangle Trigonometry ─────────────────────────
  {
    slug: "right-triangle-trig",
    title: "Right-Triangle Trigonometry",
    tagline: "Sides, angles, and SOH-CAH-TOA",
    estMinutes: 15,
    xpReward: 160,
    difficulty: 4,
    sections: [
      { kind: "HERO", content: { scene: "city", headline: "Angles into Lengths", sub: "Three ratios connect an angle to the sides of a right triangle — and let you measure the unreachable." } },
      { kind: "CONTEXT", title: "Measuring the bridge tower", content: { markdown: "How tall is the tower if you can't climb it? Stand back a known distance, measure the angle up to its top, and trigonometry does the rest. The **sine, cosine, and tangent** ratios turn an angle into a length — the surveyor's, astronomer's, and engineer's most basic tool." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "In a right triangle, label the sides relative to an angle $\\theta$: the **opposite**, the **adjacent**, and the **hypotenuse**. The three trig ratios are:\n\n$$\\sin\\theta = \\frac{\\text{opp}}{\\text{hyp}}, \\qquad \\cos\\theta = \\frac{\\text{adj}}{\\text{hyp}}, \\qquad \\tan\\theta = \\frac{\\text{opp}}{\\text{adj}}.$$\n\nRemember **SOH-CAH-TOA**. Since $\\tan\\theta = \\dfrac{\\text{opp}}{\\text{adj}} = \\dfrac{\\sin\\theta}{\\cos\\theta}$, the three are linked.\n\nKey reference values:\n\n- $\\sin 30^\\circ = \\tfrac12$, $\\cos 60^\\circ = \\tfrac12$.\n- $\\sin 45^\\circ = \\cos 45^\\circ = \\tfrac{\\sqrt2}{2} \\approx 0.707$.\n- $\\tan 45^\\circ = 1$.\n\nGiven an angle and one side, these ratios find the others; given two sides, the **inverse** functions ($\\sin^{-1}$, etc.) recover the angle." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Find a side", problem: "A right triangle has hypotenuse $10$ and angle $30^\\circ$. Find the opposite side.", steps: ["$\\sin 30^\\circ = \\text{opp}/10$.", "opp $= 10 \\times \\tfrac12$."], answer: "Opposite $= 5$." },
        { title: "Tangent", problem: "If opp $= 3$ and adj $= 4$, find $\\tan\\theta$.", steps: ["$\\tan\\theta = \\text{opp}/\\text{adj}$.", "$= 3/4$."], answer: "$\\tan\\theta = 0.75$." },
        { title: "Which ratio?", problem: "You know the adjacent side and want the hypotenuse. Which ratio?", steps: ["Adjacent and hypotenuse appear together in cosine.", "$\\cos\\theta = \\text{adj}/\\text{hyp}$."], answer: "Use cosine." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "SOH-CAH-TOA — match the ratio to the sides." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Pick the ratio that links what you know to what you want." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: the law of sines and cosines", content: { markdown: "The basic ratios only work in *right* triangles, but two generalizations handle **any** triangle. The **law of sines**, $\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C}$, links each side to its opposite angle. The **law of cosines**, $c^2 = a^2 + b^2 - 2ab\\cos C$, is the Pythagorean theorem with a correction term for the angle — it reduces to $a^2 + b^2 = c^2$ exactly when $C = 90^\\circ$ (since $\\cos 90^\\circ = 0$)." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Label sides as opposite, adjacent, hypotenuse relative to the angle.", "SOH-CAH-TOA: sin = opp/hyp, cos = adj/hyp, tan = opp/adj.", "$\\tan\\theta = \\sin\\theta/\\cos\\theta$.", "Know the 30-45-60 reference values.", "Inverse trig functions recover an angle from two sides."], formulas: [{ label: "Sine", tex: "\\sin\\theta = \\dfrac{\\text{opp}}{\\text{hyp}}" }, { label: "Tangent", tex: "\\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta}" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "$\\sin\\theta$ is defined as:", options: ["adj/hyp", "opp/hyp", "opp/adj", "hyp/opp"], answer: 1, explanation: "SOH: sine = opposite / hypotenuse." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "A right triangle has hypotenuse $10$ and angle $30^\\circ$. Find the opposite side ($\\sin 30^\\circ = 0.5$).", answer: { value: 5, tolerance: 0 }, explanation: "$10 \\times 0.5 = 5$." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "If opp $= 3$ and adj $= 4$, find $\\tan\\theta$ (as a decimal).", answer: { value: 0.75, tolerance: 0.001 }, explanation: "$3/4 = 0.75$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "You know the adjacent side and the angle, and want the hypotenuse. Use:", options: ["sine", "cosine", "tangent", "Pythagoras only"], answer: 1, hint: "Which ratio pairs adjacent with hypotenuse?", explanation: "$\\cos\\theta = \\text{adj}/\\text{hyp}$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "What is $\\tan 45^\\circ$?", answer: { value: 1, tolerance: 0 }, hint: "Opposite equals adjacent at 45°.", explanation: "$\\tan 45^\\circ = 1$." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "Write $\\tan x$ in terms of $\\sin x$ and $\\cos x$. (Use $x$; type like `sin(x)/cos(x)`.)", answer: { expr: "sin(x)/cos(x)", vars: ["x"] }, difficulty: 4, hint: "Tangent is a ratio of the other two.", explanation: "$\\tan x = \\dfrac{\\sin x}{\\cos x}$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A right triangle has hypotenuse $20$ and angle $60^\\circ$. Find the adjacent side ($\\cos 60^\\circ = 0.5$).", answer: { value: 10, tolerance: 0 }, hint: "$\\cos = $ adj/hyp.", explanation: "$20 \\times 0.5 = 10$." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "$\\sin 45^\\circ$ equals $\\cos 45^\\circ$.", answer: true, hint: "The triangle is symmetric at 45°.", explanation: "Both equal $\\tfrac{\\sqrt2}{2} \\approx 0.707$." },
    ],
  },

  // ───────────────────────── 2. The Unit Circle & Radians ─────────────────────────
  {
    slug: "unit-circle-and-radians",
    title: "The Unit Circle & Radians",
    tagline: "Trig beyond the triangle",
    estMinutes: 15,
    xpReward: 160,
    difficulty: 4,
    sections: [
      { kind: "HERO", content: { scene: "city", headline: "Around the Circle", sub: "Wrap the triangle's angle onto a circle and trigonometry suddenly works for any angle at all." } },
      { kind: "CONTEXT", title: "Why degrees aren't enough", content: { markdown: "Right-triangle trig stops at $90^\\circ$ — but wheels, waves, and orbits turn far past that. The **unit circle** extends sine and cosine to *any* angle, and **radians** give angles a natural measure tied directly to arc length, the unit calculus and physics demand." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "Place a circle of radius $1$ at the origin. For an angle $\\theta$ measured from the positive $x$-axis, the point on the circle is\n\n$$(\\cos\\theta, \\sin\\theta).$$\n\nSo **cosine is the $x$-coordinate and sine is the $y$-coordinate** — definitions that work for *any* angle, including those past $90^\\circ$ and negative ones.\n\n**Radians** measure an angle by the **arc length** it subtends on the unit circle. A full circle is $2\\pi$ radians $= 360^\\circ$, so:\n\n$$180^\\circ = \\pi \\text{ rad}, \\qquad 90^\\circ = \\tfrac{\\pi}{2}, \\qquad 1\\text{ rad} \\approx 57.3^\\circ.$$\n\nConvert with $\\text{rad} = \\text{deg} \\times \\dfrac{\\pi}{180}$. Key values: $\\cos 0 = 1$, $\\sin 0 = 0$, $\\sin\\tfrac{\\pi}{2} = 1$, $\\cos\\pi = -1$." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Degrees to radians", problem: "Convert $90^\\circ$ to radians.", steps: ["$\\times \\pi/180$.", "$90\\pi/180 = \\pi/2$."], answer: "$\\tfrac{\\pi}{2}$ rad." },
        { title: "A coordinate", problem: "What point on the unit circle is at $\\theta = 0$?", steps: ["$(\\cos 0, \\sin 0)$.", "$(1, 0)$."], answer: "$(1, 0)$." },
        { title: "Past 90°", problem: "What is the sign of $\\sin\\theta$ for $\\theta = 200^\\circ$?", steps: ["200° is in the third quadrant.", "There $y < 0$."], answer: "Negative." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Cosine is x, sine is y; full circle is 2π." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Convert angles and read unit-circle coordinates." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: why radians make calculus clean", content: { markdown: "Radians aren't just convenient — they're *necessary* for calculus. Only in radians is $\\lim_{x \\to 0} \\dfrac{\\sin x}{x} = 1$, which makes the derivative of $\\sin x$ exactly $\\cos x$. In degrees that derivative picks up an ugly factor of $\\pi/180$. Because radians tie angle directly to arc length, every rotational formula in physics — angular velocity, torque, wave phase — is written in radians." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["On the unit circle, a point at angle θ is (cos θ, sin θ).", "Cosine is the x-coordinate; sine is the y-coordinate.", "This extends sine and cosine to any angle.", "A full turn is 2π radians = 360°; π rad = 180°.", "Convert with rad = deg × π/180."], formulas: [{ label: "Unit-circle point", tex: "(\\cos\\theta, \\sin\\theta)" }, { label: "Degrees to radians", tex: "\\text{rad} = \\text{deg}\\times\\dfrac{\\pi}{180}" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "On the unit circle, the $x$-coordinate of the point at angle $\\theta$ is:", options: ["$\\sin\\theta$", "$\\cos\\theta$", "$\\tan\\theta$", "$\\theta$"], answer: 1, explanation: "Cosine is the x-coordinate." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "A full circle is how many radians?", options: ["$\\pi$", "$2\\pi$", "$360$", "$\\tfrac{\\pi}{2}$"], answer: 1, explanation: "$2\\pi$ rad $= 360^\\circ$." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "What is $\\sin\\tfrac{\\pi}{2}$?", answer: { value: 1, tolerance: 0.001 }, explanation: "At 90° the $y$-coordinate is 1." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Convert $180^\\circ$ to radians (give the multiple of $\\pi$ as a decimal of $\\pi$ — i.e. type $\\pi \\approx 3.1416$).", answer: { value: 3.1416, tolerance: 0.01 }, hint: "$180^\\circ = \\pi$ rad.", explanation: "$180^\\circ = \\pi \\approx 3.1416$ rad." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "What is $\\cos\\pi$?", answer: { value: -1, tolerance: 0.001 }, hint: "Point at 180° is $(-1, 0)$.", explanation: "$\\cos\\pi = -1$." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "Sine can be negative for angles between $180^\\circ$ and $360^\\circ$.", answer: true, hint: "Below the x-axis, y is negative.", explanation: "In the lower half of the circle the $y$-coordinate (sine) is negative." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Convert $90^\\circ$ to radians (type the decimal, $\\pi/2 \\approx 1.571$).", answer: { value: 1.571, tolerance: 0.01 }, hint: "$90 \\times \\pi/180$.", explanation: "$\\pi/2 \\approx 1.571$ rad." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "What is $\\cos 0$?", answer: { value: 1, tolerance: 0.001 }, hint: "Point at angle 0 is $(1,0)$.", explanation: "$\\cos 0 = 1$." },
    ],
  },

  // ───────────────────────── 3. Graphs of Sine & Cosine ─────────────────────────
  {
    slug: "graphs-of-sine-and-cosine",
    title: "Graphs of Sine & Cosine",
    tagline: "The shape of everything that oscillates",
    estMinutes: 15,
    xpReward: 160,
    difficulty: 4,
    sections: [
      { kind: "HERO", content: { scene: "city", headline: "The Endless Wave", sub: "Unroll the unit circle and sine becomes a wave — the same curve as sound, light, tides, and current." } },
      { kind: "CONTEXT", title: "Waves under the bridge", content: { markdown: "Watch the water below the observatory bridge rise and fall in a smooth, repeating swell. Plot a point's height over time and you get the **sine curve** — nature's signature for anything that repeats: heartbeats, radio, AC power, the seasons." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "As $\\theta$ runs around the unit circle, the $y$-coordinate traces $y = \\sin\\theta$ and the $x$-coordinate traces $y = \\cos\\theta$.\n\nBoth are **periodic** with period $2\\pi$ — they repeat every full turn — and oscillate between $-1$ and $1$.\n\n- **Amplitude**: the peak height. For $y = A\\sin x$ it is $|A|$.\n- **Period**: the length of one cycle. For $y = \\sin(Bx)$ it is $\\dfrac{2\\pi}{B}$ — a larger $B$ squeezes the wave.\n- $\\sin x$ starts at $0$ and rises; $\\cos x$ starts at its peak $1$. Cosine is just sine shifted left by $\\tfrac{\\pi}{2}$.\n\nThese two controls — amplitude and period — let a sine wave model a pure tone, a tide, or an alternating current." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Amplitude", problem: "What is the amplitude of $y = 3\\sin x$?", steps: ["Amplitude is $|A|$.", "$A = 3$."], answer: "Amplitude $= 3$." },
        { title: "Period", problem: "What is the period of $y = \\sin(2x)$?", steps: ["Period $= 2\\pi/B$.", "$B = 2$, so $2\\pi/2$."], answer: "Period $= \\pi$." },
        { title: "Start values", problem: "What is $\\cos x$ at $x = 0$ versus $\\sin x$ at $x = 0$?", steps: ["$\\cos 0 = 1$ (peak).", "$\\sin 0 = 0$ (zero)."], answer: "Cosine starts at 1; sine starts at 0." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Amplitude is the height; period is one cycle." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Read amplitude and period; graph the waves." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: phase and Fourier", content: { markdown: "Adding a **phase shift** slides a wave sideways: $\\sin(x - \\phi)$. With amplitude, period, and phase you can place a sine wave anywhere. The astonishing **Fourier theorem** then says *any* repeating signal — a square wave, a violin note, a heartbeat — is a sum of pure sines and cosines of different frequencies. That decomposition powers MP3s, image compression, and nearly all of signal processing." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Sine and cosine graphs are periodic waves between −1 and 1.", "Period is 2π; they repeat every full turn.", "Amplitude $|A|$ in $A\\sin x$ sets the peak height.", "Period $2\\pi/B$ in $\\sin(Bx)$ sets the cycle length.", "Cosine is sine shifted left by π/2."], formulas: [{ label: "Amplitude", tex: "y = A\\sin x \\Rightarrow \\text{amp} = |A|" }, { label: "Period", tex: "y = \\sin(Bx) \\Rightarrow T = \\dfrac{2\\pi}{B}" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "What is the amplitude of $y = 3\\sin x$?", answer: { value: 3, tolerance: 0 }, explanation: "Amplitude is $|A| = 3$." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "The period of $y = \\sin x$ is:", options: ["$\\pi$", "$2\\pi$", "$1$", "$\\tfrac{\\pi}{2}$"], answer: 1, explanation: "Sine repeats every $2\\pi$." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "At $x = 0$, the value of $\\cos x$ is:", options: ["$0$", "$1$", "$-1$", "undefined"], answer: 1, explanation: "Cosine starts at its peak, 1." },
      { scope: "PRACTICE", kind: "GRAPH", prompt: "Graph $y = \\sin x$. Enter it as a function of $x$.", answer: { expr: "sin(x)", domain: [-6.28, 6.28], variable: "x" }, difficulty: 3, hint: "Starts at 0, peaks at 1.", explanation: "The standard sine wave: 0 at the origin, oscillating between −1 and 1." },
      { scope: "PRACTICE", kind: "GRAPH", prompt: "Graph $y = \\cos x$. Enter it as a function of $x$.", answer: { expr: "cos(x)", domain: [-6.28, 6.28], variable: "x" }, difficulty: 3, hint: "Starts at its peak, 1.", explanation: "Cosine is sine shifted left by π/2 — it starts at 1." },
      { scope: "PRACTICE", kind: "GRAPH", prompt: "Graph $y = 2\\sin x$ (amplitude 2). Enter it as a function of $x$.", answer: { expr: "2*sin(x)", domain: [-6.28, 6.28], variable: "x" }, difficulty: 4, hint: "Double the height.", explanation: "Same wave, stretched vertically to peak at ±2." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "The period of $y = \\sin(2x)$ is:", options: ["$4\\pi$", "$2\\pi$", "$\\pi$", "$\\tfrac{\\pi}{2}$"], answer: 2, hint: "Period $= 2\\pi/B$ with $B = 2$.", explanation: "$2\\pi/2 = \\pi$." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "The cosine graph is the sine graph shifted horizontally.", answer: true, hint: "By π/2.", explanation: "$\\cos x = \\sin(x + \\tfrac{\\pi}{2})$ — a horizontal shift." },
    ],
  },
];
