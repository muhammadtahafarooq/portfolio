export const dynamic = 'force-dynamic'

import { getEducation } from '@/lib/db/queries'

export const metadata = {
  title: 'Education',
  description: 'Educational background of Muhammad Taha - Full-Stack + AI Developer',
}

export default async function EducationPage() {
  const education = await getEducation()

  return (
    <main className="min-h-screen section-padding container-main">
      <p className="technical-text mb-2">Background</p>
      <h1 className="heading-h1 mb-6">Education</h1>
      <p className="body-text text-text-secondary max-w-2xl mb-12">
        My academic journey and the foundations that built my technical expertise.
      </p>

      {education.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-text-muted">No education listed yet. Check back soon!</p>
        </div>
      ) : (
        <div className="space-y-8">
          {education.map((edu) => (
            <div key={edu.id} className="card">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h2 className="heading-h3">{edu.institution}</h2>
                  {edu.qualification && (
                    <p className="text-accent-primary font-medium">{edu.qualification}</p>
                  )}
                  {edu.program && <p className="text-text-secondary">{edu.program}</p>}
                </div>
                <div className="text-text-muted text-sm technical-text">
                  {edu.startDate} — {edu.endDate || 'Present'}
                </div>
              </div>
              {edu.description && (
                <div className="body-text text-text-secondary whitespace-pre-wrap">
                  {edu.description}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
