---
name: lean-code-audit
description: Audit HTML/CSS/JS structure, identify improvements, and implement fixes for maintainability and code quality.
agent: agent
tools:
  - codebase
  - changes
  - problems
argument-hint: "Optional: specific focus areas (e.g., 'HTML structure', 'CSS organization', 'JS patterns')"
---

# Code Quality Audit & Fix — Daily Dose of GHCP

> Follow all conventions in [project guidelines](../copilot-instructions.md).

**Focus area:** ${input:focus:Leave blank for general audit, or specify: HTML structure, CSS organization, JS patterns, etc.}

You are performing a code quality audit on a **simple static HTML/CSS/JS blog** (no frameworks, no build tools, no dependencies), and you will **implement the fixes** you identify.

## Context

This is a vanilla web project:
- `index.html` — Home page with post cards and filter
- `posts/*.html` — Individual blog posts (one file per post)
- `style.css` — Single global stylesheet
- `script.js` — Vanilla JS for active links and filters
- No build step, no npm, no frameworks

## Goal

1. **Audit** the codebase for quality and consistency issues
2. **Prioritize** improvements by effort and impact
3. **Implement** quick wins and high-value fixes

Focus areas:
- **Consistency** — Repeating patterns across post files (sidebar, structure, metadata)
- **Maintainability** — Reducing duplication, simplifying structure
- **Code quality** — Following conventions, improving readability
- **Accessibility** — Semantic HTML, ARIA where needed, proper heading hierarchy

## Workflow

### Phase 1: Audit (analyze before acting)

**Step 1: Read the codebase**

Use the available tools to examine files:
- Use `view` or file reading tools to inspect HTML, CSS, and JS files
- Start with: `index.html`, `style.css`, `script.js`
- Sample 2-3 files from `posts/` directory to check consistency
- Look for patterns, issues, and opportunities for improvement

**Do NOT rely on workspace readers or placeholders.** Actively read files with the tools you have.

**Step 2: Analyze and document findings**

After reading the files, identify and categorize issues. Focus on **practical improvements** that matter for this small static site. Avoid over-engineering (no build tools, frameworks, or complex patterns).

---

## Getting Started

**To begin the audit:**

1. Read `index.html` to understand the main structure
2. Read `style.css` to see the CSS organization
3. Read `script.js` to check JS patterns
4. Read 2-3 sample files from `posts/` to check consistency (e.g., `posts/copilot-cli-system-architecture.html`)
5. Document findings as you discover them

Use the file reading tools available to you. Do not wait for a workspace summary - actively read each file you need to audit.

---

## Audit Steps

### 1. Structure Check

**HTML:**
- Consistent sidebar structure across all post files?
- Proper semantic elements (`<aside>`, `<main>`, `<article>`, etc.)?
- Required availability `<blockquote>` in every post?
- Documentation link as last section in every post?
- Proper heading hierarchy (h1 → h3, no skipping levels)?

**CSS:**
- CSS custom properties used consistently (no hardcoded colors)?
- Class naming conventions followed (kebab-case)?
- Any duplication or redundant rules?
- Responsive design handled consistently?

**JavaScript:**
- All code in DOMContentLoaded listener?
- Using modern patterns (const/let, arrow functions, querySelector)?
- No inline onclick or deprecated patterns?

### 2. Consistency Analysis

Check for variations across post files:
- Sidebar structure differences
- Metadata format inconsistencies
- Date format variations
- Badge/category label differences

List any files that deviate from the standard pattern.

### 3. Quick Wins

Identify low-effort, high-value improvements:
- Dead code or unused CSS rules
- Repeated HTML blocks that could use a consistent template
- Missing availability blockquotes
- Broken or outdated links
- Accessibility improvements (alt text, ARIA labels, semantic HTML)

### 4. Maintainability Issues

**Duplication:**
- Sidebar copied across post files (acceptable for no-build static sites, but note it)
- Any repeated code blocks that cause sync issues?

**Organization:**
- Are related styles grouped logically in style.css?
- Is script.js organized clearly?
- Could index.html structure be clearer?

---

## Output Format (Phase 1: Audit Report)

Return:

### 1. Executive Summary (3-5 bullets)
Overall assessment of code quality and consistency.

### 2. Findings Table

| Category | Issue | Files Affected | Effort | Impact | Recommendation |
|----------|-------|----------------|--------|--------|----------------|
| ... | ... | ... | S/M/L | Low/Med/High | ... |

**Categories:**
- Consistency (structure, patterns, naming)
- HTML Quality (semantic elements, accessibility, structure)
- CSS Quality (organization, duplication, convention use)
- JS Quality (modern patterns, best practices)
- Documentation (links, availability, completeness)

**Effort:**
- **S (Small):** < 30 min (fix one file, update link, add alt text)
- **M (Medium):** 30 min - 2 hours (update multiple files, refactor section)
- **L (Large):** > 2 hours (major restructure, bulk updates)

### 3. Quick Wins (Top 5)
Prioritized list of easiest, highest-value fixes to implement first.

### 4. Implementation Plan
Propose what to fix in what order. Group related changes together.

---

## Phase 2: Implementation

**After presenting the audit report**, ask for approval and then:

1. **Start with Quick Wins** — Implement small, safe changes first
2. **Work in batches** — Group related fixes together (e.g., fix all availability blockquotes, then all broken links)
3. **Validate as you go** — Check that changes don't break anything
4. **Report progress** — Summarize what was fixed after each batch

**Implementation approach:**
- Fix issues in order of effort (small → medium → large)
- Make surgical edits (don't rewrite entire files unless necessary)
- Preserve existing structure and patterns
- Test changes incrementally

**What to avoid:**
- Making all changes at once without validation
- Changing things that aren't broken
- Adding complexity or dependencies
- Deviating from project conventions

---

## Notes

This is a **deliberately simple** static site. Avoid suggesting:
- Build tools, bundlers, or preprocessors
- Frameworks or libraries
- Complex tooling or CI/CD (unless already present)
- Over-abstraction or premature optimization

Focus on **pragmatic improvements** for a vanilla HTML/CSS/JS blog.
