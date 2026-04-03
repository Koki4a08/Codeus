#!/usr/bin/env bun
// Debug the full startup chain to find where it gets stuck
import { appendFileSync, writeFileSync, createWriteStream } from 'node:fs'

const LOG = 'C:\\Temp\\startup-debug.log'
writeFileSync(LOG, `=== Startup Debug ${new Date().toISOString()} ===\n`)
const log = (msg) => appendFileSync(LOG, msg + '\n')

process.on('uncaughtException', (err) => {
  log(`UNCAUGHT: ${err?.stack ?? err}`)
  process.exit(1)
})
process.on('unhandledRejection', (r) => {
  log(`REJECTION: ${r?.stack ?? r}`)
})

// Intercept all stdout writes to see what's being written
const originalWrite = process.stdout.write.bind(process.stdout)
let stdoutBytes = 0
process.stdout.write = function(chunk, ...args) {
  if (typeof chunk === 'string') {
    stdoutBytes += chunk.length
    // Log first few writes
    if (stdoutBytes < 2000) {
      log(`STDOUT[${stdoutBytes}]: ${JSON.stringify(chunk.slice(0, 100))}`)
    }
  }
  return originalWrite(chunk, ...args)
}

// Read config
const path = await import('node:path')
const fs = await import('node:fs')
const configPath = path.default.join(process.env.USERPROFILE, '.claude.json')
try {
  const config = JSON.parse(fs.default.readFileSync(configPath, 'utf8'))
  log(`Config - theme: ${config.theme}`)
  log(`Config - hasCompletedOnboarding: ${config.hasCompletedOnboarding}`)
  const prj = config.projects?.['C:/Users/KokoG/Documents/claude-code']
  log(`Config - trust: ${prj?.hasTrustDialogAccepted}`)
} catch(e) {
  log(`Config read error: ${e}`)
}

log('Importing main entrypoint...')
await import('../entrypoints/cli.tsx')
log('Import returned (should not reach in interactive mode)')
