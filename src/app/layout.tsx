import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { MotionWrapper } from '@/components/public/motion-wrapper'
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://muhammadtaha.dev'),
  title: {
    template: '%s | Muhammad Taha',
    default: 'Muhammad Taha — CS Student | Aspiring Full-Stack Developer',
  },
  description:
    'CS Student at NUML | Aspiring Full-Stack Developer building practical projects in web development and AI-powered applications.',
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
    title: 'Muhammad Taha — CS Student | Aspiring Full-Stack Developer',
    description:
      'Full-Stack + AI Developer specializing in React, Next.js, and modern web technologies.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Muhammad Taha - Full-Stack + AI Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Taha — CS Student | Aspiring Full-Stack Developer',
    description:
      'Full-Stack + AI Developer specializing in React, Next.js, and modern web technologies.',
    images: ['/og-image.svg'],
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
  icons: {
    icon: '/favicon.svg',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0B0A09',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Muhammad Taha',
    jobTitle: 'Full-Stack + AI Developer',
    url: 'https://muhammadtaha.dev',
    sameAs: ['https://github.com/muhammadtahafarooq', 'https://linkedin.com/in/muhammadtaha'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Multan',
      addressCountry: 'Pakistan',
    },
    email: 'mailto:muhammadtahafarooq22@gmail.com',
    knowsAbout: ['React', 'Next.js', 'TypeScript', 'Node.js', 'AI', 'Full-Stack Development'],
  }

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background text-text antialiased">
        <MotionWrapper>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium"
          >
            Skip to main content
          </a>
          {children}
        </MotionWrapper>
      </body>
    </html>
  )
}
