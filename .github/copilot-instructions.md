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
| Canonical example | `posts/subagents-in-vscode-copilot.html` | `posts/integrate-mcp-with-copilot.html` ✅ |

**Never mix the two patterns.** Use `integrate-mcp-with-copilot.html` as the template for all new posts.

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
6. `.step-list` / `.step-card` — numbered step cards for procedural sequences
7. `.callout` — tip/warning box (light-blue background, orange left border)
8. `.summary-grid` — 3-column Why/How/What cards; collapses to 1 col ≤ 900px
9. `.references-list` — external links prefixed with `↗`
10. `.ai-note` — AI disclosure line at the very bottom of `.post-body`
11. `<aside class="toc-aside">` — sticky TOC; JS active-state tracking via scroll; `display:none` ≤ 900px

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

1. Read front matter: `post_title`, `author`, `post_date`, `featured_image`, `categories`, `tags`, `summary`
2. Scaffold from `posts/integrate-mcp-with-copilot.html` — copy the full `<style>` block and page structure unchanged
3. Populate all `<head>` meta tags from front matter values
4. Map each markdown `## Section` to a `<h2 id="slug">` in `.post-body`; match the `id` to the TOC `href`
5. Numbered markdown lists → `.step-list` + `.step-card` components
6. Tip paragraphs or blockquotes → `.callout` component
7. Final `## Summary` bullet list → `.summary-grid` Why / How / What cards
8. Images → `<figure class="section-image"><img … /><figcaption>…</figcaption></figure>`
9. Do **not** repeat the hero image as a section figure inside `.post-body`
10. All external links → `target="_blank" rel="noopener noreferrer"`

---

## Pitfalls

- **Never link `../style.css` in new posts** — all CSS is embedded
- **Never reuse the hero image** as an inline `<figure>` — it will display twice
- **Image paths from posts**: always `../images/<filename>` (one level up)
- **Old posts use sidebar layout** — do not apply new-style components to them
- **TOC `href` must match `h2 id`** exactly, or scroll tracking silently breaks
