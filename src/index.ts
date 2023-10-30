import { type CommandContext, defineCommand as defineCittyCommand } from 'citty'
import { CtizenConfig } from './types'

export type Middleware = (context?: CommandContext) => Promise<boolean | void> | void | boolean

export const defineConfig = (config: Partial<CtizenConfig>) => config

export const defineMiddleware = (middleware: Middleware) => middleware

export interface CommandMeta {
  middlewares: Middleware[]
}

export const defineCommand = (def: Parameters<typeof defineCittyCommand>['0']) => (meta?: Partial<CommandMeta>) => {
  const _middlewares = meta?.middlewares ?? []
  if (!_middlewares.length || !def.run) { return defineCittyCommand(def) }

  const run = async (ctx: CommandContext) => {
    const results = await Promise.all(_middlewares.map(m => m(ctx)))
    const isValidate = !results.includes(false)
    if (!isValidate) { return }
    return def.run?.(ctx)
  }

  return defineCittyCommand({ ...def, run })
}
