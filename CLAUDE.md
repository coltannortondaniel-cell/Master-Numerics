# CLAUDE.md

Guidance for working in this repository.

## What this is

**Master Numerics** — a gamified "digital university" for mathematics and physics,
K through graduate level. Two themed worlds (Physics = a cosmic scroll, Math = a
city/nature scroll) rendered as Duolingo-style lesson paths, with a local
answer-checking engine, worksheets, flashcards, and a restrained B&W + electric-blue
design system. Curriculum is **data, not hand-written pages**.

## Monorepo layout

```
client/   React 18 + Vite + TypeScript, Tailwind, Framer Motion, KaTeX, Zustand
server/   Express + Prisma (Postgres) + Redis, JWT auth, Stripe (free-mode), socket.io
```

Root scripts (used by Render):
- `npm run build` — installs both packages, `prisma generate`, builds server + client.
- `npm start` — `cd server && npm run start:prod` = `prisma db push` → `db:seed` → start.

## Common commands

Server (`cd server`):
- `npm run dev` — tsx watch dev server
- `npm run build` / `npx tsc -p tsconfig.json --noEmit` — build / typecheck
- `npm run db:seed` — **non-destructive content sync** (upserts worlds/lessons by slug; preserves user progress). `FORCE_RESEED=1` does a clean wipe-and-rebuild.
- `npm run content:validate` — **quality gate**: checks every question (KaTeX balance, gradability, expression compilation, difficulty, explanations). Run this after any content change.
- `npm run db:insert-questions` — adds specific new questions to existing lessons (legacy helper; the sync seed now covers most cases).

Client (`cd client`):
- `npm run dev`, `npx tsc --noEmit`, `npx vite build`

## Content system (the important part)

Curriculum lives as typed data under `server/prisma/seed-data/`:
- `worlds.ts` (physics) and `math/districts.ts` (math) are the **aggregators** — each lists worlds/districts and imports a per-unit lesson file.
- Per-unit files export `LessonSeed[]`; the schema is in `seed-data/types.ts`.
- A `LessonSeed` has `sections[]` (HERO, CONTEXT, CONCEPT, SIMULATION, WORKED_EXAMPLES, VIDEOS, CONCEPT_CHECK, PRACTICE, DEEPER_DIVE, SUMMARY) and `questions[]`.

To add a unit: write `seed-data/<subject>/<name>.ts`, import it into the aggregator,
point the world/district's `lessons:` at it, then run `npm run content:validate`.

### Question kinds (all graded locally where free-response)
`MCQ`, `TRUE_FALSE`, `NUMERIC`, `MATCHING`, `FILL_BLANK`, `ORDER`, plus:
- `SYMBOLIC` — algebraic equivalence by sampling. `answer: { expr, vars?, tolerance? }`.
- `GRAPH` — function matched over a domain. `answer: { expr, domain?, variable?, tolerance? }`.
- `PROOF` — assemble steps in correct order (`options` = canonical order, like ORDER).

Every question takes a `difficulty` (1–5). Lessons take `difficulty` and optional
`requiresMath` (slug of a math lesson — surfaces a cross-subject jump prompt).

### Grading engine (no third-party services)
Equivalence is checked by **random sampling**, shared in spirit between:
- client `client/src/lib/grader.ts` (instant feedback; reuses `lib/mathEval.ts`)
- server `server/src/utils/symbolic.ts` + `utils/grading.ts` (authoritative, records attempts)

SYMBOLIC/GRAPH ship their answer to the client (needed for local grading); all
other kinds keep answers server-side. `mathEval` uses **radians** and treats
adjacent identifiers as one token (`xy` is one variable) — use explicit `*` and
single-letter or underscore-suffixed vars (`x_f`) in expressions.

## Conventions

- **Design tokens**: restrained, monochrome + one accent. Color is a *reward signal* —
  use semantic tokens (`accent`, `success`, `alert`, `star`, `fg`, `line`, `base`,
  `nebula`). Avoid reintroducing legacy hardcoded purples/greens/golds. No emoji in UI.
- **KaTeX**: math in `$…$`. Escape literal dollar signs as `\$` (money) — the
  validator catches unbalanced `$`.
- **Reduced motion**: honor `prefers-reduced-motion` (transitions cross-fade/skip).
- Match surrounding code style; keep comments at the existing density.

## Deploy notes (Render)

- `render.yaml` blueprint: one web service (Express serves API + socket.io + built
  client) + managed Postgres + Redis. Tracks the `main` branch.
- Free-demo mode: `PAYWALL_ENABLED=false` opens all content; Stripe/SMTP optional.
- **Content updates apply on redeploy** via the non-destructive sync seed — no env
  var needed. Use `FORCE_RESEED=1` only for a deliberate clean rebuild (wipes progress).
- See `DEPLOY.md` for the click-through and enabling payments later.

## Gotchas

- After editing content, always run `npm run content:validate` (it has caught real
  KaTeX/money-`$` bugs).
- The seed is **upsert-by-slug**; changing a lesson's `slug` orphans the old row's
  progress. Keep slugs stable.
- Schema changes apply via `prisma db push` on boot; regenerate the client with
  `npx prisma generate` before typechecking locally.
