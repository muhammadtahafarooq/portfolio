'use client'

import { useState, useEffect } from 'react'
import { RefreshCw, ExternalLink } from 'lucide-react'

interface Repo {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  topics: string[]
}

export default function AdminGithubPage() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)

  useEffect(() => {
    fetchRepos()
  }, [])

  async function fetchRepos() {
    const res = await fetch('/api/admin/github/repos')
    const data = await res.json()
    setRepos(data.repos || [])
    setLoading(false)
  }

  async function handleSync() {
    setSyncing(true)
    await fetch('/api/admin/github/sync', { method: 'POST' })
    setSyncing(false)
    fetchRepos()
  }

  if (loading) return <div className="p-6">Loading...</div>

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="heading-h2">GitHub Repositories</h1>
        <button
          onClick={handleSync}
          disabled={syncing}
          className="btn-primary flex items-center gap-2"
        >
          <RefreshCw size={16} className={syncing ? 'animate-spin' : ''} />
          {syncing ? 'Syncing...' : 'Sync Repos'}
        </button>
      </div>

      {repos.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-text-muted">No repositories found. Click Sync to fetch from GitHub.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {repos.map((repo) => (
            <div key={repo.id} className="card">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{repo.name}</h3>
                  {repo.description && (
                    <p className="text-sm text-text-muted mt-1">{repo.description}</p>
                  )}
                  <div className="flex items-center gap-4 mt-2">
                    {repo.language && (
                      <span className="text-xs bg-background-secondary px-2 py-1 rounded">
                        {repo.language}
                      </span>
                    )}
                    <span className="text-xs text-text-muted">★ {repo.stargazers_count}</span>
                  </div>
                </div>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-surface rounded"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
