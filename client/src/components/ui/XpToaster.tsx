import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useXp, type XpToast } from "../../store/xp";

const ICONS: Record<XpToast["kind"], string> = {
  xp: "✦",
  bonus: "★",
  mastery: "👑",
};

const ACCENTS: Record<XpToast["kind"], string> = {
  xp: "border-cosmic/50 shadow-[0_0_28px_rgba(107,33,214,0.5)]",
  bonus: "border-solar/50 shadow-[0_0_28px_rgba(255,184,0,0.45)]",
  mastery: "border-success/50 shadow-[0_0_28px_rgba(34,211,160,0.45)]",
};

function ToastRow({ toast }: { toast: XpToast }) {
  const dismiss = useXp((s) => s.dismiss);
  useEffect(() => {
    const t = setTimeout(() => dismiss(toast.id), 4200);
    return () => clearTimeout(t);
  }, [toast.id, dismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 60, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 60, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
      className={`glass flex items-center gap-3 px-4 py-3 border ${ACCENTS[toast.kind]}`}
      role="status"
    >
      <span className="text-2xl leading-none" aria-hidden>
        {ICONS[toast.kind]}
      </span>
      <div className="min-w-0">
        <p className="font-display font-semibold text-sm leading-tight">{toast.title}</p>
        {toast.detail && <p className="text-xs text-neutron/60">{toast.detail}</p>}
      </div>
      {toast.amount != null && (
        <span className="ml-2 font-mono font-bold text-solar tabular-nums whitespace-nowrap">
          +{toast.amount} XP
        </span>
      )}
    </motion.div>
  );
}

/** Bottom-right toast stack for XP gains, bonuses, and mastery. Mounted once in App. */
export function XpToaster() {
  const toasts = useXp((s) => s.toasts);
  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 w-[min(20rem,calc(100vw-2.5rem))]">
      <AnimatePresence initial={false}>
        {toasts.map((t) => (
          <ToastRow key={t.id} toast={t} />
        ))}
      </AnimatePresence>
    </div>
  );
}
