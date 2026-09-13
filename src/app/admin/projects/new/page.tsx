'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/admin/toast'
import { PageHeader } from '@/components/admin/page-header'
import { ImageMultiUpload } from '@/components/admin/image-upload'

export default function NewProject() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()
  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    shortStatement: '',
    technologies: '',
    liveUrl: '',
    githubUrl: '',
    demoUrl: '',
    screenshotUrls: [] as string[],
    caseStudyProblem: '',
    caseStudySolution: '',
    caseStudyResult: '',
    isFeatured: false,
    isVisible: true,
    sortOrder: 0,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          technologies: form.technologies
            ? JSON.stringify(form.technologies.split(',').map((t) => t.trim()))
            : null,
          screenshotUrls:
            form.screenshotUrls.length > 0 ? JSON.stringify(form.screenshotUrls) : null,
        }),
      })

      if (res.ok) {
        toast('Project created', 'success')
        router.push('/admin/projects')
      } else {
        const errJson = await res.json().catch(() => null)
        throw new Error(errJson?.error || 'Failed to create project')
      }
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Failed to create project', 'error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <PageHeader
        title="New Project"
        description="Create a new project entry"
        action={
          <div className="flex gap-2">
            <button
              type="submit"
              form="project-form"
              disabled={saving}
              className="bg-primary text-background font-mono text-xs uppercase tracking-widest px-6 py-2 rounded-sm hover:bg-primary-hover transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Create Project'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="border border-border-base text-text-secondary font-mono text-xs uppercase tracking-widest px-6 py-2 rounded-sm hover:text-text-primary hover:border-border-hover transition-colors"
            >
              Cancel
            </button>
          </div>
        }
      />

      <form
        id="project-form"
        onSubmit={handleSubmit}
        className="bg-surface border border-border-base p-8 max-w-2xl space-y-6"
      >
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-widest text-text-muted mb-1">
            Title *
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full bg-background border border-border-base text-text-primary px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
            required
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono uppercase tracking-widest text-text-muted mb-1">
            Slug *
          </label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="w-full bg-background border border-border-base text-text-primary px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
            placeholder="my-project"
            required
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono uppercase tracking-widest text-text-muted mb-1">
            Short Statement
          </label>
          <input
            type="text"
            value={form.shortStatement}
            onChange={(e) => setForm({ ...form, shortStatement: e.target.value })}
            className="w-full bg-background border border-border-base text-text-primary px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono uppercase tracking-widest text-text-muted mb-1">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full bg-background border border-border-base text-text-primary px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors min-h-[120px]"
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono uppercase tracking-widest text-text-muted mb-1">
            Technologies (comma-separated)
          </label>
          <input
            type="text"
            value={form.technologies}
            onChange={(e) => setForm({ ...form, technologies: e.target.value })}
            className="w-full bg-background border border-border-base text-text-primary px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
            placeholder="React, Next.js, TypeScript"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-widest text-text-muted mb-1">
              Live URL
            </label>
            <input
              type="url"
              value={form.liveUrl}
              onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
              className="w-full bg-background border border-border-base text-text-primary px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-widest text-text-muted mb-1">
              GitHub URL
            </label>
            <input
              type="url"
              value={form.githubUrl}
              onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
              className="w-full bg-background border border-border-base text-text-primary px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        <ImageMultiUpload
          value={form.screenshotUrls}
          onChange={(urls) => setForm({ ...form, screenshotUrls: urls })}
          folder="projects"
          label="Screenshots"
        />

        <div className="border-t border-border-base pt-6 space-y-4">
          <h3 className="text-sm font-medium text-text-primary">Case Study</h3>
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-widest text-text-muted mb-1">
              Problem
            </label>
            <textarea
              value={form.caseStudyProblem}
              onChange={(e) => setForm({ ...form, caseStudyProblem: e.target.value })}
              className="w-full bg-background border border-border-base text-text-primary px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors min-h-[80px]"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-widest text-text-muted mb-1">
              Solution
            </label>
            <textarea
              value={form.caseStudySolution}
              onChange={(e) => setForm({ ...form, caseStudySolution: e.target.value })}
              className="w-full bg-background border border-border-base text-text-primary px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors min-h-[80px]"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-widest text-text-muted mb-1">
              Result
            </label>
            <textarea
              value={form.caseStudyResult}
              onChange={(e) => setForm({ ...form, caseStudyResult: e.target.value })}
              className="w-full bg-background border border-border-base text-text-primary px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors min-h-[80px]"
            />
          </div>
        </div>

        <div className="border-t border-border-base pt-6 flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.isFeatured}
              onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
              className="accent-primary w-4 h-4"
            />
            <span className="text-sm text-text-secondary">Featured</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.isVisible}
              onChange={(e) => setForm({ ...form, isVisible: e.target.checked })}
              className="accent-primary w-4 h-4"
            />
            <span className="text-sm text-text-secondary">Visible</span>
          </label>
        </div>
      </form>
    </div>
  )
}
