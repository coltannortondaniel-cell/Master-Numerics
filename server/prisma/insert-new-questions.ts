/**
 * Non-destructive insert of the new interactive question types into EXISTING
 * lessons — unlike `seed.ts --force` this never deletes worlds, so user
 * progress is preserved. Idempotent: questions already present (matched by
 * prompt) are skipped. Run with: `tsx prisma/insert-new-questions.ts`.
 */
import { PrismaClient } from "@prisma/client";
import type { QuestionSeed } from "./seed-data/types.js";

const prisma = new PrismaClient();

/** slug → questions to ensure exist. */
const NEW_QUESTIONS: Record<string, QuestionSeed[]> = {
  "position-displacement-distance": [
    {
      scope: "CONCEPT_CHECK",
      kind: "MATCHING",
      prompt: "Match each symbol to what it represents.",
      options: { left: ["$x$", "$\\Delta x$", "$x_i$", "$x_f$"], right: ["Position", "Displacement", "Initial position", "Final position"] },
      answer: ["Position", "Displacement", "Initial position", "Final position"],
      explanation: "$x$ is position, $\\Delta x = x_f - x_i$ is displacement, and $x_i$/$x_f$ are the start and end positions.",
    },
    {
      scope: "CONCEPT_CHECK",
      kind: "FILL_BLANK",
      prompt: "Distance is a ___ (size only), while displacement is a ___ (size and direction).",
      answer: [["scalar"], ["vector"]],
      explanation: "Distance is a scalar; displacement is a vector.",
    },
    {
      scope: "CONCEPT_CHECK",
      kind: "ORDER",
      prompt: "Order the steps to find an object's displacement.",
      options: ["Choose an origin and a positive direction", "Record the initial position $x_i$", "Record the final position $x_f$", "Compute $\\Delta x = x_f - x_i$"],
      answer: [],
      difficulty: 2,
      explanation: "Set up a reference, read off the start and end positions, then subtract.",
    },
    {
      scope: "PRACTICE",
      kind: "SYMBOLIC",
      prompt: "Write displacement $\\Delta x$ as a formula in terms of the final position $x_f$ and the initial position $x_i$. (Type it like `x_f - x_i`.)",
      answer: { expr: "x_f - x_i", vars: ["x_f", "x_i"] },
      difficulty: 2,
      hint: "Displacement is the *change* in position.",
      explanation: "$\\Delta x = x_f - x_i$ — final minus initial position. (Any equivalent form, like $-x_i + x_f$, is accepted.)",
    },
  ],
};

async function main() {
  let inserted = 0;
  for (const [slug, questions] of Object.entries(NEW_QUESTIONS)) {
    const lesson = await prisma.lesson.findUnique({
      where: { slug },
      include: { questions: { select: { prompt: true, scope: true, orderIndex: true } } },
    });
    if (!lesson) {
      console.log(`· lesson "${slug}" not found — skipping`);
      continue;
    }
    const existingPrompts = new Set(lesson.questions.map((q) => q.prompt));
    // Continue numbering after the current max orderIndex per scope.
    const maxOrder = (scope: string) =>
      lesson.questions.filter((q) => q.scope === scope).reduce((m, q) => Math.max(m, q.orderIndex), 0);
    const counters: Record<string, number> = {
      CONCEPT_CHECK: maxOrder("CONCEPT_CHECK"),
      PRACTICE: maxOrder("PRACTICE"),
    };

    for (const q of questions) {
      if (existingPrompts.has(q.prompt)) {
        console.log(`  = already present: "${q.prompt.slice(0, 40)}…"`);
        continue;
      }
      counters[q.scope] += 1;
      await prisma.quizQuestion.create({
        data: {
          lessonId: lesson.id,
          scope: q.scope,
          orderIndex: counters[q.scope],
          kind: q.kind,
          prompt: q.prompt,
          options: (q.options ?? undefined) as object | undefined,
          answer: q.answer as object,
          difficulty: q.difficulty ?? 2,
          hint: q.hint ?? null,
          explanation: q.explanation,
        },
      });
      inserted++;
      console.log(`  + inserted ${q.kind}: "${q.prompt.slice(0, 40)}…"`);
    }
  }
  console.log(`\n✨ Done — ${inserted} question(s) inserted (no data wiped).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
