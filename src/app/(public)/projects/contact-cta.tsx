'use client'

import { Reveal, MagneticButton } from '@/components/motion'

export function ContactCTA() {
  return (
    <section className="section-padding container-main text-center border-t border-border-base">
      <Reveal>
        <h2 className="font-h2 text-text-primary mb-8">Initiate Collaboration</h2>
      </Reveal>
      <Reveal delay={0.15}>
        <MagneticButton as="a" href="/contact" className="btn-primary">
          Start a Conversation
        </MagneticButton>
      </Reveal>
    </section>
  )
}
