import { configure } from '@storybook/vue'
import { storiesOf } from '@storybook/vue'
import cinfo, { configure as cinfoConfigure } from 'storybook-addon-vinfo'

cinfoConfigure.root = 'src/components'
cinfoConfigure.name = 'vinfo'
const reqVue = require.context('../src/components', true, /\.vue$/)
const addStories = () => {
  reqVue.keys().forEach(filename => {
    storiesOf(cinfoConfigure.name + filename.slice(1), module).add(
      '_vinfo',
      cinfo(reqVue(filename).default)
    )
  })
}
configure(addStories, module)
