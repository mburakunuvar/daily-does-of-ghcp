Based on the VS Code Copilot customization overview:

1. Custom instructions  
Persistent rules you want Copilot to follow (style, conventions, architecture, team standards). They can be always-on for all prompts or scoped to specific file types/folders.
Simple example: "Use 2-space indentation and prefer async/await in JavaScript files."  
Use case: Keep code style consistent across a team without repeating rules in every chat.

2. Prompt files  
Reusable, task-focused prompts for repeatable work (for example PR summaries, scaffolding, audits). You run them when needed instead of rewriting prompts each time.
Simple example: A prompt file named "review.prompt.md" that asks Copilot to review changed files for bugs and missing tests.  
Use case: Run the same high-quality code review prompt every time you open a PR.

3. Custom agents  
Specialized Copilot personas for a role (for example security reviewer, planner, DBA). A custom agent defines behavior, available tools, and model preferences for that role.
Simple example: A "Security Reviewer" agent that focuses on auth, secrets, and dependency risks.  
Use case: Switch to that agent when you want a security-first review instead of a general coding answer.

4. Agent skills  
Packaged capabilities for complex, multi-step workflows, often involving scripts or external tools. Skills are reusable workflow modules that agents (or other customizations) can invoke.
Simple example: A "Create Release Notes" skill that gathers commits, groups them, and drafts notes in Markdown.  
Use case: Automate repetitive multi-step tasks that need the same sequence each time.

Quick mental model:
- Rules: custom instructions
- Reusable prompt templates: prompt files
- Role-based assistants: custom agents
- Reusable workflow building blocks: agent skills
