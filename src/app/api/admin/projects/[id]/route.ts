import { getDb, schema } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { requireAuth, apiError, apiSuccess, validateId, invalidIdResponse } from '@/lib/api-helpers'
import { projectSchema } from '@/lib/validators'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const db = await getDb()
  try {
    const { session, error } = await requireAuth()
    if (error) return error

    const { id } = await params
    const numericId = validateId(id)
    if (numericId === null) return invalidIdResponse()

    const project = await db
      .select()
      .from(schema.projects)
      .where(eq(schema.projects.id, numericId))
      .limit(1)

    if (project.length === 0) {
      return apiError('Project not found', 404)
    }

    return apiSuccess(project[0])
  } catch (error) {
    return apiError('Failed to fetch project', 500)
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const db = await getDb()
  try {
    const { session, error } = await requireAuth()
    if (error) return error

    const { id } = await params
    const numericId = validateId(id)
    if (numericId === null) return invalidIdResponse()

    const body = await request.json()
    const parsed = projectSchema.safeParse(body)

    if (!parsed.success) {
      return apiError('Invalid input', 400)
    }

    const result = await db
      .update(schema.projects)
      .set({ ...parsed.data, updatedAt: new Date().toISOString() })
      .where(eq(schema.projects.id, numericId))
      .returning()

    if (result.length === 0) {
      return apiError('Project not found', 404)
    }

    return apiSuccess(result[0])
  } catch (error) {
    return apiError('Failed to update project', 500)
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const db = await getDb()
  try {
    const { session, error } = await requireAuth()
    if (error) return error

    const { id } = await params
    const numericId = validateId(id)
    if (numericId === null) return invalidIdResponse()

    const result = await db
      .delete(schema.projects)
      .where(eq(schema.projects.id, numericId))
      .returning()

    if (result.length === 0) {
      return apiError('Project not found', 404)
    }

    return apiSuccess({ deleted: true })
  } catch (error) {
    return apiError('Failed to delete project', 500)
  }
}
