export const dynamic = 'force-dynamic'

import { getResume } from '@/lib/db/queries'
import { ResumeMotion } from '@/components/public/resume-motion'

export const metadata = {
  title: 'Resume',
  description: 'Resume of Muhammad Taha - Full-Stack + AI Developer',
}

export default async function ResumePage() {
  const resume = await getResume()

  return (
    <main className="min-h-screen">
      <ResumeMotion resume={resume} />
    </main>
  )
}
