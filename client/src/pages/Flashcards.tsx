import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, CheckCircle2 } from "lucide-react";
import { studyApi, type Deck, type ReviewCard } from "../lib/study";
import { parseApiError } from "../lib/api";
import { Markdown } from "../components/ui/Markdown";
import { CosmicBackground } from "../components/physics/CosmicBackground";
import { JourneyHeader } from "../components/layout/JourneyHeader";
import { Button } from "../components/ui/Button";

const GRADES = [
  { q: 0, label: "Again", color: "#FF4757" },
  { q: 3, label: "Hard", color: "#FFB800" },
  { q: 4, label: "Good", color: "#22D3A0" },
  { q: 5, label: "Easy", color: "#1E90FF" },
];

export default function Flashcards() {
  const [decks, setDecks] = useState<Deck[] | null>(null);
  const [error, setError] = useState("");
  const [queue, setQueue] = useState<ReviewCard[] | null>(null);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);

  function loadDecks() {
    studyApi.decks().then(setDecks).catch((e) => setError(parseApiError(e).message));
  }
  useEffect(loadDecks, []);

  async function startReview(deck?: string) {
    const cards = await studyApi.due(deck);
    setQueue(cards);
    setIdx(0);
    setFlipped(false);
    setReviewedCount(0);
  }

  async function grade(q: number) {
    if (!queue) return;
    const card = queue[idx];
    await studyApi.review(card.id, q);
    setReviewedCount((c) => c + 1);
    if (idx + 1 >= queue.length) {
      setQueue([]); // finished
    } else {
      setIdx((i) => i + 1);
      setFlipped(false);
    }
  }

  const inReview = queue !== null;
  const current = queue && queue[idx];

  return (
    <div className="relative min-h-screen">
      <CosmicBackground palette={{ accent: "#B07CFF", glow: "#1E90FF" }} />
      <JourneyHeader back={{ to: "/dashboard", label: "Dashboard" }} />
      <main className="relative z-10 mx-auto max-w-2xl px-4 sm:px-6 py-10">
        <div className="text-center mb-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#C9B6FF]">Spaced repetition</p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold">Flashcards</h1>
        </div>

        {error && <p className="mb-4 text-sm text-alert">{error}</p>}

        {!inReview ? (
          !decks ? (
            <div className="flex flex-col gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="skeleton h-16 w-full" />
              ))}
            </div>
          ) : decks.length === 0 ? (
            <div className="glass px-6 py-10 text-center">
              <Layers size={30} strokeWidth={1.4} className="mx-auto text-neutron/40" />
              <p className="mt-2 font-display font-semibold">No decks yet</p>
              <p className="mt-1 text-sm text-neutron/55">
                Open a lesson and tap “Add this lesson to flashcards” to build your first deck.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {decks.some((d) => d.due > 0) && (
                <Button onClick={() => startReview()} className="w-full">
                  Review all due ({decks.reduce((s, d) => s + d.due, 0)})
                </Button>
              )}
              {decks.map((d) => (
                <div key={d.deck} className="glass flex items-center justify-between px-5 py-4">
                  <div>
                    <p className="font-display font-semibold">{d.deck}</p>
                    <p className="text-xs text-neutron/45">
                      {d.total} cards · {d.due > 0 ? <span className="text-solar">{d.due} due</span> : "none due"}
                    </p>
                  </div>
                  <Button variant="ghost" disabled={d.due === 0} onClick={() => startReview(d.deck)}>
                    Review
                  </Button>
                </div>
              ))}
            </div>
          )
        ) : queue && queue.length === 0 ? (
          <div className="glass px-6 py-10 text-center">
            <CheckCircle2 size={44} strokeWidth={1.4} className="mx-auto text-success" />
            <p className="mt-2 font-display text-xl font-bold">
              {reviewedCount > 0 ? "Review complete!" : "Nothing due right now"}
            </p>
            {reviewedCount > 0 && <p className="text-sm text-neutron/55">You reviewed {reviewedCount} cards.</p>}
            <div className="mt-4">
              <Button onClick={() => { setQueue(null); loadDecks(); }}>Back to decks</Button>
            </div>
          </div>
        ) : current ? (
          <div>
            <p className="mb-3 text-center font-mono text-xs text-neutron/40">
              {idx + 1} / {queue!.length} · {current.deck}
            </p>
            <div
              onClick={() => setFlipped((f) => !f)}
              className="glass min-h-[180px] cursor-pointer px-6 py-8 text-center"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={flipped ? "back" : "front"}
                  initial={{ rotateX: 90, opacity: 0 }}
                  animate={{ rotateX: 0, opacity: 1 }}
                  exit={{ rotateX: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <p className="mb-2 font-mono text-[0.65rem] uppercase tracking-widest text-neutron/40">
                    {flipped ? "Answer" : "Prompt"}
                  </p>
                  <div className="text-lg font-medium">
                    <Markdown>{flipped ? current.back : current.front}</Markdown>
                  </div>
                </motion.div>
              </AnimatePresence>
              {!flipped && <p className="mt-4 text-xs text-neutron/40">Tap to reveal</p>}
            </div>

            {flipped ? (
              <div className="mt-4 grid grid-cols-4 gap-2">
                {GRADES.map((g) => (
                  <button
                    key={g.q}
                    onClick={() => grade(g.q)}
                    className="rounded-lg py-3 text-sm font-semibold text-space"
                    style={{ background: g.color }}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            ) : (
              <Button onClick={() => setFlipped(true)} className="mt-4 w-full">
                Show answer
              </Button>
            )}
          </div>
        ) : null}
      </main>
    </div>
  );
}
