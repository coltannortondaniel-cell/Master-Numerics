import type { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { badRequest, notFound, unauthorized } from "../utils/httpError.js";

/* ─────────────────────────── Notebook ─────────────────────────── */

/** GET /api/study/notes — all of the user's notes (with lesson context). */
export async function listNotes(req: Request, res: Response): Promise<void> {
  if (!req.auth) throw unauthorized();
  const q = (typeof req.query.q === "string" ? req.query.q : "").trim();
  const notes = await prisma.note.findMany({
    where: {
      userId: req.auth.sub,
      content: { not: "" },
      ...(q ? { OR: [{ content: { contains: q, mode: "insensitive" } }, { lesson: { title: { contains: q, mode: "insensitive" } } }] } : {}),
    },
    include: { lesson: { include: { world: { select: { name: true, subject: true, slug: true } } } } },
    orderBy: { updatedAt: "desc" },
  });
  res.json({
    notes: notes.map((n) => ({
      lessonSlug: n.lesson.slug,
      lessonTitle: n.lesson.title,
      worldName: n.lesson.world.name,
      worldSlug: n.lesson.world.slug,
      subject: n.lesson.world.subject,
      content: n.content,
      updatedAt: n.updatedAt,
    })),
  });
}

/** GET /api/study/notes/:lessonSlug */
export async function getNote(req: Request, res: Response): Promise<void> {
  if (!req.auth) throw unauthorized();
  const lesson = await prisma.lesson.findUnique({ where: { slug: req.params.lessonSlug }, select: { id: true } });
  if (!lesson) throw notFound("Lesson not found");
  const note = await prisma.note.findUnique({
    where: { userId_lessonId: { userId: req.auth.sub, lessonId: lesson.id } },
  });
  res.json({ content: note?.content ?? "" });
}

const noteSchema = z.object({ content: z.string().max(20000) });

/** PUT /api/study/notes/:lessonSlug — autosave note content. */
export async function saveNote(req: Request, res: Response): Promise<void> {
  if (!req.auth) throw unauthorized();
  const { content } = noteSchema.parse(req.body);
  const lesson = await prisma.lesson.findUnique({ where: { slug: req.params.lessonSlug }, select: { id: true } });
  if (!lesson) throw notFound("Lesson not found");
  await prisma.note.upsert({
    where: { userId_lessonId: { userId: req.auth.sub, lessonId: lesson.id } },
    create: { userId: req.auth.sub, lessonId: lesson.id, content },
    update: { content },
  });
  res.json({ ok: true });
}

/* ─────────────────────────── Flashcards (SM-2) ─────────────────────────── */

interface SummaryContent {
  takeaways?: string[];
  formulas?: { label: string; tex: string }[];
}

/** GET /api/study/decks — deck names with total/due counts. */
export async function decks(req: Request, res: Response): Promise<void> {
  if (!req.auth) throw unauthorized();
  const userId = req.auth.sub;
  const cards = await prisma.flashcard.findMany({ where: { userId }, select: { deck: true, dueAt: true } });
  const now = Date.now();
  const map = new Map<string, { total: number; due: number }>();
  for (const c of cards) {
    const d = map.get(c.deck) ?? { total: 0, due: 0 };
    d.total++;
    if (c.dueAt.getTime() <= now) d.due++;
    map.set(c.deck, d);
  }
  res.json({ decks: [...map.entries()].map(([deck, v]) => ({ deck, ...v })) });
}

/** POST /api/study/decks/from-lesson/:lessonSlug — auto-generate cards from a lesson. */
export async function generateFromLesson(req: Request, res: Response): Promise<void> {
  if (!req.auth) throw unauthorized();
  const userId = req.auth.sub;
  const source = `lesson:${req.params.lessonSlug}`;

  const existing = await prisma.flashcard.count({ where: { userId, source } });
  if (existing > 0) {
    res.json({ ok: true, created: 0, alreadyExists: true });
    return;
  }

  const lesson = await prisma.lesson.findUnique({
    where: { slug: req.params.lessonSlug },
    include: { world: { select: { name: true } }, sections: { where: { kind: "SUMMARY" } } },
  });
  if (!lesson) throw notFound("Lesson not found");

  const deck = lesson.world.name;
  const summary = (lesson.sections[0]?.content ?? {}) as SummaryContent;
  const cards: { front: string; back: string }[] = [];
  for (const f of summary.formulas ?? []) cards.push({ front: `Formula — ${f.label}`, back: `$$${f.tex}$$` });
  for (const t of summary.takeaways ?? []) cards.push({ front: `${lesson.title}`, back: t });

  if (cards.length === 0) {
    res.json({ ok: true, created: 0, alreadyExists: false });
    return;
  }
  await prisma.flashcard.createMany({
    data: cards.map((c) => ({ userId, deck, source, front: c.front, back: c.back })),
  });
  res.json({ ok: true, created: cards.length, deck });
}

const addSchema = z.object({ deck: z.string().min(1).max(80), front: z.string().min(1).max(500), back: z.string().min(1).max(2000) });

/** POST /api/study/cards — add a custom card. */
export async function addCard(req: Request, res: Response): Promise<void> {
  if (!req.auth) throw unauthorized();
  const { deck, front, back } = addSchema.parse(req.body);
  const card = await prisma.flashcard.create({ data: { userId: req.auth.sub, deck, front, back } });
  res.status(201).json({ id: card.id });
}

/** GET /api/study/review?deck=... — due cards for review. */
export async function dueCards(req: Request, res: Response): Promise<void> {
  if (!req.auth) throw unauthorized();
  const deck = typeof req.query.deck === "string" ? req.query.deck : undefined;
  const cards = await prisma.flashcard.findMany({
    where: { userId: req.auth.sub, dueAt: { lte: new Date() }, ...(deck ? { deck } : {}) },
    orderBy: { dueAt: "asc" },
    take: 40,
    select: { id: true, deck: true, front: true, back: true },
  });
  res.json({ cards });
}

const reviewSchema = z.object({ quality: z.number().int().min(0).max(5) });

/** POST /api/study/cards/:id/review { quality 0-5 } — SM-2 update. */
export async function review(req: Request, res: Response): Promise<void> {
  if (!req.auth) throw unauthorized();
  const { quality } = reviewSchema.parse(req.body);
  const card = await prisma.flashcard.findFirst({ where: { id: req.params.id, userId: req.auth.sub } });
  if (!card) throw notFound("Card not found");

  let { ease, intervalDays, repetitions } = card;
  if (quality < 3) {
    repetitions = 0;
    intervalDays = 1;
  } else {
    repetitions += 1;
    if (repetitions === 1) intervalDays = 1;
    else if (repetitions === 2) intervalDays = 6;
    else intervalDays = Math.round(intervalDays * ease);
    ease = Math.max(1.3, ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
  }
  const dueAt = new Date(Date.now() + intervalDays * 86_400_000);
  await prisma.flashcard.update({
    where: { id: card.id },
    data: { ease, intervalDays, repetitions, dueAt, lastReviewedAt: new Date() },
  });
  res.json({ ok: true, intervalDays, dueAt });
}

/** DELETE /api/study/cards/:id */
export async function deleteCard(req: Request, res: Response): Promise<void> {
  if (!req.auth) throw unauthorized();
  const card = await prisma.flashcard.findFirst({ where: { id: req.params.id, userId: req.auth.sub }, select: { id: true } });
  if (!card) throw notFound("Card not found");
  await prisma.flashcard.delete({ where: { id: card.id } });
  res.json({ ok: true });
}

/* ─────────────────────────── Formula sheet ─────────────────────────── */

/** GET /api/study/formulas — formulas from completed lessons, grouped by topic. */
export async function formulas(req: Request, res: Response): Promise<void> {
  if (!req.auth) throw unauthorized();
  const userId = req.auth.sub;

  const done = await prisma.userProgress.findMany({
    where: { userId, status: { in: ["COMPLETED", "MASTERED"] } },
    select: { lessonId: true },
  });
  const lessons = await prisma.lesson.findMany({
    where: { id: { in: done.map((d) => d.lessonId) } },
    include: { world: { select: { name: true, subject: true } }, sections: { where: { kind: "SUMMARY" } } },
    orderBy: { orderIndex: "asc" },
  });
  const stars = new Set((await prisma.formulaStar.findMany({ where: { userId }, select: { ref: true } })).map((s) => s.ref));

  const groups = new Map<string, { topic: string; subject: string; items: { ref: string; label: string; tex: string; lessonTitle: string; starred: boolean }[] }>();
  for (const lesson of lessons) {
    const summary = (lesson.sections[0]?.content ?? {}) as SummaryContent;
    (summary.formulas ?? []).forEach((f, i) => {
      const topic = lesson.world.name;
      const g = groups.get(topic) ?? { topic, subject: lesson.world.subject, items: [] };
      const ref = `${lesson.slug}#${i}`;
      g.items.push({ ref, label: f.label, tex: f.tex, lessonTitle: lesson.title, starred: stars.has(ref) });
      groups.set(topic, g);
    });
  }
  res.json({ groups: [...groups.values()].filter((g) => g.items.length > 0) });
}

const starSchema = z.object({ ref: z.string().min(1) });

/** POST /api/study/formulas/star { ref } — toggle a favourite formula. */
export async function starFormula(req: Request, res: Response): Promise<void> {
  if (!req.auth) throw unauthorized();
  const { ref } = starSchema.parse(req.body);
  const existing = await prisma.formulaStar.findUnique({ where: { userId_ref: { userId: req.auth.sub, ref } } });
  if (existing) {
    await prisma.formulaStar.delete({ where: { id: existing.id } });
    res.json({ starred: false });
  } else {
    await prisma.formulaStar.create({ data: { userId: req.auth.sub, ref } });
    res.json({ starred: true });
  }
}
