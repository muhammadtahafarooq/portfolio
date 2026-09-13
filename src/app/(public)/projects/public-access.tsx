'use client'

import { Reveal } from '@/components/motion'

export function PublicAccess() {
  return (
    <section className="section-padding container-main border-t border-border-base">
      <div className="grid-12">
        <Reveal className="col-span-12 md:col-span-3" delay={0}>
          <p className="technical-text text-text-muted uppercase tracking-technical">
            Public Access
          </p>
        </Reveal>

        <Reveal className="col-span-12 md:col-span-7 md:col-start-4" delay={0.1}>
          <p className="body-text-lg text-text-secondary leading-body max-w-2xl">
            All projects are openly documented and many are available for review. Code repositories,
            case studies, and live demos are provided where applicable — because transparency builds
            trust and good work speaks for itself.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
