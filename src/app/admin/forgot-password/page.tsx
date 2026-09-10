'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<'success' | 'error' | null>(null)
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setStatus(null)

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send reset email')
      }

      setStatus('success')
      setMessage(data.data?.message || 'If an account exists, a reset link has been sent.')
    } catch (err) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md px-6">
        <div className="text-center mb-8">
          <p className="font-technical-sm text-primary mb-2 uppercase tracking-technical">
            Account Recovery
          </p>
          <h1 className="font-h3 text-text">Reset Password</h1>
        </div>

        {status === 'success' ? (
          <div className="space-y-6">
            <div className="border border-border-base bg-surface p-6 text-center">
              <p className="font-body-md text-text mb-2">Check your email</p>
              <p className="font-body-sm text-text-secondary">{message}</p>
            </div>
            <Link
              href="/admin/login"
              className="block text-center font-technical-sm text-primary hover:text-primary-hover transition-colors"
            >
              ← Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                Admin Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="admin@email.com"
                required
              />
            </div>

            {status === 'error' && <p className="text-error text-sm">{message}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full disabled:opacity-50"
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>

            <Link
              href="/admin/login"
              className="block text-center font-technical-sm text-text-muted hover:text-text transition-colors"
            >
              ← Back to Login
            </Link>
          </form>
        )}
      </div>
    </main>
  )
}
