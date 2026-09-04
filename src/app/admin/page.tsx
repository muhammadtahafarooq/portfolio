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

  const publishedCount = projects.filter((p) => p.isVisible).length
  const draftCount = projects.length - publishedCount
  const unreadCount = messages.filter((m) => !m.isRead).length
  const repoCount = projects.filter((p) => p.githubRepoId).length

  const recentActivity = [
    ...projects.slice(0, 3).map((p) => ({
      id: `#${p.id}`,
      entity: p.title,
      action: 'Project created',
      status: p.isVisible ? 'Published' : 'Draft',
      timestamp: p.createdAt || '',
    })),
    ...messages.slice(0, 2).map((m) => ({
      id: `#${m.id}`,
      entity: m.name,
      action: 'Message received',
      status: m.isRead ? 'Read' : 'Unread',
      timestamp: m.createdAt || '',
    })),
  ]

  return (
    <div>
      <div className="mb-8">
        <h2 className="heading-h3 text-text-primary">Dashboard</h2>
        <p className="font-body-md text-body text-text-secondary mt-2">
          Welcome back, {session.user?.name || 'Admin'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-surface border border-border-base rounded-sm p-6 flex flex-col gap-4">
          <p className="font-technical-sm text-technical-sm uppercase tracking-wider text-text-muted">
            STATUS
          </p>
          <p className="font-h3 text-[32px] text-text-primary">Live</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success" />
            <span className="text-sm text-text-secondary">All systems operational</span>
          </div>
          <div className="flex justify-between items-center mt-auto pt-4 border-t border-border-base">
            <span className="font-technical-sm text-technical-sm text-text-muted">Last update</span>
            <span className="font-technical-sm text-technical-sm text-text-secondary">2h ago</span>
          </div>
        </div>

        <div className="bg-surface border border-border-base rounded-sm p-6 flex flex-col gap-4">
          <p className="font-technical-sm text-technical-sm uppercase tracking-wider text-text-muted">
            PROJECTS
          </p>
          <p className="font-h3 text-[32px] text-text-primary">{projects.length}</p>
          <p className="text-sm text-text-secondary">
            {publishedCount} Published, {draftCount} Drafts
          </p>
          <div className="flex justify-between items-center mt-auto pt-4 border-t border-border-base">
            <span className="font-technical-sm text-technical-sm text-text-muted">This month</span>
            <span className="font-technical-sm text-technical-sm text-primary">+2 new</span>
          </div>
        </div>

        <div className="bg-surface border border-border-base rounded-sm p-6 flex flex-col gap-4">
          <p className="font-technical-sm text-technical-sm uppercase tracking-wider text-text-muted">
            MESSAGES
          </p>
          <p className="font-h3 text-[32px] text-text-primary">{messages.length}</p>
          <p className="text-sm text-text-secondary">{unreadCount} Unread inquiries</p>
          <div className="flex justify-between items-center mt-auto pt-4 border-t border-border-base">
            <span className="font-technical-sm text-technical-sm text-text-muted">
              Response rate
            </span>
            <span className="font-technical-sm text-technical-sm text-text-secondary">98%</span>
          </div>
        </div>

        <div className="bg-surface border border-border-base rounded-sm p-6 flex flex-col gap-4">
          <p className="font-technical-sm text-technical-sm uppercase tracking-wider text-text-muted">
            GH SYNC
          </p>
          <p className="font-h3 text-[32px] text-text-primary">OK</p>
          <p className="text-sm text-text-secondary">{repoCount} Repositories tracked</p>
          <div className="flex justify-between items-center mt-auto pt-4 border-t border-border-base">
            <span className="font-technical-sm text-technical-sm text-text-muted">Last sync</span>
            <span className="font-technical-sm text-technical-sm text-text-secondary">12m ago</span>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-technical-md text-technical-md uppercase tracking-widest text-text-muted">
            RECENT ACTIVITY
          </h3>
          <Link
            href="/admin/projects"
            className="font-technical-sm text-technical-sm text-primary hover:text-primary-hover transition-colors inline-flex items-center gap-1"
          >
            View All <span className="text-xs">→</span>
          </Link>
        </div>

        <div className="bg-surface border border-border-base rounded-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-surface-container">
                <th className="text-left py-3 px-4 font-technical-sm text-technical-sm uppercase tracking-wider text-text-muted w-32">
                  ID
                </th>
                <th className="text-left py-3 px-4 font-technical-sm text-technical-sm uppercase tracking-wider text-text-muted">
                  Entity
                </th>
                <th className="text-left py-3 px-4 font-technical-sm text-technical-sm uppercase tracking-wider text-text-muted w-48">
                  Action
                </th>
                <th className="text-left py-3 px-4 font-technical-sm text-technical-sm uppercase tracking-wider text-text-muted w-32">
                  Status
                </th>
                <th className="text-right py-3 px-4 font-technical-sm text-technical-sm uppercase tracking-wider text-text-muted w-40">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((activity, index) => (
                <tr
                  key={`${activity.id}-${index}`}
                  className="border-b last:border-b-0 hover:bg-surface-container transition-colors"
                >
                  <td className="py-3 px-4 font-technical-sm text-technical-sm text-text-muted">
                    {activity.id}
                  </td>
                  <td className="py-3 px-4 text-sm text-text-primary">{activity.entity}</td>
                  <td className="py-3 px-4 text-sm text-text-secondary">{activity.action}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-technical-sm rounded-sm border ${
                        activity.status === 'Published'
                          ? 'border-primary text-primary'
                          : activity.status === 'Unread'
                            ? 'border-warning text-warning'
                            : 'border-border-base text-text-secondary'
                      }`}
                    >
                      {activity.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-technical-sm text-technical-sm text-text-muted">
                    {activity.timestamp}
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
