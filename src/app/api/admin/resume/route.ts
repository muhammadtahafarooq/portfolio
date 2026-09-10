import { db, schema } from '@/lib/db'
import { requireAuth, apiError, apiSuccess } from '@/lib/api-helpers'
import { resumeSchema } from '@/lib/validators'

export async function GET() {
  try {
    const { session, error } = await requireAuth()
    if (error) return error

    const result = await db.select().from(schema.resume).limit(1)
    return apiSuccess(result[0] || null)
  } catch {
    return apiError('Failed to fetch resume')
  }
}

export async function PUT(request: Request) {
  try {
    const { session, error } = await requireAuth()
    if (error) return error

    const body = await request.json()
    const parsed = resumeSchema.safeParse(body)

    if (!parsed.success) {
      return apiError('Invalid input', 400)
    }

    const existing = await db.select().from(schema.resume).limit(1)

    if (existing.length > 0) {
      const result = await db.update(schema.resume).set(parsed.data).returning()

      return apiSuccess(result[0])
    }

    const result = await db.insert(schema.resume).values(parsed.data).returning()

    return apiSuccess(result[0], 201)
  } catch {
    return apiError('Failed to update resume')
  }
}
