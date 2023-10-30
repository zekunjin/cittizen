import type { Preset } from 'unimport'

export const cittyImports: Preset[] = [
  {
    from: 'citty',
    imports: [
      'runCommand',
      'parseArgs',
      'renderUsage',
      'showUsage'
    ]
  },
  {
    from: 'ctizen',
    imports: [
      'defineCommand'
    ]
  }
]
