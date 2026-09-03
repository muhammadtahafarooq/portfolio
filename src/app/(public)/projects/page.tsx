export const dynamic = 'force-dynamic'

import Link from 'next/link'
import Image from 'next/image'
import { getProjects } from '@/lib/db/queries'

export const metadata = {
  title: 'Projects',
  description: 'Featured projects by Muhammad Taha - Full-Stack + AI Developer',
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <main className="min-h-screen section-padding container-main">
      <p className="technical-text mb-2">Portfolio</p>
      <h1 className="heading-h1 mb-6">Projects</h1>
      <p className="body-text text-text-secondary max-w-2xl mb-12">
        A collection of projects I&apos;ve worked on, from full-stack applications to AI-powered
        tools.
      </p>

      {projects.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-text-muted">No projects yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="card card-hover group"
            >
              <div className="aspect-video bg-background-secondary rounded-lg mb-4 overflow-hidden">
                {project.screenshotUrls && (
                  <Image
                    src={JSON.parse(project.screenshotUrls)[0]}
                    alt={project.title}
                    width={600}
                    height={340}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-slow"
                  />
                )}
              </div>
              <h2 className="heading-h4 mb-2">{project.title}</h2>
              <p className="body-text text-text-secondary text-sm line-clamp-2">
                {project.shortStatement}
              </p>
              {project.technologies && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {JSON.parse(project.technologies)
                    .slice(0, 4)
                    .map((tech: string) => (
                      <span
                        key={tech}
                        className="technical-text text-xs bg-background-secondary px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
