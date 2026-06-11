import { api } from "./api";
import type { Rarity } from "./rarity";

export interface AvatarLayers {
  outfit: string | null;
  hat: string | null;
  aura: string | null;
  pet: string | null;
  background: string | null;
}

export interface OwnedCosmetic {
  key: string;
  name: string;
  type: string;
  rarity: Rarity;
  description: string;
  equipped: boolean;
}

export interface MeResponse {
  avatarColor: string;
  title: string | null;
  badge: string | null;
  avatar: AvatarLayers;
  cosmetics: OwnedCosmetic[];
}

export interface ProfileResponse {
  username: string;
  xp: number;
  avatarColor: string;
  joinedAt: string;
  title: string | null;
  badge: string | null;
  avatar: AvatarLayers;
  stats: {
    lessonsCompleted: number;
    lessonsMastered: number;
    battlesWon: number;
    achievementsEarned: number;
    cosmeticsOwned: number;
  };
  activity: { type: string; text: string; at: string | null }[];
}

export const profileApi = {
  async me(): Promise<MeResponse> {
    const { data } = await api.get<MeResponse>("/profile/me");
    return data;
  },
  async get(username: string): Promise<ProfileResponse> {
    const { data } = await api.get<ProfileResponse>(`/profile/${username}`);
    return data;
  },
  async equip(key: string): Promise<void> {
    await api.post("/profile/equip", { key });
  },
  async unequip(key: string): Promise<void> {
    await api.post("/profile/unequip", { key });
  },
  async setColor(color: string): Promise<void> {
    await api.patch("/profile/color", { color });
  },
};
