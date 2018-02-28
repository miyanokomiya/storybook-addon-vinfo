<template>
  <li class="item-wrapper">
    <div :class="{bold: isFolder}">
      <span @click="toggle" v-if="isFolder" class="folder-box">{{ name }} [{{ open ? '-' : '+' }}]</span>
      <ComponentInfo
        v-else
        :component="model.component"
        :name="name"
      />
    </div>
    <ul v-show="open" v-if="isFolder" class="drop-box">
      <Item
        v-for="(model, key) in model"
        :key="key"
        :name="key"
        :model="model"
      />
    </ul>
  </li>
</template>

<script>
import ComponentInfo from './ComponentInfo'

export default {
  name: 'Item',
  components: {
    ComponentInfo
  },
  props: {
    model: Object,
    name: String
  },
  data: () => ({
    open: true
  }),
  computed: {
    isFolder () {
      return !this.model.name
    }
  },
  methods: {
    toggle () {
      if (this.isFolder) {
        this.open = !this.open
      }
    }
  }
}
</script>

<style scoped>
.item-wrapper {
  background-color: #eee;
  border: solid 1px #aaa;
  margin: 5px;
  border-radius: 2px;
  list-style-type: none;
}
.folder-box {
  padding: 4px;
  font-size: 1.2em;
  cursor: pointer;
  font-size: .8em;
}
.drop-box {
  padding-left: 1em;
  line-height: 1.5em;
}
</style>

