import { db, schema } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { requireAuth, apiError, apiSuccess } from '@/lib/api-helpers'
import { siteSettingsSchema } from '@/lib/validators'

export async function GET() {
  try {
    const { session, error } = await requireAuth()
    if (error) return error

    const settings = await db.select().from(schema.siteSettings).limit(1)
    return apiSuccess(settings[0] || null)
  } catch {
    return apiError('Failed to fetch settings')
  }
}

export async function PUT(request: Request) {
  try {
    const { session, error } = await requireAuth()
    if (error) return error

    const body = await request.json()
    const parsed = siteSettingsSchema.safeParse(body)

    if (!parsed.success) {
      return apiError('Invalid input', 400)
    }

    const existing = await db.select().from(schema.siteSettings).limit(1)

    if (existing.length > 0) {
      const result = await db
        .update(schema.siteSettings)
        .set(parsed.data)
        .where(eq(schema.siteSettings.id, 1))
        .returning()

      return apiSuccess(result[0])
    }

    const result = await db
      .insert(schema.siteSettings)
      .values({ id: 1, ...parsed.data } as typeof schema.siteSettings.$inferInsert)
      .returning()

    return apiSuccess(result[0], 201)
  } catch {
    return apiError('Failed to update settings')
  }
}
