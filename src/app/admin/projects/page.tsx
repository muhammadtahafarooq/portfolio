'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Project {
  id: number
  title: string
  slug: string
  isFeatured: boolean
  isVisible: boolean
  sortOrder: number
}

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

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

  const deleteProject = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete project:', error)
    }
  }

  if (loading) {
    return <div className="text-text-muted">Loading...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="heading-h3">Projects</h1>
          <p className="text-text-secondary">{projects.length} projects</p>
        </div>
        <Link href="/admin/projects/new" className="btn-primary">
          + New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-text-muted mb-4">No projects yet</p>
          <Link href="/admin/projects/new" className="btn-primary">
            Create your first project
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="card flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-medium">{project.title}</h3>
                <p className="text-sm text-text-muted">/{project.slug}</p>
                <div className="flex gap-2 mt-2">
                  {project.isFeatured && (
                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                      Featured
                    </span>
                  )}
                  {!project.isVisible && (
                    <span className="text-xs bg-warning/20 text-warning px-2 py-1 rounded">
                      Hidden
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/admin/projects/${project.id}`}
                  className="btn-secondary text-sm py-2 px-4"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteProject(project.id)}
                  className="text-error hover:text-error/80 text-sm py-2 px-4"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
