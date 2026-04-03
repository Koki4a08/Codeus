import { feature } from 'bun:bundle'
import { isEnvTruthy } from './envUtils.js'

/**
 * Debug permission mode (Shift+Tab step + `debug` in mode lists + attachments)
 * when either the bundle enables DEBUG_MODE or the env var is set (dev fork).
 *
 * Env: `CLAUDE_CODE_DEBUG_PERMISSION_MODE=1` (or `true` / `yes` / `on`).
 */
export function isDebugPermissionModeEnabled(): boolean {
  if (feature('DEBUG_MODE')) return true
  return isEnvTruthy(process.env.CLAUDE_CODE_DEBUG_PERMISSION_MODE)
}
