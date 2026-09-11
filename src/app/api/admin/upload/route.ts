import { NextResponse } from 'next/server'
import { requireAuth, apiError, apiSuccess } from '@/lib/api-helpers'
import { uploadImage } from '@/lib/storage'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
const MAX_SIZE = 5 * 1024 * 1024

export async function POST(request: Request) {
  const { session, error } = await requireAuth()
  if (error) return error

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const folder = (formData.get('folder') as string) || 'uploads'

    if (!file) {
      return apiError('No file provided', 400)
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return apiError('Invalid file type. Allowed: JPEG, PNG, WebP, GIF, SVG', 400)
    }

    if (file.size > MAX_SIZE) {
      return apiError('File too large. Maximum size: 5MB', 400)
    }

    const sanitizedFolder = folder.replace(/[^a-zA-Z0-9/_-]/g, '').replace(/\.\./g, '')

    const result = await uploadImage({ file, folder: sanitizedFolder })

    if (!result.success) {
      return Response.json(
        { success: false, error: result.error || 'Failed to upload file', debug: result },
        { status: 500 }
      )
    }

    return apiSuccess({ url: result.url })
  } catch (err) {
    console.error('Upload error:', err)
    return apiError('Failed to upload file', 500)
  }
}
