# Muhammad Taha Portfolio — Database Design Document

**Version:** 1.0
**Status:** LOCKED — Do not modify without architecture approval
**Engine:** SQLite (Turso/libSQL)
**Date:** September 2, 2026

---

## 1. Overview

### 1.1 Purpose

This document defines the complete database design for the Muhammad Taha Portfolio, including entities, attributes, relationships, constraints, indexes, and migration strategy.

### 1.2 Design Principles

- **Simplicity**: SQLite requires minimal configuration; no joins across databases
- **Portability**: Standard SQL; no vendor-specific extensions
- **Auditability**: Timestamps on all data changes
- **Query Performance**: Indexes on common access patterns
- **Data Integrity**: Constraints enforce valid data at the database level

### 1.3 Normalization Strategy

**Target: Third Normal Form (3NF)**

| Normal Form | Achievement | Notes |
|-------------|-------------|-------|
| 1NF | ✓ | All columns contain atomic values; no repeating groups |
| 2NF | ✓ | No partial dependencies; all non-key attributes depend on the full primary key |
| 3NF | ✓ | No transitive dependencies; all non-key attributes depend only on the primary key |

**Deliberate Denormalization:**

| Table | Denormalization | Reason |
|-------|-----------------|--------|
| `projects` | `technologies` stored as JSON array | Avoids many-to-many join table for simple tag list; SQLite JSON functions sufficient |
| `projects` | `screenshot_urls` stored as JSON array | Avoids separate screenshots table; array iteration is simple |
| `homepage_content` | `featured_project_ids` stored as JSON array | Avoids join table for simple homepage display list |

**Trade-off**: Denormalized JSON fields sacrifice query flexibility for simplicity. Since this is a read-heavy portfolio with single-admin writes, the trade-off is acceptable.

---

## 2. Entity-Relationship Diagram (ERD)

### 2.1 Entities

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           ENTITY RELATIONSHIP DIAGRAM                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────┐     ┌──────────────┐     ┌──────────────┐                   │
│  │ profile  │     │    about     │     │   resume     │                   │
│  │ (1:1)    │     │   (1:1)      │     │   (1:1)      │                   │
│  └──────────┘     └──────────────┘     └──────────────┘                   │
│                                                                             │
│  ┌──────────┐     ┌──────────────┐     ┌──────────────┐                   │
│  │  skills  │     │technologies  │     │   projects   │                   │
│  │ (1:N)    │     │  (1:N)       │     │   (1:N)      │                   │
│  └──────────┘     └──────────────┘     └──────────────┘                   │
│                                                                             │
│  ┌──────────┐     ┌──────────────┐     ┌──────────────┐                   │
│  │experience│     │  education   │     │certifications│                   │
│  │ (1:N)    │     │   (1:N)      │     │   (1:N)      │                   │
│  └──────────┘     └──────────────┘     └──────────────┘                   │
│                                                                             │
│  ┌──────────┐     ┌──────────────┐     ┌──────────────┐                   │
│  │achievements│   │ social_links │     │contact_msgs  │                   │
│  │  (1:N)   │     │   (1:N)      │     │   (1:N)      │                   │
│  └──────────┘     └──────────────┘     └──────────────┘                   │
│                                                                             │
│  ┌──────────┐     ┌──────────────┐     ┌──────────────┐                   │
│  │homepage  │     │site_settings │     │ admin_users  │                   │
│  │content   │     │   (1:1)      │     │   (1:N)      │                   │
│  │ (1:1)    │     └──────────────┘     └──────────────┘                   │
│  └──────────┘                                                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Relationship Summary

| Relationship | Type | Description |
|-------------|------|-------------|
| profile → (none) | Singleton | Single row; no FK relationships |
| about → (none) | Singleton | Single row; no FK relationships |
| resume → (none) | Singleton | Single row; no FK relationships |
| homepage_content → projects | JSON reference | `featured_project_ids` references `projects.id` |
| skills → (none) | Independent | No foreign keys |
| technologies → (none) | Independent | No foreign keys |
| experience → (none) | Independent | No foreign keys |
| education → (none) | Independent | No foreign keys |
| certifications → (none) | Independent | No foreign keys |
| achievements → (none) | Independent | No foreign keys |
| social_links → (none) | Independent | No foreign keys |
| contact_messages → (none) | Independent | No foreign keys |
| site_settings → (none) | Singleton | Single row; no FK relationships |
| admin_users → (none) | Independent | No FK relationships |

**Design Decision**: The portfolio data model is intentionally flat. Most tables are independent collections with no foreign key relationships between them. This is because:

1. **SQLite doesn't enforce foreign keys by default** — must enable with `PRAGMA foreign_keys = ON`
2. **Portfolio scale is small** — joins are unnecessary for ~20 items per table
3. **Read-heavy workload** — denormalized data simplifies queries
4. **Single admin writer** — no concurrent write conflicts

---

## 3. Entity Definitions

### 3.1 profile

**Purpose**: Singleton table storing personal and professional identity information.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | INTEGER | NO | 1 | Primary key (singleton) |
| `name` | TEXT | NO | 'Muhammad Taha' | Full name |
| `title` | TEXT | NO | 'Full-Stack + AI Developer' | Professional title |
| `short_bio` | TEXT | YES | NULL | Brief professional summary |
| `email` | TEXT | YES | NULL | Professional email |
| `phone` | TEXT | YES | NULL | Phone number |
| `location` | TEXT | YES | NULL | City/country |
| `avatar_url` | TEXT | YES | NULL | Profile image URL |
| `updated_at` | TEXT | YES | datetime('now') | Last modification timestamp |

**Constraints:**
- `id = 1` (singleton pattern)
- `name` NOT NULL
- `title` NOT NULL

---

### 3.2 about

**Purpose**: Singleton table storing detailed biography and profile content.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | INTEGER | NO | 1 | Primary key (singleton) |
| `biography` | TEXT | NO | — | Full biography text |
| `profile_content` | TEXT | YES | NULL | Additional profile details |
| `interests` | TEXT | YES | NULL | Professional interests |
| `updated_at` | TEXT | YES | datetime('now') | Last modification timestamp |

**Constraints:**
- `id = 1` (singleton pattern)
- `biography` NOT NULL

---

### 3.3 skills

**Purpose**: Technical and professional skills.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | INTEGER | NO | — | Primary key (auto-increment) |
| `name` | TEXT | NO | — | Skill name |
| `category` | TEXT | YES | NULL | Category (e.g., 'Frontend', 'Backend') |
| `description` | TEXT | YES | NULL | Skill description |
| `sort_order` | INTEGER | NO | 0 | Display order |
| `created_at` | TEXT | YES | datetime('now') | Creation timestamp |

**Constraints:**
- `name` NOT NULL
- `sort_order` NOT NULL DEFAULT 0

---

### 3.4 technologies

**Purpose**: Technologies and tools used in projects.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | INTEGER | NO | — | Primary key (auto-increment) |
| `name` | TEXT | NO | — | Technology name |
| `icon_url` | TEXT | YES | NULL | Icon/Logo URL |
| `category` | TEXT | YES | NULL | Category (e.g., 'Frontend', 'Database') |
| `sort_order` | INTEGER | NO | 0 | Display order |
| `created_at` | TEXT | YES | datetime('now') | Creation timestamp |

**Constraints:**
- `name` NOT NULL
- `sort_order` NOT NULL DEFAULT 0

---

### 3.5 projects

**Purpose**: Portfolio projects with case studies, metadata, and GitHub integration.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | INTEGER | NO | — | Primary key (auto-increment) |
| `title` | TEXT | NO | — | Project title |
| `slug` | TEXT | NO | — | URL-safe slug (unique) |
| `description` | TEXT | YES | NULL | Full project description |
| `short_statement` | TEXT | YES | NULL | One-line summary |
| `technologies` | TEXT | YES | NULL | JSON array of technology names |
| `live_url` | TEXT | YES | NULL | Live deployment URL |
| `github_url` | TEXT | YES | NULL | GitHub repository URL |
| `demo_url` | TEXT | YES | NULL | Demo video URL |
| `screenshot_urls` | TEXT | YES | NULL | JSON array of screenshot URLs |
| `case_study_problem` | TEXT | YES | NULL | Problem statement |
| `case_study_solution` | TEXT | YES | NULL | Solution description |
| `case_study_result` | TEXT | YES | NULL | Outcome/result |
| `is_featured` | INTEGER | NO | 0 | Featured on homepage (0/1) |
| `is_visible` | INTEGER | NO | 1 | Public visibility (0/1) |
| `sort_order` | INTEGER | NO | 0 | Display order |
| `github_repo_id` | INTEGER | YES | NULL | GitHub repository ID |
| `github_synced_at` | TEXT | YES | NULL | Last GitHub sync timestamp |
| `created_at` | TEXT | YES | datetime('now') | Creation timestamp |
| `updated_at` | TEXT | YES | datetime('now') | Last modification timestamp |

**Constraints:**
- `title` NOT NULL
- `slug` UNIQUE NOT NULL
- `slug` format: lowercase alphanumeric with hyphens (`^[a-z0-9]+(-[a-z0-9]+)*$`)
- `is_featured` IN (0, 1)
- `is_visible` IN (0, 1)
- `technologies` must be valid JSON array when not NULL
- `screenshot_urls` must be valid JSON array when not NULL

**Indexes:**
- `idx_projects_featured` ON (is_featured, is_visible, sort_order) — Homepage queries
- `idx_projects_visible` ON (is_visible, sort_order) — Project listing
- `idx_projects_slug` UNIQUE ON (slug) — Individual project lookup
- `idx_projects_github_repo` ON (github_repo_id) — GitHub sync lookups

---

### 3.6 experience

**Purpose**: Professional work experience.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | INTEGER | NO | — | Primary key (auto-increment) |
| `role` | TEXT | NO | — | Job title/role |
| `organization` | TEXT | YES | NULL | Company/organization name |
| `description` | TEXT | YES | NULL | Role description |
| `start_date` | TEXT | YES | NULL | Start date (YYYY-MM) |
| `end_date` | TEXT | YES | NULL | End date (YYYY-MM) or NULL if current |
| `is_current` | INTEGER | NO | 0 | Currently working here (0/1) |
| `sort_order` | INTEGER | NO | 0 | Display order |
| `created_at` | TEXT | YES | datetime('now') | Creation timestamp |

**Constraints:**
- `role` NOT NULL
- `is_current` IN (0, 1)
- `end_date` should be NULL when `is_current = 1`
- `start_date` format: YYYY-MM

---

### 3.7 education

**Purpose**: Educational background.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | INTEGER | NO | — | Primary key (auto-increment) |
| `institution` | TEXT | NO | — | School/university name |
| `qualification` | TEXT | YES | NULL | Degree/qualification |
| `program` | TEXT | YES | NULL | Program/major |
| `description` | TEXT | YES | NULL | Description |
| `start_date` | TEXT | YES | NULL | Start date (YYYY-MM) |
| `end_date` | TEXT | YES | NULL | End date (YYYY-MM) |
| `sort_order` | INTEGER | NO | 0 | Display order |
| `created_at` | TEXT | YES | datetime('now') | Creation timestamp |

**Constraints:**
- `institution` NOT NULL
- `start_date` format: YYYY-MM

---

### 3.8 certifications

**Purpose**: Professional certifications and courses.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | INTEGER | NO | — | Primary key (auto-increment) |
| `name` | TEXT | NO | — | Certification name |
| `issuer` | TEXT | YES | NULL | Issuing organization |
| `date` | TEXT | YES | NULL | Date earned (YYYY-MM) |
| `description` | TEXT | YES | NULL | Description |
| `sort_order` | INTEGER | NO | 0 | Display order |
| `created_at` | TEXT | YES | datetime('now') | Creation timestamp |

**Constraints:**
- `name` NOT NULL

---

### 3.9 achievements

**Purpose**: Awards, recognitions, and accomplishments.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | INTEGER | NO | — | Primary key (auto-increment) |
| `title` | TEXT | NO | — | Achievement title |
| `description` | TEXT | YES | NULL | Description |
| `date` | TEXT | YES | NULL | Date achieved (YYYY-MM) |
| `sort_order` | INTEGER | NO | 0 | Display order |
| `created_at` | TEXT | YES | datetime('now') | Creation timestamp |

**Constraints:**
- `title` NOT NULL

---

### 3.10 resume

**Purpose**: Singleton table for resume content and PDF reference.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | INTEGER | NO | 1 | Primary key (singleton) |
| `content` | TEXT | YES | NULL | Structured content (JSON or Markdown) |
| `pdf_url` | TEXT | YES | NULL | URL to PDF upload |
| `updated_at` | TEXT | YES | datetime('now') | Last modification timestamp |

**Constraints:**
- `id = 1` (singleton pattern)

---

### 3.11 social_links

**Purpose**: Professional and social media links.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | INTEGER | NO | — | Primary key (auto-increment) |
| `platform` | TEXT | NO | — | Platform name (e.g., 'GitHub') |
| `url` | TEXT | NO | — | Full URL |
| `is_visible` | INTEGER | NO | 1 | Public visibility (0/1) |
| `sort_order` | INTEGER | NO | 0 | Display order |
| `created_at` | TEXT | YES | datetime('now') | Creation timestamp |

**Constraints:**
- `platform` NOT NULL
- `url` NOT NULL
- `url` format: valid URL

---

### 3.12 contact_messages

**Purpose**: Contact form submissions from visitors.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | INTEGER | NO | — | Primary key (auto-increment) |
| `name` | TEXT | NO | — | Sender's name |
| `email` | TEXT | NO | — | Sender's email |
| `subject` | TEXT | YES | NULL | Message subject |
| `message` | TEXT | NO | — | Message content |
| `is_read` | INTEGER | NO | 0 | Admin read status (0/1) |
| `created_at` | TEXT | YES | datetime('now') | Submission timestamp |

**Constraints:**
- `name` NOT NULL
- `email` NOT NULL
- `message` NOT NULL
- `is_read` IN (0, 1)

**Indexes:**
- `idx_contact_messages_read` ON (is_read) — Filter unread messages
- `idx_contact_messages_created` ON (created_at) — Recent messages

**Design Note**: No soft delete is implemented. Messages are retained until manually deleted by admin. This preserves data integrity and simplifies the schema.

---

### 3.13 homepage_content

**Purpose**: Singleton table for homepage-specific content.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | INTEGER | NO | 1 | Primary key (singleton) |
| `hero_introduction` | TEXT | YES | NULL | Hero section intro text |
| `featured_project_ids` | TEXT | YES | NULL | JSON array of project IDs |
| `contact_statement` | TEXT | YES | NULL | CTA text |
| `updated_at` | TEXT | YES | datetime('now') | Last modification timestamp |

**Constraints:**
- `id = 1` (singleton pattern)
- `featured_project_ids` must be valid JSON array when not NULL

---

### 3.14 site_settings

**Purpose**: Singleton table for global site configuration.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | INTEGER | NO | 1 | Primary key (singleton) |
| `site_title` | TEXT | YES | 'Muhammad Taha' | Site title |
| `site_description` | TEXT | YES | NULL | Site meta description |
| `analytics_enabled` | INTEGER | NO | 0 | Enable Vercel Analytics (0/1) |
| `animation_intensity` | TEXT | YES | 'standard' | 'reduced', 'standard', 'enhanced' |
| `three_d_enabled` | INTEGER | NO | 1 | Enable 3D experience (0/1) |
| `updated_at` | TEXT | YES | datetime('now') | Last modification timestamp |

**Constraints:**
- `id = 1` (singleton pattern)
- `animation_intensity` IN ('reduced', 'standard', 'enhanced')
- `analytics_enabled` IN (0, 1)
- `three_d_enabled` IN (0, 1)

---

### 3.15 admin_users

**Purpose**: Administrator accounts for CMS access.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | INTEGER | NO | — | Primary key (auto-increment) |
| `email` | TEXT | NO | — | Login email (unique) |
| `password_hash` | TEXT | NO | — | bcrypt password hash |
| `created_at` | TEXT | YES | datetime('now') | Account creation timestamp |

**Constraints:**
- `email` UNIQUE NOT NULL
- `password_hash` NOT NULL

**Indexes:**
- `idx_admin_users_email` UNIQUE ON (email) — Login lookup

---

## 4. Constraints Summary

### 4.1 Primary Keys

| Table | Column | Type | Notes |
|-------|--------|------|-------|
| profile | id | INTEGER | Singleton (1) |
| about | id | INTEGER | Singleton (1) |
| resume | id | INTEGER | Singleton (1) |
| homepage_content | id | INTEGER | Singleton (1) |
| site_settings | id | INTEGER | Singleton (1) |
| skills | id | INTEGER | Auto-increment |
| technologies | id | INTEGER | Auto-increment |
| projects | id | INTEGER | Auto-increment |
| experience | id | INTEGER | Auto-increment |
| education | id | INTEGER | Auto-increment |
| certifications | id | INTEGER | Auto-increment |
| achievements | id | INTEGER | Auto-increment |
| social_links | id | INTEGER | Auto-increment |
| contact_messages | id | INTEGER | Auto-increment |
| admin_users | id | INTEGER | Auto-increment |

### 4.2 NOT NULL Constraints

| Table | Column(s) |
|-------|-----------|
| profile | name, title |
| about | biography |
| skills | name |
| technologies | name |
| projects | title, slug |
| experience | role |
| education | institution |
| certifications | name |
| achievements | title |
| social_links | platform, url |
| contact_messages | name, email, message |
| admin_users | email, password_hash |

### 4.3 UNIQUE Constraints

| Table | Column | Notes |
|-------|--------|-------|
| projects | slug | URL-safe identifier |
| admin_users | email | Login credential |

### 4.4 CHECK Constraints (SQLite)

SQLite supports CHECK constraints but they are not enforced by default in some configurations. These are documented for application-level validation:

```sql
-- Projects
CHECK (is_featured IN (0, 1))
CHECK (is_visible IN (0, 1))

-- Experience
CHECK (is_current IN (0, 1))

-- Social Links
CHECK (is_visible IN (0, 1))

-- Contact Messages
CHECK (is_read IN (0, 1))

-- Site Settings
CHECK (analytics_enabled IN (0, 1))
CHECK (three_d_enabled IN (0, 1))
CHECK (animation_intensity IN ('reduced', 'standard', 'enhanced'))
```

---

## 5. Indexes

### 5.1 Purpose

Indexes optimize query performance for common access patterns. All indexes are created in `schema.sql`.

### 5.2 Index List

| Index | Table | Columns | Purpose |
|-------|-------|---------|---------|
| `idx_projects_featured` | projects | is_featured, is_visible, sort_order | Homepage featured projects |
| `idx_projects_visible` | projects | is_visible, sort_order | Public project listing |
| `idx_projects_slug` | projects | slug | Individual project lookup |
| `idx_projects_github_repo` | projects | github_repo_id | GitHub sync lookups |
| `idx_skills_order` | skills | sort_order | Ordered skill listing |
| `idx_technologies_order` | technologies | sort_order | Ordered technology listing |
| `idx_experience_order` | experience | sort_order | Ordered experience listing |
| `idx_education_order` | education | sort_order | Ordered education listing |
| `idx_certifications_order` | certifications | sort_order | Ordered certification listing |
| `idx_achievements_order` | achievements | sort_order | Ordered achievement listing |
| `idx_social_links_visible` | social_links | is_visible, sort_order | Visible social links |
| `idx_contact_messages_read` | contact_messages | is_read | Unread messages filter |
| `idx_contact_messages_created` | contact_messages | created_at | Recent messages |
| `idx_admin_users_email` | admin_users | email | Login email lookup |

### 5.3 Index Strategy

- **Sort Order Indexes**: All collection tables have indexes on `sort_order` for fast ordered listing
- **Visibility Indexes**: Tables with visibility controls have composite indexes on (is_visible, sort_order)
- **Singleton Tables**: No indexes needed; single row access is O(1)
- **JSON Fields**: No indexes on JSON fields (technologies, screenshot_urls, featured_project_ids) as they are not queried

---

## 6. Views

### 6.1 Purpose

Views encapsulate common query patterns for cleaner application code.

### 6.2 Views List

| View | Purpose | Query |
|------|---------|-------|
| `v_visible_projects` | Public project listing | WHERE is_visible = 1 ORDER BY sort_order |
| `v_featured_projects` | Homepage featured projects | WHERE is_featured = 1 AND is_visible = 1 ORDER BY sort_order |
| `v_unread_messages` | Admin unread messages | WHERE is_read = 0 ORDER BY created_at DESC |
| `v_social_links` | Public social links | WHERE is_visible = 1 ORDER BY sort_order |

---

## 7. Triggers

### 7.1 Purpose

Triggers automatically update `updated_at` timestamps when records are modified.

### 7.2 Triggers List

| Trigger | Table | Event | Action |
|---------|-------|-------|--------|
| `trg_profile_updated` | profile | AFTER UPDATE | Set updated_at = datetime('now') |
| `trg_about_updated` | about | AFTER UPDATE | Set updated_at = datetime('now') |
| `trg_projects_updated` | projects | AFTER UPDATE | Set updated_at = datetime('now') |
| `trg_resume_updated` | resume | AFTER UPDATE | Set updated_at = datetime('now') |
| `trg_homepage_content_updated` | homepage_content | AFTER UPDATE | Set updated_at = datetime('now') |
| `trg_site_settings_updated` | site_settings | AFTER UPDATE | Set updated_at = datetime('now') |

---

## 8. Soft Deletion

### 8.1 Policy

**Soft deletion is NOT implemented** for this schema.

**Rationale:**
1. **Single admin**: No need for recovery workflow
2. **Small dataset**: ~20 items per table; easy to re-enter if deleted
3. **No compliance requirements**: No GDPR/audit trail needed
4. **Simplicity**: Reduces schema complexity

### 8.2 Data Retention

| Table | Retention | Notes |
|-------|-----------|-------|
| contact_messages | Indefinite | Until manually deleted by admin |
| All other tables | Indefinite | Managed by admin |

---

## 9. Seed Requirements

### 9.1 Purpose

Seed data provides initial content for development and first deployment.

### 9.2 Seed Data Summary

| Table | Records | Notes |
|-------|---------|-------|
| profile | 1 | Singleton with default values |
| about | 1 | Placeholder biography |
| skills | 12 | Sample technical skills |
| technologies | 20 | Sample technology stack |
| projects | 5 | Sample projects with case studies |
| experience | 3 | Sample work experience |
| education | 1 | Sample education |
| certifications | 2 | Sample certifications |
| achievements | 2 | Sample achievements |
| resume | 1 | Structured JSON content |
| social_links | 4 | GitHub, LinkedIn, Twitter, Email |
| homepage_content | 1 | Default hero/CTA text |
| site_settings | 1 | Default settings |
| admin_users | 1 | Default admin account |

### 9.3 Seed File

Location: `database/seed.sql`

### 9.4 Admin Credentials

```
Email: admin@muhammadtaha.dev
Password: admin123 (CHANGE IN PRODUCTION)
```

---

## 10. Migration Strategy

### 10.1 Approach

**Drizzle Kit Migrations** — Schema-first migrations with version control.

### 10.2 Migration Workflow

```bash
# 1. Modify schema in src/lib/db/schema.ts
# 2. Generate migration
pnpm db:generate
# 3. Review generated SQL in drizzle/migrations/
# 4. Apply migration
pnpm db:push          # Push to Turso
# OR
pnpm db:migrate       # Run migrations locally
```

### 10.3 Migration File Naming

```
drizzle/migrations/
├── 0000_initial.sql
├── 0001_add_project_fields.sql
├── 0002_create_indexes.sql
└── ...
```

### 10.4 Rollback Strategy

Drizzle Kit does not support automatic rollbacks. Manual rollback steps:

1. Keep backup before migration
2. Document rollback SQL in migration comments
3. Test migrations on local database first

### 10.5 Production Migration

```bash
# 1. Generate migration locally
pnpm db:generate

# 2. Test on local SQLite
pnpm db:push

# 3. Push to Turso
TURSO_DATABASE_URL=libsql://xxx.turso.io TURSO_AUTH_TOKEN=xxx pnpm db:push

# 4. Verify
pnpm db:studio
```

### 10.6 Schema Comparison

| Feature | Current Schema | Architecture Schema | Notes |
|---------|---------------|---------------------|-------|
| Tables | 15 | 15 | Matches |
| Primary Keys | INTEGER | INTEGER | ✓ |
| Auto-increment | PRIMARY KEY only | AUTOINCREMENT | SQLite: auto-increment is implicit for INTEGER PRIMARY KEY |
| Boolean columns | INTEGER (0/1) | BOOLEAN | SQLite: boolean = INTEGER |
| Timestamps | TEXT | DATETIME | SQLite: datetime stored as TEXT |
| JSON fields | TEXT | TEXT | SQLite: JSON stored as TEXT |

---

## 11. Performance Considerations

### 11.1 Query Patterns

| Pattern | Frequency | Optimization |
|---------|-----------|--------------|
| Homepage load | High | ISR + indexed featured projects |
| Project listing | High | ISR + indexed visible projects |
| Single project | Medium | Indexed slug lookup |
| Admin dashboard | Low | Simple queries, single user |
| Contact form | Low | Rate-limited, single INSERT |

### 11.2 Storage Estimates

| Table | Avg Row Size | Est. Rows | Est. Storage |
|-------|--------------|-----------|--------------|
| profile | ~500B | 1 | 500B |
| about | ~2KB | 1 | 2KB |
| skills | ~200B | 50 | 10KB |
| technologies | ~150B | 50 | 7.5KB |
| projects | ~5KB | 20 | 100KB |
| experience | ~500B | 10 | 5KB |
| education | ~500B | 5 | 2.5KB |
| certifications | ~300B | 10 | 3KB |
| achievements | ~300B | 10 | 3KB |
| resume | ~10KB | 1 | 10KB |
| social_links | ~150B | 10 | 1.5KB |
| contact_messages | ~1KB | 1000 | 1MB |
| homepage_content | ~500B | 1 | 500B |
| site_settings | ~200B | 1 | 200B |
| admin_users | ~200B | 1 | 200B |
| **Total** | | | **~1.15MB** |

**Conclusion**: Well within Turso's 9GB free tier limit.

---

## 12. Security Considerations

### 12.1 Data Protection

| Concern | Mitigation |
|---------|------------|
| Password storage | bcrypt hash (never plain text) |
| API keys | Environment variables only |
| SQL injection | Drizzle ORM parameterized queries |
| Admin access | NextAuth.js session-based auth |
| Public data | Read-only API endpoints |

### 12.2 Sensitive Data

| Field | Location | Protection |
|-------|----------|------------|
| Admin password | admin_users.password_hash | bcrypt hash |
| API tokens | Environment variables | Never in codebase |
| Database credentials | Environment variables | Never in codebase |

---

## 13. Backup Strategy

### 13.1 Turso Backup

- Turso provides automatic backups on paid tiers
- Free tier: Manual export recommended

### 13.2 Export Command

```bash
# Export database
turso db dump portfolio-db > backup_$(date +%Y%m%d).sql

# Or using SQLite
sqlite3 local.db .dump > backup_$(date +%Y%m%d).sql
```

### 13.3 Backup Schedule

- **Before any migration**: Manual backup
- **Weekly**: Automated export (if CI/CD configured)
- **Monthly**: Full backup with verification

---

## Appendix A: SQL Schema File

Location: `database/schema.sql`

## Appendix B: Seed Data File

Location: `database/seed.sql`

## Appendix C: Drizzle Schema

Location: `src/lib/db/schema.ts`

---

*Document version: 1.0*
*Status: LOCKED*
*Last updated: September 2, 2026*
