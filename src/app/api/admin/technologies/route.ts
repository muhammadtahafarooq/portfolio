import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db, schema } from '@/lib/db'
import { eq } from 'drizzle-orm'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const technologies = await db.select().from(schema.technologies)
  return NextResponse.json(technologies)
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()

    const result = await db
      .insert(schema.technologies)
      .values({
        name: body.name,
        iconUrl: body.iconUrl || null,
        category: body.category || null,
        sortOrder: body.sortOrder || 0,
      } as typeof schema.technologies.$inferInsert)
      .returning()

    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Create technology error:', error)
    return NextResponse.json({ error: 'Failed to create technology' }, { status: 500 })
  }
}
