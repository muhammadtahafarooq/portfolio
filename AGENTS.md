# AGENTS.md — Muhammad Taha Portfolio

## Project Overview

Premium interactive personal developer portfolio with lightweight admin CMS.
**Status:** Architecture LOCKED — No changes without human approval.

## Architecture (LOCKED)

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router) |
| Backend | Next.js API Routes (Route Handlers) |
| Database | Turso (libSQL/SQLite) |
| ORM | Drizzle ORM |
| Auth | NextAuth.js (Auth.js) |
| Deployment | Vercel |
| 3D | Three.js + React Three Fiber + Drei |
| Motion | Framer Motion + Lenis |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui primitives |
| Icons | Lucide React |
| Forms | React Hook Form + Zod |
| Email | Resend |
| Storage | Cloudflare R2 |

## Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run format           # Format with Prettier
npm run format:check     # Check formatting
npm run typecheck        # TypeScript check

# Testing
npm run test             # Run tests (watch mode)
npm run test:run         # Run tests (single)
npm run test:coverage    # Run with coverage

# Database
npm run db:generate      # Generate migrations
npm run db:migrate       # Run migrations
npm run db:push          # Push schema changes
npm run db:studio        # Open Drizzle Studio
```

## Project Structure

```
src/
├── app/
│   ├── (public)/         # Public routes (navbar + footer layout)
│   │   ├── page.tsx      # Homepage
│   │   ├── about/
│   │   ├── projects/
│   │   ├── experience/
│   │   ├── education/
│   │   ├── certifications/
│   │   ├── resume/
│   │   └── contact/
│   ├── admin/            # Admin dashboard (sidebar layout)
│   │   ├── page.tsx      # Dashboard
│   │   ├── login/
│   │   ├── projects/
│   │   ├── skills/
│   │   ├── experience/
│   │   ├── education/
│   │   ├── certifications/
│   │   ├── achievements/
│   │   ├── resume/
│   │   ├── social-links/
│   │   ├── messages/
│   │   ├── github/
│   │   ├── homepage/
│   │   └── settings/
│   ├── api/              # API routes
│   ├── layout.tsx        # Root layout
│   ├── sitemap.ts
│   ├── robots.ts
│   └── not-found.tsx
├── components/
│   ├── ui/               # shadcn/ui primitives
│   ├── public/           # Public site components
│   ├── admin/            # Admin dashboard components
│   ├── 3d/               # Three.js components
│   └── motion/           # Animation components
├── lib/
│   ├── db/               # Database (schema, queries)
│   ├── auth/             # NextAuth config
│   ├── email/            # Resend integration
│   ├── storage/          # R2 integration
│   ├── github/           # GitHub API
│   ├── validators/       # Zod schemas
│   └── utils.ts          # cn() utility
├── hooks/                # Custom React hooks
├── types/                # Shared TypeScript types
├── styles/               # globals.css
└── __tests__/            # Tests
```

## Code Style

- **TypeScript** strict mode
- **No semicolons**
- **Single quotes**
- **2-space indentation**
- **Tailwind CSS** for all styling
- **Server Components** by default; `'use client'` only when needed
- **Async functions** in Server Components for data fetching

## Data Fetching

- Public pages: `export const dynamic = 'force-dynamic'` + async Server Components
- Admin pages: Client-side fetching with `useEffect` + `fetch`
- API routes: `getServerSession(authOptions)` for auth check

## Database Pattern

```typescript
// Singleton tables (profile, about, resume, homepage_content, site_settings)
const result = await db.select().from(schema.table).limit(1)
return result[0] || null

// Collection tables (skills, projects, experience, etc.)
return db.select().from(schema.table).orderBy(asc(schema.table.sortOrder))
```

## Authentication

- Admin-only; no public registration
- `getServerSession(authOptions)` in API routes
- Middleware protects `/admin/*` routes
- JWT strategy with 24h expiry

## Environment Variables

See `.env.example` for required variables. Never commit `.env.local`.

## Testing

- **Vitest** for unit tests
- **@testing-library/react** for component tests
- Tests in `src/__tests__/` directory
- Run `npm run test:coverage` before PRs

## Git Convention

- Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`
- Branch naming: `feature/xxx`, `fix/xxx`, `chore/xxx`
- No commits to `main` without PR review

## Blockers / Open Questions

1. **3D concept** — Abstract geometric environment; exact assets TBD
2. **Admin email** — Configure `CONTACT_EMAIL` for notifications
3. **R2 bucket** — Create Cloudflare R2 bucket for image storage
4. **Turso database** — Create Turso database and get credentials
5. **Resend API key** — Get from resend.com
6. **GitHub token** — Personal access token for repo sync

## DO NOT

- Change architecture without human approval
- Add new dependencies without approval
- Commit secrets or API keys
- Use `any` type
- Skip error handling
- Use `console.log` in production code (use proper logging)
