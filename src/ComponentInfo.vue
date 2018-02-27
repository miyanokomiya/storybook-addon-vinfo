<template>
  <div class="file-box">
    <dl class="info-item" v-if="name">
      <dt class="info-title"><strong>Name</strong></dt>
      <dd><a href="#" @click.prevent="linkTo">{{name}}</a></dd>
    </dl>
    <dl class="info-item">
      <dt class="info-title"><strong>Import</strong></dt>
      <dd><code class="copy" @click="execCopy(importStr)">{{importStr}}</code></dd>
    </dl>
    <dl class="info-item" v-if="detail">
      <dt class="info-title"><strong>Example</strong></dt>
      <dd><code class="copy" @click="execCopy(example)">{{example}}</code></dd>
    </dl>
    <dl class="info-item">
      <dt class="info-title"><strong>Props</strong></dt>
      <dd>
        <table class="props-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Required</th>
              <th>Default</th>
              <th>Raw</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(prop, name) in component.props" :key="name">
              <td><strong>{{name}}</strong></td>
              <td>{{prop.type ? prop.type.name : ''}}</td>
              <td>{{prop.required}}</td>
              <td>{{getDefaultProp(prop)}}</td>
              <td>{{raw(prop)}}</td>
            </tr>
          </tbody>
        </table>
      </dd>
    </dl>
  </div>
</template>

<script>
import { linkTo } from '@storybook/addon-links'
import { configure } from './index'

export default {
  props: {
    component: {
      type: Object,
      required: true
    },
    detail: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    name () {
      const splitedPathList = this.component.__file.split('/')
      return splitedPathList[splitedPathList.length - 1].split('.')[0]
    },
    namespace () {
      const aliased = Object.keys(configure.alias).reduce((p, c) => {
        if (p.indexOf(configure.alias[c] === 0)) {
          p = c + p.slice(configure.alias[c].length)
        }
        return p
      }, this.component.__file)
      const splitedPathList = aliased.split('/')
      return splitedPathList.slice(0, -1).join('/')
    },
    importStr () {
      return `import ${this.name} from '${this.namespace}/${this.name}'`
    },
    example () {
      const propList = this.component.props ? Object.keys(this.component.props) : []
      if (propList.length > 0) {
        let tag = `<${this.name}`
        for (let name of propList) {
          tag += `\n  :${name}="${name}"`
        }
        tag += '\n/>'
        return tag
      } else {
        return `<${this.name} />`
      }
    }
  },
  methods: {
    isDefaultPropReturnValue (prop) {
      return typeof prop.default === 'function' && prop.type !== Function
    },
    getDefaultProp (prop) {
      return this.isDefaultPropReturnValue(prop) ? prop.default() : JSON.stringify(prop.default)
    },
    linkTo () {
      linkTo(configure.name + this.component.__file.slice(configure.root.length))()
    },
    raw (prop) {
      return JSON.stringify(prop, null, ' ')
    },
    execCopy (string) {
      var temp = document.createElement('div')
      temp.appendChild(document.createElement('pre')).textContent = string
      var s = temp.style
      s.position = 'fixed'
      s.left = '-100%'
      document.body.appendChild(temp)
      document.getSelection().selectAllChildren(temp)
      var result = document.execCommand('copy')
      document.body.removeChild(temp)
      // true なら実行できている falseなら失敗か対応していないか
      return result
    }
  }
}
</script>

<style scoped>
.file-box {
  padding: 4px;
  border-radius: 2px;
}
.info-item {
  display: flex;
  margin: 4px 2px;
}
.info-title {
  margin-right: 6px;
  width: 4.3em;
}
.props-table {
  background-color: #fff;
}
tr:nth-child(even){
  background:#F2F2F2;
}
th{
  background:#222222;
  color:white;
}
th:nth-child(odd){
  background:#444444;
}
th,td{
  padding: 0 10px;
}
.copy {
  cursor: pointer;
}
.copy:active {
  opacity: 0.7;
}
</style>

