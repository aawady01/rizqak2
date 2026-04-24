# Redesign Admin Dashboard Pages

We will redesign the entire Admin Dashboard using the monolithic design established in `admin/jobs/index.vue`. We will extract the shared components (Sidebar, Top Navigation) into a layout, and create standard data tables for all other entities.

## User Review Required

> [!IMPORTANT]
> The current `admin/jobs/index.vue` contains the full Sidebar and Header. I will extract this into the `layouts/admin.vue` so it can be shared across all pages. This will make it easier to maintain.

> [!NOTE]  
> All other pages (`companies`, `countries`, `fields`, `job-titles`) currently just show a "قريباً..." (Coming soon) placeholder. I will create fully functional data tables for them matching the `jobs` design, using mock data specific to each entity.

## Open Questions

1. Do you want me to keep the same columns structure (Title, Country, Status, etc.) and just adapt them for each specific page (e.g. for "Companies", columns would be Name, Industry, Country, Status)?
2. The Dashboard Home (`admin/index.vue`) usually has summary widgets or charts. Should I just build a simple overview layout for it for now, or use a table?

## Proposed Changes

### Layouts

#### [MODIFY] admin.vue
Extract the `<nav>` (SideNavBar) and `<header>` (TopAppBar) from `admin/jobs/index.vue` and place them here. Ensure navigation links are updated based on the current route to show the active state.

### Pages

#### [MODIFY] jobs/index.vue
Remove the sidebar and header code, use `layout: 'admin'`, and keep the main `<main>` content (the data table).

#### [MODIFY] companies/index.vue
Use `layout: 'admin'`. Build a data table matching the jobs design, with columns: `Company Name`, `Industry`, `Location`, `Jobs Posted`, `Status`. Add mock data.

#### [MODIFY] countries/index.vue
Use `layout: 'admin'`. Build a data table with columns: `Country Name`, `Flag/Code`, `Active Jobs`, `Status`. Add mock data.

#### [MODIFY] fields/index.vue
Use `layout: 'admin'`. Build a data table with columns: `Field Name`, `Jobs Count`, `Status`. Add mock data.

#### [MODIFY] job-titles/index.vue
Use `layout: 'admin'`. Build a data table with columns: `Title`, `Field`, `Usage Count`, `Status`. Add mock data.

#### [MODIFY] index.vue
Use `layout: 'admin'`. Add some basic overview statistics or a recent activity table, styled to match the new design system.

## Verification Plan

### Manual Verification
- Navigate through all pages in the sidebar to ensure the active state works and the layout persists smoothly.
- Verify each page's table is responsive, supports column resizing, and drag-and-drop reordering just like the original jobs table.
