import type { Command } from '../../types/command.js'

const tags = {
  type: 'local-jsx',
  name: 'tags',
  description: 'Tag the current session or list tagged sessions',
  argumentHint: '[tag-name]',
  load: () => import('./tags.js'),
} satisfies Command

export default tags
