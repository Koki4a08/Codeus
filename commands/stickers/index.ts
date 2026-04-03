import type { Command } from '../../types/command.js'

const stickers = {
  type: 'local',
  name: 'stickers',
  description: 'Order Codeus stickers',
  supportsNonInteractive: false,
  load: () => import('./stickers.js'),
} satisfies Command

export default stickers
