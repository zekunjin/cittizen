import { defineCommand } from 'citty'
import { resolve } from 'pathe'
import { build } from '../../build'
import { commonArgs } from '../common'

export default defineCommand({
  meta: {
    name: 'dev',
    description: 'Start the development server'
  },
  args: {
    ...commonArgs
  },
  async run ({ args }) {
    const rootDir = resolve((args.dir || args._dir || '.') as string)
    await build({ rootDir, tsup: { watch: true } })
  }
})
