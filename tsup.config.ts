import { defineConfig } from 'tsup'

export default defineConfig(options => ({
  entry: ['./src/index.ts', './src/cli/index.ts'],
  dts: true,
  format: ['esm'],
  minify: !options.watch
}))
