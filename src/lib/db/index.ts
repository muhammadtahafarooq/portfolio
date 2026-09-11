import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import * as schema from './schema'

type DbInstance = ReturnType<typeof drizzle<typeof schema>>

let _db: DbInstance | null = null

function createDb(): DbInstance {
  const url = process.env.TURSO_DATABASE_URL
  if (!url) {
    throw new Error('TURSO_DATABASE_URL is not set')
  }
  const client = createClient({
    url,
    authToken: process.env.TURSO_AUTH_TOKEN,
  })
  return drizzle(client, { schema })
}

function getDb(): DbInstance {
  if (!_db) {
    _db = createDb()
  }
  return _db
}

function isBuildTime(): boolean {
  return !process.env.TURSO_DATABASE_URL
}

function createBuildProxy(): DbInstance {
  const noop = () => Promise.resolve([])
  const buildDb = new Proxy({} as any, {
    get(_, prop) {
      if (typeof prop === 'symbol') return undefined
      if (prop === 'select')
        return () => ({ from: () => ({ orderBy: () => ({ limit: () => ({ then: noop }) }) }) })
      if (prop === 'query') return new Proxy({}, { get: () => noop })
      return noop
    },
  })
  return buildDb as DbInstance
}

export const db: DbInstance = isBuildTime() ? createBuildProxy() : getDb()

export { schema }
