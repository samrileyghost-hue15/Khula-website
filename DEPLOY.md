# KHULA — Deployment Guide

## Stack

| Layer | Service |
|---|---|
| Frontend (SPA) | Cloudflare Pages |
| API (Worker) | Cloudflare Workers |
| Database | Supabase (hosted) |
| CI/CD | GitHub Actions |

---

## 1. Supabase Hosted Project

### Create the project

1. Go to [supabase.com](https://supabase.com) → New project
2. Name it `khula-website`, choose a region close to South Africa (e.g. `ap-southeast-1`)
3. Save the database password somewhere safe

### Run migrations

Once the project is created, push the local schema:

```bash
# Link to your hosted project (run once)
supabase login
supabase link --project-ref <your-project-ref>

# Push migrations and seed data
supabase db push
```

Or run migrations manually in the Supabase SQL editor by pasting:
- `supabase/migrations/20241012000001_initial_schema.sql`
- `supabase/migrations/20241012000002_rls_policies.sql`
- `supabase/seed.sql`

### Get your keys

Supabase dashboard → Project Settings → API:

| Key | Where used |
|---|---|
| Project URL | `VITE_SUPABASE_URL` + `SUPABASE_URL` |
| `anon` / public key | `VITE_SUPABASE_ANON_KEY` + `SUPABASE_ANON_KEY` |
| `service_role` key | `SUPABASE_SERVICE_ROLE_KEY` (Worker only — never frontend) |

---

## 2. Cloudflare Setup

### Get your credentials

1. [dash.cloudflare.com](https://dash.cloudflare.com) → top-right menu → Account ID (copy it)
2. My Profile → API Tokens → Create Token → **Edit Cloudflare Workers** template
   - Add permission: **Cloudflare Pages — Edit**
   - Copy the token

### Set Worker secrets (production)

```bash
wrangler secret put SUPABASE_URL
wrangler secret put SUPABASE_SERVICE_ROLE_KEY
wrangler secret put SUPABASE_ANON_KEY
```

---

## 3. GitHub Secrets

In your GitHub repo → Settings → Secrets and variables → Actions, add:

| Secret name | Value |
|---|---|
| `CLOUDFLARE_API_TOKEN` | API token from step above |
| `CLOUDFLARE_ACCOUNT_ID` | Account ID from Cloudflare |
| `VITE_SITE_URL` | `https://yourdomain.com` |
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_URL` | Same as VITE_SUPABASE_URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |
| `SUPABASE_ANON_KEY` | Same as VITE_SUPABASE_ANON_KEY |

---

## 4. First Deploy

**Important: all commands must be run from the `khula-website/` directory.**

```powershell
# Make sure you are in the right folder first
cd "c:\Users\Student\.kiro\khula-website"

# One-time: authenticate wrangler
npx wrangler login

# Set the three Supabase secrets on the deployed Worker
npx wrangler secret put SUPABASE_URL
npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY
npx wrangler secret put SUPABASE_ANON_KEY

# Build + deploy everything
npm run deploy
```

After the first deploy, every push to `main` triggers the GitHub Actions workflow automatically.

---

## 5. Local Development

Requires: Docker Desktop running + Supabase CLI installed

```bash
# Terminal 1 — start local Supabase (Postgres + API)
supabase start
supabase db reset --local      # runs migrations + seed

# Terminal 2 — start Worker API on :8787
cd worker
cp .dev.vars.example .dev.vars  # fill in keys from `supabase start` output
npm run dev

# Terminal 3 — start Vite frontend on :5173
cp .env.example .env            # fill in keys from `supabase start` output
npm run dev
```

Frontend at: http://localhost:5173
Supabase Studio at: http://localhost:54323

---

## 6. Regenerate TypeScript DB types

After any schema change:

```bash
npm run types:db
```

This runs `supabase gen types typescript --local` and overwrites `src/types/database.ts`.
