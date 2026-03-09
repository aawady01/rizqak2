import { createHash } from 'node:crypto'
import { promises as fs } from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const DOCS_DIR = path.join(ROOT, 'docs')
const JSON_OUTPUT = path.join(DOCS_DIR, 'PHASE0_VISUAL_BASELINE.json')
const MD_OUTPUT = path.join(DOCS_DIR, 'PHASE0_VISUAL_BASELINE.md')

const EXPLICIT_FILES = [
  'app/app.vue',
  'app/assets/css/main.css',
  'app/layouts/default.vue',
  'app/pages/index.vue',
]

const UI_DIRS = [
  'app/components',
  'app/shared/components/base',
]

const INCLUDED_EXTENSIONS = new Set(['.vue', '.ts', '.css'])

const toRelative = (filePath) => path.relative(ROOT, filePath).replace(/\\/g, '/')

const fileHash = async (filePath) => {
  const content = await fs.readFile(filePath)
  return createHash('sha256').update(content).digest('hex')
}

const walk = async (dirPath) => {
  const output = []
  let entries = []

  try {
    entries = await fs.readdir(dirPath, { withFileTypes: true })
  }
  catch {
    return output
  }

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name)

    if (entry.isDirectory()) {
      output.push(...await walk(fullPath))
      continue
    }

    if (INCLUDED_EXTENSIONS.has(path.extname(entry.name))) {
      output.push(fullPath)
    }
  }

  return output
}

const collectFiles = async () => {
  const explicit = EXPLICIT_FILES.map((relativePath) => path.join(ROOT, relativePath))
  const nested = await Promise.all(UI_DIRS.map((dir) => walk(path.join(ROOT, dir))))
  const discovered = [...explicit, ...nested.flat()]

  return [...new Set(discovered)]
    .map((filePath) => path.normalize(filePath))
    .sort((a, b) => toRelative(a).localeCompare(toRelative(b)))
}

const toMarkdown = (manifest) => {
  const lines = []

  lines.push('# Phase 0 Visual Baseline')
  lines.push('')
  lines.push(`Generated at: ${manifest.generatedAt}`)
  lines.push(`Frozen UI files: ${manifest.fileCount}`)
  lines.push('')
  lines.push('## Frozen Scope')
  lines.push('- `app/assets/css/main.css`')
  lines.push('- `app/app.vue`')
  lines.push('- `app/layouts/default.vue`')
  lines.push('- `app/pages/index.vue`')
  lines.push('- `app/components/**`')
  lines.push('- `app/shared/components/base/**`')
  lines.push('')
  lines.push('## Verification Rule')
  lines.push('- Regenerate this manifest before and after any UI-adjacent refactor.')
  lines.push('- Treat hash changes in frozen files as visual-risk events until reviewed.')
  lines.push('')
  lines.push('## File Hashes')

  for (const file of manifest.files) {
    lines.push(`- \`${file.path}\` :: \`${file.sha256}\``)
  }

  return lines.join('\n')
}

const main = async () => {
  const files = await collectFiles()
  const fileEntries = await Promise.all(files.map(async (filePath) => ({
    path: toRelative(filePath),
    sha256: await fileHash(filePath),
  })))

  const manifest = {
    generatedAt: new Date().toISOString(),
    fileCount: fileEntries.length,
    files: fileEntries,
  }

  await fs.mkdir(DOCS_DIR, { recursive: true })
  await fs.writeFile(JSON_OUTPUT, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')
  await fs.writeFile(MD_OUTPUT, `${toMarkdown(manifest)}\n`, 'utf8')

  console.log(`Visual baseline manifest generated for ${manifest.fileCount} files.`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
