import type { LessonSeed } from "../types.js";

/**
 * Black Holes (undergraduate): general relativity — gravity as the curvature of
 * spacetime. The equivalence principle & curved spacetime, and black holes with
 * the Schwarzschild radius. Conceptual with NUMERIC/SYMBOLIC. All original.
 */
export const generalRelativityLessons: LessonSeed[] = [
  // ───────────────────────── 1. Curved Spacetime ─────────────────────────
  {
    slug: "curved-spacetime",
    title: "Curved Spacetime",
    tagline: "Gravity is geometry",
    estMinutes: 16,
    xpReward: 200,
    difficulty: 5,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "Mass Tells Space How to Curve", sub: "Einstein's deepest idea: gravity isn't a force pulling through space — it's the shape of space and time themselves." } },
      { kind: "CONTEXT", title: "Beyond Newton", content: { markdown: "Newton's gravity is astonishingly accurate, but it has a puzzle: how does the Sun reach across empty space to pull the Earth, instantly? Einstein's **general relativity** dissolves the puzzle by reimagining gravity entirely — not as a force, but as the **curvature of spacetime**, the stage on which black holes are written." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "General relativity rests on the **equivalence principle**: being in a gravitational field is locally indistinguishable from accelerating. Standing on Earth feels exactly like riding an accelerating rocket — so gravity and acceleration are the same thing.\n\nFrom this, Einstein concluded that **mass and energy curve spacetime**, and objects in free fall simply follow the straightest possible paths (**geodesics**) through that curved geometry. Summarized by Wheeler:\n\n> *Spacetime tells matter how to move; matter tells spacetime how to curve.*\n\nPredictions, all confirmed:\n\n- **Light bends** near mass (gravitational lensing).\n- **Time runs slower** in stronger gravity (gravitational time dilation — your GPS corrects for it).\n- **Orbits precess**, explaining Mercury's anomaly that Newton couldn't.\n\nGravity, in this view, is not a force at all — it's the geometry of the universe." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Equivalence", problem: "How does standing on Earth relate to accelerating?", steps: ["Both feel identical locally.", "Equivalence principle."], answer: "Gravity ≈ acceleration." },
        { title: "Light and gravity", problem: "Does gravity affect light?", steps: ["Light follows spacetime geodesics.", "Curved near mass."], answer: "Yes — light bends (lensing)." },
        { title: "Time", problem: "Where do clocks run slower?", steps: ["Stronger gravity = more time dilation.", "Lower clocks tick slow."], answer: "Deeper in a gravity well." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Gravity = curved spacetime; equivalence principle." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Reason about curvature, light, and time." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: the Einstein field equations", content: { markdown: "All of this is captured in one compact line, the **Einstein field equations**: $G_{\\mu\\nu} = \\dfrac{8\\pi G}{c^4} T_{\\mu\\nu}$. The left side ($G_{\\mu\\nu}$) measures the curvature of spacetime; the right side ($T_{\\mu\\nu}$) measures the energy and momentum present. The equation says, precisely, that energy curves geometry. Its solutions describe everything from the expanding universe to gravitational waves — ripples in spacetime detected by LIGO in 2015, exactly a century after Einstein predicted them." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Equivalence principle: gravity is locally like acceleration.", "Mass-energy curves spacetime; free objects follow geodesics.", "Gravity is geometry, not a force.", "Predictions: light bending, gravitational time dilation, orbit precession.", "The Einstein field equations relate curvature to energy."], formulas: [{ label: "Einstein field equations", tex: "G_{\\mu\\nu} = \\dfrac{8\\pi G}{c^4} T_{\\mu\\nu}" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "In general relativity, gravity is:", options: ["a pulling force", "the curvature of spacetime", "magnetism", "an illusion of speed"], answer: 1, explanation: "Gravity is spacetime curvature." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "The equivalence principle says gravity is locally indistinguishable from acceleration.", answer: true, explanation: "That is exactly the equivalence principle." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Near a massive object, light:", options: ["speeds up", "bends", "stops", "is unaffected"], answer: 1, explanation: "Light follows curved geodesics — gravitational lensing." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "Clocks run slower in stronger gravitational fields.", answer: true, hint: "Gravitational time dilation.", explanation: "GPS satellites must correct for this effect." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Objects in free fall follow paths called:", options: ["tangents", "geodesics", "asymptotes", "secants"], answer: 1, hint: "Straightest paths in curved spacetime.", explanation: "Free-fall paths are geodesics." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "General relativity explained the precession of Mercury's orbit that Newton's theory could not.", answer: true, hint: "A famous early success.", explanation: "GR precisely accounts for Mercury's perihelion precession." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Ripples in spacetime, detected by LIGO in 2015, are:", options: ["sound waves", "gravitational waves", "radio waves", "light waves"], answer: 1, hint: "Predicted by Einstein.", explanation: "Gravitational waves are propagating spacetime curvature." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "In the field equations, the source of curvature is:", options: ["temperature", "energy and momentum", "electric charge", "color"], answer: 1, hint: "The right-hand side $T_{\\mu\\nu}$.", explanation: "Energy-momentum curves spacetime." },
    ],
  },

  // ───────────────────────── 2. Black Holes ─────────────────────────
  {
    slug: "black-holes-and-the-event-horizon",
    title: "Black Holes & the Event Horizon",
    tagline: "Where escape becomes impossible",
    estMinutes: 16,
    xpReward: 200,
    difficulty: 5,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "The Point of No Return", sub: "Curve spacetime steeply enough and not even light can climb out. That boundary is the event horizon." } },
      { kind: "CONTEXT", title: "When gravity wins", content: { markdown: "When a massive star's core collapses and no pressure can stop it, spacetime curves so steeply that a region forms from which **nothing escapes** — a **black hole**. It is general relativity taken to its logical extreme, and a real object we have now photographed." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "**Escape velocity** is the speed needed to break free of a mass. Pack enough mass into a small enough radius and the escape velocity reaches the speed of light $c$ — beyond that boundary, nothing, not even light, can escape. That is a **black hole**.\n\nThe boundary is the **event horizon**, at the **Schwarzschild radius**:\n\n$$r_s = \\frac{2GM}{c^2}.$$\n\nIt is proportional to mass: double the mass, double the horizon. For the Sun, $r_s \\approx 3\\,\\text{km}$; for Earth, about $9\\,\\text{mm}$.\n\n- Cross the horizon and all paths lead inward to the **singularity** — the future itself points down.\n- The horizon isn't a surface of matter; it's a boundary in spacetime.\n- **Hawking radiation:** quantum effects let black holes slowly evaporate, the deepest known link between gravity, quantum mechanics, and thermodynamics." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Scaling", problem: "If a black hole's mass doubles, what happens to $r_s$?", steps: ["$r_s = 2GM/c^2 \\propto M$.", "Doubles."], answer: "The Schwarzschild radius doubles." },
        { title: "What is the horizon?", problem: "Is the event horizon a physical wall?", steps: ["No matter there.", "A boundary in spacetime."], answer: "A one-way boundary, not a surface." },
        { title: "Why black?", problem: "Why does no light escape?", steps: ["Escape velocity exceeds $c$.", "Nothing can go faster than light."], answer: "Light itself can't climb out." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Event horizon at $r_s = 2GM/c^2$." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Use the proportionality $r_s \\propto M$." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: information and the firewall", content: { markdown: "Hawking radiation creates a deep paradox. If a black hole evaporates completely, what happens to the information about everything that fell in? Quantum mechanics insists information can't be destroyed; relativity seems to say it's lost. This **black hole information paradox** is one of the sharpest unsolved problems in physics, and resolving it is widely believed to require a full theory of **quantum gravity** — the unfinished marriage of general relativity and quantum mechanics." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["A black hole's escape velocity exceeds the speed of light.", "The event horizon is the boundary of no return.", "Schwarzschild radius $r_s = 2GM/c^2$, proportional to mass.", "Inside, all paths lead to the singularity.", "Hawking radiation makes black holes slowly evaporate."], formulas: [{ label: "Schwarzschild radius", tex: "r_s = \\dfrac{2GM}{c^2}" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "The event horizon of a black hole is:", options: ["a solid surface", "the boundary of no return", "its center", "made of light"], answer: 1, explanation: "It's the boundary beyond which nothing escapes." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "The Schwarzschild radius is proportional to:", options: ["$M^2$", "$M$", "$1/M$", "$\\sqrt{M}$"], answer: 1, explanation: "$r_s = 2GM/c^2 \\propto M$." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "Not even light can escape from within the event horizon.", answer: true, explanation: "Escape velocity there exceeds $c$." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "Write the Schwarzschild radius $r_s$ in terms of $G$, $M$, and $c$. (Type like `2*G*M/c^2`.)", answer: { expr: "2*G*M/c^2", vars: ["G", "M", "c"] }, difficulty: 4, hint: "Two G M over c squared.", explanation: "$r_s = \\dfrac{2GM}{c^2}$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "If a black hole's mass triples, its Schwarzschild radius becomes:", options: ["unchanged", "3× larger", "9× larger", "1/3"], answer: 1, hint: "$r_s \\propto M$.", explanation: "Linear in mass — triples." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Hawking radiation implies black holes:", options: ["last forever", "slowly evaporate", "grow without limit", "emit no energy"], answer: 1, hint: "A quantum effect at the horizon.", explanation: "They radiate and slowly lose mass." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "Reconciling black hole evaporation with quantum mechanics points to a need for quantum gravity.", answer: true, hint: "The information paradox.", explanation: "It's a key motivation for quantum gravity." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A black hole forms when a mass is compressed within its:", options: ["orbital radius", "Schwarzschild radius", "wavelength", "half-life"], answer: 1, hint: "Inside the horizon.", explanation: "Compression within $r_s$ creates a black hole." },
    ],
  },

  // ───────────────────────── 3. The Equivalence Principle ─────────────────────────
  {
    slug: "the-equivalence-principle",
    title: "The Equivalence Principle",
    tagline: "Einstein's happiest thought",
    estMinutes: 15,
    xpReward: 180,
    difficulty: 5,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "Falling Feels Like Floating", sub: "Einstein realized that a person in free fall feels no gravity at all — the seed that grew into a new theory of gravity." } },
      { kind: "CONTEXT", title: "The thought behind the theory", content: { markdown: "Before the curved spacetime of black holes comes the simple insight that made it possible. Einstein called it his 'happiest thought': there is no experiment, done in a small sealed box, that can tell **gravity** apart from **acceleration**. From that, all of general relativity unfolds." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "The **equivalence principle**: locally, gravity and acceleration are indistinguishable.\n\n- In a windowless lift accelerating upward in deep space at $9.8\\,\\text{m/s}^2$, you feel pressed to the floor exactly as if standing on Earth.\n- In a lift falling freely, you float — gravity seems to vanish. This is **weightlessness**: astronauts in orbit aren't beyond gravity, they're in continuous free fall.\n\nA deep clue hides here: an object's **inertial mass** (its resistance to acceleration, from $F = ma$) exactly equals its **gravitational mass** (how strongly gravity pulls it). Because they're equal, **all objects fall at the same rate** regardless of mass — Galileo's hammer and feather, confirmed on the airless Moon by Apollo 15.\n\nEinstein's leap: if free fall erases gravity, then gravity isn't a force in the usual sense — it's what motion looks like in **curved spacetime**. Light, too, must bend in gravity, a prediction confirmed in 1919 by starlight deflected near the eclipsed Sun, making Einstein world-famous overnight." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Lift vs. planet", problem: "Can a sealed-box experiment tell gravity from acceleration?", steps: ["Both press you to the floor identically.", "No local experiment distinguishes them."], answer: "No — that is the equivalence principle." },
        { title: "Why astronauts float", problem: "Are orbiting astronauts beyond Earth's gravity?", steps: ["Gravity is still strong in orbit.", "They are in continuous free fall."], answer: "No — they float because they're freely falling." },
        { title: "Equal fall rates", problem: "Why do all objects fall at the same rate in a vacuum?", steps: ["Inertial mass equals gravitational mass.", "The mass cancels in the motion."], answer: "Because the two kinds of mass are equal." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Gravity ≈ acceleration; free fall ≈ weightlessness." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Reason with the equivalence principle." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: testing equivalence to extremes", content: { markdown: "The equality of inertial and gravitational mass has been tested to staggering precision — better than one part in a trillion — by experiments from torsion balances to the satellite **MICROSCOPE**. If the tiniest difference were ever found, it would crack open general relativity and hint at new physics. So far, equivalence holds perfectly, and even lunar laser ranging confirms the Earth and Moon 'fall' toward the Sun at the same rate." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Equivalence principle: locally, gravity and acceleration are indistinguishable.", "Free fall feels like weightlessness; orbiting astronauts are in free fall.", "Inertial mass equals gravitational mass, so all objects fall at the same rate.", "Gravity is reinterpreted as motion through curved spacetime.", "Gravity bends light — confirmed in the 1919 eclipse."], formulas: [{ label: "Equal masses", tex: "m_{inertial} = m_{gravitational}" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "Inside a small sealed box, you cannot tell uniform acceleration apart from gravity.", answer: true, difficulty: 3, explanation: "That indistinguishability is the equivalence principle." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Astronauts on the Space Station float because they are:", options: ["beyond Earth's gravity", "in continuous free fall", "weightless by magnetism", "moving slowly"], answer: 1, difficulty: 3, explanation: "Gravity is strong there; they free-fall around the Earth, so they float." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "All objects fall at the same rate in a vacuum because:", options: ["air helps them", "inertial mass equals gravitational mass", "heavy things resist gravity", "gravity ignores mass entirely"], answer: 1, difficulty: 4, explanation: "The equality of the two masses makes the fall rate independent of mass." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "General relativity predicts that gravity bends the path of light.", answer: true, difficulty: 3, hint: "Confirmed in 1919.", explanation: "Starlight bending near the Sun confirmed the prediction." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A lift accelerating upward in deep space at 9.8 m/s² would make an occupant feel:", options: ["weightless", "as if standing on Earth", "crushed flat", "nothing"], answer: 1, difficulty: 3, hint: "Equivalence principle.", explanation: "The acceleration mimics Earth's gravity exactly." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Einstein's 'happiest thought' led him to view gravity as:", options: ["a magnetic force", "the curvature of spacetime", "friction", "a kind of light"], answer: 1, difficulty: 3, hint: "Free fall erases gravity.", explanation: "Gravity becomes geometry — motion through curved spacetime." },
    ],
  },

  // ───────────────────────── 4. Gravitational Time Dilation & Waves ─────────────────────────
  {
    slug: "gravitational-time-dilation",
    title: "Gravitational Time Dilation & Waves",
    tagline: "Clocks slow in gravity, and spacetime can ripple",
    estMinutes: 16,
    xpReward: 190,
    difficulty: 5,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "Your Head Ages Faster Than Your Feet", sub: "Time runs slower deeper in a gravitational field — by a sliver on Earth, dramatically near a black hole." } },
      { kind: "CONTEXT", title: "When spacetime curves and shakes", content: { markdown: "If gravity is curved spacetime, then it must warp **time** as well as space — and a violent rearrangement of mass should send **ripples** through spacetime itself. Both predictions are now confirmed, one in your phone's GPS, the other by detecting colliding black holes." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "**Gravitational time dilation.** Clocks run **slower** where gravity is stronger (deeper in a gravitational well). A clock at sea level ticks slightly slower than one on a mountaintop. The effect is tiny on Earth but real — and near a black hole's horizon, time nearly stops as seen from far away.\n\n**GPS proves it daily.** Satellite clocks run faster (weaker gravity up high) and slower (their orbital speed, special relativity) — net, they gain about $38$ microseconds per day. Uncorrected, GPS would drift kilometers off within hours. Your phone's navigation is a working relativity experiment.\n\n**Gravitational waves.** When massive objects accelerate violently — two black holes spiralling together — they radiate **ripples in spacetime** that stretch and squeeze space as they pass, travelling at the speed of light. In 2015, **LIGO** detected such a wave from two merging black holes a billion light-years away, stretching its 4 km arms by less than the width of a proton. Predicted by Einstein in 1916, confirmed a century later — and opening a brand-new way to observe the universe, by listening instead of looking." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Which clock is slower?", problem: "Compare a clock at sea level with one on a mountaintop.", steps: ["Stronger gravity slows clocks.", "Sea level is deeper in the well."], answer: "The sea-level clock runs slightly slower." },
        { title: "Why GPS needs relativity", problem: "What happens if GPS ignores relativity?", steps: ["Satellite clocks drift by tens of microseconds/day.", "Position errors grow to kilometers."], answer: "Navigation fails without the correction." },
        { title: "What LIGO detects", problem: "What are gravitational waves?", steps: ["Accelerating masses ripple spacetime.", "The ripples stretch and squeeze space."], answer: "Ripples in spacetime, travelling at light speed." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Gravity slows time; merging masses ripple spacetime." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Reason about gravitational time and waves." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: multi-messenger astronomy", content: { markdown: "In 2017, LIGO caught gravitational waves from two colliding **neutron stars**, and telescopes worldwide swung to the same patch of sky to catch the light, gamma rays, and X-rays from the same event. For the first time, the universe was observed in both gravitational waves and light at once — **multi-messenger astronomy**. The collision was seen forging gold and platinum, confirming where the heaviest elements come from. A new sense has been added to astronomy." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Clocks run slower where gravity is stronger (gravitational time dilation).", "GPS satellites correct for relativity (~38 microseconds/day) to stay accurate.", "Near a black hole horizon, time nearly stops as seen from afar.", "Accelerating masses emit gravitational waves — ripples in spacetime at light speed.", "LIGO's 2015 detection confirmed Einstein's 1916 prediction and opened gravitational-wave astronomy."], formulas: [{ label: "Ripples at light speed", tex: "v_{gw} = c" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Where do clocks run slowest?", options: ["where gravity is weakest", "where gravity is strongest", "clocks run the same everywhere", "only in space"], answer: 1, difficulty: 3, explanation: "Stronger gravity (deeper in the well) slows time." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "GPS satellites must account for relativistic time effects to stay accurate.", answer: true, difficulty: 3, explanation: "Without correction (~38 microseconds/day), positions drift kilometers off." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Gravitational waves are:", options: ["sound waves in space", "ripples in spacetime from accelerating masses", "light from stars", "magnetic pulses"], answer: 1, difficulty: 3, explanation: "Violently accelerating masses radiate spacetime ripples." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Gravitational waves travel at:", options: ["the speed of sound", "the speed of light", "twice light speed", "any speed"], answer: 1, difficulty: 3, hint: "Same as light.", explanation: "They propagate at the speed of light." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "LIGO first directly detected gravitational waves from two merging black holes in 2015.", answer: true, difficulty: 2, hint: "A century after Einstein predicted them.", explanation: "The 2015 detection confirmed Einstein's 1916 prediction." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Near a black hole's event horizon, a distant observer sees a falling clock:", options: ["speed up", "slow nearly to a stop", "run normally", "run backward"], answer: 1, difficulty: 4, hint: "Extreme gravitational time dilation.", explanation: "Time appears to freeze at the horizon as seen from far away." },
    ],
  },
];
