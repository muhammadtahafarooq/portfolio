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
    <main className="min-h-screen">
      {/* Hero */}
      <section className="section-padding container-main">
        <Link
          href="/projects"
          className="technical-text text-text-muted hover:text-text transition-colors mb-8 inline-block"
        >
          &larr; Back to Projects
        </Link>

        <p className="section-label">Project</p>
        <h1 className="heading-h1 mb-4">{project.title}</h1>

        {project.shortStatement && (
          <p className="body-text-lg text-text-secondary max-w-2xl">{project.shortStatement}</p>
        )}

        {/* Links */}
        <div className="flex gap-4 mt-8">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Live Demo &rarr;
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              View Code &rarr;
            </a>
          )}
        </div>
      </section>

      {/* Main Screenshot */}
      {screenshots.length > 0 && (
        <section className="container-main mb-16">
          <div className="rounded-xl overflow-hidden border border-border">
            <Image
              src={screenshots[0]}
              alt={project.title}
              width={1200}
              height={680}
              className="w-full"
              priority
            />
          </div>
        </section>
      )}

      {/* Overview */}
      <section className="section-padding bg-background-secondary">
        <div className="container-main">
          <div className="grid-editorial">
            <div className="md:col-span-4">
              <p className="section-label">Overview</p>
              <h2 className="heading-h3">About</h2>
            </div>
            <div className="md:col-span-8">
              {project.description ? (
                <div className="body-text text-text-secondary whitespace-pre-wrap">
                  {project.description}
                </div>
              ) : (
                <p className="body-text text-text-muted">No description available.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      {technologies.length > 0 && (
        <section className="section-padding container-main">
          <p className="section-label">Tech Stack</p>
          <h2 className="heading-h3 mb-6">Technologies</h2>
          <div className="flex flex-wrap gap-3">
            {technologies.map((tech: string) => (
              <span
                key={tech}
                className="technical-text bg-surface border border-border px-4 py-2 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Additional Screenshots */}
      {screenshots.length > 1 && (
        <section className="section-padding bg-background-secondary">
          <div className="container-main">
            <p className="section-label">Gallery</p>
            <h2 className="heading-h3 mb-8">Screenshots</h2>
            <div className="space-y-4">
              {screenshots.slice(1).map((url: string, index: number) => (
                <div key={index} className="rounded-xl overflow-hidden border border-border">
                  <Image
                    src={url}
                    alt={`${project.title} screenshot ${index + 2}`}
                    width={1200}
                    height={680}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Case Study */}
      {(project.caseStudyProblem || project.caseStudySolution || project.caseStudyResult) && (
        <section className="section-padding container-main">
          <p className="section-label">Case Study</p>
          <h2 className="heading-h3 mb-12">Process</h2>

          <div className="space-y-12">
            {project.caseStudyProblem && (
              <div className="grid-editorial">
                <div className="md:col-span-4">
                  <h3 className="heading-h4 text-primary">Problem</h3>
                </div>
                <div className="md:col-span-8">
                  <p className="body-text text-text-secondary">{project.caseStudyProblem}</p>
                </div>
              </div>
            )}

            {project.caseStudySolution && (
              <div className="grid-editorial">
                <div className="md:col-span-4">
                  <h3 className="heading-h4 text-primary">Solution</h3>
                </div>
                <div className="md:col-span-8">
                  <p className="body-text text-text-secondary">{project.caseStudySolution}</p>
                </div>
              </div>
            )}

            {project.caseStudyResult && (
              <div className="grid-editorial">
                <div className="md:col-span-4">
                  <h3 className="heading-h4 text-primary">Result</h3>
                </div>
                <div className="md:col-span-8">
                  <p className="body-text text-text-secondary">{project.caseStudyResult}</p>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding container-main text-center">
        <h2 className="heading-h2 mb-4">Interested in This Project?</h2>
        <p className="body-text text-text-secondary max-w-xl mx-auto mb-8">
          Let&apos;s discuss how I can help with similar projects.
        </p>
        <Link href="/contact" className="btn-primary">
          Get in Touch
        </Link>
      </section>
    </main>
  )
}
