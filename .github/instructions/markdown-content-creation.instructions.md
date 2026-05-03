---
description: 'Markdown guidelines and content creation standards for blog posts'
applyTo: 'newblogideas/**/*.md'
---

# Markdown Content Rules

The following markdown content rules are enforced in the validators:

1. **Headings**: Use appropriate heading levels (H2, H3, etc.) to structure your content. Do not use an H1 heading, as this will be generated based on the title.
2. **Lists**: Use bullet points or numbered lists for lists. Ensure proper indentation and spacing.
3. **Code Blocks**: Use fenced code blocks for code snippets. Specify the language for syntax highlighting.
4. **Links**: Use proper markdown syntax for links. Ensure that links are valid and accessible.
5. **Images**: Use proper markdown syntax for images. Include alt text for accessibility.
6. **Tables**: Use markdown tables for tabular data. Ensure proper formatting and alignment.
7. **Line Length**: Limit line length to 400 characters for readability.
8. **Whitespace**: Use appropriate whitespace to separate sections and improve readability.
9. **Front Matter**: Include YAML front matter at the beginning of the file with required metadata fields.

## Formatting and Structure

Follow these guidelines for formatting and structuring your markdown content:

- **Headings**: Use `##` for H2 and `###` for H3. Ensure that headings are used in a hierarchical manner. Recommend restructuring if content includes H4, and more strongly recommend for H5.
- **Lists**: Use `-` for bullet points and `1.` for numbered lists. Indent nested lists with two spaces.
- **Code Blocks**: Use triple backticks (```) to create fenced code blocks. Specify the language after the opening backticks for syntax highlighting (e.g., `csharp`).
- **Links**: Use `[link text](URL)` for links. Ensure that the link text is descriptive and the URL is valid.
- **Images**: Use `![alt text](image URL)` for images. Include a brief description of the image in the alt text.
- **Tables**: Use `|` to create tables. Ensure that columns are properly aligned and headers are included.
- **Line Length**: Break lines at 80 characters to improve readability. Use soft line breaks for long paragraphs.
- **Whitespace**: Use blank lines to separate sections and improve readability. Avoid excessive whitespace.

## Folder-Specific Rules

### newblogideas/

The `summary` front matter field in all `newblogideas/**/*.md` files must follow
the **Golden Circle Format** (Why → How → What):

- **Why**: Start with the motivation or problem — why this topic matters to the reader.
- **How**: Describe the approach or mechanism — how it addresses the why.
- **What**: State the concrete outcome for the reader — what they gain.

**Template:** `"Why [purpose]. How [approach]. What [the reader gains]."`

**Example:**

> AI tools need a standard way to act on your behalf, not just reply. By adopting
> Model Context Protocol, GitHub Copilot's agent mode discovers tools, selects the
> right one, and executes it — giving you an AI that operates, not only answers.

#### Required body structure

Every draft in `newblogideas/` must use the following section flow so the HTML
conversion (see `.github/copilot-instructions.md` → "Converting a Draft to a
Published Post") produces a consistent post:

1. **Opening hook** — 1–2 paragraphs that restate the *Why* and frame the problem.
2. **Core content sections** — one `##` per major idea, in logical order. Each
   `##` heading must be unique and convertible to a kebab-case slug (it becomes
   the H2 `id` and the TOC anchor in the rendered HTML).
3. **`### Sub-sections`** — used only inside a `##` section; do not appear in
   the TOC. Avoid `####` and deeper.
4. **Procedural steps** — write numbered lists (`1.`, `2.`, …) with one short
   imperative sentence per step; these render as `.step-card` components.
5. **Tips, warnings, notes** — write as blockquotes prefixed with a label such
   as `> **💡 Tip:**`, `> **⚠️ Important:**`, or `> **🤖 Note:**`. These render
   as `.callout` boxes.
6. **`## Summary`** — exactly three bullets in Why / How / What order. These
   render as the 3-card `.summary-grid`. Do **not** rename to "Conclusion" or
   "TL;DR".
7. **`## References`** — bullet list of external links only (no inline links to
   internal pages). Each item is one descriptive link; renders as
   `.references-list` with the `↗` prefix.

#### Heading slug rule

`## What Is Model Context Protocol?` → HTML `id="what-is-model-context-protocol"`.
Drop punctuation, lowercase, hyphenate. Keep heading text human-readable; the
TOC label can be shortened during HTML conversion.

#### Images

`![alt text](../images/<file>.png)` — paths are relative to the eventual
`posts/*.html` location, not to the markdown file.

#### AI disclosure

The `ai_note` front-matter field controls whether the rendered post shows the
"Draft refined with AI assistance." footer. Always set it explicitly (`true` or
`false`); never omit it.

## Validation Checklist

Ensure compliance with the following validation requirements:

### Front Matter

- [ ] `post_title`: The title of the post.
- [ ] `author`: The primary author of the post.
- [ ] `post_slug`: The URL slug for the post.
- [ ] `microsoft_alias`: The Microsoft alias of the author.
- [ ] `featured_image`: The URL of the featured image.
- [ ] `categories`: The categories for the post. These categories must be from the list in /categories.txt.
- [ ] `tags`: The tags for the post.
- [ ] `ai_note`: Indicate if AI was used in the creation of the post.
- [ ] `summary`: A brief summary of the post. For files in `newblogideas/`, the summary must follow the **Golden Circle Format** (Why → How → What) — see Folder-Specific Rules.
- [ ] `post_date`: The publication date of the post.

### Content and Formatting

- [ ] Content follows the markdown content rules specified above.
- [ ] Content is properly formatted and structured according to the guidelines.
- [ ] Validation tools have been run to check for compliance with the rules and guidelines.
