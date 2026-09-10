'use client'

import { useState, useEffect } from 'react'
import { Save } from 'lucide-react'
import { PageHeader } from '@/components/admin/page-header'
import { useToast } from '@/components/admin/toast'

interface Settings {
  siteTitle: string
  siteDescription: string
  analyticsEnabled: boolean
  animationIntensity: string
  threeDEnabled: boolean
}

export default function SettingsAdmin() {
  const [settings, setSettings] = useState<Settings>({
    siteTitle: 'Muhammad Taha',
    siteDescription: '',
    analyticsEnabled: false,
    animationIntensity: 'standard',
    threeDEnabled: true,
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings')
      if (!res.ok) throw new Error()
      const json = await res.json()
      if (json.data) setSettings(json.data)
    } catch {
      setError('Failed to load settings')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      if (!res.ok) throw new Error()
      toast('Settings saved')
    } catch {
      toast('Failed to save settings', 'error')
    } finally {
      setSaving(false)
    }
  }

  if (loading)
    return (
      <div className="text-text-muted font-mono text-xs animate-pulse">Loading settings...</div>
    )
  if (error) return <div className="text-error text-sm p-8 text-center">{error}</div>

  return (
    <div>
      <PageHeader title="Settings" description="Configure your portfolio" />

      <div className="max-w-2xl space-y-8">
        <div className="bg-surface border border-border-base p-6">
          <h3 className="text-sm font-medium text-text-primary mb-4">General</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-text-muted mb-1">
                Site Title
              </label>
              <input
                type="text"
                value={settings.siteTitle}
                onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
                className="bg-background border border-border-base px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors w-full"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-text-muted mb-1">
                Site Description
              </label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                className="bg-background border border-border-base px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors w-full min-h-[80px]"
              />
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border-base p-6">
          <h3 className="text-sm font-medium text-text-primary mb-4">Visual Experience</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-text-muted mb-1">
                Animation Intensity
              </label>
              <select
                value={settings.animationIntensity}
                onChange={(e) => setSettings({ ...settings, animationIntensity: e.target.value })}
                className="bg-background border border-border-base px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors w-full"
              >
                <option value="reduced">Reduced</option>
                <option value="standard">Standard</option>
                <option value="enhanced">Enhanced</option>
              </select>
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.threeDEnabled}
                onChange={(e) => setSettings({ ...settings, threeDEnabled: e.target.checked })}
                className="accent-primary w-4 h-4"
              />
              <span className="text-sm text-text-secondary">Enable 3D Experience</span>
            </label>
          </div>
        </div>

        <div className="bg-surface border border-border-base p-6">
          <h3 className="text-sm font-medium text-text-primary mb-4">Analytics</h3>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.analyticsEnabled}
              onChange={(e) => setSettings({ ...settings, analyticsEnabled: e.target.checked })}
              className="accent-primary w-4 h-4"
            />
            <span className="text-sm text-text-secondary">Enable Analytics</span>
          </label>
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
              <Save size={14} /> Save Settings
            </>
          )}
        </button>
      </div>
    </div>
  )
}
