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

const INK = "#F0F4FF";
const GOLD = "#E8B33A";

/** Clean SVG hat marks (no emoji), drawn around the head (centre x=50, top ~y23). */
function HatMark({ hat }: { hat: string }) {
  switch (hat) {
    case "hat-grad-cap":
      return (
        <g>
          <polygon points="50,6 74,16 50,26 26,16" fill="#15161f" stroke={INK} strokeWidth="1.5" />
          <rect x="40" y="20" width="20" height="7" rx="2" fill="#15161f" stroke={INK} strokeWidth="1.5" />
          <line x1="74" y1="16" x2="74" y2="26" stroke={GOLD} strokeWidth="1.5" />
          <circle cx="74" cy="27" r="1.8" fill={GOLD} />
        </g>
      );
    case "hat-explorer-helm":
      return (
        <g fill="none" stroke={INK} strokeWidth="1.8">
          <path d="M31 22 A19 15 0 0 1 69 22" fill="#2a3340" />
          <line x1="26" y1="22" x2="74" y2="22" />
        </g>
      );
    case "hat-halo-of-stars":
      return (
        <g>
          <ellipse cx="50" cy="14" rx="20" ry="5" fill="none" stroke={GOLD} strokeWidth="1.5" opacity="0.9" />
          {[26, 50, 74].map((x, i) => (
            <circle key={i} cx={x} cy={14} r="1.6" fill={GOLD} />
          ))}
        </g>
      );
    case "hat-astronaut-helmet":
      return <circle cx="50" cy="10" r="1.8" fill={INK} />; // antenna tip (helmet drawn on head)
    default:
      return null;
  }
}

/** Clean SVG pet marks (bottom-right). π kept as a real math symbol. */
function PetMark({ pet }: { pet: string }) {
  switch (pet) {
    case "pet-mini-robot":
      return (
        <g>
          <line x1="80" y1="74" x2="80" y2="78" stroke={INK} strokeWidth="1.2" />
          <circle cx="80" cy="73" r="1.4" fill={GOLD} />
          <rect x="73" y="78" width="14" height="12" rx="3" fill="#2a3340" stroke={INK} strokeWidth="1.2" />
          <circle cx="77" cy="84" r="1.6" fill={GOLD} />
          <circle cx="83" cy="84" r="1.6" fill={GOLD} />
        </g>
      );
    case "pet-floating-pi":
      return (
        <text x="80" y="88" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontStyle="italic" fontSize="18" fill={GOLD}>
          π
        </text>
      );
    case "pet-mini-planet":
      return (
        <g>
          <circle cx="80" cy="83" r="6" fill="#5AD1E6" />
          <ellipse cx="80" cy="83" rx="10" ry="3.4" fill="none" stroke={INK} strokeWidth="1.3" opacity="0.8" />
        </g>
      );
    case "pet-pocket-comet":
      return (
        <g>
          <line x1="86" y1="78" x2="74" y2="90" stroke={GOLD} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          <circle cx="86" cy="78" r="3.2" fill={INK} />
        </g>
      );
    case "pet-baby-star":
      return (
        <polygon
          points="80,76 82,82 88,82 83,86 85,92 80,88 75,92 77,86 72,82 78,82"
          fill={GOLD}
          stroke="#0A0B14"
          strokeWidth="0.6"
        />
      );
    default:
      return null;
  }
}

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
  const helmet = layers.outfit ? HELMET.has(layers.outfit) || layers.hat === "hat-astronaut-helmet" : layers.hat === "hat-astronaut-helmet";
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

      <g fill="#ffffff" opacity="0.5">
        <circle cx="18" cy="20" r="0.8" />
        <circle cx="82" cy="26" r="0.8" />
        <circle cx="74" cy="14" r="0.6" />
        <circle cx="26" cy="70" r="0.6" />
      </g>

      {aura && <circle cx="50" cy="54" r="34" fill={aura} opacity="0.35" filter={`url(#${id}-blur)`} />}

      {/* body */}
      <rect x="31" y="56" width="38" height="36" rx="13" fill={outfit} />
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

      {layers.hat && <HatMark hat={layers.hat} />}
      {layers.pet && <PetMark pet={layers.pet} />}
    </svg>
  );
}
