# Code Quality Audit Instructions (CLI)

Use this when asking Copilot CLI to audit code quality in the terminal.

---

## How to Use This

In GitHub Copilot CLI session:

```bash
gh copilot

# Then ask:
> Audit my codebase following .github/instructions/cli-code-audit.instructions.md
```

Or one-shot:
```bash
gh copilot -p "Audit HTML/CSS/JS quality following .github/instructions/cli-code-audit.instructions.md"
```

---

## Audit Checklist

You are auditing a **simple static HTML/CSS/JS blog** with no frameworks or build tools.

### Files to Check

**Core:**
- `index.html` — Home page
- `style.css` — Stylesheet
- `script.js` — JavaScript

**Posts:**
- `posts/*.html` — Check 3-5 samples

### What to Look For

**1. Consistency Across Posts**
- [ ] Sidebar structure identical?
- [ ] Date format consistent ("DD Month YYYY")?
- [ ] All have availability `<blockquote>`?
- [ ] Documentation link as last section?

**2. HTML Quality**
- [ ] Semantic elements (`<aside>`, `<main>`, `<article>`)?
- [ ] Proper heading hierarchy (h1 → h3)?
- [ ] Alt text on images?

**3. CSS Quality**
- [ ] CSS custom properties used (no hardcoded colors)?
- [ ] Kebab-case class names?
- [ ] No unused rules?

**4. JavaScript Quality**
- [ ] Code in `DOMContentLoaded` listener?
- [ ] Modern patterns (`const`/`let`, arrow functions)?
- [ ] No inline `onclick`?

**5. Accessibility**
- [ ] Semantic HTML?
- [ ] ARIA labels where needed?
- [ ] Proper link text?

### Output Format

Provide:
1. **Summary** (3-5 bullets)
2. **Issues Table** (Severity | Category | Issue | Files | Fix)
3. **Quick Wins** (Top 5 easy fixes)
4. **Implementation Steps** (What to fix first)

### Guardrails

**Avoid suggesting:**
- Build tools or frameworks
- Complex tooling
- Over-engineering

**Focus on:**
- Practical improvements
- Consistency
- Accessibility
- Following existing conventions in [copilot-instructions.md](../copilot-instructions.md)

---

## Example CLI Commands

After the audit, use Copilot CLI to help fix issues:

```bash
# Find missing alt tags
gh copilot suggest "find all img tags without alt attributes in HTML files"

# Check for hardcoded colors in CSS
gh copilot suggest "grep for hex colors in style.css that aren't in :root"

# Find posts missing availability blockquote
gh copilot suggest "search posts for files without availability blockquote"
```
