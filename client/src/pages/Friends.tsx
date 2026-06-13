import { useCallback, useEffect, useRef, useState } from "react";
import {
  socialApi,
  type FriendsResponse,
  type SearchUser,
  type Relation,
} from "../lib/social";
import { parseApiError } from "../lib/api";
import { rankForXp } from "../lib/rank";
import { RankIcon } from "../components/ui/RankIcon";
import { CosmicBackground } from "../components/physics/CosmicBackground";
import { JourneyHeader } from "../components/layout/JourneyHeader";
import { Button } from "../components/ui/Button";

function Avatar({ name }: { name: string }) {
  return (
    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-cosmic/30 font-display font-bold text-[#C9B6FF]">
      {name.charAt(0).toUpperCase()}
    </span>
  );
}

export default function Friends() {
  const [data, setData] = useState<FriendsResponse | null>(null);
  const [q, setQ] = useState("");
  const [results, setResults] = useState<SearchUser[]>([]);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");
  const timer = useRef<number>();

  const load = useCallback(() => {
    socialApi
      .friends()
      .then(setData)
      .catch((e) => setError(parseApiError(e).message));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Debounced username search
  useEffect(() => {
    window.clearTimeout(timer.current);
    if (q.trim().length < 2) {
      setResults([]);
      return;
    }
    setSearching(true);
    timer.current = window.setTimeout(() => {
      socialApi
        .search(q.trim())
        .then(setResults)
        .catch(() => setResults([]))
        .finally(() => setSearching(false));
    }, 300);
    return () => window.clearTimeout(timer.current);
  }, [q]);

  async function add(username: string) {
    setResults((rs) => rs.map((r) => (r.username === username ? { ...r, relation: "pending_out" as Relation } : r)));
    try {
      await socialApi.request(username);
      load();
    } catch (e) {
      setError(parseApiError(e).message);
    }
  }
  async function respond(friendshipId: string, accept: boolean) {
    await socialApi.respond(friendshipId, accept);
    load();
  }
  async function remove(friendshipId: string) {
    await socialApi.remove(friendshipId);
    load();
  }

  const relLabel: Record<Relation, string> = {
    none: "Add",
    friends: "Friends",
    pending_out: "Requested",
    pending_in: "Accept",
  };

  return (
    <div className="relative min-h-screen">
      <CosmicBackground palette={{ accent: "#22D3A0", glow: "#1E90FF" }} />
      <JourneyHeader back={{ to: "/dashboard", label: "Dashboard" }} />
      <main className="relative z-10 mx-auto max-w-2xl px-4 sm:px-6 py-10">
        <div className="text-center mb-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-success">Your crew</p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold">Friends</h1>
        </div>

        {/* Search */}
        <div className="glass px-4 py-4 mb-5">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Find explorers by username…"
            className="w-full rounded-lg bg-space/70 border border-neutron/15 px-3 py-2 text-sm outline-none focus:border-cosmic"
          />
          {q.trim().length >= 2 && (
            <div className="mt-3 flex flex-col gap-2">
              {searching && <p className="text-sm text-neutron/50">Searching…</p>}
              {!searching && results.length === 0 && (
                <p className="text-sm text-neutron/50">No explorers found.</p>
              )}
              {results.map((u) => (
                <div key={u.id} className="flex items-center gap-3">
                  <Avatar name={u.username} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{u.username}</p>
                    <p className="flex items-center gap-1 font-mono text-xs text-neutron/50">
                      <RankIcon id={rankForXp(u.xp).id} size={12} color={rankForXp(u.xp).color} />
                      {u.xp.toLocaleString()} XP
                    </p>
                  </div>
                  <Button
                    variant={u.relation === "none" || u.relation === "pending_in" ? "primary" : "ghost"}
                    onClick={() => u.relation === "none" && add(u.username)}
                    disabled={u.relation === "friends" || u.relation === "pending_out"}
                  >
                    {relLabel[u.relation]}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {error && <p className="mb-4 text-sm text-alert text-center">{error}</p>}

        {/* Incoming requests */}
        {data && data.incoming.length > 0 && (
          <section className="mb-5">
            <p className="mb-2 font-mono text-[0.7rem] uppercase tracking-widest text-solar">
              Requests ({data.incoming.length})
            </p>
            <div className="flex flex-col gap-2">
              {data.incoming.map((r) => (
                <div key={r.friendshipId} className="glass flex items-center gap-3 px-4 py-3">
                  <Avatar name={r.user.username} />
                  <span className="min-w-0 flex-1 truncate font-semibold">{r.user.username}</span>
                  <Button onClick={() => respond(r.friendshipId, true)}>Accept</Button>
                  <button
                    onClick={() => respond(r.friendshipId, false)}
                    className="text-sm text-neutron/50 hover:text-alert"
                  >
                    Decline
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Friends list */}
        <section>
          <p className="mb-2 font-mono text-[0.7rem] uppercase tracking-widest text-success">
            Friends {data ? `(${data.friends.length})` : ""}
          </p>
          {!data ? (
            <div className="flex flex-col gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="skeleton h-14 w-full" />
              ))}
            </div>
          ) : data.friends.length === 0 ? (
            <div className="glass px-6 py-8 text-center text-sm text-neutron/55">
              No friends yet — search above to add some.
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {data.friends.map((f) => {
                return (
                  <div key={f.id} className="glass group flex items-center gap-3 px-4 py-3">
                    <Avatar name={f.username} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold">{f.username}</p>
                      <p className="flex items-center gap-1 font-mono text-xs text-neutron/50">
                        <RankIcon id={rankForXp(f.xp).id} size={12} color={rankForXp(f.xp).color} />
                        {f.xp.toLocaleString()} XP
                      </p>
                    </div>
                    <span className="h-2.5 w-2.5 rounded-full bg-neutron/20" title="offline" />
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Outgoing pending */}
        {data && data.outgoing.length > 0 && (
          <section className="mt-5">
            <p className="mb-2 font-mono text-[0.7rem] uppercase tracking-widest text-neutron/40">
              Pending ({data.outgoing.length})
            </p>
            <div className="flex flex-col gap-2">
              {data.outgoing.map((r) => (
                <div key={r.friendshipId} className="glass flex items-center gap-3 px-4 py-3 opacity-70">
                  <Avatar name={r.user.username} />
                  <span className="min-w-0 flex-1 truncate font-semibold">{r.user.username}</span>
                  <button
                    onClick={() => remove(r.friendshipId)}
                    className="text-sm text-neutron/50 hover:text-alert"
                  >
                    Cancel
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
