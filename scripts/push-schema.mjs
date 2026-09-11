import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const url = process.env.TURSO_DATABASE_URL
const authToken = process.env.TURSO_AUTH_TOKEN
const httpsUrl = url.replace('libsql://', 'https://')

async function execute(sql) {
  const resp = await fetch(`${httpsUrl}/v2/pipeline`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      requests: [{ type: 'execute', stmt: { sql } }],
    }),
  })
  const data = await resp.json()
  if (data.results?.[0]?.error) {
    throw new Error(data.results[0].error.message)
  }
  return data.results?.[0]
}

async function main() {
  console.log('Step 1: Dropping all existing tables...')

  const views = ['v_visible_projects', 'v_featured_projects', 'v_unread_messages', 'v_social_links']
  for (const v of views) {
    try { await execute(`DROP VIEW IF EXISTS ${v}`); console.log(`  Dropped view ${v}`) } catch (e) { console.log(`  Skip view ${v}: ${e.message}`) }
  }

  const triggers = ['trg_profile_updated', 'trg_about_updated', 'trg_projects_updated', 'trg_resume_updated', 'trg_homepage_content_updated', 'trg_site_settings_updated']
  for (const t of triggers) {
    try { await execute(`DROP TRIGGER IF EXISTS ${t}`); console.log(`  Dropped trigger ${t}`) } catch (e) { console.log(`  Skip trigger ${t}: ${e.message}`) }
  }

  const tables = [
    'admin_users', 'password_reset_tokens', 'contact_messages', 'social_links',
    'homepage_content', 'site_settings', 'resume', 'achievements',
    'certifications', 'education', 'experience', 'projects',
    'technologies', 'skills', 'about', 'profile'
  ]
  for (const t of tables) {
    try { await execute(`DROP TABLE IF EXISTS ${t}`); console.log(`  Dropped table ${t}`) } catch (e) { console.log(`  Skip table ${t}: ${e.message}`) }
  }

  console.log('\nStep 2: Creating schema from database/schema.sql...')
  const schemaPath = resolve(__dirname, '..', 'database', 'schema.sql')
  const schema = readFileSync(schemaPath, 'utf-8')

  const lines = schema.split('\n')
  const cleaned = []
  let inBlockComment = false
  for (const line of lines) {
    const trimmed = line.trim()
    if (inBlockComment) { if (trimmed.includes('*/')) inBlockComment = false; continue }
    if (trimmed.startsWith('/*')) { if (!trimmed.includes('*/')) inBlockComment = true; continue }
    if (trimmed.startsWith('--')) continue
    if (trimmed === '') continue
    cleaned.push(line)
  }
  const full = cleaned.join('\n')

  // Parse statements - handle BEGIN/END blocks for triggers
  const stmts = []
  let current = ''
  let depth = 0
  let inString = false
  let stringChar = ''

  for (let i = 0; i < full.length; i++) {
    const ch = full[i]
    if (inString) {
      current += ch
      if (ch === stringChar && full[i - 1] !== '\\') inString = false
      continue
    }
    if (ch === "'" || ch === '"') { inString = true; stringChar = ch; current += ch; continue }
    if (ch === '(') { depth++; current += ch; continue }
    if (ch === ')') { depth--; current += ch; continue }
    if (ch === ';' && depth === 0) {
      const stmt = current.trim()
      if (stmt.length > 0) stmts.push(stmt)
      current = ''
      continue
    }
    current += ch
  }
  const last = current.trim()
  if (last.length > 0) stmts.push(last)

  // Filter out PRAGMA (not supported via HTTP) and split trigger BEGIN/END
  const filtered = []
  for (const s of stmts) {
    if (s.startsWith('PRAGMA')) continue
    
    // Check if it's a trigger that got mangled (has BEGIN but not END)
    if (s.includes('BEGIN') && !s.includes('END;')) {
      // Find the next END statement
      const triggerStart = s
      const idx = stmts.indexOf(s)
      if (idx + 1 < stmts.length && stmts[idx + 1].trim() === 'END') {
        filtered.push(triggerStart + ' END;')
        stmts.splice(idx + 1, 1)
        continue
      }
    }
    filtered.push(s)
  }

  console.log(`Parsed ${filtered.length} statements\n`)

  let success = 0
  let errors = 0

  for (const stmt of filtered) {
    const preview = stmt.substring(0, 80).replace(/\n/g, ' ')
    try {
      await execute(stmt)
      success++
      console.log(`  OK: ${preview}`)
    } catch (e) {
      console.error(`  FAIL: ${preview}`)
      console.error(`        ${e.message}`)
      errors++
    }
  }

  console.log(`\nDone: ${success} succeeded, ${errors} failed`)
}

main()
