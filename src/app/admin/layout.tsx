export const dynamic = 'force-dynamic'

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'

export const metadata = {
  title: {
    template: '%s | Admin',
    default: 'Admin Dashboard',
  },
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  // Allow access to login page without auth
  // Login page will handle its own redirects

  return (
    <div className="min-h-screen bg-background flex">
      {session && (
        <aside className="w-64 bg-surface border-r border-border p-6">
          <div className="mb-8">
            <Link href="/admin" className="text-lg font-semibold">
              Admin
            </Link>
          </div>

          <nav className="space-y-2">
            <Link
              href="/admin"
              className="block py-2 px-3 rounded-lg text-text-secondary hover:text-text hover:bg-surface-hover transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/projects"
              className="block py-2 px-3 rounded-lg text-text-secondary hover:text-text hover:bg-surface-hover transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/admin/skills"
              className="block py-2 px-3 rounded-lg text-text-secondary hover:text-text hover:bg-surface-hover transition-colors"
            >
              Skills
            </Link>
            <Link
              href="/admin/experience"
              className="block py-2 px-3 rounded-lg text-text-secondary hover:text-text hover:bg-surface-hover transition-colors"
            >
              Experience
            </Link>
            <Link
              href="/admin/messages"
              className="block py-2 px-3 rounded-lg text-text-secondary hover:text-text hover:bg-surface-hover transition-colors"
            >
              Messages
            </Link>
            <Link
              href="/admin/settings"
              className="block py-2 px-3 rounded-lg text-text-secondary hover:text-text hover:bg-surface-hover transition-colors"
            >
              Settings
            </Link>
          </nav>

          <div className="mt-auto pt-8">
            <Link
              href="/"
              className="block py-2 px-3 rounded-lg text-text-muted hover:text-text transition-colors text-sm"
            >
              ← Back to Site
            </Link>
          </div>
        </aside>
      )}

      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}
