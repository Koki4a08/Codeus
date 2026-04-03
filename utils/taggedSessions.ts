import { getOriginalCwd, getSessionProjectDir } from '../bootstrap/state.js'
import { getProjectDir } from './sessionStorage.js'
import { listSessionsImpl } from './listSessionsImpl.js'
import { join } from 'path'

let cachedTaggedSessions: string | null = null
let cachedCwd: string | null = null

/**
 * Returns a system prompt section listing all tagged sessions
 * in the current project. This lets the model know about previously
 * tagged sessions so it can load their context when relevant.
 */
export async function getTaggedSessionsForProject(): Promise<string> {
  const cwd = getSessionProjectDir() ?? getOriginalCwd()

  // Cache per project — tagged sessions change rarely and only via user action
  if (cachedCwd === cwd && cachedTaggedSessions !== null) {
    return cachedTaggedSessions
  }

  try {
    const sessions = await listSessionsImpl({ dir: cwd })
    const tagged = sessions.filter(s => s.tag)

    if (tagged.length === 0) {
      cachedTaggedSessions = ''
      cachedCwd = cwd
      return ''
    }

    const projectDir = getProjectDir(cwd)
    const lines = tagged.map(
      s => `- \`${s.tag}\` | session: ${s.sessionId} | file: ${join(projectDir, s.sessionId + '.jsonl')} | ${s.customTitle || s.summary.slice(0, 80)} | ${new Date(s.lastModified).toISOString()}`
    )

    cachedTaggedSessions = `# Previous Sessions (Tagged)\n\nThe following sessions from this project have been tagged by the user. To load context from a tagged session, use the FileRead tool to read its .jsonl file and extract the conversation messages.\n\n${lines.join('\n')}`
    cachedCwd = cwd
    return cachedTaggedSessions
  } catch {
    cachedTaggedSessions = ''
    cachedCwd = cwd
    return ''
  }
}

/**
 * Clear the tagged sessions cache (e.g. after a tag change).
 */
export function clearTaggedSessionsCache(): void {
  cachedTaggedSessions = null
  cachedCwd = null
}
