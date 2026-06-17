import { PrismaClient, type Subject } from "@prisma/client";
import type { WorldSeed } from "./seed-data/types.js";
import { worlds } from "./seed-data/worlds.js";
import { districts } from "./seed-data/math/districts.js";
import { cosmetics } from "./seed-data/cosmetics.js";
import { achievements } from "./seed-data/achievements.js";

const prisma = new PrismaClient();

async function syncSubject(subject: Subject, list: WorldSeed[]) {
  for (const [wi, w] of list.entries()) {
    // Upsert the world by slug — updates metadata, creates if new. The row's id
    // is preserved, so user progress (keyed by lessonId) is never touched.
    const world = await prisma.world.upsert({
      where: { slug: w.slug },
      create: {
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
      update: {
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
      const lesson = await prisma.lesson.upsert({
        where: { slug: l.slug },
        create: {
          worldId: world.id,
          slug: l.slug,
          title: l.title,
          tagline: l.tagline,
          orderIndex: li + 1,
          xpReward: l.xpReward,
          estMinutes: l.estMinutes,
          difficulty: l.difficulty ?? 2,
          requiresMathSlug: l.requiresMath ?? null,
          published: true,
        },
        update: {
          worldId: world.id,
          title: l.title,
          tagline: l.tagline,
          orderIndex: li + 1,
          xpReward: l.xpReward,
          estMinutes: l.estMinutes,
          difficulty: l.difficulty ?? 2,
          requiresMathSlug: l.requiresMath ?? null,
          published: true,
        },
      });

      // Replace this lesson's sections + questions. These carry no per-user
      // data (progress/attempts/XP reference the lesson, not its questions), so
      // rebuilding them refreshes content without affecting learners.
      await prisma.lessonSection.deleteMany({ where: { lessonId: lesson.id } });
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
      await prisma.quizQuestion.deleteMany({ where: { lessonId: lesson.id } });
      await prisma.quizQuestion.createMany({
        data: l.questions.map((q) => ({
          lessonId: lesson.id,
          scope: q.scope,
          orderIndex: q.scope === "CONCEPT_CHECK" ? ++cc : ++pr,
          kind: q.kind,
          prompt: q.prompt,
          options: q.options ?? undefined,
          answer: q.answer as object,
          difficulty: q.difficulty ?? 2,
          hint: q.hint ?? null,
          explanation: q.explanation,
          tutor: q.hints || q.diagnostics ? { hints: q.hints, diagnostics: q.diagnostics } : undefined,
        })),
      });
      console.log(`  ✓ ${world.name} › ${lesson.title}`);
    }
    if (w.lessons.length === 0) console.log(`  · ${world.name} (charted, content coming)`);
  }
}

async function main() {
  console.log("🌌 Seeding Master Numerics…");

  // FORCE_RESEED=1 does a clean rebuild from scratch (wipes content + the user
  // progress that cascades from it). Otherwise we run a NON-DESTRUCTIVE sync:
  // worlds and lessons are upserted by slug, so new content drops appear on
  // every deploy while existing user progress is preserved.
  if (process.env.FORCE_RESEED) {
    console.log("⚠ FORCE_RESEED set — rebuilding content from scratch.");
    await prisma.world.deleteMany({});
  } else {
    console.log("↻ Syncing content (non-destructive upsert; progress preserved).");
  }

  console.log("— Physics Journey —");
  await syncSubject("PHYSICS", worlds);
  console.log("— Math City —");
  await syncSubject("MATH", districts);

  console.log("— Cosmetics & Achievements —");
  // Add any new cosmetics/achievements without removing existing ones (which
  // users may already own / have earned).
  await prisma.cosmetic.createMany({
    skipDuplicates: true,
    data: cosmetics.map((c) => ({
      key: c.key,
      name: c.name,
      type: c.type,
      rarity: c.rarity,
      description: c.description,
      coinPrice: c.coinPrice ?? 0,
    })),
  });
  await prisma.achievement.createMany({ skipDuplicates: true, data: achievements });
  console.log(`  ✓ ${cosmetics.length} cosmetics, ${achievements.length} achievements`);

  console.log("✨ Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
