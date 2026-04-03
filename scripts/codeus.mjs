#!/usr/bin/env bun
/**
 * Global launcher for this repo: run from any cwd with `codeus` after
 * `bun link --global` from the repo root.
 *
 * Directly imports cli.tsx in the same process — avoids double-spawn TTY
 * issues on Windows where a child process chain breaks raw-mode console handles.
 */
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')



process.env.CLAUDE_CODE_STREAMING_TOOL_EXECUTION = '1'
if (!process.env.CLAUDE_CODE_MAX_TOOL_USE_CONCURRENCY) {
  process.env.CLAUDE_CODE_MAX_TOOL_USE_CONCURRENCY = '25'
}

await import(join(root, 'entrypoints', 'cli.tsx'))