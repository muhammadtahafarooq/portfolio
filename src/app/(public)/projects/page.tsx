export const dynamic = 'force-dynamic'

import Link from 'next/link'
import Image from 'next/image'
import { getProjects } from '@/lib/db/queries'
import { EmptyState } from '@/components/ui/states'

export const metadata = {
  title: 'Projects',
  description: 'Projects by Muhammad Taha - Full-Stack + AI Developer',
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="section-padding container-main">
        <p className="section-label">Portfolio</p>
        <h1 className="heading-h1 mb-6">Projects</h1>
        <p className="body-text-lg text-text-secondary max-w-2xl">
          A collection of projects I&apos;ve worked on, from full-stack applications to AI-powered
          tools and interactive experiences.
        </p>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-background-secondary">
        <div className="container-main">
          {projects.length === 0 ? (
            <EmptyState
              message="No projects yet. Check back soon!"
              action={{ label: 'Contact Me', href: '/contact' }}
            />
          ) : (
            <div className="space-y-12">
              {projects.map((project, index) => (
                <Link key={project.id} href={`/projects/${project.slug}`} className="block group">
                  <div className="grid-editorial items-center">
                    {/* Image */}
                    <div className={`md:col-span-8 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                      <div className="aspect-video bg-surface rounded-xl overflow-hidden border border-border">
                        {project.screenshotUrls ? (
                          <Image
                            src={JSON.parse(project.screenshotUrls)[0]}
                            alt={project.title}
                            width={800}
                            height={450}
                            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[600ms]"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-text-muted">
                            No screenshot
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Info */}
                    <div className={`md:col-span-4 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                      <p className="technical-text mb-2">
                        Project {String(index + 1).padStart(2, '0')}
                      </p>
                      <h2 className="heading-h4 mb-3 group-hover:text-primary transition-colors">
                        {project.title}
                      </h2>
                      <p className="body-text text-text-secondary text-sm mb-4">
                        {project.shortStatement}
                      </p>
                      {project.technologies && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {JSON.parse(project.technologies)
                            .slice(0, 4)
                            .map((tech: string) => (
                              <span
                                key={tech}
                                className="technical-text text-xs bg-surface border border-border px-2 py-1 rounded"
                              >
                                {tech}
                              </span>
                            ))}
                        </div>
                      )}
                      <div className="flex gap-4">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:text-primary-hover transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Live Demo &rarr;
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-text-secondary hover:text-text transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            GitHub &rarr;
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding container-main text-center">
        <h2 className="heading-h2 mb-4">Interested in My Work?</h2>
        <p className="body-text text-text-secondary max-w-xl mx-auto mb-8">
          Let&apos;s discuss how I can help with your next project.
        </p>
        <Link href="/contact" className="btn-primary">
          Get in Touch
        </Link>
      </section>
    </main>
  )
}
