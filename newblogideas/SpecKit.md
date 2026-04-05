
---
post_title: "Spec-Driven Development with GitHub Copilot and Spec Kit"
author: Burak Unuvar
post_slug: spec-driven-development-with-github-copilot
microsoft_alias: buraknvar
featured_image: ../images/spec-driven-development-with-github-copilot.png
categories:
  - Advanced
tags:
  - GitHub Copilot
  - Spec Kit
  - Spec-Driven Development
  - Agent mode
  - Enterprise
ai_note: Draft refined with AI assistance.
summary: "Without a shared source of truth, requirements drift and AI-generated code
  misses the mark. By adopting Spec-Driven Development with GitHub Spec Kit, GitHub
  Copilot transforms your specifications into technical plans and implementation tasks —
  giving you production-ready code that stays aligned with intent from day one."
post_date: 2026-04-05
---

## What Is Spec-Driven Development?

Spec-Driven Development (SDD) is a structured approach to software development that treats specifications as executable sources of truth rather than throwaway planning documents. In traditional development, code is king — specifications serve code, often becoming outdated as implementation evolves. SDD inverts this relationship: specifications become the primary artifact, and code serves specifications.

Four core principles define SDD:

- **Specifications as the primary artifact.** The spec is the central source of truth. Code becomes its expression in a particular language and framework. Maintaining software means evolving specifications, not just patching code.
- **Executable specifications.** Specs must be precise, complete, and unambiguous enough to generate working systems. This precision eliminates the gap between intent and implementation.
- **Living documentation.** Debugging means fixing specifications that generate incorrect code. Specifications remain synchronized with implementation at all times.
- **AI-human collaboration.** AI transforms specs to code, but raw generation without structure produces chaos. SDD provides that structure through well-defined specifications and implementation plans.

The four-phase SDD workflow:

1. **Specify** — Define what the software should do and why: user stories, acceptance criteria, requirements, and edge cases.
2. **Plan** — Decide how to build it: architecture, technology stack, and implementation approach.
3. **Tasks** — Break the plan into discrete, actionable development tasks organized by phase.
4. **Implement** — Write code guided by the spec, plan, and task list; verify each task against the specification.

Each phase produces artifacts that feed into the next, creating a traceable path from requirements to working code.

## Why SDD Matters for Enterprise Teams

Three converging trends make SDD essential for enterprise teams:

- **AI capabilities.** Natural language specifications can now reliably generate working code, automating the mechanical translation from specification to implementation. The bottleneck has shifted from writing code to defining intent clearly.
- **Software complexity.** Modern systems integrate dozens of services, frameworks, and dependencies. SDD provides systematic alignment through specification-driven generation, preventing architectural drift across long projects or multiple developers.
- **Pace of change.** Requirements change rapidly. SDD transforms requirement changes from obstacles into a normal workflow — update the spec, and affected artifacts regenerate systematically.

For enterprise developers, SDD delivers: consistent alignment with organizational standards, auditable documentation of requirements and decisions, and systematic enforcement of security and compliance policies through the specification process.

In brownfield scenarios — the most common enterprise context — the constitution documents existing architectural patterns and constraints. New feature specifications reference those established patterns, so generated plans integrate with current architecture rather than proposing isolated reimplementations.

## GitHub Spec Kit: Core Components and Commands

GitHub Spec Kit is an open-source toolkit that enables SDD by integrating structured workflows, persistent artifacts, and reusable AI command patterns. It addresses a fundamental challenge in AI-assisted development: maintaining context and consistency across multiple interactions with coding assistants.

Three essential capabilities:

- **Persistent artifacts.** Specifications, plans, and tasks are stored as plain markdown files in your repository.
- **Standardized workflow.** A defined process guides you through the four SDD phases.
- **Reusable commands.** Built-in slash commands encapsulate best-practice prompting patterns.

### Core components

| Component | Purpose |
| --- | --- |
| `specify-cli` | Initializes and manages spec-driven projects; scaffolds prompt templates and artifact directories. |
| Markdown artifact files | `constitution.md`, `spec.md`, `plan.md`, and `tasks.md` drive each phase of development. |
| Core slash commands | `/speckit.constitution`, `/speckit.specify`, `/speckit.plan`, `/speckit.tasks`, `/speckit.implement` |
| Optional enhancement commands | `/speckit.clarify`, `/speckit.analyze`, `/speckit.checklist` |

### Slash command syntax by agent

| Agent | Command syntax | Notes |
| --- | --- | --- |
| GitHub Copilot | `/speckit.constitution`, `/speckit.specify`, … | Templates installed in `.github/prompts/` |
| Claude Code | `/speckit-constitution`, `/speckit-specify`, … | Installs as skills in `.claude/skills/` |
| Codex CLI | `$speckit-constitution`, `$speckit-specify`, … | Requires `--ai-skills` flag during `specify init` |
| Cursor, Windsurf, others | `/speckit.constitution`, `/speckit.specify`, … | Standard dotted slash commands |

GitHub Spec Kit supports 20+ agents at the time of writing, including GitHub Copilot, Claude Code, Cursor, Windsurf, Gemini CLI, Codex CLI, Kiro, Amp, Roo Code, Junie, and more. A generic mode (`--ai generic`) lets you bring any unsupported agent by pointing `--ai-commands-dir` at your agent's command directory.

Beyond the core workflow, Spec Kit has a growing community ecosystem. **Extensions** add new commands and workflows (Jira integration, Azure DevOps sync, post-implementation code review). **Presets** override templates and terminology without changing tooling — useful for enforcing organizational spec formats or regulatory standards. Both are managed with `specify extension add <name>` and `specify preset add <name>`.

## Enhancement Commands

Beyond the core five commands, Spec Kit provides three optional commands that improve artifact quality before implementation starts. Used together, they form a quality gate between spec generation and coding.

### /speckit.clarify — gap analysis

Run `/speckit.clarify` after generating an initial spec to surface ambiguities, missing details, and underspecified edge cases. The AI generates targeted questions and for each one often provides multiple-choice options. You select or provide a custom answer, and the spec is updated accordingly. Run it multiple times — a first pass surfaces major gaps, a second covers edge case details, a third fine-tunes nonfunctional requirements.

### /speckit.analyze — cross-artifact consistency

Run `/speckit.analyze` after generating `plan.md` and `tasks.md` but before starting implementation. It verifies that the plan implements all spec requirements, tasks cover all plan elements, and everything aligns with the constitution. Catching inconsistencies here prevents costly rework during coding or code review.

### /speckit.checklist — quality validation

`/speckit.checklist` generates a custom checklist based on your specification — essentially "unit tests for English prose." It produces verification questions (e.g., "Does every user story have corresponding acceptance criteria?"). Any "no" answers reveal gaps to close before sharing with stakeholders or proceeding to implementation.

## Git Integration and Project Organization

All Spec Kit artifacts are plain markdown files stored in your Git repository alongside source code. This gives you change tracking, branch-based development, and comprehensive pull request reviews — reviewers see both what you built (spec) and how you built it (code).

### Project structure

```text
my-project/
├── .github/
│   ├── agents/
│   └── prompts/          ← Spec Kit slash command templates
├── .specify/
│   ├── memory/
│   │   └── constitution.md
│   ├── scripts/
│   └── templates/
├── SourceCode/
│   └── ...
└── specs/
    └── 001-document-upload-feature/
        ├── spec.md
        ├── plan.md
        └── tasks.md
```

Features are numbered sequentially (`001`, `002`, `003`) to track development order. For teams working on multiple features concurrently, each feature has its own directory — preventing confusion and enabling parallel work without conflicts.

### Feature tracking with SPECIFY_FEATURE

In Git-based workflows, Spec Kit infers the active feature from your branch name. For non-Git workflows or manual override, set the environment variable explicitly before invoking `/speckit.plan` or follow-up commands:

```bash
# PowerShell
$env:SPECIFY_FEATURE = "001-document-upload"

# Bash / zsh
export SPECIFY_FEATURE="001-document-upload"
```

### Continuous workflow: command chaining

Spec Kit supports iterative development through progressive command chaining. If requirements change at any point, return to the relevant phase, update the artifact, and regenerate downstream artifacts:

1. Generate initial spec: `/speckit.specify`
2. Identify gaps: `/speckit.clarify`
3. Update spec based on answers, then create the plan: `/speckit.plan`
4. Verify cross-artifact consistency: `/speckit.analyze`
5. Generate tasks: `/speckit.tasks`
6. Implement incrementally: `/speckit.implement`

## Development Scenarios

GitHub Spec Kit supports four development patterns:

### Greenfield (0-to-1)

The primary use case — transforming a high-level product vision into a concrete, structured implementation path from scratch. Start with `/speckit.constitution` to establish project principles, then use `/speckit.specify` for each feature as you build iteratively.

### Brownfield enhancement

For existing applications, your constitution documents existing architectural patterns and constraints. New feature specifications reference those established patterns. The plan shows how the new feature integrates with current architecture rather than proposing a separate implementation.

### Refactoring and modernization

Treat the desired end state as the specification, create a plan for the refactoring approach, and generate incremental tasks. This structured approach prevents the common problem of starting a refactor and getting lost mid-process with partially working code.

### Exploratory development

Generate multiple plans from the same specification — for example, one using Azure Blob Storage and another using Azure Files. Implement both, compare results, and choose the better approach based on actual experience rather than assumptions.

## The Constitution File

The constitution (`constitution.md`) captures the non-negotiable principles, constraints, and standards that govern your project. It acts as a standing guardrail: every generated spec, plan, task, and code output is checked against it automatically. Write a principle once; Spec Kit enforces it throughout every phase.

Key benefits: **consistency enforcement** (prevents architectural drift), **compliance documentation** (makes security policies explicit and auditable), **institutional knowledge capture** (preserves architectural decisions in a form AI can reference), and **reduced cognitive load** (developers don't need to remember every organizational standard while prompting).

### Structure

| Section | What to define |
| --- | --- |
| Technology standards | Approved cloud platform, frameworks, databases, secret management tooling |
| Security requirements | Authentication, authorization, encryption standards, PII handling rules |
| Performance and scalability | Response time targets (e.g., 200 ms at p95), concurrency limits, caching policy, async thresholds |
| Coding standards | Language conventions, minimum test coverage, logging interfaces, documentation requirements |
| Compliance and governance | Regulatory obligations, accessibility (WCAG 2.1 AA), audit log retention periods |

Keep every principle specific and measurable — *"API responses complete within 200 ms for 95% of requests"* is more useful than *"the system should be fast."*

### Creating and refining the constitution

Run `/speckit.constitution` in GitHub Copilot Chat with a natural language description of your project constraints. For a new project, Copilot generates a structured `constitution.md` from scratch. For an existing project, it reviews the codebase and infers principles from what it finds.

After generation:

- Add missing requirements (e.g., specific logging formats your organization mandates).
- Remove generic boilerplate that provides no concrete guidance.
- Replace vague statements with measurable criteria.
- Align with internal standards documents where they exist.
- Validate with security, compliance, and architecture teams.

### How the constitution integrates into the workflow

Every core command respects the constitution automatically:

- `/speckit.specify` — flags spec requirements that conflict with constitution principles before you proceed.
- `/speckit.plan` — generates plans with explicit sections demonstrating compliance with each relevant principle.
- `/speckit.analyze` — compares spec, plan, and tasks against the constitution and surfaces deviations.
- `/speckit.implement` — produces code that honors constitution constraints automatically.

### Enterprise constitution example

```markdown
## Azure Platform Standards
- Host all services on Azure App Service or Azure Container Apps.
- Use Azure Blob Storage for document storage.
- Secrets stored exclusively in Azure Key Vault.

## Identity Integration
- Authenticate via Microsoft Entra ID using OAuth 2.0 / OpenID Connect.
- Implement RBAC using Microsoft Entra ID groups. No custom authentication.

## Corporate Compliance
- Audit logging per enterprise retention policies (minimum 90 days).
- Accessibility: WCAG 2.1 Level AA minimum.
- Scan all dependencies for known vulnerabilities before deployment.

## Development Standards
- Back end: .NET 10 following organizational coding conventions.
- Minimum 80% unit test coverage. All APIs documented with OpenAPI/Swagger.
```

## Writing the Spec File

The spec file (`spec.md`) is the single source of truth for what a feature should do. Every implementation decision traces back to it — if something isn't in the spec, it doesn't get built unless the spec is updated first.

### Spec structure

| Section | What to include |
| --- | --- |
| Summary | One or two sentences describing the feature from an end-user perspective |
| User stories | Brief narratives of how users interact with the feature |
| Acceptance criteria | Specific, testable conditions that mark the feature as complete |
| Functional requirements | Detailed descriptions of system behavior, broken into sub-areas |
| Nonfunctional requirements | Performance, security, scalability, and compliance attributes with measurable thresholds |
| Edge cases | Error conditions, boundary behaviors, and unusual scenarios with explicit handling |

### Generating a spec with /speckit.specify

Run `/speckit.specify` in GitHub Copilot Chat with a natural language description covering: what the feature does, who uses it, where it lives in the system, any constraints, and expected error handling. Copilot generates a structured `spec.md` covering all six sections.

After generation, review for completeness, accuracy, and consistency. The initial draft is a strong starting point but rarely final — use `/speckit.clarify` to close gaps before moving to planning.

### Best practices

- **Be specific and measurable.** Replace "support large files" with "support files up to 50 MB."
- **Use consistent terminology.** If you call them "documents" in the summary, don't switch to "files" later.
- **Cover error handling explicitly.** Specify the exact message and behavior for each failure mode.
- **Define what, not how.** The spec states requirements; implementation decisions belong in the plan.
- **Keep scope manageable.** If a spec exceeds roughly 300 lines, split it into separate feature specs.
- **Validate against the constitution.** Any conflict caught here is far cheaper to fix than after implementation.

## Creating the Plan File

The plan file (`plan.md`) bridges the gap between what the spec defines and the concrete tasks that follow. The spec answers *what* to build; the plan answers *how* to build it. This separation is intentional — if you switch from Azure Blob Storage to Azure Files, `plan.md` changes while `spec.md` remains largely untouched.

### Plan structure

| Section | What to include |
| --- | --- |
| Architecture overview | High-level description of how components interact |
| Technology stack and key decisions | Explicit technology choices with rationales |
| Implementation sequence | Logical order of implementation steps, from setup to completion |
| Constitution verification | Explicit confirmation that proposed solutions comply with constitution principles |
| Assumptions and open questions | Documented assumptions and unresolved decisions before coding starts |

### Generating a plan with /speckit.plan

Run `/speckit.plan` in GitHub Copilot Chat. Before invoking it, provide context about your existing stack so Copilot produces a plan that fits your environment rather than a greenfield solution. After generation, review against three questions:

- Does every spec requirement map to an implementation approach in the plan?
- Do all technology choices align with the constitution and organizational standards?
- Are assumptions and open questions documented so stakeholders can address them before implementation starts?

### Common pitfalls

- **Skipping planning entirely** — jumping straight from spec to code increases the risk of architectural mistakes that are costly to undo.
- **Accepting the first draft without review** — AI-generated plans are starting points, not final designs.
- **Over-constraining implementation** — the plan should guide, not dictate every line; leave tactical decisions to developers.
- **Ignoring constitution conflicts** — address them immediately in the plan rather than discovering them during code review.
- **Letting the plan go stale** — when implementation reveals a better approach, update `plan.md` so it remains a useful reference.

## Generating Tasks and Implementing Code

The tasks file (`tasks.md`) converts architectural decisions in `plan.md` into specific, actionable work items. Well-scoped tasks are **actionable** (clearly states what needs to be done), **testable** (completion can be verified objectively), **independent** (can be completed without waiting for unrelated work), and **time-bounded** (completable in hours to a day, not weeks).

### Generating tasks with /speckit.tasks

Run `/speckit.tasks` in GitHub Copilot Chat. The AI reads both `spec.md` and `plan.md` and produces a numbered, phase-organized task list. A typical phase structure for a complex feature:

- **Phase 1 — Foundation:** database schema, configuration, service class scaffolding.
- **Phase 2 — Core functionality:** API endpoints, storage integration, metadata persistence.
- **Phase 3 — Front end:** UI components, client-side validation, progress indicators.
- **Phase 4 — Security:** authentication checks, server-side validation, audit logging.
- **Phase 5 — Testing and docs:** unit tests, integration tests, OpenAPI documentation.

After generation, verify that every plan element maps to at least one task and that sequencing is logical (schema before API, API before front end).

### Implementing with /speckit.implement

Run `/speckit.implement` with a specific task number, a range, or a description taken from `tasks.md`. The AI works through tasks sequentially, referencing `spec.md`, `plan.md`, and `tasks.md` to keep code aligned with the overall architecture:

```
/speckit.implement Implement the MVP first strategy (Tasks: T001 - T027)
```

After each batch, verify the results before proceeding — run the application and tests to confirm the task objective is met.

### Managing tasks during implementation

- **Scope growth** — when a task reveals unexpected complexity, break it into smaller tasks and update `tasks.md` before proceeding.
- **Blocked tasks** — mark them explicitly with the reason and a tracking reference.
- **Changing priorities** — reorder, add, or defer tasks in `tasks.md` as business needs evolve.
- **Discovered ambiguity** — pause, trace back to `spec.md` and `plan.md` for the original intent, update the task description, then continue.

## Setting Up the Environment

A working Spec Kit environment requires: the **Specify CLI** (`specify-cli`), the **`uv` package manager**, a **code editor with AI integration** (VS Code + GitHub Copilot is the primary configuration), a **Git repository**, and whatever **programming runtime** your tech stack requires.

### Prerequisites

| Requirement | Notes |
| --- | --- |
| Python 3.11+ | Required by `specify-cli` |
| [uv](https://docs.astral.sh/uv/) | Fast Python package manager; used to install and manage `specify-cli` |
| Git | Required for branch-based feature tracking |
| Supported AI agent | GitHub Copilot in VS Code is the primary target; 20+ agents are supported |

### Installation

**Option 1: Persistent installation (recommended)** — pin a stable release tag (see [releases](https://github.com/github/spec-kit/releases)):

```bash
# Replace vX.Y.Z with the latest release tag
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@vX.Y.Z
```

**Option 2: One-time usage** — run directly without installing:

```bash
uvx --from git+https://github.com/github/spec-kit.git@vX.Y.Z specify init <PROJECT_NAME>
```

**Option 3: Enterprise / air-gapped** — use `pip download` to create portable wheel bundles on a connected machine. See the [Enterprise Installation guide](https://github.com/github/spec-kit/blob/main/docs/installation.md) for step-by-step instructions.

### Initializing a project

```bash
# Initialize a new project with GitHub Copilot
specify init my-project --ai copilot

# Initialize in the current directory
specify init --here --ai copilot

# Windows — generate PowerShell scripts
specify init --here --ai copilot --script ps

# Codex CLI / Antigravity — requires skills mode
specify init my-project --ai codex --ai-skills
```

### Key init flags

| Flag | Purpose |
| --- | --- |
| `--ai <agent>` | Select the AI agent (copilot, claude, gemini, cursor-agent, windsurf, codex, etc.) |
| `--ai-skills` | Install templates as agent skills (required for Codex CLI and Antigravity) |
| `--script ps` | Generate PowerShell scripts instead of bash (Windows / cross-platform) |
| `--here` / `--force` | Initialize into an existing directory; `--force` skips confirmation |
| `--no-git` | Skip Git repository initialization |
| `--github-token` | Supply a token for corporate GitHub environments |
| `--skip-tls` | Bypass TLS verification behind a proxy (not recommended for production) |
| `--branch-numbering` | `sequential` (default) or `timestamp` — useful for distributed teams |
| `--debug` | Enable verbose output for troubleshooting |

After init, run `specify check` to confirm Git is configured and the selected AI agent is accessible.

Enterprise considerations: configure proxy settings and custom certificate authorities before installing via `uv`; plan for VS Code extension approval in managed environments; use the Azure DevOps community extension to sync tasks with Azure Boards work items.

## Summary

GitHub Spec Kit brings structure to AI-assisted development by keeping requirements, plans, tasks, and code connected in one repository. It ensures what you specify is what gets built, requirement changes propagate systematically through every artifact, and the full context is available for every reviewer and every Copilot interaction.

## References

- https://github.com/github/spec-kit
- https://learn.microsoft.com/en-us/training/modules/spec-driven-development-github-spec-kit-enterprise-developers/
- https://learn.microsoft.com/en-us/training/modules/spec-driven-development-github-spec-kit-enterprise-developers/5-write-effective-spec-file
- https://learn.microsoft.com/en-us/training/modules/spec-driven-development-github-spec-kit-enterprise-developers/6-create-technical-plan-file
- https://learn.microsoft.com/en-us/training/modules/spec-driven-development-github-spec-kit-enterprise-developers/7-generate-implementation-tasks-file
- https://learn.microsoft.com/en-us/training/modules/spec-driven-development-github-spec-kit-enterprise-developers/8-examine-github-spec-kit-development-environment
- https://github.com/github/spec-kit/blob/main/docs/installation.md
