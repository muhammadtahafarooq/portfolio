import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'

let _r2: S3Client | null = null

function getR2Client(): S3Client {
  if (!_r2) {
    _r2 = new S3Client({
      region: 'auto',
      endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
      },
    })
  }
  return _r2
}

function getBucket(): string {
  return process.env.R2_BUCKET_NAME || ''
}

function getPublicUrl(): string {
  return process.env.R2_PUBLIC_URL || ''
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
    throw new Error('Invalid file type. Only JPEG, PNG, WebP, and AVIF are allowed.')
  }

  if (file.size > maxSize) {
    throw new Error('File size exceeds 5MB limit.')
  }

  const filename = `${folder}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
  const buffer = Buffer.from(await file.arrayBuffer())

  try {
    const r2 = getR2Client()
    await r2.send(
      new PutObjectCommand({
        Bucket: getBucket(),
        Key: filename,
        Body: buffer,
        ContentType: file.type,
      })
    )

    const url = `${getPublicUrl()}/${filename}`
    return { url, success: true }
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('R2 upload failed:', msg)
    return { success: false, error: msg }
  }
}

export async function deleteImage(url: string) {
  try {
    const key = url.replace(`${getPublicUrl()}/`, '')
    const r2 = getR2Client()
    await r2.send(
      new DeleteObjectCommand({
        Bucket: getBucket(),
        Key: key,
      })
    )
    return { success: true }
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('R2 delete failed:', msg)
    return { success: false, error: msg }
  }
}
