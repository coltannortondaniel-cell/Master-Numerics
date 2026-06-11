import { PrismaClient, type Subject } from "@prisma/client";
import type { WorldSeed } from "./seed-data/types.js";
import { worlds } from "./seed-data/worlds.js";
import { districts } from "./seed-data/math/districts.js";

const prisma = new PrismaClient();

async function seedSubject(subject: Subject, list: WorldSeed[]) {
  for (const [wi, w] of list.entries()) {
    const world = await prisma.world.create({
      data: {
        slug: w.slug,
        subject,
        name: w.name,
        subtitle: w.subtitle,
        description: w.description,
        orderIndex: wi + 1,
        gradeRange: w.gradeRange,
        scaleLabel: w.scaleLabel,
        palette: w.palette,
      },
    });

    for (const [li, l] of w.lessons.entries()) {
      const lesson = await prisma.lesson.create({
        data: {
          worldId: world.id,
          slug: l.slug,
          title: l.title,
          tagline: l.tagline,
          orderIndex: li + 1,
          xpReward: l.xpReward,
          estMinutes: l.estMinutes,
          published: true,
        },
      });

      await prisma.lessonSection.createMany({
        data: l.sections.map((s, si) => ({
          lessonId: lesson.id,
          kind: s.kind,
          orderIndex: si + 1,
          title: s.title ?? null,
          content: s.content as object,
        })),
      });

      let cc = 0;
      let pr = 0;
      await prisma.quizQuestion.createMany({
        data: l.questions.map((q) => ({
          lessonId: lesson.id,
          scope: q.scope,
          orderIndex: q.scope === "CONCEPT_CHECK" ? ++cc : ++pr,
          kind: q.kind,
          prompt: q.prompt,
          options: q.options ?? undefined,
          answer: q.answer as object,
          hint: q.hint ?? null,
          explanation: q.explanation,
        })),
      });
      console.log(`  ✓ ${world.name} › ${lesson.title}`);
    }
    if (w.lessons.length === 0) console.log(`  · ${world.name} (charted, content coming)`);
  }
}

async function main() {
  console.log("🌌 Seeding Master Numerics…");
  // Dev seed: rebuild content tables from scratch (cascades to lessons etc.)
  await prisma.world.deleteMany({});

  console.log("— Physics Journey —");
  await seedSubject("PHYSICS", worlds);
  console.log("— Math City —");
  await seedSubject("MATH", districts);

  console.log("✨ Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
