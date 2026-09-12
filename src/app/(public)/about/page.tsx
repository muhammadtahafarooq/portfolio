export const revalidate = 3600

import Link from 'next/link'
import Image from 'next/image'
import { getAbout, getSkills } from '@/lib/db/queries'
import { Reveal } from '@/components/motion'
import { SpaceBackground } from '@/components/public/space-background'

export const metadata = {
  title: 'About',
  description: 'About Muhammad Taha - CS Student | Aspiring Full-Stack Developer',
  alternates: {
    canonical: '/about',
  },
}

export default async function AboutPage() {
  const [about, skills] = await Promise.all([getAbout(), getSkills()])

  const bioParagraphs = about?.biography ? about.biography.split('\n\n').filter(Boolean) : []

  const profileParagraphs = about?.profileContent
    ? about.profileContent.split('\n\n').filter(Boolean)
    : []

  return (
    <>
      <SpaceBackground />
      <main id="main-content">
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

              <Reveal
                className="col-span-12 md:col-span-5 md:col-start-8"
                direction="up"
                delay={0.15}
              >
                <div className="relative border border-border-base overflow-hidden aspect-square">
                  <Image
                    src="/images/about-identity.svg"
                    alt="Digital craft identity"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-background/90 to-transparent">
                    <p className="font-technical-sm text-text-primary uppercase tracking-technical mb-2">
                      Full-Stack
                    </p>
                    <p className="font-technical-sm text-text-primary uppercase tracking-technical mb-2">
                      AI Developer
                    </p>
                    <p className="font-technical-sm text-text-primary uppercase tracking-technical">
                      Digital Craftsman
                    </p>
                  </div>
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
                      I combine thoughtful engineering with purposeful design to create refined
                      digital experiences.
                    </p>
                    <p className="body-text-lg text-text-secondary">
                      My work brings together development, interaction, and visual design to build
                      products that are both functional and engaging.
                    </p>
                    <p className="body-text-lg text-text-secondary">
                      With every project, I focus on solving problems, refining ideas, and
                      delivering meaningful digital experiences.
                    </p>
                  </div>
                )}
              </Reveal>

              <Reveal
                className="col-span-12 md:col-span-5 md:col-start-8"
                direction="up"
                delay={0.15}
              >
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
                    <p className="font-body-lg text-text-primary">Multan, Pakistan</p>
                  </div>
                  <div className="thin-divider" />
                  <div>
                    <p className="font-technical-sm text-text-muted uppercase tracking-technical mb-1">
                      FOCUS
                    </p>
                    <p className="font-body-lg text-text-primary">
                      Building thoughtful, interactive, and visually refined digital experiences.
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
      </main>
    </>
  )
}
