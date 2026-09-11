import { eq, asc } from 'drizzle-orm'
import { getDb, schema } from './index'

const dbAvailable = !!process.env.TURSO_DATABASE_URL

async function safeQuery<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  if (!dbAvailable) return fallback
  try {
    return await fn()
  } catch (err) {
    console.error('Database query failed:', err)
    return fallback
  }
}

export async function getProfile() {
  return safeQuery(async () => {
    const db = await getDb()
    const result = await db.select().from(schema.profile).limit(1)
    return result[0] || null
  }, null)
}

export async function getAbout() {
  return safeQuery(async () => {
    const db = await getDb()
    const result = await db.select().from(schema.about).limit(1)
    return result[0] || null
  }, null)
}

export async function getSkills() {
  return safeQuery(async () => {
    const db = await getDb()
    return db.select().from(schema.skills).orderBy(asc(schema.skills.sortOrder))
  }, [])
}

export async function getTechnologies() {
  return safeQuery(async () => {
    const db = await getDb()
    return db.select().from(schema.technologies).orderBy(asc(schema.technologies.sortOrder))
  }, [])
}

export async function getProjects() {
  return safeQuery(async () => {
    const db = await getDb()
    return db.select().from(schema.projects).orderBy(asc(schema.projects.sortOrder))
  }, [])
}

export async function getFeaturedProjects() {
  return safeQuery(async () => {
    const db = await getDb()
    return db
      .select()
      .from(schema.projects)
      .where(eq(schema.projects.isFeatured, true))
      .orderBy(asc(schema.projects.sortOrder))
  }, [])
}

export async function getProjectBySlug(slug: string) {
  return safeQuery(async () => {
    const db = await getDb()
    const result = await db
      .select()
      .from(schema.projects)
      .where(eq(schema.projects.slug, slug))
      .limit(1)
    return result[0] || null
  }, null)
}

export async function getExperience() {
  return safeQuery(async () => {
    const db = await getDb()
    return db.select().from(schema.experience).orderBy(asc(schema.experience.sortOrder))
  }, [])
}

export async function getEducation() {
  return safeQuery(async () => {
    const db = await getDb()
    return db.select().from(schema.education).orderBy(asc(schema.education.sortOrder))
  }, [])
}

export async function getCertifications() {
  return safeQuery(async () => {
    const db = await getDb()
    return db.select().from(schema.certifications).orderBy(asc(schema.certifications.sortOrder))
  }, [])
}

export async function getAchievements() {
  return safeQuery(async () => {
    const db = await getDb()
    return db.select().from(schema.achievements).orderBy(asc(schema.achievements.sortOrder))
  }, [])
}

export async function getResume() {
  return safeQuery(async () => {
    const db = await getDb()
    const result = await db.select().from(schema.resume).limit(1)
    return result[0] || null
  }, null)
}

export async function getSocialLinks() {
  return safeQuery(async () => {
    const db = await getDb()
    return db
      .select()
      .from(schema.socialLinks)
      .where(eq(schema.socialLinks.isVisible, true))
      .orderBy(asc(schema.socialLinks.sortOrder))
  }, [])
}

export async function getHomepageContent() {
  return safeQuery(async () => {
    const db = await getDb()
    const result = await db.select().from(schema.homepageContent).limit(1)
    return result[0] || null
  }, null)
}

export async function getSiteSettings() {
  return safeQuery(async () => {
    const db = await getDb()
    const result = await db.select().from(schema.siteSettings).limit(1)
    return result[0] || null
  }, null)
}

export async function getContactMessages() {
  return safeQuery(async () => {
    const db = await getDb()
    return db.select().from(schema.contactMessages)
  }, [])
}
