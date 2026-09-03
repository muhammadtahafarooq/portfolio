import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db, schema } from '@/lib/db'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const experience = await db.select().from(schema.experience)
  return NextResponse.json(experience)
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()

    const result = await db
      .insert(schema.experience)
      .values({
        role: body.role,
        organization: body.organization || null,
        description: body.description || null,
        startDate: body.startDate || null,
        endDate: body.endDate || null,
        isCurrent: body.isCurrent || false,
        sortOrder: body.sortOrder || 0,
      } as typeof schema.experience.$inferInsert)
      .returning()

    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Create experience error:', error)
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 })
  }
}
