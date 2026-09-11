import { getDb, schema } from '@/lib/db'
import { requireAuth, apiError, apiSuccess } from '@/lib/api-helpers'

export async function GET() {
  const db = await getDb()
  try {
    const { session, error } = await requireAuth()
    if (error) return error

    const messages = await db.select().from(schema.contactMessages)
    return apiSuccess(messages)
  } catch (error) {
    return apiError('Failed to fetch messages', 500)
  }
}
