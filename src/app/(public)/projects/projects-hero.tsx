'use client'

import Image from 'next/image'
import { Reveal } from '@/components/motion'

export function ProjectsHero() {
  return (
    <section className="section-padding container-main">
      <div className="grid-12 items-start">
        <Reveal className="col-span-7 md:col-span-7" delay={0}>
          <p className="font-technical-sm text-text-muted uppercase tracking-technical mb-6">
            04 / EXHIBITION
          </p>
          <h1 className="font-h1 text-text-primary mb-6">Selected Projects</h1>
          <p className="font-body-lg text-text-secondary max-w-xl leading-body">
            A curated selection of work spanning full-stack development, AI-powered systems, and
            interactive experiences — built with precision, shipped with purpose.
          </p>
        </Reveal>

        <Reveal className="col-span-5 md:col-span-5 mt-12 md:mt-0" delay={0.2}>
          <div className="relative border border-border-base bg-surface aspect-square overflow-hidden">
            <Image
              src="/images/projects-hero.svg"
              alt="Projects visual composition"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
              priority
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
