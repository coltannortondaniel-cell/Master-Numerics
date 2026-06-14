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
  /** Latest known NumCoins balance (optimistic). */
  coins: number | null;
  /** Daily-goal + streak status (populated from /dashboard/daily). */
  streak: number | null;
  todayXp: number | null;
  dailyGoalXp: number | null;
  toasts: XpToast[];
  setTotalXp: (xp: number) => void;
  setCoins: (coins: number) => void;
  setDaily: (d: { streak: number; todayXp: number; dailyGoalXp: number }) => void;
  setGoalXp: (goalXp: number) => void;
  /** Queue a toast; auto-dismisses via the Toaster component. */
  push: (toast: Omit<XpToast, "id">) => void;
  dismiss: (id: number) => void;
}

let seq = 1;

export const useXp = create<XpState>((set) => ({
  totalXp: null,
  coins: null,
  streak: null,
  todayXp: null,
  dailyGoalXp: null,
  toasts: [],
  setTotalXp: (xp) => set({ totalXp: xp }),
  setCoins: (coins) => set({ coins }),
  setDaily: (d) => set({ streak: d.streak, todayXp: d.todayXp, dailyGoalXp: d.dailyGoalXp }),
  setGoalXp: (goalXp) => set({ dailyGoalXp: goalXp }),
  push: (toast) => set((s) => ({ toasts: [...s.toasts, { ...toast, id: seq++ }] })),
  dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
