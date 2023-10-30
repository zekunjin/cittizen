import { defineCommand as defineCittyCommand } from 'citty'
import { CtizenConfig } from './types'

export type Middleware = () => Promise<boolean | void> | void | boolean

export const defineConfig = (config: Partial<CtizenConfig>) => config

export const defineMiddleware = (middleware: Middleware) => middleware

export interface CommandMeta {
  middlewares: Middleware[]
}

export const defineCommand = (def: Parameters<typeof defineCittyCommand>['0']) => (meta?: Partial<CommandMeta>) => {
  const _middlewares = meta?.middlewares ?? []
  if (!_middlewares.length || !def.run) { return defineCittyCommand(def) }

  const run = async (ctx: any) => {
    const results = await Promise.all(_middlewares.map(m => m()))
    const isValidate = !results.includes(false)
    if (!isValidate) { return }
    return def.run?.(ctx)
  }

  return defineCittyCommand({ ...def, run })
}
