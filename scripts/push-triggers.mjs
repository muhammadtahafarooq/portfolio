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

const triggers = [
  `CREATE TRIGGER trg_profile_updated AFTER UPDATE ON profile BEGIN UPDATE profile SET updated_at = datetime('now') WHERE id = NEW.id; END;`,
  `CREATE TRIGGER trg_about_updated AFTER UPDATE ON about BEGIN UPDATE about SET updated_at = datetime('now') WHERE id = NEW.id; END;`,
  `CREATE TRIGGER trg_projects_updated AFTER UPDATE ON projects BEGIN UPDATE projects SET updated_at = datetime('now') WHERE id = NEW.id; END;`,
  `CREATE TRIGGER trg_resume_updated AFTER UPDATE ON resume BEGIN UPDATE resume SET updated_at = datetime('now') WHERE id = NEW.id; END;`,
  `CREATE TRIGGER trg_homepage_content_updated AFTER UPDATE ON homepage_content BEGIN UPDATE homepage_content SET updated_at = datetime('now') WHERE id = NEW.id; END;`,
  `CREATE TRIGGER trg_site_settings_updated AFTER UPDATE ON site_settings BEGIN UPDATE site_settings SET updated_at = datetime('now') WHERE id = NEW.id; END;`,
]

async function main() {
  let success = 0
  let errors = 0
  for (const stmt of triggers) {
    const name = stmt.match(/CREATE TRIGGER (\S+)/)?.[1]
    try {
      await execute(stmt)
      success++
      console.log(`  OK: ${name}`)
    } catch (e) {
      console.error(`  FAIL: ${name} - ${e.message}`)
      errors++
    }
  }
  console.log(`\nDone: ${success} succeeded, ${errors} failed`)
}

main()
