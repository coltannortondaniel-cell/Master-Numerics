import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Play, Pause, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

export interface ExplainerBeat {
  caption: string;
  /** An animated visual (e.g. a motion SVG) — remounted when the beat changes. */
  visual: ReactNode;
}

interface Props {
  title?: string | null;
  beats: ExplainerBeat[];
  /** Seconds each beat is shown while auto-playing. */
  beatSeconds?: number;
}

/**
 * Our on-brand replacement for embedded video: a stepped, captioned animated
 * explainer. Each beat is a hand-built motion graphic. Auto-plays (unless the
 * user prefers reduced motion) and is fully steppable by hand. The beat API is
 * deliberately render-agnostic, so a Lottie animation can be dropped in as the
 * `visual` of any beat without changing this shell.
 */
export function AnimatedExplainer({ title, beats, beatSeconds = 5 }: Props) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(!reduce);
  const last = i === beats.length - 1;

  useEffect(() => {
    if (!playing || last) return;
    const id = window.setTimeout(() => setI((n) => n + 1), beatSeconds * 1000);
    return () => window.clearTimeout(id);
  }, [playing, i, last, beatSeconds]);

  useEffect(() => {
    if (last) setPlaying(false);
  }, [last]);

  const beat = beats[i];

  return (
    <section className="glass overflow-hidden px-5 py-6 sm:px-8 sm:py-7">
      <p className="mb-1 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-nebula">
        Watch it move
      </p>
      {title && <h3 className="mb-4 font-display text-2xl font-bold">{title}</h3>}

      {/* stage */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-line/10 bg-base/50">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center p-4"
          >
            {beat.visual}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* caption */}
      <div className="mt-4 min-h-[3rem]">
        <AnimatePresence mode="wait">
          <motion.p
            key={i}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="text-fg/80"
          >
            {beat.caption}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* controls */}
      <div className="mt-4 flex items-center gap-4">
        <button
          aria-label="Previous"
          disabled={i === 0}
          onClick={() => setI((n) => Math.max(0, n - 1))}
          className="text-fg/55 hover:text-fg disabled:opacity-30"
        >
          <ChevronLeft size={20} />
        </button>

        {last ? (
          <button
            aria-label="Replay"
            onClick={() => {
              setI(0);
              setPlaying(true);
            }}
            className="text-accent hover:text-accent-bright"
          >
            <RotateCcw size={20} />
          </button>
        ) : (
          <button
            aria-label={playing ? "Pause" : "Play"}
            onClick={() => setPlaying((p) => !p)}
            className="grid h-9 w-9 place-items-center rounded-full bg-accent text-white"
          >
            {playing ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
          </button>
        )}

        <button
          aria-label="Next"
          disabled={last}
          onClick={() => setI((n) => Math.min(beats.length - 1, n + 1))}
          className="text-fg/55 hover:text-fg disabled:opacity-30"
        >
          <ChevronRight size={20} />
        </button>

        {/* progress dots */}
        <div className="ml-auto flex gap-1.5">
          {beats.map((_, n) => (
            <button
              key={n}
              aria-label={`Go to beat ${n + 1}`}
              onClick={() => setI(n)}
              className={`h-1.5 rounded-full transition-all ${
                n === i ? "w-5 bg-accent" : "w-1.5 bg-line/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
