import { useEffect, useState } from "react";
import { socialApi, type LeaderScope, type LeaderPeriod, type LeaderboardResponse } from "../lib/social";
import { parseApiError } from "../lib/api";
import { rankForXp } from "../lib/rank";
import { CosmicBackground } from "../components/physics/CosmicBackground";
import { JourneyHeader } from "../components/layout/JourneyHeader";

const MEDALS = ["🥇", "🥈", "🥉"];

function Tabs<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <div className="inline-flex rounded-lg bg-white/5 p-1">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            value === o.value ? "bg-cosmic text-neutron shadow-glow" : "text-neutron/55 hover:text-neutron"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export default function Leaderboard() {
  const [scope, setScope] = useState<LeaderScope>("global");
  const [period, setPeriod] = useState<LeaderPeriod>("all");
  const [data, setData] = useState<LeaderboardResponse | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    setData(null);
    setError("");
    socialApi
      .leaderboard(scope, period)
      .then((d) => alive && setData(d))
      .catch((e) => alive && setError(parseApiError(e).message));
    return () => {
      alive = false;
    };
  }, [scope, period]);

  return (
    <div className="relative min-h-screen">
      <CosmicBackground palette={{ accent: "#FFB800", glow: "#6B21D6" }} />
      <JourneyHeader back={{ to: "/dashboard", label: "Dashboard" }} />
      <main className="relative z-10 mx-auto max-w-2xl px-4 sm:px-6 py-10">
        <div className="text-center mb-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-solar">Compete</p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold">Leaderboard</h1>
        </div>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Tabs<LeaderScope>
            value={scope}
            onChange={setScope}
            options={[
              { value: "global", label: "Global" },
              { value: "friends", label: "Friends" },
            ]}
          />
          {scope === "global" && (
            <Tabs<LeaderPeriod>
              value={period}
              onChange={setPeriod}
              options={[
                { value: "all", label: "All time" },
                { value: "month", label: "Month" },
                { value: "week", label: "Week" },
              ]}
            />
          )}
        </div>

        {/* Your standing */}
        {data && (
          <div className="glass mb-5 flex items-center justify-between px-5 py-4 border border-solar/30">
            <div>
              <p className="font-mono text-[0.7rem] uppercase tracking-widest text-solar">Your rank</p>
              <p className="font-display text-2xl font-bold">
                {data.me.rank ? `#${data.me.rank}` : "Unranked"}
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl">{rankForXp(data.me.xp).icon}</span>
              <p className="font-mono text-sm text-neutron/60">{data.me.xp.toLocaleString()} XP</p>
            </div>
          </div>
        )}

        {error ? (
          <div className="glass px-6 py-8 text-center text-sm text-alert">{error}</div>
        ) : !data ? (
          <div className="flex flex-col gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="skeleton h-14 w-full" />
            ))}
          </div>
        ) : data.entries.length === 0 ? (
          <div className="glass px-6 py-10 text-center">
            <p className="font-display font-semibold">No rankings yet</p>
            <p className="mt-1 text-sm text-neutron/55">
              {scope === "friends" ? "Add friends to compare your XP." : "Be the first to earn XP!"}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {data.entries.map((e) => {
              const rank = rankForXp(e.xp);
              return (
                <div
                  key={e.id}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-colors ${
                    e.isMe ? "bg-cosmic/15 border border-cosmic/40" : "glass"
                  }`}
                >
                  <span className="w-8 shrink-0 text-center font-display font-bold">
                    {e.rank <= 3 ? MEDALS[e.rank - 1] : e.rank}
                  </span>
                  <span className="text-xl" title={rank.name}>
                    {rank.icon}
                  </span>
                  <span className="min-w-0 flex-1 truncate font-display font-semibold">
                    {e.username}
                    {e.isMe && <span className="ml-2 text-xs text-cosmic">you</span>}
                  </span>
                  <span className="shrink-0 font-mono text-sm tabular-nums text-solar">
                    {e.xp.toLocaleString()}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
