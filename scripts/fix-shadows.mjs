import { readFileSync, writeFileSync } from 'fs'

const filePath = 'app/assets/css/main.css'
let content = readFileSync(filePath, 'utf-8')

// Add dark mode shadow overrides before the closing } of html.dark
const darkModeShadowOverrides = `
  /* Shadows - Dark mode overrides (S1.P1.1) */
  --shadow-xs: 0 1px 2px oklch(0 0 0 / 0.25);
  --shadow-sm: 0 1px 3px oklch(0 0 0 / 0.28);
  --shadow-md: 0 2px 8px oklch(0 0 0 / 0.32);
  --shadow-lg: 0 4px 16px oklch(0 0 0 / 0.38);
  --shadow-xl: 0 8px 32px oklch(0 0 0 / 0.45);
  --shadow-inner: inset 0 2px 4px oklch(0 0 0 / 0.28);
  --shadow-focus: 0 0 0 3px oklch(0.72 0.19 160 / 0.2);`

// Split into lines, find the line with --color-info-light: #1e40af (dark mode), insert after it
const lines = content.split('\n')
let inserted = false
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('--color-info-light: #1e40af') && !inserted) {
    // Insert shadow overrides after this line
    lines.splice(i + 1, 0, darkModeShadowOverrides)
    inserted = true
    break
  }
}

if (inserted) {
  content = lines.join('\n')
  writeFileSync(filePath, content, 'utf-8')
  console.log('Dark mode shadow overrides added successfully!')
} else {
  console.log('ERROR: Could not find insertion point!')
}