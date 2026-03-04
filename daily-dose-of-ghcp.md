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

## 02.03.2026

### Tracking GitHub Copilot's sessions

**Category:** Copilot coding agent

**Availability:** Copilot Pro, Pro+, Business, and Enterprise plans

**Description:**
Copilot **coding agent sessions** (autonomous agent tasks that run in the background — typically producing a pull request) can be tracked, steered, and stopped from **7 surfaces**: GitHub UI, GitHub CLI, VS Code, JetBrains IDEs, Eclipse, Raycast, and GitHub Mobile.

**Where you can track agent sessions:**

| Surface | How to access | Notes |
|---|---|---|
| **GitHub.com UI** | Agents panel (nav bar icon) → **View all** to open the Agents tab | Shows running + past sessions across all repos. You can also **steer** a running session or **stop** it from here. |
| **GitHub CLI** | `gh agent-task list` / `gh agent-task view --repo OWNER/REPO PR#` | Requires **GitHub CLI v2.80.0+** (public preview). Add `--log` for session logs, `--follow` to stream live. |
| **VS Code** | **GitHub Pull Requests** extension → GitHub icon in sidebar → click session → **View Session** | Can also click **Open in VS Code** from the GitHub agents tab (currently VS Code Insiders only). |
| **JetBrains IDEs** | **GitHub Coding Agent Jobs** button in sidebar, or **Open Job List** after delegating | Public preview. Shows status; right-click → **Cancel Job** to stop. |
| **Eclipse** | Agents icon at top-right of chat window, or **Open Job List** after delegating | Public preview. Same status/cancel workflow as JetBrains. |
| **Raycast** | GitHub Copilot extension → **View Tasks** command | Works on Windows & macOS. Press ⌘L to view session logs. |
| **GitHub Mobile** | Home → Agents section → **Agent Tasks** | Filter by Open / Merged / etc. |

**You can also bring a session to your local environment:**
- From the agents tab on GitHub.com, click **Continue in GitHub Copilot CLI** to resume the session locally
- In Copilot CLI, use `/resume` to pick up a session (including coding-agent sessions started on GitHub)

**Steering & stopping sessions:**
- **Steer:** From the agents tab, select a running session and enter a prompt to redirect Copilot mid-task (costs 1 premium request per message)
- **Stop:** Click **Stop session** in the session log viewer to halt a running task

**Session logs:**
- Available in GitHub UI and VS Code — shows Copilot's internal monologue, tool invocations, and validation steps
- Copilot has its own dev environment (can run tests and linters) to validate changes before pushing

**Important distinction (common confusion):**
- **Agent sessions** (this entry) are *coding-agent tasks* — designed to be visible across all surfaces listed above
- **Chat sessions** (Copilot Chat threads in VS Code / GitHub.com) are a separate concept with their own per-surface history — they do **not** appear in the coding-agent session list

**Documentation:** [Tracking GitHub Copilot’s sessions](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/track-copilot-sessions) · [About agent management](https://docs.github.com/en/copilot/concepts/agents/coding-agent/agent-management)
