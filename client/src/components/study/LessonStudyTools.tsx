import { useEffect, useRef, useState } from "react";
import { Layers } from "lucide-react";
import { studyApi } from "../../lib/study";
import { useXp } from "../../store/xp";

/** Per-lesson notebook + "add to flashcards" — shown inside the lesson viewer. */
export function LessonStudyTools({ slug }: { slug: string }) {
  const [content, setContent] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [saved, setSaved] = useState<"idle" | "saving" | "saved">("idle");
  const [generating, setGenerating] = useState(false);
  const timer = useRef<number>();
  const pushToast = useXp((s) => s.push);

  useEffect(() => {
    studyApi.getNote(slug).then((c) => {
      setContent(c);
      setLoaded(true);
    });
  }, [slug]);

  function onChange(v: string) {
    setContent(v);
    setSaved("saving");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      studyApi.saveNote(slug, v).then(() => setSaved("saved")).catch(() => setSaved("idle"));
    }, 700);
  }

  async function addFlashcards() {
    setGenerating(true);
    try {
      const res = await studyApi.generateFromLesson(slug);
      pushToast({
        kind: "bonus",
        title: res.alreadyExists ? "Already in flashcards" : `${res.created} flashcards added`,
        detail: res.deck,
      });
    } finally {
      setGenerating(false);
    }
  }

  return (
    <section className="glass px-5 py-6 sm:px-8">
      <div className="mb-2 flex items-center justify-between">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-nebula">Your notebook</p>
        <span className="text-xs text-neutron/40">
          {saved === "saving" ? "Saving…" : saved === "saved" ? "Saved ✓" : ""}
        </span>
      </div>
      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        disabled={!loaded}
        placeholder="Jot down notes for this lesson — they autosave and live in your Notebook."
        rows={4}
        className="w-full resize-y rounded-lg border border-neutron/15 bg-space/70 px-3 py-2 text-sm outline-none focus:border-cosmic"
      />
      <button
        onClick={addFlashcards}
        disabled={generating}
        className="mt-3 inline-flex items-center gap-2 rounded-lg border border-neutron/15 px-4 py-2 text-sm font-semibold text-neutron hover:border-cosmic hover:text-white disabled:opacity-50"
      >
        <Layers size={15} strokeWidth={1.75} /> {generating ? "Adding…" : "Add this lesson to flashcards"}
      </button>
    </section>
  );
}
