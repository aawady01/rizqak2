import fs from 'fs';
import path from 'path';

const ar = JSON.parse(fs.readFileSync('i18n/locales/ar.json', 'utf8'));

function flatten(obj, prefix = '') {
  let keys = [];
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? prefix + '.' + k : k;
    if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
      keys.push(...flatten(v, key));
    } else {
      keys.push(key);
    }
  }
  return keys;
}

const arKeys = new Set(flatten(ar));

function findFiles(dir) {
  let files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== '.nuxt') {
      files.push(...findFiles(full));
    } else if (entry.name.endsWith('.vue') || entry.name.endsWith('.ts')) {
      files.push(full);
    }
  }
  return files;
}

const codeFiles = findFiles('app');
const usedKeys = new Map(); // key -> [files]

for (const file of codeFiles) {
  const content = fs.readFileSync(file, 'utf8');
  // Match $t('key') and t('key')
  const regex = /(?:\$t|[^a-zA-Z]t)\(\s*['"]([\w.]+)['"]/g;
  let m;
  while ((m = regex.exec(content)) !== null) {
    const key = m[1];
    if (!usedKeys.has(key)) usedKeys.set(key, []);
    usedKeys.get(key).push(path.basename(file));
  }
}

console.log('=== MISSING KEYS (used in code but NOT in ar.json) ===');
let missingCount = 0;
for (const [key, files] of [...usedKeys.entries()].sort()) {
  if (!arKeys.has(key)) {
    console.log(`  ${key}  (in: ${[...new Set(files)].join(', ')})`);
    missingCount++;
  }
}
console.log(`\nTotal missing: ${missingCount}`);
console.log(`Total keys in ar.json: ${arKeys.size}`);
console.log(`Total keys used in code: ${usedKeys.size}`);
