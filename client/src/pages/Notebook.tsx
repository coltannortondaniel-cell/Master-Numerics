import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { studyApi, type NoteSummary } from "../lib/study";
import { parseApiError } from "../lib/api";
import { CosmicBackground } from "../components/physics/CosmicBackground";
import { JourneyHeader } from "../components/layout/JourneyHeader";

const basePath = (subject: string) => (subject === "MATH" ? "/city" : "/journey");

export default function Notebook() {
  const [notes, setNotes] = useState<NoteSummary[] | null>(null);
  const [q, setQ] = useState("");
  const [error, setError] = useState("");
  const timer = useRef<number>();

  useEffect(() => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      studyApi
        .listNotes(q.trim() || undefined)
        .then(setNotes)
        .catch((e) => setError(parseApiError(e).message));
    }, 250);
    return () => window.clearTimeout(timer.current);
  }, [q]);

  return (
    <div className="relative min-h-screen">
      <CosmicBackground palette={{ accent: "#1E90FF", glow: "#6B21D6" }} />
      <JourneyHeader back={{ to: "/dashboard", label: "Dashboard" }} />
      <main className="relative z-10 mx-auto max-w-2xl px-4 sm:px-6 py-10">
        <div className="text-center mb-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-nebula">Study</p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold">Notebook</h1>
        </div>

        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search your notes…"
          className="mb-5 w-full rounded-lg border border-neutron/15 bg-space/70 px-4 py-2.5 text-sm outline-none focus:border-cosmic"
        />

        {error && <p className="mb-4 text-sm text-alert">{error}</p>}

        {!notes ? (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="skeleton h-24 w-full" />
            ))}
          </div>
        ) : notes.length === 0 ? (
          <div className="glass px-6 py-10 text-center">
            <p className="text-3xl">📓</p>
            <p className="mt-2 font-display font-semibold">No notes yet</p>
            <p className="mt-1 text-sm text-neutron/55">
              Open any lesson and use the notebook panel — your notes collect here.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {notes.map((n) => (
              <Link
                key={n.lessonSlug}
                to={`${basePath(n.subject)}/${n.worldSlug}/${n.lessonSlug}`}
                className="glass block px-5 py-4 transition-all hover:border-cosmic/40 hover:shadow-glow"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-display font-semibold">{n.lessonTitle}</p>
                  <span className="text-xs text-neutron/40">{new Date(n.updatedAt).toLocaleDateString()}</span>
                </div>
                <p className="text-xs text-neutron/45">{n.worldName}</p>
                <p className="mt-2 line-clamp-3 whitespace-pre-wrap text-sm text-neutron/70">{n.content}</p>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
