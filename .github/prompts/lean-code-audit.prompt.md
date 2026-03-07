---
name: lean-code-audit
description: Audit HTML/CSS/JS code for quality, consistency, and accessibility issues, then implement fixes
agent: agent
tools:
  - search
  - read
  - edit
argument-hint: "Optional: specific focus (e.g., 'HTML structure', 'CSS organization', 'accessibility')"
---

# Code Quality Audit & Fix

> Follow all conventions in [copilot-instructions.md](../copilot-instructions.md).

**Focus:** ${input:focus:Leave blank for general audit, or specify: HTML structure, CSS organization, JS patterns, accessibility, etc.}

You are auditing a **simple static HTML/CSS/JS blog** (no frameworks, build tools, or dependencies).

## Context

Vanilla web project:
- `index.html` — Home page with post cards and filter
- `posts/*.html` — Blog posts (one file per post)
- `style.css` — Single global stylesheet
- `script.js` — Vanilla JS for navigation and filters

## Workflow

### Phase 1: Audit

**Read the codebase:**
1. Read `index.html`, `style.css`, `script.js`
2. Sample 3-5 files from `posts/` to check consistency
3. Use `#read` and `#search` tools to examine code

**Check for:**

**Consistency across posts:**
- Sidebar structure identical?
- Date format consistent (e.g., "27 February 2026")?
- Badge/category labels match index.html?
- Required availability `<blockquote>` in every post?
- Documentation link as last section?

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

**Present findings:**

| Severity | Category | Issue | Files | Fix |
|----------|----------|-------|-------|-----|
| High/Med/Low | ... | ... | ... | ... |

List top 5 quick wins (low-effort, high-value fixes).

### Phase 2: Implement (after approval)

1. Start with quick wins
2. Use `#edit` tool for fixes
3. Work in small batches
4. Validate changes
5. Report what was fixed

**Avoid suggesting:**
- Build tools or bundlers
- Frameworks or libraries  
- Complex tooling
- Over-engineering

Focus on practical improvements for a simple static site.
