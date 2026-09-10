'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Github, Linkedin, MessageCircle } from 'lucide-react'

interface SocialLink {
  id: number
  platform: string
  url: string
}

interface FooterProps {
  socialLinks: SocialLink[]
}

const socialIcons: Record<string, React.ReactNode> = {
  github: <Github size={16} />,
  linkedin: <Linkedin size={16} />,
  whatsapp: <MessageCircle size={16} />,
}

export function Footer({ socialLinks }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background-secondary">
      <div className="container-main py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link href="/" className="relative group inline-block">
              <span className="text-lg font-semibold text-text group-hover:text-primary transition-colors">
                MT
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </Link>
            <p className="text-sm text-text-secondary mt-4 max-w-xs">
              CS Student at NUML | Aspiring Full-Stack Developer building practical projects in web
              development and software engineering.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-4">
            <h4 className="text-sm font-medium text-text mb-4">Navigation</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Home', href: '/' },
                { label: 'About', href: '/about' },
                { label: 'Projects', href: '/projects' },
                { label: 'Experience', href: '/experience' },
                { label: 'Education', href: '/education' },
                { label: 'Certifications', href: '/certifications' },
                { label: 'Resume', href: '/resume' },
                { label: 'Contact', href: '/contact' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-text-secondary hover:text-text transition-colors group"
                >
                  {item.label}
                  <span className="inline-block group-hover:translate-x-1 transition-transform">
                    &rarr;
                  </span>
                </Link>
              ))}
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
                  className="text-sm text-text-secondary hover:text-text transition-colors group flex items-center gap-2"
                >
                  <span className="text-text-muted group-hover:text-primary transition-colors">
                    {socialIcons[link.platform.toLowerCase()] || <Github size={16} />}
                  </span>
                  {link.platform}
                  <span className="inline-block group-hover:translate-x-1 transition-transform">
                    &rarr;
                  </span>
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
              href="/privacy"
              className="text-sm text-text-muted hover:text-text transition-colors group"
            >
              Privacy
              <span className="inline-block group-hover:translate-x-1 transition-transform">
                &rarr;
              </span>
            </Link>
            <Link
              href="/admin"
              className="text-sm text-text-muted hover:text-text transition-colors group"
            >
              Admin
              <span className="inline-block group-hover:translate-x-1 transition-transform">
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="marquee-container" aria-hidden="true">
        <div className="marquee-content">
          <span>MUHAMMAD TAHA</span>
          <span>MUHAMMAD TAHA</span>
          <span>MUHAMMAD TAHA</span>
          <span>MUHAMMAD TAHA</span>
          <span>MUHAMMAD TAHA</span>
          <span>MUHAMMAD TAHA</span>
          <span>MUHAMMAD TAHA</span>
          <span>MUHAMMAD TAHA</span>
        </div>
      </div>
    </footer>
  )
}
