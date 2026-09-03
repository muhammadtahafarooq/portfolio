import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db, schema } from '@/lib/db'
import { eq } from 'drizzle-orm'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const item = await db
    .select()
    .from(schema.education)
    .where(eq(schema.education.id, parseInt(id)))
    .limit(1)

  if (item.length === 0) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(item[0])
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  try {
    const body = await request.json()

    const result = await db
      .update(schema.education)
      .set({
        institution: body.institution,
        qualification: body.qualification,
        program: body.program,
        description: body.description,
        startDate: body.startDate,
        endDate: body.endDate,
        sortOrder: body.sortOrder,
      })
      .where(eq(schema.education.id, parseInt(id)))
      .returning()

    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Update education error:', error)
    return NextResponse.json({ error: 'Failed to update education' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  try {
    await db.delete(schema.education).where(eq(schema.education.id, parseInt(id)))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete education error:', error)
    return NextResponse.json({ error: 'Failed to delete education' }, { status: 500 })
  }
}
