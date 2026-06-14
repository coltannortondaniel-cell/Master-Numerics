import type { LessonSeed } from "../types.js";

/**
 * Binary Star Systems (grades 11–12): oscillations & waves — periodic motion,
 * from a mass on a spring to sound through air. Simple harmonic motion, the
 * pendulum, and travelling waves. NUMERIC/SYMBOLIC/GRAPH led. All original.
 */
export const oscillationsLessons: LessonSeed[] = [
  // ───────────────────────── 1. Simple Harmonic Motion ─────────────────────────
  {
    slug: "simple-harmonic-motion",
    title: "Simple Harmonic Motion",
    tagline: "The physics of springs and swings",
    estMinutes: 16,
    xpReward: 170,
    difficulty: 5,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "Back and Forth, Forever", sub: "A restoring force proportional to displacement produces the most fundamental motion in physics: the sine wave in time." } },
      { kind: "CONTEXT", title: "Two stars, one rhythm", content: { markdown: "Binary stars trace each other in a steady, repeating dance — the same periodic rhythm as a mass bouncing on a spring or a child on a swing. When the force pulling a system back to equilibrium grows in proportion to how far it's displaced, you get **simple harmonic motion (SHM)**, the template for all oscillation." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "**Simple harmonic motion** occurs when the restoring force is proportional to displacement and points back toward equilibrium — **Hooke's law**:\n\n$$F = -kx,$$\n\nwhere $k$ is the stiffness and the minus sign means 'always back toward center'.\n\nThe motion in time is a sinusoid:\n\n$$x(t) = A\\cos(\\omega t),$$\n\nwith **amplitude** $A$ (the maximum displacement) and **angular frequency** $\\omega$. For a mass $m$ on a spring,\n\n$$\\omega = \\sqrt{\\frac{k}{m}}, \\qquad T = 2\\pi\\sqrt{\\frac{m}{k}}.$$\n\nThe **period** $T$ is the time for one full cycle; **frequency** $f = 1/T$ is cycles per second (hertz). Notice the period does **not** depend on amplitude — a wider swing simply moves faster, taking the same time. Energy sloshes between elastic potential ($\\tfrac12 kx^2$) and kinetic ($\\tfrac12 mv^2$), summing to a constant." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Period of a spring", problem: "A $1\\,\\text{kg}$ mass on a spring with $k = 4\\,\\text{N/m}$. Find $\\omega$.", steps: ["$\\omega = \\sqrt{k/m}$.", "$\\sqrt{4/1} = 2$."], answer: "$\\omega = 2\\,\\text{rad/s}$." },
        { title: "Frequency", problem: "An oscillator has period $T = 0.5\\,\\text{s}$. Find its frequency.", steps: ["$f = 1/T$.", "$1/0.5 = 2$."], answer: "$f = 2\\,\\text{Hz}$." },
        { title: "Amplitude independence", problem: "Does a bigger push change a spring's period?", steps: ["$T = 2\\pi\\sqrt{m/k}$ has no $A$.", "Period is fixed by $m$ and $k$."], answer: "No — period is independent of amplitude." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "Restoring force ∝ displacement; period from m and k." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Use $\\omega = \\sqrt{k/m}$, $T = 2\\pi\\sqrt{m/k}$, $f = 1/T$." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: SHM is a shadow of circular motion", content: { markdown: "Spin a point steadily around a circle and watch its shadow on a wall: the shadow moves in exact simple harmonic motion. That's why $x(t) = A\\cos(\\omega t)$ uses the same $\\omega$ as rotation. It also explains the deep link to calculus: differentiating $x(t) = A\\cos\\omega t$ gives velocity $-A\\omega\\sin\\omega t$ and acceleration $-A\\omega^2\\cos\\omega t = -\\omega^2 x$ — acceleration proportional to displacement, the defining equation of SHM." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["SHM arises from a restoring force $F = -kx$.", "Motion is sinusoidal: $x(t) = A\\cos(\\omega t)$.", "$\\omega = \\sqrt{k/m}$ and $T = 2\\pi\\sqrt{m/k}$.", "Frequency $f = 1/T$, in hertz.", "Period is independent of amplitude; energy trades between elastic and kinetic."], formulas: [{ label: "Hooke's law", tex: "F = -kx" }, { label: "Angular frequency", tex: "\\omega = \\sqrt{\\dfrac{k}{m}}" }, { label: "Period", tex: "T = 2\\pi\\sqrt{\\dfrac{m}{k}}" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "In SHM the restoring force is proportional to:", options: ["velocity", "displacement", "time", "mass only"], answer: 1, explanation: "$F = -kx$ — proportional to displacement." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "A $1\\,\\text{kg}$ mass on a spring with $k = 4\\,\\text{N/m}$. Find $\\omega$ in rad/s.", answer: { value: 2, tolerance: 0 }, explanation: "$\\sqrt{4/1} = 2$." },
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "An oscillator has period $T = 0.5\\,\\text{s}$. Find its frequency in Hz.", answer: { value: 2, tolerance: 0 }, explanation: "$f = 1/0.5 = 2$." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "Write the angular frequency $\\omega$ of a spring in terms of stiffness $k$ and mass $m$. (Type like `sqrt(k/m)`.)", answer: { expr: "sqrt(k/m)", vars: ["k", "m"] }, difficulty: 4, hint: "Root of stiffness over mass.", explanation: "$\\omega = \\sqrt{k/m}$." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "Increasing the amplitude of a spring oscillation increases its period.", answer: false, hint: "Does $T = 2\\pi\\sqrt{m/k}$ contain amplitude?", explanation: "Period depends only on $m$ and $k$, not amplitude." },
      { scope: "PRACTICE", kind: "GRAPH", prompt: "With $A = 1$ and $\\omega = 1$, displacement is $x(t) = \\cos t$. Graph it (enter $x$ as a function of $t$, use $x$ for $t$).", answer: { expr: "cos(x)", domain: [-6.28, 6.28], variable: "x" }, difficulty: 4, hint: "Starts at the maximum.", explanation: "$x(t) = \\cos t$ — starts at $+1$ and oscillates." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A $4\\,\\text{kg}$ mass on a spring with $k = 16\\,\\text{N/m}$. Find $\\omega$ in rad/s.", answer: { value: 2, tolerance: 0 }, hint: "$\\sqrt{16/4}$.", explanation: "$\\sqrt{4} = 2$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "Frequency is measured in:", options: ["seconds", "metres", "hertz", "newtons"], answer: 2, hint: "Cycles per second.", explanation: "Frequency is in hertz (Hz)." },
    ],
  },

  // ───────────────────────── 2. Waves & Sound ─────────────────────────
  {
    slug: "waves-and-sound",
    title: "Waves & Sound",
    tagline: "Oscillation on the move",
    estMinutes: 15,
    xpReward: 160,
    difficulty: 4,
    sections: [
      { kind: "HERO", content: { scene: "sun", headline: "Energy Without Matter", sub: "A wave carries energy across space while the medium itself just oscillates in place." } },
      { kind: "CONTEXT", title: "The light of distant stars", content: { markdown: "The light reaching us from a binary star crossed light-years of space as a **wave**. So does the sound of a voice, the ripple on a pond, and the signal in a fibre. A wave is a self-propagating oscillation — and one simple equation links its speed, frequency, and wavelength." } },
      { kind: "CONCEPT", title: "The big idea", content: { markdown: "A **wave** is a disturbance that carries energy through a medium (or, for light, through space) while the medium itself only oscillates locally.\n\nKey quantities:\n\n- **Wavelength** $\\lambda$: distance between successive crests.\n- **Frequency** $f$: oscillations per second (Hz).\n- **Amplitude**: the oscillation's size (loudness for sound, brightness for light).\n- **Speed** $v$: how fast a crest travels.\n\nThe master relation:\n\n$$v = f\\lambda.$$\n\nFor a fixed speed, higher frequency means shorter wavelength. **Transverse** waves oscillate perpendicular to travel (light, a plucked string); **longitudinal** waves oscillate along the travel direction (sound, as compressions of air). Sound travels at about $340\\,\\text{m/s}$ in air; light at $3\\times10^8\\,\\text{m/s}$." } },
      { kind: "WORKED_EXAMPLES", title: "Worked examples", content: { examples: [
        { title: "Wave speed", problem: "A wave has $f = 5\\,\\text{Hz}$ and $\\lambda = 2\\,\\text{m}$. Find its speed.", steps: ["$v = f\\lambda$.", "$5 \\times 2 = 10$."], answer: "$v = 10\\,\\text{m/s}$." },
        { title: "Find wavelength", problem: "Sound at $340\\,\\text{m/s}$ and $f = 170\\,\\text{Hz}$. Find $\\lambda$.", steps: ["$\\lambda = v/f$.", "$340/170 = 2$."], answer: "$\\lambda = 2\\,\\text{m}$." },
        { title: "Type of wave", problem: "Is sound transverse or longitudinal?", steps: ["Air compresses along the travel direction.", "Oscillation is parallel to motion."], answer: "Longitudinal." },
      ] } },
      { kind: "CONCEPT_CHECK", title: "Quick check", content: { intro: "$v = f\\lambda$ ties speed, frequency, wavelength." } },
      { kind: "PRACTICE", title: "Practice problems", content: { intro: "Rearrange $v = f\\lambda$ as needed." } },
      { kind: "DEEPER_DIVE", title: "Deeper dive: the Doppler effect", content: { markdown: "When a wave source moves toward you, the crests bunch up — shorter wavelength, higher frequency; moving away, they stretch — lower frequency. That's the **Doppler effect**: the rising-then-falling pitch of a passing siren, and, for light, the **redshift** of receding galaxies. Astronomers measure the Doppler wobble of a star to detect unseen companions — exactly how many binary systems and exoplanets are found." } },
      { kind: "SUMMARY", title: "Summary", content: { takeaways: ["A wave carries energy while the medium oscillates in place.", "Wavelength λ, frequency f, amplitude, and speed v describe it.", "The wave relation: $v = f\\lambda$.", "Transverse waves oscillate across travel; longitudinal along it.", "Sound is longitudinal (~340 m/s); light is transverse (~3×10⁸ m/s)."], formulas: [{ label: "Wave relation", tex: "v = f\\lambda" }] } },
    ],
    questions: [
      { scope: "CONCEPT_CHECK", kind: "NUMERIC", prompt: "A wave has $f = 5\\,\\text{Hz}$ and $\\lambda = 2\\,\\text{m}$. Find its speed in m/s.", answer: { value: 10, tolerance: 0 }, explanation: "$v = f\\lambda = 10\\,\\text{m/s}$." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "The wave relation is:", options: ["$v = f/\\lambda$", "$v = f\\lambda$", "$v = \\lambda/f$", "$v = f + \\lambda$"], answer: 1, explanation: "$v = f\\lambda$." },
      { scope: "CONCEPT_CHECK", kind: "MCQ", prompt: "Sound waves in air are:", options: ["transverse", "longitudinal", "stationary", "electromagnetic"], answer: 1, explanation: "Air compresses along the direction of travel — longitudinal." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "Sound travels at $340\\,\\text{m/s}$. Find the wavelength of a $170\\,\\text{Hz}$ tone, in metres.", answer: { value: 2, tolerance: 0 }, hint: "$\\lambda = v/f$.", explanation: "$340/170 = 2\\,\\text{m}$." },
      { scope: "PRACTICE", kind: "SYMBOLIC", prompt: "Solve the wave relation for wavelength $\\lambda$ in terms of speed $v$ and frequency $f$. (Type like `v/f`.)", answer: { expr: "v/f", vars: ["v", "f"] }, difficulty: 3, hint: "Divide $v$ by $f$.", explanation: "$\\lambda = v/f$." },
      { scope: "PRACTICE", kind: "TRUE_FALSE", prompt: "At a fixed wave speed, higher frequency means shorter wavelength.", answer: true, hint: "$v = f\\lambda$ with $v$ fixed.", explanation: "Since $v = f\\lambda$ is constant, $f$ up means $\\lambda$ down." },
      { scope: "PRACTICE", kind: "NUMERIC", prompt: "A wave travels at $12\\,\\text{m/s}$ with wavelength $3\\,\\text{m}$. Find its frequency in Hz.", answer: { value: 4, tolerance: 0 }, hint: "$f = v/\\lambda$.", explanation: "$12/3 = 4\\,\\text{Hz}$." },
      { scope: "PRACTICE", kind: "MCQ", prompt: "The rising-then-falling pitch of a passing siren is the:", options: ["Doppler effect", "photoelectric effect", "greenhouse effect", "Bernoulli effect"], answer: 0, hint: "Motion changes observed frequency.", explanation: "Relative motion shifts the observed frequency — the Doppler effect." },
    ],
  },
];
