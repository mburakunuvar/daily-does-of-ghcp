---
name: blog-audit
description: Audit blog content for accuracy, currency, and quality, then offer to implement fixes
agent: agent
tools:
  - search
  - read
  - edit
  - fetch
  - vscode/askQuestions
---

# Blog Content Quality Audit & Fix

> Follow all conventions in [copilot-instructions.md](../copilot-instructions.md).

You are a technical content reviewer and GitHub Copilot expert auditing blog post quality.

## Step 1: Gather Input

Use the `#tool:vscode/askQuestions` tool to ask the user:

1. **Which post to audit** — a specific filename (e.g. `copilot-cli-system-architecture.html`) or `all` for a batch audit of every post

**Important:** Daily Dose of GHCP follows a "Daily Bites" style:
- **Paraphrased and simplified** (not copied from docs, but still technically accurate)
- **Fun to follow** (conversational, engaging, enthusiastic but not fluffy)
- **Quick read** (500-800 words, bite-sized discoveries)
- Think: "Here's what I discovered today..." NOT "According to the documentation..."

Evaluate posts against this style as well as technical accuracy and currency.

## Step 2: Content Inventory

Use `#tool:read` to examine the specified post(s) in `posts/`.

For each post, extract and document:

1. **Post metadata:** Title, date, category/badge, primary topic
2. **Sources cited:** All external links (docs, blog posts, GitHub URLs)
3. **Content structure:** Main sections (h3 headings), tables, code blocks, blockquotes
4. **Scope assessment:** What Copilot feature is covered? Audience level?

5. **Project-required elements (verify all are present and correctly placed):**
   - [ ] Availability `<blockquote>` — immediately after the opening intro paragraph, before the first `<h3>`
   - [ ] `<h3>Documentation</h3>` — the **last** section inside `<div class="post-body">`; nothing follows it
   - [ ] Sidebar "Recent Posts" list — contains all posts currently in `posts/`
   - [ ] `<a class="btn-back">` — present before the post header
   - [ ] Post `data-category` on the index card — matches the badge label in the post

## Step 3: Source Verification

Use `#tool:fetch` to verify against the latest information from these authoritative sources:

- **GitHub Copilot Docs:** https://docs.github.com/en/copilot
- **GitHub Changelog (Copilot):** https://github.blog/changelog/label/copilot/
- **GitHub Blog (Copilot tag):** https://github.blog/tag/github-copilot/
- **Copilot Plans & Pricing:** https://docs.github.com/en/copilot/about-github-copilot/subscription-plans-for-github-copilot

Note any discrepancies between the post content and current docs/announcements.

## Step 4: Technical Accuracy Review

Evaluate technical correctness:

- **Feature descriptions** — capabilities described accurately? Limitations mentioned?
- **Availability details** — correct plans, surfaces, regions?
- **Commands & code** — examples work as shown? Syntax up-to-date?
- **Links & references** — all working? Pointing to current (not archived) pages?

## Step 5: Quality Assessment

Evaluate content quality and "Daily Bites" style adherence:

### Writing Style
- **Paraphrased, not copied:** Content in author's own words? (Compare against fetched docs — identical sentences are a red flag.)
- **Simplified but deep:** Technical accuracy maintained while accessible?
- **Fun to follow:** Conversational and engaging, not dry or formal?
- **Quick read:** Roughly 500-800 words, scannable, clear sections?
- **Opening hook:** Starts with why this matters or what problem it solves?
- **No filler:** Avoids "It's worth noting", "In order to", "One of the key things"?

### Structure & Formatting
- Headings: h3 used consistently?
- Paragraphs: short and digestible?
- Tables: used for comparisons?
- Code blocks: properly formatted?

### Availability Callout
- Present as `<blockquote>` immediately after intro, before first `<h3>`?
- Uses correct wording per plan type:
  - CLI/SDK features → `All GitHub Copilot paid plans (Pro, Pro+, Business, and Enterprise).`
  - Coding agent features → `Copilot Pro, Pro+, Business, and Enterprise plans.`
  - Free-tier features → `All GitHub Copilot plans including Free.`

## Step 6: Present Findings

### Executive Summary
3-5 sentence overall assessment with quality rating (Excellent / Good / Needs Update / Requires Rewrite).

### Findings Table

| Category | Issue | Severity | Effort | Recommendation |
|----------|-------|----------|--------|----------------|
| ... | ... | High/Med/Low | S/M/L | ... |

**Severity:** High = incorrect/misleading, Medium = outdated but not wrong, Low = minor polish.
**Effort:** S = quick fix, M = section rewrite, L = significant restructure.

### Prioritized Action Items
Top 5-10 recommended changes, ordered by impact. List quick wins first.

**Then use `#tool:vscode/askQuestions` to ask:** "Shall I implement these fixes?"

## Step 7: Implement (after approval)

1. Start with quick wins (broken links, typos, small text updates)
2. Use `#tool:edit` for content fixes
3. Use `#tool:fetch` to get latest info for outdated content
4. Work in small batches
5. Validate changes against sources
6. Report what was fixed

## Batch Audit Mode

When auditing `all` posts, use `#tool:search` to find all HTML files in `posts/` and provide:

1. **Summary table:** Post | Date | Quality Rating | Required Elements | Top Issue | Priority
2. **Posts needing immediate attention** (High severity issues)
3. **Required elements violations** (missing availability blockquote, wrong Documentation placement, stale sidebar)
4. **Overall content health** (% posts in each quality tier)

Focus on identifying patterns across posts (common issues, systematic problems).
