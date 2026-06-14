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

  // ───────────────────────── 3. Relativistic Energy & Momentum ─────────────────────────
  {
    slug: "relativistic-energy-momentum",
    title: "Relativistic Energy & Momentum",
    tagline: "Past Newton, into the realm of the fast",
    estMinutes: 16,
    xpReward: 180,
    difficulty: 5,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "When Mass Resists Like Never Before", sub: "Push something near light speed and it behaves as if ever heavier — the price of the cosmic speed limit." } },
      { kind: "CONTEXT", title: "Ejecta at relativistic speed", content: { markdown: "A supernova hurls debris at a fair fraction of $c$, and particle accelerators routinely reach $99.99\\%$ of light speed. At such speeds Newton's $p = mv$ and $KE = \\tfrac12 mv^2$ quietly fail. Relativity supplies the corrected laws — and unifies energy and momentum into one elegant relation." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "At high speed, momentum and energy gain the Lorentz factor $\\gamma = 1/\\sqrt{1 - v^2/c^2}$:\n\n- **Relativistic momentum:** $p = \\gamma m v$. As $v \\to c$, $\\gamma \\to \\infty$, so $p$ grows without limit — no finite push reaches $c$.\n- **Total energy:** $E = \\gamma m c^2$. At rest ($\\gamma = 1$) this is $E = mc^2$; the extra over the rest energy is the **kinetic energy**, $KE = (\\gamma - 1)mc^2$.\n- **The master relation** links them for any speed:\n\n$$E^2 = (pc)^2 + (mc^2)^2.$$\n\nFor a massless particle like a photon ($m = 0$), this collapses to $E = pc$ — light carries momentum despite having no mass, which is how a **solar sail** is pushed by sunlight." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Low-speed limit", problem: "Show relativistic momentum reduces to Newton's at small $v$.", steps: ["$\\gamma \\approx 1$ when $v \\ll c$.", "$p = \\gamma m v \\approx m v$."], answer: "It recovers $p = mv$." },
        { title: "Photon momentum", problem: "What does $E^2=(pc)^2+(mc^2)^2$ give for a photon?", steps: ["Set $m = 0$.", "$E^2 = (pc)^2$."], answer: "$E = pc$ — massless light still has momentum." },
        { title: "Kinetic energy", problem: "How much energy above rest does a moving mass carry?", steps: ["Total is $\\gamma m c^2$.", "Subtract rest energy $mc^2$."], answer: "$KE = (\\gamma-1)mc^2$." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Momentum and energy both carry the factor $\\gamma$." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Work with $p=\\gamma mv$, $E=\\gamma mc^2$, and $E^2=(pc)^2+(mc^2)^2$." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: energy–momentum four-vector", content: { markdown: "Energy and momentum are two faces of one object, the **four-momentum**. Just as observers disagree on space and time separately but agree on the spacetime interval, they disagree on energy and momentum separately but agree on the invariant combination $E^2 - (pc)^2 = (mc^2)^2$. The rest mass is that invariant — the same in every frame. This is why $E = mc^2$ is frame-independent for a particle at rest." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Relativistic momentum: $p = \\gamma m v$.", "Total energy: $E = \\gamma m c^2$; kinetic energy $(\\gamma-1)mc^2$.", "Master relation: $E^2 = (pc)^2 + (mc^2)^2$.", "Massless particles: $E = pc$ (light carries momentum).", "Rest mass is the frame-invariant $\\sqrt{E^2-(pc)^2}/c^2$."], formulas: [{ label: "Energy–momentum", tex: "E^2 = (pc)^2 + (mc^2)^2" }, { label: "Relativistic momentum", tex: "p = \\gamma m v" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "As a massive object's speed approaches $c$, its momentum:", options: ["approaches zero", "grows without bound", "stays constant", "becomes negative"], answer: 1, difficulty: 3, explanation: "$p = \\gamma m v$ and $\\gamma \\to \\infty$ as $v \\to c$." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "A photon has zero mass yet carries momentum.", answer: true, difficulty: 3, explanation: "With $m=0$, $E^2=(pc)^2$ gives $E = pc$ — momentum without mass." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "The relativistic kinetic energy of a moving mass is:", options: ["$\\tfrac12 mv^2$", "$(\\gamma-1)mc^2$", "$\\gamma mc^2$", "$mc^2$"], answer: 1, difficulty: 4, explanation: "Total energy minus rest energy: $(\\gamma-1)mc^2$." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "For a photon, energy relates to momentum and the speed of light as $E = $ ? (Type like `p*c`.)", answer: { expr: "p*c", vars: ["p", "c"] }, difficulty: 3, hint: "Set $m=0$ in the master relation.", explanation: "$E = pc$ for a massless particle." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "At everyday speeds, $p = \\gamma m v$ reduces to the familiar $p = mv$.", answer: true, difficulty: 2, hint: "What is $\\gamma$ when $v \\ll c$?", explanation: "$\\gamma \\approx 1$, recovering Newtonian momentum." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "The quantity that all observers agree on, built from $E$ and $p$, is the particle's:", options: ["speed", "rest mass", "charge", "frequency"], answer: 1, difficulty: 4, hint: "$E^2-(pc)^2$ is invariant.", explanation: "$E^2-(pc)^2=(mc^2)^2$ — rest mass is frame-invariant." },
    ],
  },

  // ───────────────────────── 4. Fusion & Stellar Energy ─────────────────────────
  {
    slug: "fusion-and-stellar-energy",
    title: "Fusion & Stellar Energy",
    tagline: "How $E = mc^2$ lights the stars",
    estMinutes: 16,
    xpReward: 180,
    difficulty: 5,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "A Star Is a Controlled Bomb", sub: "Every second the Sun turns four million tonnes of mass into pure energy — and gravity keeps it from blowing apart." } },
      { kind: "CONTEXT", title: "The furnace before the explosion", content: { markdown: "A supernova is the death of a star that spent millions of years fusing light nuclei into heavier ones. Understanding that fusion — and the **mass defect** behind it — explains why stars shine, why iron ends the party, and where the atoms in your body were forged." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "In **nuclear fusion**, light nuclei merge into a heavier one. The product weighs slightly **less** than the parts — the missing **mass defect** $\\Delta m$ is released as energy via\n\n$$E = \\Delta m\\, c^2.$$\n\nIn the Sun, hydrogen fuses to helium; the $\\sim 0.7\\%$ of mass lost becomes sunlight. Because $c^2$ is enormous, a tiny $\\Delta m$ yields colossal energy.\n\n**Binding energy per nucleon** peaks at **iron**. Fusing elements lighter than iron *releases* energy; fusing heavier ones *costs* energy. So a massive star fuses its way up to an iron core — and there the energy source dies. With no outward pressure, the core collapses and rebounds as a **supernova**, which itself forges the elements heavier than iron. Stars are the universe's element factories; we are made of their ash." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Where the energy comes from", problem: "Why does fusing hydrogen release energy?", steps: ["Helium weighs less than the hydrogen that formed it.", "$E = \\Delta m c^2$ converts the lost mass."], answer: "The mass defect becomes energy." },
        { title: "Why iron is the end", problem: "Why can't a star fuse iron for energy?", steps: ["Binding energy per nucleon peaks at iron.", "Fusing beyond iron absorbs energy."], answer: "Iron fusion gives no net energy — the core fails." },
        { title: "Tiny mass, huge energy", problem: "Why is a small $\\Delta m$ enough to power a star?", steps: ["$E = \\Delta m c^2$.", "$c^2$ is about $9\\times10^{16}$."], answer: "The huge $c^2$ multiplier." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Mass defect → energy; binding energy peaks at iron." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Reason with $E = \\Delta m c^2$ and binding energy." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: nucleosynthesis", content: { markdown: "The Big Bang made mostly hydrogen and helium. Everything heavier was cooked later: carbon, oxygen, and the rest up to iron in stellar cores; the elements beyond iron in supernovae and neutron-star collisions, where a flood of neutrons builds heavy nuclei in seconds. The gold in a ring and the iodine in your thyroid were forged in cosmic cataclysms billions of years ago. 'We are star-stuff' is literal chemistry." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Fusion merges light nuclei; the product is lighter than its parts.", "The mass defect becomes energy: $E = \\Delta m c^2$.", "The Sun fuses hydrogen to helium, losing ~0.7% of the mass as light.", "Binding energy per nucleon peaks at iron — fusion past iron yields no energy.", "Supernovae and neutron-star mergers forge the elements heavier than iron."], formulas: [{ label: "Mass–energy release", tex: "E = \\Delta m\\, c^2" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Nuclear fusion releases energy because the product nucleus:", options: ["is heavier than the parts", "is lighter than the parts (mass defect)", "spins faster", "is electrically neutral"], answer: 1, difficulty: 3, explanation: "The lost mass becomes energy via $E=\\Delta m c^2$." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "The Sun shines by converting mass into energy.", answer: true, difficulty: 2, explanation: "Hydrogen-to-helium fusion turns ~0.7% of the mass into sunlight." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Binding energy per nucleon is greatest for:", options: ["hydrogen", "iron", "uranium", "helium"], answer: 1, difficulty: 4, explanation: "Iron sits at the peak — the most tightly bound nucleus." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "Write the energy released from a mass defect $m$ (use $c$ for light speed). (Type like `m*c^2`.)", answer: { expr: "m*c^2", vars: ["m", "c"] }, difficulty: 3, hint: "Einstein's relation.", explanation: "$E = m c^2$ (here $m$ is the mass defect $\\Delta m$)." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A massive star's core collapses, triggering a supernova, once it is mostly:", options: ["hydrogen", "helium", "iron", "carbon"], answer: 2, difficulty: 3, hint: "Where does fusion stop giving energy?", explanation: "An iron core produces no fusion energy, so it collapses and rebounds as a supernova." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "Elements heavier than iron are mainly forged in supernovae and neutron-star collisions, not in ordinary stellar cores.", answer: true, difficulty: 4, hint: "Fusing past iron needs energy input.", explanation: "Such extreme events supply the neutrons and energy to build the heaviest elements." },
    ],
  },
];
