# Daily Dose of GHCP

## 01.03.2026

### Infinite Sessions

**Category:** Copilot CLI

**Description:**
Copilot CLI features infinite sessions — you never run out of context window. The system automatically manages context through **intelligent compaction** that summarizes conversation history while preserving essential information. You can work on long, complex tasks without worrying about context limits.

**Session Storage Location:**
```
~/.copilot/session-state/{session-id}/
├── events.jsonl      # Full session history
├── workspace.yaml    # Metadata
├── plan.md           # Implementation plan (if created)
├── checkpoints/      # Compaction history
└── files/            # Persistent artifacts
```

**Key Benefits:**
- No context window limits during CLI sessions
- Automatic context compaction — no manual intervention needed
- Full session history preserved in `events.jsonl`
- Implementation plans and artifacts persist across the session

**Tips:**
> Compaction is handled automatically. Use `/compact` only if you need to manually trigger it — this is rarely necessary.

**Session management commands (Copilot CLI):**
- `/session` — show info about the current session
- `/session checkpoints` — list compaction checkpoints
- `/session checkpoints NUMBER` — show details for a specific checkpoint
- `/session files` — list temporary files created during the session
- `/session plan` — show the current plan (if one exists)
- `/context` — visualize context/token usage
- `/clear` or `/new` — start fresh between unrelated tasks

**Documentation:** [CLI Best Practices - Infinite Sessions](https://docs.github.com/en/copilot/how-tos/copilot-cli/cli-best-practices#3-leverage-infinite-sessions)

**Is this available in IDE or GitHub.com UI?**
Infinite sessions with automatic context compaction is a feature specific to **Copilot CLI** and is **not available** in IDE extensions (e.g., VS Code) or on **GitHub.com** (repositories, issues, PRs, etc.).

| Feature | Copilot CLI | IDE (VS Code, etc.) | GitHub.com UI |
|---|---|---|---|
| Infinite sessions | ✅ | ❌ | ❌ |
| Automatic context compaction | ✅ | ❌ | ❌ |
| Persistent session storage | ✅ | ❌ | ❌ |
| Context window limits | None | Model-dependent | Model-dependent |

**In the IDE and GitHub.com UI:**
- Each chat conversation has a **bounded context window** tied to the underlying model
- When the context limit is reached, older messages may be dropped or no longer considered
- There is **no Copilot CLI-style automatic compaction** (checkpoints) or local session artifacts (e.g., `events.jsonl`, `plan.md`)

> Note: IDE/GitHub.com may keep a conversation thread in the UI, but that does not imply “infinite” context.

**Workarounds in IDE / GitHub.com UI:**
- Use file references/attachments to keep relevant code in context (IDE: `#file`; GitHub.com: attach/select relevant repo files or reference paths)
- Break long tasks into smaller, focused conversations
- Summarize previous progress manually at the start of a new chat

**Tips:**
> For long, complex multi-step tasks, **Copilot CLI** is the better tool due to its infinite session capability.

