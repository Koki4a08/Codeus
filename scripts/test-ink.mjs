#!/usr/bin/env bun
// Simple Ink rendering test - renders "Hello World" for 2 seconds then exits
// Writes diagnostics to stderr so they don't mix with Ink output
import { appendFileSync, writeFileSync } from 'node:fs'

const LOG = 'C:\\Temp\\ink-test.log'
writeFileSync(LOG, `=== Ink Test ${new Date().toISOString()} ===\n`)
const log = (msg) => appendFileSync(LOG, msg + '\n')

log(`isTTY: stdout=${process.stdout.isTTY} stdin=${process.stdin.isTTY}`)
log(`columns=${process.stdout.columns} rows=${process.stdout.rows}`)
log(`TERM_PROGRAM=${process.env.TERM_PROGRAM}`)
log(`WT_SESSION=${process.env.WT_SESSION}`)
log(`platform=${process.platform}`)

process.on('uncaughtException', (err) => {
  log(`UNCAUGHT: ${err?.stack ?? err}`)
})
process.on('unhandledRejection', (r) => {
  log(`REJECTION: ${r?.stack ?? r}`)
})

log('Creating Ink root...')
const { createRoot } = await import('../ink/root.js')
log('createRoot imported')

const root = await createRoot({ exitOnCtrlC: true })
log('root created')

const React = (await import('react')).default
const { Text, Box } = await import('../ink.js')
log('React imported')

log('Calling root.render...')
root.render(
  React.createElement(Box, { flexDirection: 'column', padding: 1 },
    React.createElement(Text, { color: 'green', bold: true }, '>>> INK TEST: Hello from Bun on Windows! <<<'),
    React.createElement(Text, null, `stdout.isTTY=${process.stdout.isTTY} columns=${process.stdout.columns}`),
    React.createElement(Text, { dimColor: true }, 'Press Ctrl+C to exit')
  )
)
log('root.render called')

// Auto-exit after 5 seconds
setTimeout(() => {
  log('Auto-exit timer fired')
  root.unmount()
}, 5000)

log('Waiting for exit...')
await root.waitUntilExit()
log('Exited cleanly')
