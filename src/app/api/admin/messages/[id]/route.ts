import { db, schema } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { requireAuth, apiError, apiSuccess, validateId, invalidIdResponse } from '@/lib/api-helpers'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { session, error } = await requireAuth()
    if (error) return error

    const { id } = await params
    const numericId = validateId(id)
    if (numericId === null) return invalidIdResponse()

    await db
      .update(schema.contactMessages)
      .set({ isRead: true })
      .where(eq(schema.contactMessages.id, numericId))

    const message = await db
      .select()
      .from(schema.contactMessages)
      .where(eq(schema.contactMessages.id, numericId))
      .limit(1)

    if (message.length === 0) {
      return apiError('Message not found', 404)
    }

    return apiSuccess(message[0])
  } catch (error) {
    return apiError('Failed to fetch message', 500)
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
      .delete(schema.contactMessages)
      .where(eq(schema.contactMessages.id, numericId))
      .returning()

    if (result.length === 0) {
      return apiError('Message not found', 404)
    }

    return apiSuccess({ deleted: true })
  } catch (error) {
    return apiError('Failed to delete message', 500)
  }
}
