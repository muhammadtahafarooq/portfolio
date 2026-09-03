export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import { getProjects } from '@/lib/db/queries'
import { ProjectDetailMotion } from '@/components/public/project-detail-motion'

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const projects = await getProjects()
  const project = projects.find((p) => p.slug === params.slug)

  if (!project) {
    return { title: 'Project Not Found' }
  }

  return {
    title: project.title,
    description: project.shortStatement,
    openGraph: {
      title: project.title,
      description: project.shortStatement,
      images: project.screenshotUrls ? [JSON.parse(project.screenshotUrls)[0]] : [],
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const projects = await getProjects()
  const project = projects.find((p) => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  const technologies = project.technologies ? JSON.parse(project.technologies) : []
  const screenshots = project.screenshotUrls ? JSON.parse(project.screenshotUrls) : []

  return (
    <main className="min-h-screen">
      <ProjectDetailMotion
        project={project}
        technologies={technologies}
        screenshots={screenshots}
      />
    </main>
  )
}
