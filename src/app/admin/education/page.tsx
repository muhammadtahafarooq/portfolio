'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, GripVertical } from 'lucide-react'

interface Education {
  id: number
  institution: string
  qualification: string | null
  program: string | null
  description: string | null
  startDate: string | null
  endDate: string | null
  sortOrder: number
}

export default function AdminEducationPage() {
  const [education, setEducation] = useState<Education[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Education | null>(null)
  const [form, setForm] = useState({
    institution: '',
    qualification: '',
    program: '',
    description: '',
    startDate: '',
    endDate: '',
    sortOrder: 0,
  })

  useEffect(() => {
    fetchEducation()
  }, [])

  async function fetchEducation() {
    const res = await fetch('/api/admin/education')
    const data = await res.json()
    setEducation(data)
    setLoading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const method = editing ? 'PUT' : 'POST'
    const url = editing ? `/api/admin/education/${editing.id}` : '/api/admin/education'

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    setForm({
      institution: '',
      qualification: '',
      program: '',
      description: '',
      startDate: '',
      endDate: '',
      sortOrder: 0,
    })
    setEditing(null)
    fetchEducation()
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this education?')) return
    await fetch(`/api/admin/education/${id}`, { method: 'DELETE' })
    fetchEducation()
  }

  function handleEdit(edu: Education) {
    setEditing(edu)
    setForm({
      institution: edu.institution,
      qualification: edu.qualification || '',
      program: edu.program || '',
      description: edu.description || '',
      startDate: edu.startDate || '',
      endDate: edu.endDate || '',
      sortOrder: edu.sortOrder,
    })
  }

  if (loading) return <div className="p-6">Loading...</div>

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="heading-h2">Education</h1>
      </div>

      <form onSubmit={handleSubmit} className="card mb-8">
        <h2 className="heading-h4 mb-4">{editing ? 'Edit Education' : 'Add Education'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="Institution"
            value={form.institution}
            onChange={(e) => setForm({ ...form, institution: e.target.value })}
            className="input"
            required
          />
          <input
            placeholder="Qualification"
            value={form.qualification}
            onChange={(e) => setForm({ ...form, qualification: e.target.value })}
            className="input"
          />
          <input
            placeholder="Program"
            value={form.program}
            onChange={(e) => setForm({ ...form, program: e.target.value })}
            className="input"
          />
          <input
            type="number"
            placeholder="Sort Order"
            value={form.sortOrder}
            onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })}
            className="input"
          />
          <input
            type="text"
            placeholder="Start Date"
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            className="input"
          />
          <input
            type="text"
            placeholder="End Date"
            value={form.endDate}
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
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
                setForm({
                  institution: '',
                  qualification: '',
                  program: '',
                  description: '',
                  startDate: '',
                  endDate: '',
                  sortOrder: 0,
                })
              }}
              className="btn-secondary"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-4">
        {education.map((edu) => (
          <div key={edu.id} className="card flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GripVertical className="text-text-muted" size={16} />
              <div>
                <h3 className="font-medium">{edu.institution}</h3>
                <p className="text-sm text-text-muted">
                  {edu.qualification} {edu.program && `• ${edu.program}`}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(edu)} className="p-2 hover:bg-surface rounded">
                <Pencil size={16} />
              </button>
              <button
                onClick={() => handleDelete(edu.id)}
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
