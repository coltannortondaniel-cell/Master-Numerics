import type { WorldSeed } from "./types.js";
import { moonLessons } from "./moon.js";
import { earthSurfaceLessons } from "./earth-surface.js";
import { atmosphereLessons } from "./atmosphere.js";
import { kinematicsLessons } from "./physics/kinematics.js";
import { dynamicsLessons } from "./physics/dynamics.js";
import { energyLessons } from "./physics/energy.js";
import { momentumLessons } from "./physics/momentum.js";
import { rotationLessons } from "./physics/rotation.js";
import { gravitationLessons } from "./physics/gravitation.js";
import { oscillationsLessons } from "./physics/oscillations.js";
import { electromagnetismLessons } from "./physics/electromagnetism.js";
import { modernPhysicsLessons } from "./physics/modern-physics.js";
import { quantumMechanicsLessons } from "./physics/quantum-mechanics.js";
import { generalRelativityLessons } from "./physics/general-relativity.js";
import { astrophysicsLessons } from "./physics/astrophysics.js";
import { thermodynamicsLessons } from "./physics/thermodynamics.js";
import { nuclearParticleLessons } from "./physics/nuclear-particle.js";
import { cosmologyLessons } from "./physics/cosmology.js";

/**
 * The full 18-world cosmic scale. Worlds 1–3 ship with complete lesson
 * content in Phase 2; the rest are charted on the map and populated in
 * later content drops.
 */
export const worlds: WorldSeed[] = [
  {
    slug: "the-moon",
    name: "The Moon",
    subtitle: "Where the journey begins",
    description:
      "A silent, silver world a quarter of a million miles away. Here you will meet gravity, learn why the Moon shines without burning, and watch its face change night after night.",
    gradeRange: "K–2",
    scaleLabel: "3×10⁶ m",
    palette: { accent: "#C9CED6", glow: "#8E97A8" },
    lessons: moonLessons,
  },
  {
    slug: "earths-surface",
    name: "Earth's Surface",
    subtitle: "The world beneath your feet",
    description:
      "Home. The only world with playgrounds, oceans, and fridge magnets. Discover the everyday physics hiding in falling apples, slamming doors, and the spin that gives us morning.",
    gradeRange: "K–2",
    scaleLabel: "1.3×10⁷ m",
    palette: { accent: "#22D3A0", glow: "#0E8C6B" },
    lessons: earthSurfaceLessons,
  },
  {
    slug: "earths-atmosphere",
    name: "Earth's Atmosphere",
    subtitle: "The ocean of air",
    description:
      "Climb above the clouds into the thin blue shell that keeps us alive. Feel the weight of air, ride the winds, learn why the sky is blue, and find out what holds an airplane up.",
    gradeRange: "3–4",
    scaleLabel: "1×10⁵ m",
    palette: { accent: "#4FB6FF", glow: "#1E6FB8" },
    lessons: atmosphereLessons,
  },
  {
    slug: "earth-moon-system",
    name: "The Earth–Moon System",
    subtitle: "Classical Mechanics · Kinematics",
    description: "The physics of motion. Position and displacement, velocity and acceleration, the kinematic equations, and free fall & projectiles — taught with the calculus definitions surfaced.",
    gradeRange: "9–11",
    scaleLabel: "4×10⁸ m",
    palette: { accent: "#7FB3FF", glow: "#3D6FC9" },
    lessons: kinematicsLessons,
  },
  {
    slug: "inner-solar-system",
    name: "The Inner Solar System",
    subtitle: "Classical Mechanics · Newton's Laws & Dynamics",
    description: "Why things move the way they do. Newton's three laws, force and mass, friction, and inclined planes — the workhorse toolkit of all of mechanics, taught with free-body diagrams and worked examples.",
    gradeRange: "9–11",
    scaleLabel: "5×10¹¹ m",
    palette: { accent: "#FF8C42", glow: "#C25A1E" },
    lessons: dynamicsLessons,
  },
  {
    slug: "outer-solar-system",
    name: "The Outer Solar System",
    subtitle: "Classical Mechanics · Work, Energy & Power",
    description: "The currency of physics: energy. Work as force through a distance, kinetic and potential energy, the conservation of mechanical energy, and power — the rate energy is transferred.",
    gradeRange: "10–12",
    scaleLabel: "5×10¹² m",
    palette: { accent: "#5AD1E6", glow: "#2A8FA3" },
    lessons: energyLessons,
  },
  {
    slug: "oort-cloud",
    name: "The Oort Cloud",
    subtitle: "Classical Mechanics · Momentum & Collisions",
    description: "Mass in motion and what it takes to change it. Momentum and impulse, conservation of momentum, inelastic and elastic collisions, and the center of mass — the tools for analysing any collision.",
    gradeRange: "11–12",
    scaleLabel: "1×10¹⁵ m",
    palette: { accent: "#9AA7FF", glow: "#5662B8" },
    lessons: momentumLessons,
  },
  {
    slug: "interstellar-space",
    name: "Interstellar Space",
    subtitle: "Classical Mechanics · Rotational Motion",
    description: "How things spin. Angular kinematics, torque, moment of inertia and τ = Iα, rotational kinetic energy & rolling, and angular momentum with its conservation.",
    gradeRange: "11–12",
    scaleLabel: "1×10¹⁶ m",
    palette: { accent: "#3E4C8C", glow: "#27305C" },
    lessons: rotationLessons,
  },
  {
    slug: "the-sun",
    name: "The Sun",
    subtitle: "Classical Mechanics · Gravitation & Circular Motion",
    description: "The Sun's grip on the planets. Uniform circular motion and centripetal acceleration, Newton's law of universal gravitation, and orbits with Kepler's laws — the physics that governs everything that turns and orbits.",
    gradeRange: "11–12",
    scaleLabel: "1.4×10⁹ m",
    palette: { accent: "#FFB800", glow: "#C77F00" },
    lessons: gravitationLessons,
  },
  {
    slug: "binary-stars",
    name: "Binary Star Systems",
    subtitle: "Classical Mechanics · Oscillations & Waves",
    description: "Periodic motion, from a star's orbital wobble to a wave crossing light-years. Simple harmonic motion, springs and pendulums, and travelling waves & sound — the rhythm behind all of physics.",
    gradeRange: "11–12",
    scaleLabel: "1×10¹² m",
    palette: { accent: "#FF6E9C", glow: "#B83A66" },
    lessons: oscillationsLessons,
  },
  {
    slug: "clusters-nebulae",
    name: "Star Clusters & Nebulae",
    subtitle: "Electricity & Magnetism",
    description: "The force lighting up ionized nebular gas. Electric charge and Coulomb's law, electric fields, and circuits with Ohm's law — the second great force of classical physics.",
    gradeRange: "11–12",
    scaleLabel: "1×10¹⁷ m",
    palette: { accent: "#B07CFF", glow: "#6E3FC2" },
    lessons: electromagnetismLessons,
  },
  {
    slug: "supernovae",
    name: "Supernovae",
    subtitle: "Modern Physics",
    description: "Where classical physics breaks down. Special relativity and E = mc², photons and the photoelectric effect, and the quantum nature of light and matter — the physics that explodes a star.",
    gradeRange: "12–Undergrad",
    scaleLabel: "1×10¹³ m",
    palette: { accent: "#FF5A3C", glow: "#C22E14" },
    lessons: modernPhysicsLessons,
  },
  {
    slug: "neutron-stars",
    name: "Neutron Stars & Pulsars",
    subtitle: "Quantum Mechanics",
    description: "The physics of the very small — and of the quantum degeneracy pressure that holds a neutron star up. Wave-particle duality, the wavefunction, and the quantization of energy.",
    gradeRange: "12–Undergrad",
    scaleLabel: "1×10⁴ m",
    palette: { accent: "#6CF0FF", glow: "#2BA8B8" },
    lessons: quantumMechanicsLessons,
  },
  {
    slug: "black-holes",
    name: "Black Holes",
    subtitle: "General Relativity",
    description: "Gravity as the curvature of spacetime. The equivalence principle, curved spacetime, and black holes with the Schwarzschild radius and event horizon.",
    gradeRange: "Undergrad",
    scaleLabel: "3×10⁴ m",
    palette: { accent: "#8B5CF6", glow: "#4C1D95" },
    lessons: generalRelativityLessons,
  },
  {
    slug: "milky-way",
    name: "The Milky Way",
    subtitle: "Astrophysics",
    description: "Reading the lives of stars from their light. Luminosity and blackbody radiation, and stellar life cycles across the Hertzsprung-Russell diagram.",
    gradeRange: "Undergrad",
    scaleLabel: "1×10²¹ m",
    palette: { accent: "#E6D8FF", glow: "#9D86C9" },
    lessons: astrophysicsLessons,
  },
  {
    slug: "galaxy-clusters",
    name: "Galaxy Clusters",
    subtitle: "Thermodynamics & Statistical Mechanics",
    description: "The physics of heat and disorder, ruling the million-degree gas between galaxies. Temperature, heat and the gas laws, and entropy with the second law and the arrow of time.",
    gradeRange: "Grad",
    scaleLabel: "1×10²³ m",
    palette: { accent: "#FFD27A", glow: "#C2913A" },
    lessons: thermodynamicsLessons,
  },
  {
    slug: "observable-universe",
    name: "The Observable Universe",
    subtitle: "Nuclear & Particle Physics",
    description: "The building blocks of everything we can see. The nucleus and radioactivity, and the fundamental particles of the Standard Model — matter cut to its smallest pieces.",
    gradeRange: "Grad",
    scaleLabel: "8.8×10²⁶ m",
    palette: { accent: "#88F7D4", glow: "#3BAE8C" },
    lessons: nuclearParticleLessons,
  },
  {
    slug: "cosmology",
    name: "Cosmology & The Big Bang",
    subtitle: "Cosmology & The Big Bang",
    description: "The origin and fate of everything. The expanding universe and Hubble's law, the Big Bang and its evidence, and the dark sector that makes up 95% of the cosmos — the final destination of the journey.",
    gradeRange: "Grad",
    scaleLabel: "13.8 Gyr",
    palette: { accent: "#FF9EDB", glow: "#C2569C" },
    lessons: cosmologyLessons,
  },
];
