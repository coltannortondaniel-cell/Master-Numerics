import type { LessonSeed } from "../types.js";

/**
 * Galaxy Clusters (graduate): thermodynamics & statistical mechanics — the
 * physics of heat and disorder, governing the hot X-ray gas that fills a
 * cluster. Temperature, heat & the gas laws, and entropy & the second law.
 * NUMERIC/SYMBOLIC led. All original content.
 */
export const thermodynamicsLessons: LessonSeed[] = [
  // ───────────────────────── 1. Temperature, Heat & Gases ─────────────────────────
  {
    slug: "temperature-heat-and-gases",
    title: "Temperature, Heat & Gases",
    tagline: "The motion behind warmth",
    estMinutes: 16,
    xpReward: 190,
    difficulty: 5,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "Heat Is Motion", sub: "Temperature measures the average jiggling of particles; heat is energy flowing because of a temperature difference." } },
      { kind: "CONTEXT", title: "The hottest gas in the universe", content: { markdown: "The space between galaxies in a cluster is filled with gas at tens of millions of degrees, glowing in X-rays. To understand such a system — or a steam engine, or a star — we need **thermodynamics**: the physics of temperature, heat, and the statistical behavior of countless particles." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "**Temperature** measures the average **kinetic energy** of a substance's particles. **Heat** $Q$ is energy transferred *because of* a temperature difference, and it always flows from hot to cold.\n\nThe **absolute (Kelvin)** scale starts at **absolute zero** ($0\\,\\text{K} = -273^\\circ\\text{C}$), where particle motion is minimal.\n\nFor an **ideal gas**, pressure $P$, volume $V$, and temperature $T$ obey the **ideal gas law**:\n\n$$PV = nRT,$$\n\nwhere $n$ is the amount of gas and $R$ the gas constant. Consequences at fixed amount:\n\n- At constant $T$: $P$ and $V$ trade off ($PV$ constant) — squeeze a gas and pressure rises.\n- At constant $V$: heating raises pressure ($P \\propto T$).\n\n**Kinetic theory** explains why: pressure is just countless molecules drumming on the walls, and raising $T$ makes them hit harder and more often." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Heat flow", problem: "Which way does heat flow between a hot and cold object in contact?", steps: ["Always hot → cold.", "Until equal temperature."], answer: "From hot to cold." },
        { title: "Boyle's behavior", problem: "At constant T, you halve a gas's volume. What happens to pressure?", steps: ["$PV$ constant.", "Half V → double P."], answer: "Pressure doubles." },
        { title: "Absolute zero", problem: "What is special about 0 K?", steps: ["Lowest possible temperature.", "Minimal particle motion."], answer: "Particle motion is minimized." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Temperature = average KE; $PV = nRT$." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Apply the gas law and heat-flow direction." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: the statistical view", content: { markdown: "**Statistical mechanics** derives the gas law and temperature from the behavior of $10^{23}$ particles. Their speeds follow the **Maxwell–Boltzmann distribution**, and temperature is precisely a measure of the spread of that distribution. This bridge — from the random motion of individual particles to the smooth laws of pressure and temperature — is one of physics' great unifications, connecting mechanics, probability, and thermodynamics into one framework." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Temperature measures average particle kinetic energy.", "Heat flows from hot to cold.", "Kelvin starts at absolute zero ($-273°C$).", "Ideal gas law: $PV = nRT$.", "At constant T, P and V trade off; statistical mechanics underlies it all."], formulas: [{ label: "Ideal gas law", tex: "PV = nRT" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Temperature is a measure of the average:", options: ["mass of particles", "kinetic energy of particles", "size of particles", "charge of particles"], answer: 1, explanation: "Temperature reflects average particle kinetic energy." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Heat always flows:", options: ["cold to hot", "hot to cold", "in both directions equally", "only upward"], answer: 1, explanation: "Spontaneously from hot to cold." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "The ideal gas law is:", options: ["$PV = nRT$", "$P = IR$", "$E = mc^2$", "$F = ma$"], answer: 0, explanation: "$PV = nRT$." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "Solve the ideal gas law for pressure $P$ in terms of $n$, $R$, $T$, $V$. (Type like `n*R*T/V`.)", answer: { expr: "n*R*T/V", vars: ["n", "R", "T", "V"] }, difficulty: 4, hint: "Divide $nRT$ by $V$.", explanation: "$P = \\dfrac{nRT}{V}$." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "At constant temperature, halving a gas's volume doubles its pressure.", answer: true, hint: "$PV$ stays constant.", explanation: "Boyle's law behavior: $P \\propto 1/V$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Absolute zero is approximately what temperature in degrees Celsius? (give the magnitude, e.g. 273 for −273)", answer: { value: 273, tolerance: 1 }, hint: "$0\\,K = -273°C$.", explanation: "$0\\,\\text{K} \\approx -273^\\circ\\text{C}$." },
      { scope: "PRACTICE", kind: "GRAPH", prompt: "At fixed volume and amount (constant set to 1), pressure vs temperature is $P = T$. Graph it (enter $P$ as a function of $T$, use $x$ for $T$).", answer: { expr: "x", domain: [0, 5], variable: "x" }, difficulty: 3, hint: "$P \\propto T$ — a line.", explanation: "At constant $V$, $P$ is proportional to $T$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Pressure of a gas on its container arises from:", options: ["gravity", "molecules colliding with the walls", "magnetism", "light"], answer: 1, hint: "Kinetic theory.", explanation: "Countless molecular impacts create pressure." },
    ],
  },

  // ───────────────────────── 2. Entropy & the Second Law ─────────────────────────
  {
    slug: "entropy-and-the-second-law",
    title: "Entropy & the Second Law",
    tagline: "Why time has a direction",
    estMinutes: 15,
    xpReward: 180,
    difficulty: 5,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "Disorder Always Wins", sub: "The one law that knows the difference between past and future: entropy never decreases." } },
      { kind: "CONTEXT", title: "The arrow of time", content: { markdown: "Drop a glass and it shatters; you never see shards leap back together. Heat spreads out; it never spontaneously concentrates. This one-way character of nature is the **second law of thermodynamics**, and it is woven from a single quantity: **entropy**." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "**Entropy** $S$ measures the disorder of a system — more precisely, the number of microscopic arrangements consistent with its overall state.\n\nThe **second law of thermodynamics:** the total entropy of an isolated system never decreases.\n\n$$\\Delta S_{\\text{total}} \\ge 0.$$\n\nConsequences:\n\n- Heat flows hot → cold because that spreads energy out, raising entropy.\n- No engine can convert heat **entirely** into work — some is always 'lost' to entropy. The best possible efficiency is the **Carnot limit**, set by the hot and cold temperatures.\n- Order can increase **locally** (a fridge, a growing organism) only by dumping *more* entropy into the surroundings.\n\nEntropy gives time its **arrow**: the future is the direction of increasing entropy. It is the deep reason perpetual-motion machines are impossible." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Direction", problem: "Why does heat flow hot to cold, never the reverse?", steps: ["Spreading energy raises entropy.", "Second law favors it."], answer: "It increases total entropy." },
        { title: "Engine limit", problem: "Can an engine turn 100% of heat into work?", steps: ["Some heat must be exhausted.", "Entropy forbids full conversion."], answer: "No — never 100% efficient." },
        { title: "Local order", problem: "How can a fridge make things colder (more ordered)?", steps: ["It exports entropy as waste heat.", "Total entropy still rises."], answer: "By increasing entropy elsewhere." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Total entropy never decreases." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Reason with the second law." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: the heat death of the universe", content: { markdown: "Extrapolate the second law to the cosmos: entropy rises relentlessly, energy spreads ever more uniformly, and usable energy dwindles. In the far future the universe approaches a state of maximum entropy — the **heat death** — where everything is the same temperature and no work can be extracted. Galaxy clusters, with their slowly cooling X-ray gas, are part of this grand, irreversible drift toward equilibrium." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Entropy measures disorder (number of microscopic arrangements).", "Second law: total entropy of an isolated system never decreases.", "Heat flows hot→cold because it raises entropy.", "No engine is 100% efficient (Carnot limit).", "Entropy defines the arrow of time."], formulas: [{ label: "Second law", tex: "\\Delta S_{\\text{total}} \\ge 0" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Entropy is a measure of:", options: ["temperature", "disorder", "pressure", "charge"], answer: 1, explanation: "Entropy measures disorder / number of microstates." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "The total entropy of an isolated system can spontaneously decrease.", answer: false, explanation: "The second law: total entropy never decreases." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "No heat engine can be:", options: ["partly efficient", "100% efficient", "built", "reversed"], answer: 1, explanation: "Entropy forbids complete heat-to-work conversion." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "Heat flows from hot to cold because it increases total entropy.", answer: true, hint: "Energy spreads out.", explanation: "The spontaneous direction raises entropy." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "A refrigerator can lower entropy locally by increasing it more in the surroundings.", answer: true, hint: "Total still rises.", explanation: "Local order is paid for by greater disorder elsewhere." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "The second law gives time its:", options: ["speed", "arrow (direction)", "units", "curvature"], answer: 1, hint: "Past vs future.", explanation: "Increasing entropy points toward the future." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A perpetual-motion machine is impossible because it would violate:", options: ["Ohm's law", "the second law of thermodynamics", "Hooke's law", "Snell's law"], answer: 1, hint: "Entropy.", explanation: "It would require entropy to decrease or efficiency of 100%." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "The far-future state of maximum entropy is called the:", options: ["Big Bang", "heat death", "singularity", "main sequence"], answer: 1, hint: "Energy fully spread out.", explanation: "Maximum-entropy equilibrium is the heat death." },
    ],
  },
];
