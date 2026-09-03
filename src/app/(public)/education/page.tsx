export const dynamic = 'force-dynamic'

import { getEducation } from '@/lib/db/queries'
import { EducationMotion } from '@/components/public/education-motion'

export const metadata = {
  title: 'Education',
  description: 'Educational background of Muhammad Taha - Full-Stack + AI Developer',
}

export default async function EducationPage() {
  const education = await getEducation()

  return (
    <main className="min-h-screen">
      <EducationMotion education={education} />
    </main>
  )
}
