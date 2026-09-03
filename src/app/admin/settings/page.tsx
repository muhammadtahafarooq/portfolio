'use client'

import { useState, useEffect } from 'react'

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

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings')
      if (res.ok) {
        const data = await res.json()
        if (data) {
          setSettings(data)
        }
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error)
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
      if (res.ok) {
        alert('Settings saved!')
      }
    } catch (error) {
      console.error('Failed to save settings:', error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="text-text-muted">Loading...</div>
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="heading-h3">Settings</h1>
        <p className="text-text-secondary">Configure your portfolio settings</p>
      </div>

      <div className="max-w-2xl space-y-8">
        {/* General Settings */}
        <div className="card">
          <h3 className="heading-h4 mb-4">General</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Site Title</label>
              <input
                type="text"
                value={settings.siteTitle}
                onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Site Description</label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                className="input-field min-h-[80px]"
              />
            </div>
          </div>
        </div>

        {/* Visual Settings */}
        <div className="card">
          <h3 className="heading-h4 mb-4">Visual Experience</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Animation Intensity</label>
              <select
                value={settings.animationIntensity}
                onChange={(e) => setSettings({ ...settings, animationIntensity: e.target.value })}
                className="input-field"
              >
                <option value="reduced">Reduced</option>
                <option value="standard">Standard</option>
                <option value="enhanced">Enhanced</option>
              </select>
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.threeDEnabled}
                onChange={(e) => setSettings({ ...settings, threeDEnabled: e.target.checked })}
                className="rounded"
              />
              <span className="text-sm">Enable 3D Experience</span>
            </label>
          </div>
        </div>

        {/* Analytics */}
        <div className="card">
          <h3 className="heading-h4 mb-4">Analytics</h3>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.analyticsEnabled}
              onChange={(e) => setSettings({ ...settings, analyticsEnabled: e.target.checked })}
              className="rounded"
            />
            <span className="text-sm">Enable Vercel Analytics</span>
          </label>
        </div>

        <button onClick={handleSave} disabled={saving} className="btn-primary disabled:opacity-50">
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  )
}
