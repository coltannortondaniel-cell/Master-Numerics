# Master Numerics

An immersive, gamified math & physics education platform — Kindergarten through graduate school.

**This repository is at Phase 1 (Foundation)** of the 10-phase build plan: project scaffold, full authentication, the users/subscriptions database schema, Stripe subscriptions with a 1-day free trial, and route guards on both the API and the client.

## Stack

| Layer | Tech |
|---|---|
| Frontend | React 18 · TypeScript · Vite · TailwindCSS · Framer Motion · Zustand · React Router v6 |
| Backend | Node.js · Express · TypeScript · Prisma |
| Data | PostgreSQL (primary) · Redis (cache/presence, used heavily from Phase 5) |
| Payments | Stripe Checkout + webhooks |
| Auth | Argon2 password hashing · 15-min JWT access tokens · 30-day rotating refresh tokens in httpOnly cookies |

## What works in Phase 1

- `POST /api/auth/register` — email, username, password, date of birth, grade level; starts a **24-hour full-access trial** (no card)
- `POST /api/auth/login` — with "remember me" (persistent vs session cookie)
- `POST /api/auth/refresh` — silent session restore with **refresh-token rotation** (a stolen token is single-use)
- `POST /api/auth/logout`, `forgot-password`, `reset-password` — full email reset flow (logs the link to console if SMTP isn't configured)
- `POST /api/billing/checkout` — Stripe Checkout for **$4.99/mo** or **$39.99/yr**
- `POST /api/billing/portal` — Stripe billing portal (manage / cancel)
- `POST /api/billing/webhook` — handles `checkout.session.completed`, subscription created/updated/deleted, `invoice.payment_failed`
- `GET /api/content/ping` — demo route behind the **subscription gate** (trial OR active subscription)
- Client pages: `/register`, `/login`, `/forgot-password`, `/reset-password`, `/subscribe` (paywall), `/dashboard` (with a live trial countdown), all wrapped in the cosmic design system from the spec (§13)

Google OAuth is stubbed on the login page and lands in a later pass (it needs your Google client ID).

## Local setup

Prerequisites: Node 20+, Docker, a Stripe test account.

```bash
# 1. Databases
docker compose up -d

# 2. Backend
cd server
cp .env.example .env
# Fill in: two JWT secrets (openssl rand -hex 64), your Stripe test keys,
# and two Stripe Price IDs (create products at $4.99/mo and $39.99/yr in the
# Stripe dashboard, test mode).
npm install
npx prisma migrate dev --name init
npm run dev          # http://localhost:4000

# 3. Frontend (new terminal)
cd client
npm install
npm run dev          # http://localhost:5173 (proxies /api to :4000)

# 4. Stripe webhooks (new terminal)
stripe listen --forward-to localhost:4000/api/billing/webhook
# Copy the printed whsec_... into server/.env as STRIPE_WEBHOOK_SECRET
```

Test card: `4242 4242 4242 4242`, any future expiry, any CVC.

## Architecture notes

- **Access token in memory only** on the client (never localStorage); the axios interceptor silently refreshes on 401 and replays the request.
- **Refresh tokens are stored hashed** (SHA-256) and rotated on every use; password reset revokes all sessions.
- The **subscription gate** (`requireSubscription` middleware) allows access while `user.trialEndsAt` is in the future OR the local subscription row is `ACTIVE`/`TRIALING` with an unexpired period. The local row is kept in sync exclusively by Stripe webhooks — the client never tells the server it paid.
- The Stripe webhook is mounted with `express.raw()` **before** `express.json()` so signature verification sees the exact bytes.
- Express 4 + async controllers: every async handler is wrapped in `asyncHandler` so thrown `HttpError`s reach the central error middleware (which also formats Zod validation errors into per-field messages the forms display inline).

## Next: Phase 2 — Physics Journey

Cosmic map UI (18 worlds), the 11-section lesson viewer, the first three worlds with real lesson content, embedded YouTube, quizzes, and XP awards.
