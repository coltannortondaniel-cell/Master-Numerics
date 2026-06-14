import type { LessonSeed } from "../types.js";

/**
 * Supernovae (grade 12 / undergraduate): modern physics — where the classical
 * picture breaks. Special relativity and E = mc², photons and the photoelectric
 * effect, and the quantized atom. Conceptual with NUMERIC/SYMBOLIC checks.
 * All original content.
 */
export const modernPhysicsLessons: LessonSeed[] = [
  // ───────────────────────── 1. Special Relativity ─────────────────────────
  {
    slug: "special-relativity",
    title: "Special Relativity",
    tagline: "Space and time, stretched",
    estMinutes: 16,
    xpReward: 180,
    difficulty: 5,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "The Speed Limit of the Universe", sub: "Hold the speed of light constant for everyone, and space and time themselves must bend to comply." } },
      { kind: "CONTEXT", title: "When stars explode", content: { markdown: "A supernova flings matter outward at a sizeable fraction of light speed, and converts mass into staggering energy. To describe such speeds, Newton's mechanics fails and Einstein's **special relativity** takes over — built on two deceptively simple postulates with shocking consequences." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "Special relativity rests on two postulates:\n\n1. The laws of physics are the same in every inertial (non-accelerating) frame.\n2. The speed of light $c \\approx 3\\times10^8\\,\\text{m/s}$ is the same for **all** observers, regardless of their motion.\n\nThe second is the radical one. To keep $c$ constant, space and time must adjust:\n\n- **Time dilation:** a moving clock runs slow, by the factor $\\gamma = \\dfrac{1}{\\sqrt{1 - v^2/c^2}}$.\n- **Length contraction:** a moving object is shortened along its motion.\n- Nothing with mass can reach $c$ — $\\gamma$ blows up as $v \\to c$.\n\nAnd mass itself is a form of energy, the most famous equation in physics:\n\n$$E = mc^2.$$\n\nA tiny mass holds enormous energy because $c^2$ is huge — the engine of stars and supernovae alike." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Gamma at low speed", problem: "Why is relativity invisible in daily life?", steps: ["Everyday $v \\ll c$.", "Then $v^2/c^2 \\approx 0$ and $\\gamma \\approx 1$."], answer: "Effects are negligible at ordinary speeds." },
        { title: "Rest energy", problem: "What does $E = mc^2$ say about a mass at rest?", steps: ["Even at rest, mass has energy.", "$E = mc^2$."], answer: "Mass is concentrated energy." },
        { title: "The cosmic limit", problem: "Can a spaceship reach the speed of light?", steps: ["$\\gamma \\to \\infty$ as $v \\to c$.", "Infinite energy needed."], answer: "No — c is unreachable for matter." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Light speed is constant for everyone; mass is energy." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Reason about the postulates and $E = mc^2$." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: spacetime", content: { markdown: "Relativity merges space and time into a single four-dimensional **spacetime**. Different observers disagree about separate distances and times, but they all agree on one combined measure, the **spacetime interval**. Events that are simultaneous for one observer are not for another — simultaneity is relative. This geometric view, perfected by Minkowski, is the launchpad for general relativity, where gravity becomes the curvature of spacetime itself." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Postulate: light speed c is the same for all observers.", "Moving clocks run slow (time dilation); moving lengths contract.", "$\\gamma = 1/\\sqrt{1 - v^2/c^2}$ grows without bound as $v \\to c$.", "No massive object can reach c.", "Mass is energy: $E = mc^2$."], formulas: [{ label: "Mass–energy", tex: "E = mc^2" }, { label: "Lorentz factor", tex: "\\gamma = \\dfrac{1}{\\sqrt{1 - v^2/c^2}}" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "According to relativity, the speed of light is:", options: ["faster for a moving observer", "the same for all observers", "slower in space", "infinite"], answer: 1, explanation: "The constancy of $c$ is the key postulate." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "A fast-moving clock runs slow compared with a stationary one.", answer: true, explanation: "Time dilation — moving clocks tick slower." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "The equation $E = mc^2$ says that:", options: ["energy and mass are unrelated", "mass is a form of energy", "light has no energy", "c depends on mass"], answer: 1, explanation: "Mass and energy are equivalent." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "Write the rest energy $E$ of a mass $m$ (speed of light $c$). (Type like `m*c^2`.)", answer: { expr: "m*c^2", vars: ["m", "c"] }, difficulty: 3, hint: "Mass times c squared.", explanation: "$E = mc^2$." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "A massive object can be accelerated to exactly the speed of light.", answer: false, hint: "What happens to $\\gamma$ as $v \\to c$?", explanation: "It would require infinite energy — impossible for matter." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Relativistic effects are negligible in daily life because:", options: ["c is small", "our speeds are tiny compared with c", "clocks are accurate", "mass is large"], answer: 1, hint: "Compare $v$ to $c$.", explanation: "At everyday speeds $v \\ll c$, so $\\gamma \\approx 1$." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "Two events simultaneous for one observer may not be simultaneous for another.", answer: true, hint: "Simultaneity is relative.", explanation: "Relativity makes simultaneity frame-dependent." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "The huge energy in $E = mc^2$ comes from:", options: ["m being large", "$c^2$ being enormous", "addition of energies", "gravity"], answer: 1, hint: "c ≈ 3×10⁸ m/s.", explanation: "$c^2$ is an enormous multiplier." },
    ],
  },

  // ───────────────────────── 2. Photons & the Quantum ─────────────────────────
  {
    slug: "photons-and-the-quantum",
    title: "Photons & the Quantum",
    tagline: "Light comes in lumps",
    estMinutes: 16,
    xpReward: 180,
    difficulty: 5,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "Energy in Packets", sub: "Light isn't a smooth stream — it arrives in indivisible grains of energy called photons." } },
      { kind: "CONTEXT", title: "The light of a dying star", content: { markdown: "Split a supernova's light into a spectrum and you see sharp, discrete lines — fingerprints of atoms. Those lines, and the **photoelectric effect** that won Einstein his Nobel Prize, revealed that light is **quantized**: it comes in packets called **photons**, each carrying a fixed chunk of energy." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "Light behaves as a stream of **photons** — discrete packets of energy. A photon's energy depends only on its **frequency**:\n\n$$E = h f,$$\n\nwhere $h = 6.63\\times10^{-34}\\,\\text{J·s}$ is **Planck's constant**. Higher frequency (bluer light) means more energetic photons.\n\nThe **photoelectric effect** is the clincher: shining light on a metal ejects electrons — but only if the light's frequency is high enough, no matter how bright a low-frequency beam is. A smooth-wave picture can't explain that; photons can: one photon, one electron, and it needs enough energy to free it.\n\nThis is **wave–particle duality**: light is both wave and particle, and matter (electrons, atoms) shows the same dual nature. It is the foundation of quantum mechanics." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Photon energy", problem: "How does a photon's energy depend on frequency?", steps: ["$E = hf$.", "Directly proportional."], answer: "Energy is proportional to frequency." },
        { title: "Which is more energetic?", problem: "Blue light or red light per photon?", steps: ["Blue has higher frequency.", "$E = hf$ is larger."], answer: "Blue — higher frequency, more energy." },
        { title: "Photoelectric threshold", problem: "Why doesn't dim blue light fail but bright red light does?", steps: ["Each photon's energy is set by frequency.", "Red photons individually too weak."], answer: "Energy per photon, not brightness, frees electrons." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "$E = hf$: energy grows with frequency." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Reason with $E = hf$ and the photon picture." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: the uncertainty principle", content: { markdown: "If particles are also waves, they can't have a perfectly definite position *and* momentum at once. Heisenberg's **uncertainty principle**, $\\Delta x\\,\\Delta p \\gtrsim \\dfrac{\\hbar}{2}$, sets a hard floor on how precisely both can be known. It isn't a measurement flaw — it's woven into reality. This fuzziness explains the stability of atoms, quantum tunnelling (how the Sun fuses), and the probabilistic heart of quantum mechanics." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Light is quantized into photons.", "Photon energy: $E = hf$ (Planck's constant $h$).", "Higher frequency means more energetic photons.", "The photoelectric effect shows energy depends on frequency, not brightness.", "Wave–particle duality underlies quantum mechanics."], formulas: [{ label: "Photon energy", tex: "E = hf" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "A photon's energy is given by:", options: ["$E = mc^2$", "$E = hf$", "$E = \\tfrac12 mv^2$", "$E = IR$"], answer: 1, explanation: "$E = hf$ — energy proportional to frequency." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Which has more energy per photon?", options: ["red light", "blue light", "they're equal", "depends on brightness"], answer: 1, explanation: "Blue is higher frequency, so $E = hf$ is larger." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "Light can behave as both a wave and a particle.", answer: true, explanation: "Wave–particle duality." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "Write a photon's energy $E$ in terms of Planck's constant $h$ and frequency $f$. (Type like `h*f`.)", answer: { expr: "h*f", vars: ["h", "f"] }, difficulty: 3, hint: "Planck's constant times frequency.", explanation: "$E = hf$." },
      { scope: "PRACTICE", kind: "GRAPH", prompt: "With $h = 1$, photon energy versus frequency is $E = f$. Graph it (enter $E$ as a function of $f$, use $x$ for $f$).", answer: { expr: "x", domain: [0, 5], variable: "x" }, difficulty: 3, hint: "Directly proportional — a line.", explanation: "$E = hf$ is linear in frequency (a straight line through the origin)." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "A very bright low-frequency light can always eject electrons if it's intense enough.", answer: false, hint: "Energy per photon depends on frequency.", explanation: "Below the threshold frequency, no single photon has enough energy, regardless of brightness." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "The photoelectric effect is best explained by treating light as:", options: ["a continuous wave", "particles (photons)", "a fluid", "heat"], answer: 1, hint: "One photon, one electron.", explanation: "The particle (photon) picture explains the frequency threshold." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Heisenberg's uncertainty principle limits simultaneous knowledge of:", options: ["mass and charge", "position and momentum", "time and temperature", "voltage and current"], answer: 1, hint: "$\\Delta x \\Delta p \\gtrsim \\hbar/2$.", explanation: "Position and momentum cannot both be known exactly." },
    ],
  },
];
