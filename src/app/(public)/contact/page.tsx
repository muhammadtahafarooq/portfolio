export const dynamic = 'force-dynamic'

import { Metadata } from 'next'
import { ContactForm } from './contact-form'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Muhammad Taha - Full-Stack + AI Developer',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen section-padding container-main">
      <p className="technical-text mb-2">Get in Touch</p>
      <h1 className="heading-h1 mb-6">Contact</h1>
      <p className="body-text text-text-secondary max-w-2xl mb-12">
        Have a project in mind or want to collaborate? I&apos;m always open to discussing new
        opportunities and interesting ideas.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div>
          <ContactForm />
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
          <div>
            <h2 className="heading-h4 mb-4">Let&apos;s Connect</h2>
            <p className="body-text text-text-secondary">
              Fill out the form and I&apos;ll get back to you within 24 hours. Whether you have a
              question or just want to say hi, feel free to reach out!
            </p>
          </div>

          <div className="space-y-4">
            <div className="card">
              <p className="technical-text text-primary mb-1">Email</p>
              <p className="text-text-secondary">hello@muhammadtaha.dev</p>
            </div>
            <div className="card">
              <p className="technical-text text-primary mb-1">Location</p>
              <p className="text-text-secondary">Pakistan</p>
            </div>
            <div className="card">
              <p className="technical-text text-primary mb-1">Availability</p>
              <p className="text-text-secondary">Open to opportunities</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
