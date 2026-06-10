import type { LessonSeed } from "./types.js";

export const atmosphereLessons: LessonSeed[] = [
  // ───────────────────────── Lesson 1: The Ocean of Air ─────────────────────────
  {
    slug: "the-ocean-of-air",
    title: "The Ocean of Air",
    tagline: "Air has weight — and you live at the bottom of a 100 km deep ocean of it",
    estMinutes: 15,
    xpReward: 120,
    sections: [
      {
        kind: "HERO",
        content: {
          scene: "atmosphere",
          headline: "You Live Underwater (Sort Of)",
          sub: "Above your head right now: a column of air 100 kilometers tall, pressing down with the weight of a small car per square meter. Why aren't you crushed?",
        },
      },
      {
        kind: "CONTEXT",
        title: "Why does this matter?",
        content: {
          markdown:
            "Air seems like nothing. You can't see it, can't grab it, walk through it like it isn't there. For most of history, people assumed air weighed nothing at all.\n\nThey were spectacularly wrong. Air is **stuff** — trillions of tiny molecules of nitrogen and oxygen zipping around and bumping into everything. And stuff has **weight**. The entire blanket of air wrapped around Earth — the **atmosphere** — weighs about five and a half **quadrillion tonnes**.\n\nThat weight explains why your ears pop in elevators and airplanes, why bags of chips puff up on mountain drives, how drinking straws actually work, and why weather forecasters obsess over 'high pressure' and 'low pressure.' Welcome to the bottom of the ocean of air.",
        },
      },
      {
        kind: "CONCEPT",
        title: "The big idea",
        content: {
          markdown:
            "**Air is matter.** It's made of molecules — far too small to see, but real. A bedroom's worth of air weighs about as much as a house cat. An empty school gym holds roughly a few hundred kilograms of air. 'Empty' is never really empty.\n\n**Air pressure is the weight of all the air above you.** Stack books on your hand: each added book presses harder. Now realize the atmosphere is a stack about **100 kilometers tall**, and you're at the bottom. All that air pushes on you with a pressure scientists measure as about **101 kilopascals (kPa)** at sea level — roughly **1 kilogram pressing on every square centimeter** of your body, or ten tonnes on a desk!\n\n**So why aren't you crushed?** Two reasons. First, air pushes in **all directions** — down, up, and sideways — because its molecules fly every which way. The pushes on each side of your hand balance out. Second, the air *inside* you (lungs, ears, blood) pushes **outward** with the same pressure. Inside push equals outside push: you feel nothing. You only notice pressure when it gets **unbalanced** — like when an elevator ride leaves old-pressure air trapped in your ears. The 'pop' is your inner ear equalizing. Equilibrium restored!\n\n**Pressure drops as you climb.** Go up a mountain and there's less air left above you, so the stack weighs less. The rule of thumb: pressure roughly **halves every 5.5 km** you climb.\n\n- Sea level: ~100 kPa\n- 5.5 km (higher than most mountains): ~50 kPa\n- 11 km (airliner cruising height): ~25 kPa\n- 100 km: nearly zero — the official edge of space (the **Kármán line**).\n\nThat's why mountaineers on Everest carry oxygen tanks, why airplane cabins are pressurized, and why a sealed chip bag from the seaside puffs up like a balloon in the mountains: the air **inside** the bag keeps its push, while the air outside pushes back less. Unbalanced pressure always wins arguments.",
        },
      },
      {
        kind: "SIMULATION",
        title: "Try it: pressure elevator",
        content: {
          simId: "air-pressure",
          intro:
            "Ride from the beach to the edge of space. Watch the pressure gauge fall, the air molecules thin out, and the sealed balloon swell as the outside push weakens.",
        },
      },
      {
        kind: "WORKED_EXAMPLES",
        title: "Worked examples",
        content: {
          examples: [
            {
              title: "Pressure at cruising altitude",
              problem: "Air pressure is about 100 kPa at sea level and roughly halves every 5.5 km. Estimate the pressure outside an airliner at 11 km.",
              steps: [
                "11 km is two 'halvings': 5.5 km + 5.5 km.",
                "First halving: 100 kPa → 50 kPa at 5.5 km.",
                "Second halving: 50 kPa → 25 kPa at 11 km.",
              ],
              answer: "About 25 kPa — a quarter of sea-level pressure. This is why cabins must be pressurized for passengers.",
            },
            {
              title: "The crushed bottle",
              problem: "Aisha seals an empty plastic bottle on a mountaintop, then drives down to the beach. At the bottom, the bottle is crumpled and dented. Who crushed it?",
              steps: [
                "Sealed at altitude, the bottle traps thin, low-pressure mountain air inside.",
                "At sea level, the outside air pushes with full ~100 kPa.",
                "Inside push (weak) < outside push (strong) — the imbalance squeezes the bottle.",
              ],
              answer: "The atmosphere did. The stronger sea-level air outside out-pushed the weak mountain air trapped inside and crumpled the bottle.",
            },
            {
              title: "How a straw really works",
              problem: "People say you 'suck' juice up a straw. What actually pushes the juice into your mouth?",
              steps: [
                "Sucking removes air from inside the straw, lowering the pressure there.",
                "The atmosphere still presses with full force down on the juice in the cup.",
                "That outside push shoves juice up the straw toward the low-pressure zone.",
              ],
              answer: "Atmospheric pressure pushes the juice up. A straw is really a pressure-imbalance machine — in true vacuum-of-space, straws wouldn't work at all.",
            },
          ],
        },
      },
      {
        kind: "VIDEOS",
        title: "Watch and wonder",
        content: {
          videos: [
            { youtubeId: "ZGPakIZQhIs", title: "Air Pressure in 5 Minutes" },
            { youtubeId: "SeN1VdG1v_0", title: "Weather School 4 Kids: Air Pressure" },
          ],
        },
      },
      {
        kind: "CONCEPT_CHECK",
        title: "Quick check",
        content: { intro: "No pressure… okay, a little pressure. Three questions." },
      },
      {
        kind: "PRACTICE",
        title: "Practice problems",
        content: { intro: "Take a deep breath (of matter!) and dive in." },
      },
      {
        kind: "DEEPER_DIVE",
        title: "Deeper dive: the horses that couldn't",
        content: {
          markdown:
            "In 1654, German scientist **Otto von Guericke** staged one of the greatest demos in history. He fitted two copper half-spheres together, pumped the air **out** of the inside… and invited two teams of horses to pull them apart.\n\nSixteen horses heaved. The spheres held.\n\nNothing was gluing them — nothing was *inside at all*. The atmosphere outside was simply pressing the halves together with tonnes of force, with no inside air to push back. When von Guericke opened a valve and let air hiss back in, the spheres fell apart in his hands.\n\nThe 'Magdeburg hemispheres' proved the invisible ocean is mighty. Every vacuum cleaner, suction cup, and drinking straw is a tiny tribute to those sixteen confused horses.",
        },
      },
      {
        kind: "SUMMARY",
        title: "Mission summary",
        content: {
          takeaways: [
            "Air is matter — it has mass and weight.",
            "Air pressure is the weight of the air above pressing on everything, in all directions: ~101 kPa at sea level.",
            "You aren't crushed because pressure pushes equally from all sides, and from inside you too.",
            "Pressure drops with altitude — roughly halving every 5.5 km — fading to ~zero at the 100 km Kármán line.",
            "Unbalanced pressure does work: it pops ears, crushes bottles, and pushes juice up straws.",
          ],
          formulas: [{ label: "Halving rule", tex: "P(h) \\approx 100\\ \\text{kPa} \\times \\left(\\tfrac{1}{2}\\right)^{h/5.5\\,\\text{km}}" }],
        },
      },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "Air has weight.", answer: true, explanation: "Air is made of molecules — real matter. The whole atmosphere weighs about 5.5 quadrillion tonnes." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "What is air pressure?", options: ["The temperature of air", "The push from the weight of air above and around us", "Wind speed", "How clean the air is"], answer: 1, explanation: "Air pressure is the push of air's weight — about 1 kg per square centimeter at sea level, in every direction." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "As you climb a tall mountain, air pressure…", options: ["increases", "stays exactly the same", "decreases", "reverses direction"], answer: 2, explanation: "Higher up, there's less air stacked above you, so the pressure drops — roughly halving every 5.5 km." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Why doesn't the atmosphere's huge pressure crush your body?", options: ["Skin is pressure-proof armor", "Air pushes equally from all sides, and your insides push back out", "The pressure only pushes downward", "Gravity cancels it"], answer: 1, hint: "Think balance: inside vs. outside.", explanation: "Pressure acts in all directions, and the air and fluids inside you push outward just as hard — balanced pushes feel like nothing." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Sea-level pressure is about 100 kPa, and it roughly halves every 5.5 km. Estimate the pressure (in kPa) at 16.5 km — three halvings up.", answer: { value: 12.5, tolerance: 2 }, hint: "Halve 100 three times.", explanation: "100 → 50 → 25 → 12.5 kPa. At 16.5 km, only about an eighth of the atmosphere remains above you." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A sealed bag of chips from the seaside puffs up in the mountains because…", options: ["the chips release gas when excited", "the inside air keeps its push while the outside push weakens", "mountain cold expands plastic", "gravity is weaker up high"], answer: 1, hint: "Which side of the bag changed?", explanation: "The trapped sea-level air inside still pushes hard; the thin mountain air outside pushes back less. The imbalance inflates the bag." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "When you drink through a straw, what moves the juice upward?", options: ["Your tongue's lifting power", "The juice's desire to be drunk", "Atmospheric pressure pushing on the juice in the cup", "Static electricity"], answer: 2, hint: "You only removed air from the straw…", explanation: "Lowering the pressure inside the straw lets the full atmospheric push on the cup's surface shove juice up the tube." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "Your ears pop in a fast elevator because the air pressure outside your eardrum changed before the air inside caught up.", answer: true, hint: "Pop = equalize.", explanation: "Exactly — the pop is trapped inner-ear air equalizing with the new outside pressure, rebalancing the pushes on your eardrum." },
    ],
  },

  // ───────────────────────── Lesson 2: Weather and Wind ─────────────────────────
  {
    slug: "weather-and-wind",
    title: "Weather and Wind",
    tagline: "The Sun-powered engine that stirs the ocean of air",
    estMinutes: 15,
    xpReward: 120,
    sections: [
      {
        kind: "HERO",
        content: {
          scene: "atmosphere",
          headline: "The Restless Ocean",
          sub: "Wind has knocked over trees, sailed ships around the planet, and is probably ruffling a flag near you right now. But what *is* wind — and who keeps pushing it?",
        },
      },
      {
        kind: "CONTEXT",
        title: "Why does this matter?",
        content: {
          markdown:
            "Weather decides whether your soccer game happens, what you wear, and what farmers can grow. Severe weather — storms, hurricanes, heat waves — shapes lives around the world. Forecasting it accurately saves thousands of lives every year.\n\nAnd remarkably, almost all of it — every breeze, cloud, and thunderstorm — is powered by a single engine: **the Sun heating the Earth unevenly**. Master that one idea, and the daily weather report transforms from mysterious jargon ('a low-pressure system is moving in…') into a story you can actually follow.",
        },
      },
      {
        kind: "CONCEPT",
        title: "The big idea",
        content: {
          markdown:
            "Three gears make the weather engine turn:\n\n**Gear 1: The Sun heats Earth unevenly.** Sunlight warms dark pavement faster than grass, land faster than the sea, and the equator far more than the poles. The air sitting above warm ground gets warmed too — Earth's surface acts like a stove burner under the ocean of air.\n\n**Gear 2: Warm air rises, cool air sinks.** When air warms, its molecules zip around faster and spread out — the air becomes **less dense** (lighter for its size), so it floats upward through the cooler air around it, exactly like a bubble rising in water or a hot-air balloon lifting off. Cool, denser air sinks to take its place. This endless vertical loop is called **convection**.\n\n**Gear 3: Wind is air rushing from high pressure to low pressure.** Where air rises, less air is left pressing on the ground — a **low-pressure** zone. Where air sinks and piles up, pressure runs **high**. And air, like a crowd leaving a stadium, always flows from the packed place to the empty place: **from high pressure toward low pressure. That horizontal flow is wind.** Bigger pressure difference = faster wind. A hurricane is simply this engine running at terrifying full throttle around an extreme low.\n\n**See all three gears at the beach.** On a sunny afternoon, land heats up faster than the sea. Air over the land warms and rises (low pressure on land); cooler, heavier sea air slides in to replace it. That's the famous afternoon **sea breeze**, blowing from water to land. At night the engine reverses: land cools quickly, the sea stays warm, and a gentle **land breeze** drifts out to sea. One beach, a complete weather system in miniature.\n\n**Bonus gear: rising air builds clouds.** Rising warm air carries invisible water vapor upward. High up, it cools, and the vapor condenses into countless droplets — a **cloud**. Pile up enough rising, moist air and you get rain. So next time you see a towering summer cloud, you're watching Gear 2 in action, kilometers tall.",
        },
      },
      {
        kind: "SIMULATION",
        title: "Try it: breeze machine",
        content: {
          simId: "sea-breeze",
          intro:
            "Heat the day with the sunshine slider and watch the convection loop spin up: warm air rising over land, cool sea air sliding in underneath. Then switch to night and watch the whole engine run backwards.",
        },
      },
      {
        kind: "WORKED_EXAMPLES",
        title: "Worked examples",
        content: {
          examples: [
            {
              title: "Which way does the flag point?",
              problem: "It's a hot, sunny afternoon at the beach. Which way does the breeze blow — from sea to land, or land to sea?",
              steps: [
                "Sun heats land faster than water; air over land warms and rises.",
                "Rising air leaves lower pressure over the land.",
                "Cooler, denser sea air flows in toward that low pressure.",
              ],
              answer: "From sea to land — the classic afternoon sea breeze. Flags on the beach flap inland.",
            },
            {
              title: "The radiator loop",
              problem: "A heater sits under a window on one side of a room, yet the whole room warms up. Trace the air's journey.",
              steps: [
                "Air touching the heater warms, becomes less dense, and rises to the ceiling.",
                "It drifts across the ceiling, cooling as it goes, then sinks on the far side.",
                "Cool floor-level air flows back toward the heater to be warmed in turn — a convection loop.",
              ],
              answer: "A circulating loop: up at the heater, across the ceiling, down the far wall, back along the floor. The room is a tiny atmosphere.",
            },
            {
              title: "Reading the forecast",
              problem: "The forecaster says: 'A strong low-pressure system arrives tomorrow.' Should you expect calm sunshine or wind and possible rain — and why?",
              steps: [
                "A low means air is rising there, and surrounding air rushes inward — that's wind.",
                "Rising air cools, and its moisture condenses into clouds.",
                "Lots of rising, moist air often means rain.",
              ],
              answer: "Wind and likely rain. Lows = rising air = wind, clouds, and wet weather. Highs, with their gently sinking air, usually bring calm, clear skies.",
            },
          ],
        },
      },
      {
        kind: "VIDEOS",
        title: "Watch and wonder",
        content: {
          videos: [
            { youtubeId: "SeN1VdG1v_0", title: "Weather School 4 Kids: Air Pressure" },
            { youtubeId: "pHrCSuiz3c0", title: "Air Pressure Lesson for Kids" },
          ],
        },
      },
      {
        kind: "CONCEPT_CHECK",
        title: "Quick check",
        content: { intro: "A quick gust of three questions." },
      },
      {
        kind: "PRACTICE",
        title: "Practice problems",
        content: { intro: "Forecast: a 100% chance of physics." },
      },
      {
        kind: "DEEPER_DIVE",
        title: "Deeper dive: the wind that circles the world",
        content: {
          markdown:
            "Scale the beach breeze up to the whole planet. The equator is Earth's permanent 'hot land,' the poles its permanent 'cool sea.' Giant convection loops form, with warm equatorial air rising and flowing poleward high above, while cooler air returns along the surface.\n\nBut there's a twist — literally. Because the **Earth is spinning** (remember the great carousel?), these planet-sized winds get deflected sideways as they travel, an effect called the **Coriolis effect**. The result: steady wind highways like the **trade winds**, which sailors rode west across the Atlantic for centuries, and the **jet streams** — rivers of air 10 km up, screaming along at 200+ km/h, which is why your flight east is faster than your flight west.\n\nEvery local breeze belongs to this single, planet-wide, Sun-powered, spin-twisted machine. Meteorologists model it with supercomputers; you now understand its gears.",
        },
      },
      {
        kind: "SUMMARY",
        title: "Mission summary",
        content: {
          takeaways: [
            "The Sun heats Earth's surface unevenly — that's the energy source for all weather.",
            "Warm air is less dense and rises; cool air is denser and sinks (convection).",
            "Rising air creates low pressure; sinking, piling air creates high pressure.",
            "Wind is air flowing from high pressure to low pressure — bigger difference, stronger wind.",
            "Sea breeze by day, land breeze by night; rising moist air builds clouds and rain.",
          ],
          formulas: [{ label: "Wind rule", tex: "\\text{wind: } P_{high} \\longrightarrow P_{low}" }],
        },
      },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "What is wind?", options: ["Air made of special wind molecules", "Air moving from high pressure toward low pressure", "The Earth exhaling", "Sound waves you can feel"], answer: 1, explanation: "Wind is ordinary air on the move, flowing from where pressure is high to where it's low." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "Warm air sinks and cold air rises.", answer: false, explanation: "It's the other way around: warm air is less dense and rises; cool, denser air sinks." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "What is the energy source that powers Earth's weather?", options: ["The Moon", "Earth's hot core", "The Sun", "Ocean salt"], answer: 2, explanation: "The Sun's uneven heating of Earth's surface drives convection, pressure differences, and therefore all wind and weather." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "On a sunny afternoon, why does the sea breeze blow from the water toward the land?", options: ["Fish push the air", "Waves splash air ashore", "Warm air rises over the hot land and cool sea air flows in to replace it", "The sea is higher than the land"], answer: 2, hint: "Which heats faster, sand or sea?", explanation: "Land heats faster, its air rises (low pressure), and the cooler, denser air over the sea slides inland to fill the gap." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A hot-air balloon rises because the heated air inside it is…", options: ["heavier than outside air", "less dense than outside air", "magnetic", "full of helium"], answer: 1, hint: "Same reason warm air rises anywhere.", explanation: "Heating spreads the air's molecules out, making it less dense than the surrounding cool air — so it floats upward, balloon and all." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "A bigger difference in pressure between two places makes a stronger wind between them.", answer: true, hint: "Think of a crowded room with one open door vs. a whole open wall.", explanation: "The pressure difference is the push. Small difference, gentle breeze; huge difference, storm-force winds." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Clouds form when rising warm air…", options: ["catches fire", "cools down and its water vapor condenses into droplets", "freezes the sky", "collides with the Moon"], answer: 1, hint: "What happens to the invisible moisture as the air climbs and cools?", explanation: "As rising air cools high above the ground, the invisible water vapor it carries condenses into billions of tiny droplets — a cloud." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "The forecast shows a HIGH pressure system parked over your town this weekend. Most likely weather?", options: ["Calm and clear", "Hurricane", "Constant thunderstorms", "Snow, regardless of season"], answer: 0, hint: "What is the air doing in a high — rising or gently sinking?", explanation: "In high-pressure zones air slowly sinks, which suppresses clouds — typically calm, fair weather. Lows bring the wind and rain." },
    ],
  },

  // ──────────────────────── Lesson 3: Why Is the Sky Blue? ────────────────────────
  {
    slug: "why-is-the-sky-blue",
    title: "Why Is the Sky Blue?",
    tagline: "Sunlight, scattered — and why sunsets burn orange",
    estMinutes: 14,
    xpReward: 120,
    sections: [
      {
        kind: "HERO",
        content: {
          scene: "atmosphere",
          headline: "The Color of Air",
          sub: "The most-asked science question in history has a real answer — and the same answer explains blue noons, orange sunsets, and the black sky of the Moon.",
        },
      },
      {
        kind: "CONTEXT",
        title: "Why does this matter?",
        content: {
          markdown:
            "Every kid on Earth has asked it. Most adults still can't answer it. Yet 'why is the sky blue?' is a real physics question with a beautiful, complete answer — one that was only nailed down about 150 years ago by the physicist **Lord Rayleigh**.\n\nThe answer is bigger than one color. It explains why sunsets glow orange and red, why the Moon's daytime sky is dead black, why distant mountains look hazy and bluish, and even helps explain why Mars has a butterscotch sky. One mechanism, half the beauty in the sky.",
        },
      },
      {
        kind: "CONCEPT",
        title: "The big idea",
        content: {
          markdown:
            "**Step 1: Sunlight is secretly every color at once.** The Sun's white light is a mixture of all the rainbow's colors — red, orange, yellow, green, blue, violet — blended together. A prism (or raindrops making a rainbow) can unmix them. Each color is a light wave with a different **wavelength**: red waves are long and lazy; blue and violet waves are short and choppy.\n\n**Step 2: Air bumps light around.** The atmosphere is full of molecules (mostly nitrogen). When sunlight streams through, the light waves jostle these molecules, and the molecules fling some of the light off in random new directions. This is called **scattering**.\n\n**Step 3: Here's the secret — blue scatters far more than red.** Short, choppy waves get bounced around much more easily than long, lazy ones. Blue light scatters roughly **ten times more** than red light. (Violet scatters even more, but the Sun sends less violet and our eyes are weak at seeing it — so blue wins.)\n\n**Put it together:** as sunlight crosses the sky, its blue part gets knocked around the atmosphere again and again, bouncing molecule to molecule, until blue light is raining down on you **from every direction of the sky**. Look anywhere away from the Sun and you see that scattered blue. **The sky is blue because you're seeing sunlight's blue, bounced down to your eyes by the air itself.**\n\n**Now the sunset trick.** At noon, sunlight punches almost straight down through the atmosphere — a short trip. But at sunrise and sunset, the Sun sits on the horizon, and its light must **slice sideways through hundreds of kilometers of air** to reach you — a journey dozens of times longer. Along that marathon, almost *all* the blue (and even the green) gets scattered away to other places, leaving what survives the trip: **orange and red**. The Sun blushes, and clouds catch the leftover fire.\n\n**Final proof: remove the air.** No air, no scattering, no color. On the Moon — as you saw in World 1 — the Sun blazes in a pitch-black daytime sky. Astronauts orbiting Earth watch our thin glowing blue rim from above: the atmosphere itself, doing its scattering trick, visible from space.",
        },
      },
      {
        kind: "SIMULATION",
        title: "Try it: sunset machine",
        content: {
          simId: "sky-scatter",
          intro:
            "Drag the Sun across the sky. Watch the light's path through the atmosphere stretch as the Sun drops — and watch the sky shift from noon blue to sunset fire as the blue gets scattered away.",
        },
      },
      {
        kind: "WORKED_EXAMPLES",
        title: "Worked examples",
        content: {
          examples: [
            {
              title: "Noon vs. sunset",
              problem: "Explain, using path length, why the same Sun looks white-yellow at noon but deep orange at sunset.",
              steps: [
                "At noon, light crosses the atmosphere almost vertically — the shortest possible path.",
                "Only some blue is scattered out; the remaining mix still looks white-yellow.",
                "At sunset the path through air is dozens of times longer, so nearly all the short-wavelength light (blue, then green) is scattered away en route.",
              ],
              answer: "The long sunset path strips out the blues and greens, leaving the long-wavelength survivors — orange and red — to reach your eyes.",
            },
            {
              title: "The Moon's black noon",
              problem: "The Sun shines on the Moon just as it shines on Earth. Why is the Moon's daytime sky black instead of blue?",
              steps: [
                "A blue sky requires something to scatter sunlight across the dome of the sky.",
                "The scatterers on Earth are air molecules.",
                "The Moon has no atmosphere — nothing to bounce the light around.",
              ],
              answer: "No air, no scattering: sunlight travels in straight lines, the Sun glares fiercely, and the rest of the sky stays black.",
            },
            {
              title: "Blue mountains",
              problem: "From far away, distant mountain ranges often look hazy and bluish. Connect this to sky physics.",
              steps: [
                "Between you and a far mountain lie many kilometers of air.",
                "That air scatters sunlight — preferentially blue — into your line of sight.",
                "The farther the mountain, the more scattered blue light is layered over its image.",
              ],
              answer: "You're seeing a 'mini-sky' of scattered blue light added between you and the mountains. The Blue Ridge Mountains are literally named for Rayleigh scattering.",
            },
          ],
        },
      },
      {
        kind: "VIDEOS",
        title: "Watch and wonder",
        content: {
          videos: [
            { youtubeId: "bcVr13Fw7w8", title: "Why Is the Sky Blue? | SciShow Kids" },
            { youtubeId: "ehUIlhKhzDA", title: "Why Is the Sky Blue? | NASA Space Place" },
          ],
        },
      },
      {
        kind: "CONCEPT_CHECK",
        title: "Quick check",
        content: { intro: "Three questions, clear skies." },
      },
      {
        kind: "PRACTICE",
        title: "Practice problems",
        content: { intro: "Scatter these correctly and the lesson is yours." },
      },
      {
        kind: "DEEPER_DIVE",
        title: "Deeper dive: skies of other worlds",
        content: {
          markdown:
            "Change the atmosphere, change the sky.\n\n**Mars** has an ultra-thin atmosphere of carbon dioxide laced with fine rusty dust. The dust scatters light differently than gas molecules do: the Martian daytime sky glows a **butterscotch tan** — and at sunset, the area around the Sun turns **blue**. Mars has blue sunsets! NASA's rovers have photographed them.\n\n**Titan**, Saturn's giant moon, is wrapped in a thick orange smog of nitrogen and hydrocarbons — its sky is a deep orange murk where the Sun is just a brighter patch.\n\nAstronomers now study the colors of skies on **exoplanets** — worlds orbiting other stars — by analyzing starlight that filters through their atmospheres. The same Rayleigh physics you just learned is one of the tools being used, right now, to search distant skies for signs of life.",
        },
      },
      {
        kind: "SUMMARY",
        title: "Mission summary",
        content: {
          takeaways: [
            "White sunlight is a mix of all colors, each with a different wavelength.",
            "Air molecules scatter sunlight — short blue wavelengths about ten times more than long red ones (Rayleigh scattering).",
            "The sky is blue because scattered blue sunlight reaches your eyes from every direction.",
            "Sunsets are orange-red because the long sideways path scatters the blues and greens away first.",
            "No atmosphere means no scattering: the Moon's daytime sky is black.",
          ],
          formulas: [{ label: "Rayleigh's law", tex: "\\text{scattering} \\propto \\frac{1}{\\lambda^4}\\quad(\\text{shorter } \\lambda \\Rightarrow \\text{much more scattering})" }],
        },
      },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "Sunlight is actually a mixture of all the rainbow's colors.", answer: true, explanation: "White light is all colors blended; prisms and raindrops can unmix it into a rainbow." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "The sky is blue because air molecules…", options: ["are painted blue", "scatter blue light much more than red light", "reflect the ocean", "absorb every color except blue"], answer: 1, explanation: "Short blue wavelengths are scattered all over the sky by air molecules, so blue arrives at your eyes from every direction. (The ocean reflection story is a myth!)" },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Which color of light gets scattered the LEAST by air?", options: ["Blue", "Violet", "Green", "Red"], answer: 3, explanation: "Long, lazy red wavelengths slip through air with the least scattering — which is exactly why they survive the long sunset journey." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Why does the setting Sun look orange-red?", options: ["The Sun cools down in the evening", "Its light crosses a much longer stretch of air, which scatters the blue away", "Dust from the day settles on it", "Our eyes get tired of blue"], answer: 1, hint: "Compare the light's path at noon vs. at the horizon.", explanation: "Near the horizon, sunlight slices sideways through far more atmosphere. The blues and greens scatter away along the route, leaving orange and red to arrive." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "An astronaut on the Moon looks up at noon. The sky is…", options: ["blue, like Earth's", "black", "orange", "green"], answer: 1, hint: "What does the Moon lack?", explanation: "No atmosphere means nothing to scatter sunlight across the sky. The Sun blazes against blackness." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "The sky is blue because it reflects the color of the oceans.", answer: false, hint: "Would landlocked deserts have blue skies?", explanation: "A popular myth! Skies are blue over deserts and oceans alike, because the cause is scattering by air molecules — not reflection from water." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Distant mountains often look bluish because…", options: ["mountains are made of blue rock", "the many kilometers of air in between scatter blue light into your view", "snow turns blue at a distance", "your eyes lose focus"], answer: 1, hint: "There's a 'mini-sky' between you and the peaks.", explanation: "All that intervening air does its usual trick, layering scattered blue light over the distant view — atmospheric perspective." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Violet light scatters even more than blue, yet the sky doesn't look violet. One big reason is…", options: ["violet light is illegal", "the Sun emits less violet and our eyes detect it poorly", "violet is too heavy to stay up", "clouds eat violet"], answer: 1, hint: "Think about both the source (Sun) and the detector (your eyes).", explanation: "The Sun's light contains less violet than blue, and human eyes are far more sensitive to blue — so the sky's mixture looks blue to us." },
    ],
  },

  // ──────────────────── Lesson 4: How Air Holds Planes Up ────────────────────
  {
    slug: "how-air-holds-planes-up",
    title: "How Air Holds Planes Up",
    tagline: "Lift — the deal a wing makes with the ocean of air",
    estMinutes: 15,
    xpReward: 120,
    sections: [
      {
        kind: "HERO",
        content: {
          scene: "atmosphere",
          headline: "500 Tonnes, Airborne",
          sub: "A loaded jumbo jet weighs as much as a herd of 80 elephants — and the sky holds it up for ten hours straight. The sky is stronger than it looks.",
        },
      },
      {
        kind: "CONTEXT",
        title: "Why does this matter?",
        content: {
          markdown:
            "For all of history, humans watched birds and ached to fly. Legends warned it was impossible — wax wings melting in the Sun. Then, on a cold December morning in 1903, the **Wright brothers** flew a homemade machine for 12 seconds over a North Carolina beach, and the world changed forever.\n\nToday over 100,000 flights take off every day. None of it is magic, and none of it works without the previous three lessons: planes fly by making a **deal with the air** — the very air whose weight, pressure, and motion you've just mastered. Time to cash in everything you've learned.",
        },
      },
      {
        kind: "CONCEPT",
        title: "The big idea",
        content: {
          markdown:
            "**Air is substantial — so it can push hard.** You learned air has mass and presses with real force. Stick your hand out a car window (carefully!): at highway speed, the air shoves your hand like a living thing. A wing is a machine for organizing that shove.\n\n**Four forces wrestle over every plane:**\n\n- **Weight** — gravity pulling the plane down (old friend!).\n- **Lift** — the upward push from air on the wings.\n- **Thrust** — engines pushing the plane forward.\n- **Drag** — air resistance pulling backward (the same force that slowed your flat sheet of paper).\n\nTo fly level, **lift must equal weight**. To hold speed, **thrust must equal drag**. Flying is a balancing act between these four, every second.\n\n**So where does lift come from?** Two views of the same deal:\n\n**View 1 — the push-back (Newton).** A wing is tilted and shaped so that, as it slices forward, it **deflects huge amounts of air downward** — both off its bottom surface and by pulling air down along its curved top. And remember the rule from Pushes and Pulls: *every push gets a push back.* The wing throws air **down**; the air throws the wing **up**. A big airliner's wings hurl tonnes of air downward every second — that's the upward shove holding 500 tonnes aloft.\n\n**View 2 — the pressure difference (Bernoulli).** Air sweeping over the wing's curved top moves faster than the air below, and faster-moving air presses more weakly. Result: **strong pressure below, weak pressure above** — a net upward squeeze. Try it yourself: hold a strip of paper to your lips, drooping down, and blow hard across its **top**. The strip rises! You weakened the pressure above it, and the still air below pushed it up.\n\nBoth views are correct — they're two descriptions of one event: the wing organizing the air.\n\n**The two levers of lift:** go **faster** (more air handled per second — this is why planes need long runways to build speed before lifting off) or meet **more air** (bigger wings, or thicker air). Which explains two famous facts: planes climbing into the thin air at 11 km must fly far faster to grip enough air… and on the airless Moon, no wing, propeller, or helicopter can work *at all*. Rockets only fly there because they bring their own push — throwing fuel down instead of air.",
        },
      },
      {
        kind: "SIMULATION",
        title: "Try it: wind tunnel",
        content: {
          simId: "wing-lift",
          intro:
            "Throttle up the airspeed and tilt the wing. Watch the lift arrow grow until it beats weight — takeoff! Then thin out the air to high-altitude levels and see how much speed it takes to stay flying.",
        },
      },
      {
        kind: "WORKED_EXAMPLES",
        title: "Worked examples",
        content: {
          examples: [
            {
              title: "The four-force checkup",
              problem: "A plane is cruising in a perfectly straight line at constant speed and constant height. Compare its four forces.",
              steps: [
                "Constant height means the vertical forces balance: lift = weight.",
                "Constant speed means the horizontal forces balance: thrust = drag.",
                "Any imbalance would mean climbing/sinking or speeding up/slowing down.",
              ],
              answer: "Lift equals weight, and thrust equals drag. Steady flight is a perfect four-way tie.",
            },
            {
              title: "Why runways are long",
              problem: "A jet sits at the start of a 3 km runway. Why can't it simply lift straight up the moment its engines roar?",
              steps: [
                "Lift comes from wings moving through air — no forward speed, no air deflected, no lift.",
                "Lift grows as speed grows: the wings handle more air each second.",
                "The runway is where the plane builds speed until lift finally exceeds weight.",
              ],
              answer: "Wings only work with airflow. The runway lets the plane accelerate until its wings deflect enough air downward for lift to beat its weight — rotation, and up it goes.",
            },
            {
              title: "Helicopter on the Moon?",
              problem: "Could a powerful helicopter fly on the Moon? Could a rocket? Explain the difference.",
              steps: [
                "A helicopter's spinning blades are wings: they fly by throwing AIR downward.",
                "The Moon has no air to throw — the blades would spin uselessly in vacuum.",
                "A rocket carries its own material to throw: it hurls burning fuel downward and gets pushed up in return.",
              ],
              answer: "Helicopter: impossible — nothing to push against. Rocket: works perfectly, because it brings its own 'air' in the form of fuel. (Mars, with its thin air, needed NASA's Ingenuity helicopter to have huge, fast blades — and it flew!)",
            },
          ],
        },
      },
      {
        kind: "VIDEOS",
        title: "Watch and wonder",
        content: {
          videos: [
            { youtubeId: "VLpSxHwfU04", title: "How Airplanes Fly! | SciShow Kids" },
            { youtubeId: "nKKjItiSBDQ", title: "How Does an Airplane Fly? | AumSum" },
            { youtubeId: "UUBk_vmgRXY", title: "How Do Airplanes Work? | Brain Candy TV" },
          ],
        },
      },
      {
        kind: "CONCEPT_CHECK",
        title: "Quick check",
        content: { intro: "Pre-flight check: three questions before takeoff." },
      },
      {
        kind: "PRACTICE",
        title: "Practice problems",
        content: { intro: "Final approach — five problems to complete the Atmosphere world!" },
      },
      {
        kind: "DEEPER_DIVE",
        title: "Deeper dive: the first 12 seconds",
        content: {
          markdown:
            "On December 17, 1903, at Kitty Hawk, North Carolina, Orville Wright lay flat on the wing of the *Flyer* while his brother Wilbur steadied the wingtip. The engine — built in their bicycle shop — clattered to life. The first flight lasted **12 seconds** and covered **37 meters**: shorter than the economy cabin of a modern 747.\n\nWhat made the brothers succeed where famous, well-funded scientists failed? **They tested everything.** Distrusting published data, they built their own **wind tunnel** out of a wooden box and a fan, and measured lift on over 200 miniature wing shapes through a long winter. They flew over a thousand glider flights before ever adding an engine. Their real invention wasn't just the plane — it was the modern method of aerospace engineering: *measure, test, revise.*\n\nSixty-six years separate Kitty Hawk's 12 seconds from boots on the Moon. The same air you breathed today taught humanity to fly.",
        },
      },
      {
        kind: "SUMMARY",
        title: "Mission summary",
        content: {
          takeaways: [
            "Four forces govern flight: lift up, weight down, thrust forward, drag back.",
            "Level flight at steady speed means lift = weight and thrust = drag.",
            "Wings make lift by deflecting air downward — the air pushes back up (and pressure above the wing is lower than below).",
            "More speed or more (denser) air means more lift — hence long runways, and faster flight in thin high-altitude air.",
            "No air, no lift: wings are useless on the Moon, which is why we go there on rockets.",
          ],
          formulas: [{ label: "Steady flight", tex: "L = W \\quad \\text{and} \\quad T = D" }],
        },
      },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Which four forces act on a flying plane?", options: ["Lift, weight, thrust, drag", "Lift, magnetism, heat, sound", "Weight, friction, light, wind", "Thrust, gravity, bounce, glow"], answer: 0, explanation: "Lift (up), weight (down), thrust (forward), and drag (backward) — flight is the contest between these four." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "For a plane to fly level, its lift must equal its weight.", answer: true, explanation: "Balanced vertical forces mean no climbing or sinking — lift exactly cancels weight in level flight." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "A wing creates lift mainly by…", options: ["being lighter than air, like a balloon", "deflecting air downward so the air pushes the wing up", "flapping", "magnetically repelling the ground"], answer: 1, explanation: "The wing throws air down; by the push-back rule, the air throws the wing up. (Equivalently: lower pressure above, higher below.)" },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Why does a jet need a long runway before takeoff?", options: ["To warm up its tires", "To build enough speed for its wings to generate lift greater than its weight", "Pilots enjoy the view", "To use up extra fuel"], answer: 1, hint: "No airflow over the wings means no…?", explanation: "Wings only lift when air flows over them. The runway run builds the speed at which deflected air finally out-pushes the plane's weight." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "You blow hard across the TOP of a drooping paper strip and it rises. Why?", options: ["Your breath is hot and heat lifts paper", "Fast air on top means lower pressure there, so the still air below pushes the strip up", "Sound waves lift it", "Paper is magnetic"], answer: 1, hint: "Fast-moving air presses more…?", explanation: "Speeding up the air above lowers its pressure; the unchanged, stronger pressure beneath pushes the strip upward — a wing in miniature." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "A helicopter with a powerful enough engine could fly on the Moon.", answer: false, hint: "What do spinning blades push against?", explanation: "Rotor blades fly by throwing air downward. The Moon has no air to throw — only rockets, which hurl their own fuel, can 'push' in a vacuum." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "At 11 km altitude the air is about four times thinner than at sea level. To keep enough lift, high-flying jets must…", options: ["fly much faster", "fly much slower", "turn off their engines", "open the windows"], answer: 0, hint: "Two levers of lift: speed and amount of air.", explanation: "Thin air means less air met per second — the jet compensates with speed, handling more of the thin air every second to keep lift equal to weight." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A plane's thrust becomes greater than its drag while lift still equals weight. What happens?", options: ["It speeds up", "It slows down", "It sinks", "Nothing"], answer: 0, hint: "Which pair of forces went out of balance — vertical or horizontal?", explanation: "The horizontal tug-of-war is now won by thrust, so the plane accelerates forward. The balanced vertical pair keeps it level while it does." },
    ],
  },
];
