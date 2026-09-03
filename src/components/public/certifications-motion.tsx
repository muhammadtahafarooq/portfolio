'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Certification, Achievement } from '@/types'
import { Reveal, Stagger, StaggerItem, MagneticButton } from '@/components/motion'
import { EmptyState } from '@/components/ui/states'

interface CertificationsMotionProps {
  certifications: Certification[]
  achievements: Achievement[]
}

export function CertificationsMotion({ certifications, achievements }: CertificationsMotionProps) {
  return (
    <>
      {/* Hero */}
      <section className="section-padding container-main">
        <Reveal>
          <p className="section-label">Credentials</p>
          <h1 className="heading-h1 mb-6">Certifications & Achievements</h1>
          <p className="body-text-lg text-text-secondary max-w-2xl">
            Professional certifications and achievements that validate my skills and expertise.
          </p>
        </Reveal>
      </section>

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="section-padding bg-background-secondary">
          <div className="container-main">
            <Reveal>
              <p className="section-label">Certifications</p>
              <h2 className="heading-h3 mb-8">Professional Certifications</h2>
            </Reveal>

            <div className="space-y-6">
              {certifications.map((cert, index) => (
                <Reveal key={cert.id} delay={index * 0.1}>
                  <div className="grid-editorial">
                    <div className="md:col-span-4">
                      <p className="technical-text mb-1">{cert.date}</p>
                    </div>
                    <div className="md:col-span-8">
                      <h3 className="heading-h4 mb-1">{cert.name}</h3>
                      {cert.issuer && (
                        <p className="text-primary font-medium mb-2">{cert.issuer}</p>
                      )}
                      {cert.description && (
                        <p className="body-text text-text-secondary text-sm">{cert.description}</p>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <section className="section-padding container-main">
          <Reveal>
            <p className="section-label">Achievements</p>
            <h2 className="heading-h3 mb-8">Notable Achievements</h2>
          </Reveal>

          <div className="space-y-6">
            {achievements.map((achievement, index) => (
              <Reveal key={achievement.id} delay={index * 0.1}>
                <div className="grid-editorial">
                  <div className="md:col-span-4">
                    <p className="technical-text mb-1">{achievement.date}</p>
                  </div>
                  <div className="md:col-span-8">
                    <h3 className="heading-h4 mb-1">{achievement.title}</h3>
                    {achievement.description && (
                      <p className="body-text text-text-secondary text-sm">
                        {achievement.description}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {certifications.length === 0 && achievements.length === 0 && (
        <section className="section-padding bg-background-secondary">
          <div className="container-main">
            <EmptyState message="No certifications or achievements listed yet." />
          </div>
        </section>
      )}

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
