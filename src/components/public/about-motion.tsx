'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { About, Skill, Technology } from '@/types'
import { Reveal, Stagger, StaggerItem, MagneticButton } from '@/components/motion'
import { EmptyState } from '@/components/ui/states'

interface AboutMotionProps {
  about: About | null
  skills: Skill[]
  technologies: Technology[]
}

export function AboutMotion({ about, skills, technologies }: AboutMotionProps) {
  return (
    <>
      {/* Hero */}
      <section className="section-padding container-main">
        <Reveal>
          <p className="section-label">About</p>
          <h1 className="heading-h1 mb-6">Muhammad Taha</h1>
          <p className="body-text-lg text-text-secondary max-w-2xl">
            Full-Stack + AI Developer crafting innovative digital experiences at the intersection of
            design and technology.
          </p>
        </Reveal>
      </section>

      {/* Profile */}
      <section className="section-padding bg-background-secondary">
        <div className="container-main">
          <div className="grid-editorial">
            <Reveal className="md:col-span-4" delay={0.1}>
              <p className="section-label">Profile</p>
              <h2 className="heading-h3">Background</h2>
            </Reveal>
            <Reveal className="md:col-span-8" delay={0.2}>
              {about?.biography ? (
                <div className="body-text text-text-secondary whitespace-pre-wrap">
                  {about.biography}
                </div>
              ) : (
                <EmptyState message="About content coming soon." />
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Skills */}
      {skills.length > 0 && (
        <section className="section-padding container-main" id="skills">
          <Reveal>
            <p className="section-label">Technical Skills</p>
            <h2 className="heading-h2 mb-12">Skills & Expertise</h2>
          </Reveal>

          <Stagger className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" stagger={0.05}>
            {skills.map((skill) => (
              <StaggerItem key={skill.id}>
                <motion.div
                  className="bg-surface border border-border rounded-lg p-4"
                  whileHover={{ y: -2, borderColor: 'rgba(139, 92, 246, 0.3)' }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="font-medium text-text">{skill.name}</h3>
                  {skill.category && (
                    <p className="technical-text text-xs mt-1">{skill.category}</p>
                  )}
                  {skill.description && (
                    <p className="text-sm text-text-secondary mt-2">{skill.description}</p>
                  )}
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
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
                    className="bg-surface border border-border rounded-full px-4 py-2"
                    whileHover={{ scale: 1.05, borderColor: 'rgba(139, 92, 246, 0.3)' }}
                    transition={{ duration: 0.2 }}
                  >
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
          <h2 className="heading-h2 mb-4">Let&apos;s Work Together</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="body-text text-text-secondary max-w-xl mx-auto mb-8">
            Interested in collaborating or have a project in mind?
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="flex gap-4 justify-center">
            <MagneticButton as="a" href="/contact" className="btn-primary">
              Get in Touch
            </MagneticButton>
            <MagneticButton as="a" href="/projects" className="btn-secondary">
              View Projects
            </MagneticButton>
          </div>
        </Reveal>
      </section>
    </>
  )
}
