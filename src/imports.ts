import type { Preset } from 'unimport'

export const cittyImports: Preset[] = [
  {
    from: 'citty',
    imports: [
      'defineCommand',
      'runCommand',
      'parseArgs',
      'renderUsage',
      'showUsage'
    ]
  },
  {
    from: 'ctizen',
    imports: [
      'defineConfig',
      'defineMiddleware'
    ]
  }
]
