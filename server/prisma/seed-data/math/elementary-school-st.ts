import type { LessonSeed } from "../types.js";

/**
 * Elementary School St. (grades 1–3): the foundations of arithmetic — addition,
 * subtraction, place value, and two-digit regrouping — discovered in the
 * classrooms, lunch lines, and chalkboards of the city's schoolhouse row.
 * Clean numerals and an interactive number line; no decorative emoji.
 */
export const elementarySchoolStLessons: LessonSeed[] = [
  // ───────────────────────── 1. Addition — Putting Together ─────────────────────────
  {
    slug: "addition-putting-together",
    title: "Addition — Putting Together",
    tagline: "Combining amounts into a total",
    estMinutes: 12,
    xpReward: 110,
    sections: [
      { kind: "HERO", content: { scene: "school", headline: "Putting Things Together", sub: "Three pencils on your desk, four more from a friend — how many now? Addition is the math of joining amounts into one total." } },
      { kind: "CONTEXT", title: "At the classroom door", content: { markdown: "School has begun on Elementary School St. The morning bell rings and the lunch monitor needs a count: 5 children are already at the table, and 3 more walk in. **How many in all?**\n\nWhenever we **join** two amounts and ask \"how many altogether?\", we are doing **addition** — the first of the four great operations of arithmetic. Get addition solid here, and every later idea — subtraction, multiplication, even algebra — will build on it." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "**Addition** combines two (or more) amounts into a single total. We write it with the **plus sign** $+$, and the answer is called the **sum**.\n\n$$5 + 3 = 8$$\n\nRead it as *\"five plus three equals eight.\"* The **equals sign** $=$ means *\"is the same amount as\"* — the left side and the right side are worth exactly the same.\n\nThree things worth knowing:\n\n- **Counting on.** To find $5 + 3$, start at 5 and count three more: 6, 7, 8. The last number is the sum.\n- **Order doesn't matter.** $5 + 3$ and $3 + 5$ both equal 8. Swapping the order never changes the sum. (Mathematicians call this the *commutative property*.)\n- **Adding zero changes nothing.** $7 + 0 = 7$. Joining \"nothing\" leaves the amount the same.\n\nYou can picture addition as **jumps to the right on a number line**: start at the first number, then hop forward by the second." } },
      { kind: "SIMULATION", title: "Try it: the number line", content: { simId: "number-line", intro: "Set the start number, choose Add, and pick an amount. Take the jumps one at a time — each hop moves one unit to the right, and the spot you land on is the sum." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Count on", problem: "Find $5 + 3$.", steps: ["Start at 5.", "Count on three more: 6, 7, 8.", "The last number reached is the sum."], answer: "$5 + 3 = 8$." },
        { title: "Order doesn't matter", problem: "Is $2 + 6$ the same as $6 + 2$?", steps: ["$2 + 6 = 8$ (start at 2, count on 6).", "$6 + 2 = 8$ (start at 6, count on 2).", "Both give 8."], answer: "Yes — $2 + 6 = 6 + 2 = 8$." },
        { title: "Adding zero", problem: "Find $7 + 0$.", steps: ["Adding zero means joining nothing.", "The amount is unchanged."], answer: "$7 + 0 = 7$." },
      ] } },
      { kind: "VIDEOS", title: "Watch", content: { videos: [{ youtubeId: "Abdf0Hyb3R8", title: "Basic Addition" }] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Sums, the equals sign, and order." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Add carefully — count on if it helps." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: making ten", content: { markdown: "Mathematicians have a favourite trick for adding quickly: **make a ten**. Tens are easy to work with, so we look for pairs that add to 10 — like $7 + 3$ or $6 + 4$.\n\nTo add $8 + 5$, borrow 2 from the 5 to turn the 8 into a 10: $8 + 2 = 10$, with 3 left over, so $10 + 3 = 13$. Spotting \"friends of ten\" makes mental addition fast, and it's the same regrouping idea you'll use to add big numbers later on this street." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Addition joins amounts into a total called the sum.", "The plus sign is $+$; the equals sign means \"the same amount as\".", "Order doesn't matter: $a + b = b + a$.", "Adding zero leaves a number unchanged.", "On a number line, adding jumps to the right."], formulas: [{ label: "Order property", tex: "a + b = b + a" }, { label: "Adding zero", tex: "a + 0 = a" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "The answer to an addition problem is called the:", options: ["sum", "difference", "quotient", "remainder"], answer: 0, explanation: "The result of adding is the sum." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "$3 + 4 = \\,$?", answer: { value: 7, tolerance: 0 }, explanation: "Start at 3, count on four: 4, 5, 6, 7." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "Changing the order of the numbers changes the sum: $2 + 5$ gives a different answer than $5 + 2$.", answer: false, explanation: "Order doesn't matter — both equal 7." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "$6 + 2 = \\,$?", answer: { value: 8, tolerance: 0 }, hint: "Count on from 6.", explanation: "$6 + 2 = 8$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "$7 + 3 = \\,$?", answer: { value: 10, tolerance: 0 }, hint: "These are friends of ten.", explanation: "$7 + 3 = 10$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "$9 + 0 = \\,$?", answer: { value: 9, tolerance: 0 }, hint: "Adding zero changes nothing.", explanation: "$9 + 0 = 9$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Which equals $4 + 3$?", options: ["6", "7", "8", "9"], answer: 1, hint: "Count on three from 4.", explanation: "$4 + 3 = 7$." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "$4 + 6 = 6 + 4$.", answer: true, hint: "Does order matter?", explanation: "Both equal 10 — order doesn't matter." },
    ],
  },

  // ───────────────────────── 2. Subtraction — Taking Away ─────────────────────────
  {
    slug: "subtraction-taking-away",
    title: "Subtraction — Taking Away",
    tagline: "Finding what's left, and the difference",
    estMinutes: 12,
    xpReward: 110,
    sections: [
      { kind: "HERO", content: { scene: "school", headline: "Taking Away", sub: "You had 8 crayons and lent 3 to a friend. How many are left? Subtraction is the math of taking away and comparing." } },
      { kind: "CONTEXT", title: "At the supply cupboard", content: { markdown: "The art teacher counts 9 glue sticks in the cupboard. The class uses 4. **How many are left?** And when two reading groups have 9 and 6 books, **how many more** does the bigger group have?\n\nBoth questions are answered by **subtraction** — the partner of addition. Subtraction tells us what remains after taking some away, and it tells us the gap, or *difference*, between two amounts." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "**Subtraction** takes one amount away from another, or finds the **difference** between them. We write it with the **minus sign** $-$, and the answer is called the **difference**.\n\n$$8 - 3 = 5$$\n\nRead it as *\"eight minus three equals five.\"*\n\nKey facts:\n\n- **Counting back.** To find $8 - 3$, start at 8 and count back three: 7, 6, 5. The number you land on is the difference.\n- **Order matters.** Unlike addition, $7 - 2$ is *not* the same as $2 - 7$. Subtraction is **not** commutative — you must keep the larger amount first (for now).\n- **Subtracting zero changes nothing:** $6 - 0 = 6$. And any number minus itself is zero: $6 - 6 = 0$.\n- **Subtraction undoes addition.** Since $4 + 5 = 9$, it must be that $9 - 5 = 4$. They are *inverse* operations — this is your best way to **check** a subtraction.\n\nOn a number line, subtracting is **jumps to the left**: start at the first number and hop backward by the second." } },
      { kind: "SIMULATION", title: "Try it: the number line", content: { simId: "number-line", intro: "Set the start number, choose Subtract, and pick an amount. Each jump moves one unit to the left — the spot you land on is the difference." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Count back", problem: "Find $8 - 3$.", steps: ["Start at 8.", "Count back three: 7, 6, 5.", "You land on 5."], answer: "$8 - 3 = 5$." },
        { title: "How many more?", problem: "One group has 9 books, another has 6. How many more does the larger group have?", steps: ["\"How many more\" is a difference.", "$9 - 6 = 3$."], answer: "3 more books." },
        { title: "Check by adding", problem: "You compute $9 - 5 = 4$. How can you check it?", steps: ["Subtraction undoes addition.", "Add the answer back: $4 + 5 = 9$.", "It matches the start, so the answer is right."], answer: "$4 + 5 = 9$ confirms $9 - 5 = 4$." },
      ] } },
      { kind: "VIDEOS", title: "Watch", content: { videos: [{ youtubeId: "GBowKL2gZ_w", title: "Basic Subtraction" }] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Differences and order." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Subtract carefully — count back, or check by adding." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: subtraction as a missing addend", content: { markdown: "There's a second way to think about $8 - 3$. Instead of *taking away*, ask: **\"3 plus what makes 8?\"** That hidden number is the answer — it's called the *missing addend*. Counting up from 3 to 8 (4, 5, 6, 7, 8 — that's 5 steps) gives the same 5.\n\nThis \"think-addition\" strategy is how cashiers make change and how you'll later solve equations like $3 + x = 8$. Subtraction and addition are two views of the very same relationship." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Subtraction takes away or finds the difference.", "The minus sign is $-$; the answer is the difference.", "Order matters: $a - b \\ne b - a$ in general.", "Subtracting zero changes nothing; a number minus itself is 0.", "Subtraction undoes addition — use it to check your work."], formulas: [{ label: "Inverse of addition", tex: "a + b = c \\;\\Rightarrow\\; c - b = a" }, { label: "Subtracting zero", tex: "a - 0 = a" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "The answer to a subtraction problem is called the:", options: ["sum", "difference", "product", "factor"], answer: 1, explanation: "The result of subtracting is the difference." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "$9 - 4 = \\,$?", answer: { value: 5, tolerance: 0 }, explanation: "Count back from 9: 8, 7, 6, 5." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "Order matters in subtraction: $7 - 2$ is not the same as $2 - 7$.", answer: true, explanation: "Subtraction is not commutative — order changes the answer." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "$10 - 4 = \\,$?", answer: { value: 6, tolerance: 0 }, hint: "Count back four from 10.", explanation: "$10 - 4 = 6$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "$8 - 8 = \\,$?", answer: { value: 0, tolerance: 0 }, hint: "A number minus itself.", explanation: "Any number minus itself is 0." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "$5 - 0 = \\,$?", answer: { value: 5, tolerance: 0 }, hint: "Subtracting zero changes nothing.", explanation: "$5 - 0 = 5$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Tom had 9 apples and ate 3. How many are left?", options: ["5", "6", "7", "12"], answer: 1, hint: "Take 3 away from 9.", explanation: "$9 - 3 = 6$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Subtraction undoes addition. Since $4 + 5 = 9$, what is $9 - 5$?", answer: { value: 4, tolerance: 0 }, hint: "Use the inverse relationship.", explanation: "$9 - 5 = 4$, the number that was added." },
    ],
  },

  // ───────────────────────── 3. Place Value — Tens and Ones ─────────────────────────
  {
    slug: "place-value-tens-and-ones",
    title: "Place Value — Tens and Ones",
    tagline: "Why the spot a digit sits in matters",
    estMinutes: 13,
    xpReward: 120,
    sections: [
      { kind: "HERO", content: { scene: "school", headline: "Tens and Ones", sub: "The number 34 isn't a 3 and a 4 — it's 3 tens and 4 ones. The place a digit sits in decides its value." } },
      { kind: "CONTEXT", title: "Counting the whole class", content: { markdown: "There are too many pencils to count one by one, so the teacher bundles them into **groups of ten** with a rubber band, then counts the loose ones left over. Four bundles and seven singles: **47 pencils**.\n\nThis bundling is the secret behind every number we write. Our number system is built on **tens**, and the *position* of each digit tells you how many ones, tens, hundreds, and so on it stands for. This idea — **place value** — is what lets ten little symbols (0–9) write any number at all." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "In a two-digit number, there are two **places**, and each has a value ten times the one to its right:\n\n- the **ones place** (right) — worth 1 each\n- the **tens place** (left) — worth 10 each\n\nTake the number **34**:\n\n$$34 = \\underbrace{3}_{\\text{tens}}\\,\\underbrace{4}_{\\text{ones}} = 3 \\times 10 + 4 \\times 1 = 30 + 4.$$\n\nThe **3** is not just \"three\" — because it sits in the tens place, it is worth **30**. The **4** in the ones place is worth **4**. Writing a number as $30 + 4$ is called **expanded form**.\n\nSo the same digit means different amounts depending on *where* it sits. In **34** the 3 means 30; in **43** the 3 means just 3. Place is everything.\n\nThe big rule that ties it together: **ten ones make one ten.** Whenever you gather ten loose ones, you bundle them into a single ten and move one place to the left — exactly what the rubber band did to the pencils." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Value of a digit", problem: "In the number 52, what is the value of the digit 5?", steps: ["The 5 sits in the tens place.", "Tens are worth 10 each: $5 \\times 10 = 50$."], answer: "The 5 is worth 50." },
        { title: "Build a number", problem: "What number is 6 tens and 7 ones?", steps: ["6 tens $= 60$.", "7 ones $= 7$.", "$60 + 7 = 67$."], answer: "67." },
        { title: "Expanded form", problem: "Write 48 in expanded form.", steps: ["The 4 is in the tens place: $40$.", "The 8 is in the ones place: $8$.", "So $48 = 40 + 8$."], answer: "$48 = 40 + 8$." },
      ] } },
      { kind: "VIDEOS", title: "Watch", content: { videos: [{ youtubeId: "omkDLmfvetk", title: "Place Value — Tens and Ones" }] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Places and the value of each digit." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Read each digit by the place it sits in." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: why base ten?", content: { markdown: "Our whole system is called **base ten** because we bundle in groups of ten — most likely because humans have ten fingers. Each place to the left is worth ten times more: ones, tens, **hundreds** ($10\\times 10$), **thousands** ($10\\times 100$), and on forever.\n\nIt didn't have to be ten. Computers use **base two** (binary), bundling in groups of two with only the digits 0 and 1. The Babylonians used base sixty — which is why an hour still has 60 minutes! But the *idea* is always the same: the position of a digit decides its value." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["A digit's value depends on its place.", "Two-digit numbers have a tens place and a ones place.", "$34 = 3 \\text{ tens} + 4 \\text{ ones} = 30 + 4$ (expanded form).", "Ten ones bundle into one ten — the heart of base ten.", "The same digit means different amounts in different places."], formulas: [{ label: "Place value", tex: "\\overline{ab} = a \\times 10 + b" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "In the number 34, the digit 3 is in the:", options: ["ones place", "tens place", "hundreds place", "no place"], answer: 1, explanation: "The left digit of a two-digit number is in the tens place." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "What is the value of the digit 7 in the number 76? Type the number.", answer: { value: 70, tolerance: 0 }, explanation: "The 7 is in the tens place, so it is worth 70." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "The number 45 is the same as 4 tens and 5 ones.", answer: true, explanation: "$4 \\times 10 + 5 = 45$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "How many tens are in the number 60? Type the number.", answer: { value: 6, tolerance: 0 }, hint: "60 = ? tens.", explanation: "$60 = 6$ tens." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "What number is 5 tens and 3 ones?", answer: { value: 53, tolerance: 0 }, hint: "$50 + 3$.", explanation: "5 tens and 3 ones make 53." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Which shows 28 in expanded form?", options: ["$2 + 8$", "$20 + 8$", "$200 + 8$", "$20 + 80$"], answer: 1, hint: "The 2 is in the tens place.", explanation: "$28 = 20 + 8$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "In the number 91, what is the value of the digit 9? Type the number.", answer: { value: 90, tolerance: 0 }, hint: "Which place is the 9 in?", explanation: "The 9 is in the tens place: 90." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "What number is 8 tens and 0 ones?", answer: { value: 80, tolerance: 0 }, hint: "$80 + 0$.", explanation: "8 tens and 0 ones make 80." },
    ],
  },

  // ───────────────────── 4. Adding Two-Digit Numbers (Regrouping) ─────────────────────
  {
    slug: "adding-two-digit-numbers",
    title: "Adding Two-Digit Numbers",
    tagline: "Add the ones, add the tens, carry when needed",
    estMinutes: 15,
    xpReward: 130,
    sections: [
      { kind: "HERO", content: { scene: "school", headline: "Carrying the Ten", sub: "27 books on one shelf, 15 on another. Add the ones, add the tens — and when ten ones pile up, carry them over." } },
      { kind: "CONTEXT", title: "Stacking the library carts", content: { markdown: "The school library has 27 books on one cart and 15 on another. To shelve them, the librarian needs the total. With numbers this size, counting on your fingers is slow — so we use place value to add **column by column**, a method that scales up to any size of number." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "To add two-digit numbers, line them up by place — **ones under ones, tens under tens** — and add each column, starting from the **ones** on the right.\n\n**When a column doesn't reach ten** (no regrouping), just add each column:\n\n$$23 + 14: \\quad 3 + 4 = 7 \\ (\\text{ones}), \\quad 2 + 1 = 3 \\ (\\text{tens}) \\;\\Rightarrow\\; 37.$$\n\n**When the ones reach ten or more**, you must **regroup** (also called **carrying**). Ten ones bundle into one ten, which you carry into the tens column:\n\n$$27 + 15: \\quad 7 + 5 = 12.$$\n\nThat's 1 ten and 2 ones — write the **2** in the ones place and **carry the 1** ten on top of the tens column. Then add the tens, *including the carry*:\n\n$$2 + 1 + 1 = 4 \\;\\Rightarrow\\; 42.$$\n\nThe rule in one line: **add each column right to left, and whenever a column hits 10 or more, carry the extra ten to the next column.** It's the same \"ten ones make one ten\" bundling from place value — now put to work." } },
      { kind: "SIMULATION", title: "Try it: the number line", content: { simId: "number-line", intro: "Try smaller sums on the number line to build intuition: set a start, choose Add, and jump. The column method is just a faster way to do these same jumps for bigger numbers." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "No regrouping", problem: "Add $23 + 14$.", steps: ["Ones: $3 + 4 = 7$.", "Tens: $2 + 1 = 3$.", "Combine: 3 tens and 7 ones."], answer: "$23 + 14 = 37$." },
        { title: "With a carry", problem: "Add $38 + 7$.", steps: ["Ones: $8 + 7 = 15$ — write 5, carry 1 ten.", "Tens: $3 + 1\\,(\\text{carry}) = 4$.", "Combine: 4 tens and 5 ones."], answer: "$38 + 7 = 45$." },
        { title: "Both columns", problem: "Add $27 + 15$.", steps: ["Ones: $7 + 5 = 12$ — write 2, carry 1.", "Tens: $2 + 1 + 1\\,(\\text{carry}) = 4$.", "Combine: 4 tens and 2 ones."], answer: "$27 + 15 = 42$." },
      ] } },
      { kind: "VIDEOS", title: "Watch", content: { videos: [{ youtubeId: "Wm0zq-NqEFs", title: "Adding 2-Digit Numbers with Regrouping" }] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Add by columns; carry when the ones reach ten." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Add the ones first; carry a ten whenever the ones reach 10 or more." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: why carrying works", content: { markdown: "Carrying isn't a magic trick — it's place value in action. When $7 + 5 = 12$, that 12 really means **1 ten and 2 ones**. The 2 ones stay in the ones column, and the 1 ten *belongs* in the tens column, so we move it there. We're just keeping each bundle in its proper place.\n\nThis same column method, with carrying, works for hundreds, thousands, and beyond — add each column, and carry any full ten to the left. Master it here and you can add numbers of any size." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Line up ones under ones, tens under tens.", "Add columns from the right (ones first).", "If a column reaches 10 or more, write the ones digit and carry the ten.", "Add the carry into the next column.", "Carrying is just \"ten ones make one ten\" again."], formulas: [{ label: "Regroup the ones", tex: "10 \\text{ ones} = 1 \\text{ ten}" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "$23 + 14 = \\,$?", answer: { value: 37, tolerance: 0 }, explanation: "Ones $3+4=7$, tens $2+1=3$: 37." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "When the ones add up to 10 or more, you carry a ten into the tens place.", answer: true, explanation: "Ten ones regroup into one ten, carried left." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "$38 + 7 = \\,$?", answer: { value: 45, tolerance: 0 }, explanation: "$8+7=15$: write 5, carry 1; $3+1=4$: 45." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "$27 + 15 = \\,$?", answer: { value: 42, tolerance: 0 }, hint: "$7+5=12$, carry 1.", explanation: "Ones 12 (write 2, carry 1), tens $2+1+1=4$: 42." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "$46 + 28 = \\,$?", answer: { value: 74, tolerance: 0 }, hint: "$6+8=14$, carry 1.", explanation: "Ones 14 (write 4, carry 1), tens $4+2+1=7$: 74." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "$50 + 35 = \\,$?", answer: { value: 85, tolerance: 0 }, hint: "No carry needed.", explanation: "Ones $0+5=5$, tens $5+3=8$: 85." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "$19 + 19 = \\,$?", answer: { value: 38, tolerance: 0 }, hint: "$9+9=18$, carry 1.", explanation: "Ones 18 (write 8, carry 1), tens $1+1+1=3$: 38." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "In $26 + 17$, the ones are $6 + 7$. What do you write and what do you carry?", options: ["write 3, carry 1", "write 1, carry 3", "write 13, carry 0", "write 3, carry 0"], answer: 0, hint: "$6 + 7 = 13 = $ 1 ten and 3 ones.", explanation: "$6+7=13$: write the 3, carry the 1 ten." },
    ],
  },

  // ───────────────────── 5. Subtracting Two-Digit Numbers (Borrowing) ─────────────────────
  {
    slug: "subtracting-two-digit-numbers",
    title: "Subtracting Two-Digit Numbers",
    tagline: "Subtract by columns, and borrow when needed",
    estMinutes: 15,
    xpReward: 130,
    sections: [
      { kind: "HERO", content: { scene: "school", headline: "Borrowing a Ten", sub: "42 students, 17 go home early. Subtract the ones, subtract the tens — and when the ones run short, borrow a ten." } },
      { kind: "CONTEXT", title: "Counting who's left", content: { markdown: "There are 42 students on the field trip and 17 head back early. **How many remain?** Just like addition, we subtract two-digit numbers **column by column** using place value — but now the tricky part is what to do when the top ones digit is too small to subtract from." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "Line the numbers up by place and subtract each column, starting from the **ones** on the right.\n\n**When the top digit is big enough** (no borrowing):\n\n$$47 - 23: \\quad 7 - 3 = 4 \\ (\\text{ones}), \\quad 4 - 2 = 2 \\ (\\text{tens}) \\;\\Rightarrow\\; 24.$$\n\n**When the top ones digit is too small**, you must **regroup** (also called **borrowing**). Take one ten from the tens column and turn it into ten ones:\n\n$$42 - 17: \\quad \\text{ones } 2 - 7 \\text{ won't work.}$$\n\nBorrow 1 ten from the 4 tens (leaving 3 tens) and add it to the 2 ones, making **12 ones**:\n\n$$12 - 7 = 5 \\ (\\text{ones}), \\quad 3 - 1 = 2 \\ (\\text{tens}) \\;\\Rightarrow\\; 25.$$\n\nThe rule in one line: **subtract each column right to left; if the top digit is smaller than the bottom, borrow a ten from the next column.** Borrowing is \"one ten = ten ones\" run in reverse of carrying.\n\n**Always check by adding back:** if $42 - 17 = 25$, then $25 + 17$ should give $42$. It does — so the answer is right." } },
      { kind: "SIMULATION", title: "Try it: the number line", content: { simId: "number-line", intro: "Practice smaller differences on the number line: set a start, choose Subtract, and jump left. The column method does the same thing faster for larger numbers." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "No borrowing", problem: "Subtract $47 - 23$.", steps: ["Ones: $7 - 3 = 4$.", "Tens: $4 - 2 = 2$.", "Combine: 2 tens and 4 ones."], answer: "$47 - 23 = 24$." },
        { title: "With borrowing", problem: "Subtract $52 - 18$.", steps: ["Ones: $2 - 8$ won't work — borrow a ten.", "Now $12 - 8 = 4$; tens drop from 5 to 4.", "Tens: $4 - 1 = 3$."], answer: "$52 - 18 = 34$." },
        { title: "Check by adding", problem: "Subtract $42 - 17$ and check.", steps: ["Borrow: $12 - 7 = 5$ (ones), $3 - 1 = 2$ (tens) → 25.", "Check: $25 + 17 = 42$.", "It matches the start."], answer: "$42 - 17 = 25$ (checked: $25 + 17 = 42$)." },
      ] } },
      { kind: "VIDEOS", title: "Watch", content: { videos: [{ youtubeId: "Y6M89-6106I", title: "Subtracting 2-Digit Numbers with Regrouping" }] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Subtract by columns; borrow when the top is too small." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Subtract the ones first; borrow a ten when the top ones digit is too small." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: why borrowing works", content: { markdown: "Borrowing keeps the number's total value the same — it just shifts a bundle. When we change 42 into \"3 tens and 12 ones,\" that's still $30 + 12 = 42$; we only **renamed** it so the ones column has enough to subtract from.\n\nThis is exactly the reverse of carrying: carrying bundles ten ones *up* into a ten, while borrowing breaks a ten *down* into ten ones. The same column method, with borrowing, works for hundreds and thousands — and checking by adding back always tells you if you got it right." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Line up by place; subtract from the right (ones first).", "If the top ones digit is smaller than the bottom, borrow a ten.", "Borrowing renames one ten as ten ones — value is unchanged.", "Borrowing is carrying in reverse.", "Check by adding the answer back to the number subtracted."], formulas: [{ label: "Regroup a ten", tex: "1 \\text{ ten} = 10 \\text{ ones}" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "$47 - 23 = \\,$?", answer: { value: 24, tolerance: 0 }, explanation: "Ones $7-3=4$, tens $4-2=2$: 24." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "If the top ones digit is smaller than the bottom ones digit, you borrow a ten.", answer: true, explanation: "You regroup one ten into ten ones to subtract." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "$52 - 18 = \\,$?", answer: { value: 34, tolerance: 0 }, explanation: "Borrow: $12-8=4$, $4-1=3$: 34." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "$42 - 17 = \\,$?", answer: { value: 25, tolerance: 0 }, hint: "Borrow: $12 - 7$.", explanation: "Borrow: $12-7=5$, $3-1=2$: 25." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "$60 - 24 = \\,$?", answer: { value: 36, tolerance: 0 }, hint: "Borrow: $10 - 4$.", explanation: "Borrow: $10-4=6$, $5-2=3$: 36." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "$85 - 30 = \\,$?", answer: { value: 55, tolerance: 0 }, hint: "No borrow needed.", explanation: "Ones $5-0=5$, tens $8-3=5$: 55." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Check by adding: if $53 - 19 = 34$, what is $34 + 19$?", answer: { value: 53, tolerance: 0 }, hint: "Adding back undoes the subtraction.", explanation: "$34 + 19 = 53$, confirming the difference." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "To compute $34 - 16$, the ones column needs borrowing because:", options: ["4 is less than 6", "3 is less than 1", "4 is more than 6", "they are equal"], answer: 0, hint: "Compare the ones digits.", explanation: "Top ones digit 4 is smaller than 6, so borrow a ten." },
    ],
  },
];
