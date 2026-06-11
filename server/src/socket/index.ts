import type { Server as HttpServer } from "node:http";
import { Server, type Socket } from "socket.io";
import { env } from "../lib/env.js";
import { prisma } from "../lib/prisma.js";
import { verifyAccessToken } from "../services/token.service.js";
import { gradeAnswer, revealAnswer } from "../utils/grading.js";
import { awardXp } from "../services/xp.service.js";
import { addCoins } from "../services/economy.service.js";
import { checkAchievements, type GrantedAchievement } from "../services/achievements.service.js";

/**
 * Real-time PvP Battle Arena.
 *
 * Flow: clients authenticate with their access token, join matchmaking
 * (`mm:join`), get paired by mode/subject (ranked also matches by rank tier),
 * then play a best-of-10 quiz duel. The first correct answer takes the point;
 * a wrong answer locks you out of that question and costs a 5s head-start on
 * the next. Answers are graded server-side — correct answers never leave here.
 */

const QUESTIONS_PER_MATCH = 10;
const QUESTION_MS = 30_000;
const PENALTY_MS = 5_000;
const REVEAL_MS = 1_600;
const RANK_TIERS = [0, 500, 2000, 6000, 15000, 35000, 75000];

interface BankQuestion {
  id: string;
  kind: "MCQ" | "TRUE_FALSE" | "NUMERIC";
  prompt: string;
  options: unknown;
  answer: unknown;
}

interface Player {
  socket: Socket;
  userId: string;
  username: string;
  xp: number;
  subject: string;
  mode: "ranked" | "casual";
}

const tierOf = (xp: number) => RANK_TIERS.filter((t) => xp >= t).length - 1;
const shuffle = <T>(a: T[]): T[] => {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
};

async function drawQuestions(subject: string): Promise<BankQuestion[]> {
  const where = subject === "MIXED" ? {} : { lesson: { world: { subject: subject as "PHYSICS" | "MATH" } } };
  const pool = await prisma.quizQuestion.findMany({
    where,
    select: { id: true, kind: true, prompt: true, options: true, answer: true },
    take: 300,
  });
  return shuffle(pool).slice(0, QUESTIONS_PER_MATCH) as BankQuestion[];
}

class BattleRoom {
  private idx = -1;
  private scores: Record<string, number> = {};
  private penalty: Record<string, number> = {};
  private locked = new Set<string>(); // userIds locked out of the current question
  private questionWinner: string | null = null;
  private timer: NodeJS.Timeout | null = null;
  private resolved = false;
  readonly id: string;

  constructor(
    private a: Player,
    private b: Player,
    private questions: BankQuestion[],
    private ranked: boolean,
    private subject: string
  ) {
    this.id = `battle:${a.userId}:${b.userId}:${Date.now()}`;
    this.scores[a.userId] = 0;
    this.scores[b.userId] = 0;
    this.penalty[a.userId] = 0;
    this.penalty[b.userId] = 0;
  }

  private other(userId: string): Player {
    return userId === this.a.userId ? this.b : this.a;
  }

  start() {
    for (const p of [this.a, this.b]) {
      p.socket.join(this.id);
      (p.socket.data as { roomId?: string }).roomId = this.id;
      const opp = this.other(p.userId);
      p.socket.emit("battle:start", {
        opponent: { username: opp.username, xp: opp.xp },
        total: QUESTIONS_PER_MATCH,
        subject: this.subject,
        mode: this.ranked ? "ranked" : "casual",
      });
    }
    this.next();
  }

  private next() {
    this.idx++;
    if (this.idx >= this.questions.length) return this.finish();
    this.questionWinner = null;
    this.locked.clear();
    const q = this.questions[this.idx];
    for (const p of [this.a, this.b]) {
      const pen = this.penalty[p.userId];
      this.penalty[p.userId] = 0;
      if (pen > 0) {
        this.locked.add(p.userId);
        setTimeout(() => this.locked.delete(p.userId), pen);
      }
      p.socket.emit("battle:question", {
        index: this.idx,
        total: this.questions.length,
        prompt: q.prompt,
        kind: q.kind,
        options: q.options ?? null,
        durationMs: QUESTION_MS,
        penaltyMs: pen,
      });
    }
    this.timer = setTimeout(() => this.endQuestion(), QUESTION_MS);
  }

  answer(userId: string, submitted: unknown) {
    if (this.resolved || this.questionWinner) return;
    if (this.locked.has(userId)) return;
    const q = this.questions[this.idx];
    const correct = gradeAnswer(q as never, submitted);
    if (correct) {
      this.questionWinner = userId;
      this.scores[userId]++;
      this.endQuestion();
    } else {
      // Wrong: locked out of this question + 5s head-start penalty next round.
      this.locked.add(userId);
      this.penalty[userId] = PENALTY_MS;
      this.other(userId).socket.emit("opponent:answered", { wrong: true });
      // If both players are now locked, end the question early.
      if (this.locked.size >= 2) this.endQuestion();
    }
  }

  private endQuestion() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    const q = this.questions[this.idx];
    const winner = this.questionWinner;
    for (const p of [this.a, this.b]) {
      p.socket.emit("battle:result", {
        index: this.idx,
        outcome: winner === null ? "none" : winner === p.userId ? "you" : "opp",
        correctAnswer: revealAnswer(q as never),
        scores: { you: this.scores[p.userId], opp: this.scores[this.other(p.userId).userId] },
      });
    }
    setTimeout(() => this.next(), REVEAL_MS);
  }

  typing(userId: string) {
    this.other(userId).socket.emit("opponent:typing");
  }

  /** A player disconnected or quit: the other wins by forfeit. */
  forfeit(userId: string) {
    if (this.resolved) return;
    const winner = this.other(userId);
    void this.finish(winner.userId);
  }

  private async finish(forcedWinner?: string) {
    if (this.resolved) return;
    this.resolved = true;
    if (this.timer) clearTimeout(this.timer);

    const sa = this.scores[this.a.userId];
    const sb = this.scores[this.b.userId];
    let winnerId: string | null;
    if (forcedWinner) winnerId = forcedWinner;
    else if (sa > sb) winnerId = this.a.userId;
    else if (sb > sa) winnerId = this.b.userId;
    else winnerId = null;

    const reward = this.ranked ? 60 : 25;
    const xpByUser: Record<string, number> = {};
    if (winnerId) {
      xpByUser[winnerId] = await awardXp(winnerId, reward, `BATTLE_WIN:${this.id}`);
      const loser = this.other(winnerId).userId;
      xpByUser[loser] = await awardXp(loser, Math.round(reward / 4), `BATTLE_LOSS:${this.id}`);
    } else {
      for (const p of [this.a, this.b]) xpByUser[p.userId] = await awardXp(p.userId, Math.round(reward / 3), `BATTLE_DRAW:${this.id}`);
    }

    // Coins: winner takes the pot, draw splits it, loser gets nothing.
    const coinReward = this.ranked ? 40 : 20;
    const coinByUser: Record<string, number> = { [this.a.userId]: 0, [this.b.userId]: 0 };
    if (winnerId) {
      coinByUser[winnerId] = coinReward;
      await addCoins(winnerId, coinReward);
    } else {
      for (const p of [this.a, this.b]) {
        coinByUser[p.userId] = Math.round(coinReward / 2);
        await addCoins(p.userId, coinByUser[p.userId]);
      }
    }

    await prisma.battleMatch.create({
      data: {
        playerAId: this.a.userId,
        playerBId: this.b.userId,
        winnerId,
        scoreA: sa,
        scoreB: sb,
        subject: this.subject,
        ranked: this.ranked,
      },
    });

    // Achievements (e.g. First Blood, Arena Veteran) can unlock after a win.
    const achByUser: Record<string, GrantedAchievement[]> = {};
    for (const p of [this.a, this.b]) achByUser[p.userId] = await checkAchievements(p.userId);

    for (const p of [this.a, this.b]) {
      const result = winnerId === null ? "draw" : winnerId === p.userId ? "win" : "loss";
      p.socket.emit("battle:over", {
        result,
        scores: { you: this.scores[p.userId], opp: this.scores[this.other(p.userId).userId] },
        xp: xpByUser[p.userId] ?? 0,
        coins: coinByUser[p.userId] ?? 0,
        achievements: achByUser[p.userId] ?? [],
      });
      p.socket.leave(this.id);
      (p.socket.data as { roomId?: string }).roomId = undefined;
    }
  }
}

export function attachBattleSocket(httpServer: HttpServer): Server {
  const io = new Server(httpServer, {
    cors: { origin: env.CLIENT_ORIGIN, credentials: true },
  });

  // Authenticate every socket from its handshake access token.
  io.use((socket, nextFn) => {
    try {
      const token = socket.handshake.auth?.token as string | undefined;
      if (!token) return nextFn(new Error("No token"));
      const payload = verifyAccessToken(token);
      socket.data.userId = payload.sub;
      socket.data.username = payload.username;
      nextFn();
    } catch {
      nextFn(new Error("Invalid token"));
    }
  });

  const queue: Player[] = [];
  const rooms = new Map<string, BattleRoom>();

  const compatible = (a: Player, b: Player) => {
    if (a.userId === b.userId) return false;
    if (a.mode !== b.mode) return false;
    if (a.subject !== b.subject && a.subject !== "MIXED" && b.subject !== "MIXED") return false;
    if (a.mode === "ranked" && Math.abs(tierOf(a.xp) - tierOf(b.xp)) > 1) return false;
    return true;
  };

  io.on("connection", (socket) => {
    socket.on("mm:join", async (opts: { subject?: string; mode?: string }) => {
      const userId = socket.data.userId as string;
      // Already queued or in a room? ignore.
      if (queue.some((p) => p.userId === userId) || (socket.data as { roomId?: string }).roomId) return;
      const user = await prisma.user.findUnique({ where: { id: userId }, select: { xp: true } });
      const player: Player = {
        socket,
        userId,
        username: socket.data.username as string,
        xp: user?.xp ?? 0,
        subject: opts.subject === "PHYSICS" || opts.subject === "MATH" ? opts.subject : "MIXED",
        mode: opts.mode === "ranked" ? "ranked" : "casual",
      };
      const oppIdx = queue.findIndex((p) => compatible(p, player));
      if (oppIdx >= 0) {
        const opp = queue.splice(oppIdx, 1)[0];
        const subject = player.subject !== "MIXED" ? player.subject : opp.subject;
        const questions = await drawQuestions(subject);
        if (questions.length < QUESTIONS_PER_MATCH) {
          socket.emit("mm:error", { message: "Not enough questions for that subject yet." });
          queue.push(opp);
          return;
        }
        const room = new BattleRoom(opp, player, questions, player.mode === "ranked", subject);
        rooms.set(room.id, room);
        room.start();
      } else {
        queue.push(player);
        socket.emit("mm:waiting");
      }
    });

    socket.on("mm:leave", () => {
      const i = queue.findIndex((p) => p.socket.id === socket.id);
      if (i >= 0) queue.splice(i, 1);
    });

    socket.on("battle:answer", (data: { answer: unknown }) => {
      const roomId = (socket.data as { roomId?: string }).roomId;
      if (roomId) rooms.get(roomId)?.answer(socket.data.userId as string, data?.answer);
    });

    socket.on("battle:typing", () => {
      const roomId = (socket.data as { roomId?: string }).roomId;
      if (roomId) rooms.get(roomId)?.typing(socket.data.userId as string);
    });

    socket.on("disconnect", () => {
      const i = queue.findIndex((p) => p.socket.id === socket.id);
      if (i >= 0) queue.splice(i, 1);
      const roomId = (socket.data as { roomId?: string }).roomId;
      if (roomId) rooms.get(roomId)?.forfeit(socket.data.userId as string);
    });
  });

  // Periodically drop finished rooms.
  setInterval(() => {
    for (const [id, room] of rooms) if ((room as unknown as { resolved: boolean }).resolved) rooms.delete(id);
  }, 60_000).unref();

  return io;
}
