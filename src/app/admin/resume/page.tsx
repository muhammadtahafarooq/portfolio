'use client'

import { useState, useEffect } from 'react'
import { Save, Plus, Trash2, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import { PageHeader } from '@/components/admin/page-header'
import { useToast } from '@/components/admin/toast'

interface Language {
  name: string
  level: string
}

interface ResumeData {
  pdfUrl: string
  aboutMe: string
  languages: Language[]
  educationNote: string
  certificationNote: string
  sectionAbout: string
  sectionEducation: string
  sectionSkills: string
  sectionLanguage: string
  sectionProjects: string
  sectionCertification: string
  labelDescription: string
  labelTechnologies: string
  labelOrganizedBy: string
  ctaTitle: string
  ctaDescription: string
  ctaButtonText: string
  bottomLabel: string
  bottomTitle: string
  bottomButtonText: string
}

const defaults: ResumeData = {
  pdfUrl: '',
  aboutMe: '',
  languages: [],
  educationNote: '',
  certificationNote: '',
  sectionAbout: 'About Me',
  sectionEducation: 'Education',
  sectionSkills: 'Skills',
  sectionLanguage: 'Language',
  sectionProjects: 'PROJECTS',
  sectionCertification: 'CERTIFICATION',
  labelDescription: 'Description',
  labelTechnologies: 'Technologies',
  labelOrganizedBy: 'Organized by',
  ctaTitle: 'Access Full Record',
  ctaDescription: 'Download my complete resume for a comprehensive overview of my credentials.',
  ctaButtonText: 'Download Resume',
  bottomLabel: 'INITIATE CONNECTION',
  bottomTitle: 'READY TO COLLABORATE?',
  bottomButtonText: 'CONTACT ME',
}

const emptyResume: ResumeData = { ...defaults }

export default function AdminResumePage() {
  const [resume, setResume] = useState<ResumeData>(emptyResume)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    pdf: true,
    about: true,
    languages: true,
    education: true,
    certification: true,
    sections: false,
    labels: false,
    cta: true,
    bottomCta: false,
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchResume()
  }, [])

  const fetchResume = async () => {
    try {
      const res = await fetch('/api/admin/resume')
      if (!res.ok) throw new Error()
      const json = await res.json()
      if (json.data?.content) {
        try {
          const parsed = JSON.parse(json.data.content)
          setResume({ ...emptyResume, ...parsed, pdfUrl: json.data.pdfUrl || parsed.pdfUrl || '' })
        } catch {
          setResume({
            ...emptyResume,
            aboutMe: json.data.content || '',
            pdfUrl: json.data.pdfUrl || '',
          })
        }
      } else if (json.data?.pdfUrl) {
        setResume({ ...emptyResume, pdfUrl: json.data.pdfUrl })
      }
    } catch {
      setError('Failed to load resume')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/resume', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: JSON.stringify(resume),
          pdfUrl: resume.pdfUrl || '',
        }),
      })
      if (!res.ok) throw new Error()
      toast('Resume saved')
    } catch {
      toast('Failed to save resume', 'error')
    } finally {
      setSaving(false)
    }
  }

  const update = (field: keyof ResumeData, value: string) => {
    setResume({ ...resume, [field]: value })
  }

  const toggle = (key: string) => setOpenSections({ ...openSections, [key]: !openSections[key] })

  const addLanguage = () => {
    setResume({ ...resume, languages: [...resume.languages, { name: '', level: '' }] })
  }

  const updateLanguage = (index: number, field: keyof Language, value: string) => {
    const updated = [...resume.languages]
    updated[index] = { ...updated[index], [field]: value }
    setResume({ ...resume, languages: updated })
  }

  const removeLanguage = (index: number) => {
    setResume({ ...resume, languages: resume.languages.filter((_, i) => i !== index) })
  }

  if (loading)
    return <div className="text-text-muted font-mono text-xs animate-pulse">Loading resume...</div>
  if (error) return <div className="text-error text-sm p-8 text-center">{error}</div>

  const Section = ({
    id,
    title,
    children,
  }: {
    id: string
    title: string
    children: React.ReactNode
  }) => (
    <div className="bg-surface border border-border-base">
      <button
        onClick={() => toggle(id)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <h3 className="text-sm font-medium text-text-primary">{title}</h3>
        {openSections[id] ? (
          <ChevronUp size={16} className="text-text-muted" />
        ) : (
          <ChevronDown size={16} className="text-text-muted" />
        )}
      </button>
      {openSections[id] && (
        <div className="px-5 pb-5 border-t border-border-base pt-4">{children}</div>
      )}
    </div>
  )

  const Input = ({
    label,
    value,
    field,
    placeholder,
  }: {
    label: string
    value: string
    field: keyof ResumeData
    placeholder?: string
  }) => (
    <div>
      <label className="block text-[11px] font-mono uppercase tracking-widest text-text-muted mb-1">
        {label}
      </label>
      <input
        type="text"
        value={value}
        placeholder={placeholder || label}
        onChange={(e) => update(field, e.target.value)}
        className="bg-background border border-border-base px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors w-full"
      />
    </div>
  )

  return (
    <div>
      <PageHeader
        title="Resume"
        description="Edit every word, label, and section on your resume page"
        action={
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-primary text-background font-mono text-xs uppercase tracking-widest px-6 py-2 rounded-sm hover:bg-primary-hover transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? (
              'Saving...'
            ) : (
              <>
                <Save size={14} /> Save Resume
              </>
            )}
          </button>
        }
      />

      <div className="max-w-3xl space-y-4">
        {/* PDF */}
        <Section id="pdf" title="PDF Resume">
          <p className="text-xs text-text-muted mb-3">
            Upload your resume PDF to Cloudflare R2 or any hosting, then paste the URL here.
          </p>
          <div className="flex gap-3">
            <input
              type="url"
              placeholder="https://..."
              value={resume.pdfUrl}
              onChange={(e) => update('pdfUrl', e.target.value)}
              className="bg-background border border-border-base px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors flex-1"
            />
            {resume.pdfUrl && (
              <a
                href={resume.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-surface border border-border-base px-3 py-2 text-text-muted hover:text-primary transition-colors flex items-center gap-1 text-xs shrink-0"
              >
                <ExternalLink size={14} /> View
              </a>
            )}
          </div>
        </Section>

        {/* About Me */}
        <Section id="about" title="About Me">
          <p className="text-xs text-text-muted mb-3">
            This text appears in the left column of your resume page.
          </p>
          <textarea
            value={resume.aboutMe}
            onChange={(e) => update('aboutMe', e.target.value)}
            className="bg-background border border-border-base px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors w-full min-h-[120px]"
            placeholder="Write about yourself..."
          />
        </Section>

        {/* Languages */}
        <Section id="languages" title="Languages">
          <div className="flex justify-end mb-3">
            <button
              onClick={addLanguage}
              className="bg-surface border border-border-base px-3 py-1.5 text-xs font-mono text-text-muted hover:text-primary hover:border-border-hover transition-colors flex items-center gap-1"
            >
              <Plus size={14} /> Add Language
            </button>
          </div>
          {resume.languages.length === 0 ? (
            <p className="text-xs text-text-muted">No languages added yet.</p>
          ) : (
            <div className="space-y-2">
              {resume.languages.map((lang, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Language"
                    value={lang.name}
                    onChange={(e) => updateLanguage(i, 'name', e.target.value)}
                    className="bg-background border border-border-base px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors flex-1"
                  />
                  <input
                    type="text"
                    placeholder="Level"
                    value={lang.level}
                    onChange={(e) => updateLanguage(i, 'level', e.target.value)}
                    className="bg-background border border-border-base px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors flex-1"
                  />
                  <button
                    onClick={() => removeLanguage(i)}
                    className="text-text-muted hover:text-error transition-colors p-2"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* Education Note */}
        <Section id="education" title="Education Display Note">
          <p className="text-xs text-text-muted mb-3">
            Extra text shown below each education entry on the resume (e.g. semester, CGPA).
          </p>
          <input
            type="text"
            placeholder="e.g. 5th Semester | CGPA 3.43"
            value={resume.educationNote}
            onChange={(e) => update('educationNote', e.target.value)}
            className="bg-background border border-border-base px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors w-full"
          />
        </Section>

        {/* Certification Note */}
        <Section id="certification" title="Certification Display Note">
          <p className="text-xs text-text-muted mb-3">
            Extra text shown below each certification on the resume (e.g. &quot;Hosted on
            Unstop&quot;).
          </p>
          <input
            type="text"
            placeholder="e.g. Certificate Received"
            value={resume.certificationNote}
            onChange={(e) => update('certificationNote', e.target.value)}
            className="bg-background border border-border-base px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors w-full"
          />
        </Section>

        {/* Section Headings */}
        <Section id="sections" title="Section Headings">
          <p className="text-xs text-text-muted mb-3">
            Edit the heading text for each section on the resume page.
          </p>
          <div className="space-y-4">
            <Input label="About Me Heading" value={resume.sectionAbout} field="sectionAbout" />
            <Input
              label="Education Heading"
              value={resume.sectionEducation}
              field="sectionEducation"
            />
            <Input label="Skills Heading" value={resume.sectionSkills} field="sectionSkills" />
            <Input
              label="Language Heading"
              value={resume.sectionLanguage}
              field="sectionLanguage"
            />
            <Input
              label="Projects Heading"
              value={resume.sectionProjects}
              field="sectionProjects"
            />
            <Input
              label="Certification Heading"
              value={resume.sectionCertification}
              field="sectionCertification"
            />
          </div>
        </Section>

        {/* Inline Labels */}
        <Section id="labels" title="Inline Labels">
          <p className="text-xs text-text-muted mb-3">
            Edit the small labels and prefixes used inside project and certification entries.
          </p>
          <div className="space-y-4">
            <Input
              label="Project Description Label"
              value={resume.labelDescription}
              field="labelDescription"
            />
            <Input
              label="Project Technologies Label"
              value={resume.labelTechnologies}
              field="labelTechnologies"
            />
            <Input
              label='Certification "Organized by" Prefix'
              value={resume.labelOrganizedBy}
              field="labelOrganizedBy"
            />
          </div>
        </Section>

        {/* Access Full Record CTA */}
        <Section id="cta" title="Access Full Record CTA">
          <p className="text-xs text-text-muted mb-3">
            The call-to-action section at the bottom of the resume page (above the footer CTA).
          </p>
          <div className="space-y-4">
            <Input label="Title" value={resume.ctaTitle} field="ctaTitle" />
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-text-muted mb-1">
                Description
              </label>
              <textarea
                value={resume.ctaDescription}
                onChange={(e) => update('ctaDescription', e.target.value)}
                className="bg-background border border-border-base px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors w-full min-h-[60px]"
              />
            </div>
            <Input label="Button Text" value={resume.ctaButtonText} field="ctaButtonText" />
          </div>
        </Section>

        {/* Bottom CTA */}
        <Section id="bottomCta" title="Bottom CTA (Ready to Collaborate)">
          <p className="text-xs text-text-muted mb-3">
            The final call-to-action at the very bottom of the resume page.
          </p>
          <div className="space-y-4">
            <Input
              label="Small Label"
              value={resume.bottomLabel}
              field="bottomLabel"
              placeholder="INITIATE CONNECTION"
            />
            <Input
              label="Main Heading"
              value={resume.bottomTitle}
              field="bottomTitle"
              placeholder="READY TO COLLABORATE?"
            />
            <Input
              label="Button Text"
              value={resume.bottomButtonText}
              field="bottomButtonText"
              placeholder="CONTACT ME"
            />
          </div>
        </Section>
      </div>
    </div>
  )
}
