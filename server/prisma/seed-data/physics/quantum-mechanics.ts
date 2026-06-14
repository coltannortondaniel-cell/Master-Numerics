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
];
