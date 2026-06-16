import type { LessonSeed } from "../types.js";

/**
 * Classical Mechanics — Rotational Motion (grades 11–12 / intro university).
 * Angular kinematics, torque, moment of inertia and Newton's second law for
 * rotation, rotational kinetic energy & rolling, and angular momentum and its
 * conservation. Mounted on the Interstellar Space stop.
 */
export const rotationLessons: LessonSeed[] = [
  // ───────────────────────── 1. Angular Kinematics ─────────────────────────
  {
    slug: "angular-kinematics",
    title: "Angular Kinematics",
    tagline: "Describing how things spin",
    estMinutes: 14,
    xpReward: 170,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "The Language of Spin", sub: "Wheels, planets, and galaxies all rotate. Angular position, velocity, and acceleration describe spinning just as their straight-line cousins describe motion." } },
      { kind: "CONTEXT", title: "Why this matters", content: { markdown: "Everything from a hard drive to a merry-go-round to the Earth itself spins. Rotational motion has its own kinematics that exactly mirrors linear motion — learn the dictionary between them and every equation you already know carries over." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "Rotation is described by **angular** quantities, measured in **radians** (where one full turn $= 2\\pi$ rad):\n\n- **Angular position** $\\theta$ — the angle turned through.\n- **Angular velocity** $\\omega = \\dfrac{d\\theta}{dt}$ — how fast it spins (rad/s).\n- **Angular acceleration** $\\alpha = \\dfrac{d\\omega}{dt}$ — how fast the spin rate changes (rad/s²).\n\nThese map one-to-one onto linear motion: $x\\to\\theta$, $v\\to\\omega$, $a\\to\\alpha$. So the constant-acceleration equations look identical:\n\n$$\\omega = \\omega_0 + \\alpha t, \\qquad \\theta = \\omega_0 t + \\tfrac12 \\alpha t^2, \\qquad \\omega^2 = \\omega_0^2 + 2\\alpha\\theta.$$\n\n**Linking spin to straight-line motion.** A point at radius $r$ from the axis traces an arc, and:\n\n$$s = r\\theta, \\qquad v = r\\omega, \\qquad a_{t} = r\\alpha.$$\n\nThe farther a point is from the axis, the faster it moves — which is why the rim of a wheel races while the hub barely moves." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Rim speed", problem: "A wheel of radius $0.5\\,\\text{m}$ spins at $\\omega = 4\\,\\text{rad/s}$. How fast does a point on the rim move?", steps: ["$v = r\\omega = 0.5 \\times 4$.", "$= 2\\,\\text{m/s}$."], answer: "$v = 2\\,\\text{m/s}$." },
        { title: "Spinning up", problem: "A disk starts from rest and reaches $\\omega = 10\\,\\text{rad/s}$ in $5\\,\\text{s}$. Find its angular acceleration.", steps: ["$\\alpha = \\dfrac{\\omega - \\omega_0}{t} = \\dfrac{10 - 0}{5}$.", "$= 2\\,\\text{rad/s}^2$."], answer: "$\\alpha = 2\\,\\text{rad/s}^2$." },
        { title: "One full turn", problem: "How many radians are in one complete revolution?", steps: ["A full circle is $2\\pi$ radians.", "$2\\pi \\approx 6.28$."], answer: "$2\\pi \\approx 6.28\\,\\text{rad}$." },
      ] } },
      { kind: "VIDEOS", title: "Watch", content: { videos: [{ youtubeId: "RhWzkahFmTk", title: "Angular Motion and Kinematics" }] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Angular quantities and the link to linear motion." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Use $v = r\\omega$, $a_t = r\\alpha$, and the rotational kinematic equations." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: why radians?", content: { markdown: "Degrees are arbitrary (why 360?), but **radians** are natural: one radian is the angle that wraps an arc equal to the radius around the circle. That definition is exactly what makes $s = r\\theta$ work with no conversion factor — and what makes $v = r\\omega$ and $a_t = r\\alpha$ clean. Radians also make calculus tidy: $\\dfrac{d}{dx}\\sin x = \\cos x$ only when $x$ is in radians. They're the SI 'unit' for angle precisely because they simplify everything." } },
      { kind: "DEEPER_DIVE", title: "Common misconceptions", content: { markdown: "**\"Angular velocity and linear velocity are the same thing.\"** They are different quantities with different units; a single $\\omega$ in rad/s gives every point a different linear speed $v = r\\omega$ depending on its distance from the axis.\n\n**\"Every point on a spinning rigid body moves at the same speed.\"** All points share the same $\\omega$, but the rim ($r$ large) moves much faster than the hub, since $v = r\\omega$.\n\n**\"You can mix degrees into the rotational equations.\"** Relations like $s = r\\theta$, $v = r\\omega$, and $a_t = r\\alpha$ only hold when the angle is in radians — degrees carry a hidden conversion factor." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Rotation uses $\\theta$, $\\omega$, $\\alpha$ (radians).", "These mirror $x$, $v$, $a$ — same constant-acceleration equations.", "$s = r\\theta$, $v = r\\omega$, $a_t = r\\alpha$ link spin to linear motion.", "Points farther from the axis move faster.", "One revolution $= 2\\pi$ radians."], formulas: [{ label: "Linear–angular link", tex: "v = r\\omega" }, { label: "Rotational kinematics", tex: "\\omega = \\omega_0 + \\alpha t" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Angular velocity $\\omega$ is measured in:", options: ["rad/s", "m/s", "rad/s²", "m"], answer: 0, explanation: "Angular velocity is in radians per second." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "A wheel of radius $0.5\\,\\text{m}$ spins at $4\\,\\text{rad/s}$. Rim speed in m/s?", answer: { value: 2, tolerance: 0 }, explanation: "$v = r\\omega = 0.5\\times4 = 2$." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "A point farther from the rotation axis moves faster (for the same $\\omega$).", answer: true, explanation: "$v = r\\omega$ grows with $r$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A disk goes from rest to $10\\,\\text{rad/s}$ in $5\\,\\text{s}$. Angular acceleration in rad/s²?", answer: { value: 2, tolerance: 0 }, hint: "$\\alpha = \\Delta\\omega/t$.", explanation: "$10/5 = 2\\,\\text{rad/s}^2$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A point at $r = 2\\,\\text{m}$ has angular acceleration $3\\,\\text{rad/s}^2$. Its tangential acceleration in m/s²?", answer: { value: 6, tolerance: 0 }, hint: "$a_t = r\\alpha$.", explanation: "$2\\times3 = 6\\,\\text{m/s}^2$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Starting at rest with $\\alpha = 2\\,\\text{rad/s}^2$, what is $\\omega$ after $3\\,\\text{s}$? (rad/s)", answer: { value: 6, tolerance: 0 }, hint: "$\\omega = \\alpha t$.", explanation: "$2\\times3 = 6\\,\\text{rad/s}$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "One complete revolution equals:", options: ["$2\\pi$ rad", "$\\pi$ rad", "$360$ rad", "$1$ rad"], answer: 0, hint: "Full circle.", explanation: "$2\\pi$ radians per revolution." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A wheel of radius $0.25\\,\\text{m}$ rolls so its center moves at $v = 3\\,\\text{m/s}$. Its angular velocity in rad/s? (Use $\\omega = v/r$.)", answer: { value: 12, tolerance: 0 }, hint: "$\\omega = v/r$.", explanation: "$3/0.25 = 12\\,\\text{rad/s}$." },
    ],
  },

  // ───────────────────────────── 2. Torque ─────────────────────────────
  {
    slug: "torque",
    title: "Torque",
    tagline: "The twist that causes rotation",
    estMinutes: 14,
    xpReward: 170,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "The Turning Force", sub: "A force makes things spin only when applied with leverage. Torque measures that twisting effect." } },
      { kind: "CONTEXT", title: "Why this matters", content: { markdown: "Why is a door handle on the edge, far from the hinge? Why does a longer wrench loosen a stubborn bolt? Both are torque: the same force does more turning when applied farther from the pivot. Torque is to rotation what force is to straight-line motion." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "**Torque** $\\tau$ is the rotational effect of a force. It depends on the force, *where* it's applied, and *at what angle*:\n\n$$\\tau = r F \\sin\\theta$$\n\nwhere $r$ is the distance from the pivot to where the force acts, $F$ is the force, and $\\theta$ is the angle between them. The quantity $r\\sin\\theta$ is the **lever arm** — the perpendicular distance from the pivot to the force's line of action. Torque is measured in **newton-metres** ($\\text{N·m}$).\n\n- Maximum torque when the force is **perpendicular** ($\\theta = 90^\\circ$): $\\tau = rF$.\n- **Zero** torque when the force points straight at the pivot ($\\theta = 0$) — no twist at all.\n- A **longer lever arm** (bigger $r$) means more torque for the same force.\n\nTorque has a sense: by convention, counter-clockwise is **positive**, clockwise is **negative**.\n\n**Rotational equilibrium.** An object's rotation doesn't change when the **net torque is zero**: the clockwise torques balance the counter-clockwise ones. A seesaw balances when $m_1 g\\, d_1 = m_2 g\\, d_2$ — a heavy child close to the pivot can be balanced by a lighter child farther out. This is the **law of the lever**." } },
      { kind: "SIMULATION", title: "Try it: the balance beam", content: { simId: "torque-balance", intro: "Place a weight on each side of the pivot and adjust the distances. The plank tips toward the larger torque and balances exactly when $m_1 d_1 = m_2 d_2$." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Torque from a wrench", problem: "You push perpendicular with $20\\,\\text{N}$ on a wrench $0.30\\,\\text{m}$ long. Find the torque.", steps: ["Perpendicular force, so $\\sin\\theta = 1$.", "$\\tau = rF = 0.30 \\times 20 = 6.0\\,\\text{N·m}$."], answer: "$\\tau = 6.0\\,\\text{N·m}$." },
        { title: "Balance the seesaw", problem: "A $30\\,\\text{kg}$ child sits $2.0\\,\\text{m}$ from the pivot. How far out must a $20\\,\\text{kg}$ child sit to balance?", steps: ["Balance: $m_1 d_1 = m_2 d_2$.", "$30 \\times 2.0 = 20 \\times d_2$, so $d_2 = 60/20$.", "$= 3.0\\,\\text{m}$."], answer: "$3.0\\,\\text{m}$ from the pivot." },
        { title: "Wrong angle", problem: "You pull a wrench but along its length, straight toward the bolt. How much torque?", steps: ["The force points at the pivot, $\\theta = 0$.", "$\\sin 0 = 0$."], answer: "Zero torque — pulling toward the pivot can't turn it." },
      ] } },
      { kind: "VIDEOS", title: "Watch", content: { videos: [{ youtubeId: "Su-Af5DqGGI", title: "Introduction to Torque" }] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Torque, lever arm, and balance." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Use $\\tau = rF\\sin\\theta$ and balance torques for equilibrium." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: torque as a cross product", content: { markdown: "Fully, torque is a **vector**: $\\vec\\tau = \\vec r \\times \\vec F$, the cross product of the position and force vectors. Its magnitude is $rF\\sin\\theta$ (our formula) and its **direction** is along the rotation axis, given by the right-hand rule. This is why torque, like angular velocity and angular momentum, points along the axis of spin rather than in the plane of motion. The cross-product structure is what makes gyroscopes precess in their strange, counter-intuitive way." } },
      { kind: "DEEPER_DIVE", title: "Common misconceptions", content: { markdown: "**\"Torque is just another word for force.\"** Torque is a force times a lever arm, $\\tau = rF\\sin\\theta$, measured in N·m, not N; the same force gives different torques depending on where and how it is applied.\n\n**\"Where you push doesn't matter, only how hard.\"** The lever arm is crucial: pushing far from the pivot gives far more torque, which is why door handles sit at the edge and long wrenches loosen tight bolts.\n\n**\"Any force on an object produces a turning effect.\"** A force aimed straight at the pivot ($\\theta = 0$) has $\\sin\\theta = 0$ and produces zero torque, no matter how large it is." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Torque $\\tau = rF\\sin\\theta$ is the turning effect of a force.", "The lever arm $r\\sin\\theta$ is the perpendicular distance to the force's line.", "Force toward the pivot gives zero torque; perpendicular gives the most.", "A longer lever arm means more torque.", "Rotational equilibrium: net torque is zero ($m_1d_1 = m_2d_2$ on a lever)."], formulas: [{ label: "Torque", tex: "\\tau = r F \\sin\\theta" }, { label: "Law of the lever", tex: "m_1 d_1 = m_2 d_2" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Torque is given by:", options: ["$rF\\sin\\theta$", "$mv$", "$\\tfrac12 I\\omega^2$", "$ma$"], answer: 0, explanation: "$\\tau = rF\\sin\\theta$." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "A force applied farther from the pivot produces more torque.", answer: true, explanation: "Torque grows with the lever arm $r$." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "A perpendicular $20\\,\\text{N}$ force on a $0.30\\,\\text{m}$ wrench. Torque in N·m?", answer: { value: 6, tolerance: 0 }, explanation: "$0.30\\times20 = 6\\,\\text{N·m}$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A $30\\,\\text{kg}$ child sits $2.0\\,\\text{m}$ from a seesaw pivot. A $20\\,\\text{kg}$ child balances it. How far out (m)?", answer: { value: 3, tolerance: 0 }, hint: "$m_1 d_1 = m_2 d_2$.", explanation: "$60/20 = 3.0\\,\\text{m}$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A force perpendicular at $r = 0.5\\,\\text{m}$ gives $\\tau = 10\\,\\text{N·m}$. What force (N)?", answer: { value: 20, tolerance: 0 }, hint: "$F = \\tau/r$.", explanation: "$10/0.5 = 20\\,\\text{N}$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A force pointing straight toward the pivot produces a torque of:", options: ["zero", "maximum", "negative", "infinite"], answer: 0, hint: "$\\sin 0 = 0$.", explanation: "No lever arm means no torque." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "For rotational equilibrium, the net torque must be zero.", answer: true, hint: "Like net force for translation.", explanation: "Balanced torques mean no change in rotation." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Two torques act: $8\\,\\text{N·m}$ counter-clockwise and $5\\,\\text{N·m}$ clockwise. Net torque magnitude (N·m)?", answer: { value: 3, tolerance: 0 }, hint: "Subtract opposing torques.", explanation: "$8 - 5 = 3\\,\\text{N·m}$ counter-clockwise." },
    ],
  },

  // ──────────────── 3. Moment of Inertia & τ = Iα ────────────────
  {
    slug: "moment-of-inertia",
    title: "Moment of Inertia & Rotational Newton's Law",
    tagline: "Rotational mass and τ = Iα",
    estMinutes: 15,
    xpReward: 180,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "Resistance to Spinning", sub: "Mass resists acceleration; moment of inertia resists angular acceleration — and depends on how that mass is spread out." } },
      { kind: "CONTEXT", title: "Why this matters", content: { markdown: "Why does a figure skater spin faster when they pull their arms in? Why is a solid disk easier to spin than a ring of the same mass? The answer is **moment of inertia** — rotational mass — which depends not just on how much mass there is, but on *where* it sits relative to the axis." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "**Moment of inertia** $I$ is the rotational equivalent of mass — an object's resistance to angular acceleration. For a single point mass at distance $r$ from the axis:\n\n$$I = m r^2.$$\n\nFor an extended body, you add up $mr^2$ over all its parts. The key insight: mass **farther from the axis** counts much more (it's squared). So a hoop (all mass at the rim) has a larger $I$ than a solid disk of the same mass and radius. Standard results:\n\n- solid disk/cylinder: $I = \\tfrac12 MR^2$\n- thin hoop/ring: $I = MR^2$\n- solid sphere: $I = \\tfrac25 MR^2$\n\n**Newton's second law for rotation.** Torque plays the role of force, $I$ the role of mass, and $\\alpha$ the role of acceleration:\n\n$$\\tau_{net} = I\\,\\alpha.$$\n\nGive the same torque to a larger $I$ and it spins up more slowly — exactly as a larger mass accelerates more slowly under the same force." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Point mass", problem: "Find the moment of inertia of a $2.0\\,\\text{kg}$ mass at the end of a $3.0\\,\\text{m}$ massless rod (axis at the other end).", steps: ["$I = mr^2 = 2.0 \\times (3.0)^2$.", "$= 2.0 \\times 9.0 = 18\\,\\text{kg·m}^2$."], answer: "$I = 18\\,\\text{kg·m}^2$." },
        { title: "Angular acceleration", problem: "A torque of $12\\,\\text{N·m}$ acts on a body with $I = 4.0\\,\\text{kg·m}^2$. Find $\\alpha$.", steps: ["$\\alpha = \\tau/I = 12/4.0$.", "$= 3.0\\,\\text{rad/s}^2$."], answer: "$\\alpha = 3.0\\,\\text{rad/s}^2$." },
        { title: "Disk vs hoop", problem: "A solid disk and a hoop have the same mass and radius. Which has the larger moment of inertia?", steps: ["Disk: $\\tfrac12 MR^2$; hoop: $MR^2$.", "The hoop's mass is all at the rim, far from the axis."], answer: "The hoop — twice the disk's moment of inertia." },
      ] } },
      { kind: "VIDEOS", title: "Watch", content: { videos: [{ youtubeId: "fmXFWi-WfyU", title: "Moment of Inertia" }] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Moment of inertia and $\\tau = I\\alpha$." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Use $I = mr^2$ (point mass) and $\\tau = I\\alpha$." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: the parallel-axis theorem", content: { markdown: "Moment of inertia depends on *which axis* you spin about. The **parallel-axis theorem** gives a shortcut: if you know $I_{cm}$ about an axis through the center of mass, then about any parallel axis a distance $d$ away,\n\n$$I = I_{cm} + Md^2.$$\n\nThis is why a rod is much harder to spin about its end than about its middle — you've added $Md^2$. It also explains why holding a heavy object far from your body strains you: you've increased the effective moment of inertia your muscles must control." } },
      { kind: "DEEPER_DIVE", title: "Common misconceptions", content: { markdown: "**\"Moment of inertia depends only on how much mass an object has.\"** It depends on how that mass is distributed relative to the axis, $I = \\sum m r^2$; two bodies of equal mass can have very different $I$.\n\n**\"A hoop and a solid disk of the same mass and radius are equally hard to spin.\"** The hoop's mass sits at the rim, so $I = MR^2$ — twice the disk's $\\tfrac12 MR^2$, making it harder to spin up.\n\n**\"The moment of inertia of an object is a single fixed number.\"** $I$ depends on the chosen axis; the same rod has a much larger $I$ about its end than about its center." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Moment of inertia $I$ is rotational mass; for a point mass $I = mr^2$.", "Mass farther from the axis contributes much more ($r^2$).", "A hoop has larger $I$ than a disk of equal mass and radius.", "Newton's law for rotation: $\\tau_{net} = I\\alpha$.", "Parallel-axis theorem: $I = I_{cm} + Md^2$."], formulas: [{ label: "Point mass", tex: "I = m r^2" }, { label: "Rotational 2nd law", tex: "\\tau_{net} = I\\alpha" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Newton's second law for rotation is:", options: ["$\\tau = I\\alpha$", "$\\tau = I\\omega$", "$F = ma$", "$\\tau = mr$"], answer: 0, explanation: "$\\tau_{net} = I\\alpha$." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "Moment of inertia of a $2.0\\,\\text{kg}$ point mass at $r = 3.0\\,\\text{m}$, in $\\text{kg·m}^2$?", answer: { value: 18, tolerance: 0 }, explanation: "$2\\times3^2 = 18$." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "Mass farther from the rotation axis contributes more to the moment of inertia.", answer: true, explanation: "$I$ depends on $r^2$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Torque $12\\,\\text{N·m}$ on a body with $I = 4.0\\,\\text{kg·m}^2$. Angular acceleration in rad/s²?", answer: { value: 3, tolerance: 0 }, hint: "$\\alpha = \\tau/I$.", explanation: "$12/4 = 3\\,\\text{rad/s}^2$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A body has $I = 5.0\\,\\text{kg·m}^2$ and $\\alpha = 2.0\\,\\text{rad/s}^2$. Net torque in N·m?", answer: { value: 10, tolerance: 0 }, hint: "$\\tau = I\\alpha$.", explanation: "$5\\times2 = 10\\,\\text{N·m}$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A solid disk and a hoop have equal mass and radius. Which is harder to spin up?", options: ["the hoop", "the disk", "they are equal", "depends on color"], answer: 0, hint: "Where is the mass?", explanation: "The hoop has the larger $I = MR^2$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A solid disk has $M = 4\\,\\text{kg}$, $R = 0.5\\,\\text{m}$. Its moment of inertia $\\tfrac12 MR^2$, in $\\text{kg·m}^2$?", answer: { value: 0.5, tolerance: 0 }, hint: "$\\tfrac12 MR^2$.", explanation: "$\\tfrac12(4)(0.25) = 0.5$." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "For the same torque, a larger moment of inertia gives a smaller angular acceleration.", answer: true, hint: "$\\alpha = \\tau/I$.", explanation: "Bigger $I$ means smaller $\\alpha$." },
    ],
  },

  // ──────────────── 4. Rotational Kinetic Energy & Rolling ────────────────
  {
    slug: "rotational-energy",
    title: "Rotational Kinetic Energy & Rolling",
    tagline: "Energy stored in spin",
    estMinutes: 14,
    xpReward: 170,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "Energy in a Spin", sub: "A spinning flywheel stores energy, and a rolling ball carries energy in both its motion and its spin." } },
      { kind: "CONTEXT", title: "Why this matters", content: { markdown: "Flywheels store energy in rotation to smooth out engines and even power buses. And the classic race — which object rolls downhill fastest — is decided entirely by how rotational energy is shared. Rotational kinetic energy completes our energy toolkit." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "A rotating object has **rotational kinetic energy**, the spin analogue of $\\tfrac12 mv^2$:\n\n$$K_{rot} = \\tfrac12 I \\omega^2.$$\n\nA **rolling** object (like a wheel or ball) has *both* kinds at once — its center moves *and* it spins:\n\n$$K_{total} = \\tfrac12 m v^2 + \\tfrac12 I \\omega^2.$$\n\nFor rolling **without slipping**, the two are linked by $v = r\\omega$.\n\nThis explains the famous downhill race. When objects roll down a ramp, gravitational PE splits between translation and rotation. An object with a **larger** moment of inertia (for its mass and radius) puts more energy into spin and less into forward speed — so it rolls **slower**. The ranking from fastest to slowest:\n\n$$\\text{sphere} \\;>\\; \\text{disk} \\;>\\; \\text{hoop}.$$\n\nA hoop (all mass at the rim, largest $I$) always loses; a solid sphere always wins. Remarkably, the result is **independent of mass and radius** — only the *shape* (the $I$-to-$mr^2$ ratio) matters." } },
      { kind: "SIMULATION", title: "Try it: where energy goes", content: { simId: "energy-bars", intro: "Drop the ball to review how gravitational PE becomes kinetic energy. For a rolling object, that kinetic energy would split between forward motion and spin — the bigger the moment of inertia, the more goes into spinning." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Spinning flywheel", problem: "A flywheel has $I = 2.0\\,\\text{kg·m}^2$ spinning at $\\omega = 10\\,\\text{rad/s}$. Find its rotational kinetic energy.", steps: ["$K_{rot} = \\tfrac12 I\\omega^2 = \\tfrac12(2.0)(10)^2$.", "$= \\tfrac12(2.0)(100) = 100\\,\\text{J}$."], answer: "$K_{rot} = 100\\,\\text{J}$." },
        { title: "Rolling energy split", problem: "A rolling wheel has $4\\,\\text{J}$ of translational kinetic energy. If $I = \\tfrac12 mR^2$ (a disk), how much rotational kinetic energy does it have?", steps: ["For a disk, $K_{rot} = \\tfrac12 I\\omega^2 = \\tfrac12(\\tfrac12 mR^2)(v/R)^2 = \\tfrac14 mv^2$.", "Translational is $\\tfrac12 mv^2 = 4\\,\\text{J}$, so $mv^2 = 8\\,\\text{J}$.", "$K_{rot} = \\tfrac14 mv^2 = 2\\,\\text{J}$."], answer: "$2\\,\\text{J}$ of rotational kinetic energy." },
        { title: "The downhill race", problem: "A solid sphere, a disk, and a hoop roll from the same height. Which reaches the bottom first?", steps: ["Smaller $I$ (for its $mr^2$) leaves more energy for speed.", "Sphere $\\tfrac25$, disk $\\tfrac12$, hoop $1$ (in units of $mR^2$)."], answer: "The solid sphere — smallest moment of inertia, fastest roll." },
      ] } },
      { kind: "VIDEOS", title: "Watch", content: { videos: [{ youtubeId: "tCAxbgU5d34", title: "Rotational Kinetic Energy and Rolling" }] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Rotational kinetic energy and rolling." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Use $K_{rot} = \\tfrac12 I\\omega^2$ and the rolling energy split." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: flywheels as batteries", content: { markdown: "Because $K_{rot} = \\tfrac12 I\\omega^2$ grows with the **square** of spin rate, a flywheel spun very fast stores enormous energy in a small package. Modern flywheel energy storage uses carbon-fibre rotors spinning in vacuum at tens of thousands of rpm, magnetically levitated to kill friction. They charge and discharge in seconds, survive millions of cycles, and stabilise power grids — a mechanical 'battery' running on pure rotational kinetic energy." } },
      { kind: "DEEPER_DIVE", title: "Common misconceptions", content: { markdown: "**\"All objects roll down an incline at the same rate.\"** The fastest depends on shape through $I$: a solid sphere beats a disk, which beats a hoop, because more energy goes into spin when $I$ is larger.\n\n**\"A heavier or bigger object rolls down faster.\"** For rolling without slipping the result is independent of mass and radius — only the $I$-to-$mr^2$ ratio (the shape) decides the race.\n\n**\"A rolling object's energy is just $\\tfrac12 mv^2$.\"** A rolling body has both translational and rotational kinetic energy, $K = \\tfrac12 mv^2 + \\tfrac12 I\\omega^2$, linked by $v = r\\omega$." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Rotational kinetic energy $K_{rot} = \\tfrac12 I\\omega^2$.", "A rolling object has both $\\tfrac12 mv^2$ and $\\tfrac12 I\\omega^2$.", "Rolling without slipping links them via $v = r\\omega$.", "Downhill race: sphere > disk > hoop (smaller $I$ wins).", "The race result is independent of mass and radius."], formulas: [{ label: "Rotational KE", tex: "K_{rot} = \\tfrac12 I\\omega^2" }, { label: "Rolling total", tex: "K = \\tfrac12 mv^2 + \\tfrac12 I\\omega^2" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Rotational kinetic energy is:", options: ["$\\tfrac12 I\\omega^2$", "$\\tfrac12 mv^2$", "$I\\omega$", "$\\tfrac12 I\\omega$"], answer: 0, explanation: "$K_{rot} = \\tfrac12 I\\omega^2$." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "A flywheel with $I = 2.0\\,\\text{kg·m}^2$ spins at $\\omega = 10\\,\\text{rad/s}$. Rotational KE in joules?", answer: { value: 100, tolerance: 0 }, explanation: "$\\tfrac12(2)(100) = 100\\,\\text{J}$." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "A rolling object has both translational and rotational kinetic energy.", answer: true, explanation: "It moves forward and spins." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A body with $I = 4.0\\,\\text{kg·m}^2$ spins at $\\omega = 3.0\\,\\text{rad/s}$. Rotational KE in joules?", answer: { value: 18, tolerance: 0 }, hint: "$\\tfrac12 I\\omega^2$.", explanation: "$\\tfrac12(4)(9) = 18\\,\\text{J}$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A solid sphere, a disk, and a hoop roll from the same height. Which reaches the bottom first?", options: ["solid sphere", "disk", "hoop", "they tie"], answer: 0, hint: "Smallest moment of inertia.", explanation: "The sphere puts the least energy into spin." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Which rolls downhill slowest?", options: ["hoop", "disk", "sphere", "they tie"], answer: 0, hint: "Largest moment of inertia.", explanation: "The hoop has all its mass at the rim, largest $I$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "If a flywheel's spin rate $\\omega$ doubles, its rotational KE multiplies by what factor?", answer: { value: 4, tolerance: 0 }, hint: "$K \\propto \\omega^2$.", explanation: "$2^2 = 4$." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "For rolling without slipping, $v = r\\omega$.", answer: true, hint: "Links forward speed to spin.", explanation: "That's the rolling condition." },
    ],
  },

  // ──────────────── 5. Angular Momentum & Conservation ────────────────
  {
    slug: "angular-momentum",
    title: "Angular Momentum & Its Conservation",
    tagline: "The spin that's hard to stop",
    estMinutes: 15,
    xpReward: 180,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "Conserved Spin", sub: "Pull your arms in and you spin faster. Angular momentum is conserved — the rotational twin of momentum." } },
      { kind: "CONTEXT", title: "Why this matters", content: { markdown: "A figure skater's spin-up, a gyroscope's stubborn axis, a collapsing star becoming a millisecond pulsar — all are conservation of angular momentum. It's one of the great conservation laws, and it governs everything that turns, from atoms to galaxies." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "**Angular momentum** is the rotational version of momentum:\n\n$$L = I\\omega.$$\n\nIt's measured in $\\text{kg·m}^2/\\text{s}$. Just as a net force changes momentum, a **net torque** changes angular momentum: $\\tau_{net} = \\dfrac{dL}{dt}$.\n\n**Conservation of angular momentum:** with **no net external torque**, total angular momentum stays constant:\n\n$$I_i \\omega_i = I_f \\omega_f.$$\n\nHere's the magic: an object can change its **own** moment of inertia by redistributing its mass, and $\\omega$ must adjust to keep $L$ fixed. Pull mass *inward* and $I$ drops, so $\\omega$ must rise — you spin **faster**.\n\n- A **figure skater** pulls their arms in, shrinking $I$, and spins up dramatically.\n- A **collapsing star** shrinks enormously, so its spin rate skyrockets — forming a pulsar rotating hundreds of times per second.\n- A **diver** tucks to spin fast, then opens up to slow the rotation for a clean entry.\n\nAngular momentum is also a **vector** along the spin axis, which is why a spinning top or gyroscope resists tipping — changing its direction would require a torque." } },
      { kind: "SIMULATION", title: "Try it: balance and torque", content: { simId: "torque-balance", intro: "Revisit torque on the balance beam — recall that it's a net torque that changes angular momentum. With zero net torque, spin (angular momentum) stays constant." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "The skater spins up", problem: "A skater spinning at $\\omega_i = 2\\,\\text{rad/s}$ with $I_i = 6\\,\\text{kg·m}^2$ pulls in to $I_f = 2\\,\\text{kg·m}^2$. Find the new spin rate.", steps: ["Conserve $L$: $I_i\\omega_i = I_f\\omega_f$.", "$6 \\times 2 = 2 \\times \\omega_f$, so $\\omega_f = 12/2$.", "$= 6\\,\\text{rad/s}$."], answer: "$\\omega_f = 6\\,\\text{rad/s}$ — three times faster." },
        { title: "Angular momentum value", problem: "Find the angular momentum of a body with $I = 4\\,\\text{kg·m}^2$ spinning at $\\omega = 5\\,\\text{rad/s}$.", steps: ["$L = I\\omega = 4 \\times 5$.", "$= 20\\,\\text{kg·m}^2/\\text{s}$."], answer: "$L = 20\\,\\text{kg·m}^2/\\text{s}$." },
        { title: "Why pulsars spin fast", problem: "A slowly rotating star collapses to a tiny neutron star. What happens to its spin?", steps: ["Collapse shrinks $I$ enormously.", "With $L$ conserved, $\\omega$ must rise to compensate."], answer: "It spins far faster — becoming a rapidly rotating pulsar." },
      ] } },
      { kind: "VIDEOS", title: "Watch", content: { videos: [{ youtubeId: "RHHWG_Acm8s", title: "Angular Momentum and Conservation" }] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Angular momentum and its conservation." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Use $L = I\\omega$ and $I_i\\omega_i = I_f\\omega_f$." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: where conservation comes from", content: { markdown: "Like energy and linear momentum, conservation of angular momentum springs from a **symmetry** (Noether's theorem): the laws of physics are the same in every **direction** — *rotational symmetry* of space. Because nature has no preferred orientation, angular momentum is conserved. This is why it holds everywhere, from the electron's quantised spin to the rotation of entire galaxies, and why a gyroscope can keep a spacecraft pointed at a distant star for years." } },
      { kind: "DEEPER_DIVE", title: "Common misconceptions", content: { markdown: "**\"A spinning object keeps spinning because some force keeps pushing it.\"** With no net torque, angular momentum is conserved and it spins forever on its own — no force is needed to maintain rotation.\n\n**\"Pulling your arms in while spinning speeds you up for free.\"** Angular momentum $L = I\\omega$ is conserved, so as $I$ falls $\\omega$ rises; you actually do work pulling the mass inward, which is where the extra rotational kinetic energy comes from.\n\n**\"A spinning top stays upright by magic.\"** Angular momentum is a vector along the spin axis; tilting it requires a torque, so the gyroscope resists changes to its orientation rather than simply falling over." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Angular momentum $L = I\\omega$ (units $\\text{kg·m}^2/\\text{s}$).", "Net torque changes $L$; with no external torque, $L$ is conserved.", "$I_i\\omega_i = I_f\\omega_f$: shrink $I$ and you spin faster.", "Skaters, divers, and pulsars all use this.", "It's a vector along the spin axis — the basis of gyroscopes."], formulas: [{ label: "Angular momentum", tex: "L = I\\omega" }, { label: "Conservation", tex: "I_i\\omega_i = I_f\\omega_f" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Angular momentum is:", options: ["$I\\omega$", "$\\tfrac12 I\\omega^2$", "$rF\\sin\\theta$", "$mr$"], answer: 0, explanation: "$L = I\\omega$." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "With no external torque, total angular momentum is conserved.", answer: true, explanation: "That is conservation of angular momentum." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "A skater at $\\omega_i = 2\\,\\text{rad/s}$ with $I_i = 6\\,\\text{kg·m}^2$ pulls in to $I_f = 2\\,\\text{kg·m}^2$. New $\\omega$ in rad/s?", answer: { value: 6, tolerance: 0 }, explanation: "$6\\times2 = 2\\times\\omega_f \\Rightarrow \\omega_f = 6$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Angular momentum of $I = 4\\,\\text{kg·m}^2$ at $\\omega = 5\\,\\text{rad/s}$, in $\\text{kg·m}^2/\\text{s}$?", answer: { value: 20, tolerance: 0 }, hint: "$L = I\\omega$.", explanation: "$4\\times5 = 20$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A figure skater pulls in their arms. They spin:", options: ["faster", "slower", "at the same rate", "backward"], answer: 0, hint: "Smaller $I$, conserved $L$.", explanation: "$\\omega$ rises to keep $L$ constant." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Conserving $L$: $I_i = 8$, $\\omega_i = 3$; if $I_f = 4$, find $\\omega_f$ (rad/s).", answer: { value: 6, tolerance: 0 }, hint: "$I_i\\omega_i = I_f\\omega_f$.", explanation: "$24 = 4\\omega_f \\Rightarrow 6\\,\\text{rad/s}$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "When a star collapses into a tiny neutron star, its spin rate:", options: ["increases dramatically", "decreases", "stays the same", "stops"], answer: 0, hint: "$I$ shrinks, $L$ conserved.", explanation: "Shrinking $I$ forces a huge increase in $\\omega$." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "A spinning gyroscope resists changes to its axis direction because angular momentum is a vector.", answer: true, hint: "Changing direction needs a torque.", explanation: "Its angular momentum vector wants to stay fixed." },
    ],
  },
];
