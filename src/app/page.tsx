export const dynamic = 'force-dynamic'

import {
  getFeaturedProjects,
  getSkills,
  getTechnologies,
  getExperience,
  getEducation,
} from '@/lib/db/queries'
import { Hero3DFallback } from '@/components/3d/hero-fallback'
import { HomeMotion } from '@/components/public/home-motion'

export default async function HomePage() {
  const [projects, skills, technologies, experience, education] = await Promise.all([
    getFeaturedProjects(),
    getSkills(),
    getTechnologies(),
    getExperience(),
    getEducation(),
  ])

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* 3D/Background */}
        <Hero3DFallback />
        <div className="absolute inset-0 gradient-ambient opacity-50" />
      </section>

      <HomeMotion projects={projects} skills={skills} technologies={technologies} />
    </main>
  )
}
