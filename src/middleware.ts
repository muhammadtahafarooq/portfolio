import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const SECRET = new TextEncoder().encode(process.env.NEXTAUTH_SECRET!)
const COOKIE_NAME = 'admin-session'

const publicAdminPaths = ['/admin/login', '/admin/forgot-password', '/admin/reset-password']

const securityHeaders: Record<string, string> = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
}

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  const response = NextResponse.next()

  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://*.r2.cloudflarestorage.com https://*.libsql.io wss:; frame-ancestors 'none'"
  )

  if (publicAdminPaths.includes(path)) {
    return response
  }

  try {
    const token = req.cookies.get(COOKIE_NAME)?.value

    if (path.startsWith('/admin') || path.startsWith('/api/admin')) {
      if (!token) {
        const loginUrl = new URL('/admin/login', req.url)
        loginUrl.searchParams.set('callbackUrl', req.url)
        return NextResponse.redirect(loginUrl)
      }

      const { payload } = await jwtVerify(token, SECRET)
      if (!payload || !payload.email) {
        const loginUrl = new URL('/admin/login', req.url)
        return NextResponse.redirect(loginUrl)
      }
    }
  } catch (err) {
    console.error('Middleware auth error:', err)
    if (path.startsWith('/admin') || path.startsWith('/api/admin')) {
      const loginUrl = new URL('/admin/login', req.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
