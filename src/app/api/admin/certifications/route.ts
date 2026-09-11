import { getDb, schema } from '@/lib/db'
import { requireAuth, apiError, apiSuccess } from '@/lib/api-helpers'
import { certificationSchema } from '@/lib/validators'

export async function GET() {
  const db = await getDb()
  const { session, error } = await requireAuth()
  if (error) return error

  try {
    const certifications = await db.select().from(schema.certifications)
    return apiSuccess(certifications)
  } catch (error) {
    return apiError('Failed to fetch certifications')
  }
}

export async function POST(request: Request) {
  const db = await getDb()
  const { session, error } = await requireAuth()
  if (error) return error

  try {
    const body = await request.json()
    const parsed = certificationSchema.safeParse(body)

    if (!parsed.success) {
      return apiError('Validation failed', 400)
    }

    const result = await db.insert(schema.certifications).values(parsed.data).returning()

    return apiSuccess(result[0], 201)
  } catch (error) {
    return apiError('Failed to create certification')
  }
}
