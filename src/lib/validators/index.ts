import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  subject: z.string().max(200).optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format'),
  description: z.string().optional(),
  shortStatement: z.string().optional(),
  technologies: z.string().optional(),
  liveUrl: z.string().url().optional().or(z.literal('')),
  githubUrl: z.string().url().optional().or(z.literal('')),
  demoUrl: z.string().url().optional().or(z.literal('')),
  screenshotUrls: z.string().optional(),
  caseStudyProblem: z.string().optional(),
  caseStudySolution: z.string().optional(),
  caseStudyResult: z.string().optional(),
  isFeatured: z.boolean().default(false),
  isVisible: z.boolean().default(true),
  sortOrder: z.number().default(0),
})

export const skillSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.string().optional(),
  description: z.string().optional(),
  sortOrder: z.number().default(0),
})

export const experienceSchema = z.object({
  role: z.string().min(1, 'Role is required'),
  organization: z.string().optional(),
  description: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  isCurrent: z.boolean().default(false),
  sortOrder: z.number().default(0),
})

export const educationSchema = z.object({
  institution: z.string().min(1, 'Institution is required'),
  qualification: z.string().optional(),
  program: z.string().optional(),
  description: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  sortOrder: z.number().default(0),
})

export const certificationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  issuer: z.string().optional(),
  date: z.string().optional(),
  description: z.string().optional(),
  sortOrder: z.number().default(0),
})

export const achievementSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  date: z.string().optional(),
  sortOrder: z.number().default(0),
})

export const profileSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  shortBio: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
  location: z.string().optional(),
  avatarUrl: z.string().optional(),
})

export const aboutSchema = z.object({
  biography: z.string().min(1),
  profileContent: z.string().optional(),
  interests: z.string().optional(),
})

export const socialLinkSchema = z.object({
  platform: z.string().min(1),
  url: z.string().url('Invalid URL'),
  isVisible: z.boolean().default(true),
  sortOrder: z.number().default(0),
})

export const technologySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  iconUrl: z.string().url().optional().or(z.literal('')),
  category: z.string().optional(),
  sortOrder: z.number().default(0),
})

export const homepageContentSchema = z.object({
  heroIntroduction: z.string().optional(),
  featuredProjectIds: z.string().optional(),
  contactStatement: z.string().optional(),
})

export const siteSettingsSchema = z.object({
  siteTitle: z.string().optional(),
  siteDescription: z.string().optional(),
  analyticsEnabled: z.boolean().default(false),
  animationIntensity: z.enum(['reduced', 'standard', 'enhanced']).default('standard'),
  threeDEnabled: z.boolean().default(true),
})

export const resumeSchema = z.object({
  content: z.string().optional(),
  pdfUrl: z.string().url().optional().or(z.literal('')).nullable(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
export type LoginData = z.infer<typeof loginSchema>
export type ProjectData = z.infer<typeof projectSchema>
export type SkillData = z.infer<typeof skillSchema>
export type ExperienceData = z.infer<typeof experienceSchema>
export type EducationData = z.infer<typeof educationSchema>
export type CertificationData = z.infer<typeof certificationSchema>
export type AchievementData = z.infer<typeof achievementSchema>
export type ProfileData = z.infer<typeof profileSchema>
export type AboutData = z.infer<typeof aboutSchema>
export type SocialLinkData = z.infer<typeof socialLinkSchema>
export type TechnologyData = z.infer<typeof technologySchema>
export type HomepageContentData = z.infer<typeof homepageContentSchema>
export type SiteSettingsData = z.infer<typeof siteSettingsSchema>
export type ResumeData = z.infer<typeof resumeSchema>
