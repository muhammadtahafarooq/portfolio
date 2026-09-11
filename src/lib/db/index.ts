import type { LibSQLDatabase } from 'drizzle-orm/libsql'
import * as schema from './schema'

type DbInstance = LibSQLDatabase<typeof schema>

let _db: DbInstance | null = null

async function createDb(): Promise<DbInstance> {
  const [{ createClient }, { drizzle }] = await Promise.all([
    import('@libsql/client'),
    import('drizzle-orm/libsql'),
  ])
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

export async function getDb(): Promise<DbInstance> {
  if (!_db) {
    _db = await createDb()
  }
  return _db
}

export { schema }
