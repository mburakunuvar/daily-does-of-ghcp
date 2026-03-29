# Subagents in VS Code Copilot

> Sources:
> - [Agents concepts — Subagents section](https://code.visualstudio.com/docs/copilot/concepts/agents#_subagents) (VS Code docs, updated 25 March 2026)
> - [Subagents in Visual Studio Code](https://code.visualstudio.com/docs/copilot/agents/subagents) (VS Code docs, updated 25 March 2026)

---

## What is a subagent?

When the main agent is working on a complex task, it can delegate focused subtasks to **subagents** — independent AI agents that do isolated work and return only a summary. They are not invoked by the user directly; the main agent decides when to spawn one.

The core value: **context isolation**. Without subagents, every file read and search result piles up in the main agent's context window, crowding out important information. Subagents do their work in a separate context and hand back only the result — keeping the main conversation lean.

---

## Key characteristics

| Property | Detail |
|---|---|
| **Context isolation** | Each subagent runs in its own context window. It does not inherit the main agent's history or instructions — it only receives the task prompt. |
| **Synchronous execution** | The main agent waits for the subagent to finish before continuing, because the result usually informs the next step. |
| **Parallel execution** | VS Code can spawn multiple subagents at once — e.g., security, performance, and accessibility reviews running simultaneously. |
| **Focused results** | Only the final result is returned. Intermediate steps are hidden (but expandable in the UI as a collapsible tool call). |

---

## What the user sees

Subagent runs appear in chat as a **collapsible tool call**. By default it shows:
- The name of the custom agent (if one was used)
- The currently running tool ("Reading file...", "Searching codebase...")

Expand the tool call to see the full prompt passed to the subagent, all tool calls it made, and the returned result.

---

## How invocation works

Subagents are **agent-initiated**, not typed by the user. The flow:

1. You describe a complex task.
2. The main agent recognises parts that benefit from context isolation.
3. It spawns a subagent, passing only the relevant subtask prompt.
4. The subagent works autonomously and returns a summary.
5. The main agent incorporates the result and continues.

You can hint at subagent use by phrasing prompts to suggest "isolated research" or "parallel analysis". For consistent behaviour, define when to use subagents in your custom agent's instructions rather than prompting manually each time.

The `runSubagent` tool must be enabled for subagents to work.

---

## Usage scenarios (with example prompts)

**Research before implementation**
```
Perform isolated research into different OAuth 2.0 implementation patterns for Node.js.
Compare against the current implementation and return a recommendation with pros and cons.
```

**Parallel code analysis**
```
Analyze this codebase for refactoring opportunities. Perform in parallel:
1. Find duplicate code patterns
2. Identify unused exports and dead code
3. Review error handling consistency
4. Check for security vulnerabilities

Compile findings into a prioritized action plan.
```

**Exploring multiple solutions**
```
I need to implement caching. Do isolated research on:
1. Redis-based caching
2. In-memory LRU caching
3. A hybrid tiered approach

Compare and recommend the best fit for our use case.
```

**Specialized code review with custom agents**
```
Review PR changes in parallel:
- Run the security-reviewer agent
- Run the performance-reviewer agent
- Run the accessibility-reviewer agent

Consolidate into a single review summary.
```

---

## Running a custom agent as a subagent

By default subagents inherit the main session's model and tools. You can instead point to a **custom agent** (defined in a `.prompt.md`) that has its own model, tools, and instructions.

Two frontmatter properties control visibility:
- `user-invocable: false` — hides the agent from the dropdown; only usable as a subagent
- `disable-model-invocation: true` — prevents other agents from invoking it as a subagent

To restrict which agents a coordinator can use as subagents, list them in the `agents` frontmatter property:

```yaml
---
name: TDD
tools: ['agent']
agents: ['Red', 'Green', 'Refactor']
---
```

---

## Orchestration patterns

### Coordinator + worker
A coordinator agent delegates to specialized worker agents, each with tailored tool access and potentially a lighter model. The coordinator stays focused on the high-level flow while workers have clean, narrow contexts.

### Multi-perspective code review
Multiple review subagents run in parallel, each approaching the code fresh (correctness, quality, security, architecture). The coordinator synthesizes findings into a prioritized summary.

### Nested subagents (experimental)
By default subagents cannot spawn further subagents (prevents infinite loops). Enable `chat.subagents.allowInvocationsFromSubagents` to allow recursion, up to a max nesting depth of 5. Useful for divide-and-conquer patterns.

---

## Notes for post writing

- Subagents are a VS Code Copilot feature — they live in agent mode (Copilot Chat).
- The built-in Plan agent uses subagents internally for its 4-phase research workflow.
- Good analogy: subagents are like a lead engineer assigning research tasks to team members — they report back a summary, not their entire notebook.
- Availability: agent mode requires Copilot plans with premium request access (Pro+, Business, Enterprise) — verify on docs.github.com before writing the post.
