import { getDb, schema } from '@/lib/db'
import { requireAuth, apiError, apiSuccess } from '@/lib/api-helpers'
import { technologySchema } from '@/lib/validators'

export async function GET() {
  const db = await getDb()
  try {
    const { session, error } = await requireAuth()
    if (error) return error

    const technologies = await db.select().from(schema.technologies)
    return apiSuccess(technologies)
  } catch (error) {
    return apiError('Failed to fetch technologies', 500)
  }
}

export async function POST(request: Request) {
  const db = await getDb()
  try {
    const { session, error } = await requireAuth()
    if (error) return error

    const body = await request.json()
    const parsed = technologySchema.safeParse(body)

    if (!parsed.success) {
      return apiError('Invalid input', 400)
    }

    const result = await db.insert(schema.technologies).values(parsed.data).returning()

    return apiSuccess(result[0], 201)
  } catch (error) {
    return apiError('Failed to create technology', 500)
  }
}
