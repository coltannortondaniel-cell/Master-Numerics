import type { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { notFound, badRequest, unauthorized } from "../utils/httpError.js";
import { gradeAnswer, revealAnswer } from "../utils/grading.js";
import { awardXp } from "../services/xp.service.js";

const PERFECT_BONUS_XP = 25;

const quizSubmitSchema = z.object({
  scope: z.enum(["CONCEPT_CHECK", "PRACTICE"]),
  answers: z
    .array(z.object({ questionId: z.string().min(1), answer: z.unknown() }))
    .min(1)
    .max(50),
});

const timeSchema = z.object({ seconds: z.number().int().min(1).max(1800) });

const todayKey = () => new Date().toISOString().slice(0, 10);

/** GET /api/physics/worlds — the Cosmic Map payload. */
export async function getWorlds(req: Request, res: Response): Promise<void> {
  if (!req.auth) throw unauthorized();
  const userId = req.auth.sub;

  const worlds = await prisma.world.findMany({
    orderBy: { orderIndex: "asc" },
    include: {
      lessons: {
        where: { published: true },
        orderBy: { orderIndex: "asc" },
        select: { id: true, slug: true, title: true },
      },
    },
  });

  const done = await prisma.userProgress.findMany({
    where: { userId, status: { in: ["COMPLETED", "MASTERED"] } },
    select: { lessonId: true },
  });
  const doneSet = new Set(done.map((p) => p.lessonId));

  // "Continue learning": most recently touched unfinished lesson, else the
  // first published lesson the user hasn't completed.
  const started = await prisma.userProgress.findFirst({
    where: { userId, status: "STARTED" },
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

/** GET /api/physics/worlds/:slug — one world with its lessons + progress. */
export async function getWorld(req: Request, res: Response): Promise<void> {
  if (!req.auth) throw unauthorized();
  const world = await prisma.world.findUnique({
    where: { slug: req.params.slug },
    include: {
      lessons: {
        where: { published: true },
        orderBy: { orderIndex: "asc" },
      },
    },
  });
  if (!world) throw notFound("That world hasn't been charted");

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

/** GET /api/physics/lessons/:slug — full lesson; marks it STARTED. */
export async function getLesson(req: Request, res: Response): Promise<void> {
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
          hint: true,
          // answer + explanation deliberately omitted — grading is server-side
        },
      },
    },
  });
  if (!lesson || !lesson.published) throw notFound("Lesson not found");

  const progress = await prisma.userProgress.upsert({
    where: { userId_lessonId: { userId, lessonId: lesson.id } },
    create: { userId, lessonId: lesson.id, status: "STARTED" },
    update: {}, // touch updatedAt happens on real updates only; existence is enough
  });

  // Next lesson: same world first, then the next charted world.
  let next = await prisma.lesson.findFirst({
    where: {
      worldId: lesson.worldId,
      published: true,
      orderIndex: { gt: lesson.orderIndex },
    },
    orderBy: { orderIndex: "asc" },
    include: { world: { select: { slug: true, name: true } } },
  });
  if (!next) {
    next = await prisma.lesson.findFirst({
      where: {
        published: true,
        world: { orderIndex: { gt: lesson.world.orderIndex } },
      },
      orderBy: [{ world: { orderIndex: "asc" } }, { orderIndex: "asc" }],
      include: { world: { select: { slug: true, name: true } } },
    });
  }

  res.json({
    lesson: {
      slug: lesson.slug,
      title: lesson.title,
      tagline: lesson.tagline,
      xpReward: lesson.xpReward,
      estMinutes: lesson.estMinutes,
      world: {
        slug: lesson.world.slug,
        name: lesson.world.name,
        palette: lesson.world.palette,
        gradeRange: lesson.world.gradeRange,
      },
      sections: lesson.sections.map((s) => ({
        kind: s.kind,
        title: s.title,
        content: s.content,
      })),
      questions: lesson.questions,
    },
    progress: {
      status: progress.status,
      bestScore: progress.bestScore,
      attempts: progress.attempts,
    },
    nextLesson: next
      ? { slug: next.slug, title: next.title, worldSlug: next.world.slug, worldName: next.world.name }
      : null,
  });
}

/** POST /api/physics/lessons/:slug/quiz — grade answers server-side. */
export async function submitQuiz(req: Request, res: Response): Promise<void> {
  if (!req.auth) throw unauthorized();
  const userId = req.auth.sub;
  const { scope, answers } = quizSubmitSchema.parse(req.body);

  const lesson = await prisma.lesson.findUnique({
    where: { slug: req.params.slug },
    include: { questions: { where: { scope } } },
  });
  if (!lesson || !lesson.published) throw notFound("Lesson not found");

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
    // Instant inline feedback — stateless by design.
    res.json({ results, score, total: results.length });
    return;
  }

  // PRACTICE: percent is judged against the full problem set.
  const total = lesson.questions.length;
  const percent = Math.round((score / total) * 100);

  await prisma.quizAttempt.create({
    data: { userId, lessonId: lesson.id, scope, score, total, answers },
  });

  const progress = await prisma.userProgress.upsert({
    where: { userId_lessonId: { userId, lessonId: lesson.id } },
    create: { userId, lessonId: lesson.id, status: "STARTED" },
    update: {},
  });

  const days = new Set((progress.masteryDays as string[]) ?? []);
  if (percent >= 90) days.add(todayKey());
  // Mastery: ≥90% on two separate days, after the lesson is completed.
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

/** POST /api/physics/lessons/:slug/complete — idempotent XP award. */
export async function completeLesson(req: Request, res: Response): Promise<void> {
  if (!req.auth) throw unauthorized();
  const userId = req.auth.sub;

  const lesson = await prisma.lesson.findUnique({ where: { slug: req.params.slug } });
  if (!lesson || !lesson.published) throw notFound("Lesson not found");

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
    data: {
      status: nextStatus,
      completedAt: progress.completedAt ?? new Date(),
    },
  });

  const xpAwarded = await awardXp(userId, lesson.xpReward, "LESSON_COMPLETE", lesson.id);

  const hasPerfect = await prisma.quizAttempt.findFirst({
    where: { userId, lessonId: lesson.id, scope: "PRACTICE", score: { equals: prisma.quizAttempt.fields.total } },
  });
  let bonusAwarded = 0;
  if (hasPerfect) {
    bonusAwarded = await awardXp(userId, PERFECT_BONUS_XP, "QUIZ_PERFECT", lesson.id);
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    select: { xp: true },
  });

  res.json({ xpAwarded, bonusAwarded, totalXp: user.xp, status: nextStatus });
}

/** POST /api/physics/lessons/:slug/time — accumulate study time. */
export async function logTime(req: Request, res: Response): Promise<void> {
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
