export const revalidate = 3600

import { getExperience } from '@/lib/db/queries'
import { ExperienceMotion } from '@/components/public/experience-motion'
import { SpaceBackground } from '@/components/public/space-background'

export const metadata = {
  title: 'Experience',
  description:
    'Professional experience of Muhammad Taha - CS Student | Aspiring Full-Stack Developer',
  alternates: {
    canonical: '/experience',
  },
}

export default async function ExperiencePage() {
  const experience = await getExperience()

  return (
    <main className="min-h-screen">
      <SpaceBackground />
      <ExperienceMotion experience={experience} />
    </main>
  )
}
