export const revalidate = 3600

import Link from 'next/link'
import Image from 'next/image'
import {
  getFeaturedProjects,
  getSkills,
  getTechnologies,
  getExperience,
  getCertifications,
  getProfile,
  getAbout,
} from '@/lib/db/queries'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'
import { LiquidText } from '@/components/motion/liquid-text'
import { TiltCard } from '@/components/motion/tilt-card'
import { HomeNavbar } from '@/components/public/home-navbar'
import { ContactSection } from '@/components/public/contact-section'
import { SpaceBackground } from '@/components/public/space-background'
import { HeroMilkyWay } from '@/components/3d/hero-milky-way'
import type { Skill } from '@/types'

function mergeDedup(a: { name: string }[], b: { name: string }[]) {
  const seen = new Set(a.map((i) => i.name))
  const merged = [...a]
  for (const item of b) {
    if (!seen.has(item.name)) {
      merged.push(item)
      seen.add(item.name)
    }
  }
  return merged
}

function groupByCategory<T extends { category: string | null }>(items: T[]): Map<string, T[]> {
  const grouped = new Map<string, T[]>()
  for (const item of items) {
    const cat = item.category || 'Other'
    if (!grouped.has(cat)) grouped.set(cat, [])
    grouped.get(cat)!.push(item)
  }
  return grouped
}

export default async function HomePage() {
  const [projects, skills, technologies, experience, certifications, profile, about] =
    await Promise.all([
      getFeaturedProjects(),
      getSkills(),
      getTechnologies(),
      getExperience(),
      getCertifications(),
      getProfile(),
      getAbout(),
    ])
  const skillGroups = groupByCategory(skills)
  const techGroups = groupByCategory(technologies)

  const skillCategories = [
    { label: 'WEB', items: mergeDedup(skillGroups.get('WEB') || [], techGroups.get('WEB') || []) },
    {
      label: 'BACKEND',
      items: mergeDedup(skillGroups.get('BACKEND') || [], techGroups.get('BACKEND') || []),
    },
    {
      label: 'DATABASE',
      items: mergeDedup(skillGroups.get('DATABASE') || [], techGroups.get('DATABASE') || []),
    },
    {
      label: 'TOOLS',
      items: mergeDedup(skillGroups.get('TOOLS') || [], techGroups.get('TOOLS') || []),
    },
    { label: 'AI', items: mergeDedup(skillGroups.get('AI') || [], techGroups.get('AI') || []) },
  ].filter((cat) => cat.items.length > 0)

  const bioParagraphs = about?.biography ? about.biography.split('\n\n').filter(Boolean) : []

  return (
    <main className="min-h-screen">
      <SpaceBackground />
      <HomeNavbar />

      <section className="relative min-h-screen flex items-center overflow-hidden">
        <HeroMilkyWay />
        <div className="container-main relative z-10 pt-20">
          <div className="grid-12 items-center min-h-[80vh]">
            <div className="col-span-12 md:col-span-5">
              <Reveal delay={0.1}>
                <p className="section-label">Portfolio / 2026</p>
              </Reveal>
              <Reveal delay={0.2}>
                <LiquidText text={profile?.name || 'Muhammad Taha'} as="h1" className="mb-4" />
              </Reveal>
              <Reveal delay={0.3}>
                <h2 className="heading-h3 text-primary mb-6">
                  {profile?.title || 'Full-Stack + AI Developer'}
                </h2>
              </Reveal>
              <Reveal delay={0.4}>
                <p className="body-text-lg text-text-secondary mb-8 max-w-lg">
                  {profile?.shortBio ||
                    'Building innovative digital experiences with modern technologies. Specializing in React, Next.js, and AI-powered applications.'}
                </p>
              </Reveal>
              <Reveal delay={0.5}>
                <div className="flex flex-wrap gap-4">
                  <Link href="/contact" className="btn-primary">
                    Contact Me
                  </Link>
                  <Link href="/projects" className="btn-secondary">
                    View Projects
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal
              className="col-span-12 md:col-span-4 md:col-start-9"
              delay={0.3}
              direction="right"
            >
              <TiltCard>
                <div className="relative aspect-[3/4] bg-surface max-w-[280px] mx-auto overflow-hidden">
                  {profile?.avatarUrl ? (
                    <Image
                      src={profile.avatarUrl}
                      alt={profile.name}
                      fill
                      sizes="280px"
                      className="object-cover"
                    />
                  ) : (
                    <Image
                      src="/images/homepage pic.jpeg"
                      alt="Muhammad Taha"
                      fill
                      sizes="280px"
                      className="object-cover object-top"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent pointer-events-none" />
                  <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-primary" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-primary" />
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-primary" />
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-primary" />
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="thin-divider" />

      <section className="section-padding">
        <div className="container-main">
          <div className="grid-12 items-start">
            <Reveal className="col-span-12 md:col-span-5" direction="up">
              <h2 className="heading-h2 mb-4">Identity &amp; Philosophy</h2>
              <div className="w-16 h-1 bg-primary mb-8" />
            </Reveal>

            <Reveal className="col-span-12 md:col-span-7" direction="up" delay={0.15}>
              {bioParagraphs.length > 0 ? (
                <div className="space-y-6">
                  {bioParagraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="body-text-lg text-text-secondary border-l-2 border-primary/30 pl-6"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  <p className="body-text-lg text-text-secondary border-l-2 border-primary/30 pl-6">
                    I believe technology is at its best when solid engineering meets thoughtful
                    design. I enjoy taking ideas from a simple concept and turning them into digital
                    experiences that are functional, interactive, and visually refined.
                  </p>
                  <p className="body-text-lg text-text-secondary border-l-2 border-primary/30 pl-6">
                    I approach every project with curiosity and attention to detail — solving
                    problems through code while exploring the possibilities of design, motion, and
                    interaction. Every project I build is another step in becoming a better
                    developer and a more thoughtful creator.
                  </p>
                </div>
              )}
              <Link
                href="/about"
                className="inline-block mt-8 text-primary hover:text-primary-hover transition-colors text-sm font-medium group"
              >
                View Full Background{' '}
                <span className="inline-block group-hover:translate-x-1 transition-transform">
                  &rarr;
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="thin-divider" />

      <section className="section-padding bg-background-secondary">
        <div className="container-main">
          <div className="grid-12 items-start">
            <Reveal className="col-span-12 md:col-span-5" direction="up">
              <h2 className="heading-h2 mb-4">Technical Capability</h2>
              <div className="w-16 h-1 bg-primary mb-8" />
            </Reveal>

            <Reveal className="col-span-12 md:col-span-7" direction="up" delay={0.15}>
              <div className="space-y-8">
                {skillCategories.map((category) => (
                  <div key={category.label}>
                    <h3 className="font-technical-sm text-text-muted uppercase tracking-technical mb-4">
                      {category.label}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {category.items.map((item) => (
                        <span key={item.name} className="tech-tag">
                          {item.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                {skillCategories.length === 0 && (
                  <p className="text-text-muted">
                    Skills will appear here once added through the admin panel.
                  </p>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="thin-divider" />

      {projects.length > 0 && (
        <section className="section-padding">
          <div className="container-main">
            <Reveal>
              <h2 className="heading-h2 mb-16">Featured Projects</h2>
            </Reveal>

            <div className="space-y-32">
              {projects.map((project, index) => {
                const isReversed = index % 2 === 1
                const technologiesList = project.technologies
                  ? JSON.parse(project.technologies)
                  : []

                return (
                  <Reveal key={project.id} delay={0.1}>
                    <div className="grid-12 items-center">
                      <div
                        className={`col-span-12 md:col-span-7 ${isReversed ? 'md:order-2' : ''}`}
                      >
                        <div className="aspect-video bg-background border border-border overflow-hidden relative">
                          {project.screenshotUrls ? (
                            <Image
                              src={JSON.parse(project.screenshotUrls)[0]}
                              alt={project.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 60vw"
                              className="object-contain p-4"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-text-muted">
                              No screenshot
                            </div>
                          )}
                        </div>
                      </div>

                      <div
                        className={`col-span-12 md:col-span-5 ${
                          isReversed ? 'md:order-1 md:pr-12' : 'md:pl-12'
                        } mt-8 md:mt-0`}
                      >
                        <p className="technical-text mb-2">
                          Project {String(index + 1).padStart(2, '0')}
                        </p>
                        <h3 className="heading-h4 mb-3 text-text">{project.title}</h3>
                        <p className="body-text text-text-secondary text-sm mb-4">
                          {project.shortStatement || project.description}
                        </p>
                        {technologiesList.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-6">
                            {technologiesList.slice(0, 4).map((tech: string) => (
                              <span key={tech} className="tech-tag">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                        <Link
                          href={`/projects/${project.slug}`}
                          className="inline-block text-primary hover:text-primary-hover transition-colors text-sm font-medium group"
                        >
                          Explore Case Study{' '}
                          <span className="inline-block group-hover:translate-x-1 transition-transform">
                            &rarr;
                          </span>
                        </Link>
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </div>

            <Reveal>
              <div className="mt-24 text-center">
                <Link href="/projects" className="btn-secondary">
                  View All Projects
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <div className="thin-divider" />

      <section className="section-padding bg-background-secondary">
        <div className="container-main">
          <Reveal>
            <h2 className="heading-h2 mb-16">Professional Background</h2>
          </Reveal>

          {experience.length > 0 && (
            <div className="mb-16">
              <Stagger stagger={0.05}>
                {experience.map((exp) => (
                  <StaggerItem key={exp.id}>
                    <div className="grid-12 items-center py-6 border-b border-border">
                      <div className="col-span-12 md:col-span-3">
                        <p className="technical-text">
                          {exp.startDate || '—'}
                          {exp.endDate ? ` — ${exp.endDate}` : exp.isCurrent ? ' — Present' : ''}
                        </p>
                      </div>
                      <div className="col-span-12 md:col-span-5">
                        <h4 className="heading-h4">{exp.role}</h4>
                        {exp.organization && (
                          <p className="text-sm text-text-secondary mt-1">{exp.organization}</p>
                        )}
                      </div>
                      <div className="col-span-12 md:col-span-3">
                        <Link
                          href="/experience"
                          className="tech-tag hover:text-primary hover:border-primary transition-colors"
                        >
                          Experience
                        </Link>
                      </div>
                      <div className="col-span-12 md:col-span-1 text-right hidden md:block">
                        <Link
                          href="/experience"
                          className="text-primary hover:text-primary/80 transform hover:translate-x-1 transition-all"
                        >
                          &rarr;
                        </Link>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          )}

          {certifications.length > 0 && (
            <div>
              <Stagger stagger={0.05}>
                {certifications.map((cert) => (
                  <StaggerItem key={cert.id}>
                    <div className="grid-12 items-center py-6 border-b border-border">
                      <div className="col-span-12 md:col-span-3">
                        <p className="technical-text">{cert.date || '—'}</p>
                      </div>
                      <div className="col-span-12 md:col-span-5">
                        <h4 className="heading-h4">{cert.name}</h4>
                        {cert.issuer && (
                          <p className="text-sm text-text-secondary mt-1">{cert.issuer}</p>
                        )}
                      </div>
                      <div className="col-span-12 md:col-span-3">
                        <Link
                          href="/certifications"
                          className="tech-tag hover:text-primary hover:border-primary transition-colors"
                        >
                          Certification
                        </Link>
                      </div>
                      <div className="col-span-12 md:col-span-1 text-right hidden md:block">
                        <Link
                          href="/certifications"
                          className="text-primary hover:text-primary/80 transform hover:translate-x-1 transition-all"
                        >
                          &rarr;
                        </Link>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          )}

          {experience.length === 0 && certifications.length === 0 && (
            <p className="text-text-muted">
              Professional background will appear here once added through the admin panel.
            </p>
          )}
        </div>
      </section>

      <div className="thin-divider" />

      <section className="section-padding">
        <div className="container-main">
          <ContactSection />
        </div>
      </section>

      <div className="thin-divider" />

      <footer className="border-t border-border bg-background-secondary">
        <div className="container-main py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
            <div>
              <Link href="/" className="relative group inline-block">
                <span className="text-lg font-semibold text-text group-hover:text-primary transition-colors">
                  Muhammad Taha
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
              <p className="text-sm text-text-muted mt-4">
                &copy; {new Date().getFullYear()} Muhammad Taha
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-text mb-4">Navigation</h4>
              <div className="flex flex-col gap-2">
                {[
                  { label: 'Home', href: '/' },
                  { label: 'About', href: '/about' },
                  { label: 'Projects', href: '/projects' },
                  { label: 'Experience', href: '/experience' },
                  { label: 'Education', href: '/education' },
                  { label: 'Certifications', href: '/certifications' },
                  { label: 'Resume', href: '/resume' },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm text-text-secondary hover:text-text transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-text mb-4">Professional</h4>
              <div className="flex flex-col gap-2">
                {[
                  { label: 'Skills', href: '/about#skills' },
                  { label: 'Projects', href: '/projects' },
                  { label: 'Certifications', href: '/certifications' },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-sm text-text-secondary hover:text-text transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-text mb-4">Connect</h4>
              <div className="flex flex-col gap-3">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=muhammadtahafarooq22@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary hover:text-text transition-colors break-all"
                >
                  muhammadtahafarooq22@gmail.com
                </a>
                <a
                  href="https://github.com/muhammadtahafarooq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary hover:text-text transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/muhammadtaha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary hover:text-text transition-colors"
                >
                  LinkedIn
                </a>
              </div>
              <Link href="/contact" className="btn-primary inline-block mt-6">
                HIRE ME
              </Link>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <Link
              href="/privacy"
              className="text-sm text-text-muted hover:text-text transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>

      <div className="marquee-container" aria-hidden="true">
        <div className="marquee-content">
          <span>MUHAMMAD TAHA</span>
          <span>MUHAMMAD TAHA</span>
          <span>MUHAMMAD TAHA</span>
          <span>MUHAMMAD TAHA</span>
          <span>MUHAMMAD TAHA</span>
          <span>MUHAMMAD TAHA</span>
          <span>MUHAMMAD TAHA</span>
          <span>MUHAMMAD TAHA</span>
        </div>
      </div>
    </main>
  )
}
