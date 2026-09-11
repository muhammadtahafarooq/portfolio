export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const steps: string[] = []

  try {
    steps.push('parsing body')
    const body = await request.json()
    const email = body?.email as string
    const password = body?.password as string
    steps.push(`email=${email}`)

    steps.push('importing modules')
    const bcrypt = await import('bcryptjs')
    const { getDb, schema } = await import('@/lib/db')
    const { eq } = await import('drizzle-orm')
    const { cookies } = await import('next/headers')
    const { jwtSign, SESSION_CONFIG } = await import('@/lib/auth/session')
    steps.push('modules imported')

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
    console.error('Login error:', msg, steps)
    return Response.json({ error: msg, steps }, { status: 500 })
  }
}
