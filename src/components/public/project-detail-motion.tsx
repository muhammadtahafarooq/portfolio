'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Project } from '@/types'
import { Reveal, Stagger, StaggerItem, MagneticButton, ParallaxImage } from '@/components/motion'

interface ProjectDetailMotionProps {
  project: Project
  technologies: string[]
  screenshots: string[]
}

export function ProjectDetailMotion({
  project,
  technologies,
  screenshots,
}: ProjectDetailMotionProps) {
  return (
    <>
      {/* Hero */}
      <section className="section-padding container-main">
        <Reveal>
          <Link
            href="/projects"
            className="technical-text text-text-muted hover:text-text transition-colors mb-8 inline-block group"
          >
            <span className="inline-block group-hover:-translate-x-1 transition-transform">
              &larr;
            </span>{' '}
            Back to Projects
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="section-label">Project</p>
          <h1 className="heading-h1 mb-4">{project.title}</h1>
        </Reveal>

        {project.shortStatement && (
          <Reveal delay={0.2}>
            <p className="body-text-lg text-text-secondary max-w-2xl">{project.shortStatement}</p>
          </Reveal>
        )}

        {/* Links */}
        <Reveal delay={0.3}>
          <div className="flex gap-4 mt-8">
            {project.liveUrl && (
              <MagneticButton as="a" href={project.liveUrl} className="btn-primary">
                Live Demo &rarr;
              </MagneticButton>
            )}
            {project.githubUrl && (
              <MagneticButton as="a" href={project.githubUrl} className="btn-secondary">
                View Code &rarr;
              </MagneticButton>
            )}
          </div>
        </Reveal>
      </section>

      {/* Main Screenshot */}
      {screenshots.length > 0 && (
        <section className="container-main mb-16">
          <Reveal>
            <div className="rounded-xl overflow-hidden border border-border">
              <ParallaxImage
                src={screenshots[0]}
                alt={project.title}
                className="w-full aspect-video"
              />
            </div>
          </Reveal>
        </section>
      )}

      {/* Overview */}
      <section className="section-padding bg-background-secondary">
        <div className="container-main">
          <div className="grid-editorial">
            <Reveal className="md:col-span-4" delay={0.1}>
              <p className="section-label">Overview</p>
              <h2 className="heading-h3">About</h2>
            </Reveal>
            <Reveal className="md:col-span-8" delay={0.2}>
              {project.description ? (
                <div className="body-text text-text-secondary whitespace-pre-wrap">
                  {project.description}
                </div>
              ) : (
                <p className="body-text text-text-muted">No description available.</p>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Technologies */}
      {technologies.length > 0 && (
        <section className="section-padding container-main">
          <Reveal>
            <p className="section-label">Tech Stack</p>
            <h2 className="heading-h3 mb-6">Technologies</h2>
          </Reveal>
          <Stagger className="flex flex-wrap gap-3" stagger={0.03}>
            {technologies.map((tech: string) => (
              <StaggerItem key={tech}>
                <motion.span
                  className="technical-text bg-surface border border-border px-4 py-2 rounded-full"
                  whileHover={{ scale: 1.05, borderColor: 'rgba(139, 92, 246, 0.3)' }}
                  transition={{ duration: 0.2 }}
                >
                  {tech}
                </motion.span>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}

      {/* Additional Screenshots */}
      {screenshots.length > 1 && (
        <section className="section-padding bg-background-secondary">
          <div className="container-main">
            <Reveal>
              <p className="section-label">Gallery</p>
              <h2 className="heading-h3 mb-8">Screenshots</h2>
            </Reveal>
            <div className="space-y-4">
              {screenshots.slice(1).map((url: string, index: number) => (
                <Reveal key={index} delay={index * 0.1}>
                  <div className="rounded-xl overflow-hidden border border-border">
                    <ParallaxImage
                      src={url}
                      alt={`${project.title} screenshot ${index + 2}`}
                      className="w-full aspect-video"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Case Study */}
      {(project.caseStudyProblem || project.caseStudySolution || project.caseStudyResult) && (
        <section className="section-padding container-main">
          <Reveal>
            <p className="section-label">Case Study</p>
            <h2 className="heading-h3 mb-12">Process</h2>
          </Reveal>

          <div className="space-y-12">
            {project.caseStudyProblem && (
              <Reveal>
                <div className="grid-editorial">
                  <div className="md:col-span-4">
                    <h3 className="heading-h4 text-primary">Problem</h3>
                  </div>
                  <div className="md:col-span-8">
                    <p className="body-text text-text-secondary">{project.caseStudyProblem}</p>
                  </div>
                </div>
              </Reveal>
            )}

            {project.caseStudySolution && (
              <Reveal delay={0.1}>
                <div className="grid-editorial">
                  <div className="md:col-span-4">
                    <h3 className="heading-h4 text-primary">Solution</h3>
                  </div>
                  <div className="md:col-span-8">
                    <p className="body-text text-text-secondary">{project.caseStudySolution}</p>
                  </div>
                </div>
              </Reveal>
            )}

            {project.caseStudyResult && (
              <Reveal delay={0.2}>
                <div className="grid-editorial">
                  <div className="md:col-span-4">
                    <h3 className="heading-h4 text-primary">Result</h3>
                  </div>
                  <div className="md:col-span-8">
                    <p className="body-text text-text-secondary">{project.caseStudyResult}</p>
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding container-main text-center">
        <Reveal>
          <h2 className="heading-h2 mb-4">Interested in This Project?</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="body-text text-text-secondary max-w-xl mx-auto mb-8">
            Let&apos;s discuss how I can help with similar projects.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <MagneticButton as="a" href="/contact" className="btn-primary">
            Get in Touch
          </MagneticButton>
        </Reveal>
      </section>
    </>
  )
}
