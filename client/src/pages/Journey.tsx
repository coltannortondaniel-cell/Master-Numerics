import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { physicsApi, type WorldsResponse } from "../lib/physics";
import { parseApiError } from "../lib/api";
import { useAuth } from "../store/auth";
import { JourneyHeader } from "../components/layout/JourneyHeader";
import { AppShell } from "../components/layout/AppNav";
import { StarChart } from "../components/physics/StarChart";
import { Button } from "../components/ui/Button";

function PathSkeleton() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-4">
      <div className="skeleton h-9 w-64" />
      <div className="skeleton h-4 w-80 max-w-full" />
      <div className="mt-6 flex flex-col items-center gap-12">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="skeleton h-[88px] w-[88px] rounded-full" />
        ))}
      </div>
    </div>
  );
}

export default function Journey() {
  const navigate = useNavigate();
  const [data, setData] = useState<WorldsResponse | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    physicsApi
      .worlds()
      .then((d) => alive && setData(d))
      .catch((err) => {
        if (!alive) return;
        if (axios.isAxiosError(err) && err.response?.status === 403 && useAuth.getState().paywallEnabled) {
          navigate("/subscribe", { replace: true });
          return;
        }
        setError(parseApiError(err).message);
      });
    return () => {
      alive = false;
    };
  }, [navigate]);

  return (
    <AppShell>
      <div className="relative min-h-screen">
        <JourneyHeader back={{ to: "/dashboard", label: "Dashboard" }} />
        <main className="relative z-10 px-4 sm:px-6 py-10">
          {error ? (
            <div className="glass mx-auto max-w-md px-6 py-8 text-center">
              <p className="font-display text-lg font-semibold">The map didn't load</p>
              <p className="mt-1 text-sm text-fg/60">{error}</p>
              <div className="mt-4">
                <Button onClick={() => window.location.reload()}>Try again</Button>
              </div>
            </div>
          ) : data ? (
            <StarChart
              worlds={data.worlds}
              continueTarget={data.continue}
              basePath="/journey"
              subject="physics"
            />
          ) : (
            <PathSkeleton />
          )}
        </main>
      </div>
    </AppShell>
  );
}
