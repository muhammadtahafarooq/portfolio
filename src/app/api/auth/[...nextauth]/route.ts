import { NextRequest, NextResponse } from 'next/server'
import { isRateLimited, getRemainingTime } from '@/lib/rate-limit'

function createNodeResponse() {
  let _status = 200
  const _headers = new Headers()
  let _body: string | null = null

  const res: any = {
    get statusCode() {
      return _status
    },
    set statusCode(code: number) {
      _status = code
    },
    setHeader(name: string, value: string | string[]) {
      _headers.set(name, Array.isArray(value) ? value.join(', ') : value)
      return res
    },
    getHeader(name: string) {
      return _headers.get(name) || undefined
    },
    removeHeader(name: string) {
      _headers.delete(name)
    },
    status(code: number) {
      _status = code
      res.statusCode = code
      return res
    },
    end(body?: string) {
      if (body !== undefined) _body = body
    },
    write(body: string) {
      _body = (_body || '') + body
    },
    writeHead(code: number, headers?: Record<string, string>) {
      _status = code
      res.statusCode = code
      if (headers) {
        for (const [k, v] of Object.entries(headers)) {
          _headers.set(k, v)
        }
      }
      return res
    },
    getHeaders() {
      return Object.fromEntries(_headers.entries())
    },
    _toResponse() {
      return new NextResponse(_body || '', {
        status: _status,
        headers: Object.fromEntries(_headers.entries()),
      })
    },
  }
  return res
}

async function handleRequest(request: NextRequest, method: 'GET' | 'POST') {
  if (method === 'POST') {
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1'

    if (isRateLimited(ip)) {
      const remaining = Math.ceil(getRemainingTime(ip) / 60000)
      return NextResponse.json(
        { error: `Too many login attempts. Try again in ${remaining} minutes.` },
        { status: 429 }
      )
    }
  }

  const { default: NextAuth } = await import('next-auth')
  const { authOptions } = await import('@/lib/auth')
  const handler = NextAuth(authOptions)

  const url = new URL(request.url)
  const pathParts = url.pathname.replace('/api/auth/', '').split('/').filter(Boolean)
  const query = { nextauth: pathParts }

  const nodeReq = Object.create(request, {
    query: { value: query, writable: true },
  })

  const nodeRes = createNodeResponse()

  await handler(nodeReq, nodeRes)

  return nodeRes._toResponse()
}

export async function GET(request: NextRequest) {
  try {
    return await handleRequest(request, 'GET')
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('NextAuth GET error:', msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    return await handleRequest(request, 'POST')
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('NextAuth POST error:', msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
