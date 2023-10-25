import { loadConfig } from 'c12'
import { defu } from 'defu'
import { CtizenConfig } from './types'

export const loadOptions = async (configOverrides: CtizenConfig = { rootDir: '.' }) => {
  const c12Config = await loadConfig<CtizenConfig>({ name: 'ctizen', cwd: configOverrides.rootDir })
  return defu(c12Config, { rootDir: configOverrides.rootDir })
}
