'use client'

import { useState, useEffect } from 'react'
import { Save } from 'lucide-react'
import { PageHeader } from '@/components/admin/page-header'
import { useToast } from '@/components/admin/toast'
import { ImageUpload } from '@/components/admin/image-upload'

interface Profile {
  name: string
  title: string
  shortBio: string
  email: string
  phone: string
  location: string
  avatarUrl: string
}

export default function ProfileAdmin() {
  const [profile, setProfile] = useState<Profile>({
    name: '',
    title: '',
    shortBio: '',
    email: '',
    phone: '',
    location: '',
    avatarUrl: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/admin/profile')
      if (!res.ok) throw new Error()
      const json = await res.json()
      if (json.data) setProfile(json.data)
    } catch {
      setError('Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!profile.name.trim()) {
      toast('Name is required', 'error')
      return
    }
    setSaving(true)
    try {
      const res = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      })
      if (!res.ok) throw new Error()
      toast('Profile saved')
    } catch {
      toast('Failed to save profile', 'error')
    } finally {
      setSaving(false)
    }
  }

  if (loading)
    return <div className="text-text-muted font-mono text-xs animate-pulse">Loading profile...</div>
  if (error) return <div className="text-error text-sm p-8 text-center">{error}</div>

  return (
    <div>
      <PageHeader title="Profile" description="Personal and professional identity" />

      <div className="max-w-2xl space-y-8">
        <div className="bg-surface border border-border-base p-6">
          <h3 className="text-sm font-medium text-text-primary mb-4">Identity</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-text-muted mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="bg-background border border-border-base px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors w-full"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-text-muted mb-1">
                Title / Tagline
              </label>
              <input
                type="text"
                value={profile.title}
                onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                className="bg-background border border-border-base px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors w-full"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-text-muted mb-1">
                Short Bio
              </label>
              <textarea
                value={profile.shortBio || ''}
                onChange={(e) => setProfile({ ...profile, shortBio: e.target.value })}
                className="bg-background border border-border-base px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors w-full min-h-[80px]"
              />
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border-base p-6">
          <h3 className="text-sm font-medium text-text-primary mb-4">Contact</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-text-muted mb-1">
                Email
              </label>
              <input
                type="email"
                value={profile.email || ''}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="bg-background border border-border-base px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors w-full"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-text-muted mb-1">
                Phone
              </label>
              <input
                type="text"
                value={profile.phone || ''}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="bg-background border border-border-base px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors w-full"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-text-muted mb-1">
                Location
              </label>
              <input
                type="text"
                value={profile.location || ''}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                className="bg-background border border-border-base px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors w-full"
              />
            </div>
            <ImageUpload
              value={profile.avatarUrl || ''}
              onChange={(url) => setProfile({ ...profile, avatarUrl: url })}
              folder="avatar"
              label="Avatar"
            />
          </div>
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
              <Save size={14} /> Save Profile
            </>
          )}
        </button>
      </div>
    </div>
  )
}
