import { eq } from 'drizzle-orm'
import crypto from 'crypto'
import { db, schema } from '@/lib/db'
import { sendPasswordResetEmail } from '@/lib/email'
import { apiError, apiSuccess } from '@/lib/api-helpers'
import { isRateLimited, getRemainingTime } from '@/lib/rate-limit'

function generateToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

function getExpiresAt(): string {
  const now = new Date()
  now.setHours(now.getHours() + 1)
  return now.toISOString()
}

export async function POST(request: Request) {
  try {
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1'

    if (isRateLimited(ip)) {
      const remaining = Math.ceil(getRemainingTime(ip) / 60000)
      return apiError(`Too many requests. Try again in ${remaining} minutes.`, 429)
    }

    const body = await request.json()
    const { email } = body

    if (!email || typeof email !== 'string') {
      return apiError('Email is required', 400)
    }

    const users = await db
      .select()
      .from(schema.adminUsers)
      .where(eq(schema.adminUsers.email, email))
      .limit(1)

    if (users.length === 0) {
      return apiSuccess({
        success: true,
        message: 'If an account exists with that email, a reset link has been sent.',
      })
    }

    const token = generateToken()
    const expiresAt = getExpiresAt()

    await db.insert(schema.passwordResetTokens).values({
      token,
      email,
      expiresAt,
    })

    const emailResult = await sendPasswordResetEmail({ email, resetToken: token })

    if (!emailResult.success && !emailResult.devMode) {
      console.error('Password reset email failed:', emailResult.error)
    }

    return apiSuccess({
      success: true,
      message: 'If an account exists with that email, a reset link has been sent.',
    })
  } catch (error) {
    console.error('Password reset request error:', error)
    return apiError('Internal server error', 500)
  }
}
