const BUCKET = () => process.env.R2_BUCKET_NAME || ''
const PUBLIC_URL = () => process.env.R2_PUBLIC_URL || ''
const ACCOUNT_ID = () => process.env.CLOUDFLARE_ACCOUNT_ID || ''
const ACCESS_KEY = () => process.env.R2_ACCESS_KEY_ID || ''
const SECRET_KEY = () => process.env.R2_SECRET_ACCESS_KEY || ''

async function hmacSha256(key: CryptoKey, data: string): Promise<ArrayBuffer> {
  return crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data))
}

async function importKey(data: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(data),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
}

async function sha256Hex(data: ArrayBuffer): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

async function signRequest(
  method: string,
  key: string,
  contentType: string,
  date: string,
  payloadHash: string
): Promise<{ authorization: string; payloadHash: string }> {
  const host = `${ACCOUNT_ID()}.r2.cloudflarestorage.com`
  const region = 'auto'
  const service = 's3'

  const credentialScope = `${date}/${region}/${service}/aws4_request`

  // Canonical headers
  const canonicalHeaders = `host:${host}\nx-amz-content-sha256:${payloadHash}\nx-amz-date:${date}\n`
  const signedHeaders = 'host;x-amz-content-sha256;x-amz-date'

  // Canonical request
  const canonicalRequest = [
    method,
    `/${key}`,
    '', // empty query string
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join('\n')

  // Hash canonical request
  const canonicalRequestHash = await sha256Hex(
    new TextEncoder().encode(canonicalRequest).buffer as ArrayBuffer
  )

  // String to sign
  const stringToSign = ['AWS4-HMAC-SHA256', date, credentialScope, canonicalRequestHash].join('\n')

  // Derive signing key
  const secretKey = new TextEncoder().encode(`AWS4${SECRET_KEY()}`)

  const kDateKey = await crypto.subtle.importKey(
    'raw',
    secretKey,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const kDateSig = await hmacSha256(kDateKey, date)

  const kRegionKey = await crypto.subtle.importKey(
    'raw',
    new Uint8Array(kDateSig),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const kRegionSig = await hmacSha256(kRegionKey, region)

  const kServiceKey = await crypto.subtle.importKey(
    'raw',
    new Uint8Array(kRegionSig),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const kServiceSig = await hmacSha256(kServiceKey, service)

  const kSigningKey = await crypto.subtle.importKey(
    'raw',
    new Uint8Array(kServiceSig),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await hmacSha256(kSigningKey, stringToSign)

  const signatureHex = Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')

  const authorization = `AWS4-HMAC-SHA256 Credential=${ACCESS_KEY()}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signatureHex}`

  return { authorization, payloadHash }
}

interface UploadImageProps {
  file: File
  folder?: string
}

export async function uploadImage({ file, folder = 'uploads' }: UploadImageProps) {
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/avif',
    'image/gif',
    'image/svg+xml',
  ]
  const maxSize = 5 * 1024 * 1024

  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type.')
  }
  if (file.size > maxSize) {
    throw new Error('File size exceeds 5MB limit.')
  }

  const filename = `${folder}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
  const buffer = await file.arrayBuffer()
  const host = `${ACCOUNT_ID()}.r2.cloudflarestorage.com`
  const now = new Date()
  const date =
    now
      .toISOString()
      .replace(/[:\-]|\.\d{3}/g, '')
      .slice(0, 15) + 'Z'

  const contentSha256 = await sha256Hex(buffer)
  const { authorization } = await signRequest('PUT', filename, file.type, date, contentSha256)

  const res = await fetch(`https://${host}/${filename}`, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type,
      Host: host,
      'x-amz-date': date,
      'x-amz-content-sha256': contentSha256,
      Authorization: authorization,
    },
    body: buffer,
  })

  if (!res.ok) {
    const errText = await res.text()
    console.error('R2 PUT failed:', res.status, errText)
    return { success: false, error: `R2 error ${res.status}: ${errText.slice(0, 200)}` }
  }

  const url = `${PUBLIC_URL()}/${filename}`
  return { url, success: true }
}

export async function deleteImage(url: string) {
  const key = url.replace(`${PUBLIC_URL()}/`, '')
  const host = `${ACCOUNT_ID()}.r2.cloudflarestorage.com`
  const now = new Date()
  const date =
    now
      .toISOString()
      .replace(/[:\-]|\.\d{3}/g, '')
      .slice(0, 15) + 'Z'

  const { authorization } = await signRequest('DELETE', key, '', date, 'UNSIGNED-PAYLOAD')

  const res = await fetch(`https://${host}/${key}`, {
    method: 'DELETE',
    headers: {
      Host: host,
      'x-amz-date': date,
      'x-amz-content-sha256': 'UNSIGNED-PAYLOAD',
      Authorization: authorization,
    },
  })

  if (!res.ok) {
    const errText = await res.text()
    console.error('R2 DELETE failed:', res.status, errText)
    return { success: false, error: `R2 error ${res.status}` }
  }

  return { success: true }
}
