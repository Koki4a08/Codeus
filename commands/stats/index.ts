import type { Command } from '../../types/command.js'

const stats = {
  type: 'local-jsx',
  name: 'stats',
  description: 'Show your Codeus usage statistics and activity',
  load: () => import('./stats.js'),
} satisfies Command

export default stats
