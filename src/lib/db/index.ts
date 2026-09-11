import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import * as schema from './schema'

let _db: ReturnType<typeof drizzle<typeof schema>> | null = null

function getDb() {
  if (_db) return _db

  const url = process.env.TURSO_DATABASE_URL
  if (!url) {
    throw new Error('TURSO_DATABASE_URL is not set')
  }

  const client = createClient({
    url,
    authToken: process.env.TURSO_AUTH_TOKEN,
  })

  _db = drizzle(client, { schema })
  return _db
}

export function getDbInstance() {
  return getDb()
}

export const db = new Proxy(
  {},
  {
    get(_, prop) {
      return (getDb() as any)[prop]
    },
  }
) as ReturnType<typeof drizzle<typeof schema>>

export { schema }
