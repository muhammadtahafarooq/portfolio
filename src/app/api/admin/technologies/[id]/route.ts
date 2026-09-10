import { db, schema } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { requireAuth, apiError, apiSuccess, validateId, invalidIdResponse } from '@/lib/api-helpers'
import { technologySchema } from '@/lib/validators'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { session, error } = await requireAuth()
    if (error) return error

    const { id } = await params
    const numericId = validateId(id)
    if (numericId === null) return invalidIdResponse()

    const item = await db
      .select()
      .from(schema.technologies)
      .where(eq(schema.technologies.id, numericId))
      .limit(1)

    if (item.length === 0) {
      return apiError('Technology not found', 404)
    }

    return apiSuccess(item[0])
  } catch (error) {
    return apiError('Failed to fetch technology', 500)
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { session, error } = await requireAuth()
    if (error) return error

    const { id } = await params
    const numericId = validateId(id)
    if (numericId === null) return invalidIdResponse()

    const body = await request.json()
    const parsed = technologySchema.safeParse(body)

    if (!parsed.success) {
      return apiError('Invalid input', 400)
    }

    const result = await db
      .update(schema.technologies)
      .set(parsed.data)
      .where(eq(schema.technologies.id, numericId))
      .returning()

    if (result.length === 0) {
      return apiError('Technology not found', 404)
    }

    return apiSuccess(result[0])
  } catch (error) {
    return apiError('Failed to update technology', 500)
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { session, error } = await requireAuth()
    if (error) return error

    const { id } = await params
    const numericId = validateId(id)
    if (numericId === null) return invalidIdResponse()

    const result = await db
      .delete(schema.technologies)
      .where(eq(schema.technologies.id, numericId))
      .returning()

    if (result.length === 0) {
      return apiError('Technology not found', 404)
    }

    return apiSuccess({ deleted: true })
  } catch (error) {
    return apiError('Failed to delete technology', 500)
  }
}
