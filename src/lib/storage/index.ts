import { put, del } from '@vercel/blob'

interface UploadImageProps {
  file: File
  folder?: string
}

export async function uploadImage({ file, folder = 'uploads' }: UploadImageProps) {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']
  const maxSize = 5 * 1024 * 1024 // 5MB

  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type. Only JPEG, PNG, WebP, and AVIF are allowed.')
  }

  if (file.size > maxSize) {
    throw new Error('File size exceeds 5MB limit.')
  }

  const filename = `${folder}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`

  try {
    const blob = await put(filename, file, {
      access: 'public',
    })

    return { url: blob.url, success: true }
  } catch (error) {
    console.error('Upload failed:', error)
    return { success: false, error: 'Upload failed' }
  }
}

export async function deleteImage(url: string) {
  try {
    await del(url)
    return { success: true }
  } catch (error) {
    console.error('Delete failed:', error)
    return { success: false, error: 'Delete failed' }
  }
}
