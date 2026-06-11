import type { LessonSeed } from "./types.js";

export const moonLessons: LessonSeed[] = [
  // ───────────────────────── Lesson 1: What Is Gravity? ─────────────────────────
  {
    slug: "what-is-gravity",
    title: "What Is Gravity?",
    tagline: "The invisible pull that holds the universe together",
    estMinutes: 12,
    xpReward: 100,
    sections: [
      {
        kind: "HERO",
        content: {
          scene: "moon",
          headline: "The Invisible Pull",
          sub: "You just landed on the Moon. Take one hop… and you float six times higher than you ever could on Earth. Why? Let's find out.",
        },
      },
      {
        kind: "CONTEXT",
        title: "Why does this matter?",
        content: {
          markdown:
            "Drop your pencil. Where did it go? Down. It always goes down. It never floats up to the ceiling, and it never drifts sideways out the window.\n\nThat is not an accident. Something is pulling on that pencil — and on you, your dog, the ocean, and even the Moon itself. We call that pull **gravity**. Gravity is why rain falls, why slides are fun, why basketballs come back down after a shot, and why you don't float out of bed at night.\n\nAstronauts who walked on the Moon felt gravity too — just much less of it. They could leap like superheroes and carry heavy packs like they were pillows. Understanding why is your first step on this journey through the cosmos.",
        },
      },
      {
        kind: "CONCEPT",
        title: "The big idea",
        content: {
          markdown:
            "**Gravity is a pull between things.** Everything that is made of stuff — scientists say everything with *mass* — pulls on everything else. You pull on your chair. Your chair pulls on you. But those pulls are far too tiny to feel.\n\nFor gravity to feel strong, something needs to be **huge**. A planet, for example.\n\n**Earth is enormous**, so its pull is strong. Earth's gravity grabs everything near it and pulls it toward the ground — toward the center of the Earth. That pull on *you* has a name you already know: your **weight**. When you stand on a scale, you are measuring how hard Earth is pulling you down.\n\nNow here is the Moon trick. **The Moon is much smaller than Earth** — about 80 Moons would fit inside one Earth. Smaller means a weaker pull. The Moon's gravity is only about **one sixth** as strong as Earth's. So on the Moon:\n\n- You would weigh about 6 times less.\n- You could jump about 6 times higher.\n- A dropped feather would still fall — just slowly and gently.\n\nNotice that last one. The Moon **does** have gravity. Things don't float away on the Moon; they fall, softly. (Astronauts float on the space station for a different reason — they are actually *falling around* the Earth, which we will explore in a later world.)\n\nOne more job gravity does, and it is a big one: **gravity is the invisible string that keeps the Moon circling the Earth**, and keeps the Earth circling the Sun. Without gravity, the Moon would fly off in a straight line into the dark, and so would we.\n\nSo remember the three rules of gravity:\n\n1. Gravity **pulls**, it never pushes.\n2. **Bigger things pull harder.**\n3. Gravity pulls everything **toward the center** of the big thing — that's what \"down\" means.",
        },
      },
      {
        kind: "SIMULATION",
        title: "Try it: drop lab",
        content: {
          simId: "gravity-drop",
          intro:
            "Drop a ball on Earth, then on the Moon. Watch the timer — the Moon's weaker pull means a slower, floatier fall. Then invent your own planet with the gravity slider.",
        },
      },
      {
        kind: "WORKED_EXAMPLES",
        title: "Worked examples",
        content: {
          examples: [
            {
              title: "Which way will it fall?",
              problem: "Maya holds an apple over her head in Australia and lets go. People say Australia is on the 'bottom' of the Earth. Does the apple fall toward the sky or toward the ground?",
              steps: [
                "Rule 3 says gravity pulls toward the **center of the Earth**.",
                "In Australia, the ground is the direction toward Earth's center — just like everywhere else.",
                "'Down' simply means 'toward the center,' no matter where you stand on the planet.",
              ],
              answer: "The apple falls to the ground. Down is toward Earth's center everywhere — nobody falls off the bottom of the world.",
            },
            {
              title: "The Moon backpack",
              problem: "Leo's space backpack feels as heavy as 6 bricks on Earth. About how heavy would it feel on the Moon?",
              steps: [
                "The Moon's pull is about one sixth of Earth's pull.",
                "So everything feels about 6 times lighter there.",
                "6 bricks of heaviness ÷ 6 = 1 brick of heaviness.",
              ],
              answer: "It would feel like about 1 brick. Same backpack, same stuff inside — just a gentler pull.",
            },
            {
              title: "The invisible string",
              problem: "The Moon zooms through space, yet it never flies away from Earth. What holds it?",
              steps: [
                "Gravity is a pull between *any* two things with mass.",
                "Earth is huge, so its pull reaches all the way out to the Moon.",
                "That pull constantly bends the Moon's path into a circle around us, like a ball swung on a string.",
              ],
              answer: "Earth's gravity. It acts like an invisible string keeping the Moon in orbit.",
            },
          ],
        },
      },
      {
        kind: "VIDEOS",
        title: "Watch and wonder",
        content: {
          videos: [
            { youtubeId: "suQDwZcnJdg", title: "Gravity | The Dr. Binocs Show" },
            { youtubeId: "ljRlB6TuMOU", title: "Defining Gravity | Crash Course Kids" },
            { youtubeId: "dh5wGSLw1p4", title: "Why Do Things Float in Space? | SciShow Kids" },
          ],
        },
      },
      {
        kind: "CONCEPT_CHECK",
        title: "Quick check",
        content: { intro: "Three quick questions — answer right away and see how you did." },
      },
      {
        kind: "PRACTICE",
        title: "Practice problems",
        content: { intro: "Show what you know! Use the hints if you get stuck — then submit to see your score." },
      },
      {
        kind: "DEEPER_DIVE",
        title: "Deeper dive: the feather and the hammer",
        content: {
          markdown:
            "About 400 years ago, the scientist **Galileo** claimed something strange: without air pushing back, a heavy thing and a light thing should fall **together** — gravity speeds them up equally.\n\nOn Earth, air ruins the test. A feather flutters because air catches it like a tiny parachute.\n\nBut the Moon has **no air at all**. In 1971, astronaut **David Scott** stood on the Moon holding a hammer in one hand and a falcon feather in the other. He let go of both at the same time… and they hit the dust **at exactly the same moment**. Galileo was right — it just took 400 years and a trip to the Moon to film the proof.",
        },
      },
      {
        kind: "SUMMARY",
        title: "Mission summary",
        content: {
          takeaways: [
            "Gravity is a pull between all things that have mass.",
            "Bigger objects pull harder — Earth's pull is strong, the Moon's is about 1/6 as strong.",
            "Your weight is how hard a planet pulls on you, so you'd weigh less on the Moon.",
            "Gravity pulls toward the center of a planet — that is what 'down' means.",
            "Gravity keeps the Moon orbiting Earth like an invisible string.",
          ],
          formulas: [{ label: "Moon weight", tex: "\\text{weight on Moon} \\approx \\tfrac{1}{6} \\times \\text{weight on Earth}" }],
        },
      },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "Gravity can push things away from a planet.", answer: false, explanation: "Gravity only pulls. It always draws things together, never pushes them apart." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "What makes a ball fall to the ground when you drop it?", options: ["Wind", "Earth's gravity pulling it", "The ball pushing itself", "Magnets"], answer: 1, explanation: "Earth's gravity pulls the ball toward the center of the Earth — that's why dropped things go down." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "The Moon has no gravity at all.", answer: false, explanation: "The Moon does have gravity — about one sixth of Earth's. Things still fall there, just more gently." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Why is the Moon's gravity weaker than Earth's?", options: ["The Moon is colder", "The Moon is much smaller than Earth", "The Moon is farther from the Sun", "The Moon spins slower"], answer: 1, hint: "Think about rule 2: what makes a pull strong?", explanation: "Smaller mass means a weaker pull. The Moon is much smaller than Earth, so its gravity is weaker." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A robot weighs as much as 12 bricks on Earth. About how heavy would it feel on the Moon?", options: ["12 bricks", "6 bricks", "2 bricks", "0 bricks — it would float"], answer: 2, hint: "Divide by 6.", explanation: "Moon gravity is about 1/6 of Earth's: 12 ÷ 6 = 2 bricks of heaviness." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "If you dropped a ball on the Moon, it would float away into space.", answer: false, hint: "Remember the feather and hammer.", explanation: "It would fall to the ground — slowly and softly, because the Moon's gravity is gentle but real." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "What keeps the Moon traveling around the Earth instead of flying off into space?", options: ["A giant invisible wall", "Earth's gravity", "The Sun's heat", "Wind from Earth"], answer: 1, hint: "It works like an invisible string.", explanation: "Earth's gravity constantly pulls the Moon, bending its path into an orbit around us." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Kiri stands at the South Pole and drops a snowball. Which way does it fall?", options: ["Up into the sky", "Sideways", "Toward the ground", "It floats"], answer: 2, hint: "Where does gravity always pull?", explanation: "Gravity pulls toward Earth's center, so the snowball falls to the ground — 'down' works the same everywhere on Earth." },
    ],
  },

  // ───────────────────── Lesson 2: Why Does the Moon Glow? ─────────────────────
  {
    slug: "why-does-the-moon-glow",
    title: "Why Does the Moon Glow?",
    tagline: "The biggest mirror in the night sky",
    estMinutes: 10,
    xpReward: 100,
    sections: [
      {
        kind: "HERO",
        content: {
          scene: "moon",
          headline: "Borrowed Light",
          sub: "The Moon shines bright enough to read by — yet it makes no light of its own. So where does moonlight really come from?",
        },
      },
      {
        kind: "CONTEXT",
        title: "Why does this matter?",
        content: {
          markdown:
            "For thousands of years, people told stories about the glowing Moon. Sailors steered ships by it. Farmers harvested under it. You have probably seen it shine through your window.\n\nBut here's the mystery: the Moon is just a giant ball of **rock and dust**. Rocks don't glow. Pick one up tonight — does it shine? No. So why does that rock in the sky blaze silver-bright?\n\nThe answer teaches us something powerful: some things in the sky **make** light, and other things only **bounce** it. Telling those apart is one of an astronomer's most important skills.",
        },
      },
      {
        kind: "CONCEPT",
        title: "The big idea",
        content: {
          markdown:
            "There are two kinds of bright things:\n\n1. **Light makers**, like the Sun, fires, and lamps. They create their own light.\n2. **Light bouncers**, like mirrors, the white pages of a book, and… the Moon. They only reflect light that hits them.\n\n**The Moon is a light bouncer.** Moonlight is really **sunlight** that traveled to the Moon, bounced off its dusty gray surface, and then traveled on to your eyes. Every moonbeam is secondhand sunshine.\n\nYou can prove the idea with a flashlight and a gray ball in a dark room. The ball is invisible in the dark — until your flashlight hits it. Then it 'glows.' Turn the flashlight off and the glow is gone instantly. The Moon works exactly the same way, with the Sun as the flashlight.\n\nHere's something surprising: the Moon is actually a **bad** mirror. Its dusty surface is dark gray, like an old road. It bounces back only a little of the sunlight that hits it. So why does it look dazzling? Two reasons:\n\n- The Sun is **incredibly** bright, so even a small bounce is a lot of light.\n- We usually see the Moon against the **black night sky**, where even a little light looks brilliant — the way one candle looks bright in a dark room but invisible at noon.\n\nThat also solves another puzzle: you can sometimes see the **Moon in the daytime**! It's up there bouncing sunlight just the same, but against a bright blue sky it looks pale and ghostly instead of brilliant.\n\nAnd because moonlight is bounced sunlight, only the half of the Moon **facing the Sun** is ever lit. The other half is in darkness. Hold that thought — it is the secret behind the Moon's changing shapes, which is your very next lesson.",
        },
      },
      {
        kind: "SIMULATION",
        title: "Try it: light the Moon",
        content: {
          simId: "moon-phases",
          intro:
            "Drag the Moon around its orbit. Notice the bright half of the Moon always faces the Sun — the Moon never makes light, it only catches it.",
        },
      },
      {
        kind: "WORKED_EXAMPLES",
        title: "Worked examples",
        content: {
          examples: [
            {
              title: "Flashlight test",
              problem: "Sam shines a flashlight on a gray ball in a dark room, then turns the flashlight off. What happens to the ball's glow, and what does this tell us about the Moon?",
              steps: [
                "With the flashlight on, light bounces off the ball into Sam's eyes — the ball looks bright.",
                "With the flashlight off, there is no light to bounce. The ball goes dark instantly.",
                "The ball never made light; it only reflected it — exactly like the Moon and the Sun.",
              ],
              answer: "The glow disappears the instant the light is off. The Moon, like the ball, only shines while sunlight is hitting it.",
            },
            {
              title: "Moon vs. stars",
              problem: "Stars make their own light, but the Moon only bounces light. So why does the Moon look so much brighter than the stars?",
              steps: [
                "Brightness depends on how much light reaches your eyes — and distance matters enormously.",
                "Stars are unimaginably far away; their light spreads out across trillions of kilometers.",
                "The Moon is our next-door neighbor, so its bounced sunlight arrives strong.",
              ],
              answer: "Because the Moon is so much closer. A nearby lamp outshines a distant bonfire.",
            },
            {
              title: "The daytime Moon",
              problem: "Ana sees the Moon at 3 in the afternoon and says, 'The Moon broke! It's only supposed to come out at night.' Is the Moon broken?",
              steps: [
                "The Moon is in the sky day and night — it orbits Earth on its own schedule, not ours.",
                "It bounces sunlight in the daytime just as it does at night.",
                "Against the bright blue sky, the Moon simply looks faint instead of brilliant.",
              ],
              answer: "Nothing is broken. The daytime Moon is normal — it just looks pale next to the bright sky.",
            },
          ],
        },
      },
      {
        kind: "VIDEOS",
        title: "Watch and wonder",
        content: {
          videos: [
            { youtubeId: "kFR7HLRMx_o", title: "Phases of the Moon | Learn Bright" },
            { youtubeId: "vwfbdPyzgDo", title: "Over (to) The Moon | Crash Course Kids" },
          ],
        },
      },
      {
        kind: "CONCEPT_CHECK",
        title: "Quick check",
        content: { intro: "Let's see if the idea stuck." },
      },
      {
        kind: "PRACTICE",
        title: "Practice problems",
        content: { intro: "Time to shine — bounce these questions back correctly!" },
      },
      {
        kind: "DEEPER_DIVE",
        title: "Deeper dive: how good a mirror is the Moon?",
        content: {
          markdown:
            "Scientists measure how well something bounces light with a number called **albedo**. A perfect mirror has an albedo of 1 (it bounces everything). Fresh snow is about 0.8.\n\nThe Moon? Just **0.12** — it reflects only about 12% of the sunlight that hits it, about the same as worn asphalt on a road. If you could hold a piece of the Moon next to a piece of charcoal, they wouldn't look wildly different!\n\nThe full Moon only *seems* dazzling because the Sun delivers a staggering amount of light, and because our eyes compare it to the blackness of space around it. Astronomy is full of these tricks of comparison — keep your eyes sharp.",
        },
      },
      {
        kind: "SUMMARY",
        title: "Mission summary",
        content: {
          takeaways: [
            "The Moon makes no light of its own — it is rock and dust.",
            "Moonlight is sunlight bouncing off the Moon's surface to your eyes.",
            "Only the half of the Moon facing the Sun is ever lit.",
            "The Moon looks bright because the Sun is powerful and the night sky is dark.",
            "The daytime Moon is normal — it just looks pale against a bright sky.",
          ],
          formulas: [],
        },
      },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Where does moonlight come from?", options: ["The Moon makes it", "Sunlight bouncing off the Moon", "City lights from Earth", "Stars shining on the Moon"], answer: 1, explanation: "Moonlight is reflected sunlight — the Moon is a light bouncer, not a light maker." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "The Moon is made of glowing fire, like the Sun.", answer: false, explanation: "The Moon is a ball of rock and dust. Only the Sun in our solar system makes its own light by burning (fusing) fuel." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "You can sometimes see the Moon during the day.", answer: true, explanation: "The Moon is often up in the daytime — it just looks pale against the bright sky." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Which of these makes its own light?", options: ["A mirror", "The Moon", "The Sun", "A white wall"], answer: 2, hint: "Light makers vs. light bouncers.", explanation: "The Sun is a light maker. Mirrors, walls, and the Moon only bounce light that hits them." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "If the Sun suddenly stopped shining, what would happen to moonlight?", options: ["Nothing — the Moon glows on its own", "Moonlight would disappear", "The Moon would get brighter", "The Moon would turn blue"], answer: 1, hint: "What is moonlight made of?", explanation: "No sunlight means nothing to bounce — the Moon would go dark, like the gray ball when the flashlight turns off." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "The half of the Moon facing away from the Sun is dark.", answer: true, hint: "Think about the flashlight and the ball.", explanation: "Only the side facing the Sun catches light. The far side at that moment is in shadow." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "The Moon's surface is actually dark gray, like a road. Why does it still look bright at night?", options: ["It is covered in tiny mirrors", "The Sun is very bright and the night sky is very dark", "It is hot", "Earth lights it up"], answer: 1, hint: "Think of one candle in a dark room.", explanation: "Even a weak bounce of the Sun's enormous light looks brilliant against the black sky." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Why does the Moon look brighter than the stars, even though stars make their own light?", options: ["The Moon is much closer to us", "The Moon is bigger than stars", "Stars are turned off at night", "The Moon is hotter"], answer: 0, hint: "A nearby lamp vs. a distant bonfire.", explanation: "Distance! Stars are unimaginably far away, while the Moon is our close neighbor, so its bounced light reaches us strong." },
    ],
  },

  // ──────────────────────── Lesson 3: Phases of the Moon ────────────────────────
  {
    slug: "phases-of-the-moon",
    title: "Phases of the Moon",
    tagline: "Why the Moon changes its face every night",
    estMinutes: 14,
    xpReward: 100,
    sections: [
      {
        kind: "HERO",
        content: {
          scene: "moon",
          headline: "The Moon's Many Faces",
          sub: "Crescent, half, full, gone — the Moon seems to change shape every night. But the Moon never changes at all. So what's really going on?",
        },
      },
      {
        kind: "CONTEXT",
        title: "Why does this matter?",
        content: {
          markdown:
            "Look at the Moon every night for a month and draw what you see. Your drawings will show a thin smile, then a half circle, then a glowing full disc, then back to a sliver — and then it starts over.\n\nLong before clocks and calendars, people used these shapes to **count time**. The word *month* even comes from *Moon*! Farmers planted by it, sailors planned voyages by it, and many holidays around the world are still set by the Moon's shape today.\n\nBut the Moon is a solid ball of rock. Rock doesn't melt away and regrow each month. The changing shapes — called **phases** — are one of the sky's greatest illusions, and you're about to see through it.",
        },
      },
      {
        kind: "CONCEPT",
        title: "The big idea",
        content: {
          markdown:
            "Three facts you already know combine into the answer:\n\n1. The Moon makes no light — it only **bounces sunlight** (last lesson!).\n2. So **one half** of the Moon is always lit — the half facing the Sun.\n3. The Moon **travels around Earth** about once a month.\n\nNow put it together. As the Moon circles us, we see its sunlit half **from different angles**. Sometimes the bright half faces us straight on. Sometimes it faces away. Usually we see part bright and part dark.\n\n**The phases, in order:**\n\n- **New Moon** — the Moon sits between Earth and the Sun. Its lit side faces *away* from us, so we see almost nothing. The Moon seems to vanish.\n- **Waxing Crescent** — a thin sliver of the lit side peeks at us. *Waxing* means **growing**.\n- **First Quarter** — we see half of the lit side: a bright half circle. (It's called a quarter because the Moon is one quarter of the way around its trip.)\n- **Waxing Gibbous** — more than half bright, still growing. *Gibbous* means bulging.\n- **Full Moon** — Earth is between the Sun and Moon, and the entire sunlit face beams at us. The whole disc glows.\n- **Waning Gibbous** — now shrinking. *Waning* means **shrinking**.\n- **Last Quarter** — half lit again, the *other* half this time.\n- **Waning Crescent** — a final thin sliver… and then New Moon again.\n\nThe full cycle takes about **29.5 days** — roughly a month.\n\nThe most important thing to remember: **the Moon itself never changes shape.** It is always a complete ball, always half lit by the Sun. The only thing that changes is **how much of that lit half we can see from Earth**. The phases are a matter of *viewpoint*, not of the Moon growing and shrinking.",
        },
      },
      {
        kind: "SIMULATION",
        title: "Try it: phase machine",
        content: {
          simId: "moon-phases",
          intro:
            "Drag the Moon around its orbit and watch two views at once: from space (the lit half always faces the Sun) and from Earth (the phase you would see in the sky). Find all eight phases!",
        },
      },
      {
        kind: "WORKED_EXAMPLES",
        title: "Worked examples",
        content: {
          examples: [
            {
              title: "Name that phase",
              problem: "The Moon sits exactly between the Sun and the Earth. What phase do people on Earth see?",
              steps: [
                "The lit half of the Moon always faces the Sun.",
                "With the Moon between us and the Sun, its lit half points *away* from Earth.",
                "We are looking at the dark half — so we see (almost) nothing.",
              ],
              answer: "New Moon. The Moon is there, but its bright side is facing away from us.",
            },
            {
              title: "Predict the future",
              problem: "Tonight is a Full Moon. About how long until the next Full Moon?",
              steps: [
                "The full cycle of phases takes about 29.5 days.",
                "Each phase returns once per cycle.",
                "So Full Moon to Full Moon is one whole cycle.",
              ],
              answer: "About 29 and a half days — roughly one month.",
            },
            {
              title: "Growing or shrinking?",
              problem: "Min watches the Moon for three nights. The bright part gets bigger each night. Is the Moon waxing or waning, and is a Full Moon coming soon or just passed?",
              steps: [
                "Waxing means the lit part we see is growing; waning means shrinking.",
                "Min sees it growing, so the Moon is waxing.",
                "Waxing phases lead up to the Full Moon.",
              ],
              answer: "The Moon is waxing, and a Full Moon is on its way.",
            },
          ],
        },
      },
      {
        kind: "VIDEOS",
        title: "Watch and wonder",
        content: {
          videos: [
            { youtubeId: "AQ5vty8f9Xc", title: "Moon Phases | Crash Course Astronomy" },
            { youtubeId: "2Xz3KPG5s7U", title: "Moon Phases for Kids | Twinkl" },
          ],
        },
      },
      {
        kind: "CONCEPT_CHECK",
        title: "Quick check",
        content: { intro: "Quick — before the Moon changes again!" },
      },
      {
        kind: "PRACTICE",
        title: "Practice problems",
        content: { intro: "Eight phases, five problems. You've got this." },
      },
      {
        kind: "DEEPER_DIVE",
        title: "Deeper dive: phases are not eclipses",
        content: {
          markdown:
            "A common mix-up: many people think the dark part of the Moon is **Earth's shadow**. It isn't! During phases, Earth's shadow is nowhere near the Moon. The dark part is simply the Moon's own **night side** — the half facing away from the Sun.\n\nEarth's shadow does occasionally sweep across the Moon, but that is a special event called a **lunar eclipse**. It can only happen at a Full Moon, when Sun, Earth, and Moon line up almost perfectly — and the Moon often turns an eerie copper-red as Earth's atmosphere bends red sunlight into the shadow. Eclipses are rare; phases happen every single night. Different machinery entirely!",
        },
      },
      {
        kind: "SUMMARY",
        title: "Mission summary",
        content: {
          takeaways: [
            "Half of the Moon is always lit by the Sun — phases are about which part of that lit half we see.",
            "The Moon orbits Earth about every 29.5 days, giving one full cycle of phases.",
            "Order: New → Crescent → First Quarter → Gibbous → Full → Gibbous → Last Quarter → Crescent → New.",
            "Waxing = growing toward Full. Waning = shrinking toward New.",
            "The dark part of the Moon is its own night side — not Earth's shadow.",
          ],
          formulas: [{ label: "Phase cycle", tex: "\\text{New Moon} \\to \\text{Full Moon} \\to \\text{New Moon} \\approx 29.5 \\text{ days}" }],
        },
      },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "The Moon actually changes shape, growing and shrinking each month.", answer: false, explanation: "The Moon is always a full ball. We just see different amounts of its sunlit half as it orbits Earth." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "During which phase do we see the entire sunlit side of the Moon?", options: ["New Moon", "First Quarter", "Full Moon", "Crescent"], answer: 2, explanation: "At Full Moon, Earth is between the Sun and Moon, so the whole lit face points at us." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "What does 'waxing' mean?", options: ["The bright part is shrinking", "The bright part is growing", "The Moon is melting", "The Moon is full"], answer: 1, explanation: "Waxing means growing — the lit part we see gets bigger each night until Full Moon." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "At New Moon, why can't we see the Moon?", options: ["It moves behind the Sun and hides", "Its sunlit side faces away from Earth", "Earth's shadow covers it", "It turns invisible"], answer: 1, hint: "Where is the lit half pointing?", explanation: "The Moon is between us and the Sun, so its bright half faces the Sun — and its dark half faces us." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Put these in order, starting from New Moon: Full, Crescent, Quarter.", options: ["Full → Quarter → Crescent", "Crescent → Quarter → Full", "Quarter → Full → Crescent", "Crescent → Full → Quarter"], answer: 1, hint: "The light grows a little at a time.", explanation: "After New Moon the light grows: a thin Crescent first, then a Quarter (half lit), then the Full Moon." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "About how many days does one full cycle of Moon phases take? (Give your answer in days.)", answer: { value: 29.5, tolerance: 1.5 }, hint: "It's close to one month.", explanation: "The cycle from New Moon to New Moon takes about 29.5 days — the original 'month.'" },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "The dark part of a crescent Moon is caused by Earth's shadow.", answer: false, hint: "Remember the deeper dive.", explanation: "That dark part is the Moon's own night side. Earth's shadow only touches the Moon during a rare lunar eclipse." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Last night the Moon was full. Over the next week, what will happen to the bright part we see?", options: ["It will grow", "It will shrink", "It will stay full", "It will turn red"], answer: 1, hint: "What comes after Full — waxing or waning?", explanation: "After Full Moon the Moon wanes: the visible lit portion shrinks night by night toward the Last Quarter." },
    ],
  },

  // ───────────────────────── Lesson 4: A Day on the Moon ─────────────────────────
  {
    slug: "a-day-on-the-moon",
    title: "A Day on the Moon",
    tagline: "Two weeks of sunlight, a black daytime sky, and footprints that last forever",
    estMinutes: 12,
    xpReward: 100,
    sections: [
      {
        kind: "HERO",
        content: {
          scene: "moon",
          headline: "The Longest Day",
          sub: "Imagine a school day that lasted two weeks — under a pitch-black sky, in air-less silence, beside footprints that will outlive every castle on Earth.",
        },
      },
      {
        kind: "CONTEXT",
        title: "Why does this matter?",
        content: {
          markdown:
            "When the Apollo astronauts stepped onto the Moon, they entered a world running on completely different rules. The sky above them was **black at noon**. The silence was total — clap your hands and you'd hear nothing. Their boot prints pressed into dust that hadn't moved in a billion years.\n\nNASA is planning to send astronauts back to the Moon, and someday people may live there. Anyone who does will need to answer very practical questions: How long is a day? How hot does it get? Why must you always wear a suit? This lesson is your astronaut briefing.",
        },
      },
      {
        kind: "CONCEPT",
        title: "The big idea",
        content: {
          markdown:
            "**A 'day' means one full spin.** Earth spins around once every 24 hours — that's why we get a sunrise every morning. The Moon spins too, but **very slowly**: one full day–night cycle on the Moon takes about **29.5 Earth days**.\n\nThat means if you stood on the Moon:\n\n- **Daytime would last about two weeks.** The Sun would crawl across the sky so slowly you could barely see it move.\n- **Night would also last about two weeks** — fourteen Earth-days of darkness.\n\n**The sky is black even at noon.** Earth's daytime sky is blue because our **air** scatters sunlight everywhere above us (a whole lesson awaits you in the Atmosphere world!). The Moon has **no air at all**. No air means nothing to scatter light — so the Sun blazes in a perfectly black, star-less-looking sky. Sunlit ground, black sky, all at once.\n\nNo air also means:\n\n- **No sound.** Sound travels by shaking air. No air, no sound — astronauts talk by radio.\n- **No wind and no rain.** Nothing ever blows the dust around. That's why astronaut **footprints from 1969 are still there today**, sharp as the day they were made, and could last millions of years.\n- **Wild temperatures.** On Earth, air acts like a blanket, spreading warmth around. With no blanket, the Moon's daytime ground roasts to about **120°C** (hotter than boiling water) and its night plunges to about **−130°C** (far colder than Antarctica). Space suits are really wearable air-conditioned blankets.\n\nOne last wonder: the Moon spins **exactly** once for every trip it makes around Earth. Because of that perfect match, **the same side of the Moon always faces us**. People on Earth had never seen the far side until a spacecraft flew around and photographed it in 1959!",
        },
      },
      {
        kind: "SIMULATION",
        title: "Try it: spin a world",
        content: {
          simId: "earth-spin",
          intro:
            "Spin the planet and watch your little explorer pass from day into night. Try the slow 'Moon mode' — notice how long your explorer waits for sunrise.",
        },
      },
      {
        kind: "WORKED_EXAMPLES",
        title: "Worked examples",
        content: {
          examples: [
            {
              title: "The two-week school day",
              problem: "A 'school day' on Earth lasts from morning to afternoon — part of one Earth spin. If you went to school for one whole Moon daytime, about how many Earth days would you be there?",
              steps: [
                "One full Moon day–night cycle is about 29.5 Earth days.",
                "Daytime is about half of that cycle.",
                "29.5 ÷ 2 ≈ 14.75.",
              ],
              answer: "About 14 to 15 Earth days of nonstop daylight. Pack a very big lunch.",
            },
            {
              title: "The silent hammer",
              problem: "An astronaut hammers a flag pole into the Moon's surface. Her friend stands ten steps away, watching. What does the friend hear?",
              steps: [
                "Sound needs something to travel through — usually air.",
                "The Moon has no air between the two astronauts.",
                "Vibrations from the hammer can't cross the gap (though the hammering astronaut might feel buzzing through her own suit and bones).",
              ],
              answer: "Nothing at all. The friend sees the hammer strike in total silence — that's why suits have radios.",
            },
            {
              title: "Footprints forever",
              problem: "On Earth, a footprint on the beach disappears within hours. Why are 50-year-old footprints on the Moon still perfect?",
              steps: [
                "On Earth, wind blows sand and rain washes prints away.",
                "Wind and rain are made of moving air and water.",
                "The Moon has no air and no liquid water — nothing ever disturbs the dust.",
              ],
              answer: "With no wind, rain, or weather of any kind, nothing erases them. They may last millions of years.",
            },
          ],
        },
      },
      {
        kind: "VIDEOS",
        title: "Watch and wonder",
        content: {
          videos: [
            { youtubeId: "vwfbdPyzgDo", title: "Over (to) The Moon | Crash Course Kids" },
            { youtubeId: "dh5wGSLw1p4", title: "Why Do Things Float in Space? | SciShow Kids" },
          ],
        },
      },
      {
        kind: "CONCEPT_CHECK",
        title: "Quick check",
        content: { intro: "Astronaut briefing check — are you ready for the surface?" },
      },
      {
        kind: "PRACTICE",
        title: "Practice problems",
        content: { intro: "Final test before your moonwalk. Helmets on." },
      },
      {
        kind: "DEEPER_DIVE",
        title: "Deeper dive: why we never see the far side",
        content: {
          markdown:
            "The Moon's spin and its orbit are perfectly matched — one spin per one trip around Earth. Scientists call this **tidal locking**, and it is no coincidence.\n\nBillions of years ago the Moon spun faster. But Earth's gravity pulls a little harder on the Moon's near side than its far side, stretching it slightly. That constant stretching acted like a gentle brake, slowing the Moon's spin over millions of years until it locked: now it rotates exactly once per orbit, forever showing us the same face.\n\nThe same brake is working on Earth right now — the Moon's pull is slowing our spin too. Earth's day grows about **2 milliseconds longer every century**. Dinosaurs lived days that were only about 23 hours long!",
        },
      },
      {
        kind: "SUMMARY",
        title: "Mission summary",
        content: {
          takeaways: [
            "A day–night cycle on the Moon lasts about 29.5 Earth days — two weeks of light, two weeks of dark.",
            "The Moon has no air: the daytime sky is black, and there is no sound, wind, or rain.",
            "With no air blanket, temperatures swing from about +120°C to −130°C.",
            "No weather means footprints and tracks can last for millions of years.",
            "The Moon is tidally locked — the same side always faces Earth.",
          ],
          formulas: [{ label: "Lunar day", tex: "1 \\text{ Moon day} \\approx 29.5 \\text{ Earth days}" }],
        },
      },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "About how long does one full day–night cycle last on the Moon?", options: ["24 hours", "One week", "About 29.5 Earth days", "One year"], answer: 2, explanation: "The Moon spins very slowly — one full cycle takes about 29.5 Earth days, with roughly two weeks of daylight." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "On the Moon, the daytime sky is bright blue, just like on Earth.", answer: false, explanation: "With no air to scatter sunlight, the Moon's sky stays black even when the Sun is up." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "Astronauts on the Moon could hear each other by shouting through their helmets.", answer: false, explanation: "Sound needs air to travel. With no air on the Moon, astronauts must use radios." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Why do footprints on the Moon last so long?", options: ["The dust is sticky like glue", "There is no wind or rain to erase them", "Robots protect them", "The Moon is frozen solid"], answer: 1, hint: "What erases footprints on a beach?", explanation: "No air means no wind; no water means no rain. Nothing ever disturbs the dust." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Why does the Moon get both much hotter AND much colder than Earth?", options: ["It is closer to the Sun", "It has no blanket of air to hold and spread warmth", "It is made of metal", "Its rock burns easily"], answer: 1, hint: "What does Earth's air act like at night?", explanation: "Air works like a blanket, trapping and spreading heat. Without it, the sunlit side roasts and the night side freezes." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Daytime on the Moon lasts about half of the full 29.5-day cycle. About how many Earth days is that?", answer: { value: 14.75, tolerance: 1.75 }, hint: "Divide 29.5 by 2.", explanation: "29.5 ÷ 2 ≈ 14.75 — about two weeks of continuous daylight." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "People on Earth always see the same side of the Moon.", answer: true, hint: "Think of the deeper dive: tidal locking.", explanation: "The Moon spins exactly once per orbit, so the same face always points toward Earth." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "An astronaut claps her hands on the Moon. Why is there no clapping sound?", options: ["Her gloves are too soft", "Sound cannot travel without air", "It is too cold for sound", "The Moon absorbs all noise"], answer: 1, hint: "What does sound travel through?", explanation: "Sound is a vibration carried by air (or water, or solids). In the Moon's airless space between people, vibrations have nothing to travel through." },
    ],
  },
];
