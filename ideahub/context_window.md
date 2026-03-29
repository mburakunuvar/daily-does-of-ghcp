# Context Window for GitHub Copilot

## What is a Context Window?

Think of a **context window** as the working memory of an LLM. Every time you send a message to an AI model, it doesn't just see your latest prompt — it sees everything: the conversation history, any files or code you've referenced, system instructions, and tool call results. All of that gets packed into a single block of text and handed to the model at once. The context window is the maximum size of that block, measured in **tokens** (roughly 3–4 characters per token in English).

Once you hit the limit, the model can't see older parts of the conversation. It's not that the AI "forgets" — it's that the information is simply no longer included in what gets sent to the model. This makes the context window one of the most important factors in how well an AI can handle long, complex tasks.

### Why It Matters Even More for Agents

In a standard chat, the context window mostly holds your back-and-forth messages. But in **agentic workflows** — where the model autonomously plans, uses tools, reads files, and executes code — the context fills up much faster. Every tool call, every file read, every search result gets appended to the window. A task that seems simple ("refactor this codebase") can easily balloon into tens of thousands of tokens before the model even writes a line of code.

This is why larger context windows are a game-changer for AI agents: they can hold more history, reference more files, and maintain coherent reasoning across longer task chains without losing sight of what they started out to do.

---

GitHub Copilot's context window depends on the underlying model selected. As of early 2026, the available models and their context windows are:

| Model | Context Window | Notes |
|---|---|---|
| Claude Sonnet 4.6 | 200K tokens | Most widely used default model |
| Claude Opus 4.6 | 200K tokens | |
| Gemini 3.1 Pro (Preview) | 200K tokens | |
| GPT-5.2 | 400K tokens | |
| GPT-5.2-Codex | 400K tokens | |

## Practical Notes

- **In the IDE (Chat):** Copilot assembles context from your open file, referenced files (`#file`), workspace symbols, and conversation history — all within the model's limit.
- **In the CLI (agent mode):** Context is managed automatically; long sessions use **compaction** to summarize older turns and stay within the window rather than truncating.
- **Coding agent:** Uses the model's full window, with the conversation + tool call history counted against it.

The model you pick directly determines how much code, files, and chat history can fit in a single request. For large codebases, models with bigger windows (GPT-5.2, GPT-5.2-Codex) are generally more effective.

---

## How GitHub Copilot Actually Manages Context

The model's context window is the ceiling — but Copilot rarely sends the entire ceiling's worth of content. Understanding the gap between the *theoretical* limit and the *effective* context is key to getting the most out of Copilot.

### 1. What Sources of Context Are Included

Copilot draws from multiple sources depending on the surface (inline, chat, or agent mode):

| Source | Included in? | Notes |
|---|---|---|
| Current open file | Always | Full file or truncated around cursor |
| Cursor position / surrounding code | Always | Lines immediately before/after the cursor |
| Recent conversation history | Chat & Agent | All prior turns in the session |
| `#file` references | When explicitly added | Full file content injected |
| `#codebase` / workspace index | When invoked | Semantically retrieved snippets, not full codebase |
| System prompt / instructions | Always | `copilot-instructions.md`, `.instructions.md` files |
| Tool call history | Agent mode only | Each tool result is appended to context |
| Repository structure / symbol index | Chat & Agent | Used to resolve references, not always injected verbatim |

### 2. How Context Is Selected and Filtered

Copilot does **not** dump your entire codebase into the prompt. Instead it uses a layered selection strategy:

- **Proximity**: Code near the cursor is always prioritized. Lines far from the cursor may be omitted in inline completions.
- **Semantic search (RAG)**: When `#codebase` is used, Copilot indexes your workspace using embeddings and retrieves the most semantically relevant snippets — it doesn't scan files linearly.
- **Explicit references win**: Anything you explicitly add via `#file`, `#selection`, or `#codebase` is guaranteed to be included, up to token budget.
- **Recency bias in conversation**: Older turns may be summarized or dropped when the context window fills up in a long session.
- **Instructions files are high-priority**: Content from `copilot-instructions.md` and scoped `.instructions.md` files are injected early in the prompt, before user messages.

### 3. Model Context Window vs. Effective Context

This is the key distinction that trips people up:

| Dimension | Model Context Window | Copilot's Effective Context |
|---|---|---|
| What it is | Hard limit set by the model | What Copilot actually sends |
| Who controls it | Model provider (OpenAI, Anthropic, Google) | GitHub / Copilot extension |
| Size | 200K–400K tokens | Approximately 10K–40K tokens for inline; more for agent |
| Contents | Everything in the prompt | A curated subset |

Even if the model supports 200K tokens, Copilot may only send approximately 20K–50K in a typical inline or chat interaction. This is intentional: **latency, cost, and relevance** all improve when the prompt is tighter.

### 4. Pros and Cons of a Smaller Effective Context

**Pros:**
- **Faster responses** — Smaller prompts mean less time for the model to process, which matters for inline completions where you expect sub-second latency.
- **Lower cost** — Fewer tokens = fewer compute cycles, which keeps Copilot's per-user cost sustainable.
- **Better signal-to-noise** — A curated, relevant prompt often produces better completions than a massive prompt full of unrelated code.
- **Prevents distraction** — LLMs can lose focus ("lost in the middle" problem) when given very long contexts; shorter, focused prompts tend to yield more precise suggestions.

**Cons:**
- **May miss relevant code** — If Copilot's selection logic doesn't surface the right files, the model gives suggestions without the relevant context.
- **No guarantee of full file awareness** — In inline mode, Copilot may not include your entire file if it's large enough.
- **Black box selection** — Developers can't always see what was included in the prompt, making it hard to debug why a suggestion was wrong.
- **Agent mode burns context faster** — Each tool call appends to the window; complex tasks can exhaust context before they complete.

### 5. Practical Implications for Large Codebases

- **Use `#file` explicitly** — Don't assume Copilot knows about a file. Reference it directly to guarantee inclusion.
- **Use `#codebase` for exploration, `#file` for precision** — Semantic search is great for discovery; explicit references are reliable for generation.
- **Keep `copilot-instructions.md` concise** — It's injected into every request; bloated instructions eat into your useful token budget.
- **Break large agent tasks into smaller steps** — Shorter tasks = less accumulated context = more room for tool results and model reasoning.
- **Choose models with larger windows for complex tasks** — For multi-file refactors or long agent sessions, models with 200K–400K windows give you more runway before compaction kicks in.
- **Compaction in CLI/SDK is automatic, not lossless** — When a CLI session compacts, older turns are summarized. If precise earlier details matter, reference them explicitly before they get summarized.
