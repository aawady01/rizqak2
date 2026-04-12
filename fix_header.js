import fs from 'fs';
let content = fs.readFileSync('app/components/layout/LayoutHeader.vue', 'utf8');

const targetStr = `:class="[
      'bg-primary sticky top-0 z-sticky w-full border-b border-white/10 shadow-sm transition-transform duration-300 ease-in-out',
      isHidden ? '-translate-y-full' : 'translate-y-0'
    ]"`;

const newStr = `class="bg-primary sticky top-0 z-sticky w-full border-b border-white/10 shadow-sm transition-transform duration-300 ease-in-out translate-y-0"`;

content = content.replace(targetStr, newStr);

// Also replace the \r\n explicitly if the exact match fails
content = content.replace(/:class="\[[\s\S]*?isHidden \? '-translate-y-full' : 'translate-y-0'[\s\S]*?\]"/, newStr);

fs.writeFileSync('app/components/layout/LayoutHeader.vue', content);
