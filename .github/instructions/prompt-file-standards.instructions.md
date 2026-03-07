# Prompt File Standards

Guidelines for creating consistent, effective `.prompt.md` files for VS Code Copilot Chat.

---

## Purpose

This instruction file establishes standards for all `.prompt.md` files in `.github/prompts/` to ensure:
- **Consistency** — All prompts follow the same structure and conventions
- **Clarity** — Clear purpose, workflow, and expected outcomes
- **Actionability** — Prompts that audit should offer to implement fixes
- **Platform-appropriate** — Use VS Code Chat tools, not CLI tools

---

## File Location

All prompt files go in:
```
.github/prompts/*.prompt.md
```

Invoke in VS Code Chat with:
```
/prompt-name
```

---

## Standard Template

### 1. YAML Frontmatter (Required)

```yaml
---
name: prompt-name
description: Brief one-line description of what this prompt does and offers to implement
agent: agent
tools:
  - search    # Find code patterns
  - read      # Read files
  - edit      # Edit files
  - fetch     # Fetch web content (for docs/announcements)
argument-hint: "What user should provide as input (optional)"
---
```

**Rules:**
- `name` — Kebab-case, matches filename (e.g., `blog-audit.prompt.md` → `name: blog-audit`)
- `description` — One sentence, under 120 characters, describes audit AND implementation
- `agent: agent` — Always use this value for VS Code
- `tools` — **VS Code tools only**: `search`, `read`, `edit`, `fetch`
  - ❌ Do NOT use CLI tools: `codebase`, `changes`, `problems`
- `argument-hint` — Optional, tells user what to provide as input

---

### 2. Prompt Header

```markdown
# Descriptive Title

> Follow all conventions in [copilot-instructions.md](../copilot-instructions.md).

**Input variable:** ${input:varname:User-facing prompt text}

Brief context paragraph explaining what this prompt does and for whom.
```

**Rules:**
- Always reference `copilot-instructions.md` for project conventions
- Use `${input:varname:prompt}` for required user inputs
- Keep context brief (2-3 sentences max)

---

### 3. Workflow Structure (Two-Phase Pattern)

For audit/review prompts, use this two-phase pattern:

```markdown
## Workflow

### Phase 1: Audit

**Read the codebase:**
1. Use `#read` to examine files
2. Use `#search` to find patterns
3. Use `#fetch` to verify against external sources (if needed)

**Check for:**
- Criterion 1
- Criterion 2
- Criterion 3

**Present findings:**

| Severity | Category | Issue | Files | Fix |
|----------|----------|-------|-------|-----|
| High/Med/Low | ... | ... | ... | ... |

List top 5 quick wins (low-effort, high-value fixes).

**Then ask:** "Shall I implement these fixes using the `#edit` tool?"

### Phase 2: Implement (after approval)

1. Start with quick wins
2. Use `#edit` tool for fixes
3. Work in small batches
4. Validate changes
5. Report what was fixed
```

**Rules:**
- **Phase 1 = Audit** — Always present findings before acting
- **Always ask** — "Shall I implement?" or similar confirmation question
- **Phase 2 = Implementation** — Only execute after user approval
- Use VS Code tool syntax: `#read`, `#edit`, `#search`, `#fetch`

---

### 4. Detailed Audit Steps

Provide step-by-step instructions for the audit:

```markdown
## Step 1: [Category Name]

Brief description of what to check in this step.

**What to look for:**
- [ ] Checklist item 1
- [ ] Checklist item 2
- [ ] Checklist item 3

**Output for this step:**
- What the agent should produce
```

**Rules:**
- Break complex audits into logical steps
- Use checklists for criteria
- Specify expected output format
- Include examples where helpful

---

### 5. Guardrails (What NOT to Do)

```markdown
**Avoid suggesting:**
- Over-engineering (frameworks, build tools for simple projects)
- Complex tooling
- Changes outside the scope

**Focus on:**
- Practical improvements
- Consistency with project conventions
- Actionable, specific recommendations
```

**Rules:**
- Always include guardrails for simple projects (avoid suggesting React for vanilla JS)
- Align with project conventions in `copilot-instructions.md`
- Focus on what's appropriate for the codebase

---

## Standard Patterns

### Pattern 1: Audit + Implement

**Use for:** Code quality audits, content reviews, consistency checks

**Structure:**
1. Phase 1: Audit → Present findings → Ask "Shall I implement?"
2. Phase 2: Implement fixes with `#edit`

**Examples:**
- `lean-code-audit.prompt.md`
- `blog-audit.prompt.md`

---

### Pattern 2: Creation + Validation

**Use for:** Generating new content (blog posts, components, docs)

**Structure:**
1. Phase 1: Create draft using templates/guidelines
2. Show draft → Ask "Shall I save this?"
3. Phase 2: Save files and validate

**Examples:**
- `newblog.prompt.md` (creation pattern)

---

### Pattern 3: Batch Processing

**Use for:** Operations across multiple files

**Structure:**
1. Identify all target files
2. Process each file
3. Summarize results
4. Ask "Shall I apply these changes?"

**Example input handling:**
```markdown
**Target:** ${input:target:Enter filename or 'all' for batch processing}
```

---

## VS Code Tools Reference

### Available Tools

| Tool | Purpose | Example Usage |
|------|---------|---------------|
| `search` | Find code patterns | `#search` for hardcoded colors in CSS |
| `read` | Read file contents | `#read` index.html and style.css |
| `edit` | Edit files | `#edit` to fix issues found in audit |
| `fetch` | Fetch web content | `#fetch` latest GitHub Copilot docs |

### Tool Syntax in Prompts

When instructing the agent, use this syntax:

```markdown
1. Use `#read` to examine the files
2. Use `#search` to find patterns like "hardcoded colors"
3. Use `#fetch` to verify against https://docs.github.com/copilot
4. Use `#edit` to implement fixes
```

---

## Quality Checklist

Before finalizing a prompt file, verify:

**YAML Frontmatter:**
- [ ] Name matches filename (kebab-case)
- [ ] Description is concise and mentions implementation
- [ ] Tools use VS Code syntax (`search`, `read`, `edit`, `fetch`)
- [ ] No CLI tools (`codebase`, `changes`, `problems`)

**Structure:**
- [ ] References `copilot-instructions.md`
- [ ] Has two-phase workflow (Audit → Implement)
- [ ] Asks "Shall I implement?" before making changes
- [ ] Includes guardrails (what NOT to do)

**Clarity:**
- [ ] Clear step-by-step instructions
- [ ] Expected outputs specified
- [ ] Examples provided where helpful
- [ ] Appropriate for VS Code Chat (not CLI)

**Consistency:**
- [ ] Follows project conventions
- [ ] Matches style of other prompt files
- [ ] Uses standard patterns from this guide

---

## Examples

### ✅ Good Prompt File

```yaml
---
name: accessibility-audit
description: Audit HTML for accessibility issues and offer to implement ARIA fixes
agent: agent
tools:
  - search
  - read
  - edit
---

# Accessibility Audit & Fix

> Follow all conventions in [copilot-instructions.md](../copilot-instructions.md).

## Workflow

### Phase 1: Audit

Use `#search` and `#read` to check for:
- Missing alt text on images
- Improper heading hierarchy
- Missing ARIA labels

Present findings table.

**Then ask:** "Shall I implement these accessibility fixes?"

### Phase 2: Implement

Use `#edit` to add missing alt text, fix headings, add ARIA labels.
```

---

### ❌ Bad Prompt File

```yaml
---
name: code_audit
description: Audit code
agent: agent
tools:
  - codebase    # ❌ CLI tool, not VS Code
  - changes     # ❌ CLI tool, not VS Code
---

# Code Audit

Audit the code and fix everything automatically.  # ❌ No two-phase, no asking
```

**Problems:**
- Uses CLI tools instead of VS Code tools
- No reference to `copilot-instructions.md`
- No two-phase workflow
- Doesn't ask before implementing
- Vague description

---

## Maintenance

**When creating a new prompt:**
1. Copy an existing prompt file as a template
2. Update YAML frontmatter
3. Adapt workflow to your use case
4. Follow the two-phase pattern
5. Test in VS Code Chat with `/prompt-name`

**When updating existing prompts:**
1. Ensure they match current standards
2. Convert CLI tools to VS Code tools if needed
3. Add "Shall I implement?" if missing
4. Update descriptions to mention implementation

---

## Related Files

- `.github/copilot-instructions.md` — Project-wide conventions (always reference this)
- `.github/instructions/*.instructions.md` — CLI-specific instructions (different from prompts)
- `.github/prompts/*.prompt.md` — VS Code prompt files (use this standard)

---

*This standard ensures all prompt files are consistent, effective, and appropriate for VS Code Copilot Chat.*
