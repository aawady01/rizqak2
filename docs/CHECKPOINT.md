# ⚠️ MANDATORY PRE-PHASE CHECKPOINT

> **ANY AI agent MUST read `AGENTS.md` (project root) BEFORE starting any work.**
> **This file is a quick reminder — AGENTS.md contains the FULL mandatory workflow.**

---

## Quick Checklist (Full details in AGENTS.md)

- [ ] Read `task.md` — the ENTIRE current phase section, every checkbox
- [ ] Read `implementation_plan.md` — the ENTIRE current phase section, every instruction
- [ ] Read `docs/STANDARDS.md` — execution methodology section (top of file)
- [ ] Read EVERY file that will be modified in this phase

## Step 2: Create TodoList With EVERY Sub-Task

- [ ] Create TodoList entries for EVERY checkbox in the phase
- [ ] Do NOT proceed until TodoList is complete

## Step 3: Execute ONE Item at a Time

- [ ] Complete ONE checklist item
- [ ] Read the modified file to verify the change
- [ ] Mark as done in TodoList ONLY after verification

## Step 4: After Phase — Mandatory Verification

- [ ] Run `pnpm typecheck` — show result
- [ ] Run ALL conflict greps from the plan — show ZERO results
- [ ] Compare actual files vs plan requirements line by line
- [ ] Update `docs/STANDARDS.md`
- [ ] Update `docs/PHASE_COMPLETION_LOG.md`
- [ ] Update `task.md`

## Step 5: Report to User

- [ ] Write completion report with: files modified, commands run, results shown

---

## 🔴 STOP RULES (User Can Enforce)

If the AI agent:
- Marks a task as done without showing verification → **STOP and demand proof**
- Skips conflict grep commands → **STOP and demand results**
- Says "already done" without showing file contents → **STOP and demand evidence**
- Proceeds to next phase without completing current phase → **STOP and demand completion**

**User command to enforce**: "اقرأ CHECKPOINT.md وطبق كل خطوة"
