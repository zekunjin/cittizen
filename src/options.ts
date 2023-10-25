import { loadConfig } from 'c12'
import { defu } from 'defu'
import { CtzenConfig } from './types'

export const loadOptions = async (configOverrides: CtzenConfig = { rootDir: '.' }) => {
  const c12Config = await loadConfig<CtzenConfig>({ name: 'ctzen', cwd: configOverrides.rootDir })
  return defu(c12Config, { rootDir: configOverrides.rootDir })
}
