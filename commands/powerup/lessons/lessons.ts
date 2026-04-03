import type { Lesson } from './types.js'

const FRAMES = {
  prompt: '> ',
  response: 'claude: ',
  cmd: (c: string) => `  ${c}`,
  dim: (c: string) => c,
  separator: '  ' + '─'.repeat(50),
} as const

export const lessons: Lesson[] = [
  {
    id: 'context-management',
    title: 'Context Management',
    shortDescription: '/clear vs /compact — when to use each',
    explanation: [
      'Every message you send and every response Claude gives takes up context window tokens. As conversations grow longer, you use more tokens and the model may lose track of early details.',
      '/compact summarizes the conversation so far, keeping a condensed version in memory. Use this when you want to keep the thread going but save tokens.',
      '/clear wipes everything — Claude forgets all prior messages. Use this when starting a completely new task or when the context has gone off track.',
      'Tip: /compact preserves project files, CLAUDE.md memory, and active settings. Only the conversation text gets summarized.',
    ],
    frames: [
      {
        content:
          `${FRAMES.prompt}Explain how to implement binary search in Python\n\n` +
          `${FRAMES.response}Binary search works on sorted arrays...\n` +
          `Here's the implementation:\n\n` +
          `def binary_search(arr, target):\n` +
          `    left, right = 0, len(arr) - 1\n` +
          `    while left <= right:\n` +
          `        mid = (left + right) // 2\n` +
          `        if arr[mid] == target:\n` +
          `            return mid\n` +
          `        elif arr[mid] < target:\n` +
          `            left = mid + 1\n` +
          `        else:\n` +
          `            right = mid - 1\n` +
          `    return -1\n\n` +
          `Time complexity: O(log n), Space: O(1)`,
        duration: 1200,
      },
      {
        content:
          `${FRAMES.prompt}Explain how to implement binary search in Python\n\n` +
          `${FRAMES.response}Binary search works on sorted arrays...\n` +
          `Here's the implementation:\n\n` +
          `def binary_search(arr, target):\n` +
          `    left, right = 0, len(arr) - 1\n` +
          `    while left <= right:\n` +
          `        mid = (left + right) // 2\n` +
          `        if arr[mid] == target:\n` +
          `            return mid\n` +
          `        elif arr[mid] < target:\n` +
          `            left = mid + 1\n` +
          `        else:\n` +
          `            right = mid - 1\n` +
          `    return -1\n\n` +
          `Time complexity: O(log n), Space: O(1)\n\n` +
          `${FRAMES.prompt}Now write one for JavaScript\n\n` +
          `${FRAMES.response}Sure! Here's the JavaScript version:\n\n` +
          `function binarySearch(arr, target) {\n` +
          `    let left = 0, right = arr.length - 1;\n` +
          `    while (left <= right) {\n` +
          `        const mid = Math.floor((left + right) / 2);\n` +
          `        if (arr[mid] === target) return mid;\n` +
          `        if (arr[mid] < target) left = mid + 1;\n` +
          `        else right = mid - 1;\n` +
          `    }\n` +
          `    return -1;\n` +
          `}`,
        duration: 1200,
      },
      {
        content:
          `${FRAMES.prompt}Explain how to implement binary search in Python\n\n` +
          `${FRAMES.response}Binary search works on sorted arrays...\n` +
          `Here's the implementation:\n\n` +
          `def binary_search(arr, target):\n` +
          `    left, right = 0, len(arr) - 1\n` +
          `    while left <= right:\n` +
          `        mid = (left + right) // 2\n` +
          `        if arr[mid] == target:\n` +
          `            return mid\n` +
          `        elif arr[mid] < target:\n` +
          `            left = mid + 1\n` +
          `        else:\n` +
          `            right = mid - 1\n` +
          `    return -1\n\n` +
          `Time complexity: O(log n), Space: O(1)\n\n` +
          `${FRAMES.prompt}Now write one for JavaScript\n\n` +
          `${FRAMES.response}Sure! Here's the JavaScript version:\n\n` +
          `function binarySearch(arr, target) {\n` +
          `    let left = 0, right = arr.length - 1;\n` +
          `    while (left <= right) {\n` +
          `        const mid = Math.floor((left + right) / 2);\n` +
          `        if (arr[mid] === target) return mid;\n` +
          `        if (arr[mid] < target) left = mid + 1;\n` +
          `        else right = mid - 1;\n` +
          `    }\n` +
          `    return -1;\n` +
          `}\n\n` +
          `${FRAMES.separator}\n` +
          `  ⚡ Typing /compact...`,
        isTyping: true,
        typingSpeed: 60,
      },
      {
        content:
          `${FRAMES.response}[compacted summary]\n` +
          `User asked for binary search implementations.\n` +
          `Claude provided Python and JavaScript versions.\n` +
          `Both use O(log n) time, O(1) space.\n\n` +
          `  Session compact — conversation saved.\n` +
          `  Project files and CLAUDE.md still active.`,
        duration: 1500,
      },
    ],
  },

  {
    id: 'claude-md-memory',
    title: 'CLAUDE.md Memory',
    shortDescription: 'Persistent project memory across sessions',
    explanation: [
      'CLAUDE.md is a file in your project root that Claude reads every single time you start a new session. Think of it as persistent memory — Claude will know about your coding standards, architecture, preferences, and anything else you put there.',
      'It exists across sessions. Close the terminal, come back tomorrow — Claude still reads CLAUDE.md and remembers your preferences.',
      'Use it for: tech stack info, coding conventions, testing strategies, deployment notes, team conventions — anything you don\'t want to re-explain every session.',
      'You can have multiple CLAUDE.md files at different levels (workspace, home) and Claude aggregates all of them.',
    ],
    frames: [
      {
        content:
          `${FRAMES.prompt}Write me a CLAUDE.md for this project\n\n` +
          `${FRAMES.response}I'll create a CLAUDE.md with your project context:\n\n` +
          `${FRAMES.cmd('$ cat > CLAUDE.md')}\n\n` +
          `# Project: API Server\n` +
          `## Tech Stack\n` +
          `- TypeScript + Express\n` +
          `- PostgreSQL with Prisma ORM\n` +
          `- Jest for testing\n\n` +
          `## Conventions\n` +
          `- Async/await only, no .then() chains\n` +
          `- RESTful APIs, no GraphQL\n` +
          `- Error handling with custom Error classes\n`,
        isTyping: true,
        typingSpeed: 15,
      },
      {
        content:
          `${FRAMES.separator}\n` +
          `  NEW SESSION — Next day...\n` +
          `${FRAMES.separator}\n\n` +
          `${FRAMES.prompt}Add a new users endpoint\n\n` +
          `${FRAMES.response}I see this is a TypeScript + Express project\n` +
          `using Prisma. I'll follow your conventions:\n` +
          `- Using async/await\n` +
          `- RESTful pattern\n` +
          `- Custom error handling\n\n` +
          `CLAUDE.md tells me how you want this done!`,
        duration: 1500,
      },
    ],
  },

  {
    id: 'plan-mode',
    title: 'Plan Mode',
    shortDescription: 'Shift+Tab to think before acting',
    explanation: [
      'Plan mode lets you ask Claude to think through a problem and lay out a plan before making any file changes. This is great for complex tasks where you want to review the approach first.',
      'Toggle plan mode with Shift+Tab. When active, Claude can read files and propose changes but won\'t actually write anything until you approve.',
      'When you\'re happy with the plan, toggle plan mode off and Claude executes the approved plan.',
      'This is especially useful for: large refactors, multi-file changes, unfamiliar codebases, and when you want to understand before committing.',
    ],
    frames: [
      {
        content:
          `${FRAMES.cmd('📋 Plan Mode ON    [Shift+Tab]')}\n\n` +
          `${FRAMES.prompt}Refactor the auth middleware to use JWT\n` +
          `instead of session cookies\n\n` +
          `${FRAMES.response}[Planning — no files will be modified]\n\n` +
          `Here's my plan:\n\n` +
          `1. Install jsonwebtoken package\n` +
          `2. Update auth middleware:\n` +
          `   - Remove session cookie parsing\n` +
          `   - Add JWT verification with req.headers.authorization\n` +
          `   - Extract user from token payload\n` +
          `3. Update login route to return JWT token\n` +
          `4. Add JWT_SECRET to .env.example\n\n` +
          `Files affected: middleware/auth.ts, routes/login.ts\n` +
          `Estimated changes: ~45 lines across 2 files`,
        duration: 2000,
      },
      {
        content:
          `${FRAMES.cmd('📋 Plan Mode ON    [Shift+Tab]')}\n\n` +
          `${FRAMES.separator}\n` +
          `  Plan approved! Executing...\n` +
          `${FRAMES.separator}\n\n` +
          `${FRAMES.cmd('✏  Writing middleware/auth.ts')}\n` +
          `${FRAMES.cmd('✏  Writing routes/login.ts')}\n` +
          `${FRAMES.cmd('✏  Updating .env.example')}\n\n` +
          `${FRAMES.cmd('✓  Done — 3 files modified')}`,
        isTyping: true,
        typingSpeed: 100,
      },
    ],
  },

  {
    id: 'model-selection',
    title: 'Model Selection',
    shortDescription: 'When to use Sonnet vs Opus vs Haiku',
    explanation: [
      'Codeus offers multiple Claude models, each optimized for different tasks. Use /model to switch between them.',
      'Sonnet is the default — fast, capable, and great for most coding tasks. It offers a great balance of speed and intelligence.',
      'Opus is the most capable model — use it for complex reasoning, creative architecture design, or when Sonnet is struggling with a tricky problem.',
      'Haiku is the fastest and cheapest — great for quick checks, simple Q&A, and light tasks where you want instant responses.',
    ],
    frames: [
      {
        content:
          `${FRAMES.prompt}/model\n\n` +
          `${FRAMES.response}Select a model:\n\n` +
          `  ◉ Sonnet 4.6        ← currently selected\n` +
          `  ○ Opus 4.6          Best for complex reasoning\n` +
          `  ○ Haiku 4.5         Fastest for quick checks\n\n` +
          `  Use arrow keys + Enter to select\n` +
          `  Escape to cancel`,
        duration: 2000,
      },
      {
        content:
          `${FRAMES.prompt}/model\n\n` +
          `${FRAMES.response}Select a model:\n\n` +
          `  ○ Sonnet 4.6\n` +
          `  ◉ Opus 4.6          ← selected!\n` +
          `  ○ Haiku 4.5\n\n` +
          `${FRAMES.cmd('✓ Model set to Opus 4.6')}`,
        duration: 1500,
      },
    ],
  },

  {
    id: 'custom-slash-commands',
    title: 'Custom Slash Commands',
    shortDescription: 'Create your own commands with .md files',
    explanation: [
      'You can create custom slash commands by placing markdown files in the .claude/commands/ directory. Each file becomes a command named after the file.',
      'The content of the file becomes a system prompt injected when that command runs. It\'s a way to give Claude specific instructions on demand.',
      'You can pass arguments to your commands — they\'re substituted into the prompt, making your commands dynamic and reusable.',
      'Share commands across projects by putting them in your home directory\'s .claude/commands/ folder, or keep them project-specific.',
    ],
    frames: [
      {
        content:
          `${FRAMES.cmd('$ mkdir -p .claude/commands')}\n` +
          `${FRAMES.cmd('$ cat > .claude/commands/review.md')}\n\n` +
          `---\n` +
          `description: Review the current file\n` +
          `---\n\n` +
          `Review the code for:\n` +
          `1. Potential bugs\n` +
          `2. Performance issues\n` +
          `3. Code style violations\n` +
          `Be specific and suggest exact changes.`,
        isTyping: true,
        typingSpeed: 15,
      },
      {
        content:
          `${FRAMES.separator}\n` +
          `  Now try your custom command:\n` +
          `${FRAMES.separator}\n\n` +
          `${FRAMES.prompt}/review\n\n` +
          `${FRAMES.response}[Custom "review" command activated]\n` +
          `I'll review the current file for bugs, performance,\n` +
          `and style issues...\n\n` +
          `${FRAMES.cmd('✓ Custom commands ready!')}`,
        duration: 1500,
      },
    ],
  },

  {
    id: 'mcp-servers',
    title: 'MCP Servers',
    shortDescription: 'Extend Claude with external tools and APIs',
    explanation: [
      'MCP (Model Context Protocol) lets you connect external tools to Claude Code. Think of it as plugins — databases, REST APIs, browser automation, file systems — anything with an API.',
      'Once configured, tools appear automatically in Claude\'s tool palette. Claude knows when and how to use each one.',
      'Configure MCP servers in your ~/.claude.json file under the "mcpServers" key. Each server has a name and command to launch it.',
      'Popular MCP servers exist for PostgreSQL, GitHub, Slack, Google, filesystem browsing, web search, and more.',
    ],
    frames: [
      {
        content:
          `Adding an MCP server for PostgreSQL:\n\n` +
          `${FRAMES.cmd('$ cat >> ~/.claude.json')}\n\n` +
          `{\n` +
          `  "mcpServers": {\n` +
          `    "postgres": {\n` +
          `      "command": "npx",\n` +
          `      "args": ["-y", "@modelcontextprotocol/server-postgres",\n` +
          `        "postgresql://localhost/mydb"]\n` +
          `    }\n` +
          `  }\n` +
          `}`,
        isTyping: true,
        typingSpeed: 15,
      },
      {
        content:
          `${FRAMES.separator}\n` +
          `  MCP server "postgres" connected\n` +
          `${FRAMES.separator}\n\n` +
          `${FRAMES.prompt}Show me the users table schema\n\n` +
          `${FRAMES.response}[Using tool: postgres → query]\n` +
          `  SELECT column_name, data_type\n` +
          `  FROM information_schema.columns\n` +
          `  WHERE table_name = 'users';\n\n` +
          `Results:\n` +
          `  id         | uuid\n` +
          `  email      | varchar\n` +
          `  created_at | timestamp`,
        duration: 2000,
      },
    ],
  },

  {
    id: 'hooks-system',
    title: 'Hooks System',
    shortDescription: 'Automate scripts on Claude actions',
    explanation: [
      'Hooks let you run scripts automatically when Claude performs certain actions. For example: auto-format code after every file edit, lint after every write, or notify your team on significant changes.',
      'Configure hooks in CLAUDE.md or .claude.json. Each hook binds to an event (like "PostToolUse:Write") and runs a shell command.',
      'Common hooks: PostWrite (run linters/formatters), PreCompact (prep context before summarization), Notification events.',
      'Hooks run in the background — they don\'t block Claude from continuing. Use them for fast operations to avoid interrupting the flow.',
    ],
    frames: [
      {
        content:
          `Setting up auto-format on file writes:\n\n` +
          `${FRAMES.cmd('$ cat >> CLAUDE.md')}\n\n` +
          `## Hooks\n` +
          `- PostToolUse:Write: "npx prettier --write $\{_FILE}"\n` +
          `- PostToolUse:Edit: "npx eslint --fix $\{_FILE}"`,
        isTyping: true,
        typingSpeed: 15,
      },
      {
        content:
          `${FRAMES.separator}\n` +
          `  Testing the hook...\n` +
          `${FRAMES.separator}\n\n` +
          `${FRAMES.prompt}Fix the formatting in app.ts\n\n` +
          `${FRAMES.response}[Editing app.ts...]\n\n` +
          `${FRAMES.cmd('  📎 Hook triggered: PostToolUse:Edit')}\n` +
          `${FRAMES.cmd('  ✓ eslint --fix app.ts')}\n` +
          `${FRAMES.cmd('  ✓ 3 issues auto-fixed')}\n\n` +
          `${FRAMES.cmd('✓ Edit complete — hooks ran!')}`,
        duration: 2000,
      },
    ],
  },

  {
    id: 'multi-agent',
    title: 'Multi-Agent (Subagents)',
    shortDescription: 'Parallel task execution with agent spawning',
    explanation: [
      'Claude can spawn sub-agents to handle independent tasks in parallel. This is powerful for large jobs like searching multiple files, running tests in parallel, or investigating several leads simultaneously.',
      'Sub-agents run concurrently with their own context, meaning each one gets full access to Claude\'s capabilities without sharing conversation history with the main agent.',
      'Use sub-agents when: you have tasks that don\'t depend on each other, you need to search a large codebase, or one task would take too long sequentially.',
      'The main agent collects and synthesizes all sub-agent results into a single coherent response.',
    ],
    frames: [
      {
        content:
          `${FRAMES.prompt}Find all API endpoints across the\n` +
          `entire codebase and document them\n\n` +
          `${FRAMES.response}That's a big task — I'll spawn sub-agents\n` +
          `to search in parallel:\n\n` +
          `${FRAMES.cmd('🤖 Spawning 3 sub-agents...')}\n\n` +
          `  Agent 1: searching src/routes/...\n` +
          `  Agent 2: searching src/controllers/...\n` +
          `  Agent 3: searching src/api/...\n\n` +
          `${FRAMES.cmd('⠋⠙⠹⠸⠳⠯  Working in parallel...')}`,
        isTyping: true,
        typingSpeed: 120,
      },
      {
        content:
          `${FRAMES.response}[All sub-agents complete]\n\n` +
          `Here are all API endpoints found:\n\n` +
          `  Agent 1 (routes):     23 endpoints\n` +
          `  Agent 2 (controllers): 18 endpoints\n` +
          `  Agent 3 (api):         12 endpoints\n\n` +
          `  Total: 53 unique endpoints\n` +
          `  Full list written to endpoints.md`,
        duration: 2000,
      },
    ],
  },
]
