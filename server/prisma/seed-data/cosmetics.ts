export type CosmeticSeed = {
  key: string;
  name: string;
  type: "TITLE" | "BADGE" | "OUTFIT" | "HAT" | "AURA" | "PET" | "BACKGROUND";
  rarity: "COMMON" | "UNCOMMON" | "RARE" | "EPIC" | "LEGENDARY" | "MYTHIC";
  description: string;
  coinPrice?: number;
};

/** The full cosmetic catalogue. Every rarity has entries so any crate roll resolves. */
export const cosmetics: CosmeticSeed[] = [
  // ── Titles ──
  { key: "title-stargazer", name: "Stargazer", type: "TITLE", rarity: "COMMON", description: "For those who look up.", coinPrice: 150 },
  { key: "title-number-cruncher", name: "Number Cruncher", type: "TITLE", rarity: "COMMON", description: "Crunches numbers for breakfast." },
  { key: "title-pi-whisperer", name: "Pi Whisperer", type: "TITLE", rarity: "UNCOMMON", description: "Knows what comes after 3.14159…", coinPrice: 400 },
  { key: "title-quick-draw", name: "Quick Draw", type: "TITLE", rarity: "UNCOMMON", description: "Fastest slate in the city." },
  { key: "title-calculus-king", name: "Calculus King", type: "TITLE", rarity: "RARE", description: "Ruler of limits and derivatives.", coinPrice: 900 },
  { key: "title-galactic-scholar", name: "Galactic Scholar", type: "TITLE", rarity: "EPIC", description: "Learning at cosmic scale." },
  { key: "title-first-contact", name: "First Contact", type: "TITLE", rarity: "LEGENDARY", description: "They came for the math." },
  { key: "title-the-black-hole", name: "The Black Hole", type: "TITLE", rarity: "MYTHIC", description: "Nothing escapes your focus. Not even light." },

  // ── Badges ──
  { key: "badge-bronze-compass", name: "Bronze Compass", type: "BADGE", rarity: "COMMON", description: "Always points to knowledge." },
  { key: "badge-paper-star", name: "Paper Star", type: "BADGE", rarity: "COMMON", description: "A humble first honour." },
  { key: "badge-silver-orbit", name: "Silver Orbit", type: "BADGE", rarity: "UNCOMMON", description: "Round and round the problem." },
  { key: "badge-golden-theorem", name: "Golden Theorem", type: "BADGE", rarity: "RARE", description: "Q.E.D., in gold.", coinPrice: 850 },
  { key: "badge-nebula-crest", name: "Nebula Crest", type: "BADGE", rarity: "EPIC", description: "Forged in a stellar nursery." },
  { key: "badge-supernova-medal", name: "Supernova Medal", type: "BADGE", rarity: "LEGENDARY", description: "Earned in a blaze of glory." },
  { key: "badge-singularity", name: "Singularity", type: "BADGE", rarity: "MYTHIC", description: "Infinitely dense achievement." },

  // ── Outfits ──
  { key: "outfit-school-uniform", name: "School Uniform", type: "OUTFIT", rarity: "COMMON", description: "Crisp and ready to learn." },
  { key: "outfit-lab-coat", name: "Lab Coat", type: "OUTFIT", rarity: "UNCOMMON", description: "Goggles sold separately." },
  { key: "outfit-space-suit", name: "Space Suit", type: "OUTFIT", rarity: "RARE", description: "One small step for a student." },
  { key: "outfit-quantum-armor", name: "Quantum Armor", type: "OUTFIT", rarity: "EPIC", description: "Exists in several states at once." },
  { key: "outfit-event-horizon", name: "Event Horizon Suit", type: "OUTFIT", rarity: "LEGENDARY", description: "Tailored at the edge of spacetime." },

  // ── Hats ──
  { key: "hat-grad-cap", name: "Graduation Cap", type: "HAT", rarity: "COMMON", description: "Toss it when you're done." },
  { key: "hat-explorer-helm", name: "Explorer's Helm", type: "HAT", rarity: "UNCOMMON", description: "For charting unknown equations." },
  { key: "hat-astronaut-helmet", name: "Astronaut Helmet", type: "HAT", rarity: "RARE", description: "Reflects the whole sky." },
  { key: "hat-halo-of-stars", name: "Halo of Stars", type: "HAT", rarity: "EPIC", description: "A crown of distant suns." },

  // ── Auras ──
  { key: "aura-soft-glow", name: "Soft Glow", type: "AURA", rarity: "UNCOMMON", description: "A gentle shimmer." },
  { key: "aura-solar-flare", name: "Solar Flare", type: "AURA", rarity: "RARE", description: "Radiates warmth and confidence." },
  { key: "aura-gravity-well", name: "Gravity Well", type: "AURA", rarity: "EPIC", description: "Bends light around you." },
  { key: "aura-cosmic-storm", name: "Cosmic Storm", type: "AURA", rarity: "LEGENDARY", description: "Lightning from the void." },
  { key: "aura-big-bang", name: "Big Bang", type: "AURA", rarity: "MYTHIC", description: "The beginning of everything, around you." },

  // ── Pets ──
  { key: "pet-mini-robot", name: "Mini Robot", type: "PET", rarity: "COMMON", description: "Beeps encouragingly." },
  { key: "pet-floating-pi", name: "Floating Pi", type: "PET", rarity: "UNCOMMON", description: "An irrational little friend." },
  { key: "pet-mini-planet", name: "Mini Planet", type: "PET", rarity: "RARE", description: "Has its own tiny moon." },
  { key: "pet-pocket-comet", name: "Pocket Comet", type: "PET", rarity: "EPIC", description: "Leaves a trail of stardust." },
  { key: "pet-baby-star", name: "Baby Star", type: "PET", rarity: "LEGENDARY", description: "Warm, bright, and yours." },

  // ── Backgrounds ──
  { key: "bg-classroom", name: "Classroom", type: "BACKGROUND", rarity: "COMMON", description: "Where it all begins." },
  { key: "bg-city-street", name: "City Street", type: "BACKGROUND", rarity: "UNCOMMON", description: "Math hums in the traffic." },
  { key: "bg-deep-space", name: "Deep Space", type: "BACKGROUND", rarity: "RARE", description: "Quiet, dark, infinite." },
  { key: "bg-nebula", name: "Nebula", type: "BACKGROUND", rarity: "EPIC", description: "Born among glowing gas." },
  { key: "bg-galactic-core", name: "Galactic Core", type: "BACKGROUND", rarity: "LEGENDARY", description: "Four hundred billion stars behind you." },
];
