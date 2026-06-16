import type { LessonSeed } from "../types.js";

/**
 * Classical Mechanics — Work, Energy & Power (grades 10–12 / intro university).
 * Work as force through a distance, kinetic and potential energy, the
 * conservation of mechanical energy, and power. Mounted on the Outer Solar
 * System stop.
 */
export const energyLessons: LessonSeed[] = [
  // ───────────────────────────── 1. Work ─────────────────────────────
  {
    slug: "work",
    title: "Work — Force Through a Distance",
    tagline: "When a force actually transfers energy",
    estMinutes: 14,
    xpReward: 170,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "Doing Work", sub: "In physics, work has a precise meaning: a force only does work when it moves something along its own direction." } },
      { kind: "CONTEXT", title: "Why this matters", content: { markdown: "\"Work\" in physics is not effort or tiredness — holding a heavy box perfectly still is exhausting but does **zero** work, because nothing moves. Defining work precisely is the gateway to the single most powerful idea in physics: **energy**. Work is exactly the mechanism by which energy is transferred from one object to another." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "**Work** is done when a force acts on an object and moves it through a displacement. For a constant force,\n\n$$W = F\\,d\\cos\\theta$$\n\nwhere $F$ is the force magnitude, $d$ is the displacement, and $\\theta$ is the angle between the force and the displacement.\n\n- If the force is **along** the motion ($\\theta = 0$): $W = Fd$ (maximum, positive work).\n- If the force is **perpendicular** to the motion ($\\theta = 90^\\circ$): $\\cos 90^\\circ = 0$, so $W = 0$. (Carrying a box horizontally does no work *against gravity* — gravity points down, motion is sideways.)\n- If the force **opposes** the motion ($\\theta = 180^\\circ$): $W = -Fd$ (negative work, like friction removing energy).\n\nThe SI unit of work is the **joule**: $1\\ \\text{J} = 1\\ \\text{N}\\cdot\\text{m}$. Work is a **scalar** — it has no direction, only a sign.\n\nThe deep meaning: **work is energy transferred.** Positive work adds energy to an object; negative work takes it away." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Push along the floor", problem: "You push a crate $3.0\\,\\text{m}$ with a horizontal force of $40\\,\\text{N}$. How much work do you do?", steps: ["Force is along the motion, so $\\theta = 0$ and $\\cos\\theta = 1$.", "$W = Fd = 40 \\times 3.0 = 120\\,\\text{J}$."], answer: "$W = 120\\,\\text{J}$." },
        { title: "Carrying horizontally", problem: "You carry a $50\\,\\text{N}$ bag horizontally for $10\\,\\text{m}$ at constant height. How much work does gravity do?", steps: ["Gravity points down; the motion is horizontal.", "$\\theta = 90^\\circ$, so $\\cos\\theta = 0$.", "$W = 50 \\times 10 \\times 0 = 0$."], answer: "Zero — gravity does no work on horizontal motion." },
        { title: "Work at an angle", problem: "A rope pulls a sled with $60\\,\\text{N}$ at $60^\\circ$ above horizontal, moving it $5.0\\,\\text{m}$ along the ground. Find the work done by the rope. ($\\cos 60^\\circ = 0.5$.)", steps: ["$W = Fd\\cos\\theta = 60 \\times 5.0 \\times 0.5$.", "$W = 150\\,\\text{J}$."], answer: "$W = 150\\,\\text{J}$." },
      ] } },
      { kind: "VIDEOS", title: "Watch", content: { videos: [{ youtubeId: "2WS1sG9fhOk", title: "Work (physics)" }] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "When is work zero, positive, or negative?" } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Use $W = Fd\\cos\\theta$ and watch the angle." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: work as a dot product and an integral", content: { markdown: "The formula $W = Fd\\cos\\theta$ is really the **dot product** of two vectors, $W = \\vec F \\cdot \\vec d$. The cosine is what the dot product extracts: the part of the force that lies along the displacement.\n\nWhen the force **varies** along the path, we slice the path into tiny pieces and add up the work on each, which in the limit becomes an integral:\n\n$$W = \\int \\vec F \\cdot d\\vec r.$$\n\nThis is how you compute the work done by a stretching spring, whose force grows with distance — a calculation you'll meet again in the next lessons." } },
      { kind: "DEEPER_DIVE", title: "Common misconceptions", content: { markdown: "**\"Holding a heavy weight still does work because it's tiring.\"** There is no displacement, so $W = Fd\\cos\\theta = 0$. Effort and physics work are different things.\n\n**\"A force perpendicular to the motion still does some work.\"** With $\\theta = 90^\\circ$, $\\cos 90^\\circ = 0$, so $W = 0$ — the normal force on a sliding box and gravity on horizontal motion do zero work.\n\n**\"Work is always positive.\"** A force that opposes the motion ($\\theta = 180^\\circ$) does *negative* work, $W = -Fd$, removing energy — that's exactly what friction and braking do." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Work $= Fd\\cos\\theta$; only the force component along the motion counts.", "Perpendicular force does zero work; opposing force does negative work.", "The unit of work is the joule, $1\\,\\text{J} = 1\\,\\text{N·m}$.", "Work is a scalar and represents energy transferred."], formulas: [{ label: "Work (constant force)", tex: "W = F\\,d\\cos\\theta" }, { label: "Vector form", tex: "W = \\vec F \\cdot \\vec d" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Work done by a constant force is:", options: ["$Fd\\cos\\theta$", "$Fd\\sin\\theta$", "$F/d$", "$\\tfrac12 Fd$"], answer: 0, explanation: "$W = Fd\\cos\\theta$." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "A force perpendicular to the motion does zero work.", answer: true, explanation: "$\\cos 90^\\circ = 0$, so $W = 0$." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "The SI unit of work is the:", options: ["joule", "newton", "watt", "pascal"], answer: 0, explanation: "Work is measured in joules ($\\text{N·m}$)." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A $40\\,\\text{N}$ horizontal force moves a crate $3.0\\,\\text{m}$ in the same direction. Work in joules?", answer: { value: 120, tolerance: 0 }, hint: "$W = Fd$.", explanation: "$40 \\times 3 = 120\\,\\text{J}$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "How much work does gravity do on a bag carried $10\\,\\text{m}$ horizontally at constant height? (joules)", answer: { value: 0, tolerance: 0 }, hint: "Angle between gravity and motion?", explanation: "Perpendicular, so $W = 0$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A rope pulls a sled $5.0\\,\\text{m}$ with $60\\,\\text{N}$ at $60^\\circ$ above horizontal ($\\cos60^\\circ=0.5$). Work in joules?", answer: { value: 150, tolerance: 0 }, hint: "$W = Fd\\cos\\theta$.", explanation: "$60 \\times 5 \\times 0.5 = 150\\,\\text{J}$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Friction acting opposite to motion does work that is:", options: ["negative", "positive", "zero", "imaginary"], answer: 0, hint: "$\\theta = 180^\\circ$.", explanation: "Opposing force does negative work, removing energy." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "You lift a $20\\,\\text{N}$ book straight up $1.5\\,\\text{m}$. Work done by your lift force in joules?", answer: { value: 30, tolerance: 0 }, hint: "Force and motion are parallel (both up).", explanation: "$20 \\times 1.5 = 30\\,\\text{J}$." },
    ],
  },

  // ──────────────────── 2. Kinetic Energy & Work–Energy Theorem ────────────────────
  {
    slug: "kinetic-energy",
    title: "Kinetic Energy & the Work–Energy Theorem",
    tagline: "The energy of motion",
    estMinutes: 15,
    xpReward: 180,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "Energy of Motion", sub: "Anything moving carries kinetic energy — and the net work you do on it is exactly the change in that energy." } },
      { kind: "CONTEXT", title: "Why this matters", content: { markdown: "Why does a car need four times the braking distance when it doubles its speed? Kinetic energy holds the answer: it grows with the **square** of speed. The work–energy theorem turns messy force-and-acceleration problems into clean energy bookkeeping." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "**Kinetic energy** is the energy an object has because of its motion:\n\n$$K = \\tfrac12 m v^2$$\n\nIt depends on mass and on the **square** of speed — double the speed and the kinetic energy **quadruples**. Like all energy, it's measured in **joules** and is always $\\ge 0$.\n\nThe **work–energy theorem** ties work and kinetic energy together: the **net work** done on an object equals its **change in kinetic energy**:\n\n$$W_{net} = \\Delta K = \\tfrac12 m v_f^2 - \\tfrac12 m v_i^2$$\n\nThis is one of the most useful results in mechanics. If you know the net work, you instantly know how the speed changes — no need to track acceleration and time. Positive net work speeds an object up; negative net work (like friction or braking) slows it down." } },
      { kind: "SIMULATION", title: "Try it: energy in a drop", content: { simId: "energy-bars", intro: "Drop the ball and watch potential energy convert into kinetic energy. Notice $K = \\tfrac12 mv^2$ climbing as the ball speeds up — and that it equals the lost PE." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Kinetic energy", problem: "Find the kinetic energy of a $2.0\\,\\text{kg}$ ball moving at $3.0\\,\\text{m/s}$.", steps: ["$K = \\tfrac12 m v^2 = \\tfrac12 (2.0)(3.0)^2$.", "$= \\tfrac12 (2.0)(9.0) = 9.0\\,\\text{J}$."], answer: "$K = 9.0\\,\\text{J}$." },
        { title: "Double the speed", problem: "A car's speed doubles. By what factor does its kinetic energy change?", steps: ["$K \\propto v^2$.", "Doubling $v$ multiplies $v^2$ by 4."], answer: "Kinetic energy becomes 4 times larger." },
        { title: "Work–energy theorem", problem: "A net force does $50\\,\\text{J}$ of work on a $4.0\\,\\text{kg}$ cart starting from rest. Find its final speed.", steps: ["$W_{net} = \\Delta K = \\tfrac12 m v_f^2 - 0$.", "$50 = \\tfrac12 (4.0) v_f^2 = 2 v_f^2$, so $v_f^2 = 25$.", "$v_f = 5.0\\,\\text{m/s}$."], answer: "$v_f = 5.0\\,\\text{m/s}$." },
      ] } },
      { kind: "VIDEOS", title: "Watch", content: { videos: [{ youtubeId: "g8jPq6Hk6jc", title: "Kinetic Energy and the Work-Energy Theorem" }] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Kinetic energy and net work." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Use $K = \\tfrac12 mv^2$ and $W_{net} = \\Delta K$." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: where ½mv² comes from", content: { markdown: "The work–energy theorem isn't a separate assumption — it follows from Newton's second law. Start with $W_{net} = \\int F\\,dx = \\int ma\\,dx$. Using $a = \\dfrac{dv}{dt}$ and $dx = v\\,dt$, a change of variables gives $\\int m v\\,dv$, which integrates to $\\tfrac12 m v^2$. The $\\tfrac12$ and the square both fall straight out of the calculus. This is why kinetic energy *has* to be $\\tfrac12 m v^2$ and nothing else." } },
      { kind: "DEEPER_DIVE", title: "Common misconceptions", content: { markdown: "**\"Kinetic energy is proportional to speed.\"** It's proportional to the *square* of speed, $K = \\tfrac12 m v^2$ — double the speed and $K$ quadruples, which is why stopping distance grows so steeply.\n\n**\"A moving object can have negative kinetic energy.\"** Since $v^2 \\ge 0$ and $m > 0$, $K$ is never negative; only the *change* $\\Delta K$ (or the net work) can be negative.\n\n**\"The work–energy theorem uses the force from just one source.\"** It uses the **net** work from *all* forces: $W_{net} = \\Delta K$. Adding up only one force's work gives the wrong speed change." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Kinetic energy $K = \\tfrac12 mv^2$ — energy of motion, in joules.", "$K$ grows with the square of speed: double $v$ ⇒ quadruple $K$.", "Work–energy theorem: $W_{net} = \\Delta K$.", "Net positive work speeds up; net negative work slows down."], formulas: [{ label: "Kinetic energy", tex: "K = \\tfrac12 m v^2" }, { label: "Work–energy theorem", tex: "W_{net} = \\Delta K = \\tfrac12 m v_f^2 - \\tfrac12 m v_i^2" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Kinetic energy is given by:", options: ["$\\tfrac12 mv^2$", "$mgh$", "$mv$", "$Fd$"], answer: 0, explanation: "$K = \\tfrac12 mv^2$." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "Kinetic energy of a $2.0\\,\\text{kg}$ ball at $3.0\\,\\text{m/s}$, in joules?", answer: { value: 9, tolerance: 0 }, explanation: "$\\tfrac12(2)(9) = 9\\,\\text{J}$." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "Doubling an object's speed doubles its kinetic energy.", answer: false, explanation: "It quadruples, since $K \\propto v^2$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A $1.0\\,\\text{kg}$ ball moves at $4.0\\,\\text{m/s}$. Kinetic energy in joules?", answer: { value: 8, tolerance: 0 }, hint: "$\\tfrac12 mv^2$.", explanation: "$\\tfrac12(1)(16) = 8\\,\\text{J}$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Net work of $50\\,\\text{J}$ on a $4.0\\,\\text{kg}$ cart from rest. Final speed in m/s?", answer: { value: 5, tolerance: 0 }, hint: "$W = \\tfrac12 mv^2$.", explanation: "$50 = 2v^2 \\Rightarrow v = 5\\,\\text{m/s}$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A car triples its speed. Its kinetic energy becomes:", options: ["9× larger", "3× larger", "6× larger", "unchanged"], answer: 0, hint: "$K \\propto v^2$.", explanation: "$3^2 = 9$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A $3.0\\,\\text{kg}$ object slows from $4.0\\,\\text{m/s}$ to rest. How much net work was done on it (joules)? Give the magnitude.", answer: { value: 24, tolerance: 0 }, hint: "$|\\Delta K| = \\tfrac12 m v_i^2$.", explanation: "$\\tfrac12(3)(16) = 24\\,\\text{J}$ removed." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A $2.0\\,\\text{kg}$ cart speeds up from $1.0\\,\\text{m/s}$ to $3.0\\,\\text{m/s}$. Net work done, in joules?", answer: { value: 8, tolerance: 0 }, hint: "$\\Delta K = \\tfrac12 m(v_f^2 - v_i^2)$.", explanation: "$\\tfrac12(2)(9-1) = 8\\,\\text{J}$." },
    ],
  },

  // ───────────────────────── 3. Potential Energy ─────────────────────────
  {
    slug: "potential-energy",
    title: "Potential Energy",
    tagline: "Stored energy of position",
    estMinutes: 14,
    xpReward: 170,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "Stored Energy", sub: "Lift an object or stretch a spring and you store energy — ready to be released as motion." } },
      { kind: "CONTEXT", title: "Why this matters", content: { markdown: "A drawn bow, a raised hammer, water behind a dam — all hold energy purely because of their *position* or *configuration*. This stored energy is **potential energy**, and pairing it with kinetic energy lets us solve motion problems by simple accounting, without ever computing a force." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "**Potential energy** $U$ is energy stored in an object because of its position or shape. Two common kinds:\n\n**Gravitational potential energy** — energy of height:\n\n$$U_g = mgh$$\n\nwhere $h$ is the height above a chosen reference level. Lift a mass higher and you store more energy; let it fall and that energy is released as kinetic energy. Only *changes* in height matter, so you may put the zero wherever it's convenient.\n\n**Elastic potential energy** — energy stored in a stretched or compressed spring:\n\n$$U_s = \\tfrac12 k x^2$$\n\nwhere $k$ is the spring's **stiffness** (spring constant) and $x$ is how far it's stretched or compressed from its natural length. (This comes from the spring force $F = kx$, **Hooke's law**.)\n\nLike all energy, potential energy is measured in **joules**. It is *potential* because it can be converted into motion at any time." } },
      { kind: "SIMULATION", title: "Try it: potential to kinetic", content: { simId: "energy-bars", intro: "Set a drop height to load up gravitational PE = mgh, then release. Watch the blue PE bar shrink as the yellow KE bar grows — position energy becoming motion energy." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Gravitational PE", problem: "How much gravitational potential energy does a $2.0\\,\\text{kg}$ book gain when lifted $1.5\\,\\text{m}$? ($g = 9.8$.)", steps: ["$U_g = mgh = 2.0 \\times 9.8 \\times 1.5$.", "$= 29.4\\,\\text{J}$."], answer: "$U_g = 29.4\\,\\text{J}$." },
        { title: "Spring PE", problem: "A spring with $k = 200\\,\\text{N/m}$ is compressed $0.10\\,\\text{m}$. Find the stored energy.", steps: ["$U_s = \\tfrac12 k x^2 = \\tfrac12 (200)(0.10)^2$.", "$= \\tfrac12 (200)(0.01) = 1.0\\,\\text{J}$."], answer: "$U_s = 1.0\\,\\text{J}$." },
        { title: "Double the stretch", problem: "A spring is stretched twice as far. How does its stored energy change?", steps: ["$U_s \\propto x^2$.", "Doubling $x$ multiplies $x^2$ by 4."], answer: "It becomes 4 times larger." },
      ] } },
      { kind: "VIDEOS", title: "Watch", content: { videos: [{ youtubeId: "vDuPL90zHFY", title: "Potential Energy" }] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Gravitational and elastic potential energy." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Use $U_g = mgh$ and $U_s = \\tfrac12 kx^2$." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: forces from energy", content: { markdown: "Potential energy and force are two sides of the same coin. The force is the **negative slope** of the potential energy curve:\n\n$$F = -\\frac{dU}{dx}.$$\n\nFor a spring, $U = \\tfrac12 kx^2$, and its slope is $kx$, giving the restoring force $F = -kx$ — Hooke's law falls right out. Objects always tend to roll \"downhill\" on a potential-energy graph, toward lower energy. This picture of energy *landscapes* runs all the way up to chemistry and quantum mechanics." } },
      { kind: "DEEPER_DIVE", title: "Common misconceptions", content: { markdown: "**\"Potential energy is an absolute amount an object 'contains.'\"** Only *changes* in potential energy are physical. The zero of $U_g = mgh$ is a choice of reference level — measure $h$ from the floor or the table and the physics is identical.\n\n**\"Doubling a spring's stretch doubles its stored energy.\"** Spring energy goes as $U_s = \\tfrac12 kx^2$, so doubling $x$ *quadruples* the stored energy.\n\n**\"Potential energy belongs to a single object.\"** Gravitational and spring PE are stored in the *interaction* between objects (mass–Earth, or the two ends of a spring), not in one body alone." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Potential energy is stored energy of position or configuration.", "Gravitational: $U_g = mgh$ (only changes in height matter).", "Elastic (spring): $U_s = \\tfrac12 kx^2$, with stiffness $k$.", "Spring energy grows with the square of the stretch.", "Potential energy can convert into kinetic energy."], formulas: [{ label: "Gravitational PE", tex: "U_g = mgh" }, { label: "Spring PE", tex: "U_s = \\tfrac12 k x^2" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Gravitational potential energy near Earth's surface is:", options: ["$mgh$", "$\\tfrac12 mv^2$", "$\\tfrac12 kx^2$", "$Fd$"], answer: 0, explanation: "$U_g = mgh$." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Elastic potential energy in a spring is:", options: ["$\\tfrac12 kx^2$", "$kx$", "$\\tfrac12 kx$", "$kx^2$"], answer: 0, explanation: "$U_s = \\tfrac12 kx^2$." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "A $2.0\\,\\text{kg}$ book lifted $1.5\\,\\text{m}$ ($g = 9.8$). Gravitational PE gained, in joules?", answer: { value: 29.4, tolerance: 0.2 }, explanation: "$2 \\times 9.8 \\times 1.5 = 29.4\\,\\text{J}$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Spring with $k = 200\\,\\text{N/m}$ compressed $0.10\\,\\text{m}$. Stored energy in joules?", answer: { value: 1, tolerance: 0 }, hint: "$\\tfrac12 kx^2$.", explanation: "$\\tfrac12(200)(0.01) = 1.0\\,\\text{J}$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A $5.0\\,\\text{kg}$ mass is raised $4.0\\,\\text{m}$ ($g = 9.8$). PE gained in joules?", answer: { value: 196, tolerance: 1 }, hint: "$mgh$.", explanation: "$5 \\times 9.8 \\times 4 = 196\\,\\text{J}$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "If a spring is stretched twice as far, its stored energy:", options: ["quadruples", "doubles", "halves", "is unchanged"], answer: 0, hint: "$U \\propto x^2$.", explanation: "$2^2 = 4$ times." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A spring with $k = 50\\,\\text{N/m}$ is stretched $0.20\\,\\text{m}$. Stored energy in joules?", answer: { value: 1, tolerance: 0 }, hint: "$\\tfrac12 kx^2$.", explanation: "$\\tfrac12(50)(0.04) = 1.0\\,\\text{J}$." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "Only changes in height matter for gravitational potential energy, so you can choose where $h = 0$.", answer: true, hint: "It's the difference that counts.", explanation: "The reference level is arbitrary; only $\\Delta U$ has physical meaning." },
    ],
  },

  // ─────────────────── 4. Conservation of Mechanical Energy ───────────────────
  {
    slug: "conservation-of-energy",
    title: "Conservation of Energy",
    tagline: "Energy changes form but is never lost",
    estMinutes: 16,
    xpReward: 190,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "Energy Is Conserved", sub: "In the absence of friction, kinetic and potential energy trade back and forth — but their sum stays exactly the same." } },
      { kind: "CONTEXT", title: "Why this matters", content: { markdown: "Conservation of energy is one of the deepest laws in all of science. A roller coaster, a swinging pendulum, a falling apple — all obey it. It lets you find a final speed from a starting height in a single line, sidestepping forces and time entirely." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "Define the **total mechanical energy** as kinetic plus potential:\n\n$$E = K + U.$$\n\n**Conservation of mechanical energy:** when only gravity and springs act (no friction or air resistance), the total mechanical energy stays **constant**:\n\n$$K_i + U_i = K_f + U_f.$$\n\nEnergy is not created or destroyed — it merely **converts** between forms. As a ball falls, $U_g = mgh$ shrinks while $K = \\tfrac12 mv^2$ grows by exactly the same amount, keeping the sum fixed.\n\nA classic result: drop an object from height $h$ (from rest). All its potential energy becomes kinetic energy at the bottom:\n\n$$mgh = \\tfrac12 m v^2 \\;\\Rightarrow\\; v = \\sqrt{2gh}.$$\n\nThe mass cancels — every object reaches the same speed from the same height (without friction).\n\n**With friction**, mechanical energy is *not* conserved on its own: friction converts some into **heat**. But counting heat too, the *total* energy of everything is still conserved — that's the universal law." } },
      { kind: "SIMULATION", title: "Try it: the energy ledger", content: { simId: "energy-bars", intro: "Drop the ball from any height. Watch PE and KE trade places while the green Total bar never moves — that's conservation of energy in action." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Speed at the bottom", problem: "A ball is dropped from rest at $5.0\\,\\text{m}$. Find its speed just before it lands ($g = 9.8$, no air resistance).", steps: ["All PE becomes KE: $mgh = \\tfrac12 mv^2$.", "$v = \\sqrt{2gh} = \\sqrt{2 \\times 9.8 \\times 5.0} = \\sqrt{98}$.", "$v \\approx 9.9\\,\\text{m/s}$."], answer: "$v \\approx 9.9\\,\\text{m/s}$ (mass-independent)." },
        { title: "Pendulum swing", problem: "A pendulum is released from a height $0.20\\,\\text{m}$ above its lowest point. How fast is it moving at the bottom? ($g = 9.8$.)", steps: ["$v = \\sqrt{2gh} = \\sqrt{2 \\times 9.8 \\times 0.20}$.", "$= \\sqrt{3.92} \\approx 2.0\\,\\text{m/s}$."], answer: "$v \\approx 2.0\\,\\text{m/s}$." },
        { title: "Where friction goes", problem: "A sled slides to a stop on level ground. Where did its kinetic energy go?", steps: ["No height change, so gravitational PE is unchanged.", "Friction did negative work on the sled.", "That energy became heat in the surfaces."], answer: "It was converted to heat by friction — total energy is still conserved." },
      ] } },
      { kind: "VIDEOS", title: "Watch", content: { videos: [{ youtubeId: "ldqoYxLwGGk", title: "Conservation of Energy" }] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Trading kinetic and potential energy." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Use $K_i + U_i = K_f + U_f$ and $v = \\sqrt{2gh}$ where it applies." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: why energy is conserved at all", content: { markdown: "Energy conservation isn't just a handy rule — it reflects something profound. A theorem by Emmy Noether shows that **every conservation law comes from a symmetry of nature**. Conservation of energy follows from the fact that the laws of physics are the **same at every moment in time** (time-translation symmetry). Conservation of momentum comes from symmetry in space, and angular momentum from symmetry under rotation. This link between symmetry and conservation is one of the most beautiful ideas in modern physics." } },
      { kind: "DEEPER_DIVE", title: "Common misconceptions", content: { markdown: "**\"When friction stops a sliding object, its energy is destroyed.\"** Energy is never destroyed — friction converts the kinetic energy into *heat*. Counting that heat, the total energy is still conserved.\n\n**\"A heavier object slides down a frictionless ramp faster.\"** From $mgh = \\tfrac12 mv^2$ the mass cancels, giving $v = \\sqrt{2gh}$ — the final speed depends only on the height, not the mass.\n\n**\"Mechanical energy is conserved in every situation.\"** Only when nonconservative forces (friction, air resistance, a push) do no work. Whenever those act, $K + U$ changes, even though *total* energy is always conserved." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Total mechanical energy $E = K + U$.", "Without friction, $K_i + U_i = K_f + U_f$ — energy is conserved.", "Energy converts between kinetic and potential, never vanishing.", "Falling from height $h$: $v = \\sqrt{2gh}$ (mass cancels).", "Friction converts mechanical energy to heat, but total energy is always conserved."], formulas: [{ label: "Conservation", tex: "K_i + U_i = K_f + U_f" }, { label: "Drop speed", tex: "v = \\sqrt{2gh}" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "Without friction, the total mechanical energy $K + U$ stays constant.", answer: true, explanation: "That is conservation of mechanical energy." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "As a ball falls freely, its potential energy:", options: ["converts into kinetic energy", "disappears", "stays constant", "becomes heat"], answer: 0, explanation: "PE converts to KE as it falls (no friction)." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "Dropped from rest at $5.0\\,\\text{m}$ ($g=9.8$). Speed at the bottom in m/s? (Use $v=\\sqrt{2gh}$.)", answer: { value: 9.9, tolerance: 0.2 }, explanation: "$\\sqrt{2(9.8)(5)} = \\sqrt{98} \\approx 9.9\\,\\text{m/s}$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A pendulum released $0.20\\,\\text{m}$ above its lowest point ($g=9.8$). Speed at the bottom in m/s?", answer: { value: 2.0, tolerance: 0.1 }, hint: "$v = \\sqrt{2gh}$.", explanation: "$\\sqrt{2(9.8)(0.2)} \\approx 2.0\\,\\text{m/s}$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Dropped from rest at $20\\,\\text{m}$ ($g=9.8$). Speed at the ground in m/s?", answer: { value: 19.8, tolerance: 0.4 }, hint: "$v=\\sqrt{2gh}$.", explanation: "$\\sqrt{2(9.8)(20)} = \\sqrt{392} \\approx 19.8\\,\\text{m/s}$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A sled slides to a stop on flat ground. Its kinetic energy became:", options: ["heat (via friction)", "potential energy", "more kinetic energy", "nothing — it vanished"], answer: 0, hint: "What force stopped it?", explanation: "Friction converted it to heat; total energy is conserved." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "On a frictionless slide, a heavier child reaches the bottom faster than a lighter one (same height).", answer: false, hint: "Look at $v=\\sqrt{2gh}$.", explanation: "Mass cancels — both reach the same speed." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A $2.0\\,\\text{kg}$ ball at $3.0\\,\\text{m}$ height ($g=9.8$). Total mechanical energy at the start (from rest), in joules?", answer: { value: 58.8, tolerance: 0.5 }, hint: "$E = mgh$ since $K=0$.", explanation: "$2 \\times 9.8 \\times 3 = 58.8\\,\\text{J}$." },
    ],
  },

  // ───────────────────────────── 5. Power ─────────────────────────────
  {
    slug: "power",
    title: "Power — The Rate of Doing Work",
    tagline: "How fast energy is transferred",
    estMinutes: 13,
    xpReward: 160,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "Energy Per Second", sub: "Two engines may do the same work — but the one that does it faster is more powerful." } },
      { kind: "CONTEXT", title: "Why this matters", content: { markdown: "Power is what the electricity bill measures, what an engine's horsepower rating means, and what tells a sprinter from a stroller. Same work, less time, more power. It's the rate at which energy moves." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "**Power** is the **rate** at which work is done — energy transferred per unit time:\n\n$$P = \\frac{W}{t} = \\frac{\\Delta E}{t}.$$\n\nThe SI unit is the **watt**: $1\\ \\text{W} = 1\\ \\text{J/s}$. A 60-watt bulb converts 60 joules of electrical energy every second.\n\nThere's a second, very useful form. Since $W = Fd$, dividing by time gives $P = F\\dfrac{d}{t} = Fv$ — power equals force times speed:\n\n$$P = F v.$$\n\nThis is why a car needs far more engine power to maintain high speed (the drag force is large *and* you're moving fast), and why climbing stairs quickly takes more power than climbing them slowly, even though the work (your weight times the height) is identical.\n\nA handy energy unit comes from power: the **kilowatt-hour** is the energy of one kilowatt running for one hour — that's what your utility actually charges for." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Power from work and time", problem: "A motor does $600\\,\\text{J}$ of work in $4.0\\,\\text{s}$. Find its power.", steps: ["$P = W/t = 600/4.0$.", "$= 150\\,\\text{W}$."], answer: "$P = 150\\,\\text{W}$." },
        { title: "Climbing stairs", problem: "A $60\\,\\text{kg}$ person climbs $5.0\\,\\text{m}$ of stairs in $10\\,\\text{s}$ ($g = 9.8$). Find the power.", steps: ["Work against gravity: $W = mgh = 60 \\times 9.8 \\times 5.0 = 2940\\,\\text{J}$.", "$P = W/t = 2940/10 = 294\\,\\text{W}$."], answer: "$P \\approx 294\\,\\text{W}$." },
        { title: "Power equals force times speed", problem: "A car engine pushes with $500\\,\\text{N}$ of driving force at a steady $20\\,\\text{m/s}$. Find the power output.", steps: ["$P = Fv = 500 \\times 20$.", "$= 10{,}000\\,\\text{W} = 10\\,\\text{kW}$."], answer: "$P = 10\\,\\text{kW}$." },
      ] } },
      { kind: "VIDEOS", title: "Watch", content: { videos: [{ youtubeId: "B1U6Qm4qAH8", title: "Power (physics)" }] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Power, watts, and $P = Fv$." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Use $P = W/t$ and $P = Fv$." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: horsepower and the human body", content: { markdown: "James Watt coined **horsepower** to sell his steam engines: $1\\ \\text{hp} \\approx 746\\ \\text{W}$, roughly the sustained output of a strong draft horse. A fit human can sustain only about $100\\text{–}150\\,\\text{W}$ for long periods (about a fifth of a horsepower), though a sprint cyclist can hit over $1000\\,\\text{W}$ for a few seconds. Your body 'burns' food energy at roughly $100\\,\\text{W}$ just resting — the same as an old incandescent bulb." } },
      { kind: "DEEPER_DIVE", title: "Common misconceptions", content: { markdown: "**\"Power and energy are the same thing.\"** Power is the *rate* of transferring energy, $P = W/t$. A 100 W bulb and a 60 W bulb can deliver the same energy if the dimmer one runs longer.\n\n**\"Climbing stairs quickly takes more work than climbing them slowly.\"** The work is the same, $W = mgh$, since the height is identical — but doing it faster means more *power*, $P = W/t$.\n\n**\"The kilowatt-hour is a unit of power.\"** A watt is power; a kilowatt-*hour* is power times time, so it's a unit of **energy** ($1\\,\\text{kWh} = 3.6\\times10^6\\,\\text{J}$) — which is why your utility bills you in kWh." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Power is the rate of doing work: $P = W/t$.", "The unit is the watt, $1\\,\\text{W} = 1\\,\\text{J/s}$.", "Equivalently, $P = Fv$ (force times speed).", "Same work in less time means more power.", "Energy can be billed in kilowatt-hours."], formulas: [{ label: "Power", tex: "P = \\dfrac{W}{t}" }, { label: "Force × velocity", tex: "P = Fv" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Power is defined as:", options: ["work per unit time", "force per unit area", "energy times time", "mass times speed"], answer: 0, explanation: "$P = W/t$." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "The SI unit of power is the:", options: ["watt", "joule", "newton", "pascal"], answer: 0, explanation: "$1\\,\\text{W} = 1\\,\\text{J/s}$." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "A motor does $600\\,\\text{J}$ of work in $4.0\\,\\text{s}$. Power in watts?", answer: { value: 150, tolerance: 0 }, explanation: "$600/4 = 150\\,\\text{W}$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "$1000\\,\\text{J}$ of work done in $5.0\\,\\text{s}$. Power in watts?", answer: { value: 200, tolerance: 0 }, hint: "$P = W/t$.", explanation: "$1000/5 = 200\\,\\text{W}$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A force of $500\\,\\text{N}$ acts on a car moving at $20\\,\\text{m/s}$. Power in watts?", answer: { value: 10000, tolerance: 0 }, hint: "$P = Fv$.", explanation: "$500 \\times 20 = 10{,}000\\,\\text{W}$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A $60\\,\\text{kg}$ person climbs $5.0\\,\\text{m}$ in $10\\,\\text{s}$ ($g=9.8$). Power in watts?", answer: { value: 294, tolerance: 1 }, hint: "$P = mgh/t$.", explanation: "$60 \\times 9.8 \\times 5 / 10 = 294\\,\\text{W}$." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "Two people do the same work, but one is faster. The faster person has more power.", answer: true, hint: "Same work, less time.", explanation: "Less time for the same work means greater power." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Power can also be written as:", options: ["$Fv$", "$Fd$", "$\\tfrac12 mv^2$", "$mgh$"], answer: 0, hint: "Force times speed.", explanation: "$P = Fv$." },
    ],
  },
];
