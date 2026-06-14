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
export interface DailyStatus {
  streak: number;
  todayXp: number;
  dailyGoalXp: number;
}
export interface DashboardSummary {
  username: string;
  xp: number;
  coins: number;
  streak: number;
  dailyGoalXp: number;
  todayXp: number;
  stats: { lessonsCompleted: number; lessonsMastered: number; accuracy: number | null; studyTimeSec: number };
  continue: { physics: ContinueTarget | null; math: ContinueTarget | null };
  challenges: { daily: Challenge[]; weekly: Challenge };
  activity: { username: string; text: string; at: string | null }[];
  unreadNotifications: number;
}

/** The four selectable daily goals (XP target ↔ rough minutes). */
export const DAILY_GOALS = [
  { xp: 20, label: "Casual", minutes: 5 },
  { xp: 50, label: "Regular", minutes: 10 },
  { xp: 100, label: "Serious", minutes: 20 },
  { xp: 150, label: "Intense", minutes: 30 },
] as const;

export const dashboardApi = {
  async get(): Promise<DashboardSummary> {
    const { data } = await api.get<DashboardSummary>("/dashboard");
    return data;
  },
  async daily(): Promise<DailyStatus> {
    const { data } = await api.get<DailyStatus>("/dashboard/daily");
    return data;
  },
  async setGoal(goalXp: number): Promise<{ dailyGoalXp: number }> {
    const { data } = await api.post("/dashboard/daily-goal", { goalXp });
    return data;
  },
  async claim(key: string): Promise<{ coins: number; xp: number; coin: number }> {
    const { data } = await api.post("/dashboard/challenges/claim", { key });
    return data;
  },
};
