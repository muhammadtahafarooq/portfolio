'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Education } from '@/types'
import { Reveal, Stagger, StaggerItem, MagneticButton } from '@/components/motion'
import { EmptyState } from '@/components/ui/states'

interface EducationMotionProps {
  education: Education[]
}

export function EducationMotion({ education }: EducationMotionProps) {
  return (
    <>
      {/* Hero */}
      <section className="section-padding container-main">
        <Reveal>
          <p className="section-label">Background</p>
          <h1 className="heading-h1 mb-6">Education</h1>
          <p className="body-text-lg text-text-secondary max-w-2xl">
            My academic journey and the foundations that built my technical expertise.
          </p>
        </Reveal>
      </section>

      {/* Education Entries */}
      <section className="section-padding bg-background-secondary">
        <div className="container-main">
          {education.length === 0 ? (
            <EmptyState message="No education listed yet." />
          ) : (
            <div className="space-y-12">
              {education.map((edu, index) => (
                <Reveal key={edu.id} delay={index * 0.1}>
                  <div className="grid-editorial">
                    <div className="md:col-span-4">
                      <p className="technical-text mb-1">
                        {edu.startDate} — {edu.endDate || 'Present'}
                      </p>
                    </div>
                    <div className="md:col-span-8">
                      <h2 className="heading-h4 mb-1">{edu.institution}</h2>
                      {edu.qualification && (
                        <p className="text-primary font-medium mb-2">{edu.qualification}</p>
                      )}
                      {edu.program && <p className="text-text-secondary mb-4">{edu.program}</p>}
                      {edu.description && (
                        <p className="body-text text-text-secondary">{edu.description}</p>
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
            Check out my certifications or get in touch.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="flex gap-4 justify-center">
            <MagneticButton as="a" href="/certifications" className="btn-primary">
              View Certifications
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
