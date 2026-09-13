import { getSocialLinks } from '@/lib/db/queries'
import { Navbar } from '@/components/public/navbar'
import { Footer } from '@/components/public/footer'

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const socialLinks = await getSocialLinks()

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar socialLinks={socialLinks} />
      <main className="flex-1 pt-20 relative z-10">{children}</main>
      <Footer socialLinks={socialLinks} />
    </div>
  )
}
