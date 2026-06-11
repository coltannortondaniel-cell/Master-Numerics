import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { profileApi, type MeResponse, type AvatarLayers, type OwnedCosmetic } from "../lib/profile";
import { parseApiError } from "../lib/api";
import { RARITY_META, typeIcon, type Rarity } from "../lib/rarity";
import { CosmicBackground } from "../components/physics/CosmicBackground";
import { JourneyHeader } from "../components/layout/JourneyHeader";
import { Avatar } from "../components/profile/Avatar";

const SLOTS = ["BACKGROUND", "OUTFIT", "HAT", "AURA", "PET", "TITLE", "BADGE"] as const;
const SWATCHES = ["#6B21D6", "#1E90FF", "#22D3A0", "#FFB800", "#FF6E9C", "#C9CED6", "#8B5CF6", "#FF4757"];

export default function Customize() {
  const [me, setMe] = useState<MeResponse | null>(null);
  const [error, setError] = useState("");
  const [color, setColor] = useState("#6B21D6");
  const [tab, setTab] = useState<(typeof SLOTS)[number]>("OUTFIT");
  const colorTimer = useRef<number>();

  useEffect(() => {
    profileApi
      .me()
      .then((d) => {
        setMe(d);
        setColor(d.avatarColor);
      })
      .catch((e) => setError(parseApiError(e).message));
  }, []);

  const equippedKey = (type: string) => me?.cosmetics.find((c) => c.type === type && c.equipped)?.key ?? null;

  const layers: AvatarLayers = useMemo(
    () => ({
      outfit: equippedKey("OUTFIT"),
      hat: equippedKey("HAT"),
      aura: equippedKey("AURA"),
      pet: equippedKey("PET"),
      background: equippedKey("BACKGROUND"),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [me]
  );

  function toggle(item: OwnedCosmetic) {
    if (!me) return;
    const willEquip = !item.equipped;
    // Optimistic update
    setMe((m) =>
      m
        ? {
            ...m,
            cosmetics: m.cosmetics.map((c) =>
              c.type === item.type ? { ...c, equipped: c.key === item.key ? willEquip : false } : c
            ),
          }
        : m
    );
    const call = willEquip ? profileApi.equip(item.key) : profileApi.unequip(item.key);
    call.catch(() => profileApi.me().then(setMe));
  }

  function pickColor(c: string) {
    setColor(c);
    window.clearTimeout(colorTimer.current);
    colorTimer.current = window.setTimeout(() => {
      profileApi.setColor(c).catch(() => {});
    }, 250);
  }

  const itemsForTab = me?.cosmetics.filter((c) => c.type === tab) ?? [];

  return (
    <div className="relative min-h-screen">
      <CosmicBackground palette={{ accent: color, glow: "#1E90FF" }} />
      <JourneyHeader back={{ to: "/dashboard", label: "Dashboard" }} />
      <main className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 py-10">
        <div className="text-center mb-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#C9B6FF]">Avatar builder</p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold">Customize</h1>
        </div>

        {error && <p className="mb-4 text-center text-sm text-alert">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6">
          {/* Preview */}
          <div className="flex flex-col items-center">
            <div className="overflow-hidden rounded-2xl shadow-glow">
              <Avatar layers={layers} baseColor={color} size={200} />
            </div>
            {me?.title && <p className="mt-3 font-display text-[#C9B6FF]">{me.title}</p>}

            <p className="mt-5 mb-2 text-xs uppercase tracking-widest text-neutron/45">Base colour</p>
            <div className="flex flex-wrap justify-center gap-2">
              {SWATCHES.map((c) => (
                <button
                  key={c}
                  onClick={() => pickColor(c)}
                  className={`h-7 w-7 rounded-full border-2 ${color.toLowerCase() === c.toLowerCase() ? "border-neutron" : "border-transparent"}`}
                  style={{ background: c }}
                  aria-label={`Colour ${c}`}
                />
              ))}
              <input
                type="color"
                value={color}
                onChange={(e) => pickColor(e.target.value)}
                className="h-7 w-7 cursor-pointer rounded-full border-0 bg-transparent p-0"
                aria-label="Custom colour"
              />
            </div>
          </div>

          {/* Wardrobe */}
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              {SLOTS.map((s) => (
                <button
                  key={s}
                  onClick={() => setTab(s)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-colors ${
                    tab === s ? "bg-cosmic text-neutron shadow-glow" : "bg-white/5 text-neutron/55 hover:text-neutron"
                  }`}
                >
                  {s.toLowerCase()}
                </button>
              ))}
            </div>

            {!me ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="skeleton h-24 w-full" />
                ))}
              </div>
            ) : itemsForTab.length === 0 ? (
              <div className="glass px-6 py-10 text-center">
                <p className="text-3xl">{typeIcon(tab)}</p>
                <p className="mt-2 text-sm text-neutron/55">
                  No {tab.toLowerCase()} cosmetics yet — open crates in the Store to find some.
                </p>
                <Link to="/store" className="mt-3 inline-block text-sm font-semibold text-cosmic">
                  Go to Store →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {itemsForTab.map((c) => {
                  const m = RARITY_META[c.rarity as Rarity];
                  return (
                    <button
                      key={c.key}
                      onClick={() => toggle(c)}
                      className="glass flex flex-col items-center p-4 text-center transition-all hover:brightness-110"
                      style={{
                        borderColor: c.equipped ? m.color : undefined,
                        boxShadow: c.equipped ? `0 0 18px ${m.glow}` : undefined,
                        border: c.equipped ? `1px solid ${m.color}` : undefined,
                      }}
                    >
                      <span className="text-3xl">{typeIcon(c.type)}</span>
                      <span className="mt-1 text-sm font-semibold">{c.name}</span>
                      <span className="text-[0.7rem] font-semibold" style={{ color: m.color }}>{m.label}</span>
                      <span className={`mt-2 text-[0.7rem] ${c.equipped ? "text-success" : "text-neutron/40"}`}>
                        {c.equipped ? "✓ Equipped" : "Tap to equip"}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
