'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Project, Skill, Technology } from '@/types'
import { Reveal, Stagger, StaggerItem, MagneticButton, ParallaxImage } from '@/components/motion'

interface HomeMotionProps {
  projects: Project[]
  skills: Skill[]
  technologies: Technology[]
}

export function HomeMotion({ projects, skills, technologies }: HomeMotionProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="relative z-10 container-main text-center">
          <Reveal delay={0.1}>
            <p className="section-label text-center">CS Student | Aspiring Full-Stack Developer</p>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="heading-h1 mb-6 text-center">Muhammad Taha</h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="body-text-lg text-text-secondary max-w-2xl mx-auto mb-8 text-center">
              Building innovative digital experiences with modern technologies. Specializing in
              React, Next.js, and AI-powered applications.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="flex gap-4 justify-center">
              <MagneticButton as="a" href="/contact" className="btn-primary">
                Get in Touch
              </MagneticButton>
              <MagneticButton as="a" href="/projects" className="btn-secondary">
                View Projects
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* About Preview */}
      <section className="section-padding container-main">
        <div className="grid-editorial">
          <Reveal className="md:col-span-5" delay={0.1}>
            <p className="section-label">Introduction</p>
            <h2 className="heading-h3 mb-6">About Me</h2>
          </Reveal>
          <Reveal className="md:col-span-7" delay={0.2}>
            <p className="body-text-lg text-text-secondary">
              I&apos;m a developer focused on creating sophisticated digital experiences that
              combine clean code with thoughtful design. My work spans full-stack development, AI
              integration, and interactive 3D experiences.
            </p>
            <Link
              href="/about"
              className="inline-block mt-6 text-primary hover:text-primary-hover transition-colors text-sm font-medium group"
            >
              Learn more about me{' '}
              <span className="inline-block group-hover:translate-x-1 transition-transform">
                &rarr;
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Skills Preview */}
      {skills.length > 0 && (
        <section className="section-padding bg-background-secondary">
          <div className="container-main">
            <Reveal>
              <p className="section-label">Capabilities</p>
              <h2 className="heading-h2 mb-12">Skills & Expertise</h2>
            </Reveal>

            <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-4" stagger={0.05}>
              {skills.slice(0, 8).map((skill) => (
                <StaggerItem key={skill.id}>
                  <motion.div
                    className="bg-surface border border-border rounded-lg p-4"
                    whileHover={{ y: -2, borderColor: 'rgba(139, 92, 246, 0.3)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="font-medium text-text text-sm">{skill.name}</h3>
                    {skill.category && (
                      <p className="technical-text text-xs mt-1">{skill.category}</p>
                    )}
                  </motion.div>
                </StaggerItem>
              ))}
            </Stagger>

            {skills.length > 8 && (
              <Reveal>
                <div className="mt-8 text-center">
                  <Link
                    href="/about#skills"
                    className="text-primary hover:text-primary-hover transition-colors text-sm font-medium group"
                  >
                    View all skills{' '}
                    <span className="inline-block group-hover:translate-x-1 transition-transform">
                      &rarr;
                    </span>
                  </Link>
                </div>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* Featured Projects */}
      {projects.length > 0 && (
        <section className="section-padding container-main">
          <Reveal>
            <p className="section-label">Selected Work</p>
            <h2 className="heading-h2 mb-12">Featured Projects</h2>
          </Reveal>

          <div className="space-y-8">
            {projects.map((project, index) => (
              <Reveal key={project.id} delay={index * 0.1}>
                <Link href={`/projects/${project.slug}`} className="block group">
                  <div className="grid-editorial items-center">
                    {/* Image */}
                    <div className={`md:col-span-7 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                      <div className="aspect-video bg-background-secondary rounded-xl overflow-hidden border border-border">
                        {project.screenshotUrls ? (
                          <ParallaxImage
                            src={JSON.parse(project.screenshotUrls)[0]}
                            alt={project.title}
                            className="w-full h-full"
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
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-12 text-center">
              <MagneticButton as="a" href="/projects" className="btn-secondary">
                View All Projects
              </MagneticButton>
            </div>
          </Reveal>
        </section>
      )}

      {/* Technologies */}
      {technologies.length > 0 && (
        <section className="section-padding bg-background-secondary">
          <div className="container-main">
            <Reveal>
              <p className="section-label">Tech Stack</p>
              <h2 className="heading-h2 mb-12">Technologies</h2>
            </Reveal>

            <Stagger className="flex flex-wrap gap-3" stagger={0.03}>
              {technologies.map((tech) => (
                <StaggerItem key={tech.id}>
                  <motion.div
                    className="flex items-center gap-2 bg-surface border border-border rounded-full px-4 py-2"
                    whileHover={{ scale: 1.05, borderColor: 'rgba(139, 92, 246, 0.3)' }}
                    transition={{ duration: 0.2 }}
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
                  </motion.div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding container-main text-center">
        <Reveal>
          <h2 className="heading-h2 mb-4">Let&apos;s Build Something</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="body-text text-text-secondary max-w-xl mx-auto mb-8">
            Have a project in mind or want to collaborate? I&apos;m always open to discussing new
            opportunities and interesting ideas.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <MagneticButton as="a" href="/contact" className="btn-primary">
            Start a Conversation
          </MagneticButton>
        </Reveal>
      </section>
    </>
  )
}
