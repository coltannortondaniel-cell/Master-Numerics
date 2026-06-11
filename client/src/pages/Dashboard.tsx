import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth, hasEntitlement } from "../store/auth";
import { api, parseApiError } from "../lib/api";
import { Logo } from "../components/ui/Logo";
import { Button } from "../components/ui/Button";

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
          {String(h).padStart(2, "0")}:{String(m).padStart(2, "0")}:
          {String(s).padStart(2, "0")}
        </p>
      </div>
      <Link to="/subscribe">
        <Button variant="gold">Keep your access</Button>
      </Link>
    </div>
  );
}

export default function Dashboard() {
  const { user, subscription, logout, refreshEntitlement } = useAuth();
  const [params] = useSearchParams();
  const [billingLoading, setBillingLoading] = useState(false);
  const [error, setError] = useState("");

  // Returning from Stripe checkout — sync entitlement.
  useEffect(() => {
    if (params.get("checkout") === "success") void refreshEntitlement();
  }, [params, refreshEntitlement]);

  if (!user) return null;
  const entitled = hasEntitlement(user, subscription);
  const trialActive = new Date(user.trialEndsAt).getTime() > Date.now();

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

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="starfield" aria-hidden />
      <div
        className="nebula-glow"
        style={{ background: "#6B21D6", top: "-30vmax", right: "-20vmax" }}
        aria-hidden
      />

      <header className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-neutron/10">
        <Logo />
        <div className="flex items-center gap-4">
          <span className="text-sm text-neutron/60 hidden sm:inline">
            @{user.username}
          </span>
          <Button variant="ghost" onClick={() => void logout()}>
            Sign out
          </Button>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-3xl px-6 py-12 flex flex-col gap-6">
        <h1 className="font-display text-3xl font-bold">
          Welcome aboard, {user.username}.
        </h1>

        {trialActive && !subscription && <TrialCountdown endsAt={user.trialEndsAt} />}

        {subscription && (
          <div className="glass px-5 py-4 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-sm text-neutron/60">Subscription</p>
              <p className="font-semibold">
                {subscription.plan === "YEARLY" ? "Yearly" : "Monthly"} ·{" "}
                <span
                  className={
                    subscription.status === "ACTIVE" || subscription.status === "TRIALING"
                      ? "text-success"
                      : "text-alert"
                  }
                >
                  {subscription.status.toLowerCase().replace("_", " ")}
                </span>
                {subscription.cancelAtPeriodEnd && (
                  <span className="text-neutron/50"> · ends {new Date(subscription.currentPeriodEnd).toLocaleDateString()}</span>
                )}
              </p>
            </div>
            <Button variant="ghost" loading={billingLoading} onClick={() => void openBillingPortal()}>
              Manage billing
            </Button>
          </div>
        )}

        {!entitled && (
          <div className="glass px-5 py-6 text-center">
            <p className="font-display text-lg font-semibold">
              Your free day has ended.
            </p>
            <p className="mt-1 text-sm text-neutron/60">
              Subscribe to re-open every world and district.
            </p>
            <Link to="/subscribe" className="mt-4 inline-block">
              <Button variant="gold">See plans</Button>
            </Link>
          </div>
        )}

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/journey"
            className="glass group p-6 transition-all duration-300 hover:border-nebula/40 hover:shadow-glow"
          >
            <p className="font-mono text-xs text-nebula uppercase tracking-widest">
              Physics Journey
            </p>
            <h2 className="mt-2 font-display text-xl font-bold group-hover:text-white">
              Scale of the Cosmos
            </h2>
            <p className="mt-2 text-sm text-neutron/60">
              Travel from the dust of the Moon to the birth of the universe across 18 worlds. Three
              are charted and waiting.
            </p>
            <span className="mt-3 inline-block font-display font-semibold text-nebula">
              Launch the journey →
            </span>
          </Link>
          <Link
            to="/city"
            className="glass group p-6 transition-all duration-300 hover:border-solar/40 hover:shadow-glow-gold"
          >
            <p className="font-mono text-xs text-solar uppercase tracking-widest">Math City</p>
            <h2 className="mt-2 font-display text-xl font-bold group-hover:text-white">
              The City of Numbers
            </h2>
            <p className="mt-2 text-sm text-neutron/60">
              Walk 14 districts of living mathematics, from Kindergarten Park to the Graduate School.
              The Park is open now.
            </p>
            <span className="mt-3 inline-block font-display font-semibold text-solar">
              Enter the city →
            </span>
          </Link>
        </section>

        <section>
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-neutron/40">
            Quick launch
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Link
              to="/calculator"
              className="glass flex flex-col items-center gap-1 py-4 transition-all hover:border-cosmic/40 hover:shadow-glow"
            >
              <span className="text-2xl">📈</span>
              <span className="text-sm font-semibold">Calculator</span>
            </Link>
            <Link
              to="/battle"
              className="glass flex flex-col items-center gap-1 py-4 transition-all hover:border-alert/40 hover:shadow-glow"
            >
              <span className="text-2xl">⚔️</span>
              <span className="text-sm font-semibold">Battle</span>
            </Link>
            <Link
              to="/leaderboard"
              className="glass flex flex-col items-center gap-1 py-4 transition-all hover:border-solar/40 hover:shadow-glow-gold"
            >
              <span className="text-2xl">🏆</span>
              <span className="text-sm font-semibold">Leaderboard</span>
            </Link>
            <Link
              to="/friends"
              className="glass flex flex-col items-center gap-1 py-4 transition-all hover:border-success/40 hover:shadow-glow"
            >
              <span className="text-2xl">🤝</span>
              <span className="text-sm font-semibold">Friends</span>
            </Link>
            <Link
              to="/store"
              className="glass flex flex-col items-center gap-1 py-4 transition-all hover:border-cosmic/40 hover:shadow-glow"
            >
              <span className="text-2xl">🎁</span>
              <span className="text-sm font-semibold">Store</span>
            </Link>
            <Link
              to="/achievements"
              className="glass flex flex-col items-center gap-1 py-4 transition-all hover:border-success/40 hover:shadow-glow"
            >
              <span className="text-2xl">🏅</span>
              <span className="text-sm font-semibold">Achievements</span>
            </Link>
          </div>
        </section>

        {error && (
          <p role="alert" className="text-sm text-alert text-center">
            {error}
          </p>
        )}
      </main>
    </div>
  );
}
