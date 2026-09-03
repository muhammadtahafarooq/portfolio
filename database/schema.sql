-- ============================================================================
-- Muhammad Taha Portfolio — Database Schema
-- Engine: SQLite (Turso/libSQL)
-- Version: 1.0
-- Status: LOCKED — Do not modify without architecture approval
-- ============================================================================

-- ============================================================================
-- PRAGMA SETTINGS
-- ============================================================================

PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

-- ============================================================================
-- TABLE: profile
-- PURPOSE: Singleton table storing personal/professional identity
-- PATTERN: Singleton (id = 1)
-- ============================================================================

CREATE TABLE profile (
  id            INTEGER PRIMARY KEY DEFAULT 1,
  name          TEXT    NOT NULL DEFAULT 'Muhammad Taha',
  title         TEXT    NOT NULL DEFAULT 'Full-Stack + AI Developer',
  short_bio     TEXT,
  email         TEXT,
  phone         TEXT,
  location      TEXT,
  avatar_url    TEXT,
  updated_at    TEXT    DEFAULT (datetime('now'))
);

-- ============================================================================
-- TABLE: about
-- PURPOSE: Singleton table storing biography and profile content
-- PATTERN: Singleton (id = 1)
-- ============================================================================

CREATE TABLE about (
  id              INTEGER PRIMARY KEY DEFAULT 1,
  biography       TEXT NOT NULL,
  profile_content TEXT,
  interests       TEXT,
  updated_at      TEXT DEFAULT (datetime('now'))
);

-- ============================================================================
-- TABLE: skills
-- PURPOSE: Technical and professional skills
-- PATTERN: Collection (ordered list)
-- ============================================================================

CREATE TABLE skills (
  id          INTEGER PRIMARY KEY,
  name        TEXT    NOT NULL,
  category    TEXT,
  description TEXT,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT    DEFAULT (datetime('now'))
);

-- ============================================================================
-- TABLE: technologies
-- PURPOSE: Technologies and tools used
-- PATTERN: Collection (ordered list)
-- ============================================================================

CREATE TABLE technologies (
  id          INTEGER PRIMARY KEY,
  name        TEXT    NOT NULL,
  icon_url    TEXT,
  category    TEXT,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT    DEFAULT (datetime('now'))
);

-- ============================================================================
-- TABLE: projects
-- PURPOSE: Portfolio projects with case studies and metadata
-- PATTERN: Collection (ordered list, with visibility controls)
-- NOTES:
--   - technologies: JSON array of technology names
--   - screenshot_urls: JSON array of image URLs
--   - github_repo_id: Links to GitHub repository if synced
--   - github_synced_at: Timestamp of last GitHub sync
-- ============================================================================

CREATE TABLE projects (
  id                    INTEGER PRIMARY KEY,
  title                 TEXT    NOT NULL,
  slug                  TEXT    UNIQUE NOT NULL,
  description           TEXT,
  short_statement       TEXT,
  technologies          TEXT,  -- JSON array
  live_url              TEXT,
  github_url            TEXT,
  demo_url              TEXT,
  screenshot_urls       TEXT,  -- JSON array
  case_study_problem    TEXT,
  case_study_solution   TEXT,
  case_study_result     TEXT,
  is_featured           INTEGER NOT NULL DEFAULT 0,
  is_visible            INTEGER NOT NULL DEFAULT 1,
  sort_order            INTEGER NOT NULL DEFAULT 0,
  github_repo_id        INTEGER,
  github_synced_at      TEXT,
  created_at            TEXT    DEFAULT (datetime('now')),
  updated_at            TEXT    DEFAULT (datetime('now'))
);

-- ============================================================================
-- TABLE: experience
-- PURPOSE: Professional work experience
-- PATTERN: Collection (ordered list, date-range)
-- ============================================================================

CREATE TABLE experience (
  id            INTEGER PRIMARY KEY,
  role          TEXT    NOT NULL,
  organization  TEXT,
  description   TEXT,
  start_date    TEXT,
  end_date      TEXT,
  is_current    INTEGER NOT NULL DEFAULT 0,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  created_at    TEXT    DEFAULT (datetime('now'))
);

-- ============================================================================
-- TABLE: education
-- PURPOSE: Educational background
-- PATTERN: Collection (ordered list, date-range)
-- ============================================================================

CREATE TABLE education (
  id            INTEGER PRIMARY KEY,
  institution   TEXT    NOT NULL,
  qualification TEXT,
  program       TEXT,
  description   TEXT,
  start_date    TEXT,
  end_date      TEXT,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  created_at    TEXT    DEFAULT (datetime('now'))
);

-- ============================================================================
-- TABLE: certifications
-- PURPOSE: Professional certifications and courses
-- PATTERN: Collection (ordered list)
-- ============================================================================

CREATE TABLE certifications (
  id          INTEGER PRIMARY KEY,
  name        TEXT    NOT NULL,
  issuer      TEXT,
  date        TEXT,
  description TEXT,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT    DEFAULT (datetime('now'))
);

-- ============================================================================
-- TABLE: achievements
-- PURPOSE: Awards, recognitions, and accomplishments
-- PATTERN: Collection (ordered list)
-- ============================================================================

CREATE TABLE achievements (
  id          INTEGER PRIMARY KEY,
  title       TEXT    NOT NULL,
  description TEXT,
  date        TEXT,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT    DEFAULT (datetime('now'))
);

-- ============================================================================
-- TABLE: resume
-- PURPOSE: Singleton table for resume content and PDF reference
-- PATTERN: Singleton (id = 1)
-- NOTES:
--   - content: Structured resume content (JSON or Markdown)
--   - pdf_url: Optional URL to uploaded PDF
-- ============================================================================

CREATE TABLE resume (
  id          INTEGER PRIMARY KEY DEFAULT 1,
  content     TEXT,  -- JSON or Markdown structured content
  pdf_url     TEXT,
  updated_at  TEXT DEFAULT (datetime('now'))
);

-- ============================================================================
-- TABLE: social_links
-- PURPOSE: Professional and social media links
-- PATTERN: Collection (ordered list, visibility control)
-- ============================================================================

CREATE TABLE social_links (
  id          INTEGER PRIMARY KEY,
  platform    TEXT    NOT NULL,
  url         TEXT    NOT NULL,
  is_visible  INTEGER NOT NULL DEFAULT 1,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT    DEFAULT (datetime('now'))
);

-- ============================================================================
-- TABLE: contact_messages
-- PURPOSE: Contact form submissions from visitors
-- PATTERN: Collection (append-only, with read status)
-- NOTES:
--   - No soft delete; messages are retained until manually deleted
--   - is_read tracks whether admin has viewed the message
-- ============================================================================

CREATE TABLE contact_messages (
  id          INTEGER PRIMARY KEY,
  name        TEXT    NOT NULL,
  email       TEXT    NOT NULL,
  subject     TEXT,
  message     TEXT    NOT NULL,
  is_read     INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT    DEFAULT (datetime('now'))
);

-- ============================================================================
-- TABLE: homepage_content
-- PURPOSE: Singleton table for homepage-specific content
-- PATTERN: Singleton (id = 1)
-- NOTES:
--   - featured_project_ids: JSON array of project IDs for homepage display
--   - hero_introduction: Custom intro text for hero section
--   - contact_statement: Call-to-action text
-- ============================================================================

CREATE TABLE homepage_content (
  id                    INTEGER PRIMARY KEY DEFAULT 1,
  hero_introduction     TEXT,
  featured_project_ids  TEXT,  -- JSON array of project IDs
  contact_statement     TEXT,
  updated_at            TEXT DEFAULT (datetime('now'))
);

-- ============================================================================
-- TABLE: site_settings
-- PURPOSE: Singleton table for global site configuration
-- PATTERN: Singleton (id = 1)
-- NOTES:
--   - animation_intensity: 'reduced' | 'standard' | 'enhanced'
--   - three_d_enabled: Toggle 3D experience on/off
--   - analytics_enabled: Toggle Vercel Analytics
-- ============================================================================

CREATE TABLE site_settings (
  id                    INTEGER PRIMARY KEY DEFAULT 1,
  site_title            TEXT DEFAULT 'Muhammad Taha',
  site_description      TEXT,
  analytics_enabled     INTEGER NOT NULL DEFAULT 0,
  animation_intensity   TEXT    DEFAULT 'standard',
  three_d_enabled       INTEGER NOT NULL DEFAULT 1,
  updated_at            TEXT DEFAULT (datetime('now'))
);

-- ============================================================================
-- TABLE: admin_users
-- PURPOSE: Administrator accounts for CMS access
-- PATTERN: Collection (single user for now)
-- NOTES:
--   - password_hash: bcrypt hash
--   - No public registration; admin created via seed or migration
-- ============================================================================

CREATE TABLE admin_users (
  id            INTEGER PRIMARY KEY,
  email         TEXT    UNIQUE NOT NULL,
  password_hash TEXT    NOT NULL,
  created_at    TEXT    DEFAULT (datetime('now'))
);

-- ============================================================================
-- INDEXES
-- Purpose: Optimize common query patterns
-- ============================================================================

-- Projects: Featured projects for homepage
CREATE INDEX idx_projects_featured ON projects(is_featured, is_visible, sort_order);

-- Projects: Visible projects listing
CREATE INDEX idx_projects_visible ON projects(is_visible, sort_order);

-- Projects: Unique slug lookup
CREATE INDEX idx_projects_slug ON projects(slug);

-- Projects: GitHub repo lookup
CREATE INDEX idx_projects_github_repo ON projects(github_repo_id);

-- Skills: Ordered listing
CREATE INDEX idx_skills_order ON skills(sort_order);

-- Technologies: Ordered listing
CREATE INDEX idx_technologies_order ON technologies(sort_order);

-- Experience: Ordered listing
CREATE INDEX idx_experience_order ON experience(sort_order);

-- Education: Ordered listing
CREATE INDEX idx_education_order ON education(sort_order);

-- Certifications: Ordered listing
CREATE INDEX idx_certifications_order ON certifications(sort_order);

-- Achievements: Ordered listing
CREATE INDEX idx_achievements_order ON achievements(sort_order);

-- Social Links: Visible links
CREATE INDEX idx_social_links_visible ON social_links(is_visible, sort_order);

-- Contact Messages: Unread messages
CREATE INDEX idx_contact_messages_read ON contact_messages(is_read);

-- Contact Messages: Recent messages
CREATE INDEX idx_contact_messages_created ON contact_messages(created_at);

-- Admin Users: Email lookup
CREATE INDEX idx_admin_users_email ON admin_users(email);

-- ============================================================================
-- TRIGGERS
-- Purpose: Auto-update updated_at timestamps
-- ============================================================================

-- Profile: Auto-update on change
CREATE TRIGGER trg_profile_updated
AFTER UPDATE ON profile
BEGIN
  UPDATE profile SET updated_at = datetime('now') WHERE id = NEW.id;
END;

-- About: Auto-update on change
CREATE TRIGGER trg_about_updated
AFTER UPDATE ON about
BEGIN
  UPDATE about SET updated_at = datetime('now') WHERE id = NEW.id;
END;

-- Projects: Auto-update on change
CREATE TRIGGER trg_projects_updated
AFTER UPDATE ON projects
BEGIN
  UPDATE projects SET updated_at = datetime('now') WHERE id = NEW.id;
END;

-- Resume: Auto-update on change
CREATE TRIGGER trg_resume_updated
AFTER UPDATE ON resume
BEGIN
  UPDATE resume SET updated_at = datetime('now') WHERE id = NEW.id;
END;

-- Homepage Content: Auto-update on change
CREATE TRIGGER trg_homepage_content_updated
AFTER UPDATE ON homepage_content
BEGIN
  UPDATE homepage_content SET updated_at = datetime('now') WHERE id = NEW.id;
END;

-- Site Settings: Auto-update on change
CREATE TRIGGER trg_site_settings_updated
AFTER UPDATE ON site_settings
BEGIN
  UPDATE site_settings SET updated_at = datetime('now') WHERE id = NEW.id;
END;

-- ============================================================================
-- VIEWS
-- Purpose: Common query patterns as virtual tables
-- ============================================================================

-- Visible projects (most common query)
CREATE VIEW v_visible_projects AS
SELECT * FROM projects
WHERE is_visible = 1
ORDER BY sort_order ASC;

-- Featured projects (homepage)
CREATE VIEW v_featured_projects AS
SELECT * FROM projects
WHERE is_featured = 1 AND is_visible = 1
ORDER BY sort_order ASC;

-- Unread messages (admin dashboard)
CREATE VIEW v_unread_messages AS
SELECT * FROM contact_messages
WHERE is_read = 0
ORDER BY created_at DESC;

-- Social links (public display)
CREATE VIEW v_social_links AS
SELECT * FROM social_links
WHERE is_visible = 1
ORDER BY sort_order ASC;

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================
