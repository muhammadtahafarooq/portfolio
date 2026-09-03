import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db, schema } from '@/lib/db'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const skills = await db.select().from(schema.skills)
  return NextResponse.json(skills)
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()

    const result = await db
      .insert(schema.skills)
      .values({
        name: body.name,
        category: body.category || null,
        description: body.description || null,
        sortOrder: body.sortOrder || 0,
      } as typeof schema.skills.$inferInsert)
      .returning()

    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Create skill error:', error)
    return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 })
  }
}
