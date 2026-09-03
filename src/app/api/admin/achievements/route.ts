import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db, schema } from '@/lib/db'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const achievements = await db.select().from(schema.achievements)
  return NextResponse.json(achievements)
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()

    const result = await db
      .insert(schema.achievements)
      .values({
        title: body.title,
        description: body.description || null,
        date: body.date || null,
        sortOrder: body.sortOrder || 0,
      } as typeof schema.achievements.$inferInsert)
      .returning()

    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Create achievement error:', error)
    return NextResponse.json({ error: 'Failed to create achievement' }, { status: 500 })
  }
}
