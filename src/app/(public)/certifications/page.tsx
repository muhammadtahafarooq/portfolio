export const dynamic = 'force-dynamic'

import Link from 'next/link'
import Image from 'next/image'
import { getCertifications, getAchievements } from '@/lib/db/queries'
import { Reveal } from '@/components/motion'
import { SpaceBackground } from '@/components/public/space-background'

export const metadata = {
  title: 'Certifications & Achievements',
  description:
    'Professional certifications and achievements of Muhammad Taha - CS Student | Aspiring Full-Stack Developer',
  alternates: {
    canonical: '/certifications',
  },
}

const CERTIFICATE_URL =
  'https://drive.google.com/file/d/1P_5sXHBieCe1RzRx9FXMlYNBeLO1c3Wg/view?usp=sharing'

export default async function CertificationsPage() {
  const [certifications, achievements] = await Promise.all([getCertifications(), getAchievements()])

  return (
    <main className="min-h-screen">
      <SpaceBackground />
      {/* Hero */}
      <section className="section-padding">
        <div className="container-main">
          <div className="grid-12">
            <div className="col-span-12 md:col-span-7">
              <Reveal>
                <p className="font-technical-sm text-text-muted uppercase tracking-technical mb-6">
                  05 / CREDENTIALS
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="font-h1 text-text-primary mb-6">Certifications & Achievements</h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="font-body-lg text-text-secondary max-w-xl leading-body">
                  Professional certifications and milestones that validate my expertise and
                  commitment to continuous learning and excellence.
                </p>
              </Reveal>
            </div>

            <Reveal className="col-span-12 md:col-span-5 mt-12 md:mt-0" delay={0.3}>
              <div className="relative border border-border-base bg-surface aspect-square overflow-hidden">
                <Image
                  src="/images/projects-hero.svg"
                  alt="Credentials visual composition"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="container-main">
        <div className="thin-divider" />
      </div>

      {/* Certifications */}
      <section className="section-padding container-main">
        {certifications.length === 0 ? (
          <Reveal>
            <p className="font-body-md text-text-muted">No certifications listed yet.</p>
          </Reveal>
        ) : (
          <div className="space-y-24">
            {certifications.map((cert, index) => {
              const isImageLeft = index % 2 === 0
              const colImage = isImageLeft ? 'col-span-7' : 'col-span-5 md:col-start-8'
              const colInfo = isImageLeft ? 'col-span-5' : 'col-span-7'
              const imageOrder = isImageLeft ? 'order-1' : 'order-2'
              const infoOrder = isImageLeft ? 'order-2' : 'order-1'
              const certNum = `CRT_${String(index + 1).padStart(2, '0')}`

              return (
                <Reveal key={cert.id} delay={index * 0.1}>
                  <div className="grid-12 items-center gap-gutter">
                    <div className={`${colImage} ${imageOrder}`}>
                      <div className="relative aspect-video bg-background border border-border-base overflow-hidden">
                        <Image
                          src="/images/Certificate.jpeg"
                          alt={cert.name}
                          fill
                          className="object-cover transition-transform duration-cinematic hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 60vw"
                        />
                      </div>
                    </div>

                    <div className={`${colInfo} ${infoOrder}`}>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-technical-sm text-text-muted uppercase tracking-technical">
                          {certNum}
                        </span>
                        <span className="font-technical-sm text-text-primary uppercase tracking-technical border border-border-base px-2 py-0.5">
                          CREDENTIAL
                        </span>
                      </div>

                      <h2 className="font-h3 text-text-primary mb-4 hover:text-primary transition-colors duration-normal">
                        {cert.name}
                      </h2>

                      <p className="font-body-md text-text-secondary mb-6 max-w-lg leading-body">
                        {cert.issuer
                          ? `Issued by ${cert.issuer}`
                          : 'Professional certification validating expertise and skills.'}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        <span className="tech-tag">Certification</span>
                        {cert.date && <span className="tech-tag">{cert.date}</span>}
                      </div>

                      <div className="flex gap-4">
                        <a
                          href={CERTIFICATE_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-technical-sm text-text-primary uppercase tracking-technical border-b border-text-primary pb-0.5 hover:text-primary hover:border-primary transition-colors"
                        >
                          View Certificate
                        </a>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        )}
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
                  <p className="font-technical-sm text-text-muted uppercase mb-2">Milestones</p>
                  <h2 className="heading-h2 text-text-primary">Milestones</h2>
                </div>
              </Reveal>
            </div>
            <div className="col-span-12 md:col-span-8">
              {achievements.length === 0 ? (
                <Reveal>
                  <p className="font-body-md text-text-muted">No achievements listed yet.</p>
                </Reveal>
              ) : (
                <div className="relative border-l border-border pl-8 space-y-12">
                  {achievements.map((achievement, index) => (
                    <Reveal key={achievement.id} delay={index * 0.1}>
                      <div className="relative">
                        <div className="absolute -left-[41px] top-1 w-3 h-3 rounded-full bg-primary shadow-glow md:block hidden" />
                        {achievement.date && (
                          <p className="font-technical-sm text-primary mb-2">{achievement.date}</p>
                        )}
                        <h3 className="heading-h3 text-text-primary mb-3">{achievement.title}</h3>
                        {achievement.description && (
                          <p className="font-body-md text-text-secondary max-w-lg">
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
    </main>
  )
}
