import type { LessonSeed } from "../types.js";

/**
 * Neutron Stars & Pulsars (grade 12 / undergraduate): quantum mechanics — the
 * physics of the very small, and of the degeneracy pressure that holds a neutron
 * star up. Wave-particle duality & the wavefunction, and quantization of energy.
 * All original content.
 */
export const quantumMechanicsLessons: LessonSeed[] = [
  // ───────────────────────── 1. Wave-Particle Duality ─────────────────────────
  {
    slug: "wave-particle-duality",
    title: "Wave–Particle Duality",
    tagline: "Matter waves and probability",
    estMinutes: 16,
    xpReward: 190,
    difficulty: 5,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "Everything Is a Wave", sub: "Not just light — electrons, atoms, even you have a wavelength. The quantum world runs on probability." } },
      { kind: "CONTEXT", title: "What holds a neutron star up", content: { markdown: "A neutron star is heavier than the Sun, squeezed into a city. What stops it collapsing further isn't heat — it's a purely **quantum** effect: degeneracy pressure, born from the wave nature of matter and the rule that identical particles can't share a state. To understand it, we start with the strangest idea in physics: matter is made of waves." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "**Wave–particle duality:** every particle has a wavelength, given by **de Broglie**:\n\n$$\\lambda = \\frac{h}{p},$$\n\nwhere $p = mv$ is momentum and $h$ is Planck's constant. Big objects have absurdly tiny wavelengths (hence we never notice), but electrons' wavelengths are atom-sized — and they diffract like waves.\n\nA quantum system is described by a **wavefunction** $\\psi(x)$. Born's rule: $|\\psi(x)|^2$ is the **probability density** of finding the particle at $x$. Quantum mechanics predicts **probabilities**, not certainties.\n\nConsequences:\n\n- The **double-slit experiment**: single electrons build up an interference pattern — each one passes through 'both slits' as a wave.\n- **Heisenberg uncertainty:** $\\Delta x\\,\\Delta p \\gtrsim \\dfrac{\\hbar}{2}$ — position and momentum can't both be sharp.\n\nThis is not ignorance; it's how nature is built at the smallest scales." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "de Broglie", problem: "How does wavelength depend on momentum?", steps: ["$\\lambda = h/p$.", "Inversely."], answer: "Faster (more momentum) → shorter wavelength." },
        { title: "Why macroscopic objects look classical", problem: "Why don't baseballs diffract?", steps: ["Large $p$ → tiny $\\lambda$.", "Wavelength far smaller than any slit."], answer: "Their wavelength is unmeasurably small." },
        { title: "Meaning of ψ", problem: "What does $|\\psi(x)|^2$ give?", steps: ["Born's rule.", "Probability density."], answer: "The probability of finding the particle there." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "λ = h/p; |ψ|² is probability." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Reason with duality, the wavefunction, and uncertainty." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: the Pauli exclusion principle", content: { markdown: "Electrons (and neutrons) are **fermions**: no two identical ones can occupy the same quantum state. Pack them tightly and they're forced into ever-higher momentum states, creating **degeneracy pressure** — a resistance to compression that exists even at absolute zero, purely from quantum statistics. This pressure holds up white dwarfs (electron degeneracy) and neutron stars (neutron degeneracy), until gravity finally wins and a black hole forms." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Every particle has a wavelength: $\\lambda = h/p$ (de Broglie).", "The wavefunction ψ encodes the state; $|\\psi|^2$ is probability density.", "Quantum mechanics predicts probabilities, not certainties.", "Uncertainty: $\\Delta x\\,\\Delta p \\gtrsim \\hbar/2$.", "Pauli exclusion gives degeneracy pressure, holding up neutron stars."], formulas: [{ label: "de Broglie", tex: "\\lambda = \\dfrac{h}{p}" }, { label: "Uncertainty", tex: "\\Delta x\\,\\Delta p \\gtrsim \\dfrac{\\hbar}{2}" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "The de Broglie wavelength of a particle is:", options: ["$\\lambda = hp$", "$\\lambda = h/p$", "$\\lambda = p/h$", "$\\lambda = h + p$"], answer: 1, explanation: "$\\lambda = h/p$." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "$|\\psi(x)|^2$ represents the:", options: ["energy", "probability density", "momentum", "wavelength"], answer: 1, explanation: "Born's rule: probability density." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "Electrons can produce an interference pattern, like waves.", answer: true, explanation: "The double-slit experiment shows electron interference." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "Write the de Broglie wavelength $\\lambda$ in terms of Planck's constant $h$ and momentum $p$. (Type like `h/p`.)", answer: { expr: "h/p", vars: ["h", "p"] }, difficulty: 3, hint: "Planck over momentum.", explanation: "$\\lambda = h/p$." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "Macroscopic objects don't show wave behavior because their wavelength is extremely small.", answer: true, hint: "Large momentum.", explanation: "Big $p$ gives a negligibly small $\\lambda$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Heisenberg's principle says we cannot simultaneously know exact:", options: ["mass and charge", "position and momentum", "energy and charge", "spin and mass"], answer: 1, hint: "$\\Delta x\\Delta p \\gtrsim \\hbar/2$.", explanation: "Position and momentum trade off." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Degeneracy pressure in a neutron star arises from the:", options: ["high temperature", "Pauli exclusion principle", "strong magnetic field", "fusion reactions"], answer: 1, hint: "Identical fermions can't share a state.", explanation: "Pauli exclusion forces neutrons into high-momentum states." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "Quantum mechanics generally predicts probabilities rather than certain outcomes.", answer: true, hint: "Born's rule.", explanation: "Outcomes are probabilistic, governed by $|\\psi|^2$." },
    ],
  },

  // ───────────────────────── 2. Quantization of Energy ─────────────────────────
  {
    slug: "quantization-of-energy",
    title: "Quantization of Energy",
    tagline: "Why energy comes in steps",
    estMinutes: 15,
    xpReward: 180,
    difficulty: 5,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "Energy on a Ladder", sub: "Confine a wave and only certain notes fit. That's why atoms emit sharp, specific colors." } },
      { kind: "CONTEXT", title: "The barcode of starlight", content: { markdown: "Each element emits light at its own exact set of colors — a spectral 'barcode' that lets us read the composition of stars across the galaxy. Those discrete lines are direct evidence that electron energies in atoms are **quantized**: allowed only at specific levels." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "When a wave is **confined**, only certain wavelengths fit — like a guitar string, which sounds only its fundamental and harmonics. A confined electron is the same: only specific **standing-wave** states are allowed, so its energy is **quantized** into discrete levels $E_1, E_2, E_3, \\dots$\n\nKey consequences:\n\n- An electron can only have an allowed energy, never one in between.\n- It jumps between levels by absorbing or emitting a **photon** whose energy exactly matches the gap:\n\n$$E_{\\text{photon}} = E_{\\text{high}} - E_{\\text{low}} = hf.$$\n\n- Because the gaps are fixed, the emitted colors are sharp and characteristic — the spectral lines.\n\nThere is a lowest level, the **ground state**, with nonzero energy: the uncertainty principle forbids an electron from sitting perfectly still at the bottom. Quantization, born from confinement plus the wave nature of matter, is why atoms are stable and why each element glows its own color." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Photon from a jump", problem: "An electron drops between levels differing by energy $\\Delta E$. What is emitted?", steps: ["A photon of that energy.", "$E = hf = \\Delta E$."], answer: "A photon with $hf = \\Delta E$." },
        { title: "Why lines are sharp", problem: "Why are atomic spectra discrete lines, not a smooth rainbow?", steps: ["Energy gaps are fixed.", "Only those photon energies appear."], answer: "Fixed gaps → fixed colors." },
        { title: "Ground state", problem: "Can a confined electron have zero energy?", steps: ["Uncertainty forbids being perfectly at rest.", "Lowest state has $E > 0$."], answer: "No — the ground state energy is nonzero." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Confined waves → discrete energy levels." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Relate level gaps to emitted photons." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: the Schrödinger equation", content: { markdown: "All of this follows from one master equation. **Schrödinger's equation** plays the role of $F = ma$ for quantum systems: given the forces (a potential), it determines the allowed wavefunctions and their energies. For a confined particle it yields exactly a discrete ladder of $\\psi$'s and $E$'s; for a free particle, a continuum. Solving it for the hydrogen atom reproduces the observed spectrum to extraordinary precision — one of the great triumphs of physics." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Confining a wave allows only certain standing-wave states.", "So a bound electron's energy is quantized into discrete levels.", "Jumps emit/absorb a photon with $hf = \\Delta E$.", "Fixed gaps produce sharp spectral lines — each element's fingerprint.", "The Schrödinger equation determines the allowed states and energies."], formulas: [{ label: "Photon from a transition", tex: "hf = E_{\\text{high}} - E_{\\text{low}}" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Electron energies in an atom are:", options: ["continuous", "quantized into discrete levels", "always zero", "unlimited"], answer: 1, explanation: "Confinement quantizes the energy." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "An electron emits a photon when it drops to a lower energy level.", answer: true, explanation: "The energy difference leaves as a photon." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Sharp spectral lines occur because energy gaps are:", options: ["random", "fixed", "zero", "continuous"], answer: 1, explanation: "Fixed gaps → fixed photon energies → sharp lines." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "Write the photon energy from a transition in terms of frequency $f$ and Planck's constant $h$. (Type like `h*f`.)", answer: { expr: "h*f", vars: ["h", "f"] }, difficulty: 3, hint: "Same as any photon.", explanation: "$E = hf = \\Delta E$." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "A confined electron can sit perfectly still with exactly zero energy.", answer: false, hint: "Uncertainty principle.", explanation: "The ground state has nonzero energy." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "The analogy for quantized energy levels is a:", options: ["smooth ramp", "guitar string's harmonics", "flowing river", "straight line"], answer: 1, hint: "Only certain notes fit.", explanation: "A confined wave allows only specific standing modes." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "The quantum equivalent of $F = ma$ is the:", options: ["Schrödinger equation", "Ohm's law", "ideal gas law", "Coulomb law"], answer: 0, hint: "It governs the wavefunction.", explanation: "Schrödinger's equation determines quantum dynamics." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "Each element has a unique pattern of spectral lines.", answer: true, hint: "A barcode of light.", explanation: "Distinct energy levels give each element its own spectrum." },
    ],
  },

  // ───────────────────────── 3. The Wavefunction & Probability ─────────────────────────
  {
    slug: "the-wavefunction",
    title: "The Wavefunction & Probability",
    tagline: "Where reality becomes a cloud of chances",
    estMinutes: 16,
    xpReward: 180,
    difficulty: 5,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "An Electron Is a Smear of Maybe", sub: "Quantum particles have no single location until measured — only a wave of probability spread through space." } },
      { kind: "CONTEXT", title: "Reading a neutron star's matter", content: { markdown: "Inside a neutron star, matter is crushed to nuclear density, and only quantum rules describe it. At the heart of those rules is the **wavefunction** — the object that replaced the classical idea of a particle with a definite position and velocity." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "A quantum particle is described by a **wavefunction** $\\psi(x)$. The wavefunction itself isn't directly observable, but its square gives the **probability** of finding the particle at each location:\n\n$$P(x) \\propto |\\psi(x)|^2.$$\n\nKey consequences:\n\n- Before measurement, the particle is in a **superposition** — a blend of possible positions (and states). It has no single value.\n- **Measurement** forces a definite outcome at random, weighted by $|\\psi|^2$ — the wavefunction 'collapses.'\n- Total probability must equal 1: the particle is *somewhere*.\n- The shape of $\\psi$ over time follows the **Schrödinger equation**, the quantum law of motion.\n\nThis is why quantum mechanics is **probabilistic**: it predicts the odds of outcomes, not certainties. Einstein resisted it — 'God does not play dice' — but experiment has sided with the dice every time." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "What does $|\\psi|^2$ mean?", problem: "Interpret the square of the wavefunction.", steps: ["$\\psi$ is a probability amplitude.", "$|\\psi|^2$ is a probability density."], answer: "The likelihood of finding the particle there." },
        { title: "Superposition", problem: "Where is an electron before measurement?", steps: ["It has no single position.", "It is a weighted blend of possibilities."], answer: "In a superposition of locations." },
        { title: "Normalization", problem: "Why must the total probability be 1?", steps: ["The particle exists somewhere.", "Summing $|\\psi|^2$ over all space gives 1."], answer: "Probabilities must total 100%." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "$|\\psi|^2$ is probability; measurement collapses superposition." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Reason about wavefunctions and probability." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: entanglement", content: { markdown: "Two particles can share a single wavefunction, so that measuring one instantly fixes the state of the other, no matter how far apart — **entanglement**, what Einstein called 'spooky action at a distance.' It transmits no usable signal faster than light, but it is real and now powers quantum computing and quantum cryptography. The wavefunction, once a bookkeeping device, has become engineering." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["A particle is described by a wavefunction $\\psi$.", "$|\\psi|^2$ gives the probability of finding it at each point.", "Before measurement a particle is in a superposition of possibilities.", "Measurement collapses $\\psi$ to a random outcome weighted by $|\\psi|^2$.", "Quantum mechanics predicts probabilities, not certainties."], formulas: [{ label: "Born rule", tex: "P(x) \\propto |\\psi(x)|^2" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "The square of the wavefunction, $|\\psi|^2$, represents:", options: ["the particle's speed", "the probability of finding the particle there", "the particle's charge", "the particle's mass"], answer: 1, difficulty: 3, explanation: "$|\\psi|^2$ is the probability density." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "Before measurement, a quantum particle can be in a superposition of several positions.", answer: true, difficulty: 3, explanation: "Superposition: a blend of possibilities until measured." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Quantum mechanics predicts:", options: ["exact outcomes every time", "the probabilities of outcomes", "nothing measurable", "only classical results"], answer: 1, difficulty: 2, explanation: "It is fundamentally probabilistic." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "When a measurement is made, the wavefunction:", options: ["disappears forever", "collapses to a definite outcome", "doubles", "becomes negative"], answer: 1, difficulty: 3, hint: "One result is selected.", explanation: "Measurement collapses $\\psi$ to a single outcome, weighted by $|\\psi|^2$." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "The total probability of finding a particle somewhere in space must equal 1.", answer: true, difficulty: 2, hint: "The particle exists.", explanation: "Normalization: integrating $|\\psi|^2$ over all space gives 1." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "The equation governing how a wavefunction evolves in time is the:", options: ["Newton equation", "Schrödinger equation", "Maxwell equation", "Einstein equation"], answer: 1, difficulty: 3, hint: "The quantum law of motion.", explanation: "The Schrödinger equation governs the wavefunction's evolution." },
    ],
  },

  // ───────────────────────── 4. Tunnelling & Degeneracy Pressure ─────────────────────────
  {
    slug: "tunnelling-and-degeneracy",
    title: "Tunnelling & Degeneracy Pressure",
    tagline: "The quantum effects that hold up a dead star",
    estMinutes: 16,
    xpReward: 180,
    difficulty: 5,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "Held Up by a Rule, Not a Fire", sub: "A neutron star resists collapse not with heat or fuel, but with a quantum law about how particles may be packed." } },
      { kind: "CONTEXT", title: "What holds a neutron star up?", content: { markdown: "A neutron star has burned out — no fusion fights gravity. Yet it doesn't collapse to a point. The reason is purely quantum: **degeneracy pressure**, a consequence of the **Pauli exclusion principle**. And the same quantum strangeness lets the Sun fuse at all, through **tunnelling**." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "Two deeply quantum effects:\n\n**Quantum tunnelling.** Because a particle is a spread-out wave, it has a small probability of being found *beyond* an energy barrier it classically could never cross. It can 'tunnel' through. This is how protons in the Sun fuse despite their electric repulsion — classically they'd never get close enough; quantum-mechanically a few tunnel through and ignite the star. Tunnelling also drives radioactive alpha decay and the transistors in your phone.\n\n**The Pauli exclusion principle & degeneracy pressure.** Identical fermions (electrons, neutrons) cannot occupy the same quantum state. Crush matter and the particles are forced into ever-higher-energy states — they resist being packed, producing **degeneracy pressure** that needs no heat. This pressure holds up **white dwarfs** (electron degeneracy) and **neutron stars** (neutron degeneracy). Exceed the limit (about 1.4 solar masses for a white dwarf — the **Chandrasekhar limit**) and even this fails: the star collapses to a neutron star or a black hole." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Why the Sun can fuse", problem: "How do repelling protons fuse at the Sun's temperature?", steps: ["Classically they can't overcome repulsion.", "Their wave nature lets a few tunnel through."], answer: "Quantum tunnelling enables fusion." },
        { title: "No two alike", problem: "What does Pauli exclusion forbid?", steps: ["Identical fermions can't share a state.", "Packing forces higher-energy states."], answer: "Two identical fermions in the same quantum state." },
        { title: "Holding up a dead star", problem: "What supports a neutron star against gravity?", steps: ["No fusion remains.", "Neutron degeneracy pressure resists compression."], answer: "Quantum degeneracy pressure." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Tunnelling enables fusion; exclusion gives degeneracy pressure." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Connect quantum rules to stellar remnants." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: the Chandrasekhar limit", content: { markdown: "At nineteen, on a ship to England, **Subrahmanyan Chandrasekhar** calculated that electron degeneracy pressure can support a white dwarf only up to about **1.4 solar masses**. Beyond it, gravity wins. The establishment mocked him for years; he was right, and won the Nobel Prize. Above his limit, stars collapse to neutron stars — held by neutron degeneracy — and above a further limit, to black holes, where no known pressure can stop the fall." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Quantum tunnelling lets particles pass barriers they classically couldn't — enabling stellar fusion.", "The Pauli exclusion principle forbids identical fermions sharing a quantum state.", "Degeneracy pressure (needing no heat) supports white dwarfs and neutron stars.", "The Chandrasekhar limit (~1.4 solar masses) caps a white dwarf's mass.", "Beyond these limits, collapse continues to a neutron star or black hole."], formulas: [{ label: "Chandrasekhar limit", tex: "M_{max} \\approx 1.4\\, M_{\\odot}" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Quantum tunnelling allows a particle to:", options: ["move faster than light", "pass through a barrier it classically couldn't cross", "gain mass", "stop existing"], answer: 1, difficulty: 3, explanation: "Its wave nature gives a probability of being found beyond the barrier." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "Two identical electrons cannot occupy the same quantum state.", answer: true, difficulty: 3, explanation: "The Pauli exclusion principle forbids it." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "A neutron star is held up against gravity by:", options: ["nuclear fusion", "neutron degeneracy pressure", "magnetism", "radiation pressure"], answer: 1, difficulty: 3, explanation: "Degeneracy pressure from packed neutrons, a quantum effect needing no heat." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Quantum tunnelling is essential to the Sun because it lets protons:", options: ["cool down", "fuse despite their electric repulsion", "escape the Sun", "become photons"], answer: 1, difficulty: 3, hint: "Classically they couldn't get close enough.", explanation: "A few protons tunnel through the repulsion barrier, igniting fusion." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "Degeneracy pressure requires the star to stay hot.", answer: false, difficulty: 3, hint: "It comes from the exclusion principle, not heat.", explanation: "Degeneracy pressure is purely quantum and persists even in a cold, burnt-out star." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Above the Chandrasekhar limit (~1.4 solar masses), a white dwarf:", options: ["becomes stable forever", "collapses further (to a neutron star or black hole)", "turns into the Sun", "loses all gravity"], answer: 1, difficulty: 4, hint: "Electron degeneracy pressure is no longer enough.", explanation: "Gravity overwhelms degeneracy pressure, driving collapse." },
    ],
  },
];
