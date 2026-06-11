import { api } from "./api";

export type LeaderScope = "global" | "friends";
export type LeaderPeriod = "all" | "week" | "month";
export type Relation = "none" | "friends" | "pending_out" | "pending_in";

export interface LeaderEntry {
  rank: number;
  id: string;
  username: string;
  xp: number;
  isMe: boolean;
}
export interface LeaderboardResponse {
  scope: LeaderScope;
  period: LeaderPeriod;
  entries: LeaderEntry[];
  me: { rank: number | null; xp: number };
}

export interface UserLite {
  id: string;
  username: string;
  xp: number;
}
export interface SearchUser extends UserLite {
  relation: Relation;
}
export interface FriendsResponse {
  friends: UserLite[];
  incoming: { friendshipId: string; user: UserLite }[];
  outgoing: { friendshipId: string; user: UserLite }[];
}

export const socialApi = {
  async leaderboard(scope: LeaderScope, period: LeaderPeriod): Promise<LeaderboardResponse> {
    const { data } = await api.get<LeaderboardResponse>("/social/leaderboard", {
      params: { scope, period },
    });
    return data;
  },
  async search(q: string): Promise<SearchUser[]> {
    const { data } = await api.get<{ users: SearchUser[] }>("/social/users/search", { params: { q } });
    return data.users;
  },
  async friends(): Promise<FriendsResponse> {
    const { data } = await api.get<FriendsResponse>("/social/friends");
    return data;
  },
  async request(username: string): Promise<void> {
    await api.post("/social/friends/request", { username });
  },
  async respond(friendshipId: string, accept: boolean): Promise<void> {
    await api.post(`/social/friends/${friendshipId}/${accept ? "accept" : "decline"}`);
  },
  async remove(friendshipId: string): Promise<void> {
    await api.delete(`/social/friends/${friendshipId}`);
  },
};
