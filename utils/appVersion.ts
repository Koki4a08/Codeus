/**
 * Release bundles inject `MACRO`. Running from source (`bun entrypoints/cli.tsx`) does not.
 */
export function getAppVersion(): string {
  return typeof MACRO !== 'undefined' && MACRO.VERSION ? MACRO.VERSION : '@konstantindevv edition'
}
