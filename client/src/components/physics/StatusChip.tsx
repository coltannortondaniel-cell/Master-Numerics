import { CircleDashed, Check, Crown, type LucideIcon } from "lucide-react";
import type { ProgressStatus } from "../../lib/physics";

const MAP: Record<ProgressStatus, { label: string; cls: string; Icon: LucideIcon }> = {
  STARTED: { label: "In progress", cls: "bg-solar/15 text-solar", Icon: CircleDashed },
  COMPLETED: { label: "Complete", cls: "bg-success/15 text-success", Icon: Check },
  MASTERED: { label: "Mastered", cls: "bg-cosmic/20 text-[#C9B6FF]", Icon: Crown },
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
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.7rem] font-semibold ${s.cls}`}>
      <s.Icon size={12} strokeWidth={2} />
      {s.label}
    </span>
  );
}
