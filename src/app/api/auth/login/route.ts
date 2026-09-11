import { cookies } from 'next/headers'
import { jwtSign, SESSION_CONFIG } from '@/lib/auth/session'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1'

  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return Response.json({ error: 'Email and password required' }, { status: 400 })
    }

    const bcrypt = await import('bcryptjs')
    const { getDb, schema } = await import('@/lib/db')
    const { eq } = await import('drizzle-orm')

    const db = await getDb()
    const users = await db
      .select()
      .from(schema.adminUsers)
      .where(eq(schema.adminUsers.email, email))
      .limit(1)

    const user = users[0]
    if (!user) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const isValid = await bcrypt.compare(password, user.passwordHash)
    if (!isValid) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const session = await jwtSign({ id: String(user.id), email: user.email, name: 'Muhammad Taha' })

    const cookieStore = await cookies()
    cookieStore.set(SESSION_CONFIG.cookieName, session, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_CONFIG.maxAge,
    })

    return Response.json({ success: true })
  } catch (err) {
    console.error('Login error:', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
