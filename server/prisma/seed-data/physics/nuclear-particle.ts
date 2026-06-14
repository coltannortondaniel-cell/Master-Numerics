import type { LessonSeed } from "../types.js";

/**
 * The Observable Universe (graduate): nuclear & particle physics — the building
 * blocks of everything we can see. The nucleus & radioactivity, and the
 * fundamental particles of the Standard Model. NUMERIC/MCQ led. All original.
 */
export const nuclearParticleLessons: LessonSeed[] = [
  // ───────────────────────── 1. The Nucleus & Radioactivity ─────────────────────────
  {
    slug: "the-nucleus-and-radioactivity",
    title: "The Nucleus & Radioactivity",
    tagline: "Energy locked in the atom's core",
    estMinutes: 16,
    xpReward: 190,
    difficulty: 5,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "The Heart of the Atom", sub: "A tiny, dense core binds protons and neutrons — and releasing a sliver of that binding powers stars and reactors." } },
      { kind: "CONTEXT", title: "What everything is made of", content: { markdown: "Every atom in the observable universe has a **nucleus** — protons and neutrons bound impossibly tightly. Understanding it explains where the elements come from, how the Sun shines, how we date ancient bones, and the energy that lights cities and, in another form, levels them." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "The **nucleus** contains **protons** (positive) and **neutrons** (neutral), bound by the **strong nuclear force**, which overpowers the electric repulsion between protons at tiny range. The number of protons (the **atomic number**) defines the element.\n\nUnstable nuclei undergo **radioactive decay**, emitting:\n\n- **Alpha** ($\\alpha$): a helium nucleus — heavy, stopped by paper.\n- **Beta** ($\\beta$): an electron from a neutron turning into a proton — stopped by aluminum.\n- **Gamma** ($\\gamma$): a high-energy photon — needs thick lead.\n\nDecay is governed by a constant **half-life** — the time for half a sample to decay — regardless of the amount, which makes it a precise clock for **radiometric dating**.\n\nThe energy comes from $E = mc^2$: the products weigh slightly *less* than the original, and that missing mass (the **mass defect**) is released. **Fission** splits heavy nuclei; **fusion** joins light ones — the Sun's power source." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Half-life", problem: "A sample has a 2-year half-life, starting at 80 g. How much remains after 4 years?", steps: ["2 years: 40 g.", "4 years: 20 g."], answer: "20 g (two half-lives)." },
        { title: "What defines the element", problem: "Which count sets the chemical element?", steps: ["The atomic number.", "= number of protons."], answer: "The proton count." },
        { title: "Energy source", problem: "Where does nuclear energy come from?", steps: ["Products are lighter.", "$E = mc^2$ on the mass defect."], answer: "Converted mass defect." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Half-life is constant; energy from mass defect." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Use half-life halving and decay properties." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: forging the elements", content: { markdown: "Fusion in stars builds elements up to iron, the most tightly bound nucleus — beyond it, fusion no longer releases energy. Heavier elements (gold, uranium) require the violence of **supernovae** and **neutron-star mergers**, where rapid neutron capture builds massive nuclei in seconds. Every atom heavier than hydrogen and helium in the observable universe was assembled in these cosmic forges, then scattered to seed new stars and planets." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["The nucleus holds protons and neutrons via the strong force.", "Atomic number (protons) defines the element.", "Radioactivity: alpha, beta, gamma emissions.", "Decay has a constant half-life — a precise clock.", "Nuclear energy comes from the mass defect, $E = mc^2$ (fission & fusion)."], formulas: [{ label: "Mass–energy release", tex: "E = mc^2" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "The element is determined by the number of:", options: ["neutrons", "protons", "electrons in motion", "photons"], answer: 1, explanation: "Atomic number = proton count." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "A sample with a 2-year half-life starts at 80 g. How much remains after 4 years (grams)?", answer: { value: 20, tolerance: 0 }, explanation: "Two half-lives: $80\\to40\\to20$." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Which radiation is the most penetrating?", options: ["alpha", "beta", "gamma", "they're equal"], answer: 2, explanation: "Gamma rays need thick lead to stop." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A 1000 g sample has a 5-year half-life. How much remains after 10 years (grams)?", answer: { value: 250, tolerance: 0 }, hint: "Two half-lives.", explanation: "$1000\\to500\\to250$." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "An alpha particle is a helium nucleus.", answer: true, hint: "Two protons, two neutrons.", explanation: "Alpha = a helium-4 nucleus." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "The energy released in nuclear reactions comes from:", options: ["chemical bonds", "the mass defect via $E=mc^2$", "friction", "electric current"], answer: 1, hint: "Products are lighter.", explanation: "Lost mass becomes energy." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "The Sun is powered by nuclear:", options: ["fission", "fusion", "decay", "combustion"], answer: 1, hint: "Joining light nuclei.", explanation: "Hydrogen fusion powers the Sun." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "Half-life depends on how much of the sample you start with.", answer: false, hint: "It's a fixed property.", explanation: "Half-life is constant, independent of amount." },
    ],
  },

  // ───────────────────────── 2. Fundamental Particles ─────────────────────────
  {
    slug: "fundamental-particles",
    title: "Fundamental Particles",
    tagline: "The Standard Model",
    estMinutes: 15,
    xpReward: 180,
    difficulty: 5,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "The Cosmic Ingredient List", sub: "Everything in the observable universe is built from a short, elegant list of fundamental particles." } },
      { kind: "CONTEXT", title: "Cutting matter to its limit", content: { markdown: "Keep dividing matter — molecules, atoms, nuclei, protons — and you eventually reach particles with no known substructure: the **fundamental particles**. The **Standard Model** organizes them into a remarkably compact scheme that has survived every experimental test for half a century." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "The **Standard Model** sorts the fundamental particles into two families:\n\n- **Quarks** (six types) — combine in threes to form protons and neutrons. A proton is two up quarks and one down.\n- **Leptons** (six types) — include the **electron** and the elusive, nearly massless **neutrinos**.\n\nForces are carried by **force-carrier particles** (bosons):\n\n- **Photon** — electromagnetism.\n- **Gluons** — the strong force binding quarks.\n- **W and Z bosons** — the weak force (radioactive beta decay).\n\nThe **Higgs boson**, confirmed in 2012, is tied to the field that gives many particles their mass.\n\nWhat's missing: the Standard Model does **not** include **gravity**, and it doesn't explain **dark matter** or **dark energy** — which together outweigh ordinary matter ~20 to 1. The deepest theory we have is still incomplete." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Proton structure", problem: "What is a proton made of?", steps: ["Three quarks.", "Two up, one down."], answer: "Two up quarks and one down quark." },
        { title: "Force carrier", problem: "Which particle carries the electromagnetic force?", steps: ["The photon.", "Massless boson."], answer: "The photon." },
        { title: "The gap", problem: "Name a force the Standard Model omits.", steps: ["It excludes gravity.", "Plus dark matter/energy."], answer: "Gravity." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Quarks + leptons; forces via bosons." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Identify particles and their roles." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: quantum field theory", content: { markdown: "The Standard Model is written in the language of **quantum field theory (QFT)**, where each particle is an excitation — a 'ripple' — of an underlying field filling all of space. QFT unites quantum mechanics with special relativity and yields the most precisely tested predictions in science (the electron's magnetic moment matches theory to twelve digits). Extending it to include gravity — a **quantum theory of gravity** — remains the great unfinished goal of fundamental physics." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["The Standard Model lists the fundamental particles.", "Quarks build protons and neutrons; leptons include electrons and neutrinos.", "Forces are carried by bosons: photon, gluons, W/Z.", "The Higgs boson relates to particle mass.", "It omits gravity, dark matter, and dark energy — it's incomplete."], formulas: [{ label: "Proton content", tex: "p = uud" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Protons and neutrons are made of:", options: ["electrons", "quarks", "photons", "neutrinos"], answer: 1, explanation: "Three quarks each." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "The force carrier of electromagnetism is the:", options: ["gluon", "photon", "W boson", "Higgs"], answer: 1, explanation: "The photon carries the electromagnetic force." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "The Standard Model includes a complete description of gravity.", answer: false, explanation: "Gravity is notably absent from the Standard Model." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Which is a lepton?", options: ["up quark", "electron", "gluon", "photon"], answer: 1, hint: "Electrons and neutrinos.", explanation: "The electron is a lepton." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "The strong force between quarks is carried by:", options: ["photons", "gluons", "neutrinos", "W bosons"], answer: 1, hint: "It glues quarks together.", explanation: "Gluons carry the strong force." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "The particle confirmed in 2012, tied to mass, is the:", options: ["neutrino", "Higgs boson", "muon", "gluon"], answer: 1, hint: "Discovered at the LHC.", explanation: "The Higgs boson." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "Dark matter and dark energy are explained by the Standard Model.", answer: false, hint: "Major gaps.", explanation: "Neither is part of the Standard Model." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Particles are excitations of underlying fields in:", options: ["thermodynamics", "quantum field theory", "classical mechanics", "optics"], answer: 1, hint: "QFT.", explanation: "Quantum field theory treats particles as field excitations." },
    ],
  },

  // ───────────────────────── 3. Half-Life & Radioactive Decay ─────────────────────────
  {
    slug: "half-life-and-decay",
    title: "Half-Life & Radioactive Decay",
    tagline: "The clock hidden inside every unstable nucleus",
    estMinutes: 16,
    xpReward: 180,
    difficulty: 5,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "A Clock You Can't Stop or Start", sub: "Unstable nuclei decay at a perfectly steady statistical rate — turning rocks, bones, and stars into datable clocks." } },
      { kind: "CONTEXT", title: "Timing the universe", content: { markdown: "Having met the nucleus and radioactivity, we now quantify it. The **half-life** turns random nuclear decay into one of science's most powerful tools, dating everything from prehistoric campfires to the age of the Earth and the cosmos." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "A radioactive nucleus is unstable and will eventually **decay**, emitting radiation. You can't predict *when* a single nucleus decays — it's random — but a huge collection decays at a precise statistical rate.\n\nThe **half-life** $t_{1/2}$ is the time for **half** of the nuclei in a sample to decay. After each half-life, half of what remains is left:\n\n$$N = N_0 \\left(\\tfrac{1}{2}\\right)^{n}, \\qquad n = \\frac{t}{t_{1/2}}.$$\n\nSo after 1 half-life, $1/2$ remains; after 2, $1/4$; after 3, $1/8$; and so on. Half-lives range from fractions of a second to billions of years.\n\nThree decay types differ in penetrating power:\n\n- **Alpha** ($\\alpha$): a helium nucleus; heavy, stopped by paper.\n- **Beta** ($\\beta$): a fast electron; stopped by aluminum.\n- **Gamma** ($\\gamma$): high-energy photon; needs thick lead or concrete.\n\n**Radiometric dating** uses this clock. **Carbon-14** (half-life ~5,700 years) dates organic remains up to ~50,000 years; **uranium** isotopes (billions of years) date rocks and meteorites — that's how we know the Earth is about 4.5 billion years old." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Three half-lives", problem: "An 80 g sample has a half-life of 5 years. How much remains after 15 years?", steps: ["$n = 15/5 = 3$ half-lives.", "Halve three times: $80 \\to 40 \\to 20 \\to 10$."], answer: "10 g remain." },
        { title: "Reading the fraction", problem: "What fraction remains after 4 half-lives?", steps: ["$(1/2)^4$.", "$= 1/16$."], answer: "One sixteenth." },
        { title: "Choosing a dating clock", problem: "Why use uranium, not carbon-14, to date a billion-year-old rock?", steps: ["Carbon-14's half-life is only ~5,700 years.", "After a billion years, none is left."], answer: "Long half-life isotopes suit old samples." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Each half-life halves what remains." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Compute remaining amounts and reason about decay." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: carbon dating", content: { markdown: "Living things constantly take in carbon, including a steady trace of radioactive **carbon-14**. When they die, intake stops and the carbon-14 decays with its ~5,700-year half-life. Measuring how much remains gives the time since death. Carbon dating revolutionized archaeology — dating the Dead Sea Scrolls, Ötzi the Iceman, and cave art — and earned Willard Libby the Nobel Prize. The randomness of single nuclei becomes, in bulk, an exquisitely reliable clock." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Radioactive decay is random per nucleus but statistically precise in bulk.", "Half-life is the time for half a sample to decay; after n half-lives, $(1/2)^n$ remains.", "Alpha (paper), beta (aluminum), gamma (lead) differ in penetrating power.", "Radiometric dating uses known half-lives as clocks.", "Carbon-14 dates organic remains; uranium dates rocks and the 4.5-billion-year-old Earth."], formulas: [{ label: "Decay law", tex: "N = N_0 \\left(\\tfrac{1}{2}\\right)^{t/t_{1/2}}" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "A half-life is the time for:", options: ["all nuclei to decay", "half of the nuclei to decay", "a nucleus to double", "radiation to stop"], answer: 1, difficulty: 2, explanation: "Half of the remaining nuclei decay each half-life." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "You cannot predict exactly when a single radioactive nucleus will decay.", answer: true, difficulty: 3, explanation: "Individual decay is random; only bulk rates are predictable." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Which radiation is most penetrating, needing thick lead to stop?", options: ["alpha", "beta", "gamma", "all equal"], answer: 2, difficulty: 3, explanation: "Gamma rays are high-energy photons requiring dense shielding." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A sample starts at 240 g with a half-life of 2 hours. How many grams remain after 6 hours?", answer: { value: 30, tolerance: 0 }, difficulty: 3, hint: "6 h = 3 half-lives; halve three times.", explanation: "$240 \\to 120 \\to 60 \\to 30$ g after 3 half-lives." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "After 4 half-lives, what fraction of the original sample remains? Give as a decimal.", answer: { value: 0.0625, tolerance: 0.001 }, difficulty: 3, hint: "(1/2)^4.", explanation: "$(1/2)^4 = 1/16 = 0.0625$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "To date a rock billions of years old, scientists use isotopes with:", options: ["very short half-lives", "very long half-lives (e.g., uranium)", "no half-life", "only carbon-14"], answer: 1, difficulty: 3, hint: "The clock must still be 'ticking'.", explanation: "Long-half-life isotopes like uranium suit very old samples; carbon-14 would be long gone." },
    ],
  },

  // ───────────────────────── 4. The Four Fundamental Forces ─────────────────────────
  {
    slug: "the-four-fundamental-forces",
    title: "The Four Fundamental Forces",
    tagline: "Everything that happens, happens through four interactions",
    estMinutes: 16,
    xpReward: 190,
    difficulty: 5,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "Four Forces Run the Universe", sub: "From holding a nucleus together to binding galaxies, every interaction in nature is one of just four." } },
      { kind: "CONTEXT", title: "The shortlist of nature", content: { markdown: "Having met the particles of the Standard Model, we meet the **forces** between them. Astonishingly, every push, pull, glow, and decay in the cosmos comes down to **four fundamental interactions**, each with its own strength, range, and carrier particle." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "The four fundamental forces, from strongest to weakest:\n\n- **Strong force** — the strongest; binds quarks into protons and neutrons and holds the nucleus together against electric repulsion. Very short range (nuclear size). Carrier: **gluon**.\n- **Electromagnetism** — acts between electric charges; governs light, chemistry, electronics, and all of everyday solidity. Infinite range, but attraction and repulsion. Carrier: **photon**.\n- **Weak force** — responsible for certain radioactive decays and for the reactions that let stars fuse. Extremely short range. Carriers: **W and Z bosons**.\n- **Gravity** — by far the weakest, but always attractive and infinite in range, so it dominates at astronomical scales: planets, stars, galaxies. Carrier (theorized): the **graviton**, not yet detected.\n\nA paradox: gravity rules the universe at large yet is fantastically feeble — a tiny magnet lifts a paperclip against the pull of the entire Earth. It dominates only because it's always attractive and never cancels, while electric charges mostly balance out.\n\n**Unification** is a grand goal of physics. Electromagnetism and the weak force have been merged into one **electroweak** force. Theories aim to unite the strong force too, and ultimately gravity — a 'theory of everything' — but gravity stubbornly resists, the great unsolved problem of fundamental physics." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Holding the nucleus", problem: "What overcomes the electric repulsion of protons in a nucleus?", steps: ["Protons repel electromagnetically.", "The strong force is stronger at short range."], answer: "The strong force." },
        { title: "Weakest yet dominant", problem: "How can gravity rule the cosmos while being the weakest force?", steps: ["Gravity is always attractive and never cancels.", "Charges mostly balance out at large scale."], answer: "It accumulates over huge masses." },
        { title: "Force carriers", problem: "Which particle carries the electromagnetic force?", steps: ["EM acts between charges.", "Its carrier is the photon."], answer: "The photon." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Strong, electromagnetic, weak, gravity — strongest to weakest." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Match forces to their roles and carriers." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: the quest for unification", content: { markdown: "Physicists suspect the four forces are facets of one. At the highest energies of the early universe they may have been unified, splitting apart as the cosmos cooled. The electroweak unification (Glashow, Salam, Weinberg) was confirmed when the W and Z bosons were found exactly as predicted. Grand Unified Theories aim to fold in the strong force, and string theory and others seek to include gravity. Success would be the deepest simplification in the history of science — but nature is guarding the secret well." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Four fundamental forces: strong, electromagnetic, weak, and gravity.", "Strong force binds nuclei (gluons); electromagnetism acts on charge (photons).", "The weak force drives some radioactive decays (W and Z bosons).", "Gravity is weakest but infinite-range and always attractive, so it dominates the cosmos.", "Electromagnetism and the weak force are unified (electroweak); fuller unification is unsolved."], formulas: [{ label: "Forces, strongest to weakest", tex: "\\text{strong} > \\text{EM} > \\text{weak} > \\text{gravity}" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Which force holds protons and neutrons together in the nucleus?", options: ["gravity", "the strong force", "the weak force", "friction"], answer: 1, difficulty: 2, explanation: "The strong force binds nucleons, overcoming electric repulsion at short range." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Which is the weakest of the four fundamental forces?", options: ["strong", "electromagnetism", "weak", "gravity"], answer: 3, difficulty: 2, explanation: "Gravity is by far the weakest, though infinite in range and always attractive." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "The electromagnetic force is carried by the photon.", answer: true, difficulty: 3, explanation: "Photons mediate electromagnetism." },
      { scope: "PRACTICE", kind: "MATCHING", prompt: "Match each force to its carrier particle.", options: { left: ["Electromagnetism", "Strong force", "Weak force", "Gravity (theorized)"], right: ["Photon", "Gluon", "W and Z bosons", "Graviton"] }, answer: ["Photon", "Gluon", "W and Z bosons", "Graviton"], difficulty: 3, explanation: "Photon (EM), gluon (strong), W/Z (weak), graviton (gravity, not yet detected)." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Gravity dominates on astronomical scales despite being weakest because it is:", options: ["the fastest", "always attractive and never cancels", "carried by photons", "short-ranged"], answer: 1, difficulty: 3, hint: "Charges balance; mass doesn't.", explanation: "Gravity always adds up over huge masses, while electric charges largely cancel." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "Electromagnetism and the weak force have been unified into a single electroweak force.", answer: true, difficulty: 4, hint: "Glashow, Salam, Weinberg.", explanation: "The electroweak theory unified them, confirmed by the discovery of the W and Z bosons." },
    ],
  },
];
