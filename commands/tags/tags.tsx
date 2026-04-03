import * as React from 'react'
import { getSessionId, getOriginalCwd, getSessionProjectDir } from '../../bootstrap/state.js'
import { Box, Text } from '../../ink.js'
import type { LocalJSXCommandOnDone } from '../../types/command.js'
import { getProjectDir, saveTag, getCurrentSessionTag } from '../../utils/sessionStorage.js'
import { listSessionsImpl } from '../../utils/listSessionsImpl.js'
import chalk from 'chalk'
import type { UUID } from 'crypto'

function formatTimeAgo(ts: number): string {
  const diff = Date.now() - ts
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}

async function tagSession(tagName: string, onDone: LocalJSXCommandOnDone): Promise<React.ReactNode> {
  try {
    const sessionId = getSessionId() as UUID
    if (!sessionId) {
      onDone('No active session to tag', { display: 'system' })
      return null
    }

    const normalizedTag = tagName.trim()
    if (!normalizedTag) {
      onDone('Tag name cannot be empty', { display: 'system' })
      return null
    }

    const currentTag = getCurrentSessionTag(sessionId)
    const fullPath = await import('../../utils/sessionStorage.js').then(m => m.getTranscriptPath())

    if (currentTag === normalizedTag) {
      await saveTag(sessionId, '', fullPath)
      onDone(`Removed tag ${chalk.cyan(`#${normalizedTag}`)}`, { display: 'system' })
    } else {
      const isReplacing = !!currentTag
      await saveTag(sessionId, normalizedTag, fullPath)
      onDone(`Tagged session with ${chalk.cyan(`#${normalizedTag}`)}${isReplacing ? ' (replaced previous tag)' : ''}`, { display: 'system' })
    }
  } catch (err) {
    onDone(`Error: ${err}`, { display: 'system' })
  }
  return null
}

async function listAllTaggedSessions(onDone: LocalJSXCommandOnDone): Promise<React.ReactNode> {
  try {
    const cwd = getSessionProjectDir() ?? getOriginalCwd()
    const allSessions = await listSessionsImpl({ dir: cwd })

    const taggedSessions = allSessions
      .filter(s => s.tag)
      .sort((a, b) => b.lastModified - a.lastModified)

    if (taggedSessions.length === 0) {
      onDone('No tagged sessions in this project', { display: 'system' })
      return null
    }

    const byTag: Record<string, typeof taggedSessions> = {}
    for (const session of taggedSessions) {
      const tag = session.tag || 'untagged'
      if (!byTag[tag]) byTag[tag] = []
      byTag[tag].push(session)
    }

    const lines: React.ReactNode[] = [
      <Text key="title">Tagged sessions in this project ({taggedSessions.length} total):</Text>,
    ]

    for (const [tag, sessions] of Object.entries(byTag)) {
      lines.push(<Text key={`tag-${tag}`}>{chalk.green(`#${tag}`)} ({sessions.length}):</Text>)
      for (const session of sessions.slice(0, 20)) {
        lines.push(
          <Text key={session.sessionId}>
            {chalk.cyan(session.sessionId.slice(0, 8))}  {session.customTitle || session.summary.slice(0, 60)}  {chalk.dim(formatTimeAgo(session.lastModified))}
          </Text>
        )
      }
      if (sessions.length > 20) {
        lines.push(<Text key={`more-${tag}`}>{chalk.dim(`... and ${sessions.length - 20} more`)}</Text>)
      }
    }

    return <Box flexDirection="column">{lines}</Box>
  } catch (err) {
    onDone(`Error: ${err}`, { display: 'system' })
    return null
  }
}

export async function call(
  onDone: LocalJSXCommandOnDone,
  _context: unknown,
  args?: string,
): Promise<React.ReactNode> {
  const trimmed = args?.trim() || ''

  if (trimmed) {
    return tagSession(trimmed, onDone)
  }

  return listAllTaggedSessions(onDone)
}
