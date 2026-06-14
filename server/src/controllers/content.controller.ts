import type { Request, Response } from "express";
import { z } from "zod";
import type { Subject } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import { notFound, badRequest, unauthorized } from "../utils/httpError.js";
import { gradeAnswer, revealAnswer } from "../utils/grading.js";
import { awardXp } from "../services/xp.service.js";
import { addCoins } from "../services/economy.service.js";
import { checkAchievements } from "../services/achievements.service.js";

const PERFECT_BONUS_XP = 25;
const COINS_PER_LESSON = 25;

const quizSubmitSchema = z.object({
  scope: z.enum(["CONCEPT_CHECK", "PRACTICE"]),
  answers: z
    .array(z.object({ questionId: z.string().min(1), answer: z.unknown() }))
    .min(1)
    .max(50),
});

const timeSchema = z.object({ seconds: z.number().int().min(1).max(1800) });

const checkSchema = z.object({
  answers: z
    .array(z.object({ questionId: z.string().min(1), answer: z.unknown() }))
    .min(1)
    .max(50),
});

const todayKey = () => new Date().toISOString().slice(0, 10);

/** Fisher–Yates shuffle (returns a new array). */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Prepare a question for the client. For ORDER/MATCHING the stored options ARE
 * the answer, so we shuffle what we send and never include the `answer` column.
 */
function serializeQuestion(q: {
  id: string;
  scope: string;
  orderIndex: number;
  kind: string;
  prompt: string;
  options: unknown;
  difficulty: number;
  answer: unknown;
  explanation: string;
  hint: string | null;
}) {
  let options = q.options;
  if ((q.kind === "ORDER" || q.kind === "PROOF") && Array.isArray(q.options)) {
    options = shuffle(q.options as string[]);
  } else if (q.kind === "MATCHING" && q.options && typeof q.options === "object") {
    const o = q.options as { left: string[]; right: string[] };
    options = { left: o.left, right: shuffle(o.right) };
  }
  const base = {
    id: q.id,
    scope: q.scope,
    orderIndex: q.orderIndex,
    kind: q.kind,
    prompt: q.prompt,
    options,
    difficulty: q.difficulty,
    hint: q.hint,
  };
  // SYMBOLIC and GRAPH are graded locally on the client for instant feedback,
  // so they ship the answer expression + explanation. Every other kind keeps
  // its answer key server-side (the client only learns it after grading).
  if (q.kind === "SYMBOLIC" || q.kind === "GRAPH") {
    return { ...base, answer: q.answer, explanation: q.explanation };
  }
  return base;
}

/**
 * The lesson engine, parameterised by subject. The same World/Lesson schema
 * powers both the Physics Journey and the Math City — only the subject filter
 * differs, so progress, quizzes, and XP are shared infrastructure.
 */
export function makeContentController(subject: Subject) {
  /** GET /worlds — the map payload for this subject. */
  async function getWorlds(req: Request, res: Response): Promise<void> {
    if (!req.auth) throw unauthorized();
    const userId = req.auth.sub;

    const worlds = await prisma.world.findMany({
      where: { subject },
      orderBy: { orderIndex: "asc" },
      include: {
        lessons: {
          where: { published: true },
          orderBy: { orderIndex: "asc" },
          select: { id: true, slug: true, title: true },
        },
      },
    });

    const lessonIds = worlds.flatMap((w) => w.lessons.map((l) => l.id));
    const done = await prisma.userProgress.findMany({
      where: { userId, status: { in: ["COMPLETED", "MASTERED"] }, lessonId: { in: lessonIds } },
      select: { lessonId: true },
    });
    const doneSet = new Set(done.map((p) => p.lessonId));

    const started = await prisma.userProgress.findFirst({
      where: { userId, status: "STARTED", lesson: { world: { subject } } },
      orderBy: { updatedAt: "desc" },
      include: { lesson: { include: { world: { select: { slug: true, name: true } } } } },
    });
    let continueTarget = started
      ? {
          worldSlug: started.lesson.world.slug,
          worldName: started.lesson.world.name,
          lessonSlug: started.lesson.slug,
          title: started.lesson.title,
        }
      : null;
    if (!continueTarget) {
      for (const w of worlds) {
        const next = w.lessons.find((l) => !doneSet.has(l.id));
        if (next) {
          continueTarget = {
            worldSlug: w.slug,
            worldName: w.name,
            lessonSlug: next.slug,
            title: next.title,
          };
          break;
        }
      }
    }

    res.json({
      worlds: worlds.map((w) => ({
        slug: w.slug,
        name: w.name,
        subtitle: w.subtitle,
        gradeRange: w.gradeRange,
        scaleLabel: w.scaleLabel,
        orderIndex: w.orderIndex,
        palette: w.palette,
        lessonCount: w.lessons.length,
        completedCount: w.lessons.filter((l) => doneSet.has(l.id)).length,
      })),
      continue: continueTarget,
    });
  }

  /** GET /worlds/:slug — one world with its lessons + progress. */
  async function getWorld(req: Request, res: Response): Promise<void> {
    if (!req.auth) throw unauthorized();
    const world = await prisma.world.findUnique({
      where: { slug: req.params.slug },
      include: {
        lessons: { where: { published: true }, orderBy: { orderIndex: "asc" } },
      },
    });
    if (!world || world.subject !== subject) throw notFound("That place hasn't been charted");

    const progress = await prisma.userProgress.findMany({
      where: { userId: req.auth.sub, lessonId: { in: world.lessons.map((l) => l.id) } },
    });
    const byLesson = new Map(progress.map((p) => [p.lessonId, p]));

    res.json({
      world: {
        slug: world.slug,
        name: world.name,
        subtitle: world.subtitle,
        description: world.description,
        gradeRange: world.gradeRange,
        scaleLabel: world.scaleLabel,
        palette: world.palette,
      },
      lessons: world.lessons.map((l) => {
        const p = byLesson.get(l.id);
        return {
          slug: l.slug,
          title: l.title,
          tagline: l.tagline,
          orderIndex: l.orderIndex,
          xpReward: l.xpReward,
          estMinutes: l.estMinutes,
          status: p?.status ?? null,
          bestScore: p?.bestScore ?? null,
        };
      }),
    });
  }

  /** GET /lessons/:slug — full lesson; marks it STARTED. */
  async function getLesson(req: Request, res: Response): Promise<void> {
    if (!req.auth) throw unauthorized();
    const userId = req.auth.sub;

    const lesson = await prisma.lesson.findUnique({
      where: { slug: req.params.slug },
      include: {
        world: true,
        sections: { orderBy: { orderIndex: "asc" } },
        questions: {
          orderBy: [{ scope: "asc" }, { orderIndex: "asc" }],
          select: {
            id: true,
            scope: true,
            orderIndex: true,
            kind: true,
            prompt: true,
            options: true,
            difficulty: true,
            answer: true,
            explanation: true,
            hint: true,
          },
        },
      },
    });
    if (!lesson || !lesson.published || lesson.world.subject !== subject)
      throw notFound("Lesson not found");

    const progress = await prisma.userProgress.upsert({
      where: { userId_lessonId: { userId, lessonId: lesson.id } },
      create: { userId, lessonId: lesson.id, status: "STARTED" },
      update: {},
    });

    let next = await prisma.lesson.findFirst({
      where: { worldId: lesson.worldId, published: true, orderIndex: { gt: lesson.orderIndex } },
      orderBy: { orderIndex: "asc" },
      include: { world: { select: { slug: true, name: true } } },
    });
    if (!next) {
      next = await prisma.lesson.findFirst({
        where: {
          published: true,
          world: { subject, orderIndex: { gt: lesson.world.orderIndex } },
        },
        orderBy: [{ world: { orderIndex: "asc" } }, { orderIndex: "asc" }],
        include: { world: { select: { slug: true, name: true } } },
      });
    }

    let requiresMath: { slug: string; worldSlug: string; title: string } | null = null;
    if (lesson.requiresMathSlug) {
      const m = await prisma.lesson.findUnique({
        where: { slug: lesson.requiresMathSlug },
        include: { world: { select: { slug: true } } },
      });
      if (m) requiresMath = { slug: m.slug, worldSlug: m.world.slug, title: m.title };
    }

    res.json({
      lesson: {
        slug: lesson.slug,
        title: lesson.title,
        tagline: lesson.tagline,
        xpReward: lesson.xpReward,
        estMinutes: lesson.estMinutes,
        difficulty: lesson.difficulty,
        requiresMath,
        world: {
          slug: lesson.world.slug,
          name: lesson.world.name,
          palette: lesson.world.palette,
          gradeRange: lesson.world.gradeRange,
        },
        sections: lesson.sections.map((s) => ({ kind: s.kind, title: s.title, content: s.content })),
        questions: lesson.questions.map(serializeQuestion),
      },
      progress: { status: progress.status, bestScore: progress.bestScore, attempts: progress.attempts },
      nextLesson: next
        ? { slug: next.slug, title: next.title, worldSlug: next.world.slug, worldName: next.world.name }
        : null,
    });
  }

  /**
   * POST /lessons/:slug/check — grade answers WITHOUT recording an attempt.
   * Powers the stepped player's instant per-question feedback; the official
   * scored attempt is still recorded once via /quiz.
   */
  async function checkAnswers(req: Request, res: Response): Promise<void> {
    if (!req.auth) throw unauthorized();
    const { answers } = checkSchema.parse(req.body);

    const lesson = await prisma.lesson.findUnique({
      where: { slug: req.params.slug },
      include: { world: { select: { subject: true } }, questions: true },
    });
    if (!lesson || !lesson.published || lesson.world.subject !== subject)
      throw notFound("Lesson not found");

    const byId = new Map(lesson.questions.map((q) => [q.id, q]));
    const results = answers
      .filter((a) => byId.has(a.questionId))
      .map((a) => {
        const q = byId.get(a.questionId)!;
        return {
          questionId: q.id,
          correct: gradeAnswer(q, a.answer),
          correctAnswer: revealAnswer(q),
          explanation: q.explanation,
        };
      });
    if (results.length === 0) throw badRequest("No valid answers submitted");
    res.json({ results });
  }

  /** POST /lessons/:slug/quiz — grade answers server-side. */
  async function submitQuiz(req: Request, res: Response): Promise<void> {
    if (!req.auth) throw unauthorized();
    const userId = req.auth.sub;
    const { scope, answers } = quizSubmitSchema.parse(req.body);

    const lesson = await prisma.lesson.findUnique({
      where: { slug: req.params.slug },
      include: { world: { select: { subject: true } }, questions: { where: { scope } } },
    });
    if (!lesson || !lesson.published || lesson.world.subject !== subject)
      throw notFound("Lesson not found");

    const byId = new Map(lesson.questions.map((q) => [q.id, q]));
    const results = answers
      .filter((a) => byId.has(a.questionId))
      .map((a) => {
        const q = byId.get(a.questionId)!;
        return {
          questionId: q.id,
          correct: gradeAnswer(q, a.answer),
          correctAnswer: revealAnswer(q),
          explanation: q.explanation,
        };
      });
    if (results.length === 0) throw badRequest("No valid answers submitted");

    const score = results.filter((r) => r.correct).length;

    if (scope === "CONCEPT_CHECK") {
      res.json({ results, score, total: results.length });
      return;
    }

    const total = lesson.questions.length;
    const percent = Math.round((score / total) * 100);

    await prisma.quizAttempt.create({
      data: { userId, lessonId: lesson.id, scope, score, total, answers: answers as object },
    });

    const progress = await prisma.userProgress.upsert({
      where: { userId_lessonId: { userId, lessonId: lesson.id } },
      create: { userId, lessonId: lesson.id, status: "STARTED" },
      update: {},
    });

    const days = new Set((progress.masteryDays as string[]) ?? []);
    if (percent >= 90) days.add(todayKey());
    const masteryEarned = days.size >= 2;
    const newStatus =
      progress.status !== "STARTED" && masteryEarned ? "MASTERED" : progress.status;

    const updated = await prisma.userProgress.update({
      where: { id: progress.id },
      data: {
        attempts: { increment: 1 },
        bestScore: Math.max(progress.bestScore ?? 0, percent),
        masteryDays: [...days],
        status: newStatus,
      },
    });

    res.json({
      results,
      score,
      total,
      percent,
      bestScore: updated.bestScore,
      status: updated.status,
    });
  }

  /** POST /lessons/:slug/complete — idempotent XP award. */
  async function completeLesson(req: Request, res: Response): Promise<void> {
    if (!req.auth) throw unauthorized();
    const userId = req.auth.sub;

    const lesson = await prisma.lesson.findUnique({
      where: { slug: req.params.slug },
      include: { world: { select: { subject: true } } },
    });
    if (!lesson || !lesson.published || lesson.world.subject !== subject)
      throw notFound("Lesson not found");

    const practiceCount = await prisma.quizAttempt.count({
      where: { userId, lessonId: lesson.id, scope: "PRACTICE" },
    });
    if (practiceCount === 0) {
      throw badRequest("Try the practice problems before completing the lesson", "PRACTICE_REQUIRED");
    }

    const progress = await prisma.userProgress.upsert({
      where: { userId_lessonId: { userId, lessonId: lesson.id } },
      create: { userId, lessonId: lesson.id, status: "STARTED" },
      update: {},
    });

    const masteryEarned = ((progress.masteryDays as string[]) ?? []).length >= 2;
    const nextStatus =
      progress.status === "STARTED"
        ? masteryEarned
          ? "MASTERED"
          : "COMPLETED"
        : masteryEarned
          ? "MASTERED"
          : progress.status;

    await prisma.userProgress.update({
      where: { id: progress.id },
      data: { status: nextStatus, completedAt: progress.completedAt ?? new Date() },
    });

    const xpAwarded = await awardXp(userId, lesson.xpReward, "LESSON_COMPLETE", lesson.id);

    const hasPerfect = await prisma.quizAttempt.findFirst({
      where: {
        userId,
        lessonId: lesson.id,
        scope: "PRACTICE",
        score: { equals: prisma.quizAttempt.fields.total },
      },
    });
    let bonusAwarded = 0;
    if (hasPerfect) {
      bonusAwarded = await awardXp(userId, PERFECT_BONUS_XP, "QUIZ_PERFECT", lesson.id);
    }

    // Coins are granted once per lesson (idempotent via a marker XpEvent-style
    // check would be ideal, but completeLesson is naturally idempotent on status).
    const coinsAwarded = xpAwarded > 0 ? await addCoins(userId, COINS_PER_LESSON).then(() => COINS_PER_LESSON) : 0;
    const achievements = await checkAchievements(userId);

    const user = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: { xp: true, coins: true },
    });

    res.json({
      xpAwarded,
      bonusAwarded,
      coinsAwarded,
      totalXp: user.xp,
      coins: user.coins,
      status: nextStatus,
      achievements,
    });
  }

  /** POST /lessons/:slug/time — accumulate study time. */
  async function logTime(req: Request, res: Response): Promise<void> {
    if (!req.auth) throw unauthorized();
    const { seconds } = timeSchema.parse(req.body);
    const lesson = await prisma.lesson.findUnique({
      where: { slug: req.params.slug },
      select: { id: true },
    });
    if (!lesson) throw notFound("Lesson not found");

    await prisma.userProgress.upsert({
      where: { userId_lessonId: { userId: req.auth.sub, lessonId: lesson.id } },
      create: { userId: req.auth.sub, lessonId: lesson.id, timeSpentSec: seconds },
      update: { timeSpentSec: { increment: seconds } },
    });
    res.json({ ok: true });
  }

  return { getWorlds, getWorld, getLesson, checkAnswers, submitQuiz, completeLesson, logTime };
}
