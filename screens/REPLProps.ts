import type { Tool } from '../Tool.js'
import type { AgentColorName } from '../tools/AgentTool/agentColorManager.js'
import type { AgentDefinition } from '../tools/AgentTool/loadAgentsDir.js'
import type { Command } from '../types/command.js'
import type { HookResultMessage, Message as MessageType } from '../types/message.js'
import type { MCPServerConnection, ScopedMcpServerConfig } from '../services/mcp/types.js'
import type { RemoteSessionConfig } from '../remote/RemoteSessionManager.js'
import type { DirectConnectConfig } from '../server/directConnectManager.js'
import type { SSHSession } from '../ssh/createSSHSession.js'
import type { FileHistorySnapshot } from '../utils/fileHistory.js'
import type { ThinkingConfig } from '../utils/thinking.js'
import type { ContentReplacementRecord } from '../utils/toolResultStorage.js'

export type Screen = 'prompt' | 'transcript'

/** Public props for `REPL` — lives in a separate module so callers avoid importing `REPL.tsx` for types only. */
export type Props = {
  commands: Command[]
  debug: boolean
  initialTools: Tool[]
  initialMessages?: MessageType[]
  pendingHookMessages?: Promise<HookResultMessage[]>
  initialFileHistorySnapshots?: FileHistorySnapshot[]
  initialContentReplacements?: ContentReplacementRecord[]
  initialAgentName?: string
  initialAgentColor?: AgentColorName
  mcpClients?: MCPServerConnection[]
  dynamicMcpConfig?: Record<string, ScopedMcpServerConfig>
  autoConnectIdeFlag?: boolean
  strictMcpConfig?: boolean
  systemPrompt?: string
  appendSystemPrompt?: string
  onBeforeQuery?: (
    input: string,
    newMessages: MessageType[],
  ) => Promise<boolean>
  onTurnComplete?: (messages: MessageType[]) => void | Promise<void>
  disabled?: boolean
  mainThreadAgentDefinition?: AgentDefinition
  disableSlashCommands?: boolean
  taskListId?: string
  remoteSessionConfig?: RemoteSessionConfig
  directConnectConfig?: DirectConnectConfig
  sshSession?: SSHSession
  thinkingConfig: ThinkingConfig
}
