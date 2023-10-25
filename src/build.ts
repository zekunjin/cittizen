import { promises as fsp } from 'node:fs'
import { build as tsupBuild } from 'tsup'
import { defu } from 'defu'
import { join, relative } from 'pathe'
import fse from 'fs-extra'
import Unimport from 'unimport/unplugin'
import type { CtizenConfig } from './types'

export const prepare = async () => {
  await prepareDir('.ctizen')
}

const prepareDir = async (dir: string) => {
  await fsp.mkdir(dir, { recursive: true })
  await fse.emptyDir(dir)
}

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
