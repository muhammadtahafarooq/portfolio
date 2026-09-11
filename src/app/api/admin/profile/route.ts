import { getDb, schema } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { requireAuth, apiError, apiSuccess } from '@/lib/api-helpers'
import { profileSchema } from '@/lib/validators'

export async function GET() {
  const db = await getDb()
  try {
    const { session, error } = await requireAuth()
    if (error) return error

    const profile = await db.select().from(schema.profile).limit(1)
    return apiSuccess(profile[0] || null)
  } catch {
    return apiError('Failed to fetch profile')
  }
}

export async function PUT(request: Request) {
  const db = await getDb()
  try {
    const { session, error } = await requireAuth()
    if (error) return error

    const body = await request.json()
    const parsed = profileSchema.safeParse(body)

    if (!parsed.success) {
      return apiError('Invalid input', 400)
    }

    const existing = await db.select().from(schema.profile).limit(1)

    if (existing.length > 0) {
      const result = await db
        .update(schema.profile)
        .set(parsed.data)
        .where(eq(schema.profile.id, 1))
        .returning()

      return apiSuccess(result[0])
    }

    const result = await db
      .insert(schema.profile)
      .values({ id: 1, ...parsed.data } as typeof schema.profile.$inferInsert)
      .returning()

    return apiSuccess(result[0], 201)
  } catch {
    return apiError('Failed to update profile')
  }
}
