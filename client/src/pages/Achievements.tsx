import { useEffect, useState } from "react";
import { Compass, BookOpen, Flame, Target, Users, Calculator, Gift, Sparkles, Award, HelpCircle, Check, type LucideIcon } from "lucide-react";
import { achievementsApi, type Achievement, type AchievementsResponse } from "../lib/achievements";
import { parseApiError } from "../lib/api";
import { CosmicBackground } from "../components/physics/CosmicBackground";
import { JourneyHeader } from "../components/layout/JourneyHeader";

const CAT_ICON: Record<string, LucideIcon> = {
  EXPLORER: Compass,
  SCHOLAR: BookOpen,
  STREAK: Flame,
  PERFECT: Target,
  SOCIAL: Users,
  CALCULATOR: Calculator,
  COLLECTOR: Gift,
  LEGENDARY: Sparkles,
};

function Card({ a }: { a: Achievement }) {
  const pct = Math.min(100, (a.progress / a.threshold) * 100);
  const locked = !a.earned;
  const Icon = locked && a.secret ? HelpCircle : CAT_ICON[a.category] ?? Award;
  return (
    <div
      className={`glass flex gap-3 p-4 transition-all ${locked ? "opacity-80" : "border border-success/30"}`}
    >
      <div
        className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${
          locked ? "bg-white/5 text-neutron/40" : "bg-success/15 text-success"
        }`}
      >
        <Icon size={22} strokeWidth={1.6} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="font-display font-semibold">{a.name}</p>
          {a.earned && <Check size={16} className="text-success" />}
        </div>
        <p className="text-sm text-neutron/55">{a.description}</p>
        {!a.earned && (
          <div className="mt-2">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-cosmic" style={{ width: `${pct}%` }} />
            </div>
            <p className="mt-1 font-mono text-[0.65rem] text-neutron/40">
              {a.progress} / {a.threshold}
            </p>
          </div>
        )}
        <div className="mt-1 flex gap-3 font-mono text-[0.65rem] text-neutron/40">
          {a.xpReward > 0 && <span className="text-solar/70">+{a.xpReward} XP</span>}
          {a.coinReward > 0 && <span className="text-solar/70">+{a.coinReward} coins</span>}
        </div>
      </div>
    </div>
  );
}

export default function Achievements() {
  const [data, setData] = useState<AchievementsResponse | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    achievementsApi
      .list()
      .then(setData)
      .catch((e) => setError(parseApiError(e).message));
  }, []);

  const byCategory = (data?.achievements ?? []).reduce<Record<string, Achievement[]>>((acc, a) => {
    (acc[a.category] ??= []).push(a);
    return acc;
  }, {});

  return (
    <div className="relative min-h-screen">
      <CosmicBackground palette={{ accent: "#22D3A0", glow: "#6B21D6" }} />
      <JourneyHeader back={{ to: "/dashboard", label: "Dashboard" }} />
      <main className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 py-10">
        <div className="text-center mb-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-success">Milestones</p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold">Achievements</h1>
          {data && (
            <p className="mt-2 text-neutron/55">
              <span className="font-bold text-success">{data.earned}</span> / {data.total} unlocked
            </p>
          )}
        </div>

        {error && <p className="mb-4 text-center text-sm text-alert">{error}</p>}

        {!data ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton h-20 w-full" />
            ))}
          </div>
        ) : (
          Object.entries(byCategory).map(([cat, items]) => (
            <section key={cat} className="mb-6">
              <p className="mb-2 flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-widest text-neutron/40">
                {(() => { const I = CAT_ICON[cat] ?? Award; return <I size={13} strokeWidth={1.75} />; })()}
                {cat.toLowerCase()}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {items.map((a) => (
                  <Card key={a.key} a={a} />
                ))}
              </div>
            </section>
          ))
        )}
      </main>
    </div>
  );
}
