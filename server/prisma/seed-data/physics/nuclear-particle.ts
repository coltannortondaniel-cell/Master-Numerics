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
];
