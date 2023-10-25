import { build as tsupBuild } from 'tsup'
import { defu } from 'defu'
import { join } from 'pathe'
import Unimport from 'unimport/unplugin'
import { Ctzen } from './types'

interface BuildOptions extends Ctzen {
  rootDir: string
}

export const build = ({ rootDir, tsup, unimport }: BuildOptions) => {
  const tsupConfig = defu(tsup ?? {}, {})
  const unimportConfig = defu(unimport ?? {}, {
    dirs: [join(rootDir, 'src', 'commands', '*')]
  })

  return tsupBuild({
    ...tsupConfig,

    esbuildPlugins: [
      Unimport.esbuild(unimportConfig)
    ]
  })
}
