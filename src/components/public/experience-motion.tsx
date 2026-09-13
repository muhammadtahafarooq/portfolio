'use client'

import type { Experience } from '@/types'
import { Reveal, Stagger, StaggerItem, MagneticButton } from '@/components/motion'

interface ExperienceMotionProps {
  experience: Experience[]
}

const journeyPhases = [
  { year: '2024', label: 'START', accent: 'CS Student @ NUML' },
  { year: '2025', label: 'BUILD', accent: 'Web Development & Projects' },
  { year: '2026', label: 'CREATE', accent: 'Portfolio · 3D · Motion' },
  { year: 'NOW', label: 'EVOLVE', accent: 'Growing as a Developer' },
]

function getPhaseForExperience(exp: Experience, index: number) {
  const year = exp.startDate || ''
  if (year === '2024' || index === 0) return 0
  if (year === '2025' && index <= 2) return 1
  if (year === '2025' || year === '2026') return 2
  return 3
}

function getTags(exp: Experience): string[] {
  const tags: string[] = []
  const role = (exp.role || '').toLowerCase()

  if (role.includes('student') || role.includes('cs')) {
    tags.push('Computer Science', 'Web Development', 'Databases', 'Software Engineering')
  } else if (role.includes('web developer') || role.includes('independent')) {
    tags.push('HTML', 'CSS', 'JavaScript', 'PHP', 'Laravel', 'MySQL')
  } else if (role.includes('booknest') || role.includes('bookstore')) {
    tags.push('Design', 'Frontend', 'Development')
  } else if (role.includes('aurora') || role.includes('e-commerce')) {
    tags.push('Design', 'Frontend', 'Development')
  } else if (role.includes('student management')) {
    tags.push('Database Design', 'CRUD Operations', 'Application Development')
  } else if (role.includes('portfolio')) {
    tags.push('Web Development', 'Creative Development', 'Motion', '3D')
  }

  return tags
}

export function ExperienceMotion({ experience }: ExperienceMotionProps) {
  return (
    <>
      {/* Hero */}
      <section className="section-padding container-main">
        <Reveal>
          <p className="section-label">Developer Journey</p>
          <h1 className="heading-h1 mb-6">Experience</h1>
          <p className="body-text-lg text-text-secondary max-w-2xl">
            A curated timeline of growth — from foundational learning to independent creation.
          </p>
        </Reveal>
      </section>

      {/* Timeline Visual */}
      <section className="pb-12 container-main">
        <Reveal delay={0.15}>
          <div className="relative">
            {/* Horizontal line */}
            <div className="hidden md:block absolute top-[52px] left-0 right-0 h-px bg-border" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
              {journeyPhases.map((phase, i) => (
                <Reveal key={phase.year} delay={0.2 + i * 0.1} direction="up">
                  <div className="relative flex flex-col items-center text-center md:px-6">
                    {/* Dot */}
                    <div className="relative z-10 w-3 h-3 rounded-full bg-primary mb-4 ring-4 ring-background" />

                    {/* Year */}
                    <p className="font-mono text-text-muted uppercase text-[11px] tracking-technical mb-1">
                      {phase.year}
                    </p>

                    {/* Label */}
                    <p className="font-mono text-primary font-bold uppercase text-[13px] tracking-technical mb-2">
                      {phase.label}
                    </p>

                    {/* Accent */}
                    <p className="text-text-secondary text-sm leading-snug">{phase.accent}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <div className="thin-divider container-main" />

      {/* Experience Entries */}
      <section className="section-padding bg-background-secondary">
        <div className="container-main">
          {experience.length === 0 ? (
            <Reveal>
              <p className="body-text text-text-secondary">No experience listed yet.</p>
            </Reveal>
          ) : (
            <Stagger stagger={0.08}>
              {experience.map((exp, index) => {
                const phase = getPhaseForExperience(exp, index)
                const tags = getTags(exp)

                return (
                  <StaggerItem key={exp.id}>
                    <div className="group relative py-10 md:py-14">
                      {/* Subtle left accent on hover */}
                      <div className="absolute left-0 top-0 bottom-0 w-px bg-transparent group-hover:bg-primary/20 transition-colors duration-500" />

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start pl-6 md:pl-10">
                        {/* Year / Phase indicator */}
                        <div className="md:col-span-2">
                          <div className="flex items-center gap-3 md:block">
                            <p className="font-mono text-text-muted uppercase text-[11px] tracking-technical">
                              {exp.startDate}
                              {exp.endDate
                                ? ` — ${exp.endDate}`
                                : exp.isCurrent
                                  ? ' — Present'
                                  : ''}
                            </p>
                            <div className="hidden md:block mt-2">
                              <span className="inline-block px-2 py-0.5 text-[10px] font-mono uppercase tracking-technical text-primary border border-primary/30 bg-primary/5">
                                {journeyPhases[phase]?.label}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Main content */}
                        <div className="md:col-span-6">
                          <h3 className="heading-h4 mb-1 text-text group-hover:text-primary transition-colors duration-300">
                            {exp.role}
                          </h3>
                          {exp.organization && (
                            <p className="text-primary font-medium text-sm mb-3">
                              {exp.organization}
                            </p>
                          )}
                          {exp.description && (
                            <p className="body-text text-text-secondary leading-relaxed">
                              {exp.description}
                            </p>
                          )}
                        </div>

                        {/* Tags */}
                        <div className="md:col-span-4 mt-2 md:mt-0">
                          {tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {tags.map((tag) => (
                                <span key={tag} className="tech-tag text-[11px]">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Divider (except last) */}
                      {index < experience.length - 1 && (
                        <div className="thin-divider mt-10 md:mt-14" />
                      )}
                    </div>
                  </StaggerItem>
                )
              })}
            </Stagger>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding container-main text-center">
        <Reveal>
          <h2 className="heading-h2 mb-4">Want to Know More?</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="body-text text-text-secondary max-w-xl mx-auto mb-8">
            Check out my resume or get in touch.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="flex gap-4 justify-center">
            <MagneticButton as="a" href="/resume" className="btn-primary">
              View Resume
            </MagneticButton>
            <MagneticButton as="a" href="/contact" className="btn-secondary">
              Contact Me
            </MagneticButton>
          </div>
        </Reveal>
      </section>
    </>
  )
}
