import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { CrateResult } from "../../lib/store";
import { RARITY_META, RARITY_ORDER, typeIcon, type Rarity } from "../../lib/rarity";

const CARD = 124; // px per reel card incl. gap
const WINNER_INDEX = 48;
const REEL_LEN = 56;

// Weighted filler rarities so the reel looks plausible while it spins.
const FILLER_WEIGHTS: [Rarity, number][] = [
  ["COMMON", 50],
  ["UNCOMMON", 26],
  ["RARE", 14],
  ["EPIC", 7],
  ["LEGENDARY", 2.5],
  ["MYTHIC", 0.5],
];
function fillerRarity(): Rarity {
  const total = FILLER_WEIGHTS.reduce((s, [, w]) => s + w, 0);
  let r = Math.random() * total;
  for (const [rar, w] of FILLER_WEIGHTS) {
    r -= w;
    if (r < 0) return rar;
  }
  return "COMMON";
}

function ReelCard({ rarity, label, icon }: { rarity: Rarity; label: string; icon: string }) {
  const m = RARITY_META[rarity];
  return (
    <div
      className="mx-1.5 flex h-32 w-28 shrink-0 flex-col items-center justify-center rounded-lg border-2"
      style={{ borderColor: m.color, background: `linear-gradient(160deg, ${m.glow}, rgba(10,11,20,0.85))` }}
    >
      <span className="text-3xl">{icon}</span>
      <span className="mt-1 px-1 text-center text-[0.65rem] font-semibold" style={{ color: m.color }}>
        {label}
      </span>
    </div>
  );
}

export function CrateOpener({
  result,
  onClose,
  onAgain,
  canAfford,
}: {
  result: CrateResult;
  onClose: () => void;
  onAgain: () => void;
  canAfford: boolean;
}) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<"spinning" | "revealed">(reduce ? "revealed" : "spinning");
  const containerRef = useRef<HTMLDivElement>(null);
  const [finalX, setFinalX] = useState<number | null>(null);
  const win = RARITY_META[result.rarity];

  // Build the reel once, with the real prize at WINNER_INDEX.
  const reel = useMemo(() => {
    const items = Array.from({ length: REEL_LEN }, () => {
      const rar = fillerRarity();
      return { rarity: rar, label: RARITY_META[rar].label, icon: "❔" };
    });
    items[WINNER_INDEX] = {
      rarity: result.rarity,
      label: result.cosmetic.name,
      icon: typeIcon(result.cosmetic.type),
    };
    return items;
  }, [result]);

  useLayoutEffect(() => {
    if (reduce) return;
    const w = containerRef.current?.offsetWidth ?? 600;
    const jitter = (Math.random() - 0.5) * CARD * 0.5;
    setFinalX(-(WINNER_INDEX * CARD + CARD / 2 - w / 2) + jitter);
  }, [reduce]);

  return (
    <motion.div
      className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-black/85 backdrop-blur-sm px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {phase === "spinning" && (
        <>
          <p className="mb-6 font-display text-xl font-bold text-neutron/80">Opening…</p>
          <div
            ref={containerRef}
            className="relative w-full max-w-2xl overflow-hidden rounded-xl border border-neutron/15 bg-space/60 py-4"
          >
            {/* center marker */}
            <div className="pointer-events-none absolute left-1/2 top-0 z-10 h-full w-0.5 -translate-x-1/2 bg-solar shadow-glow-gold" />
            <div className="pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2 border-x-8 border-t-8 border-x-transparent border-t-solar" />
            {finalX !== null && (
              <motion.div
                className="flex"
                initial={{ x: 0 }}
                animate={{ x: finalX }}
                transition={{ duration: 5, ease: [0.12, 0.8, 0.2, 1] }}
                onAnimationComplete={() => setPhase("revealed")}
              >
                {reel.map((it, i) => (
                  <ReelCard key={i} rarity={it.rarity} label={it.label} icon={it.icon} />
                ))}
              </motion.div>
            )}
          </div>
        </>
      )}

      {phase === "revealed" && (
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="relative flex flex-col items-center text-center"
        >
          {/* particle burst */}
          {!reduce &&
            Array.from({ length: 18 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute h-2 w-2 rounded-full"
                style={{ background: win.color }}
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{
                  x: Math.cos((i / 18) * Math.PI * 2) * 160,
                  y: Math.sin((i / 18) * Math.PI * 2) * 160,
                  opacity: 0,
                }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              />
            ))}

          <p
            className="font-display text-sm font-bold uppercase tracking-[0.3em]"
            style={{ color: win.color, textShadow: `0 0 16px ${win.glow}` }}
          >
            {win.label}
          </p>
          <div
            className="mt-4 flex h-40 w-36 flex-col items-center justify-center rounded-2xl border-2"
            style={{ borderColor: win.color, background: `linear-gradient(160deg, ${win.glow}, rgba(10,11,20,0.85))`, boxShadow: `0 0 40px ${win.glow}` }}
          >
            <span className="text-5xl">{typeIcon(result.cosmetic.type)}</span>
            <span className="mt-2 px-2 text-sm font-semibold" style={{ color: win.color }}>
              {result.cosmetic.name}
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-neutron/60">{result.cosmetic.description}</p>
          {result.pity && <p className="mt-1 text-xs text-solar">✦ Pity guarantee triggered!</p>}
          {result.duplicate && (
            <p className="mt-1 text-sm text-neutron/50">
              Duplicate — refunded <span className="text-solar">🪙 {result.refund}</span>
            </p>
          )}

          <div className="mt-6 flex gap-3">
            <button
              onClick={onAgain}
              disabled={!canAfford}
              className="rounded-xl bg-cosmic px-5 py-3 font-display font-semibold text-neutron shadow-glow hover:brightness-110 disabled:opacity-40"
            >
              Open another
            </button>
            <button
              onClick={onClose}
              className="rounded-xl border border-neutron/20 px-5 py-3 font-display font-semibold text-neutron hover:border-cosmic"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
