# Best Practices for Context Management in GitHub Copilot

*This is Part 2 of the Context Window series. [Part 1](context-window-in-ghcp-part1.html) covers what a context window is, how Copilot selects and filters context, and why the effective context is smaller than the model's theoretical limit. Start there if you haven't already.*

---

Part 1 explained the mechanics. Now let's talk about what you can actually *do* with that knowledge. Copilot's context is not magic — it's a curated, token-budgeted snapshot of what you've given it. The quality of that snapshot directly determines the quality of your suggestions.

Here's how to make every token count.

---

## 1. Inline Completions: Work With Proximity Bias

Copilot's inline engine prioritizes code **near your cursor**. Lines far away from where you're typing may not make it into the prompt at all.

**Do:**
- Move your cursor close to the relevant function or type definition before triggering a completion.
- Keep the current file focused on one concern — a 3,000-line monolith gives Copilot a harder time than a well-split 200-line module.
- Use meaningful names. `getUserProfileById(userId)` gives Copilot far more signal than `fetch(id)`.
- Open related files in editor tabs. Some IDE integrations include recently opened files as implicit context.

**Don't:**
- Expect Copilot to "know" about a helper defined in another file you haven't referenced.
- Keep large commented-out blocks above your cursor — they consume token budget without adding signal.

---

## 2. Copilot Chat (IDE): Be Explicit About What You Want Included

Copilot Chat doesn't read your entire workspace by default. It reads what you give it.

Note: `#` prefixes are **context variables** (they inject content directly into the prompt), while `@` prefixes are **chat participants** (they route your query to a specialized agent).

| Reference | What it does | Best for |
|---|---|---|
| `#file` | Injects the full file content | Targeted generation, refactoring |
| `#selection` | Injects only highlighted code | Explaining or fixing a specific block |
| `#codebase` | Semantic search across workspace | Discovery, exploratory questions |
| `@workspace` | Routes query to workspace-aware agent | Questions about project structure |

**Practical tips:**
- **Lead with context, end with your ask.** "Here's `#file:auth.ts` and `#file:user.model.ts`. Now write a middleware that validates the JWT against the user schema." — not the other way around.
- **Start a new chat thread** when switching to a different task. Old turns about an unrelated feature consume tokens and can confuse the model.
- **Avoid `#codebase` when you know exactly which file you need.** Semantic search is great for exploration, but explicit `#file` references are more reliable for code generation.

---

## 3. `copilot-instructions.md`: Keep It Lean

`copilot-instructions.md` is injected into **every single request**, before your message. That makes it powerful — and expensive. Every line you add there is one less line of actual code or conversation the model can see.

**What to include:**
- Stack and language choices ("This is a TypeScript monorepo using Node 20 and Postgres.")
- Code style conventions that aren't obvious from the code itself
- Critical architectural decisions (e.g., "Never use `any` — use Zod schemas instead.")
- Security constraints ("Never log user data.")

**What to leave out:**
- Lengthy explanations that could be in a README
- Step-by-step onboarding guides
- Content that's only relevant to one subsystem

**Use scoped instructions files** for subsystem-specific rules. Create a file in `.github/instructions/` with an `applyTo` frontmatter pattern (e.g., `applyTo: 'src/payments/**'`) so those rules only apply when working in that folder — they don't eat into the global token budget everywhere else.

---

## 4. Copilot CLI: Scope Your Sessions

In CLI agent mode, every tool call — every file read, every shell command, every search — gets appended to the context window. Long sessions accumulate fast. That said, Copilot CLI supports **infinite sessions**: it automatically compacts older turns into high-signal summaries, so you won't hit a hard wall. Fine-grained early details may be summarized away, but the core intent and decisions are preserved.

**Do:**
- Break large goals into smaller, focused sessions. "Refactor the auth module" → three separate CLI sessions: extract interfaces, update implementations, update tests. Even with infinite sessions, tighter scope means higher quality output.
- When **compaction** kicks in (the CLI automatically summarizes older turns), recognize that some fine-grained details from early in the session may be condensed. If a specific earlier decision matters, restate it explicitly.
- To switch to an unrelated task, use `/new` or `/clear` to start with a clean context — don't pile unrelated work into the same session.

**Don't:**
- Start a single CLI session and try to drive it through a 10-step refactor spanning unrelated concerns. Even with compaction handling the token limit, cross-domain noise degrades decision quality over long sessions.

---

## 5. Coding Agent: Treat Each Issue as a Fresh Context

The Coding Agent runs in its own context window per task. It doesn't carry memory between separate issues.

**Best practices:**
- **One concern per issue.** "Migrate all API routes to use the new auth middleware" is a good scope. "Refactor the entire backend" is not.
- **Reference files explicitly in the issue body.** Don't write "update the auth logic" — write "update `src/middleware/auth.ts` to validate JWTs using the `verifyToken` helper in `src/lib/jwt.ts`."
- **Put project conventions in `copilot-instructions.md`**, not in individual issue descriptions. The agent reads that file; it doesn't remember your last conversation.
- Avoid giving the agent a task that requires reading more than 5–10 files in depth. Beyond that, the context fills up and quality degrades.

---

## 6. Model Selection: Size Isn't Everything

Bigger context window ≠ always better. Here's a quick guide:

| Task | Recommended window size | Why |
|---|---|---|
| Inline completions | Default (any model) | Latency matters more than window size; all current models are ≥200K |
| Chat Q&A, quick fixes | Default (any model) | Current models start at 200K — more than enough; smaller = faster |
| Multi-file refactor in Chat | 200K (Claude Sonnet 4.6, Claude Opus 4.6, Gemini 3.1 Pro) | Need room for multiple full files |
| Long Coding Agent task | 400K (GPT-5.2, GPT-5.2-Codex) | Tool call history accumulates fast |
| Long CLI agent session | 200K+ | Compaction kicks in; bigger window = longer before summaries start |

Larger windows also mean higher latency and cost. Use them when the task genuinely needs them, not as a default.

---

## 7. Copilot Spaces: Persistent, Shareable Context

All the practices above are things you do *per session*. **Copilot Spaces** flips the model: instead of wiring up context every time you open a chat, you define it once in a Space and reuse it forever.

A Space is a named, curated collection of:
- **Code** — files and repositories attached directly from GitHub (always kept in sync as the code changes)
- **Documents** — specs, design docs, runbooks, ADRs
- **Custom instructions** — the Copilot persona and conventions for this context

You then chat with Copilot *inside* the Space, and it already knows your project deeply — without you typing a single `#file` reference.

**Why it matters for context management:**

| Without Spaces | With Spaces |
|---|---|
| Re-reference files every chat session | Context is pre-loaded and persistent |
| Each developer sets up their own context | One Space shared across the whole team |
| Context goes stale as code changes | Files sync automatically from the repo |
| Custom instructions live on one machine | Instructions are centralized and versioned |

**Best practices for Spaces:**
- **One Space per domain, not per task.** Create a "Payments Service" Space, not a "Fix bug #1234" Space. The Space represents the knowledge base; individual chats handle the tasks.
- **Add the authoritative files.** Include the files the team actually references most: service interfaces, data models, architecture docs, `copilot-instructions.md`.
- **Use Space-level custom instructions** to encode the conventions for that subsystem (e.g., "This is a Go service using the repository pattern. Always return errors, never panic.").
- **Share it.** If you're on a Business or Enterprise plan, share the Space with your team so everyone benefits from the same curated context.

> **Availability:** Copilot Spaces is available on github.com for all GitHub Copilot plans (Free, Pro, Pro+, Business, and Enterprise). Business and Enterprise plans may require an org admin to enable preview features.

---

## 8. Anti-Patterns Cheat Sheet

| Anti-pattern | Why it hurts | Fix |
|---|---|---|
| Bloated `copilot-instructions.md` | Eats into every request's token budget | Trim to essentials; use scoped `.instructions.md` with `applyTo` patterns |
| Running a 10-step refactor across unrelated concerns in one CLI session | Cross-domain noise degrades decision quality even with infinite sessions | Break into focused sessions by concern |
| Relying on `#codebase` for code generation | Semantic retrieval is approximate; wrong snippets hurt quality | Use `#file` for precise inclusion |
| One massive Coding Agent issue | Model loses focus as context fills | Split into single-concern issues |
| Keeping large commented-out blocks near the cursor | Consumes token budget with low-signal content | Delete or move to a separate scratch file |
| Expecting cross-session memory | Copilot has no persistent memory between sessions | Encode conventions in `copilot-instructions.md` or a Space |
| Re-setting up the same context every day | Wastes time and is inconsistent across the team | Create a Copilot Space for that domain |

---

## Key Takeaways

- Context quality > context quantity. A well-curated 20K token prompt beats a sprawling 80K one.
- Be explicit: `#file`, issue descriptions, and clear cursor placement all help Copilot see what it needs.
- `copilot-instructions.md` is powerful but costly — keep it tight. Use `applyTo`-scoped files for subsystem rules.
- For agents (CLI or Coding Agent), tighter task scope preserves context fidelity — even with infinite session support.
- Match model size to task complexity — don't reach for the 400K window model for a single-function fix.
- Use **Copilot Spaces** to define context once and share it across your team — the highest-leverage context management habit of all.
