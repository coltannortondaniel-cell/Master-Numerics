import { api } from "./api";

export interface ContinueTarget {
  worldSlug: string;
  worldName: string;
  lessonSlug: string;
  title: string;
}
export interface Challenge {
  key: string;
  label: string;
  goal: number;
  progress: number;
  coin: number;
  xp: number;
  period: "daily" | "weekly";
  claimed: boolean;
  canClaim: boolean;
}
export interface DashboardSummary {
  username: string;
  xp: number;
  coins: number;
  streak: number;
  stats: { lessonsCompleted: number; lessonsMastered: number; accuracy: number | null; studyTimeSec: number };
  continue: { physics: ContinueTarget | null; math: ContinueTarget | null };
  challenges: { daily: Challenge[]; weekly: Challenge };
  activity: { username: string; text: string; at: string | null }[];
  unreadNotifications: number;
}

export const dashboardApi = {
  async get(): Promise<DashboardSummary> {
    const { data } = await api.get<DashboardSummary>("/dashboard");
    return data;
  },
  async claim(key: string): Promise<{ coins: number; xp: number; coin: number }> {
    const { data } = await api.post("/dashboard/challenges/claim", { key });
    return data;
  },
};
