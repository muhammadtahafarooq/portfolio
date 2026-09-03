export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getProjects } from '@/lib/db/queries'

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
    <main className="min-h-screen section-padding container-main">
      <Link
        href="/projects"
        className="technical-text text-text-muted hover:text-text transition-colors mb-8 inline-block"
      >
        ← Back to Projects
      </Link>

      <article className="max-w-4xl">
        <p className="technical-text mb-2">Project</p>
        <h1 className="heading-h1 mb-4">{project.title}</h1>

        {project.shortStatement && (
          <p className="body-text-lg text-text-secondary mb-8">{project.shortStatement}</p>
        )}

        {/* Links */}
        <div className="flex gap-4 mb-12">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Live Demo →
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              View Code →
            </a>
          )}
        </div>

        {/* Screenshots */}
        {screenshots.length > 0 && (
          <div className="space-y-4 mb-12">
            {screenshots.map((url: string, index: number) => (
              <div key={index} className="rounded-card overflow-hidden">
                <Image
                  src={url}
                  alt={`${project.title} screenshot ${index + 1}`}
                  width={1200}
                  height={680}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        )}

        {/* Technologies */}
        {technologies.length > 0 && (
          <div className="mb-12">
            <h2 className="heading-h4 mb-4">Technologies</h2>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech: string) => (
                <span
                  key={tech}
                  className="technical-text bg-surface border border-border px-3 py-1.5 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        {project.description && (
          <div className="mb-12">
            <h2 className="heading-h4 mb-4">About</h2>
            <div className="body-text text-text-secondary whitespace-pre-wrap">
              {project.description}
            </div>
          </div>
        )}

        {/* Case Study */}
        {(project.caseStudyProblem || project.caseStudySolution || project.caseStudyResult) && (
          <div className="space-y-8">
            <h2 className="heading-h4">Case Study</h2>

            {project.caseStudyProblem && (
              <div>
                <h3 className="technical-text text-primary mb-2">Problem</h3>
                <p className="body-text text-text-secondary">{project.caseStudyProblem}</p>
              </div>
            )}

            {project.caseStudySolution && (
              <div>
                <h3 className="technical-text text-primary mb-2">Solution</h3>
                <p className="body-text text-text-secondary">{project.caseStudySolution}</p>
              </div>
            )}

            {project.caseStudyResult && (
              <div>
                <h3 className="technical-text text-primary mb-2">Result</h3>
                <p className="body-text text-text-secondary">{project.caseStudyResult}</p>
              </div>
            )}
          </div>
        )}
      </article>
    </main>
  )
}
