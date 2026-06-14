import type { LessonSeed } from "../types.js";

// Middle-school physics (grades 5–6), themed on Low Earth Orbit / the Space
// Station: forces, simple machines, work & power, and energy. No SIMULATION or
// VIDEOS sections (kept data-only so every section renders cleanly).
export const forcesMachinesLessons: LessonSeed[] = [
  // ───────────────────────── Lesson 1: Forces & Motion ─────────────────────────
  {
    slug: "forces-and-motion-basics",
    title: "Forces: Pushes and Pulls",
    tagline: "Every change in motion starts with a force",
    estMinutes: 15,
    xpReward: 120,
    difficulty: 2,
    sections: [
      {
        kind: "HERO",
        content: {
          scene: "atmosphere",
          headline: "What Moves the Movers?",
          sub: "300 km up, astronauts float as if weightless. A single fingertip push sends one drifting across the cabin. Up here, with friction nearly gone, the real rules of force finally show themselves.",
        },
      },
      {
        kind: "CONTEXT",
        title: "Why does this matter?",
        content: {
          markdown:
            "Why does a kicked ball eventually stop, but a spacecraft coasts for years? Why is it hard to start a heavy cart moving — and just as hard to stop it once it's rolling?\n\nThe answer to every one of these is **force**: a push or a pull. Forces start motion, stop motion, speed things up, slow them down, and turn them. Learn how forces work and you can explain a soccer kick, a seatbelt, a rocket launch, and the drift of an astronaut all with the same handful of ideas.",
        },
      },
      {
        kind: "CONCEPT",
        title: "The big idea",
        content: {
          markdown:
            "**A force is a push or a pull.** We measure force in **newtons (N)**. Holding a small apple takes about 1 N. Forces have a **size** and a **direction** — a 10 N push north is different from a 10 N push south.\n\n**Forces add up.** Two people pushing a box the same way combine their forces. Pushing opposite ways, they subtract. The single force left over after all the pushes and pulls are combined is the **net force** $F_{net}$.\n\n- **Balanced forces** ($F_{net} = 0$): the pushes cancel. The object keeps doing exactly what it was doing — staying still, or moving at steady speed in a straight line.\n- **Unbalanced forces** ($F_{net} \\ne 0$): there's a leftover push. Now — and only now — the motion **changes**: it speeds up, slows down, or turns.\n\n**This is the great idea of inertia.** Objects resist changes to their motion. A still object stays still; a moving object keeps moving — *unless an unbalanced force acts on it*. So a ball doesn't 'naturally' stop. Something stops it: the unbalanced forces of **friction** and air resistance, quietly pushing backward. Remove them, and motion never quits — which is exactly why a spacecraft coasts across the solar system and an astronaut drifts until a wall pushes back.\n\n**More force, or less mass, means a bigger change.** Push the same cart harder and it speeds up faster. Load the cart with bricks (more **mass**) and the same push barely budges it. Heavy things have more inertia — they resist changes more stubbornly.\n\n**Every push comes with a push back.** Push off a wall while floating in space and *you* shoot backward — the wall pushed you exactly as hard as you pushed it. Forces always come in pairs, in opposite directions. A rocket throws gas downward; the gas throws the rocket up. A swimmer pushes water back; the water pushes the swimmer forward.",
        },
      },
      {
        kind: "WORKED_EXAMPLES",
        title: "Worked examples",
        content: {
          examples: [
            {
              title: "Tug-of-war net force",
              problem: "The red team pulls a rope left with 400 N. The blue team pulls right with 350 N. What is the net force, and which way does the rope move?",
              steps: [
                "The pulls are in opposite directions, so subtract them.",
                "$F_{net} = 400 - 350 = 50$ N.",
                "The leftover 50 N points toward the stronger (red) side.",
              ],
              answer: "A net force of 50 N to the left — the rope (and blue team) accelerates leftward. If both teams pulled with 400 N, the net force would be zero and nothing would move.",
            },
            {
              title: "Why the seatbelt saves you",
              problem: "A car stops suddenly in a crash. Use inertia to explain why an unbelted passenger keeps moving forward.",
              steps: [
                "Before the crash, car and passenger move forward together at speed.",
                "The crash applies a huge backward force to the car, stopping it.",
                "No such force acts on the passenger — by inertia they keep moving forward at the old speed.",
              ],
              answer: "Inertia keeps the passenger moving until something exerts a force on them. The seatbelt is that force, slowing them with the car instead of the windshield doing it.",
            },
            {
              title: "Astronaut push-off",
              problem: "A floating astronaut gently pushes a heavy supply crate. Both drift apart. Why does the astronaut move faster than the crate?",
              steps: [
                "The push pairs are equal: the astronaut pushes the crate, the crate pushes back equally.",
                "Equal forces, but different masses.",
                "The smaller-mass astronaut has less inertia, so the same force changes their motion more.",
              ],
              answer: "Equal and opposite forces act, but the lighter astronaut accelerates more than the massive crate — so the astronaut zips off faster.",
            },
          ],
        },
      },
      {
        kind: "CONCEPT_CHECK",
        title: "Quick check",
        content: { intro: "Three quick questions — no resistance, please." },
      },
      {
        kind: "PRACTICE",
        title: "Practice problems",
        content: { intro: "Push through these five." },
      },
      {
        kind: "DEEPER_DIVE",
        title: "Deeper dive: Galileo's leap of imagination",
        content: {
          markdown:
            "For 2,000 years people believed Aristotle: that things stop moving because stopping is their natural state, and motion needs a constant push to continue.\n\n**Galileo** doubted it. He rolled balls down one ramp and up another, and noticed the ball always tried to climb back to its starting height. Make the second ramp gentler, and the ball rolled farther to reach that height. So what if the second ramp were perfectly flat and frictionless? Galileo reasoned the ball would roll **forever**, never finding its height.\n\nHe couldn't build a frictionless surface — but he could imagine one. That leap, later sharpened by Newton, overturned two millennia of physics: motion doesn't need a cause; *changes* in motion do. Centuries later, spacecraft coasting silently between the planets are the proof Galileo never got to see.",
        },
      },
      {
        kind: "SUMMARY",
        title: "Mission summary",
        content: {
          takeaways: [
            "A force is a push or pull, measured in newtons (N), with size and direction.",
            "Net force is what's left after all forces combine. Balanced (net = 0) means no change in motion.",
            "Inertia: objects resist changes to their motion. Things stop because of friction, not 'naturally'.",
            "The same force changes a light object's motion more than a heavy one's (less mass, less inertia).",
            "Forces come in equal, opposite pairs — push the wall and it pushes you back.",
          ],
          formulas: [{ label: "Net force", tex: "F_{net} = \\sum F \\quad (F_{net}=0 \\Rightarrow \\text{motion unchanged})" }],
        },
      },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "A force is best described as…", options: ["a kind of energy", "a push or a pull", "the speed of an object", "the weight of air"], answer: 1, difficulty: 1, explanation: "A force is simply a push or a pull, measured in newtons." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "If the forces on an object are balanced (net force zero), its motion cannot change.", answer: true, difficulty: 2, explanation: "Balanced forces leave nothing to change the motion — the object stays still or keeps moving steadily in a straight line." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "A hockey puck slides across the ice and slowly stops. What stopped it?", options: ["It ran out of motion", "Friction — an unbalanced backward force", "Gravity pulling it down", "Nothing; stopping is natural"], answer: 1, difficulty: 2, explanation: "Without friction the puck would glide on forever. The small backward force of friction is what slows and stops it." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Two students push a cart the same direction, one with 30 N and one with 45 N. What is the net force on the cart, in newtons?", answer: { value: 75, tolerance: 0 }, difficulty: 2, hint: "Same direction means add.", explanation: "Forces in the same direction add: $30 + 45 = 75$ N." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "In a tug-of-war, the left team pulls with 520 N and the right team pulls with 480 N. What is the size of the net force, in newtons?", answer: { value: 40, tolerance: 0 }, difficulty: 2, hint: "Opposite directions means subtract.", explanation: "Opposite pulls subtract: $520 - 480 = 40$ N, toward the stronger (left) team." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A spacecraft far from any planet shuts off its engines. What happens to its motion?", options: ["It quickly slows and stops", "It keeps coasting at the same speed and direction", "It speeds up forever", "It falls straight down"], answer: 1, difficulty: 3, hint: "What forces act on it out there?", explanation: "With essentially no friction or other unbalanced force, inertia carries it onward at constant velocity — possibly for centuries." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "When you push off a wall while floating, the wall pushes back on you with an equal force in the opposite direction.", answer: true, difficulty: 2, hint: "Forces come in pairs.", explanation: "Every force has an equal and opposite partner. The wall's push back is what sends you drifting away." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Two identical pushes are applied: one to a loaded cart, one to an empty cart. Which speeds up more?", options: ["The loaded cart", "The empty cart", "They speed up equally", "Neither moves"], answer: 1, difficulty: 3, hint: "Less mass means less inertia.", explanation: "With less mass (less inertia), the empty cart's motion changes more for the same force, so it accelerates more." },
    ],
  },

  // ───────────────────────── Lesson 2: Simple Machines ─────────────────────────
  {
    slug: "simple-machines",
    title: "Simple Machines",
    tagline: "Trading distance for force — the oldest trick in engineering",
    estMinutes: 16,
    xpReward: 130,
    difficulty: 2,
    sections: [
      {
        kind: "HERO",
        content: {
          scene: "atmosphere",
          headline: "Lift Ten Times Your Weight",
          sub: "The Space Station's robotic arm moves multi-tonne modules with a gentle motor. Its secret is the same one behind a seesaw, a ramp, and a bottle opener: the simple machine.",
        },
      },
      {
        kind: "CONTEXT",
        title: "Why does this matter?",
        content: {
          markdown:
            "How did ancient builders raise stone blocks heavier than houses? How does a small child lift a grown adult on a seesaw? How can one arm crank a car up off the ground?\n\nNone of it breaks the rules of force — it **reroutes** them. A **simple machine** lets a small force do a big job, by spreading that force over a longer distance. Ramps, levers, pulleys, and wheels are the building blocks of every complex machine ever made, from a wheelbarrow to a robotic arm in orbit.",
        },
      },
      {
        kind: "CONCEPT",
        title: "The big idea",
        content: {
          markdown:
            "**A simple machine changes a force** — its size, its direction, or both — to make a task easier.\n\n**The deal you can't escape:** machines don't give you free energy. They let you push with **less force**, but you must push over a **longer distance** to make up for it. Force down, distance up. (You'll see exactly why in the next lesson on work.)\n\n**Mechanical advantage (MA)** measures the help: how many times bigger the output force is than the force you put in.\n\n$$MA = \\frac{\\text{output force (load)}}{\\text{input force (effort)}}$$\n\nAn MA of 4 means you push with 1 unit and get 4 units of lifting force — but you'll pull 4 times as far.\n\n**The classic simple machines:**\n\n- **Lever** — a bar that pivots on a **fulcrum**. Push down far from the fulcrum to lift a big load close to it. Seesaws, crowbars, scissors, and your forearm are levers.\n- **Inclined plane (ramp)** — instead of lifting a load straight up, push it up a gentle slope. Less force, longer path. Wheelchair ramps and mountain switchback roads.\n- **Pulley** — a grooved wheel with a rope. One fixed pulley just changes direction (pull down to lift up). Add more pulleys and you split the load across several rope sections, multiplying your force.\n- **Wheel and axle** — a big wheel turning a small axle (or vice-versa). Steering wheels, doorknobs, and winches.\n- **Wedge** — two ramps back-to-back that move; it splits or cuts. Axes, knives, and your front teeth.\n- **Screw** — a ramp wrapped around a cylinder; it converts turning into a strong straight pull. Jar lids, bolts, and drills.\n\n**Friction takes a cut.** Real machines lose some effort to friction as heat, so the actual help is always a little less than the ideal. Oiling a machine reduces friction and recovers some of that lost effort.",
        },
      },
      {
        kind: "WORKED_EXAMPLES",
        title: "Worked examples",
        content: {
          examples: [
            {
              title: "Reading a ramp's mechanical advantage",
              problem: "A loading ramp lets workers push a 600 N barrel up with only 200 N of force. What is the ramp's mechanical advantage?",
              steps: [
                "MA compares output (the load) to input (your effort).",
                "$MA = \\dfrac{\\text{load}}{\\text{effort}} = \\dfrac{600}{200}$.",
                "$= 3$.",
              ],
              answer: "MA = 3. The ramp tripled the worker's force — but the barrel must travel about three times farther along the slope than its height gain.",
            },
            {
              title: "Seesaw balance",
              problem: "A small child (200 N) sits 3 m from a seesaw's pivot. Where must a 600 N adult sit to balance it?",
              steps: [
                "A lever balances when force × distance is equal on both sides.",
                "Child's side: $200 \\times 3 = 600$.",
                "Adult's side must also equal 600: $600 \\times d = 600$, so $d = 1$.",
              ],
              answer: "The adult sits 1 m from the pivot. Sitting closer to the fulcrum, the heavy adult balances the light child far out — the lever in action.",
            },
            {
              title: "Counting pulley sections",
              problem: "A pulley system supports a load with 4 sections of rope sharing the weight. Roughly what effort lifts a 400 N load?",
              steps: [
                "Each supporting rope section carries an equal share of the load.",
                "Four sections share 400 N: $400 \\div 4 = 100$ N each.",
                "You pull with about that one share.",
              ],
              answer: "About 100 N — one quarter of the load (MA ≈ 4). The catch: you must pull about 4 m of rope to raise the load 1 m.",
            },
          ],
        },
      },
      {
        kind: "CONCEPT_CHECK",
        title: "Quick check",
        content: { intro: "Three questions — lever your knowledge." },
      },
      {
        kind: "PRACTICE",
        title: "Practice problems",
        content: { intro: "Five problems. Trade a little distance for a lot of force." },
      },
      {
        kind: "DEEPER_DIVE",
        title: "Deeper dive: 'Give me a place to stand'",
        content: {
          markdown:
            "The ancient Greek genius **Archimedes** understood levers so deeply he reportedly boasted, *'Give me a place to stand and a lever long enough, and I will move the Earth.'*\n\nHe wasn't entirely joking. With a long enough lever and a fulcrum, the *force* needed to lift even the Earth would be small — though you'd have to move your end of the lever an absurd, cosmic distance, for an unimaginable length of time. The force shrinks; the distance explodes. The deal always holds.\n\nArchimedes turned this insight into war machines, water screws still used for irrigation today, and the foundations of mechanics. Every robotic arm, crane, and excavator is a descendant of his lever.",
        },
      },
      {
        kind: "SUMMARY",
        title: "Mission summary",
        content: {
          takeaways: [
            "Simple machines change a force's size or direction to make work easier.",
            "They never give free energy: less force always costs more distance.",
            "Mechanical advantage MA = load ÷ effort tells you how many times the force is multiplied.",
            "Lever, inclined plane, pulley, wheel-and-axle, wedge, and screw are the six classics.",
            "Friction means real machines help a bit less than the ideal — lubrication recovers some.",
          ],
          formulas: [{ label: "Mechanical advantage", tex: "MA = \\frac{\\text{load}}{\\text{effort}}" }],
        },
      },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "What does a simple machine let you do?", options: ["Create energy from nothing", "Use a smaller force, spread over a longer distance", "Remove friction completely", "Make objects weightless"], answer: 1, difficulty: 2, explanation: "Machines trade force for distance — a smaller push over a longer path does the same job." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "A simple machine can give you more force AND more distance at the same time, for free.", answer: false, difficulty: 2, explanation: "There's no free lunch: gaining force always costs distance (and vice-versa). Energy is conserved." },
      { scope: "CONCEPT_CHECK", kind: "MATCHING", prompt: "Match each tool to the simple machine it uses.", options: { left: ["Wheelchair ramp", "Crowbar", "Doorknob", "Axe"], right: ["Inclined plane", "Lever", "Wheel and axle", "Wedge"] }, answer: ["Inclined plane", "Lever", "Wheel and axle", "Wedge"], difficulty: 3, explanation: "A ramp is an inclined plane, a crowbar is a lever, a doorknob is a wheel and axle, and an axe is a wedge." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A lever lets you lift an 800 N rock by pushing with only 160 N. What is the mechanical advantage?", answer: { value: 5, tolerance: 0 }, difficulty: 2, hint: "MA = load ÷ effort.", explanation: "$MA = 800 \\div 160 = 5$. The lever multiplied your force five times." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A ramp has a mechanical advantage of 4. If you push with 75 N, what load (in newtons) can you move up it?", answer: { value: 300, tolerance: 0 }, difficulty: 3, hint: "load = MA × effort.", explanation: "$\\text{load} = MA \\times \\text{effort} = 4 \\times 75 = 300$ N." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A single fixed pulley at the top of a flagpole mainly…", options: ["multiplies your force by 10", "changes the direction of your pull, so you pull down to raise the flag", "removes the flag's weight", "creates energy"], answer: 1, difficulty: 2, hint: "One fixed pulley doesn't add rope sections.", explanation: "A single fixed pulley redirects your effort (pull down to lift up) but doesn't multiply force; its MA is about 1." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "On a seesaw, a lighter person sitting farther from the pivot can balance a heavier person sitting closer in.", answer: true, difficulty: 3, hint: "Balance compares force × distance on each side.", explanation: "A lever balances when force × distance matches on both sides, so a small force far out can balance a big force close in." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Why do real machines have a mechanical advantage slightly lower than the ideal?", options: ["The math is wrong", "Some effort is lost to friction as heat", "Gravity gets stronger", "Levers shrink over time"], answer: 1, difficulty: 3, hint: "What turns into heat in moving parts?", explanation: "Friction in moving parts wastes a little of your effort as heat, so the real output force is a bit less than the ideal." },
    ],
  },

  // ───────────────────────── Lesson 3: Work & Power ─────────────────────────
  {
    slug: "work-and-power-intro",
    title: "Work and Power",
    tagline: "What counts as work in physics — and how fast you do it",
    estMinutes: 15,
    xpReward: 130,
    difficulty: 3,
    sections: [
      {
        kind: "HERO",
        content: {
          scene: "atmosphere",
          headline: "Hold a Crate All Day, Do Zero Work",
          sub: "In physics, straining to hold a heavy box that doesn't move counts as no work at all. The definition is strict — and once you know it, energy starts to make sense.",
        },
      },
      {
        kind: "CONTEXT",
        title: "Why does this matter?",
        content: {
          markdown:
            "'Work' in everyday life means anything tiring. In physics it means something precise: a **force moving an object through a distance**. This sharp definition is the bridge between forces (last lessons) and **energy** (next lesson).\n\nAnd **power** — how *fast* you do work — is why we rate engines, light bulbs, and rockets in watts and horsepower. Get these two ideas and you can compare a sprinter to an elevator to a Saturn V rocket on the same scale.",
        },
      },
      {
        kind: "CONCEPT",
        title: "The big idea",
        content: {
          markdown:
            "**Work means a force makes something move.** In physics:\n\n$$W = F \\times d$$\n\nWork $W$ (in **joules, J**) equals the force $F$ (in newtons) times the distance $d$ (in meters) the object moves **in the direction of the force**. One joule is one newton pushing through one meter.\n\n**The strict part:** if nothing moves, **no work is done**, no matter how hard you strain. Holding a heavy box still: $d = 0$, so $W = 0$. Pushing a wall that won't budge: zero work. Carrying a box across a flat room: the lifting force is *upward* but the motion is *sideways*, so that force does no work either. Work needs motion **along the force**.\n\n**Work is the transfer of energy.** When you do work on something, you give it energy — you speed it up, or lift it higher. That's why work and energy share the same unit, the joule. (This is the secret behind simple machines: they can't change the work needed, only split it into a smaller force over a longer distance — same $F \\times d$.)\n\n**Power is how fast you do work:**\n\n$$P = \\frac{W}{t}$$\n\nPower $P$ (in **watts, W**) is work divided by the time $t$ taken. One watt is one joule per second. Run up the stairs and you do the same work as walking up — but in less time, so more power. A 100 W bulb uses 100 joules every second. A car engine might deliver tens of thousands of watts; a rocket, billions.",
        },
      },
      {
        kind: "WORKED_EXAMPLES",
        title: "Worked examples",
        content: {
          examples: [
            {
              title: "Work lifting a box",
              problem: "You lift a 50 N box straight up onto a shelf 2 m high. How much work do you do?",
              steps: [
                "Use $W = F \\times d$ with the force and the distance along it.",
                "$W = 50 \\times 2$.",
                "$= 100$ J.",
              ],
              answer: "100 joules — and that energy is now stored in the box as height (potential energy), ready to be released if it falls.",
            },
            {
              title: "The strict definition",
              problem: "A waiter carries a 20 N tray steadily across a level room, 8 m. How much work does the carrying force do on the tray?",
              steps: [
                "The supporting force points up; the tray moves sideways.",
                "Work counts only motion in the direction of the force.",
                "There is no motion along the upward force, so $d = 0$ for that force.",
              ],
              answer: "Zero work (on the tray, by the lifting force). Tiring, yes — but physics work needs motion along the force, and here there is none.",
            },
            {
              title: "Same work, more power",
              problem: "Two students each do 600 J of work climbing a staircase. Ana takes 10 s; Ben takes 5 s. Who is more powerful, and by how much?",
              steps: [
                "Power is work over time: $P = W / t$.",
                "Ana: $600 / 10 = 60$ W.",
                "Ben: $600 / 5 = 120$ W.",
              ],
              answer: "Ben, at 120 W versus Ana's 60 W — double the power for the same work, because he did it in half the time.",
            },
          ],
        },
      },
      {
        kind: "CONCEPT_CHECK",
        title: "Quick check",
        content: { intro: "Three questions. Don't strain against a wall." },
      },
      {
        kind: "PRACTICE",
        title: "Practice problems",
        content: { intro: "Five problems — put in the work." },
      },
      {
        kind: "DEEPER_DIVE",
        title: "Deeper dive: one horsepower",
        content: {
          markdown:
            "When **James Watt** improved the steam engine in the 1770s, he needed to sell it. But how do you convince a mill owner to replace a horse with a machine?\n\nWatt measured how fast a strong horse could do work — lifting weights over a pulley all day — and defined that rate as one **horsepower**. Then he could advertise: *this engine does the work of ten horses.* It was brilliant marketing built on a precise physics idea: power, the rate of doing work.\n\nThe unit of power, the **watt**, is named in his honor. One horsepower is about 746 watts. Next time you see a car rated at 200 horsepower, that's roughly 149,000 watts — or a very large, very tireless herd.",
        },
      },
      {
        kind: "SUMMARY",
        title: "Mission summary",
        content: {
          takeaways: [
            "Work = force × distance moved along that force: W = F × d, measured in joules.",
            "No motion (or motion across the force) means zero work, no matter the effort.",
            "Doing work transfers energy — that's why both use the joule.",
            "Power = work ÷ time: P = W / t, measured in watts (joules per second).",
            "Same work done faster means more power.",
          ],
          formulas: [
            { label: "Work", tex: "W = F \\times d" },
            { label: "Power", tex: "P = \\frac{W}{t}" },
          ],
        },
      },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "In physics, work is done only when…", options: ["you feel tired", "a force moves an object some distance", "you think hard", "an object is heavy"], answer: 1, difficulty: 2, explanation: "Work needs a force AND motion along that force: W = F × d." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "Holding a heavy backpack perfectly still does physics work on the backpack.", answer: false, difficulty: 2, explanation: "No motion means distance is zero, so the work is zero — however tiring it feels." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Power measures…", options: ["how much force you use", "how fast work is done", "how heavy something is", "total distance travelled"], answer: 1, difficulty: 2, explanation: "Power is the rate of doing work: P = W / t, in watts." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "You push a cart with 40 N over a distance of 6 m in the direction of the push. How much work do you do, in joules?", answer: { value: 240, tolerance: 0 }, difficulty: 2, hint: "W = F × d.", explanation: "$W = 40 \\times 6 = 240$ J." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A motor does 1500 J of work in 5 s. What is its power output, in watts?", answer: { value: 300, tolerance: 0 }, difficulty: 2, hint: "P = W / t.", explanation: "$P = 1500 \\div 5 = 300$ W." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "How much work (in joules) is done lifting a 25 N object straight up 4 m?", answer: { value: 100, tolerance: 0 }, difficulty: 2, hint: "The distance is the height lifted.", explanation: "$W = F \\times d = 25 \\times 4 = 100$ J, now stored as the object's height." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Two elevators do the same work lifting a load. Elevator A takes 4 s; elevator B takes 8 s. Which has greater power?", options: ["Elevator A", "Elevator B", "They are equal", "Neither uses power"], answer: 0, difficulty: 3, hint: "Same work, less time means…?", explanation: "Same work in less time means more power, so the faster Elevator A is more powerful." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "A simple machine lets you do a job with less force, but the total work (force × distance) stays about the same.", answer: true, difficulty: 3, hint: "Force down, distance up — same product.", explanation: "Machines split the same work into a smaller force over a longer distance; ignoring friction, F × d is unchanged." },
    ],
  },

  // ───────────────────────── Lesson 4: Forms of Energy ─────────────────────────
  {
    slug: "forms-of-energy",
    title: "Energy and Its Many Forms",
    tagline: "The one thing that's never created or destroyed",
    estMinutes: 16,
    xpReward: 140,
    difficulty: 3,
    sections: [
      {
        kind: "HERO",
        content: {
          scene: "sun",
          headline: "The Universe's Unspendable Currency",
          sub: "Energy can hide as motion, height, heat, light, or chemical fuel — and flip between them endlessly. But the grand total never changes. Not once, anywhere, ever.",
        },
      },
      {
        kind: "CONTEXT",
        title: "Why does this matter?",
        content: {
          markdown:
            "Sunlight becomes plant sugar becomes the energy in your muscles becomes the motion of a thrown ball becomes heat when it lands. Energy is the single thread running through every event in the universe.\n\nThe deepest law in all of science is that this thread is **never cut**: energy is only ever **transformed** from one form to another, never created or destroyed. Understand the forms of energy and the law that ties them together, and you hold the master key to physics, chemistry, biology, and engineering alike.",
        },
      },
      {
        kind: "CONCEPT",
        title: "The big idea",
        content: {
          markdown:
            "**Energy is the ability to do work** — to make things move, heat up, or change. Like work, it's measured in **joules**. It comes in many forms:\n\n- **Kinetic energy** — the energy of **motion**. Anything moving has it: a thrown ball, flowing water, a zooming spacecraft. More speed or more mass means more kinetic energy.\n- **Potential energy** — **stored** energy, waiting to be released. A raised hammer has **gravitational** potential energy (height); a stretched spring or drawn bow has **elastic** potential energy; food and fuel hold **chemical** potential energy in their bonds.\n- **Thermal energy** — the energy of jiggling particles; we feel it as heat.\n- **Light (radiant) energy** — carried by light, like the sunlight crossing space.\n- **Electrical energy** — carried by moving charges through a wire.\n- **Sound energy** — carried by vibrations through a material.\n\n**Energy transforms.** Almost everything interesting is one form of energy turning into another:\n\n- A roller coaster trades **gravitational potential** (at the top) for **kinetic** (at the bottom), then back again on the next hill.\n- A flashlight turns **chemical** (battery) → **electrical** → **light** and **thermal**.\n- A plant turns **light** → **chemical** (sugar). You eat it and turn **chemical** → **kinetic** (movement) and **thermal** (body heat).\n\n**The law of conservation of energy:** in any change, **the total energy stays the same**. Energy is never created from nothing and never truly destroyed — only moved and reshaped. When a bouncing ball finally stops, its energy didn't vanish; it spread out as heat and sound. That's also why a true 'perpetual motion machine' is impossible: there's no way to get out more energy than you put in.\n\n**Friction is energy's escape hatch.** In real machines and motions, some energy always 'leaks' into thermal energy (heat) and sound, spreading out where it's hard to use again. The total is still conserved — but the useful part shrinks. That's why nothing is 100% efficient.",
        },
      },
      {
        kind: "WORKED_EXAMPLES",
        title: "Worked examples",
        content: {
          examples: [
            {
              title: "Roller-coaster energy swap",
              problem: "A coaster car has 50,000 J of gravitational potential energy at the top of a hill. Ignoring friction, what is its kinetic energy at the bottom?",
              steps: [
                "Energy is conserved: the total stays 50,000 J.",
                "At the bottom, the height (potential) is gone — converted to motion.",
                "So all 50,000 J has become kinetic energy.",
              ],
              answer: "50,000 J of kinetic energy. The potential energy of height turned entirely into the energy of motion. (Real coasters lose a little to friction, so it's slightly less.)",
            },
            {
              title: "Trace the flashlight",
              problem: "List the chain of energy transformations when you switch on a battery flashlight.",
              steps: [
                "The battery stores chemical potential energy.",
                "Switching on lets it flow as electrical energy through the bulb.",
                "The bulb converts that to light energy — and some thermal energy (it gets warm).",
              ],
              answer: "Chemical → electrical → light + thermal. The warmth you feel is the 'leaked' part — proof no transformation is perfectly efficient.",
            },
            {
              title: "Where did the bounce go?",
              problem: "A dropped ball bounces a little lower each time, then stops. Energy is conserved, so where did its energy go?",
              steps: [
                "Each bounce, some kinetic energy converts to thermal energy and sound.",
                "The ball and floor warm up slightly; you hear the 'thud'.",
                "After many bounces, all the original energy has spread out as heat and sound.",
              ],
              answer: "It became thermal energy (heat) and sound, spread into the ball, floor, and air. Nothing was destroyed — just scattered into hard-to-use forms.",
            },
          ],
        },
      },
      {
        kind: "CONCEPT_CHECK",
        title: "Quick check",
        content: { intro: "Three questions — conserve your focus." },
      },
      {
        kind: "PRACTICE",
        title: "Practice problems",
        content: { intro: "Five problems to complete Low Earth Orbit." },
      },
      {
        kind: "DEEPER_DIVE",
        title: "Deeper dive: the law that survived everything",
        content: {
          markdown:
            "Conservation of energy is one of the most tested ideas in science — and it has never once failed. Whenever it seemed to break, physicists discovered a hidden form of energy rather than abandon the law.\n\nIn the 1930s, certain radioactive decays seemed to lose a little energy. Rather than give up conservation, **Wolfgang Pauli** boldly predicted an invisible, nearly massless particle carrying the missing energy away. Decades later the **neutrino** was found — exactly as conservation demanded. Trillions are streaming through your body right now.\n\nEinstein deepened the law with $E = mc^2$: mass itself is a super-concentrated form of energy. The Sun shines by converting a tiny bit of its mass into the light that, eight minutes later, warms your face. Energy bookkeeping, on a cosmic scale, always balances.",
        },
      },
      {
        kind: "SUMMARY",
        title: "Mission summary",
        content: {
          takeaways: [
            "Energy is the ability to do work, measured in joules.",
            "Key forms: kinetic (motion), potential (stored — gravitational, elastic, chemical), thermal, light, electrical, sound.",
            "Energy constantly transforms from one form to another.",
            "Conservation of energy: the total is never created or destroyed, only reshaped.",
            "Friction leaks energy into heat and sound, so no real process is 100% efficient.",
          ],
          formulas: [{ label: "Conservation of energy", tex: "E_{before} = E_{after}" }],
        },
      },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "A moving object has which kind of energy?", options: ["Potential energy", "Kinetic energy", "Chemical energy", "No energy"], answer: 1, difficulty: 1, explanation: "Kinetic energy is the energy of motion — anything moving has it." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "A book resting on a high shelf has stored energy due to its height. This is…", options: ["kinetic energy", "gravitational potential energy", "sound energy", "electrical energy"], answer: 1, difficulty: 2, explanation: "Height stores gravitational potential energy, ready to convert to motion if the book falls." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "Energy can be created from nothing if you build a clever enough machine.", answer: false, difficulty: 2, explanation: "Conservation of energy forbids it — energy is only transformed, never created or destroyed. Perpetual motion machines are impossible." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "At the top of its track a coaster car has 80,000 J of potential energy. Ignoring friction, its kinetic energy at the bottom is about…", options: ["0 J", "40,000 J", "80,000 J", "160,000 J"], answer: 2, difficulty: 3, hint: "Total energy is conserved.", explanation: "All the potential energy converts to kinetic, so about 80,000 J — energy is conserved." },
      { scope: "PRACTICE", kind: "ORDER", prompt: "Order the energy transformations when sunlight ends up powering your bike ride.", options: ["Light energy from the Sun", "Chemical energy stored in plants (food)", "Chemical energy in your muscles", "Kinetic energy of the moving bike"], answer: [], difficulty: 3, hint: "Follow the energy from the Sun to the road.", explanation: "Sunlight → food (chemical) → muscle (chemical) → motion (kinetic): a chain of transformations, all conserving total energy." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A bouncing ball gradually stops. Conservation of energy says its energy…", options: ["was destroyed", "turned mostly into heat and sound", "turned into more height", "became new matter"], answer: 1, difficulty: 3, hint: "What warms up, and what do you hear?", explanation: "The energy spreads out as thermal energy (heat) and sound — conserved, but scattered into hard-to-use forms." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Which chain correctly describes a battery-powered toy car?", options: ["light → chemical → motion", "chemical → electrical → kinetic", "kinetic → chemical → light", "sound → electrical → chemical"], answer: 1, difficulty: 3, hint: "Start with what a battery stores.", explanation: "A battery's chemical energy becomes electrical energy in the motor, which becomes kinetic energy of the moving car." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "Because of friction, real machines always lose some energy as heat, so none are 100% efficient.", answer: true, difficulty: 2, hint: "Friction is energy's escape hatch.", explanation: "Friction converts some useful energy into spread-out thermal energy and sound, so efficiency is always below 100%." },
    ],
  },
];
