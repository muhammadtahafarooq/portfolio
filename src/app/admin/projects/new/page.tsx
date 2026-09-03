'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewProject() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    shortStatement: '',
    technologies: '',
    liveUrl: '',
    githubUrl: '',
    demoUrl: '',
    screenshotUrls: '',
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
          screenshotUrls: form.screenshotUrls
            ? JSON.stringify(form.screenshotUrls.split(',').map((u) => u.trim()))
            : null,
        }),
      })

      if (res.ok) {
        router.push('/admin/projects')
      }
    } catch (error) {
      console.error('Failed to create project:', error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <h1 className="heading-h3 mb-8">New Project</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div>
          <label className="block text-sm mb-2">Title *</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-2">Slug *</label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="input-field"
            placeholder="my-project"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-2">Short Statement</label>
          <input
            type="text"
            value={form.shortStatement}
            onChange={(e) => setForm({ ...form, shortStatement: e.target.value })}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm mb-2">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="input-field min-h-[120px]"
          />
        </div>

        <div>
          <label className="block text-sm mb-2">Technologies (comma-separated)</label>
          <input
            type="text"
            value={form.technologies}
            onChange={(e) => setForm({ ...form, technologies: e.target.value })}
            className="input-field"
            placeholder="React, Next.js, TypeScript"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2">Live URL</label>
            <input
              type="url"
              value={form.liveUrl}
              onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">GitHub URL</label>
            <input
              type="url"
              value={form.githubUrl}
              onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
              className="input-field"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-2">Screenshot URLs (comma-separated)</label>
          <input
            type="text"
            value={form.screenshotUrls}
            onChange={(e) => setForm({ ...form, screenshotUrls: e.target.value })}
            className="input-field"
          />
        </div>

        <div className="space-y-4">
          <h3 className="heading-h4">Case Study</h3>
          <div>
            <label className="block text-sm mb-2">Problem</label>
            <textarea
              value={form.caseStudyProblem}
              onChange={(e) => setForm({ ...form, caseStudyProblem: e.target.value })}
              className="input-field min-h-[80px]"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Solution</label>
            <textarea
              value={form.caseStudySolution}
              onChange={(e) => setForm({ ...form, caseStudySolution: e.target.value })}
              className="input-field min-h-[80px]"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Result</label>
            <textarea
              value={form.caseStudyResult}
              onChange={(e) => setForm({ ...form, caseStudyResult: e.target.value })}
              className="input-field min-h-[80px]"
            />
          </div>
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isFeatured}
              onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
              className="rounded"
            />
            <span className="text-sm">Featured</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isVisible}
              onChange={(e) => setForm({ ...form, isVisible: e.target.checked })}
              className="rounded"
            />
            <span className="text-sm">Visible</span>
          </label>
        </div>

        <div className="flex gap-4">
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
            {saving ? 'Saving...' : 'Create Project'}
          </button>
          <button type="button" onClick={() => router.back()} className="btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
