export const dynamic = 'force-dynamic'

import { Metadata } from 'next'
import Link from 'next/link'
import { ContactForm } from './contact-form'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Muhammad Taha - Full-Stack + AI Developer',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="section-padding container-main">
        <p className="section-label">Get in Touch</p>
        <h1 className="heading-h1 mb-6">Contact</h1>
        <p className="body-text-lg text-text-secondary max-w-2xl">
          Have a project in mind or want to collaborate? I&apos;m always open to discussing new
          opportunities and interesting ideas.
        </p>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-background-secondary">
        <div className="container-main">
          <div className="grid-editorial">
            {/* Contact Form */}
            <div className="md:col-span-7">
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div className="md:col-span-5">
              <div className="space-y-8">
                <div>
                  <h2 className="heading-h4 mb-4">Let&apos;s Connect</h2>
                  <p className="body-text text-text-secondary">
                    Fill out the form and I&apos;ll get back to you within 24 hours. Whether you
                    have a question or just want to say hi, feel free to reach out!
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="bg-surface border border-border rounded-lg p-4">
                    <p className="technical-text text-primary mb-1">Email</p>
                    <p className="text-text-secondary text-sm">hello@muhammadtaha.dev</p>
                  </div>
                  <div className="bg-surface border border-border rounded-lg p-4">
                    <p className="technical-text text-primary mb-1">Location</p>
                    <p className="text-text-secondary text-sm">Pakistan</p>
                  </div>
                  <div className="bg-surface border border-border rounded-lg p-4">
                    <p className="technical-text text-primary mb-1">Availability</p>
                    <p className="text-text-secondary text-sm">Open to opportunities</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-text mb-3">Professional Links</h3>
                  <div className="flex gap-4">
                    <Link
                      href="/resume"
                      className="text-sm text-text-secondary hover:text-text transition-colors"
                    >
                      Resume
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
