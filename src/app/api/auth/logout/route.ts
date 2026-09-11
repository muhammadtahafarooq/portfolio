import { NextResponse } from 'next/server'
import { deleteSession } from '@/lib/auth/session'

export async function POST() {
  await deleteSession()
  return NextResponse.json({ success: true })
}

export async function GET() {
  await deleteSession()
  return NextResponse.redirect(
    new URL('/admin/login', process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio-d94.pages.dev')
  )
}
