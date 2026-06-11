import type { LessonSeed } from "./types.js";

export const earthSurfaceLessons: LessonSeed[] = [
  // ───────────────────────── Lesson 1: Why Things Fall ─────────────────────────
  {
    slug: "why-things-fall",
    title: "Why Things Fall",
    tagline: "Gravity comes home — down means toward the center",
    estMinutes: 12,
    xpReward: 100,
    sections: [
      {
        kind: "HERO",
        content: {
          scene: "earth",
          headline: "Welcome Home",
          sub: "You've returned from the Moon to a world where dropped toast hits the floor fast — and somehow, people in Australia aren't falling off the bottom of the planet.",
        },
      },
      {
        kind: "CONTEXT",
        title: "Why does this matter?",
        content: {
          markdown:
            "Everything you do today depends on falling. Pour juice: gravity pulls it into the cup. Take a step: gravity plants your foot back on the ground. Play basketball, ride a bike downhill, watch rain fill a puddle — falling, falling, falling.\n\nBut here's a puzzle that confused people for thousands of years. The Earth is a **giant ball**. There are kids in Australia, on the 'other side' of that ball, dropping their toast right now. Why doesn't their toast fall *off* the Earth into space? Why don't *they*?\n\nThe answer changes what the word 'down' really means — and once you see it, you can never unsee it.",
        },
      },
      {
        kind: "CONCEPT",
        title: "The big idea",
        content: {
          markdown:
            "On the Moon you learned that gravity pulls everything **toward the center** of a world. Now we're standing on the biggest world you'll ever live on, so let's take that idea seriously.\n\n**'Down' is not a direction in space. 'Down' means 'toward the center of the Earth.'**\n\nPicture the Earth as a giant ball with a magnet for *everything* buried at its very center (it's not a real magnet — it's gravity — but the picture helps). A person in Canada is pulled toward the center. A person in Australia is pulled toward the **same center** — which, for them, is also toward the ground under their feet. Both feel perfectly right-side-up. There is no 'bottom' of the Earth, because every direction toward the center counts as down.\n\n**Earth's pull is strong.** Drop something here and it speeds up fast — much faster than on the Moon. After one second of falling, a dropped ball is already moving at about **10 meters per second** (faster than a sprinting champion). And falling things keep **speeding up** the longer they fall. That's why a fall from a chair is fine, but a fall from a roof is dangerous: more time falling means more speed.\n\n**Heavy and light fall together.** This surprises everyone. Drop a big rock and a small rock at the same time: they land **together**. Gravity pulls the heavy one harder, but the heavy one also needs more pull to get moving — and the two effects exactly cancel out. The only cheater is **air**: a feather or a flat sheet of paper falls slowly because air catches it like a parachute. Crumple the paper into a ball (same paper, same weight!) and it drops like a stone. The difference was never the weight — it was the air.\n\nSo your three Earth rules:\n\n1. Down = toward Earth's center, everywhere on the planet.\n2. Falling things speed up as they fall.\n3. Without air in the way, everything falls together.",
        },
      },
      {
        kind: "SIMULATION",
        title: "Try it: drop lab — Earth edition",
        content: {
          simId: "gravity-drop",
          intro:
            "Drop the ball on Earth and watch the speed counter climb. Compare with the Moon — same height, very different fall. Then crank gravity to maximum and imagine living there.",
        },
      },
      {
        kind: "WORKED_EXAMPLES",
        title: "Worked examples",
        content: {
          examples: [
            {
              title: "Toast in Australia",
              problem: "Ben in Canada and Ruby in Australia both drop toast at the same moment. Describe where each piece of toast goes.",
              steps: [
                "Down means toward Earth's center for everyone.",
                "Ben's toast falls toward the center — which is toward his kitchen floor.",
                "Ruby's toast also falls toward the center — which is toward *her* kitchen floor.",
              ],
              answer: "Both pieces land on their own kitchen floors (butter-side down, probably). Nobody's toast flies into space.",
            },
            {
              title: "The paper trick",
              problem: "Lena drops a flat sheet of paper and a crumpled ball of the same kind of paper. The ball lands first. Did crumpling make the paper heavier?",
              steps: [
                "Crumpling changes the shape, not the amount of paper — the weight is identical.",
                "The flat sheet has a big surface, so air pushes up on it like a parachute.",
                "The crumpled ball slips through the air with little resistance.",
              ],
              answer: "No — same weight! Air resistance slowed the flat sheet. Shape, not weight, made the difference.",
            },
            {
              title: "Why higher falls hurt more",
              problem: "A ball dropped from your hand hits gently. The same ball dropped from a balcony hits hard. The ball didn't get heavier — what changed?",
              steps: [
                "Falling things speed up the longer they fall.",
                "From the balcony, the ball falls for more time.",
                "More time falling means a much faster landing speed.",
              ],
              answer: "Its speed. A longer fall gives gravity more time to speed the ball up, so it lands much faster and hits harder.",
            },
          ],
        },
      },
      {
        kind: "VIDEOS",
        title: "Watch and wonder",
        content: {
          videos: [
            { youtubeId: "ljRlB6TuMOU", title: "Defining Gravity | Crash Course Kids" },
            { youtubeId: "K2bmYk-2ok8", title: "What is Gravity For Kids" },
          ],
        },
      },
      {
        kind: "CONCEPT_CHECK",
        title: "Quick check",
        content: { intro: "Three quick ones before the practice problems." },
      },
      {
        kind: "PRACTICE",
        title: "Practice problems",
        content: { intro: "Heads up — answers fall into place when you picture the giant ball." },
      },
      {
        kind: "DEEPER_DIVE",
        title: "Deeper dive: how fast is falling?",
        content: {
          markdown:
            "Scientists measured Earth's gravity precisely. Near the ground, every falling object gains about **9.8 meters per second of speed, every second** (when air isn't interfering). We call this number **g**.\n\nAfter 1 second of falling: about 10 m/s. After 2 seconds: about 20 m/s. After 3 seconds: about 30 m/s — already highway speed!\n\nOn the Moon, g is only about **1.6** — which is exactly why everything there fell in dreamy slow motion. When you're older you'll write this as the famous formula **v = g·t** (speed = gravity × time). You've already discovered what it means.",
        },
      },
      {
        kind: "SUMMARY",
        title: "Mission summary",
        content: {
          takeaways: [
            "'Down' means toward the center of the Earth — everywhere on the planet.",
            "There is no bottom of the Earth; nobody can fall off.",
            "Falling objects speed up the longer they fall.",
            "Heavy and light objects fall together — air resistance, not weight, makes feathers drift.",
            "Earth's gravity (g ≈ 9.8) is about six times stronger than the Moon's.",
          ],
          formulas: [{ label: "Falling speed", tex: "v = g \\cdot t,\\quad g_{Earth} \\approx 9.8\\ \\text{m/s}^2" }],
        },
      },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "What does 'down' really mean?", options: ["Toward the South Pole", "Toward the center of the Earth", "Toward the floor of your house only", "Away from the Sun"], answer: 1, explanation: "Down points toward Earth's center — which is why it works the same in Canada, Australia, and everywhere else." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "People in Australia are upside-down and could fall off the Earth.", answer: false, explanation: "Gravity pulls everyone toward Earth's center, so everyone feels right-side-up and firmly grounded." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "A falling ball moves faster after falling for 3 seconds than after 1 second.", answer: true, explanation: "Falling objects keep speeding up — gravity adds more speed every second." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A big rock and a small rock are dropped together from the same height (no wind). What happens?", options: ["The big rock lands first", "The small rock lands first", "They land at the same time", "Neither falls"], answer: 2, hint: "Remember the hammer and feather on the Moon.", explanation: "Without air resistance mattering, heavy and light objects fall together — the extra pull on the heavy rock is canceled by its extra sluggishness." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A flat sheet of paper falls slowly, but the same sheet crumpled into a ball falls fast. Why?", options: ["Crumpling makes it heavier", "The flat sheet catches more air", "The ball is rounder so gravity likes it", "Crumpling removes gravity"], answer: 1, hint: "Think parachute.", explanation: "Air pushes up against the flat sheet's large surface like a parachute. The crumpled ball meets little air resistance. The weight never changed." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "On Earth, a falling ball gains about 10 m/s of speed each second. About how fast is it moving after 3 seconds of falling? (Answer in m/s.)", answer: { value: 30, tolerance: 3 }, hint: "10 m/s for every second.", explanation: "10 × 3 = about 30 m/s — already as fast as a car on the highway." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "If you dug a tunnel and stood halfway around the world, dropped objects there would fall toward the sky.", answer: false, hint: "Where does gravity always point?", explanation: "Dropped objects everywhere fall toward Earth's center — which is always toward the ground beneath your feet." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Why is falling from a tall slide more dangerous than hopping off the bottom step?", options: ["Tall slides make you heavier", "A longer fall gives you more landing speed", "The air is thinner up high", "Gravity is stronger at the top"], answer: 1, hint: "What happens to speed during a fall?", explanation: "The longer you fall, the more speed gravity adds — so a higher fall means a much harder landing." },
    ],
  },

  // ───────────────────────── Lesson 2: Pushes and Pulls ─────────────────────────
  {
    slug: "pushes-and-pulls",
    title: "Pushes and Pulls",
    tagline: "Forces — how everything that moves gets moving",
    estMinutes: 12,
    xpReward: 100,
    sections: [
      {
        kind: "HERO",
        content: {
          scene: "earth",
          headline: "Make It Move",
          sub: "A soccer ball will sit in the grass until the end of time — unless something pushes it. Meet forces: the pushes and pulls behind every movement on Earth.",
        },
      },
      {
        kind: "CONTEXT",
        title: "Why does this matter?",
        content: {
          markdown:
            "Watch a playground for one minute and count the pushes and pulls. A swing is pushed. A wagon is pulled. A ball is kicked (a push from a foot), caught (a pull-to-a-stop by hands), and thrown again.\n\nNothing — not a ball, not a bike, not a planet — starts moving, stops moving, or changes direction **by itself**. Something must push or pull it. Scientists call every push and every pull a **force**, and forces are the steering wheel of the entire universe. Even gravity, your old friend from the Moon, is just one famous example of a pull.",
        },
      },
      {
        kind: "CONCEPT",
        title: "The big idea",
        content: {
          markdown:
            "**A force is a push or a pull.** Forces are invisible, but you can always see what they *do*. A force can:\n\n- **Start** something moving (kick a resting ball),\n- **Stop** something moving (catch the ball),\n- **Speed it up or slow it down** (pedal harder; squeeze the brakes),\n- **Change its direction** (bat hits ball — the ball was flying one way and leaves another),\n- **Squash or stretch it** (squeeze clay, stretch a rubber band).\n\n**Bigger force, bigger change.** Tap a toy car and it rolls a little. Shove it and it races. The harder the push, the faster things speed up.\n\n**Heavier things are harder to change.** Push an empty shopping cart: easy. Push a full one with the *same strength*: it barely gets going. More stuff (more **mass**) means more force is needed for the same change. This is also why a rolling bowling ball is harder to stop than a rolling tennis ball.\n\n**The hidden force: friction.** Roll a ball across grass and it slows down and stops — but you never see anything touch it. Something did: **friction**, a force made wherever two surfaces rub. Friction always pushes *against* sliding. Rough surfaces (grass, carpet, sandpaper) make lots of friction; smooth surfaces (ice, polished floors) make little. That's why the same hockey puck glides forever on ice but dies quickly on pavement.\n\nFriction isn't the enemy, though. **Without friction you couldn't walk** — your shoes would slip like on perfect ice. Brakes, knots, and even holding a pencil all depend on it.\n\nSo whenever anything changes how it's moving, ask the physicist's question: **what pushed or pulled it?** There is always an answer.",
        },
      },
      {
        kind: "SIMULATION",
        title: "Try it: push factory",
        content: {
          simId: "force-push",
          intro:
            "Choose a box, set your push strength, and toggle the rough floor. Watch how heavier boxes need bigger pushes — and how friction eats away at the motion.",
        },
      },
      {
        kind: "WORKED_EXAMPLES",
        title: "Worked examples",
        content: {
          examples: [
            {
              title: "Spot the forces",
              problem: "List the pushes and pulls in this sentence: 'Ava pulls her sled up the hill, then pushes off and rides down, dragging her boots to stop.'",
              steps: [
                "Pulling the sled uphill — a pull from Ava (while gravity pulls the sled downhill).",
                "Pushing off — a push from Ava's hands/feet to start moving.",
                "Dragging boots — friction between boots and snow, a force that slows the sled to a stop.",
              ],
              answer: "Three star players: Ava's pull (up), Ava's push (start), and friction's push-back (stop) — with gravity pulling downhill the whole time.",
            },
            {
              title: "The two carts",
              problem: "Jo pushes an empty cart and a full cart with exactly the same strength. Which speeds up more, and why?",
              steps: [
                "Both carts get the same push (same force).",
                "The full cart has much more mass.",
                "More mass means the same force produces a smaller change in motion.",
              ],
              answer: "The empty cart speeds up more. Same push + less mass = bigger change.",
            },
            {
              title: "Puck on two floors",
              problem: "The same hockey puck is slid with the same push across ice and across carpet. On which surface does it travel farther, and what force makes the difference?",
              steps: [
                "After the push ends, only friction is acting to slow the puck.",
                "Ice is smooth: very little friction, so the puck keeps most of its speed.",
                "Carpet is rough: lots of friction, which quickly steals the puck's motion.",
              ],
              answer: "Farther on ice. Friction — strong on carpet, weak on ice — is the force that decides.",
            },
          ],
        },
      },
      {
        kind: "VIDEOS",
        title: "Watch and wonder",
        content: {
          videos: [
            { youtubeId: "Se_e5h9vtms", title: "Push and Pull Forces | Twinkl" },
            { youtubeId: "zI-vmLrBQzU", title: "What Are Push and Pull Forces?" },
          ],
        },
      },
      {
        kind: "CONCEPT_CHECK",
        title: "Quick check",
        content: { intro: "Push these three questions over the line." },
      },
      {
        kind: "PRACTICE",
        title: "Practice problems",
        content: { intro: "May the forces be with you." },
      },
      {
        kind: "DEEPER_DIVE",
        title: "Deeper dive: forces come in pairs",
        content: {
          markdown:
            "Here is one of the strangest true facts in physics: **you cannot push something without it pushing you back.**\n\nPush hard against a wall — feel your hands being pushed back? Step off a skateboard by pushing it backward, and *you* glide forward while the board shoots back. A swimmer pushes water backward; the water pushes the swimmer forward. Even a rocket works this way: it hurls hot gas down, and the gas pushes the rocket up. Rockets don't push against the ground or the air — which is why they work perfectly in empty space.\n\nIsaac Newton wrote this down about 340 years ago: *for every action there is an equal and opposite reaction.* You'll meet Newton again and again on this journey — he basically wrote the rulebook for moving things.",
        },
      },
      {
        kind: "SUMMARY",
        title: "Mission summary",
        content: {
          takeaways: [
            "A force is a push or a pull — it can start, stop, speed up, slow down, turn, or squash things.",
            "Bigger forces make bigger changes in motion.",
            "Heavier (more massive) objects need more force for the same change.",
            "Friction is a hidden force between rubbing surfaces that resists sliding — and makes walking possible.",
            "Forces come in pairs: push something and it pushes back on you.",
          ],
          formulas: [{ label: "Newton's idea", tex: "\\text{bigger force} \\Rightarrow \\text{bigger change};\\quad \\text{more mass} \\Rightarrow \\text{smaller change}" }],
        },
      },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "What is a force?", options: ["A kind of energy drink", "A push or a pull", "Something only machines have", "A type of magnet"], answer: 1, explanation: "Every force is a push or a pull — from a kick to gravity itself." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "A ball sitting still in the grass will eventually start rolling all by itself.", answer: false, explanation: "Nothing starts moving without a force. The ball waits for a push or pull — forever, if needed." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Catching a flying ball is an example of a force that…", options: ["starts motion", "stops motion", "has no effect", "creates gravity"], answer: 1, explanation: "Your hands apply a force that stops the ball's motion. Stopping is just as much a force's job as starting." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Tom pushes a toy truck gently, then pushes it hard. What does the harder push do?", options: ["Nothing different", "Makes the truck speed up more", "Makes the truck heavier", "Reverses gravity"], answer: 1, hint: "Bigger force, bigger…?", explanation: "A bigger force creates a bigger change in motion — the truck speeds up more." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Why does a rolling ball on carpet stop sooner than the same ball on a smooth gym floor?", options: ["Carpet has more friction", "The gym floor pushes the ball forward", "Balls dislike carpet", "Gravity is weaker in the gym"], answer: 0, hint: "Which surface is rougher?", explanation: "Rough carpet rubs hard against the ball — that friction force quickly slows it. The smooth floor rubs much less." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "Friction is always bad and we would be better off without it.", answer: false, hint: "Could you walk on perfect ice?", explanation: "Without friction your shoes couldn't grip the ground, brakes couldn't stop bikes, and knots wouldn't hold. Friction is essential." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "An empty wagon and a wagon full of bricks get the exact same pull. Which one is harder to get moving?", options: ["The empty wagon", "The full wagon", "They're the same", "Neither will move"], answer: 1, hint: "More mass means…?", explanation: "More mass resists changes in motion more. The brick-filled wagon needs a bigger force for the same get-up-and-go." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A swimmer pushes water backward with her arms. What pushes the swimmer forward?", options: ["Her swimsuit", "The water pushing back on her", "The pool walls", "Wind"], answer: 1, hint: "Forces come in pairs.", explanation: "Every push gets a push back. She pushes the water backward; the water pushes her forward. Same trick as a rocket!" },
    ],
  },

  // ─────────────────────────── Lesson 3: Magnet Magic ───────────────────────────
  {
    slug: "magnet-magic",
    title: "Magnet Magic",
    tagline: "The force that pushes and pulls without touching",
    estMinutes: 12,
    xpReward: 100,
    sections: [
      {
        kind: "HERO",
        content: {
          scene: "earth",
          headline: "Action at a Distance",
          sub: "Hold two magnets close and something eerie happens: they grab — or shove — each other across empty air. No strings. No touching. Real invisible force.",
        },
      },
      {
        kind: "CONTEXT",
        title: "Why does this matter?",
        content: {
          markdown:
            "Magnets are hiding all over your home. They pin art to the fridge, snap tablet covers shut, hold cabinet doors closed, and spin inside every electric motor — fans, blenders, electric toothbrushes, electric cars.\n\nAnd magnets do something most forces can't: they **work without touching**. Every push or pull from the last lesson needed contact — foot on ball, hand on wagon. Magnets reach across empty space, just like gravity does. (Spoiler: planet Earth itself is a gigantic magnet, and that fact has guided sailors home for a thousand years.)",
        },
      },
      {
        kind: "CONCEPT",
        title: "The big idea",
        content: {
          markdown:
            "**A magnet is an object that pulls on certain metals** — mainly **iron** and **steel** (steel is mostly iron). Bring a magnet near a paperclip and the clip leaps to it.\n\nBut magnets are picky! They ignore plastic, wood, glass, paper, rubber — and even most metals. A soda can (aluminum), a gold ring, a copper coin: no pull at all. **Magnetic ≠ metal.** Only iron-family metals join the club. The test is simple: if a magnet grabs it, there's iron or steel inside.\n\n**Every magnet has two ends, called poles:** a **north pole (N)** and a **south pole (S)**. You can't have one without the other — snap a magnet in half and each piece instantly has its own N and S!\n\nThe poles follow one golden rule:\n\n- **Opposite poles attract.** N pulls on S. Click!\n- **Same poles repel.** N pushes away N; S pushes away S. Try to force them together and you'll feel an invisible springy cushion fighting your fingers.\n\nThat repelling push is special — it's one of the only ways to feel an **invisible push** with your bare hands.\n\n**Magnetic force passes through things.** A magnet can hold paper to the fridge because its pull reaches *through* the paper. It works through cardboard, plastic, glass, even your hand. But the force fades fast with distance — a magnet that snaps up a paperclip from one centimeter away may be helpless from ten.\n\n**The biggest magnet you know is under your feet.** Deep inside Earth, churning liquid iron turns our whole planet into a giant (gentle) magnet, with magnetic poles near the North and South Poles. A **compass** is just a tiny magnet balanced on a pin — Earth's magnetism pulls its N end to point north. With that one trick, explorers crossed oceans long before satellites existed.",
        },
      },
      {
        kind: "SIMULATION",
        title: "Try it: pole playground",
        content: {
          simId: "magnet-poles",
          intro:
            "Slide two bar magnets toward each other, then flip one around. Feel the rule with your eyes: opposites snap together, sames shove apart.",
        },
      },
      {
        kind: "WORKED_EXAMPLES",
        title: "Worked examples",
        content: {
          examples: [
            {
              title: "The picky magnet",
              problem: "Nia tests her magnet on: a steel spoon, a plastic ruler, an aluminum can, and an iron nail. Which stick?",
              steps: [
                "Magnets attract iron and steel only (steel contains iron).",
                "Steel spoon: yes. Iron nail: yes.",
                "Plastic isn't metal at all; aluminum is metal but not the iron family.",
              ],
              answer: "The steel spoon and the iron nail stick. The ruler and the soda can are ignored — being metal isn't enough; it must be the iron family.",
            },
            {
              title: "The stubborn magnets",
              problem: "Omar pushes the N end of one magnet toward the N end of another. They refuse to touch, sliding apart like ghosts. What's happening?",
              steps: [
                "Same poles repel — N pushes N away.",
                "The closer Omar forces them, the stronger the invisible push grows.",
                "The magnets slide aside to escape, like two wrong ends of a spring.",
              ],
              answer: "Same-pole repulsion. Flip one magnet around (N to S) and they'll snap together instantly.",
            },
            {
              title: "Fridge physics",
              problem: "A thin magnet holds Mia's drawing against the fridge door, through the paper. Why does it work through paper but fail when she adds a thick book in between?",
              steps: [
                "Magnetic force passes through non-magnetic stuff like paper.",
                "But the force weakens quickly with distance.",
                "A thick book pushes the magnet too far from the steel door.",
              ],
              answer: "Paper is thin, so the magnet is still close to the steel and holds on. The book adds distance, the force fades, and the drawing falls.",
            },
          ],
        },
      },
      {
        kind: "VIDEOS",
        title: "Watch and wonder",
        content: {
          videos: [
            { youtubeId: "s236Q1nuWXg", title: "Fun with Magnets! | SciShow Kids" },
            { youtubeId: "yXCeuSiTOug", title: "Magnetism | The Dr. Binocs Show" },
          ],
        },
      },
      {
        kind: "CONCEPT_CHECK",
        title: "Quick check",
        content: { intro: "Will these answers attract or repel you? Find out." },
      },
      {
        kind: "PRACTICE",
        title: "Practice problems",
        content: { intro: "Stick with it — these five problems are very attractive." },
      },
      {
        kind: "DEEPER_DIVE",
        title: "Deeper dive: animals with built-in compasses",
        content: {
          markdown:
            "Earth's magnetism isn't just for sailors. Many animals can **feel** it.\n\nSea turtles hatch on a beach, swim thousands of kilometers across the ocean for years — and then find their way back to *the very same beach* to nest. Migrating birds fly continent to continent through cloudy nights with no landmarks. Salmon, lobsters, and even some bacteria navigate the same way: scientists have shown they sense Earth's magnetic field, carrying a kind of built-in compass.\n\nExactly *how* their bodies detect the field is still being figured out — tiny magnetic crystals in their cells and special light-sensing proteins in their eyes are both suspects. It is a genuine open mystery of science. Maybe you'll be the one to solve it.",
        },
      },
      {
        kind: "SUMMARY",
        title: "Mission summary",
        content: {
          takeaways: [
            "Magnets pull on iron and steel — not on plastic, wood, or most other metals.",
            "Every magnet has a north pole and a south pole; you can never have just one.",
            "Opposite poles attract; same poles repel.",
            "Magnetic force works without touching and passes through thin materials, but fades with distance.",
            "Earth is a giant magnet — that's why a compass needle points north.",
          ],
          formulas: [{ label: "Golden rule", tex: "N \\leftrightarrow S\\ \\text{attract},\\qquad N \\leftrightarrow N\\ \\text{or}\\ S \\leftrightarrow S\\ \\text{repel}" }],
        },
      },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Which of these will a magnet pick up?", options: ["A plastic block", "A steel paperclip", "A rubber band", "A wooden bead"], answer: 1, explanation: "Magnets attract iron and steel. Plastic, rubber, and wood are completely ignored." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "What happens when two NORTH poles are pushed toward each other?", options: ["They snap together", "They push each other away", "They melt", "Nothing"], answer: 1, explanation: "Same poles repel — you can feel the invisible push fighting your fingers." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "A magnet must touch a paperclip to pull on it.", answer: false, explanation: "Magnetic force reaches across space — the clip jumps to the magnet before they touch." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "An aluminum soda can is metal, but a magnet won't stick to it. Why?", options: ["The can is too smooth", "Magnets only attract iron-family metals", "The can is too cold", "Soda blocks magnetism"], answer: 1, hint: "Magnetic ≠ metal.", explanation: "Only iron and steel (and a few cousins like nickel) respond to magnets. Aluminum, copper, and gold do not." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "The N pole of magnet A snaps onto one end of magnet B. Which pole did it grab?", options: ["B's north pole", "B's south pole", "Either one", "Magnets have no poles"], answer: 1, hint: "Opposites…", explanation: "Opposites attract: a north pole clicks onto a south pole." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "If you cut a magnet in half, one piece will be all-north and the other all-south.", answer: false, hint: "Poles always come in pairs.", explanation: "Each half instantly becomes a complete magnet with its own N and S. Poles can never be separated." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A compass needle points north because…", options: ["the needle is heavier on one end", "Earth itself is a giant magnet", "the North Pole is shiny", "wind pushes it"], answer: 1, hint: "What's churning deep inside Earth?", explanation: "Liquid iron moving in Earth's core makes the whole planet magnetic, and the tiny needle-magnet lines up with it." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A magnet holds a note to the fridge through a sheet of paper. What would make it drop the note?", options: ["Using two sheets of gift-wrap", "Adding a thick book between magnet and fridge", "Turning the magnet sideways", "Drawing on the note"], answer: 1, hint: "Magnetic force fades with…?", explanation: "Magnetic force weakens quickly with distance. A thick book pushes the magnet too far from the steel door to hold on." },
    ],
  },

  // ─────────────────────────── Lesson 4: Day and Night ───────────────────────────
  {
    slug: "day-and-night",
    title: "Day and Night",
    tagline: "Our spinning Earth — why the Sun 'rises' without moving",
    estMinutes: 12,
    xpReward: 100,
    sections: [
      {
        kind: "HERO",
        content: {
          scene: "earth",
          headline: "The Great Carousel",
          sub: "Every morning the Sun 'comes up.' Every evening it 'goes down.' Here's the twist: the Sun isn't going anywhere. You are.",
        },
      },
      {
        kind: "CONTEXT",
        title: "Why does this matter?",
        content: {
          markdown:
            "Right now, while you read this, it is the middle of the night for kids on the other side of the world. When you eat breakfast, they're sound asleep. When you go to bed, their school day is starting.\n\nFor most of human history, people believed the obvious: that the Sun circles around the Earth, rising in the east and setting in the west. It *looks* exactly like that! It took bold thinkers like **Copernicus** and **Galileo** to prove the opposite — and the real answer explains time zones, sunrises, why your shadow moves, and why 'sunset' is a beautiful illusion.",
        },
      },
      {
        kind: "CONCEPT",
        title: "The big idea",
        content: {
          markdown:
            "**The Earth spins.** Our planet rotates around an invisible line through the North and South Poles — its **axis** — like a giant carousel, making one complete turn every **24 hours**. You, your house, and your whole country are riders on that carousel, moving right now at hundreds of kilometers per hour. (You don't feel it because the spin is perfectly smooth — just as you don't feel speed in a smooth airplane.)\n\n**The Sun, meanwhile, shines steadily** from one direction. And here's the key picture: at any moment, the Sun can only light up **half the ball**. Shine a flashlight on a globe and you'll see it instantly — one half bright, one half dark. Always.\n\n- The half facing the Sun is having **daytime**.\n- The half facing away is having **night**.\n\nAs Earth turns, you ride from the dark half into the bright half. From where you stand, it looks like the Sun is climbing up over the horizon — we call it **sunrise**, but really it's *you-rise*: your part of Earth is turning to face the Sun. Twelve hours later you ride back into the shadow, and the Sun seems to sink — **sunset**, or really *you-set*.\n\nBecause Earth spins toward the **east**, the Sun always appears to rise in the **east** and set in the **west**, everywhere on the planet.\n\nThis also explains **shadows**. In the morning, with the Sun low in the east, your shadow stretches long toward the west. At midday, the Sun is high and your shadow shrinks to a puddle at your feet. By evening it stretches long again — toward the east this time. Your shadow is a sundial, silently tracking the Earth's turn.\n\nAnd remember the Moon world: the Moon makes this same kind of turn, but takes almost a month. Earth's brisk 24-hour spin is why our days feel just right — and as you'll learn someday, it's no accident life likes it that way.",
        },
      },
      {
        kind: "SIMULATION",
        title: "Try it: ride the carousel",
        content: {
          simId: "earth-spin",
          intro:
            "Spin the Earth and follow the little explorer. Watch them cross from night into morning light — then find the moment that is their 'sunrise.'",
        },
      },
      {
        kind: "WORKED_EXAMPLES",
        title: "Worked examples",
        content: {
          examples: [
            {
              title: "The flashlight globe",
              problem: "Pia shines a flashlight at a globe in a dark room. How much of the globe is lit, and what does the lit part represent?",
              steps: [
                "Light travels in straight lines, so it can only strike the side facing it.",
                "Exactly half the ball is bright; the other half is in shadow.",
                "The bright half is 'daytime'; the shadowed half is 'night.'",
              ],
              answer: "Half the globe is lit. That bright half is everywhere on Earth currently having daytime; the dark half is having night.",
            },
            {
              title: "Breakfast and bedtime",
              problem: "It's 8 a.m. in Vancouver. Kenji in Japan, on roughly the opposite side of the Earth, is doing what?",
              steps: [
                "Opposite sides of the spinning Earth face opposite ways.",
                "If Vancouver faces the Sun (morning), Japan faces away (night).",
                "Their clock reads roughly 12 hours different.",
              ],
              answer: "It's around midnight for Kenji — he's asleep. One planet, two opposite times of day.",
            },
            {
              title: "The shrinking shadow",
              problem: "At 9 a.m. Theo's shadow is longer than he is. By noon it has shrunk tiny. What happened?",
              steps: [
                "Shadow length depends on how high the Sun appears in the sky.",
                "As Earth turns through the morning, Theo's spot rotates to face the Sun more directly — the Sun appears higher.",
                "A higher Sun shines more from above, casting a shorter shadow.",
              ],
              answer: "Earth's rotation 'raised' the Sun in Theo's sky, so his shadow shrank. By evening it will stretch long again, pointing the other way.",
            },
          ],
        },
      },
      {
        kind: "VIDEOS",
        title: "Watch and wonder",
        content: {
          videos: [
            { youtubeId: "l64YwNl1wr0", title: "Earth's Rotation & Revolution | Crash Course Kids" },
            { youtubeId: "yo53v51bIi4", title: "What Causes Day and Night?" },
          ],
        },
      },
      {
        kind: "CONCEPT_CHECK",
        title: "Quick check",
        content: { intro: "Quick spin through three questions." },
      },
      {
        kind: "PRACTICE",
        title: "Practice problems",
        content: { intro: "Don't let these go over the horizon — five problems to finish the world!" },
      },
      {
        kind: "DEEPER_DIVE",
        title: "Deeper dive: proving the spin",
        content: {
          markdown:
            "How do we *know* Earth spins, rather than the Sun circling us? For centuries no one could prove it directly. Then in 1851, French physicist **Léon Foucault** hung a heavy ball on a 67-meter wire from the ceiling of the Panthéon in Paris and set it swinging.\n\nA swinging pendulum keeps its swing-direction fixed in space. Yet hour by hour, the crowd watched the pendulum's path slowly turn relative to the floor… because the **floor — the Earth — was turning underneath it.** People could literally watch the planet rotate.\n\nFoucault pendulums still swing in science museums all over the world today. Find one, watch it for an hour, and you'll see the Earth turn with your own eyes.",
        },
      },
      {
        kind: "SUMMARY",
        title: "Mission summary",
        content: {
          takeaways: [
            "Earth rotates on its axis once every 24 hours.",
            "The Sun lights only half the Earth at a time: the lit half has day, the dark half has night.",
            "Sunrise and sunset are caused by Earth's turning — the Sun isn't moving around us.",
            "Earth spins toward the east, so the Sun appears to rise in the east and set in the west.",
            "Shadows are long in morning and evening and shortest near midday, tracking the spin.",
          ],
          formulas: [{ label: "One day", tex: "1 \\text{ rotation} = 24 \\text{ hours} = 1 \\text{ day}" }],
        },
      },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "What causes day and night?", options: ["The Sun turns on and off", "Earth spinning on its axis", "Clouds covering the Sun", "The Moon blocking sunlight"], answer: 1, explanation: "Earth's rotation carries each place into sunlight (day) and back into shadow (night) every 24 hours." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "When it is daytime where you live, it is daytime everywhere on Earth.", answer: false, explanation: "Only the half of Earth facing the Sun has daytime. The other half is in night at that very moment." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "How many hours does Earth take to spin around once?", answer: { value: 24, tolerance: 0.5 }, explanation: "One full rotation takes 24 hours — that's exactly what we call a day." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "At sunset, what is really happening?", options: ["The Sun flies below the ocean", "Your part of Earth is rotating away from the Sun", "The Sun shrinks for the night", "Earth stops spinning"], answer: 1, hint: "Who is actually moving?", explanation: "The Sun stays put. Your spot on the carousel is turning away from it, so the Sun appears to sink behind the horizon." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Earth spins toward the east. Where does the Sun appear to rise?", options: ["In the north", "In the west", "In the east", "Straight overhead"], answer: 2, hint: "You turn toward the thing that seems to 'come up.'", explanation: "Spinning eastward means the eastern horizon turns to face the Sun first — sunrise is always in the east." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "Your shadow is shortest around the middle of the day.", answer: true, hint: "Where is the Sun at midday?", explanation: "Near midday the Sun is highest, shining down from above, so your shadow shrinks to its smallest." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "It is noon in Spain. For a town on the exact opposite side of the Earth, the time is about…", options: ["Noon", "6 in the morning", "Midnight", "Sunset"], answer: 2, hint: "Opposite side = facing the opposite way.", explanation: "The opposite side of the planet faces away from the Sun — it's around midnight there." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Why don't you feel the Earth spinning, even though it carries you at hundreds of km/h?", options: ["Earth spins too slowly to matter", "The motion is perfectly smooth and steady", "Gravity cancels all motion", "We actually do feel dizzy all day"], answer: 1, hint: "Do you feel speed in a smooth, steady airplane?", explanation: "We only feel changes in motion — bumps, speeding up, slowing down. Earth's spin is utterly smooth, so our bodies notice nothing." },
    ],
  },
];
