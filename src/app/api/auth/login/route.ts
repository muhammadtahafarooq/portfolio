import { cookies } from 'next/headers'
import { SESSION_CONFIG } from '@/lib/auth/session'

export async function POST(request: Request) {
  const steps: string[] = []

  try {
    steps.push('parsing body')
    const { email, password } = await request.json()
    steps.push(`email=${email}`)

    steps.push('importing bcryptjs')
    const bcrypt = await import('bcryptjs')
    steps.push('bcryptjs ok')

    steps.push('importing db')
    const { getDb, schema } = await import('@/lib/db')
    const { eq } = await import('drizzle-orm')
    steps.push('db imported')

    steps.push('connecting db')
    const db = await getDb()
    steps.push('db connected')

    steps.push('querying users')
    const users = await db
      .select()
      .from(schema.adminUsers)
      .where(eq(schema.adminUsers.email, email))
      .limit(1)
    steps.push(`found ${users.length} users`)

    if (users.length === 0) {
      return Response.json({ error: 'Invalid credentials', steps }, { status: 401 })
    }

    const user = users[0]
    steps.push('comparing password')
    const isValid = await bcrypt.compare(password, user.passwordHash)
    steps.push(`valid=${isValid}`)

    if (!isValid) {
      return Response.json({ error: 'Invalid credentials', steps }, { status: 401 })
    }

    steps.push('signing jwt')
    const { jwtSign } = await import('@/lib/auth/session')
    const token = await jwtSign({ id: String(user.id), email: user.email, name: 'Muhammad Taha' })
    steps.push('jwt signed')

    steps.push('setting cookie')
    const cookieStore = await cookies()
    cookieStore.set(SESSION_CONFIG.cookieName, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_CONFIG.maxAge,
    })
    steps.push('cookie set')

    return Response.json({ success: true, steps })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('Login error:', err)
    return Response.json({ error: msg, steps }, { status: 500 })
  }
}
