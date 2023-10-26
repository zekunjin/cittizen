import { defineCommand } from 'citty'
import { resolve } from 'pathe'
import { defu } from 'defu'
import { build, prepare } from '../../build'
import { commonArgs } from '../common'
import { loadOptions } from 'src/options'

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
    const config = await loadOptions({ rootDir })
    await prepare(config)
    await build(defu(config, { tsup: { watch: true } }))
  }
})
