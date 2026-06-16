import type { WorldSeed } from "./types.js";
import { kinematicsLessons } from "./physics/kinematics.js";
import { dynamicsLessons } from "./physics/dynamics.js";
import { energyLessons } from "./physics/energy.js";
import { momentumLessons } from "./physics/momentum.js";
import { gravitationLessons } from "./physics/gravitation.js";
import { rotationLessons } from "./physics/rotation.js";
import { oscillationsLessons } from "./physics/oscillations.js";
import { fluidsLessons } from "./physics/fluids.js";
import { thermodynamicsLessons } from "./physics/thermodynamics.js";
import { electrostaticsLessons } from "./physics/electrostatics.js";
import { circuitsLessons } from "./physics/circuits.js";
import { magnetismLessons } from "./physics/magnetism.js";
import { opticsLessons } from "./physics/optics.js";
import { modernPhysicsLessons } from "./physics/modern-physics.js";

/**
 * The Physics pathway — a cosmic journey that travels DEEPER into space as the
 * student advances: from near-Earth motion out to stars, nebulae, and the
 * violent modern-physics frontier. The 14 worlds are the 14 academic units of a
 * complete algebra/intro-calculus physics sequence (Kinematics → Modern), in
 * pedagogical order; each owns one accent hue. Array order = path order.
 */
export const worlds: WorldSeed[] = [
  {
    slug: "earth-moon-system",
    name: "The Earth–Moon System",
    subtitle: "Classical Mechanics · Kinematics",
    description:
      "The journey begins in near-Earth space. Position and displacement, velocity and acceleration, the kinematic equations, free fall, projectiles, and relative motion — the language of how things move.",
    gradeRange: "9–11",
    scaleLabel: "4×10⁸ m",
    palette: { accent: "#6FB1FC", glow: "#3D6FC9" },
    lessons: kinematicsLessons,
  },
  {
    slug: "inner-solar-system",
    name: "The Inner Solar System",
    subtitle: "Classical Mechanics · Newton's Laws & Dynamics",
    description:
      "Why things move the way they do. Newton's three laws, forces and free-body diagrams, friction, tension and the normal force, inclined planes, and connected systems.",
    gradeRange: "9–11",
    scaleLabel: "5×10¹¹ m",
    palette: { accent: "#F2994A", glow: "#C2701F" },
    lessons: dynamicsLessons,
  },
  {
    slug: "outer-solar-system",
    name: "The Outer Solar System",
    subtitle: "Classical Mechanics · Work, Energy & Power",
    description:
      "The currency of physics: energy. Work, kinetic energy and the work–energy theorem, gravitational and elastic potential energy, conservation of mechanical energy, and power.",
    gradeRange: "10–12",
    scaleLabel: "5×10¹² m",
    palette: { accent: "#56CC8B", glow: "#2E9460" },
    lessons: energyLessons,
  },
  {
    slug: "oort-cloud",
    name: "The Oort Cloud",
    subtitle: "Classical Mechanics · Momentum & Collisions",
    description:
      "Mass in motion and what it takes to change it. Impulse, conservation of momentum, elastic and inelastic collisions, the center of mass, and collisions in two dimensions.",
    gradeRange: "10–12",
    scaleLabel: "1×10¹⁵ m",
    palette: { accent: "#4FD1C5", glow: "#279488" },
    lessons: momentumLessons,
  },
  {
    slug: "the-sun",
    name: "The Sun",
    subtitle: "Classical Mechanics · Circular Motion & Gravitation",
    description:
      "The Sun's grip on the planets. Uniform circular motion and centripetal force, banked curves, Newton's law of universal gravitation, orbital motion, and Kepler's laws.",
    gradeRange: "11–12",
    scaleLabel: "1.4×10⁹ m",
    palette: { accent: "#B79CED", glow: "#6E52B8" },
    lessons: gravitationLessons,
  },
  {
    slug: "interstellar-space",
    name: "Interstellar Space",
    subtitle: "Classical Mechanics · Rotational Motion",
    description:
      "How things spin. Angular kinematics, torque, moment of inertia and τ = Iα, rotational kinetic energy and rolling, and angular momentum with its conservation.",
    gradeRange: "11–12",
    scaleLabel: "1×10¹⁶ m",
    palette: { accent: "#E0A458", glow: "#A8702A" },
    lessons: rotationLessons,
  },
  {
    slug: "binary-stars",
    name: "Binary Star Systems",
    subtitle: "Oscillations & Waves",
    description:
      "Periodic motion, from a star's orbital wobble to a wave crossing light-years. Simple harmonic motion, springs and pendulums, energy in SHM, wave properties, interference and standing waves, sound, and the Doppler effect.",
    gradeRange: "11–12",
    scaleLabel: "1×10¹² m",
    palette: { accent: "#62B6CB", glow: "#2E7E92" },
    lessons: oscillationsLessons,
  },
  {
    slug: "stellar-nebulae",
    name: "Stellar Nebulae",
    subtitle: "Fluids",
    description:
      "Vast clouds of gas and dust between the stars. Density and pressure, pressure with depth, Pascal's and Archimedes' principles (buoyancy), the continuity equation, and Bernoulli's equation.",
    gradeRange: "11–12",
    scaleLabel: "1×10¹⁷ m",
    palette: { accent: "#4A90D9", glow: "#2A5C95" },
    lessons: fluidsLessons,
  },
  {
    slug: "galaxy-clusters",
    name: "Galaxy Clusters",
    subtitle: "Thermodynamics",
    description:
      "The physics of heat and disorder, ruling the million-degree gas between galaxies. Temperature and thermal expansion, heat and the gas laws, kinetic theory, the laws of thermodynamics, heat engines, and entropy.",
    gradeRange: "11–12",
    scaleLabel: "1×10²³ m",
    palette: { accent: "#EF6F53", glow: "#B23E27" },
    lessons: thermodynamicsLessons,
  },
  {
    slug: "plasma-fields",
    name: "The Plasma Fields",
    subtitle: "Electrostatics & Electric Fields",
    description:
      "Ionized gas threaded with electric force. Electric charge and Coulomb's law, the electric field, electric potential and potential energy, conductors, and capacitance.",
    gradeRange: "11–12",
    scaleLabel: "1×10¹⁸ m",
    palette: { accent: "#F2C94C", glow: "#B8941F" },
    lessons: electrostaticsLessons,
  },
  {
    slug: "stellar-currents",
    name: "Stellar Currents",
    subtitle: "Electric Circuits",
    description:
      "Charge on the move. Current, resistance and Ohm's law, series and parallel resistors, EMF and power dissipation, Kirchhoff's rules, and RC circuits.",
    gradeRange: "11–12",
    scaleLabel: "1×10¹⁹ m",
    palette: { accent: "#5BD17A", glow: "#2E9450" },
    lessons: circuitsLessons,
  },
  {
    slug: "magnetar",
    name: "The Magnetar",
    subtitle: "Magnetism & Electromagnetism",
    description:
      "A dead star with the strongest magnetic field in the universe. Magnetic fields and the force on moving charges and currents, fields from currents, electromagnetic induction, and Faraday's and Lenz's laws.",
    gradeRange: "11–12",
    scaleLabel: "2×10⁴ m",
    palette: { accent: "#9B8BF4", glow: "#5A4CB8" },
    lessons: magnetismLessons,
  },
  {
    slug: "distant-starlight",
    name: "Distant Starlight",
    subtitle: "Waves & Optics",
    description:
      "Light that has crossed the cosmos to reach us. Electromagnetic waves, reflection and refraction (Snell's law), mirrors and lenses, interference and diffraction, and polarization.",
    gradeRange: "11–12",
    scaleLabel: "1×10²² m",
    palette: { accent: "#F178B6", glow: "#B83E80" },
    lessons: opticsLessons,
  },
  {
    slug: "supernovae",
    name: "Supernovae",
    subtitle: "Modern Physics",
    description:
      "Where classical physics breaks down — the violent frontier. Special relativity and E = mc², the photon and the photoelectric effect, wave–particle duality, the Bohr model and atomic spectra, and the nucleus, radioactivity, and nuclear energy.",
    gradeRange: "12–Undergrad",
    scaleLabel: "1×10¹³ m",
    palette: { accent: "#7DE0E6", glow: "#2E9AA3" },
    lessons: modernPhysicsLessons,
  },
];
