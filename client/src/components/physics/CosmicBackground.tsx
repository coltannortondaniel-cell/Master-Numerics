import { memo } from "react";
import type { Palette } from "../../lib/physics";

interface Props {
  palette: Palette;
  /** 0–1, how strong the ambient color wash is. */
  intensity?: number;
}

/**
 * Per-world ambient backdrop: the shared CSS parallax starfield plus two
 * palette-tinted nebula glows. Pure CSS — cheap enough for every screen.
 */
function CosmicBackgroundImpl({ palette, intensity = 1 }: Props) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-space" />
      <div className="starfield" />
      <div
        className="nebula-glow"
        style={{
          background: palette.accent,
          opacity: 0.22 * intensity,
          top: "-28vmax",
          right: "-18vmax",
        }}
      />
      <div
        className="nebula-glow"
        style={{
          background: palette.glow,
          opacity: 0.18 * intensity,
          bottom: "-30vmax",
          left: "-20vmax",
        }}
      />
    </div>
  );
}

export const CosmicBackground = memo(CosmicBackgroundImpl);
