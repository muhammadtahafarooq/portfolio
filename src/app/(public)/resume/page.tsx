export const dynamic = 'force-dynamic'

import { getResume } from '@/lib/db/queries'

export const metadata = {
  title: 'Resume',
  description: 'Resume of Muhammad Taha - Full-Stack + AI Developer',
}

export default async function ResumePage() {
  const resume = await getResume()

  return (
    <main className="min-h-screen section-padding container-main">
      <p className="technical-text mb-2">Document</p>
      <h1 className="heading-h1 mb-6">Resume</h1>
      <p className="body-text text-text-secondary max-w-2xl mb-12">
        Download my resume or view a summary of my professional experience.
      </p>

      {!resume ? (
        <div className="card text-center py-12">
          <p className="text-text-muted">Resume not available yet. Check back soon!</p>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="card">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="heading-h3">Muhammad Taha</h2>
                <p className="text-accent-primary">Full-Stack + AI Developer</p>
              </div>
              {resume.pdfUrl && (
                <a
                  href={resume.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Download PDF
                </a>
              )}
            </div>

            {resume.content && (
              <div className="body-text text-text-secondary whitespace-pre-wrap">
                {resume.content}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
