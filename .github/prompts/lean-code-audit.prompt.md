---
name: lean-code-audit
description: Audit the repo and propose a phased refactoring plan — leaner, cleaner, more maintainable, more effective.
agent: agent
tools:
  - codebase
  - changes
  - problems
argument-hint: "Optional: goals, constraints, non-goals, risk tolerance, performance targets"
---

# Lean / Clean / Effective Refactor Audit (Plan First)

> Follow all conventions in [project guidelines](../copilot-instructions.md).

**Goals / constraints for this run:** ${input:goals:Leave blank for a full general audit, or describe specific goals, constraints, non-goals, or risk tolerance}

You are a principal-level software architect performing a production-grade codebase audit.

## Goal

Propose a structured refactoring plan to make this repository:
- **Leaner** (remove dead code, reduce duplication, reduce unnecessary dependencies)
- **Cleaner** (clear structure, consistent naming, simpler modules, readable code)
- **More maintainable** (lower coupling, better boundaries, better testability)
- **More effective** (measurable improvement in performance, reliability, developer productivity, and/or operational cost)

## Guardrails

- **Do not modify code yet.** Start with an audit + plan only.
- Recommendations must be **evidence-based** (point to files/folders/symbols).
- Prefer **incremental refactoring** over rewrites.
- Treat breaking changes as **Phase 2+** and clearly mark them.

## Step 1: Repo map (situational awareness)

1. Identify the key entry points (apps/services/CLIs), main modules, and architectural layers.
2. Call out the largest/most complex files and “hotspot” areas (by structure and responsibility).
3. Summarize dependency landscape (major libraries/frameworks, potential redundancies).

## Step 2: Findings (categorized)

Provide findings grouped by these categories:

1. **Architecture & boundaries**
2. **Code quality & consistency**
3. **Dependencies & packaging**
4. **Performance & scalability**
5. **Reliability & error handling**
6. **Testability & coverage**
7. **Developer experience & tooling (linting, formatting, CI checks)**

For each finding include:
- Evidence: file/folder/symbol references
- Why it matters
- Suggested change
- Effort (S/M/L)
- Impact (Low/Med/High)
- Risk (Safe/Risky)
- How to validate (tests, benchmarks, metrics, profiling)

## Step 3: Refactoring roadmap (phased)

Create a phased plan:

- **Phase 0 (Quick wins / safe cleanup):**
  dead code removal, unused deps, small renames, formatting, low-risk refactors
- **Phase 1 (Maintainability refactors):**
  module splits, boundary cleanup, duplication removal, interface simplification
- **Phase 2 (Risky / behavior-adjacent changes):**
  changes requiring careful testing, API adjustments, migrations
- **Phase 3 (Optional performance work):**
  improvements only if measurable and validated

Include a short “first PR” suggestion: the smallest high-value set of changes to start with.

## Output format

Return:

1. **Executive summary (5–8 bullets)**
2. **Top 10 improvements (table)** with: Category | Item | Effort | Impact | Risk | Evidence | Validation
3. **Phased roadmap**
4. **Risks & pitfalls**
5. **Recommended next action** (what you want me to approve first)