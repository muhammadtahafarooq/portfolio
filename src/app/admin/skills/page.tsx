'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react'
import { PageHeader } from '@/components/admin/page-header'
import { EmptyState } from '@/components/admin/empty-state'
import { ConfirmDialog } from '@/components/admin/confirm-dialog'
import { useToast } from '@/components/admin/toast'

interface Skill {
  id: number
  name: string
  category: string | null
  description: string | null
  sortOrder: number
}

const emptyForm = { name: '', category: '', description: '', sortOrder: 0 }

export default function SkillsAdmin() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      const res = await fetch('/api/admin/skills')
      if (!res.ok) throw new Error('Failed to fetch')
      const json = await res.json()
      setSkills(json.data)
    } catch {
      setError('Failed to load skills')
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
      const res = await fetch('/api/admin/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed to create')
      const json = await res.json()
      setSkills([...skills, json.data])
      setForm(emptyForm)
      toast('Skill created')
    } catch {
      toast('Failed to create skill', 'error')
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
      const res = await fetch(`/api/admin/skills/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed to update')
      const json = await res.json()
      setSkills(skills.map((s) => (s.id === id ? json.data : s)))
      setEditingId(null)
      setForm(emptyForm)
      toast('Skill updated')
    } catch {
      toast('Failed to update skill', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    try {
      const res = await fetch(`/api/admin/skills/${deleteTarget}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      setSkills(skills.filter((s) => s.id !== deleteTarget))
      toast('Skill deleted')
    } catch {
      toast('Failed to delete skill', 'error')
    } finally {
      setDeleteTarget(null)
    }
  }

  const startEdit = (skill: Skill) => {
    setEditingId(skill.id)
    setForm({
      name: skill.name,
      category: skill.category || '',
      description: skill.description || '',
      sortOrder: skill.sortOrder,
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setForm(emptyForm)
  }

  if (loading)
    return <div className="text-text-muted font-mono text-xs animate-pulse">Loading skills...</div>

  if (error) return <div className="text-error text-sm p-8 text-center">{error}</div>

  return (
    <div>
      <PageHeader title="Skills" description={`${skills.length} skills`} />

      <div className="bg-surface border border-border-base p-6 mb-8">
        <h3 className="text-sm font-medium text-text-primary mb-4">
          {editingId ? 'Edit Skill' : 'Add Skill'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Skill name *"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="bg-background border border-border-base px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
          />
          <input
            type="text"
            placeholder="Category (e.g., Frontend)"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="bg-background border border-border-base px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
          />
          <input
            type="number"
            placeholder="Sort order"
            value={form.sortOrder}
            onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })}
            className="bg-background border border-border-base px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
          />
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
                <Plus size={14} /> Add Skill
              </>
            )}
          </button>
          {editingId && (
            <button
              onClick={cancelEdit}
              className="text-text-muted text-xs border border-border-base px-4 py-2 rounded-sm hover:text-text-primary transition-colors flex items-center gap-2"
            >
              <X size={14} /> Cancel
            </button>
          )}
        </div>
      </div>

      {skills.length === 0 ? (
        <EmptyState title="No skills yet" description="Add your first skill above" />
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
              {skills.map((skill) => (
                <tr key={skill.id} className="hover:bg-surface-hover transition-colors group">
                  <td className="px-6 py-3 text-sm text-text-primary">{skill.name}</td>
                  <td className="px-6 py-3 text-sm text-text-secondary">{skill.category || '—'}</td>
                  <td className="px-6 py-3 text-xs font-mono text-text-muted">{skill.sortOrder}</td>
                  <td className="px-6 py-3 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => startEdit(skill)}
                        className="text-text-muted hover:text-primary transition-colors"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(skill.id)}
                        className="text-text-muted hover:text-error transition-colors"
                        title="Delete"
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
        title="Delete Skill"
        message="This action cannot be undone. The skill will be permanently removed."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        variant="danger"
      />
    </div>
  )
}
