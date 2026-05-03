# Copilot Workspace Instructions — Daily Dose of GHCP

Static blog documenting GitHub Copilot features. Plain HTML + CSS + vanilla JS.
No framework, no build step, no package manager.

---

## Repository Layout

```
index.html          # Home — post cards + category filter
style.css           # Global stylesheet (legacy posts only — see § Post Styles below)
script.js           # Vanilla JS for sidebar filter + category toggling
posts/*.html        # One file per published post
newblogideas/*.md   # Draft posts (YAML front matter + markdown body)
images/             # All post images — referenced as ../images/<file> from posts
.github/instructions/  # Scoped instruction files (see § Instruction Files)
```

---

## Instruction Files

Read these before touching the relevant file types — do not duplicate what they cover:

| File | Applies to | Covers |
|------|------------|--------|
| `.github/instructions/html-css-style-color-guide.instructions.md` | `**/*.html, **/*.css, **/*.js` | 60-30-10 color rule, palette tokens, gradient rules, colors to avoid |
| `.github/instructions/markdown-content-creation.instructions.md` | `newblogideas/**/*.md` | Front matter schema, Golden Circle summary format, markdown structure rules |

---

## Post Styles — Old vs. New

| | Posts before Apr 4 2026 | Posts from Apr 4 2026 onwards |
|--|--|--|
| Stylesheet | Links `../style.css` | Self-contained `<style>` block — **no** `../style.css` link |
| Layout | Sidebar + `.layout` / `.post-body` | Article + sticky TOC aside, no sidebar |
| Canonical CSS (superset) | n/a | `posts/spec-driven-development-with-github-copilot.html` ✅ |
| Canonical structure (minimal) | `posts/subagents-in-vscode-copilot.html` | `posts/integrate-mcp-with-copilot.html` ✅ |

**Never mix the two patterns.** For all new posts, copy the **`<style>` block from `spec-driven-development-with-github-copilot.html`** (it is a strict superset that includes `.post-body table`, `.post-body h3`, `.callout ul`, and `.step-text strong`) and follow the **page structure of `integrate-mcp-with-copilot.html`**. Do not omit CSS rules even if a given post does not currently use tables or H3 — the next edit may add them.

---

## New Post — HTML Structure

### Required `<head>` tags

```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>{Post Title} — Daily Dose of GHCP</title>
<meta name="description" content="{one-sentence summary}" />
<meta property="og:title" content="{Post Title}" />
<meta property="og:description" content="{short summary}" />
<meta property="og:image" content="../images/{featured-image}.png" />
<meta property="og:type" content="article" />
<meta name="twitter:card" content="summary_large_image" />
```

### CSS Design Tokens (`:root`)

```css
--bg: #ffffff;  --bg-subtle: #f8fafc;   /* 60% — backgrounds */
--bg-secondary: #e8f1fb;                /* 30% — cards, code, section tints */
--accent: #e07b1a;                      /* 10% — step circles, callout border, TOC marker ONLY */
--text: #1f2328;  --text-secondary: #57606a;
--link: #0550ae;  --link-hover: #033d8a;
--border: #d0d7de;
```

### Page Sections (in order)

1. `<nav class="site-nav">` — sticky top bar, `← All Posts` link only
2. `.page-wrapper` — CSS grid: `article (1fr)` + `aside.toc-aside (210px)`; collapses to 1 col ≤ 900px
3. `<article>` — `.hero-image` → `.hero-body` → `.post-body`
4. `.hero-body` — date badge · category badges → `<h1>` → summary → tags → author + reading time
5. `.post-body h2` — `border-left: 4px solid var(--accent)` + `id` attribute for TOC anchors
6. `.post-body h3` — sub-sections inside an H2; **no** TOC entry, no left border, no `id` required
7. `.step-list` / `.step-card` — numbered step cards for procedural sequences
8. `.callout` — tip/warning box (light-blue background, orange left border); may contain `<p>` or `<ul>`
9. `.post-body table` — striped rows (`tr:nth-child(even)`), header has `--bg-secondary` fill
10. `.summary-grid` — 3-column Why/How/What cards; collapses to 1 col ≤ 900px
11. `.references-list` — external links prefixed with `↗`
12. `.ai-note` — AI disclosure line at the very bottom of `.post-body`
13. `<aside class="toc-aside">` — sticky TOC; JS active-state tracking via scroll; `display:none` ≤ 900px

### Hero Body — Exact Conventions

Match these literal patterns so all posts read consistently:

```html
<div class="post-meta">
  <span class="date-badge">Apr 4, 2026</span>            <!-- format: Mmm D, YYYY -->
  <span class="badge">📘 Tutorials</span>                <!-- emoji + category from categories.txt -->
  <span class="badge">🤖 Copilot in IDE</span>           <!-- 1–3 badges total -->
</div>
<h1 class="post-title">{post_title}</h1>
<p class="post-summary">{Why → How → What summary, one paragraph}</p>
<div class="tag-list">
  <span class="tag">{tag}</span> …                       <!-- one <span class="tag"> per front-matter tag -->
</div>
<div class="author-row">by <strong>{author}</strong> · {N} min read</div>
```

- **Reading time:** word count ÷ 200, rounded to the nearest minute, never `0 min`.
- **Category badges** must use one of the labels from `categories.txt`, prefixed by an emoji.

### H2 IDs and TOC Labels

- Every `.post-body h2` **must** have an `id` that is the kebab-case slug of the heading (e.g. `What Is MCP?` → `id="what-is-mcp"`).
- Every TOC `<a href="#…">` **must** match an existing H2 `id` exactly.
- TOC link text is a **shortened** form of the H2 (3–5 words), not the full heading. Example: `What Is Model Context Protocol?` → TOC label `What Is MCP?`.

### Callout Conventions

```html
<div class="callout">
  <div class="callout-label">💡 Tip</div>           <!-- UPPERCASE-styled by CSS; emoji optional -->
  <p>…</p>                                          <!-- or <ul>…</ul> for bullet callouts -->
</div>
```

Common labels: `💡 Tip`, `⚠️ Important`, `🤖 Supported AI agents`, `🏢 Enterprise considerations`. Keep them short — 2–4 words.

### AI Note (verbatim block at end of `.post-body`)

```html
<div class="ai-note">
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="2"
       stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
  Draft refined with AI assistance.
</div>
```

### TOC Active-State Script (verbatim, end of `<body>`)

The IIFE at the bottom of both reference posts (queries `.toc-list a` + `.post-body h2[id]`, toggles `.active` on scroll with a 90 px offset) is required. Copy it unchanged.

---

## Software & IT Blog Post Best Practices

### 1 — Meta and social tags are non-negotiable
Every post must have `<meta name="description">` plus Open Graph and Twitter Card tags. Without them, links shared on Slack, LinkedIn, or X render as plain text with no image or description preview.

### 2 — Hero = image → title → summary → reading time
Readers decide in roughly 3 seconds whether to continue. The hero must surface the featured image, a clear `<h1>`, a one-paragraph summary (Why → How → What), and a reading-time estimate. Estimate at **200 words/minute**, round to nearest minute.

### 3 — Sticky TOC with active-state highlighting
Technical posts are skimmed before they are read. A sticky table of contents (side rail on desktop, hidden on mobile) lets readers jump to the section they need. Use a scroll listener to add an `.active` class to the current TOC item so readers always know their position in the article.

### 4 — Use structured components for actionable content
Dense paragraphs cause technical readers to tune out. Apply the right component to the right content type:
- **Step cards** (`.step-card` with numbered circle) for procedural sequences
- **Callout boxes** (`.callout`) for tips, warnings, or important notes
- **Summary cards** (`.summary-grid`) for key takeaways — prefer Why / How / What
- Reserve plain prose for conceptual explanation only

---

## Converting a Draft to a Published Post

`newblogideas/*.md` → `posts/<post_slug>.html`

1. Read front matter: `post_title`, `author`, `post_date`, `featured_image`, `categories`, `tags`, `summary`, `ai_note`
2. Scaffold from `posts/spec-driven-development-with-github-copilot.html` — copy the full `<style>` block (superset CSS), the page structure of `integrate-mcp-with-copilot.html`, and the closing TOC-tracking `<script>` unchanged
3. Populate all `<head>` meta tags from front matter values; format `post_date` as `Mmm D, YYYY` for the `.date-badge`
4. Map each markdown `## Section` to a `<h2 id="kebab-slug">` in `.post-body`; use the same kebab-case slug as the TOC `href`. TOC label is a shortened 3–5 word form
5. Markdown `### Sub-section` → `<h3>` (no id, no TOC entry)
6. Numbered markdown lists describing a procedure → `.step-list` + `.step-card` components
7. Tip / warning / note blockquotes → `.callout` with an UPPERCASE label (emoji optional)
8. Markdown tables → `<table>` inside `.post-body` (the canonical CSS already styles them)
9. Final `## Summary` bullet list → `.summary-grid` Why / How / What cards (preserve order)
10. Final `## References` bullet list → `<ul class="references-list">` with `target="_blank" rel="noopener noreferrer"`
11. Inline images → `<figure class="section-image"><img … /><figcaption>…</figcaption></figure>`
12. Do **not** repeat the hero image as a section figure inside `.post-body`
13. If front-matter `ai_note` is truthy, append the verbatim `.ai-note` block (see § AI Note above)
14. All external links → `target="_blank" rel="noopener noreferrer"`

---

## Pitfalls

- **Never link `../style.css` in new posts** — all CSS is embedded
- **Never reuse the hero image** as an inline `<figure>` — it will display twice
- **Image paths from posts**: always `../images/<filename>` (one level up)
- **Old posts use sidebar layout** — do not apply new-style components to them
- **TOC `href` must match `h2 id`** exactly (kebab-case), or scroll tracking silently breaks
- **Do not strip CSS rules** from the canonical `<style>` block even if a given post does not use them (table / h3 / callout-list rules must remain so future edits don't break)
- **`accent` is a 10% color** — only on step circles, callout left-border, callout label text, summary-card label text, references `↗`, list-bullet dots, and TOC active marker. Never as a background fill or H2 background.
