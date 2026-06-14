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

  // ───────────────────────── 3. The Laws of Thermodynamics ─────────────────────────
  {
    slug: "the-laws-of-thermodynamics",
    title: "The Laws of Thermodynamics",
    tagline: "Four rules that govern energy and heat",
    estMinutes: 16,
    xpReward: 180,
    difficulty: 5,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "You Can't Win, and You Can't Break Even", sub: "Four deceptively simple laws rule every engine, star, and living cell — and forbid the free lunch forever." } },
      { kind: "CONTEXT", title: "The rulebook of energy", content: { markdown: "The million-degree gas between galaxies, a car engine, your own metabolism — all obey the same handful of laws. Having met entropy and the second law, we now lay out the **full set**, the foundation of all thermal physics." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "The four laws of thermodynamics:\n\n**Zeroth law.** If two systems are each in thermal equilibrium with a third, they're in equilibrium with each other. This is what makes **temperature** a meaningful, measurable quantity — it's why a thermometer works.\n\n**First law (conservation of energy).** Energy is conserved; you can change a system's internal energy by adding **heat** $Q$ or doing **work** $W$ on it:\n\n$$\\Delta U = Q - W.$$\n\nYou can't create energy from nothing — *'you can't win.'*\n\n**Second law (entropy).** The total entropy of an isolated system never decreases; heat flows spontaneously hot → cold; no process is perfectly efficient — *'you can't break even.'* This law gives time its arrow.\n\n**Third law.** As temperature approaches **absolute zero**, entropy approaches a minimum, and absolute zero itself can never be fully reached — *'you can't get out of the game.'*\n\nTogether they bound what any machine, chemical reaction, or living thing can do. They are among the most universal laws in science — Einstein expected them to be the one part of physics never overturned." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "First law bookkeeping", problem: "Heat $Q$ is added to a gas while it does work $W$. What is the change in internal energy?", steps: ["Energy is conserved.", "$\\Delta U = Q - W$."], answer: "$\\Delta U = Q - W$." },
        { title: "Why thermometers work", problem: "Which law guarantees temperature is well-defined?", steps: ["Equilibrium is transitive.", "That's the zeroth law."], answer: "The zeroth law." },
        { title: "No perfect cold", problem: "Can anything reach absolute zero?", steps: ["Entropy approaches a minimum there.", "The third law forbids fully reaching it."], answer: "No — absolute zero is unreachable." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Zeroth: temperature. First: energy. Second: entropy. Third: absolute zero." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Apply the four laws." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: statistical mechanics", content: { markdown: "Why do the laws hold? **Statistical mechanics**, built by Boltzmann, explains them from the behavior of countless particles. Entropy counts the number of microscopic arrangements that look the same large-scale; disordered states have vastly more arrangements, so systems drift toward them simply by probability. Boltzmann's tombstone bears his equation, $S = k \\log W$, linking entropy $S$ to the number of microstates $W$ — heat and disorder, explained by counting." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Zeroth law: makes temperature meaningful (thermometers work).", "First law: energy is conserved, $\\Delta U = Q - W$ ('you can't win').", "Second law: total entropy never decreases ('you can't break even').", "Third law: absolute zero can never be fully reached.", "Statistical mechanics explains the laws by counting microscopic arrangements."], formulas: [{ label: "First law", tex: "\\Delta U = Q - W" }, { label: "Boltzmann entropy", tex: "S = k \\log W" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "The first law of thermodynamics is essentially:", options: ["entropy increases", "conservation of energy", "temperature is relative", "absolute zero is reachable"], answer: 1, difficulty: 2, explanation: "It states energy is conserved: $\\Delta U = Q - W$." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Which law makes temperature a well-defined quantity?", options: ["zeroth law", "first law", "second law", "third law"], answer: 0, difficulty: 3, explanation: "The zeroth law (transitive equilibrium) underpins temperature and thermometers." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "The third law says absolute zero can never be completely reached.", answer: true, difficulty: 3, explanation: "Entropy approaches a minimum, but absolute zero is unattainable." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "Write the change in internal energy $U$ from heat $Q$ and work done by the system $W$ (first law). (Type like `Q - W`.)", answer: { expr: "Q - W", vars: ["Q", "W"] }, difficulty: 3, hint: "Energy conservation.", explanation: "$\\Delta U = Q - W$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "'You can't win, you can't break even' refers, in order, to the:", options: ["second and third laws", "first and second laws", "zeroth and first laws", "third and first laws"], answer: 1, difficulty: 3, hint: "Energy, then entropy.", explanation: "First law: can't create energy ('win'); second law: can't be perfectly efficient ('break even')." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "Statistical mechanics explains entropy by counting microscopic arrangements.", answer: true, difficulty: 4, hint: "Boltzmann's $S = k\\log W$.", explanation: "More arrangements (microstates) means higher entropy; systems drift toward the most probable, disordered states." },
    ],
  },

  // ───────────────────────── 4. Heat Engines & Efficiency Limits ─────────────────────────
  {
    slug: "heat-engines-and-carnot",
    title: "Heat Engines & the Carnot Limit",
    tagline: "Turning heat into work — and the ceiling no engine beats",
    estMinutes: 16,
    xpReward: 190,
    difficulty: 5,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "Every Engine Has a Hard Ceiling", sub: "No matter how clever the design, the temperatures it runs between cap how much heat it can turn into work." } },
      { kind: "CONTEXT", title: "From steam to stars", content: { markdown: "Heat engines drove the Industrial Revolution and still generate most of our electricity. The second law sets an unbreakable limit on them — discovered by a young engineer studying steam, and as fundamental as any law in physics." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "A **heat engine** takes in heat from a hot reservoir at temperature $T_h$, converts **some** of it into useful work, and dumps the rest into a cold reservoir at $T_c$. It *must* dump some — the second law forbids turning heat entirely into work.\n\nThe **maximum possible efficiency**, achieved only by an ideal (reversible) **Carnot** engine, depends only on the two temperatures (in kelvin):\n\n$$\\eta_{max} = 1 - \\frac{T_c}{T_h}.$$\n\nLessons from this formula:\n\n- A bigger temperature gap (hotter $T_h$ or colder $T_c$) means higher possible efficiency.\n- Perfect efficiency ($\\eta = 1$) would need $T_c = 0$ (absolute zero) — impossible by the third law.\n- Real engines, with friction and irreversibility, always fall **below** the Carnot limit.\n\nThis is why power plants run boilers as hot as materials allow, and why no 'perfect' engine can exist. Run an engine in reverse and you get a **refrigerator** or **heat pump**, using work to move heat from cold to hot — paying the entropy bill with the work input." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Carnot efficiency", problem: "An ideal engine runs between $T_h = 600$ K and $T_c = 300$ K. What is its maximum efficiency?",
          steps: ["Use $\\eta_{max} = 1 - T_c/T_h$.", "$= 1 - 300/600$.", "$= 1 - 0.5 = 0.5$."], answer: "50% — and a real engine between these temperatures does worse." },
        { title: "Why dump heat?", problem: "Why can't an engine turn all its input heat into work?", steps: ["The second law forbids it.", "Some heat must go to the cold reservoir."], answer: "Exhaust heat is unavoidable." },
        { title: "Boosting efficiency", problem: "How do you raise an engine's efficiency ceiling?", steps: ["Increase the temperature gap.", "Raise $T_h$ or lower $T_c$."], answer: "Widen the gap between hot and cold." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "$\\eta_{max} = 1 - T_c/T_h$; perfect efficiency is impossible." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Compute and reason about engine efficiency." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: Carnot's lasting legacy", content: { markdown: "**Sadi Carnot** published his analysis in 1824 and died of cholera at 36, his work nearly forgotten. Yet his idealized engine set the gold standard every real engine is measured against, and his reasoning birthed the second law and the concept of entropy. Remarkably, the Carnot limit depends *only* on temperatures — not on the working substance, design, or fuel. It's a statement about the universe, not about engineering, which is why it has never been beaten." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["A heat engine converts some heat to work and must exhaust the rest to a cold reservoir.", "Maximum (Carnot) efficiency: $\\eta_{max} = 1 - T_c/T_h$ (temperatures in kelvin).", "A larger hot–cold temperature gap allows higher efficiency.", "Perfect efficiency would need $T_c = 0$ — impossible; real engines do worse than Carnot.", "Run in reverse, an engine becomes a refrigerator or heat pump."], formulas: [{ label: "Carnot efficiency", tex: "\\eta_{max} = 1 - \\dfrac{T_c}{T_h}" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "A heat engine must:", options: ["turn all heat into work", "exhaust some heat to a cold reservoir", "run at absolute zero", "create energy"], answer: 1, difficulty: 3, explanation: "The second law requires dumping some heat; full conversion is impossible." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "A larger temperature difference between the hot and cold reservoirs allows a higher maximum efficiency.", answer: true, difficulty: 3, explanation: "$\\eta_{max} = 1 - T_c/T_h$ grows as the gap widens." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "100% efficiency is impossible because it would require:", options: ["a faster engine", "the cold reservoir at absolute zero", "more fuel", "a bigger engine"], answer: 1, difficulty: 4, explanation: "$\\eta = 1$ needs $T_c = 0$, forbidden by the third law." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "An ideal engine runs between 800 K and 200 K. What is its maximum efficiency, as a decimal? (Use 1 − Tc/Th.)", answer: { value: 0.75, tolerance: 0.01 }, difficulty: 3, hint: "1 − 200/800.", explanation: "$1 - 200/800 = 1 - 0.25 = 0.75$." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "Write the Carnot efficiency in terms of cold and hot temperatures $T_c$ and $T_h$. (Type like `1 - T_c/T_h`.)", answer: { expr: "1 - T_c/T_h", vars: ["T_c", "T_h"] }, difficulty: 4, hint: "One minus the temperature ratio.", explanation: "$\\eta_{max} = 1 - T_c/T_h$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Running a heat engine in reverse, using work to move heat from cold to hot, gives a:", options: ["perpetual motion machine", "refrigerator or heat pump", "battery", "turbine"], answer: 1, difficulty: 3, hint: "It pumps heat 'uphill'.", explanation: "A refrigerator/heat pump uses work input to move heat from cold to hot." },
    ],
  },
];
