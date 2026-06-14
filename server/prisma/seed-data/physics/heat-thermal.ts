import type { LessonSeed } from "../types.js";

// Middle-school physics (grades 7–8), themed on a spacecraft's blazing sunlit
// side and frozen shadow side: temperature & thermal energy, heat transfer,
// states of matter, and energy efficiency. Data-only sections.
export const heatThermalLessons: LessonSeed[] = [
  // ─────────────────── Lesson 1: Temperature & Thermal Energy ───────────────────
  {
    slug: "temperature-and-thermal-energy",
    title: "Temperature and Thermal Energy",
    tagline: "Heat is jiggling — and there's a coldest possible cold",
    estMinutes: 15,
    xpReward: 120,
    difficulty: 3,
    sections: [
      {
        kind: "HERO",
        content: {
          scene: "sun",
          headline: "+120 °C in Sun, −150 °C in Shadow",
          sub: "On the airless Moon, the sunlit ground bakes hotter than boiling water while the shadow beside it freezes colder than Antarctica. Temperature is stranger — and simpler — than it seems.",
        },
      },
      {
        kind: "CONTEXT",
        title: "Why does this matter?",
        content: {
          markdown:
            "Cooking, weather, climate, engines, refrigerators, spacecraft design — all are about **heat**. But two everyday words get mixed up constantly: **temperature** and **heat** are not the same thing.\n\nGet the difference straight and suddenly you understand why a tiny spark can be hotter than a warm bath yet carry far less energy, why metal feels colder than wood at the same temperature, and what scientists mean by 'absolute zero,' the coldest anything can ever be.",
        },
      },
      {
        kind: "CONCEPT",
        title: "The big idea",
        content: {
          markdown:
            "**Everything is made of jiggling particles.** Atoms and molecules are always in motion — vibrating, bouncing, zipping. This particle motion is the key to heat.\n\n**Temperature measures the *average* motion of the particles.** Hotter means the particles are moving faster on average; colder means slower. We measure it in **degrees Celsius (°C)**, where water freezes at 0 and boils at 100.\n\n**Thermal energy is the *total* energy of all the particles' motion.** This depends on temperature **and** on how many particles there are. Here's the crucial difference:\n\n- A **lit sparkler** is over 1000 °C — super-fast particles — but there are very few of them, so it holds little thermal energy. The sparks land on your skin harmlessly.\n- A **warm bath** is only 40 °C — slower particles — but there are trillions upon trillions of them, so the *total* thermal energy is enormous. It would scald you to stay in boiling water.\n\nHigh temperature, low total energy (spark). Low temperature, high total energy (bath). Temperature is the *average*; thermal energy is the *grand total*.\n\n**Heat is thermal energy on the move.** 'Heat' properly means thermal energy **flowing** from a hotter object to a colder one. Heat always flows **hot → cold**, never the reverse on its own. Hold an ice cube and heat flows from your warm hand into the ice (which is why your hand feels cold) — not 'cold flowing into your hand.' Cold is just the absence of thermal energy.\n\n**There's a coldest possible temperature.** Cool something and its particles slow down. Slow them as much as physically possible — to a near standstill — and you reach **absolute zero**, about **−273 °C**, the bottom of the temperature scale. Nothing can be colder, because particles can't move less than 'barely at all.' Scientists use the **Kelvin (K)** scale, which starts at absolute zero (0 K = −273 °C).",
        },
      },
      {
        kind: "WORKED_EXAMPLES",
        title: "Worked examples",
        content: {
          examples: [
            {
              title: "Spark vs. bathtub",
              problem: "A spark is at 1000 °C; a full bathtub is at 40 °C. Which has the higher temperature, and which holds more total thermal energy?",
              steps: [
                "Temperature is the average particle speed: the spark wins easily (1000 vs 40 °C).",
                "Thermal energy is the total, which also depends on the number of particles.",
                "The bath has vastly more particles than the tiny spark.",
              ],
              answer: "The spark is hotter (higher temperature), but the bath holds far more total thermal energy — so the bath could burn you while the spark can't.",
            },
            {
              title: "Which way does heat flow?",
              problem: "You wrap your warm hands around a cold glass of soda. In which direction does thermal energy flow, and why do your hands feel cold?",
              steps: [
                "Heat always flows from hotter to colder.",
                "Your hands are warmer than the glass.",
                "So thermal energy flows out of your hands into the glass.",
              ],
              answer: "Heat flows from your hands into the cold glass. Your hands feel cold because they're losing thermal energy — not because cold is entering them.",
            },
            {
              title: "Converting to Kelvin",
              problem: "Absolute zero is about −273 °C. What is a comfortable room temperature of 27 °C on the Kelvin scale?",
              steps: [
                "Kelvin starts at absolute zero: 0 K = −273 °C.",
                "Add 273 to the Celsius value.",
                "$27 + 273 = 300$.",
              ],
              answer: "300 K. The Kelvin scale just shifts Celsius so that zero is the coldest possible temperature.",
            },
          ],
        },
      },
      {
        kind: "CONCEPT_CHECK",
        title: "Quick check",
        content: { intro: "Three questions — keep your cool." },
      },
      {
        kind: "PRACTICE",
        title: "Practice problems",
        content: { intro: "Five warm-up problems." },
      },
      {
        kind: "DEEPER_DIVE",
        title: "Deeper dive: the chase toward absolute zero",
        content: {
          markdown:
            "Physicists have spent over a century chasing absolute zero — and they can get astonishingly close, but never quite arrive. In special labs, atoms have been cooled to **billionths of a degree** above 0 K, colder than anywhere in nature, including deep space (which sits at about 2.7 K, warmed by the Big Bang's afterglow).\n\nWhy bother? Near absolute zero, matter does bizarre things: some metals become **superconductors** that carry electricity with zero resistance, and gases form a strange new state called a **Bose–Einstein condensate** where atoms blur into a single quantum blob.\n\nReaching exactly 0 K turns out to be impossible — a deep law of thermodynamics forbids it. You can get forever closer, like an asymptote you never touch. The coldest cold is a destination no one can quite reach.",
        },
      },
      {
        kind: "SUMMARY",
        title: "Mission summary",
        content: {
          takeaways: [
            "All matter is made of constantly moving particles.",
            "Temperature = average particle motion; thermal energy = total energy of all the particles.",
            "A spark is hotter than a bath, but the bath holds far more total thermal energy.",
            "Heat is thermal energy flowing from hot to cold; 'cold' is just less thermal energy.",
            "Absolute zero (≈ −273 °C, 0 K) is the coldest possible temperature.",
          ],
          formulas: [{ label: "Celsius to Kelvin", tex: "T_K = T_{°C} + 273" }],
        },
      },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Temperature is a measure of…", options: ["the total energy in an object", "the average motion of an object's particles", "how much an object weighs", "how big an object is"], answer: 1, difficulty: 2, explanation: "Temperature reflects the average speed of the particles; faster average motion means a higher temperature." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "Heat naturally flows from a colder object to a hotter one.", answer: false, difficulty: 2, explanation: "Heat always flows from hot to cold on its own. Cold is simply the absence of thermal energy." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Why might a tiny 1000 °C spark be far less dangerous than 50 °C bathwater?", options: ["The spark is colder", "The spark has very few particles, so little total thermal energy", "Water can't burn you", "Sparks aren't real heat"], answer: 1, difficulty: 3, explanation: "Despite its high temperature, the spark holds little total thermal energy because it has so few particles." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Absolute zero is about −273 °C. A warm day is 25 °C. What is that on the Kelvin scale? (Add 273.)", answer: { value: 298, tolerance: 0 }, difficulty: 2, hint: "T(K) = T(°C) + 273.", explanation: "$25 + 273 = 298$ K." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "You hold an ice cube and your hand feels cold. What is actually happening?", options: ["Cold flows from the ice into your hand", "Thermal energy flows from your hand into the ice", "Your hand makes cold", "Nothing flows"], answer: 1, difficulty: 3, hint: "Heat flows hot to cold.", explanation: "Thermal energy leaves your warmer hand and flows into the ice; that loss is what feels cold." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "Two objects can be at the same temperature but hold different amounts of total thermal energy.", answer: true, difficulty: 3, hint: "Total energy also depends on how many particles.", explanation: "Same temperature means the same average motion, but a larger object has more particles and thus more total thermal energy." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Cooling an object makes its particles…", options: ["move faster", "move slower", "disappear", "get heavier"], answer: 1, difficulty: 2, hint: "Lower temperature, less motion.", explanation: "Cooling slows the particles; cooling toward absolute zero slows them to a near standstill." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Absolute zero is special because it is the temperature at which…", options: ["water freezes", "particles have essentially the least possible motion", "metal melts", "the Sun forms"], answer: 1, difficulty: 3, hint: "It's the coldest cold.", explanation: "At absolute zero (≈ −273 °C, 0 K) particle motion is at its theoretical minimum — nothing can be colder." },
    ],
  },

  // ─────────────────── Lesson 2: Heat Transfer ───────────────────
  {
    slug: "heat-on-the-move",
    title: "Heat on the Move",
    tagline: "Conduction, convection, radiation — and how a thermos beats them all",
    estMinutes: 16,
    xpReward: 130,
    difficulty: 3,
    sections: [
      {
        kind: "HERO",
        content: {
          scene: "sun",
          headline: "How the Sun Warms You Across Empty Space",
          sub: "There's no air between here and the Sun, yet its warmth reaches your face. Heat has three ways to travel — and only one of them can cross the vacuum of space.",
        },
      },
      {
        kind: "CONTEXT",
        title: "Why does this matter?",
        content: {
          markdown:
            "Why does a metal spoon in soup get hot all the way up the handle? Why does a room warm evenly from one heater? How does the Sun's heat reach Earth across empty space? And how does a thermos keep cocoa hot for hours?\n\nEvery answer is one of three ways heat moves: **conduction, convection, and radiation**. Knowing them explains cooking, home insulation, weather, ocean currents, and how engineers stop a spacecraft from cooking on its Sun side and freezing on its shadow side.",
        },
      },
      {
        kind: "CONCEPT",
        title: "The big idea",
        content: {
          markdown:
            "Heat (thermal energy) travels from hot to cold by three methods:\n\n**1. Conduction — heat through direct contact.** Fast-jiggling particles bump into their slower neighbors, passing energy along without the material itself moving. Touch a hot pan and heat conducts into your hand. **Metals are great conductors** (their particles pass energy easily), which is why a metal handle heats up fast and metal feels cold to the touch — it's rapidly conducting heat *away* from your hand. **Wood, plastic, air, and foam are insulators** — poor conductors that slow heat down.\n\n**2. Convection — heat carried by a moving fluid.** In liquids and gases, heated material expands, becomes less dense, and **rises**; cooler material sinks to take its place, setting up a circulating **convection current**. This is how a pot of water heats throughout, how a room warms from one radiator, and how ocean currents and winds carry heat around the whole planet. (You met this exact engine driving the weather!)\n\n**3. Radiation — heat as electromagnetic waves.** Hot objects glow with infrared (and, if hot enough, visible) light, carrying energy as waves that need **no material at all**. This is the only way heat crosses the **vacuum of space**, which is how the Sun's energy reaches Earth. A campfire warms your face by radiation; so does a glowing toaster.\n\n**Beating all three: the thermos.** A vacuum flask keeps a drink hot (or cold) by fighting every path: a **vacuum** layer between two walls stops conduction and convection (no particles to carry heat), and **shiny silvered walls reflect radiation** back in. The same triple defense protects spacecraft and astronauts from wild temperature swings — multilayer insulation and reflective surfaces are a thermos scaled up for orbit.",
        },
      },
      {
        kind: "WORKED_EXAMPLES",
        title: "Worked examples",
        content: {
          examples: [
            {
              title: "Naming the method",
              problem: "Identify the type of heat transfer: (a) a metal spoon's handle getting hot in soup, (b) the Sun warming your skin, (c) hot air rising from a radiator.",
              steps: [
                "Spoon handle: heat moves through solid metal by direct contact — conduction.",
                "Sun across space: no medium, so energy travels as waves — radiation.",
                "Rising hot air circulating: a moving fluid carries heat — convection.",
              ],
              answer: "(a) conduction, (b) radiation, (c) convection — one example of each of the three methods.",
            },
            {
              title: "Why metal feels colder than wood",
              problem: "A metal bench and a wooden bench have sat outside all night at the same temperature. Why does the metal feel colder when you touch it?",
              steps: [
                "Both are at the same temperature, so neither is truly colder.",
                "Metal is a great conductor; wood is an insulator.",
                "Metal pulls heat from your hand quickly; wood barely does.",
              ],
              answer: "They're equally cold, but the metal conducts heat away from your hand far faster, so it *feels* colder. 'Feeling cold' is really 'losing heat quickly.'",
            },
            {
              title: "How the thermos wins",
              problem: "A thermos keeps cocoa hot for hours. Explain how it blocks all three kinds of heat transfer.",
              steps: [
                "A vacuum between its walls has no particles, blocking conduction and convection.",
                "Shiny silvered surfaces reflect infrared radiation back toward the drink.",
                "With every path blocked, heat escapes only very slowly.",
              ],
              answer: "Vacuum stops conduction and convection; the reflective coating stops radiation. Blocking all three keeps the cocoa hot — the same trick that thermally protects spacecraft.",
            },
          ],
        },
      },
      {
        kind: "CONCEPT_CHECK",
        title: "Quick check",
        content: { intro: "Three questions — pass them along." },
      },
      {
        kind: "PRACTICE",
        title: "Practice problems",
        content: { intro: "Transfer your knowledge to five problems." },
      },
      {
        kind: "DEEPER_DIVE",
        title: "Deeper dive: surviving reentry",
        content: {
          markdown:
            "When a spacecraft returns to Earth, it slams into the atmosphere at around 28,000 km/h. Air can't get out of the way fast enough, so it's violently compressed and heated to **thousands of degrees** — hot enough to vaporize ordinary metal.\n\nEngineers fight this with **heat shields** that exploit the physics of heat transfer. Some are made of materials that are superb **insulators**, refusing to conduct that fury inward. Others are **ablative**: they're designed to slowly char and flake away, carrying the heat off with the lost material before it can reach the crew.\n\nThe Space Shuttle wore over 20,000 individual heat-resistant tiles, each one an insulator so good you could hold its edge moments after its center glowed red-hot. Mastering conduction, convection, and radiation is, quite literally, a matter of life and death.",
        },
      },
      {
        kind: "SUMMARY",
        title: "Mission summary",
        content: {
          takeaways: [
            "Conduction: heat through direct contact (metals conduct well; wood/air/foam insulate).",
            "Convection: heat carried by a rising-and-sinking fluid (currents in water, air, oceans).",
            "Radiation: heat as electromagnetic waves — the only kind that crosses empty space (the Sun).",
            "'Feeling cold' from metal is really fast conduction pulling heat from your hand.",
            "A thermos (and spacecraft insulation) blocks all three: vacuum stops conduction/convection, shiny walls reflect radiation.",
          ],
          formulas: [{ label: "Three paths of heat", tex: "\\text{conduction} \\;\\cdot\\; \\text{convection} \\;\\cdot\\; \\text{radiation}" }],
        },
      },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Heat travelling through a solid metal bar by direct contact of particles is…", options: ["convection", "conduction", "radiation", "insulation"], answer: 1, difficulty: 2, explanation: "Conduction transfers heat by particle-to-particle contact, which metals do very well." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "How does the Sun's heat reach Earth across empty space?", options: ["Conduction", "Convection", "Radiation", "It doesn't"], answer: 2, difficulty: 2, explanation: "Only radiation (electromagnetic waves) can cross a vacuum — no medium is required." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "Warm air rising and cool air sinking to circulate heat through a room is convection.", answer: true, difficulty: 2, explanation: "Convection is heat carried by a moving fluid as warm, less-dense material rises and cool material sinks." },
      { scope: "PRACTICE", kind: "MATCHING", prompt: "Match each example to its method of heat transfer.", options: { left: ["Sun warming your face", "Hot handle of a metal pot", "Boiling water churning in a pot", "Foam cup keeping coffee warm"], right: ["Radiation", "Conduction", "Convection", "Insulation (blocks transfer)"] }, answer: ["Radiation", "Conduction", "Convection", "Insulation (blocks transfer)"], difficulty: 3, explanation: "The Sun radiates, the metal handle conducts, boiling water convects, and a foam cup insulates by blocking transfer." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "On a cold morning, a metal railing feels colder than a wooden one at the same temperature because metal…", options: ["is actually colder", "conducts heat away from your hand faster", "radiates cold", "is heavier"], answer: 1, difficulty: 3, hint: "Both are the same temperature.", explanation: "Metal conducts heat out of your hand quickly, so it feels colder even though both are equally cold." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "A vacuum is an excellent insulator against conduction and convection because it has almost no particles to carry heat.", answer: true, difficulty: 3, hint: "What do conduction and convection both need?", explanation: "Both conduction and convection need particles; a vacuum has almost none, so it blocks them — the secret of a thermos." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Which material is the best heat insulator?", options: ["Copper", "Aluminum", "Foam (with trapped air)", "Iron"], answer: 2, difficulty: 2, hint: "Metals conduct; trapped air does not.", explanation: "Foam traps air, a poor conductor, making it a good insulator; the metals are all good conductors." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A shiny, silvered surface on a thermos helps by…", options: ["conducting heat faster", "reflecting heat radiation back toward the drink", "increasing convection", "adding weight"], answer: 1, difficulty: 3, hint: "Shiny surfaces reflect infrared.", explanation: "The reflective coating bounces infrared radiation back, cutting heat loss by the one path a vacuum can't stop." },
    ],
  },

  // ─────────────────── Lesson 3: States of Matter ───────────────────
  {
    slug: "states-of-matter",
    title: "States of Matter and Changes",
    tagline: "Solid, liquid, gas, plasma — and the energy that switches them",
    estMinutes: 15,
    xpReward: 130,
    difficulty: 3,
    sections: [
      {
        kind: "HERO",
        content: {
          scene: "sun",
          headline: "Ice, Water, Steam — Same Stuff",
          sub: "Add or remove energy and matter transforms: a glacier, an ocean, and a cloud are all the same molecule wearing different states. The Sun itself is a fourth state you rarely meet.",
        },
      },
      {
        kind: "CONTEXT",
        title: "Why does this matter?",
        content: {
          markdown:
            "Water freezing into ice, puddles drying up, a kettle steaming, dry ice fogging a stage — these are **changes of state**, and they're happening everywhere, all the time. They shape weather, cooking, the water cycle, and the engines that power our world.\n\nUnderstanding states of matter — and the energy it takes to switch between them — explains why sweating cools you, why steam burns worse than boiling water, and why most of the visible universe is actually made of a state you almost never see on Earth: plasma.",
        },
      },
      {
        kind: "CONCEPT",
        title: "The big idea",
        content: {
          markdown:
            "**The state of matter depends on how its particles are arranged and how fast they move.**\n\n- **Solid** — particles packed tightly in a fixed pattern, only vibrating in place. Fixed shape and volume (ice, rock, metal).\n- **Liquid** — particles still close but free to slide past each other. Fixed volume, but takes the shape of its container (water, oil).\n- **Gas** — particles far apart, zooming freely. No fixed shape or volume; it fills whatever space it's in (steam, air).\n- **Plasma** — a super-heated gas whose atoms have been torn apart into charged pieces. It glows and responds to magnetism. Rare on Earth (lightning, neon signs) but the **most common state in the universe**: stars, including the Sun, are giant balls of plasma.\n\n**Adding energy moves you 'up' (solid → liquid → gas → plasma); removing it moves you 'down.'** The named changes:\n\n- **Melting** (solid → liquid) and **freezing** (liquid → solid).\n- **Boiling/evaporation** (liquid → gas) and **condensation** (gas → liquid).\n- **Sublimation** — solid straight to gas, skipping liquid (dry ice, and ice on a freezing-cold dry day).\n\n**The surprising part: during a change of state, the temperature holds steady.** When ice is melting, all the added energy goes into *breaking the particles loose* from their fixed pattern, not into speeding them up — so an ice-water mix stays at 0 °C until the last ice melts. This 'hidden' energy is called **latent heat**.\n\n**This is why steam burns worse than boiling water.** Steam carries all the extra energy that was poured in to turn water into gas. When it touches your skin and condenses back to liquid, it dumps that whole load of latent heat into you — far more than the same mass of 100 °C water. The same principle, run in reverse, is why **sweating cools you**: evaporating sweat carries energy away from your skin as it turns to gas.",
        },
      },
      {
        kind: "WORKED_EXAMPLES",
        title: "Worked examples",
        content: {
          examples: [
            {
              title: "Naming the change",
              problem: "Name the change of state: (a) a puddle disappearing on a sunny day, (b) dew forming on grass overnight, (c) dry ice 'smoking' without melting.",
              steps: [
                "Puddle to invisible vapor: liquid → gas.",
                "Water vapor in air becoming liquid droplets: gas → liquid.",
                "Solid carbon dioxide turning straight to gas: solid → gas.",
              ],
              answer: "(a) evaporation, (b) condensation, (c) sublimation. Adding energy drives (a) and (c); removing it drives (b).",
            },
            {
              title: "The melting plateau",
              problem: "You heat a beaker of ice-water steadily. While ice is still melting, the temperature won't rise above 0 °C. Where is the energy going?",
              steps: [
                "Added energy can speed particles up (temperature) or break their arrangement (state change).",
                "During melting, it goes into breaking ice's rigid structure.",
                "Only once all the ice has melted does added energy start raising the temperature.",
              ],
              answer: "Into latent heat — breaking the solid structure apart. The temperature stays at 0 °C until the last ice melts, then climbs again.",
            },
            {
              title: "Why steam is dangerous",
              problem: "Both are at 100 °C, yet steam burns far worse than boiling water. Why?",
              steps: [
                "Turning water to steam required pouring in latent heat.",
                "Steam carries that extra energy.",
                "Landing on skin, it condenses and releases all that latent heat into you.",
              ],
              answer: "Steam holds a large amount of latent heat from boiling. Condensing on your skin, it releases that energy as well as its 100 °C heat, causing a worse burn.",
            },
          ],
        },
      },
      {
        kind: "CONCEPT_CHECK",
        title: "Quick check",
        content: { intro: "Three questions — don't change state mid-thought." },
      },
      {
        kind: "PRACTICE",
        title: "Practice problems",
        content: { intro: "Five problems to phase through." },
      },
      {
        kind: "DEEPER_DIVE",
        title: "Deeper dive: the universe runs on plasma",
        content: {
          markdown:
            "On Earth, solids, liquids, and gases feel like the whole story — plasma seems exotic, glimpsed only in lightning, neon signs, and flames. But zoom out, and the picture flips: **over 99% of the ordinary (visible) matter in the universe is plasma.**\n\nEvery star, including our Sun, is an enormous sphere of plasma — atoms so hot their electrons have been stripped away. The glowing gas of nebulae is plasma. The solar wind streaming past Earth is plasma, and when it slams into our atmosphere near the poles it lights up the **auroras**.\n\nScientists are even trying to bottle star-stuff on Earth: **fusion reactors** heat hydrogen plasma to over 100 million °C — hotter than the Sun's core — held in place by powerful magnets, chasing the dream of clean energy from the same reaction that powers the stars.",
        },
      },
      {
        kind: "SUMMARY",
        title: "Mission summary",
        content: {
          takeaways: [
            "States of matter depend on particle arrangement and motion: solid, liquid, gas, plasma.",
            "Adding energy goes up the ladder (melting, boiling); removing it goes down (freezing, condensation).",
            "Sublimation skips liquid (dry ice: solid → gas).",
            "During a state change the temperature holds steady — energy goes into latent heat, not speeding particles up.",
            "Plasma is rare on Earth but the most common state in the universe (stars, including the Sun).",
          ],
          formulas: [{ label: "The state ladder", tex: "\\text{solid} \\leftrightarrow \\text{liquid} \\leftrightarrow \\text{gas} \\leftrightarrow \\text{plasma}" }],
        },
      },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "In which state are particles packed in a fixed pattern, only vibrating in place?", options: ["Solid", "Liquid", "Gas", "Plasma"], answer: 0, difficulty: 1, explanation: "Solids have particles locked in a fixed arrangement, giving a fixed shape and volume." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "A solid turning directly into a gas (like dry ice) is called…", options: ["melting", "condensation", "sublimation", "freezing"], answer: 2, difficulty: 2, explanation: "Sublimation is the change from solid straight to gas, skipping the liquid state." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "While ice is melting, the temperature of the ice-water mixture keeps rising steadily.", answer: false, difficulty: 3, explanation: "It holds at 0 °C while melting — the energy goes into latent heat (breaking the structure), not raising the temperature." },
      { scope: "PRACTICE", kind: "ORDER", prompt: "Order these states from the LEAST particle energy to the MOST.", options: ["Solid", "Liquid", "Gas", "Plasma"], answer: [], difficulty: 2, hint: "Adding energy moves you up the ladder.", explanation: "Least to most energy: solid → liquid → gas → plasma, the order in which adding energy changes the state." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Steam at 100 °C burns worse than water at 100 °C because steam…", options: ["is hotter", "carries extra latent heat it releases when it condenses on you", "moves faster", "is acidic"], answer: 1, difficulty: 3, hint: "Think about the energy poured in to boil it.", explanation: "Steam holds the latent heat of vaporization; condensing on skin it dumps that extra energy, worsening the burn." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Most of the ordinary matter in the universe is in which state?", options: ["Solid", "Liquid", "Gas", "Plasma"], answer: 3, difficulty: 2, hint: "Think about what stars are made of.", explanation: "Stars are plasma, and they make up over 99% of the visible matter, so plasma is the most common state." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "Sweating cools you because evaporating sweat carries energy away from your skin as it turns to gas.", answer: true, difficulty: 3, hint: "Evaporation absorbs latent heat.", explanation: "Turning liquid sweat into vapor takes energy (latent heat), drawn from your skin, which cools you." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Which describes a gas?", options: ["Fixed shape and volume", "Fixed volume, takes its container's shape", "No fixed shape or volume; fills any space", "A charged, glowing state"], answer: 2, difficulty: 2, hint: "Gas particles zoom freely.", explanation: "A gas has neither fixed shape nor volume — its fast, far-apart particles fill whatever space they're in." },
    ],
  },

  // ─────────────────── Lesson 4: Energy, Heat & Efficiency ───────────────────
  {
    slug: "energy-heat-efficiency",
    title: "Energy, Heat, and Efficiency",
    tagline: "Why every machine leaks heat — and nothing is ever perfect",
    estMinutes: 16,
    xpReward: 140,
    difficulty: 4,
    sections: [
      {
        kind: "HERO",
        content: {
          scene: "sun",
          headline: "The Tax on Every Transformation",
          sub: "Energy is never lost — yet every engine, bulb, and body pays a 'heat tax' that can never be fully refunded. This one-way leak is among the deepest laws in physics.",
        },
      },
      {
        kind: "CONTEXT",
        title: "Why does this matter?",
        content: {
          markdown:
            "You learned that energy is conserved — never created or destroyed. So why do engineers obsess over **efficiency**? Why does a phone get warm? Why can't we build a machine that runs forever?\n\nThe answer is that while energy's *total* is conserved, in every real transformation some always escapes as **low-grade heat** that spreads out and becomes hard to use again. Understanding this 'heat tax' is the key to engines, power plants, climate, and why **perpetual motion is impossible**.",
        },
      },
      {
        kind: "CONCEPT",
        title: "The big idea",
        content: {
          markdown:
            "**Two laws of energy, working together:**\n\n**Law 1 — energy is conserved.** The total amount never changes; it only transforms (you saw this with kinetic, potential, chemical, and the rest).\n\n**Law 2 — energy spreads out, and some always becomes waste heat.** In every real transformation, a portion of the energy turns into low-grade **thermal energy** that disperses into the surroundings. It's still 'there' — total energy is conserved — but it's spread too thin to do useful work. Heat is the universe's tax collector, and the tax always gets paid.\n\n**Efficiency measures how much of the input energy did the useful job:**\n\n$$\\text{efficiency} = \\frac{\\text{useful energy out}}{\\text{total energy in}} \\times 100\\%$$\n\n- An old incandescent bulb turns only about **10%** of its electrical energy into light — the other **90%** is wasted heat (they're warm to the touch!). LED bulbs reach **80–90%**, which is why they've taken over.\n- A car engine is roughly **25–30%** efficient; most of the fuel's energy roars away as heat through the exhaust and radiator.\n- A human body is about **25%** efficient at turning food energy into motion — the rest keeps you warm (handy in winter!).\n\n**Efficiency is always less than 100%.** No real machine can turn *all* its input into useful output, because some always escapes as heat. This is exactly why a **perpetual motion machine is impossible**: it would have to recycle energy with no losses forever, and the heat tax forbids it. Every 'free energy' machine ever proposed quietly breaks this law.\n\n**The deep idea — entropy.** Energy naturally flows from concentrated and useful (the chemical energy in fuel) toward spread-out and useless (warmth dispersed into the air). This one-way drift toward disorder is called **entropy**, and its steady increase even points the **arrow of time**: you can unscramble nothing for free. Improving efficiency means fighting this drift — capturing more useful energy before the tax takes its cut.",
        },
      },
      {
        kind: "WORKED_EXAMPLES",
        title: "Worked examples",
        content: {
          examples: [
            {
              title: "Calculating efficiency",
              problem: "A motor takes in 500 J of electrical energy and delivers 350 J of useful mechanical energy. What is its efficiency?",
              steps: [
                "Use efficiency = useful out ÷ total in × 100%.",
                "$= \\dfrac{350}{500} \\times 100\\%$.",
                "$= 70\\%$.",
              ],
              answer: "70% efficient. The other 150 J (30%) escaped as waste heat and sound — the unavoidable tax.",
            },
            {
              title: "Where the bulb's energy goes",
              problem: "An old incandescent bulb is about 10% efficient at making light. If it draws 60 J of electrical energy each second, how much becomes light, and what happens to the rest?",
              steps: [
                "Useful light = 10% of 60 J.",
                "$0.10 \\times 60 = 6$ J of light per second.",
                "The remaining 54 J becomes heat.",
              ],
              answer: "Only about 6 J/s becomes light; 54 J/s is wasted as heat — which is why old bulbs are hot and LEDs (80–90% efficient) replaced them.",
            },
            {
              title: "Why perpetual motion fails",
              problem: "An inventor claims a wheel that, once spun, will turn forever and even power a light. Using the laws of energy, what's wrong?",
              steps: [
                "Friction and air resistance always convert some motion to waste heat.",
                "That heat spreads out and can't be fully recovered.",
                "So the wheel loses usable energy every cycle and must slow down.",
              ],
              answer: "It violates the heat tax (Law 2). Energy is conserved, but losses to heat mean the wheel can't sustain itself — let alone power anything extra. Perpetual motion is impossible.",
            },
          ],
        },
      },
      {
        kind: "CONCEPT_CHECK",
        title: "Quick check",
        content: { intro: "Three questions — spend your energy wisely." },
      },
      {
        kind: "PRACTICE",
        title: "Practice problems",
        content: { intro: "Five problems to finish the Sunlit Side — and middle-school physics!" },
      },
      {
        kind: "DEEPER_DIVE",
        title: "Deeper dive: the engine that taught us the law",
        content: {
          markdown:
            "The science of energy and heat — **thermodynamics** — was born not in a lab but in the smoke and clamor of the Industrial Revolution. Engineers building steam engines desperately wanted to know: how much work can we squeeze from a given amount of burning coal? Is there a limit?\n\nIn 1824 a young French engineer, **Sadi Carnot**, proved there is. No engine, however cleverly built, can convert all its heat into work — there's a hard ceiling set by the temperatures it runs between. From his analysis grew the **second law of thermodynamics** and the concept of **entropy**.\n\nThe lesson echoes far beyond engines. Entropy's relentless increase is why heat won't flow uphill on its own, why we age, and why time runs in one direction. A practical question about coal and steam led to one of the most profound truths in all of science.",
        },
      },
      {
        kind: "SUMMARY",
        title: "Mission summary",
        content: {
          takeaways: [
            "Energy is conserved (total never changes), but every real transformation leaks some as waste heat.",
            "Efficiency = useful energy out ÷ total energy in × 100%, always less than 100%.",
            "Examples: old bulbs ~10%, car engines ~25–30%, LEDs ~80–90%.",
            "Perpetual motion machines are impossible because the 'heat tax' can never be avoided.",
            "Entropy — the spreading of energy toward disorder — even sets the arrow of time.",
          ],
          formulas: [{ label: "Efficiency", tex: "\\text{efficiency} = \\frac{\\text{useful out}}{\\text{total in}} \\times 100\\%" }],
        },
      },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "In a real machine, some input energy always escapes as waste heat.", answer: true, difficulty: 2, explanation: "Every real transformation loses some energy to low-grade heat that spreads out — the unavoidable 'heat tax'." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Efficiency is the ratio of…", options: ["total energy in to useful energy out", "useful energy out to total energy in", "heat to light", "force to distance"], answer: 1, difficulty: 2, explanation: "Efficiency = useful energy out ÷ total energy in, often written as a percentage." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Why is a perpetual motion machine impossible?", options: ["Magnets are too weak", "Some energy is always lost to heat, so it can't sustain itself", "It would spin too fast", "Gravity stops it"], answer: 1, difficulty: 3, explanation: "Unavoidable losses to waste heat mean usable energy drains away each cycle — it can't run forever." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A machine takes in 200 J and produces 150 J of useful energy. What is its efficiency, as a percent?", answer: { value: 75, tolerance: 0 }, difficulty: 2, hint: "useful ÷ total × 100.", explanation: "$\\dfrac{150}{200} \\times 100 = 75\\%$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A bulb draws 50 J of electrical energy and emits 5 J as light. What is its efficiency, as a percent?", answer: { value: 10, tolerance: 0 }, difficulty: 3, hint: "Light is the useful output.", explanation: "$\\dfrac{5}{50} \\times 100 = 10\\%$ — typical of an old incandescent bulb; the other 90% is heat." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "An LED bulb feels much cooler than an old incandescent bulb of the same brightness because the LED…", options: ["makes colder light", "wastes far less energy as heat", "uses no energy", "reflects heat away"], answer: 1, difficulty: 3, hint: "Higher efficiency means less waste heat.", explanation: "LEDs convert most of their energy to light (high efficiency), so little is wasted as heat — they stay cool." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "When fuel burns in a car engine, most of its energy ends up as useful motion.", answer: false, difficulty: 3, hint: "Car engines are only ~25–30% efficient.", explanation: "Only about a quarter to a third becomes motion; most of the fuel's energy leaves as waste heat through the exhaust and radiator." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "The natural one-way spreading of energy from useful toward disordered, low-grade heat is measured by…", options: ["efficiency", "entropy", "momentum", "power"], answer: 1, difficulty: 4, hint: "It also points the arrow of time.", explanation: "Entropy measures the spreading toward disorder; its steady increase even sets the direction of time." },
    ],
  },
];
