import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db, schema } from '@/lib/db'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const result = await db.select().from(schema.homepageContent).limit(1)
  return NextResponse.json(result[0] || null)
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()

    const existing = await db.select().from(schema.homepageContent).limit(1)

    if (existing.length > 0) {
      const result = await db
        .update(schema.homepageContent)
        .set({
          heroIntroduction: body.heroIntroduction,
          featuredProjectIds: body.featuredProjectIds,
          contactStatement: body.contactStatement,
        })
        .returning()

      return NextResponse.json(result[0])
    } else {
      const result = await db
        .insert(schema.homepageContent)
        .values({
          heroIntroduction: body.heroIntroduction,
          featuredProjectIds: body.featuredProjectIds,
          contactStatement: body.contactStatement,
        })
        .returning()

      return NextResponse.json(result[0])
    }
  } catch (error) {
    console.error('Update homepage error:', error)
    return NextResponse.json({ error: 'Failed to update homepage content' }, { status: 500 })
  }
}
