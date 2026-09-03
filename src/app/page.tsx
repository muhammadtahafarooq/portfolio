export const dynamic = 'force-dynamic'

import Link from 'next/link'
import Image from 'next/image'
import {
  getFeaturedProjects,
  getSkills,
  getTechnologies,
  getExperience,
  getEducation,
} from '@/lib/db/queries'
import { Hero3DFallback } from '@/components/3d/hero-fallback'
import { EmptyState } from '@/components/ui/states'

export default async function HomePage() {
  const [projects, skills, technologies, experience, education] = await Promise.all([
    getFeaturedProjects(),
    getSkills(),
    getTechnologies(),
    getExperience(),
    getEducation(),
  ])

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* 3D/Background */}
        <Hero3DFallback />
        <div className="absolute inset-0 gradient-ambient opacity-50" />

        <div className="relative z-10 container-main text-center">
          <p className="section-label text-center">Full-Stack + AI Developer</p>
          <h1 className="heading-h1 mb-6 text-center">Muhammad Taha</h1>
          <p className="body-text-lg text-text-secondary max-w-2xl mx-auto mb-8 text-center">
            Building innovative digital experiences with modern technologies. Specializing in React,
            Next.js, and AI-powered applications.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Get in Touch
            </Link>
            <Link href="/projects" className="btn-secondary">
              View Projects
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section-padding container-main">
        <div className="grid-editorial">
          <div className="md:col-span-5">
            <p className="section-label">Introduction</p>
            <h2 className="heading-h3 mb-6">About Me</h2>
          </div>
          <div className="md:col-span-7">
            <p className="body-text-lg text-text-secondary">
              I&apos;m a developer focused on creating sophisticated digital experiences that
              combine clean code with thoughtful design. My work spans full-stack development, AI
              integration, and interactive 3D experiences.
            </p>
            <Link
              href="/about"
              className="inline-block mt-6 text-primary hover:text-primary-hover transition-colors text-sm font-medium"
            >
              Learn more about me &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Preview */}
      {skills.length > 0 && (
        <section className="section-padding bg-background-secondary">
          <div className="container-main">
            <p className="section-label">Capabilities</p>
            <h2 className="heading-h2 mb-12">Skills & Expertise</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {skills.slice(0, 8).map((skill) => (
                <div key={skill.id} className="bg-surface border border-border rounded-lg p-4">
                  <h3 className="font-medium text-text text-sm">{skill.name}</h3>
                  {skill.category && (
                    <p className="technical-text text-xs mt-1">{skill.category}</p>
                  )}
                </div>
              ))}
            </div>

            {skills.length > 8 && (
              <div className="mt-8 text-center">
                <Link
                  href="/about#skills"
                  className="text-primary hover:text-primary-hover transition-colors text-sm font-medium"
                >
                  View all skills &rarr;
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Featured Projects */}
      {projects.length > 0 && (
        <section className="section-padding container-main">
          <p className="section-label">Selected Work</p>
          <h2 className="heading-h2 mb-12">Featured Projects</h2>

          <div className="space-y-8">
            {projects.map((project, index) => (
              <Link key={project.id} href={`/projects/${project.slug}`} className="block group">
                <div className="grid-editorial items-center">
                  {/* Image */}
                  <div className={`md:col-span-7 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                    <div className="aspect-video bg-background-secondary rounded-xl overflow-hidden border border-border">
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
                  <div className={`md:col-span-5 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                    <p className="technical-text mb-2">
                      Project {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 className="heading-h4 mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="body-text text-text-secondary text-sm mb-4">
                      {project.shortStatement}
                    </p>
                    {project.technologies && (
                      <div className="flex flex-wrap gap-2">
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
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/projects" className="btn-secondary">
              View All Projects
            </Link>
          </div>
        </section>
      )}

      {/* Technologies */}
      {technologies.length > 0 && (
        <section className="section-padding bg-background-secondary">
          <div className="container-main">
            <p className="section-label">Tech Stack</p>
            <h2 className="heading-h2 mb-12">Technologies</h2>

            <div className="flex flex-wrap gap-3">
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
                  <span className="text-sm text-text">{tech.name}</span>
                </div>
              ))}
            </div>
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
