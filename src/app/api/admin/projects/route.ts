import { db, schema } from '@/lib/db'
import { requireAuth, apiError, apiSuccess } from '@/lib/api-helpers'
import { projectSchema } from '@/lib/validators'

export async function GET() {
  try {
    const { session, error } = await requireAuth()
    if (error) return error

    const projects = await db.select().from(schema.projects)
    return apiSuccess(projects)
  } catch (error) {
    return apiError('Failed to fetch projects', 500)
  }
}

export async function POST(request: Request) {
  try {
    const { session, error } = await requireAuth()
    if (error) return error

    const body = await request.json()
    const parsed = projectSchema.safeParse(body)

    if (!parsed.success) {
      return apiError('Invalid input', 400)
    }

    const result = await db.insert(schema.projects).values(parsed.data).returning()

    return apiSuccess(result[0], 201)
  } catch (error) {
    return apiError('Failed to create project', 500)
  }
}
