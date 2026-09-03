export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { getEducation } from '@/lib/db/queries'
import { EmptyState } from '@/components/ui/states'

export const metadata = {
  title: 'Education',
  description: 'Educational background of Muhammad Taha - Full-Stack + AI Developer',
}

export default async function EducationPage() {
  const education = await getEducation()

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="section-padding container-main">
        <p className="section-label">Background</p>
        <h1 className="heading-h1 mb-6">Education</h1>
        <p className="body-text-lg text-text-secondary max-w-2xl">
          My academic journey and the foundations that built my technical expertise.
        </p>
      </section>

      {/* Education Entries */}
      <section className="section-padding bg-background-secondary">
        <div className="container-main">
          {education.length === 0 ? (
            <EmptyState message="No education listed yet." />
          ) : (
            <div className="space-y-12">
              {education.map((edu) => (
                <div key={edu.id} className="grid-editorial">
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
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding container-main text-center">
        <h2 className="heading-h2 mb-4">Want to Know More?</h2>
        <p className="body-text text-text-secondary max-w-xl mx-auto mb-8">
          Check out my certifications or get in touch.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/certifications" className="btn-primary">
            View Certifications
          </Link>
          <Link href="/contact" className="btn-secondary">
            Contact Me
          </Link>
        </div>
      </section>
    </main>
  )
}
