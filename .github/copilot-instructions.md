---
description: Project-wide coding guidelines for Daily Dose of GHCP
applyTo: '**'
---

# Daily Dose of GHCP — Copilot Instructions

## Project Overview

A static HTML/CSS/JS blog that documents daily discoveries about GitHub Copilot features. No build step, no frameworks, no package manager — just plain files served directly in the browser.

```
index.html          # Home page with post cards and category filter
style.css           # Single global stylesheet (GitHub-inspired dark sidebar)
script.js           # Vanilla JS: active-link highlight + category filter
posts/              # One HTML file per post
.github/            # Repo metadata and these instructions
```

---

## HTML Conventions

- Use `<!DOCTYPE html>` and `<html lang="en">` on every page.
- Every post lives in `posts/` and references shared assets with `../` relative paths (`../style.css`, `../script.js`).
- The sidebar structure is identical across all pages — copy it exactly from an existing post, only updating the `class="active"` link.
- Use semantic elements: `<aside>`, `<main>`, `<blockquote>`, `<pre><code>`, `<table>`, `<ul>` / `<ol>`.
- 2-space indentation throughout.
- Page-specific styles go in a `<style>` block inside `<head>` — see `index.html` for the filter-bar example.

### Post page structure

```html
<div class="layout">
  <aside class="sidebar"> … </aside>
  <main class="main">
    <a href="../index.html" class="btn-back"> … Back to all posts </a>
    <div class="post-header">
      <div class="post-meta">
        <span class="date-badge">DD Month YYYY</span>
        <span class="badge">emoji Category</span>
      </div>
      <h1 class="post-title">…</h1>
    </div>
    <div class="post-body"> … </div>
  </main>
</div>
```

### Availability blockquote

**Required in every post — no exceptions.** Every post file under `posts/` must include an availability blockquote immediately after the opening intro paragraph and before any `<h3>` section. If it is missing, add it before committing.

```html
<blockquote>
  <strong>Availability:</strong> …
</blockquote>
```

Use the following wording based on the feature type. Verify against `https://docs.github.com` if unsure:

- Copilot CLI features → `All GitHub Copilot paid plans (Pro, Pro+, Business, and Enterprise).`
- Coding agent / tracking sessions → `Copilot Pro, Pro+, Business, and Enterprise plans.`
- Free-tier features → `All GitHub Copilot plans including Free.`

When generating or reviewing any post, check that this blockquote is present. Raise it as an issue if it is absent.

---

## CSS Conventions

- All design tokens are CSS custom properties defined in `:root` inside `style.css`. Always use them; never hardcode colours or sizes.
- Key tokens: `--accent` (#6e40c9), `--bg`, `--surface`, `--sidebar-bg` (#0d1117), `--border`, `--text`, `--text-muted`, `--radius` (8px), `--font`, `--font-mono`.
- Class names use lowercase kebab-case (`.post-header`, `.filter-btn`, `.date-badge`).
- Page-scoped rules that would pollute `style.css` belong in a `<style>` block in `<head>`, not inline.
- Do not add utility-class frameworks or external CSS libraries.

---

## JavaScript Conventions

- Vanilla JS only — no frameworks, no npm dependencies.
- All code lives in the `DOMContentLoaded` listener in `script.js`.
- Behaviour already handled by `script.js` (do not duplicate):
  - Sidebar active-link detection based on `window.location.pathname`.
  - Category filter via `[data-filter]` buttons and `[data-category]` cards.
  - Smooth scroll to top on page load.
- Use `const` / `let`, arrow functions, template literals, and `querySelector` / `querySelectorAll`.
- No `var`, no inline `onclick` attributes.

---

## Index Page — Adding a New Post Card

Append a new `<article>` inside `<div class="posts-grid">` following this shape:

```html
<article class="post-card" data-category="CATEGORY_KEY">
  <a href="posts/your-post.html" class="post-card-link">
    <div class="post-card-header">
      <div class="post-card-meta">
        <span class="date-badge">DD Month YYYY</span>
        <span class="badge">emoji Label</span>
      </div>
    </div>
    <h2 class="post-card-title">Post Title</h2>
    <p class="post-card-excerpt">One or two sentences describing the post.</p>
  </a>
</article>
```

`data-category` must match one of the values used in the filter buttons (`data-filter`). Add a new filter button if introducing a new category.

Also update the **Recent Posts** list in the sidebar of every existing post to include the new entry.

---

## Content Guidelines

### Writing Style: "Daily Bites"

The Daily Dose of GHCP is a **fun-to-follow, bite-sized** journal of GitHub Copilot discoveries. Think of each post as a friendly tech tip over coffee — informative but never overwhelming.

**Core Principles:**
- **Paraphrased, not copied** — Use official docs as the source, but tell the story in your own words
- **Simplified, not dumbed down** — Keep the technical depth, but make it accessible
- **Fun to follow** — Conversational tone, clear structure, engaging examples
- **Quick read** — Aim for 3-5 minute read time (500-800 words)

**Tone & Voice:**
- Write like you're explaining to a friend: "Here's what I discovered today..."
- Be enthusiastic but not hyperbolic
- Use "you" and "we" — keep it conversational
- Avoid jargon without explanation
- No corporate speak or marketing fluff

**Structure:**
- **Opening hook** — Start with why this matters or what problem it solves
- **Key insight** — Lead with the most important takeaway
- **Clear sections** — Break complex topics into digestible chunks (use h3 headings)
- **Examples first** — Show before you explain when possible
- **Actionable takeaway** — End with what the reader can do next

**What to Avoid:**
- Copying entire paragraphs from docs (paraphrase and synthesize)
- Long-winded explanations (get to the point)
- Filler phrases ("It's worth noting that...", "In order to...", "One of the key things...")
- Dense walls of text (break it up!)
- Academic or overly formal language

**Content Depth:**
- Explain the "why" not just the "what"
- Include enough technical detail to be useful
- But prioritize clarity over exhaustiveness
- Link to official docs for deep dives

**Examples & Illustrations:**
- Use real-world scenarios
- Show concrete examples
- Tables for comparisons, code blocks for commands
- Keep examples short and focused

---

### Required Elements

- Every post must link to the relevant official GitHub Docs page under a `<h3>Documentation</h3>` heading. This **must be the last section** in every post — nothing should follow it inside `<div class="post-body">`.
- Verify plan availability from `https://docs.github.com` before writing the availability blockquote.
- Use `<strong>` for key terms on first use; use `<code>` for all CLI commands, file paths, and code snippets.
- Tables are preferred over bullet lists when comparing features across surfaces or plans.
