export const dynamic = 'force-dynamic'

import { getExperience } from '@/lib/db/queries'

export const metadata = {
  title: 'Experience',
  description: 'Professional experience of Muhammad Taha - Full-Stack + AI Developer',
}

export default async function ExperiencePage() {
  const experience = await getExperience()

  return (
    <main className="min-h-screen section-padding container-main">
      <p className="technical-text mb-2">Career</p>
      <h1 className="heading-h1 mb-6">Experience</h1>
      <p className="body-text text-text-secondary max-w-2xl mb-12">
        My professional journey and the roles that have shaped my expertise.
      </p>

      {experience.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-text-muted">No experience listed yet. Check back soon!</p>
        </div>
      ) : (
        <div className="space-y-8">
          {experience.map((exp) => (
            <div key={exp.id} className="card">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h2 className="heading-h3">{exp.role}</h2>
                  {exp.organization && (
                    <p className="text-accent-primary font-medium">{exp.organization}</p>
                  )}
                </div>
                <div className="text-text-muted text-sm technical-text">
                  {exp.startDate} — {exp.isCurrent ? 'Present' : exp.endDate}
                </div>
              </div>
              {exp.description && (
                <div className="body-text text-text-secondary whitespace-pre-wrap">
                  {exp.description}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
