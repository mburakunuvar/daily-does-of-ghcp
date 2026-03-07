# Daily Dose of GHCP

> Bite-sized GitHub Copilot features, tips, and discoveries — published daily.

A static blog that documents daily explorations of [GitHub Copilot](https://github.com/features/copilot) — what it can do, how it works under the hood, and how to get the most out of it across every surface it ships on.

---

## Why GitHub Copilot matters

[GitHub Copilot](https://github.com/features/copilot) has moved well beyond autocomplete. It is now a full agentic system with a presence across four distinct surfaces:

| Surface | What it enables |
|---------|-----------------|
| **GitHub.com** | Create and triage issues, review PRs, and automate tasks from the browser |
| **IDE (VS Code, JetBrains, etc.)** | Inline completions, chat, multi-file edits, and agent mode inside your editor |
| **CLI (`gh copilot`)** | Terminal-based AI assistance with infinite session support and tool call execution |
| **SDK** | Build Copilot-powered extensions and apps with programmatic session and tool control |

Copilot is evolving at an unusually fast pace. New capabilities ship constantly — often quietly — and it is easy to miss how significantly the mental model shifts with each release. The execution engine is not a simple prompt-in/response-out pipeline: the LLM sits at the centre of a feedback loop, driving its own tool calls and context decisions. Understanding this accurately makes you a meaningfully better user.

---

## What this blog covers

Each post focuses on one specific feature, capability, or architectural detail. Posts are short, direct, and link to official [GitHub Docs](https://docs.github.com/en/copilot) wherever relevant.

### Posts so far

| Date | Title | Category |
|------|-------|----------|
| 27 Feb 2026 | [GHCP Across Multiple Surfaces](posts/ghcp-across-multiple-surfaces.html) | 🌐 Fundamentals |
| 28 Feb 2026 | [Inside GHCP: How the Execution Engine Works](posts/inside-ghcp.html) | 🧠 Deep Dive |
| 01 Mar 2026 | [Tracking Coding Agent Sessions](posts/tracking-coding-agent-sessions.html) | 🤖 Copilot coding agent |
| 02 Mar 2026 | [Compaction and Infinite Sessions in CLI and SDK](posts/compaction-and-infinite-sessions-in-cli-and-sdk.html) | 💻 Copilot CLI / 📦 Copilot SDK |
| 04 Mar 2026 | [Copilot CLI System Architecture Deep Dive](posts/copilot-cli-system-architecture.html) | 🧠 Deep Dive / 💻 Copilot CLI |
| 05 Mar 2026 | [Managing Context for AI in Copilot Chat](posts/copilot-chat-context.html) | 💬 Copilot in IDE |
| 06 Mar 2026 | [Creating GitHub Issues with Copilot](posts/create-github-issues-with-copilot.html) | 🖥️ Copilot in UI |

### Categories

- **Fundamentals** — Core concepts every Copilot user should know
- **Deep Dive** — Architecture and internals
- **Copilot in IDE** — VS Code, JetBrains, and editor-side features
- **Copilot CLI** — `gh copilot` and terminal-based workflows
- **Copilot SDK** — Programmatic access and extension development
- **Copilot in UI** — GitHub.com browser features
- **Copilot coding agent** — Autonomous agent sessions and their management
- **Tutorials** — Step-by-step walkthroughs for specific Copilot workflows
- **Lessons Learnt** — Real-world experiences, mistakes, and insights from using Copilot day-to-day

---

## Tech stack

Plain HTML, CSS, and vanilla JavaScript — no framework, no build step, no package manager. Every post is a single `.html` file. The site is served directly from the repo.

```
index.html        # Home page with post cards and category filter
style.css         # Single global stylesheet (GitHub-inspired dark theme)
script.js         # Active-link highlighting + category filter logic
posts/            # One HTML file per post
```

---

## Disclaimer

This is a personal project — not a corporate publication, not affiliated with or endorsed by GitHub or Microsoft. Posts reflect individual discoveries, interpretations, and opinions. Feature availability and behaviour may change as GitHub Copilot continues to evolve. Always verify against the official [GitHub Copilot documentation](https://docs.github.com/en/copilot) for the most up-to-date and authoritative information.
