import type { ProgressStatus } from "../../lib/physics";

const MAP: Record<ProgressStatus, { label: string; cls: string; icon: string }> = {
  STARTED: { label: "In progress", cls: "bg-solar/15 text-solar", icon: "◐" },
  COMPLETED: { label: "Complete", cls: "bg-success/15 text-success", icon: "✓" },
  MASTERED: { label: "Mastered", cls: "bg-cosmic/20 text-[#C9B6FF]", icon: "👑" },
};

export function StatusChip({ status }: { status: ProgressStatus | null }) {
  if (!status) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-[0.7rem] font-medium text-neutron/45">
        Not started
      </span>
    );
  }
  const s = MAP[status];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.7rem] font-semibold ${s.cls}`}
    >
      <span aria-hidden>{s.icon}</span>
      {s.label}
    </span>
  );
}
