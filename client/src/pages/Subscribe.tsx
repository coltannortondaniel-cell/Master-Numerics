import { useState } from "react";
import { api, parseApiError } from "../lib/api";
import { useAuth } from "../store/auth";
import { AuthLayout } from "../components/layout/AuthLayout";
import { Button } from "../components/ui/Button";

const PLANS = [
  {
    id: "MONTHLY" as const,
    name: "Monthly",
    price: "$4.99",
    cadence: "per month",
    note: "Cancel any time",
    featured: false,
  },
  {
    id: "YEARLY" as const,
    name: "Yearly",
    price: "$39.99",
    cadence: "per year",
    note: "Save 33% vs monthly",
    featured: true,
  },
];

export default function Subscribe() {
  const user = useAuth((s) => s.user);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [error, setError] = useState("");

  const trialEnded = user && new Date(user.trialEndsAt).getTime() < Date.now();

  async function startCheckout(plan: "MONTHLY" | "YEARLY") {
    setError("");
    setLoadingPlan(plan);
    try {
      const { data } = await api.post("/billing/checkout", { plan });
      window.location.href = data.url; // Stripe-hosted checkout
    } catch (err) {
      setError(parseApiError(err).message);
      setLoadingPlan(null);
    }
  }

  return (
    <AuthLayout
      title={trialEnded ? "Your free day has ended" : "Go beyond the trial"}
      subtitle="Every lesson, every world, every district — one subscription."
      wide
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-xl border p-5 flex flex-col gap-3 ${
              plan.featured
                ? "border-solar/60 shadow-glow-gold bg-solar/5"
                : "border-neutron/15"
            }`}
          >
            <div className="flex items-baseline justify-between">
              <span className="font-display font-semibold">{plan.name}</span>
              {plan.featured && (
                <span className="rounded-full bg-solar text-space text-xs font-bold px-2 py-0.5">
                  Best value
                </span>
              )}
            </div>
            <div>
              <span className="font-display text-3xl font-bold">{plan.price}</span>{" "}
              <span className="text-sm text-neutron/50">{plan.cadence}</span>
            </div>
            <p className="text-xs text-neutron/50">{plan.note}</p>
            <Button
              variant={plan.featured ? "gold" : "primary"}
              loading={loadingPlan === plan.id}
              disabled={loadingPlan !== null && loadingPlan !== plan.id}
              onClick={() => startCheckout(plan.id)}
            >
              Choose {plan.name.toLowerCase()}
            </Button>
          </div>
        ))}
      </div>

      {error && (
        <p role="alert" className="mt-4 text-center text-sm text-alert">
          {error}
        </p>
      )}

      <p className="mt-6 text-center text-xs text-neutron/40">
        Payments are handled securely by Stripe. You can manage or cancel from your
        dashboard at any time.
      </p>
    </AuthLayout>
  );
}
