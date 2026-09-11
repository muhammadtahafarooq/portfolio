import { NextResponse } from 'next/server'
import { isRateLimited, getRemainingTime } from '@/lib/rate-limit'

export async function GET(request: Request) {
  try {
    const { default: NextAuth } = await import('next-auth')
    const { authOptions } = await import('@/lib/auth')
    const handler = NextAuth(authOptions)
    return await handler(request, new Response())
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    const stack = err instanceof Error ? err.stack : ''
    console.error('NextAuth GET error:', msg, stack)
    return NextResponse.json({ error: msg, stack: stack?.substring(0, 500) }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1'

    if (isRateLimited(ip)) {
      const remaining = Math.ceil(getRemainingTime(ip) / 60000)
      return NextResponse.json(
        { error: `Too many login attempts. Try again in ${remaining} minutes.` },
        { status: 429 }
      )
    }

    const { default: NextAuth } = await import('next-auth')
    const { authOptions } = await import('@/lib/auth')
    const handler = NextAuth(authOptions)
    return await handler(request, new Response())
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    const stack = err instanceof Error ? err.stack : ''
    console.error('NextAuth POST error:', msg, stack)
    return NextResponse.json({ error: msg, stack: stack?.substring(0, 500) }, { status: 500 })
  }
}
