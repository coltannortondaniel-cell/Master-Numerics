import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { physicsApi, type WorldsResponse } from "../lib/physics";
import { parseApiError } from "../lib/api";
import { CosmicBackground } from "../components/physics/CosmicBackground";
import { JourneyHeader } from "../components/layout/JourneyHeader";
import { CosmicMap } from "../components/physics/CosmicMap";
import { Button } from "../components/ui/Button";

function MapSkeleton() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="text-center mb-8 flex flex-col items-center gap-3">
        <div className="skeleton h-3 w-40" />
        <div className="skeleton h-9 w-72" />
        <div className="skeleton h-4 w-96 max-w-full" />
      </div>
      <div className="flex flex-col gap-3">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="skeleton h-[88px] w-full" />
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
        // Trial lapsed / no subscription → the paywall.
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

  const accent = data?.worlds[0]?.palette ?? { accent: "#6B21D6", glow: "#1E90FF" };

  return (
    <div className="relative min-h-screen">
      <CosmicBackground palette={accent} />
      <JourneyHeader back={{ to: "/dashboard", label: "Dashboard" }} />
      <main className="relative z-10 px-4 sm:px-6 py-10">
        {error ? (
          <div className="glass mx-auto max-w-md px-6 py-8 text-center">
            <p className="font-display text-lg font-semibold">The map didn't load</p>
            <p className="mt-1 text-sm text-neutron/60">{error}</p>
            <div className="mt-4">
              <Button onClick={() => window.location.reload()}>Try again</Button>
            </div>
          </div>
        ) : data ? (
          <CosmicMap worlds={data.worlds} continueTarget={data.continue} />
        ) : (
          <MapSkeleton />
        )}
      </main>
    </div>
  );
}
