export const dynamic = 'force-dynamic'

import { Metadata } from 'next'
import { Reveal } from '@/components/motion'
import { ContactForm } from './contact-form'
import { SpaceBackground } from '@/components/public/space-background'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Muhammad Taha - CS Student | Aspiring Full-Stack Developer',
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <SpaceBackground />
      <section className="section-padding container-main">
        <div className="grid-12">
          <div className="col-span-12 md:col-span-8 relative z-10">
            <Reveal>
              <p className="section-label">04 / Contact</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="heading-h1 text-text mb-6">Contact.</h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="body-text-lg text-text-secondary max-w-[54ch]">
                Ready to collaborate on something extraordinary? Whether it&apos;s a full-stack
                application, an AI integration, or a digital experience that pushes boundaries —
                I&apos;m here to bring your vision to life.
              </p>
            </Reveal>
          </div>

          <div className="col-span-12 md:col-span-4 relative hidden md:block">
            <Reveal delay={0.3}>
              <div className="relative h-full min-h-[200px]">
                <div className="gold-glow absolute inset-0 rounded-sm" />
                <div className="bg-grid-lines absolute inset-0 rounded-sm opacity-40" />
              </div>
            </Reveal>
          </div>
        </div>

        <div className="thin-divider my-16" />

        <div className="grid-12 relative z-10">
          <div className="col-span-12 md:col-span-7">
            <Reveal>
              <p className="section-label mb-8">Initiate Transmission</p>
            </Reveal>
            <ContactForm />
          </div>

          <div className="col-span-12 md:col-span-5 md:pl-8">
            <Reveal delay={0.1}>
              <p className="section-label mb-8">Directory</p>
            </Reveal>

            <div className="space-y-8">
              <Reveal delay={0.15}>
                <div>
                  <p className="text-sm font-medium text-text-secondary uppercase tracking-wide mb-2">
                    Direct Protocol
                  </p>
                  <a
                    href="mailto:muhammadtahafarooq22@gmail.com"
                    className="text-text hover:text-primary transition-colors duration-300 text-body-lg"
                  >
                    muhammadtahafarooq22@gmail.com
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div>
                  <p className="text-sm font-medium text-text-secondary uppercase tracking-wide mb-2">
                    Physical Coordinates
                  </p>
                  <p className="text-text-secondary text-body-lg">Multan, Pakistan</p>
                </div>
              </Reveal>

              <Reveal delay={0.25}>
                <div>
                  <p className="text-sm font-medium text-text-secondary uppercase tracking-wide mb-2">
                    Response Latency
                  </p>
                  <p className="text-text-secondary text-body-lg">24–48 hours</p>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="pt-4">
                  <p className="text-sm font-medium text-text-secondary uppercase tracking-wide mb-4">
                    External Nodes
                  </p>
                  <div className="space-y-3">
                    <a
                      href="https://linkedin.com/in/muhammadtaha"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors duration-300 group"
                    >
                      <span className="text-body-lg">LinkedIn</span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 17L17 7M17 7H7M17 7v10"
                        />
                      </svg>
                    </a>
                    <a
                      href="https://github.com/muhammadtahafarooq"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors duration-300 group"
                    >
                      <span className="text-body-lg">GitHub</span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 17L17 7M17 7H7M17 7v10"
                        />
                      </svg>
                    </a>
                    <a
                      href="https://wa.me/923348010708"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors duration-300 group"
                    >
                      <span className="text-body-lg">WhatsApp</span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 17L17 7M17 7H7M17 7v10"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
