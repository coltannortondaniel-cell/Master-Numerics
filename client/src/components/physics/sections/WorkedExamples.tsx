import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { WorkedExample } from "../../../lib/physics";
import { Markdown } from "../../ui/Markdown";

function ExampleCard({ ex, index }: { ex: WorkedExample; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-neutron/10 bg-space/50 p-5">
      <div className="flex items-start gap-3">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-cosmic/25 font-display text-sm font-bold text-[#C9B6FF]">
          {index + 1}
        </span>
        <div className="min-w-0 flex-1">
          <h4 className="font-display font-semibold">{ex.title}</h4>
          <div className="mt-1 text-neutron/80">
            <Markdown>{ex.problem}</Markdown>
          </div>
        </div>
      </div>

      <button
        onClick={() => setOpen((o) => !o)}
        className="mt-3 text-sm font-semibold text-nebula hover:text-white transition-colors"
        aria-expanded={open}
      >
        {open ? "Hide solution" : "Show solution →"}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <ol className="mt-3 space-y-2 border-l-2 border-cosmic/40 pl-4">
              {ex.steps.map((s, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="text-sm text-neutron/75"
                >
                  <Markdown>{s}</Markdown>
                </motion.li>
              ))}
            </ol>
            <div className="mt-3 rounded-lg bg-success/10 px-4 py-3 text-sm">
              <span className="font-mono text-[0.7rem] uppercase tracking-widest text-success">
                Answer
              </span>
              <div className="mt-1 text-neutron/90">
                <Markdown>{ex.answer}</Markdown>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function WorkedExamples({ title, examples }: { title?: string | null; examples: WorkedExample[] }) {
  return (
    <section className="glass px-5 py-6 sm:px-8 sm:py-7">
      <p className="mb-1 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-solar">
        Worked examples
      </p>
      {title && <h3 className="mb-4 font-display text-2xl font-bold">{title}</h3>}
      <div className="flex flex-col gap-3">
        {examples.map((ex, i) => (
          <ExampleCard key={i} ex={ex} index={i} />
        ))}
      </div>
    </section>
  );
}
