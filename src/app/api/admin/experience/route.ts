import { db, schema } from '@/lib/db'
import { requireAuth, apiError, apiSuccess } from '@/lib/api-helpers'
import { experienceSchema } from '@/lib/validators'

export async function GET() {
  const { session, error } = await requireAuth()
  if (error) return error

  try {
    const experience = await db.select().from(schema.experience)
    return apiSuccess(experience)
  } catch {
    return apiError('Failed to fetch experience')
  }
}

export async function POST(request: Request) {
  const { session, error } = await requireAuth()
  if (error) return error

  try {
    const body = await request.json()
    const parsed = experienceSchema.safeParse(body)

    if (!parsed.success) {
      return apiError('Invalid input', 400)
    }

    const result = await db.insert(schema.experience).values(parsed.data).returning()

    return apiSuccess(result[0], 201)
  } catch {
    return apiError('Failed to create experience')
  }
}
