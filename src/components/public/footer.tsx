import Link from 'next/link'
import { Github, Linkedin, MessageCircle } from 'lucide-react'

interface SocialLink {
  id: number
  platform: string
  url: string
}

interface FooterProps {
  socialLinks: SocialLink[]
}

export function Footer({ socialLinks }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background-secondary">
      <div className="container-main py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link
              href="/"
              className="text-lg font-semibold text-text hover:text-primary transition-colors"
            >
              MT
            </Link>
            <p className="text-sm text-text-secondary mt-4 max-w-xs">
              Full-Stack + AI Developer crafting innovative digital experiences at the intersection
              of design and technology.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-4">
            <h4 className="text-sm font-medium text-text mb-4">Navigation</h4>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/"
                className="text-sm text-text-secondary hover:text-text transition-colors"
              >
                Home
              </Link>
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
                href="/experience"
                className="text-sm text-text-secondary hover:text-text transition-colors"
              >
                Experience
              </Link>
              <Link
                href="/contact"
                className="text-sm text-text-secondary hover:text-text transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/resume"
                className="text-sm text-text-secondary hover:text-text transition-colors"
              >
                Resume
              </Link>
            </div>
          </div>

          {/* Social */}
          <div className="md:col-span-4">
            <h4 className="text-sm font-medium text-text mb-4">Connect</h4>
            <div className="flex flex-col gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary hover:text-text transition-colors"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-text-muted">
            &copy; {currentYear} Muhammad Taha. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/admin"
              className="text-sm text-text-muted hover:text-text transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
