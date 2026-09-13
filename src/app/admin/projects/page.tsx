'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Star, Pencil, Trash2 } from 'lucide-react'
import { PageHeader } from '@/components/admin/page-header'
import { EmptyState } from '@/components/admin/empty-state'
import { ConfirmDialog } from '@/components/admin/confirm-dialog'
import { useToast } from '@/components/admin/toast'

interface Project {
  id: number
  title: string
  slug: string
  isFeatured: boolean
  isVisible: boolean
  sortOrder: number
  description: string | null
  technologies: string | null
  updatedAt: string
}

const ITEMS_PER_PAGE = 10

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/admin/projects')
      if (!res.ok) {
        const errJson = await res.json().catch(() => null)
        throw new Error(errJson?.error || 'Failed to load projects')
      }
      const json = await res.json()
      setProjects(json.data)
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Failed to load projects', 'error')
    } finally {
      setLoading(false)
    }
  }

  const toggleVisibility = async (id: number, isVisible: boolean) => {
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isVisible }),
      })
      if (!res.ok) {
        const errJson = await res.json().catch(() => null)
        throw new Error(errJson?.error || 'Failed to update visibility')
      }
      setProjects(projects.map((p) => (p.id === id ? { ...p, isVisible } : p)))
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Failed to update visibility', 'error')
    }
  }

  const toggleFeatured = async (id: number, isFeatured: boolean) => {
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured }),
      })
      if (!res.ok) {
        const errJson = await res.json().catch(() => null)
        throw new Error(errJson?.error || 'Failed to update featured status')
      }
      setProjects(projects.map((p) => (p.id === id ? { ...p, isFeatured } : p)))
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Failed to update featured status', 'error')
    }
  }

  const deleteProject = async () => {
    if (!deleteTarget) return
    try {
      const res = await fetch(`/api/admin/projects/${deleteTarget}`, { method: 'DELETE' })
      if (!res.ok) {
        const errJson = await res.json().catch(() => null)
        throw new Error(errJson?.error || 'Failed to delete project')
      }
      setProjects(projects.filter((p) => p.id !== deleteTarget))
      toast('Project deleted')
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Failed to delete project', 'error')
    } finally {
      setDeleteTarget(null)
    }
  }

  const parseTechnologies = (tech: string | null): string[] => {
    if (!tech) return []
    try {
      return JSON.parse(tech)
    } catch {
      return []
    }
  }

  const formatDate = (dateString: string): string => {
    if (!dateString) return '—'
    const date = new Date(dateString)
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  }

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE)
  const startIdx = (page - 1) * ITEMS_PER_PAGE
  const currentProjects = projects.slice(startIdx, startIdx + ITEMS_PER_PAGE)

  if (loading)
    return (
      <div className="text-text-muted font-mono text-xs animate-pulse">Loading projects...</div>
    )

  return (
    <div>
      <PageHeader
        title="Projects"
        description={`${projects.length} projects`}
        action={
          <Link
            href="/admin/projects/new"
            className="bg-primary text-background font-mono text-xs uppercase tracking-widest px-6 py-2 rounded-sm hover:bg-primary-hover transition-colors flex items-center gap-2"
          >
            <Plus size={14} /> New Project
          </Link>
        }
      />

      {projects.length === 0 ? (
        <EmptyState
          title="No projects yet"
          description="Create your first project"
          action={
            <Link
              href="/admin/projects/new"
              className="bg-primary text-background font-mono text-xs uppercase tracking-widest px-6 py-2 rounded-sm hover:bg-primary-hover transition-colors inline-flex items-center gap-2"
            >
              <Plus size={14} /> New Project
            </Link>
          }
        />
      ) : (
        <div className="bg-surface border border-border-base overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border-base bg-background">
                <th className="px-6 py-3 text-[11px] font-mono uppercase tracking-widest text-text-muted">
                  Project
                </th>
                <th className="px-6 py-3 text-[11px] font-mono uppercase tracking-widest text-text-muted w-32 text-center">
                  Visible
                </th>
                <th className="px-6 py-3 text-[11px] font-mono uppercase tracking-widest text-text-muted w-24 text-center">
                  Featured
                </th>
                <th className="px-6 py-3 text-[11px] font-mono uppercase tracking-widest text-text-muted">
                  Technologies
                </th>
                <th className="px-6 py-3 text-[11px] font-mono uppercase tracking-widest text-text-muted w-32 text-right">
                  Updated
                </th>
                <th className="px-6 py-3 text-[11px] font-mono uppercase tracking-widest text-text-muted w-32 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-base">
              {currentProjects.map((project) => (
                <tr key={project.id} className="hover:bg-surface-hover transition-colors group">
                  <td className="px-6 py-3">
                    <div className="text-sm font-medium text-text-primary">{project.title}</div>
                    <div className="text-[11px] font-mono text-text-muted mt-0.5">
                      /{project.slug}
                    </div>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
                      <input
                        type="checkbox"
                        checked={project.isVisible}
                        onChange={(e) => toggleVisibility(project.id, e.target.checked)}
                        className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-background border-2 appearance-none cursor-pointer z-10 transition-transform duration-200 ease-in-out"
                        style={{
                          borderColor: project.isVisible ? '#D6A85F' : '#302B25',
                          transform: project.isVisible ? 'translateX(20px)' : 'translateX(0)',
                        }}
                      />
                      <label
                        className="toggle-label block overflow-hidden h-5 rounded-full cursor-pointer transition-colors duration-200"
                        style={{ backgroundColor: project.isVisible ? '#D6A85F' : '#302B25' }}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <button
                      onClick={() => toggleFeatured(project.id, !project.isFeatured)}
                      className={`transition-colors ${project.isFeatured ? 'text-primary hover:text-primary-hover' : 'text-text-muted hover:text-primary'}`}
                    >
                      <Star size={18} fill={project.isFeatured ? 'currentColor' : 'none'} />
                    </button>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex flex-wrap gap-1">
                      {parseTechnologies(project.technologies)
                        .slice(0, 3)
                        .map((tech) => (
                          <span
                            key={tech}
                            className="inline-block px-2 py-0.5 text-[10px] font-mono text-text-secondary bg-background border border-border-base rounded-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      {parseTechnologies(project.technologies).length > 3 && (
                        <span className="text-[10px] font-mono text-text-muted">
                          +{parseTechnologies(project.technologies).length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-3 text-right text-xs font-mono text-text-muted">
                    {formatDate(project.updatedAt)}
                  </td>
                  <td className="px-6 py-3 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        href={`/admin/projects/${project.id}`}
                        className="text-text-muted hover:text-primary transition-colors"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </Link>
                      <button
                        onClick={() => setDeleteTarget(project.id)}
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

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6 border-t border-border-base pt-4">
          <span className="text-xs font-mono text-text-muted">
            Showing {startIdx + 1}-{Math.min(startIdx + ITEMS_PER_PAGE, projects.length)} of{' '}
            {projects.length}
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 border border-border-base text-text-muted text-xs font-mono hover:text-text-primary hover:border-border-hover transition-colors disabled:opacity-50"
            >
              Prev
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const start = Math.max(1, Math.min(page - 2, totalPages - 4))
              const p = start + i
              if (p > totalPages) return null
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-3 py-1 border border-border-base text-xs font-mono transition-colors ${p === page ? 'bg-surface text-text-primary' : 'text-text-muted hover:text-text-primary hover:border-border-hover'}`}
                >
                  {p}
                </button>
              )
            })}
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="px-3 py-1 border border-border-base text-text-muted text-xs font-mono hover:text-text-primary hover:border-border-hover transition-colors disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete Project"
        message="This will permanently remove the project and all its data."
        onConfirm={deleteProject}
        onCancel={() => setDeleteTarget(null)}
        variant="danger"
      />
    </div>
  )
}
