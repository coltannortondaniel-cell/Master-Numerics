import { Tag, Award, Shirt, HardHat, Sparkles, PawPrint, Image, Box, type LucideProps } from "lucide-react";

const MAP: Record<string, typeof Box> = {
  TITLE: Tag,
  BADGE: Award,
  OUTFIT: Shirt,
  HAT: HardHat,
  AURA: Sparkles,
  PET: PawPrint,
  BACKGROUND: Image,
};

/** Clean line-icon for a cosmetic type (replaces emoji). */
export function CosmeticTypeIcon({ type, ...props }: { type?: string } & LucideProps) {
  const I = (type && MAP[type]) || Box;
  return <I {...props} />;
}
