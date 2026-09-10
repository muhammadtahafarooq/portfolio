export const dynamic = 'force-dynamic'

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'
import {
  getProjects,
  getContactMessages,
  getSkills,
  getExperience,
  getCertifications,
  getTechnologies,
} from '@/lib/db/queries'

export const metadata = { title: 'Dashboard' }

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  const [projects, messages, skills, experience, certifications, technologies] = await Promise.all([
    getProjects(),
    getContactMessages(),
    getSkills(),
    getExperience(),
    getCertifications(),
    getTechnologies(),
  ])

  const publishedCount = projects.filter((p) => p.isVisible).length
  const draftCount = projects.length - publishedCount
  const unreadCount = messages.filter((m) => !m.isRead).length

  const recentActivity = [
    ...projects.slice(0, 3).map((p) => ({
      id: `#${p.id}`,
      entity: p.title,
      action: 'Project',
      status: p.isVisible ? 'Published' : 'Draft',
      timestamp: p.createdAt || '',
    })),
    ...messages.slice(0, 2).map((m) => ({
      id: `#${m.id}`,
      entity: m.name,
      action: 'Message',
      status: m.isRead ? 'Read' : 'Unread',
      timestamp: m.createdAt || '',
    })),
  ]

  const contentSections = [
    { label: 'Projects', count: projects.length, href: '/admin/projects' },
    { label: 'Skills', count: skills.length, href: '/admin/skills' },
    { label: 'Technologies', count: technologies.length, href: '/admin/technologies' },
    { label: 'Experience', count: experience.length, href: '/admin/experience' },
    { label: 'Certifications', count: certifications.length, href: '/admin/certifications' },
    { label: 'Messages', count: messages.length, unread: unreadCount, href: '/admin/messages' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h2
          className="text-text-primary font-bold tracking-tight"
          style={{ fontSize: '32px', lineHeight: '1.2' }}
        >
          Dashboard
        </h2>
        <p className="text-sm text-text-secondary mt-2">
          Welcome back, {session.user?.name || 'Admin'}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
        {contentSections.map((section) => (
          <Link
            key={section.label}
            href={section.href}
            className="bg-surface border border-border-base p-4 hover:border-border-hover transition-colors group"
          >
            <p className="text-[11px] font-mono uppercase tracking-widest text-text-muted mb-2">
              {section.label}
            </p>
            <p className="text-2xl font-bold text-text-primary">{section.count}</p>
            {section.unread !== undefined && section.unread > 0 && (
              <p className="text-xs text-primary mt-1">{section.unread} unread</p>
            )}
          </Link>
        ))}
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[11px] font-mono uppercase tracking-widest text-text-muted">
            Recent Activity
          </h3>
          <Link
            href="/admin/projects"
            className="text-xs font-mono text-primary hover:text-primary-hover transition-colors"
          >
            View All →
          </Link>
        </div>

        <div className="bg-surface border border-border-base overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-base bg-background">
                <th className="text-left py-3 px-4 text-[11px] font-mono uppercase tracking-widest text-text-muted w-20">
                  ID
                </th>
                <th className="text-left py-3 px-4 text-[11px] font-mono uppercase tracking-widest text-text-muted">
                  Entity
                </th>
                <th className="text-left py-3 px-4 text-[11px] font-mono uppercase tracking-widest text-text-muted w-32">
                  Type
                </th>
                <th className="text-left py-3 px-4 text-[11px] font-mono uppercase tracking-widest text-text-muted w-28">
                  Status
                </th>
                <th className="text-right py-3 px-4 text-[11px] font-mono uppercase tracking-widest text-text-muted w-36">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((activity, index) => (
                <tr
                  key={`${activity.id}-${index}`}
                  className="border-b last:border-b-0 hover:bg-surface-hover transition-colors"
                >
                  <td className="py-3 px-4 text-xs font-mono text-text-muted">{activity.id}</td>
                  <td className="py-3 px-4 text-sm text-text-primary">{activity.entity}</td>
                  <td className="py-3 px-4 text-sm text-text-secondary">{activity.action}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 text-[10px] font-mono rounded-sm border ${
                        activity.status === 'Published'
                          ? 'border-success text-success'
                          : activity.status === 'Unread'
                            ? 'border-warning text-warning'
                            : 'border-border-base text-text-secondary'
                      }`}
                    >
                      {activity.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-xs font-mono text-text-muted">
                    {activity.timestamp || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
