import { getDb, schema } from '@/lib/db'
import { requireAuth, apiError, apiSuccess } from '@/lib/api-helpers'
import { skillSchema } from '@/lib/validators'

export async function GET() {
  const db = await getDb()
  const { session, error } = await requireAuth()
  if (error) return error

  try {
    const skills = await db.select().from(schema.skills)
    return apiSuccess(skills)
  } catch {
    return apiError('Failed to fetch skills')
  }
}

export async function POST(request: Request) {
  const db = await getDb()
  const { session, error } = await requireAuth()
  if (error) return error

  try {
    const body = await request.json()
    const parsed = skillSchema.safeParse(body)

    if (!parsed.success) {
      return apiError('Invalid input', 400)
    }

    const result = await db.insert(schema.skills).values(parsed.data).returning()

    return apiSuccess(result[0], 201)
  } catch {
    return apiError('Failed to create skill')
  }
}
