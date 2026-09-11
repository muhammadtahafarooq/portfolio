import { getDb, schema } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { requireAuth, apiError, apiSuccess } from '@/lib/api-helpers'
import { aboutSchema } from '@/lib/validators'

export async function GET() {
  const db = await getDb()
  try {
    const { session, error } = await requireAuth()
    if (error) return error

    const result = await db.select().from(schema.about).limit(1)
    return apiSuccess(result[0] || null)
  } catch {
    return apiError('Failed to fetch about')
  }
}

export async function PUT(request: Request) {
  const db = await getDb()
  try {
    const { session, error } = await requireAuth()
    if (error) return error

    const body = await request.json()
    const parsed = aboutSchema.safeParse(body)

    if (!parsed.success) {
      return apiError('Invalid input', 400)
    }

    const existing = await db.select().from(schema.about).limit(1)

    if (existing.length > 0) {
      const result = await db
        .update(schema.about)
        .set(parsed.data)
        .where(eq(schema.about.id, existing[0].id))
        .returning()

      return apiSuccess(result[0])
    }

    const result = await db.insert(schema.about).values(parsed.data).returning()

    return apiSuccess(result[0], 201)
  } catch {
    return apiError('Failed to update about')
  }
}
