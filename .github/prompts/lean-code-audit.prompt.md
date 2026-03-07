---
name: lean-code-audit
description: Quick audit of HTML/CSS/JS structure — identify improvements for maintainability, consistency, and code quality.
agent: agent
tools:
  - codebase
  - problems
argument-hint: "Optional: specific focus areas (e.g., 'HTML structure', 'CSS organization', 'JS patterns')"
---

# Code Quality Audit — Daily Dose of GHCP

> Follow all conventions in [project guidelines](../copilot-instructions.md).

**Focus area:** ${input:focus:Leave blank for general audit, or specify: HTML structure, CSS organization, JS patterns, etc.}

You are performing a code quality audit on a **simple static HTML/CSS/JS blog** (no frameworks, no build tools, no dependencies).

## Context

This is a vanilla web project:
- `index.html` — Home page with post cards and filter
- `posts/*.html` — Individual blog posts (one file per post)
- `style.css` — Single global stylesheet
- `script.js` — Vanilla JS for active links and filters
- No build step, no npm, no frameworks

## Goal

Identify quick wins and improvements for:
- **Consistency** — Repeating patterns across post files (sidebar, structure, metadata)
- **Maintainability** — Reducing duplication, simplifying structure
- **Code quality** — Following conventions, improving readability
- **Accessibility** — Semantic HTML, ARIA where needed, proper heading hierarchy

## Guardrails

- **Do not modify code yet.** Provide recommendations only.
- Focus on **practical improvements** that matter for this small static site.
- Avoid over-engineering (no need for build tools, frameworks, or complex patterns).
- Recommendations must include **specific file/line references**.

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

## Output Format

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

### 4. Recommended Next Action
Specific first step to improve code quality (e.g., "Add missing availability blockquotes to X posts").

---

## Notes

This is a **deliberately simple** static site. Avoid suggesting:
- Build tools, bundlers, or preprocessors
- Frameworks or libraries
- Complex tooling or CI/CD (unless already present)
- Over-abstraction or premature optimization

Focus on **pragmatic improvements** for a vanilla HTML/CSS/JS blog.
