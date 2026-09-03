'use client'

import Link from 'next/link'
import { Github, Linkedin, Mail, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-main mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="heading-h4 font-bold">
              MT
            </Link>
            <p className="text-text-muted text-sm mt-4 max-w-xs">
              Full-Stack + AI Developer crafting innovative solutions at the intersection of design
              and technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium text-text-primary mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link
                href="/about"
                className="block text-sm text-text-muted hover:text-text-primary transition-colors"
              >
                About
              </Link>
              <Link
                href="/projects"
                className="block text-sm text-text-muted hover:text-text-primary transition-colors"
              >
                Projects
              </Link>
              <Link
                href="/experience"
                className="block text-sm text-text-muted hover:text-text-primary transition-colors"
              >
                Experience
              </Link>
              <Link
                href="/contact"
                className="block text-sm text-text-muted hover:text-text-primary transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-medium text-text-primary mb-4">Connect</h4>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="mailto:hello@example.com"
                className="text-text-muted hover:text-text-primary transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-text-muted text-sm">
          © {new Date().getFullYear()} Muhammad Taha. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
