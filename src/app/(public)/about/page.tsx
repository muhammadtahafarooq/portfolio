export const dynamic = 'force-dynamic'

import { getAbout, getSkills, getTechnologies } from '@/lib/db/queries'
import { AboutMotion } from '@/components/public/about-motion'

export const metadata = {
  title: 'About',
  description: 'About Muhammad Taha - Full-Stack + AI Developer',
}

export default async function AboutPage() {
  const [about, skills, technologies] = await Promise.all([
    getAbout(),
    getSkills(),
    getTechnologies(),
  ])

  return (
    <main className="min-h-screen">
      <AboutMotion about={about} skills={skills} technologies={technologies} />
    </main>
  )
}
