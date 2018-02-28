import { configure, storiesOf } from '@storybook/vue'
import vinfo, { configure as vinfoConfigure } from 'storybook-addon-vinfo'

vinfoConfigure.root = 'src/components'
vinfoConfigure.name = 'vinfo'
vinfoConfigure.alias = {
  '@': 'src'
}
const reqVue = require.context('../src/components', true, /\.vue$/)
const addStories = () => {
  reqVue.keys().forEach(filename => {
    storiesOf(vinfoConfigure.name + filename.slice(1), module).add(
      '_vinfo',
      vinfo(reqVue(filename).default)
    )
  })
}
configure(addStories, module)
