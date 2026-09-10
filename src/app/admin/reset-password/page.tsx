'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<'success' | 'error' | null>(null)
  const [message, setMessage] = useState('')

  if (!token) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-full max-w-md px-6 text-center">
          <h1 className="font-h3 text-text mb-4">Invalid Reset Link</h1>
          <p className="font-body-md text-text-secondary mb-6">
            This password reset link is invalid or missing a token.
          </p>
          <Link href="/admin/forgot-password" className="btn-primary">
            Request New Link
          </Link>
        </div>
      </main>
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setStatus(null)

    if (password !== confirmPassword) {
      setStatus('error')
      setMessage('Passwords do not match')
      setIsLoading(false)
      return
    }

    if (password.length < 8) {
      setStatus('error')
      setMessage('Password must be at least 8 characters')
      setIsLoading(false)
      return
    }

    try {
      const res = await fetch('/api/auth/reset-password/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to reset password')
      }

      setStatus('success')
      setMessage('Password updated successfully')
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
            New Password
          </p>
          <h1 className="font-h3 text-text">Reset Password</h1>
        </div>

        {status === 'success' ? (
          <div className="space-y-6">
            <div className="border border-border-base bg-surface p-6 text-center">
              <p className="font-body-md text-text mb-2">Password updated</p>
              <p className="font-body-sm text-text-secondary">{message}</p>
            </div>
            <Link
              href="/admin/login"
              className="block text-center font-technical-sm text-primary hover:text-primary-hover transition-colors"
            >
              Sign In →
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text mb-2">
                New Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
                minLength={8}
                required
              />
            </div>

            <div>
              <label htmlFor="confirm" className="block text-sm font-medium text-text mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
                minLength={8}
                required
              />
            </div>

            {status === 'error' && <p className="text-error text-sm">{message}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full disabled:opacity-50"
            >
              {isLoading ? 'Updating...' : 'Update Password'}
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
