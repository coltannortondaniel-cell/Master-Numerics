import type { AvatarLayers } from "../../lib/profile";

// Visual treatments keyed to the seeded cosmetic keys (with graceful fallbacks).
const OUTFIT_COLOR: Record<string, string> = {
  "outfit-school-uniform": "#2a3a6a",
  "outfit-lab-coat": "#E8EDF5",
  "outfit-space-suit": "#C9CED6",
  "outfit-quantum-armor": "#22D3A0",
  "outfit-event-horizon": "#6B21D6",
};
const HELMET = new Set(["outfit-space-suit", "outfit-event-horizon"]);
const HAT_GLYPH: Record<string, string> = {
  "hat-grad-cap": "🎓",
  "hat-explorer-helm": "⛑️",
  "hat-astronaut-helmet": "🚀",
  "hat-halo-of-stars": "🌟",
};
const PET_GLYPH: Record<string, string> = {
  "pet-mini-robot": "🤖",
  "pet-floating-pi": "π",
  "pet-mini-planet": "🪐",
  "pet-pocket-comet": "☄️",
  "pet-baby-star": "⭐",
};
const AURA_COLOR: Record<string, string> = {
  "aura-soft-glow": "#F0F4FF",
  "aura-solar-flare": "#FFB800",
  "aura-gravity-well": "#6B21D6",
  "aura-cosmic-storm": "#1E90FF",
  "aura-big-bang": "#FF4757",
};
const BG_GRADIENT: Record<string, [string, string]> = {
  "bg-classroom": ["#3a2e1a", "#12131d"],
  "bg-city-street": ["#0b2a4a", "#10121f"],
  "bg-deep-space": ["#05060c", "#0d0f1a"],
  "bg-nebula": ["#3a1e5a", "#12101f"],
  "bg-galactic-core": ["#5a3a00", "#1a140a"],
};

export function Avatar({
  layers,
  baseColor,
  size = 160,
}: {
  layers: AvatarLayers;
  baseColor: string;
  size?: number;
}) {
  const outfit = layers.outfit ? OUTFIT_COLOR[layers.outfit] ?? baseColor : baseColor;
  const helmet = layers.outfit ? HELMET.has(layers.outfit) || layers.hat === "hat-astronaut-helmet" : false;
  const aura = layers.aura ? AURA_COLOR[layers.aura] ?? "#6B21D6" : null;
  const bg = layers.background ? BG_GRADIENT[layers.background] ?? ["#10121f", "#05060c"] : ["#10121f", "#05060c"];
  const id = `av-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label="Avatar">
      <defs>
        <radialGradient id={`${id}-bg`} cx="50%" cy="38%" r="75%">
          <stop offset="0%" stopColor={bg[0]} />
          <stop offset="100%" stopColor={bg[1]} />
        </radialGradient>
        <filter id={`${id}-blur`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      <rect x="0" y="0" width="100" height="100" rx="16" fill={`url(#${id}-bg)`} />

      {/* tiny background stars */}
      <g fill="#ffffff" opacity="0.5">
        <circle cx="18" cy="20" r="0.8" />
        <circle cx="82" cy="26" r="0.8" />
        <circle cx="74" cy="14" r="0.6" />
        <circle cx="26" cy="70" r="0.6" />
      </g>

      {aura && <circle cx="50" cy="54" r="34" fill={aura} opacity="0.35" filter={`url(#${id}-blur)`} />}

      {/* body */}
      <rect x="31" y="56" width="38" height="36" rx="13" fill={outfit} />
      {/* arms */}
      <rect x="24" y="60" width="9" height="24" rx="4.5" fill={outfit} />
      <rect x="67" y="60" width="9" height="24" rx="4.5" fill={outfit} />

      {/* head */}
      <circle cx="50" cy="40" r="17" fill={baseColor} />
      {helmet ? (
        <>
          <circle cx="50" cy="40" r="17" fill="none" stroke="#F0F4FF" strokeWidth="2" />
          <ellipse cx="50" cy="41" rx="11" ry="9" fill="#0b1020" opacity="0.85" />
          <ellipse cx="46" cy="38" rx="3" ry="2" fill="#7FB3FF" opacity="0.7" />
        </>
      ) : (
        <>
          <circle cx="44" cy="39" r="2" fill="#0A0B14" />
          <circle cx="56" cy="39" r="2" fill="#0A0B14" />
          <path d="M44 47 Q50 51 56 47" stroke="#0A0B14" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </>
      )}

      {/* hat */}
      {layers.hat && HAT_GLYPH[layers.hat] && (
        <text x="50" y="22" textAnchor="middle" fontSize="20">
          {HAT_GLYPH[layers.hat]}
        </text>
      )}

      {/* pet companion */}
      {layers.pet && PET_GLYPH[layers.pet] && (
        <text x="82" y="86" textAnchor="middle" fontSize="15" fontStyle={layers.pet === "pet-floating-pi" ? "italic" : "normal"} fill="#FFB800">
          {PET_GLYPH[layers.pet]}
        </text>
      )}
    </svg>
  );
}
