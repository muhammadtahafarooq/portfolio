'use client'

import { useState, useEffect } from 'react'
import { RefreshCw, ExternalLink, Star } from 'lucide-react'
import { PageHeader } from '@/components/admin/page-header'
import { EmptyState } from '@/components/admin/empty-state'
import { useToast } from '@/components/admin/toast'

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
  const { toast } = useToast()

  useEffect(() => {
    fetchRepos()
  }, [])

  async function fetchRepos() {
    try {
      const res = await fetch('/api/admin/github/repos')
      if (!res.ok) throw new Error()
      const data = await res.json()
      setRepos(data.repos || data.data || [])
    } catch {
      toast('Failed to load repositories', 'error')
    } finally {
      setLoading(false)
    }
  }

  async function handleSync() {
    setSyncing(true)
    try {
      const res = await fetch('/api/admin/github/sync', { method: 'POST' })
      if (!res.ok) throw new Error()
      toast('Repos synced successfully', 'success')
      await fetchRepos()
    } catch {
      toast('Failed to sync repositories', 'error')
    } finally {
      setSyncing(false)
    }
  }

  if (loading)
    return (
      <div className="text-text-muted font-mono text-xs animate-pulse">Loading repositories...</div>
    )

  return (
    <div>
      <PageHeader
        title="GitHub Repositories"
        description={`${repos.length} repositories`}
        action={
          <button
            onClick={handleSync}
            disabled={syncing}
            className="bg-primary text-background font-mono text-xs uppercase tracking-widest px-6 py-2 rounded-sm hover:bg-primary-hover transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw size={14} className={syncing ? 'animate-spin' : ''} />
            {syncing ? 'Syncing...' : 'Sync Repos'}
          </button>
        }
      />

      {repos.length === 0 ? (
        <EmptyState title="No repositories found" description="Click Sync to fetch from GitHub" />
      ) : (
        <div className="space-y-3">
          {repos.map((repo) => (
            <div
              key={repo.id}
              className="bg-surface border border-border-base p-4 flex items-start justify-between hover:border-border-hover transition-colors group"
            >
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-text-primary">{repo.name}</h3>
                {repo.description && (
                  <p className="text-xs text-text-muted mt-1 truncate">{repo.description}</p>
                )}
                <div className="flex items-center gap-4 mt-2">
                  {repo.language && (
                    <span className="text-[10px] font-mono text-text-secondary bg-background border border-border-base px-2 py-0.5">
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-[10px] font-mono text-text-muted">
                    <Star size={10} /> {repo.stargazers_count}
                  </span>
                </div>
              </div>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-text-muted hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
              >
                <ExternalLink size={14} />
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
