export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { ArrowUpRight, Download } from 'lucide-react'
import { getCertifications, getAchievements } from '@/lib/db/queries'
import { Reveal } from '@/components/motion'

export const metadata = {
  title: 'Certifications & Achievements',
  description:
    'Professional certifications and achievements of Muhammad Taha - Full-Stack + AI Developer',
}

export default async function CertificationsPage() {
  const [certifications, achievements] = await Promise.all([getCertifications(), getAchievements()])

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="section-padding">
        <div className="container-main">
          <div className="grid-12">
            <div className="col-span-12 md:col-span-8">
              <Reveal>
                <p className="technical-text text-primary mb-4">[ 04 : CREDENTIALS ]</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="heading-h1 text-text-primary mb-6">Certifications & Achievements</h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="body-text-lg text-text-secondary max-w-xl">
                  Professional certifications and milestones that validate my expertise and
                  commitment to continuous learning and excellence.
                </p>
              </Reveal>
            </div>
            <div className="col-span-12 md:col-span-4 hidden md:block">
              <Reveal delay={0.3}>
                <div className="tech-lines relative h-full min-h-[200px] border border-border rounded-sm overflow-hidden">
                  <div className="absolute inset-0 tech-grid opacity-30" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-16 h-16 border border-primary/30 rotate-45" />
                    <div className="w-10 h-10 border border-primary/20 rotate-45 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <p className="technical-text text-text-muted uppercase">CRED.04</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <div className="container-main">
        <div className="thin-divider" />
      </div>

      {/* Certifications */}
      <section className="section-padding">
        <div className="container-main">
          <Reveal>
            <div className="flex items-center gap-4 mb-12">
              <h2 className="heading-h2 text-text-primary">Certifications</h2>
              <div className="flex-1 thin-divider" />
            </div>
          </Reveal>

          {certifications.length === 0 ? (
            <Reveal>
              <p className="body-text text-text-muted">No certifications listed yet.</p>
            </Reveal>
          ) : (
            <div>
              {certifications.map((cert, index) => (
                <Reveal key={cert.id} delay={index * 0.05}>
                  <div className="grid-12 items-center py-6 border-b border-border group hover:bg-surface/50 transition-colors duration-300">
                    <div className="col-span-12 md:col-span-4">
                      <h3 className="heading-h4 text-text-primary group-hover:text-primary transition-colors duration-300">
                        {cert.name}
                      </h3>
                    </div>
                    <div className="col-span-12 md:col-span-4">
                      {cert.issuer && (
                        <p className="body-text text-text-secondary">{cert.issuer}</p>
                      )}
                    </div>
                    <div className="col-span-12 md:col-span-4 flex items-center justify-between md:justify-end gap-4">
                      {cert.date && <p className="technical-text text-text-muted">{cert.date}</p>}
                      <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-primary transition-colors duration-300" />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="container-main">
        <div className="thin-divider" />
      </div>

      {/* Achievements */}
      <section className="section-padding">
        <div className="container-main">
          <div className="grid-12">
            <div className="col-span-12 md:col-span-4">
              <Reveal>
                <div className="sticky top-32">
                  <p className="technical-text text-text-muted uppercase mb-2">Milestones</p>
                  <h2 className="heading-h2 text-text-primary">Milestones</h2>
                </div>
              </Reveal>
            </div>
            <div className="col-span-12 md:col-span-8">
              {achievements.length === 0 ? (
                <Reveal>
                  <p className="body-text text-text-muted">No achievements listed yet.</p>
                </Reveal>
              ) : (
                <div className="relative border-l border-border pl-8 space-y-12">
                  {achievements.map((achievement, index) => (
                    <Reveal key={achievement.id} delay={index * 0.1}>
                      <div className="relative">
                        <div className="absolute -left-[41px] top-1 w-3 h-3 rounded-full bg-primary shadow-glow" />
                        {achievement.date && (
                          <p className="technical-text text-primary mb-2">{achievement.date}</p>
                        )}
                        <h3 className="heading-h3 text-text-primary mb-3">{achievement.title}</h3>
                        {achievement.description && (
                          <p className="body-text text-text-secondary max-w-lg">
                            {achievement.description}
                          </p>
                        )}
                      </div>
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container-main">
        <div className="thin-divider" />
      </div>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-main">
          <Reveal>
            <div className="border border-border relative overflow-hidden py-16 px-8 text-center">
              <div className="absolute inset-0 tech-lines opacity-20" />
              <div className="absolute inset-0 tech-grid opacity-10" />
              <div className="relative z-10">
                <h2 className="heading-h2 text-text-primary mb-4">Access Full Record</h2>
                <p className="body-text text-text-secondary mb-8 max-w-md mx-auto">
                  Download my complete resume for a comprehensive overview of my credentials.
                </p>
                <Link href="/resume" className="btn-primary inline-flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Resume
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
