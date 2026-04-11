# .data/ Folder

This folder contains all execution tracking, evidence logs, and governance documentation for the Rizqak2 improvement plan.

## Files

### `improvement-status.json`
**Single Source of Truth for work progress.**

This JSON file tracks:
- Current section, phase, and step being worked on
- All completed steps
- All pending steps
- Notes for the next AI model resuming work
- Blocked status (if work is stuck)
- Evidence of fixes and test results

**Update this file after EVERY completed step.**

### `mobile-audit.md`
Lists all mobile (375px) issues discovered during systematic audit (Section 2, Step S2.P1.1).

Format:
```markdown
- [ ] **Page:** `/jobs` - **Issue:** Filter sidebar doesn't collapse - **Fix:** Add mobile drawer
```

### `evidence-log.md`
Evidence of all fixes applied, tests run, and results achieved.

Format:
```markdown
## [2026-04-12] S1.P1.1 — Migrate Shadows to OKLCH
- **Action:** Replaced rgba() with oklch() for all shadow tokens
- **Files changed:** app/assets/css/main.css
- **Verification:** Searched all .vue files, confirmed zero hardcoded shadows
- **Screenshot:** evidence/shadows-before-after.png
```

### `execution-governance.md`
Rules and protocols for AI models executing this plan.

Defines:
- Verification standards
- How to mark steps complete
- When to update status
- How to document blockers

## Usage

**For AI models resuming work:**

1. **ALWAYS** read `improvement-status.json` first
2. Check `current_step` to know where to resume
3. Follow the step instructions in `../IMPROVEMENT_PLAN.md`
4. **After completing step:** Update `improvement-status.json` with new status
5. Document fixes in `evidence-log.md`
6. If discovering mobile issues, add to `mobile-audit.md`

**Never skip status updates.** This folder is the memory of the entire project.
