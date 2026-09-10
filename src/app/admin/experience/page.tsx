'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react'
import { PageHeader } from '@/components/admin/page-header'
import { EmptyState } from '@/components/admin/empty-state'
import { ConfirmDialog } from '@/components/admin/confirm-dialog'
import { useToast } from '@/components/admin/toast'

interface Experience {
  id: number
  role: string
  organization: string | null
  description: string | null
  startDate: string | null
  endDate: string | null
  isCurrent: boolean
  sortOrder: number
}

const emptyForm = {
  role: '',
  organization: '',
  description: '',
  startDate: '',
  endDate: '',
  isCurrent: false,
  sortOrder: 0,
}

export default function ExperienceAdmin() {
  const [items, setItems] = useState<Experience[]>([])
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
      const res = await fetch('/api/admin/experience')
      if (!res.ok) throw new Error()
      const json = await res.json()
      setItems(json.data)
    } catch {
      setError('Failed to load experience')
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async () => {
    if (!form.role.trim()) {
      toast('Role is required', 'error')
      return
    }
    setSaving(true)
    try {
      const res = await fetch('/api/admin/experience', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      const json = await res.json()
      setItems([...items, json.data])
      setForm(emptyForm)
      toast('Experience added')
    } catch {
      toast('Failed to create', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleUpdate = async (id: number) => {
    if (!form.role.trim()) {
      toast('Role is required', 'error')
      return
    }
    setSaving(true)
    try {
      const res = await fetch(`/api/admin/experience/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      const json = await res.json()
      setItems(items.map((i) => (i.id === id ? json.data : i)))
      setEditingId(null)
      setForm(emptyForm)
      toast('Experience updated')
    } catch {
      toast('Failed to update', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    try {
      const res = await fetch(`/api/admin/experience/${deleteTarget}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      setItems(items.filter((i) => i.id !== deleteTarget))
      toast('Experience deleted')
    } catch {
      toast('Failed to delete', 'error')
    } finally {
      setDeleteTarget(null)
    }
  }

  const startEdit = (item: Experience) => {
    setEditingId(item.id)
    setForm({
      role: item.role,
      organization: item.organization || '',
      description: item.description || '',
      startDate: item.startDate || '',
      endDate: item.endDate || '',
      isCurrent: item.isCurrent,
      sortOrder: item.sortOrder,
    })
  }

  if (loading)
    return (
      <div className="text-text-muted font-mono text-xs animate-pulse">Loading experience...</div>
    )
  if (error) return <div className="text-error text-sm p-8 text-center">{error}</div>

  return (
    <div>
      <PageHeader title="Experience" description={`${items.length} entries`} />

      <div className="bg-surface border border-border-base p-6 mb-8">
        <h3 className="text-sm font-medium text-text-primary mb-4">
          {editingId ? 'Edit Experience' : 'Add Experience'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Role/Title *"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="bg-background border border-border-base px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
          />
          <input
            type="text"
            placeholder="Organization"
            value={form.organization}
            onChange={(e) => setForm({ ...form, organization: e.target.value })}
            className="bg-background border border-border-base px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="bg-background border border-border-base px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors w-full min-h-[80px] mb-4"
        />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-widest text-text-muted mb-1">
              Start Date
            </label>
            <input
              type="month"
              value={form.startDate}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              className="bg-background border border-border-base px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors w-full"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-widest text-text-muted mb-1">
              End Date
            </label>
            <input
              type="month"
              value={form.endDate}
              onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              disabled={form.isCurrent}
              className="bg-background border border-border-base px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors w-full disabled:opacity-50"
            />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isCurrent}
                onChange={(e) => setForm({ ...form, isCurrent: e.target.checked })}
                className="accent-primary"
              />
              <span className="text-sm text-text-secondary">Current</span>
            </label>
          </div>
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-widest text-text-muted mb-1">
              Sort
            </label>
            <input
              type="number"
              value={form.sortOrder}
              onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })}
              className="bg-background border border-border-base px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors w-full"
            />
          </div>
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
        <EmptyState title="No experience yet" description="Add your first experience above" />
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-surface border border-border-base p-4 flex items-start justify-between group hover:border-border-hover transition-colors"
            >
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-text-primary">{item.role}</h4>
                {item.organization && (
                  <p className="text-xs text-text-secondary mt-0.5">{item.organization}</p>
                )}
                {item.description && (
                  <p className="text-xs text-text-muted mt-2 line-clamp-2">{item.description}</p>
                )}
                <p className="text-[11px] font-mono text-text-muted mt-2">
                  {item.startDate || '—'} — {item.isCurrent ? 'Present' : item.endDate || '—'}
                </p>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-4 shrink-0">
                <button
                  onClick={() => startEdit(item)}
                  className="p-2 text-text-muted hover:text-primary transition-colors"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => setDeleteTarget(item.id)}
                  className="p-2 text-text-muted hover:text-error transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete Experience"
        message="This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        variant="danger"
      />
    </div>
  )
}
