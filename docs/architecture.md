# Muhammad Taha Portfolio — Technical Architecture

**Version:** 1.0
**Status:** Architecture Candidate — Requires Human Approval
**Date:** September 2, 2026
**Constraint:** 100% FREE — No paid hosting, API, database, CDN, storage, monitoring, or CI/CD costs

---

## 1. Architecture Overview

### 1.1 What

A full-stack web application serving a premium interactive developer portfolio with a lightweight admin CMS.

### 1.2 Why

The project requires:
- Server-side rendering for SEO (portfolio must be discoverable)
- Dynamic admin CMS for content management without code changes
- GitHub API integration (server-side credential protection)
- Contact form with email notifications
- 3D/WebGL experience with cinematic motion
- Responsive design across all devices
- Image storage for project screenshots

### 1.3 Architecture Pattern

**Monolithic Full-Stack Application with Server-Side Rendering**

A single Next.js application serves both the public portfolio and the admin dashboard. API routes handle backend logic. No separate backend server required.

```
┌─────────────────────────────────────────────────────┐
│                    VERCEL (Hosting)                  │
│  ┌───────────────────────────────────────────────┐  │
│  │              NEXT.JS APPLICATION               │  │
│  │                                                │  │
│  │  ┌──────────────┐    ┌─────────────────────┐  │  │
│  │  │  PUBLIC SITE  │    │    ADMIN DASHBOARD   │  │  │
│  │  │  (SSR/SSG)   │    │    (Client-Side)     │  │  │
│  │  └──────┬───────┘    └──────────┬──────────┘  │  │
│  │         │                       │              │  │
│  │  ┌──────┴───────────────────────┴──────────┐  │  │
│  │  │           API ROUTES (Next.js)           │  │  │
│  │  │  /api/contact  /api/projects  /api/admin │  │  │
│  │  │  /api/github   /api/settings             │  │  │
│  │  └──────┬───────────────┬──────────────────┘  │  │
│  │         │               │                      │  │
│  │  ┌──────┴──────┐  ┌────┴─────────────────┐   │  │
│  │  │   DRIZZLE   │  │   GITHUB API / EMAIL  │   │  │
│  │  │    ORM      │  │   RESEND / R2 STORAGE │   │  │
│  │  └──────┬──────┘  └──────────────────────┘   │  │
│  └─────────┼─────────────────────────────────────┘  │
│            │                                        │
│  ┌─────────┴──────────┐  ┌──────────────────────┐  │
│  │   TURSO (SQLite)   │  │  CLOUDFLARE R2 (IMG) │  │
│  │   Free Tier        │  │  Free Tier           │  │
│  └────────────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

### 1.4 Alternatives Considered

| Alternative | Why Not |
|-------------|---------|
| **Separate backend (Express/Fastify) + static frontend** | Adds deployment complexity, requires separate hosting, unnecessary for this scale |
| **Laravel/PHP backend** | Heavier runtime, less natural fit for React/Three.js frontend, more hosting overhead |
| **Static site generator only (Astro/Hugo)** | Cannot support dynamic admin CMS, GitHub sync, or contact form processing without external services |
| **Supabase (BaaS)** | Free tier limits (500MB database, 1GB storage) may constrain project screenshots; adds vendor dependency |
| **Firebase** | Free tier limits, vendor lock-in, NoSQL data model doesn't fit structured portfolio data well |

### 1.5 Trade-offs

| Trade-off | Impact | Mitigation |
|-----------|--------|------------|
| Monolithic architecture | Single deployment unit, simpler operations | Acceptable for single-developer portfolio |
| SQLite via Turso | Serverless-compatible, but limited to single-writer | Portfolio is admin-written, public is read-only — perfect fit |
| Vercel hosting | Free tier has function execution limits | Portfolio traffic is low; functions are simple CRUD |
| No separate backend | All logic runs in Next.js API routes | Sufficient for this scale; reduces operational complexity |

### 1.6 Cost

**$0/month** — All services operate within free tier limits.

| Service | Free Tier | Sufficient? |
|---------|-----------|-------------|
| Vercel | 100GB bandwidth, 100GB-hours compute | Yes — portfolio traffic is low |
| Turso | 500 databases, 9GB storage, 100M row reads | Yes — portfolio has <1000 rows |
| Cloudflare R2 | 10GB storage, 1M Class A ops, 10M Class B ops | Yes — project screenshots fit easily |
| Resend | 100 emails/day, 3000/month | Yes — contact form submissions are low volume |
| GitHub API | 5000 requests/hour (unauthenticated) | Yes — sync is admin-triggered, not continuous |

### 1.7 Complexity

**Low-Medium.** Next.js provides a single framework for frontend, API, and admin. Turso + Drizzle provides type-safe database access. No complex infrastructure to manage.

### 1.8 Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Vercel cold starts on free tier | Medium | Use ISR/SSG for public pages; keep API routes lightweight |
| Turso free tier limits exceeded | Low | Portfolio data is small; monitor usage |
| GitHub API rate limiting | Low | Admin-triggered sync, not continuous polling |
| Resend deliverability | Low | Use verified domain; monitor email delivery |
| 3D performance on low-end devices | Medium | Implement 3-tier fallback (Full/Reduced/2D) |

---

## 2. Frontend

### 2.1 What

**Next.js 14+ with App Router**

React-based framework with server-side rendering, static generation, and API routes.

### 2.2 Why

- **SEO**: Server-side rendering ensures portfolio content is indexable by search engines
- **Performance**: Static generation for public pages, dynamic rendering for admin
- **3D Integration**: React ecosystem has best Three.js support via React Three Fiber
- **Animation**: Framer Motion (React-native) provides the required cinematic motion system
- **Single Framework**: Handles frontend, API, and admin in one codebase
- **Type Safety**: TypeScript-first development with full type inference
- **Image Optimization**: Built-in `next/image` for responsive project imagery
- **Metadata API**: Built-in SEO metadata management per page

### 2.3 Alternatives Considered

| Alternative | Why Not |
|-------------|---------|
| **Vite + React** | No SSR/SSG built-in; requires separate backend; SEO-unfriendly for SPA |
| **Astro** | Good for static sites but limited React ecosystem integration; harder to build admin CMS |
| **Nuxt.js (Vue)** | Smaller ecosystem for 3D/animation libraries; Three.js React bindings are superior |
| **SvelteKit** | Smaller ecosystem; React Three Fiber is more mature than Svelte 3D alternatives |
| **Remix** | Similar to Next.js but smaller community; less mature ISR; fewer deployment targets |

### 2.4 Trade-offs

| Trade-off | Impact | Mitigation |
|-----------|--------|------------|
| Next.js complexity | Steeper learning curve than plain React | Acceptable for developer portfolio |
| App Router (newer) | Some libraries may not fully support it | Use stable patterns; test library compatibility |
| Vercel lock-in risk | Some Next.js features optimized for Vercel | Core functionality works elsewhere; ejection possible |

### 2.5 Cost

**$0** — Open source framework, deployed on Vercel free tier.

### 2.6 Complexity

**Medium.** App Router has a learning curve but provides significant benefits for SSR/SSG and API routes.

### 2.7 Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| App Router instability | Low | Use stable APIs; pin version |
| Large bundle from Three.js | Medium | Dynamic imports; code splitting; lazy-load 3D |

---

## 3. Backend

### 3.1 What

**Next.js API Routes (Route Handlers)**

Serverless functions within the Next.js application handling:
- Contact form submission and email notification
- Admin authentication and session management
- Portfolio content CRUD operations
- GitHub repository synchronization
- Image upload proxy to Cloudflare R2
- Site settings management

### 3.2 Why

- **No separate server**: Reduces deployment complexity and cost
- **Type sharing**: Frontend and backend share TypeScript types
- **Serverless**: Scales automatically; no server management
- **Credential protection**: API routes run server-side; secrets never exposed to client
- **Free tier**: Vercel handles serverless function execution at no cost

### 3.3 Alternatives Considered

| Alternative | Why Not |
|-------------|---------|
| **Separate Express/Fastify server** | Requires separate hosting ($5-10/mo minimum), adds deployment complexity |
| **tRPC** | Good for type-safe APIs but adds abstraction layer; REST is sufficient for this scale |
| **GraphQL (Apollo/Yoga)** | Overkill for this data model; adds complexity without benefit |
| **Supabase Edge Functions** | Vendor lock-in; free tier limits; adds another platform to manage |

### 3.4 API Route Structure

```
/api/
├── contact/
│   └── POST              # Submit contact form
├── admin/
│   ├── login/
│   │   └── POST          # Admin authentication
│   ├── logout/
│   │   └── POST          # Destroy session
│   └── auth/
│       └── GET           # Check auth status
├── projects/
│   ├── GET               # List projects (public)
│   ├── POST              # Create project (admin)
│   ├── [id]/
│   │   ├── GET           # Get project (public)
│   │   ├── PUT           # Update project (admin)
│   │   └── DELETE        # Delete project (admin)
│   └── featured/
│       └── GET           # Featured projects (public)
├── skills/
│   ├── GET               # List skills (public)
│   └── POST              # Create skill (admin)
├── experience/
│   ├── GET               # List experience (public)
│   └── POST              # Create experience (admin)
├── education/
│   ├── GET               # List education (public)
│   └── POST              # Create education (admin)
├── certifications/
│   ├── GET               # List certifications (public)
│   └── POST              # Create certification (admin)
├── achievements/
│   ├── GET               # List achievements (public)
│   └── POST              # Create achievement (admin)
├── profile/
│   ├── GET               # Get profile (public)
│   └── PUT               # Update profile (admin)
├── about/
│   ├── GET               # Get about content (public)
│   └── PUT               # Update about (admin)
├── resume/
│   ├── GET               # Get resume (public)
│   └── PUT               # Update resume (admin)
├── social-links/
│   ├── GET               # Get social links (public)
│   └── PUT               # Update social links (admin)
├── homepage/
│   ├── GET               # Get homepage content (public)
│   └── PUT               # Update homepage (admin)
├── messages/
│   ├── GET               # List messages (admin)
│   └── [id]/
│       ├── GET           # Get message (admin)
│       └── DELETE        # Delete message (admin)
├── github/
│   ├── repos/
│   │   └── GET           # Discover repositories (admin)
│   └── sync/
│       └── POST          # Sync repositories (admin)
├── settings/
│   ├── GET               # Get settings (public)
│   └── PUT               # Update settings (admin)
└── upload/
    └── POST              # Upload image to R2 (admin)
```

### 3.5 Trade-offs

| Trade-off | Impact | Mitigation |
|-----------|--------|------------|
| Serverless cold starts | First request may be slower | Use ISR for public pages; keep functions lightweight |
| Function execution time limits (10s free tier) | Long-running operations may timeout | GitHub sync uses pagination; email is async |
| No WebSocket support | Real-time features not possible | Not required for this project |

### 3.6 Cost

**$0** — Included in Vercel free tier.

### 3.7 Complexity

**Low.** Standard Next.js API routes with Drizzle ORM for database access.

### 3.8 Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Cold starts | Medium | ISR/SSG for public pages; lightweight functions |
| Function size limits | Low | Keep functions focused; extract shared logic |

---

## 4. Database

### 4.1 What

**Turso (libSQL/SQLite)** — Serverless SQLite edge database

### 4.2 Why

- **SQLite compatibility**: Portfolio data model is relational and fits SQLite perfectly
- **Serverless**: No connection pooling issues; works with Vercel serverless functions
- **Free tier**: 500 databases, 9GB storage, 100M row reads/month — more than sufficient
- **Edge replication**: Low latency for read-heavy portfolio content
- **No cold starts**: Persistent connections unlike traditional SQLite on serverless
- **Simple operations**: No database server to manage, patch, or monitor

### 4.3 Data Model

```sql
-- Profile (singleton)
CREATE TABLE profile (
  id INTEGER PRIMARY KEY DEFAULT 1,
  name TEXT NOT NULL DEFAULT 'Muhammad Taha',
  title TEXT NOT NULL DEFAULT 'Full-Stack + AI Developer',
  short_bio TEXT,
  email TEXT,
  phone TEXT,
  location TEXT,
  avatar_url TEXT,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- About
CREATE TABLE about (
  id INTEGER PRIMARY KEY DEFAULT 1,
  biography TEXT NOT NULL,
  profile_content TEXT,
  interests TEXT,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Skills
CREATE TABLE skills (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  category TEXT,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Technologies
CREATE TABLE technologies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  icon_url TEXT,
  category TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Projects
CREATE TABLE projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  short_statement TEXT,
  technologies TEXT, -- JSON array
  live_url TEXT,
  github_url TEXT,
  demo_url TEXT,
  screenshot_urls TEXT, -- JSON array
  case_study_problem TEXT,
  case_study_solution TEXT,
  case_study_result TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  is_visible BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  github_repo_id INTEGER,
  github_synced_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Experience
CREATE TABLE experience (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  role TEXT NOT NULL,
  organization TEXT,
  description TEXT,
  start_date TEXT,
  end_date TEXT,
  is_current BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Education
CREATE TABLE education (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  institution TEXT NOT NULL,
  qualification TEXT,
  program TEXT,
  description TEXT,
  start_date TEXT,
  end_date TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Certifications
CREATE TABLE certifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  issuer TEXT,
  date TEXT,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Achievements
CREATE TABLE achievements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  date TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Resume
CREATE TABLE resume (
  id INTEGER PRIMARY KEY DEFAULT 1,
  content TEXT, -- Structured resume content (JSON or markdown)
  pdf_url TEXT, -- Optional PDF upload URL
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Social Links
CREATE TABLE social_links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  is_visible BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Contact Messages
CREATE TABLE contact_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Homepage Content
CREATE TABLE homepage_content (
  id INTEGER PRIMARY KEY DEFAULT 1,
  hero_introduction TEXT,
  featured_project_ids TEXT, -- JSON array of project IDs
  contact_statement TEXT,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Site Settings
CREATE TABLE site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  site_title TEXT DEFAULT 'Muhammad Taha',
  site_description TEXT,
  analytics_enabled BOOLEAN DEFAULT FALSE,
  animation_intensity TEXT DEFAULT 'standard', -- 'reduced', 'standard', 'enhanced'
  three_d_enabled BOOLEAN DEFAULT TRUE,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Admin Users
CREATE TABLE admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 4.4 Alternatives Considered

| Alternative | Why Not |
|-------------|---------|
| **PostgreSQL (Neon free tier)** | Overkill for this data model; 512MB storage limit may constrain image metadata |
| **MySQL (PlanetScale free tier)** | Discontinued free tier; vendor dependency |
| **MongoDB Atlas free tier** | 512MB limit; document model doesn't fit relational portfolio data well |
| **Local SQLite file** | No persistence on Vercel serverless; data lost between deployments |
| **Supabase PostgreSQL** | 500MB storage limit; adds vendor dependency; more complex than needed |
| **Prisma + PostgreSQL** | Heavier ORM; PostgreSQL hosting adds cost/complexity |

### 4.5 Trade-offs

| Trade-off | Impact | Mitigation |
|-----------|--------|------------|
| SQLite single-writer | Only one write at a time | Portfolio has single admin; no concurrent writes |
| No stored procedures | Logic in application code | Acceptable for this complexity level |
| Turso vendor dependency | Could change pricing/terms | Data model is portable; export capability exists |

### 4.6 Cost

**$0** — Turso free tier covers this project's data needs.

### 4.7 Complexity

**Low.** SQLite is simple; Drizzle ORM provides type-safe queries.

### 4.8 Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Turso free tier limits | Low | Portfolio data is small; monitor usage |
| Schema migrations | Low | Use Drizzle Kit for migrations; test before deploy |

---

## 5. ORM

### 5.1 What

**Drizzle ORM** — TypeScript ORM for SQL databases

### 5.2 Why

- **Type safety**: Full TypeScript inference for queries and results
- **SQL-like**: Writes actual SQL; no N+1 query magic, no hidden behavior
- **Lightweight**: Minimal runtime overhead
- **Turso support**: First-class libSQL/Turso adapter
- **Migrations**: Drizzle Kit provides schema management
- **Serverless optimized**: No connection pooling issues

### 5.3 Alternatives Considered

| Alternative | Why Not |
|-------------|---------|
| **Prisma** | Heavier runtime; larger bundle; generated client adds complexity; slower cold starts |
| **TypeORM** | Decorator-based; less TypeScript-native; heavier |
| **Kysely** | Good but less mature Turso integration; smaller community |
| **Raw SQL** | No type safety; manual query building; error-prone |

### 5.4 Trade-offs

| Trade-off | Impact | Mitigation |
|-----------|--------|------------|
| SQL-like syntax | Less abstract than Prisma | Explicit queries are easier to debug and optimize |
| Smaller community than Prisma | Fewer Stack Overflow answers | Well-documented; growing rapidly |

### 5.5 Cost

**$0** — Open source.

### 5.6 Complexity

**Low.** TypeScript-first with excellent IDE support.

### 5.7 Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Smaller ecosystem | Low | Core functionality is stable and well-tested |

---

## 6. Authentication

### 6.1 What

**NextAuth.js (Auth.js)** — Authentication for Next.js

### 6.2 Why

- **Purpose-built for Next.js**: First-class App Router support
- **Session management**: JWT-based sessions (no database session store needed)
- **Credentials provider**: Email/password authentication for admin
- **CSRF protection**: Built-in CSRF token handling
- **Secure**: Handles password hashing, session tokens, cookie security
- **Free**: Open source, no paid tiers

### 6.3 Implementation

```typescript
// Single admin authentication
// Credentials provider with email/password
// JWT session strategy (no session database)
// Protected API routes via middleware
// Admin dashboard route protection
```

### 6.4 Alternatives Considered

| Alternative | Why Not |
|-------------|---------|
| **Custom JWT implementation** | Reinventing the wheel; security risk; more code to maintain |
| **Clerk** | Paid tier required for production; vendor lock-in |
| **Auth0** | Free tier limited to 7000 active users; overkill for single admin |
| ** Lucia Auth** | Good but less mature Next.js integration; smaller community |
| **Supabase Auth** | Vendor dependency; adds Supabase to stack |

### 6.5 Trade-offs

| Trade-off | Impact | Mitigation |
|-----------|--------|------------|
| JWT vs database sessions | Sessions not revocable without client action | Acceptable for single admin; short expiry |
| Credentials provider only | No social login | Not needed for admin-only auth |

### 6.6 Cost

**$0** — Open source.

### 6.7 Complexity

**Low.** Well-documented; standard Next.js integration.

### 6.8 Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| JWT secret compromise | High | Use strong secret; rotate periodically; environment variables only |
| Session fixation | Medium | Use httpOnly, secure, sameSite cookies |

---

## 7. Authorization

### 7.1 What

**Role-Based Access Control (RBAC) — Single Role**

Two roles: `public` (default) and `admin`.

### 7.2 Why

- **Simple**: Only one administrator; no complex permission matrix needed
- **Sufficient**: Admin can manage all content; public can only read
- **Secure**: Clear separation between public and admin routes
- **Future-proof**: Role system can be extended if multi-admin is needed later

### 7.3 Implementation

```typescript
// Middleware checks:
// - /admin/* routes require admin session
// - /api/admin/* routes require admin session
// - All other routes are public
// - Public API routes (/api/projects, etc.) are read-only

// Authorization layers:
// 1. Route-level middleware (Next.js middleware)
// 2. API route-level checks (getSession in each admin route)
// 3. Database-level (admin writes, public reads)
```

### 7.4 Alternatives Considered

| Alternative | Why Not |
|-------------|---------|
| **Multi-role RBAC** | Not needed for single admin; adds complexity |
| **Attribute-based access control** | Overkill for this use case |
| **Row-level security (database)** | SQLite doesn't support RLS; application-level is simpler |

### 7.5 Trade-offs

| Trade-off | Impact | Mitigation |
|-----------|--------|------------|
| Single admin limitation | Only one person can manage content | Acceptable per SRS; can extend later |
| No role hierarchy | No granular permissions | Not needed for this scope |

### 7.6 Cost

**$0** — Logic implemented in application code.

### 7.7 Complexity

**Low.** Middleware-based route protection.

### 7.8 Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Admin credential compromise | High | Strong password policy; secure session handling |
| Middleware bypass | Medium | Test all protected routes; validate at API level too |

---

## 8. API Architecture

### 8.1 What

**REST API** via Next.js Route Handlers

### 8.2 Why

- **Simple**: Portfolio data model is straightforward CRUD
- **Well-understood**: REST is universal; easy to debug and test
- **SEO-friendly**: Public endpoints return JSON for ISR/SSG
- **No overhead**: No GraphQL schema, resolvers, or client library needed
- **HTTP caching**: Public endpoints can use HTTP cache headers

### 8.3 API Design Principles

```
Public endpoints (GET only):
  /api/projects          → List visible projects
  /api/projects/featured → Featured projects
  /api/projects/[slug]   → Single project
  /api/skills            → List skills
  /api/experience        → List experience
  /api/education         → List education
  /api/certifications    → List certifications
  /api/achievements      → List achievements
  /api/profile           → Profile data
  /api/about             → About content
  /api/resume            → Resume data
  /api/social-links      → Social links
  /api/homepage          → Homepage content
  /api/settings          → Public settings

Admin endpoints (POST/PUT/DELETE):
  /api/admin/*           → All mutation operations
  Requires valid JWT session

Contact endpoint:
  /api/contact           → POST (public, rate-limited)
```

### 8.4 Alternatives Considered

| Alternative | Why Not |
|-------------|---------|
| **GraphQL** | Adds complexity; no benefit for this data model; harder to cache |
| **tRPC** | Good for full-stack TypeScript but adds abstraction; REST is sufficient |
| **gRPC** | Browser客户端 support limited; overkill for portfolio |
| **WebSockets** | Not needed; no real-time requirements |

### 8.5 Response Format

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "total": 10,
    "page": 1,
    "limit": 20
  }
}
```

### 8.6 Trade-offs

| Trade-off | Impact | Mitigation |
|-----------|--------|------------|
| No real-time updates | Admin changes require page refresh | Acceptable; content changes are infrequent |
| REST versioning | API versions may be needed | Use URL versioning if needed; keep simple for now |

### 8.7 Cost

**$0** — Logic runs in Vercel serverless functions.

### 8.8 Complexity

**Low.** Standard REST patterns with Next.js Route Handlers.

### 8.9 Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| API abuse | Medium | Rate limiting on contact endpoint; admin auth on mutations |
| Cache staleness | Low | Use ISR with revalidation; admin cache invalidation |

---

## 9. Storage

### 9.1 What

**Cloudflare R2** — Object storage for project screenshots and images

### 9.2 Why

- **Zero egress fees**: Unlike AWS S3, R2 charges nothing for data transfer out
- **Free tier**: 10GB storage, 1M Class A operations, 10M Class B operations/month
- **S3-compatible**: Standard API; easy to integrate
- **Global CDN**: Fast image delivery worldwide
- **No vendor lock-in**: S3-compatible; can migrate easily

### 9.3 Implementation

```typescript
// Upload flow:
// 1. Admin selects image in dashboard
// 2. API route receives file
// 3. Validates file type (JPEG, PNG, WebP, AVIF)
// 4. Resizes to appropriate dimensions
// 5. Uploads to R2 bucket
// 6. Returns public URL
// 7. URL stored in database

// Image optimization:
// - next/image with R2 URLs for responsive sizing
// - WebP/AVIF conversion for smaller file sizes
// - Lazy loading for non-critical images
```

### 9.4 Alternatives Considered

| Alternative | Why Not |
|-------------|---------|
| **AWS S3** | Egress fees ($0.09/GB); free tier expired; more complex setup |
| **Cloudinary** | Free tier limited (25GB bandwidth); adds transform costs |
| **Imgix** | Paid service; no free tier for production |
| **Supabase Storage** | 1GB free tier; may be insufficient for project screenshots |
| **Local filesystem** | Not persistent on Vercel; lost between deployments |
| **Base64 in database** | Massive database bloat; terrible performance |

### 9.5 Trade-offs

| Trade-off | Impact | Mitigation |
|-----------|--------|------------|
| R2 vendor dependency | Could change terms | S3-compatible; easy migration |
| Manual upload (no automatic optimization) | Admin must upload optimized images | Build resize logic in API route |

### 9.6 Cost

**$0** — Free tier covers project needs.

### 9.7 Complexity

**Low.** S3-compatible API; straightforward integration.

### 9.8 Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Storage limit exceeded | Low | 10GB is sufficient; compress images; monitor usage |
| Image format compatibility | Low | Serve WebP with JPEG fallback |

---

## 10. Search

### 10.1 What

**No dedicated search implementation**

### 10.2 Why

- **SRS confirms**: "No dedicated internal site-search feature is included"
- **Portfolio scale**: <20 projects, <50 content items; search is unnecessary
- **SEO替代**: External search engines (Google) provide discoverability
- **Performance**: No search index to maintain or query

### 10.3 Implementation

- Content structure supports external search engine indexing
- Proper heading hierarchy and semantic HTML
- Page-level metadata for SEO
- Sitemap.xml for search engine discovery

### 10.4 Cost

**$0** — No search infrastructure.

### 10.5 Complexity

**None.**

---

## 11. Payments

### 11.1 What

**No payment functionality**

### 11.2 Why

- **SRS confirms**: "No payment functionality is required"
- **Constraint**: COD only; no online payments
- **Scope**: Portfolio does not sell products or services directly

### 11.3 Cost

**$0** — No payment infrastructure.

---

## 12. Email

### 12.1 What

**Resend** — Transactional email API

### 12.2 Why

- **Free tier**: 100 emails/day, 3000/month — sufficient for contact form
- **Simple API**: Minimal code to send emails
- **React Email**: Build email templates with React components
- **No SMTP management**: API-based; no server configuration
- **Deliverability**: Built-in DKIM, SPF support

### 12.3 Implementation

```
Contact Form Submission:
1. Visitor submits contact form
2. API route validates input
3. Rate limiting check (1 submission per IP per 15 minutes)
4. Store message in database
5. Send notification email to admin via Resend
6. Return success response to visitor

Email Templates:
- Contact form notification (admin)
- Contact form confirmation (visitor) — optional
```

### 12.4 Alternatives Considered

| Alternative | Why Not |
|-------------|---------|
| **SendGrid** | Free tier limited (100/day); more complex API |
| **Mailgun** | Free tier expired; requires credit card |
| **AWS SES** | Requires AWS account; $0.10/1000 emails after free tier |
| **Nodemailer + SMTP** | Requires SMTP server; more setup; deliverability concerns |
| **EmailJS** | Client-side only; exposes API keys; security risk |

### 12.5 Trade-offs

| Trade-off | Impact | Mitigation |
|-----------|--------|------------|
| API dependency | Email delivery depends on Resend uptime | Monitor delivery; fallback to database storage |
| 100/day limit | May limit high-volume contact spam | Rate limiting reduces abuse; sufficient for legitimate use |

### 12.6 Cost

**$0** — Free tier covers contact form volume.

### 12.7 Complexity

**Low.** Simple API integration.

### 12.8 Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Deliverability issues | Medium | Use verified domain; monitor bounces |
| Rate limit abuse | Low | Rate limiting on contact endpoint |
| Service outage | Low | Messages stored in database regardless |

---

## 13. Admin

### 13.1 What

**Custom Admin Dashboard** built with React components using the approved Taha design tokens

### 13.2 Why

- **Custom fit**: Purpose-built for this portfolio's exact content model
- **Design system**: Uses the same Taha color tokens, typography, borders
- **Dense/functional**: Prioritizes speed and clarity over cinematic aesthetics
- **No external dependency**: Not reliant on third-party CMS platforms
- **Lightweight**: No heavy admin framework; just React components

### 13.3 Implementation

```
Admin Dashboard Structure:
├── Authentication Gate (login)
├── Sidebar Navigation
├── Dashboard Overview (status summary)
├── Content Management
│   ├── Profile Management
│   ├── About Management
│   ├── Skills Management
│   ├── Technologies Management
│   ├── Experience Management
│   ├── Education Management
│   ├── Certifications Management
│   ├── Achievements Management
│   ├── Resume Management
│   └── Social Links Management
├── Project Management
│   ├── Project Listing (table)
│   ├── Create/Edit Project (form)
│   └── Screenshot Management
├── GitHub Sync
│   ├── Repository Discovery
│   ├── Sync Control
│   └── Visibility Management
├── Contact Messages
│   ├── Message Listing
│   └── Message Detail
├── Homepage Management
└── Settings
```

### 13.4 UI Components

Build using shadcn/ui primitives (copy-paste components, not a dependency):
- Forms: Input, Textarea, Select, Checkbox, Switch
- Tables: Data table with sorting
- Dialogs: Modal for confirmations, message detail
- Buttons: Primary, secondary, destructive
- Cards: Status cards for dashboard overview
- Navigation: Sidebar, mobile drawer

### 13.5 Alternatives Considered

| Alternative | Why Not |
|-------------|---------|
| **Headless CMS (Strapi/Sanity)** | Adds vendor dependency; overkill for single-admin; free tier limits |
| **AdminJS** | Heavy framework; opinionated; adds bundle size |
| **Refine** | Good but adds abstraction layer; more than needed |
| **KeystoneJS** | Full CMS; too complex for this scope |
| **Manual HTML forms** | No reactivity; poor UX; duplicated code |

### 13.6 Trade-offs

| Trade-off | Impact | Mitigation |
|-----------|--------|------------|
| Custom build | More development time | Tailored exactly to requirements; no bloat |
| No WYSIWYG editor | Plain text/markdown editing | Sufficient for portfolio content; simpler to maintain |

### 13.7 Cost

**$0** — All components are open source.

### 13.8 Complexity

**Medium.** Requires building admin interface from scratch, but components are reusable.

### 13.9 Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Admin UX poor quality | Medium | Follow design system; test with actual usage |
| Missing features | Low | Build exactly what SRS requires; no extras |

---

## 14. 2D Animation

### 14.1 What

**Framer Motion** — React animation library

### 14.2 Why

- **React-native**: Built specifically for React; excellent API
- **Layout animations**: Automatic layout transitions
- **Scroll-triggered**: `useInView` and `whileInView` for scroll reveals
- **Presence**: AnimatePresence for mount/unmount transitions
- **Spring physics**: Natural-feeling motion
- **Reduced motion**: Built-in `prefers-reduced-motion` support
- **Optimized**: Uses transforms and opacity; GPU-accelerated

### 14.3 Animation Requirements (from Design System)

```
Entrance:
  opacity: 0 → 1
  translateY: 24px → 0
  duration: 600-900ms

Heading reveal:
  Masked vertical reveal with clipping

Page transitions:
  Exit: opacity 1 → 0, scale 1 → 0.985
  Enter: opacity 0 → 1, translateY 12px → 0
  Duration: 400-700ms

Hover:
  duration: 150-300ms
  translateY: -2px
  scale: 1.01-1.03

Stagger:
  50-100ms between items

Reduced motion:
  Disable parallax, mouse-follow, magnetic buttons, continuous particles
  Keep content transitions (simplified)
```

### 14.4 Alternatives Considered

| Alternative | Why Not |
|-------------|---------|
| **GSAP** | Heavy; not React-native; licensing concerns for commercial use |
| **CSS animations only** | Limited control; no scroll-triggered; no layout animations |
| **React Spring** | Good but less maintained; Framer Motion is more popular |
| **AutoAnimate** | Too limited; no scroll triggers; no layout animations |
| **Motion One** | Good but smaller ecosystem than Framer Motion |

### 14.5 Trade-offs

| Trade-off | Impact | Mitigation |
|-----------|--------|------------|
| Bundle size (~30KB) | Adds to initial load | Tree-shaking; only import needed features |
| JavaScript-dependent | Animations don't work without JS | Content remains accessible; animations enhance |

### 14.6 Cost

**$0** — Open source.

### 14.7 Complexity

**Low-Medium.** Well-documented; intuitive API.

### 14.8 Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Performance on low-end devices | Medium | Reduce animation complexity; respect reduced-motion |
| Jank on scroll | Low | Use transform/opacity only; avoid layout triggers |

---

## 15. 3D Rendering

### 15.1 What

**Three.js** via **React Three Fiber** + **React Three Drei**

### 15.2 Why

- **React Three Fiber**: React renderer for Three.js; declarative 3D
- **Drei**: Useful helpers (OrbitControls, Environment, etc.)
- **Performance**: Automatic scene optimization; frustum culling
- **Ecosystem**: Largest React 3D ecosystem
- **Lazy loading**: Can load 3D only when needed
- **Fallback**: Easy to detect WebGL failure and show 2D alternative

### 15.3 3D Experience Requirements (from Design System)

```
Homepage Hero (Level A — Full):
  - Abstract geometric environment
  - Floating architectural structures
  - Dark spatial environment
  - Soft volumetric lighting
  - Subtle violet light source
  - Small particle field
  - Camera: slow cinematic movement
  - Mouse influence: camera position, object depth
  - Idle: very subtle position interpolation

Mobile/Low Capability (Level C — 2D Fallback):
  - Static/animated gradient background
  - 2D atmospheric lighting
  - CSS-only motion
  - No WebGL required
  - Must look intentionally designed
```

### 15.4 Implementation Strategy

```typescript
// Capability detection:
// 1. Check WebGL support
// 2. Check device pixel ratio
// 3. Check viewport size
// 4. Assign capability level: A (full), B (reduced), C (2D)

// Level A: Desktop 1280px+
//   - Full scene complexity
//   - Full particle count
//   - Mouse-follow interaction
//   - Camera movement

// Level B: Tablet 640-1279px
//   - Reduced geometry
//   - Fewer particles
//   - Simplified lighting
//   - No mouse-follow

// Level C: Mobile <640px or WebGL failure
//   - CSS gradient background
//   - Atmospheric 2D lighting
//   - No WebGL canvas
```

### 15.5 Alternatives Considered

| Alternative | Why Not |
|-------------|---------|
| **Babylon.js** | Heavier; less React integration; larger bundle |
| **Three.js (raw)** | No React integration; manual scene management |
| **PlayCanvas** | Game engine; overkill; not React-native |
| **model-viewer** | Google's web component; limited customization |
| **CSS 3D transforms** | Too limited for the required 3D environment |

### 15.6 Trade-offs

| Trade-off | Impact | Mitigation |
|-----------|--------|------------|
| Three.js bundle size (~150KB) | Large initial load | Dynamic import; lazy-load; code split |
| GPU dependency | May not work on all devices | 3-tier fallback system |
| Complexity | 3D development is specialized | Keep scene simple; use Drei helpers |

### 15.7 Cost

**$0** — Open source.

### 15.8 Complexity

**High.** 3D development requires specialized knowledge; scene design is creative work.

### 15.9 Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Performance issues | High | 3-tier fallback; reduce complexity; lazy load |
| WebGL failure | Medium | 2D fallback is mandatory; test on multiple devices |
| Bundle size impact | Medium | Dynamic import; only load on homepage |
| 3D concept undefined | High | This is an open question in SRS; must be resolved before implementation |

---

## 16. Motion (Page Transitions, Scroll, Parallax)

### 16.1 What

**Framer Motion** (same as 2D animation) + **Lenis** for smooth scrolling

### 16.2 Why

- **Framer Motion**: Already selected for 2D animations; handles page transitions and scroll-triggered reveals
- **Lenis**: Lightweight smooth scroll library; better performance than Locomotive Scroll
- **No duplication**: Single animation library for all motion needs

### 16.3 Motion Requirements

```
Smooth scrolling:
  - Lenis for smooth scroll behavior
  - Respects prefers-reduced-motion

Scroll-triggered animation:
  - Framer Motion whileInView
  - IntersectionObserver-based
  - Only animate when elements enter viewport

Parallax:
  - Framer Motion useScroll + useTransform
  - Desktop only
  - Disabled on reduced-motion

Page transitions:
  - Framer Motion AnimatePresence
  - Exit: opacity 1→0, scale 1→0.985
  - Enter: opacity 0→1, translateY 12px→0

Magnetic buttons:
  - Custom hook using Framer Motion
  - Desktop only (1280px+)
  - Max translation: 4-6px
  - Range: 24-40px
```

### 16.4 Alternatives Considered

| Alternative | Why Not |
|-------------|---------|
| **Locomotive Scroll** | Heavier; less maintained; more complex |
| **GSAP ScrollTrigger** | Licensing concerns; not React-native |
| **CSS scroll-snap** | Too limited; no parallax; no programmatic control |
| **Native scroll** | No smooth scroll; no parallax; limited control |

### 16.5 Cost

**$0** — Open source.

### 16.6 Complexity

**Low-Medium.** Framer Motion handles most needs; Lenis is simple.

### 16.7 Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Scroll jank | Medium | Use transform/opacity; avoid layout triggers |
| Reduced motion support | Medium | Respect prefers-reduced-motion; test thoroughly |

---

## 17. Caching

### 17.1 What

**ISR (Incremental Static Regeneration)** + **HTTP Cache Headers**

### 17.2 Why

- **ISR**: Next.js revalidates static pages periodically; no rebuild needed for content changes
- **HTTP caching**: Browser and CDN cache static assets
- **No Redis/Memcached**: Unnecessary complexity for this scale
- **Free**: Built into Next.js and Vercel

### 17.3 Implementation

```
Public pages:
  - ISR with 60-second revalidation
  - Stale-while-revalidate pattern
  - Content changes propagate within 1 minute

Static assets:
  - Immutable cache headers for hashed assets
  - Long cache duration for images

API responses:
  - Cache-Control headers for public GET endpoints
  - No-cache for admin endpoints

Image optimization:
  - next/image with quality optimization
  - WebP/AVIF format selection
  - Responsive sizes
```

### 17.4 Alternatives Considered

| Alternative | Why Not |
|-------------|---------|
| **Redis** | Adds hosting cost; unnecessary complexity |
| **Memcached** | Same as Redis |
| **Service Worker caching** | Adds complexity; not needed for read-heavy site |
| **Full SSG** | Requires rebuild for content changes |

### 17.5 Cost

**$0** — Built into Next.js and Vercel.

### 17.6 Complexity

**Low.** Next.js ISR handles most caching automatically.

### 17.7 Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Stale content | Low | 60-second revalidation; admin can trigger revalidation |
| Cache poisoning | Low | Input validation; sanitized responses |

---

## 18. Background Jobs

### 18.1 What

**Vercel Cron Jobs** + **API Route Handlers**

### 18.2 Why

- **GitHub sync**: Periodic repository synchronization
- **No queue system**: Portfolio doesn't need job queues
- **Simple**: Cron triggers API route that performs sync
- **Free**: Vercel supports cron on free tier (limited)

### 18.3 Implementation

```
GitHub Synchronization:
  - Triggered manually by admin via dashboard
  - OR triggered by Vercel cron (if automated sync approved)
  - API route fetches GitHub repos via API
  - Compares with existing project data
  - Updates/creates project records
  - Admin controls visibility of synced repos

No other background jobs required:
  - Email: Sent synchronously on contact submission
  - Image processing: Done during upload
  - Cache invalidation: ISR handles automatically
```

### 18.4 Alternatives Considered

| Alternative | Why Not |
|-------------|---------|
| **Bull/BullMQ + Redis** | Adds Redis dependency; overkill for this scale |
| **AWS SQS** | Adds AWS dependency; costs |
| **In-memory queue** | Lost on serverless cold start |
| **Web Workers** | Browser-only; not suitable for server-side sync |

### 18.5 Cost

**$0** — Vercel cron on free tier.

### 18.6 Complexity

**Low.** Simple cron job triggering API route.

### 18.7 Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| GitHub API rate limits | Low | Admin-triggered sync; not continuous |
| Sync failure | Low | Store last sync status; manual retry |

---

## 19. Hosting

### 19.1 What

**Vercel** — Frontend cloud platform

### 19.2 Why

- **Optimized for Next.js**: First-party support; best performance
- **Free tier**: 100GB bandwidth, 100GB-hours serverless compute
- **Global CDN**: Automatic edge deployment
- **Preview deployments**: Every PR gets a preview URL
- **Git integration**: Push to deploy
- **Environment variables**: Secure secret management
- **Analytics**: Built-in web analytics (free)

### 19.3 Free Tier Limits

| Resource | Free Limit | Project Need | Sufficient? |
|----------|-----------|--------------|-------------|
| Bandwidth | 100GB/month | ~10-50GB | Yes |
| Serverless hours | 100GB-hours | ~1-5GB-hours | Yes |
| Build minutes | 6000/month | ~50-100 | Yes |
| Function execution | 10s timeout | <1s typical | Yes |
| Edge functions | 100GB-hours | Minimal | Yes |
| Storage | 1GB | Not used | N/A |

### 19.4 Alternatives Considered

| Alternative | Why Not |
|-------------|---------|
| **Netlify** | Good but less optimized for Next.js; free tier has limits |
| **Cloudflare Pages** | No native Next.js support; requires adapter |
| **AWS Amplify** | Complex setup; free tier limited; more DevOps |
| **Railway** | $5/month minimum; not free |
| **Render** | Free tier has cold starts; limited |
| **Self-hosted VPS** | Costs $5-10/month; requires server management |

### 19.5 Trade-offs

| Trade-off | Impact | Mitigation |
|-----------|--------|------------|
| Vercel dependency | Could change pricing | Core Next.js works elsewhere; ejection possible |
| Function timeout (10s) | Long operations may fail | Keep functions lightweight; use ISR |
| Cold starts | First request may be slow | ISR for public pages; keep warm |

### 19.6 Cost

**$0** — Free tier covers project needs.

### 19.7 Complexity

**Low.** Push-to-deploy; minimal configuration.

### 19.8 Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Free tier limits exceeded | Low | Monitor usage; optimize as needed |
| Vendor lock-in | Medium | Use standard Next.js; portable to other platforms |
| Cold starts | Medium | ISR for public pages; lightweight functions |

---

## 20. CI/CD

### 20.1 What

**Vercel Git Integration** + **GitHub Actions** for linting/type-checking

### 20.2 Why

- **Vercel**: Automatic deployment on push to main; preview deployments on PRs
- **GitHub Actions**: Run lint, type-check, and tests before merge
- **No additional CI/CD platform**: Uses existing tools

### 20.3 Pipeline

```
Push to main:
  1. GitHub Actions: lint + type-check
  2. Vercel: build + deploy to production
  3. Vercel: invalidate ISR cache

Pull request:
  1. GitHub Actions: lint + type-check
  2. Vercel: build + deploy preview
  3. Preview URL available for review

Manual:
  - Admin can trigger revalidation via API
```

### 20.4 GitHub Actions Workflow

```yaml
# .github/workflows/ci.yml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint-and-typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm typecheck
```

### 20.5 Alternatives Considered

| Alternative | Why Not |
|-------------|---------|
| **CircleCI** | Adds another platform; unnecessary |
| **Jenkins** | Overkill; requires server |
| **GitLab CI** | Not using GitLab |
| **No CI** | Risk of pushing broken code |

### 20.6 Cost

**$0** — GitHub Actions free tier (2000 minutes/month); Vercel free tier.

### 20.7 Complexity

**Low.** Two simple configurations.

### 20.8 Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| CI minutes exceeded | Low | 2000 minutes/month is sufficient |
| Flaky tests | Low | Keep tests simple; retry on failure |

---

## 21. Security

### 21.1 What

**Multi-layer security** — Authentication, Input Validation, Rate Limiting, Headers

### 21.2 Implementation

```
Authentication:
  - NextAuth.js with credentials provider
  - JWT tokens with short expiry
  - httpOnly, secure, sameSite cookies
  - Password hashing with bcrypt

Input Validation:
  - Zod schemas for all API inputs
  - Server-side validation (never trust client)
  - Sanitize HTML content
  - Validate file uploads (type, size)

Rate Limiting:
  - Contact form: 1 submission per IP per 15 minutes
  - Login: 5 attempts per IP per 15 minutes
  - API: 100 requests per IP per minute
  - Implementation: In-memory rate limiter (sufficient for single instance)

Security Headers:
  - Content-Security-Policy
  - X-Frame-Options: DENY
  - X-Content-Type-Options: nosniff
  - Referrer-Policy: strict-origin-when-cross-origin
  - Permissions-Policy: camera=(), microphone=(), geolocation=()

API Security:
  - Admin routes require JWT session
  - GitHub token stored in environment variables
  - R2 credentials stored in environment variables
  - No secrets in client-side code
  - CSRF protection via NextAuth

Contact Form:
  - Honeypot field for bot detection
  - Rate limiting
  - Input validation
  - No CAPTCHA (unless abuse becomes a problem)
```

### 21.3 Alternatives Considered

| Alternative | Why Not |
|-------------|---------|
| **reCAPTCHA** | Adds Google dependency; privacy concerns; may not be needed |
| **hCaptcha** | Similar to reCAPTCHA; may not be needed initially |
| **WAF (Cloudflare)** | Adds complexity; not needed for this scale |
| **IP blocking** | Too aggressive; may block legitimate users |

### 21.4 Trade-offs

| Trade-off | Impact | Mitigation |
|-----------|--------|------------|
| No CAPTCHA | May receive spam | Rate limiting + honeypot; add CAPTCHA if needed |
| In-memory rate limiting | Reset on cold start | Acceptable for portfolio; not security-critical |
| JWT not revocable | Cannot force logout | Short expiry; acceptable for single admin |

### 21.5 Cost

**$0** — All security measures are application-level.

### 21.6 Complexity

**Medium.** Multiple layers to implement and test.

### 21.7 Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Admin credential theft | High | Strong password; secure cookies; no public exposure |
| XSS attacks | Medium | Input sanitization; CSP headers |
| CSRF attacks | Medium | NextAuth CSRF tokens; sameSite cookies |
| Contact form spam | Low | Rate limiting; honeypot; monitor |

---

## 22. SEO

### 22.1 What

**Next.js Metadata API** + **Structured Data** + **Sitemap**

### 22.2 Implementation

```
Page-level metadata:
  - Title tags with target keywords
  - Meta descriptions
  - Open Graph tags (social sharing)
  - Twitter Card tags
  - Canonical URLs

Structured Data (JSON-LD):
  - Person schema for Muhammad Taha
  - WebSite schema for portfolio
  - Project schema for project pages
  - BreadcrumbList for navigation

Technical SEO:
  - Semantic HTML (header, nav, main, section, article, footer)
  - Logical heading hierarchy (h1 → h2 → h3)
  - Alt text for images
  - Clean URLs (/projects/my-project)
  - Sitemap.xml (auto-generated)
  - Robots.txt
  - 404 page
  - Internal linking

Target Keywords:
  - Muhammad Taha
  - Muhammad Taha developer
  - Muhammad Taha full-stack developer
  - Full-stack developer Pakistan
  - AI developer Pakistan
  - Full-stack AI developer
  - React developer
  - Next.js developer
  - Web developer
```

### 22.3 Implementation

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: {
    template: '%s | Muhammad Taha',
    default: 'Muhammad Taha — Full-Stack + AI Developer',
  },
  description: '...',
  openGraph: { ... },
  twitter: { ... },
};

// app/projects/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const project = await getProject(params.slug);
  return {
    title: project.title,
    description: project.short_statement,
    openGraph: {
      images: [project.screenshot_urls[0]],
    },
  };
}

// app/sitemap.ts
export default function sitemap() {
  // Generate sitemap from database
}
```

### 22.4 Alternatives Considered

| Alternative | Why Not |
|-------------|---------|
| **NextSEO** | Adds dependency; Next.js Metadata API is sufficient |
| **Yoast-style plugins** | WordPress-specific; not applicable |
| **External SEO tools** | Not part of codebase; manual optimization |

### 22.5 Cost

**$0** — All SEO is application-level.

### 22.6 Complexity

**Low.** Next.js Metadata API is straightforward.

### 22.7 Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Poor indexing | Low | Proper metadata; sitemap; semantic HTML |
| Keyword stuffing | Low | Natural content; professional copywriting |

---

## 23. Accessibility

### 23.1 What

**Production-grade accessibility** targeting WCAG 2.2 AA

### 23.2 Implementation

```
Semantic HTML:
  - Proper landmark elements
  - Logical heading hierarchy
  - List markup for lists
  - Table markup for tables

Keyboard Navigation:
  - All interactive elements focusable
  - Visible focus indicators (2px solid #8B5CF6, 3px offset)
  - Logical tab order
  - Skip navigation link
  - Escape to close modals/menus
  - Arrow keys for dropdowns

Screen Reader Support:
  - ARIA labels for interactive elements
  - Alt text for meaningful images
  - Empty alt for decorative images
  - aria-hidden for decorative 3D canvas
  - Live regions for dynamic content

Color Contrast:
  - WCAG AA contrast ratios
  - #F5F5F5 on #080808: >15:1 (passes AAA)
  - #A3A3A3 on #080808: >7:1 (passes AA)
  - #8B5CF6 on #080808: >4.5:1 (passes AA for large text)

Reduced Motion:
  - @media (prefers-reduced-motion: reduce)
  - Disable: parallax, mouse-follow, magnetic buttons, continuous particles
  - Keep: content transitions (simplified), hover feedback

3D Accessibility:
  - 3D canvas has aria-hidden="true"
  - All hero content is HTML, not canvas
  - Essential information never in 3D
  - 2D fallback provides same content

Forms:
  - Explicit labels for all inputs
  - Error messages associated with fields
  - Required field indicators
  - Form submission feedback
```

### 23.3 Alternatives Considered

| Alternative | Why Not |
|-------------|---------|
| **axe-core automated testing** | Good addition; can integrate in CI |
| **WAVE** | Manual testing tool; not automated |
| **No accessibility** | Unprofessional; excludes users; may violate regulations |

### 23.4 Trade-offs

| Trade-off | Impact | Mitigation |
|-----------|--------|------------|
| Reduced motion disables animations | Less visual impact | Content remains fully accessible |
| 3D not accessible | Visual-only experience | 2D fallback; content in HTML |
| Focus management complexity | More code | Test thoroughly; use ARIA patterns |

### 23.5 Cost

**$0** — Application-level implementation.

### 23.6 Complexity

**Medium.** Requires careful implementation and testing.

### 23.7 Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Accessibility failures | Medium | Test with screen readers; automated testing |
| 3D exclusion | Low | 2D fallback; HTML content |

---

## 24. Performance

### 24.1 What

**Performance optimization strategy** across all layers

### 24.2 Targets

```
Core Web Vitals (target):
  - LCP: <2.5s (Largest Contentful Paint)
  - FID: <100ms (First Input Delay)
  - CLS: <0.1 (Cumulative Layout Shift)
  - INP: <200ms (Interaction to Next Paint)

Loading Order (from design system):
  1. HTML/Content
  2. Typography
  3. Critical imagery
  4. UI
  5. Motion
  6. 3D enhancement
```

### 24.3 Implementation

```
Code Splitting:
  - Dynamic imports for Three.js
  - Dynamic imports for admin dashboard
  - Route-based code splitting (automatic with App Router)

Image Optimization:
  - next/image for responsive images
  - WebP/AVIF format
  - Lazy loading for below-fold images
  - Placeholder blur for project screenshots

Font Optimization:
  - next/font for Inter and JetBrains Mono
  - Font display: swap
  - Preload critical fonts

Bundle Optimization:
  - Tree shaking
  - Minification
  - Compression (Brotli/Gzip via Vercel)

Rendering Strategy:
  - Public pages: ISR (60s revalidation)
  - Admin pages: Client-side rendering
  - API responses: Cache headers

3D Performance:
  - Dynamic import (only load on homepage)
  - Capability detection (3-tier fallback)
  - Reduce geometry on lower devices
  - Pause off-screen animations
  - Use requestAnimationFrame
```

### 24.4 Alternatives Considered

| Alternative | Why Not |
|-------------|---------|
| **Full SSG** | Requires rebuild for content changes |
| **Edge rendering** | Not needed for this scale |
| **Micro-frontends** | Overkill for single application |

### 24.5 Cost

**$0** — All optimization is application-level.

### 24.6 Complexity

**Medium.** Requires performance profiling and optimization.

### 24.7 Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| 3D performance impact | High | 3-tier fallback; lazy load; reduce complexity |
| Large bundle size | Medium | Code splitting; tree shaking; dynamic imports |
| Image load time | Medium | Responsive images; lazy loading; optimization |

---

## 25. Monitoring

### 25.1 What

**Vercel Analytics** (free) + **Sentry** (free tier)

### 25.2 Implementation

```
Vercel Analytics:
  - Web Vitals tracking
  - Page views
  - Visitor insights
  - Free tier included

Sentry (optional):
  - Error tracking
  - Performance monitoring
  - Free tier: 5000 errors/month
  - Can add later if needed

Logging:
  - Console logging in development
  - Structured logging for API errors
  - Contact form submission logging

Uptime:
  - Vercel provides built-in uptime monitoring
  - Can add external monitoring (UptimeRobot free tier) if needed
```

### 25.3 Alternatives Considered

| Alternative | Why Not |
|-------------|---------|
| **Datadog** | Paid; overkill |
| **New Relic** | Free tier limited; complex setup |
| **LogRocket** | Paid; session replay not needed |
| **Google Analytics** | Privacy concerns; heavier; adds cookie consent requirement |

### 25.4 Cost

**$0** — Vercel Analytics free; Sentry free tier.

### 25.5 Complexity

**Low.** Mostly configuration.

### 25.6 Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Missed errors | Low | Sentry captures errors; monitor dashboard |
| Performance regression | Low | Vercel Analytics tracks Web Vitals |

---

## 26. Frontend/Utility Libraries

### 26.1 Animation & Motion

| Library | Purpose | Size | Why |
|---------|---------|------|-----|
| **Framer Motion** | 2D animations, page transitions, scroll reveals | ~30KB | Best React animation library |
| **Lenis** | Smooth scrolling | ~10KB | Lightweight; performant |
| **@react-three/fiber** | Three.js React renderer | ~40KB | Declarative 3D |
| **@react-three/drei** | Three.js helpers | ~50KB | Useful 3D utilities |

### 26.2 Forms & Validation

| Library | Purpose | Size | Why |
|---------|---------|------|-----|
| **React Hook Form** | Form state management | ~9KB | Performant; minimal re-renders |
| **Zod** | Schema validation | ~14KB | TypeScript-first; used in API routes too |

### 26.3 UI Components (Admin)

| Library | Purpose | Size | Why |
|---------|---------|------|-----|
| **shadcn/ui** | Admin UI primitives | Copy-paste | No dependency; uses Tailwind |
| **Lucide React** | Icons | Tree-shakeable | Matches design system (geometric line icons) |
| **Tailwind CSS** | Utility CSS | ~10KB (purged) | Fast development; design token integration |

### 26.4 Database & API

| Library | Purpose | Size | Why |
|---------|---------|------|-----|
| **Drizzle ORM** | Database ORM | ~15KB | Type-safe; lightweight |
| **@libsql/client** | Turso database client | ~20KB | Official Turso client |
| **NextAuth.js** | Authentication | ~20KB | Purpose-built for Next.js |

### 26.5 Utilities

| Library | Purpose | Size | Why |
|---------|---------|------|-----|
| **date-fns** | Date formatting | Tree-shakeable | Lightweight alternative to moment.js |
| **clsx** | Conditional classNames | ~1KB | Tiny utility |
| **tailwind-merge** | Tailwind class merging | ~5KB | Prevents conflicting classes |

### 26.6 3D Assets

| Library | Purpose | Size | Why |
|---------|---------|------|-----|
| **three** | 3D engine | ~150KB | Core 3D library |
| **@react-three/postprocessing** | Visual effects | ~30KB | Bloom, vignette effects |

### 26.7 Total Bundle Impact

```
Critical (initial load):
  - next.js framework: ~80KB
  - React: ~40KB
  - Tailwind CSS: ~10KB
  - App code: ~50KB
  Total: ~180KB

Deferred (page-specific):
  - Framer Motion: ~30KB (loaded on first animation)
  - React Hook Form: ~9KB (loaded on forms)
  - Zod: ~14KB (loaded on validation)
  - Drizzle: ~15KB (API routes only)

Dynamic (lazy-loaded):
  - Three.js: ~150KB (homepage only)
  - React Three Fiber: ~40KB (homepage only)
  - Drei: ~50KB (homepage only)
  Total: ~240KB (loaded only when 3D is needed)
```

### 26.8 Alternatives Considered

| Library | Alternative | Why Not |
|---------|-------------|---------|
| Framer Motion | GSAP | Licensing; not React-native |
| React Hook Form | Formik | Heavier; more re-renders |
| Zod | Yup | Less TypeScript-native |
| Drizzle | Prisma | Heavier; larger bundle |
| Tailwind | CSS Modules | Slower development; less design token integration |
| Lucide | Heroicons | Less geometric; different style |
| shadcn/ui | Mantine/Ant Design | Too heavy; not matching design system |

### 26.9 Cost

**$0** — All libraries are open source.

### 26.10 Complexity

**Low-Medium.** Well-established libraries with good documentation.

### 26.11 Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Bundle size | Medium | Dynamic imports; tree shaking; code splitting |
| Library abandonment | Low | Choose well-maintained libraries; have alternatives |
| Compatibility issues | Low | Test after updates; pin versions |

---

## 27. Development Environment

### 27.1 What

**Local development setup**

### 27.2 Stack

```
Runtime: Node.js 20 LTS
Package Manager: pnpm (faster; disk-efficient)
IDE: VS Code (with extensions)
Database: Turso local (libSQL)
Git: Git with conventional commits
```

### 27.3 VS Code Extensions

```
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript
- Drizzle Studio (database GUI)
- ES7+ React/Redux/React-Native snippets
```

### 27.4 Scripts

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "typecheck": "tsc --noEmit",
  "db:generate": "drizzle-kit generate",
  "db:migrate": "drizzle-kit migrate",
  "db:studio": "drizzle-kit studio"
}
```

---

## 28. Project Structure

```
taha-portfolio/
├── .github/
│   └── workflows/
│       └── ci.yml
├── public/
│   └── fonts/
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── layout.tsx          # Public layout (navbar + footer)
│   │   │   ├── page.tsx            # Home
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── skills/
│   │   │   │   └── page.tsx
│   │   │   ├── projects/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── experience/
│   │   │   │   └── page.tsx
│   │   │   ├── education/
│   │   │   │   └── page.tsx
│   │   │   ├── certifications/
│   │   │   │   └── page.tsx
│   │   │   ├── resume/
│   │   │   │   └── page.tsx
│   │   │   └── contact/
│   │   │       └── page.tsx
│   │   ├── admin/
│   │   │   ├── layout.tsx          # Admin layout (sidebar)
│   │   │   ├── page.tsx            # Dashboard
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── projects/
│   │   │   ├── profile/
│   │   │   ├── about/
│   │   │   ├── skills/
│   │   │   ├── experience/
│   │   │   ├── education/
│   │   │   ├── certifications/
│   │   │   ├── achievements/
│   │   │   ├── resume/
│   │   │   ├── social-links/
│   │   │   ├── messages/
│   │   │   ├── github/
│   │   │   ├── homepage/
│   │   │   └── settings/
│   │   ├── api/
│   │   │   ├── contact/route.ts
│   │   │   ├── admin/
│   │   │   │   ├── login/route.ts
│   │   │   │   ├── logout/route.ts
│   │   │   │   └── auth/route.ts
│   │   │   ├── projects/
│   │   │   ├── skills/
│   │   │   ├── experience/
│   │   │   ├── education/
│   │   │   ├── certifications/
│   │   │   ├── achievements/
│   │   │   ├── profile/route.ts
│   │   │   ├── about/route.ts
│   │   │   ├── resume/route.ts
│   │   │   ├── social-links/route.ts
│   │   │   ├── homepage/route.ts
│   │   │   ├── messages/
│   │   │   ├── github/
│   │   │   ├── settings/route.ts
│   │   │   └── upload/route.ts
│   │   ├── layout.tsx              # Root layout
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── ui/                     # shadcn/ui primitives
│   │   ├── public/                 # Public site components
│   │   │   ├── navbar.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── hero.tsx
│   │   │   ├── project-card.tsx
│   │   │   ├── section-label.tsx
│   │   │   └── cta-button.tsx
│   │   ├── admin/                  # Admin dashboard components
│   │   │   ├── sidebar.tsx
│   │   │   ├── data-table.tsx
│   │   │   ├── form-field.tsx
│   │   │   └── status-card.tsx
│   │   ├── 3d/                     # Three.js components
│   │   │   ├── scene.tsx
│   │   │   ├── environment.tsx
│   │   │   ├── particles.tsx
│   │   │   └── fallback.tsx
│   │   └── motion/                 # Animation components
│   │       ├── reveal.tsx
│   │       ├── parallax.tsx
│   │       └── magnetic-button.tsx
│   ├── lib/
│   │   ├── db/
│   │   │   ├── index.ts            # Database connection
│   │   │   ├── schema.ts           # Drizzle schema
│   │   │   └── queries.ts          # Database queries
│   │   ├── auth/
│   │   │   └── index.ts            # NextAuth config
│   │   ├── email/
│   │   │   └── index.ts            # Resend integration
│   │   ├── storage/
│   │   │   └── index.ts            # R2 integration
│   │   ├── github/
│   │   │   └── index.ts            # GitHub API integration
│   │   ├── validators/
│   │   │   └── index.ts            # Zod schemas
│   │   └── utils.ts                # Shared utilities
│   ├── hooks/
│   │   ├── use-scroll.ts
│   │   ├── use-mouse-position.ts
│   │   ├── use-media-query.ts
│   │   └── use-capability.ts       # 3D capability detection
│   ├── types/
│   │   └── index.ts                # Shared TypeScript types
│   └── styles/
│       └── globals.css             # Tailwind + custom styles
├── drizzle/
│   └── migrations/
├── .env.local                      # Environment variables
├── .env.example
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
├── drizzle.config.ts
└── package.json
```

---

## 29. Environment Variables

```env
# Database
TURSO_DATABASE_URL=
TURSO_AUTH_TOKEN=

# Authentication
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Email (Resend)
RESEND_API_KEY=
CONTACT_EMAIL=

# Storage (Cloudflare R2)
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=
R2_PUBLIC_URL=

# GitHub
GITHUB_TOKEN=
GITHUB_USERNAME=

# App
NEXT_PUBLIC_SITE_URL=
```

---

## 30. Deployment

### 30.1 Production Deployment

```
1. Push to main branch
2. Vercel auto-deploys
3. Run database migrations
4. Verify environment variables
5. Test public pages
6. Test admin functionality
7. Verify email delivery
8. Check 3D fallback
9. Run Lighthouse audit
10. Monitor for errors
```

### 30.2 Post-Deployment Verification

```
- [ ] Public pages load correctly
- [ ] 3D environment renders on desktop
- [ ] 2D fallback works on mobile
- [ ] Admin login works
- [ ] Content management works
- [ ] Contact form submits
- [ ] Email notification received
- [ ] GitHub sync works
- [ ] Images upload to R2
- [ ] SEO metadata present
- [ ] Accessibility checks pass
- [ ] Performance metrics acceptable
```

---

## 31. APPROVED ARCHITECTURE CANDIDATE

### Summary

| Layer | Technology | Cost |
|-------|-----------|------|
| **Frontend** | Next.js 14 (App Router) | $0 |
| **Backend** | Next.js API Routes | $0 |
| **Database** | Turso (libSQL/SQLite) | $0 |
| **ORM** | Drizzle ORM | $0 |
| **Authentication** | NextAuth.js (Auth.js) | $0 |
| **Authorization** | Middleware + RBAC | $0 |
| **API** | REST (Route Handlers) | $0 |
| **Storage** | Cloudflare R2 | $0 |
| **Search** | None (SEO via metadata) | $0 |
| **Payments** | None | $0 |
| **Email** | Resend | $0 |
| **Admin** | Custom (shadcn/ui primitives) | $0 |
| **2D Animation** | Framer Motion | $0 |
| **3D Rendering** | Three.js + React Three Fiber | $0 |
| **Motion** | Framer Motion + Lenis | $0 |
| **Caching** | ISR + HTTP headers | $0 |
| **Background Jobs** | Vercel Cron + API routes | $0 |
| **Hosting** | Vercel | $0 |
| **CI/CD** | GitHub Actions + Vercel | $0 |
| **Security** | NextAuth + Zod + rate limiting | $0 |
| **SEO** | Next.js Metadata API | $0 |
| **Accessibility** | Manual + semantic HTML | $0 |
| **Performance** | ISR + code splitting + optimization | $0 |
| **Monitoring** | Vercel Analytics + optional Sentry | $0 |
| **UI Libraries** | shadcn/ui, Lucide, Tailwind | $0 |

**Total Monthly Cost: $0**

### Why This Architecture

1. **Single framework**: Next.js handles everything — SSR, API, admin, SEO
2. **Serverless**: No servers to manage; scales automatically
3. **Type safety**: TypeScript throughout; Drizzle ORM for database
4. **Free tier sufficient**: All services operate within free limits
5. **Portfolio scale**: ~20 projects, ~50 content items, single admin
6. **Performance**: ISR for fast public pages; lazy-loaded 3D
7. **SEO**: Server-rendered content; metadata API; sitemap
8. **Accessible**: Semantic HTML; keyboard navigation; reduced motion
9. **Maintainable**: Admin CMS updates content without code changes
10. **Portable**: Standard Next.js; can migrate from Vercel if needed

### Decision Required

This architecture requires human approval before implementation begins. Key decisions to confirm:

1. **3D concept**: Abstract geometric environment (as per design system)
2. **GitHub sync**: Manual trigger (admin-initiated)
3. **Resume format**: Editable structured content (database-stored)
4. **Email notifications**: Resend to admin email
5. **Analytics**: Vercel Analytics (free, built-in)
6. **Hosting**: Vercel free tier

---

*Document generated by Lead Solutions Architect*
*Architecture version: 1.0*
*Status: PENDING APPROVAL*
