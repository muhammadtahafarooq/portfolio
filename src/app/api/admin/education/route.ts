import { db, schema } from '@/lib/db'
import { requireAuth, apiError, apiSuccess } from '@/lib/api-helpers'
import { educationSchema } from '@/lib/validators'

export async function GET() {
  const { session, error } = await requireAuth()
  if (error) return error

  try {
    const education = await db.select().from(schema.education)
    return apiSuccess(education)
  } catch {
    return apiError('Failed to fetch education')
  }
}

export async function POST(request: Request) {
  const { session, error } = await requireAuth()
  if (error) return error

  try {
    const body = await request.json()
    const parsed = educationSchema.safeParse(body)

    if (!parsed.success) {
      return apiError('Invalid input', 400)
    }

    const result = await db.insert(schema.education).values(parsed.data).returning()

    return apiSuccess(result[0], 201)
  } catch {
    return apiError('Failed to create education')
  }
}
