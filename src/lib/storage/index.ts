const BUCKET = () => process.env.R2_BUCKET_NAME || ''
const PUBLIC_URL = () => process.env.R2_PUBLIC_URL || ''
const ACCOUNT_ID = () => process.env.CLOUDFLARE_ACCOUNT_ID || ''
const ACCESS_KEY = () => process.env.R2_ACCESS_KEY_ID || ''
const SECRET_KEY = () => process.env.R2_SECRET_ACCESS_KEY || ''

function hmacSha256(key: CryptoKey, data: string): Promise<ArrayBuffer> {
  return crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data))
}

async function signRequest(
  method: string,
  path: string,
  contentType: string,
  date: string
): Promise<string> {
  const stringToSign = `${method}\n\n${contentType}\n${date}\n${path}`
  const keyData = new TextEncoder().encode(SECRET_KEY())
  const key = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await hmacSha256(key, stringToSign)
  const signatureHex = Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
  return `AWS4-HMAC-SHA256 Credential=${ACCESS_KEY()}/$(date)/auto/s3/aws4_request, SignedHeaders=content-type;host;x-amz-content-sha256;x-amz-date, Signature=${signatureHex}`
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
  const path = `/${BUCKET()}/${filename}`
  const date = new Date().toUTCString()
  const contentSha256 = await crypto.subtle.digest('SHA-256', buffer).then((buf) =>
    Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
  )

  const auth = await signRequest('PUT', path, file.type, date)

  const res = await fetch(`https://${host}${path}`, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type,
      Host: host,
      'x-amz-date': date,
      'x-amz-content-sha256': contentSha256,
      Authorization: auth,
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
  const path = `/${BUCKET()}/${key}`
  const date = new Date().toUTCString()

  const auth = await signRequest('DELETE', path, '', date)

  const res = await fetch(`https://${host}${path}`, {
    method: 'DELETE',
    headers: {
      Host: host,
      'x-amz-date': date,
      'x-amz-content-sha256': 'UNSIGNED-PAYLOAD',
      Authorization: auth,
    },
  })

  if (!res.ok) {
    const errText = await res.text()
    console.error('R2 DELETE failed:', res.status, errText)
    return { success: false, error: `R2 error ${res.status}` }
  }

  return { success: true }
}
