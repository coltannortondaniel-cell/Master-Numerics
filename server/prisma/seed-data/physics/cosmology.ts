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
];
