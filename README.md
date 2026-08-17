# My Little DevSquad

Platform for junior developers to apply for mentored squad projects and build a real portfolio.

**Problem:** early-career devs struggle to get hands-on experience.  
**Solution:** collect profiles (stack, level, availability, GitHub), then form small squads with mentorship.

## Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Forms:** React Hook Form, Zod, TanStack Query
- **Backend (dev):** Supabase local (Postgres + Auth + API) via Docker
- **Tests:** Vitest, Testing Library

## Features

| Area | Status |
|------|--------|
| Multi-step registration form | Done |
| Persist applicants (Supabase insert + RLS) | Done |
| Success screen | Done |
| Admin login (Supabase Auth) | Done |
| Protected `/admin` route | Base ready |
| Applicant list + squad builder (DnD) | Phase 2 |

## Local development

### Prerequisites

- [Node.js](https://nodejs.org/) 20+
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (running)
- [Supabase CLI](https://supabase.com/docs/guides/cli/getting-started)

```bash
# macOS (Homebrew)
brew install supabase/tap/supabase
```

### Setup

```bash
git clone https://github.com/kiaravzm/my-little-devsquad.git
cd my-little-devsquad
npm install

# Start local Supabase (Postgres + Auth + Studio in Docker)
npm run db:start

# Copy env template and fill the anon key from db:status
cp .env.example .env.local
npm run db:status
```

Paste `API URL` → `VITE_SUPABASE_URL` and `anon key` → `VITE_SUPABASE_PUBLISHABLE_KEY` in `.env.local`.

Apply migrations and seed data (first time or after schema changes):

```bash
npm run db:reset
```

Create an admin user for `/login`:

1. Open **Supabase Studio:** http://127.0.0.1:54323  
2. **Authentication** → **Add user** (email + password)  
3. Sign in at http://localhost:5173/login  

Run the app:

```bash
npm run dev
```

| URL | Purpose |
|-----|---------|
| http://localhost:5173 | Registration form |
| http://localhost:5173/login | Admin login |
| http://localhost:5173/admin | Admin (protected) |
| http://127.0.0.1:54323 | Supabase Studio |

### Database scripts

| Command | Description |
|---------|-------------|
| `npm run db:start` | Start local Supabase stack (Docker) |
| `npm run db:stop` | Stop local stack |
| `npm run db:reset` | Re-run migrations + `supabase/seed.sql` |
| `npm run db:status` | Show API URL and keys |

Migrations live in `supabase/migrations/`. RLS policies are documented in SQL comments.

### Tests

```bash
npm test
npm run test:coverage
```

## Project structure

```
src/
├── app/                 # routes, providers
├── features/
│   ├── registration/    # public signup flow
│   ├── auth/            # login, session, ProtectedRoute
│   └── admin/           # admin dashboard (Phase 2)
├── lib/supabase/        # browser client
└── components/ui/       # shadcn components
supabase/
├── config.toml          # local stack config
├── migrations/          # SQL schema + RLS
└── seed.sql             # local sample data
```

## Roadmap

- [x] Phase 1 — Registration form, Supabase persistence, tests
- [ ] Phase 2 — List applicants, filters, drag-and-drop squads
- [ ] Phase 3 — README demo deploy, E2E, i18n (EN)

## Why local Supabase instead of cloud-only?

Cloud free tiers can pause inactive projects and block development. The local stack keeps Postgres + Auth available whenever Docker is running, with the same client code and RLS model.

## License

Private / personal project.
