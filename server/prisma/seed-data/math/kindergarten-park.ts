import type { LessonSeed } from "../types.js";

/**
 * Kindergarten Park (K–1): counting, shapes, and patterns, discovered among the
 * swings, flower beds, and footpaths of the city's first green space.
 */
export const kindergartenParkLessons: LessonSeed[] = [
  // ───────────────────────── Lesson 1: Counting to Ten ─────────────────────────
  {
    slug: "counting-to-ten",
    title: "Counting to Ten",
    tagline: "One number for every thing you see",
    estMinutes: 10,
    xpReward: 100,
    sections: [
      {
        kind: "HERO",
        content: {
          scene: "park",
          headline: "One, Two, Three…",
          sub: "You're standing at the gates of Kindergarten Park. Ducks paddle on the pond, swings sway in the breeze — and everywhere you look, there are things to count.",
        },
      },
      {
        kind: "CONTEXT",
        title: "You're standing at the park gates",
        content: {
          markdown:
            "Look around the park. Three ducks float on the pond. Five flowers grow by the bench. Two children laugh on the swings.\n\nNumbers are how we answer the question **\"how many?\"** Counting is one of the very first kinds of math a person ever learns — and it is everywhere. We count birthday candles, cookies on a plate, steps up to the slide, and friends at the table.\n\nToday you'll learn to count carefully and correctly, all the way to ten. Get this right, and every other piece of math you ever meet will stand on top of it.",
        },
      },
      {
        kind: "CONCEPT",
        title: "The big idea",
        content: {
          markdown:
            "Counting sounds easy — but there is a secret rule that makes it work. The rule is **one number for one thing**. This is called *one-to-one counting*.\n\nWhen you count the ducks, you point at **one** duck and say **\"one.\"** You point at the **next** duck and say **\"two.\"** Then **\"three.\"** Each duck gets exactly one number, and you never skip a duck or count the same duck twice.\n\nThe number words always go in the same order:\n\n**one, two, three, four, five, six, seven, eight, nine, ten.**\n\nThere is a second secret, and it is a big one. The **last number you say tells you how many there are altogether.** If you count three ducks — \"one, two, three\" — then there are **3 ducks**. That last word, *three*, is the answer to \"how many?\" Grown-ups call this idea *cardinality*, but you can just call it **the last word counts**.\n\nWe can also write each number with a special symbol called a **numeral**:\n\n- 1, 2, 3, 4, 5, 6, 7, 8, 9, 10\n\nSo \"five flowers\" can be written as **5 flowers**. The numeral 5 and the word *five* mean the very same thing.",
        },
      },
      {
        kind: "SIMULATION",
        title: "Try it: count along",
        content: {
          simId: "count-along",
          intro:
            "Tap each acorn one time to count it. Watch the number grow with every tap — and remember, the last number you say is how many there are!",
        },
      },
      {
        kind: "WORKED_EXAMPLES",
        title: "Counting together",
        content: {
          examples: [
            {
              title: "How many balloons?",
              problem: "At the party stand there are these balloons: 🎈🎈🎈🎈. How many balloons are there?",
              steps: [
                "Point at the first balloon and say \"one.\"",
                "Point at the next and say \"two,\" then \"three,\" then \"four.\"",
                "The last number you said was *four*.",
              ],
              answer: "There are 4 balloons. The last word you count is the answer.",
            },
            {
              title: "Don't count twice",
              problem: "Sam counts a row of 3 toy cars but accidentally points at the middle car two times. He says \"one, two, three, four.\" Did he get the right answer?",
              steps: [
                "There are only 3 cars, but Sam said four numbers.",
                "He broke the rule: one number for one thing.",
                "Counting the middle car twice gave a number that is too big.",
              ],
              answer: "No — there are only 3 cars. Each thing gets counted exactly once.",
            },
            {
              title: "What comes next?",
              problem: "You are counting and you just said \"six.\" What number comes next?",
              steps: [
                "The number words go in a fixed order.",
                "After six comes seven.",
              ],
              answer: "Seven comes next: …six, seven, eight…",
            },
          ],
        },
      },
      {
        kind: "VIDEOS",
        title: "Watch and count",
        content: {
          videos: [
            { youtubeId: "DR-cfDsHCGA", title: "Counting 1–10 Song" },
            { youtubeId: "bGetqbqDVaA", title: "Let's Count to 10" },
          ],
        },
      },
      {
        kind: "CONCEPT_CHECK",
        title: "Quick check",
        content: { intro: "Three quick questions — count carefully!" },
      },
      {
        kind: "PRACTICE",
        title: "Practice problems",
        content: { intro: "Show what you know. Use a finger to point and count if it helps!" },
      },
      {
        kind: "DEEPER_DIVE",
        title: "Deeper dive: counting things you can't touch",
        content: {
          markdown:
            "Counting ducks is easy because you can point at them. But you can also count things you **cannot** touch — like claps, jumps, or knocks on a door.\n\nTry it: clap your hands and count each clap. *Clap* — one. *Clap* — two. *Clap* — three. You just counted sounds! The same rule works: one number for each clap, and the last number tells you how many.\n\nThis is a big deal, because soon you'll count things like minutes, dollars, and miles — none of which you can hold in your hand.",
        },
      },
      {
        kind: "SUMMARY",
        title: "Park summary",
        content: {
          takeaways: [
            "Counting answers the question \"how many?\"",
            "Use one number for one thing — never skip and never double-count.",
            "The number words always go in the same order: one to ten.",
            "The last number you say tells you how many there are altogether.",
            "Each number has a numeral: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.",
          ],
          formulas: [],
        },
      },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "How many stars? ⭐⭐⭐⭐⭐", options: ["3", "4", "5", "6"], answer: 2, explanation: "Count them one at a time — one, two, three, four, five. There are 5 stars." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "When you count, the last number you say tells how many there are.", answer: true, explanation: "Yes! If you count to four, there are 4 things. The last word is the answer." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "You count \"…seven, eight…\" What number comes next?", options: ["six", "nine", "ten", "five"], answer: 1, explanation: "The order is seven, eight, nine, ten. After eight comes nine." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "How many apples? 🍎🍎🍎. Type the number.", answer: { value: 3, tolerance: 0 }, hint: "Point and count: one, two, three.", explanation: "There are 3 apples." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Which row has 6 dots?", options: ["• • • •", "• • • • •", "• • • • • •", "• • •"], answer: 2, hint: "Count the dots in each row.", explanation: "The third row has six dots: 1, 2, 3, 4, 5, 6." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "It is okay to count the same toy two times when finding how many.", answer: false, hint: "Remember the one-to-one rule.", explanation: "No — each thing gets exactly one number, or your count will be too big." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Clap three times, then two more. How many claps in all? Type the number.", answer: { value: 5, tolerance: 0 }, hint: "Keep counting past three: four, five.", explanation: "Three claps and two more makes 5 claps." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "What number comes right after nine?", options: ["eight", "ten", "eleven", "seven"], answer: 1, hint: "You're almost at the end of the count.", explanation: "After nine comes ten — the top of today's count." },
    ],
  },

  // ───────────────────────── Lesson 2: Shapes All Around ─────────────────────────
  {
    slug: "shapes-all-around",
    title: "Shapes All Around",
    tagline: "Circles, squares, and triangles hiding in the park",
    estMinutes: 11,
    xpReward: 100,
    sections: [
      {
        kind: "HERO",
        content: {
          scene: "park",
          headline: "A Park Full of Shapes",
          sub: "The pond is a circle. The picnic blanket is a square. The flag on the hill is a triangle. Once you spot shapes, you'll see them everywhere.",
        },
      },
      {
        kind: "CONTEXT",
        title: "You're standing on the picnic lawn",
        content: {
          markdown:
            "Spread out your picnic blanket and look at its edges. Four straight sides, four corners — that's a **square**. Glance at the round pond: no corners at all, just one smooth curve — a **circle**. Up on the hill, a flag makes a **triangle** with three sides.\n\nShapes are the building blocks of everything we draw and build. Knowing their names and what makes each one special is the start of **geometry** — the math of shapes and space. And it all begins right here in the park.",
        },
      },
      {
        kind: "CONCEPT",
        title: "Meet the shapes",
        content: {
          markdown:
            "We tell shapes apart by counting two things: their **sides** (the straight edges) and their **corners** (where two sides meet, also called *vertices*).\n\n- **Circle** — perfectly round. It has **0 sides** and **0 corners**, just one smooth curve. Think of a wheel, a coin, or the Sun.\n- **Triangle** — **3 sides** and **3 corners**. *Tri* means three! Think of a slice of pizza or a party hat.\n- **Square** — **4 sides** and **4 corners**, and all four sides are the **same length**. Think of a cracker or a window pane.\n- **Rectangle** — **4 sides** and **4 corners**, but the sides come in **two long and two short**. A door and a phone are rectangles.\n\nHere's a clever idea: a **square is a special rectangle** where every side happens to be equal. So all squares are rectangles, but not all rectangles are squares!\n\nShapes can be **big or small, and turned any way**, and they are still the same shape. A triangle balanced on its point is still a triangle. Turning a shape never changes what it is — only its sides and corners decide its name.",
        },
      },
      {
        kind: "SIMULATION",
        title: "Try it: shape sorter",
        content: {
          simId: "shape-sorter",
          intro:
            "Drag each shape into the right basket. Count the sides and corners if you're not sure — a triangle always has three!",
        },
      },
      {
        kind: "WORKED_EXAMPLES",
        title: "Spotting shapes",
        content: {
          examples: [
            {
              title: "Count the sides",
              problem: "A road sign has 3 straight sides and 3 corners. What shape is it?",
              steps: [
                "Count the sides: 3.",
                "A shape with three sides is a triangle (*tri* = three).",
              ],
              answer: "It is a triangle.",
            },
            {
              title: "Square or rectangle?",
              problem: "A window has 4 corners. Two sides are long and two sides are short. Is it a square or a rectangle?",
              steps: [
                "Both squares and rectangles have 4 sides and 4 corners.",
                "A square needs all four sides equal.",
                "This window has long and short sides, so they are not all equal.",
              ],
              answer: "It is a rectangle (a square would have all sides the same length).",
            },
            {
              title: "The turned triangle",
              problem: "Mia draws a triangle, then turns her paper upside down. Is it still a triangle?",
              steps: [
                "Turning a shape does not add or remove sides.",
                "It still has 3 sides and 3 corners.",
              ],
              answer: "Yes — it is still a triangle, just pointing a different way.",
            },
          ],
        },
      },
      {
        kind: "VIDEOS",
        title: "Watch and spot",
        content: {
          videos: [
            { youtubeId: "OEbRDtCAFdU", title: "The Shapes Song" },
            { youtubeId: "beTDrEDqV_w", title: "Learn 2D Shapes" },
          ],
        },
      },
      {
        kind: "CONCEPT_CHECK",
        title: "Quick check",
        content: { intro: "Count those sides and corners!" },
      },
      {
        kind: "PRACTICE",
        title: "Practice problems",
        content: { intro: "Find the shapes hiding in the questions below." },
      },
      {
        kind: "DEEPER_DIVE",
        title: "Deeper dive: shapes that build other shapes",
        content: {
          markdown:
            "Shapes love to team up. Put two triangles together along their long sides and you can make a **square** or a **rectangle**! Put a triangle on top of a square and you've drawn a little **house**.\n\nBuilders and artists use this trick all the time. Bridges are full of triangles because triangles are very strong and don't wobble. Next time you see a climbing frame at the park, look for the triangles holding it steady.",
        },
      },
      {
        kind: "SUMMARY",
        title: "Park summary",
        content: {
          takeaways: [
            "We name shapes by their number of sides and corners.",
            "Circle: 0 sides, 0 corners — perfectly round.",
            "Triangle: 3 sides, 3 corners.",
            "Square: 4 equal sides and 4 corners; a rectangle has 2 long and 2 short sides.",
            "Turning or resizing a shape never changes what it is.",
          ],
          formulas: [],
        },
      },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "How many sides does a triangle have?", options: ["2", "3", "4", "5"], answer: 1, explanation: "A triangle has 3 sides. *Tri* means three!" },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "A circle has 4 corners.", answer: false, explanation: "A circle has no corners and no straight sides — it is perfectly round." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Which shape has 4 sides that are all the same length?", options: ["Triangle", "Circle", "Square", "Rectangle"], answer: 2, explanation: "A square has 4 equal sides. A rectangle has long and short sides." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A slice of pizza is shaped most like which shape?", options: ["Circle", "Triangle", "Square", "Rectangle"], answer: 1, hint: "Count the points and straight edges.", explanation: "A pizza slice has three sides and a point — a triangle." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "How many corners does a square have? Type the number.", answer: { value: 4, tolerance: 0 }, hint: "Look at each place two sides meet.", explanation: "A square has 4 corners (vertices)." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "If you turn a triangle upside down, it becomes a square.", answer: false, hint: "Does turning change the number of sides?", explanation: "Turning never changes a shape. An upside-down triangle is still a triangle." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A door is tall with two long sides and two short sides. What shape is it?", options: ["Square", "Rectangle", "Circle", "Triangle"], answer: 1, hint: "Are all four sides the same length?", explanation: "Long and short sides means it's a rectangle, not a square." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Which shape has no straight sides at all?", options: ["Triangle", "Rectangle", "Circle", "Square"], answer: 2, hint: "Which one is perfectly round?", explanation: "A circle is one smooth curve with no straight sides." },
    ],
  },

  // ───────────────────────── Lesson 3: Finding Patterns ─────────────────────────
  {
    slug: "finding-patterns",
    title: "Finding Patterns",
    tagline: "What comes next on the garden path?",
    estMinutes: 11,
    xpReward: 100,
    sections: [
      {
        kind: "HERO",
        content: {
          scene: "park",
          headline: "What Comes Next?",
          sub: "Red tulip, yellow tulip, red tulip, yellow tulip… The flower beds of the park are full of patterns waiting to be cracked.",
        },
      },
      {
        kind: "CONTEXT",
        title: "You're standing by the flower beds",
        content: {
          markdown:
            "Walk along the garden path. The gardener planted the tulips in a special order: **red, yellow, red, yellow, red, yellow**. Can you guess what color comes next?\n\nThat repeating order is called a **pattern**. Patterns are everywhere — in the stripes on a bee, the days of the week, the tiles on a floor, and the beat of a song.\n\nFinding patterns is one of the most powerful things a mathematician does. When you spot a pattern, you can **predict what comes next** — even far into the future. That's a kind of magic you'll use for the rest of your life in math.",
        },
      },
      {
        kind: "CONCEPT",
        title: "How patterns work",
        content: {
          markdown:
            "A **pattern** is something that **repeats in the same order again and again**. The part that repeats is called the **unit** — the little chunk that keeps coming back.\n\nMathematicians give patterns nicknames using letters. Each new thing gets a letter:\n\n- **A B A B** — like *red, yellow, red, yellow*. The unit is \"A B\" and it repeats.\n- **A A B A A B** — like *clap, clap, stomp, clap, clap, stomp*. The unit is \"A A B.\"\n- **A B C A B C** — like *red, yellow, blue, red, yellow, blue*. The unit is \"A B C.\"\n\nTo figure out **what comes next**, do three things:\n\n1. **Find the unit** — the part that repeats.\n2. **Check where you are** in the unit.\n3. **Say the next piece** of the unit.\n\nFor *red, yellow, red, yellow, red, ___* the unit is \"red, yellow.\" We just said red, so next comes **yellow**.\n\nPatterns don't have to be colors. They can be **shapes** (circle, square, circle, square), **sounds** (loud, soft, loud, soft), **movements** (jump, spin, jump, spin), or **numbers** (1, 2, 1, 2). The idea is always the same: find the repeating unit, and you can predict forever.",
        },
      },
      {
        kind: "SIMULATION",
        title: "Try it: pattern maker",
        content: {
          simId: "pattern-maker",
          intro:
            "A pattern is marching across the path with one piece missing. Pick the shape that finishes the unit — find the repeat and you'll know what comes next!",
        },
      },
      {
        kind: "WORKED_EXAMPLES",
        title: "Cracking patterns",
        content: {
          examples: [
            {
              title: "Color pattern",
              problem: "🔴🔵🔴🔵🔴 ___ — what color comes next?",
              steps: [
                "The unit that repeats is red, blue.",
                "We just said red, so we are halfway through the unit.",
                "The next piece of the unit is blue.",
              ],
              answer: "Blue (🔵). The pattern is red, blue, repeating.",
            },
            {
              title: "A longer unit",
              problem: "👏👏👣👏👏👣👏 ___ — what comes next: clap or stomp?",
              steps: [
                "The repeating unit is clap, clap, stomp (A A B).",
                "We just did clap, clap… so we are two-thirds through the unit.",
                "The next piece is the stomp.",
              ],
              answer: "A stomp (👣). The unit clap-clap-stomp starts over.",
            },
            {
              title: "Is it a pattern?",
              problem: "Leo lines up blocks: red, blue, green, yellow, orange. Is this a repeating pattern?",
              steps: [
                "Look for a unit that repeats.",
                "Every block is a different color — nothing repeats.",
                "Without a repeat, there is no pattern to predict.",
              ],
              answer: "No — it's just different colors in a row. A pattern must repeat.",
            },
          ],
        },
      },
      {
        kind: "VIDEOS",
        title: "Watch and predict",
        content: {
          videos: [
            { youtubeId: "F8exnFv4Qp8", title: "Patterns for Kids" },
          ],
        },
      },
      {
        kind: "CONCEPT_CHECK",
        title: "Quick check",
        content: { intro: "Find the repeat, then predict!" },
      },
      {
        kind: "PRACTICE",
        title: "Practice problems",
        content: { intro: "What comes next? Hunt for the repeating unit." },
      },
      {
        kind: "DEEPER_DIVE",
        title: "Deeper dive: growing patterns",
        content: {
          markdown:
            "Most park patterns repeat, but some patterns **grow**. Look at a staircase: 1 step, then 2 steps, then 3 steps, then 4. Each time, the pattern adds **one more**.\n\nGrowing patterns don't just repeat — they change by the same amount each time. *1, 2, 3, 4…* grows by one. *2, 4, 6, 8…* grows by two. Spotting how much a pattern grows by is a sneak peek at adding and even multiplying, which you'll explore as you walk deeper into the City of Numbers.",
        },
      },
      {
        kind: "SUMMARY",
        title: "Park summary",
        content: {
          takeaways: [
            "A pattern repeats in the same order again and again.",
            "The unit is the chunk that keeps repeating (like A B or A A B).",
            "To predict, find the unit, see where you are, and say the next piece.",
            "Patterns can be colors, shapes, sounds, movements, or numbers.",
            "If nothing repeats, it is not a pattern.",
          ],
          formulas: [],
        },
      },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "🔺⬛🔺⬛🔺 ___ — what comes next?", options: ["🔺 triangle", "⬛ square", "🔵 circle", "nothing"], answer: 1, explanation: "The unit is triangle, square. We just had a triangle, so a square comes next." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "A pattern must repeat in the same order.", answer: true, explanation: "Yes — repeating in the same order is exactly what makes something a pattern." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "What is the repeating unit in: red, red, blue, red, red, blue?", options: ["red", "red, blue", "red, red, blue", "blue, blue"], answer: 2, explanation: "The chunk that repeats is red, red, blue (an A A B pattern)." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "🍎🍌🍎🍌🍎🍌 ___ — what comes next?", options: ["🍎 apple", "🍌 banana", "🍇 grapes", "nothing"], answer: 1, hint: "The unit is apple, banana.", explanation: "After apple comes banana — the unit apple-banana repeats." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Which of these IS a repeating pattern?", options: ["1, 2, 3, 4, 5", "red, blue, green, yellow", "A, B, A, B, A, B", "cat, dog, fish"], answer: 2, hint: "Look for a chunk that comes back.", explanation: "A, B, A, B repeats the unit A B. The others don't repeat." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "In the pattern clap, clap, stomp, clap, clap, stomp — the unit is clap, clap, stomp.", answer: true, hint: "What part keeps coming back?", explanation: "Correct — clap, clap, stomp is the repeating unit (A A B)." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "⬛⬛🔺⬛⬛🔺⬛⬛ ___ — what comes next?", options: ["⬛ square", "🔺 triangle", "🔵 circle", "nothing"], answer: 1, hint: "The unit is square, square, triangle.", explanation: "We just had two squares, so the triangle finishes the unit." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A staircase goes 1 step, 2 steps, 3 steps, 4 steps. How does this pattern change each time?", options: ["It repeats", "It adds one more", "It stays the same", "It takes one away"], answer: 1, hint: "Compare each number to the one before.", explanation: "It grows by adding one more step each time — a growing pattern." },
    ],
  },

  // ───────────────────── Lesson 4: More, Less, and Equal ─────────────────────
  {
    slug: "more-less-equal",
    title: "More, Less, and Equal",
    tagline: "Who has more at the snack stand?",
    estMinutes: 10,
    xpReward: 100,
    sections: [
      {
        kind: "HERO",
        content: {
          scene: "park",
          headline: "More, Less, or the Same?",
          sub: "Two friends compare their handfuls of acorns at the snack stand. Who has more? Comparing is its own kind of counting magic.",
        },
      },
      {
        kind: "CONTEXT",
        title: "You're standing at the snack stand",
        content: {
          markdown:
            "Two squirrels-in-training, Pip and Bo, empty their pockets at the snack stand. Pip has 5 acorns. Bo has 3 acorns. Who has **more**?\n\nEvery day we compare amounts. Who has more stickers? Are there enough cups for everyone? Is this pile bigger than that one? Learning to say **more**, **less**, and **equal** turns counting into comparing — and comparing is the doorway to adding, subtracting, and one day even algebra.",
        },
      },
      {
        kind: "CONCEPT",
        title: "Comparing amounts",
        content: {
          markdown:
            "There are three ways two amounts can compare:\n\n- **More** (greater) — one group has a bigger amount.\n- **Less** (fewer) — one group has a smaller amount.\n- **Equal** (the same) — both groups have exactly the same amount.\n\nHow do we tell? Two ways:\n\n**1. Match them up.** Line up Pip's acorns next to Bo's, one for one. If Pip still has some left over after every one of Bo's is matched, then Pip has **more**. If they match perfectly with none left over, they are **equal**.\n\n**2. Count and compare.** Count each group. The bigger number is more. Pip has 5, Bo has 3. Since **5 is more than 3**, Pip has more — and Bo has **less**.\n\nIn counting order — 1, 2, 3, 4, 5, 6… — numbers that come **later** are **bigger**. So 5 comes after 3, which means 5 is more than 3. The number 8 is more than 6 because 8 comes later when you count.\n\nMathematicians even have tiny symbols for this, which you'll meet soon:\n\n- the same as: **=** (5 = 5)\n- more than: **>** (5 > 3)\n- less than: **<** (3 < 5)\n\nFor now, the words *more*, *less*, and *equal* are your trusty tools.",
        },
      },
      {
        kind: "SIMULATION",
        title: "Try it: the balance",
        content: {
          simId: "compare-balance",
          intro:
            "Drop acorns onto each side of the balance scale. The heavier side tips down — that's the side with more. Make the two sides equal to balance it!",
        },
      },
      {
        kind: "WORKED_EXAMPLES",
        title: "Comparing together",
        content: {
          examples: [
            {
              title: "Who has more?",
              problem: "Ada has 6 crayons. Ben has 4 crayons. Who has more?",
              steps: [
                "Count each: Ada has 6, Ben has 4.",
                "In counting order, 6 comes after 4.",
                "Later means bigger, so 6 is more than 4.",
              ],
              answer: "Ada has more crayons (6 is more than 4).",
            },
            {
              title: "Just enough?",
              problem: "There are 4 children and 4 cups. Is that more cups, fewer cups, or equal?",
              steps: [
                "Match one cup to each child.",
                "Every child gets a cup and no cups are left over.",
                "Same amount on both sides.",
              ],
              answer: "Equal — 4 cups for 4 children, exactly the same.",
            },
            {
              title: "Which is less?",
              problem: "A red box holds 7 marbles. A blue box holds 9 marbles. Which box has fewer marbles?",
              steps: [
                "Compare 7 and 9.",
                "7 comes before 9 when you count.",
                "Earlier means smaller, so 7 is less than 9.",
              ],
              answer: "The red box has fewer (7 is less than 9).",
            },
          ],
        },
      },
      {
        kind: "VIDEOS",
        title: "Watch and compare",
        content: {
          videos: [
            { youtubeId: "MmYv6KkPa18", title: "Greater Than, Less Than" },
          ],
        },
      },
      {
        kind: "CONCEPT_CHECK",
        title: "Quick check",
        content: { intro: "More, less, or equal? You decide." },
      },
      {
        kind: "PRACTICE",
        title: "Practice problems",
        content: { intro: "Compare the amounts in each question." },
      },
      {
        kind: "DEEPER_DIVE",
        title: "Deeper dive: the hungry alligator",
        content: {
          markdown:
            "Here's a trick mathematicians teach to remember the symbols **>** and **<**. Pretend the symbol is a hungry alligator's mouth — and the alligator always wants to eat the **bigger** pile!\n\nSo the open mouth points at the larger number: **5 > 3** (the mouth opens toward the 5), and **3 < 5** (the mouth opens toward the 5 again). The pointy end always points at the smaller number. You'll use these alligator jaws all the way into algebra.",
        },
      },
      {
        kind: "SUMMARY",
        title: "Park summary",
        content: {
          takeaways: [
            "Amounts can be more, less, or equal.",
            "Match one-to-one, or count and compare the numbers.",
            "Numbers later in the count are bigger; earlier numbers are smaller.",
            "Equal means exactly the same amount on both sides.",
            "Later you'll write these as =, >, and < symbols.",
          ],
          formulas: [],
        },
      },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Which is more: 7 or 4?", options: ["4", "7", "They are equal"], answer: 1, explanation: "7 comes after 4 when you count, so 7 is more." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "If two groups match one-to-one with none left over, they are equal.", answer: true, explanation: "Exactly — a perfect match with nothing left over means the amounts are equal." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Which is less: 9 or 6?", options: ["9", "6", "They are equal"], answer: 1, explanation: "6 comes before 9 when counting, so 6 is less." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Maya has 8 shells. Tom has 5 shells. Who has more?", options: ["Maya", "Tom", "Equal"], answer: 0, hint: "Which number is later in the count, 8 or 5?", explanation: "8 is more than 5, so Maya has more." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "There are 5 plates and 5 sandwiches. How do they compare?", options: ["More plates", "More sandwiches", "Equal"], answer: 2, hint: "Match each plate to a sandwich.", explanation: "5 and 5 are the same — they are equal." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "The number 3 is more than the number 6.", answer: false, hint: "Which comes later when you count?", explanation: "No — 3 comes before 6, so 3 is less than 6." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A hungry alligator mouth eats the bigger number: 8 ___ 2. Which way does it open?", options: ["8 > 2", "8 < 2"], answer: 0, hint: "The mouth opens toward the bigger pile.", explanation: "8 is bigger, so the mouth opens toward it: 8 > 2." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Pip has 4 acorns. To have an EQUAL amount, how many acorns does Bo need? Type the number.", answer: { value: 4, tolerance: 0 }, hint: "Equal means the same amount.", explanation: "Equal means the same, so Bo also needs 4 acorns." },
    ],
  },
];
