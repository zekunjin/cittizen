import { promises as fsp } from 'node:fs'
import { build as tsupBuild } from 'tsup'
import { defu } from 'defu'
import { join, relative } from 'pathe'
import fse from 'fs-extra'
import Unimport from 'unimport/unplugin'
import type { CtizenConfig } from './types'
import { cittyImports } from './imports'

export const prepare = async () => {
  await prepareDir('.ctizen')
}

const prepareDir = async (dir: string) => {
  await fsp.mkdir(dir, { recursive: true })
  await fse.emptyDir(dir)
}

export const build = (conf: CtizenConfig) => {
  const srcDir = join(conf.rootDir, conf.srcDir)
  const commandsDir = join(srcDir, 'commands')

  const tsupConfig = defu(conf.tsup, {})
  const unimportConfig = defu(conf.unimport, {
    dts: true,
    presets: [...cittyImports],
    dirs: [relative('.', join(commandsDir, '*'))]
  })

  return tsupBuild({
    ...tsupConfig,

    esbuildPlugins: [
      Unimport.esbuild(unimportConfig)
    ]
  })
}
