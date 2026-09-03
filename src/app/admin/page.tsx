export const dynamic = 'force-dynamic'

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'
import { getProjects, getContactMessages, getSkills, getExperience } from '@/lib/db/queries'

export const metadata = {
  title: 'Dashboard',
}

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/admin/login')
  }

  const [projects, messages, skills, experience] = await Promise.all([
    getProjects(),
    getContactMessages(),
    getSkills(),
    getExperience(),
  ])

  const stats = [
    { label: 'Projects', value: projects.length, href: '/admin/projects' },
    { label: 'Skills', value: skills.length, href: '/admin/skills' },
    { label: 'Experience', value: experience.length, href: '/admin/experience' },
    { label: 'Messages', value: messages.length, href: '/admin/messages' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="heading-h3">Dashboard</h1>
        <p className="text-text-secondary">Welcome back, {session.user?.name || 'Admin'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="card card-hover">
            <p className="technical-text text-text-muted mb-1">{stat.label}</p>
            <p className="text-4xl font-semibold">{stat.value}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Messages */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="heading-h4">Recent Messages</h2>
            <Link href="/admin/messages" className="text-sm text-primary hover:text-primary-hover">
              View All
            </Link>
          </div>

          {messages.length === 0 ? (
            <p className="text-text-muted">No messages yet</p>
          ) : (
            <div className="space-y-3">
              {messages.slice(0, 5).map((msg) => (
                <div key={msg.id} className="py-2 border-b border-border last:border-0">
                  <p className="font-medium">{msg.name}</p>
                  <p className="text-sm text-text-muted truncate">{msg.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h2 className="heading-h4 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href="/admin/projects/new"
              className="block py-2 px-3 rounded-lg bg-surface-hover hover:bg-background-secondary transition-colors"
            >
              + New Project
            </Link>
            <Link
              href="/admin/github"
              className="block py-2 px-3 rounded-lg bg-surface-hover hover:bg-background-secondary transition-colors"
            >
              Sync GitHub Repos
            </Link>
            <Link
              href="/"
              target="_blank"
              className="block py-2 px-3 rounded-lg bg-surface-hover hover:bg-background-secondary transition-colors"
            >
              View Live Site ↗
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
