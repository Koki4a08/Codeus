/**
 * /powerup — built-in slash command for interactive feature lessons.
 */

import type { Command } from '../../types/command.js'

const powerup = {
  type: 'local',
  name: 'powerup',
  description: 'Learn Codeus features with interactive animated demos',
  supportsNonInteractive: true,
  load: () => import('./powerup.js'),
} satisfies Command

export default powerup
