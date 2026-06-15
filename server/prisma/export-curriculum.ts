// One-shot exporter: serialize the ENTIRE curriculum (physics worlds + math
// districts, every lesson, section, video, and question) to a single JSON file
// for import into another app builder. Run: npx tsx prisma/export-curriculum.ts
import fs from "node:fs";
import path from "node:path";
import { worlds } from "./seed-data/worlds.js";
import { districts } from "./seed-data/math/districts.js";

const data = {
  app: "Master Numerics",
  generatedAt: new Date().toISOString(),
  physics: worlds,
  math: districts,
};

const out = path.resolve(process.cwd(), "..", "curriculum-export.json");
fs.writeFileSync(out, JSON.stringify(data, null, 2));

// ---- counts for verification ----
type AnyLesson = { sections?: unknown[]; questions?: unknown[] };
const allWorlds = [...worlds, ...districts] as { lessons: AnyLesson[] }[];
let lessons = 0, questions = 0, videos = 0, sections = 0;
for (const w of allWorlds) {
  for (const l of w.lessons) {
    lessons++;
    questions += l.questions?.length ?? 0;
    sections += l.sections?.length ?? 0;
    for (const s of l.sections ?? []) {
      const c = (s as { kind?: string; content?: { videos?: unknown[] } });
      if (c.kind === "VIDEOS") videos += c.content?.videos?.length ?? 0;
    }
  }
}
const bytes = fs.statSync(out).size;
console.log(`✓ wrote ${out}`);
console.log(`  physics worlds: ${worlds.length}`);
console.log(`  math districts: ${districts.length}`);
console.log(`  lessons: ${lessons}`);
console.log(`  sections: ${sections}`);
console.log(`  questions: ${questions}`);
console.log(`  embedded videos: ${videos}`);
console.log(`  file size: ${(bytes / 1024).toFixed(0)} KB`);
