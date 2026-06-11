import { api } from "./api";

export interface Achievement {
  key: string;
  name: string;
  description: string;
  category: string;
  xpReward: number;
  coinReward: number;
  threshold: number;
  secret: boolean;
  earned: boolean;
  earnedAt: string | null;
  progress: number;
}

export interface AchievementsResponse {
  achievements: Achievement[];
  earned: number;
  total: number;
}

export const achievementsApi = {
  async list(): Promise<AchievementsResponse> {
    const { data } = await api.get<AchievementsResponse>("/achievements");
    return data;
  },
};
