import { promises as fsp } from 'node:fs'
import { build as tsupBuild } from 'tsup'
import { defu } from 'defu'
import { basename, extname, join, relative } from 'pathe'
import fse from 'fs-extra'
import { globby } from 'globby'
import { camelCase } from 'scule'
import Unimport from 'unimport/unplugin'
import type { CtizenConfig } from './types'
import { cittyImports } from './imports'

const entrypointTemplate = async (conf: CtizenConfig) => {
  const srcDir = join(conf.rootDir, conf.srcDir)
  const commandsDir = join(srcDir, conf.commands, '*')
  const paths = await globby(commandsDir)
  const subCommands: string[] = []

  paths.forEach((path) => {
    const key = basename(path, extname(path))
    subCommands.push(`${camelCase(key)}: import('${path}').then(r => r.default)`)
  })

  const content = `const main = defineCommand({ meta: { name, version, description }, subCommands: { ${subCommands.join(',')} } })`

  const codes = [
    '#!/usr/bin/env node',
    'import { defineCommand, runMain } from \'citty\'',
    'import { description, name, version } from \'../package.json\'',
    content,
    'runMain(main)'
  ]

  return codes.join('\n')
}

export const prepare = async (conf: CtizenConfig) => {
  await prepareDir(conf.buildDir)
  await fse.ensureFile(join(conf.buildDir, 'index.ts'))
  const entrypoint = await entrypointTemplate(conf)
  await fse.writeFile(join(conf.buildDir, 'index.ts'), entrypoint)
}

const prepareDir = async (dir: string) => {
  await fsp.mkdir(dir, { recursive: true })
  await fse.emptyDir(dir)
}

const relativeGlobDir = (path: string) => relative('.', join(path, '*'))

export const build = (conf: CtizenConfig) => {
  const srcDir = join(conf.rootDir, conf.srcDir)
  const commandsDir = join(srcDir, conf.commands)
  const middlewareDir = join(srcDir, conf.middleware)
  const entrypointDir = join(conf.buildDir, 'index.ts')

  const tsupConfig = defu(conf.tsup, { entry: [entrypointDir], outDir: conf.outputDir })
  const unimportConfig = defu(conf.unimport, {
    dts: true,
    presets: [...cittyImports],
    dirs: [relativeGlobDir(commandsDir), relativeGlobDir(middlewareDir)]
  })

  return tsupBuild({
    ...tsupConfig,

    esbuildPlugins: [
      Unimport.esbuild(unimportConfig)
    ]
  })
}
