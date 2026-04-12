import fs from 'fs';
let content = fs.readFileSync('app/components/home/HomeSidebar.vue', 'utf8');

content = content.replace('lg:h-[calc(100vh-104px)]', 'lg:h-[calc(100vh-72px)]');

fs.writeFileSync('app/components/home/HomeSidebar.vue', content);
