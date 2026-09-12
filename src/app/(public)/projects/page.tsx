export const revalidate = 3600

import { getProjects } from '@/lib/db/queries'
import { ProjectsHero } from './projects-hero'
import { ProjectListing } from './project-listing'
import { PublicAccess } from './public-access'
import { ContactCTA } from './contact-cta'
import { SpaceBackground } from '@/components/public/space-background'

export const metadata = {
  title: 'Projects',
  description:
    'Selected projects by Muhammad Taha — CS Student | Aspiring Full-Stack Developer building practical projects.',
  alternates: {
    canonical: '/projects',
  },
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <main className="min-h-screen">
      <SpaceBackground />
      <ProjectsHero />
      <ProjectListing projects={projects} />
      <PublicAccess />
      <ContactCTA />
    </main>
  )
}
