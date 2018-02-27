<template>
<button>{{msg}}</button>
</template>

<script>
export default {
  name: 'MyButton',
  data () {
    return {
      msg: 'Button !'
    }
  },
  props: {
    label: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
button {
  background-color: blue;
  color: #fff;
}
</style>
