'use client'

import { useState, useEffect } from 'react'
import { Save } from 'lucide-react'

interface Resume {
  id: number
  content: string | null
  pdfUrl: string | null
}

export default function AdminResumePage() {
  const [resume, setResume] = useState<Resume | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [content, setContent] = useState('')
  const [pdfUrl, setPdfUrl] = useState('')

  useEffect(() => {
    fetchResume()
  }, [])

  async function fetchResume() {
    const res = await fetch('/api/admin/resume')
    const data = await res.json()
    setResume(data)
    setContent(data?.content || '')
    setPdfUrl(data?.pdfUrl || '')
    setLoading(false)
  }

  async function handleSave() {
    setSaving(true)
    await fetch('/api/admin/resume', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, pdfUrl }),
    })
    setSaving(false)
    fetchResume()
  }

  if (loading) return <div className="p-6">Loading...</div>

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="heading-h2">Resume</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary flex items-center gap-2"
        >
          <Save size={16} />
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>

      <div className="card">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">PDF URL</label>
            <input
              type="url"
              placeholder="https://..."
              value={pdfUrl}
              onChange={(e) => setPdfUrl(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Content (Markdown)</label>
            <textarea
              placeholder="Resume content in markdown..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="input min-h-[400px]"
              rows={20}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
