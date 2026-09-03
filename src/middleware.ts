import { withAuth } from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      const path = req.nextUrl.pathname

      // Admin routes require authentication
      if (path.startsWith('/admin') || path.startsWith('/api/admin')) {
        return !!token
      }

      // All other routes are public
      return true
    },
  },
})

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
