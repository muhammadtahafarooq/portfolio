'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react'
import { PageHeader } from '@/components/admin/page-header'
import { EmptyState } from '@/components/admin/empty-state'
import { ConfirmDialog } from '@/components/admin/confirm-dialog'
import { useToast } from '@/components/admin/toast'
import { ImageUpload } from '@/components/admin/image-upload'

interface Technology {
  id: number
  name: string
  iconUrl: string | null
  category: string | null
  sortOrder: number
}

const emptyForm = { name: '', iconUrl: '', category: '', sortOrder: 0 }

export default function TechnologiesAdmin() {
  const [items, setItems] = useState<Technology[]>([])
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
      const res = await fetch('/api/admin/technologies')
      if (!res.ok) {
        const errJson = await res.json().catch(() => null)
        throw new Error(errJson?.error || 'Failed to load technologies')
      }
      const json = await res.json()
      setItems(json.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load technologies')
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async () => {
    if (!form.name.trim()) {
      toast('Name is required', 'error')
      return
    }
    setSaving(true)
    try {
      const res = await fetch('/api/admin/technologies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, iconUrl: form.iconUrl || null }),
      })
      if (!res.ok) {
        const errJson = await res.json().catch(() => null)
        throw new Error(errJson?.error || 'Failed to create technology')
      }
      const json = await res.json()
      setItems([...items, json.data])
      setForm(emptyForm)
      toast('Technology added')
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Failed to create', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleUpdate = async (id: number) => {
    if (!form.name.trim()) {
      toast('Name is required', 'error')
      return
    }
    setSaving(true)
    try {
      const res = await fetch(`/api/admin/technologies/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, iconUrl: form.iconUrl || null }),
      })
      if (!res.ok) {
        const errJson = await res.json().catch(() => null)
        throw new Error(errJson?.error || 'Failed to update technology')
      }
      const json = await res.json()
      setItems(items.map((i) => (i.id === id ? json.data : i)))
      setEditingId(null)
      setForm(emptyForm)
      toast('Technology updated')
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Failed to update', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    try {
      const res = await fetch(`/api/admin/technologies/${deleteTarget}`, { method: 'DELETE' })
      if (!res.ok) {
        const errJson = await res.json().catch(() => null)
        throw new Error(errJson?.error || 'Failed to delete technology')
      }
      setItems(items.filter((i) => i.id !== deleteTarget))
      toast('Technology deleted')
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Failed to delete', 'error')
    } finally {
      setDeleteTarget(null)
    }
  }

  const startEdit = (item: Technology) => {
    setEditingId(item.id)
    setForm({
      name: item.name,
      iconUrl: item.iconUrl || '',
      category: item.category || '',
      sortOrder: item.sortOrder,
    })
  }

  if (loading)
    return (
      <div className="text-text-muted font-mono text-xs animate-pulse">Loading technologies...</div>
    )
  if (error) return <div className="text-error text-sm p-8 text-center">{error}</div>

  return (
    <div>
      <PageHeader title="Technologies" description={`${items.length} technologies`} />

      <div className="bg-surface border border-border-base p-6 mb-8">
        <h3 className="text-sm font-medium text-text-primary mb-4">
          {editingId ? 'Edit Technology' : 'Add Technology'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            placeholder="Name *"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="bg-background border border-border-base px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
          />
          <input
            type="text"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="bg-background border border-border-base px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
          />
          <input
            type="number"
            placeholder="Sort"
            value={form.sortOrder}
            onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })}
            className="bg-background border border-border-base px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <ImageUpload
          value={form.iconUrl}
          onChange={(url) => setForm({ ...form, iconUrl: url })}
          folder="technologies"
          label="Icon Image"
        />
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
        <EmptyState title="No technologies yet" description="Add your first technology above" />
      ) : (
        <div className="bg-surface border border-border-base overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-base bg-background">
                <th className="text-left px-6 py-3 text-[11px] font-mono uppercase tracking-widest text-text-muted">
                  Name
                </th>
                <th className="text-left px-6 py-3 text-[11px] font-mono uppercase tracking-widest text-text-muted">
                  Category
                </th>
                <th className="text-left px-6 py-3 text-[11px] font-mono uppercase tracking-widest text-text-muted w-24">
                  Order
                </th>
                <th className="text-right px-6 py-3 text-[11px] font-mono uppercase tracking-widest text-text-muted w-32">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-base">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-surface-hover transition-colors group">
                  <td className="px-6 py-3 text-sm text-text-primary">{item.name}</td>
                  <td className="px-6 py-3 text-sm text-text-secondary">{item.category || '—'}</td>
                  <td className="px-6 py-3 text-xs font-mono text-text-muted">{item.sortOrder}</td>
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
        title="Delete Technology"
        message="This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        variant="danger"
      />
    </div>
  )
}
