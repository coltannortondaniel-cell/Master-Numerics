import type { LessonSeed } from "../types.js";

/**
 * The Stock Exchange (grades 8–9): statistics and probability — reading the
 * story inside numbers. Measures of center, spread and variability, and the
 * basics of probability. Original content; NUMERIC/MCQ-led with a SYMBOLIC
 * touch.
 */
export const stockExchangeLessons: LessonSeed[] = [
  // ───────────────────────── 1. Mean, Median & Mode ─────────────────────────
  {
    slug: "mean-median-mode",
    title: "Mean, Median & Mode",
    tagline: "Three ways to find the center",
    estMinutes: 13,
    xpReward: 140,
    difficulty: 3,
    sections: [
      { kind: "HERO", content: { scene: "city", headline: "The Typical Value", sub: "When one number must summarize many, statistics offers three different 'centers' — and they don't always agree." } },
      { kind: "CONTEXT", title: "Reading the ticker", content: { markdown: "A trader stares at a column of daily prices. What's the *typical* value? There isn't a single answer — there are three useful ones: the **mean**, the **median**, and the **mode**. Each tells a slightly different story, and knowing which to trust is the heart of statistics." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "Three **measures of center** summarize a data set:\n\n- **Mean** (average): add all values, divide by how many. $\\bar x = \\dfrac{\\sum x}{n}$.\n- **Median**: the middle value when the data is sorted (the average of the two middle values if $n$ is even).\n- **Mode**: the value that appears most often (there may be none or several).\n\nFor $2, 3, 3, 6, 11$:\n\n- Mean $= \\dfrac{2+3+3+6+11}{5} = \\dfrac{25}{5} = 5$.\n- Median $= 3$ (the middle of five sorted values).\n- Mode $= 3$ (it appears twice).\n\nThe **mean** is pulled by extreme values (**outliers**); the **median** resists them. A single huge salary drags the mean up while the median barely moves — which is why incomes are usually reported as medians." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Mean", problem: "Find the mean of $4, 8, 9, 3$.", steps: ["Sum: $4+8+9+3 = 24$.", "Divide by 4."], answer: "Mean $= 6$." },
        { title: "Median", problem: "Find the median of $7, 2, 9, 4, 5$.", steps: ["Sort: $2, 4, 5, 7, 9$.", "Middle of five is the 3rd."], answer: "Median $= 5$." },
        { title: "Outlier effect", problem: "Why is median often preferred for incomes?", steps: ["A few huge incomes inflate the mean.", "The median ignores their size."], answer: "The median resists outliers." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Mean adds and divides; median is the middle." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Sort first for the median." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: which center to use", content: { markdown: "Choose by the data's shape. For roughly **symmetric** data with no outliers, the **mean** is ideal — it uses every value. For **skewed** data or data with outliers (incomes, house prices), the **median** is more honest. The **mode** is the only center that works for **categorical** data — you can't average 'favourite colour', but you can name the most common one." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Mean = sum ÷ count.", "Median = middle value of sorted data.", "Mode = most frequent value.", "The mean is sensitive to outliers; the median resists them.", "Use the mode for categorical data."], formulas: [{ label: "Mean", tex: "\\bar x = \\dfrac{\\sum x}{n}" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "Find the mean of $4, 8, 9, 3$.", answer: { value: 6, tolerance: 0 }, explanation: "$24/4 = 6$." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "Find the median of $7, 2, 9, 4, 5$.", answer: { value: 5, tolerance: 0 }, explanation: "Sorted: $2,4,5,7,9$ — middle is 5." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "Find the mode of $2, 3, 3, 6, 11$.", answer: { value: 3, tolerance: 0 }, explanation: "3 appears most often." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Find the mean of $10, 20, 30$.", answer: { value: 20, tolerance: 0 }, hint: "Sum ÷ 3.", explanation: "$60/3 = 20$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Find the median of $3, 1, 4, 1, 5, 9$ (six values).", answer: { value: 3.5, tolerance: 0 }, hint: "Average the two middle values.", explanation: "Sorted: $1,1,3,4,5,9$; middle two are 3 and 4, mean $3.5$." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "Adding one very large outlier changes the mean more than the median.", answer: true, hint: "Which one uses every value's size?", explanation: "The mean is pulled toward outliers; the median is not." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "For 'favourite colour' data, the only sensible center is the:", options: ["mean", "median", "mode", "range"], answer: 2, hint: "You can't average colours.", explanation: "The mode (most common) is the only center for categorical data." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "The mean of four numbers is $10$. What is their sum?", answer: { value: 40, tolerance: 0 }, hint: "Sum = mean × count.", explanation: "$10 \\times 4 = 40$." },
    ],
  },

  // ───────────────────────── 2. Spread & Variability ─────────────────────────
  {
    slug: "spread-and-variability",
    title: "Spread & Variability",
    tagline: "How spread out is the data?",
    estMinutes: 13,
    xpReward: 140,
    difficulty: 3,
    sections: [
      { kind: "HERO", content: { scene: "city", headline: "Beyond the Average", sub: "Two data sets can share a mean yet look completely different. Spread tells you how much the values scatter." } },
      { kind: "CONTEXT", title: "Risk on the trading floor", content: { markdown: "Two stocks both *average* a 5% return — but one is steady while the other swings wildly. A trader cares enormously about that difference: it's **risk**. Center alone can't capture it; you also need a measure of **spread**." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "**Spread** measures how scattered the data is.\n\n- **Range** = maximum − minimum. Simple, but only uses the two extremes.\n- **Quartiles** split sorted data into four equal parts: $Q_1$ (25%), $Q_2$ (the median), $Q_3$ (75%).\n- **Interquartile range (IQR)** = $Q_3 - Q_1$ — the spread of the middle half, which ignores outliers.\n\nFor $3, 5, 7, 9, 11$: range $= 11 - 3 = 8$.\n\nA larger spread means the data is more variable — less predictable. Two sets with the same mean can have very different spreads, so a center and a spread together give a far fuller picture than either alone." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Range", problem: "Find the range of $3, 5, 7, 9, 11$.", steps: ["Max is 11, min is 3.", "$11 - 3 = 8$."], answer: "Range $= 8$." },
        { title: "Compare spreads", problem: "Set A: $5,5,5$. Set B: $1,5,9$. Same mean — which is more spread out?", steps: ["Both have mean 5.", "A has range 0; B has range 8."], answer: "Set B is far more spread out." },
        { title: "IQR idea", problem: "Why use IQR instead of range?", steps: ["Range uses only the extremes.", "IQR uses the middle half, ignoring outliers."], answer: "IQR resists outliers." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Range is max minus min." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Find ranges and compare spreads." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: standard deviation", content: { markdown: "The most-used measure of spread is the **standard deviation** $\\sigma$ — roughly, the typical distance of a value from the mean. You compute it by averaging the squared distances from the mean (the **variance**) and taking the square root. Squaring keeps everything positive and weights big deviations more heavily. Standard deviation is the backbone of the bell curve, opinion-poll margins of error, and quality control in engineering." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Spread measures how scattered the data is.", "Range = max − min (uses only extremes).", "Quartiles split sorted data into quarters; IQR = Q₃ − Q₁.", "IQR resists outliers; range does not.", "Center + spread together describe data far better than either alone."], formulas: [{ label: "Range", tex: "\\text{range} = \\max - \\min" }, { label: "IQR", tex: "\\text{IQR} = Q_3 - Q_1" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "Find the range of $3, 5, 7, 9, 11$.", answer: { value: 8, tolerance: 0 }, explanation: "$11 - 3 = 8$." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Range is computed as:", options: ["max + min", "max − min", "mean − median", "sum ÷ count"], answer: 1, explanation: "Range = maximum − minimum." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "Two data sets with the same mean must have the same spread.", answer: false, explanation: "Same center says nothing about scatter." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Find the range of $12, 4, 20, 8$.", answer: { value: 16, tolerance: 0 }, hint: "Max minus min.", explanation: "$20 - 4 = 16$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Which measure of spread ignores outliers best?", options: ["range", "interquartile range", "maximum", "mode"], answer: 1, hint: "It uses the middle half.", explanation: "The IQR uses the middle 50%, so outliers don't affect it." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "A data set where every value is identical has a range of 0.", answer: true, hint: "Max equals min.", explanation: "No spread at all, so range $= 0$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A data set has minimum $5$ and range $30$. What is its maximum?", answer: { value: 35, tolerance: 0 }, hint: "max = min + range.", explanation: "$5 + 30 = 35$." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "Write the range of a data set in terms of its maximum $M$ and minimum $m$. (Type like `M - m`.)", answer: { expr: "M - m", vars: ["M", "m"] }, difficulty: 2, hint: "Largest minus smallest.", explanation: "Range $= M - m$." },
    ],
  },

  // ───────────────────────── 3. Probability Basics ─────────────────────────
  {
    slug: "probability-basics",
    title: "Probability Basics",
    tagline: "Measuring how likely",
    estMinutes: 14,
    xpReward: 150,
    difficulty: 3,
    sections: [
      { kind: "HERO", content: { scene: "city", headline: "From 0 to 1", sub: "Probability puts a number on chance: 0 means never, 1 means certain, and everything interesting lives in between." } },
      { kind: "CONTEXT", title: "Pricing the odds", content: { markdown: "Every bet, insurance policy, and weather forecast rests on **probability** — a precise number for how likely an event is. Get the probability right and you price risk correctly; get it wrong and you lose. The basics are simple counting, but they power a vast field." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "The **probability** of an event is a number from $0$ (impossible) to $1$ (certain). For equally likely outcomes:\n\n$$P(\\text{event}) = \\frac{\\text{favorable outcomes}}{\\text{total outcomes}}.$$\n\nExamples:\n\n- A fair coin: $P(\\text{heads}) = \\tfrac12 = 0.5$.\n- A fair die: $P(4) = \\tfrac16$; $P(\\text{even}) = \\tfrac{3}{6} = \\tfrac12$.\n\nThe **complement** rule: $P(\\text{not } A) = 1 - P(A)$. If rain is $0.3$ likely, no-rain is $0.7$.\n\nFor **independent** events (one doesn't affect the other), multiply: $P(A \\text{ and } B) = P(A)\\times P(B)$. Two heads in a row: $\\tfrac12 \\times \\tfrac12 = \\tfrac14$." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Single die", problem: "Find $P(\\text{even})$ on a fair die.", steps: ["Even outcomes: 2, 4, 6 → 3 of them.", "$3/6$."], answer: "$P = \\tfrac12 = 0.5$." },
        { title: "Complement", problem: "If $P(\\text{rain}) = 0.3$, find $P(\\text{no rain})$.", steps: ["Use $1 - P$.", "$1 - 0.3 = 0.7$."], answer: "$0.7$." },
        { title: "Two coins", problem: "Find $P(\\text{two heads})$ tossing two fair coins.", steps: ["Independent: multiply.", "$\\tfrac12 \\times \\tfrac12$."], answer: "$\\tfrac14 = 0.25$." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Favorable over total; type probabilities as decimals." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Count outcomes; use complement and multiplication where needed." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: the law of large numbers", content: { markdown: "Probability predicts the **long run**, not the next trial. A fair coin has $P(\\text{heads}) = 0.5$, but ten tosses might give seven heads. The **law of large numbers** says that as the number of trials grows, the observed fraction of heads converges to $0.5$. This is why casinos and insurers — who run millions of trials — can profit reliably from probabilities, even though any single outcome is uncertain." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Probability runs from 0 (impossible) to 1 (certain).", "Equally likely: favorable ÷ total.", "Complement: $P(\\text{not }A) = 1 - P(A)$.", "Independent events multiply: $P(A\\text{ and }B) = P(A)P(B)$.", "Probability describes the long run, not a single trial."], formulas: [{ label: "Probability", tex: "P = \\dfrac{\\text{favorable}}{\\text{total}}" }, { label: "Complement", tex: "P(\\text{not }A) = 1 - P(A)" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "A fair coin is tossed. What is $P(\\text{heads})$? (as a decimal)", answer: { value: 0.5, tolerance: 0.001 }, explanation: "1 of 2 outcomes: $0.5$." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "On a fair die, what is $P(\\text{even})$? (as a decimal)", answer: { value: 0.5, tolerance: 0.001 }, explanation: "$3/6 = 0.5$." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "A probability can never be:", options: ["0", "0.5", "1", "1.5"], answer: 3, explanation: "Probabilities lie between 0 and 1." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "If $P(\\text{rain}) = 0.3$, what is $P(\\text{no rain})$? (as a decimal)", answer: { value: 0.7, tolerance: 0.001 }, hint: "Complement: $1 - P$.", explanation: "$1 - 0.3 = 0.7$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Two fair coins are tossed. What is $P(\\text{two heads})$? (as a decimal)", answer: { value: 0.25, tolerance: 0.001 }, hint: "Multiply independent probabilities.", explanation: "$0.5 \\times 0.5 = 0.25$." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "Write the probability of 'not $A$' in terms of $P$ (where $P = P(A)$). (Type like `1 - P`.)", answer: { expr: "1 - P", vars: ["P"] }, difficulty: 3, hint: "Complement rule.", explanation: "$P(\\text{not }A) = 1 - P(A)$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A bag has 2 red and 3 blue marbles. What is $P(\\text{red})$? (as a decimal)", answer: { value: 0.4, tolerance: 0.001 }, hint: "Reds over total.", explanation: "$2/5 = 0.4$." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "Getting heads 5 times in a row makes the next toss more likely to be tails.", answer: false, hint: "Are coin tosses independent?", explanation: "Tosses are independent — the next toss is still $0.5$ (the gambler's fallacy)." },
    ],
  },
];
