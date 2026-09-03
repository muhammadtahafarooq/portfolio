export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { getResume } from '@/lib/db/queries'
import { EmptyState } from '@/components/ui/states'

export const metadata = {
  title: 'Resume',
  description: 'Resume of Muhammad Taha - Full-Stack + AI Developer',
}

export default async function ResumePage() {
  const resume = await getResume()

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="section-padding container-main">
        <p className="section-label">Document</p>
        <h1 className="heading-h1 mb-6">Resume</h1>
        <p className="body-text-lg text-text-secondary max-w-2xl">
          Download my resume or view my professional background.
        </p>
      </section>

      {/* Resume Content */}
      <section className="section-padding bg-background-secondary">
        <div className="container-main">
          {!resume ? (
            <EmptyState message="Resume not available yet." />
          ) : (
            <div className="grid-editorial">
              <div className="md:col-span-8">
                {resume.content ? (
                  <div className="body-text text-text-secondary whitespace-pre-wrap">
                    {resume.content}
                  </div>
                ) : (
                  <p className="text-text-muted">No resume content available.</p>
                )}
              </div>
              <div className="md:col-span-4">
                <div className="bg-surface border border-border rounded-xl p-6 sticky top-24">
                  <h3 className="heading-h4 mb-4">Download</h3>
                  {resume.pdfUrl ? (
                    <a
                      href={resume.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full"
                    >
                      Download PDF
                    </a>
                  ) : (
                    <p className="text-sm text-text-muted">PDF not available</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding container-main text-center">
        <h2 className="heading-h2 mb-4">Interested in My Background?</h2>
        <p className="body-text text-text-secondary max-w-xl mx-auto mb-8">
          Let&apos;s discuss how I can contribute to your team or project.
        </p>
        <Link href="/contact" className="btn-primary">
          Get in Touch
        </Link>
      </section>
    </main>
  )
}
