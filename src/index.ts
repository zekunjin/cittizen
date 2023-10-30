import { createHooks } from 'hookable'
import { defineCommand as defineCittyCommand } from 'citty'
import { CtizenConfig } from './types'

export type Middleware = () => Promise<boolean | void> | void | boolean

const hooks = createHooks()
let _middlewares: Middleware[] = []

hooks.hook('insert:middleware', (...args: Middleware[]) => { _middlewares = [..._middlewares, ...args] })

export const defineConfig = (config: Partial<CtizenConfig>) => config

export const defineMiddleware = (middleware: Middleware) => { hooks.callHook('insert:middleware', middleware) }

export const defineCommand = (args: Parameters<typeof defineCittyCommand>['0']) => {
  if (!_middlewares.length || !args.run) { return defineCittyCommand(args) }

  const run = async (ctx: any) => {
    const results = await Promise.all(_middlewares.map(m => m()))
    const isValidate = !results.includes(false)
    if (!isValidate) { return }
    return args.run?.(ctx)
  }

  defineCittyCommand({ ...args, run })
}
