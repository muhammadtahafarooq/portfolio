import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db, schema } from '@/lib/db'
import { eq } from 'drizzle-orm'

export async function POST() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const token = process.env.GITHUB_TOKEN

  if (!token) {
    return NextResponse.json({ error: 'GitHub not configured' }, { status: 500 })
  }

  try {
    const res = await fetch(`https://api.github.com/user/repos?sort=updated&per_page=30`, {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    })

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch repos' }, { status: 500 })
    }

    const repos = await res.json()

    let synced = 0
    for (const repo of repos) {
      const existing = await db
        .select()
        .from(schema.projects)
        .where(eq(schema.projects.githubRepoId, repo.id))
        .limit(1)

      const slug = repo.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

      if (existing.length > 0) {
        await db
          .update(schema.projects)
          .set({
            title: repo.name,
            description: repo.description,
            liveUrl: repo.homepage || null,
            githubUrl: repo.html_url,
            technologies: repo.language ? JSON.stringify([repo.language]) : null,
          })
          .where(eq(schema.projects.githubRepoId, repo.id))
      } else {
        await db.insert(schema.projects).values({
          title: repo.name,
          slug,
          description: repo.description,
          shortStatement: repo.description,
          githubUrl: repo.html_url,
          liveUrl: repo.homepage || null,
          technologies: repo.language ? JSON.stringify([repo.language]) : null,
          githubRepoId: repo.id,
          isVisible: false,
        })
      }

      synced++
    }

    return NextResponse.json({ success: true, synced })
  } catch (error) {
    console.error('GitHub sync error:', error)
    return NextResponse.json({ error: 'Sync failed' }, { status: 500 })
  }
}
