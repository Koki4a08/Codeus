#!/usr/bin/env bun
// Debug launch: captures all errors and output to a file
import { writeFileSync, appendFileSync } from 'node:fs'

const LOG = 'C:\\Temp\\claude-debug.log'
writeFileSync(LOG, `=== Debug Launch ${new Date().toISOString()} ===\n`)

function log(msg) {
  appendFileSync(LOG, msg + '\n')
  console.error(msg)
}

// Intercept unhandled rejections and exceptions
process.on('uncaughtException', (err) => {
  log(`UNCAUGHT EXCEPTION: ${err?.stack || err}`)
})
process.on('unhandledRejection', (reason) => {
  log(`UNHANDLED REJECTION: ${reason?.stack || reason}`)
})

log(`stdout.isTTY: ${process.stdout.isTTY}`)
log(`stdin.isTTY: ${process.stdin.isTTY}`)
log(`stdout.columns: ${process.stdout.columns}`)
log(`stdout.rows: ${process.stdout.rows}`)
log(`platform: ${process.platform}`)
log(`TERM: ${process.env.TERM}`)
log(`COLORTERM: ${process.env.COLORTERM}`)
log(`TERM_PROGRAM: ${process.env.TERM_PROGRAM}`)

try {
  log('Importing main...')
  await import('../entrypoints/cli.tsx')
  log('Import completed (should not reach here in interactive mode)')
} catch (err) {
  log(`IMPORT ERROR: ${err?.stack || err}`)
}
