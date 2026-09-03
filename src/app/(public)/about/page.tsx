export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { getAbout, getSkills, getTechnologies } from '@/lib/db/queries'
import { EmptyState } from '@/components/ui/states'

export const metadata = {
  title: 'About',
  description: 'About Muhammad Taha - Full-Stack + AI Developer',
}

export default async function AboutPage() {
  const [about, skills, technologies] = await Promise.all([
    getAbout(),
    getSkills(),
    getTechnologies(),
  ])

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="section-padding container-main">
        <p className="section-label">About</p>
        <h1 className="heading-h1 mb-6">Muhammad Taha</h1>
        <p className="body-text-lg text-text-secondary max-w-2xl">
          Full-Stack + AI Developer crafting innovative digital experiences at the intersection of
          design and technology.
        </p>
      </section>

      {/* Profile */}
      <section className="section-padding bg-background-secondary">
        <div className="container-main">
          <div className="grid-editorial">
            <div className="md:col-span-4">
              <p className="section-label">Profile</p>
              <h2 className="heading-h3">Background</h2>
            </div>
            <div className="md:col-span-8">
              {about?.biography ? (
                <div className="body-text text-text-secondary whitespace-pre-wrap">
                  {about.biography}
                </div>
              ) : (
                <EmptyState message="About content coming soon." />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      {skills.length > 0 && (
        <section className="section-padding container-main" id="skills">
          <p className="section-label">Technical Skills</p>
          <h2 className="heading-h2 mb-12">Skills & Expertise</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {skills.map((skill) => (
              <div key={skill.id} className="bg-surface border border-border rounded-lg p-4">
                <h3 className="font-medium text-text">{skill.name}</h3>
                {skill.category && <p className="technical-text text-xs mt-1">{skill.category}</p>}
                {skill.description && (
                  <p className="text-sm text-text-secondary mt-2">{skill.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Technologies */}
      {technologies.length > 0 && (
        <section className="section-padding bg-background-secondary">
          <div className="container-main">
            <p className="section-label">Tech Stack</p>
            <h2 className="heading-h2 mb-12">Technologies</h2>

            <div className="flex flex-wrap gap-3">
              {technologies.map((tech) => (
                <div
                  key={tech.id}
                  className="bg-surface border border-border rounded-full px-4 py-2"
                >
                  <span className="text-sm text-text">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding container-main text-center">
        <h2 className="heading-h2 mb-4">Let&apos;s Work Together</h2>
        <p className="body-text text-text-secondary max-w-xl mx-auto mb-8">
          Interested in collaborating or have a project in mind?
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/contact" className="btn-primary">
            Get in Touch
          </Link>
          <Link href="/projects" className="btn-secondary">
            View Projects
          </Link>
        </div>
      </section>
    </main>
  )
}
