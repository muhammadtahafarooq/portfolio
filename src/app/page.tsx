export const dynamic = 'force-dynamic'

import Link from 'next/link'
import Image from 'next/image'
import { getFeaturedProjects, getSkills, getTechnologies } from '@/lib/db/queries'

export default async function HomePage() {
  const [projects, skills, technologies] = await Promise.all([
    getFeaturedProjects(),
    getSkills(),
    getTechnologies(),
  ])

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Canvas Placeholder */}
        <div className="absolute inset-0 gradient-ambient opacity-50" />

        <div className="relative z-10 container-main text-center">
          <p className="technical-text mb-4">Full-Stack + AI Developer</p>
          <h1 className="heading-h1 mb-6">Muhammad Taha</h1>
          <p className="body-text text-text-secondary max-w-2xl mx-auto mb-8">
            Building innovative digital experiences with modern technologies. Specializing in React,
            Next.js, and AI-powered applications.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/projects" className="btn-primary">
              View Projects
            </Link>
            <Link href="/contact" className="btn-secondary">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {projects.length > 0 && (
        <section className="section-padding container-main">
          <p className="technical-text mb-2">Selected Work</p>
          <h2 className="heading-h2 mb-12">Featured Projects</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                <h3 className="heading-h4 mb-2">{project.title}</h3>
                <p className="body-text text-text-secondary text-sm">{project.shortStatement}</p>
                {project.technologies && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {JSON.parse(project.technologies)
                      .slice(0, 3)
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

          <div className="mt-8 text-center">
            <Link href="/projects" className="btn-secondary">
              View All Projects
            </Link>
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="section-padding bg-background-secondary">
          <div className="container-main">
            <p className="technical-text mb-2">Capabilities</p>
            <h2 className="heading-h2 mb-12">Skills & Expertise</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {skills.map((skill) => (
                <div key={skill.id} className="card">
                  <h3 className="font-medium mb-1">{skill.name}</h3>
                  {skill.category && <p className="technical-text text-xs">{skill.category}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Technologies */}
      {technologies.length > 0 && (
        <section className="section-padding container-main">
          <p className="technical-text mb-2">Tech Stack</p>
          <h2 className="heading-h2 mb-12">Technologies</h2>

          <div className="flex flex-wrap gap-4">
            {technologies.map((tech) => (
              <div
                key={tech.id}
                className="flex items-center gap-2 bg-surface border border-border rounded-full px-4 py-2"
              >
                {tech.iconUrl && (
                  <Image
                    src={tech.iconUrl}
                    alt={tech.name}
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                )}
                <span className="text-sm">{tech.name}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding container-main text-center">
        <h2 className="heading-h2 mb-4">Let&apos;s Build Something</h2>
        <p className="body-text text-text-secondary max-w-xl mx-auto mb-8">
          Have a project in mind or want to collaborate? I&apos;m always open to discussing new
          opportunities and interesting ideas.
        </p>
        <Link href="/contact" className="btn-primary">
          Start a Conversation
        </Link>
      </section>
    </main>
  )
}
