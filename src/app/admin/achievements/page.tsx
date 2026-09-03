'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, GripVertical } from 'lucide-react'

interface Achievement {
  id: number
  title: string
  description: string | null
  date: string | null
  sortOrder: number
}

export default function AdminAchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Achievement | null>(null)
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    sortOrder: 0,
  })

  useEffect(() => {
    fetchAchievements()
  }, [])

  async function fetchAchievements() {
    const res = await fetch('/api/admin/achievements')
    const data = await res.json()
    setAchievements(data)
    setLoading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const method = editing ? 'PUT' : 'POST'
    const url = editing ? `/api/admin/achievements/${editing.id}` : '/api/admin/achievements'

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    setForm({ title: '', description: '', date: '', sortOrder: 0 })
    setEditing(null)
    fetchAchievements()
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this achievement?')) return
    await fetch(`/api/admin/achievements/${id}`, { method: 'DELETE' })
    fetchAchievements()
  }

  function handleEdit(achievement: Achievement) {
    setEditing(achievement)
    setForm({
      title: achievement.title,
      description: achievement.description || '',
      date: achievement.date || '',
      sortOrder: achievement.sortOrder,
    })
  }

  if (loading) return <div className="p-6">Loading...</div>

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="heading-h2">Achievements</h1>
      </div>

      <form onSubmit={handleSubmit} className="card mb-8">
        <h2 className="heading-h4 mb-4">{editing ? 'Edit Achievement' : 'Add Achievement'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="input"
            required
          />
          <input
            type="text"
            placeholder="Date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="input"
          />
          <input
            type="number"
            placeholder="Sort Order"
            value={form.sortOrder}
            onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })}
            className="input"
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="input md:col-span-2"
            rows={3}
          />
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
                setForm({ title: '', description: '', date: '', sortOrder: 0 })
              }}
              className="btn-secondary"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-4">
        {achievements.map((achievement) => (
          <div key={achievement.id} className="card flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GripVertical className="text-text-muted" size={16} />
              <div>
                <h3 className="font-medium">{achievement.title}</h3>
                <p className="text-sm text-text-muted">{achievement.date}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(achievement)}
                className="p-2 hover:bg-surface rounded"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => handleDelete(achievement.id)}
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
