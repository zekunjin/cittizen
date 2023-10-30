import { createHooks } from 'hookable'
import { CtizenConfig } from './types'

export type Middleware = () => Promise<boolean | void> | void | boolean

const hooks = createHooks()
let _middlewares: Middleware[] = []

hooks.hook('insert:middleware', (...args: Middleware[]) => { _middlewares = [..._middlewares, ...args] })

export const defineConfig = (config: Partial<CtizenConfig>) => config

export const defineMiddleware = (middleware: Middleware) => { hooks.callHook('insert:middleware', middleware) }
