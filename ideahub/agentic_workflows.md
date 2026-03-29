# GitHub Agentic Workflows

> Sources: [Overview](https://github.github.com/gh-aw/introduction/overview/) · [How They Work](https://github.github.com/gh-aw/introduction/how-they-work/) · [Security Architecture](https://github.github.com/gh-aw/introduction/architecture/) · [GitHub Blog](https://github.blog/ai-and-ml/automate-repository-tasks-with-github-agentic-workflows/)

**GitHub Agentic Workflows** are repository automations that run AI coding agents (Copilot CLI, Claude Code, or OpenAI Codex) inside **GitHub Actions**, authored entirely in plain **Markdown** rather than YAML. They are a technical preview from GitHub Next, Microsoft Research, and Azure Core Upstream — not yet generally available.

---

## What Makes Them "Agentic"

The official definition draws a sharp line:

> **Traditional workflows** execute pre-programmed steps with fixed if/then logic. They do exactly what you tell them, every time, in the same way.
>
> **Agentic workflows** use AI to understand context, make decisions, and generate content by interpreting natural language instructions flexibly.

The agent reads your repository, issues, and pull requests, reasons about the specific situation it finds, and adapts its behavior — rather than following a rigid script.

---

## How They Work: The Two-File Model

Each agentic workflow is a `.md` file with two parts:

```markdown
---
on:
  issues:
    types: [opened]        # Trigger: which GitHub events kick it off
permissions: read-all      # Security: read-only by default
safe-outputs:              # Allowed write operations
  add-comment:
---

# Issue Clarifier
Analyze the current issue and ask for additional details if it's unclear.
```

The **frontmatter** (YAML between `---`) declares the trigger, permissions, and allowed write operations. The **Markdown body** is the natural-language instruction the AI agent receives and acts on.

You then run `gh aw compile` to produce a companion `.lock.yml` file — a hardened GitHub Actions workflow with security baked in. Both files are committed. The `.md` is the human-editable source of truth; the `.lock.yml` is what Actions actually runs.

---

## Agentic Workflows vs. GitHub Actions YAML

| | Traditional GitHub Actions | GitHub Agentic Workflows |
|---|---|---|
| Authored in | YAML | Markdown |
| Logic type | Deterministic, fixed steps | AI-driven, context-aware |
| Write access | Configured per step | Read-only by default; writes via safe outputs only |
| Best for | Build, test, release pipelines | Triage, docs, reporting, code quality |

They **augment** CI/CD, not replace it. If it can be expressed in words, it's likely a good fit for an agentic workflow.

---

## The "Continuous AI" Pattern

GitHub calls this concept [**Continuous AI**](https://githubnext.com/projects/continuous-ai): the systematic, automated application of AI to software collaboration — similar to how CI/CD applies automation to builds and deploys. Concrete categories include:

- **Continuous triage** — summarize, label, and route new issues
- **Continuous documentation** — keep READMEs aligned with code changes
- **Continuous simplification** — open PRs for routine refactoring
- **Continuous test improvement** — assess coverage and add tests
- **Continuous quality hygiene** — investigate CI failures and propose fixes
- **Continuous reporting** — daily health, activity, and trend reports

---

## Guardrails: A Three-Layer Defense-in-Depth Model

| Layer | What it enforces |
|---|---|
| **Substrate** | Container isolation, iptables network firewall (Agent Workflow Firewall), MCP server sandboxing, hardware/kernel trust |
| **Configuration** | Schema validation, expression allowlisting, SHA-pinned actions, security scanners (`actionlint`, `zizmor`, `poutine`) |
| **Plan** | Integrity filtering, content sanitization, secret redaction, threat detection, permission separation via SafeOutputs |

**Safe Outputs** is the key write-permission mechanism: the agent never gets direct write access. Instead, requested writes (create issue, add comment, create PR) are buffered as artifacts, analyzed by a separate threat-detection job with an AI security prompt, and only then applied by a scoped, minimal-permission job. If the threat-detection job flags anything, no writes happen.

**Integrity filtering** restricts which GitHub content the agent can even read, based on author trust level — on public repos, `min-integrity: approved` is applied automatically.

**AI threat detection** checks agent output for secret leaks, malicious patches, and policy violations before any write is externalized. You can also chain in scanners like TruffleHog or Semgrep.

---

## Tools: MCP Under the Hood

Agents access GitHub and external services through **Model Context Protocol (MCP)** — a standardized protocol for connecting AI to tools. The MCP Gateway spawns isolated containers per server. Individual tools can be allowlisted; anything not on the explicit list is blocked.

---

## Practical Notes

- **PRs are never merged automatically** — humans always review and approve.
- **Cost**: Each workflow run with Copilot typically uses **two premium requests** (one for the agent, one for the safe-outputs guardrail check).
- **Start small**: begin with low-risk outputs (comments, draft issues, reports) before enabling PR creation.
- **Treat the Markdown as code**: review changes, keep scope small, evolve intentionally.

---

## Status

Currently in **technical preview**. Still under active development — use with human supervision.

- [Quick Start](https://github.github.com/gh-aw/setup/quick-start/)
- [CLI Commands](https://github.github.com/gh-aw/setup/cli/)
- [Workflow Gallery / Agent Factory](https://github.github.com/gh-aw/blog/2026-01-12-welcome-to-pelis-agent-factory/)
- [Community Discussion](https://github.com/orgs/community/discussions/186451)
