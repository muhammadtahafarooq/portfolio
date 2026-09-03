'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, GripVertical } from 'lucide-react'

interface Certification {
  id: number
  name: string
  issuer: string | null
  date: string | null
  description: string | null
  sortOrder: number
}

export default function AdminCertificationsPage() {
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Certification | null>(null)
  const [form, setForm] = useState({
    name: '',
    issuer: '',
    date: '',
    description: '',
    sortOrder: 0,
  })

  useEffect(() => {
    fetchCertifications()
  }, [])

  async function fetchCertifications() {
    const res = await fetch('/api/admin/certifications')
    const data = await res.json()
    setCertifications(data)
    setLoading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const method = editing ? 'PUT' : 'POST'
    const url = editing ? `/api/admin/certifications/${editing.id}` : '/api/admin/certifications'

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    setForm({ name: '', issuer: '', date: '', description: '', sortOrder: 0 })
    setEditing(null)
    fetchCertifications()
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this certification?')) return
    await fetch(`/api/admin/certifications/${id}`, { method: 'DELETE' })
    fetchCertifications()
  }

  function handleEdit(cert: Certification) {
    setEditing(cert)
    setForm({
      name: cert.name,
      issuer: cert.issuer || '',
      date: cert.date || '',
      description: cert.description || '',
      sortOrder: cert.sortOrder,
    })
  }

  if (loading) return <div className="p-6">Loading...</div>

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="heading-h2">Certifications</h1>
      </div>

      <form onSubmit={handleSubmit} className="card mb-8">
        <h2 className="heading-h4 mb-4">{editing ? 'Edit Certification' : 'Add Certification'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input"
            required
          />
          <input
            placeholder="Issuer"
            value={form.issuer}
            onChange={(e) => setForm({ ...form, issuer: e.target.value })}
            className="input"
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
                setForm({ name: '', issuer: '', date: '', description: '', sortOrder: 0 })
              }}
              className="btn-secondary"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-4">
        {certifications.map((cert) => (
          <div key={cert.id} className="card flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GripVertical className="text-text-muted" size={16} />
              <div>
                <h3 className="font-medium">{cert.name}</h3>
                <p className="text-sm text-text-muted">
                  {cert.issuer} {cert.date && `• ${cert.date}`}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(cert)} className="p-2 hover:bg-surface rounded">
                <Pencil size={16} />
              </button>
              <button
                onClick={() => handleDelete(cert.id)}
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
