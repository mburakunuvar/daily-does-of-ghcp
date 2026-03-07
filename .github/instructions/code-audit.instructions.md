# Code Quality Audit Instructions

Use these instructions with `@workspace` in VS Code Copilot Chat to audit code quality.

## How to Use

In VS Code Copilot Chat, ask:
```
@workspace Please audit the codebase for quality and consistency issues following the guidelines in .github/instructions/code-audit.instructions.md
```

---

## Audit Guidelines

You are auditing a **simple static HTML/CSS/JS blog** (no frameworks, build tools, or dependencies).

### Files to Check

**Core files:**
- `index.html` — Home page with post cards and filter
- `style.css` — Single global stylesheet  
- `script.js` — Vanilla JS for active links and filters

**Post files:**
- `posts/*.html` — Individual blog posts (check 3-5 samples for consistency)

### What to Look For

#### 1. Consistency Across Posts
- [ ] Sidebar structure identical in all post files?
- [ ] Date format consistent (e.g., "27 February 2026")?
- [ ] Badge/category labels match between posts and index.html?
- [ ] All posts have required availability `<blockquote>`?
- [ ] Documentation link as last section in every post?

#### 2. HTML Quality
- [ ] Proper semantic elements (`<aside>`, `<main>`, `<article>`)?
- [ ] Heading hierarchy correct (h1 → h3, no skipping)?
- [ ] Alt text on all images?
- [ ] ARIA labels where needed?

#### 3. CSS Quality  
- [ ] CSS custom properties used consistently (no hardcoded colors)?
- [ ] Class names follow kebab-case convention?
- [ ] No unused or redundant CSS rules?
- [ ] Responsive design handled consistently?

#### 4. JavaScript Quality
- [ ] All code in `DOMContentLoaded` listener?
- [ ] Modern patterns used (`const`/`let`, arrow functions, `querySelector`)?
- [ ] No inline `onclick` or deprecated patterns?

#### 5. Accessibility
- [ ] Proper semantic HTML throughout?
- [ ] Images have alt text?
- [ ] Links have descriptive text?
- [ ] Color contrast sufficient?

### Output Format

Provide findings in this format:

**1. Executive Summary (3-5 bullets)**
Overall assessment of code quality.

**2. Issues Found**

| Severity | Category | Issue | Files Affected | Recommendation |
|----------|----------|-------|----------------|----------------|
| High/Med/Low | ... | ... | ... | ... |

**3. Quick Wins (Top 5)**
List easiest, highest-value fixes.

**4. Proposed Fixes**
For each issue, provide:
- Specific file and line number
- Current code
- Suggested fix
- Why it matters

### Implementation

After presenting findings, ask if I want to implement specific fixes. Then:
1. Start with quick wins (low-effort, high-value)
2. Group related changes together
3. Make surgical edits (preserve structure)
4. Validate after each change

### Guardrails

**Avoid suggesting:**
- Build tools, bundlers, or preprocessors
- Frameworks or libraries
- Complex tooling or CI/CD
- Over-abstraction

**Focus on:**
- Pragmatic improvements for a simple static site
- Consistency across files
- Following existing conventions
- Accessibility and semantic HTML

---

## Reference: Project Conventions

See [copilot-instructions.md](../copilot-instructions.md) for full project guidelines including:
- Required availability blockquote in every post
- HTML/CSS/JS conventions
- Content guidelines ("Daily Bites" style)
- CSS custom properties to use
