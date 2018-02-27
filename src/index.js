import RootInfo from './RootInfo.vue'

export const configure = {
  root: 'src/components',
  alias: {
    '@': 'src'
  },
  name: 'vinfo'
}

export default Component => {
  return () => ({
    components: { RootInfo },
    template: '<RootInfo :component="Component" />',
    data: () => ({
      Component
    })
  })
}
