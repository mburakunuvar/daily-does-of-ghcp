---
name: lean-code-audit
description: Audit HTML/CSS/JS code for quality, consistency, and accessibility issues, then implement fixes
agent: agent
tools:
  - search
  - read
  - edit
  - vscode/askQuestions
---

# Code Quality Audit & Fix

> Follow all conventions in [copilot-instructions.md](../copilot-instructions.md) and [style & color guide](../instructions/html-css-style-color-guide.instructions.md).

You are auditing a **simple static HTML/CSS/JS blog** (no frameworks, build tools, or dependencies).

## Step 1: Gather Input

Use the `#tool:vscode/askQuestions` tool to ask the user:

1. **Audit focus** — general audit of everything, or a specific area (e.g. "HTML structure", "CSS organization", "JS patterns", "accessibility")

## Step 2: Understand the Codebase

Use `#tool:read` to examine the core files:
- `index.html` — Home page with post cards and filter
- `style.css` — Single global stylesheet
- `script.js` — Vanilla JS for navigation and filters

Use `#tool:search` to sample 3-5 files from `posts/` to check consistency.

## Step 3: Audit

**Consistency across posts:**
- Sidebar structure identical across all pages?
- Date format consistent (e.g. "27 February 2026")?
- Badge/category labels match index.html cards?
- Required availability `<blockquote>` in every post?
- Documentation link as last section in every post?

**HTML quality:**
- Semantic elements (`<aside>`, `<main>`, `<article>`)?
- Heading hierarchy (h1 → h3, no skipping)?
- Alt text on images?
- ARIA labels where needed?

**CSS quality:**
- CSS custom properties used (no hardcoded colors)?
- Kebab-case class names?
- No unused/redundant rules?
- Responsive design consistent?

**JS quality:**
- Code in `DOMContentLoaded` listener?
- Modern patterns (`const`/`let`, arrow functions, `querySelector`)?
- No inline `onclick` or deprecated code?

## Step 4: Present Findings

| Severity | Category | Issue | Files | Fix |
|----------|----------|-------|-------|-----|
| High/Med/Low | ... | ... | ... | ... |

List top 5 quick wins (low-effort, high-value fixes).

**Then use `#tool:vscode/askQuestions` to ask:** "Shall I implement these fixes?"

## Step 5: Implement (after approval)

1. Start with quick wins
2. Use `#tool:edit` for fixes
3. Work in small batches
4. Validate changes
5. Report what was fixed

**Avoid suggesting:**
- Build tools or bundlers
- Frameworks or libraries
- Complex tooling
- Over-engineering

Focus on practical improvements for a simple static site.
