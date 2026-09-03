'use client'

import { useState, useEffect } from 'react'

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

export default function ExperienceAdmin() {
  const [experience, setExperience] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState({
    role: '',
    organization: '',
    description: '',
    startDate: '',
    endDate: '',
    isCurrent: false,
    sortOrder: 0,
  })

  useEffect(() => {
    fetchExperience()
  }, [])

  const fetchExperience = async () => {
    try {
      const res = await fetch('/api/admin/experience')
      if (res.ok) {
        const data = await res.json()
        setExperience(data)
      }
    } catch (error) {
      console.error('Failed to fetch experience:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async () => {
    if (!form.role) return

    try {
      const res = await fetch('/api/admin/experience', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        const newItem = await res.json()
        setExperience([...experience, newItem])
        setForm({
          role: '',
          organization: '',
          description: '',
          startDate: '',
          endDate: '',
          isCurrent: false,
          sortOrder: 0,
        })
      }
    } catch (error) {
      console.error('Failed to create experience:', error)
    }
  }

  const handleUpdate = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/experience/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        const updated = await res.json()
        setExperience(experience.map((e) => (e.id === id ? updated : e)))
        setEditingId(null)
        setForm({
          role: '',
          organization: '',
          description: '',
          startDate: '',
          endDate: '',
          isCurrent: false,
          sortOrder: 0,
        })
      }
    } catch (error) {
      console.error('Failed to update experience:', error)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this experience?')) return

    try {
      const res = await fetch(`/api/admin/experience/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setExperience(experience.filter((e) => e.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete experience:', error)
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

  if (loading) {
    return <div className="text-text-muted">Loading...</div>
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="heading-h3">Experience</h1>
        <p className="text-text-secondary">{experience.length} entries</p>
      </div>

      {/* Create Form */}
      <div className="card mb-8">
        <h3 className="heading-h4 mb-4">Add Experience</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Role/Title"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Organization"
            value={form.organization}
            onChange={(e) => setForm({ ...form, organization: e.target.value })}
            className="input-field"
          />
        </div>
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="input-field min-h-[80px] mb-4"
        />
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm mb-1">Start Date</label>
            <input
              type="month"
              value={form.startDate}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">End Date</label>
            <input
              type="month"
              value={form.endDate}
              onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              className="input-field"
              disabled={form.isCurrent}
            />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.isCurrent}
                onChange={(e) => setForm({ ...form, isCurrent: e.target.checked })}
                className="rounded"
              />
              <span className="text-sm">Currently working here</span>
            </label>
          </div>
        </div>
        <button onClick={handleCreate} className="btn-primary">
          Add Experience
        </button>
      </div>

      {/* Experience List */}
      <div className="space-y-4">
        {experience.map((item) => (
          <div key={item.id} className="card">
            {editingId === item.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="input-field"
                    placeholder="Role"
                  />
                  <input
                    type="text"
                    value={form.organization}
                    onChange={(e) => setForm({ ...form, organization: e.target.value })}
                    className="input-field"
                    placeholder="Organization"
                  />
                </div>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="input-field min-h-[80px]"
                  placeholder="Description"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(item.id)}
                    className="btn-primary text-sm py-2"
                  >
                    Save
                  </button>
                  <button onClick={() => setEditingId(null)} className="btn-secondary text-sm py-2">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{item.role}</h3>
                    {item.organization && (
                      <p className="text-text-secondary">{item.organization}</p>
                    )}
                    {item.description && (
                      <p className="text-sm text-text-muted mt-2">{item.description}</p>
                    )}
                    <p className="text-xs text-text-muted mt-2">
                      {item.startDate} — {item.isCurrent ? 'Present' : item.endDate}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(item)} className="text-primary text-sm">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="text-error text-sm">
                      Delete
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
