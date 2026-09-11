import { getDb, schema } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { requireAuth, apiError, apiSuccess, validateId, invalidIdResponse } from '@/lib/api-helpers'
import { skillSchema } from '@/lib/validators'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const db = await getDb()
  const { session, error } = await requireAuth()
  if (error) return error

  const { id } = await params
  const numericId = validateId(id)
  if (numericId === null) return invalidIdResponse()

  try {
    const skill = await db
      .select()
      .from(schema.skills)
      .where(eq(schema.skills.id, numericId))
      .limit(1)

    if (skill.length === 0) {
      return apiError('Skill not found', 404)
    }

    return apiSuccess(skill[0])
  } catch {
    return apiError('Failed to fetch skill')
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const db = await getDb()
  const { session, error } = await requireAuth()
  if (error) return error

  const { id } = await params
  const numericId = validateId(id)
  if (numericId === null) return invalidIdResponse()

  try {
    const body = await request.json()
    const parsed = skillSchema.safeParse(body)

    if (!parsed.success) {
      return apiError('Invalid input', 400)
    }

    const result = await db
      .update(schema.skills)
      .set(parsed.data)
      .where(eq(schema.skills.id, numericId))
      .returning()

    if (result.length === 0) {
      return apiError('Skill not found', 404)
    }

    return apiSuccess(result[0])
  } catch {
    return apiError('Failed to update skill')
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const db = await getDb()
  const { session, error } = await requireAuth()
  if (error) return error

  const { id } = await params
  const numericId = validateId(id)
  if (numericId === null) return invalidIdResponse()

  try {
    const result = await db.delete(schema.skills).where(eq(schema.skills.id, numericId)).returning()

    if (result.length === 0) {
      return apiError('Skill not found', 404)
    }

    return apiSuccess({ success: true })
  } catch {
    return apiError('Failed to delete skill')
  }
}
