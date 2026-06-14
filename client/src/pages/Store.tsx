import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { storeApi, type StoreResponse, type Crate, type CrateResult } from "../lib/store";
import { parseApiError } from "../lib/api";
import { Coins, Gift, Shirt, Palette, BadgeCheck } from "lucide-react";
import { RARITY_META, type Rarity } from "../lib/rarity";
import { CosmeticTypeIcon } from "../components/ui/CosmeticTypeIcon";
import { useXp } from "../store/xp";
import { CosmicBackground } from "../components/physics/CosmicBackground";
import { JourneyHeader } from "../components/layout/JourneyHeader";
import { CrateOpener } from "../components/store/CrateOpener";
import { Button } from "../components/ui/Button";

/** Featured cosmetics grouped into the brief's shop categories. */
const STORE_GROUPS = [
  { label: "Mascot & avatar", Icon: Shirt, types: ["OUTFIT", "HAT", "PET"] },
  { label: "Themes & path skins", Icon: Palette, types: ["BACKGROUND", "AURA"] },
  { label: "Profile flair", Icon: BadgeCheck, types: ["TITLE", "BADGE"] },
];

function OddsBar({ odds }: { odds: Partial<Record<Rarity, number>> }) {
  const total = Object.values(odds).reduce((s, w) => s + (w ?? 0), 0) || 1;
  return (
    <div className="flex h-1.5 overflow-hidden rounded-full">
      {(Object.entries(odds) as [Rarity, number][]).map(([r, w]) => (
        <div key={r} style={{ width: `${(w / total) * 100}%`, background: RARITY_META[r].color }} title={`${RARITY_META[r].label} ${Math.round((w / total) * 100)}%`} />
      ))}
    </div>
  );
}

export default function Store() {
  const [data, setData] = useState<StoreResponse | null>(null);
  const [error, setError] = useState("");
  const [opening, setOpening] = useState<{ crate: Crate; result: CrateResult } | null>(null);
  const [busy, setBusy] = useState(false);
  const setCoinsGlobal = useXp((s) => s.setCoins);
  const pushToast = useXp((s) => s.push);

  const coins = data?.coins ?? 0;

  useEffect(() => {
    storeApi
      .get()
      .then((d) => {
        setData(d);
        setCoinsGlobal(d.coins);
      })
      .catch((e) => setError(parseApiError(e).message));
  }, [setCoinsGlobal]);

  function applyResult(res: CrateResult) {
    setData((d) => (d ? { ...d, coins: res.newBalance } : d));
    setCoinsGlobal(res.newBalance);
    for (const a of res.achievements) {
      pushToast({ kind: "mastery", title: `Achievement: ${a.name}`, amount: a.xpReward, detail: a.coinReward ? `+${a.coinReward} coins` : undefined });
    }
  }

  async function openCrate(crate: Crate) {
    if (busy || coins < crate.cost) return;
    setBusy(true);
    setError("");
    try {
      const result = await storeApi.openCrate(crate.key);
      applyResult(result);
      setOpening({ crate, result });
    } catch (e) {
      setError(parseApiError(e).message);
    } finally {
      setBusy(false);
    }
  }

  async function buy(key: string) {
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const res = await storeApi.buy(key);
      setData((d) =>
        d
          ? { ...d, coins: res.newBalance, featured: d.featured.map((f) => (f.key === key ? { ...f, owned: true } : f)) }
          : d
      );
      setCoinsGlobal(res.newBalance);
      for (const a of res.achievements) pushToast({ kind: "mastery", title: `Achievement: ${a.name}`, amount: a.xpReward });
    } catch (e) {
      setError(parseApiError(e).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative min-h-screen">
      <CosmicBackground palette={{ accent: "#2D7DFF", glow: "#2D7DFF" }} />
      <JourneyHeader back={{ to: "/dashboard", label: "Dashboard" }} />
      <main className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 py-10">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-nebula">Cosmetics</p>
            <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold">The Store</h1>
          </div>
          <div className="glass px-4 py-2 text-right">
            <p className="text-[0.7rem] uppercase tracking-widest text-fg/45">Balance</p>
            <p className="flex items-center justify-end gap-1.5 font-mono text-xl font-bold text-star">
              <Coins size={18} strokeWidth={1.75} /> {coins.toLocaleString()}
            </p>
          </div>
        </div>

        {error && <p className="mb-4 text-sm text-alert">{error}</p>}

        {!data ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton h-44 w-full" />
            ))}
          </div>
        ) : (
          <>
            {/* Crates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.crates.map((crate) => {
                const affordable = coins >= crate.cost;
                return (
                  <div key={crate.key} className="glass flex flex-col p-5">
                    <div className="mb-3 flex items-center gap-3">
                      <Gift size={34} strokeWidth={1.4} className="text-accent" />
                      <div>
                        <h3 className="font-display font-bold">{crate.name}</h3>
                        <p className="flex items-center gap-1 font-mono text-sm text-star">
                          <Coins size={13} strokeWidth={1.75} /> {crate.cost}
                        </p>
                      </div>
                    </div>
                    <p className="mb-3 flex-1 text-sm text-fg/55">{crate.blurb}</p>
                    <div className="mb-3">
                      <OddsBar odds={crate.odds} />
                    </div>
                    <Button onClick={() => openCrate(crate)} loading={busy} disabled={!affordable}>
                      {affordable ? "Open crate" : "Not enough coins"}
                    </Button>
                  </div>
                );
              })}
            </div>

            {/* Featured cosmetics, grouped by category */}
            {STORE_GROUPS.map((group) => {
              const items = data.featured.filter((c) => group.types.includes(c.type));
              if (items.length === 0) return null;
              return (
                <section key={group.label} className="mt-10">
                  <div className="mb-4 flex items-center gap-2">
                    <group.Icon size={18} strokeWidth={1.75} className="text-accent" />
                    <h2 className="font-display text-xl font-bold">{group.label}</h2>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {items.map((c) => {
                      const m = RARITY_META[c.rarity];
                      return (
                        <div key={c.key} className="glass flex flex-col items-center p-4 text-center" style={{ borderTop: `2px solid ${m.color}` }}>
                          <CosmeticTypeIcon type={c.type} size={26} strokeWidth={1.5} style={{ color: m.color }} />
                          <p className="mt-1 text-sm font-semibold">{c.name}</p>
                          <p className="text-[0.7rem] font-semibold" style={{ color: m.color }}>{m.label}</p>
                          <div className="mt-3 w-full">
                            {c.owned ? (
                              <span className="block rounded-lg bg-line/5 py-2 text-sm text-fg/50">Owned</span>
                            ) : (
                              <button
                                onClick={() => buy(c.key)}
                                disabled={busy || coins < c.coinPrice}
                                className="flex w-full items-center justify-center gap-1 rounded-lg bg-accent py-2 text-sm font-semibold text-white hover:brightness-110 disabled:opacity-40"
                              >
                                <Coins size={13} strokeWidth={1.75} /> {c.coinPrice}
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </>
        )}
      </main>

      <AnimatePresence>
        {opening && (
          <CrateOpener
            result={opening.result}
            canAfford={coins >= opening.crate.cost}
            onClose={() => setOpening(null)}
            onAgain={async () => {
              setOpening(null);
              await openCrate(opening.crate);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
