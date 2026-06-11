import { api } from "./api";
import type { Rarity } from "./rarity";

export interface GrantedAchievement {
  key: string;
  name: string;
  xpReward: number;
  coinReward: number;
}

export interface Crate {
  key: string;
  name: string;
  cost: number;
  blurb: string;
  odds: Partial<Record<Rarity, number>>;
}

export interface CosmeticBrief {
  key: string;
  name: string;
  type: string;
  rarity: Rarity;
  description: string;
}

export interface FeaturedCosmetic extends CosmeticBrief {
  coinPrice: number;
  owned: boolean;
}

export interface StoreResponse {
  coins: number;
  crates: Crate[];
  featured: FeaturedCosmetic[];
}

export interface CrateResult {
  rarity: Rarity;
  cosmetic: CosmeticBrief;
  duplicate: boolean;
  refund: number;
  newBalance: number;
  pity: boolean;
  achievements: GrantedAchievement[];
}

export interface InventoryItem extends CosmeticBrief {
  equipped: boolean;
  acquiredAt: string;
}

export const storeApi = {
  async get(): Promise<StoreResponse> {
    const { data } = await api.get<StoreResponse>("/store");
    return data;
  },
  async openCrate(crateKey: string): Promise<CrateResult> {
    const { data } = await api.post<CrateResult>("/store/crates/open", { crateKey });
    return data;
  },
  async inventory(): Promise<InventoryItem[]> {
    const { data } = await api.get<{ cosmetics: InventoryItem[] }>("/store/inventory");
    return data.cosmetics;
  },
  async buy(key: string): Promise<{ newBalance: number; cosmetic: CosmeticBrief; achievements: GrantedAchievement[] }> {
    const { data } = await api.post("/store/buy", { key });
    return data;
  },
};
