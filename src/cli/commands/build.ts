import { defineCommand } from 'citty'
import { resolve } from 'pathe'
import { defu } from 'defu'
import { build, prepare } from '../../build'
import { commonArgs } from '../common'
import { loadOptions } from 'src/options'

export default defineCommand({
  meta: {
    name: 'build',
    description: 'Build nitro project for production'
  },
  args: {
    ...commonArgs
  },
  async run ({ args }) {
    const rootDir = resolve((args.dir || args._dir || '.') as string)
    const config = await loadOptions({ rootDir })
    await prepare()
    await build(defu(config, { tsup: { watch: false } }))
  }
})
