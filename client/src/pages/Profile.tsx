import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { profileApi, type ProfileResponse } from "../lib/profile";
import { parseApiError } from "../lib/api";
import { rankForXp, rankProgress } from "../lib/rank";
import { useAuth } from "../store/auth";
import { CosmicBackground } from "../components/physics/CosmicBackground";
import { JourneyHeader } from "../components/layout/JourneyHeader";
import { Avatar } from "../components/profile/Avatar";
import { Button } from "../components/ui/Button";

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="glass px-4 py-3 text-center">
      <p className="font-display text-2xl font-bold tabular-nums">{value.toLocaleString()}</p>
      <p className="text-[0.7rem] uppercase tracking-wide text-neutron/45">{label}</p>
    </div>
  );
}

export default function Profile() {
  const { username = "" } = useParams();
  const me = useAuth((s) => s.user);
  const [data, setData] = useState<ProfileResponse | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setData(null);
    profileApi
      .get(username)
      .then(setData)
      .catch((e) => setError(parseApiError(e).message));
  }, [username]);

  const rank = data ? rankForXp(data.xp) : null;
  const prog = data ? rankProgress(data.xp) : null;
  const isMe = me?.username === username;

  return (
    <div className="relative min-h-screen">
      <CosmicBackground palette={{ accent: data?.avatarColor ?? "#6B21D6", glow: "#1E90FF" }} />
      <JourneyHeader back={{ to: "/dashboard", label: "Dashboard" }} />
      <main className="relative z-10 mx-auto max-w-2xl px-4 sm:px-6 py-10">
        {error ? (
          <div className="glass px-6 py-8 text-center text-sm text-alert">{error}</div>
        ) : !data ? (
          <div className="flex flex-col items-center gap-4">
            <div className="skeleton h-40 w-40 rounded-2xl" />
            <div className="skeleton h-6 w-40" />
            <div className="skeleton h-24 w-full" />
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center text-center">
              <div className="overflow-hidden rounded-2xl shadow-glow">
                <Avatar layers={data.avatar} baseColor={data.avatarColor} size={160} />
              </div>
              <div className="mt-4 flex items-center gap-2">
                <h1 className="font-display text-3xl font-bold">{data.username}</h1>
                {data.badge && <span title={data.badge} className="text-xl">🎖️</span>}
              </div>
              {data.title && <p className="text-[#C9B6FF] font-display">{data.title}</p>}
              {rank && (
                <div className="mt-2 flex items-center gap-2 text-sm">
                  <span className="text-lg">{rank.icon}</span>
                  <span className="font-semibold" style={{ color: rank.color }}>{rank.name}</span>
                  <span className="text-neutron/40">· {data.xp.toLocaleString()} XP</span>
                </div>
              )}

              {/* XP to next rank */}
              {prog && prog.remaining != null && (
                <div className="mt-3 w-full max-w-xs">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-cosmic" style={{ width: `${prog.ratio * 100}%` }} />
                  </div>
                  <p className="mt-1 text-xs text-neutron/45">{prog.remaining.toLocaleString()} XP to next rank</p>
                </div>
              )}

              <p className="mt-3 text-xs text-neutron/40">
                Joined {new Date(data.joinedAt).toLocaleDateString(undefined, { month: "long", year: "numeric" })}
              </p>

              {isMe && (
                <Link to="/profile/customize" className="mt-4">
                  <Button variant="ghost">Customize avatar</Button>
                </Link>
              )}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <Stat label="Lessons" value={data.stats.lessonsCompleted} />
              <Stat label="Mastered" value={data.stats.lessonsMastered} />
              <Stat label="Battles won" value={data.stats.battlesWon} />
              <Stat label="Achievements" value={data.stats.achievementsEarned} />
              <Stat label="Cosmetics" value={data.stats.cosmeticsOwned} />
            </div>

            <h2 className="mt-8 mb-3 font-display text-lg font-bold">Recent activity</h2>
            {data.activity.length === 0 ? (
              <div className="glass px-6 py-6 text-center text-sm text-neutron/50">No activity yet.</div>
            ) : (
              <div className="flex flex-col gap-2">
                {data.activity.map((a, i) => (
                  <div key={i} className="glass flex items-center gap-3 px-4 py-3">
                    <span>{a.type === "battle" ? "⚔️" : "📘"}</span>
                    <span className="flex-1 text-sm">{a.text}</span>
                    {a.at && <span className="text-xs text-neutron/40">{new Date(a.at).toLocaleDateString()}</span>}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
