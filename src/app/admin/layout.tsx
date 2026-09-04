export const dynamic = 'force-dynamic'

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { Sidebar } from '@/components/admin/sidebar'

export const metadata = {
  title: {
    template: '%s | Admin',
    default: 'Admin Dashboard',
  },
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  const url = new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000')
  const isLoginPage = false

  if (!session) {
    return (
      <div className="min-h-screen bg-bg-primary text-text-primary antialiased font-body-md">
        {children}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary antialiased font-body-md overflow-hidden">
      <Sidebar />
      <main className="ml-64 h-screen flex flex-col bg-bg-primary overflow-hidden relative">
        <header className="h-16 border-b border-border-base bg-surface flex justify-between items-center px-gutter shrink-0 relative z-40">
          <div className="flex items-center gap-4">
            <span className="font-technical-md text-technical-md text-text-muted">/</span>
            <span className="font-technical-md text-technical-md font-bold text-text-primary">
              {session.user?.name || 'Admin'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-px h-6 bg-border-base" />
            <span className="font-technical-sm text-technical-sm text-text-muted">
              {session.user?.email}
            </span>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto px-margin-desktop py-12 scroll-smooth">
          <div className="max-w-container-max mx-auto flex flex-col gap-section-v-space-sm">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
