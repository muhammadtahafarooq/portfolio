import { NextResponse } from 'next/server'
import { z } from 'zod'
import { contactFormSchema } from '@/lib/validators'
import { sendContactEmail } from '@/lib/email'

const rateLimit = new Map<string, number>()
const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Honeypot check
    if (body.website) {
      return NextResponse.json({ success: true })
    }

    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    const lastSubmit = rateLimit.get(ip)
    if (lastSubmit && Date.now() - lastSubmit < RATE_LIMIT_WINDOW) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Validate input
    const result = contactFormSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.flatten() },
        { status: 400 }
      )
    }

    const { name, email, subject, message } = result.data

    // Send email
    const emailResult = await sendContactEmail({ name, email, subject, message })
    if (!emailResult.success) {
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    // Update rate limit
    rateLimit.set(ip, Date.now())

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
