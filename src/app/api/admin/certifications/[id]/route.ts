import { db, schema } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { requireAuth, apiError, apiSuccess, validateId, invalidIdResponse } from '@/lib/api-helpers'
import { certificationSchema } from '@/lib/validators'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { session, error } = await requireAuth()
  if (error) return error

  const { id } = await params
  const numId = validateId(id)
  if (numId === null) return invalidIdResponse()

  try {
    const item = await db
      .select()
      .from(schema.certifications)
      .where(eq(schema.certifications.id, numId))
      .limit(1)

    if (item.length === 0) {
      return apiError('Not found', 404)
    }

    return apiSuccess(item[0])
  } catch (error) {
    return apiError('Failed to fetch certification')
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { session, error } = await requireAuth()
  if (error) return error

  const { id } = await params
  const numId = validateId(id)
  if (numId === null) return invalidIdResponse()

  try {
    const body = await request.json()
    const parsed = certificationSchema.safeParse(body)

    if (!parsed.success) {
      return apiError('Validation failed', 400)
    }

    const result = await db
      .update(schema.certifications)
      .set(parsed.data)
      .where(eq(schema.certifications.id, numId))
      .returning()

    if (result.length === 0) {
      return apiError('Not found', 404)
    }

    return apiSuccess(result[0])
  } catch (error) {
    return apiError('Failed to update certification')
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { session, error } = await requireAuth()
  if (error) return error

  const { id } = await params
  const numId = validateId(id)
  if (numId === null) return invalidIdResponse()

  try {
    const result = await db
      .delete(schema.certifications)
      .where(eq(schema.certifications.id, numId))
      .returning()

    if (result.length === 0) {
      return apiError('Not found', 404)
    }

    return apiSuccess({ success: true })
  } catch (error) {
    return apiError('Failed to delete certification')
  }
}
