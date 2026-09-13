import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

// ============================================================================
// TABLE: profile
// Purpose: Singleton table for personal/professional identity
// Pattern: Singleton (id = 1)
// ============================================================================

export const profile = sqliteTable('profile', {
  id: integer('id').primaryKey().default(1),
  name: text('name').notNull().default('Muhammad Taha'),
  title: text('title').notNull().default('CS Student | Aspiring Full-Stack Developer'),
  shortBio: text('short_bio'),
  email: text('email'),
  phone: text('phone'),
  location: text('location'),
  avatarUrl: text('avatar_url'),
  updatedAt: text('updated_at').default(sql`datetime('now')`),
})

// ============================================================================
// TABLE: about
// Purpose: Singleton table for biography and profile content
// Pattern: Singleton (id = 1)
// ============================================================================

export const about = sqliteTable('about', {
  id: integer('id').primaryKey().default(1),
  biography: text('biography').notNull(),
  profileContent: text('profile_content'),
  interests: text('interests'),
  updatedAt: text('updated_at').default(sql`datetime('now')`),
})

// ============================================================================
// TABLE: skills
// Purpose: Technical and professional skills
// Pattern: Collection (ordered list)
// ============================================================================

export const skills = sqliteTable(
  'skills',
  {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
    category: text('category'),
    description: text('description'),
    sortOrder: integer('sort_order').notNull().default(0),
    createdAt: text('created_at').default(sql`datetime('now')`),
  },
  (t) => ({
    sortOrderIdx: index('skills_sort_order_idx').on(t.sortOrder),
  })
)

// ============================================================================
// TABLE: technologies
// Purpose: Technologies and tools used
// Pattern: Collection (ordered list)
// ============================================================================

export const technologies = sqliteTable(
  'technologies',
  {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
    iconUrl: text('icon_url'),
    category: text('category'),
    sortOrder: integer('sort_order').notNull().default(0),
    createdAt: text('created_at').default(sql`datetime('now')`),
  },
  (t) => ({
    sortOrderIdx: index('technologies_sort_order_idx').on(t.sortOrder),
  })
)

// ============================================================================
// TABLE: projects
// Purpose: Portfolio projects with case studies and metadata
// Pattern: Collection (ordered list, with visibility controls)
// Notes:
//   - technologies: JSON array of technology names
//   - screenshot_urls: JSON array of image URLs
//   - github_repo_id: Links to GitHub repository if synced
// ============================================================================

export const projects = sqliteTable(
  'projects',
  {
    id: integer('id').primaryKey(),
    title: text('title').notNull(),
    slug: text('slug').unique().notNull(),
    description: text('description'),
    shortStatement: text('short_statement'),
    technologies: text('technologies'), // JSON array
    liveUrl: text('live_url'),
    githubUrl: text('github_url'),
    demoUrl: text('demo_url'),
    screenshotUrls: text('screenshot_urls'), // JSON array
    caseStudyProblem: text('case_study_problem'),
    caseStudySolution: text('case_study_solution'),
    caseStudyResult: text('case_study_result'),
    isFeatured: integer('is_featured', { mode: 'boolean' }).notNull().default(false),
    isVisible: integer('is_visible', { mode: 'boolean' }).notNull().default(true),
    sortOrder: integer('sort_order').notNull().default(0),
    githubRepoId: integer('github_repo_id'),
    githubSyncedAt: text('github_synced_at'),
    createdAt: text('created_at').default(sql`datetime('now')`),
    updatedAt: text('updated_at').default(sql`datetime('now')`),
  },
  (t) => ({
    slugIdx: index('projects_slug_idx').on(t.slug),
    isFeaturedIdx: index('projects_is_featured_idx').on(t.isFeatured),
    isVisibleIdx: index('projects_is_visible_idx').on(t.isVisible),
    sortOrderIdx: index('projects_sort_order_idx').on(t.sortOrder),
  })
)

// ============================================================================
// TABLE: experience
// Purpose: Professional work experience
// Pattern: Collection (ordered list, date-range)
// ============================================================================

export const experience = sqliteTable(
  'experience',
  {
    id: integer('id').primaryKey(),
    role: text('role').notNull(),
    organization: text('organization'),
    description: text('description'),
    startDate: text('start_date'),
    endDate: text('end_date'),
    isCurrent: integer('is_current', { mode: 'boolean' }).notNull().default(false),
    sortOrder: integer('sort_order').notNull().default(0),
    createdAt: text('created_at').default(sql`datetime('now')`),
  },
  (t) => ({
    sortOrderIdx: index('experience_sort_order_idx').on(t.sortOrder),
  })
)

// ============================================================================
// TABLE: education
// Purpose: Educational background
// Pattern: Collection (ordered list, date-range)
// ============================================================================

export const education = sqliteTable(
  'education',
  {
    id: integer('id').primaryKey(),
    institution: text('institution').notNull(),
    qualification: text('qualification'),
    program: text('program'),
    description: text('description'),
    startDate: text('start_date'),
    endDate: text('end_date'),
    sortOrder: integer('sort_order').notNull().default(0),
    createdAt: text('created_at').default(sql`datetime('now')`),
  },
  (t) => ({
    sortOrderIdx: index('education_sort_order_idx').on(t.sortOrder),
  })
)

// ============================================================================
// TABLE: certifications
// Purpose: Professional certifications and courses
// Pattern: Collection (ordered list)
// ============================================================================

export const certifications = sqliteTable(
  'certifications',
  {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
    issuer: text('issuer'),
    date: text('date'),
    description: text('description'),
    sortOrder: integer('sort_order').notNull().default(0),
    createdAt: text('created_at').default(sql`datetime('now')`),
  },
  (t) => ({
    sortOrderIdx: index('certifications_sort_order_idx').on(t.sortOrder),
  })
)

// ============================================================================
// TABLE: achievements
// Purpose: Awards, recognitions, and accomplishments
// Pattern: Collection (ordered list)
// ============================================================================

export const achievements = sqliteTable(
  'achievements',
  {
    id: integer('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description'),
    date: text('date'),
    sortOrder: integer('sort_order').notNull().default(0),
    createdAt: text('created_at').default(sql`datetime('now')`),
  },
  (t) => ({
    sortOrderIdx: index('achievements_sort_order_idx').on(t.sortOrder),
  })
)

// ============================================================================
// TABLE: resume
// Purpose: Singleton table for resume content and PDF reference
// Pattern: Singleton (id = 1)
// Notes:
//   - content: Structured resume content (JSON or Markdown)
//   - pdf_url: Optional URL to uploaded PDF
// ============================================================================

export const resume = sqliteTable('resume', {
  id: integer('id').primaryKey().default(1),
  content: text('content'), // JSON or Markdown structured content
  pdfUrl: text('pdf_url'),
  updatedAt: text('updated_at').default(sql`datetime('now')`),
})

// ============================================================================
// TABLE: social_links
// Purpose: Professional and social media links
// Pattern: Collection (ordered list, visibility control)
// ============================================================================

export const socialLinks = sqliteTable(
  'social_links',
  {
    id: integer('id').primaryKey(),
    platform: text('platform').notNull(),
    url: text('url').notNull(),
    isVisible: integer('is_visible', { mode: 'boolean' }).notNull().default(true),
    sortOrder: integer('sort_order').notNull().default(0),
    createdAt: text('created_at').default(sql`datetime('now')`),
  },
  (t) => ({
    isVisibleIdx: index('social_links_is_visible_idx').on(t.isVisible),
    sortOrderIdx: index('social_links_sort_order_idx').on(t.sortOrder),
  })
)

// ============================================================================
// TABLE: contact_messages
// Purpose: Contact form submissions from visitors
// Pattern: Collection (append-only, with read status)
// Notes:
//   - No soft delete; messages retained until manually deleted
//   - is_read tracks whether admin has viewed the message
// ============================================================================

export const contactMessages = sqliteTable(
  'contact_messages',
  {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    subject: text('subject'),
    message: text('message').notNull(),
    isRead: integer('is_read', { mode: 'boolean' }).notNull().default(false),
    createdAt: text('created_at').default(sql`datetime('now')`),
  },
  (t) => ({
    isReadIdx: index('contact_messages_is_read_idx').on(t.isRead),
  })
)

// ============================================================================
// TABLE: homepage_content
// Purpose: Singleton table for homepage-specific content
// Pattern: Singleton (id = 1)
// Notes:
//   - featured_project_ids: JSON array of project IDs
//   - hero_introduction: Custom intro text for hero section
// ============================================================================

export const homepageContent = sqliteTable('homepage_content', {
  id: integer('id').primaryKey().default(1),
  heroIntroduction: text('hero_introduction'),
  featuredProjectIds: text('featured_project_ids'), // JSON array of project IDs
  contactStatement: text('contact_statement'),
  updatedAt: text('updated_at').default(sql`datetime('now')`),
})

// ============================================================================
// TABLE: site_settings
// Purpose: Singleton table for global site configuration
// Pattern: Singleton (id = 1)
// Notes:
//   - animation_intensity: 'reduced' | 'standard' | 'enhanced'
//   - three_d_enabled: Toggle 3D experience on/off
//   - analytics_enabled: Toggle analytics
// ============================================================================

export const siteSettings = sqliteTable('site_settings', {
  id: integer('id').primaryKey().default(1),
  siteTitle: text('site_title').default('Muhammad Taha'),
  siteDescription: text('site_description'),
  analyticsEnabled: integer('analytics_enabled', { mode: 'boolean' }).notNull().default(false),
  animationIntensity: text('animation_intensity').default('standard'),
  threeDEnabled: integer('three_d_enabled', { mode: 'boolean' }).notNull().default(true),
  updatedAt: text('updated_at').default(sql`datetime('now')`),
})

// ============================================================================
// TABLE: admin_users
// Purpose: Administrator accounts for CMS access
// Pattern: Collection (single user for now)
// Notes:
//   - password_hash: bcrypt hash
//   - No public registration; admin created via seed or migration
// ============================================================================

export const adminUsers = sqliteTable(
  'admin_users',
  {
    id: integer('id').primaryKey(),
    email: text('email').unique().notNull(),
    passwordHash: text('password_hash').notNull(),
    createdAt: text('created_at').default(sql`datetime('now')`),
  },
  (t) => ({
    emailIdx: index('admin_users_email_idx').on(t.email),
  })
)

// ============================================================================
// TABLE: password_reset_tokens
// Purpose: Store password reset tokens for admin account recovery
// Pattern: Collection (tokens with expiry)
// ============================================================================

export const passwordResetTokens = sqliteTable(
  'password_reset_tokens',
  {
    id: integer('id').primaryKey(),
    token: text('token').unique().notNull(),
    email: text('email').notNull(),
    expiresAt: text('expires_at').notNull(),
    used: integer('used', { mode: 'boolean' }).notNull().default(false),
    createdAt: text('created_at').default(sql`datetime('now')`),
  },
  (t) => ({
    tokenIdx: index('password_reset_tokens_token_idx').on(t.token),
  })
)

// ============================================================================
// TYPES
// ============================================================================

export type Profile = typeof profile.$inferSelect
export type About = typeof about.$inferSelect
export type Skill = typeof skills.$inferSelect
export type Technology = typeof technologies.$inferSelect
export type Project = typeof projects.$inferSelect
export type Experience = typeof experience.$inferSelect
export type Education = typeof education.$inferSelect
export type Certification = typeof certifications.$inferSelect
export type Achievement = typeof achievements.$inferSelect
export type Resume = typeof resume.$inferSelect
export type SocialLink = typeof socialLinks.$inferSelect
export type ContactMessage = typeof contactMessages.$inferSelect
export type HomepageContent = typeof homepageContent.$inferSelect
export type SiteSettings = typeof siteSettings.$inferSelect
export type AdminUser = typeof adminUsers.$inferSelect
export type PasswordResetToken = typeof passwordResetTokens.$inferSelect

export type ProfileInsert = typeof profile.$inferInsert
export type AboutInsert = typeof about.$inferInsert
export type SkillInsert = typeof skills.$inferInsert
export type TechnologyInsert = typeof technologies.$inferInsert
export type ProjectInsert = typeof projects.$inferInsert
export type ExperienceInsert = typeof experience.$inferInsert
export type EducationInsert = typeof education.$inferInsert
export type CertificationInsert = typeof certifications.$inferInsert
export type AchievementInsert = typeof achievements.$inferInsert
export type ResumeInsert = typeof resume.$inferInsert
export type SocialLinkInsert = typeof socialLinks.$inferInsert
export type ContactMessageInsert = typeof contactMessages.$inferInsert
export type HomepageContentInsert = typeof homepageContent.$inferInsert
export type SiteSettingsInsert = typeof siteSettings.$inferInsert
export type AdminUserInsert = typeof adminUsers.$inferInsert
export type PasswordResetTokenInsert = typeof passwordResetTokens.$inferInsert
