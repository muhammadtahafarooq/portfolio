import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const steps: string[] = []

  try {
    steps.push('1. Parsing body')
    const { email, password } = await request.json()
    steps.push(`2. email=${email}, password_len=${password?.length}`)

    steps.push('3. Importing bcryptjs')
    const bcrypt = await import('bcryptjs')
    steps.push('4. bcryptjs imported')

    steps.push('5. Importing drizzle')
    const { eq } = await import('drizzle-orm')
    steps.push('6. drizzle imported')

    steps.push('7. Importing db')
    const { getDb, schema } = await import('@/lib/db')
    steps.push('8. db imported')

    steps.push('9. Calling getDb()')
    const db = await getDb()
    steps.push('10. getDb() succeeded')

    steps.push('11. Querying admin_users')
    const users = await db
      .select()
      .from(schema.adminUsers)
      .where(eq(schema.adminUsers.email, email))
      .limit(1)
    steps.push(`12. Query succeeded, found ${users.length} users`)

    if (users.length === 0) {
      steps.push('13. No user found')
      return Response.json({ ok: false, steps, error: 'No user found' })
    }

    const user = users[0]
    steps.push(`13. User found: id=${user.id}, email=${user.email}`)

    steps.push('14. Comparing password')
    const isValid = await bcrypt.compare(password, user.passwordHash)
    steps.push(`15. Password valid: ${isValid}`)

    if (!isValid) {
      return Response.json({ ok: false, steps, error: 'Invalid password' })
    }

    steps.push('16. Importing session')
    const { jwtSign } = await import('@/lib/auth/session')
    steps.push('17. Signing JWT')
    const token = await jwtSign({ id: String(user.id), email: user.email, name: 'Muhammad Taha' })
    steps.push(`18. JWT created, length=${token.length}`)

    steps.push('19. Setting cookie')
    const { cookies } = await import('next/headers')
    const cookieStore = await cookies()
    cookieStore.set('admin-session', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 300,
    })
    steps.push('20. Cookie set')

    return Response.json({ ok: true, steps })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    const stack = err instanceof Error ? err.stack : undefined
    return Response.json({ ok: false, steps, error: msg, stack })
  }
}
