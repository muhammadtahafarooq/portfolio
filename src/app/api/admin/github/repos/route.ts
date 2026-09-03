import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const token = process.env.GITHUB_TOKEN
  const username = process.env.GITHUB_USERNAME

  if (!token || !username) {
    return NextResponse.json({ repos: [], error: 'GitHub not configured' })
  }

  try {
    const res = await fetch(`https://api.github.com/user/repos?sort=updated&per_page=30`, {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    })

    if (!res.ok) {
      return NextResponse.json({ repos: [], error: 'Failed to fetch repos' })
    }

    const repos = await res.json()
    return NextResponse.json({ repos })
  } catch (error) {
    console.error('GitHub repos error:', error)
    return NextResponse.json({ repos: [], error: 'Failed to fetch repos' })
  }
}
