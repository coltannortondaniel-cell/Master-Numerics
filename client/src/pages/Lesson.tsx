import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { physicsApi, type ContentApi, type LessonResponse } from "../lib/physics";
import { ContentApiProvider } from "../lib/contentApi";
import { parseApiError } from "../lib/api";
import { useAuth } from "../store/auth";
import { CosmicBackground } from "../components/physics/CosmicBackground";
import { JourneyHeader } from "../components/layout/JourneyHeader";
import { LessonViewer } from "../components/physics/LessonViewer";
import { Button } from "../components/ui/Button";

function LessonSkeleton() {
  return (
    <div className="mx-auto max-w-3xl flex flex-col gap-6">
      <div className="skeleton h-12 w-2/3" />
      <div className="skeleton h-56 w-full" />
      <div className="skeleton h-40 w-full" />
      <div className="skeleton h-40 w-full" />
    </div>
  );
}

interface LessonPageProps {
  api?: ContentApi;
  basePath?: string;
}

export default function Lesson({ api = physicsApi, basePath = "/journey" }: LessonPageProps) {
  const { worldSlug = "", lessonSlug = "" } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<LessonResponse | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    setData(null);
    setError("");
    window.scrollTo(0, 0);
    api
      .lesson(lessonSlug)
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
  }, [lessonSlug, navigate, api]);

  const palette = data?.lesson.world.palette ?? { accent: "#6B21D6", glow: "#1E90FF" };

  // Tint the ambient gravity background to this biome's accent while here.
  useEffect(() => {
    document.documentElement.style.setProperty("--bg-accent", palette.accent);
    return () => {
      document.documentElement.style.removeProperty("--bg-accent");
    };
  }, [palette.accent]);

  return (
    <div className="relative min-h-screen">
      <CosmicBackground palette={palette} intensity={0.7} />
      <JourneyHeader back={{ to: `${basePath}/${worldSlug}`, label: data?.lesson.world.name ?? "World" }} />
      <main className="relative z-10 px-4 sm:px-6 py-10">
        {error ? (
          <div className="glass mx-auto max-w-md px-6 py-8 text-center">
            <p className="font-display text-lg font-semibold">This lesson didn't load</p>
            <p className="mt-1 text-sm text-neutron/60">{error}</p>
            <div className="mt-4">
              <Link to={`${basePath}/${worldSlug}`}>
                <Button variant="ghost">Back</Button>
              </Link>
            </div>
          </div>
        ) : data ? (
          <ContentApiProvider api={api}>
            <LessonViewer key={lessonSlug} data={data} basePath={basePath} />
          </ContentApiProvider>
        ) : (
          <LessonSkeleton />
        )}
      </main>
    </div>
  );
}
