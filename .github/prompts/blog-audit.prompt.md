---
name: blog-audit
description: Comprehensive content quality audit for Daily Dose of GHCP blog posts — verify accuracy, currency, structure, and alignment with latest GitHub Copilot documentation and announcements.
agent: agent
tools:
  - codebase
  - fetch
  - problems
argument-hint: "Post filename (e.g., copilot-cli-system-architecture.html) or 'all' for batch audit"
---

# Blog Content Quality Audit

> Follow all conventions in [project guidelines](../copilot-instructions.md).

**Post to audit:** ${input:post:Enter post filename or 'all' for batch audit}

You are a technical content reviewer and GitHub Copilot expert performing a comprehensive quality audit of blog posts.

## Goal

Audit blog posts to ensure they are:
- **Accurate** — Facts match official GitHub Copilot documentation
- **Current** — Information reflects the latest releases, features, and announcements
- **Complete** — Covers all major aspects of the topic thoroughly
- **Clear** — Writing is accessible, well-structured, and easy to understand
- **Consistent** — Aligns with other posts and follows the style guide
- **Trustworthy** — Links work, sources are cited, examples are correct

## Guardrails

- **Do not modify content yet.** This is an audit only — provide recommendations.
- All findings must include **evidence** (specific line numbers, quotes, or examples).
- Verify information against **multiple authoritative sources** (not assumptions).
- Prioritize issues by **impact** and **effort** to fix.
- Flag deprecated features, outdated screenshots, or superseded information.

---

## Step 1: Content Inventory

For the specified post(s), extract and document:

1. **Post metadata:**
   - Title
   - Date published
   - Category/badge
   - Primary topic

2. **Sources cited:**
   - List all external links (docs, blog posts, GitHub URLs)
   - Note which official GitHub resources are referenced

3. **Content structure:**
   - Main sections (h3 headings)
   - Tables, code blocks, blockquotes
   - Availability callout (if present)

4. **Scope assessment:**
   - What specific Copilot feature/surface/workflow is covered?
   - What's the intended audience level (beginner, intermediate, advanced)?

---

## Step 2: Source Verification

Fetch and review the latest information from these authoritative sources:

### Primary Documentation
- **GitHub Copilot Docs:** https://docs.github.com/en/copilot
- Search for the topic/feature covered in the post
- Note if the current docs differ from what's described in the post

### Announcements & Updates
- **GitHub Changelog (Copilot):** https://github.blog/changelog/label/copilot/
- **GitHub Blog (Copilot tag):** https://github.blog/tag/github-copilot/
- Check for recent announcements (last 3-6 months) that affect this topic

### Feature Pages
- **GitHub Copilot Features:** https://github.com/features/copilot
- Verify availability claims match the current feature page

### Community Resources
- **GitHub Community Discussions:** https://github.com/orgs/community/discussions (copilot tag)
- Check for common questions or clarifications related to the topic

### Release Notes (if applicable)
- **Copilot Release Notes:** Check for version-specific information if the post mentions features tied to a release

**Output for this step:**
- List of sources checked
- Summary of any discrepancies found
- New information available since the post was published

---

## Step 3: Technical Accuracy Review

Evaluate technical correctness across these dimensions:

### Feature Descriptions
- Are feature capabilities described accurately?
- Are limitations or caveats mentioned where relevant?
- Are availability details correct (plans, surfaces, regions)?

### Commands & Code
- Do code examples/commands work as shown?
- Are file paths, syntax, or APIs up-to-date?
- Are there better/newer ways to accomplish the same task?

### Screenshots & Visuals
- Are UI screenshots current (not from outdated versions)?
- Do they match the current GitHub/Copilot interface?

### Links & References
- Do all external links work?
- Do they point to the current docs (not archived/redirected pages)?
- Are there newer/better resources to link to?

**Output for this step:**
- Table of accuracy issues found (Description | Evidence | Impact | Recommendation)

---

## Step 4: Quality Assessment

Evaluate content quality and structure:

### Writing Quality
- **Clarity:** Is the writing clear and concise?
- **Flow:** Does the post have a logical progression?
- **Tone:** Is it consistent with other posts (friendly, informative, professional)?
- **Grammar & spelling:** Any errors or typos?

### Structure & Formatting
- **Headings:** Are h3 headings used consistently?
- **Paragraphs:** Are they well-sized (not too dense)?
- **Lists:** Are they formatted correctly (ul/ol)?
- **Tables:** Used appropriately for comparisons?
- **Code blocks:** Properly formatted with `<code>` or `<pre>`?

### Completeness
- **Introduction:** Does it set context effectively?
- **Coverage:** Are all major aspects of the topic addressed?
- **Examples:** Are there sufficient examples to illustrate concepts?
- **Documentation link:** Does the post end with a link to official docs?

### Availability Callout
- Is there a `<blockquote>` with availability information?
- Is it accurate (plans, platforms, availability status)?

**Output for this step:**
- Writing quality issues (if any)
- Structural improvements
- Gaps in coverage

---

## Step 5: Up-to-Date Check

Identify outdated or deprecated information:

### Feature Status
- Has the feature been updated, renamed, or deprecated since publication?
- Are there new capabilities not mentioned in the post?
- Has availability changed (GA vs. beta, new plans, new surfaces)?

### Best Practices
- Do recommendations still align with current best practices?
- Are there newer, better approaches?

### Version-Specific Information
- If the post mentions specific versions/dates, are they still relevant?
- Should version-specific information be generalized or updated?

### Screenshots & UI References
- Do screenshots show current UI or outdated interfaces?
- Have UI labels, menus, or workflows changed?

**Output for this step:**
- List of outdated information (What's outdated | Current state | Update needed)

---

## Step 6: Recommendations & Action Items

Synthesize findings into actionable recommendations:

### Executive Summary
Provide a 3-5 sentence overall assessment:
- Overall quality rating (Excellent / Good / Needs Update / Requires Rewrite)
- Top 2-3 strengths
- Top 2-3 issues to address

### Findings Table

| Category | Issue | Evidence | Severity | Effort | Recommendation |
|----------|-------|----------|----------|--------|----------------|
| ... | ... | ... | High/Med/Low | S/M/L | ... |

**Categories:**
- Technical Accuracy
- Currency (up-to-date)
- Completeness
- Clarity & Writing
- Structure & Formatting
- Links & References
- Consistency
- Examples & Code

**Severity:**
- **High:** Incorrect/misleading information, broken critical functionality
- **Medium:** Outdated but not incorrect, missing important context
- **Low:** Minor improvements, polish, nice-to-haves

**Effort:**
- **S (Small):** < 30 min (fix link, update date, minor text change)
- **M (Medium):** 30 min - 2 hours (rewrite section, add examples, update screenshot)
- **L (Large):** > 2 hours (significant restructure, new research, multiple sections)

### Prioritized Action Items

List top 5-10 recommended changes, ordered by impact:

1. **[High Impact, Small Effort]** Issue description → Specific action
2. ...

### Suggested Next Steps

- **Quick wins:** What can be fixed immediately (broken links, typos, small updates)?
- **Medium-term updates:** What needs research or more significant changes?
- **Consider for rewrite:** Should the post be significantly updated or rewritten?

---

## Output Format

Return:

1. **Executive Summary** (overall assessment)
2. **Source Verification Results** (what was checked, what's changed)
3. **Findings Table** (all issues categorized)
4. **Up-to-Date Status** (is the content current?)
5. **Prioritized Action Items** (top 5-10 recommendations)
6. **Next Steps** (quick wins, medium-term, long-term)

---

## Batch Audit Mode

If `post = 'all'`, run the audit on all posts in the `posts/` directory and provide:

1. **Summary table:** Post | Date | Quality Rating | Top Issue | Priority
2. **Posts needing immediate attention** (High severity issues)
3. **Posts with outdated information** (Currency issues)
4. **Overall content health** (% posts in each quality tier)

Focus on identifying patterns across posts (common issues, systematic problems).
