const path = require('path')
const utils = require('../build/utils')
const config = require('../config')

module.exports = {
  resolve: {
    extensions: ['.js', '.vue', 'json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: []
  }
}
