import { useCallback, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Printer, RefreshCw, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { worksheetApi, type WorksheetData } from "../lib/worksheet";
import { parseApiError } from "../lib/api";
import { Markdown } from "../components/ui/Markdown";
import { Difficulty } from "../components/ui/Difficulty";

const LETTERS = "ABCDEFGH";

/**
 * A printable practice sheet for one lesson. "Print / Save as PDF" uses the
 * browser's own print dialog (fully local, no PDF library). "Regenerate" pulls
 * a freshly shuffled set, so a learner or teacher gets unlimited worksheets.
 */
export default function Worksheet() {
  const { slug = "" } = useParams();
  const [data, setData] = useState<WorksheetData | null>(null);
  const [error, setError] = useState("");
  const [showKey, setShowKey] = useState(true);

  const load = useCallback(() => {
    worksheetApi.get(slug).then(setData).catch((e) => setError(parseApiError(e).message));
  }, [slug]);

  useEffect(() => { load(); }, [load]);

  if (error) return <div className="mx-auto max-w-2xl p-8 text-center text-alert">{error}</div>;
  if (!data) return <div className="mx-auto max-w-2xl p-8"><div className="skeleton h-96 w-full" /></div>;

  return (
    <div className="min-h-screen bg-base">
      {/* Toolbar — hidden when printing */}
      <div className="no-print sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 border-b border-line/15 bg-surface/80 px-5 py-3 backdrop-blur">
        <Link to={`/journey`} className="flex items-center gap-1.5 text-sm text-fg/60 hover:text-fg">
          <ArrowLeft size={16} /> Back
        </Link>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowKey((s) => !s)} className="flex items-center gap-1.5 rounded-lg border border-line/15 px-3 py-1.5 text-sm hover:border-line/40">
            {showKey ? <EyeOff size={15} /> : <Eye size={15} />} {showKey ? "Hide" : "Show"} answer key
          </button>
          <button onClick={load} className="flex items-center gap-1.5 rounded-lg border border-line/15 px-3 py-1.5 text-sm hover:border-line/40">
            <RefreshCw size={15} /> Regenerate
          </button>
          <button onClick={() => window.print()} className="flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-white hover:brightness-110">
            <Printer size={15} /> Print / Save PDF
          </button>
        </div>
      </div>

      {/* The sheet */}
      <div className="worksheet mx-auto max-w-2xl px-8 py-10 text-fg">
        <header className="mb-6 border-b border-line/20 pb-4">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-fg/45">{data.worldName} · Worksheet</p>
          <h1 className="mt-1 font-display text-2xl font-bold">{data.title}</h1>
          <p className="text-sm text-fg/60">{data.tagline}</p>
          <div className="mt-3 flex items-center gap-6 text-sm text-fg/55">
            <span>Name: ______________________</span>
            <span>Date: ____________</span>
          </div>
        </header>

        <ol className="space-y-6">
          {data.questions.map((q) => (
            <li key={q.number} className="break-inside-avoid">
              <div className="flex items-start gap-3">
                <span className="font-display font-bold">{q.number}.</span>
                <div className="min-w-0 flex-1">
                  <div className="font-medium"><Markdown>{q.prompt}</Markdown></div>
                  {q.options && (q.kind === "MCQ") && (
                    <ol className="mt-2 grid grid-cols-1 gap-1 sm:grid-cols-2">
                      {q.options.map((o, i) => (
                        <li key={i} className="flex items-baseline gap-2 text-sm">
                          <span className="font-mono text-fg/50">{LETTERS[i]})</span> <Markdown>{o}</Markdown>
                        </li>
                      ))}
                    </ol>
                  )}
                  {(q.kind === "ORDER" || q.kind === "PROOF") && q.options && (
                    <ul className="mt-2 space-y-1 text-sm text-fg/70">
                      {q.options.map((o, i) => (
                        <li key={i} className="flex gap-2"><span className="text-fg/40">▢</span> <Markdown>{o}</Markdown></li>
                      ))}
                    </ul>
                  )}
                  {(q.kind === "NUMERIC" || q.kind === "SYMBOLIC" || q.kind === "GRAPH" || q.kind === "FILL_BLANK") && (
                    <div className="mt-3 h-10 rounded border border-dashed border-line/30" />
                  )}
                </div>
                <Difficulty level={q.difficulty} />
              </div>
            </li>
          ))}
        </ol>

        {showKey && (
          <section className="mt-10 break-before-page border-t border-line/20 pt-4">
            <h2 className="mb-3 font-display text-lg font-bold">Answer key</h2>
            <ol className="grid grid-cols-1 gap-1.5 text-sm sm:grid-cols-2">
              {data.questions.map((q) => (
                <li key={q.number} className="flex gap-2">
                  <span className="font-mono text-fg/50">{q.number}.</span>
                  <span className="min-w-0"><Markdown>{q.answer || "—"}</Markdown></span>
                </li>
              ))}
            </ol>
          </section>
        )}

        <p className="no-print mt-10 text-center text-xs text-fg/40">
          Generated by Master Numerics · use “Regenerate” for a fresh set
        </p>
      </div>
    </div>
  );
}
