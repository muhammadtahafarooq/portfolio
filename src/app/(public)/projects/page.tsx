export const dynamic = 'force-dynamic'

import { getProjects } from '@/lib/db/queries'
import { ProjectsMotion } from '@/components/public/projects-motion'

export const metadata = {
  title: 'Projects',
  description: 'Projects by Muhammad Taha - Full-Stack + AI Developer',
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <main className="min-h-screen">
      <ProjectsMotion projects={projects} />
    </main>
  )
}
