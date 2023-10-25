#!/usr/bin/env node
import { defineCommand, runMain } from 'citty'
import { name, version } from '../../package.json'

const main = defineCommand({
  meta: { name, version, description: 'Ctzen CLI' },
  subCommands: {
    dev: () => import('./commands/dev').then(r => r.default),
    build: () => import('./commands/build').then(r => r.default)
  }
})

runMain(main)
