/**
 * /powerup — built-in lessons teaching Codeus features through animated demos.
 * Renders as plain chalk text (type: 'local') — no Ink JSX, no stdin capture.
 */

import chalk from 'chalk'
import type { LocalCommandCall } from '../../types/command.js'
import { lessons } from './lessons/lessons.js'

const reducedMotion =
  process.env.NO_ANIMATION === '1' || process.env.NO_ANIMATION === 'true'

function renderMenu(): string {
  const lines: string[] = []
  lines.push(chalk.bold.cyan('⚡ Codeus Power-Up'))
  lines.push(chalk.dim('Learn features with animated demos'))
  lines.push('')

  lessons.forEach((l, i) => {
    const num = chalk.cyan(String(i + 1).padStart(2))
    lines.push(`${num}. ${chalk.bold(l.title)}${chalk.dim(` — ${l.shortDescription}`)}`)
  })

  lines.push('')
  lines.push(chalk.dim('Run: /powerup <number> to start a lesson'))
  return lines.join('\n')
}

function renderLesson(lesson: typeof lessons[0], index: number, total: number): string {
  const lines: string[] = []
  lines.push(chalk.bold.cyan(`⚡ ${lesson.title}`))
  lines.push(chalk.dim(`Lesson ${index + 1} of ${total}`))
  lines.push('')

  lesson.explanation.forEach((para) => {
    lines.push(para)
    lines.push('')
  })

  // Animated demo
  lines.push(chalk.bold.green('▶ Demo:'))

  const finalFrame = lesson.frames[lesson.frames.length - 1]
  if (finalFrame && reducedMotion) {
    lines.push(finalFrame.content)
  } else if (finalFrame) {
    // In non-reduced-motion mode, show the final frame content as the demo result
    lines.push(chalk.dim('  [Animation would play in interactive terminal]'))
    lines.push(finalFrame.content)
  }

  lines.push('')
  const nextIndex = index < total - 1 ? index + 2 : 1
  lines.push(chalk.dim(`Next: /powerup ${nextIndex}`))
  return lines.join('\n')
}

export const call: LocalCommandCall = async (args, _context) => {
  const trimmed = args?.trim() || ''
  const num = parseInt(trimmed, 10)

  if (!trimmed || isNaN(num) || num < 1 || num > lessons.length) {
    return { type: 'text', value: renderMenu() }
  }

  const lessonIndex = num - 1
  return {
    type: 'text',
    value: renderLesson(lessons[lessonIndex], lessonIndex, lessons.length),
  }
}
