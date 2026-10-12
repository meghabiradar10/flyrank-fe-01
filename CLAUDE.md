# Claude Code Instructions

## Project Overview

This repository is part of the FlyRank AI Frontend AI Engineering assignment.

## Development Guidelines

- Keep the code simple, readable, and maintainable.
- Follow existing project conventions.
- Use meaningful names for variables, functions, and files.
- Avoid unnecessary dependencies.
- Do not make unrelated changes.
- Explain significant changes clearly.
- Review generated code before applying it.

## Git Conventions

Use Conventional Commits.

Examples:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation
- `chore:` for maintenance
- `refactor:` for code restructuring

## AI-Assisted Development

Claude Code may be used to:

- Review documentation
- Suggest improvements
- Generate or modify code
- Explain implementation decisions
- Identify potential issues

All AI-generated changes should be reviewed before being committed.
## Task Workflow

Before making changes:

1. Understand the requested task.
2. Inspect the existing project structure.
3. Propose a simple approach.
4. Make only the necessary changes.
5. Review the result for correctness.
6. Summarize what was changed.

When working with documentation, prioritize clarity, accuracy, and concise explanations.

## Frontend Coding Standards

1. **Accessible Form Controls and Error Association**:
   - Every input with validation must have an associated error container linked via `aria-describedby="<field>-error"`.
   - Dynamic error updates must toggle `aria-invalid="true"` or `"false"` on the input, and error containers must use `role="alert"`.
   - On failed form submissions, programmatic focus must be moved to the first invalid field (`firstInvalid.focus()`).

2. **Keyboard Navigation and Focus Indicators**:
   - Never suppress native focus outlines with `outline: none` without providing an explicit, high-contrast `:focus-visible` replacement (e.g., `outline: 2px solid <color>; outline-offset: 2px;`).
   - All interactive elements (inputs, buttons, links) must maintain distinct, visible `:focus-visible` states.

3. **Defensive Storage and Schema Validation**:
   - Never directly trust or consume parsed JSON from `localStorage` or `sessionStorage`.
   - Always validate data structures with a runtime guard function checking type and expected properties (e.g., `isValidStoredSettings()`) before applying values to the DOM or application state. Discard or evict corrupted data safely.