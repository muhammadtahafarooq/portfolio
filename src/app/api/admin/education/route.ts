import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db, schema } from '@/lib/db'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const education = await db.select().from(schema.education)
  return NextResponse.json(education)
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()

    const result = await db
      .insert(schema.education)
      .values({
        institution: body.institution,
        qualification: body.qualification || null,
        program: body.program || null,
        description: body.description || null,
        startDate: body.startDate || null,
        endDate: body.endDate || null,
        sortOrder: body.sortOrder || 0,
      } as typeof schema.education.$inferInsert)
      .returning()

    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Create education error:', error)
    return NextResponse.json({ error: 'Failed to create education' }, { status: 500 })
  }
}
