export const dynamic = 'force-dynamic'

import { Metadata } from 'next'
import { ContactMotion } from '@/components/public/contact-motion'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Muhammad Taha - Full-Stack + AI Developer',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <ContactMotion />
    </main>
  )
}
