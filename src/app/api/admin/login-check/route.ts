import { NextResponse } from 'next/server'

export async function GET() {
  const hasSecret = !!process.env.NEXTAUTH_SECRET
  const hasDbUrl = !!process.env.TURSO_DATABASE_URL
  const hasDbToken = !!process.env.TURSO_AUTH_TOKEN

  let dbOk = false
  try {
    const { getDb } = await import('@/lib/db')
    const db = await getDb()
    dbOk = true
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ ok: false, step: 'db', error: msg, hasSecret, hasDbUrl, hasDbToken })
  }

  let authOk = false
  let authOptionsRef: unknown = null
  try {
    const mod = await import('@/lib/auth')
    authOptionsRef = mod.authOptions
    authOk = true
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ ok: false, step: 'auth-import', error: msg, hasSecret, dbOk })
  }

  let nextAuthOk = false
  try {
    const { default: NextAuth } = await import('next-auth')
    const handler = NextAuth(authOptionsRef as Parameters<typeof NextAuth>[0])
    nextAuthOk = true
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({
      ok: false,
      step: 'nextauth-init',
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
