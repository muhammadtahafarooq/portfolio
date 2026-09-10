'use client'

import { useState, useEffect } from 'react'
import { Save } from 'lucide-react'
import { PageHeader } from '@/components/admin/page-header'
import { useToast } from '@/components/admin/toast'

interface HomepageContent {
  id: number
  heroIntroduction: string | null
  featuredProjectIds: string | null
  contactStatement: string | null
}

export default function AdminHomepagePage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    heroIntroduction: '',
    featuredProjectIds: '',
    contactStatement: '',
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchContent()
  }, [])

  async function fetchContent() {
    try {
      const res = await fetch('/api/admin/homepage')
      if (!res.ok) throw new Error()
      const data = await res.json()
      const content = data.data || data
      setForm({
        heroIntroduction: content?.heroIntroduction || '',
        featuredProjectIds: content?.featuredProjectIds || '',
        contactStatement: content?.contactStatement || '',
      })
    } catch {
      toast('Failed to load homepage content', 'error')
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      toast('Homepage content saved', 'success')
    } catch {
      toast('Failed to save homepage content', 'error')
    } finally {
      setSaving(false)
    }
  }

  if (loading)
    return (
      <div className="text-text-muted font-mono text-xs animate-pulse">
        Loading homepage content...
      </div>
    )

  return (
    <div>
      <PageHeader
        title="Homepage Content"
        description="Manage hero section, featured projects, and contact statement"
        action={
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-primary text-background font-mono text-xs uppercase tracking-widest px-6 py-2 rounded-sm hover:bg-primary-hover transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Save size={14} />
            {saving ? 'Saving...' : 'Save'}
          </button>
        }
      />

      <div className="bg-surface border border-border-base p-8 space-y-8">
        <div>
          <h3 className="text-sm font-medium text-text-primary mb-4">Hero Introduction</h3>
          <textarea
            placeholder="Brief introduction for the hero section..."
            value={form.heroIntroduction}
            onChange={(e) => setForm({ ...form, heroIntroduction: e.target.value })}
            className="w-full bg-background border border-border-base text-text-primary px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors min-h-[100px]"
            rows={3}
          />
        </div>

        <div className="border-t border-border-base pt-6">
          <h3 className="text-sm font-medium text-text-primary mb-4">Featured Project IDs</h3>
          <input
            placeholder="[1, 2, 3]"
            value={form.featuredProjectIds}
            onChange={(e) => setForm({ ...form, featuredProjectIds: e.target.value })}
            className="w-full bg-background border border-border-base text-text-primary px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
          />
          <p className="text-[11px] font-mono text-text-muted mt-2">
            Comma-separated project IDs to feature on homepage
          </p>
        </div>

        <div className="border-t border-border-base pt-6">
          <h3 className="text-sm font-medium text-text-primary mb-4">Contact Statement</h3>
          <textarea
            placeholder="Statement for the contact section..."
            value={form.contactStatement}
            onChange={(e) => setForm({ ...form, contactStatement: e.target.value })}
            className="w-full bg-background border border-border-base text-text-primary px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors min-h-[80px]"
            rows={2}
          />
        </div>
      </div>
    </div>
  )
}
