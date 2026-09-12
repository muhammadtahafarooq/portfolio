export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = body?.email as string
    const password = body?.password as string

    const bcrypt = await import('bcryptjs')
    const { getDb, schema } = await import('@/lib/db')
    const { eq } = await import('drizzle-orm')
    const { cookies } = await import('next/headers')
    const { jwtSign, SESSION_CONFIG } = await import('@/lib/auth/session')

    const db = await getDb()

    const users = await db
      .select()
      .from(schema.adminUsers)
      .where(eq(schema.adminUsers.email, email))
      .limit(1)

    if (users.length === 0) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const user = users[0]
    const isValid = await bcrypt.compare(password, user.passwordHash)

    if (!isValid) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = await jwtSign({ id: String(user.id), email: user.email, name: 'Muhammad Taha' })

    const cookieStore = await cookies()
    cookieStore.set(SESSION_CONFIG.cookieName, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_CONFIG.maxAge,
    })

    return Response.json({ success: true })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('Login error:', msg)
    return Response.json({ error: 'Login failed' }, { status: 500 })
  }
}
