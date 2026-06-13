import type { LessonSeed } from "../types.js";

/**
 * The Bakery (grades 3–5): fractions and decimals, discovered by slicing pies,
 * pricing loaves, and sharing pastries. Understanding fractions, equivalence and
 * simplifying, comparing, adding/subtracting, and the link to decimals & percents.
 * Clean numerals + an interactive fraction-pie; no decorative emoji.
 */
export const theBakeryLessons: LessonSeed[] = [
  // ───────────────────────── 1. Understanding Fractions ─────────────────────────
  {
    slug: "understanding-fractions",
    title: "Understanding Fractions",
    tagline: "Equal parts of a whole",
    estMinutes: 13,
    xpReward: 120,
    sections: [
      { kind: "HERO", content: { scene: "bakery", headline: "Slices of the Whole", sub: "Cut a pie into equal pieces and take a few. A fraction is simply how we name part of a whole." } },
      { kind: "CONTEXT", title: "At the bakery counter", content: { markdown: "The baker slices a fresh pie into equal pieces. You take some, your friend takes some, and a few are left in the tin. To describe \"how much\" each person has, whole numbers aren't enough — we need **fractions**.\n\nFractions are everywhere: half a cup of flour, a quarter past three, three-quarters of a tank of gas. Master them at the bakery and you've unlocked the rest of arithmetic." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "A **fraction** names a part of a whole that has been split into **equal** parts. It's written with two numbers:\n\n$$\\frac{3}{4} \\quad\\leftarrow\\; \\text{numerator (parts you have)} \\atop \\leftarrow\\; \\text{denominator (equal parts in the whole)}$$\n\n- The **denominator** (bottom) tells how many **equal** parts the whole is cut into.\n- The **numerator** (top) tells how many of those parts you're talking about.\n\nSo $\\tfrac{3}{4}$ means: cut the pie into **4** equal slices, and take **3** of them.\n\nKey ideas:\n\n- The parts must be **equal**. Three random chunks of a pie are not \"three-quarters\" unless the pie was cut into four equal pieces.\n- A **unit fraction** has 1 on top — like $\\tfrac{1}{4}$ — a single equal part.\n- When the numerator equals the denominator, you have the **whole**: $\\tfrac{4}{4} = 1$.\n- A bigger denominator means **more, smaller** slices: eighths are smaller than quarters." } },
      { kind: "SIMULATION", title: "Try it: slice the pie", content: { simId: "fraction-pie", intro: "Choose how many equal slices to cut (the denominator) and how many to shade (the numerator). Watch the fraction — and its decimal and percent — update as you slice." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Name the fraction", problem: "A pie is cut into 8 equal slices and you eat 3. What fraction did you eat?", steps: ["The whole is 8 equal parts → denominator 8.", "You ate 3 parts → numerator 3."], answer: "$\\tfrac{3}{8}$ of the pie." },
        { title: "How much is left?", problem: "A chocolate bar has 6 equal pieces. You take 5. What fraction is left?", steps: ["6 equal parts in all.", "5 taken means $6 - 5 = 1$ left.", "One part out of six."], answer: "$\\tfrac{1}{6}$ is left." },
        { title: "Making a whole", problem: "How many quarters ($\\tfrac14$) make one whole?", steps: ["A whole is $\\tfrac{4}{4}$.", "That's four pieces of size $\\tfrac14$."], answer: "Four quarters make one whole." },
      ] } },
      { kind: "VIDEOS", title: "Watch", content: { videos: [{ youtubeId: "n0FZhQrGAKw", title: "Introduction to Fractions" }] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Numerator, denominator, and equal parts." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Read the whole, then count the parts." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: fractions as division", content: { markdown: "There's a second way to read $\\tfrac{3}{4}$: as **3 divided by 4**. If 3 cookies are shared equally among 4 children, each child gets $\\tfrac{3}{4}$ of a cookie. The fraction bar is literally a division sign!\n\nThis is why $\\tfrac{4}{4} = 1$ (4 shared among 4 is 1 each) and why $\\tfrac{0}{5} = 0$. It also hints at decimals: $\\tfrac{3}{4} = 3 \\div 4 = 0.75$, which you'll explore in the last lesson on this street." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["A fraction names equal parts of a whole.", "Denominator (bottom) = equal parts in the whole; numerator (top) = parts taken.", "The parts must be equal in size.", "A unit fraction has 1 on top; $\\tfrac{b}{b} = 1$.", "A larger denominator means more, smaller pieces."], formulas: [{ label: "Whole", tex: "\\tfrac{b}{b} = 1" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "In the fraction $\\tfrac{3}{4}$, the bottom number 4 is called the:", options: ["numerator", "denominator", "quotient", "factor"], answer: 1, explanation: "The bottom number is the denominator." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "In $\\tfrac{3}{4}$, what does the 3 (numerator) tell you?", options: ["the equal parts in the whole", "the parts you have", "the total amount", "nothing"], answer: 1, explanation: "The numerator counts the parts you have." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "The denominator tells how many equal parts the whole is divided into.", answer: true, explanation: "Yes — the denominator is the number of equal parts." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A pizza is cut into 8 equal slices and you eat 3. What fraction did you eat?", options: ["$\\tfrac{8}{3}$", "$\\tfrac{3}{8}$", "$\\tfrac{3}{5}$", "$\\tfrac{5}{8}$"], answer: 1, hint: "Parts eaten over total parts.", explanation: "3 of 8 parts is $\\tfrac{3}{8}$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "How many fourths ($\\tfrac14$) make one whole? Type the number.", answer: { value: 4, tolerance: 0 }, hint: "$\\tfrac{4}{4} = 1$.", explanation: "Four quarters make one whole." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Which of these is a unit fraction?", options: ["$\\tfrac{2}{3}$", "$\\tfrac{1}{5}$", "$\\tfrac{3}{4}$", "$\\tfrac{5}{6}$"], answer: 1, hint: "A unit fraction has 1 on top.", explanation: "$\\tfrac{1}{5}$ has numerator 1." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "The fraction $\\tfrac{4}{4}$ equals one whole.", answer: true, hint: "Numerator equals denominator.", explanation: "$\\tfrac{4}{4} = 1$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A bar has 6 equal pieces and you take 5. What fraction is left?", options: ["$\\tfrac{5}{6}$", "$\\tfrac{1}{6}$", "$\\tfrac{6}{5}$", "$\\tfrac{1}{5}$"], answer: 1, hint: "$6 - 5 = 1$ piece left of 6.", explanation: "One of six parts remains: $\\tfrac{1}{6}$." },
    ],
  },

  // ───────────────────── 2. Equivalent Fractions & Simplifying ─────────────────────
  {
    slug: "equivalent-fractions",
    title: "Equivalent Fractions & Simplifying",
    tagline: "Different names for the same amount",
    estMinutes: 14,
    xpReward: 130,
    sections: [
      { kind: "HERO", content: { scene: "bakery", headline: "The Same, Renamed", sub: "Half a pie is the same whether you call it one of two slices or two of four. Fractions have many equal names." } },
      { kind: "CONTEXT", title: "Cutting the same pie two ways", content: { markdown: "One baker cuts a pie into 2 big slices and you take 1 — that's $\\tfrac12$. Another cuts the same pie into 4 slices and you take 2 — that's $\\tfrac24$. You got **exactly the same amount of pie**. These are **equivalent fractions**: different numbers, same value. Recognising them is the key to comparing and adding fractions later." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "**Equivalent fractions** are fractions that name the **same amount**, like\n\n$$\\frac12 = \\frac24 = \\frac36 = \\frac{4}{8}.$$\n\n**To build an equivalent fraction, multiply (or divide) the numerator and denominator by the *same* number.** This works because you're really multiplying by 1 in disguise:\n\n$$\\frac12 \\times \\frac22 = \\frac24, \\qquad \\frac12 \\times \\frac33 = \\frac36.$$\n\nMultiplying top and bottom by the same number doesn't change the value — only the *number of pieces* you cut it into.\n\n**Simplifying** (or reducing) runs this in reverse: divide top and bottom by a common factor to reach **lowest terms** — the simplest name, where the only common factor left is 1.\n\n$$\\frac{6}{8} = \\frac{6 \\div 2}{8 \\div 2} = \\frac{3}{4}.$$\n\nTo simplify fastest, divide by the **greatest common factor** of the two numbers. For $\\tfrac{6}{8}$ that's 2; for $\\tfrac{10}{15}$ it's 5, giving $\\tfrac{2}{3}$. A fraction is in lowest terms when no number bigger than 1 divides both parts." } },
      { kind: "SIMULATION", title: "Try it: see equivalence", content: { simId: "fraction-pie", intro: "Shade $\\tfrac12$ (1 of 2). Then cut into 4 and shade 2, then 6 and shade 3 — the colored area never changes. Equivalent fractions fill the same space." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Build an equivalent", problem: "Write $\\tfrac12$ with a denominator of 8.", steps: ["8 is $2 \\times 4$, so multiply top and bottom by 4.", "$\\tfrac12 \\times \\tfrac44 = \\tfrac{4}{8}$."], answer: "$\\tfrac12 = \\tfrac{4}{8}$." },
        { title: "Simplify", problem: "Simplify $\\tfrac{6}{8}$ to lowest terms.", steps: ["The greatest common factor of 6 and 8 is 2.", "$\\tfrac{6 \\div 2}{8 \\div 2} = \\tfrac{3}{4}$.", "3 and 4 share no factor > 1."], answer: "$\\tfrac{6}{8} = \\tfrac{3}{4}$." },
        { title: "Simplify further", problem: "Simplify $\\tfrac{10}{15}$.", steps: ["GCF of 10 and 15 is 5.", "$\\tfrac{10 \\div 5}{15 \\div 5} = \\tfrac{2}{3}$."], answer: "$\\tfrac{10}{15} = \\tfrac{2}{3}$." },
      ] } },
      { kind: "VIDEOS", title: "Watch", content: { videos: [{ youtubeId: "U2ovEuEUxXQ", title: "Equivalent Fractions" }] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Building and simplifying equivalents." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Multiply or divide top and bottom by the same number." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: why we simplify", content: { markdown: "Why bother reducing $\\tfrac{6}{8}$ to $\\tfrac{3}{4}$? Because the simplest name is the easiest to picture, compare, and communicate — and it's the standard \"answer\" form in math.\n\nThere's a neat test for equivalence without simplifying: **cross-multiply**. Fractions $\\tfrac{a}{b}$ and $\\tfrac{c}{d}$ are equal exactly when $a \\times d = b \\times c$. Check $\\tfrac{6}{8}$ and $\\tfrac{3}{4}$: $6 \\times 4 = 24$ and $8 \\times 3 = 24$ — equal! You'll use cross-multiplication again with ratios and proportions next door at the Market." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Equivalent fractions name the same amount with different numbers.", "Multiply top and bottom by the same number to build an equivalent.", "Divide top and bottom by a common factor to simplify.", "Lowest terms: no common factor greater than 1 remains.", "Cross-multiplying tests whether two fractions are equal."], formulas: [{ label: "Equivalence", tex: "\\frac{a}{b} = \\frac{a\\times k}{b\\times k}" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "$\\tfrac12$ and $\\tfrac24$ are equivalent fractions.", answer: true, explanation: "Both name one half." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "To make an equivalent fraction, you:", options: ["add the same number to top and bottom", "multiply or divide top and bottom by the same number", "multiply only the top", "subtract from the bottom"], answer: 1, explanation: "Multiply or divide both parts by the same number." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "Fill in: $\\tfrac12 = \\tfrac{\\;?\\;}{8}$. Type the numerator.", answer: { value: 4, tolerance: 0 }, explanation: "Multiply top and bottom by 4: $\\tfrac{4}{8}$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "$\\tfrac23 = \\tfrac{\\;?\\;}{9}$. Type the numerator.", answer: { value: 6, tolerance: 0 }, hint: "$9 = 3 \\times 3$.", explanation: "Multiply by 3: $\\tfrac{6}{9}$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Which fraction is equivalent to $\\tfrac34$?", options: ["$\\tfrac{6}{8}$", "$\\tfrac{4}{5}$", "$\\tfrac{2}{3}$", "$\\tfrac{3}{8}$"], answer: 0, hint: "Multiply top and bottom by 2.", explanation: "$\\tfrac34 \\times \\tfrac22 = \\tfrac{6}{8}$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Simplify $\\tfrac{6}{8} = \\tfrac{\\;?\\;}{4}$. Type the numerator.", answer: { value: 3, tolerance: 0 }, hint: "Divide top and bottom by 2.", explanation: "$\\tfrac{6}{8} = \\tfrac{3}{4}$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Simplify $\\tfrac{10}{15}$ to lowest terms. Type the denominator of the result.", answer: { value: 3, tolerance: 0 }, hint: "Divide by 5.", explanation: "$\\tfrac{10}{15} = \\tfrac{2}{3}$, denominator 3." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "$\\tfrac{6}{9}$ simplifies to $\\tfrac{2}{3}$.", answer: true, hint: "Divide top and bottom by 3.", explanation: "$\\tfrac{6 \\div 3}{9 \\div 3} = \\tfrac{2}{3}$." },
    ],
  },

  // ───────────────────── 3. Comparing & Ordering Fractions ─────────────────────
  {
    slug: "comparing-fractions",
    title: "Comparing & Ordering Fractions",
    tagline: "Which slice is bigger?",
    estMinutes: 13,
    xpReward: 120,
    sections: [
      { kind: "HERO", content: { scene: "bakery", headline: "Bigger or Smaller?", sub: "Is two-thirds of a tart more than three-quarters? Comparing fractions is a daily bakery puzzle." } },
      { kind: "CONTEXT", title: "Choosing the bigger share", content: { markdown: "Two friends argue over who got more cake: one has $\\tfrac23$ of a small tart, the other $\\tfrac34$ of an identical one. To settle it, you need to **compare** fractions. The trick depends on whether the bottoms (or tops) match." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "**Same denominator?** Just compare the numerators — more parts of the *same size* means more.\n\n$$\\frac{3}{5} > \\frac{2}{5} \\quad (\\text{3 fifths beat 2 fifths}).$$\n\n**Same numerator?** The one with the **smaller denominator** is larger, because the pieces are bigger.\n\n$$\\frac{1}{3} > \\frac{1}{4} \\quad (\\text{a third is a bigger slice than a quarter}).$$\n\nThis surprises people: with the *same number* of pieces, **more pieces in the whole means each is smaller**.\n\n**Neither matches?** Rewrite both with a **common denominator** (a shared bottom number), then compare numerators. Compare $\\tfrac23$ and $\\tfrac34$ using denominator 12:\n\n$$\\frac23 = \\frac{8}{12}, \\qquad \\frac34 = \\frac{9}{12} \\;\\Rightarrow\\; \\frac34 > \\frac23.$$\n\nA good common denominator is any common multiple of the two bottoms (the **least common multiple** is tidiest; multiplying the two denominators always works too). Once the bottoms match, the bigger top wins." } },
      { kind: "SIMULATION", title: "Try it: compare by eye", content: { simId: "fraction-pie", intro: "Shade $\\tfrac13$, note the area, then shade $\\tfrac14$ — the third really is the bigger slice. Try the decimal readout to confirm which fraction is larger." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Same bottom", problem: "Which is larger, $\\tfrac{5}{8}$ or $\\tfrac{3}{8}$?", steps: ["Denominators match (eighths).", "Compare numerators: $5 > 3$."], answer: "$\\tfrac{5}{8}$ is larger." },
        { title: "Same top", problem: "Which is larger, $\\tfrac12$ or $\\tfrac15$?", steps: ["Numerators match (both 1).", "Smaller denominator → bigger piece: 2 < 5."], answer: "$\\tfrac12$ is larger." },
        { title: "Common denominator", problem: "Compare $\\tfrac23$ and $\\tfrac34$.", steps: ["Use denominator 12.", "$\\tfrac23 = \\tfrac{8}{12}$, $\\tfrac34 = \\tfrac{9}{12}$.", "$9 > 8$."], answer: "$\\tfrac34 > \\tfrac23$." },
      ] } },
      { kind: "VIDEOS", title: "Watch", content: { videos: [{ youtubeId: "AQHFLk7WV8M", title: "Comparing Fractions" }] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Compare by denominator, numerator, or a common bottom." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Match the bottoms (or tops) first, then compare." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: benchmarking against one half", content: { markdown: "Experienced math students rarely do full common-denominator work to compare — they **benchmark** against $\\tfrac12$ and $1$. A fraction is more than $\\tfrac12$ when its numerator is more than half its denominator. So $\\tfrac{5}{8}$ (5 beats half of 8) is more than a half, while $\\tfrac{3}{8}$ is less — instantly $\\tfrac{5}{8} > \\tfrac{3}{8}$. Comparing $\\tfrac{4}{9}$ and $\\tfrac{5}{8}$: the first is just under $\\tfrac12$, the second just over, so $\\tfrac{5}{8}$ wins without any arithmetic. Benchmarks turn comparison into a quick estimate." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Same denominator: the bigger numerator is larger.", "Same numerator: the smaller denominator is larger (bigger pieces).", "Otherwise, rewrite with a common denominator, then compare tops.", "A common denominator is any common multiple of the bottoms.", "Benchmarking against $\\tfrac12$ gives quick estimates."], formulas: [{ label: "Same bottom", tex: "\\tfrac{a}{d} > \\tfrac{b}{d} \\iff a > b" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Which is larger: $\\tfrac{3}{5}$ or $\\tfrac{2}{5}$?", options: ["$\\tfrac{3}{5}$", "$\\tfrac{2}{5}$", "they are equal"], answer: 0, explanation: "Same denominator; 3 > 2." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Which is larger: $\\tfrac{1}{3}$ or $\\tfrac{1}{4}$?", options: ["$\\tfrac{1}{3}$", "$\\tfrac{1}{4}$", "they are equal"], answer: 0, explanation: "Same numerator; smaller denominator means bigger pieces." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "When two fractions share a denominator, the one with the larger numerator is larger.", answer: true, explanation: "More same-size parts means more." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Which is larger: $\\tfrac{5}{8}$ or $\\tfrac{3}{8}$?", options: ["$\\tfrac{5}{8}$", "$\\tfrac{3}{8}$", "they are equal"], answer: 0, hint: "Same bottom.", explanation: "$5 > 3$, so $\\tfrac{5}{8}$ is larger." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Which is larger: $\\tfrac{1}{2}$ or $\\tfrac{1}{5}$?", options: ["$\\tfrac{1}{2}$", "$\\tfrac{1}{5}$", "they are equal"], answer: 0, hint: "Same top; smaller bottom wins.", explanation: "Halves are bigger than fifths." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Compare $\\tfrac12$ and $\\tfrac24$.", options: ["$\\tfrac12$ is larger", "$\\tfrac24$ is larger", "they are equal"], answer: 2, hint: "Are they equivalent?", explanation: "$\\tfrac24 = \\tfrac12$ — equal." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Which is the smallest: $\\tfrac12$, $\\tfrac14$, $\\tfrac18$?", options: ["$\\tfrac12$", "$\\tfrac14$", "$\\tfrac18$"], answer: 2, hint: "Same top; biggest bottom is smallest.", explanation: "Eighths are the smallest pieces." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "To compare $\\tfrac23$ and $\\tfrac34$, a good common denominator is:", options: ["7", "12", "6", "5"], answer: 1, hint: "A common multiple of 3 and 4.", explanation: "12 works: $\\tfrac{8}{12}$ vs $\\tfrac{9}{12}$." },
    ],
  },

  // ───────────────────── 4. Adding & Subtracting Fractions ─────────────────────
  {
    slug: "adding-subtracting-fractions",
    title: "Adding & Subtracting Fractions",
    tagline: "Combining parts of a whole",
    estMinutes: 15,
    xpReward: 140,
    sections: [
      { kind: "HERO", content: { scene: "bakery", headline: "Putting Slices Together", sub: "One-quarter of a pie plus two-quarters makes three-quarters. Adding fractions starts with matching the slice size." } },
      { kind: "CONTEXT", title: "Combining leftover slices", content: { markdown: "At closing time the baker has $\\tfrac14$ of a pie on one plate and $\\tfrac24$ on another. Boxed together, that's $\\tfrac34$ of a pie. But what if the slices are *different sizes* — say $\\tfrac12$ and $\\tfrac13$? Then we first have to make the pieces match." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "**Same denominator.** Add (or subtract) the **numerators** and keep the denominator — the slice size doesn't change, you just have more or fewer slices:\n\n$$\\frac14 + \\frac24 = \\frac{1+2}{4} = \\frac34, \\qquad \\frac56 - \\frac16 = \\frac{4}{6} = \\frac23.$$\n\nAlways **simplify** the result if you can ($\\tfrac46 = \\tfrac23$).\n\n**Different denominators.** You can't add fourths to thirds any more than you can add apples to oranges — first rewrite both with a **common denominator**:\n\n$$\\frac12 + \\frac13: \\quad \\text{use 6} \\;\\Rightarrow\\; \\frac{3}{6} + \\frac{2}{6} = \\frac{5}{6}.$$\n\nThe recipe:\n\n1. Find a common denominator (a common multiple of the bottoms).\n2. Rewrite each fraction with that denominator (build equivalents).\n3. Add or subtract the numerators; keep the denominator.\n4. Simplify the answer.\n\nThe whole game is **making the slices the same size** before you combine them." } },
      { kind: "SIMULATION", title: "Try it: build the sum", content: { simId: "fraction-pie", intro: "Shade $\\tfrac14$, then $\\tfrac24$ on a pie cut into quarters to see $\\tfrac34$ appear. Same-size slices simply add up." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Same denominator", problem: "Add $\\tfrac38 + \\tfrac28$.", steps: ["Bottoms match (eighths).", "Add tops: $3 + 2 = 5$.", "Keep the 8."], answer: "$\\tfrac38 + \\tfrac28 = \\tfrac58$." },
        { title: "Subtract and simplify", problem: "Compute $\\tfrac56 - \\tfrac16$.", steps: ["Subtract tops: $5 - 1 = 4$.", "$\\tfrac46$ simplifies: divide by 2.", "$\\tfrac46 = \\tfrac23$."], answer: "$\\tfrac56 - \\tfrac16 = \\tfrac23$." },
        { title: "Different denominators", problem: "Add $\\tfrac12 + \\tfrac13$.", steps: ["Common denominator 6.", "$\\tfrac12 = \\tfrac36$, $\\tfrac13 = \\tfrac26$.", "$\\tfrac36 + \\tfrac26 = \\tfrac56$."], answer: "$\\tfrac12 + \\tfrac13 = \\tfrac56$." },
      ] } },
      { kind: "VIDEOS", title: "Watch", content: { videos: [{ youtubeId: "5juto2ze8Lg", title: "Adding and Subtracting Fractions" }] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Match the bottoms, then combine the tops." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Same bottom: add the tops. Different bottoms: make them match first." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: a shortcut for any two fractions", content: { markdown: "When two denominators share no common factors, there's a tidy formula:\n\n$$\\frac{a}{b} + \\frac{c}{d} = \\frac{ad + bc}{bd}.$$\n\nFor $\\tfrac12 + \\tfrac13$: $a d + b c = 1\\cdot3 + 2\\cdot1 = 5$ over $bd = 6$, giving $\\tfrac56$ — the same answer. It always works, though using the **least** common denominator keeps the numbers small and the simplifying easy. This same cross-pattern reappears constantly in algebra when you add algebraic fractions." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Same denominator: add or subtract the numerators, keep the denominator.", "Different denominators: rewrite with a common denominator first.", "Build equivalents so the slice sizes match, then combine.", "Always simplify the final answer.", "The formula $\\tfrac{a}{b}+\\tfrac{c}{d}=\\tfrac{ad+bc}{bd}$ always works."], formulas: [{ label: "Same denominator", tex: "\\frac{a}{d} + \\frac{b}{d} = \\frac{a+b}{d}" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "$\\tfrac14 + \\tfrac24 = \\tfrac{\\;?\\;}{4}$. Type the numerator.", answer: { value: 3, tolerance: 0 }, explanation: "$1 + 2 = 3$, keep the 4." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "To add fractions with the same denominator, add the numerators and keep the denominator.", answer: true, explanation: "Same-size slices just add up." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "$\\tfrac12 + \\tfrac13 = \\,$?", options: ["$\\tfrac25$", "$\\tfrac56$", "$\\tfrac16$", "$\\tfrac26$"], answer: 1, explanation: "$\\tfrac36 + \\tfrac26 = \\tfrac56$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "$\\tfrac38 + \\tfrac28 = \\tfrac{\\;?\\;}{8}$. Type the numerator.", answer: { value: 5, tolerance: 0 }, hint: "Add the tops.", explanation: "$3 + 2 = 5$: $\\tfrac58$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "$\\tfrac56 - \\tfrac16 = \\tfrac46$, which simplifies to $\\tfrac{\\;?\\;}{3}$. Type the numerator.", answer: { value: 2, tolerance: 0 }, hint: "Divide $\\tfrac46$ by 2.", explanation: "$\\tfrac46 = \\tfrac23$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "$\\tfrac12 + \\tfrac14 = \\,$?", options: ["$\\tfrac26$", "$\\tfrac34$", "$\\tfrac16$", "$\\tfrac24$"], answer: 1, hint: "Rewrite $\\tfrac12$ as $\\tfrac24$.", explanation: "$\\tfrac24 + \\tfrac14 = \\tfrac34$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "$\\tfrac13 + \\tfrac13 + \\tfrac13 = \\,$? whole(s). Type the number.", answer: { value: 1, tolerance: 0 }, hint: "$\\tfrac33$.", explanation: "$\\tfrac33 = 1$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "To add $\\tfrac12 + \\tfrac13$, first rewrite both with denominator:", options: ["5", "6", "2", "3"], answer: 1, hint: "Common multiple of 2 and 3.", explanation: "6 is the least common denominator." },
    ],
  },

  // ───────────────────────── 5. Decimals & Percents ─────────────────────────
  {
    slug: "decimals-and-percents",
    title: "Decimals & Percents",
    tagline: "Three ways to write the same amount",
    estMinutes: 14,
    xpReward: 140,
    sections: [
      { kind: "HERO", content: { scene: "bakery", headline: "Fractions in Disguise", sub: "Half a loaf, 0.5 of a loaf, 50% of a loaf — same amount, three notations. Prices and discounts speak all three." } },
      { kind: "CONTEXT", title: "Reading the price tags", content: { markdown: "The bakery's sign says muffins are **25% off** and a loaf costs **$3.50**. Decimals and percents are how money and discounts are written — and underneath, they're just fractions. Learning to switch between all three is one of the most useful skills in everyday math." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "**Decimals** extend place value past the ones, into tenths, hundredths, and beyond:\n\n$$0.5 = \\frac{5}{10} = \\frac12, \\qquad 0.25 = \\frac{25}{100} = \\frac14, \\qquad 0.75 = \\frac{75}{100} = \\frac34.$$\n\nThe first digit after the dot is **tenths**, the second is **hundredths**. To turn a fraction into a decimal, **divide** the top by the bottom: $\\tfrac34 = 3 \\div 4 = 0.75$.\n\n**Percent** means **\"per hundred\"** — the symbol $\\%$ literally stands for $/100$:\n\n$$50\\% = \\frac{50}{100} = 0.5, \\qquad 25\\% = \\frac{25}{100} = 0.25.$$\n\nSo the three forms convert easily:\n\n- **Fraction → decimal:** divide top by bottom.\n- **Decimal → percent:** multiply by 100 (move the dot two places right): $0.5 \\to 50\\%$.\n- **Percent → decimal:** divide by 100 (move the dot two places left): $75\\% \\to 0.75$.\n\nMemorising a few anchors makes this instant: $\\tfrac12 = 0.5 = 50\\%$, $\\tfrac14 = 0.25 = 25\\%$, $\\tfrac34 = 0.75 = 75\\%$, $\\tfrac{1}{10} = 0.1 = 10\\%$." } },
      { kind: "SIMULATION", title: "Try it: one amount, three forms", content: { simId: "fraction-pie", intro: "Shade any fraction and read off its decimal and percent in the panel. Watch $\\tfrac12$, $0.5$, and $50\\%$ all describe the same shaded pie." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Fraction to decimal", problem: "Write $\\tfrac34$ as a decimal.", steps: ["Divide top by bottom: $3 \\div 4$.", "$= 0.75$."], answer: "$\\tfrac34 = 0.75$." },
        { title: "Fraction to percent", problem: "Write $\\tfrac12$ as a percent.", steps: ["$\\tfrac12 = 0.5$.", "Multiply by 100: $0.5 \\times 100 = 50$."], answer: "$\\tfrac12 = 50\\%$." },
        { title: "Decimal to fraction", problem: "Write $0.25$ as a simplified fraction.", steps: ["$0.25 = \\tfrac{25}{100}$.", "Divide top and bottom by 25.", "$= \\tfrac14$."], answer: "$0.25 = \\tfrac14$." },
      ] } },
      { kind: "VIDEOS", title: "Watch", content: { videos: [{ youtubeId: "JzWLcoX0Wbk", title: "Fractions, Decimals, and Percents" }] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Switching between fractions, decimals, and percents." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Use the anchors and the conversion rules." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: repeating decimals", content: { markdown: "Not every fraction gives a clean, ending decimal. Try $\\tfrac13 = 1 \\div 3 = 0.3333\\ldots$ — the 3s never stop. We write this as $0.\\overline{3}$, with a bar over the repeating part. Fractions whose denominators (in lowest terms) are built only from 2s and 5s give *terminating* decimals like $0.25$; all others **repeat** forever in a pattern. Remarkably, every repeating decimal can be turned back into an exact fraction — so fractions and decimals describe exactly the same set of numbers, the *rationals*." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Decimals are place value past the ones: tenths, hundredths…", "Fraction → decimal: divide top by bottom.", "Percent means per hundred: $50\\% = \\tfrac{50}{100} = 0.5$.", "Decimal → percent: ×100; percent → decimal: ÷100.", "Anchors: $\\tfrac12=0.5=50\\%$, $\\tfrac14=0.25=25\\%$, $\\tfrac34=0.75=75\\%$."], formulas: [{ label: "Percent", tex: "x\\% = \\dfrac{x}{100}" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "The decimal $0.5$ is the same as the fraction:", options: ["$\\tfrac15$", "$\\tfrac12$", "$\\tfrac51$", "$\\tfrac{1}{50}$"], answer: 1, explanation: "$0.5 = \\tfrac{5}{10} = \\tfrac12$." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "Write $\\tfrac12$ as a percent. Type the number (no % sign).", answer: { value: 50, tolerance: 0 }, explanation: "$\\tfrac12 = 0.5 = 50\\%$." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Percent means 'per':", options: ["ten", "hundred", "thousand", "one"], answer: 1, explanation: "Percent means per hundred." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "$0.25$ as a simplified fraction is:", options: ["$\\tfrac14$", "$\\tfrac12$", "$\\tfrac25$", "$\\tfrac{1}{25}$"], answer: 0, hint: "$\\tfrac{25}{100}$ simplified.", explanation: "$0.25 = \\tfrac{25}{100} = \\tfrac14$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Write $\\tfrac34$ as a percent. Type the number.", answer: { value: 75, tolerance: 0 }, hint: "$\\tfrac34 = 0.75$.", explanation: "$0.75 \\times 100 = 75\\%$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Write $0.7$ as a fraction over 10: $\\tfrac{\\;?\\;}{10}$. Type the numerator.", answer: { value: 7, tolerance: 0 }, hint: "The 7 is in the tenths place.", explanation: "$0.7 = \\tfrac{7}{10}$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Which is largest?", options: ["0.5", "0.05", "0.25", "0.1"], answer: 0, hint: "Compare the tenths place.", explanation: "$0.5$ is the largest." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "What is $0.25$ written as a percent? Type the number.", answer: { value: 25, tolerance: 0 }, hint: "Multiply by 100.", explanation: "$0.25 = 25\\%$." },
    ],
  },
];
