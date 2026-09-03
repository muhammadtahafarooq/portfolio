'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, GripVertical, Eye, EyeOff } from 'lucide-react'

interface SocialLink {
  id: number
  platform: string
  url: string
  isVisible: boolean
  sortOrder: number
}

export default function AdminSocialLinksPage() {
  const [links, setLinks] = useState<SocialLink[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<SocialLink | null>(null)
  const [form, setForm] = useState({
    platform: '',
    url: '',
    isVisible: true,
    sortOrder: 0,
  })

  useEffect(() => {
    fetchLinks()
  }, [])

  async function fetchLinks() {
    const res = await fetch('/api/admin/social-links')
    const data = await res.json()
    setLinks(data)
    setLoading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const method = editing ? 'PUT' : 'POST'
    const url = editing ? `/api/admin/social-links/${editing.id}` : '/api/admin/social-links'

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    setForm({ platform: '', url: '', isVisible: true, sortOrder: 0 })
    setEditing(null)
    fetchLinks()
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this link?')) return
    await fetch(`/api/admin/social-links/${id}`, { method: 'DELETE' })
    fetchLinks()
  }

  function handleEdit(link: SocialLink) {
    setEditing(link)
    setForm({
      platform: link.platform,
      url: link.url,
      isVisible: link.isVisible,
      sortOrder: link.sortOrder,
    })
  }

  if (loading) return <div className="p-6">Loading...</div>

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="heading-h2">Social Links</h1>
      </div>

      <form onSubmit={handleSubmit} className="card mb-8">
        <h2 className="heading-h4 mb-4">{editing ? 'Edit Link' : 'Add Link'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="Platform (e.g. GitHub, LinkedIn)"
            value={form.platform}
            onChange={(e) => setForm({ ...form, platform: e.target.value })}
            className="input"
            required
          />
          <input
            type="url"
            placeholder="URL"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            className="input"
            required
          />
          <input
            type="number"
            placeholder="Sort Order"
            value={form.sortOrder}
            onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })}
            className="input"
          />
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
        <div className="flex gap-2 mt-4">
          <button type="submit" className="btn-primary">
            {editing ? 'Update' : 'Add'}
          </button>
          {editing && (
            <button
              type="button"
              onClick={() => {
                setEditing(null)
                setForm({ platform: '', url: '', isVisible: true, sortOrder: 0 })
              }}
              className="btn-secondary"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-4">
        {links.map((link) => (
          <div key={link.id} className="card flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GripVertical className="text-text-muted" size={16} />
              <div>
                <h3 className="font-medium">{link.platform}</h3>
                <p className="text-sm text-text-muted truncate max-w-md">{link.url}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {link.isVisible ? (
                <Eye size={16} className="text-green-500" />
              ) : (
                <EyeOff size={16} className="text-text-muted" />
              )}
              <button onClick={() => handleEdit(link)} className="p-2 hover:bg-surface rounded">
                <Pencil size={16} />
              </button>
              <button
                onClick={() => handleDelete(link.id)}
                className="p-2 hover:bg-destructive/10 text-destructive rounded"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
