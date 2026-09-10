import { NextResponse } from 'next/server'
import { isRateLimited, getRemainingTime } from '@/lib/rate-limit'

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

  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}

export async function PUT() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}

export async function DELETE() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
