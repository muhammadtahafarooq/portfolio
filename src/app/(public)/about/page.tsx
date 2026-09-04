export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { getAbout, getSkills } from '@/lib/db/queries'
import { Reveal } from '@/components/motion'

export const metadata = {
  title: 'About',
  description: 'About Muhammad Taha - Full-Stack + AI Developer',
}

export default async function AboutPage() {
  const [about, skills] = await Promise.all([getAbout(), getSkills()])

  const bioParagraphs = about?.biography ? about.biography.split('\n\n').filter(Boolean) : []

  const profileParagraphs = about?.profileContent
    ? about.profileContent.split('\n\n').filter(Boolean)
    : []

  return (
    <section className="section-padding">
      <div className="container-main">
        {/* About Hero */}
        <div className="grid-12 items-start">
          <Reveal className="col-span-12 md:col-span-7" direction="up">
            <p className="section-label">02 / IDENTITY</p>
            <h1 className="heading-h1 mb-8 animate-mask-reveal">Architectural Digital Craft</h1>
            {bioParagraphs.length > 0 ? (
              <div className="space-y-4">
                {bioParagraphs.map((paragraph, index) => (
                  <p key={index} className="body-text-lg text-text-secondary">
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : (
              <p className="body-text-lg text-text-secondary">
                Full-Stack + AI Developer crafting innovative digital experiences at the
                intersection of design and technology.
              </p>
            )}
          </Reveal>

          <Reveal className="col-span-12 md:col-span-5 md:col-start-8" direction="up" delay={0.15}>
            <div className="tech-grid relative border border-border-base p-8 aspect-square flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
              <div className="relative z-10 text-center">
                <p className="font-technical-sm text-text-muted uppercase tracking-technical mb-2">
                  Full-Stack
                </p>
                <p className="font-technical-sm text-text-muted uppercase tracking-technical mb-2">
                  AI Developer
                </p>
                <p className="font-technical-sm text-text-muted uppercase tracking-technical">
                  Digital Craftsman
                </p>
              </div>
              <div className="absolute top-4 right-4 w-2 h-2 bg-primary/30" />
              <div className="absolute bottom-4 left-4 w-2 h-2 bg-primary/30" />
              <div className="absolute top-1/2 left-4 w-px h-8 bg-border-base" />
              <div className="absolute top-4 left-1/2 w-8 h-px bg-border-base" />
            </div>
          </Reveal>
        </div>

        {/* Divider */}
        <Reveal>
          <div className="thin-divider my-24" />
        </Reveal>

        {/* Professional Profile */}
        <div className="grid-12 items-start">
          <Reveal className="col-span-12 md:col-span-7" direction="up">
            <h3 className="heading-h3 mb-8">Engineering Meets Aesthetics</h3>
            {profileParagraphs.length > 0 ? (
              <div className="space-y-4">
                {profileParagraphs.map((paragraph, index) => (
                  <p key={index} className="body-text-lg text-text-secondary">
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <p className="body-text-lg text-text-secondary">
                  I believe that great software is born at the intersection of robust engineering
                  and thoughtful design. Every project I undertake is an opportunity to push
                  boundaries and create something that not only functions flawlessly but also
                  resonates on a visual and experiential level.
                </p>
                <p className="body-text-lg text-text-secondary">
                  My approach combines systematic problem-solving with an eye for detail, ensuring
                  that each line of code serves both a technical and aesthetic purpose. From
                  architecting scalable systems to crafting pixel-perfect interfaces, I strive to
                  deliver digital experiences that leave a lasting impression.
                </p>
              </div>
            )}
          </Reveal>

          <Reveal className="col-span-12 md:col-span-5 md:col-start-8" direction="up" delay={0.15}>
            <div className="border border-border-base p-8 space-y-6 bg-surface">
              <div>
                <p className="font-technical-sm text-text-muted uppercase tracking-technical mb-1">
                  ROLE
                </p>
                <p className="font-body-lg text-text-primary">Full-Stack + AI Developer</p>
              </div>
              <div className="thin-divider" />
              <div>
                <p className="font-technical-sm text-text-muted uppercase tracking-technical mb-1">
                  LOCATION
                </p>
                <p className="font-body-lg text-text-primary">Pakistan</p>
              </div>
              <div className="thin-divider" />
              <div>
                <p className="font-technical-sm text-text-muted uppercase tracking-technical mb-1">
                  FOCUS
                </p>
                <p className="font-body-lg text-text-primary">
                  Building intelligent, scalable, and beautiful digital products
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Profile CTA */}
        <Reveal>
          <div className="border-t border-border-base mt-24 pt-12 flex gap-4">
            <Link href="/projects" className="btn-primary">
              View Projects
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contact
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
