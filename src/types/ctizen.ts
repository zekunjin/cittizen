import type { Options as TsupOptions } from 'tsup'
import type { UnimportPluginOptions } from 'unimport/unplugin'

export interface CtizenConfig {
  rootDir: string
  srcDir: string
  commands: string
  middleware: string
  buildDir: string
  outputDir: string
  tsup: Partial<TsupOptions>
  unimport: Partial<UnimportPluginOptions>
}
