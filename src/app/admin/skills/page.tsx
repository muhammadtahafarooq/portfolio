'use client'

import { useState, useEffect } from 'react'

interface Skill {
  id: number
  name: string
  category: string | null
  description: string | null
  sortOrder: number
}

export default function SkillsAdmin() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState({ name: '', category: '', description: '', sortOrder: 0 })

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      const res = await fetch('/api/admin/skills')
      if (res.ok) {
        const data = await res.json()
        setSkills(data)
      }
    } catch (error) {
      console.error('Failed to fetch skills:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async () => {
    if (!form.name) return

    try {
      const res = await fetch('/api/admin/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        const newSkill = await res.json()
        setSkills([...skills, newSkill])
        setForm({ name: '', category: '', description: '', sortOrder: 0 })
      }
    } catch (error) {
      console.error('Failed to create skill:', error)
    }
  }

  const handleUpdate = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/skills/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        const updated = await res.json()
        setSkills(skills.map((s) => (s.id === id ? updated : s)))
        setEditingId(null)
        setForm({ name: '', category: '', description: '', sortOrder: 0 })
      }
    } catch (error) {
      console.error('Failed to update skill:', error)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this skill?')) return

    try {
      const res = await fetch(`/api/admin/skills/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setSkills(skills.filter((s) => s.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete skill:', error)
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

  if (loading) {
    return <div className="text-text-muted">Loading...</div>
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="heading-h3">Skills</h1>
        <p className="text-text-secondary">{skills.length} skills</p>
      </div>

      {/* Create Form */}
      <div className="card mb-8">
        <h3 className="heading-h4 mb-4">Add Skill</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Skill name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Category (e.g., Frontend)"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="input-field"
          />
        </div>
        <button onClick={handleCreate} className="btn-primary">
          Add Skill
        </button>
      </div>

      {/* Skills List */}
      <div className="space-y-2">
        {skills.map((skill) => (
          <div key={skill.id} className="card flex items-center gap-4">
            {editingId === skill.id ? (
              <>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input-field flex-1"
                />
                <input
                  type="text"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="input-field flex-1"
                  placeholder="Category"
                />
                <button onClick={() => handleUpdate(skill.id)} className="btn-primary text-sm py-2">
                  Save
                </button>
                <button onClick={() => setEditingId(null)} className="btn-secondary text-sm py-2">
                  Cancel
                </button>
              </>
            ) : (
              <>
                <div className="flex-1">
                  <p className="font-medium">{skill.name}</p>
                  {skill.category && <p className="text-sm text-text-muted">{skill.category}</p>}
                </div>
                <button onClick={() => startEdit(skill)} className="text-primary text-sm">
                  Edit
                </button>
                <button onClick={() => handleDelete(skill.id)} className="text-error text-sm">
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
