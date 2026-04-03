---
name: bun-bundle-feature-flags
description: Enforces correct use of `feature()` from `bun:bundle` in this Bun codebase so compile-time flags tree-shake and bundles do not throw at module load. Use when editing imports from `bun:bundle`, adding feature gates, or when Bun reports that `feature()` can only be used in an `if` or ternary; also use before merging permission-mode, debug-mode, or other flag-gated control flow.
---

# Bun `feature()` (bun:bundle) usage

## Rule (hard requirement)

`feature('FLAG_NAME')` **must appear only** as:

- The condition of an `if` statement, or
- An operand of a ternary (`condition ? a : b`).

Do **not** assign the result to a variable, pass it through helpers, or store it in a collection and branch later. Bun’s bundler rejects patterns like:

```ts
// ❌ Breaks bundling / module eval — throws at load time in dev
const enabled = feature('DEBUG_MODE')
if (enabled) { ... }
```

Bun reports:

```text
error: feature() from "bun:bundle" can only be used directly in an if statement or ternary condition
```

## Correct patterns

```ts
// ✅ OK — direct if
if (feature('DEBUG_MODE')) {
  return 'plan'
}

// ✅ OK — direct ternary
const x = feature('FOO') ? a : b

// ✅ OK — feature() inside another expression that is still an if/ternary branch
if (feature('A') && somethingElse) { ... }
```

## Why it mattered here

Invalid `feature()` usage can make `import './screens/REPL.js'` (and other large entry chunks) **fail during module graph evaluation**, which showed up as the REPL never finishing its dynamic import (or as an immediate error when importing the screen in isolation).

## Quick verification

From repo root, force evaluation of the changed module (or a screen that imports it):

```bash
bun -e "await import('./screens/REPL.js'); console.log('ok')"
```

If the error mentions `feature()` and `if statement or ternary`, search the stack trace file for `const … = feature(` or `let … = feature(` and inline the call into `if` / ternary.

## PR / review checklist

- [ ] No `= feature(` assignments (including to `const`, object fields, or closure captures).
- [ ] Re-check any refactor that “cached” a flag in a local for readability — readability must use repeated `feature('…')` calls or restructure into small functions where each branch still uses `feature()` directly in `if`/ternary at the call site.
