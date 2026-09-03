export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { getExperience } from '@/lib/db/queries'
import { EmptyState } from '@/components/ui/states'

export const metadata = {
  title: 'Experience',
  description: 'Professional experience of Muhammad Taha - Full-Stack + AI Developer',
}

export default async function ExperiencePage() {
  const experience = await getExperience()

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="section-padding container-main">
        <p className="section-label">Career</p>
        <h1 className="heading-h1 mb-6">Experience</h1>
        <p className="body-text-lg text-text-secondary max-w-2xl">
          My professional journey and the roles that have shaped my expertise.
        </p>
      </section>

      {/* Experience Timeline */}
      <section className="section-padding bg-background-secondary">
        <div className="container-main">
          {experience.length === 0 ? (
            <EmptyState message="No experience listed yet." />
          ) : (
            <div className="space-y-12">
              {experience.map((exp) => (
                <div key={exp.id} className="grid-editorial">
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
              ))}
            </div>
          )}
        </div>
      </section>

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
