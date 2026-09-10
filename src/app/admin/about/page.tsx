'use client'

import { useState, useEffect } from 'react'
import { Save } from 'lucide-react'
import { PageHeader } from '@/components/admin/page-header'
import { useToast } from '@/components/admin/toast'

interface About {
  biography: string
  profileContent: string
  interests: string
}

export default function AboutAdmin() {
  const [about, setAbout] = useState<About>({ biography: '', profileContent: '', interests: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchAbout()
  }, [])

  const fetchAbout = async () => {
    try {
      const res = await fetch('/api/admin/about')
      if (!res.ok) throw new Error()
      const json = await res.json()
      if (json.data) setAbout(json.data)
    } catch {
      setError('Failed to load about content')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!about.biography.trim()) {
      toast('Biography is required', 'error')
      return
    }
    setSaving(true)
    try {
      const res = await fetch('/api/admin/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(about),
      })
      if (!res.ok) throw new Error()
      toast('About content saved')
    } catch {
      toast('Failed to save', 'error')
    } finally {
      setSaving(false)
    }
  }

  if (loading)
    return <div className="text-text-muted font-mono text-xs animate-pulse">Loading about...</div>
  if (error) return <div className="text-error text-sm p-8 text-center">{error}</div>

  return (
    <div>
      <PageHeader title="About" description="Biography and profile content" />

      <div className="max-w-2xl space-y-8">
        <div className="bg-surface border border-border-base p-6">
          <h3 className="text-sm font-medium text-text-primary mb-4">Biography</h3>
          <textarea
            value={about.biography}
            onChange={(e) => setAbout({ ...about, biography: e.target.value })}
            className="bg-background border border-border-base px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors w-full min-h-[160px]"
            placeholder="Your professional biography..."
          />
        </div>

        <div className="bg-surface border border-border-base p-6">
          <h3 className="text-sm font-medium text-text-primary mb-4">Profile Content</h3>
          <textarea
            value={about.profileContent || ''}
            onChange={(e) => setAbout({ ...about, profileContent: e.target.value })}
            className="bg-background border border-border-base px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors w-full min-h-[120px]"
            placeholder="Additional profile content..."
          />
        </div>

        <div className="bg-surface border border-border-base p-6">
          <h3 className="text-sm font-medium text-text-primary mb-4">Interests</h3>
          <textarea
            value={about.interests || ''}
            onChange={(e) => setAbout({ ...about, interests: e.target.value })}
            className="bg-background border border-border-base px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors w-full min-h-[80px]"
            placeholder="Your interests and hobbies..."
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-primary text-background font-mono text-xs uppercase tracking-widest px-6 py-2 rounded-sm hover:bg-primary-hover transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {saving ? (
            'Saving...'
          ) : (
            <>
              <Save size={14} /> Save About
            </>
          )}
        </button>
      </div>
    </div>
  )
}
