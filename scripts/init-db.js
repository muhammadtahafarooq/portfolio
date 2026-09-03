const { createClient } = require('@libsql/client')
const fs = require('fs')
const path = require('path')

const client = createClient({ url: 'file:./local.db' })

async function run() {
  // Read and clean schema SQL
  let schema = fs.readFileSync(path.join(__dirname, '..', 'database', 'schema.sql'), 'utf8')
  // Remove single-line comments
  schema = schema.replace(/^--.*$/gm, '')
  // Remove PRAGMA lines
  schema = schema.replace(/PRAGMA\s+\w+\s*=\s*\w+;?/gi, '')
  // Remove CREATE TRIGGER blocks (multi-line)
  schema = schema.replace(/CREATE\s+TRIGGER[\s\S]*?END;/gi, '')
  // Remove CREATE VIEW blocks (multi-line)
  schema = schema.replace(/CREATE\s+VIEW[\s\S]*?;/gi, '')

  const statements = schema
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0)

  console.log(`Found ${statements.length} CREATE statements`)

  for (const stmt of statements) {
    try {
      await client.execute(stmt + ';')
      const match = stmt.match(/CREATE\s+TABLE\s+(\w+)/i)
      if (match) console.log(`  Created table: ${match[1]}`)
      const idxMatch = stmt.match(/CREATE\s+INDEX\s+(\w+)/i)
      if (idxMatch) console.log(`  Created index: ${idxMatch[1]}`)
    } catch (e) {
      console.log(`  SKIP: ${e.message.substring(0, 80)}`)
    }
  }

  // Seed data
  let seed = fs.readFileSync(path.join(__dirname, '..', 'database', 'seed.sql'), 'utf8')
  seed = seed.replace(/^--.*$/gm, '')
  const seedStatements = seed
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && s.toUpperCase().startsWith('INSERT'))

  console.log(`\nFound ${seedStatements.length} INSERT statements`)
  for (const stmt of seedStatements) {
    try {
      await client.execute(stmt + ';')
    } catch (e) {
      console.log(`  SKIP: ${e.message.substring(0, 80)}`)
    }
  }

  // Verify
  const tables = await client.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'")
  console.log(`\nTables created: ${tables.rows.length}`)
  for (const t of tables.rows) {
    const count = await client.execute(`SELECT COUNT(*) as c FROM "${t.name}"`)
    console.log(`  ${t.name}: ${count.rows[0].c} rows`)
  }
}

run().catch(console.error)
