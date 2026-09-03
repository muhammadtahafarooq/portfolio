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
    .from(schema.technologies)
    .where(eq(schema.technologies.id, parseInt(id)))
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
      .update(schema.technologies)
      .set({
        name: body.name,
        iconUrl: body.iconUrl,
        category: body.category,
        sortOrder: body.sortOrder,
      })
      .where(eq(schema.technologies.id, parseInt(id)))
      .returning()

    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Update technology error:', error)
    return NextResponse.json({ error: 'Failed to update technology' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  try {
    await db.delete(schema.technologies).where(eq(schema.technologies.id, parseInt(id)))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete technology error:', error)
    return NextResponse.json({ error: 'Failed to delete technology' }, { status: 500 })
  }
}
