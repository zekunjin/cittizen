import { build as tsupBuild } from 'tsup'
import { defu } from 'defu'
import { join, relative } from 'pathe'
import Unimport from 'unimport/unplugin'
import { CtizenConfig } from './types'

export const build = ({ rootDir, tsup, unimport }: CtizenConfig) => {
  const tsupConfig = defu(tsup ?? {}, {})
  const unimportConfig = defu(unimport ?? {}, {
    dts: true,
    dirs: [relative('.', join(rootDir ?? '.', 'src', 'commands', '*'))]
  })

  return tsupBuild({
    ...tsupConfig,

    esbuildPlugins: [
      Unimport.esbuild(unimportConfig)
    ]
  })
}
