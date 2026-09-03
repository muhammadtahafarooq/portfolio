export const dynamic = 'force-dynamic'

import { getExperience } from '@/lib/db/queries'
import { ExperienceMotion } from '@/components/public/experience-motion'

export const metadata = {
  title: 'Experience',
  description: 'Professional experience of Muhammad Taha - Full-Stack + AI Developer',
}

export default async function ExperiencePage() {
  const experience = await getExperience()

  return (
    <main className="min-h-screen">
      <ExperienceMotion experience={experience} />
    </main>
  )
}
