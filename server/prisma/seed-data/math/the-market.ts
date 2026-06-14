import type { LessonSeed } from "../types.js";

/**
 * The Market (grades 5–6): ratios, rates, proportions, and percents — discovered
 * while bartering at the stalls and reading price tags. Ratios, equivalent ratios
 * & unit rates, proportions, percent of a number, and percent change. Clean
 * numerals + the fraction-pie sim for the percent lessons; no decorative emoji.
 */
export const theMarketLessons: LessonSeed[] = [
  // ───────────────────────────── 1. Ratios ─────────────────────────────
  {
    slug: "ratios",
    title: "Ratios",
    tagline: "Comparing two quantities",
    estMinutes: 13,
    xpReward: 130,
    sections: [
      { kind: "HERO", content: { scene: "market", headline: "Two to One", sub: "Two apples for every orange, three parts water to one part juice — a ratio compares amounts side by side." } },
      { kind: "CONTEXT", title: "At the market stalls", content: { markdown: "The fruit seller stacks 6 apples next to 4 oranges. A juice stand mixes 3 cups of water with 1 cup of concentrate. To describe these comparisons precisely, we use **ratios** — the foundation of rates, proportions, and percents, and one of the most useful ideas in everyday math." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "A **ratio** compares two quantities. The ratio of 6 apples to 4 oranges can be written three ways:\n\n$$6 : 4 \\qquad \\frac{6}{4} \\qquad \\text{\"6 to 4\".}$$\n\nLike fractions, ratios can be **simplified** by dividing both parts by a common factor:\n\n$$6 : 4 = 3 : 2.$$\n\nTwo flavours of ratio:\n\n- **Part-to-part** compares one group to another: apples to oranges, $6 : 4 = 3 : 2$.\n- **Part-to-whole** compares one group to the total: apples to all fruit, $6 : 10 = 3 : 5$ (since $6 + 4 = 10$).\n\nPart-to-whole ratios are just fractions in disguise — apples are $\\tfrac{6}{10} = \\tfrac35$ of the fruit.\n\nOrder matters: \"apples to oranges\" $6:4$ is **not** the same as \"oranges to apples\" $4:6$. Always keep the quantities in the order named." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Simplify a ratio", problem: "A class has 12 boys and 8 girls. Write the ratio of boys to girls in simplest form.", steps: ["Boys to girls is $12 : 8$.", "Divide both by 4.", "$= 3 : 2$."], answer: "$3 : 2$." },
        { title: "Part to whole", problem: "There are 6 red and 9 blue marbles. What is the ratio of red marbles to the total?", steps: ["Total is $6 + 9 = 15$.", "Red to total is $6 : 15$.", "Divide by 3: $2 : 5$."], answer: "$6 : 15 = 2 : 5$." },
        { title: "Keep the ratio", problem: "A recipe uses 2 cups flour to 1 cup sugar. For 6 cups of flour, how much sugar keeps the same ratio?", steps: ["Ratio is $2 : 1$.", "6 cups flour is $3\\times$ the flour.", "Sugar scales the same: $3 \\times 1 = 3$."], answer: "3 cups of sugar." },
      ] } },
      { kind: "VIDEOS", title: "Watch", content: { videos: [{ youtubeId: "P0tLbl5LrJ8", title: "Introduction to Ratios" }] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Writing and simplifying ratios." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Simplify like fractions; mind part-to-part vs part-to-whole." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: ratios with more than two parts", content: { markdown: "Ratios can compare **three or more** quantities at once. A fruit punch recipe might be $2 : 3 : 5$ (orange : pineapple : soda). The parts still scale together: doubling gives $4 : 6 : 10$. And the **total parts** ($2 + 3 + 5 = 10$) let you turn any total amount into the right share — for 20 cups of punch, each 'part' is 2 cups, so you'd use 4, 6, and 10 cups. This 'parts' thinking is exactly how recipes, paint mixes, and concrete are scaled in the real world." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["A ratio compares two quantities: $a:b$, $\\tfrac{a}{b}$, or 'a to b'.", "Simplify ratios by dividing both parts by a common factor.", "Part-to-part compares groups; part-to-whole compares to the total.", "Part-to-whole ratios are fractions.", "Order matters: $a:b \\ne b:a$."], formulas: [{ label: "Simplify", tex: "a:b = \\tfrac{a}{k}:\\tfrac{b}{k}" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "A ratio compares:", options: ["two quantities", "one number", "three numbers only", "nothing"], answer: 0, explanation: "A ratio compares two (or more) quantities." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "The ratio $6:4$ in simplest form is:", options: ["$6:4$", "$3:2$", "$2:3$", "$12:8$"], answer: 1, explanation: "Divide both by 2: $3:2$." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "The ratio 'apples to total fruit' is a part-to-whole ratio.", answer: true, explanation: "It compares a part to the whole." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A class has 12 boys and 8 girls. The ratio of boys to girls is:", options: ["$3:2$", "$8:12$", "$2:3$", "$12:20$"], answer: 0, hint: "Simplify $12:8$.", explanation: "$12:8 = 3:2$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Simplify the ratio $10:15$ to lowest terms. Type the first number.", answer: { value: 2, tolerance: 0 }, hint: "Divide both by 5.", explanation: "$10:15 = 2:3$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "There are 6 red and 9 blue marbles. The ratio of red to the total is:", options: ["$6:9$", "$2:5$", "$9:15$", "$2:3$"], answer: 1, hint: "Total is 15.", explanation: "$6:15 = 2:5$." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "The ratio $2:3$ is the same as $4:6$.", answer: true, hint: "Scale both parts.", explanation: "$4:6$ simplifies to $2:3$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A recipe uses 2 cups flour to 1 cup sugar. For 6 cups of flour, how many cups of sugar? (same ratio)", answer: { value: 3, tolerance: 0 }, hint: "6 is $3\\times$ the flour.", explanation: "Sugar scales to $3\\times1 = 3$ cups." },
    ],
  },

  // ──────────────── 2. Equivalent Ratios & Unit Rates ────────────────
  {
    slug: "rates-and-unit-rates",
    title: "Rates & Unit Rates",
    tagline: "Comparing different units",
    estMinutes: 13,
    xpReward: 130,
    sections: [
      { kind: "HERO", content: { scene: "market", headline: "Per One", sub: "Miles per hour, dollars per pound — a rate compares two different units, and the unit rate tells you the cost or speed for exactly one." } },
      { kind: "CONTEXT", title: "Finding the better buy", content: { markdown: "One stall sells 3 pounds of rice for \\$6, another sells 5 pounds for \\$9. Which is the better deal? You can't tell by the prices alone — you need the **unit rate**, the price per single pound. Unit rates turn confusing comparisons into a fair, head-to-head number." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "A **rate** is a ratio comparing quantities with **different units** — miles and hours, dollars and pounds, words and minutes.\n\nA **unit rate** is a rate written with a denominator of **1**: how much *per single unit*. You find it by **dividing**:\n\n$$\\frac{120\\ \\text{miles}}{2\\ \\text{hours}} = 60\\ \\text{miles per hour}, \\qquad \\frac{\\$6}{3\\ \\text{lb}} = \\$2\\ \\text{per lb}.$$\n\nUnit rates make comparison easy: whichever option has the lower price *per unit* is the better buy; whichever runner covers more distance *per hour* is faster.\n\n**Equivalent ratios** are the same idea seen sideways: scaling both parts of a rate up or down keeps it the same. $60$ mph means $120$ miles in $2$ hours, or $180$ miles in $3$ hours — all equivalent. The unit rate is just the equivalent ratio with $1$ on the bottom." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Unit price", problem: "A bag of 3 pounds of rice costs $6. Find the price per pound.", steps: ["Divide cost by weight: $6 \\div 3$.", "$= \\$2$ per pound."], answer: "$2 per pound." },
        { title: "Speed", problem: "A car travels 150 miles in 3 hours. Find its speed.", steps: ["$150 \\div 3 = 50$.", "Units: miles per hour."], answer: "$50$ mph." },
        { title: "Better deal", problem: "Is \\$4 for 2 litres or \\$9 for 3 litres cheaper per litre?", steps: ["First: $4 \\div 2 = 2$, so \\$2/L.", "Second: $9 \\div 3 = 3$, so \\$3/L.", "$2 < 3$."], answer: "\\$4 for 2 litres is the better deal." },
      ] } },
      { kind: "VIDEOS", title: "Watch", content: { videos: [{ youtubeId: "qGTYSAeLTOE", title: "Rates and Unit Rates" }] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Rates, unit rates, and dividing." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Divide to find the amount per one unit." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: unit rates are everywhere", content: { markdown: "Once you spot them, unit rates run the world. **Fuel economy** is miles per gallon; **typing speed** is words per minute; **heart rate** is beats per minute; a **density** is grams per cubic centimetre; even a **wage** is dollars per hour. Each squeezes a two-number relationship into a single, comparable figure. Supermarkets are even required to print unit prices on shelf tags so shoppers can compare a giant box and a small one fairly — math protecting your wallet." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["A rate compares quantities with different units.", "A unit rate has denominator 1 — the amount per single unit.", "Find a unit rate by dividing.", "Lower price per unit = better deal; more distance per hour = faster.", "Equivalent ratios scale together; the unit rate has 1 on the bottom."], formulas: [{ label: "Unit rate", tex: "\\text{unit rate} = \\dfrac{\\text{amount}}{\\text{1 unit}}" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "A unit rate has a denominator of:", options: ["1", "100", "0", "10"], answer: 0, explanation: "A unit rate is 'per one'." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "A car goes 120 miles in 2 hours. Speed in miles per hour?", answer: { value: 60, tolerance: 0 }, explanation: "$120/2 = 60$ mph." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "A rate compares two quantities with different units.", answer: true, explanation: "Like miles and hours." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "\\$6 for 3 pounds. Unit price in dollars per pound?", answer: { value: 2, tolerance: 0 }, hint: "Divide 6 by 3.", explanation: "$6 \\div 3 = 2$, so \\$2 per pound." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A car travels 150 miles in 3 hours. Speed in mph?", answer: { value: 50, tolerance: 0 }, hint: "Distance ÷ time.", explanation: "$150/3 = 50$ mph." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "12 cookies shared among 4 children. Cookies per child?", answer: { value: 3, tolerance: 0 }, hint: "Divide.", explanation: "$12/4 = 3$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Which is the better deal: \\$4 for 2 L or \\$9 for 3 L?", options: ["\\$4 for 2 L", "\\$9 for 3 L", "they are equal", "cannot tell"], answer: 0, hint: "Find price per litre.", explanation: "\\$2/L vs \\$3/L — the first is cheaper." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A printer prints 20 pages in 4 minutes. Pages per minute?", answer: { value: 5, tolerance: 0 }, hint: "Divide.", explanation: "$20/4 = 5$ pages/min." },
    ],
  },

  // ───────────────────────────── 3. Proportions ─────────────────────────────
  {
    slug: "proportions",
    title: "Proportions",
    tagline: "When two ratios are equal",
    estMinutes: 14,
    xpReward: 140,
    sections: [
      { kind: "HERO", content: { scene: "market", headline: "Solving for the Unknown", sub: "If 2 pencils cost 50 cents, what do 8 cost? Set two ratios equal and cross-multiply to find the missing piece." } },
      { kind: "CONTEXT", title: "Scaling a recipe", content: { markdown: "A recipe for 4 people needs 6 eggs. How many eggs for 6 people? Whenever two quantities stay in the same ratio, you have a **proportion** — and cross-multiplication finds any missing value. It's the engine behind scaling recipes, reading maps, mixing chemicals, and converting currencies." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "A **proportion** is a statement that **two ratios are equal**:\n\n$$\\frac{a}{b} = \\frac{c}{d}.$$\n\nThe powerful tool for proportions is **cross-multiplication**: multiply each numerator by the other denominator. If the ratios are equal, the cross-products are equal:\n\n$$\\frac{a}{b} = \\frac{c}{d} \\;\\Longleftrightarrow\\; a \\times d = b \\times c.$$\n\nThis lets you **solve for an unknown**. To solve $\\dfrac{x}{4} = \\dfrac{6}{8}$:\n\n$$8x = 4 \\times 6 = 24 \\;\\Rightarrow\\; x = 3.$$\n\nThe recipe for any proportion problem:\n\n1. Write the two ratios, keeping units in the **same order** on top and bottom.\n2. Cross-multiply.\n3. Solve the resulting simple equation.\n\nCross-multiplication is also the quickest **test** of whether two ratios are equal: $\\tfrac23$ and $\\tfrac69$ give $2\\times9 = 18$ and $3\\times6 = 18$ — equal, so they form a proportion." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Solve a proportion", problem: "Solve $\\dfrac{x}{4} = \\dfrac{6}{8}$.", steps: ["Cross-multiply: $8x = 4 \\times 6 = 24$.", "Divide by 8: $x = 3$."], answer: "$x = 3$." },
        { title: "Scale a price", problem: "If 2 pencils cost 50 cents, what do 8 pencils cost (same rate)?", steps: ["$\\dfrac{2}{50} = \\dfrac{8}{x}$.", "Cross-multiply: $2x = 50 \\times 8 = 400$.", "$x = 200$ cents."], answer: "$200 cents = $2.00." },
        { title: "Test for proportion", problem: "Do $\\dfrac{2}{3}$ and $\\dfrac{6}{9}$ form a proportion?", steps: ["Cross-multiply: $2 \\times 9 = 18$ and $3 \\times 6 = 18$.", "They're equal."], answer: "Yes — the cross-products match." },
      ] } },
      { kind: "VIDEOS", title: "Watch", content: { videos: [{ youtubeId: "USmit5zUGas", title: "Solving Proportions" }] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Proportions and cross-multiplication." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Cross-multiply, then solve for the unknown." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: maps, models, and scale", content: { markdown: "Proportions power every **scale drawing**. A map's scale, say '1 cm = 50 km', is a ratio; to find the real distance for 3.5 cm you solve $\\dfrac{1}{50} = \\dfrac{3.5}{x}$. Architects' blueprints, model trains, and even the enlargement on a photocopier all rely on keeping a ratio constant. Two shapes with all sides in the same ratio are called **similar** — the geometry version of a proportion, which you'll meet over in the Architect's Quarter." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["A proportion sets two ratios equal: $\\tfrac{a}{b} = \\tfrac{c}{d}$.", "Cross-multiplying gives $ad = bc$.", "Use it to solve for an unknown value.", "Keep units in the same order top and bottom.", "Cross-products also test whether two ratios are equal."], formulas: [{ label: "Cross-multiply", tex: "\\frac{a}{b} = \\frac{c}{d} \\iff ad = bc" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "A proportion states that two ratios are:", options: ["equal", "different", "added", "subtracted"], answer: 0, explanation: "A proportion is two equal ratios." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "Solve $\\dfrac{x}{4} = \\dfrac{6}{8}$. $x = $?", answer: { value: 3, tolerance: 0 }, explanation: "$8x = 24 \\Rightarrow x = 3$." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "In a proportion $\\tfrac{a}{b} = \\tfrac{c}{d}$, cross-multiplying gives $ad = bc$.", answer: true, explanation: "That's the cross-multiplication rule." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Solve $\\dfrac{3}{5} = \\dfrac{x}{20}$. $x = $?", answer: { value: 12, tolerance: 0 }, hint: "$5x = 60$.", explanation: "$x = 12$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Solve $\\dfrac{x}{6} = \\dfrac{2}{3}$. $x = $?", answer: { value: 4, tolerance: 0 }, hint: "$3x = 12$.", explanation: "$x = 4$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Solve $\\dfrac{4}{x} = \\dfrac{2}{5}$. $x = $?", answer: { value: 10, tolerance: 0 }, hint: "$2x = 20$.", explanation: "$x = 10$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "If 2 pencils cost \\$0.50, how much do 8 pencils cost (same rate), in dollars?", answer: { value: 2, tolerance: 0 }, hint: "Unit price \\$0.25.", explanation: "$8 \\times 0.25 = \\$2.00$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Do $\\tfrac{2}{3}$ and $\\tfrac{6}{9}$ form a proportion?", options: ["yes, they are equal", "no", "only sometimes", "cannot tell"], answer: 0, hint: "Cross-multiply.", explanation: "$18 = 18$, so yes." },
    ],
  },

  // ───────────────────────── 4. Percent of a Number ─────────────────────────
  {
    slug: "percent-of-a-number",
    title: "Percent of a Number",
    tagline: "Finding a part per hundred",
    estMinutes: 13,
    xpReward: 130,
    sections: [
      { kind: "HERO", content: { scene: "market", headline: "Per Hundred", sub: "25% off a $80 coat, 15% tip on a meal — finding a percent of a number is everyday market math." } },
      { kind: "CONTEXT", title: "Reading the discount signs", content: { markdown: "A sign reads '25% off' on an $80 coat. To know your saving, you find **25% of 80**. Percents run sales, taxes, tips, and interest — being fast and confident with 'percent of a number' is one of the most practical skills in all of math." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "**Percent** means **per hundred**, so $p\\% = \\dfrac{p}{100}$. To find **$p\\%$ of a number $n$**, turn the percent into a decimal (or fraction) and **multiply**:\n\n$$p\\%\\ \\text{of}\\ n = \\frac{p}{100} \\times n.$$\n\nFor example, $25\\%$ of $80$:\n\n$$\\frac{25}{100} \\times 80 = 0.25 \\times 80 = 20.$$\n\nHandy mental anchors:\n\n- **10%** — just move the decimal one place: $10\\%$ of $50$ is $5$.\n- **50%** — half: $50\\%$ of $90$ is $45$.\n- **25%** — a quarter: $25\\%$ of $80$ is $20$.\n- **1%** — move the decimal two places: $1\\%$ of $300$ is $3$.\n\nYou can build other percents from these: $30\\%$ is three lots of $10\\%$; $15\\%$ is $10\\% + 5\\%$ (and $5\\%$ is half of $10\\%$). This is how people compute tips in their heads." } },
      { kind: "SIMULATION", title: "Try it: see the percent", content: { simId: "fraction-pie", intro: "Shade a fraction of the pie and read its percent. Seeing that $\\tfrac14$ of the whole is $25\\%$ makes 'percent of a number' click — a quarter of 80 is 20." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Quarter off", problem: "Find $25\\%$ of $80$.", steps: ["$25\\% = 0.25$.", "$0.25 \\times 80 = 20$."], answer: "$20$." },
        { title: "Ten percent trick", problem: "Find $10\\%$ of $50$.", steps: ["$10\\%$ means move the decimal one place left.", "$50 \\to 5.0$."], answer: "$5$." },
        { title: "Build a tip", problem: "Find $15\\%$ of $40$.", steps: ["$10\\%$ of $40 = 4$.", "$5\\%$ is half of that $= 2$.", "$15\\% = 4 + 2 = 6$."], answer: "$6$." },
      ] } },
      { kind: "VIDEOS", title: "Watch", content: { videos: [{ youtubeId: "rR95Cbcjzus", title: "Percent of a Number" }] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Finding a percent of a number." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Convert the percent to a decimal and multiply." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: percent is reversible", content: { markdown: "A surprising fact: **$p\\%$ of $q$ equals $q\\%$ of $p$**. So $8\\%$ of $50$ is the same as $50\\%$ of $8$ — and the second is obviously $4$! This works because both are $\\dfrac{p \\times q}{100}$. When one number is an easy percent (like 50 or 25 or 10), flip the problem to make it trivial. It's a favourite trick for fast mental math and a neat reminder that multiplication doesn't care about order." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["$p\\% = \\tfrac{p}{100}$; to find $p\\%$ of $n$, multiply $\\tfrac{p}{100}\\times n$.", "$10\\%$: move the decimal one place; $1\\%$: two places.", "$50\\%$ is half; $25\\%$ is a quarter.", "Build other percents from these anchors (e.g. $15\\% = 10\\% + 5\\%$).", "$p\\%$ of $q$ equals $q\\%$ of $p$."], formulas: [{ label: "Percent of a number", tex: "p\\%\\text{ of }n = \\dfrac{p}{100}\\times n" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "What is $25\\%$ of $80$?", answer: { value: 20, tolerance: 0 }, explanation: "$0.25 \\times 80 = 20$." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "What is $10\\%$ of $50$?", answer: { value: 5, tolerance: 0 }, explanation: "Move the decimal: $5$." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "To find $20\\%$ of a number, multiply it by $0.20$.", answer: true, explanation: "$20\\% = 0.20$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "What is $50\\%$ of $90$?", answer: { value: 45, tolerance: 0 }, hint: "Half.", explanation: "$0.5 \\times 90 = 45$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "What is $20\\%$ of $200$?", answer: { value: 40, tolerance: 0 }, hint: "$0.20 \\times 200$.", explanation: "$40$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "What is $75\\%$ of $40$?", answer: { value: 30, tolerance: 0 }, hint: "Three quarters.", explanation: "$0.75 \\times 40 = 30$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A \\$60 jacket is $10\\%$ off. The discount in dollars?", answer: { value: 6, tolerance: 0 }, hint: "$10\\%$ of 60.", explanation: "$0.10 \\times 60 = \\$6$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "What is $100\\%$ of $47$?", answer: { value: 47, tolerance: 0 }, hint: "All of it.", explanation: "$100\\%$ is the whole amount." },
    ],
  },

  // ───────────────────────────── 5. Percent Change ─────────────────────────────
  {
    slug: "percent-change",
    title: "Percent Change",
    tagline: "Discounts, markups, increases, and decreases",
    estMinutes: 14,
    xpReward: 140,
    sections: [
      { kind: "HERO", content: { scene: "market", headline: "How Much It Changed", sub: "A price drops from $50 to $40 — that's a 20% decrease. Percent change measures growth and discounts alike." } },
      { kind: "CONTEXT", title: "From sale tags to statistics", content: { markdown: "Prices rise and fall, populations grow, scores improve. To compare these fairly, we use **percent change** — the change measured against where you started. A $10 drop means very different things on a $20 item versus a $1000 item; percent change captures that." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "**Percent change** measures how much a quantity grew or shrank, relative to its **original** value:\n\n$$\\text{percent change} = \\frac{\\text{change}}{\\text{original}} \\times 100\\%.$$\n\nIf the value went **up**, it's a percent **increase**; if **down**, a percent **decrease**. The change is always compared to the *starting* amount, not the new one.\n\nExample: a price rises from $50 to $60. The change is $10$, so\n\n$$\\frac{10}{50} \\times 100\\% = 20\\%\\ \\text{increase}.$$\n\n**Discounts and markups** are percent change applied to prices:\n\n- A **discount** lowers the price: a $25\\%$ discount on $80 removes $25\\%$ of $80 = \\$20$, so you pay $80 - 20 = \\$60$.\n- A **markup** raises it: a $20\\%$ markup on $50 adds $\\$10$, giving $\\$60$.\n\nA shortcut for sale prices: paying after a $25\\%$ discount means paying $100\\% - 25\\% = 75\\%$ of the original. So the sale price is $0.75 \\times 80 = \\$60$ in one step." } },
      { kind: "SIMULATION", title: "Try it: visualize the percent", content: { simId: "fraction-pie", intro: "Use the pie to picture the percent you're keeping or removing. A 30%-off item means you shade and pay the other 70% — see that 70% as a slice of the whole." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Percent increase", problem: "A price rises from $50 to $60. Find the percent increase.", steps: ["Change $= 60 - 50 = 10$.", "$\\dfrac{10}{50}\\times100\\% = 20\\%$."], answer: "$20\\%$ increase." },
        { title: "Sale price", problem: "A $100 item is $30\\%$ off. Find the sale price.", steps: ["You pay $100\\% - 30\\% = 70\\%$.", "$0.70 \\times 100 = 70$."], answer: "$70." },
        { title: "Percent decrease", problem: "A quantity falls from 40 to 30. Find the percent decrease.", steps: ["Change $= 40 - 30 = 10$.", "$\\dfrac{10}{40}\\times100\\% = 25\\%$."], answer: "$25\\%$ decrease." },
      ] } },
      { kind: "VIDEOS", title: "Watch", content: { videos: [{ youtubeId: "X9Kvg5kJ7Hc", title: "Percent Increase and Decrease" }] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Percent change, discounts, and markups." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Divide the change by the original, then ×100." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: why increases and decreases don't cancel", content: { markdown: "Here's a trap: a price goes **up 50%** then **down 50%** — are you back where you started? No! Start at $100; up 50% gives $150; down 50% of *150* removes $75, leaving **$75**. The catch is that each percent is taken from a *different* base. This is why a stock that drops 50% must then *gain 100%* just to recover, and why 'percent off' and 'percent on' never simply cancel. Always check what the percent is a percentage *of*." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Percent change $= \\dfrac{\\text{change}}{\\text{original}} \\times 100\\%$.", "Up is an increase; down is a decrease.", "Always compare to the original (starting) value.", "Discount: pay $(100 - p)\\%$ of the price; markup adds $p\\%$.", "Successive percent changes use different bases and don't cancel."], formulas: [{ label: "Percent change", tex: "\\dfrac{\\text{change}}{\\text{original}}\\times 100\\%" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Percent change is computed as:", options: ["$\\tfrac{\\text{change}}{\\text{original}}\\times100\\%$", "$\\text{change}\\times100$", "$\\tfrac{\\text{original}}{\\text{change}}$", "$\\text{change}+\\text{original}$"], answer: 0, explanation: "Change over original, times 100%." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "A price rises from \\$50 to \\$60. Percent increase? (number only)", answer: { value: 20, tolerance: 0 }, explanation: "$\\tfrac{10}{50}\\times100 = 20\\%$." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "A $25\\%$ discount on \\$80 means you pay \\$60.", answer: true, explanation: "You pay $75\\%$ of 80 = 60." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A \\$100 item is $30\\%$ off. Sale price in dollars?", answer: { value: 70, tolerance: 0 }, hint: "Pay $70\\%$.", explanation: "$0.70\\times100 = \\$70$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A quantity falls from 40 to 30. Percent decrease? (number only)", answer: { value: 25, tolerance: 0 }, hint: "$\\tfrac{10}{40}$.", explanation: "$25\\%$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A \\$50 item has a $20\\%$ markup. New price in dollars?", answer: { value: 60, tolerance: 0 }, hint: "Add $20\\%$ of 50.", explanation: "$50 + 10 = \\$60$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A population grows from 200 to 250. Percent increase? (number only)", answer: { value: 25, tolerance: 0 }, hint: "$\\tfrac{50}{200}$.", explanation: "$25\\%$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "An item is $50\\%$ off. You pay what fraction of the original price?", options: ["half", "all of it", "a quarter", "three-quarters"], answer: 0, hint: "$100\\% - 50\\%$.", explanation: "You pay $50\\%$ = half." },
    ],
  },
];
