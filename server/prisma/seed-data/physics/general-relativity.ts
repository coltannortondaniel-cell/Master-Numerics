import type { LessonSeed } from "../types.js";

/**
 * Black Holes (undergraduate): general relativity — gravity as the curvature of
 * spacetime. The equivalence principle & curved spacetime, and black holes with
 * the Schwarzschild radius. Conceptual with NUMERIC/SYMBOLIC. All original.
 */
export const generalRelativityLessons: LessonSeed[] = [
  // ───────────────────────── 1. Curved Spacetime ─────────────────────────
  {
    slug: "curved-spacetime",
    title: "Curved Spacetime",
    tagline: "Gravity is geometry",
    estMinutes: 16,
    xpReward: 200,
    difficulty: 5,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "Mass Tells Space How to Curve", sub: "Einstein's deepest idea: gravity isn't a force pulling through space — it's the shape of space and time themselves." } },
      { kind: "CONTEXT", title: "Beyond Newton", content: { markdown: "Newton's gravity is astonishingly accurate, but it has a puzzle: how does the Sun reach across empty space to pull the Earth, instantly? Einstein's **general relativity** dissolves the puzzle by reimagining gravity entirely — not as a force, but as the **curvature of spacetime**, the stage on which black holes are written." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "General relativity rests on the **equivalence principle**: being in a gravitational field is locally indistinguishable from accelerating. Standing on Earth feels exactly like riding an accelerating rocket — so gravity and acceleration are the same thing.\n\nFrom this, Einstein concluded that **mass and energy curve spacetime**, and objects in free fall simply follow the straightest possible paths (**geodesics**) through that curved geometry. Summarized by Wheeler:\n\n> *Spacetime tells matter how to move; matter tells spacetime how to curve.*\n\nPredictions, all confirmed:\n\n- **Light bends** near mass (gravitational lensing).\n- **Time runs slower** in stronger gravity (gravitational time dilation — your GPS corrects for it).\n- **Orbits precess**, explaining Mercury's anomaly that Newton couldn't.\n\nGravity, in this view, is not a force at all — it's the geometry of the universe." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Equivalence", problem: "How does standing on Earth relate to accelerating?", steps: ["Both feel identical locally.", "Equivalence principle."], answer: "Gravity ≈ acceleration." },
        { title: "Light and gravity", problem: "Does gravity affect light?", steps: ["Light follows spacetime geodesics.", "Curved near mass."], answer: "Yes — light bends (lensing)." },
        { title: "Time", problem: "Where do clocks run slower?", steps: ["Stronger gravity = more time dilation.", "Lower clocks tick slow."], answer: "Deeper in a gravity well." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Gravity = curved spacetime; equivalence principle." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Reason about curvature, light, and time." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: the Einstein field equations", content: { markdown: "All of this is captured in one compact line, the **Einstein field equations**: $G_{\\mu\\nu} = \\dfrac{8\\pi G}{c^4} T_{\\mu\\nu}$. The left side ($G_{\\mu\\nu}$) measures the curvature of spacetime; the right side ($T_{\\mu\\nu}$) measures the energy and momentum present. The equation says, precisely, that energy curves geometry. Its solutions describe everything from the expanding universe to gravitational waves — ripples in spacetime detected by LIGO in 2015, exactly a century after Einstein predicted them." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Equivalence principle: gravity is locally like acceleration.", "Mass-energy curves spacetime; free objects follow geodesics.", "Gravity is geometry, not a force.", "Predictions: light bending, gravitational time dilation, orbit precession.", "The Einstein field equations relate curvature to energy."], formulas: [{ label: "Einstein field equations", tex: "G_{\\mu\\nu} = \\dfrac{8\\pi G}{c^4} T_{\\mu\\nu}" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "In general relativity, gravity is:", options: ["a pulling force", "the curvature of spacetime", "magnetism", "an illusion of speed"], answer: 1, explanation: "Gravity is spacetime curvature." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "The equivalence principle says gravity is locally indistinguishable from acceleration.", answer: true, explanation: "That is exactly the equivalence principle." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Near a massive object, light:", options: ["speeds up", "bends", "stops", "is unaffected"], answer: 1, explanation: "Light follows curved geodesics — gravitational lensing." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "Clocks run slower in stronger gravitational fields.", answer: true, hint: "Gravitational time dilation.", explanation: "GPS satellites must correct for this effect." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Objects in free fall follow paths called:", options: ["tangents", "geodesics", "asymptotes", "secants"], answer: 1, hint: "Straightest paths in curved spacetime.", explanation: "Free-fall paths are geodesics." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "General relativity explained the precession of Mercury's orbit that Newton's theory could not.", answer: true, hint: "A famous early success.", explanation: "GR precisely accounts for Mercury's perihelion precession." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Ripples in spacetime, detected by LIGO in 2015, are:", options: ["sound waves", "gravitational waves", "radio waves", "light waves"], answer: 1, hint: "Predicted by Einstein.", explanation: "Gravitational waves are propagating spacetime curvature." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "In the field equations, the source of curvature is:", options: ["temperature", "energy and momentum", "electric charge", "color"], answer: 1, hint: "The right-hand side $T_{\\mu\\nu}$.", explanation: "Energy-momentum curves spacetime." },
    ],
  },

  // ───────────────────────── 2. Black Holes ─────────────────────────
  {
    slug: "black-holes-and-the-event-horizon",
    title: "Black Holes & the Event Horizon",
    tagline: "Where escape becomes impossible",
    estMinutes: 16,
    xpReward: 200,
    difficulty: 5,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "The Point of No Return", sub: "Curve spacetime steeply enough and not even light can climb out. That boundary is the event horizon." } },
      { kind: "CONTEXT", title: "When gravity wins", content: { markdown: "When a massive star's core collapses and no pressure can stop it, spacetime curves so steeply that a region forms from which **nothing escapes** — a **black hole**. It is general relativity taken to its logical extreme, and a real object we have now photographed." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "**Escape velocity** is the speed needed to break free of a mass. Pack enough mass into a small enough radius and the escape velocity reaches the speed of light $c$ — beyond that boundary, nothing, not even light, can escape. That is a **black hole**.\n\nThe boundary is the **event horizon**, at the **Schwarzschild radius**:\n\n$$r_s = \\frac{2GM}{c^2}.$$\n\nIt is proportional to mass: double the mass, double the horizon. For the Sun, $r_s \\approx 3\\,\\text{km}$; for Earth, about $9\\,\\text{mm}$.\n\n- Cross the horizon and all paths lead inward to the **singularity** — the future itself points down.\n- The horizon isn't a surface of matter; it's a boundary in spacetime.\n- **Hawking radiation:** quantum effects let black holes slowly evaporate, the deepest known link between gravity, quantum mechanics, and thermodynamics." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Scaling", problem: "If a black hole's mass doubles, what happens to $r_s$?", steps: ["$r_s = 2GM/c^2 \\propto M$.", "Doubles."], answer: "The Schwarzschild radius doubles." },
        { title: "What is the horizon?", problem: "Is the event horizon a physical wall?", steps: ["No matter there.", "A boundary in spacetime."], answer: "A one-way boundary, not a surface." },
        { title: "Why black?", problem: "Why does no light escape?", steps: ["Escape velocity exceeds $c$.", "Nothing can go faster than light."], answer: "Light itself can't climb out." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Event horizon at $r_s = 2GM/c^2$." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Use the proportionality $r_s \\propto M$." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: information and the firewall", content: { markdown: "Hawking radiation creates a deep paradox. If a black hole evaporates completely, what happens to the information about everything that fell in? Quantum mechanics insists information can't be destroyed; relativity seems to say it's lost. This **black hole information paradox** is one of the sharpest unsolved problems in physics, and resolving it is widely believed to require a full theory of **quantum gravity** — the unfinished marriage of general relativity and quantum mechanics." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["A black hole's escape velocity exceeds the speed of light.", "The event horizon is the boundary of no return.", "Schwarzschild radius $r_s = 2GM/c^2$, proportional to mass.", "Inside, all paths lead to the singularity.", "Hawking radiation makes black holes slowly evaporate."], formulas: [{ label: "Schwarzschild radius", tex: "r_s = \\dfrac{2GM}{c^2}" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "The event horizon of a black hole is:", options: ["a solid surface", "the boundary of no return", "its center", "made of light"], answer: 1, explanation: "It's the boundary beyond which nothing escapes." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "The Schwarzschild radius is proportional to:", options: ["$M^2$", "$M$", "$1/M$", "$\\sqrt{M}$"], answer: 1, explanation: "$r_s = 2GM/c^2 \\propto M$." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "Not even light can escape from within the event horizon.", answer: true, explanation: "Escape velocity there exceeds $c$." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "Write the Schwarzschild radius $r_s$ in terms of $G$, $M$, and $c$. (Type like `2*G*M/c^2`.)", answer: { expr: "2*G*M/c^2", vars: ["G", "M", "c"] }, difficulty: 4, hint: "Two G M over c squared.", explanation: "$r_s = \\dfrac{2GM}{c^2}$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "If a black hole's mass triples, its Schwarzschild radius becomes:", options: ["unchanged", "3× larger", "9× larger", "1/3"], answer: 1, hint: "$r_s \\propto M$.", explanation: "Linear in mass — triples." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Hawking radiation implies black holes:", options: ["last forever", "slowly evaporate", "grow without limit", "emit no energy"], answer: 1, hint: "A quantum effect at the horizon.", explanation: "They radiate and slowly lose mass." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "Reconciling black hole evaporation with quantum mechanics points to a need for quantum gravity.", answer: true, hint: "The information paradox.", explanation: "It's a key motivation for quantum gravity." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A black hole forms when a mass is compressed within its:", options: ["orbital radius", "Schwarzschild radius", "wavelength", "half-life"], answer: 1, hint: "Inside the horizon.", explanation: "Compression within $r_s$ creates a black hole." },
    ],
  },
];
