import { SignJWT, jwtVerify as joseVerify } from 'jose'
import { cookies } from 'next/headers'

const SECRET = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || 'fallback-secret')

export const SESSION_CONFIG = {
  cookieName: 'admin-session',
  maxAge: 5 * 60,
}

export interface SessionUser {
  id: string
  email: string
  name: string
}

export async function jwtSign(payload: SessionUser): Promise<string> {
  return new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_CONFIG.maxAge}s`)
    .sign(SECRET)
}

export async function jwtVerify(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await joseVerify(token, SECRET)
    return payload as unknown as SessionUser
  } catch {
    return null
  }
}

export async function createSession(user: SessionUser) {
  const token = await jwtSign(user)
  const cookieStore = await cookies()
  cookieStore.set(SESSION_CONFIG.cookieName, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_CONFIG.maxAge,
  })
}

export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(SESSION_CONFIG.cookieName)?.value
    if (!token) return null
    return await jwtVerify(token)
  } catch {
    return null
  }
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_CONFIG.cookieName)
}

export async function getSessionFromRequest(request: Request): Promise<SessionUser | null> {
  try {
    const cookieHeader = request.headers.get('cookie') || ''
    const match = cookieHeader.match(new RegExp(`${SESSION_CONFIG.cookieName}=([^;]+)`))
    if (!match) return null
    return await jwtVerify(match[1])
  } catch {
    return null
  }
}
