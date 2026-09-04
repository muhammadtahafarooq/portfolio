export const dynamic = 'force-dynamic'

import { getProjects } from '@/lib/db/queries'
import { ProjectsHero } from './projects-hero'
import { ProjectListing } from './project-listing'
import { PublicAccess } from './public-access'
import { ContactCTA } from './contact-cta'

export const metadata = {
  title: 'Projects | Muhammad Taha',
  description:
    'Selected projects by Muhammad Taha — Full-Stack + AI Developer crafting innovative digital experiences.',
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <main className="min-h-screen">
      <ProjectsHero />
      <ProjectListing projects={projects} />
      <PublicAccess />
      <ContactCTA />
    </main>
  )
}
