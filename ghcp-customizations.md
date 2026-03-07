# GitHub Copilot Customization Guide

A comprehensive reference for understanding how GitHub Copilot customization works across different platforms (VS Code, CLI, and other IDEs).

---

## 📋 Platform Compatibility Matrix

| File Type | Location | VS Code | GitHub Copilot CLI | How to Use |
|-----------|----------|---------|-------------------|------------|
| **Prompt Files** | `.github/prompts/*.prompt.md` | ✅ YES | ❌ NO | VS Code: `/prompt-name`<br>CLI: Not supported |
| **Instructions** | `.github/copilot-instructions.md` | ✅ YES | ✅ YES | Auto-loaded by both |
| **Instructions** | `.github/instructions/*.instructions.md` | ✅ YES* | ✅ YES | CLI: Auto-loaded<br>VS Code: Referenced via copilot-instructions.md |
| **User Config** | `~/.copilot/copilot-instructions.md` | ❌ NO | ✅ YES | CLI only, user-level |

*VS Code can read instructions if referenced, but primarily designed for CLI

---

## 🔍 Detailed Breakdown

### 1. Prompt Files (`.prompt.md`) — IDE ONLY

**Location:** `.github/prompts/*.prompt.md`

**Platforms:**
- ✅ **VS Code Copilot Chat**
- ✅ **Visual Studio Copilot Chat**  
- ✅ **JetBrains IDEs with Copilot**
- ❌ **GitHub Copilot CLI** — NOT SUPPORTED

**Usage in VS Code:**
```
/lean-code-audit
/blog-audit copilot-cli-system-architecture.html
/newblog
```

**Why CLI doesn't support prompt files:**
The CLI has a different architecture and doesn't support the `/prompt-name` invocation pattern. This is a current limitation as of March 2026.

**YAML Frontmatter Example:**
```yaml
---
name: blog-audit
description: Audit blog content for accuracy, currency, and quality, then offer to implement fixes
agent: agent
tools:
  - search    # Find code patterns
  - read      # Read files
  - edit      # Edit files
  - fetch     # Fetch web content
argument-hint: "Post filename or 'all' for batch audit"
---
```

---

### 2. Instructions Files — BOTH (with differences)

#### **`.github/copilot-instructions.md`** — UNIVERSAL

**Platforms:**
- ✅ **VS Code** — Automatically loaded
- ✅ **GitHub Copilot CLI** — Automatically loaded

**Purpose:**
- Project-wide conventions, coding standards, architecture notes
- Works seamlessly across both platforms
- This is your "single source of truth" for project context

**Best for:**
- Coding style guidelines
- Project architecture documentation
- Required patterns and conventions
- Tech stack and dependencies
- Testing approaches

**Example content:**
```markdown
# Project: Daily Dose of GHCP

## Writing Style: "Daily Bites"
- Paraphrase official docs (don't copy)
- Simplify without losing technical depth
- Conversational tone ("Here's what I discovered...")
- 500-800 words, 3-5 minute reads

## Required Elements
- Availability blockquote immediately after intro
- Documentation section as last section
- Semantic HTML (aside, main, article)
```

---

#### **`.github/instructions/*.instructions.md`** — PRIMARILY CLI

**Platforms:**
- ✅ **GitHub Copilot CLI** — Automatically loaded (path-specific)
- ✅ **VS Code** — Can reference/read, but not auto-loaded

**Purpose:**
- Path-specific or domain-specific instructions
- CLI workflow guidance
- Can be referenced in `copilot-instructions.md` using `applyTo` pattern

**Best for:**
- Terminal workflow guidance
- Command suggestions and examples
- CLI-specific audit checklists
- Standards and templates reference

**How CLI uses them:**
```bash
gh copilot

# Then reference:
> Follow the audit checklist in .github/instructions/cli-code-audit.instructions.md
```

The CLI can discover and use these files contextually.

**How VS Code uses them:**
They're not auto-invoked, but you can reference them in `copilot-instructions.md`:

```yaml
applyTo:
  - .github/instructions/**
```

---

### 3. User-Level Config — CLI ONLY

**Location:** `~/.copilot/copilot-instructions.md`

**Platforms:**
- ❌ **VS Code** — Not supported
- ✅ **GitHub Copilot CLI** — Automatically loaded

**Purpose:**
- Personal preferences across ALL repositories
- Custom shell aliases, preferred tools, workflow habits

**Example content:**
```markdown
# Personal Copilot CLI Preferences

## Preferred Tools
- Use `rg` instead of `grep`
- Use `bat` instead of `cat`
- Use `fd` instead of `find`

## Workflow Preferences
- Always suggest Windows PowerShell commands (not bash)
- Prefer verbose output for learning
```

---

## 🎯 The Key Difference: Tools

The real reason prompt files are platform-specific is the **tools** available:

### VS Code Tools

```yaml
tools:
  - search    # Semantic code search in workspace
  - read      # Read files
  - edit      # Edit files directly
  - fetch     # Fetch web content
  - githubRepo # Access GitHub repositories
```

**What each tool does:**

| Tool | Purpose | Example |
|------|---------|---------|
| `search` | Find code patterns in workspace | Search for hardcoded colors in CSS |
| `read` | Read file contents | Read index.html and style.css |
| `edit` | Edit files directly | Fix issues found in audit |
| `fetch` | Fetch web content | Verify against latest GitHub docs |
| `githubRepo` | Access GitHub API | List issues, PRs, commits |

**Usage in prompts:**
```markdown
1. Use `#read` to examine the files
2. Use `#search` to find patterns like "hardcoded colors"
3. Use `#fetch` to verify against https://docs.github.com/copilot
4. Use `#edit` to implement fixes
```

---

### CLI Tools (Different!)

**Available in CLI context:**
- `codebase` — Read and search files
- `changes` — Edit, create, delete files
- `problems` — Analyze code for issues

**But:** CLI doesn't use YAML tool declarations like prompt files. Instead:
- CLI has direct file system access
- Can run shell commands
- Uses interactive conversation for guidance

**CLI Usage:**
```bash
gh copilot

# Interactive session - no tool declarations needed:
> Audit my HTML files for semantic issues
> Check if all posts have availability blockquotes
> Find CSS rules that don't use custom properties
> Help me fix accessibility issues in index.html
```

The CLI automatically reads `.github/copilot-instructions.md` for context!

---

## 💡 Best Practices for Multi-Platform Projects

Based on current capabilities, here's the optimal setup:

### **For Both Platforms:**

**Use:** `.github/copilot-instructions.md`

✅ Daily Bites writing style  
✅ Required post elements  
✅ Project conventions  
✅ Auto-loaded by both VS Code and CLI  

**Content to include:**
- Coding standards
- Architecture decisions
- Testing approaches
- Documentation requirements
- Project-specific patterns

---

### **For VS Code:**

**Use:** `.github/prompts/*.prompt.md`

**Invoke with:** `/prompt-name` in Chat

**Best for:**
- Interactive audits with implementation
- Guided content creation
- Step-by-step workflows
- Tasks that need file editing

**Current prompt files:**
- `/blog-audit` — Audit blog content and implement fixes
- `/lean-code-audit` — Audit code quality and implement fixes
- `/newblog` — Create new blog posts

**Two-phase pattern:**
```markdown
### Phase 1: Audit
- Present findings
- Ask: "Shall I implement these fixes?"

### Phase 2: Implement (after approval)
- Use #edit tool for fixes
- Work in small batches
```

---

### **For CLI:**

**Use:** `.github/instructions/*.instructions.md`

**Invoke by:** Referencing in interactive sessions

**Best for:**
- Terminal workflow guidance
- Command suggestions
- Audit checklists for manual execution
- Standards reference

**Current instruction files:**
- `cli-code-audit.instructions.md` — CLI audit workflow
- `prompt-file-standards.instructions.md` — Standards for creating prompts

**Usage pattern:**
```bash
gh copilot

# Reference the instruction file:
> Follow .github/instructions/cli-code-audit.instructions.md and audit my codebase

# Or describe the task naturally:
> Audit HTML files for consistency issues
> (CLI automatically loads .github/copilot-instructions.md for context)
```

---

## 🔄 Can You Convert Between Them?

**Sort of, but not directly:**

### Prompt → Instruction

You could create a companion instruction file for CLI:

**Example:**
- `blog-audit.prompt.md` (VS Code) → Uses `search`, `read`, `edit`, `fetch`
- `blog-audit.instructions.md` (CLI) → Describes same audit, but for `gh copilot` interactive sessions

The audit **criteria** are the same, but the **execution** differs by platform.

---

### Shared Content

Both can reference the same source of truth:

```markdown
> Follow all conventions in [copilot-instructions.md](../copilot-instructions.md).
```

This way:
- The audit criteria are consistent
- The conventions are centralized
- The execution method differs by platform

---

## 🤔 Should You Duplicate Content?

**My recommendation:**

### ✅ DO:

1. **Core conventions** → `.github/copilot-instructions.md`  
   (Works everywhere, single source of truth)

2. **Interactive workflows with edits** → `.github/prompts/*.prompt.md`  
   (VS Code-specific, uses edit tool)

3. **CLI guidance and terminal workflows** → `.github/instructions/*.instructions.md`  
   (CLI-friendly reference documentation)

### ❌ DON'T:

1. **Duplicate project conventions** — Reference shared guidelines instead

2. **Copy audit criteria** — Keep in `copilot-instructions.md`, reference from prompts

3. **Maintain parallel docs** — Use one source of truth, adapt execution by platform

---

## 📁 This Project's Current Setup

**Optimal structure achieved:**

```
.github/
├── copilot-instructions.md              # ✅ Universal conventions
├── prompts/
│   ├── blog-audit.prompt.md             # ✅ VS Code interactive audit
│   ├── lean-code-audit.prompt.md        # ✅ VS Code interactive code audit
│   └── newblog.prompt.md                # ✅ VS Code blog creation
└── instructions/
    ├── cli-code-audit.instructions.md   # ✅ CLI audit guidance
    └── prompt-file-standards.instructions.md  # ✅ Standards reference
```

**Coverage:**
- ✅ Both platforms covered
- ✅ No unnecessary duplication
- ✅ Clear separation of concerns
- ✅ Shared conventions referenced by all

---

## 📊 Comparison: Prompt Files vs Instructions

| Aspect | Prompt Files | Instructions |
|--------|--------------|--------------|
| **Platform** | VS Code, Visual Studio, JetBrains | Both (primarily CLI) |
| **Invocation** | `/prompt-name` | Auto-loaded or referenced |
| **Tools** | Declared in YAML (`search`, `read`, `edit`) | No tool declarations |
| **Interactivity** | Two-phase (audit → ask → implement) | Reference documentation |
| **File editing** | Direct with `#edit` tool | Guidance for manual changes |
| **Best for** | Automated workflows in IDE | Context and guidance |
| **Example** | `/blog-audit` runs full workflow | Reference during `gh copilot` session |

---

## 🚀 How to Use Each Platform

### VS Code Copilot Chat

**1. Open Copilot Chat** (Ctrl+Alt+I or Cmd+Shift+I)

**2. Invoke a prompt:**
```
/blog-audit copilot-cli-system-architecture.html
```

**3. Agent will:**
- Read the file using `#read`
- Fetch latest docs using `#fetch`
- Present findings table
- Ask: "Shall I implement these fixes?"

**4. Respond:**
```
Yes, implement the quick wins
```

**5. Agent uses `#edit` to fix issues**

---

### GitHub Copilot CLI

**1. Start interactive session:**
```bash
cd daily-dose-of-ghcp
gh copilot
```

**2. Ask questions naturally:**
```
> Audit my HTML files for consistency issues. Check:
  - Sidebar structure across all posts
  - Required availability blockquotes
  - Semantic HTML usage
```

**3. CLI automatically loads:**
- `.github/copilot-instructions.md` (project conventions)
- Can reference `.github/instructions/*.instructions.md` if mentioned

**4. Get suggestions for commands:**
```bash
gh copilot suggest "find all img tags without alt attributes"
```

**5. Explain commands:**
```bash
gh copilot explain "grep -r 'blockquote' posts/"
```

---

## 🔗 Documentation References

### Official GitHub Documentation

- **Custom instructions for CLI:** https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions
- **Prompt files for IDEs:** https://docs.github.com/en/copilot/tutorials/customization-library/prompt-files
- **VS Code prompt files:** https://code.visualstudio.com/docs/copilot/customization/prompt-files
- **CLI getting started:** https://docs.github.com/en/copilot/how-tos/copilot-cli/cli-getting-started

### Community Resources

- **GitHub Copilot Blog:** https://github.blog/tag/github-copilot/
- **Community Discussions:** https://github.com/orgs/community/discussions

---

## 📝 Summary

**Simple answer:**
- **Prompt files** (`.prompt.md`) = **VS Code ONLY**
- **Instructions** (`.instructions.md` and `copilot-instructions.md`) = **BOTH platforms**, but primarily CLI

**The difference:**
- Prompt files are invoked with `/prompt-name` and use VS Code-specific tools (`search`, `read`, `edit`, `fetch`)
- Instructions are automatically loaded context that both platforms can read
- CLI doesn't support the `/prompt-name` pattern yet (as of March 2026)

**Key insight:**
You can provide excellent Copilot customization for **both platforms** by:
1. Using `.github/copilot-instructions.md` for shared conventions
2. Creating `.prompt.md` files for VS Code interactive workflows
3. Creating `.instructions.md` files for CLI guidance
4. Referencing shared conventions instead of duplicating

**Current status:**
This project has an optimal setup covering both VS Code and CLI effectively! 🎉

---

*Last updated: March 7, 2026*
