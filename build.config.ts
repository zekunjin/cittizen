import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  declaration: true,
  name: 'ctzen',
  entries: [
    'src/index',
    'src/cli/index'
  ]
})
