import { db, schema } from '@/lib/db'
import { requireAuth, apiError, apiSuccess } from '@/lib/api-helpers'
import { achievementSchema } from '@/lib/validators'

export async function GET() {
  const { session, error } = await requireAuth()
  if (error) return error

  try {
    const achievements = await db.select().from(schema.achievements)
    return apiSuccess(achievements)
  } catch (error) {
    return apiError('Failed to fetch achievements')
  }
}

export async function POST(request: Request) {
  const { session, error } = await requireAuth()
  if (error) return error

  try {
    const body = await request.json()
    const parsed = achievementSchema.safeParse(body)

    if (!parsed.success) {
      return apiError('Validation failed', 400)
    }

    const result = await db.insert(schema.achievements).values(parsed.data).returning()

    return apiSuccess(result[0], 201)
  } catch (error) {
    return apiError('Failed to create achievement')
  }
}
