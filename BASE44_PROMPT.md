# Master Numerics — full Base44 build package

You have TWO files:
1. **This prompt** (the full app spec).
2. **`curriculum-export.json`** — the COMPLETE real curriculum: 21 physics worlds,
   14 math districts, 134 lessons, 1,176 sections, **1,051 questions**, and 74 embedded
   YouTube videos, with all lesson prose, worked examples, answers, and explanations.

**Use the JSON as the source of truth for content** — import it verbatim and render it.
Generate code/UI from the prompt; do NOT rewrite or shorten the curriculum.

---

## curriculum-export.json — schema

```
{
  "app": "Master Numerics",
  "physics": [ World, ... ],   // 21 cosmic worlds, K → graduate
  "math":    [ World, ... ]    // 14 city/nature districts, K → graduate
}

World = {
  slug, name, subtitle, description, gradeRange, scaleLabel,
  palette: { accent, glow },
  lessons: [ Lesson, ... ]
}

Lesson = {
  slug, title, tagline, estMinutes, xpReward, difficulty (1–5),
  requiresMath?  (slug of a math lesson this physics lesson depends on),
  sections: [ Section, ... ],
  questions: [ Question, ... ]
}

Section = { kind, title?, content }  // kind ∈
  HERO            content: { scene, headline, sub }
  CONTEXT         content: { markdown }
  CONCEPT         content: { markdown }
  SIMULATION      content: { simId, intro }            // interactive mini-sim by id
  WORKED_EXAMPLES content: { examples: [{ title, problem, steps[], answer }] }
  VIDEOS          content: { videos: [{ youtubeId, title }] }   // embed these
  CONCEPT_CHECK   content: { intro }                   // shows scope=CONCEPT_CHECK Qs
  PRACTICE        content: { intro }                   // shows scope=PRACTICE Qs
  DEEPER_DIVE     content: { markdown }
  SUMMARY         content: { takeaways: [string], formulas: [{ label, tex }] }

Question = {
  scope: "CONCEPT_CHECK" | "PRACTICE",
  kind: "MCQ"|"TRUE_FALSE"|"NUMERIC"|"MATCHING"|"FILL_BLANK"|"ORDER"|"PROOF"|"SYMBOLIC"|"GRAPH",
  prompt, options?, answer, difficulty? (1–5), hint?, explanation
}
// answer by kind:
//   MCQ → correct index (number)        TRUE_FALSE → boolean
//   NUMERIC → { value, tolerance }      MATCHING → right[] in left order
//   FILL_BLANK → string[][] (accepted strings per blank)
//   ORDER/PROOF → [] (options already in correct order; learner reorders)
//   SYMBOLIC → { expr, vars?, tolerance? }
//   GRAPH → { expr, domain?, variable?, tolerance?, mode?, samples? }
//           mode:"draw" ⇒ render a sketch-the-curve canvas instead of a text field
```
All markdown/prompts use **KaTeX** math in `$…$` / `$$…$$` (escape literal money as `\$`).

---

## APP SPEC

Build a gamified "digital university" called **Master Numerics** — an immersive journey
through mathematics and physics from kindergarten through graduate level. Curriculum is
DATA (imported from `curriculum-export.json`), not hand-written pages. Two themed,
Duolingo-style scrollable lesson-path worlds, a local in-browser answer-checking engine,
embedded videos, downloadable worksheets, formula flashcards, and a restrained
black-and-white + one electric-blue-accent design. Free-demo mode: ALL content is open,
the store sells ONLY cosmetics, and nothing about learning is paywalled.

### Design system (strict)
- Monochrome base (near-black bg `#06070B`, off-white text `#F4F6FB`) + ONE accent:
  electric blue `#2D7DFF`. Color is a REWARD SIGNAL only — semantic tokens: accent (blue),
  success (green), alert (red), star (gold `#F5B83C`), plus neutral surface/line/fg.
- **NO EMOJI** anywhere — use clean line icons and SVG shapes.
- Real math notation everywhere via **KaTeX**.
- Honor `prefers-reduced-motion` (animations cross-fade/skip).
- Fully responsive: no overlapping text at mobile or desktop widths.
- Subtle ever-present starfield behind every screen. Physics = cosmic theme;
  Math = city/nature theme.

### Two worlds + zoom transition
- Physics "Journey" = a COSMIC scroll; Math "City" = a CITY/NATURE scroll. Both render as
  a Duolingo-style path of unit nodes: a mastery ring around each node, 0–3 stars above,
  unit name below; done / current / locked / coming-soon states. "Locked" nodes are still
  tappable to preview — never a dead end.
- A "warp"/zoom hyperspace transition animates travel between the two worlds and between
  units (reduced-motion safe → instant navigate when reduced motion is on).
- Per-LESSON and per-QUESTION difficulty indicators (1–5) as small pips/stars.
- Cross-subject prerequisite: when a physics lesson has `requiresMath`, show a
  "need a refresher?" card linking straight to that math lesson (working jump link).

### Lesson player
Render every section in order: HERO → CONTEXT → CONCEPT → SIMULATION → WORKED_EXAMPLES →
VIDEOS (embed the YouTube ids) → CONCEPT_CHECK → PRACTICE → DEEPER_DIVE → SUMMARY.
Quizzes are stepped (one question at a time) with instant per-question explained feedback,
then a summary; PRACTICE sets record a scored attempt.

### Local grading engine (no third-party services)
Grade IN THE BROWSER and ALWAYS return an explained result (why right/wrong):
- NUMERIC: tolerance compare. MCQ/TRUE_FALSE/FILL_BLANK/MATCHING/ORDER/PROOF: direct.
- SYMBOLIC: algebraic equivalence by RANDOM SAMPLING (1/2 ≡ 0.5, (x+1)^2 ≡ x^2+2x+1).
- GRAPH: sample the entered function vs the target over a domain; show a live preview plot
  (target hidden until graded).
- GRAPH `mode:"draw"`: a sketch-the-curve canvas (mouse + touch) — drag a row of nodes to
  trace a graph; grade node heights vs the target with a generous tolerance; reveal the
  target curve after grading.
- Expression evaluator: use RADIANS; treat adjacent identifiers as one token (explicit `*`
  for multiply); single-letter or underscore-suffixed variables (`x`, `x_f`).

### Gamification
XP per lesson/challenge; daily XP goal; day streaks; mastery per lesson (0–1 ring) + 0–3
stars and a "Lesson mastered!" state; ranks with progress; daily challenges with claimable
rewards; level-up / reward toasts (icon-based, no emoji).

### Store — COSMETIC ONLY (no learning paywall)
Earn coins; spend ONLY on cosmetics: mascot/avatar outfits, hats, pets, profile
backgrounds, auras, titles, badges, path skins, cosmetic loot crates. A friendly mascot
with moods (idle/happy/thinking/celebrate) drawn with SVG/icons. Free-demo flag: when the
paywall is OFF (default), EVERY lesson/world is open and NO subscribe prompts, trial
countdowns, or upgrade banners appear anywhere.

### Pages / features
Onboarding (mascot-guided: pick subject + grade → recommended start); Auth; Dashboard
(welcome, streak, daily goal, daily challenges, rank progress, quick links, continue);
Physics Journey map + World + Lesson; Math City map + District + Lesson; downloadable
WORKSHEETS per lesson (printable / Save-as-PDF, optional answer key, regenerate reshuffle);
FLASHCARDS (spaced repetition, SM-2: Again/Hard/Good/Easy); FORMULAS reference sheet
(KaTeX, favorites, printable); graphing CALCULATOR; NOTEBOOK scratchpad; social
(leaderboard, friends, real-time head-to-head quiz BATTLE); achievements; profile +
customization; in-app NOTIFICATIONS (bell + feed + toasts); settings (theme, reduced
motion, high contrast); admin view.

### Acceptance criteria
✓ Lesson player renders all section kinds incl. embedded YouTube videos.
✓ All question kinds graded locally with explained feedback, incl. the drawn/sketch canvas.
✓ Downloadable worksheets; formula flashcards.
✓ Two themed scroll worlds (cosmic physics, city/nature math) as Duolingo paths, with a
  zoom/warp transition between them.
✓ Per-lesson AND per-question difficulty indicators (1–5).
✓ Cross-subject math-prerequisite surfacing with a working jump-to-math link.
✓ Streaks, XP, mastery; cosmetic-only store with NO lesson paywall; in-app notifications.
✓ Restrained B&W + electric-blue UI; color only in reward states; NO emoji; no overlapping
  text at mobile/desktop; real KaTeX math; reduced-motion-safe animations.
✓ ALL imported content rendered: 21 physics worlds + 14 math districts, 134 lessons, 1,051
  questions, 74 videos — K → graduate, both subjects, verbatim from curriculum-export.json.
