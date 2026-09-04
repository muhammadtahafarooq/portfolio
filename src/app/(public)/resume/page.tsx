export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { Phone, Mail, Globe, MapPin, CircleUser } from 'lucide-react'
import {
  getExperience,
  getEducation,
  getProjects,
  getCertifications,
  getSkills,
  getSocialLinks,
} from '@/lib/db/queries'
import { Reveal } from '@/components/motion'
import type { Project, Certification, Skill, SocialLinkRecord } from '@/types'

export const metadata = {
  title: 'Resume',
  description: 'Resume of Muhammad Taha - CS Student | Aspiring Full-Stack Developer',
}

function getSocialUrl(socialLinks: SocialLinkRecord[], platform: string): string {
  return socialLinks.find((l) => l.platform.toLowerCase() === platform)?.url || '#'
}

function groupSkillsByCategory(skills: Skill[]): Map<string, Skill[]> {
  const grouped = new Map<string, Skill[]>()
  for (const skill of skills) {
    const cat = skill.category || 'Other'
    if (!grouped.has(cat)) grouped.set(cat, [])
    grouped.get(cat)!.push(skill)
  }
  return grouped
}

function getProjectYear(dateStr: string | null): string {
  if (!dateStr) return '2026'
  return dateStr.substring(0, 4)
}

export default async function ResumePage() {
  const [projects, certifications, skills, education, socialLinks] = await Promise.all([
    getProjects(),
    getCertifications(),
    getSkills(),
    getEducation(),
    getSocialLinks(),
  ])

  const skillGroups = groupSkillsByCategory(skills)
  const phone = getSocialUrl(socialLinks, 'phone')
  const email = getSocialUrl(socialLinks, 'email')
  const website = getSocialUrl(socialLinks, 'website') || 'www.reallygreatsite.com'
  const location = getSocialUrl(socialLinks, 'location')

  return (
    <section className="section-padding">
      <div className="container-main">
        <Reveal>
          <div className="max-w-[900px] mx-auto">
            {/* Resume Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-10">
              {/* Photo Placeholder */}
              <div className="w-[140px] h-[140px] rounded-full bg-surface border-2 border-border-base flex items-center justify-center shrink-0">
                <CircleUser size={64} className="text-text-muted" />
              </div>

              {/* Name & Info */}
              <div className="text-center sm:text-left">
                <h1 className="font-h1 text-[40px] sm:text-[48px] font-bold text-text tracking-tight leading-none mb-2">
                  MUHAMMAD TAHA
                </h1>
                <p className="font-body-md text-text-secondary mb-5">
                  CS Student | Aspiring Full-Stack Developer
                </p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2">
                  <span className="flex items-center gap-2 font-technical-sm text-text-muted">
                    <Phone size={14} />
                    +92 334 8010708
                  </span>
                  <span className="flex items-center gap-2 font-technical-sm text-text-muted">
                    <Globe size={14} />
                    www.reallygreatsite.com
                  </span>
                  <span className="flex items-center gap-2 font-technical-sm text-text-muted">
                    <Mail size={14} />
                    muhammadtahafarooq22@gmail.com
                  </span>
                  <span className="flex items-center gap-2 font-technical-sm text-text-muted">
                    <MapPin size={14} />
                    Multan, Pakistan
                  </span>
                </div>
              </div>
            </div>

            <div className="thin-divider mb-10" />

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-10">
              {/* Left Column */}
              <div className="space-y-10">
                {/* About Me */}
                <Reveal>
                  <div>
                    <h2 className="font-h3 text-[20px] font-bold text-text mb-4">About Me</h2>
                    <p className="font-body-md text-text-secondary leading-relaxed">
                      Computer Science undergraduate at the National University of Modern Languages
                      (NUML), currently in the 5th semester with a CGPA of 3.43. Interested in web
                      development, software engineering, and AI-powered applications, with a focus
                      on building practical projects and continuously developing technical skills.
                    </p>
                  </div>
                </Reveal>

                {/* Education */}
                <Reveal>
                  <div>
                    <h2 className="font-h3 text-[20px] font-bold text-text mb-4">Education</h2>
                    {education.map((edu) => (
                      <div key={edu.id}>
                        <p className="font-body-md font-semibold text-text">
                          {edu.qualification} in {edu.program}
                        </p>
                        <p className="font-body-md text-text-secondary">{edu.institution}</p>
                        <p className="font-technical-sm text-text-muted mt-1">
                          5th Semester | CGPA 3.43
                        </p>
                        <p className="font-technical-sm text-text-muted">
                          {edu.startDate?.substring(0, 4)} – {edu.endDate?.substring(0, 4)}
                        </p>
                      </div>
                    ))}
                  </div>
                </Reveal>

                {/* Skills */}
                <Reveal>
                  <div>
                    <h2 className="font-h3 text-[20px] font-bold text-text mb-4">Skills</h2>
                    <div className="space-y-4">
                      {Array.from(skillGroups.entries()).map(([category, categorySkills]) => (
                        <div key={category}>
                          <p className="font-technical-sm font-bold text-text mb-1">{category}</p>
                          <p className="font-body-md text-text-secondary">
                            {categorySkills.map((s) => s.name).join(' • ')}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>

                {/* Language */}
                <Reveal>
                  <div>
                    <h2 className="font-h3 text-[20px] font-bold text-text mb-4">Language</h2>
                    <ul className="space-y-1 font-body-md text-text-secondary">
                      <li>Urdu — Fluent</li>
                      <li>Punjabi — Fluent</li>
                      <li>English — Intermediate</li>
                    </ul>
                  </div>
                </Reveal>
              </div>

              {/* Right Column */}
              <div className="space-y-10">
                {/* Projects */}
                <Reveal>
                  <div>
                    <h2 className="font-h3 text-[20px] font-bold text-text mb-6">PROJECTS</h2>
                    <div className="space-y-6">
                      {projects
                        .filter((p) => p.isVisible)
                        .map((project: Project) => (
                          <div key={project.id}>
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-body-md font-semibold text-text">
                                {project.title}
                              </h3>
                              <span className="font-technical-sm text-text-muted bg-surface px-2 py-0.5 rounded border border-border-base">
                                {getProjectYear(project.createdAt)}
                              </span>
                            </div>
                            <p className="font-technical-sm text-text-muted mb-1">Description</p>
                            <p className="font-body-md text-text-secondary text-sm mb-2">
                              {project.description?.substring(0, 120)}
                              {project.description && project.description.length > 120 ? '...' : ''}
                            </p>
                            <p className="font-technical-sm text-text-muted mb-1">Technologies</p>
                            <p className="font-body-md text-text-secondary text-sm">
                              {(() => {
                                try {
                                  const techs = JSON.parse(project.technologies || '[]')
                                  return techs.join(', ')
                                } catch {
                                  return project.technologies || ''
                                }
                              })()}
                            </p>
                            {project !==
                              projects.filter((p) => p.isVisible)[
                                projects.filter((p) => p.isVisible).length - 1
                              ] && <div className="thin-divider mt-6" />}
                          </div>
                        ))}
                    </div>
                  </div>
                </Reveal>

                {/* Certification */}
                <Reveal>
                  <div>
                    <h2 className="font-h3 text-[20px] font-bold text-text mb-4">CERTIFICATION</h2>
                    {certifications.map((cert: Certification) => (
                      <div key={cert.id}>
                        <p className="font-body-md font-semibold text-text">{cert.name}</p>
                        <p className="font-body-md text-text-secondary">
                          Organized by {cert.issuer}
                        </p>
                        <p className="font-body-md text-text-secondary">Hosted on Unstop</p>
                        <p className="font-body-md text-text-secondary">Certificate Received</p>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Bottom CTA */}
        <Reveal>
          <div className="border-t border-border mt-24 pt-16 text-center">
            <p className="section-label mb-4">INITIATE CONNECTION</p>
            <h2 className="heading-h2 mb-6">READY TO COLLABORATE?</h2>
            <Link href="/contact" className="btn-primary inline-flex items-center gap-3 group">
              CONTACT ME
              <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
