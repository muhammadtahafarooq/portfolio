'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'

export function ContactMotion() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding container-main">
        <Reveal>
          <p className="section-label">Get in Touch</p>
          <h1 className="heading-h1 mb-6">Contact</h1>
          <p className="body-text-lg text-text-secondary max-w-2xl">
            Have a project in mind or want to collaborate? I&apos;m always open to discussing new
            opportunities and interesting ideas.
          </p>
        </Reveal>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-background-secondary">
        <div className="container-main">
          <div className="grid-editorial">
            {/* Contact Form */}
            <Reveal className="md:col-span-7" delay={0.1}>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                    Name <span className="text-error">*</span>
                  </label>
                  <input type="text" id="name" className="input-field" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                    Email <span className="text-error">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="input-field"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-text mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="input-field"
                    placeholder="What's this about?"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
                    Message <span className="text-error">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="input-field resize-none"
                    placeholder="Your message..."
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  Send Message
                </button>
              </form>
            </Reveal>

            {/* Contact Info */}
            <Reveal className="md:col-span-5" delay={0.2}>
              <div className="space-y-8">
                <div>
                  <h2 className="heading-h4 mb-4">Let&apos;s Connect</h2>
                  <p className="body-text text-text-secondary">
                    Fill out the form and I&apos;ll get back to you within 24 hours. Whether you
                    have a question or just want to say hi, feel free to reach out!
                  </p>
                </div>

                <Stagger className="space-y-4" stagger={0.1}>
                  <StaggerItem>
                    <motion.div
                      className="bg-surface border border-border rounded-lg p-4"
                      whileHover={{ borderColor: 'rgba(139, 92, 246, 0.3)' }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="technical-text text-primary mb-1">Email</p>
                      <p className="text-text-secondary text-sm">muhammadtahafarooq22@gmail.com</p>
                    </motion.div>
                  </StaggerItem>
                  <StaggerItem>
                    <motion.div
                      className="bg-surface border border-border rounded-lg p-4"
                      whileHover={{ borderColor: 'rgba(139, 92, 246, 0.3)' }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="technical-text text-primary mb-1">Location</p>
                      <p className="text-text-secondary text-sm">Multan, Pakistan</p>
                    </motion.div>
                  </StaggerItem>
                  <StaggerItem>
                    <motion.div
                      className="bg-surface border border-border rounded-lg p-4"
                      whileHover={{ borderColor: 'rgba(139, 92, 246, 0.3)' }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="technical-text text-primary mb-1">Availability</p>
                      <p className="text-text-secondary text-sm">Open to opportunities</p>
                    </motion.div>
                  </StaggerItem>
                </Stagger>

                <div>
                  <h3 className="text-sm font-medium text-text mb-3">Professional Links</h3>
                  <div className="flex gap-4">
                    <Link
                      href="/resume"
                      className="text-sm text-text-secondary hover:text-text transition-colors group"
                    >
                      Resume{' '}
                      <span className="inline-block group-hover:translate-x-1 transition-transform">
                        &rarr;
                      </span>
                    </Link>
                    <Link
                      href="/about"
                      className="text-sm text-text-secondary hover:text-text transition-colors group"
                    >
                      About{' '}
                      <span className="inline-block group-hover:translate-x-1 transition-transform">
                        &rarr;
                      </span>
                    </Link>
                    <Link
                      href="/projects"
                      className="text-sm text-text-secondary hover:text-text transition-colors group"
                    >
                      Projects{' '}
                      <span className="inline-block group-hover:translate-x-1 transition-transform">
                        &rarr;
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
