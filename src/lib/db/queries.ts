import { eq, asc } from 'drizzle-orm'
import { db, schema } from './index'

export async function getProfile() {
  const result = await db.select().from(schema.profile).limit(1)
  return result[0] || null
}

export async function getAbout() {
  const result = await db.select().from(schema.about).limit(1)
  return result[0] || null
}

export async function getSkills() {
  return db.select().from(schema.skills).orderBy(asc(schema.skills.sortOrder))
}

export async function getTechnologies() {
  return db.select().from(schema.technologies).orderBy(asc(schema.technologies.sortOrder))
}

export async function getProjects() {
  return db.select().from(schema.projects).orderBy(asc(schema.projects.sortOrder))
}

export async function getFeaturedProjects() {
  return db
    .select()
    .from(schema.projects)
    .where(eq(schema.projects.isFeatured, true))
    .orderBy(asc(schema.projects.sortOrder))
}

export async function getProjectBySlug(slug: string) {
  const result = await db
    .select()
    .from(schema.projects)
    .where(eq(schema.projects.slug, slug))
    .limit(1)
  return result[0] || null
}

export async function getExperience() {
  return db.select().from(schema.experience).orderBy(asc(schema.experience.sortOrder))
}

export async function getEducation() {
  return db.select().from(schema.education).orderBy(asc(schema.education.sortOrder))
}

export async function getCertifications() {
  return db.select().from(schema.certifications).orderBy(asc(schema.certifications.sortOrder))
}

export async function getAchievements() {
  return db.select().from(schema.achievements).orderBy(asc(schema.achievements.sortOrder))
}

export async function getResume() {
  const result = await db.select().from(schema.resume).limit(1)
  return result[0] || null
}

export async function getSocialLinks() {
  return db
    .select()
    .from(schema.socialLinks)
    .where(eq(schema.socialLinks.isVisible, true))
    .orderBy(asc(schema.socialLinks.sortOrder))
}

export async function getHomepageContent() {
  const result = await db.select().from(schema.homepageContent).limit(1)
  return result[0] || null
}

export async function getSiteSettings() {
  const result = await db.select().from(schema.siteSettings).limit(1)
  return result[0] || null
}

export async function getContactMessages() {
  return db.select().from(schema.contactMessages)
}
