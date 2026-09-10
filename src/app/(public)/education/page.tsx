export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { getEducation } from '@/lib/db/queries'
import { Reveal } from '@/components/motion'
import { SpaceBackground } from '@/components/public/space-background'

export const metadata = {
  title: 'Education',
  description:
    'Academic foundation and educational background of Muhammad Taha - CS Student | Aspiring Full-Stack Developer',
  alternates: {
    canonical: '/education',
  },
}

export default async function EducationPage() {
  const education = await getEducation()

  return (
    <>
      <SpaceBackground />
      <main id="main-content">
        <section className="section-padding">
          <div className="container-main">
            {/* Education Hero */}
            <div className="grid-12 items-start">
              <Reveal className="col-span-12 md:col-span-6" direction="up">
                <p className="section-label">03 / ACADEMIC FOUNDATION</p>
                <h1 className="heading-h1 mb-8 animate-mask-reveal">Education</h1>
                <p className="body-text-lg text-text-secondary">
                  A structured journey through the academic disciplines that underpin engineering
                  intuition, computational thinking, and creative problem-solving.
                </p>
              </Reveal>

              <Reveal
                className="col-span-12 md:col-span-5 md:col-start-8"
                direction="up"
                delay={0.15}
              >
                <div className="tech-grid relative border border-border p-8 aspect-square flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-border opacity-60" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border border-primary/30" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/60" />
                  <div className="relative z-10 text-center">
                    <p className="font-mono text-text-muted uppercase tracking-technical text-[11px] mb-2">
                      Foundation
                    </p>
                    <p className="font-mono text-text-muted uppercase tracking-technical text-[11px] mb-2">
                      Theory & Practice
                    </p>
                    <p className="font-mono text-text-muted uppercase tracking-technical text-[11px]">
                      Growth
                    </p>
                  </div>
                  <div className="absolute top-4 right-4 w-2 h-2 bg-primary/30" />
                  <div className="absolute bottom-4 left-4 w-2 h-2 bg-primary/30" />
                  <div className="absolute top-1/2 left-4 w-px h-8 bg-border" />
                  <div className="absolute top-4 left-1/2 w-8 h-px bg-border" />
                </div>
              </Reveal>
            </div>

            {/* Education Entries */}
            <div className="mt-24 border-t border-border pt-12 space-y-12">
              {education.length > 0 ? (
                education.map((edu, index) => (
                  <Reveal key={edu.id} delay={index * 0.1}>
                    <div className="grid-12 items-start">
                      <div className="col-span-12 md:col-span-3">
                        <p className="font-mono text-text-muted uppercase text-[11px] tracking-technical">
                          {edu.startDate}
                          {edu.endDate ? ` — ${edu.endDate}` : ''}
                        </p>
                      </div>
                      <div className="col-span-12 md:col-span-6">
                        <h3 className="heading-h4 mb-2">
                          {edu.qualification || edu.program || 'Degree'}
                        </h3>
                        <p className="text-primary font-medium mb-4">{edu.institution}</p>
                        {edu.description && (
                          <p className="body-text text-text-secondary">{edu.description}</p>
                        )}
                      </div>
                      <div className="col-span-12 md:col-span-3 mt-4 md:mt-0">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="border border-border p-4 bg-surface">
                            <p className="font-mono text-text-muted uppercase text-[11px] tracking-technical mb-1">
                              CGPA
                            </p>
                            <p className="font-mono text-text-primary text-[13px]">
                              {edu.description?.includes('CGPA')
                                ? edu.description.match(/CGPA[:\s]*([\d.]+)/i)?.[1] || '—'
                                : '—'}
                            </p>
                          </div>
                          <div className="border border-border p-4 bg-surface">
                            <p className="font-mono text-text-muted uppercase text-[11px] tracking-technical mb-1">
                              Focus
                            </p>
                            <p className="font-mono text-text-primary text-[13px]">
                              {edu.program || '—'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))
              ) : (
                <Reveal>
                  <p className="body-text text-text-secondary">No education entries listed yet.</p>
                </Reveal>
              )}
            </div>

            {/* Navigation Row */}
            <Reveal>
              <div className="border-t border-b border-border mt-24 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link
                  href="/certifications"
                  className="font-mono text-text-secondary hover:text-primary uppercase text-[13px] tracking-technical transition-colors duration-300 flex items-center gap-2"
                >
                  Explore Certifications & Achievements
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 3L11 8L6 13"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <div className="flex gap-4">
                  <Link href="/resume" className="btn-primary">
                    View Resume
                  </Link>
                  <Link href="/contact" className="btn-secondary">
                    Contact
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  )
}
