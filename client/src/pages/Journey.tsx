import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { physicsApi, type WorldsResponse } from "../lib/physics";
import { parseApiError } from "../lib/api";
import { JourneyHeader } from "../components/layout/JourneyHeader";
import { ZoomUniverse } from "../components/physics/ZoomUniverse";
import { Button } from "../components/ui/Button";

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
        if (axios.isAxiosError(err) && err.response?.status === 403) {
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
    <div className="relative min-h-screen bg-space">
      <div className="fixed inset-x-0 top-0 z-40 border-b border-neutron/10 bg-space/70 backdrop-blur-md">
        <JourneyHeader back={{ to: "/dashboard", label: "Dashboard" }} />
      </div>

      {error ? (
        <div className="flex min-h-screen items-center justify-center px-6">
          <div className="glass max-w-md px-6 py-8 text-center">
            <p className="font-display text-lg font-semibold">The map didn't load</p>
            <p className="mt-1 text-sm text-neutron/60">{error}</p>
            <div className="mt-4">
              <Button onClick={() => window.location.reload()}>Try again</Button>
            </div>
          </div>
        </div>
      ) : data ? (
        <ZoomUniverse worlds={data.worlds} continueTarget={data.continue} />
      ) : (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-2 border-cosmic border-t-transparent" />
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-neutron/40">Charting the cosmos…</p>
        </div>
      )}
    </div>
  );
}
