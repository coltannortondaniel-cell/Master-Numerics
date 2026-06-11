import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { adminApi, type AdminOverview, type AdminUser, type AdminLesson } from "../lib/admin";
import { parseApiError } from "../lib/api";
import { useAuth } from "../store/auth";
import { CosmicBackground } from "../components/physics/CosmicBackground";
import { JourneyHeader } from "../components/layout/JourneyHeader";

type Tab = "overview" | "users" | "lessons";

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="glass px-4 py-4 text-center">
      <p className="font-display text-2xl font-bold tabular-nums">{value}</p>
      <p className="text-[0.7rem] uppercase tracking-wide text-neutron/45">{label}</p>
    </div>
  );
}

function UsersTab() {
  const [q, setQ] = useState("");
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [busy, setBusy] = useState<string | null>(null);

  const load = (query?: string) => adminApi.users(query).then(setUsers).catch(() => {});
  useEffect(() => {
    const t = setTimeout(() => load(q.trim() || undefined), 250);
    return () => clearTimeout(t);
  }, [q]);

  async function act(id: string, patch: Parameters<typeof adminApi.updateUser>[1]) {
    setBusy(id);
    try {
      const u = await adminApi.updateUser(id, patch);
      setUsers((us) => us.map((x) => (x.id === id ? { ...x, ...u } : x)));
    } finally {
      setBusy(null);
    }
  }
  async function grant(id: string) {
    const key = prompt("Cosmetic key to grant (e.g. title-the-black-hole):");
    if (key) await adminApi.grant(id, key.trim()).catch((e) => alert(parseApiError(e).message));
  }

  return (
    <div>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search by username or email…"
        className="mb-4 w-full rounded-lg border border-neutron/15 bg-space/70 px-4 py-2.5 text-sm outline-none focus:border-cosmic"
      />
      <div className="flex flex-col gap-2">
        {users.map((u) => (
          <div key={u.id} className="glass px-4 py-3">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="min-w-0">
                <p className="font-semibold">
                  @{u.username}
                  {u.role === "ADMIN" && <span className="ml-2 text-xs text-cosmic">ADMIN</span>}
                  {u.banned && <span className="ml-2 text-xs text-alert">BANNED</span>}
                </p>
                <p className="text-xs text-neutron/45">{u.email} · {u.subscription ?? "no sub"}</p>
              </div>
              <p className="font-mono text-xs text-solar">{u.xp.toLocaleString()} XP · 🪙{u.coins.toLocaleString()}</p>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
              {[100, 500].map((d) => (
                <button key={`xp${d}`} disabled={busy === u.id} onClick={() => act(u.id, { xpDelta: d })} className="rounded bg-white/5 px-2 py-1 hover:bg-white/10">+{d} XP</button>
              ))}
              {[100, 1000].map((d) => (
                <button key={`c${d}`} disabled={busy === u.id} onClick={() => act(u.id, { coinDelta: d })} className="rounded bg-white/5 px-2 py-1 hover:bg-white/10">+{d}🪙</button>
              ))}
              <button onClick={() => grant(u.id)} className="rounded bg-cosmic/30 px-2 py-1 hover:bg-cosmic/50">Grant cosmetic</button>
              <button disabled={busy === u.id} onClick={() => act(u.id, { banned: !u.banned })} className={`rounded px-2 py-1 ${u.banned ? "bg-success/20 hover:bg-success/40" : "bg-alert/20 hover:bg-alert/40"}`}>
                {u.banned ? "Unban" : "Ban"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LessonsTab() {
  const [lessons, setLessons] = useState<AdminLesson[]>([]);
  useEffect(() => {
    adminApi.lessons().then(setLessons).catch(() => {});
  }, []);
  async function toggle(slug: string, published: boolean) {
    await adminApi.updateLesson(slug, published);
    setLessons((ls) => ls.map((l) => (l.slug === slug ? { ...l, published } : l)));
  }
  return (
    <div className="flex flex-col gap-2">
      {lessons.map((l) => (
        <div key={l.slug} className="glass flex items-center justify-between px-4 py-3">
          <div>
            <p className="font-semibold">{l.title}</p>
            <p className="text-xs text-neutron/45">{l.world} · {l.subject}</p>
          </div>
          <button
            onClick={() => toggle(l.slug, !l.published)}
            className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${l.published ? "bg-success/20 text-success" : "bg-white/5 text-neutron/50"}`}
          >
            {l.published ? "Published" : "Hidden"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default function Admin() {
  const user = useAuth((s) => s.user);
  const [tab, setTab] = useState<Tab>("overview");
  const [ov, setOv] = useState<AdminOverview | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.role === "ADMIN") adminApi.overview().then(setOv).catch((e) => setError(parseApiError(e).message));
  }, [user]);

  if (user && user.role !== "ADMIN") return <Navigate to="/dashboard" replace />;

  return (
    <div className="relative min-h-screen">
      <CosmicBackground palette={{ accent: "#FF4757", glow: "#6B21D6" }} />
      <JourneyHeader back={{ to: "/dashboard", label: "Dashboard" }} />
      <main className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 py-10">
        <h1 className="mb-5 font-display text-3xl font-bold">Admin</h1>
        <div className="mb-5 inline-flex rounded-lg bg-white/5 p-1">
          {(["overview", "users", "lessons"] as Tab[]).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`rounded-md px-4 py-1.5 text-sm font-medium capitalize ${tab === t ? "bg-cosmic text-neutron shadow-glow" : "text-neutron/55 hover:text-neutron"}`}>
              {t}
            </button>
          ))}
        </div>

        {error && <p className="mb-4 text-sm text-alert">{error}</p>}

        {tab === "overview" &&
          (ov ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <StatCard label="Users" value={ov.totalUsers.toLocaleString()} />
              <StatCard label="DAU" value={ov.dau.toLocaleString()} />
              <StatCard label="MAU" value={ov.mau.toLocaleString()} />
              <StatCard label="Active subs" value={ov.activeSubscriptions.toLocaleString()} />
              <StatCard label="MRR" value={`$${ov.mrr.toLocaleString()}`} />
              <StatCard label="Lessons done" value={ov.lessonsCompleted.toLocaleString()} />
              <StatCard label="Battles" value={ov.battles.toLocaleString()} />
              <StatCard label="Crates opened" value={ov.cratesOpened.toLocaleString()} />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Array.from({ length: 8 }).map((_, i) => <div key={i} className="skeleton h-20 w-full" />)}
            </div>
          ))}
        {tab === "users" && <UsersTab />}
        {tab === "lessons" && <LessonsTab />}
      </main>
    </div>
  );
}
