const fs = require('fs');

let html = "";
try {
  html = fs.readFileSync('c:/Users/USER/Desktop/rizqak2/التصميم/job-design.html', 'utf-8');
} catch (e) {
  console.log('Error reading file:', e);
  process.exit(1);
}

// Extract body content
const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);
if (!bodyMatch) {
  console.log('No body found');
  process.exit(1);
}
let content = bodyMatch[1];

// Apply replacements for design tokens
const replacements = [
  [/bg-surface-container-lowest/g, 'bg-background'],
  [/bg-surface-container-low/g, 'bg-surface-alt'],
  [/bg-surface-container-highest/g, 'bg-muted\\/40'],
  [/bg-surface-container/g, 'bg-surface-alt'],
  [/border-green-800/g, 'border-primary'],
  [/text-on-surface-variant/g, 'text-foreground-muted'],
  [/text-on-surface/g, 'text-foreground'],
  [/bg-primary-container/g, 'bg-primary'],
  [/border-primary-container/g, 'border-primary'],
  [/text-primary-container/g, 'text-primary'],
  [/bg-\\[#1B6B4A\\]/g, 'bg-primary'],
  [/text-\\[#1B6B4A\\]/g, 'text-primary'],
  [/border-\\[#1B6B4A\\]/g, 'border-primary'],
  [/border-outline-variant/g, 'border-border'],
  [/text-outline/g, 'text-foreground-subtle'],
  [/bg-\\[#F0F7F4\\]/g, 'bg-primary-50'],
  [/bg-secondary-container/g, 'bg-warning'],
  [/text-on-secondary-container/g, 'text-warning'],
  [/border-secondary-container/g, 'border-warning'],
  [/font-\\['Cairo'\\]/g, 'font-sans'],
  [/ring-primary-container/g, 'ring-primary']
];

for (const [regex, replacement] of replacements) {
  content = content.replace(regex, replacement);
}

// Ensure tags are closed properly for Vue
// User's HTML actually has closed inputs, let's verify just to be safe
content = content.replace(/<input([^>]+?)(?<!\/)>/g, '<input$1/>');
content = content.replace(/<img([^>]+?)(?<!\/)>/g, '<img$1/>');

const vueContent = `<script setup lang="ts">
definePageMeta({
  layout: false
})
</script>

<template>
  <div class="bg-background text-foreground rtl antialiased h-screen flex overflow-hidden font-sans">
    ${content}
  </div>
</template>
`;

try {
  fs.writeFileSync('c:/Users/USER/Desktop/rizqak2/app/pages/admin/jobs/index.vue', vueContent, 'utf-8');
  console.log('Successfully wrote to index.vue');
} catch (e) {
  console.log('Error writing file:', e);
}
