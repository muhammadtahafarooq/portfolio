export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { Download, ExternalLink, MapPin } from 'lucide-react'
import { getExperience, getEducation, getResume, getSocialLinks } from '@/lib/db/queries'
import { Reveal } from '@/components/motion'
import type { Experience, Education, Resume, SocialLinkRecord } from '@/types'

export const metadata = {
  title: 'Resume',
  description: 'Resume of Muhammad Taha - Full-Stack + AI Developer',
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return 'Present'
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function getDateRange(
  startDate: string | null,
  endDate: string | null,
  isCurrent: boolean
): string {
  const start = formatDate(startDate)
  const end = isCurrent ? 'Present' : formatDate(endDate)
  return `${start} — ${end}`
}

function calculateExperienceYears(experience: Experience[]): string {
  let totalMonths = 0
  for (const exp of experience) {
    const start = new Date(exp.startDate!)
    const end = exp.isCurrent ? new Date() : new Date(exp.endDate!)
    const months =
      (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
    totalMonths += Math.max(0, months)
  }
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  if (years > 0 && months > 0) return `${years}+ years`
  if (years > 0) return `${years}+ years`
  return `${months} months`
}

function getSocialUrl(socialLinks: SocialLinkRecord[], platform: string): string {
  return socialLinks.find((l) => l.platform.toLowerCase() === platform)?.url || '#'
}

export default async function ResumePage() {
  const [experience, education, resume, socialLinks] = await Promise.all([
    getExperience(),
    getEducation(),
    getResume(),
    getSocialLinks(),
  ])

  const experienceYears = calculateExperienceYears(experience)

  return (
    <section className="section-padding">
      <div className="container-main">
        {/* Header */}
        <div className="grid-12 items-start">
          <Reveal className="col-span-12 md:col-span-8" direction="up">
            <p className="section-label">PAGE 09 — CURRICULUM VITAE</p>
            <h1 className="heading-h1 mb-6">RESUME</h1>
            <p className="body-text-lg text-text-secondary">
              A comprehensive overview of professional experience, education, and technical
              capabilities accumulated throughout my career.
            </p>
          </Reveal>

          <Reveal className="col-span-12 md:col-span-4 md:col-start-9" direction="up" delay={0.15}>
            <div className="relative border border-border p-8 aspect-square flex items-center justify-center bg-surface">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
              <svg
                className="relative z-10 w-full h-full"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="20" y="20" width="160" height="160" stroke="#302B25" strokeWidth="0.5" />
                <rect x="40" y="40" width="120" height="120" stroke="#302B25" strokeWidth="0.5" />
                <rect x="60" y="60" width="80" height="80" stroke="#302B25" strokeWidth="0.5" />
                <line x1="20" y1="20" x2="180" y2="180" stroke="#302B25" strokeWidth="0.5" />
                <line x1="180" y1="20" x2="20" y2="180" stroke="#302B25" strokeWidth="0.5" />
                <line x1="100" y1="20" x2="100" y2="180" stroke="#302B25" strokeWidth="0.5" />
                <line x1="20" y1="100" x2="180" y2="100" stroke="#302B25" strokeWidth="0.5" />
                <circle cx="100" cy="100" r="40" stroke="#D6A85F" strokeWidth="0.5" opacity="0.3" />
                <circle cx="100" cy="100" r="60" stroke="#302B25" strokeWidth="0.5" />
                <circle cx="100" cy="100" r="80" stroke="#302B25" strokeWidth="0.5" opacity="0.5" />
                <rect x="95" y="95" width="10" height="10" fill="#D6A85F" opacity="0.4" />
              </svg>
              <div className="absolute top-4 right-4 w-2 h-2 bg-primary/30" />
              <div className="absolute bottom-4 left-4 w-2 h-2 bg-primary/30" />
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="thin-divider my-24" />
        </Reveal>

        {/* Main Resume Grid */}
        <div className="grid-12 items-start">
          <div className="col-span-12 md:col-span-8 space-y-24">
            {/* Work Experience */}
            <div>
              <Reveal>
                <p className="section-label mb-12">WORK EXPERIENCE</p>
              </Reveal>

              <div className="space-y-12">
                {experience.map((exp: Experience, index: number) => (
                  <Reveal key={exp.id} delay={index * 0.05}>
                    <div className="group">
                      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-4">
                        <p className="font-technical-sm text-text-muted">
                          {getDateRange(exp.startDate, exp.endDate, exp.isCurrent)}
                        </p>
                      </div>
                      <h3 className="heading-h4 text-text mb-1">{exp.role}</h3>
                      {exp.organization && (
                        <p className="font-technical-md text-primary mb-4">{exp.organization}</p>
                      )}
                      {exp.description && (
                        <p className="body-text text-text-secondary">{exp.description}</p>
                      )}
                      {index < experience.length - 1 && <div className="thin-divider mt-12" />}
                    </div>
                  </Reveal>
                ))}

                {experience.length === 0 && (
                  <Reveal>
                    <p className="text-text-muted">No experience data available.</p>
                  </Reveal>
                )}
              </div>
            </div>

            {/* Education */}
            <div>
              <Reveal>
                <p className="section-label mb-12">EDUCATION</p>
              </Reveal>

              <div className="space-y-12">
                {education.map((edu: Education, index: number) => (
                  <Reveal key={edu.id} delay={index * 0.05}>
                    <div className="group">
                      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-4">
                        <p className="font-technical-sm text-text-muted">
                          {getDateRange(edu.startDate, edu.endDate, false)}
                        </p>
                      </div>
                      <h3 className="heading-h4 text-text mb-1">
                        {edu.qualification || edu.program}
                      </h3>
                      <p className="font-technical-md text-primary mb-4">{edu.institution}</p>
                      {edu.description && (
                        <p className="body-text text-text-secondary">{edu.description}</p>
                      )}
                      {index < education.length - 1 && <div className="thin-divider mt-12" />}
                    </div>
                  </Reveal>
                ))}

                {education.length === 0 && (
                  <Reveal>
                    <p className="text-text-muted">No education data available.</p>
                  </Reveal>
                )}
              </div>
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="col-span-12 md:col-span-4 md:col-start-9">
            <div className="sticky top-24 space-y-8">
              {/* Metadata */}
              <Reveal delay={0.1}>
                <div className="border border-border bg-surface p-8">
                  <p className="section-label mb-6">METADATA</p>
                  <div className="space-y-6">
                    <div>
                      <p className="font-technical-sm text-text-muted uppercase tracking-technical mb-1">
                        EXPERIENCE
                      </p>
                      <p className="font-body-lg text-text">{experienceYears}</p>
                    </div>
                    <div className="thin-divider" />
                    <div>
                      <p className="font-technical-sm text-text-muted uppercase tracking-technical mb-1">
                        LOCATION
                      </p>
                      <p className="font-body-lg text-text flex items-center gap-2">
                        <MapPin size={14} className="text-text-muted" />
                        Pakistan
                      </p>
                    </div>
                    <div className="thin-divider" />
                    <div>
                      <p className="font-technical-sm text-text-muted uppercase tracking-technical mb-1">
                        STATUS
                      </p>
                      <p className="font-body-lg text-primary font-semibold">AVAILABLE</p>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Network */}
              <Reveal delay={0.15}>
                <div className="border border-border bg-surface p-8">
                  <p className="section-label mb-6">NETWORK</p>
                  <div className="space-y-4">
                    <a
                      href={getSocialUrl(socialLinks, 'linkedin')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between group"
                    >
                      <span className="font-body-lg text-text group-hover:text-primary transition-colors duration-300">
                        LinkedIn
                      </span>
                      <ExternalLink
                        size={14}
                        className="text-text-muted group-hover:text-primary transition-colors duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </a>
                    <div className="thin-divider" />
                    <a
                      href={getSocialUrl(socialLinks, 'github')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between group"
                    >
                      <span className="font-body-lg text-text group-hover:text-primary transition-colors duration-300">
                        GitHub
                      </span>
                      <ExternalLink
                        size={14}
                        className="text-text-muted group-hover:text-primary transition-colors duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </a>
                  </div>
                </div>
              </Reveal>

              {/* Download */}
              <Reveal delay={0.2}>
                {resume?.pdfUrl ? (
                  <a
                    href={resume.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full flex items-center justify-center gap-3"
                  >
                    <Download size={16} />
                    DOWNLOAD RESUME
                  </a>
                ) : (
                  <button disabled className="btn-primary w-full opacity-50 cursor-not-allowed">
                    DOWNLOAD RESUME
                  </button>
                )}
              </Reveal>
            </div>
          </div>
        </div>

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
