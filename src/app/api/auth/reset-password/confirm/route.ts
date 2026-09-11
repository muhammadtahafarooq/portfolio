import { eq, and } from 'drizzle-orm'
import bcrypt from 'bcryptjs'
import { getDb, schema } from '@/lib/db'
import { apiError, apiSuccess } from '@/lib/api-helpers'

export async function POST(request: Request) {
  const db = await getDb()
  try {
    const body = await request.json()
    const { token, password } = body

    if (!token || typeof token !== 'string') {
      return apiError('Token is required', 400)
    }

    if (!password || typeof password !== 'string' || password.length < 8) {
      return apiError('Password must be at least 8 characters', 400)
    }

    const tokens = await db
      .select()
      .from(schema.passwordResetTokens)
      .where(
        and(eq(schema.passwordResetTokens.token, token), eq(schema.passwordResetTokens.used, false))
      )
      .limit(1)

    const resetToken = tokens[0]
    if (!resetToken) {
      return apiError('Invalid or expired reset token', 400)
    }

    if (new Date(resetToken.expiresAt) < new Date()) {
      return apiError('Reset token has expired', 400)
    }

    const passwordHash = await bcrypt.hash(password, 12)

    await db
      .update(schema.adminUsers)
      .set({ passwordHash })
      .where(eq(schema.adminUsers.email, resetToken.email))

    await db
      .update(schema.passwordResetTokens)
      .set({ used: true })
      .where(eq(schema.passwordResetTokens.id, resetToken.id))

    return apiSuccess({ success: true, message: 'Password updated successfully' })
  } catch (error) {
    console.error('Password reset error:', error)
    return apiError('Internal server error', 500)
  }
}
