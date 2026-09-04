import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Muhammad Taha',
    default: 'Muhammad Taha — Full-Stack + AI Developer',
  },
  description:
    'Full-Stack + AI Developer specializing in React, Next.js, and modern web technologies. Building innovative digital experiences.',
  keywords: [
    'Muhammad Taha',
    'Full-Stack Developer',
    'AI Developer',
    'React Developer',
    'Next.js Developer',
    'Web Developer',
    'Multan, Pakistan',
  ],
  authors: [{ name: 'Muhammad Taha' }],
  creator: 'Muhammad Taha',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Muhammad Taha',
    title: 'Muhammad Taha — Full-Stack + AI Developer',
    description:
      'Full-Stack + AI Developer specializing in React, Next.js, and modern web technologies.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Taha — Full-Stack + AI Developer',
    description:
      'Full-Stack + AI Developer specializing in React, Next.js, and modern web technologies.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-background text-text antialiased">{children}</body>
    </html>
  )
}
