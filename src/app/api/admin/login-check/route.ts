import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const envCheck = {
      hasDbUrl: !!process.env.TURSO_DATABASE_URL,
      hasNextAuth: !!process.env.NEXTAUTH_SECRET,
      nodeEnv: process.env.NODE_ENV,
      hasSchema: true,
    }

    const { getDb } = await import('@/lib/db')
    const db = await getDb()
    envCheck.hasSchema = true

    return NextResponse.json({ success: true, envCheck })
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message, stack: err.stack },
      { status: 500 }
    )
  }
}

export async function POST() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
