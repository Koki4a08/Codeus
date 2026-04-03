/**
 * Slash command base names that stay available when the Remote Control client
 * filters the local slash-command list (see REPL handleRemoteInit).
 *
 * Must stay in sync with REMOTE_SAFE_COMMANDS in commands.ts (same entries,
 * by canonical `cmd.name`).
 */
export const REMOTE_SAFE_SLASH_NAMES = new Set<string>([
  'session',
  'exit',
  'clear',
  'help',
  'theme',
  'color',
  'vim',
  'cost',
  'usage',
  'copy',
  'btw',
  'feedback',
  'plan',
  'keybindings',
  'statusline',
  'stickers',
  'mobile',
])

export function isRemoteSafeSlashName(name: string): boolean {
  return REMOTE_SAFE_SLASH_NAMES.has(name)
}
