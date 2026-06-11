import { api } from "./api";

export interface Notification {
  id: string;
  type: string;
  title: string;
  body: string | null;
  link: string | null;
  read: boolean;
  createdAt: string;
}

export const notificationsApi = {
  async list(): Promise<{ unread: number; notifications: Notification[] }> {
    const { data } = await api.get("/notifications");
    return data;
  },
  async markRead(id?: string): Promise<void> {
    await api.post("/notifications/read", null, { params: id ? { id } : {} });
  },
};
