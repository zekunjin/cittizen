import { loadConfig } from 'c12'
import { defu } from 'defu'
import type { CtizenConfig } from './types'

const ctizenDefaults: CtizenConfig = {
  rootDir: '.',
  srcDir: '.',
  commands: 'commands',
  middleware: 'middleware',
  buildDir: '.ctizen',
  outputDir: '.output',
  tsup: {},
  unimport: {}
}

export const loadOptions = async (configOverrides: Partial<CtizenConfig> = { rootDir: '.' }) => {
  const c12Config = await loadConfig<CtizenConfig>({ name: 'ctizen', cwd: configOverrides.rootDir })
  return defu(c12Config.config, { rootDir: configOverrides.rootDir }, ctizenDefaults)
}
