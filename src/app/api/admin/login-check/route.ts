import { NextResponse } from 'next/server'

export async function GET() {
  const hasSecret = !!process.env.NEXTAUTH_SECRET
  const hasDbUrl = !!process.env.TURSO_DATABASE_URL
  const hasDbToken = !!process.env.TURSO_AUTH_TOKEN

  let dbOk = false
  try {
    const { getDb } = await import('@/lib/db')
    await getDb()
    dbOk = true
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ ok: false, step: 'db', error: msg, hasSecret, hasDbUrl, hasDbToken })
  }

  let authOk = false
  try {
    await import('@/lib/auth')
    authOk = true
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ ok: false, step: 'auth-import', error: msg, hasSecret, dbOk })
  }

  let nextAuthOk = false
  try {
    const NextAuthModule = await import('next-auth')
    const NextAuth = NextAuthModule.default
    if (typeof NextAuth !== 'function') {
      return NextResponse.json({
        ok: false,
        step: 'nextauth-type',
        error: `NextAuth is ${typeof NextAuth}`,
        hasSecret,
        dbOk,
        authOk,
      })
    }
    nextAuthOk = true
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({
      ok: false,
      step: 'nextauth-import',
      error: msg,
      hasSecret,
      dbOk,
      authOk,
    })
  }

  return NextResponse.json({ ok: true, hasSecret, dbOk, authOk, nextAuthOk })
}

export async function POST() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
