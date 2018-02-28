<template>
  <div class="root-info-wrapper">
    <ComponentInfo
      :component="component"
      :detail="true"
    />
    <ul>
      <Item
        class="item"
        :model="informations"
        :name="'components'"
      />
    </ul>
  </div>
</template>

<script>
import Item from './Item'
import ComponentInfo from './ComponentInfo'
import { configure } from './index'

export default {
  components: { Item, ComponentInfo },
  props: {
    component: {
      type: Object,
      required: true
    }
  },
  computed: {
    informations () {
      const components = {}
      this.searchComponents({ components, target: this.component, direct: true })
      const informations = {}
      const keys = Object.keys(components).sort()
      for (let key of keys) {
        const path = key.split('.vue')[0].replace(/\//g, '.')
        this.deepSet({ obj: informations, path, value: components[key] })
      }
      // return informations.src.components
      const rootPathList = configure.root.split('/')
      return rootPathList.reduce((p, c) => {
        return p[c] ? p[c] : p
      }, informations)
    }
  },
  methods: {
    deepSet ({ obj, path, value }) {
      const pathList = path.split('.')
      let current = obj
      pathList.forEach((path, i) => {
        if (!current[path]) {
          current[path] = {}
        }
        if (i === pathList.length - 1) {
          current[path] = value
        }
        current = current[path]
      })
    },
    searchComponents ({ components, target, direct = false }) {
      for (let key in target.components) {
        const child = target.components[key]
        const splitedPathList = child.__file.split('/')
        if (components[child.__file]) {
          components[child.__file].count++
        } else {
          components[child.__file] = {
            path: child.__file,
            name: splitedPathList[splitedPathList.length - 1].split('.')[0],
            count: 1,
            direct,
            component: child
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.root-info-wrapper {
  text-align: left;
  padding: .2em;
}
</style>

