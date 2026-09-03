export const dynamic = 'force-dynamic'

import { getCertifications } from '@/lib/db/queries'

export const metadata = {
  title: 'Certifications',
  description: 'Professional certifications of Muhammad Taha - Full-Stack + AI Developer',
}

export default async function CertificationsPage() {
  const certifications = await getCertifications()

  return (
    <main className="min-h-screen section-padding container-main">
      <p className="technical-text mb-2">Credentials</p>
      <h1 className="heading-h1 mb-6">Certifications</h1>
      <p className="body-text text-text-secondary max-w-2xl mb-12">
        Professional certifications that validate my skills and expertise.
      </p>

      {certifications.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-text-muted">No certifications listed yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert) => (
            <div key={cert.id} className="card card-hover">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-accent-primary text-xl">✦</span>
                </div>
                <div className="flex-1">
                  <h2 className="heading-h4 mb-1">{cert.name}</h2>
                  {cert.issuer && (
                    <p className="text-accent-primary font-medium text-sm">{cert.issuer}</p>
                  )}
                  {cert.date && <p className="text-text-muted text-sm mt-2">Issued: {cert.date}</p>}
                  {cert.description && (
                    <p className="text-text-secondary text-sm mt-2">{cert.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
