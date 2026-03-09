import { promises as fs } from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const TARGET_DIRS = [
  'app/components',
  'app/shared/components',
  'app/pages',
  'app/layouts',
]
const TARGET_EXTENSIONS = new Set(['.vue', '.ts'])

const RULES = [
  {
    id: 'hardcoded-color-literal',
    severity: 'high',
    description: 'Hardcoded color literals should map to design tokens.',
    regex: /#[\da-fA-F]{3,8}\b|(?:rgba?|hsla?|oklch)\([^\)]+\)/g,
  },
  {
    id: 'arbitrary-tailwind-value',
    severity: 'medium',
    description: 'Tailwind arbitrary values should be replaced with tokenized classes when available.',
    regex: /\b[a-z-]+-\[[^\]]+\]/g,
  },
  {
    id: 'static-inline-style-attribute',
    severity: 'high',
    description: 'Static inline style attributes bypass token governance and should stay exceptional.',
    regex: /(?<![:\w-])style\s*=\s*["'][^"']+["']/g,
  },
  {
    id: 'vue-bound-style-attribute',
    severity: 'medium',
    description: 'Vue style bindings are runtime-governed and should be reviewed as geometry, not generic token debt.',
    regex: /(?:v-bind:|:)style\s*=\s*["'][^"']+["']/g,
  },
  {
    id: 'rtl-directional-class-risk',
    severity: 'medium',
    description: 'Directional classes may break RTL consistency; prefer logical properties.',
    regex: /\b(?:text-left|text-right|left-\d+|right-\d+|ml-\d+|mr-\d+|pl-\d+|pr-\d+|border-l|border-r|rounded-l|rounded-r)\b/g,
  },
]

const TOKEN_COVERED_MATCHERS = [
  /^h-\[18px\]$/,
  /^w-\[2px\]$/,
  /^min-h-\[40px\]$/,
  /^h-\[110px\]$/,
  /^text-\[20px\]$/,
  /^text-\[10px\]$/,
  /^rounded-\[(2|3|4)px\]$/,
  /^grid-cols-\[(290px|310px)_1fr\]$/,
  /^inset-inline-(start|end)-\[-(16|20)px\]$/,
]

const BEHAVIOR_LAYOUT_MATCHERS = new Set([
  'grid-rows-[1fr]',
  'grid-rows-[0fr]',
  'grid-rows-[auto_auto]',
  'grid-cols-[1fr_auto]',
])

const BUCKET_ORDER = [
  'token-covered',
  'geometry-exception',
  'selector-state',
  'behavior-layout',
  'review-needed',
]

const BUCKET_META = {
  'token-covered': {
    title: 'Token-covered Inventory',
    policy: 'Keep these values as tracked inventory unless an output-equivalent replacement is intentionally performed.',
    guidance: 'For future pages, reuse the existing token or alias instead of introducing new literals for the same metric.',
  },
  'geometry-exception': {
    title: 'Geometry Exceptions',
    policy: 'Do not treat runtime geometry, filter-tree connector math, or Radix variable-driven layout as generic token debt.',
    guidance: 'Change only through dedicated variable systems or focused component-level geometry work with visual verification.',
  },
  'selector-state': {
    title: 'Selector and State Syntax',
    policy: 'Do not rewrite data-* or has-data-* state syntax as part of token cleanup.',
    guidance: 'Touch these only when the component state model or primitive API actually changes.',
  },
  'behavior-layout': {
    title: 'Behavior and Layout Expressions',
    policy: 'Do not treat structural transition expressions as missing token coverage.',
    guidance: 'Change these only when interaction behavior or layout semantics are intentionally redesigned.',
  },
  'review-needed': {
    title: 'Review Needed',
    policy: 'Any finding in this bucket is not yet covered by current governance and needs explicit review.',
    guidance: 'This bucket should stay at zero; if it rises, classify or address the findings before doing broad cleanup.',
  },
}

const FILTER_TREE_GEOMETRY_FILES = [
  'app/shared/components/base/BaseTreeConnector.vue',
  'app/shared/components/base/BaseFilterShowMore.vue',
  'app/components/filters/SimpleFilter.vue',
  'app/components/filters/TreeBranch.vue',
]

const HOTSPOT_CONFIGS = [
  {
    id: 'filter-tree-geometry',
    title: 'Filter-tree Geometry System',
    bucket: 'geometry-exception',
    files: FILTER_TREE_GEOMETRY_FILES,
    contract: 'docs/PHASE2_GEOMETRY_CONTRACTS.md',
    guidance: 'Keep connector math and root-branch alignment centralized in the filter-tree variable system; do not fork local spacing rules in new filters.',
  },
  {
    id: 'radix-select-geometry',
    title: 'Radix Select Geometry',
    bucket: 'geometry-exception',
    files: ['app/shared/components/base/BaseSelect.vue'],
    contract: 'docs/PHASE2_GEOMETRY_CONTRACTS.md',
    guidance: 'Preserve runtime width, height, and transform-origin variables as a placement contract rather than converting them into fixed tokens.',
  },
]

const GEOMETRY_VAR_PATTERN = /var\(--filter-tree|var\(--tree-line-color|var\(--radix-/

const shouldIgnoreMatch = (filePath, lineText, ruleId, matchText) => {
  if (lineText.includes('eslint-disable')) return true

  if (ruleId === 'hardcoded-color-literal') {
    if (filePath.endsWith('main.css')) return true
    if (lineText.includes('--color-')) return true
  }

  if (ruleId === 'rtl-directional-class-risk') {
    const isRadixSideState = lineText.includes('data-[side=')
      && (matchText.startsWith('left-') || matchText.startsWith('right-'))
    if (isRadixSideState) return true
  }

  return false
}

const isTokenCoveredInventory = (matchText) => {
  return TOKEN_COVERED_MATCHERS.some((pattern) => pattern.test(matchText))
}

const isGeometryException = (finding) => {
  if (finding.file.endsWith('BaseTreeConnector.vue')) return true

  if (finding.rule === 'static-inline-style-attribute' || finding.rule === 'vue-bound-style-attribute') {
    return GEOMETRY_VAR_PATTERN.test(finding.match)
      || GEOMETRY_VAR_PATTERN.test(finding.snippet)
      || /lineStyle/.test(finding.match)
      || /lineStyle/.test(finding.snippet)
  }

  return GEOMETRY_VAR_PATTERN.test(finding.match) || GEOMETRY_VAR_PATTERN.test(finding.snippet)
}

const isSelectorStateSyntax = (matchText) => {
  return matchText.includes('data-[')
    || matchText.includes('group-data-[')
    || matchText.includes('has-data-[')
}

const classifyFinding = (finding) => {
  if (isTokenCoveredInventory(finding.match)) return 'token-covered'
  if (BEHAVIOR_LAYOUT_MATCHERS.has(finding.match)) return 'behavior-layout'
  if (isSelectorStateSyntax(finding.match)) return 'selector-state'
  if (isGeometryException(finding)) return 'geometry-exception'
  return 'review-needed'
}

const collectFiles = async (dir) => {
  const output = []

  const walk = async (current) => {
    let entries = []
    try {
      entries = await fs.readdir(current, { withFileTypes: true })
    }
    catch {
      return
    }

    for (const entry of entries) {
      const fullPath = path.join(current, entry.name)
      if (entry.isDirectory()) {
        await walk(fullPath)
        continue
      }

      const extension = path.extname(entry.name)
      if (TARGET_EXTENSIONS.has(extension)) {
        output.push(fullPath)
      }
    }
  }

  await walk(path.join(ROOT, dir))
  return output
}

const collectFindings = async (files) => {
  const findings = []

  for (const filePath of files) {
    const fileContent = await fs.readFile(filePath, 'utf8')
    const lines = fileContent.split(/\r?\n/)

    lines.forEach((lineText, lineIndex) => {
      for (const rule of RULES) {
        rule.regex.lastIndex = 0

        let match = rule.regex.exec(lineText)
        while (match) {
          if (!shouldIgnoreMatch(filePath, lineText, rule.id, match[0])) {
            findings.push({
              rule: rule.id,
              severity: rule.severity,
              description: rule.description,
              file: path.relative(ROOT, filePath).replace(/\\/g, '/'),
              line: lineIndex + 1,
              column: (match.index ?? 0) + 1,
              match: match[0],
              snippet: lineText.trim(),
            })
          }

          match = rule.regex.exec(lineText)
        }
      }
    })
  }

  return findings
}

const buildSummary = (findings) => {
  const bySeverity = {
    high: 0,
    medium: 0,
    low: 0,
  }

  const byRule = {}

  for (const finding of findings) {
    bySeverity[finding.severity] = (bySeverity[finding.severity] || 0) + 1
    byRule[finding.rule] = (byRule[finding.rule] || 0) + 1
  }

  return {
    generatedAt: new Date().toISOString(),
    totals: {
      findings: findings.length,
      files: new Set(findings.map((item) => item.file)).size,
    },
    bySeverity,
    byRule,
  }
}

const summarizeHotspot = (findings, config) => {
  const hotspotFindings = findings.filter((finding) => {
    return finding.bucket === config.bucket && config.files.includes(finding.file)
  })

  const byFile = config.files
    .map((file) => ({
      file,
      count: hotspotFindings.filter((finding) => finding.file === file).length,
    }))
    .filter((item) => item.count > 0)

  const byRule = [...hotspotFindings.reduce((map, finding) => {
    map.set(finding.rule, (map.get(finding.rule) || 0) + 1)
    return map
  }, new Map()).entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([rule, count]) => ({ rule, count }))

  const representativeMatches = hotspotFindings
    .slice()
    .sort((a, b) => {
      if (a.file !== b.file) return a.file.localeCompare(b.file)
      if (a.line !== b.line) return a.line - b.line
      return a.column - b.column
    })
    .slice(0, 6)
    .map((finding) => ({
      file: finding.file,
      line: finding.line,
      match: finding.match,
    }))

  return {
    title: config.title,
    bucket: config.bucket,
    count: hotspotFindings.length,
    files: byFile,
    byRule,
    representativeMatches,
    contract: config.contract,
    guidance: config.guidance,
  }
}

const buildGovernance = (findings) => {
  const byBucket = Object.fromEntries(BUCKET_ORDER.map((bucket) => [bucket, 0]))
  const byBucketFiles = Object.fromEntries(BUCKET_ORDER.map((bucket) => [bucket, []]))

  for (const finding of findings) {
    byBucket[finding.bucket] = (byBucket[finding.bucket] || 0) + 1
  }

  for (const bucket of BUCKET_ORDER) {
    const fileCounts = new Map()

    for (const finding of findings) {
      if (finding.bucket !== bucket) continue
      fileCounts.set(finding.file, (fileCounts.get(finding.file) || 0) + 1)
    }

    byBucketFiles[bucket] = [...fileCounts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([file, count]) => ({ file, count }))
  }

  const hotspots = Object.fromEntries(
    HOTSPOT_CONFIGS.map((config) => [config.id, summarizeHotspot(findings, config)]),
  )

  return {
    byBucket,
    byBucketFiles,
    hotspots,
    notes: Object.fromEntries(BUCKET_ORDER.map((bucket) => [bucket, BUCKET_META[bucket]])),
  }
}

const toMarkdown = (summary, governance, findings) => {
  const lines = []
  lines.push('# PHASE 2 Token Compliance Audit')
  lines.push('')
  lines.push('This report is generated by `scripts/token-compliance-audit.mjs`.')
  lines.push('No visual styles were changed by this audit.')
  lines.push('')
  lines.push('## Summary')
  lines.push(`- Generated at: ${summary.generatedAt}`)
  lines.push(`- Total findings: ${summary.totals.findings}`)
  lines.push(`- Files affected: ${summary.totals.files}`)
  lines.push(`- High severity: ${summary.bySeverity.high || 0}`)
  lines.push(`- Medium severity: ${summary.bySeverity.medium || 0}`)
  lines.push(`- Low severity: ${summary.bySeverity.low || 0}`)
  lines.push('')
  lines.push('## Governance Buckets')
  lines.push('- Raw findings are inventory, not automatic proof of missing token coverage.')
  for (const bucket of BUCKET_ORDER) {
    lines.push(`- ${BUCKET_META[bucket].title}: ${governance.byBucket[bucket] || 0}`)
  }
  lines.push('')
  lines.push('## Targeted Geometry Hotspots')
  for (const hotspot of Object.values(governance.hotspots)) {
    lines.push(`- ${hotspot.title}: ${hotspot.count}`)
  }
  lines.push('')
  lines.push('## Rule Breakdown')

  Object.entries(summary.byRule)
    .sort((a, b) => b[1] - a[1])
    .forEach(([rule, count]) => {
      lines.push(`- ${rule}: ${count}`)
    })

  lines.push('')
  lines.push('## Findings')

  if (findings.length === 0) {
    lines.push('- No findings.')
    return lines.join('\n')
  }

  findings
    .sort((a, b) => {
      if (a.file !== b.file) return a.file.localeCompare(b.file)
      if (a.line !== b.line) return a.line - b.line
      return a.column - b.column
    })
    .slice(0, 300)
    .forEach((finding) => {
      lines.push(`- [${finding.severity.toUpperCase()}] ${finding.rule} | ${finding.file}:${finding.line}:${finding.column}`)
      lines.push(`  - Match: \`${finding.match}\``)
      lines.push(`  - Bucket: \`${finding.bucket}\``)
      lines.push(`  - Snippet: \`${finding.snippet.replace(/`/g, '\\`')}\``)
    })

  if (findings.length > 300) {
    lines.push('')
    lines.push(`_Output truncated. ${findings.length - 300} additional findings are available in JSON._`)
  }

  return lines.join('\n')
}

const toGovernanceRegisterMarkdown = (summary, governance, findings) => {
  const lines = []
  lines.push('# Phase 2 Exception Governance Register')
  lines.push('')
  lines.push(`Generated from 'scripts/token-compliance-audit.mjs' at ${summary.generatedAt}.`)
  lines.push('Visual impact: None')
  lines.push('')
  lines.push('## Purpose')
  lines.push('- Provide a stable execution reference for the governed findings that remain after generic token cleanup is finished.')
  lines.push('- Separate intentional exceptions from real backlog so future sessions can continue safely without re-triaging the full audit JSON.')
  lines.push('')
  lines.push('## Snapshot')
  lines.push(`- Raw findings: ${summary.totals.findings}`)
  lines.push(`- Files affected: ${summary.totals.files}`)
  for (const bucket of BUCKET_ORDER) {
    lines.push(`- ${BUCKET_META[bucket].title}: ${governance.byBucket[bucket] || 0}`)
  }
  lines.push('')

  for (const bucket of BUCKET_ORDER) {
    const meta = BUCKET_META[bucket]
    const bucketFindings = findings.filter((finding) => finding.bucket === bucket)
    const fileBreakdown = governance.byBucketFiles[bucket] || []
    lines.push(`## ${meta.title}`)
    lines.push(`- Count: ${governance.byBucket[bucket] || 0}`)
    lines.push(`- Policy: ${meta.policy}`)
    lines.push(`- Guidance: ${meta.guidance}`)

    if (fileBreakdown.length === 0) {
      lines.push('- Files: None')
      lines.push('')
      continue
    }

    lines.push('- Files:')
    for (const item of fileBreakdown) {
      lines.push(`  - ${item.file}: ${item.count}`)
    }

    const representatives = bucketFindings
      .slice()
      .sort((a, b) => {
        if (a.file !== b.file) return a.file.localeCompare(b.file)
        if (a.line !== b.line) return a.line - b.line
        return a.column - b.column
      })
      .slice(0, 5)

    lines.push('- Representative findings:')
    for (const finding of representatives) {
      lines.push(`  - ${finding.file}:${finding.line} -> ${finding.match}`)
    }
    lines.push('')
  }

  lines.push('## Targeted Geometry Hotspots')
  for (const hotspot of Object.values(governance.hotspots)) {
    lines.push(`### ${hotspot.title}`)
    lines.push(`- Count: ${hotspot.count}`)
    lines.push(`- Contract: ${hotspot.contract}`)
    lines.push(`- Guidance: ${hotspot.guidance}`)
    lines.push('- Files:')
    for (const item of hotspot.files) {
      lines.push(`  - ${item.file}: ${item.count}`)
    }
    lines.push('- Rule profile:')
    for (const item of hotspot.byRule) {
      lines.push(`  - ${item.rule}: ${item.count}`)
    }
    lines.push('- Representative findings:')
    for (const item of hotspot.representativeMatches) {
      lines.push(`  - ${item.file}:${item.line} -> ${item.match}`)
    }
    lines.push('')
  }

  lines.push('## Operational Rules')
  lines.push('- Do not use the raw audit count alone to decide whether token cleanup is incomplete.')
  lines.push('- Treat `Geometry Exceptions` as component-system work, not utility-class cleanup.')
  lines.push('- Treat `Selector and State Syntax` as primitive-state logic, not token debt.')
  lines.push('- Treat `Behavior and Layout Expressions` as interaction/layout semantics, not missing aliases.')
  lines.push('- Treat `Review Needed` as the only bucket that should reopen generalized cleanup discussions.')

  return lines.join('\n')
}

const run = async () => {
  const filesNested = await Promise.all(TARGET_DIRS.map((dir) => collectFiles(dir)))
  const files = filesNested.flat()
  const rawFindings = await collectFindings(files)
  const findings = rawFindings.map((finding) => ({
    ...finding,
    bucket: classifyFinding(finding),
  }))
  const summary = buildSummary(findings)
  const governance = buildGovernance(findings)

  const jsonOutput = {
    summary,
    governance,
    findings,
  }

  const docsDir = path.join(ROOT, 'docs')
  await fs.mkdir(docsDir, { recursive: true })

  await fs.writeFile(
    path.join(docsDir, 'PHASE2_TOKEN_COMPLIANCE_AUDIT.json'),
    JSON.stringify(jsonOutput, null, 2),
    'utf8',
  )

  await fs.writeFile(
    path.join(docsDir, 'PHASE2_TOKEN_COMPLIANCE_AUDIT.md'),
    toMarkdown(summary, governance, findings),
    'utf8',
  )

  await fs.writeFile(
    path.join(docsDir, 'PHASE2_EXCEPTION_GOVERNANCE.md'),
    toGovernanceRegisterMarkdown(summary, governance, findings),
    'utf8',
  )

  console.log(`Token compliance audit completed. Findings: ${summary.totals.findings}`)
}

run().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
