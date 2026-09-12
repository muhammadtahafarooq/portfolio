export const revalidate = 3600

import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, Globe, MapPin } from 'lucide-react'
import {
  getProfile,
  getExperience,
  getEducation,
  getProjects,
  getCertifications,
  getSkills,
  getSocialLinks,
  getResume,
} from '@/lib/db/queries'
import { Reveal } from '@/components/motion'
import { SpaceBackground } from '@/components/public/space-background'
import type { Project, Certification, Skill, SocialLinkRecord } from '@/types'

export const metadata = {
  title: 'Resume',
  description: 'Resume of Muhammad Taha - Full-Stack + AI Developer',
  alternates: {
    canonical: '/resume',
  },
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
  const [projects, certifications, skills, education, socialLinks, resume, profile] =
    await Promise.all([
      getProjects(),
      getCertifications(),
      getSkills(),
      getEducation(),
      getSocialLinks(),
      getResume(),
      getProfile(),
    ])

  let aboutMe =
    'Computer Science undergraduate at the National University of Modern Languages (NUML), currently in the 5th semester with a CGPA of 3.43. Interested in web development, software engineering, and AI-powered applications, with a focus on building practical projects and continuously developing technical skills.'
  let languages: { name: string; level: string }[] = [
    { name: 'Urdu', level: 'Fluent' },
    { name: 'Punjabi', level: 'Fluent' },
    { name: 'English', level: 'Intermediate' },
  ]
  let educationNote = '5th Semester | CGPA 3.43'
  let certificationNote = 'Certificate Received'
  let ctaTitle = 'Access Full Record'
  let ctaDescription = 'Download my complete resume for a comprehensive overview of my credentials.'
  let ctaButtonText = 'Download Resume'
  let sectionAbout = 'About Me'
  let sectionEducation = 'Education'
  let sectionSkills = 'Skills'
  let sectionLanguage = 'Language'
  let sectionProjects = 'PROJECTS'
  let sectionCertification = 'CERTIFICATION'
  let labelDescription = 'Description'
  let labelTechnologies = 'Technologies'
  let labelOrganizedBy = 'Organized by'
  let bottomLabel = 'INITIATE CONNECTION'
  let bottomTitle = 'READY TO COLLABORATE?'
  let bottomButtonText = 'CONTACT ME'

  if (resume?.content) {
    try {
      const parsed = JSON.parse(resume.content)
      if (parsed.aboutMe) aboutMe = parsed.aboutMe
      if (parsed.languages?.length) languages = parsed.languages
      if (parsed.educationNote !== undefined) educationNote = parsed.educationNote
      if (parsed.certificationNote !== undefined) certificationNote = parsed.certificationNote
      if (parsed.ctaTitle) ctaTitle = parsed.ctaTitle
      if (parsed.ctaDescription) ctaDescription = parsed.ctaDescription
      if (parsed.ctaButtonText) ctaButtonText = parsed.ctaButtonText
      if (parsed.sectionAbout) sectionAbout = parsed.sectionAbout
      if (parsed.sectionEducation) sectionEducation = parsed.sectionEducation
      if (parsed.sectionSkills) sectionSkills = parsed.sectionSkills
      if (parsed.sectionLanguage) sectionLanguage = parsed.sectionLanguage
      if (parsed.sectionProjects) sectionProjects = parsed.sectionProjects
      if (parsed.sectionCertification) sectionCertification = parsed.sectionCertification
      if (parsed.labelDescription) labelDescription = parsed.labelDescription
      if (parsed.labelTechnologies) labelTechnologies = parsed.labelTechnologies
      if (parsed.labelOrganizedBy) labelOrganizedBy = parsed.labelOrganizedBy
      if (parsed.bottomLabel) bottomLabel = parsed.bottomLabel
      if (parsed.bottomTitle) bottomTitle = parsed.bottomTitle
      if (parsed.bottomButtonText) bottomButtonText = parsed.bottomButtonText
    } catch {
      aboutMe = resume.content
    }
  }

  const skillGroups = groupSkillsByCategory(skills)
  const phone = profile?.phone || getSocialUrl(socialLinks, 'phone')
  const email = profile?.email || getSocialUrl(socialLinks, 'email')
  const website = getSocialUrl(socialLinks, 'github')
  const location = profile?.location || getSocialUrl(socialLinks, 'location')
  const displayName = profile?.name || 'MUHAMMAD TAHA'
  const displayTitle = profile?.title || 'CS Student | Aspiring Full-Stack Developer'

  return (
    <>
      <SpaceBackground />
      <main id="main-content">
        <section className="section-padding">
          <div className="container-main">
            <Reveal>
              <div className="max-w-[900px] mx-auto">
                {/* Resume Header */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-10">
                  {/* Photo */}
                  <div className="w-[140px] h-[140px] rounded-full bg-surface border-2 border-border-base overflow-hidden shrink-0">
                    <Image
                      src={profile?.avatarUrl || '/images/profile.jpg'}
                      alt={displayName}
                      width={140}
                      height={140}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Name & Info */}
                  <div className="text-center sm:text-left">
                    <h1 className="font-h1 text-[40px] sm:text-[48px] font-bold text-text tracking-tight leading-none mb-2">
                      {displayName.toUpperCase()}
                    </h1>
                    <p className="font-body-md text-text-secondary mb-5">{displayTitle}</p>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2">
                      <span className="flex items-center gap-2 font-technical-sm text-text-muted">
                        <Phone size={14} />
                        <a href={`tel:${phone}`} className="hover:text-primary transition-colors">
                          {phone}
                        </a>
                      </span>
                      <span className="flex items-center gap-2 font-technical-sm text-text-muted">
                        <Globe size={14} />
                        {website.replace('https://', '')}
                      </span>
                      <span className="flex items-center gap-2 font-technical-sm text-text-muted">
                        <Mail size={14} />
                        <a
                          href={`mailto:${email}`}
                          className="hover:text-primary transition-colors"
                        >
                          {email}
                        </a>
                      </span>
                      <span className="flex items-center gap-2 font-technical-sm text-text-muted">
                        <MapPin size={14} />
                        {location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Download Resume Button */}
                <div className="mb-10">
                  <a
                    href={
                      resume?.pdfUrl ||
                      'https://drive.google.com/file/d/1LfDVTkhz7--9AauezHOt9RFHXxB2GKuo/view?usp=sharing'
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    Download Resume
                  </a>
                </div>

                <div className="thin-divider mb-10" />

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-10">
                  {/* Left Column */}
                  <div className="space-y-10">
                    {/* About Me */}
                    <Reveal>
                      <div>
                        <h2 className="font-h3 text-[20px] font-bold text-text mb-4">
                          {sectionAbout}
                        </h2>
                        <p className="font-body-md text-text-secondary leading-relaxed">
                          {aboutMe}
                        </p>
                      </div>
                    </Reveal>

                    {/* Education */}
                    <Reveal>
                      <div>
                        <h2 className="font-h3 text-[20px] font-bold text-text mb-4">
                          {sectionEducation}
                        </h2>
                        {education.map((edu) => (
                          <div key={edu.id}>
                            <p className="font-body-md font-semibold text-text">
                              {edu.qualification} in {edu.program}
                            </p>
                            <p className="font-body-md text-text-secondary">{edu.institution}</p>
                            {educationNote && (
                              <p className="font-technical-sm text-text-muted mt-1">
                                {educationNote}
                              </p>
                            )}
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
                        <h2 className="font-h3 text-[20px] font-bold text-text mb-4">
                          {sectionSkills}
                        </h2>
                        <div className="space-y-4">
                          {Array.from(skillGroups.entries()).map(([category, categorySkills]) => (
                            <div key={category}>
                              <p className="font-technical-sm font-bold text-text mb-1">
                                {category}
                              </p>
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
                        <h2 className="font-h3 text-[20px] font-bold text-text mb-4">
                          {sectionLanguage}
                        </h2>
                        <ul className="space-y-1 font-body-md text-text-secondary">
                          {languages.map((lang) => (
                            <li key={lang.name}>
                              {lang.name} — {lang.level}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Reveal>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-10">
                    {/* Projects */}
                    <Reveal>
                      <div>
                        <h2 className="font-h3 text-[20px] font-bold text-text mb-6">
                          {sectionProjects}
                        </h2>
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
                                <p className="font-technical-sm text-text-muted mb-1">
                                  {labelDescription}
                                </p>
                                <p className="font-body-md text-text-secondary text-sm mb-2">
                                  {project.description?.substring(0, 120)}
                                  {project.description && project.description.length > 120
                                    ? '...'
                                    : ''}
                                </p>
                                <p className="font-technical-sm text-text-muted mb-1">
                                  {labelTechnologies}
                                </p>
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
                        <h2 className="font-h3 text-[20px] font-bold text-text mb-4">
                          {sectionCertification}
                        </h2>
                        {certifications.map((cert: Certification) => (
                          <div key={cert.id}>
                            <p className="font-body-md font-semibold text-text">{cert.name}</p>
                            <p className="font-body-md text-text-secondary">
                              {labelOrganizedBy} {cert.issuer}
                            </p>
                            {certificationNote && (
                              <p className="font-body-md text-text-secondary">
                                {certificationNote}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </Reveal>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Access Full Record CTA */}
            {resume?.pdfUrl && (
              <Reveal>
                <div className="border border-border-base relative overflow-hidden py-16 px-8 text-center mt-24">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                  <div className="relative z-10">
                    <h2 className="heading-h2 text-text mb-4">{ctaTitle}</h2>
                    <p className="font-body-md text-text-secondary mb-8 max-w-md mx-auto">
                      {ctaDescription}
                    </p>
                    <a
                      href={resume.pdfUrl}
                      download
                      className="btn-primary inline-flex items-center gap-2"
                    >
                      {ctaButtonText}
                    </a>
                  </div>
                </div>
              </Reveal>
            )}

            {/* Bottom CTA */}
            <Reveal>
              <div className="border-t border-border mt-24 pt-16 text-center">
                <p className="section-label mb-4">{bottomLabel}</p>
                <h2 className="heading-h2 mb-6">{bottomTitle}</h2>
                <Link href="/contact" className="btn-primary inline-flex items-center gap-3 group">
                  {bottomButtonText}
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  )
}
