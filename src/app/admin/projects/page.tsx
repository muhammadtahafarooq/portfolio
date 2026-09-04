'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Star, Pencil, Trash2 } from 'lucide-react'

interface Project {
  id: number
  title: string
  slug: string
  isFeatured: boolean
  isVisible: boolean
  sortOrder: number
  description: string | null
  techStack: string | null
  updatedAt: string
}

const ITEMS_PER_PAGE = 10

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/admin/projects')
      if (res.ok) {
        const data = await res.json()
        setProjects(data)
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleVisibility = async (id: number, isVisible: boolean) => {
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isVisible }),
      })
      if (res.ok) {
        setProjects(projects.map((p) => (p.id === id ? { ...p, isVisible } : p)))
      }
    } catch (error) {
      console.error('Failed to update visibility:', error)
    }
  }

  const toggleFeatured = async (id: number, isFeatured: boolean) => {
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured }),
      })
      if (res.ok) {
        setProjects(projects.map((p) => (p.id === id ? { ...p, isFeatured } : p)))
      }
    } catch (error) {
      console.error('Failed to update featured status:', error)
    }
  }

  const deleteProject = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete project:', error)
    }
  }

  const parseTechStack = (techStack: string | null): string[] => {
    if (!techStack) return []
    try {
      return JSON.parse(techStack)
    } catch {
      return []
    }
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day} ${hours}:${minutes}`
  }

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE)
  const startIdx = (page - 1) * ITEMS_PER_PAGE
  const endIdx = Math.min(startIdx + ITEMS_PER_PAGE, projects.length)
  const currentProjects = projects.slice(startIdx, endIdx)

  const getVisiblePages = (): number[] => {
    const pages: number[] = []
    const maxVisible = 5
    let start = Math.max(1, page - Math.floor(maxVisible / 2))
    const end = Math.min(totalPages, start + maxVisible - 1)
    start = Math.max(1, end - maxVisible + 1)
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    return pages
  }

  if (loading) {
    return <div className="text-text-muted font-technical-sm">Loading projects...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-end mb-8 border-b border-border-base pb-4">
        <div>
          <h2 className="font-h2 text-text-primary mb-2" style={{ fontSize: '32px' }}>
            Projects Workspace
          </h2>
          <p className="font-technical-sm text-text-muted">
            Manage, edit, and organize portfolio case studies.
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="bg-primary-container text-bg-primary font-technical-md uppercase px-6 py-3 rounded-none hover:bg-primary-fixed-dim transition-colors flex items-center gap-2 font-bold tracking-widest"
        >
          <Plus size={18} />
          New Project
        </Link>
      </div>

      <div className="bg-surface border border-border-base rounded-none overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border-base bg-[#141210]">
              <th className="px-6 py-4 font-technical-sm text-text-muted font-bold tracking-widest uppercase">
                Project Name
              </th>
              <th className="px-6 py-4 font-technical-sm text-text-muted font-bold tracking-widest uppercase w-32 text-center">
                Visibility
              </th>
              <th className="px-6 py-4 font-technical-sm text-text-muted font-bold tracking-widest uppercase w-24 text-center">
                Featured
              </th>
              <th className="px-6 py-4 font-technical-sm text-text-muted font-bold tracking-widest uppercase">
                Tech Stack
              </th>
              <th className="px-6 py-4 font-technical-sm text-text-muted font-bold tracking-widest uppercase w-48 text-right">
                Last Updated
              </th>
              <th className="px-6 py-4 font-technical-sm text-text-muted font-bold tracking-widest uppercase w-32 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-base">
            {currentProjects.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-text-muted font-technical-sm"
                >
                  No projects found
                </td>
              </tr>
            ) : (
              currentProjects.map((project) => (
                <tr key={project.id} className="hover:bg-[#24201C] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-body-md font-medium text-text-primary">
                      {project.title}
                    </div>
                    <div className="font-technical-sm text-text-muted mt-1">/{project.slug}</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
                      <input
                        type="checkbox"
                        checked={project.isVisible}
                        onChange={(e) => toggleVisibility(project.id, e.target.checked)}
                        className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-[#1C1916] border-2 appearance-none cursor-pointer z-10 transition-transform duration-200 ease-in-out"
                        style={{
                          borderColor: project.isVisible ? '#D6A85F' : '#302B25',
                          transform: project.isVisible ? 'translateX(20px)' : 'translateX(0)',
                        }}
                      />
                      <label
                        className="toggle-label block overflow-hidden h-5 rounded-full cursor-pointer transition-colors duration-200"
                        style={{
                          backgroundColor: project.isVisible ? '#D6A85F' : '#302B25',
                        }}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => toggleFeatured(project.id, !project.isFeatured)}
                      className={`transition-colors ${
                        project.isFeatured
                          ? 'text-primary-container hover:text-primary-fixed-dim'
                          : 'text-text-muted hover:text-primary-container'
                      }`}
                    >
                      <Star size={20} fill={project.isFeatured ? 'currentColor' : 'none'} />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {parseTechStack(project.techStack).map((tech) => (
                        <span
                          key={tech}
                          className="inline-block px-2 py-1 font-technical-sm text-text-primary bg-[#1C1916] border border-border-base rounded-none"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-technical-md text-text-muted">
                    {formatDate(project.updatedAt)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        href={`/admin/projects/${project.id}`}
                        className="text-text-muted hover:text-primary-container transition-colors"
                        title="Edit"
                      >
                        <Pencil size={20} />
                      </Link>
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="text-text-muted hover:text-error transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {projects.length > ITEMS_PER_PAGE && (
        <div className="flex justify-between items-center mt-6 border-t border-border-base pt-4">
          <span className="font-technical-sm text-text-muted">
            Showing {startIdx + 1}-{endIdx} of {projects.length} projects
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 border border-border-base text-text-muted font-technical-sm hover:text-text-primary hover:border-[#51483D] transition-colors disabled:opacity-50"
            >
              Prev
            </button>
            {getVisiblePages().map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1 border border-border-base font-technical-sm transition-colors ${
                  p === page
                    ? 'bg-surface text-text-primary'
                    : 'text-text-muted hover:text-text-primary hover:border-[#51483D]'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="px-3 py-1 border border-border-base text-text-muted font-technical-sm hover:text-text-primary hover:border-[#51483D] transition-colors disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
