import { create } from "zustand";

export type ToastKind = "xp" | "bonus" | "mastery";

export interface XpToast {
  id: number;
  kind: ToastKind;
  amount?: number;
  title: string;
  detail?: string;
}

interface XpState {
  /** Latest known total XP for the signed-in user (optimistic). */
  totalXp: number | null;
  toasts: XpToast[];
  setTotalXp: (xp: number) => void;
  /** Queue a toast; auto-dismisses via the Toaster component. */
  push: (toast: Omit<XpToast, "id">) => void;
  dismiss: (id: number) => void;
}

let seq = 1;

export const useXp = create<XpState>((set) => ({
  totalXp: null,
  toasts: [],
  setTotalXp: (xp) => set({ totalXp: xp }),
  push: (toast) => set((s) => ({ toasts: [...s.toasts, { ...toast, id: seq++ }] })),
  dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
