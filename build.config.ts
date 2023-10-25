import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  declaration: true,
  name: 'cittizen',
  entries: [
    'src/index',
    'src/cli/index'
  ]
})
