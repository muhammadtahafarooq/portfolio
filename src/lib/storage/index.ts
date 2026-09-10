import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'

const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
})

const BUCKET = process.env.R2_BUCKET_NAME || ''
const PUBLIC_URL = process.env.R2_PUBLIC_URL || ''

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
    await r2.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: filename,
        Body: buffer,
        ContentType: file.type,
      })
    )

    const url = `${PUBLIC_URL}/${filename}`
    return { url, success: true }
  } catch (error) {
    console.error('Upload failed:', error)
    return { success: false, error: 'Upload failed' }
  }
}

export async function deleteImage(url: string) {
  try {
    const key = url.replace(`${PUBLIC_URL}/`, '')
    await r2.send(
      new DeleteObjectCommand({
        Bucket: BUCKET,
        Key: key,
      })
    )
    return { success: true }
  } catch (error) {
    console.error('Delete failed:', error)
    return { success: false, error: 'Delete failed' }
  }
}
