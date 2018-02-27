import { configure } from '@storybook/vue'
import { storiesOf } from '@storybook/vue'
import vinfo, { configure as vinfoConfigure } from 'storybook-addon-vinfo'

vinfoConfigure.root = 'src/components'
vinfoConfigure.name = 'vinfo'
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
