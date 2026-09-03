export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { getCertifications, getAchievements } from '@/lib/db/queries'
import { EmptyState } from '@/components/ui/states'

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
      <section className="section-padding container-main">
        <p className="section-label">Credentials</p>
        <h1 className="heading-h1 mb-6">Certifications & Achievements</h1>
        <p className="body-text-lg text-text-secondary max-w-2xl">
          Professional certifications and achievements that validate my skills and expertise.
        </p>
      </section>

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="section-padding bg-background-secondary">
          <div className="container-main">
            <p className="section-label">Certifications</p>
            <h2 className="heading-h3 mb-8">Professional Certifications</h2>

            <div className="space-y-6">
              {certifications.map((cert) => (
                <div key={cert.id} className="grid-editorial">
                  <div className="md:col-span-4">
                    <p className="technical-text mb-1">{cert.date}</p>
                  </div>
                  <div className="md:col-span-8">
                    <h3 className="heading-h4 mb-1">{cert.name}</h3>
                    {cert.issuer && <p className="text-primary font-medium mb-2">{cert.issuer}</p>}
                    {cert.description && (
                      <p className="body-text text-text-secondary text-sm">{cert.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <section className="section-padding container-main">
          <p className="section-label">Achievements</p>
          <h2 className="heading-h3 mb-8">Notable Achievements</h2>

          <div className="space-y-6">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="grid-editorial">
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
        <h2 className="heading-h2 mb-4">Want to Know More?</h2>
        <p className="body-text text-text-secondary max-w-xl mx-auto mb-8">
          Check out my resume or get in touch.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/resume" className="btn-primary">
            View Resume
          </Link>
          <Link href="/contact" className="btn-secondary">
            Contact Me
          </Link>
        </div>
      </section>
    </main>
  )
}
