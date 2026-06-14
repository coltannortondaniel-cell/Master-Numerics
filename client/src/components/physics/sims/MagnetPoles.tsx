import { useState } from "react";
import { SimFrame, SliderControl, SimButton, Readout } from "./SimControls";

/**
 * magnet-poles — like poles repel, opposites attract, and the pull weakens fast
 * with distance. Flip the right magnet's poles and slide it nearer or farther.
 */
function Magnet({ flipped }: { flipped: boolean }) {
  const left = flipped ? "S" : "N";
  const right = flipped ? "N" : "S";
  const leftColor = flipped ? "#2D7DFF" : "#FF4757";
  const rightColor = flipped ? "#FF4757" : "#2D7DFF";
  return (
    <div className="flex h-12 w-24 overflow-hidden rounded shadow-lg">
      <div className="grid flex-1 place-items-center font-display font-bold text-white" style={{ background: leftColor }}>
        {left}
      </div>
      <div className="grid flex-1 place-items-center font-display font-bold text-white" style={{ background: rightColor }}>
        {right}
      </div>
    </div>
  );
}

export function MagnetPoles() {
  const [flipped, setFlipped] = useState(false);
  const [distance, setDistance] = useState(6); // cm between facing poles

  // The left magnet's right pole (facing the gap) is always S.
  // The right magnet's left pole (facing the gap) is N normally, S when flipped.
  // Opposite poles attract; like poles repel.
  const rightMagnetLeftPole = flipped ? "S" : "N";
  const attract = rightMagnetLeftPole !== "S"; // S (left) vs N (right) → attract
  const force = 100 / (distance * distance); // ∝ 1/d² (arbitrary units)

  return (
    <SimFrame>
      <div className="relative flex h-40 items-center justify-center gap-0">
        {/* Left fixed magnet */}
        <div className="absolute left-6">
          <Magnet flipped={false} />
        </div>
        {/* Right movable magnet, offset by distance */}
        <div
          className="absolute"
          style={{ left: `calc(6rem + ${distance * 10}px + 1.5rem)`, transition: "left 250ms" }}
        >
          <Magnet flipped={flipped} />
        </div>
        {/* Interaction arrows in the gap */}
        <div className="absolute" style={{ left: `calc(6rem + ${distance * 5}px + 1.5rem)` }}>
          <span className="text-2xl" style={{ color: attract ? "#2D7DFF" : "#FF4757" }}>
            {attract ? "→ ←" : "← →"}
          </span>
        </div>
      </div>

      <div className="mt-3">
        <SliderControl
          label="Distance between poles"
          value={distance}
          min={2}
          max={14}
          step={0.5}
          unit="cm"
          onChange={setDistance}
          format={(v) => v.toFixed(1)}
        />
      </div>
      <div className="mt-3 flex items-center gap-2">
        <SimButton onClick={() => setFlipped((f) => !f)} active={flipped}>
          Flip right magnet
        </SimButton>
      </div>
      <div className="mt-3">
        <Readout
          items={[
            { label: "Facing poles", value: `S ↔ ${rightMagnetLeftPole}` },
            { label: "Result", value: attract ? "Attract" : "Repel", color: attract ? "#2D7DFF" : "#FF4757" },
            { label: "Relative force", value: `${force.toFixed(1)}×`, color: "#9FB6D4" },
          ]}
        />
      </div>
      <p className="mt-2 text-xs text-neutron/50">
        Halving the distance makes the pull about four times stronger — that's the inverse-square law.
      </p>
    </SimFrame>
  );
}
