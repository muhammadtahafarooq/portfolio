import Link from 'next/link'
import { getSocialLinks } from '@/lib/db/queries'
import { Navbar } from '@/components/public/navbar'
import { Footer } from '@/components/public/footer'

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const socialLinks = await getSocialLinks()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar socialLinks={socialLinks} />
      <main className="flex-1 pt-20">{children}</main>
      <Footer socialLinks={socialLinks} />
    </div>
  )
}
