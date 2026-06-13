import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FlaskConical, ChevronDown } from "lucide-react";
import { Markdown } from "../../ui/Markdown";

/** Optional advanced section — collapsed by default to keep the main flow tight. */
export function DeeperDive({ title, markdown }: { title?: string | null; markdown: string }) {
  const [open, setOpen] = useState(false);
  return (
    <section className="rounded-2xl border border-cosmic/25 bg-cosmic/5">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          <FlaskConical size={17} strokeWidth={1.6} className="text-[#C9B6FF]" />
          <span className="font-display font-semibold">{title ?? "Deeper dive"}</span>
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} className="text-neutron/50">
          <ChevronDown size={18} />
        </motion.span>
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
            <div className="px-5 pb-5">
              <Markdown>{markdown}</Markdown>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
