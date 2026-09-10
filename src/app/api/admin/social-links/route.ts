import { db, schema } from '@/lib/db'
import { requireAuth, apiError, apiSuccess } from '@/lib/api-helpers'
import { socialLinkSchema } from '@/lib/validators'

export async function GET() {
  const { session, error } = await requireAuth()
  if (error) return error

  try {
    const links = await db.select().from(schema.socialLinks)
    return apiSuccess(links)
  } catch (error) {
    return apiError('Failed to fetch social links')
  }
}

export async function POST(request: Request) {
  const { session, error } = await requireAuth()
  if (error) return error

  try {
    const body = await request.json()
    const parsed = socialLinkSchema.safeParse(body)

    if (!parsed.success) {
      return apiError('Validation failed', 400)
    }

    const result = await db.insert(schema.socialLinks).values(parsed.data).returning()

    return apiSuccess(result[0], 201)
  } catch (error) {
    return apiError('Failed to create social link')
  }
}
