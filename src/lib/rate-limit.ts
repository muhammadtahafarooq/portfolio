import { NextResponse } from 'next/server'

const loginAttempts = new Map<string, { count: number; resetTime: number }>()

const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000

function getRateLimitKey(ip: string): string {
  return `login:${ip}`
}

function isRateLimited(ip: string): boolean {
  const key = getRateLimitKey(ip)
  const now = Date.now()
  const record = loginAttempts.get(key)

  if (!record || now > record.resetTime) {
    loginAttempts.set(key, { count: 1, resetTime: now + WINDOW_MS })
    return false
  }

  if (record.count >= MAX_ATTEMPTS) {
    return true
  }

  record.count++
  return false
}

function getRemainingTime(ip: string): number {
  const key = getRateLimitKey(ip)
  const record = loginAttempts.get(key)
  if (!record) return 0
  return Math.max(0, record.resetTime - Date.now())
}

export { isRateLimited, getRemainingTime }
