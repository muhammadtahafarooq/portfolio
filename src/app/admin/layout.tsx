export const dynamic = 'force-dynamic'

import { Sidebar } from '@/components/admin/sidebar'
import { ToastProvider } from '@/components/admin/toast'
import { getSession } from '@/lib/auth/session'

export const metadata = {
  title: {
    template: '%s | Admin',
    default: 'Admin Dashboard',
  },
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  let session = null
  try {
    session = await getSession()
  } catch (err) {
    console.error('Admin session check failed:', err)
  }

  if (!session) {
    return (
      <ToastProvider>
        <div className="min-h-screen bg-background text-text-primary antialiased">{children}</div>
      </ToastProvider>
    )
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-background text-text-primary antialiased overflow-hidden">
        <Sidebar />
        <main className="ml-64 h-screen flex flex-col bg-background overflow-hidden relative">
          <header className="h-14 border-b border-border-base bg-surface flex justify-between items-center px-6 shrink-0 relative z-40">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-text-muted">/</span>
              <span className="text-xs font-mono font-bold text-text-primary">
                {session.name || 'Admin'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-px h-5 bg-border-base" />
              <span className="text-[11px] font-mono text-text-muted">{session.email}</span>
            </div>
          </header>
          <div className="flex-1 overflow-y-auto px-16 py-10">
            <div className="max-w-[1200px] mx-auto">{children}</div>
          </div>
        </main>
      </div>
    </ToastProvider>
  )
}
