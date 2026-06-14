import type { LessonSeed } from "../types.js";

/**
 * The Architect's Quarter (grades 7–8): geometry and measurement — angles and
 * lines, area and perimeter, and the Pythagorean theorem, discovered at the
 * drafting table. Uses the shape-sorter sim and the locally graded NUMERIC /
 * SYMBOLIC / GRAPH / PROOF types, including a first two-column-style proof.
 * All original content.
 */
export const architectsQuarterLessons: LessonSeed[] = [
  // ───────────────────────── 1. Angles & Lines ─────────────────────────
  {
    slug: "angles-and-lines",
    title: "Angles & Lines",
    tagline: "How directions meet",
    estMinutes: 14,
    xpReward: 140,
    difficulty: 3,
    sections: [
      { kind: "HERO", content: { scene: "city", headline: "Where Lines Meet", sub: "Every building begins with angles. Learn the rules that govern how lines cross and corners turn." } },
      { kind: "CONTEXT", title: "At the drafting table", content: { markdown: "An architect's blueprint is a web of lines meeting at precise angles. Get one angle wrong and walls won't close, roofs won't seal. A handful of simple angle rules let you find every missing measure on a drawing without a protractor." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "An **angle** measures the turn between two rays from a shared vertex, in **degrees** ($^\\circ$).\n\n- **Acute**: less than $90^\\circ$. **Right**: exactly $90^\\circ$. **Obtuse**: between $90^\\circ$ and $180^\\circ$. **Straight**: $180^\\circ$.\n\nThe key relationships:\n\n- **Complementary** angles sum to $90^\\circ$.\n- **Supplementary** angles sum to $180^\\circ$.\n- Angles on a **straight line** sum to $180^\\circ$; angles **around a point** sum to $360^\\circ$.\n- When two lines cross, the opposite (**vertical**) angles are **equal**.\n\nThese let you chase missing angles: if one angle on a line is $130^\\circ$, the angle beside it is $180^\\circ - 130^\\circ = 50^\\circ$." } },
      { kind: "SIMULATION", title: "Try it: shape sorter", content: { simId: "shape-sorter", intro: "Compare shapes and their corners. Notice how the angles in each figure relate — a feel for angle size you'll use throughout geometry." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Complement", problem: "An angle measures $32^\\circ$. What is its complement?", steps: ["Complements sum to $90^\\circ$.", "$90 - 32 = 58$."], answer: "$58^\\circ$." },
        { title: "Supplement", problem: "Find the supplement of $130^\\circ$.", steps: ["Supplements sum to $180^\\circ$.", "$180 - 130 = 50$."], answer: "$50^\\circ$." },
        { title: "Around a point", problem: "Three angles around a point are $90^\\circ$, $120^\\circ$, and $x$. Find $x$.", steps: ["They sum to $360^\\circ$.", "$x = 360 - 90 - 120 = 150$."], answer: "$x = 150^\\circ$." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Complement to 90, supplement to 180." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Use the angle-sum rules to chase the missing measure." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: parallel lines and a transversal", content: { markdown: "When a line (a **transversal**) crosses two **parallel** lines, it creates matched angle pairs: **corresponding** angles are equal, **alternate interior** angles are equal, and **co-interior** angles are supplementary. These facts are the engine of geometric proof — they let you transfer an angle from one line to another and conclude, for example, that the three angles of any triangle sum to exactly $180^\\circ$." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Angles are measured in degrees; acute < 90 < obtuse < 180 = straight.", "Complementary angles sum to 90°.", "Supplementary angles sum to 180°.", "Angles on a line sum to 180°; around a point, 360°.", "Vertical (opposite) angles are equal."], formulas: [{ label: "Supplementary", tex: "a + b = 180^\\circ" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "An angle of $120^\\circ$ is:", options: ["acute", "right", "obtuse", "straight"], answer: 2, explanation: "Between 90° and 180° is obtuse." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "What is the complement of a $32^\\circ$ angle, in degrees?", answer: { value: 58, tolerance: 0 }, explanation: "$90 - 32 = 58$." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "What is the supplement of a $130^\\circ$ angle, in degrees?", answer: { value: 50, tolerance: 0 }, explanation: "$180 - 130 = 50$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Two angles on a straight line are $x$ and $115^\\circ$. Find $x$ in degrees.", answer: { value: 65, tolerance: 0 }, hint: "They sum to 180°.", explanation: "$x = 180 - 115 = 65$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Angles around a point are $90^\\circ$, $120^\\circ$, and $x$. Find $x$ in degrees.", answer: { value: 150, tolerance: 0 }, hint: "They sum to 360°.", explanation: "$360 - 90 - 120 = 150$." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "When two straight lines cross, the two opposite (vertical) angles are equal.", answer: true, hint: "Think of an X.", explanation: "Vertical angles are always equal." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "Write the supplement of an angle $a$ (in degrees) as an expression. (Use $a$; type like `180 - a`.)", answer: { expr: "180 - a", vars: ["a"] }, difficulty: 3, hint: "Supplements sum to 180.", explanation: "The supplement of $a$ is $180 - a$." },
      { scope: "PRACTICE", kind: "PROOF", prompt: "Arrange the proof that vertical angles are equal. (Angles $a$ and $b$ are on one line; $b$ and $c$ are on the other; $a$ and $c$ are vertical.)", options: ["$a + b = 180^\\circ$ (angles on a straight line).", "$b + c = 180^\\circ$ (angles on a straight line).", "So $a + b = b + c$ (both equal $180^\\circ$).", "Subtract $b$ from both sides: $a = c$."], answer: [], difficulty: 4, hint: "Use two straight-line sums, then cancel the shared angle.", explanation: "Both pairs sum to 180°, so $a + b = b + c$; cancelling $b$ gives $a = c$." },
    ],
  },

  // ───────────────────────── 2. Area & Perimeter ─────────────────────────
  {
    slug: "area-and-perimeter",
    title: "Area & Perimeter",
    tagline: "Measuring the space inside and around",
    estMinutes: 14,
    xpReward: 140,
    difficulty: 3,
    sections: [
      { kind: "HERO", content: { scene: "city", headline: "Inside and Around", sub: "Perimeter is the fence; area is the field. Two different questions about the same shape." } },
      { kind: "CONTEXT", title: "Costing a building", content: { markdown: "An architect pricing a plot needs two numbers: the **perimeter** (how much fencing or trim to buy) and the **area** (how much floor or paint to cover). They measure different things — and confusing them is one of the most common — and expensive — mistakes." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "**Perimeter** is the total distance around a shape — add up all the side lengths. **Area** is the amount of surface inside, measured in **square** units.\n\nThe essentials:\n\n- Rectangle: perimeter $P = 2(l + w)$, area $A = l\\,w$.\n- Square (side $s$): $P = 4s$, area $A = s^2$.\n- Triangle (base $b$, height $h$): $A = \\tfrac12 b h$.\n- Circle (radius $r$): circumference $C = 2\\pi r$, area $A = \\pi r^2$.\n\nUnits matter: perimeter is in length units (m), area in square units (m²). Doubling the side of a square doubles its perimeter but **quadruples** its area, because area depends on the side *squared*." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Rectangle", problem: "A room is $5\\,\\text{m}$ by $3\\,\\text{m}$. Find its area and perimeter.", steps: ["Area $= l w = 5 \\times 3 = 15$.", "Perimeter $= 2(5+3) = 16$."], answer: "Area $15\\,\\text{m}^2$, perimeter $16\\,\\text{m}$." },
        { title: "Triangle", problem: "A triangle has base $8$ and height $5$. Find its area.", steps: ["$A = \\tfrac12 b h$.", "$A = \\tfrac12 (8)(5) = 20$."], answer: "Area $= 20$ square units." },
        { title: "Scaling", problem: "A square's side doubles. What happens to its area?", steps: ["$A = s^2$.", "Replace $s$ with $2s$: $(2s)^2 = 4s^2$."], answer: "The area becomes four times larger." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Perimeter is a length; area is square units." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Pick the right formula; mind the units." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: where ½bh comes from", content: { markdown: "Any triangle is exactly **half** of a parallelogram: copy the triangle, rotate it $180^\\circ$, and the two together tile a parallelogram of base $b$ and height $h$, whose area is $bh$. So one triangle is $\\tfrac12 b h$. This 'double it, then halve' trick — turning an unfamiliar shape into a familiar one — is a recurring strategy in geometry and, later, in integration when we find the area under a curve." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Perimeter is the distance around; area is the surface inside.", "Rectangle: $P = 2(l+w)$, $A = lw$.", "Triangle: $A = \\tfrac12 bh$.", "Circle: $C = 2\\pi r$, $A = \\pi r^2$.", "Area uses square units; doubling a side quadruples a square's area."], formulas: [{ label: "Rectangle area", tex: "A = l\\,w" }, { label: "Triangle area", tex: "A = \\tfrac12 b h" }, { label: "Circle area", tex: "A = \\pi r^2" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "A rectangle is $5\\,\\text{m}$ by $3\\,\\text{m}$. Find its area in $\\text{m}^2$.", answer: { value: 15, tolerance: 0 }, explanation: "$A = 5 \\times 3 = 15\\,\\text{m}^2$." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "A rectangle is $5\\,\\text{m}$ by $3\\,\\text{m}$. Find its perimeter in metres.", answer: { value: 16, tolerance: 0 }, explanation: "$P = 2(5+3) = 16\\,\\text{m}$." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Area is measured in:", options: ["length units (m)", "square units (m²)", "no units", "degrees"], answer: 1, explanation: "Area is a surface, so it uses square units." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A triangle has base $8$ and height $5$. Find its area.", answer: { value: 20, tolerance: 0 }, hint: "$A = \\tfrac12 bh$.", explanation: "$\\tfrac12(8)(5) = 20$." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "Write the area of a square with side length $s$. (Use $s$; type like `s^2`.)", answer: { expr: "s^2", vars: ["s"] }, difficulty: 2, hint: "Side times side.", explanation: "$A = s \\times s = s^2$." },
      { scope: "PRACTICE", kind: "GRAPH", prompt: "Graph the area of a square as a function of its side length $s$. Enter area as a function of $s$ (use $x$ for $s$).", answer: { expr: "x^2", domain: [0, 6], variable: "x" }, difficulty: 3, hint: "$A = s^2$.", explanation: "$A = s^2$ — a parabola: area grows with the square of the side." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "If a square's side doubles, its area becomes:", options: ["doubled", "tripled", "four times larger", "unchanged"], answer: 2, hint: "$A = s^2$.", explanation: "$(2s)^2 = 4s^2$, four times larger." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A circle has radius $r = 3$. Find its area, using $\\pi \\approx 3.14$ (round to the nearest whole number).", answer: { value: 28, tolerance: 1 }, hint: "$A = \\pi r^2$.", explanation: "$3.14 \\times 9 \\approx 28.3 \\approx 28$." },
    ],
  },

  // ───────────────────────── 3. The Pythagorean Theorem ─────────────────────────
  {
    slug: "pythagorean-theorem",
    title: "The Pythagorean Theorem",
    tagline: "The rule of right triangles",
    estMinutes: 15,
    xpReward: 160,
    difficulty: 4,
    sections: [
      { kind: "HERO", content: { scene: "city", headline: "a² + b² = c²", sub: "The most famous equation in geometry — and the secret behind every square corner ever built." } },
      { kind: "CONTEXT", title: "The 3-4-5 trick", content: { markdown: "Builders for thousands of years have squared corners with a loop of rope knotted into lengths of 3, 4, and 5. Pulled taut, it forms a perfect right angle — no protractor needed. The reason is the **Pythagorean theorem**, the deep link between the three sides of a right triangle." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "In a **right triangle**, the side opposite the right angle is the **hypotenuse** ($c$) — always the longest side. The other two are the **legs** ($a$ and $b$). The theorem says:\n\n$$a^2 + b^2 = c^2.$$\n\nThe square built on the hypotenuse equals the **sum** of the squares built on the legs.\n\nTo find the hypotenuse, solve for $c$:\n\n$$c = \\sqrt{a^2 + b^2}.$$\n\nTo find a missing leg, rearrange: $a = \\sqrt{c^2 - b^2}$.\n\nFor legs $3$ and $4$: $c = \\sqrt{9 + 16} = \\sqrt{25} = 5$ — the builder's rope. The theorem works **only** for right triangles, and is the foundation of distance, trigonometry, and vectors." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Find the hypotenuse", problem: "Legs $3$ and $4$. Find $c$.", steps: ["$c^2 = 3^2 + 4^2 = 9 + 16 = 25$.", "$c = \\sqrt{25}$."], answer: "$c = 5$." },
        { title: "Find a leg", problem: "Hypotenuse $13$, one leg $5$. Find the other leg.", steps: ["$a^2 = 13^2 - 5^2 = 169 - 25 = 144$.", "$a = \\sqrt{144}$."], answer: "$a = 12$." },
        { title: "Is it right?", problem: "Do sides $6, 8, 10$ form a right triangle?", steps: ["Check $6^2 + 8^2 = 36 + 64 = 100$.", "$10^2 = 100$. They match."], answer: "Yes — it's a right triangle." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "The hypotenuse is opposite the right angle." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Square, add or subtract, then take the root." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: the distance formula", content: { markdown: "Plot two points on a grid. The horizontal gap is $\\Delta x$, the vertical gap $\\Delta y$, and the straight-line distance between them is the hypotenuse of a right triangle with those legs. So $d = \\sqrt{\\Delta x^2 + \\Delta y^2}$ — the **distance formula** is just the Pythagorean theorem in coordinates. Extend it to three dimensions and you get $d = \\sqrt{\\Delta x^2 + \\Delta y^2 + \\Delta z^2}$, the length of a vector — a tool you'll use constantly in physics." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Applies only to right triangles.", "The hypotenuse $c$ is opposite the right angle and is longest.", "$a^2 + b^2 = c^2$.", "Hypotenuse: $c = \\sqrt{a^2 + b^2}$; leg: $a = \\sqrt{c^2 - b^2}$.", "The distance formula is this theorem in coordinates."], formulas: [{ label: "Pythagorean theorem", tex: "a^2 + b^2 = c^2" }, { label: "Hypotenuse", tex: "c = \\sqrt{a^2 + b^2}" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "In a right triangle, the hypotenuse is:", options: ["the shortest side", "opposite the right angle", "always vertical", "one of the legs"], answer: 1, explanation: "The hypotenuse is opposite the right angle and is the longest side." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "A right triangle has legs $3$ and $4$. Find the hypotenuse $c$.", answer: { value: 5, tolerance: 0 }, explanation: "$c = \\sqrt{9+16} = 5$." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "The Pythagorean theorem works for any triangle, not just right triangles.", answer: false, explanation: "It holds only for right triangles." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Hypotenuse $13$, one leg $5$. Find the other leg.", answer: { value: 12, tolerance: 0 }, hint: "$a^2 = c^2 - b^2$.", explanation: "$\\sqrt{169 - 25} = \\sqrt{144} = 12$." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "Write the hypotenuse $c$ in terms of the legs $a$ and $b$. (Type like `sqrt(a^2 + b^2)`.)", answer: { expr: "sqrt(a^2 + b^2)", vars: ["a", "b"] }, difficulty: 4, hint: "Square root of the sum of the squared legs.", explanation: "$c = \\sqrt{a^2 + b^2}$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Do the sides $6, 8, 10$ form a right triangle?", options: ["yes", "no", "only if scaled", "cannot tell"], answer: 0, hint: "Check $6^2 + 8^2$ vs $10^2$.", explanation: "$36 + 64 = 100 = 10^2$, so yes." },
      { scope: "PRACTICE", kind: "PROOF", prompt: "Arrange the steps to find the hypotenuse of a right triangle with legs $a$ and $b$.", options: ["Apply the theorem: $a^2 + b^2 = c^2$.", "The hypotenuse squared is the sum of the squared legs.", "Take the positive square root of both sides.", "Conclude $c = \\sqrt{a^2 + b^2}$."], answer: [], difficulty: 4, hint: "Start from the theorem, end at the formula for $c$.", explanation: "Square-root both sides of $a^2 + b^2 = c^2$ to isolate $c$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Find the distance between $(0,0)$ and $(6,8)$ on a grid.", answer: { value: 10, tolerance: 0 }, hint: "$d = \\sqrt{\\Delta x^2 + \\Delta y^2}$.", explanation: "$\\sqrt{36 + 64} = \\sqrt{100} = 10$." },
    ],
  },
];
