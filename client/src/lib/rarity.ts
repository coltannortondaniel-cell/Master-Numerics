export type Rarity = "COMMON" | "UNCOMMON" | "RARE" | "EPIC" | "LEGENDARY" | "MYTHIC";

export const RARITY_META: Record<Rarity, { label: string; color: string; glow: string }> = {
  COMMON: { label: "Common", color: "#B8C0CC", glow: "rgba(184,192,204,0.5)" },
  UNCOMMON: { label: "Uncommon", color: "#22D3A0", glow: "rgba(34,211,160,0.55)" },
  RARE: { label: "Rare", color: "#1E90FF", glow: "rgba(30,144,255,0.6)" },
  EPIC: { label: "Epic", color: "#B07CFF", glow: "rgba(176,124,255,0.65)" },
  LEGENDARY: { label: "Legendary", color: "#FFB800", glow: "rgba(255,184,0,0.7)" },
  MYTHIC: { label: "Mythic", color: "#FF4757", glow: "rgba(255,71,87,0.75)" },
};

export const RARITY_ORDER: Rarity[] = ["COMMON", "UNCOMMON", "RARE", "EPIC", "LEGENDARY", "MYTHIC"];

const TYPE_ICON: Record<string, string> = {
  TITLE: "🏷️",
  BADGE: "🎖️",
  OUTFIT: "🧥",
  HAT: "🎩",
  AURA: "✨",
  PET: "🐾",
  BACKGROUND: "🖼️",
};
export const typeIcon = (t: string) => TYPE_ICON[t] ?? "❓";
