import type { Options as TsupOptions } from 'tsup'
import type { UnimportPluginOptions } from 'unimport/unplugin'

export interface CtzenConfig {
  rootDir?: string
  tsup?: Partial<TsupOptions>
  unimport?: Partial<UnimportPluginOptions>
}
