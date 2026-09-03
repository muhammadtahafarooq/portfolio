'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Resume } from '@/types'
import { Reveal, MagneticButton } from '@/components/motion'
import { EmptyState } from '@/components/ui/states'

interface ResumeMotionProps {
  resume: Resume | null
}

export function ResumeMotion({ resume }: ResumeMotionProps) {
  return (
    <>
      {/* Hero */}
      <section className="section-padding container-main">
        <Reveal>
          <p className="section-label">Document</p>
          <h1 className="heading-h1 mb-6">Resume</h1>
          <p className="body-text-lg text-text-secondary max-w-2xl">
            Download my resume or view my professional background.
          </p>
        </Reveal>
      </section>

      {/* Resume Content */}
      <section className="section-padding bg-background-secondary">
        <div className="container-main">
          {!resume ? (
            <EmptyState message="Resume not available yet." />
          ) : (
            <div className="grid-editorial">
              <Reveal className="md:col-span-8" delay={0.1}>
                {resume.content ? (
                  <div className="body-text text-text-secondary whitespace-pre-wrap">
                    {resume.content}
                  </div>
                ) : (
                  <p className="text-text-muted">No resume content available.</p>
                )}
              </Reveal>
              <Reveal className="md:col-span-4" delay={0.2}>
                <div className="bg-surface border border-border rounded-xl p-6 sticky top-24">
                  <h3 className="heading-h4 mb-4">Download</h3>
                  {resume.pdfUrl ? (
                    <MagneticButton as="a" href={resume.pdfUrl} className="btn-primary w-full">
                      Download PDF
                    </MagneticButton>
                  ) : (
                    <p className="text-sm text-text-muted">PDF not available</p>
                  )}
                </div>
              </Reveal>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding container-main text-center">
        <Reveal>
          <h2 className="heading-h2 mb-4">Interested in My Background?</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="body-text text-text-secondary max-w-xl mx-auto mb-8">
            Let&apos;s discuss how I can contribute to your team or project.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <MagneticButton as="a" href="/contact" className="btn-primary">
            Get in Touch
          </MagneticButton>
        </Reveal>
      </section>
    </>
  )
}
