import { create } from "zustand";
import { api, setAccessToken, parseApiError } from "../lib/api";

export interface User {
  id: string;
  email: string;
  username: string;
  gradeLevel: string;
  role: "USER" | "ADMIN";
  trialEndsAt: string;
  createdAt: string;
}

export interface Subscription {
  status: "ACTIVE" | "TRIALING" | "PAST_DUE" | "CANCELED" | "INCOMPLETE";
  plan: "MONTHLY" | "YEARLY";
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

interface AuthState {
  user: User | null;
  subscription: Subscription | null;
  /** True until the initial silent-refresh attempt finishes. */
  initializing: boolean;
  bootstrap: () => Promise<void>;
  login: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  register: (input: {
    email: string;
    username: string;
    password: string;
    dateOfBirth: string;
    gradeLevel: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  refreshEntitlement: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  subscription: null,
  initializing: true,

  /** Runs once on app load — restores the session from the refresh cookie. */
  bootstrap: async () => {
    try {
      const { data } = await api.post("/auth/refresh");
      setAccessToken(data.accessToken);
      set({ user: data.user, subscription: data.subscription ?? null });
    } catch {
      set({ user: null, subscription: null });
    } finally {
      set({ initializing: false });
    }
  },

  login: async (email, password, rememberMe) => {
    try {
      const { data } = await api.post("/auth/login", { email, password, rememberMe });
      setAccessToken(data.accessToken);
      set({ user: data.user });
      await useAuth.getState().refreshEntitlement();
    } catch (err) {
      throw parseApiError(err);
    }
  },

  register: async (input) => {
    try {
      const { data } = await api.post("/auth/register", input);
      setAccessToken(data.accessToken);
      set({ user: data.user, subscription: null });
    } catch (err) {
      throw parseApiError(err);
    }
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      setAccessToken(null);
      set({ user: null, subscription: null });
    }
  },

  refreshEntitlement: async () => {
    try {
      const { data } = await api.get("/billing/status");
      set((s) => ({
        subscription: data.subscription,
        user: s.user ? { ...s.user, trialEndsAt: data.trialEndsAt } : s.user,
      }));
    } catch {
      /* non-fatal */
    }
  },
}));

/** Does the user currently have access to premium content? */
export function hasEntitlement(user: User | null, sub: Subscription | null): boolean {
  if (!user) return false;
  const now = Date.now();
  if (new Date(user.trialEndsAt).getTime() > now) return true;
  return (
    !!sub &&
    (sub.status === "ACTIVE" || sub.status === "TRIALING") &&
    new Date(sub.currentPeriodEnd).getTime() > now
  );
}
