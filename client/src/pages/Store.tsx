import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { storeApi, type StoreResponse, type Crate, type CrateResult } from "../lib/store";
import { parseApiError } from "../lib/api";
import { RARITY_META, typeIcon, type Rarity } from "../lib/rarity";
import { useXp } from "../store/xp";
import { CosmicBackground } from "../components/physics/CosmicBackground";
import { JourneyHeader } from "../components/layout/JourneyHeader";
import { CrateOpener } from "../components/store/CrateOpener";
import { Button } from "../components/ui/Button";

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
      pushToast({ kind: "mastery", title: `Achievement: ${a.name}`, amount: a.xpReward, detail: a.coinReward ? `+🪙 ${a.coinReward}` : undefined });
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
      <CosmicBackground palette={{ accent: "#B07CFF", glow: "#FFB800" }} />
      <JourneyHeader back={{ to: "/dashboard", label: "Dashboard" }} />
      <main className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 py-10">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#C9B6FF]">Cosmetics</p>
            <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold">The Store</h1>
          </div>
          <div className="glass px-4 py-2 text-right">
            <p className="text-[0.7rem] uppercase tracking-widest text-neutron/45">Balance</p>
            <p className="font-mono text-xl font-bold text-solar">🪙 {coins.toLocaleString()}</p>
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
                      <span className="text-4xl">🎁</span>
                      <div>
                        <h3 className="font-display font-bold">{crate.name}</h3>
                        <p className="font-mono text-sm text-solar">🪙 {crate.cost}</p>
                      </div>
                    </div>
                    <p className="mb-3 flex-1 text-sm text-neutron/55">{crate.blurb}</p>
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

            {/* Featured cosmetics */}
            <h2 className="mt-10 mb-4 font-display text-xl font-bold">Featured items</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {data.featured.map((c) => {
                const m = RARITY_META[c.rarity];
                return (
                  <div key={c.key} className="glass flex flex-col items-center p-4 text-center" style={{ borderTop: `2px solid ${m.color}` }}>
                    <span className="text-3xl">{typeIcon(c.type)}</span>
                    <p className="mt-1 text-sm font-semibold">{c.name}</p>
                    <p className="text-[0.7rem] font-semibold" style={{ color: m.color }}>{m.label}</p>
                    <div className="mt-3 w-full">
                      {c.owned ? (
                        <span className="block rounded-lg bg-white/5 py-2 text-sm text-neutron/50">Owned</span>
                      ) : (
                        <button
                          onClick={() => buy(c.key)}
                          disabled={busy || coins < c.coinPrice}
                          className="w-full rounded-lg bg-cosmic py-2 text-sm font-semibold text-neutron hover:brightness-110 disabled:opacity-40"
                        >
                          🪙 {c.coinPrice}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
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
