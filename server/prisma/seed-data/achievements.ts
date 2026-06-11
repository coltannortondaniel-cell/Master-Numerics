export type AchievementSeed = {
  key: string;
  name: string;
  description: string;
  category:
    | "EXPLORER"
    | "SCHOLAR"
    | "STREAK"
    | "PERFECT"
    | "SOCIAL"
    | "CALCULATOR"
    | "COLLECTOR"
    | "LEGENDARY";
  metric: string;
  threshold: number;
  xpReward: number;
  coinReward: number;
  secret?: boolean;
};

/**
 * Achievement definitions. `metric` maps to a value computed in
 * achievements.service.ts; earning one is unlocked when the stat ≥ threshold.
 */
export const achievements: AchievementSeed[] = [
  // Explorer — lessons visited/completed
  { key: "explorer-first", name: "First Steps", description: "Complete your first lesson.", category: "EXPLORER", metric: "lessonsCompleted", threshold: 1, xpReward: 50, coinReward: 50 },
  { key: "explorer-5", name: "Wanderer", description: "Complete 5 lessons.", category: "EXPLORER", metric: "lessonsCompleted", threshold: 5, xpReward: 100, coinReward: 100 },
  { key: "explorer-15", name: "Voyager", description: "Complete 15 lessons.", category: "EXPLORER", metric: "lessonsCompleted", threshold: 15, xpReward: 250, coinReward: 200 },

  // Scholar — mastery
  { key: "scholar-master-1", name: "True Understanding", description: "Master a lesson (90%+ on two days).", category: "SCHOLAR", metric: "lessonsMastered", threshold: 1, xpReward: 150, coinReward: 150 },
  { key: "scholar-master-5", name: "Deep Knowledge", description: "Master 5 lessons.", category: "SCHOLAR", metric: "lessonsMastered", threshold: 5, xpReward: 400, coinReward: 300 },

  // Perfect — flawless quizzes
  { key: "perfect-1", name: "Flawless", description: "Score 100% on a practice set.", category: "PERFECT", metric: "perfectQuizzes", threshold: 1, xpReward: 75, coinReward: 75 },
  { key: "perfect-10", name: "Perfectionist", description: "Score 100% ten times.", category: "PERFECT", metric: "perfectQuizzes", threshold: 10, xpReward: 300, coinReward: 250 },

  // Social — friends & battles
  { key: "social-friend-1", name: "First Contact", description: "Add your first friend.", category: "SOCIAL", metric: "friendsCount", threshold: 1, xpReward: 50, coinReward: 50 },
  { key: "social-friend-5", name: "Study Group", description: "Have 5 friends.", category: "SOCIAL", metric: "friendsCount", threshold: 5, xpReward: 150, coinReward: 150 },
  { key: "social-battle-1", name: "First Blood", description: "Win a PvP battle.", category: "SOCIAL", metric: "battlesWon", threshold: 1, xpReward: 75, coinReward: 75 },
  { key: "social-battle-10", name: "Arena Veteran", description: "Win 10 PvP battles.", category: "SOCIAL", metric: "battlesWon", threshold: 10, xpReward: 350, coinReward: 300 },

  // Collector — crates & cosmetics
  { key: "collector-crate-1", name: "Unboxed", description: "Open your first crate.", category: "COLLECTOR", metric: "cratesOpened", threshold: 1, xpReward: 50, coinReward: 0 },
  { key: "collector-crate-10", name: "Crate Connoisseur", description: "Open 10 crates.", category: "COLLECTOR", metric: "cratesOpened", threshold: 10, xpReward: 200, coinReward: 150 },
  { key: "collector-cosmetics-10", name: "Fashionista", description: "Collect 10 cosmetics.", category: "COLLECTOR", metric: "cosmeticsOwned", threshold: 10, xpReward: 250, coinReward: 200 },

  // Legendary — secret
  { key: "legendary-mythic", name: "Mythic Collector", description: "Own a Mythic cosmetic.", category: "LEGENDARY", metric: "mythicOwned", threshold: 1, xpReward: 1000, coinReward: 1000, secret: true },
];
