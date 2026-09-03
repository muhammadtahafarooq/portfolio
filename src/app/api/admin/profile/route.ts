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

  const profile = await db.select().from(schema.profile).limit(1)
  return NextResponse.json(profile[0] || null)
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()

    // Upsert: update if exists, insert if not
    const existing = await db.select().from(schema.profile).limit(1)

    if (existing.length > 0) {
      const result = await db
        .update(schema.profile)
        .set({
          name: body.name,
          title: body.title,
          shortBio: body.shortBio,
          email: body.email,
          phone: body.phone,
          location: body.location,
          avatarUrl: body.avatarUrl,
        })
        .where(eq(schema.profile.id, 1))
        .returning()

      return NextResponse.json(result[0])
    } else {
      const result = await db
        .insert(schema.profile)
        .values({
          id: 1,
          name: body.name,
          title: body.title,
          shortBio: body.shortBio,
          email: body.email,
          phone: body.phone,
          location: body.location,
          avatarUrl: body.avatarUrl,
        } as typeof schema.profile.$inferInsert)
        .returning()

      return NextResponse.json(result[0])
    }
  } catch (error) {
    console.error('Update profile error:', error)
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
}
