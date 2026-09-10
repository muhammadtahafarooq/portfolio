import { db, schema } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { requireAuth, apiError, apiSuccess, validateId, invalidIdResponse } from '@/lib/api-helpers'
import { educationSchema } from '@/lib/validators'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { session, error } = await requireAuth()
  if (error) return error

  const { id } = await params
  const numericId = validateId(id)
  if (numericId === null) return invalidIdResponse()

  try {
    const item = await db
      .select()
      .from(schema.education)
      .where(eq(schema.education.id, numericId))
      .limit(1)

    if (item.length === 0) {
      return apiError('Education not found', 404)
    }

    return apiSuccess(item[0])
  } catch {
    return apiError('Failed to fetch education')
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { session, error } = await requireAuth()
  if (error) return error

  const { id } = await params
  const numericId = validateId(id)
  if (numericId === null) return invalidIdResponse()

  try {
    const body = await request.json()
    const parsed = educationSchema.safeParse(body)

    if (!parsed.success) {
      return apiError('Invalid input', 400)
    }

    const result = await db
      .update(schema.education)
      .set(parsed.data)
      .where(eq(schema.education.id, numericId))
      .returning()

    if (result.length === 0) {
      return apiError('Education not found', 404)
    }

    return apiSuccess(result[0])
  } catch {
    return apiError('Failed to update education')
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { session, error } = await requireAuth()
  if (error) return error

  const { id } = await params
  const numericId = validateId(id)
  if (numericId === null) return invalidIdResponse()

  try {
    const result = await db
      .delete(schema.education)
      .where(eq(schema.education.id, numericId))
      .returning()

    if (result.length === 0) {
      return apiError('Education not found', 404)
    }

    return apiSuccess({ success: true })
  } catch {
    return apiError('Failed to delete education')
  }
}
