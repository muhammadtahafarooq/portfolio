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
  User,
  Globe,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Profile', href: '/admin/profile', icon: User },
  { label: 'Projects', href: '/admin/projects', icon: FolderKanban },
]

const contentItems = [
  { label: 'About', href: '/admin/about', icon: Globe },
  { label: 'Skills', href: '/admin/skills', icon: Code2 },
  { label: 'Technologies', href: '/admin/technologies', icon: Code2 },
  { label: 'Experience', href: '/admin/experience', icon: Briefcase },
  { label: 'Education', href: '/admin/education', icon: GraduationCap },
  { label: 'Certifications', href: '/admin/certifications', icon: Award },
  { label: 'Achievements', href: '/admin/achievements', icon: Trophy },
]

const footerItems = [
  { label: 'Resume', href: '/admin/resume', icon: FileText },
  { label: 'Social Links', href: '/admin/social-links', icon: Link2 },
  { label: 'Messages', href: '/admin/messages', icon: MessageSquare },
]

export function Sidebar() {
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)

  return (
    <nav className="h-screen w-64 fixed left-0 top-0 overflow-y-auto bg-surface border-r border-border-base flex flex-col py-6 px-3 z-50">
      <div className="mb-8 px-3 flex flex-col gap-1">
        <h1 className="text-lg font-bold text-primary tracking-tight leading-none">
          Portfolio CMS
        </h1>
        <span className="text-[11px] font-mono text-text-muted">v1.1.0</span>
      </div>

      <div className="flex-1 flex flex-col gap-0.5">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-3 py-2 transition-colors duration-150 rounded-sm text-sm',
              isActive(item.href)
                ? 'text-primary font-medium bg-surface-container'
                : 'text-text-muted hover:bg-surface-hover hover:text-text-primary'
            )}
          >
            <item.icon size={16} />
            <span className="font-mono text-xs">{item.label}</span>
          </Link>
        ))}

        <div className="h-px bg-border-base my-2 mx-3" />

        {contentItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-3 py-2 transition-colors duration-150 rounded-sm text-sm',
              isActive(item.href)
                ? 'text-primary font-medium bg-surface-container'
                : 'text-text-muted hover:bg-surface-hover hover:text-text-primary'
            )}
          >
            <item.icon size={16} />
            <span className="font-mono text-xs">{item.label}</span>
          </Link>
        ))}

        <div className="h-px bg-border-base my-2 mx-3" />

        {footerItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-3 py-2 transition-colors duration-150 rounded-sm text-sm',
              isActive(item.href)
                ? 'text-primary font-medium bg-surface-container'
                : 'text-text-muted hover:bg-surface-hover hover:text-text-primary'
            )}
          >
            <item.icon size={16} />
            <span className="font-mono text-xs flex-1">{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="mt-auto pt-4 flex flex-col gap-0.5 border-t border-border-base">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 transition-colors duration-150 text-text-muted hover:bg-surface-hover hover:text-text-primary rounded-sm text-sm"
        >
          <Home size={16} />
          <span className="font-mono text-xs">Homepage</span>
        </Link>
        <Link
          href="/admin/settings"
          className={cn(
            'flex items-center gap-3 px-3 py-2 transition-colors duration-150 rounded-sm text-sm',
            isActive('/admin/settings')
              ? 'text-primary font-medium bg-surface-container'
              : 'text-text-muted hover:bg-surface-hover hover:text-text-primary'
          )}
        >
          <Settings size={16} />
          <span className="font-mono text-xs">Settings</span>
        </Link>
      </div>
    </nav>
  )
}
