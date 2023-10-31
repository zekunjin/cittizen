import { type CommandContext } from 'citty'
import { CtizenConfig } from './types'

export type Middleware = (context?: CommandContext) => Promise<boolean | void> | void | boolean

export const defineConfig = (config: Partial<CtizenConfig>) => config

export const defineMiddleware = (middleware: Middleware) => middleware

export interface CommandMeta {
  middleware: Middleware[]
}
