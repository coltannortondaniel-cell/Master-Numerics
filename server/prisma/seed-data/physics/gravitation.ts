import type { LessonSeed } from "../types.js";

/**
 * The Sun (grades 11–12): gravitation & circular motion — the force that holds
 * the solar system together. Uniform circular motion and centripetal
 * acceleration, Newton's law of universal gravitation, and orbits with Kepler's
 * third law. Uses the locally graded NUMERIC / SYMBOLIC / GRAPH / PROOF types.
 * All original content.
 */
export const gravitationLessons: LessonSeed[] = [
  // ───────────────────────── 1. Uniform Circular Motion ─────────────────────────
  {
    slug: "uniform-circular-motion",
    title: "Uniform Circular Motion",
    tagline: "Turning is accelerating",
    estMinutes: 15,
    xpReward: 160,
    difficulty: 4,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "Always Falling Inward", sub: "An object moving in a circle at steady speed is still accelerating — because its direction never stops changing." } },
      { kind: "CONTEXT", title: "Why a planet doesn't fly off", content: { markdown: "Earth races around the Sun at about $30\\,\\text{km/s}$, yet it neither speeds up nor flies away. Its **speed** is constant but its **velocity** is not — velocity is a vector, and its direction turns continuously. A changing velocity means acceleration, and acceleration needs a force. Understanding that force is the key to every orbit." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "In **uniform circular motion** an object moves in a circle of radius $r$ at constant speed $v$. The velocity is always **tangent** to the circle, so its direction changes constantly — that is an acceleration even though the speed is fixed.\n\nThis **centripetal** ('center-seeking') acceleration points toward the center:\n\n$$a_c = \\frac{v^2}{r}.$$\n\nBy Newton's second law it requires a net inward **centripetal force**:\n\n$$F_c = m a_c = \\frac{m v^2}{r}.$$\n\nThe time for one full loop is the **period** $T$, and since the object covers a circumference $2\\pi r$ in that time,\n\n$$v = \\frac{2\\pi r}{T}.$$\n\nThe centripetal force is not a new kind of force — it is whatever real force (gravity, tension, friction) happens to point toward the center." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Centripetal acceleration", problem: "A car rounds a circle of radius $20\\,\\text{m}$ at $10\\,\\text{m/s}$. Find $a_c$.", steps: ["Use $a_c = v^2/r$.", "$a_c = 10^2 / 20 = 100/20$."], answer: "$a_c = 5\\,\\text{m/s}^2$ toward the center." },
        { title: "Centripetal force", problem: "A $2\\,\\text{kg}$ mass in that same turn needs what inward force?", steps: ["$F_c = m a_c$.", "$F_c = 2 \\times 5$."], answer: "$F_c = 10\\,\\text{N}$." },
        { title: "Speed from the period", problem: "A point at radius $r = 1\\,\\text{m}$ completes a loop in $T = \\pi\\,\\text{s}$. Find $v$.", steps: ["$v = 2\\pi r / T$.", "$v = 2\\pi(1)/\\pi = 2$."], answer: "$v = 2\\,\\text{m/s}$." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Direction changes, so there is acceleration." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Use $a_c = v^2/r$ and $F_c = mv^2/r$." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: why the acceleration points inward", content: { markdown: "Over a tiny time $\\Delta t$ the velocity vector turns by a small angle but keeps the same length. The **change** in velocity, $\\Delta \\vec v = \\vec v_f - \\vec v_i$, points toward the center of the circle — and $\\vec a = \\Delta \\vec v / \\Delta t$ inherits that direction. Taking the limit $\\Delta t \\to 0$ gives a vector that always points exactly at the center, with magnitude $v^2/r$. This is the geometric origin of centripetal acceleration, and the same limiting argument is the derivative in disguise." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Constant speed in a circle still means changing velocity → acceleration.", "Centripetal acceleration $a_c = v^2/r$ points to the center.", "Centripetal force $F_c = mv^2/r$ is whatever real force points inward.", "Period and speed are linked by $v = 2\\pi r/T$.", "There is no outward 'centrifugal' force in the inertial frame."], formulas: [{ label: "Centripetal acceleration", tex: "a_c = \\dfrac{v^2}{r}" }, { label: "Centripetal force", tex: "F_c = \\dfrac{m v^2}{r}" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "An object moving in a circle at constant speed is accelerating.", answer: true, explanation: "Its direction (hence velocity) changes, so it accelerates." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "The centripetal acceleration points:", options: ["tangent to the circle", "toward the center", "away from the center", "straight down"], answer: 1, explanation: "Centripetal means center-seeking — it points inward." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "Find $a_c$ for $v = 10\\,\\text{m/s}$ and $r = 20\\,\\text{m}$ (in $\\text{m/s}^2$).", answer: { value: 5, tolerance: 0 }, explanation: "$a_c = 10^2/20 = 5\\,\\text{m/s}^2$." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "Write centripetal acceleration $a_c$ in terms of speed $v$ and radius $r$. (Type like `v^2/r`.)", answer: { expr: "v^2/r", vars: ["v", "r"] }, difficulty: 3, hint: "Speed squared over radius.", explanation: "$a_c = \\dfrac{v^2}{r}$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A $2\\,\\text{kg}$ mass moves at $4\\,\\text{m/s}$ on a radius of $2\\,\\text{m}$. Find the centripetal force in newtons.", answer: { value: 16, tolerance: 0 }, hint: "$F_c = mv^2/r$.", explanation: "$F_c = 2 \\times 16 / 2 = 16\\,\\text{N}$." },
      { scope: "PRACTICE", kind: "GRAPH", prompt: "At fixed radius $r = 1\\,\\text{m}$, centripetal acceleration as a function of speed is $a = v^2$. Graph it (enter $a$ as a function of $v$, use $x$ for $v$).", answer: { expr: "x^2", domain: [0, 5], variable: "x" }, difficulty: 4, hint: "At $r=1$, $a_c = v^2$.", explanation: "$a = v^2$ — a parabola: doubling the speed quadruples the acceleration." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "If the speed doubles at the same radius, the centripetal acceleration becomes:", options: ["doubled", "halved", "four times larger", "unchanged"], answer: 2, hint: "$a_c \\propto v^2$.", explanation: "Acceleration scales with $v^2$, so it quadruples." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A point at radius $2\\,\\text{m}$ completes a loop every $\\pi\\,\\text{s}$. Find its speed in m/s ($v = 2\\pi r/T$).", answer: { value: 4, tolerance: 0 }, hint: "$v = 2\\pi(2)/\\pi$.", explanation: "$v = 4\\pi/\\pi = 4\\,\\text{m/s}$." },
    ],
  },

  // ───────────────────────── 2. Universal Gravitation ─────────────────────────
  {
    slug: "universal-gravitation",
    title: "Universal Gravitation",
    tagline: "Every mass pulls every other",
    estMinutes: 15,
    xpReward: 160,
    difficulty: 4,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "The Same Force, Everywhere", sub: "The pull that drops an apple is the very same pull that bends the Moon's path. Newton's great unification." } },
      { kind: "CONTEXT", title: "From the apple to the Moon", content: { markdown: "Newton's insight was audacious: the force pulling an apple to the ground is the *same* force holding the Moon in orbit, just weaker with distance. Every pair of masses in the universe attracts, by one law, with no exceptions yet found. That single equation explains tides, orbits, and the structure of galaxies." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "**Newton's law of universal gravitation:** every two point masses attract along the line joining them with a force\n\n$$F = G\\,\\frac{m_1 m_2}{r^2},$$\n\nwhere $m_1, m_2$ are the masses, $r$ is the distance between their centers, and $G = 6.67\\times10^{-11}\\ \\text{N·m}^2/\\text{kg}^2$ is the gravitational constant.\n\nKey features:\n\n- The force is **mutual and equal** on both bodies (Newton's third law): the Earth pulls you down exactly as hard as you pull it up.\n- It obeys an **inverse-square law**: triple the distance and the force drops to $\\tfrac{1}{9}$.\n- Near Earth's surface this reduces to $F = mg$ with $g = GM_\\oplus/R_\\oplus^2 \\approx 9.8\\,\\text{m/s}^2$." } },
      { kind: "SIMULATION", title: "Try it: free fall", content: { simId: "gravity-drop", intro: "Gravity gives every mass the same acceleration near Earth's surface. Drop objects and watch them fall together — mass cancels out." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Inverse-square scaling", problem: "If the distance between two masses triples, what happens to the gravitational force?", steps: ["$F \\propto 1/r^2$.", "Replace $r$ with $3r$: factor $1/3^2 = 1/9$."], answer: "The force becomes one-ninth as strong." },
        { title: "Surface gravity", problem: "Why do all objects fall at the same $g$ regardless of mass?", steps: ["$F = GMm/R^2$ on a mass $m$.", "Acceleration $a = F/m = GM/R^2$.", "The $m$ cancels."], answer: "Acceleration is independent of the falling mass." },
        { title: "Reading the constant", problem: "In $F = Gm_1m_2/r^2$, what role does $G$ play?", steps: ["It sets the absolute strength of gravity.", "It's the same everywhere in the universe."], answer: "$G$ is the universal gravitational constant." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Mutual, attractive, inverse-square." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Mind the inverse-square dependence on distance." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: gravitational field", content: { markdown: "We often split gravity into two ideas: a mass $M$ creates a **field** $g = GM/r^2$ in the space around it, and a second mass $m$ placed there feels $F = mg$. The field exists whether or not a test mass is present — it's a property of space sculpted by mass. This field picture is the bridge to Einstein's general relativity, where mass curves spacetime itself and 'gravity' is objects following the straightest possible paths through that curvature." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["Gravity acts between every pair of masses: $F = Gm_1m_2/r^2$.", "It is attractive, mutual, and equal on both bodies.", "It follows an inverse-square law with distance.", "$G$ is the universal gravitational constant.", "Surface gravity $g = GM/R^2$ is the same for all falling masses."], formulas: [{ label: "Universal gravitation", tex: "F = G\\dfrac{m_1 m_2}{r^2}" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Gravitational force between two masses depends on distance as:", options: ["$\\propto r$", "$\\propto 1/r$", "$\\propto 1/r^2$", "independent of $r$"], answer: 2, explanation: "It is an inverse-square law: $F \\propto 1/r^2$." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "Earth pulls on you with the same magnitude of force that you pull on Earth.", answer: true, explanation: "Newton's third law — the gravitational forces are an equal, opposite pair." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "If the distance between two masses triples, the force becomes:", options: ["3× larger", "9× larger", "1/3 as strong", "1/9 as strong"], answer: 3, explanation: "$1/3^2 = 1/9$." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "With $k = Gm_1m_2$ held constant, write the gravitational force $F$ as a function of distance $r$. (Type like `k/r^2`.)", answer: { expr: "k/r^2", vars: ["k", "r"] }, difficulty: 3, hint: "Inverse square of $r$.", explanation: "$F = \\dfrac{k}{r^2}$ where $k = Gm_1m_2$." },
      { scope: "PRACTICE", kind: "GRAPH", prompt: "Taking $Gm_1m_2 = 1$, gravitational force versus distance is $F = 1/r^2$. Graph it (enter $F$ as a function of $r$, use $x$ for $r$).", answer: { expr: "1/x^2", domain: [0.5, 4], variable: "x" }, difficulty: 4, hint: "Inverse-square curve.", explanation: "$F = 1/r^2$ — a steep curve that falls off quickly with distance." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "A heavy ball and a light ball dropped together (no air) hit the ground at the same time.", answer: true, hint: "Does acceleration depend on the falling mass?", explanation: "Acceleration $g = GM/R^2$ is independent of the falling mass." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "The constant $G$ in $F = Gm_1m_2/r^2$:", options: ["changes from planet to planet", "is the same throughout the universe", "depends on the masses", "depends on the distance"], answer: 1, hint: "It's the *universal* gravitational constant.", explanation: "$G$ is a universal constant." },
      { scope: "PRACTICE", kind: "PROOF", prompt: "Arrange the argument that free-fall acceleration is independent of mass.", options: ["Gravity on a mass $m$ near Earth is $F = GMm/R^2$.", "By Newton's second law, $a = F/m$.", "Substitute: $a = GMm/(R^2 m)$.", "The $m$ cancels: $a = GM/R^2 = g$."], answer: [], difficulty: 5, hint: "Start from the force, divide by $m$.", explanation: "Dividing the gravitational force by the mass cancels $m$, leaving $g = GM/R^2$." },
    ],
  },

  // ───────────────────────── 3. Orbits & Kepler's Third Law ─────────────────────────
  {
    slug: "orbits-and-kepler",
    title: "Orbits & Kepler's Laws",
    tagline: "Why far planets move slow",
    estMinutes: 16,
    xpReward: 170,
    difficulty: 5,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "Falling Forever", sub: "An orbit is just continuous falling — moving sideways fast enough that you keep missing the ground." } },
      { kind: "CONTEXT", title: "Newton's cannonball", content: { markdown: "Newton imagined a cannon firing horizontally ever faster. Slow shots fall to Earth; fast enough, and the ground curves away as quickly as the ball falls — it never lands. That is an **orbit**: the same gravity that drops an apple, supplying exactly the centripetal force a circular path needs." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "For a circular orbit, gravity **is** the centripetal force. Setting them equal for a small mass $m$ orbiting a large mass $M$ at radius $r$:\n\n$$\\frac{GMm}{r^2} = \\frac{m v^2}{r} \\;\\Rightarrow\\; v = \\sqrt{\\frac{GM}{r}}.$$\n\nNotice $m$ cancels — orbital speed depends only on what you orbit and how far out. **Farther orbits are slower.**\n\nUsing $v = 2\\pi r/T$ and simplifying gives **Kepler's third law**:\n\n$$T^2 = \\frac{4\\pi^2}{GM}\\,r^3 \\quad\\Longrightarrow\\quad T^2 \\propto r^3.$$\n\nThe square of the period grows as the cube of the radius. Kepler's other two laws: orbits are **ellipses** with the Sun at one focus, and a planet **sweeps equal areas in equal times** (so it moves faster when closer)." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Orbital speed", problem: "Why doesn't orbital speed depend on the satellite's mass?", steps: ["Set $GMm/r^2 = mv^2/r$.", "The satellite mass $m$ cancels.", "$v = \\sqrt{GM/r}$."], answer: "Orbital speed depends only on $M$ and $r$." },
        { title: "Kepler scaling", problem: "Planet B orbits 4× farther than planet A. How many times longer is B's year? (Use $T^2 \\propto r^3$.)", steps: ["$T \\propto r^{3/2}$.", "$4^{3/2} = (\\sqrt4)^3 = 2^3 = 8$."], answer: "B's year is 8 times longer." },
        { title: "Equal areas", problem: "Where in its elliptical orbit does a comet move fastest?", steps: ["Equal areas in equal times.", "Near the Sun the radius is short, so it must sweep faster."], answer: "At its closest approach (perihelion)." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Gravity supplies the centripetal force." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Use $v = \\sqrt{GM/r}$ and $T^2 \\propto r^3$." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: deriving Kepler's third law", content: { markdown: "Start from $v = \\sqrt{GM/r}$ and the definition $v = 2\\pi r/T$. Equate them: $\\dfrac{2\\pi r}{T} = \\sqrt{\\dfrac{GM}{r}}$. Square both sides: $\\dfrac{4\\pi^2 r^2}{T^2} = \\dfrac{GM}{r}$. Rearrange to isolate $T^2$: $T^2 = \\dfrac{4\\pi^2}{GM} r^3$. The proportionality constant $\\dfrac{4\\pi^2}{GM}$ is the same for every body orbiting that mass — which is exactly why a single Kepler curve fits all the planets at once." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["An orbit is free fall with enough sideways speed.", "Gravity provides the centripetal force: $v = \\sqrt{GM/r}$.", "Orbital speed is independent of the orbiting mass; farther = slower.", "Kepler III: $T^2 \\propto r^3$.", "Orbits are ellipses; planets sweep equal areas in equal times."], formulas: [{ label: "Orbital speed", tex: "v = \\sqrt{\\dfrac{GM}{r}}" }, { label: "Kepler's third law", tex: "T^2 \\propto r^3" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "In a circular orbit, the centripetal force is provided by:", options: ["air resistance", "gravity", "the engine", "magnetism"], answer: 1, explanation: "Gravity supplies exactly the inward force the circular path needs." },
      { scope: "CONCEPT_CHECK", kind: "TRUE_FALSE", prompt: "A more massive satellite must orbit faster at the same radius.", answer: false, explanation: "Orbital speed $v = \\sqrt{GM/r}$ is independent of the satellite's mass." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Kepler's third law states that:", options: ["$T \\propto r$", "$T^2 \\propto r^3$", "$T^3 \\propto r^2$", "$T \\propto 1/r$"], answer: 1, explanation: "The square of the period is proportional to the cube of the radius." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "With $k = GM$ constant, write the circular orbital speed $v$ as a function of radius $r$. (Type like `sqrt(k/r)`.)", answer: { expr: "sqrt(k/r)", vars: ["k", "r"] }, difficulty: 4, hint: "Square root of $GM$ over $r$.", explanation: "$v = \\sqrt{\\dfrac{GM}{r}} = \\sqrt{\\dfrac{k}{r}}$." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Planet B orbits 4 times farther than planet A. Using $T^2 \\propto r^3$, how many times longer is B's orbital period?", answer: { value: 8, tolerance: 0 }, hint: "$4^{3/2} = (\\sqrt 4)^3$.", explanation: "$4^{3/2} = 2^3 = 8$ times longer." },
      { scope: "PRACTICE", kind: "GRAPH", prompt: "With the constant set to 1, the orbital period follows $T = r^{1.5}$. Graph it (enter $T$ as a function of $r$, use $x$ for $r$).", answer: { expr: "x^1.5", domain: [0, 4], variable: "x" }, difficulty: 5, hint: "$T = r^{3/2}$.", explanation: "$T = r^{1.5}$ — period rises faster than linearly, but slower than $r^2$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "A comet in an elliptical orbit moves fastest:", options: ["farthest from the Sun", "closest to the Sun", "at constant speed throughout", "halfway along the orbit"], answer: 1, hint: "Equal areas in equal times.", explanation: "Near the Sun it sweeps the same area with a shorter radius, so it must move faster." },
      { scope: "PRACTICE", kind: "PROOF", prompt: "Arrange the derivation of orbital speed for a circular orbit.", options: ["Gravity equals the centripetal force: $\\dfrac{GMm}{r^2} = \\dfrac{mv^2}{r}$.", "Cancel $m$ from both sides.", "Multiply both sides by $r$: $\\dfrac{GM}{r} = v^2$.", "Take the square root: $v = \\sqrt{GM/r}$."], answer: [], difficulty: 5, hint: "Set the two forces equal, then solve for $v$.", explanation: "Equating gravity to the centripetal requirement and solving gives $v = \\sqrt{GM/r}$." },
    ],
  },
];
