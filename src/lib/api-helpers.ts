import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export function apiError(message: string, status: number = 500) {
  return NextResponse.json({ success: false, error: message }, { status })
}

export function apiSuccess<T>(data: T, status: number = 200) {
  return NextResponse.json({ success: true, data }, { status })
}

export async function requireAuth() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return { session: null, error: apiError('Unauthorized', 401) }
  }
  return { session, error: null }
}

export function validateId(id: string): number | null {
  const num = Number(id)
  if (isNaN(num) || !Number.isInteger(num) || num <= 0) {
    return null
  }
  return num
}

export function invalidIdResponse() {
  return apiError('Invalid ID parameter', 400)
}
