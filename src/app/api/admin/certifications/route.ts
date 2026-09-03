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

  const certifications = await db.select().from(schema.certifications)
  return NextResponse.json(certifications)
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()

    const result = await db
      .insert(schema.certifications)
      .values({
        name: body.name,
        issuer: body.issuer || null,
        date: body.date || null,
        description: body.description || null,
        sortOrder: body.sortOrder || 0,
      } as typeof schema.certifications.$inferInsert)
      .returning()

    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Create certification error:', error)
    return NextResponse.json({ error: 'Failed to create certification' }, { status: 500 })
  }
}
