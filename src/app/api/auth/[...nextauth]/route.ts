import { NextResponse } from 'next/server'
import { isRateLimited, getRemainingTime } from '@/lib/rate-limit'

let cachedHandler: ((request: Request, context?: unknown) => Promise<Response>) | null = null

async function getHandler() {
  if (cachedHandler) return cachedHandler
  const { default: NextAuth } = await import('next-auth')
  const { authOptions } = await import('@/lib/auth')
  cachedHandler = NextAuth(authOptions) as (
    request: Request,
    context?: unknown
  ) => Promise<Response>
  return cachedHandler
}

export async function GET(request: Request) {
  try {
    const handler = await getHandler()
    return await handler(request)
  } catch (err) {
    console.error('NextAuth GET error:', err)
    return NextResponse.json({ error: 'Auth error' }, { status: 500 })
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

    const handler = await getHandler()
    return await handler(request)
  } catch (err) {
    console.error('NextAuth POST error:', err)
    return NextResponse.json({ error: 'Auth error' }, { status: 500 })
  }
}
