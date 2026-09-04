import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  Building2,
  Clock,
  Monitor,
  CheckCircle2,
  Layers,
} from 'lucide-react'
import { getProjectBySlug, getProjects } from '@/lib/db/queries'
import { Reveal } from '@/components/motion'

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug)
  if (!project) return { title: 'Project Not Found' }
  return {
    title: `${project.title} | Muhammad Taha`,
    description: project.shortStatement,
    openGraph: {
      title: project.title,
      description: project.shortStatement,
      images: project.screenshotUrls ? [JSON.parse(project.screenshotUrls)[0]] : [],
    },
  }
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug)
  if (!project) notFound()

  const projects = await getProjects()
  const currentIndex = projects.findIndex((p) => p.slug === project.slug)
  const nextProject = projects[(currentIndex + 1) % projects.length]

  const technologies = project.technologies ? JSON.parse(project.technologies) : []
  const screenshots = project.screenshotUrls ? JSON.parse(project.screenshotUrls) : []
  const projectYear = project.createdAt ? new Date(project.createdAt).getFullYear() : '2024'

  return (
    <main className="min-h-screen">
      <section className="section-padding container-main">
        <Reveal>
          <Link
            href="/projects"
            className="technical-text text-text-muted hover:text-text transition-colors mb-12 inline-flex items-center gap-2 group"
          >
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>
        </Reveal>

        <div className="grid-12">
          <div className="col-span-12 md:col-span-8">
            <Reveal>
              <h1 className="font-h1 text-text leading-[1.0] tracking-[-0.04em] mb-6">
                {project.title}
              </h1>
            </Reveal>
            {project.shortStatement && (
              <Reveal delay={0.1}>
                <p className="font-body-lg text-text-secondary max-w-2xl">
                  {project.shortStatement}
                </p>
              </Reveal>
            )}
          </div>
          <div className="col-span-12 md:col-span-4 mt-8 md:mt-0">
            <Reveal delay={0.2}>
              <div className="space-y-6">
                <div>
                  <p className="font-technical-sm text-text-muted uppercase tracking-[0.02em] mb-1">
                    Year
                  </p>
                  <p className="font-technical-md text-text-primary">{projectYear}</p>
                </div>
                <div>
                  <p className="font-technical-sm text-text-muted uppercase tracking-[0.02em] mb-1">
                    Role
                  </p>
                  <p className="font-technical-md text-text-primary">Full-Stack Developer</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {screenshots.length > 0 && (
        <section className="container-main">
          <Reveal>
            <div className="relative w-full aspect-[21/9] overflow-hidden">
              <Image
                src={screenshots[0]}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>
          </Reveal>
        </section>
      )}

      {technologies.length > 0 && (
        <section className="section-padding container-main">
          <Reveal>
            <div className="flex flex-wrap gap-3">
              {technologies.map((tech: string) => (
                <span key={tech} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      <div className="container-main">
        <div className="thin-divider" />
      </div>

      {project.description && (
        <section className="section-padding container-main">
          <div className="grid-12">
            <div className="col-span-12 md:col-span-7">
              <Reveal>
                <h3 className="font-h3 text-text leading-[1.2] tracking-[-0.01em] mb-8">
                  Architectural Foundations
                </h3>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="space-y-4">
                  {project.description.split('\n').map((paragraph, i) => (
                    <p key={i} className="font-body-md text-text-secondary leading-[1.6]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Reveal>
            </div>
            <div className="col-span-12 md:col-span-5 mt-12 md:mt-0">
              <Reveal delay={0.2}>
                <div className="space-y-8 md:pl-12">
                  <div className="flex items-start gap-4">
                    <Building2 className="w-5 h-5 text-text-muted mt-0.5 shrink-0" />
                    <div>
                      <p className="font-technical-sm text-text-muted uppercase tracking-[0.02em] mb-1">
                        Client
                      </p>
                      <p className="font-technical-md text-text-primary">Personal Project</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="w-5 h-5 text-text-muted mt-0.5 shrink-0" />
                    <div>
                      <p className="font-technical-sm text-text-muted uppercase tracking-[0.02em] mb-1">
                        Timeline
                      </p>
                      <p className="font-technical-md text-text-primary">{projectYear}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Monitor className="w-5 h-5 text-text-muted mt-0.5 shrink-0" />
                    <div>
                      <p className="font-technical-sm text-text-muted uppercase tracking-[0.02em] mb-1">
                        Platform
                      </p>
                      <p className="font-technical-md text-text-primary">Web Application</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-5 h-5 text-text-muted mt-0.5 shrink-0" />
                    <div>
                      <p className="font-technical-sm text-text-muted uppercase tracking-[0.02em] mb-1">
                        Status
                      </p>
                      <p className="font-technical-md text-text-primary">Completed</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {screenshots.length > 1 && (
        <section className="section-padding bg-surface">
          <div className="container-main">
            <Reveal>
              <h3 className="font-h3 text-text leading-[1.2] tracking-[-0.01em] mb-12">
                Visual Showcase
              </h3>
            </Reveal>
            <div className="grid-12">
              <div className="col-span-12 md:col-span-7">
                <Reveal delay={0.1}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={screenshots[1]}
                      alt={`${project.title} showcase 1`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="font-technical-sm text-text-muted mt-4 uppercase tracking-[0.02em]">
                    Primary Interface
                  </p>
                </Reveal>
              </div>
              <div className="col-span-12 md:col-span-5 mt-8 md:mt-0">
                <Reveal delay={0.2}>
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={screenshots[2] || screenshots[0]}
                      alt={`${project.title} showcase 2`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="font-technical-sm text-text-muted mt-4 uppercase tracking-[0.02em]">
                    Detail View
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="container-main">
        <div className="thin-divider" />
      </div>

      {technologies.length > 0 && (
        <section className="section-padding container-main">
          <div className="grid-12">
            <div className="col-span-12 md:col-span-4">
              <Reveal>
                <p className="font-technical-sm text-text-muted uppercase tracking-[0.02em] mb-4">
                  Core Technologies
                </p>
              </Reveal>
            </div>
            <div className="col-span-12 md:col-span-8">
              <Reveal delay={0.1}>
                <div className="flex flex-wrap gap-3">
                  {technologies.map((tech: string) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      <div className="container-main">
        <div className="thin-divider" />
      </div>

      {project.caseStudyProblem && (
        <section className="section-padding container-main">
          <div className="grid-12">
            <div className="col-span-12 md:col-span-8">
              <Reveal>
                <h2 className="font-h2 text-text leading-[1.1] tracking-[-0.02em] mb-8">
                  The Complexity of Context
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="font-body-lg text-text-secondary leading-[1.6]">
                  {project.caseStudyProblem}
                </p>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {project.caseStudySolution && (
        <section className="section-padding bg-surface border border-border-base">
          <div className="container-main">
            <div className="grid-12">
              <div className="col-span-12 md:col-span-7">
                <Reveal>
                  <h3 className="font-h3 text-text leading-[1.2] tracking-[-0.01em] mb-8">
                    Implementation
                  </h3>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="font-body-md text-text-secondary leading-[1.6] mb-8">
                    {project.caseStudySolution}
                  </p>
                </Reveal>
                {technologies.length > 0 && (
                  <Reveal delay={0.2}>
                    <div className="space-y-3">
                      {technologies.map((tech: string) => (
                        <div key={tech} className="flex items-center gap-3">
                          <Layers className="w-4 h-4 text-primary" />
                          <span className="font-technical-md text-text-primary">{tech}</span>
                        </div>
                      ))}
                    </div>
                  </Reveal>
                )}
              </div>
              <div className="col-span-12 md:col-span-5 mt-12 md:mt-0">
                <Reveal delay={0.3}>
                  {screenshots.length > 0 && (
                    <div className="relative aspect-square overflow-hidden border border-border-base">
                      <Image
                        src={screenshots[0]}
                        alt={`${project.title} architecture`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      )}

      {project.caseStudyResult && (
        <section className="section-padding container-main text-center">
          <Reveal>
            <div className="inline-flex items-center justify-center w-16 h-16 border border-border-base mb-8">
              <Layers className="w-8 h-8 text-primary" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-h3 text-text leading-[1.2] tracking-[-0.01em] max-w-3xl mx-auto mb-12">
              {project.caseStudyResult}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex items-center justify-center gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  View Live
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  Review Source
                  <Github className="w-4 h-4" />
                </a>
              )}
            </div>
          </Reveal>
        </section>
      )}

      <div className="container-main">
        <div className="thin-divider" />
      </div>

      {nextProject && (
        <section className="section-padding container-main">
          <Reveal>
            <p className="font-technical-sm text-text-muted uppercase tracking-[0.02em] mb-8">
              Next Project
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Link href={`/projects/${nextProject.slug}`} className="block group">
              <div className="relative w-full aspect-[21/9] overflow-hidden">
                {nextProject.screenshotUrls ? (
                  <Image
                    src={JSON.parse(nextProject.screenshotUrls)[0]}
                    alt={nextProject.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-surface" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <h3 className="font-h3 text-text leading-[1.2] tracking-[-0.01em] group-hover:text-primary transition-colors">
                    {nextProject.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-4 text-text-muted group-hover:text-text transition-colors">
                    <span className="font-technical-sm uppercase tracking-[0.02em]">
                      View Project
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>
        </section>
      )}

      <section className="section-padding container-main text-center border-t border-border-base">
        <Reveal>
          <h2 className="font-h2 text-text leading-[1.1] tracking-[-0.02em] mb-8">
            Initiate Dialogue
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
            Contact Studio
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Reveal>
      </section>
    </main>
  )
}
