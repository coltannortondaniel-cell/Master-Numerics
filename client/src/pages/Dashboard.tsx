import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth, hasEntitlement } from "../store/auth";
import { api, parseApiError } from "../lib/api";
import { dashboardApi, type DashboardSummary, type Challenge, type ContinueTarget } from "../lib/dashboard";
import { rankProgress } from "../lib/rank";
import { useXp } from "../store/xp";
import {
  Calculator, Swords, Trophy, Users, Gift, Award, NotebookPen, Layers, Sigma, Flame, Coins,
} from "lucide-react";
import { Logo } from "../components/ui/Logo";
import { Button } from "../components/ui/Button";
import { RankIcon } from "../components/ui/RankIcon";
import { NotificationBell } from "../components/layout/NotificationBell";

const QUICK = [
  { to: "/calculator", Icon: Calculator, label: "Calculator" },
  { to: "/battle", Icon: Swords, label: "Battle" },
  { to: "/leaderboard", Icon: Trophy, label: "Leaderboard" },
  { to: "/friends", Icon: Users, label: "Friends" },
  { to: "/store", Icon: Gift, label: "Store" },
  { to: "/achievements", Icon: Award, label: "Achievements" },
];
const STUDY = [
  { to: "/notebook", Icon: NotebookPen, label: "Notebook" },
  { to: "/flashcards", Icon: Layers, label: "Flashcards" },
  { to: "/formulas", Icon: Sigma, label: "Formulas" },
];

function TrialCountdown({ endsAt }: { endsAt: string }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const ms = new Date(endsAt).getTime() - now;
  if (ms <= 0) return null;
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  const s = Math.floor((ms % 60_000) / 1000);
  return (
    <div className="glass px-5 py-4 flex items-center justify-between gap-4 flex-wrap">
      <div>
        <p className="text-sm text-neutron/60">Free trial — full access</p>
        <p className="font-mono text-2xl text-solar tabular-nums">
          {String(h).padStart(2, "0")}:{String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}
        </p>
      </div>
      <Link to="/subscribe">
        <Button variant="gold">Keep your access</Button>
      </Link>
    </div>
  );
}

function ContinueCard({ label, target, basePath, accent }: { label: string; target: ContinueTarget | null; basePath: string; accent: string }) {
  if (!target)
    return (
      <Link to={basePath} className="glass p-5 transition-all hover:border-cosmic/40">
        <p className="font-mono text-xs uppercase tracking-widest" style={{ color: accent }}>{label}</p>
        <p className="mt-2 font-display font-semibold">Start your journey →</p>
      </Link>
    );
  return (
    <Link to={`${basePath}/${target.worldSlug}/${target.lessonSlug}`} className="glass p-5 transition-all hover:border-cosmic/40 hover:shadow-glow">
      <p className="font-mono text-xs uppercase tracking-widest" style={{ color: accent }}>{label}</p>
      <p className="mt-2 font-display font-semibold truncate">{target.title}</p>
      <p className="text-xs text-neutron/50 truncate">{target.worldName}</p>
      <span className="mt-2 inline-block text-sm font-semibold" style={{ color: accent }}>Resume →</span>
    </Link>
  );
}

function ChallengeRow({ c, onClaim, claiming }: { c: Challenge; onClaim: (k: string) => void; claiming: boolean }) {
  const pct = Math.min(100, (c.progress / c.goal) * 100);
  return (
    <div className="glass px-4 py-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-medium">{c.label}</p>
        <span className="flex items-center gap-1 font-mono text-xs text-solar"><Coins size={11} strokeWidth={1.75} />{c.coin} · {c.xp}xp</span>
      </div>
      <div className="mt-2 flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: c.claimed ? "#22D3A0" : "#6B21D6" }} />
        </div>
        {c.claimed ? (
          <span className="text-xs font-semibold text-success">Claimed ✓</span>
        ) : c.canClaim ? (
          <button onClick={() => onClaim(c.key)} disabled={claiming} className="rounded-lg bg-solar px-3 py-1 text-xs font-bold text-space disabled:opacity-50">
            Claim
          </button>
        ) : (
          <span className="font-mono text-xs text-neutron/40">{c.progress}/{c.goal}</span>
        )}
      </div>
    </div>
  );
}

const fmtTime = (sec: number) => {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
};

export default function Dashboard() {
  const { user, subscription, logout, refreshEntitlement } = useAuth();
  const [params] = useSearchParams();
  const [billingLoading, setBillingLoading] = useState(false);
  const [error, setError] = useState("");
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [claiming, setClaiming] = useState(false);
  const setCoins = useXp((s) => s.setCoins);
  const setTotalXp = useXp((s) => s.setTotalXp);
  const pushToast = useXp((s) => s.push);

  useEffect(() => {
    if (params.get("checkout") === "success") void refreshEntitlement();
  }, [params, refreshEntitlement]);

  useEffect(() => {
    dashboardApi
      .get()
      .then((d) => {
        setSummary(d);
        setCoins(d.coins);
        setTotalXp(d.xp);
      })
      .catch(() => {});
  }, [setCoins, setTotalXp]);

  if (!user) return null;
  const entitled = hasEntitlement(user, subscription);
  const trialActive = new Date(user.trialEndsAt).getTime() > Date.now();
  const prog = summary ? rankProgress(summary.xp) : null;
  const goalDone = summary ? summary.challenges.daily.filter((c) => c.progress >= c.goal).length : 0;

  async function openBillingPortal() {
    setBillingLoading(true);
    setError("");
    try {
      const { data } = await api.post("/billing/portal");
      window.location.href = data.url;
    } catch (err) {
      setError(parseApiError(err).message);
      setBillingLoading(false);
    }
  }

  async function claim(key: string) {
    setClaiming(true);
    try {
      const res = await dashboardApi.claim(key);
      setCoins(res.coins);
      pushToast({ kind: "bonus", amount: res.coin, title: "Challenge complete!", detail: `+${res.xp} XP` });
      const d = await dashboardApi.get();
      setSummary(d);
    } catch (e) {
      setError(parseApiError(e).message);
    } finally {
      setClaiming(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="starfield" aria-hidden />
      <div className="nebula-glow" style={{ background: "#6B21D6", top: "-30vmax", right: "-20vmax" }} aria-hidden />

      <header className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-neutron/10">
        <Logo />
        <div className="flex items-center gap-3">
          {summary && (
            <span className="hidden sm:flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-sm" title="Day streak">
              <Flame size={15} className="text-solar" strokeWidth={1.75} />
              <span className="font-mono font-semibold text-neutron/90">{summary.streak}</span>
            </span>
          )}
          <NotificationBell />
          {user.role === "ADMIN" && (
            <Link to="/admin" className="text-sm font-semibold text-alert hover:brightness-110">Admin</Link>
          )}
          <Link to={`/profile/${user.username}`} className="text-sm text-neutron/60 hover:text-neutron hidden sm:inline">
            @{user.username}
          </Link>
          <Button variant="ghost" onClick={() => void logout()}>Sign out</Button>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-3xl px-6 py-12 flex flex-col gap-6">
        {/* Welcome + daily goal ring */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold">Welcome back, {user.username}.</h1>
            {summary && (
              <p className="mt-1 flex items-center gap-1.5 text-neutron/55">
                <Flame size={15} className="text-solar" strokeWidth={1.75} />
                {summary.streak}-day streak · {goalDone}/3 daily challenges done
              </p>
            )}
          </div>
          {summary && (
            <div className="relative grid h-16 w-16 shrink-0 place-items-center">
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                <circle cx="18" cy="18" r="16" fill="none" stroke="#22D3A0" strokeWidth="3" strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 16} strokeDashoffset={2 * Math.PI * 16 * (1 - goalDone / 3)} />
              </svg>
              <span className="font-mono text-sm font-bold">{goalDone}/3</span>
            </div>
          )}
        </div>

        {trialActive && !subscription && <TrialCountdown endsAt={user.trialEndsAt} />}

        {subscription && (
          <div className="glass px-5 py-4 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-sm text-neutron/60">Subscription</p>
              <p className="font-semibold">
                {subscription.plan === "YEARLY" ? "Yearly" : "Monthly"} ·{" "}
                <span className={subscription.status === "ACTIVE" || subscription.status === "TRIALING" ? "text-success" : "text-alert"}>
                  {subscription.status.toLowerCase().replace("_", " ")}
                </span>
              </p>
            </div>
            <Button variant="ghost" loading={billingLoading} onClick={() => void openBillingPortal()}>Manage billing</Button>
          </div>
        )}

        {!entitled && (
          <div className="glass px-5 py-6 text-center">
            <p className="font-display text-lg font-semibold">Your free day has ended.</p>
            <p className="mt-1 text-sm text-neutron/60">Subscribe to re-open every world and district.</p>
            <Link to="/subscribe" className="mt-4 inline-block"><Button variant="gold">See plans</Button></Link>
          </div>
        )}

        {/* XP to next rank */}
        {prog && (
          <div className="glass px-5 py-4">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2"><RankIcon id={prog.rank.id} size={16} color={prog.rank.color} /> <span className="font-semibold" style={{ color: prog.rank.color }}>{prog.rank.name}</span></span>
              <span className="font-mono text-neutron/60">{summary!.xp.toLocaleString()} XP</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-cosmic" style={{ width: `${prog.ratio * 100}%` }} />
            </div>
            {prog.remaining != null && <p className="mt-1 text-xs text-neutron/45">You're {prog.remaining.toLocaleString()} XP from the next rank.</p>}
          </div>
        )}

        {/* Continue learning */}
        {summary && (
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ContinueCard label="Continue Physics" target={summary.continue.physics} basePath="/journey" accent="#1E90FF" />
            <ContinueCard label="Continue Math" target={summary.continue.math} basePath="/city" accent="#FFB800" />
          </section>
        )}

        {/* Daily challenges */}
        {summary && (
          <section>
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-neutron/40">Daily challenges</p>
            <div className="flex flex-col gap-2">
              {summary.challenges.daily.map((c) => <ChallengeRow key={c.key} c={c} onClaim={claim} claiming={claiming} />)}
              <ChallengeRow c={summary.challenges.weekly} onClaim={claim} claiming={claiming} />
            </div>
          </section>
        )}

        {/* Stats */}
        {summary && (
          <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Lessons", value: summary.stats.lessonsCompleted.toString() },
              { label: "Mastered", value: summary.stats.lessonsMastered.toString() },
              { label: "Accuracy", value: summary.stats.accuracy != null ? `${summary.stats.accuracy}%` : "—" },
              { label: "Study time", value: fmtTime(summary.stats.studyTimeSec) },
            ].map((s) => (
              <div key={s.label} className="glass px-4 py-3 text-center">
                <p className="font-display text-xl font-bold tabular-nums">{s.value}</p>
                <p className="text-[0.7rem] uppercase tracking-wide text-neutron/45">{s.label}</p>
              </div>
            ))}
          </section>
        )}

        {/* Friends activity */}
        {summary && summary.activity.length > 0 && (
          <section>
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-neutron/40">Friends activity</p>
            <div className="glass divide-y divide-neutron/5">
              {summary.activity.map((a, i) => (
                <p key={i} className="px-4 py-2.5 text-sm">
                  <Link to={`/profile/${a.username}`} className="font-semibold text-nebula">@{a.username}</Link>{" "}
                  <span className="text-neutron/60">{a.text}</span>
                </p>
              ))}
            </div>
          </section>
        )}

        {/* Worlds */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link to="/journey" className="glass group p-6 transition-all duration-300 hover:border-nebula/40 hover:shadow-glow">
            <p className="font-mono text-xs text-nebula uppercase tracking-widest">Physics Journey</p>
            <h2 className="mt-2 font-display text-xl font-bold group-hover:text-white">Scale of the Cosmos</h2>
            <p className="mt-2 text-sm text-neutron/60">18 worlds from the Moon to the Big Bang.</p>
          </Link>
          <Link to="/city" className="glass group p-6 transition-all duration-300 hover:border-solar/40 hover:shadow-glow-gold">
            <p className="font-mono text-xs text-solar uppercase tracking-widest">Math City</p>
            <h2 className="mt-2 font-display text-xl font-bold group-hover:text-white">The City of Numbers</h2>
            <p className="mt-2 text-sm text-neutron/60">14 districts of living mathematics.</p>
          </Link>
        </section>

        <section>
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-neutron/40">Quick launch</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {QUICK.map((q) => (
              <Link key={q.to} to={q.to} className="glass flex flex-col items-center gap-2 py-5 transition-all hover:border-neutron/30 hover:bg-white/[0.03]">
                <q.Icon size={22} strokeWidth={1.5} className="text-neutron/80" />
                <span className="text-sm font-semibold">{q.label}</span>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-neutron/40">Study tools</p>
          <div className="grid grid-cols-3 gap-3">
            {STUDY.map((q) => (
              <Link key={q.to} to={q.to} className="glass flex flex-col items-center gap-2 py-5 transition-all hover:border-neutron/30 hover:bg-white/[0.03]">
                <q.Icon size={22} strokeWidth={1.5} className="text-neutron/80" />
                <span className="text-sm font-semibold">{q.label}</span>
              </Link>
            ))}
          </div>
        </section>

        {error && <p role="alert" className="text-sm text-alert text-center">{error}</p>}
      </main>
    </div>
  );
}
