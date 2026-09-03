export const dynamic = 'force-dynamic'

import { getAbout, getSkills, getTechnologies } from '@/lib/db/queries'

export const metadata = {
  title: 'About',
  description: 'Learn more about Muhammad Taha - Full-Stack + AI Developer',
}

export default async function AboutPage() {
  const [about, skills, technologies] = await Promise.all([
    getAbout(),
    getSkills(),
    getTechnologies(),
  ])

  return (
    <main className="min-h-screen section-padding container-main">
      <p className="technical-text mb-2">About</p>
      <h1 className="heading-h1 mb-12">Muhammad Taha</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          {about ? (
            <>
              <div>
                <h2 className="heading-h3 mb-4">Biography</h2>
                <div className="body-text text-text-secondary whitespace-pre-wrap">
                  {about.biography}
                </div>
              </div>

              {about.profileContent && (
                <div>
                  <h2 className="heading-h3 mb-4">Background</h2>
                  <div className="body-text text-text-secondary whitespace-pre-wrap">
                    {about.profileContent}
                  </div>
                </div>
              )}

              {about.interests && (
                <div>
                  <h2 className="heading-h3 mb-4">Interests</h2>
                  <div className="body-text text-text-secondary whitespace-pre-wrap">
                    {about.interests}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="card">
              <p className="text-text-muted">
                Content coming soon. Add your biography in the admin dashboard.
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h2 className="heading-h4 mb-4">Skills</h2>
              <div className="space-y-2">
                {skills.map((skill) => (
                  <div key={skill.id} className="card py-3">
                    <p className="font-medium">{skill.name}</p>
                    {skill.category && (
                      <p className="technical-text text-xs mt-1">{skill.category}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies */}
          {technologies.length > 0 && (
            <div>
              <h2 className="heading-h4 mb-4">Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <span
                    key={tech.id}
                    className="technical-text text-xs bg-surface border border-border px-2 py-1 rounded"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
