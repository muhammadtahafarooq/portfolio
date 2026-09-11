import type { LibSQLDatabase } from 'drizzle-orm/libsql'
import * as schema from './schema'

type DbInstance = LibSQLDatabase<typeof schema>

let _db: DbInstance | null = null

async function createDb(): Promise<DbInstance> {
  const [{ createClient }, { drizzle }] = await Promise.all([
    import('@libsql/client/web'),
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

function createBuildProxy(): DbInstance {
  const handler: ProxyHandler<object> = {
    get: (_target, _prop) => {
      if (_prop === Symbol.toPrimitive) return () => ''
      if (_prop === 'then') return undefined
      if (_prop === 'catch') return undefined
      if (_prop === 'finally') return undefined
      if (_prop === 'toString') return () => ''
      if (_prop === 'valueOf') return () => ''
      return new Proxy(() => emptyResult, handler)
    },
    apply: (_target, _thisArg, args) => emptyResult,
  }

  const emptyResult: unknown = new Proxy({}, handler)
  return emptyResult as DbInstance
}

export async function getDb(): Promise<DbInstance> {
  if (!_db) {
    const url = process.env.TURSO_DATABASE_URL
    if (!url) {
      console.warn('TURSO_DATABASE_URL not set — returning build-time stub')
      return createBuildProxy()
    }
    try {
      _db = await createDb()
    } catch (err) {
      console.error('Failed to initialize database:', err)
      throw err
    }
  }
  return _db
}

export { schema }
