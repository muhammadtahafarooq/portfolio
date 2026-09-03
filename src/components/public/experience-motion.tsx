'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Experience } from '@/types'
import { Reveal, Stagger, StaggerItem, MagneticButton } from '@/components/motion'
import { EmptyState } from '@/components/ui/states'

interface ExperienceMotionProps {
  experience: Experience[]
}

export function ExperienceMotion({ experience }: ExperienceMotionProps) {
  return (
    <>
      {/* Hero */}
      <section className="section-padding container-main">
        <Reveal>
          <p className="section-label">Career</p>
          <h1 className="heading-h1 mb-6">Experience</h1>
          <p className="body-text-lg text-text-secondary max-w-2xl">
            My professional journey and the roles that have shaped my expertise.
          </p>
        </Reveal>
      </section>

      {/* Experience Timeline */}
      <section className="section-padding bg-background-secondary">
        <div className="container-main">
          {experience.length === 0 ? (
            <EmptyState message="No experience listed yet." />
          ) : (
            <div className="space-y-12">
              {experience.map((exp, index) => (
                <Reveal key={exp.id} delay={index * 0.1}>
                  <div className="grid-editorial">
                    <div className="md:col-span-4">
                      <p className="technical-text mb-1">
                        {exp.startDate} — {exp.isCurrent ? 'Present' : exp.endDate}
                      </p>
                    </div>
                    <div className="md:col-span-8">
                      <h2 className="heading-h4 mb-1">{exp.role}</h2>
                      {exp.organization && (
                        <p className="text-primary font-medium mb-4">{exp.organization}</p>
                      )}
                      {exp.description && (
                        <p className="body-text text-text-secondary">{exp.description}</p>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
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
