---
name: 'Ideahub Content Guidelines'
description: 'Authoring rules and post-conversion checklist for research notes in the ideahub/ folder'
applyTo: 'ideahub/**'
---

# Ideahub Content Guidelines

The `ideahub/` folder contains **raw research notes** — paraphrased, source-referenced drafts that feed into blog posts on the Daily Dose of GHCP site. These notes are the source of truth for post content; they are not posts themselves.

## File Inventory

| File | Topic |
|---|---|
| `agentic_workflows.md` | GitHub Agentic Workflows technical preview — the 2-file model (`.md` + `.lock.yml`), safe outputs, MCP-based tool access, and the three-layer security model |
| `customizations-on-vscode.md` | The 4 Copilot customization types in VS Code: custom instructions, prompt files, custom agents, and agent skills — with quick mental-model summary |
| `context_window.md` | Context window Part 1 — what a context window is, model limits table, how Copilot selects and filters context, effective vs. theoretical context, and practical implications for large codebases |
| `context_window_2.md` | Context window Part 2 — best practices per surface: inline completions, Copilot Chat, `copilot-instructions.md`, Copilot CLI, and coding agent |
| `more on infitinite sessions.md` | CLI infinite sessions (session storage, compaction commands) and tracking coding agent sessions across 7 surfaces (GitHub UI, CLI, VS Code, JetBrains, Eclipse, Raycast, GitHub Mobile) |

## Authoring Conventions for Ideahub Notes

- **Paraphrase, do not copy.** Synthesize from official sources; do not paste raw doc content.
- **Include source links** at the top of the note (`> Sources: …`) so post authors can verify facts.
- **Keep notes free-form.** Tables, bullet points, and headers are all fine — there is no fixed template for notes.
- **Date and category** are not required in notes; they are added when the post is written.
- **One note may generate multiple posts** (e.g., `context_window.md` and `context_window_2.md` map to Part 1 and Part 2).

## Converting a Note into a Blog Post

Follow the project-wide post structure and writing style defined in [`.github/copilot-instructions.md`](../.github/copilot-instructions.md). Key requirements:

### Structure

```
posts/your-post.html
  ├── Back to all posts link
  ├── post-header (date-badge + category badge)
  ├── post-body
  │   ├── Opening hook paragraph
  │   ├── <blockquote> Availability (REQUIRED — immediately after intro, before any <h3>)
  │   ├── <h3> sections with content
  │   └── <h3>Documentation</h3>  ← MUST be the last section, contains official docs link
```

### Availability Blockquote

**Every post must have this.** Verify the correct wording on `https://docs.github.com` before writing. Use one of these:

- CLI features → `All GitHub Copilot paid plans (Pro, Pro+, Business, and Enterprise).`
- Coding agent / tracking → `Copilot Pro, Pro+, Business, and Enterprise plans.`
- Free-tier features → `All GitHub Copilot plans including Free.`

```html
<blockquote>
  <strong>Availability:</strong> …
</blockquote>
```

### Writing Style

- **Bite-sized and conversational** — friendly tech tip over coffee, 500–800 words, 3–5 minute read.
- **Lead with the "why"** — open with the problem it solves or why it matters.
- **Show before you explain** — examples first, explanation after.
- **Use `<strong>` for key terms** on first use; `<code>` for all CLI commands, file paths, and code snippets.
- **No filler phrases** ("It's worth noting that…", "In order to…").

### Post Card on index.html

Add an `<article class="post-card">` entry to `index.html` and update the **Recent Posts** list in the sidebar of every existing post.

## What NOT to Do

- Do not copy entire paragraphs from notes verbatim into a post — paraphrase and synthesize.
- Do not skip the availability blockquote; every post must have one.
- Do not add any section after `<h3>Documentation</h3>` inside `.post-body`.
- Do not use hardcoded colors or sizes in HTML/CSS — always reference CSS custom properties from `style.css`.
- Do not guess availability — verify on `https://docs.github.com` before writing.
