export const dynamic = 'force-dynamic'

import { getCertifications, getAchievements } from '@/lib/db/queries'
import { CertificationsMotion } from '@/components/public/certifications-motion'

export const metadata = {
  title: 'Certifications & Achievements',
  description:
    'Professional certifications and achievements of Muhammad Taha - Full-Stack + AI Developer',
}

export default async function CertificationsPage() {
  const [certifications, achievements] = await Promise.all([getCertifications(), getAchievements()])

  return (
    <main className="min-h-screen">
      <CertificationsMotion certifications={certifications} achievements={achievements} />
    </main>
  )
}
