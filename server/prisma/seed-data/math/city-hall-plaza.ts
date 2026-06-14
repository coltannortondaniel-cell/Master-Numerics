import type { LessonSeed } from "../types.js";

/**
 * City Hall Plaza (grades 6–7): the first taste of algebra — variables and
 * expressions, evaluating, and solving one- and two-step equations by keeping
 * the scale balanced. Uses the balance and number-line sims and the locally
 * graded SYMBOLIC / GRAPH / PROOF question types. All original content.
 */
export const cityHallPlazaLessons: LessonSeed[] = [
  // ───────────────────────── 1. Variables & Expressions ─────────────────────────
  {
    slug: "variables-and-expressions",
    title: "Variables & Expressions",
    tagline: "Letters that stand for numbers",
    estMinutes: 13,
    xpReward: 130,
    difficulty: 2,
    sections: [
      { kind: "HERO", content: { scene: "city", headline: "A Letter for the Unknown", sub: "When you don't yet know a number, give it a name. That single idea — the variable — opens the door to all of algebra." } },
      { kind: "CONTEXT", title: "On the steps of City Hall", content: { markdown: "A notice on the plaza board reads: \"Admission is \\$2 per person.\" How much for a group? You can't answer with one number — it depends on the size of the group. So we let a **letter** stand in for the unknown count and write a rule that works for *any* group.\n\nThat letter is a **variable**, and the rule is an **expression**. They are the language algebra uses to talk about quantities before we know their values." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "A **variable** is a symbol — usually a letter like $x$ or $n$ — that stands for a number we don't know yet or that can change.\n\nAn **expression** combines numbers, variables, and operations but has **no equals sign**. It names a quantity:\n\n$$2n, \\qquad x + 5, \\qquad 3a - 7.$$\n\n- A **term** is a single piece: in $3a - 7$ the terms are $3a$ and $-7$.\n- A **coefficient** is the number multiplying a variable: in $3a$ the coefficient is $3$.\n- A **constant** is a plain number, like the $-7$.\n\nTo **evaluate** an expression, substitute a value for the variable and compute. If $n = 4$:\n\n$$2n = 2(4) = 8.$$\n\nWriting $2n$ means $2 \\times n$ — in algebra a number next to a variable always means multiply." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Evaluate an expression", problem: "Evaluate $3x + 2$ when $x = 5$.", steps: ["Substitute: $3(5) + 2$.", "Multiply first: $15 + 2$.", "Add: $17$."], answer: "$3x + 2 = 17$ when $x = 5$." },
        { title: "Write an expression", problem: "Write an expression for 'five more than a number $n$'.", steps: ["'A number' is $n$.", "'Five more than' means add 5."], answer: "$n + 5$." },
        { title: "Name the parts", problem: "In $4y - 9$, name the coefficient and the constant.", steps: ["The coefficient multiplies the variable: $4$.", "The constant stands alone: $-9$."], answer: "Coefficient $4$, constant $-9$." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Variables, terms, and evaluating." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Substitute carefully and follow the order of operations." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: like terms", content: { markdown: "Expressions can often be **simplified** by combining **like terms** — terms with exactly the same variable part. $3x$ and $5x$ are like terms, so $3x + 5x = 8x$. But $3x$ and $3x^2$ are **not** like terms, and neither are $3x$ and $3y$ — their variable parts differ, so they can't be merged. Combining like terms is the workhorse move you'll use to tidy every expression and equation from here on." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["A variable is a letter standing for a number.", "An expression combines numbers, variables, and operations — no equals sign.", "A coefficient multiplies a variable; a constant stands alone.", "Evaluate by substituting a value and using the order of operations.", "Combine like terms (same variable part) to simplify."], formulas: [{ label: "A linear term", tex: "ax + b" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Which of these is an *expression* (not an equation)?", options: ["$2x + 5$", "$2x + 5 = 9$", "$x = 3$", "$7 = 7$"], answer: 0, explanation: "An expression has no equals sign; the others all do." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "Evaluate $3x + 2$ when $x = 5$.", answer: { value: 17, tolerance: 0 }, explanation: "$3(5) + 2 = 17$." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "In $4y - 9$, the coefficient is:", options: ["$y$", "$4$", "$-9$", "$5$"], answer: 1, explanation: "The coefficient multiplies the variable: $4$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Evaluate $5n - 3$ when $n = 4$.", answer: { value: 17, tolerance: 0 }, hint: "Multiply, then subtract.", explanation: "$5(4) - 3 = 20 - 3 = 17$." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "Write an expression for 'seven more than a number $n$'. (Use $n$.)", answer: { expr: "n + 7", vars: ["n"] }, difficulty: 2, hint: "'More than' means add.", explanation: "Seven more than $n$ is $n + 7$ (equivalently $7 + n$)." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "Combine like terms: simplify $3x + 5x$. (Use $x$.)", answer: { expr: "8*x", vars: ["x"] }, difficulty: 3, hint: "Add the coefficients.", explanation: "$3x + 5x = 8x$." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "$3x$ and $3y$ are like terms and can be combined into $6xy$.", answer: false, hint: "Do they have the same variable part?", explanation: "Different variables — they are not like terms and cannot be combined." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A ticket costs \\$2 per person. Evaluate the cost $2p$ for a group of $p = 6$, in dollars.", answer: { value: 12, tolerance: 0 }, hint: "$2p$ with $p = 6$.", explanation: "$2(6) = 12$, so \\$12." },
    ],
  },

  // ───────────────────────── 2. One-Step Equations ─────────────────────────
  {
    slug: "one-step-equations",
    title: "One-Step Equations",
    tagline: "Keep the scale balanced",
    estMinutes: 14,
    xpReward: 140,
    difficulty: 3,
    sections: [
      { kind: "HERO", content: { scene: "city", headline: "Balance Both Sides", sub: "An equation is a balance scale. Whatever you do to one side, do to the other, and the scale stays level — until the unknown stands alone." } },
      { kind: "CONTEXT", title: "The fountain puzzle", content: { markdown: "Carved on the plaza fountain: \"A number plus 7 equals 12. What is the number?\" You could guess — but algebra gives a method that never fails, even when the numbers get ugly. The trick is to think of the equals sign as the pivot of a **balance scale**." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "An **equation** says two expressions are equal: $x + 7 = 12$. To **solve** it is to find the value of the variable that makes the statement true.\n\nThe golden rule: **whatever you do to one side, do to the other.** This keeps the scale balanced. To isolate the variable, undo what's done to it using the **inverse operation**:\n\n- Addition is undone by subtraction (and vice versa).\n- Multiplication is undone by division (and vice versa).\n\nTo solve $x + 7 = 12$, subtract $7$ from **both** sides:\n\n$$x + 7 - 7 = 12 - 7 \\;\\Rightarrow\\; x = 5.$$\n\n**Check** by substituting back: $5 + 7 = 12$. ✓ Always check — it catches mistakes instantly." } },
      { kind: "SIMULATION", title: "Try it: the balance scale", content: { simId: "compare-balance", intro: "Add or remove the same amount from both pans and watch the scale stay level. That is exactly what solving an equation does." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Undo addition", problem: "Solve $x + 7 = 12$.", steps: ["Subtract 7 from both sides.", "$x = 12 - 7$."], answer: "$x = 5$." },
        { title: "Undo multiplication", problem: "Solve $4x = 20$.", steps: ["Divide both sides by 4.", "$x = 20 \\div 4$."], answer: "$x = 5$." },
        { title: "Undo subtraction", problem: "Solve $x - 3 = 8$.", steps: ["Add 3 to both sides.", "$x = 8 + 3$."], answer: "$x = 11$." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Pick the inverse operation, apply it to both sides." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Isolate the variable; then check your answer." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: why 'both sides' works", content: { markdown: "Equality is a statement that two quantities are *the same number*. If $a = b$, then adding the same amount $c$ to each keeps them the same: $a + c = b + c$. The same holds for subtracting, multiplying, or dividing by a nonzero number. These are the **properties of equality**, and they are the rigorous reason the balance-scale picture always works — not just a trick, but a theorem." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["An equation states two expressions are equal.", "Solve by isolating the variable.", "Use inverse operations: + undoes −, × undoes ÷.", "Do the same thing to both sides to stay balanced.", "Always check by substituting your answer back in."], formulas: [{ label: "Add to both sides", tex: "a = b \\Rightarrow a + c = b + c" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "To solve $x + 7 = 12$, you should:", options: ["add 7 to both sides", "subtract 7 from both sides", "multiply both sides by 7", "divide both sides by 12"], answer: 1, explanation: "Undo the $+7$ with $-7$ on both sides." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "Solve $x + 7 = 12$. What is $x$?", answer: { value: 5, tolerance: 0 }, explanation: "$x = 12 - 7 = 5$." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "Solve $4x = 20$. What is $x$?", answer: { value: 5, tolerance: 0 }, explanation: "Divide both sides by 4: $x = 5$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Solve $x - 3 = 8$. What is $x$?", answer: { value: 11, tolerance: 0 }, hint: "Add 3 to both sides.", explanation: "$x = 8 + 3 = 11$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Solve $\\dfrac{x}{2} = 9$. What is $x$?", answer: { value: 18, tolerance: 0 }, hint: "Multiply both sides by 2.", explanation: "$x = 9 \\times 2 = 18$." },
      { scope: "PRACTICE", kind: "PROOF", prompt: "Arrange the steps to solve $4x = 20$.", options: ["Start with $4x = 20$.", "Divide both sides by 4.", "Simplify: $x = 5$.", "Check: $4(5) = 20$. ✓"], answer: [], difficulty: 3, hint: "Begin with the equation; finish by checking.", explanation: "Divide both sides by 4 to isolate $x$, then verify the solution." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "If $a = b$, then $a + 5 = b + 5$.", answer: true, hint: "Adding the same to equal things keeps them equal.", explanation: "This is the addition property of equality." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Solve $x + 15 = 9$. What is $x$?", answer: { value: -6, tolerance: 0 }, hint: "Subtract 15 from both sides.", explanation: "$x = 9 - 15 = -6$." },
    ],
  },

  // ───────────────────────── 3. Two-Step Equations ─────────────────────────
  {
    slug: "two-step-equations",
    title: "Two-Step Equations",
    tagline: "Undo in reverse order",
    estMinutes: 15,
    xpReward: 150,
    difficulty: 3,
    sections: [
      { kind: "HERO", content: { scene: "city", headline: "Peel It Back", sub: "Two operations stand between you and the answer. Undo them in reverse — like taking off shoes before socks." } },
      { kind: "CONTEXT", title: "Two layers to undo", content: { markdown: "A taxi charges a \\$3 flat fee plus \\$2 per mile, and your ride cost \\$11. How many miles? That's the equation $2m + 3 = 11$. There are two operations wrapped around $m$ — a multiply and an add — so we undo them one at a time, in the right order." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "A **two-step equation** has the form $ax + b = c$. To solve, undo the operations in **reverse order** of operations:\n\n1. **First undo addition/subtraction** (the constant $b$).\n2. **Then undo multiplication/division** (the coefficient $a$).\n\nFor $2m + 3 = 11$:\n\n$$2m + 3 - 3 = 11 - 3 \\;\\Rightarrow\\; 2m = 8 \\;\\Rightarrow\\; \\frac{2m}{2} = \\frac{8}{2} \\;\\Rightarrow\\; m = 4.$$\n\nWhy reverse order? When you *evaluate* $2m + 3$ you multiply first, then add. To *undo*, you reverse the sequence: subtract first, then divide. Think of unwrapping a gift — last layer on goes first layer off." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Subtract, then divide", problem: "Solve $2m + 3 = 11$.", steps: ["Subtract 3: $2m = 8$.", "Divide by 2: $m = 4$.", "Check: $2(4) + 3 = 11$. ✓"], answer: "$m = 4$." },
        { title: "Add, then divide", problem: "Solve $3x - 5 = 16$.", steps: ["Add 5: $3x = 21$.", "Divide by 3: $x = 7$."], answer: "$x = 7$." },
        { title: "A negative coefficient", problem: "Solve $-2x + 1 = 9$.", steps: ["Subtract 1: $-2x = 8$.", "Divide by $-2$: $x = -4$."], answer: "$x = -4$." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Constant first, coefficient second." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Two moves each: undo the add/subtract, then the multiply/divide." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: solving for a variable in a formula", content: { markdown: "The same two-step logic rearranges **formulas**. To solve $y = mx + b$ for $x$, treat $y$, $m$, $b$ as known: subtract $b$ from both sides to get $y - b = mx$, then divide by $m$ to get $x = \\dfrac{y - b}{m}$. This is exactly how scientists rearrange equations to isolate whatever quantity they need — the skill scales all the way to physics and calculus." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["A two-step equation looks like $ax + b = c$.", "Undo the constant first (add/subtract).", "Undo the coefficient second (multiply/divide).", "It's the order of operations run in reverse.", "Check your solution by substituting back."], formulas: [{ label: "Solve a two-step", tex: "ax + b = c \\Rightarrow x = \\dfrac{c - b}{a}" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "To solve $2x + 3 = 11$, the first step is to:", options: ["divide both sides by 2", "subtract 3 from both sides", "add 3 to both sides", "subtract 2x"], answer: 1, explanation: "Undo the constant first: subtract 3." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "Solve $2x + 3 = 11$. What is $x$?", answer: { value: 4, tolerance: 0 }, explanation: "$2x = 8$, so $x = 4$." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "Solve $3x - 5 = 16$. What is $x$?", answer: { value: 7, tolerance: 0 }, explanation: "$3x = 21$, so $x = 7$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Solve $5x + 2 = 27$. What is $x$?", answer: { value: 5, tolerance: 0 }, hint: "Subtract 2, then divide by 5.", explanation: "$5x = 25$, so $x = 5$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A taxi charges \\$3 plus \\$2 per mile. If a ride costs \\$11, how many miles? Solve $2m + 3 = 11$.", answer: { value: 4, tolerance: 0 }, hint: "Subtract the flat fee first.", explanation: "$2m = 8$, so $m = 4$ miles." },
      { scope: "PRACTICE", kind: "PROOF", prompt: "Arrange the steps to solve $3x - 5 = 16$.", options: ["Start with $3x - 5 = 16$.", "Add 5 to both sides: $3x = 21$.", "Divide both sides by 3: $x = 7$.", "Check: $3(7) - 5 = 16$. ✓"], answer: [], difficulty: 4, hint: "Undo the subtraction before the multiplication.", explanation: "Add 5, then divide by 3, then verify." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "Solve $y = mx + b$ for $x$. Write $x$ in terms of $y$, $m$, and $b$. (Type like `(y - b)/m`.)", answer: { expr: "(y - b)/m", vars: ["y", "m", "b"] }, difficulty: 5, hint: "Subtract $b$, then divide by $m$.", explanation: "$x = \\dfrac{y - b}{m}$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Solve $-2x + 1 = 9$. What is $x$?", answer: { value: -4, tolerance: 0 }, hint: "Subtract 1, then divide by $-2$.", explanation: "$-2x = 8$, so $x = -4$." },
    ],
  },

  // ───────────────────────── 4. Expressions, Words & Lines ─────────────────────────
  {
    slug: "expressions-words-and-lines",
    title: "Words, Expressions & Lines",
    tagline: "From sentences to symbols to graphs",
    estMinutes: 15,
    xpReward: 150,
    difficulty: 4,
    sections: [
      { kind: "HERO", content: { scene: "city", headline: "Three Ways to Say It", sub: "A rule can live as a sentence, an expression, or a line on a graph. Fluency means moving freely between all three." } },
      { kind: "CONTEXT", title: "The same idea, three languages", content: { markdown: "\"Each extra topping adds \\$1.50 to a \\$8 pizza.\" That sentence hides a rule. Written in symbols it's $C = 1.5t + 8$. Drawn on a graph it's a straight line. Real mathematical power comes from translating between **words**, **symbols**, and **pictures** at will." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "**Words → symbols.** Watch the keywords:\n\n- 'sum', 'more than', 'increased by' → $+$\n- 'difference', 'less than', 'decreased by' → $-$\n- 'product', 'times', 'of' → $\\times$\n- 'quotient', 'per', 'divided by' → $\\div$\n\n'Three less than twice a number $x$' is $2x - 3$ (note the order: subtract from $2x$).\n\n**Symbols → graph.** A linear expression $mx + b$, drawn as $y = mx + b$, is a straight line:\n\n- $b$ is the **$y$-intercept** — where the line crosses the vertical axis ($x = 0$).\n- $m$ is the **slope** — how much $y$ changes for each step of $1$ in $x$.\n\nFor $y = 2x - 1$: start at $-1$ on the $y$-axis, then rise $2$ for every $1$ across. A positive slope rises left-to-right; a negative slope falls." } },
      { kind: "SIMULATION", title: "Try it: the number line", content: { simId: "number-line", intro: "Plot values and see how adding or scaling shifts and stretches them along the line — the one-dimensional shadow of a graph." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Words to symbols", problem: "Write 'three less than twice a number $x$'.", steps: ["'Twice a number' is $2x$.", "'Three less than' subtracts 3 from it."], answer: "$2x - 3$." },
        { title: "Read a line", problem: "For $y = 2x - 1$, give the slope and $y$-intercept.", steps: ["Compare to $y = mx + b$.", "$m = 2$, $b = -1$."], answer: "Slope $2$, intercept $-1$." },
        { title: "Build the cost rule", problem: "A \\$8 pizza plus \\$1.50 per topping $t$. Write the cost $C$.", steps: ["Per-topping cost: $1.5t$.", "Add the base \\$8."], answer: "$C = 1.5t + 8$." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Translate and read carefully — order matters." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Move between words, symbols, and the graph." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: slope as a rate", content: { markdown: "Slope is really a **rate of change** — the same idea as a unit rate or a speed. In $C = 1.5t + 8$, the slope $1.5$ is 'dollars per topping'. In $d = 60t$, the slope $60$ is 'miles per hour'. Later, in calculus, the slope of a curve at a single point becomes the **derivative** — but it is the very same idea you're using now: how fast one quantity changes as another moves." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Translate keywords into $+$, $-$, $\\times$, $\\div$.", "'Less than' and 'subtracted from' reverse the order.", "$y = mx + b$ is a line: $m$ is slope, $b$ is the $y$-intercept.", "Slope is the change in $y$ per step of 1 in $x$.", "Slope is a rate of change — the seed of the derivative."], formulas: [{ label: "Slope–intercept line", tex: "y = mx + b" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "SYMBOLIC", prompt: "Write 'three less than twice a number $x$'. (Use $x$.)", answer: { expr: "2*x - 3", vars: ["x"] }, difficulty: 3, hint: "Twice the number is $2x$; subtract 3 from it.", explanation: "'Three less than $2x$' is $2x - 3$." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "For $y = 2x - 1$, the $y$-intercept is:", options: ["$2$", "$-1$", "$1$", "$0$"], answer: 1, explanation: "In $y = mx + b$, the intercept is $b = -1$." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "For $y = 2x - 1$, what is the slope?", answer: { value: 2, tolerance: 0 }, explanation: "The slope is the coefficient of $x$: $2$." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "Write 'the sum of a number $n$ and 4, all doubled'. (Use $n$; type like `2(n + 4)`.)", answer: { expr: "2*(n + 4)", vars: ["n"] }, difficulty: 4, hint: "Double the whole sum.", explanation: "$2(n + 4)$, which expands to $2n + 8$." },
      { scope: "PRACTICE", kind: "GRAPH", prompt: "Graph the line $y = 2x - 1$. Enter $y$ as a function of $x$.", answer: { expr: "2*x - 1", domain: [-5, 5], variable: "x" }, difficulty: 3, hint: "Slope 2, intercept −1.", explanation: "$y = 2x - 1$ — a line through $(0,-1)$ rising 2 for each step right." },
      { scope: "PRACTICE", kind: "GRAPH", prompt: "A \\$8 pizza costs \\$1.50 per topping $x$. Graph the total cost. Enter cost as a function of $x$.", answer: { expr: "1.5*x + 8", domain: [0, 10], variable: "x" }, difficulty: 4, hint: "Base plus per-topping rate.", explanation: "$C = 1.5x + 8$ — intercept 8 (the base price), slope 1.5 (per topping)." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A line with a negative slope:", options: ["rises left to right", "falls left to right", "is horizontal", "is vertical"], answer: 1, hint: "Negative slope means $y$ decreases as $x$ grows.", explanation: "Negative slope falls from left to right." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "Simplify $2(n + 4)$ by expanding. (Use $n$.)", answer: { expr: "2*n + 8", vars: ["n"] }, difficulty: 3, hint: "Distribute the 2.", explanation: "$2(n + 4) = 2n + 8$." },
    ],
  },
];
