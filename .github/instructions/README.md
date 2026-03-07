# Instructions for Copilot

This folder contains instruction files that you can reference when using GitHub Copilot in VS Code.

## How to Use

In **VS Code Copilot Chat**, reference these files using `@workspace`:

### Code Quality Audit

```
@workspace Please audit the codebase for quality and consistency 
issues following .github/instructions/code-audit.instructions.md
```

This will:
- Check HTML/CSS/JS quality
- Find consistency issues across posts
- Identify accessibility problems
- Suggest and implement fixes

### Other Instructions

Add more `.instructions.md` files here as needed for different tasks.

## Note

These are **VS Code-specific** instruction files, not CLI agent prompts (which go in `.github/prompts/`).
