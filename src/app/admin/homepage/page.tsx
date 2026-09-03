'use client'

import { useState, useEffect } from 'react'
import { Save } from 'lucide-react'

interface HomepageContent {
  id: number
  heroIntroduction: string | null
  featuredProjectIds: string | null
  contactStatement: string | null
}

export default function AdminHomepagePage() {
  const [content, setContent] = useState<HomepageContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    heroIntroduction: '',
    featuredProjectIds: '',
    contactStatement: '',
  })

  useEffect(() => {
    fetchContent()
  }, [])

  async function fetchContent() {
    const res = await fetch('/api/admin/homepage')
    const data = await res.json()
    setContent(data)
    setForm({
      heroIntroduction: data?.heroIntroduction || '',
      featuredProjectIds: data?.featuredProjectIds || '',
      contactStatement: data?.contactStatement || '',
    })
    setLoading(false)
  }

  async function handleSave() {
    setSaving(true)
    await fetch('/api/admin/homepage', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSaving(false)
    fetchContent()
  }

  if (loading) return <div className="p-6">Loading...</div>

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="heading-h2">Homepage Content</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary flex items-center gap-2"
        >
          <Save size={16} />
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>

      <div className="card">
        <div className="space-y-6">
          <div>
            <h2 className="heading-h4 mb-4">Hero Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Hero Introduction</label>
                <textarea
                  placeholder="Brief introduction for the hero section..."
                  value={form.heroIntroduction}
                  onChange={(e) => setForm({ ...form, heroIntroduction: e.target.value })}
                  className="input"
                  rows={3}
                />
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <h2 className="heading-h4 mb-4">Featured Projects</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Featured Project IDs (JSON array)
                </label>
                <input
                  placeholder="[1, 2, 3]"
                  value={form.featuredProjectIds}
                  onChange={(e) => setForm({ ...form, featuredProjectIds: e.target.value })}
                  className="input"
                />
                <p className="text-xs text-text-muted mt-1">
                  Comma-separated project IDs to feature on homepage
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <h2 className="heading-h4 mb-4">Contact Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Contact Statement</label>
                <textarea
                  placeholder="Statement for the contact section..."
                  value={form.contactStatement}
                  onChange={(e) => setForm({ ...form, contactStatement: e.target.value })}
                  className="input"
                  rows={2}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
