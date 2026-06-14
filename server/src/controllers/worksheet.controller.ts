import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { unauthorized, notFound } from "../utils/httpError.js";
import { revealAnswer } from "../utils/grading.js";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * GET /api/worksheet/:slug — a printable problem set for one lesson.
 *
 * Returns prompts + a separate answer key. Question order and MCQ option order
 * are reshuffled on every call, so each generation is a fresh practice sheet.
 * Rendering to PDF happens client-side via the browser's print dialog — no
 * third-party service.
 */
export async function worksheet(req: Request, res: Response): Promise<void> {
  if (!req.auth) throw unauthorized();
  const lesson = await prisma.lesson.findUnique({
    where: { slug: req.params.slug },
    include: {
      world: { select: { name: true, subtitle: true } },
      questions: { orderBy: [{ scope: "asc" }, { orderIndex: "asc" }] },
    },
  });
  if (!lesson || !lesson.published) throw notFound("Lesson not found");

  const items = shuffle(lesson.questions).map((q, i) => {
    let options: string[] | null = null;
    if (q.kind === "MCQ" && Array.isArray(q.options)) options = shuffle(q.options as string[]);
    else if ((q.kind === "ORDER" || q.kind === "PROOF") && Array.isArray(q.options)) options = shuffle(q.options as string[]);
    else if (q.kind === "MATCHING" && q.options && typeof q.options === "object") {
      const o = q.options as { left: string[]; right: string[] };
      options = [...o.left, ...shuffle(o.right)];
    }
    return {
      number: i + 1,
      kind: q.kind,
      difficulty: q.difficulty,
      prompt: q.prompt,
      options,
      answer: revealAnswer(q),
    };
  });

  res.json({
    title: lesson.title,
    tagline: lesson.tagline,
    worldName: lesson.world.name,
    estMinutes: lesson.estMinutes,
    questions: items,
  });
}
