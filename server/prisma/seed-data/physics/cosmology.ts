import type { LessonSeed } from "../types.js";

/**
 * Cosmology & The Big Bang (graduate): the origin and fate of the universe. The
 * expanding universe & Hubble's law, and the Big Bang with its evidence and the
 * dark sector. NUMERIC/SYMBOLIC/GRAPH led. The capstone world. All original.
 */
export const cosmologyLessons: LessonSeed[] = [
  // ───────────────────────── 1. The Expanding Universe ─────────────────────────
  {
    slug: "the-expanding-universe",
    title: "The Expanding Universe",
    tagline: "Everything is rushing apart",
    estMinutes: 16,
    xpReward: 200,
    difficulty: 5,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "Space Itself Is Stretching", sub: "Distant galaxies recede from us — not through space, but because space between them is growing." } },
      { kind: "CONTEXT", title: "The cosmic discovery", content: { markdown: "In the 1920s Edwin Hubble found that almost every galaxy is moving **away** from us, and the farther one is, the faster it flees. The startling conclusion: the **universe is expanding**. Run that expansion backward and everything began, packed together, in a Big Bang." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "**Hubble's law:** a galaxy's recession speed is proportional to its distance,\n\n$$v = H_0\\,d,$$\n\nwhere $H_0$ is the **Hubble constant**. This is exactly what uniform **expansion of space** looks like from any point — there is no center; every observer sees everyone else receding.\n\nThe evidence is **cosmological redshift**: light from distant galaxies is stretched to longer (redder) wavelengths as space expands while it travels. More distant galaxies show greater redshift.\n\n- A common analogy: dots on an inflating balloon — every dot moves away from every other, with no special center.\n- Reversing the expansion implies a hot, dense beginning ~13.8 billion years ago.\n- $1/H_0$ gives a rough estimate of the age of the universe." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Hubble's law", problem: "Galaxy B is twice as far as galaxy A. How do their recession speeds compare?", steps: ["$v = H_0 d$.", "Twice the distance → twice the speed."], answer: "B recedes twice as fast." },
        { title: "Redshift", problem: "What does a galaxy's redshift tell us?", steps: ["Light stretched by expansion.", "More redshift = farther/faster."], answer: "It is moving away; more shift, more distant." },
        { title: "No center", problem: "Where is the center of the expansion?", steps: ["Every observer sees recession.", "Like a balloon's surface."], answer: "There is no center." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "$v = H_0 d$; redshift signals expansion." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Apply Hubble's law and interpret redshift." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: dark energy and acceleration", content: { markdown: "In 1998, supernova surveys revealed something stunning: the expansion isn't just continuing — it's **accelerating**. Some unknown component, dubbed **dark energy**, makes up about 68% of the universe and pushes it apart ever faster. Its nature is the single biggest mystery in cosmology. The expansion is governed by the **Friedmann equations** (from general relativity), which connect the universe's expansion rate to everything it contains — matter, radiation, and dark energy." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Distant galaxies recede; the universe is expanding.", "Hubble's law: $v = H_0 d$.", "Cosmological redshift stretches light as space expands.", "There is no center — every observer sees the same recession.", "Dark energy is accelerating the expansion."], formulas: [{ label: "Hubble's law", tex: "v = H_0\\,d" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Hubble's law states that a galaxy's recession speed is:", options: ["constant", "proportional to its distance", "inversely proportional to distance", "zero"], answer: 1, explanation: "$v = H_0 d$." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Light from distant galaxies is:", options: ["blueshifted", "redshifted", "unchanged", "invisible"], answer: 1, explanation: "Expansion stretches it to longer (red) wavelengths." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "The expansion of the universe has a single central point.", answer: false, explanation: "Every observer sees the same recession — no center." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "Write a galaxy's recession speed $v$ in terms of the Hubble constant $H$ and distance $d$. (Type like `H*d`.)", answer: { expr: "H*d", vars: ["H", "d"] }, difficulty: 3, hint: "Hubble's law.", explanation: "$v = H_0 d$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Galaxy B is 3 times farther than galaxy A. By Hubble's law, B recedes how many times faster?", answer: { value: 3, tolerance: 0 }, hint: "$v \\propto d$.", explanation: "Three times the distance, three times the speed." },
      { scope: "PRACTICE", kind: "GRAPH", prompt: "With $H = 1$, recession speed vs distance is $v = d$. Graph it (enter $v$ as a function of $d$, use $x$ for $d$).", answer: { expr: "x", domain: [0, 5], variable: "x" }, difficulty: 3, hint: "Linear through the origin.", explanation: "$v = H_0 d$ is a straight line; its slope is $H_0$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "The accelerating expansion is attributed to:", options: ["dark matter", "dark energy", "black holes", "neutrinos"], answer: 1, hint: "~68% of the universe.", explanation: "Dark energy drives the acceleration." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "Running the expansion backward implies a hot, dense early universe.", answer: true, hint: "The Big Bang.", explanation: "Reversing expansion leads to the Big Bang." },
    ],
  },

  // ───────────────────────── 2. The Big Bang & Beyond ─────────────────────────
  {
    slug: "the-big-bang-and-beyond",
    title: "The Big Bang & Beyond",
    tagline: "Origin, evidence, and the dark sector",
    estMinutes: 16,
    xpReward: 200,
    difficulty: 5,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "The First Light", sub: "The universe began hot and dense 13.8 billion years ago — and it left fingerprints we can still detect today." } },
      { kind: "CONTEXT", title: "Evidence at the edge of everything", content: { markdown: "The **Big Bang** isn't a guess — it's the best-tested theory of cosmic origins, resting on three independent pillars of evidence. And it leaves us facing the universe's deepest puzzle: most of what exists is invisible 'dark' stuff we cannot yet identify." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "The **Big Bang** theory: the universe began ~**13.8 billion years ago** in an extremely hot, dense state and has been expanding and cooling ever since. (It describes the expansion *of* space, not an explosion *into* pre-existing space.)\n\nThree pillars of evidence:\n\n1. **Hubble expansion** — galaxies recede, implying a denser past.\n2. **The cosmic microwave background (CMB)** — faint microwave radiation filling all the sky, the cooled afterglow of the hot early universe.\n3. **Primordial abundances** — the observed ~25% helium (with hydrogen) matches Big Bang nucleosynthesis exactly.\n\nThe energy budget today is dominated by the **dark sector**:\n\n- **~5%** ordinary matter (everything we see).\n- **~27%** **dark matter** — unseen mass that holds galaxies together (revealed by rotation curves and lensing).\n- **~68%** **dark energy** — driving accelerating expansion.\n\nSo about **95%** of the universe is of unknown composition — the frontier of physics." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "The CMB", problem: "What is the cosmic microwave background?", steps: ["Afterglow of the hot early universe.", "Cooled to microwaves."], answer: "Relic radiation from the Big Bang." },
        { title: "Dark matter clue", problem: "What hints that galaxies hold extra unseen mass?", steps: ["Stars orbit too fast at the edges.", "Visible matter can't hold them."], answer: "Galactic rotation curves." },
        { title: "The budget", problem: "Roughly what fraction of the universe is ordinary matter?", steps: ["About 5%.", "The rest is dark."], answer: "About 5%." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Three pillars; ~95% is dark." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Recall the evidence and the cosmic budget." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: the open questions", content: { markdown: "Cosmology's success only sharpens its mysteries. What *is* dark matter — a new particle never seen in any collider? What *is* dark energy — a constant, or something evolving? What happened in the first $10^{-32}$ of a second (the **inflation** era)? Why is there matter at all and not equal antimatter? And what, if anything, came 'before'? These questions sit at the boundary of physics — exactly where Master Numerics' longest journey, from counting ducks in a park to the birth of the cosmos, finally arrives." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["The universe began hot and dense ~13.8 billion years ago.", "Evidence: Hubble expansion, the CMB, and primordial element abundances.", "The CMB is the cooled afterglow of the early universe.", "~5% ordinary matter, ~27% dark matter, ~68% dark energy.", "About 95% of the universe is of unknown nature — the frontier."], formulas: [{ label: "Cosmic age (rough)", tex: "t \\sim 1/H_0" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "Approximately how many billion years ago did the Big Bang occur?", answer: { value: 13.8, tolerance: 0.5 }, explanation: "About 13.8 billion years." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "The cosmic microwave background is:", options: ["light from nearby stars", "the afterglow of the hot early universe", "radiation from black holes", "sunlight scattered by dust"], answer: 1, explanation: "It's the cooled relic radiation of the Big Bang." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "Most of the universe's content is ordinary (visible) matter.", answer: false, explanation: "Only ~5% is ordinary matter; ~95% is dark." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Galaxy rotation curves are evidence for:", options: ["dark energy", "dark matter", "black holes", "antimatter"], answer: 1, hint: "Extra unseen mass.", explanation: "Stars orbit too fast for the visible mass — dark matter." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Roughly what percentage of the universe is ordinary matter?", answer: { value: 5, tolerance: 1 }, hint: "The visible part.", explanation: "About 5%." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Which is NOT one of the three pillars of Big Bang evidence?", options: ["Hubble expansion", "the CMB", "primordial element abundances", "the photoelectric effect"], answer: 3, hint: "One belongs to quantum physics.", explanation: "The photoelectric effect is unrelated to Big Bang evidence." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Dark energy is associated with:", options: ["holding galaxies together", "accelerating cosmic expansion", "nuclear fusion", "the strong force"], answer: 1, hint: "~68% of the universe.", explanation: "Dark energy accelerates the expansion." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "The Big Bang describes an explosion of matter into pre-existing empty space.", answer: false, hint: "It's the expansion of space itself.", explanation: "Space itself expands; it wasn't an explosion into a pre-existing void." },
    ],
  },

  // ───────────────────────── 3. Cosmic Inflation & the Early Universe ─────────────────────────
  {
    slug: "cosmic-inflation",
    title: "Cosmic Inflation & the Early Universe",
    tagline: "The split-second that shaped everything",
    estMinutes: 16,
    xpReward: 190,
    difficulty: 5,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "Faster Than Light, For an Instant", sub: "In a sliver of its first second, the universe ballooned by a factor of trillions of trillions — and seeded every galaxy." } },
      { kind: "CONTEXT", title: "Fixing the Big Bang's puzzles", content: { markdown: "The Big Bang theory is superbly supported, yet on its own it leaves puzzles: why is the universe so uniform, and so precisely flat? **Cosmic inflation** — a burst of exponential expansion in the first instant — was proposed to solve them, and made predictions later confirmed in the cosmic microwave background." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "**Inflation** proposes that in the first tiny fraction of a second (around $10^{-35}$ s after the start), the universe underwent a brief phase of **exponential expansion**, ballooning by a factor of at least $10^{26}$ almost instantly — space itself expanding faster than light (which is allowed; no information travels through it).\n\nThis elegantly solves two puzzles:\n\n- **The horizon problem.** Opposite sides of the sky have nearly identical temperature, yet seem too far apart to have ever exchanged heat. Inflation says they *were* in contact before being stretched far apart — explaining the uniformity.\n- **The flatness problem.** The universe's geometry is observed to be remarkably flat. Inflation stretches any initial curvature smooth, like inflating a balloon makes its surface look flat up close.\n\nAnd a bonus: tiny **quantum fluctuations** in the early universe were stretched to cosmic scale by inflation, becoming the slight density variations that later grew, under gravity, into **galaxies and galaxy clusters**. The largest structures trace back to quantum jitters. These fluctuations are seen as faint temperature ripples in the CMB, matching inflation's predictions remarkably well." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Horizon problem", problem: "Why is the sky's temperature so uniform in all directions?", steps: ["Distant regions seem never to have been in contact.", "Inflation says they were, before being stretched apart."], answer: "Inflation explains the uniformity." },
        { title: "Flatness", problem: "How does inflation make the universe appear flat?", steps: ["Rapid expansion stretches any curvature.", "Locally, it looks flat."], answer: "Stretching smooths the geometry." },
        { title: "Seeds of galaxies", problem: "What became the seeds of galaxies?", steps: ["Quantum fluctuations were stretched by inflation.", "They grew under gravity."], answer: "Stretched quantum fluctuations." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Inflation: brief exponential expansion solving horizon and flatness." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Reason about inflation and the early universe." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: can space expand faster than light?", content: { markdown: "Special relativity caps how fast anything moves **through** space at $c$. But the expansion of space itself isn't motion through space — it's the stretching of the distances between things, and that has no speed limit. During inflation, and even today for very distant galaxies, the space between us and them grows so fast that those galaxies recede faster than light and their future light can never reach us. The cosmic speed limit applies to objects, not to the stage they sit on." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Inflation: a burst of exponential expansion in the universe's first instant.", "It solves the horizon problem (uniform temperature) and flatness problem (flat geometry).", "Space can expand faster than light because nothing travels through it.", "Stretched quantum fluctuations seeded galaxies and clusters.", "Inflation's predicted ripples match the cosmic microwave background."], formulas: [{ label: "Exponential growth", tex: "a(t) \\propto e^{Ht}" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Cosmic inflation is a brief period of:", options: ["contraction", "exponential expansion in the first instant", "cooling only", "no change"], answer: 1, difficulty: 3, explanation: "Inflation ballooned the early universe exponentially in a fraction of a second." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "Inflation helps explain why the universe looks so uniform and flat.", answer: true, difficulty: 3, explanation: "It resolves the horizon (uniformity) and flatness problems." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "The seeds of galaxies are thought to be:", options: ["leftover stars", "quantum fluctuations stretched by inflation", "black holes", "comets"], answer: 1, difficulty: 3, explanation: "Tiny quantum fluctuations, stretched to cosmic scale, grew into structure." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "Space itself can expand faster than light, since nothing is moving through space.", answer: true, difficulty: 4, hint: "The limit applies to motion through space.", explanation: "Expansion stretches distances; it isn't motion through space, so $c$ doesn't cap it." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "The 'horizon problem' that inflation solves is that distant regions of the sky:", options: ["are different temperatures", "are the same temperature despite seeming never in contact", "are empty", "are too close"], answer: 1, difficulty: 4, hint: "Uniformity needs past contact.", explanation: "Inflation lets now-distant regions have been in contact before being stretched apart." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Evidence for inflation appears as tiny temperature ripples in the:", options: ["Sun", "cosmic microwave background", "ocean", "Moon"], answer: 1, difficulty: 3, hint: "The Big Bang's afterglow.", explanation: "The CMB's faint fluctuations match inflation's predictions." },
    ],
  },

  // ───────────────────────── 4. The Fate of the Universe ─────────────────────────
  {
    slug: "the-fate-of-the-universe",
    title: "The Fate of the Universe",
    tagline: "How everything ends",
    estMinutes: 16,
    xpReward: 200,
    difficulty: 5,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "The Last Chapter of Everything", sub: "Will the cosmos freeze, rip, or collapse? Dark energy holds the deciding vote — and the journey ends here." } },
      { kind: "CONTEXT", title: "The end of the journey", content: { markdown: "We began at the Moon and have reached the edge of space and time. The final question is the grandest: how does it all end? The answer turns on the contest between gravity, pulling everything together, and **dark energy**, pushing it apart." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "The universe is expanding (Hubble's law, $v = H d$). Its long-term fate depends on whether gravity or **dark energy** wins:\n\n- **Big Crunch** — if gravity dominated, expansion would halt and reverse, collapsing everything back together. Observations now make this unlikely.\n- **Big Freeze (Heat Death)** — if expansion continues forever, stars burn out, galaxies drift apart, and the universe cools toward maximum entropy and darkness. This is the favored fate.\n- **Big Rip** — if dark energy strengthens over time, expansion could accelerate so violently it eventually tears apart galaxies, stars, and even atoms.\n\nThe stunning discovery of 1998 — that the expansion is **accelerating**, not slowing — revealed that dark energy (about **68%** of the universe) currently dominates. Unless its nature changes, the cosmos faces a cold, dark, ever-emptier future: the **Big Freeze**.\n\nIt's a humbling endpoint, but not a gloomy one. On the scale of human lives, the universe is young and brilliant, full of stars being born. Understanding its arc — from a hot dense beginning to a vast cold future — is one of the great achievements of the human mind, and the reason the journey from the Moon to the edge of the cosmos was worth taking." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "What decides the fate", problem: "What contest determines the universe's fate?", steps: ["Gravity pulls matter together.", "Dark energy pushes space apart."], answer: "Gravity versus dark energy." },
        { title: "The 1998 surprise", problem: "What did supernova observations in 1998 reveal?", steps: ["Expansion was expected to slow.", "Instead it is accelerating."], answer: "Accelerating expansion, driven by dark energy." },
        { title: "The favored ending", problem: "Given accelerating expansion, what is the likely fate?", steps: ["Expansion continues forever.", "Stars die; entropy maxes out."], answer: "The Big Freeze (heat death)." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Gravity vs dark energy decides: Crunch, Freeze, or Rip." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Reason about cosmic fate — the final problems." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: what is dark energy?", content: { markdown: "Dark energy is the deepest mystery in physics. It behaves like an energy built into space itself, pushing it apart, and its measured value is bafflingly small compared with naive quantum predictions — off by some 120 orders of magnitude, the worst estimate in the history of science. Is it Einstein's 'cosmological constant,' a new field, or a sign that gravity itself needs revising on cosmic scales? Whoever answers will rewrite physics. The journey through the cosmos ends not with all questions closed, but with the greatest one wide open — an invitation to the next explorer." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["The universe's fate is a contest between gravity and dark energy.", "Three scenarios: Big Crunch (collapse), Big Freeze (heat death), Big Rip (everything torn apart).", "In 1998, expansion was found to be accelerating, revealing dark energy dominates (~68%).", "The favored fate is the Big Freeze: a cold, dark, ever-expanding future.", "Dark energy's nature is the deepest open question in physics."], formulas: [{ label: "Hubble's law", tex: "v = H d" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "The ultimate fate of the universe is decided by the contest between gravity and:", options: ["dark energy", "the strong force", "sunlight", "magnetism"], answer: 0, difficulty: 3, explanation: "Gravity pulls together; dark energy pushes apart." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "Observations show the universe's expansion is accelerating.", answer: true, difficulty: 3, explanation: "The 1998 supernova measurements revealed accelerating expansion, driven by dark energy." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "If the universe keeps expanding forever and cools toward maximum entropy, this fate is the:", options: ["Big Crunch", "Big Freeze (heat death)", "Big Bang", "Big Rip"], answer: 1, difficulty: 3, explanation: "Endless expansion and cooling toward maximum entropy is the heat death." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "Write Hubble's law for recession speed $v$ in terms of the Hubble constant $H$ and distance $d$. (Type like `H*d`.)", answer: { expr: "H*d", vars: ["H", "d"] }, difficulty: 3, hint: "Speed proportional to distance.", explanation: "$v = H d$ — galaxies recede faster the farther they are." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A 'Big Rip' would occur if dark energy:", options: ["disappeared", "strengthened over time, tearing apart galaxies and atoms", "became gravity", "stopped expansion"], answer: 1, difficulty: 4, hint: "Runaway acceleration.", explanation: "Strengthening dark energy could accelerate expansion enough to rip everything apart." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A 'Big Crunch' (collapse) would require:", options: ["dark energy to dominate", "gravity to dominate and reverse the expansion", "no matter", "faster light"], answer: 1, difficulty: 3, hint: "Gravity must win.", explanation: "Only if gravity overcame expansion would the universe collapse back together — now considered unlikely." },
    ],
  },
];
