import Link from 'next/link'
import { getSocialLinks } from '@/lib/db/queries'

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const socialLinks = await getSocialLinks()

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <nav className="container-main h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold">
            MT
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/about"
              className="text-sm text-text-secondary hover:text-text transition-colors"
            >
              About
            </Link>
            <Link
              href="/projects"
              className="text-sm text-text-secondary hover:text-text transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/contact"
              className="text-sm text-text-secondary hover:text-text transition-colors"
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-text transition-colors"
              >
                {link.platform}
              </a>
            ))}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container-main flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-text-muted">
            © {new Date().getFullYear()} Muhammad Taha. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/contact"
              className="text-sm text-text-muted hover:text-text transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/admin"
              className="text-sm text-text-muted hover:text-text transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
