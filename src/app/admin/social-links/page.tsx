'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, X, Save, ExternalLink } from 'lucide-react'
import { PageHeader } from '@/components/admin/page-header'
import { EmptyState } from '@/components/admin/empty-state'
import { ConfirmDialog } from '@/components/admin/confirm-dialog'
import { useToast } from '@/components/admin/toast'

interface SocialLink {
  id: number
  platform: string
  url: string
  isVisible: boolean
  sortOrder: number
}

const emptyForm = { platform: '', url: '', isVisible: true, sortOrder: 0 }

export default function SocialLinksAdmin() {
  const [items, setItems] = useState<SocialLink[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/admin/social-links')
      if (!res.ok) throw new Error()
      const json = await res.json()
      setItems(json.data)
    } catch {
      setError('Failed to load social links')
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async () => {
    if (!form.platform.trim()) {
      toast('Platform is required', 'error')
      return
    }
    if (!form.url.trim()) {
      toast('URL is required', 'error')
      return
    }
    setSaving(true)
    try {
      const res = await fetch('/api/admin/social-links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      const json = await res.json()
      setItems([...items, json.data])
      setForm(emptyForm)
      toast('Social link added')
    } catch {
      toast('Failed to create', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleUpdate = async (id: number) => {
    if (!form.platform.trim()) {
      toast('Platform is required', 'error')
      return
    }
    if (!form.url.trim()) {
      toast('URL is required', 'error')
      return
    }
    setSaving(true)
    try {
      const res = await fetch(`/api/admin/social-links/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      const json = await res.json()
      setItems(items.map((i) => (i.id === id ? json.data : i)))
      setEditingId(null)
      setForm(emptyForm)
      toast('Social link updated')
    } catch {
      toast('Failed to update', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    try {
      const res = await fetch(`/api/admin/social-links/${deleteTarget}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      setItems(items.filter((i) => i.id !== deleteTarget))
      toast('Social link deleted')
    } catch {
      toast('Failed to delete', 'error')
    } finally {
      setDeleteTarget(null)
    }
  }

  const toggleVisibility = async (id: number, isVisible: boolean) => {
    try {
      const res = await fetch(`/api/admin/social-links/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...items.find((i) => i.id === id), isVisible }),
      })
      if (!res.ok) throw new Error()
      setItems(items.map((i) => (i.id === id ? { ...i, isVisible } : i)))
    } catch {
      toast('Failed to update visibility', 'error')
    }
  }

  const startEdit = (item: SocialLink) => {
    setEditingId(item.id)
    setForm({
      platform: item.platform,
      url: item.url,
      isVisible: item.isVisible,
      sortOrder: item.sortOrder,
    })
  }

  if (loading)
    return (
      <div className="text-text-muted font-mono text-xs animate-pulse">Loading social links...</div>
    )
  if (error) return <div className="text-error text-sm p-8 text-center">{error}</div>

  return (
    <div>
      <PageHeader title="Social Links" description={`${items.length} links`} />

      <div className="bg-surface border border-border-base p-6 mb-8">
        <h3 className="text-sm font-medium text-text-primary mb-4">
          {editingId ? 'Edit Link' : 'Add Link'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            placeholder="Platform *"
            value={form.platform}
            onChange={(e) => setForm({ ...form, platform: e.target.value })}
            className="bg-background border border-border-base px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
          />
          <input
            type="url"
            placeholder="URL *"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            className="bg-background border border-border-base px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
          />
          <input
            type="number"
            placeholder="Sort"
            value={form.sortOrder}
            onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })}
            className="bg-background border border-border-base px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
          />
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
        <div className="flex gap-2">
          <button
            onClick={editingId ? () => handleUpdate(editingId) : handleCreate}
            disabled={saving}
            className="bg-primary text-background font-mono text-xs uppercase tracking-widest px-6 py-2 rounded-sm hover:bg-primary-hover transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? (
              'Saving...'
            ) : editingId ? (
              <>
                <Save size={14} /> Save
              </>
            ) : (
              <>
                <Plus size={14} /> Add
              </>
            )}
          </button>
          {editingId && (
            <button
              onClick={() => {
                setEditingId(null)
                setForm(emptyForm)
              }}
              className="text-text-muted text-xs border border-border-base px-4 py-2 rounded-sm hover:text-text-primary transition-colors flex items-center gap-2"
            >
              <X size={14} /> Cancel
            </button>
          )}
        </div>
      </div>

      {items.length === 0 ? (
        <EmptyState title="No social links yet" description="Add your first link above" />
      ) : (
        <div className="bg-surface border border-border-base overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-base bg-background">
                <th className="text-left px-6 py-3 text-[11px] font-mono uppercase tracking-widest text-text-muted">
                  Platform
                </th>
                <th className="text-left px-6 py-3 text-[11px] font-mono uppercase tracking-widest text-text-muted">
                  URL
                </th>
                <th className="text-center px-6 py-3 text-[11px] font-mono uppercase tracking-widest text-text-muted w-24">
                  Visible
                </th>
                <th className="text-right px-6 py-3 text-[11px] font-mono uppercase tracking-widest text-text-muted w-40">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-base">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-surface-hover transition-colors group">
                  <td className="px-6 py-3 text-sm text-text-primary font-medium">
                    {item.platform}
                  </td>
                  <td className="px-6 py-3 text-xs font-mono text-text-muted truncate max-w-xs">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors inline-flex items-center gap-1"
                    >
                      {item.url} <ExternalLink size={12} />
                    </a>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <button
                      onClick={() => toggleVisibility(item.id, !item.isVisible)}
                      className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in"
                    >
                      <input
                        type="checkbox"
                        checked={item.isVisible}
                        onChange={() => toggleVisibility(item.id, !item.isVisible)}
                        className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-background border-2 appearance-none cursor-pointer z-10 transition-transform duration-200 ease-in-out"
                        style={{
                          borderColor: item.isVisible ? '#D6A85F' : '#302B25',
                          transform: item.isVisible ? 'translateX(20px)' : 'translateX(0)',
                        }}
                      />
                      <label
                        className="toggle-label block overflow-hidden h-5 rounded-full cursor-pointer transition-colors duration-200"
                        style={{ backgroundColor: item.isVisible ? '#D6A85F' : '#302B25' }}
                      />
                    </button>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => startEdit(item)}
                        className="text-text-muted hover:text-primary transition-colors"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(item.id)}
                        className="text-text-muted hover:text-error transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete Social Link"
        message="This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        variant="danger"
      />
    </div>
  )
}
