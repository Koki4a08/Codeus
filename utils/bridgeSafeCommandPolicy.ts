/**
 * Predicate for slash commands that may run when input arrives over Remote
 * Control (see commands.ts isBridgeSafeCommand PR #19134).
 *
 * Must match BRIDGE_SAFE_COMMANDS in commands.ts. `local` entries are listed
 * by canonical `cmd.name` (includes summary stub name `stub` when the stub
 * command is in the allow Set).
 */
import type { Command } from '../types/command.js'

const BRIDGE_SAFE_LOCAL_NAMES = new Set<string>([
  'compact',
  'clear',
  'cost',
  'summary',
  'stub',
  'release-notes',
  'files',
])

export function isBridgeSafeCommand(cmd: Command): boolean {
  if (cmd.type === 'local-jsx') return false
  if (cmd.type === 'prompt') return true
  if (cmd.type === 'local') return BRIDGE_SAFE_LOCAL_NAMES.has(cmd.name)
  return false
}
