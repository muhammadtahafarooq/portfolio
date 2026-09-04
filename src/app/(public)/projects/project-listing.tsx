'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Reveal } from '@/components/motion'
import type { Project } from '@/types'

interface ProjectListingProps {
  projects: Project[]
}

function getBadge(isFeatured: boolean): string {
  return isFeatured ? 'PRODUCTION' : 'ARCHIVE'
}

function getProjectNumber(index: number): string {
  return `PRJ_${String(index + 1).padStart(2, '0')}`
}

export function ProjectListing({ projects }: ProjectListingProps) {
  return (
    <section className="section-padding container-main">
      <div className="space-y-24">
        {projects.map((project, index) => {
          const isImageLeft = index % 2 === 0
          const colImage = isImageLeft ? 'col-span-7' : 'col-span-5 md:col-start-8'
          const colInfo = isImageLeft ? 'col-span-5' : 'col-span-7'
          const imageOrder = isImageLeft ? 'order-1' : 'order-2'
          const infoOrder = isImageLeft ? 'order-2' : 'order-1'
          const badge = getBadge(project.isFeatured)
          const projectNum = getProjectNumber(index)
          const screenshotUrl = project.screenshotUrls
            ? JSON.parse(project.screenshotUrls)[0]
            : null

          return (
            <Reveal key={project.id} delay={index * 0.1}>
              <Link href={`/projects/${project.slug}`} className="block group">
                <div className="grid-12 items-center gap-gutter">
                  <div className={`${colImage} ${imageOrder}`}>
                    <div className="relative aspect-video bg-surface border border-border-base overflow-hidden">
                      {screenshotUrl ? (
                        <Image
                          src={screenshotUrl}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-cinematic group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 60vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-text-muted font-technical-sm">
                          No Screenshot
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={`${colInfo} ${infoOrder}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-technical-sm text-text-muted uppercase tracking-technical">
                        {projectNum}
                      </span>
                      <span className="font-technical-sm text-text-primary uppercase tracking-technical border border-border-base px-2 py-0.5">
                        {badge}
                      </span>
                    </div>

                    <h2 className="font-h3 text-text-primary mb-4 group-hover:text-primary transition-colors duration-normal">
                      {project.title}
                    </h2>

                    <p className="font-body-md text-text-secondary mb-6 max-w-lg leading-body">
                      {project.shortStatement || project.description}
                    </p>

                    {project.technologies && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {JSON.parse(project.technologies)
                          .slice(0, 5)
                          .map((tech: string) => (
                            <span key={tech} className="tech-tag">
                              {tech}
                            </span>
                          ))}
                      </div>
                    )}

                    <div className="flex gap-4">
                      <span className="font-technical-sm text-text-primary uppercase tracking-technical border-b border-text-primary pb-0.5 transition-colors group-hover:text-primary group-hover:border-primary">
                        View Project
                      </span>
                      {project.githubUrl && (
                        <span className="font-technical-sm text-text-muted uppercase tracking-technical border-b border-border-base pb-0.5 transition-colors group-hover:text-text-primary group-hover:border-text-primary">
                          GitHub
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
