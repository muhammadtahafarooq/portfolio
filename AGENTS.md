# AGENTS.md — Muhammad Taha Portfolio

> **This document is the authoritative project guide for AI coding agents.**
> Read this file before making any changes to the codebase.

---

## 1. Project Purpose

A premium interactive personal developer portfolio with a lightweight admin CMS for Muhammad Taha (Full-Stack + AI Developer). The site showcases projects, skills, experience, education, certifications, and achievements. An admin dashboard allows content management without code changes.

**Key constraints:**
- **100% FREE stack** — zero ongoing costs
- **Single admin** — no public registration
- **Architecture LOCKED** — no changes without human approval

---

## 2. Approved Architecture

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict mode) |
| Frontend | React 18 |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui primitives |
| Icons | Lucide React |
| 3D | Three.js + React Three Fiber + Drei |
| Motion | Framer Motion + Lenis |
| Forms | React Hook Form + Zod |
| Database | Turso (libSQL/SQLite) |
| ORM | Drizzle ORM |
| Auth | NextAuth.js (Auth.js) |
| Email | Resend |
| Storage | Cloudflare R2 (S3-compatible) |
| Deployment | Vercel |
| Testing | Vitest + @testing-library/react |
| Formatting | Prettier |
| Linting | ESLint (next/core-web-vitals) |
| Git Hooks | Husky + lint-staged |

**Architecture status:** `docs/ARCHITECTURE_STATUS.md`

---

## 3. Technology Stack (Locked)

### Must Use
- **Next.js 14** — App Router, Server Components, Route Handlers
- **TypeScript** — strict mode, no `any`
- **Tailwind CSS** — all styling, design tokens in `tailwind.config.ts`
- **Drizzle ORM** — type-safe queries, schema in `src/lib/db/schema.ts`
- **Turso** — SQLite edge database via `@libsql/client`
- **NextAuth.js** — credentials provider, JWT strategy
- **Framer Motion** — all animations, page transitions, scroll reveals
- **Lenis** — smooth scrolling
- **React Hook Form** — all forms
- **Zod** — all validation (client + server)
- **Resend** — transactional email
- **Cloudflare R2** — image storage (S3-compatible)
- **shadcn/ui** — admin UI primitives (copy-paste, not npm)
- **Lucide React** — all icons
- **Vitest** — unit tests
- **Prettier** — formatting (no semicolons, single quotes, 2-space indent)

### Do Not Use
- Any paid service or API
- Any other UI component library (Material UI, Chakra, etc.)
- Any other animation library (GSAP, CSS animations)
- Any other ORM (Prisma, TypeORM)
- Any other database (PostgreSQL, MongoDB)
- Any other auth solution (Clerk, Auth0)

---

## 4. Folder Structure

```
src/
├── app/
│   ├── (public)/              # Public routes (navbar + footer layout)
│   │   ├── page.tsx           # Homepage
│   │   ├── about/page.tsx
│   │   ├── projects/
│   │   │   ├── page.tsx       # Projects listing
│   │   │   └── [slug]/page.tsx # Project detail
│   │   ├── experience/page.tsx
│   │   ├── education/page.tsx
│   │   ├── certifications/page.tsx
│   │   ├── resume/page.tsx
│   │   ├── contact/
│   │   │   ├── page.tsx
│   │   │   └── contact-form.tsx
│   │   └── layout.tsx         # Public layout (navbar + footer)
│   ├── admin/                 # Admin dashboard (sidebar layout)
│   │   ├── page.tsx           # Dashboard
│   │   ├── login/page.tsx
│   │   ├── projects/
│   │   ├── skills/
│   │   ├── experience/
│   │   ├── messages/
│   │   ├── settings/
│   │   └── layout.tsx         # Admin layout (sidebar)
│   ├── api/                   # API routes
│   │   ├── contact/route.ts
│   │   └── admin/             # Admin API routes (CRUD)
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Root page (redirects to homepage)
│   ├── sitemap.ts
│   ├── robots.ts
│   └── not-found.tsx
├── components/
│   ├── ui/                    # shadcn/ui primitives
│   │   ├── button.tsx
│   │   ├── badge.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── label.tsx
│   │   └── separator.tsx
│   ├── public/                # Public site components
│   │   ├── navbar.tsx
│   │   └── footer.tsx
│   ├── admin/                 # Admin dashboard components
│   │   └── sidebar.tsx
│   ├── 3d/                    # Three.js components
│   │   └── hero-fallback.tsx
│   └── motion/                # Animation components
│       ├── reveal.tsx
│       └── parallax.tsx
├── lib/
│   ├── db/
│   │   ├── index.ts           # Database connection
│   │   ├── schema.ts          # Drizzle schema (15 tables)
│   │   └── queries.ts         # Query functions
│   ├── auth/index.ts          # NextAuth config
│   ├── email/index.ts         # Resend integration
│   ├── storage/index.ts       # R2 integration
│   ├── github/index.ts        # GitHub API
│   ├── validators/index.ts    # Zod schemas
│   └── utils.ts               # cn() utility
├── hooks/                     # Custom React hooks
│   ├── use-capability.ts
│   ├── use-media-query.ts
│   ├── use-mouse-position.ts
│   └── use-scroll.ts
├── types/index.ts             # Shared TypeScript types
├── styles/globals.css         # Tailwind + design system
└── __tests__/                 # Tests
    ├── setup.ts
    └── utils.test.ts
```

---

## 5. Coding Conventions

### TypeScript
- **Strict mode** — no `any`, no `unknown` workarounds
- **No semicolons**
- **Single quotes**
- **2-space indentation**
- **Trailing commas** in multi-line arrays/objects
- **Explicit return types** on exported functions
- **Interface over type** for object shapes

### React
- **Server Components by default** — only add `'use client'` when needed
- **Async Server Components** for data fetching
- **Named exports** for components (not default exports, except page/layout)
- **One component per file**
- **Co-locate** related files (page + form + types)

### Imports
```typescript
// Order: React → Next.js → External → Internal
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
```

### CSS
- **Tailwind CSS only** — no inline styles, no CSS modules, no styled-components
- **Use design tokens** — colors from `tailwind.config.ts`
- **Mobile-first** responsive design
- **Use `cn()`** for conditional classes

---

## 6. Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Files (components) | kebab-case | `navbar.tsx`, `contact-form.tsx` |
| Files (pages) | page.tsx | `page.tsx`, `layout.tsx` |
| Files (API) | route.ts | `route.ts` |
| Files (hooks) | use-*.ts | `use-capability.ts` |
| Files (lib) | index.ts | `db/index.ts` |
| Components | PascalCase | `Navbar`, `ContactForm` |
| Functions | camelCase | `getProjects()`, `formatDate()` |
| Variables | camelCase | `isLoggedIn`, `projectData` |
| Constants | UPPER_SNAKE | `API_TIMEOUT`, `MAX_UPLOAD_SIZE` |
| Types/Interfaces | PascalCase | `Project`, `ApiResponse<T>` |
| DB tables | snake_case | `contact_messages`, `social_links` |
| DB columns | snake_case | `created_at`, `sort_order` |
| CSS classes | Tailwind utilities | `bg-surface`, `text-text-primary` |

---

## 7. Component Rules

### Server Components (default)
```typescript
// No 'use client' directive
// Can be async for data fetching
import { getProjects } from '@/lib/db/queries'

export default async function ProjectsPage() {
  const projects = await getProjects()
  return <div>...</div>
}
```

### Client Components (when needed)
```typescript
'use client'

// Only when: event handlers, browser APIs, state, effects, Framer Motion
import { useState } from 'react'
import { motion } from 'framer-motion'
```

### Component Structure
```typescript
// 1. Imports
// 2. Types/interfaces
// 3. Component function
// 4. Export

export function MyComponent({ title, children }: MyComponentProps) {
  return <div>...</div>
}
```

### shadcn/ui Components
- Copy from `shadcn/ui` — do not npm install
- Place in `src/components/ui/`
- Modify only styling to match design tokens
- Use `class-variance-authority` for variants

---

## 8. API Rules

### Route Handler Structure
```typescript
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  // ...
}
```

### Response Format
```typescript
// Success
{ success: true, data: { ... } }

// Paginated
{ success: true, data: [...], meta: { total, page, limit } }

// Error
{ success: false, error: 'Error message' }
```

### Rules
- **All admin routes** require `getServerSession(authOptions)` check
- **Public routes** are GET-only (read-only)
- **Validate inputs** with Zod before processing
- **Use try/catch** for all database operations
- **Return proper HTTP status codes** (200, 201, 400, 401, 404, 500)
- **Never expose** internal errors to client
- **Rate limit** contact form (1 per IP per 15 minutes)

---

## 9. Database Rules

### Schema Pattern
```typescript
// Singleton tables (profile, about, resume, homepage_content, site_settings)
export const profile = sqliteTable('profile', {
  id: integer('id').primaryKey().default(1),
  name: text('name').notNull(),
  // ...
})

// Collection tables (skills, projects, experience, etc.)
export const skills = sqliteTable('skills', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: text('created_at').default(sql`datetime('now')`),
})
```

### Query Pattern
```typescript
// Singleton
const result = await db.select().from(schema.table).limit(1)
return result[0] || null

// Collection
return db.select().from(schema.table).orderBy(asc(schema.table.sortOrder))
```

### Rules
- **Use Drizzle ORM** — never raw SQL in application code
- **Use typed queries** — leverage schema inference
- **Order by `sortOrder`** for collections
- **Soft deletes** — never hard delete (use `isDeleted` flag if needed)
- **JSON fields** — store arrays as JSON strings (SQLite limitation)
- **Boolean fields** — use `integer('field', { mode: 'boolean' })`

---

## 10. Authentication Rules

### Implementation
- **NextAuth.js** with credentials provider
- **JWT strategy** — 24-hour expiry
- **Single admin** — no public registration
- **Password hashing** with bcrypt

### Middleware Protection
```typescript
// middleware.ts protects:
// - /admin/* routes
// - /api/admin/* routes
// All other routes are public
```

### Session Check (API Routes)
```typescript
const session = await getServerSession(authOptions)
if (!session) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
```

### Rules
- **Never store** passwords in plain text
- **Never expose** session tokens to client
- **Use httpOnly, secure, sameSite cookies**
- **Rotate JWT secret** periodically
- **No public registration** endpoint

---

## 11. Design System Rules

### Colors (Dark Theme)
| Token | Hex | Usage |
|-------|-----|-------|
| `background` | `#080808` | Main background |
| `surface` | `#141414` | Cards, elevated surfaces |
| `border` | `#262626` | Borders, dividers |
| `text-primary` | `#F5F5F5` | Headings, primary text |
| `text-secondary` | `#A3A3A3` | Body text |
| `text-muted` | `#525252` | Captions, labels |
| `accent-primary` | `#8B5CF6` | Primary actions, links |
| `accent-secondary` | `#06B6D4` | Secondary accents |
| `destructive` | `#EF4444` | Errors, destructive actions |

### Typography
| Token | Font | Usage |
|-------|------|-------|
| `heading-h1` | Inter 700 48px | Page titles |
| `heading-h2` | Inter 600 32px | Section headers |
| `heading-h3` | Inter 600 24px | Card titles |
| `heading-h4` | Inter 600 18px | Sub-card titles |
| `body-text` | Inter 400 16px | Body copy |
| `technical-text` | JetBrains Mono 400 12px | Code, labels, timestamps |

### Spacing
| Token | Value |
|-------|-------|
| `container-main` | max-width 1200px, padding 24px mobile / 48px desktop |
| `section-padding` | 120px vertical |
| `card-padding` | 32px |
| `gap-grid` | 32px |

### Shadows
| Token | Usage |
|-------|-------|
| `shadow-sm` | Cards at rest |
| `shadow-md` | Cards hover |
| `shadow-lg` | Modals, dropdowns |

### Rules
- **Use design tokens** from `tailwind.config.ts`
- **No arbitrary values** unless absolutely necessary
- **Mobile-first** responsive breakpoints
- **Consistent spacing** using the spacing scale
- **Dark theme only** — no light mode

---

## 12. Motion Rules

### Libraries
- **Framer Motion** — all animations
- **Lenis** — smooth scrolling

### Animation Intensity Levels
```typescript
// Level A (Desktop 1280px+): Full 3D + animations
// Level B (Tablet 640-1280px): Reduced 3D + animations
// Level C (Mobile <640px): 2D fallback + minimal animations
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  /* Disable: parallax, mouse-follow, magnetic buttons, continuous particles */
  /* Keep: content transitions (simplified), hover feedback */
}
```

### Animation Presets
```typescript
// Scroll reveal
initial={{ opacity: 0, y: 40 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}

// Page transition
exit={{ opacity: 0, scale: 0.985 }}
enter={{ opacity: 0, y: 12 }}
```

### Rules
- **Use `useCapability()`** for device-tier detection
- **Use `useReducedMotion()`** to respect user preferences
- **Only animate** transform and opacity (GPU-accelerated)
- **Never animate** layout properties (width, height, margin)
- **Use `will-change`** sparingly
- **Pause off-screen animations**
- **Test on low-end devices**

---

## 13. 3D Rules

### Libraries
- **Three.js** — 3D rendering
- **React Three Fiber** — React renderer
- **Drei** — helper components

### Capability Tiers
```typescript
// Tier A (Full 3D):
//   - Desktop 1280px+
//   - WebGL supported
//   - Device pixel ratio <= 2
//   - Full geometry, particles, post-processing

// Tier B (Reduced 3D):
//   - Tablet 640-1280px
//   - WebGL supported
//   - Reduced geometry, no particles

// Tier C (2D Fallback):
//   - Mobile <640px
//   - No WebGL
//   - CSS gradient orbs + grid lines + floating dots
```

### Implementation
```typescript
// Dynamic import only
const Hero3D = dynamic(() => import('@/components/3d/hero-3d'), {
  loading: () => <Hero3DFallback />,
  ssr: false,
})
```

### Rules
- **Homepage hero only** — no 3D elsewhere
- **Dynamic import** — never bundle Three.js in main chunk
- **`aria-hidden="true"`** on canvas
- **Essential content in HTML** — never in 3D
- **2D fallback is mandatory** — must provide same content
- **Keep scene simple** — abstract geometric environment
- **Use `requestAnimationFrame`** — never `setInterval`
- **Dispose of resources** — prevent memory leaks

---

## 14. Accessibility Rules

### Target
**WCAG 2.2 AA** compliance

### Semantic HTML
```html
<header>    <!-- Site header, hero -->
<nav>       <!-- Navigation -->
<main>      <!-- Main content -->
<section>   <!-- Content sections -->
<article>   <!-- Independent content -->
<footer>    <!-- Site footer -->
```

### Keyboard Navigation
- All interactive elements focusable
- Visible focus indicators (2px solid `#8B5CF6`, 3px offset)
- Logical tab order
- Skip navigation link
- Escape to close modals/menus
- Arrow keys for dropdowns

### Screen Reader Support
- ARIA labels for interactive elements
- Alt text for meaningful images
- Empty alt for decorative images
- `aria-hidden="true"` for decorative 3D canvas
- Live regions for dynamic content

### Forms
- Explicit `<label>` for all inputs
- Error messages associated with fields
- Required field indicators
- Form submission feedback

### Color Contrast
- `#F5F5F5` on `#080808`: >15:1 (passes AAA)
- `#A3A3A3` on `#080808`: >7:1 (passes AA)
- `#8B5CF6` on `#080808`: >4.5:1 (passes AA for large text)

### Rules
- **Test with screen readers** (VoiceOver, NVDA)
- **Test keyboard-only navigation**
- **Never use color alone** to convey information
- **Provide text alternatives** for non-text content
- **Use proper heading hierarchy** (h1 → h2 → h3)

---

## 15. SEO Rules

### Implementation
- **Next.js Metadata API** for page-level metadata
- **Structured Data** (JSON-LD) for Person, WebSite, Project schemas
- **Sitemap** auto-generated from database
- **Robots.txt** configured
- **Clean URLs** (`/projects/my-project`)

### Page Metadata
```typescript
export const metadata: Metadata = {
  title: 'Page Title | Muhammad Taha',
  description: '...',
  openGraph: { ... },
  twitter: { ... },
}
```

### Target Keywords
- Muhammad Taha
- Muhammad Taha developer
- Full-stack developer Pakistan
- AI developer Pakistan
- React developer
- Next.js developer

### Rules
- **Every page** must have title and description
- **Use semantic HTML** for structure
- **Include alt text** on all images
- **Generate sitemap** from database content
- **Use canonical URLs**
- **No duplicate content**

---

## 16. Testing Rules

### Framework
- **Vitest** for unit tests
- **@testing-library/react** for component tests

### Test Location
```
src/__tests__/
├── setup.ts
├── utils.test.ts
├── components/
└── lib/
```

### Naming
```typescript
// File: utils.test.ts
// Test: describe('formatDate', () => { it('formats date correctly', () => { ... }) })
```

### Rules
- **Test utility functions** in `src/lib/`
- **Test component rendering** for critical components
- **Mock external services** (database, email, storage)
- **Run `npm run test:coverage`** before PRs
- **No snapshot tests** — test behavior, not structure
- **Test accessibility** with `@testing-library/jest-dom`

---

## 17. Security Rules

### Authentication
- **bcrypt** for password hashing
- **JWT** with 24-hour expiry
- **httpOnly, secure, sameSite cookies**
- **No session fixation** — regenerate on login

### Input Validation
- **Zod schemas** for all API inputs
- **Server-side validation** — never trust client
- **Sanitize HTML content** — prevent XSS
- **Validate file uploads** — type, size

### Rate Limiting
- Contact form: 1 per IP per 15 minutes
- Login: 5 attempts per IP per 15 minutes
- API: 100 requests per IP per minute

### Headers
```
Content-Security-Policy: ...
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### Secrets
- **Never commit** `.env.local`
- **Never expose** API keys to client
- **Use `NEXT_PUBLIC_` prefix** only for non-sensitive client vars
- **Store** Turso credentials, R2 keys, Resend API key server-side only

### Rules
- **No secrets in client code**
- **No `console.log` in production** (use proper logging)
- **No `any` type** — type safety prevents injection
- **Validate all inputs** — never pass unsanitized data to database
- **Use parameterized queries** — Drizzle handles this

---

## 18. Git Rules

### Commit Convention
```
feat:     New feature
fix:      Bug fix
chore:    Maintenance, dependencies, config
docs:     Documentation only
style:    Formatting, no code change
refactor: Code change that neither fixes bug nor adds feature
test:     Adding or updating tests
perf:     Performance improvement
```

### Branch Naming
```
feature/xxx    New features
fix/xxx        Bug fixes
chore/xxx      Maintenance
```

### Pre-commit Hook
- **lint-staged** runs on commit
- **ESLint** auto-fixes staged `.ts/.tsx` files
- **Prettier** formats all staged files
- **Commit fails** if lint errors cannot be auto-fixed

### Rules
- **No commits to `main`** without PR review
- **No secrets** in commits
- **No `node_modules`** or `.next` in commits
- **Conventional commits** — use the prefix format
- **One logical change per commit** — don't mix unrelated changes

---

## CRITICAL: Architecture Lock

**Architecture is LOCKED.**

**Never change:**
- Framework (Next.js)
- Backend architecture (API Routes)
- Database (Turso/SQLite)
- Authentication (NextAuth.js)
- Deployment (Vercel)
- Core libraries (Framer Motion, Drizzle, etc.)

**Without explicit human approval.**

### If You Discover an Architectural Problem

1. **STOP** — do not make changes
2. **Document** the problem in `docs/ARCHITECTURE_CHANGE_REQUEST.md`
3. **Include:**
   - Current architecture
   - Problem discovered
   - Proposed solution
   - Impact assessment
   - Alternative solutions considered
4. **Wait** for human approval before proceeding

### Architecture Change Request Template
```markdown
# Architecture Change Request

## Problem
[Describe the architectural problem discovered]

## Current Architecture
[What exists today]

## Proposed Change
[What you want to change]

## Impact
- [Files affected]
- [Dependencies added/removed]
- [Risk assessment]

## Alternatives Considered
- [Alternative 1] — Why not
- [Alternative 2] — Why not

## Recommendation
[Your recommendation with reasoning]
```

---

## Quick Reference

### Commands
```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint check
npm run lint:fix     # ESLint fix
npm run format       # Prettier format
npm run typecheck    # TypeScript check
npm run test         # Vitest watch
npm run test:run     # Vitest single run
npm run db:generate  # Generate migrations
npm run db:push      # Push schema changes
```

### File Locations
- **Schema:** `src/lib/db/schema.ts`
- **Queries:** `src/lib/db/queries.ts`
- **Auth config:** `src/lib/auth/index.ts`
- **Validators:** `src/lib/validators/index.ts`
- **Design tokens:** `tailwind.config.ts`
- **Global styles:** `src/styles/globals.css`
- **Architecture docs:** `docs/architecture.md`
- **Architecture status:** `docs/ARCHITECTURE_STATUS.md`
