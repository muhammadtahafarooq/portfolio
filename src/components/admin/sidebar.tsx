'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FolderKanban,
  Code2,
  Briefcase,
  GraduationCap,
  Award,
  Trophy,
  FileText,
  Link2,
  MessageSquare,
  Settings,
  Home,
  RefreshCw,
  User,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Projects', href: '/admin/projects', icon: FolderKanban },
  { label: 'GitHub Sync', href: '/admin/github', icon: RefreshCw },
  { label: 'Profile', href: '/admin/profile', icon: User },
]

const contentItems = [
  { label: 'About', href: '/admin/about', icon: User },
  { label: 'Skills', href: '/admin/skills', icon: Code2 },
  { label: 'Experience', href: '/admin/experience', icon: Briefcase },
  { label: 'Education', href: '/admin/education', icon: GraduationCap },
  { label: 'Certifications', href: '/admin/certifications', icon: Award },
  { label: 'Achievements', href: '/admin/achievements', icon: Trophy },
]

const footerItems = [
  { label: 'Resume', href: '/admin/resume', icon: FileText },
  { label: 'Social Links', href: '/admin/social-links', icon: Link2 },
  { label: 'Contact Messages', href: '/admin/messages', icon: MessageSquare, badge: 0 },
]

export function Sidebar() {
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)

  return (
    <nav className="h-screen w-64 fixed left-0 top-0 overflow-y-auto bg-surface border-r border-border-base flex flex-col py-gutter px-4 z-50">
      <div className="mb-12 px-2 flex flex-col gap-1">
        <h1 className="font-h3 text-[24px] font-bold text-primary tracking-tighter leading-none">
          Portfolio CMS
        </h1>
        <span className="font-technical-sm text-technical-sm text-text-muted">V1.0.4-Stable</span>
      </div>

      <div className="flex-1 flex flex-col gap-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-3 py-2 transition-colors duration-150 ease-in-out rounded-sm',
              isActive(item.href)
                ? 'text-primary font-bold border-r-2 border-primary bg-surface-container-high'
                : 'text-text-muted font-medium hover:bg-surface-container-low hover:text-text-primary'
            )}
          >
            <item.icon size={18} />
            <span className="font-technical-sm text-technical-sm">{item.label}</span>
          </Link>
        ))}

        <div className="h-px bg-border-base my-2" />

        {contentItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-3 py-2 transition-colors duration-150 ease-in-out rounded-sm',
              isActive(item.href)
                ? 'text-primary font-bold border-r-2 border-primary bg-surface-container-high'
                : 'text-text-muted font-medium hover:bg-surface-container-low hover:text-text-primary'
            )}
          >
            <item.icon size={18} />
            <span className="font-technical-sm text-technical-sm">{item.label}</span>
          </Link>
        ))}

        <div className="h-px bg-border-base my-2" />

        {footerItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-3 py-2 transition-colors duration-150 ease-in-out rounded-sm',
              isActive(item.href)
                ? 'text-primary font-bold border-r-2 border-primary bg-surface-container-high'
                : 'text-text-muted font-medium hover:bg-surface-container-low hover:text-text-primary'
            )}
          >
            <item.icon size={18} />
            <span className="font-technical-sm text-technical-sm flex-1">{item.label}</span>
            {item.badge !== undefined && item.badge > 0 && (
              <span className="bg-primary text-bg-primary font-technical-sm text-[9px] px-1.5 py-0.5 rounded-sm">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </div>

      <div className="mt-auto pt-4 flex flex-col gap-1 border-t border-border-base">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 transition-colors duration-150 ease-in-out text-text-muted font-medium hover:bg-surface-container-low hover:text-text-primary rounded-sm"
        >
          <Home size={18} />
          <span className="font-technical-sm text-technical-sm">Homepage</span>
        </Link>
        <Link
          href="/admin/settings"
          className="flex items-center gap-3 px-3 py-2 transition-colors duration-150 ease-in-out text-text-muted font-medium hover:bg-surface-container-low hover:text-text-primary rounded-sm"
        >
          <Settings size={18} />
          <span className="font-technical-sm text-technical-sm">Settings</span>
        </Link>
      </div>
    </nav>
  )
}
