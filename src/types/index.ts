// ============================================================================
// Muhammad Taha Portfolio — Shared TypeScript Types
// ============================================================================

// Database types (inferred from schema)
export type {
  Profile,
  About,
  Skill,
  Technology,
  Project,
  Experience,
  Education,
  Certification,
  Achievement,
  Resume,
  ContactMessage,
  HomepageContent,
  SiteSettings,
  AdminUser,
} from '@/lib/db/schema'

// Re-export SocialLink with different name to avoid conflict
export type { SocialLink as SocialLinkRecord } from '@/lib/db/schema'

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    total: number
    page: number
    limit: number
  }
}

// Form types
export interface ContactFormData {
  name: string
  email: string
  subject?: string
  message: string
}

export interface ProjectFormData {
  title: string
  slug: string
  description?: string
  shortStatement?: string
  technologies?: string
  liveUrl?: string
  githubUrl?: string
  demoUrl?: string
  screenshotUrls?: string
  caseStudyProblem?: string
  caseStudySolution?: string
  caseStudyResult?: string
  isFeatured?: boolean
  isVisible?: boolean
  sortOrder?: number
}

// Component props
export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

export interface SocialLinkItem {
  platform: string
  url: string
  isVisible: boolean
}

// 3D Capability levels
export type CapabilityLevel = 'A' | 'B' | 'C'

// Animation intensity
export type AnimationIntensity = 'reduced' | 'standard' | 'enhanced'
