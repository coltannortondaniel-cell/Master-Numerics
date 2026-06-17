import { StarChart } from "../components/physics/StarChart";
import { CityChart } from "../components/math/CityChart";
import type { WorldSummary, WorldLessonNode, ProgressStatus } from "../lib/physics";

/**
 * DEV-ONLY visual story (route gated behind import.meta.env.DEV) used by the
 * screenshot harness to verify the maps render correctly without a backend.
 * Mock data mirrors the real /journey and /city payloads.
 */
function lessons(slug: string, total: number, done: number): WorldLessonNode[] {
  return Array.from({ length: total }, (_, i) => ({
    slug: `${slug}-l${i}`,
    title: `Lesson ${i + 1}`,
    difficulty: ((i % 5) + 1),
    status: (i < done ? "COMPLETED" : null) as ProgressStatus | null,
    bestScore: i < done ? 92 : null,
  }));
}
function w(slug: string, name: string, subtitle: string, oi: number, total: number, done: number, scale = ""): WorldSummary {
  return {
    slug, name, subtitle, gradeRange: "9–11", scaleLabel: scale, orderIndex: oi,
    palette: { accent: "#888", glow: "#444" }, lessonCount: total, completedCount: done,
    lessons: lessons(slug, total, done),
  };
}

const physics: WorldSummary[] = [
  w("earth-moon-system", "The Launch Site", "Classical Mechanics · Kinematics", 1, 6, 6, "1×10² m"),
  w("inner-solar-system", "The Asteroid Belt", "Classical Mechanics · Dynamics", 2, 6, 6, "5×10⁵ m"),
  w("outer-solar-system", "The Ice Moon", "Classical Mechanics · Energy", 3, 6, 3, "1.6×10⁶ m"),
  w("oort-cloud", "Colliding Comets", "Classical Mechanics · Momentum", 4, 6, 0, "1×10⁴ m"),
  w("the-sun", "The Sun", "Classical Mechanics · Gravitation", 5, 6, 0, "1.4×10⁹ m"),
  w("interstellar-space", "The Ringed Giant", "Classical Mechanics · Rotation", 6, 6, 0, "6×10⁷ m"),
  w("binary-stars", "The Binary Stars", "Oscillations & Waves", 7, 6, 0, "1×10¹² m"),
  w("stellar-nebulae", "The Stellar Nebula", "Fluids", 8, 6, 0, "1×10¹⁷ m"),
  w("galaxy-clusters", "The Blazing Star", "Thermodynamics", 9, 6, 0, "7×10⁸ m"),
  w("plasma-fields", "The Plasma Field", "Electrostatics", 10, 6, 0, "1×10¹⁸ m"),
  w("stellar-currents", "Stellar Currents", "Circuits", 11, 6, 0, "1×10¹⁹ m"),
  w("magnetar", "The Magnetar", "Magnetism", 12, 6, 0, "2×10⁴ m"),
  w("distant-starlight", "Distant Starlight", "Optics", 13, 6, 0, "1×10²² m"),
  w("supernovae", "The Black Hole", "Modern Physics", 14, 6, 0, "3×10³ m"),
];

const math: WorldSummary[] = [
  w("kindergarten-park", "Kindergarten Park", "Where the numbers begin", 1, 5, 5),
  w("elementary-school-st", "Elementary School St.", "Adding it all up", 2, 5, 5),
  w("the-bakery", "The Bakery", "Slices, shares, and decimals", 3, 5, 2),
  w("the-market", "The Market", "Deals, rates, and percents", 4, 5, 0),
  w("city-hall-plaza", "City Hall Plaza", "Solving for the unknown", 5, 5, 0),
  w("architects-quarter", "The Architect's Quarter", "Lines, angles, and area", 6, 5, 0),
  w("stock-exchange", "The Stock Exchange", "Chance and data", 7, 5, 0),
  w("engineering-district", "The Engineering District", "Functions and machines", 8, 5, 0),
  w("observatory-bridge", "The Observatory Bridge", "The shape of waves", 9, 5, 0),
  w("university-campus", "The University Campus", "Approaching the limit", 10, 5, 0),
  w("research-lab", "The Research Lab", "Change and accumulation", 11, 5, 0),
  w("data-science-tower", "The Data Science Tower", "Vectors and matrices", 12, 5, 0),
  w("quantum-institute", "The Quantum Institute", "Equations of change", 13, 5, 0),
  w("graduate-school", "The Graduate School", "The deep structure", 14, 5, 0),
];

export default function Story() {
  const which = new URLSearchParams(window.location.search).get("map") ?? "physics";
  return (
    <div className="relative z-10 min-h-screen px-4 py-10">
      <div className="starfield" />
      {which === "math" ? (
        <CityChart worlds={math} continueTarget={{ worldSlug: "the-bakery", worldName: "The Bakery", lessonSlug: "the-bakery-l2", title: "Decimals" }} basePath="/city" subject="math" />
      ) : (
        <StarChart worlds={physics} continueTarget={{ worldSlug: "outer-solar-system", worldName: "The Ice Moon", lessonSlug: "outer-solar-system-l3", title: "Work–Energy Theorem" }} basePath="/journey" subject="physics" />
      )}
    </div>
  );
}
