import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - Page Not Found',
}

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="heading-h1 mb-4">404</h1>
        <p className="body-text text-text-secondary mb-8">
          The page you&apos;re looking for doesn&apos;exist.
        </p>
        <Link href="/" className="btn-primary">
          Go Home
        </Link>
      </div>
    </main>
  )
}
