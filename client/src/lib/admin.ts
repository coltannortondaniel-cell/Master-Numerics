import { api } from "./api";

export interface AdminOverview {
  totalUsers: number;
  dau: number;
  mau: number;
  activeSubscriptions: number;
  mrr: number;
  lessonsCompleted: number;
  battles: number;
  cratesOpened: number;
}
export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: "USER" | "ADMIN";
  banned: boolean;
  xp: number;
  coins: number;
  subscription: string | null;
  createdAt: string;
}
export interface AdminLesson {
  slug: string;
  title: string;
  world: string;
  subject: string;
  published: boolean;
}

export const adminApi = {
  async overview(): Promise<AdminOverview> {
    const { data } = await api.get<AdminOverview>("/admin/overview");
    return data;
  },
  async users(q?: string): Promise<AdminUser[]> {
    const { data } = await api.get<{ users: AdminUser[] }>("/admin/users", { params: q ? { q } : {} });
    return data.users;
  },
  async updateUser(id: string, patch: { xpDelta?: number; coinDelta?: number; banned?: boolean; role?: "USER" | "ADMIN" }) {
    const { data } = await api.patch(`/admin/users/${id}`, patch);
    return data.user as { id: string; xp: number; coins: number; banned: boolean; role: "USER" | "ADMIN" };
  },
  async grant(id: string, cosmeticKey: string): Promise<void> {
    await api.post(`/admin/users/${id}/grant`, { cosmeticKey });
  },
  async lessons(): Promise<AdminLesson[]> {
    const { data } = await api.get<{ lessons: AdminLesson[] }>("/admin/lessons");
    return data.lessons;
  },
  async updateLesson(slug: string, published: boolean): Promise<void> {
    await api.patch(`/admin/lessons/${slug}`, { published });
  },
};
