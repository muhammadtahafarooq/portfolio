import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'
import { isRateLimited, getRemainingTime } from '@/lib/rate-limit'
import { NextResponse } from 'next/server'

const handler = NextAuth(authOptions)

export async function GET(request: Request) {
  return handler(request, new Response())
}

export async function POST(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1'

  if (isRateLimited(ip)) {
    const remaining = Math.ceil(getRemainingTime(ip) / 60000)
    return NextResponse.json(
      { error: `Too many login attempts. Try again in ${remaining} minutes.` },
      { status: 429 }
    )
  }

  return handler(request, new Response())
}
