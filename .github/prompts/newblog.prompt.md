---
name: newblog
description: Create a new Daily Dose of GHCP blog post — asks for title and links, then scaffolds the post file, index card, and sidebar updates
agent: agent
tools:
  - search
  - read
  - edit
  - web/fetch
  - vscode/askQuestions
---

# New Blog Post — Daily Dose of GHCP

> Follow all conventions in [copilot-instructions.md](../copilot-instructions.md) and [style & color guide](../instructions/html-css-style-color-guide.instructions.md).

You are creating a new blog post for the **Daily Dose of GHCP** static blog.

## Step 1: Gather Information

Use the `#tool:vscode/askQuestions` tool to ask the user for the following details (ask them one at a time):

1. **Post title** — e.g. "Tracking Coding Agent Sessions"
2. **Relevant links** — one or more URLs to official GitHub Docs pages, blog posts, or changelog entries that should be used as source material (e.g. `https://docs.github.com/en/copilot/...`)

After receiving the inputs, determine the following automatically:
- **Date** — use today's date in `DD Month YYYY` format
- **Category** — infer from the topic. Use an existing category from `index.html` filter buttons when possible. Only create a new category if the topic doesn't fit any existing one.
- **Filename** — kebab-case version of the title (e.g. `tracking-coding-agent-sessions.html`)
- **Availability** — determine from the docs which Copilot plans support the feature:
  - CLI/SDK features → `All GitHub Copilot paid plans (Pro, Pro+, Business, and Enterprise).`
  - Coding agent features → `Copilot Pro, Pro+, Business, and Enterprise plans.`
  - Free-tier features → `All GitHub Copilot plans including Free.`

## Step 2: Research

1. Use `#tool:web/fetch` to retrieve each URL the user provided. Extract key facts, steps, availability info, and important details.
2. Use `#tool:read` to examine an existing post (e.g. `posts/copilot-internal-architecture.html`) to get the exact sidebar structure and HTML template.
3. Use `#tool:read` to examine `index.html` to get the current cards grid structure and filter buttons.

## Step 3: Write the Post Content

Write in the **"Daily Bites"** style — this is NOT a docs copy-paste exercise:

- **Paraphrase** the official docs (tell the story in your own words)
- **Simplify** without losing technical depth (accessible, not dumbed down)
- **Engage** the reader (conversational tone: "Here's what I discovered about X today...")
- **Quick read** — aim for 500-800 words, 3-5 minute read time
- **Opening hook** — start with why this matters or what problem it solves
- **Key insight first** — lead with the most important takeaway
- **Use examples** — show real-world scenarios, not just abstract descriptions
- **Break it up** — use `<h3>` headings for clear sections, keep paragraphs short

**Do NOT:** copy entire paragraphs from docs, use filler phrases ("It's worth noting...", "In order to..."), or write in formal/academic tone.

## Step 4: Create the Post File

Create `posts/<kebab-case-title>.html` using this structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>POST TITLE — Daily Dose of GHCP</title>
  <link rel="stylesheet" href="../style.css" />
</head>
<body>
  <div class="layout">

    <!-- Sidebar: copy EXACTLY from an existing post, only change class="active" -->
    <aside class="sidebar">
      <!-- ... copy from existing post ... -->
      <!-- Add the new post to the Recent Posts list at the TOP -->
      <!-- Set class="active" on the new post's link -->
    </aside>

    <main class="main">
      <a href="../index.html" class="btn-back">
        <!-- back arrow SVG -->
        Back to all posts
      </a>

      <div class="post-header">
        <div class="post-meta">
          <span class="date-badge">DD Month YYYY</span>
          <span class="badge">EMOJI Category</span>
        </div>
        <h1 class="post-title">Post Title</h1>
      </div>

      <div class="post-body">
        <p>Opening intro paragraph with hook...</p>

        <blockquote>
          <strong>Availability:</strong> ...
        </blockquote>

        <h3>Section heading</h3>
        <p>Content...</p>

        <!-- More sections with h3 headings -->

        <!-- LAST section — must always be Documentation -->
        <h3>Documentation</h3>
        <ul>
          <li><a href="DOCS_URL" target="_blank">Link text ↗</a></li>
        </ul>
      </div>
    </main>

  </div>
  <script src="../script.js"></script>
</body>
</html>
```

**Required elements:**
- Availability `<blockquote>` immediately after the intro paragraph, before any `<h3>`
- `<h3>Documentation</h3>` as the **last** section inside `<div class="post-body">`
- Sidebar copied exactly from an existing post with `class="active"` on the new post

## Step 5: Update index.html

Use `#tool:edit` to update `index.html`:

1. **Add a new card** at the TOP of `<div class="cards-grid">` using this structure:

```html
<a class="card" href="posts/FILENAME.html" data-category="Category Name">
  <div class="card-meta">
    <span class="card-date">DD Month YYYY</span>
    <span class="badge">EMOJI Category</span>
  </div>
  <div class="card-title">Post Title</div>
  <div class="card-summary">
    2-3 sentence summary of the post.
  </div>
  <span class="card-link">Read more <span class="arrow">→</span></span>
</a>
```

2. **Add the new post** to the **Recent Posts** sidebar list in `index.html` (at the top, most-recent first).

3. **Add a new filter button** if the category doesn't already exist in the filter bar.

## Step 6: Update All Post Sidebars

Use `#tool:search` to find all HTML files in `posts/`, then use `#tool:edit` to update each one:

- Add the new post to the **Recent Posts** sidebar list at the top (most-recent first)
- The sidebar Recent Posts list must be **identical** across all pages — only `class="active"` differs per page

## Checklist Before Finishing

Verify all of these:
- [ ] Post file created in `posts/` with correct filename
- [ ] Availability blockquote present and correctly placed
- [ ] Documentation section is the last section in post-body
- [ ] Sidebar is identical across all pages (index.html + all posts)
- [ ] New card added to index.html cards grid
- [ ] Category filter button exists for the post's category
- [ ] Content is in "Daily Bites" style (paraphrased, fun, concise)
- [ ] All links from the user are included in the Documentation section
