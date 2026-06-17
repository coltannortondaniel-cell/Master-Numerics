import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import axios from "axios";
import { physicsApi, type ContentApi, type WorldResponse, type LessonSummary } from "../lib/physics";
import { parseApiError } from "../lib/api";
import { useAuth } from "../store/auth";
import { CosmicBackground } from "../components/physics/CosmicBackground";
import { JourneyHeader } from "../components/layout/JourneyHeader";
import { StatusChip } from "../components/physics/StatusChip";
import { Difficulty } from "../components/ui/Difficulty";
import { Button } from "../components/ui/Button";

function LessonRow({
  lesson,
  worldSlug,
  basePath,
  accent,
  index,
}: {
  lesson: LessonSummary;
  worldSlug: string;
  basePath: string;
  accent: string;
  index: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index, 8) * 0.05 }}
    >
      <Link
        to={`${basePath}/${worldSlug}/${lesson.slug}`}
        className="glass group flex items-center gap-4 px-4 sm:px-5 py-4 transition-all duration-300 hover:border-cosmic/40 hover:shadow-glow"
      >
        <div
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full font-display font-bold"
          style={{ background: `${accent}22`, color: accent }}
        >
          {lesson.orderIndex}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display font-semibold truncate group-hover:text-white">
            {lesson.title}
          </h3>
          <p className="text-sm text-neutron/55 truncate">{lesson.tagline}</p>
          <div className="mt-1.5 flex items-center gap-2 flex-wrap">
            <StatusChip status={lesson.status} />
            <span className="font-mono text-[0.7rem] text-neutron/40">~{lesson.estMinutes} min</span>
            <span className="font-mono text-[0.7rem] text-solar/70">+{lesson.xpReward} XP</span>
            {lesson.difficulty != null && <Difficulty level={lesson.difficulty} />}
            {lesson.bestScore != null && (
              <span className="font-mono text-[0.7rem] text-neutron/40">best {lesson.bestScore}%</span>
            )}
          </div>
        </div>
        <span className="shrink-0 text-neutron/40 group-hover:text-cosmic transition-colors">→</span>
      </Link>
    </motion.div>
  );
}

function WorldSkeleton() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="skeleton h-40 w-full mb-8" />
      <div className="flex flex-col gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton h-[92px] w-full" />
        ))}
      </div>
    </div>
  );
}

interface WorldPageProps {
  api?: ContentApi;
  basePath?: string;
  mapPath?: string;
  mapLabel?: string;
}

export default function World({
  api = physicsApi,
  basePath = "/journey",
  mapPath = "/journey",
  mapLabel = "Cosmic Map",
}: WorldPageProps) {
  const { worldSlug = "" } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<WorldResponse | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    setData(null);
    api
      .world(worldSlug)
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
  }, [worldSlug, navigate, api]);

  const palette = data?.world.palette ?? { accent: "#6B21D6", glow: "#1E90FF" };

  // Tint the ambient gravity background to this biome's accent while here.
  useEffect(() => {
    document.documentElement.style.setProperty("--bg-accent", "#ECEEF3");
    return () => {
      document.documentElement.style.removeProperty("--bg-accent");
    };
  }, [palette.accent]);

  return (
    <div className="relative min-h-screen">
      <CosmicBackground palette={palette} />
      <JourneyHeader back={{ to: mapPath, label: mapLabel }} />
      <main className="relative z-10 px-4 sm:px-6 py-10">
        {error ? (
          <div className="glass mx-auto max-w-md px-6 py-8 text-center">
            <p className="font-display text-lg font-semibold">Couldn't reach this world</p>
            <p className="mt-1 text-sm text-neutron/60">{error}</p>
            <div className="mt-4">
              <Link to={mapPath}>
                <Button variant="ghost">Back to the map</Button>
              </Link>
            </div>
          </div>
        ) : !data ? (
          <WorldSkeleton />
        ) : (
          <div className="mx-auto max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative mb-8 overflow-hidden rounded-2xl px-6 py-10 sm:px-10 sm:py-12"
              style={{
                background: `radial-gradient(120% 140% at 0% 0%, ${palette.accent}33, transparent 60%), radial-gradient(120% 140% at 100% 100%, ${palette.glow}33, transparent 60%)`,
                border: "1px solid rgba(240,244,255,0.08)",
              }}
            >
              <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: palette.accent }}>
                {data.world.gradeRange} · scale {data.world.scaleLabel}
              </p>
              <h1 className="mt-3 font-display text-3xl sm:text-4xl font-bold">{data.world.name}</h1>
              <p className="mt-1 text-lg text-neutron/70">{data.world.subtitle}</p>
              <p className="mt-4 max-w-xl text-neutron/60">{data.world.description}</p>
            </motion.div>

            {data.lessons.length === 0 ? (
              <div className="glass px-6 py-10 text-center">
                <p className="font-display text-lg font-semibold">This world is still being charted</p>
                <p className="mt-1 text-sm text-neutron/55">
                  Lessons for {data.world.name} arrive in a future content drop.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {data.lessons.map((l, i) => (
                  <LessonRow
                    key={l.slug}
                    lesson={l}
                    worldSlug={worldSlug}
                    basePath={basePath}
                    accent={palette.accent}
                    index={i}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
