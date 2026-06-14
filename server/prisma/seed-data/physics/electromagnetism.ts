import type { LessonSeed } from "../types.js";

/**
 * Star Clusters & Nebulae (grades 11–12 / undergrad): electricity & magnetism —
 * the force shaping ionized nebular gas. Electric charge & Coulomb's law,
 * electric fields, and circuits with Ohm's law. NUMERIC/SYMBOLIC/GRAPH led.
 * All original content.
 */
export const electromagnetismLessons: LessonSeed[] = [
  // ───────────────────────── 1. Electric Charge & Coulomb's Law ─────────────────────────
  {
    slug: "electric-charge-and-coulombs-law",
    title: "Electric Charge & Coulomb's Law",
    tagline: "Like repels, opposite attracts",
    estMinutes: 15,
    xpReward: 170,
    difficulty: 4,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "The Electric Grip", sub: "A force like gravity but vastly stronger — and it comes in two signs, so it can push as well as pull." } },
      { kind: "CONTEXT", title: "Glowing clouds of charge", content: { markdown: "A nebula glows because its gas is **ionized** — atoms stripped into charged particles. What governs them is the **electric force**, described by Coulomb's law. It looks almost identical to Newton's gravity, but it is enormously stronger and, uniquely, can both attract and repel." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "**Electric charge** comes in two kinds, positive and negative, measured in coulombs (C). The rule: **like charges repel, opposite charges attract.**\n\n**Coulomb's law** gives the force between two point charges:\n\n$$F = k\\,\\frac{q_1 q_2}{r^2},$$\n\nwhere $r$ is their separation and $k \\approx 9\\times10^{9}\\ \\text{N·m}^2/\\text{C}^2$.\n\nCompare with gravity, $F = G\\dfrac{m_1 m_2}{r^2}$: both are **inverse-square** laws. The differences:\n\n- Charge has two signs, so the force can be attractive *or* repulsive; gravity only attracts.\n- The electric force is far stronger — about $10^{36}$ times stronger between two protons.\n\nTriple the distance and the force drops to $\\tfrac19$, exactly as with gravity." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Inverse-square", problem: "Two charges' separation triples. What happens to the force?", steps: ["$F \\propto 1/r^2$.", "$1/3^2 = 1/9$."], answer: "It drops to one-ninth." },
        { title: "Sign of the force", problem: "Two negative charges — attract or repel?", steps: ["Like charges.", "Like repels."], answer: "They repel." },
        { title: "Compare to gravity", problem: "How is Coulomb's law like Newton's gravity?", steps: ["Both $\\propto q_1q_2/r^2$ or $m_1m_2/r^2$.", "Both inverse-square."], answer: "Same inverse-square form." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Like repels, opposite attracts; inverse-square." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Use the inverse-square dependence and the sign rule." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: superposition", content: { markdown: "With more than two charges, the **principle of superposition** applies: the total force on any charge is the **vector sum** of the separate Coulomb forces from every other charge, each computed as if the others weren't there. This simple additivity — shared with gravity — is what lets us handle complex arrangements, and it underlies the electric field of any charged object, however intricate." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Charge is positive or negative; like repels, opposite attracts.", "Coulomb's law: $F = kq_1q_2/r^2$.", "It is an inverse-square law, like gravity.", "The electric force can attract or repel and is far stronger than gravity.", "Forces from many charges add by superposition (vector sum)."], formulas: [{ label: "Coulomb's law", tex: "F = k\\dfrac{q_1 q_2}{r^2}" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Two charges with the same sign will:", options: ["attract", "repel", "do nothing", "merge"], answer: 1, explanation: "Like charges repel." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Coulomb's law depends on distance as:", options: ["$\\propto r$", "$\\propto 1/r$", "$\\propto 1/r^2$", "independent of $r$"], answer: 2, explanation: "Inverse-square, like gravity." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "Unlike gravity, the electric force can repel as well as attract.", answer: true, explanation: "Charge has two signs, so the force can do both." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "If the distance between two charges triples, the force becomes:", options: ["3× larger", "9× larger", "1/3", "1/9"], answer: 3, hint: "$1/3^2$.", explanation: "Inverse-square: $1/9$." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "With $k q_1 q_2 = c$ constant, write the Coulomb force $F$ as a function of distance $r$. (Type like `c/r^2`.)", answer: { expr: "c/r^2", vars: ["c", "r"] }, difficulty: 3, hint: "Inverse square of $r$.", explanation: "$F = \\dfrac{c}{r^2}$." },
      { scope: "PRACTICE", kind: "GRAPH", prompt: "Taking $kq_1q_2 = 1$, the Coulomb force is $F = 1/r^2$. Graph it (enter $F$ as a function of $r$, use $x$ for $r$).", answer: { expr: "1/x^2", domain: [0.5, 4], variable: "x" }, difficulty: 4, hint: "Inverse-square curve.", explanation: "$F = 1/r^2$ falls off steeply with distance." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "Coulomb's law and Newton's gravitation share the same inverse-square form.", answer: true, hint: "Compare $q_1q_2/r^2$ and $m_1m_2/r^2$.", explanation: "Both are inverse-square in the separation." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "The total force from several charges on one charge is found by:", options: ["taking the largest one", "adding the forces as vectors", "averaging them", "ignoring distance"], answer: 1, hint: "Superposition.", explanation: "Forces add as vectors — the superposition principle." },
    ],
  },

  // ───────────────────────── 2. Electric Fields ─────────────────────────
  {
    slug: "electric-fields",
    title: "Electric Fields",
    tagline: "The force per unit charge",
    estMinutes: 15,
    xpReward: 160,
    difficulty: 4,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "Force at a Distance", sub: "A charge reshapes the space around it into a field — and any other charge feels that field, not the distant source directly." } },
      { kind: "CONTEXT", title: "Mapping the invisible", content: { markdown: "How does one charge 'know' another is there across empty space? Physics answers with the **field**: a charge fills the surrounding space with an electric field, and any charge placed there feels a force from the local field. The field is the real, physical go-between." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "The **electric field** $E$ at a point is the force per unit positive charge placed there:\n\n$$E = \\frac{F}{q}, \\qquad \\text{so} \\qquad F = qE.$$\n\nIts units are newtons per coulomb (N/C). A single point charge $Q$ produces a field\n\n$$E = k\\,\\frac{Q}{r^2},$$\n\nagain inverse-square. The field points **away** from positive charges and **toward** negative ones — the direction a small positive test charge would be pushed.\n\nField lines picture it: denser lines mean a stronger field. Between two parallel charged plates the field is **uniform** (constant strength and direction), the configuration inside capacitors and the setup for accelerating particles in a straight line." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Force from a field", problem: "A charge $q = 2\\,\\text{C}$ sits in a field $E = 5\\,\\text{N/C}$. Find the force.", steps: ["$F = qE$.", "$2 \\times 5$."], answer: "$F = 10\\,\\text{N}$." },
        { title: "Field from force", problem: "A $3\\,\\text{C}$ charge feels $12\\,\\text{N}$. Find $E$.", steps: ["$E = F/q$.", "$12/3$."], answer: "$E = 4\\,\\text{N/C}$." },
        { title: "Direction", problem: "Which way does the field point near a positive charge?", steps: ["Away from positive.", "Toward negative."], answer: "Radially outward." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "$E = F/q$; field points away from positive." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Relate field, force, and charge with $F = qE$." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: energy and potential", content: { markdown: "Just as height in a gravity field stores potential energy, position in an electric field stores **electric potential energy**. The energy per unit charge is the **potential** $V$, measured in **volts**. A difference in potential — a **voltage** — is what drives charges through a circuit, exactly as a height difference drives water downhill. Field and potential are two views of the same thing: the field points 'downhill' in potential, from high $V$ to low." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["The electric field is force per unit charge: $E = F/q$.", "A charge in a field feels $F = qE$.", "A point charge makes a field $E = kQ/r^2$ (inverse-square).", "Field points away from positive charges, toward negative.", "Potential (volts) is the energy per unit charge; voltage drives current."], formulas: [{ label: "Field", tex: "E = \\dfrac{F}{q}" }, { label: "Point-charge field", tex: "E = k\\dfrac{Q}{r^2}" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "A charge $q = 2\\,\\text{C}$ sits in a field $E = 5\\,\\text{N/C}$. Find the force in newtons.", answer: { value: 10, tolerance: 0 }, explanation: "$F = qE = 10\\,\\text{N}$." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "A $3\\,\\text{C}$ charge feels a force of $12\\,\\text{N}$. Find the field $E$ in N/C.", answer: { value: 4, tolerance: 0 }, explanation: "$E = F/q = 4$." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "The electric field near a positive charge points:", options: ["toward the charge", "away from the charge", "in circles", "there is none"], answer: 1, explanation: "Away from positive charges." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "Write the force $F$ on a charge $q$ in a field $E$. (Type like `q*E`.)", answer: { expr: "q*E", vars: ["q", "E"] }, difficulty: 2, hint: "Field times charge.", explanation: "$F = qE$." },
      { scope: "PRACTICE", kind: "GRAPH", prompt: "Taking $kQ = 1$, a point charge's field is $E = 1/r^2$. Graph it (enter $E$ as a function of $r$, use $x$ for $r$).", answer: { expr: "1/x^2", domain: [0.5, 4], variable: "x" }, difficulty: 4, hint: "Inverse-square again.", explanation: "$E = 1/r^2$ — the same shape as the Coulomb force." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A $0.5\\,\\text{C}$ charge sits in a $20\\,\\text{N/C}$ field. Find the force in newtons.", answer: { value: 10, tolerance: 0 }, hint: "$F = qE$.", explanation: "$0.5 \\times 20 = 10$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Electric potential is measured in:", options: ["newtons", "volts", "amps", "ohms"], answer: 1, hint: "Energy per unit charge.", explanation: "Potential is measured in volts." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "Between two parallel charged plates the field is approximately uniform.", answer: true, hint: "Think of a capacitor.", explanation: "Parallel plates produce a uniform field." },
    ],
  },

  // ───────────────────────── 3. Circuits & Ohm's Law ─────────────────────────
  {
    slug: "circuits-and-ohms-law",
    title: "Circuits & Ohm's Law",
    tagline: "Voltage, current, resistance",
    estMinutes: 15,
    xpReward: 160,
    difficulty: 4,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "Charge in Motion", sub: "Give charges a push and a path, and they flow — a current, governed by one beautifully simple law." } },
      { kind: "CONTEXT", title: "From spark to circuit", content: { markdown: "Static charge is dramatic but fleeting. Channel charge into a steady **flow** through wires and you get a **circuit** — the basis of every device you own. Three quantities — voltage, current, resistance — and one law connect them." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "Three quantities describe a simple circuit:\n\n- **Voltage** $V$ (volts): the energy per charge driving the flow — the 'push'.\n- **Current** $I$ (amperes): the rate of charge flow — how much passes per second.\n- **Resistance** $R$ (ohms): how strongly the path opposes the flow.\n\n**Ohm's law** links them:\n\n$$V = I\\,R.$$\n\nSo $I = \\dfrac{V}{R}$ — more voltage drives more current; more resistance chokes it. The water analogy: voltage is the pump pressure, current is the flow rate, resistance is a narrow pipe.\n\n**Electrical power** delivered is\n\n$$P = VI = I^2R,$$\n\nin watts — the rate energy is converted to light, heat, or motion." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Find current", problem: "A $12\\,\\text{V}$ battery drives a $4\\,\\Omega$ resistor. Find the current.", steps: ["$I = V/R$.", "$12/4 = 3$."], answer: "$I = 3\\,\\text{A}$." },
        { title: "Find voltage", problem: "A current of $2\\,\\text{A}$ flows through $5\\,\\Omega$. Find the voltage.", steps: ["$V = IR$.", "$2 \\times 5 = 10$."], answer: "$V = 10\\,\\text{V}$." },
        { title: "Power", problem: "Find the power for $V = 12\\,\\text{V}$, $I = 3\\,\\text{A}$.", steps: ["$P = VI$.", "$12 \\times 3 = 36$."], answer: "$P = 36\\,\\text{W}$." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Ohm's law: $V = IR$." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Rearrange $V = IR$; compute power with $P = VI$." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: series and parallel", content: { markdown: "Resistors in **series** (one after another) add: $R = R_1 + R_2$ — the current has more to fight through. In **parallel** (side by side) they combine as $\\dfrac1R = \\dfrac1{R_1} + \\dfrac1{R_2}$, giving *less* total resistance because the current has more paths. These two rules, plus Ohm's law, let you analyse any network — and they're the electrical cousins of how springs combine and how pipes share flow." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Voltage (V) pushes; current (A) flows; resistance (Ω) opposes.", "Ohm's law: $V = IR$, so $I = V/R$.", "More voltage → more current; more resistance → less current.", "Power $P = VI = I^2R$, in watts.", "Series resistances add; parallel resistances combine reciprocally."], formulas: [{ label: "Ohm's law", tex: "V = IR" }, { label: "Power", tex: "P = VI" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "A $12\\,\\text{V}$ battery drives a $4\\,\\Omega$ resistor. Find the current in amps.", answer: { value: 3, tolerance: 0 }, explanation: "$I = V/R = 12/4 = 3$." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "A current of $2\\,\\text{A}$ flows through $5\\,\\Omega$. Find the voltage in volts.", answer: { value: 10, tolerance: 0 }, explanation: "$V = IR = 10$." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Ohm's law states:", options: ["$V = I/R$", "$V = IR$", "$V = R/I$", "$V = I + R$"], answer: 1, explanation: "$V = IR$." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "Solve Ohm's law for current $I$ in terms of $V$ and $R$. (Type like `V/R`.)", answer: { expr: "V/R", vars: ["V", "R"] }, difficulty: 3, hint: "Divide voltage by resistance.", explanation: "$I = V/R$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Find the power for $V = 12\\,\\text{V}$ and $I = 3\\,\\text{A}$, in watts.", answer: { value: 36, tolerance: 0 }, hint: "$P = VI$.", explanation: "$12 \\times 3 = 36$." },
      { scope: "PRACTICE", kind: "GRAPH", prompt: "For a fixed resistance $R = 2\\,\\Omega$, voltage vs current is $V = 2I$. Graph it (enter $V$ as a function of $I$, use $x$ for $I$).", answer: { expr: "2*x", domain: [0, 5], variable: "x" }, difficulty: 3, hint: "Linear: slope is the resistance.", explanation: "$V = 2I$ — a straight line whose slope is the resistance." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Two $3\\,\\Omega$ resistors in series. Find the total resistance in ohms.", answer: { value: 6, tolerance: 0 }, hint: "Series resistances add.", explanation: "$3 + 3 = 6\\,\\Omega$." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "Adding resistors in parallel lowers the total resistance.", answer: true, hint: "More paths for current.", explanation: "Parallel paths reduce total resistance." },
    ],
  },
];
