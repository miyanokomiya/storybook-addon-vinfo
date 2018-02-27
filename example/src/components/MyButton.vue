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
  }
}
</script>

<style scoped>
button {
  background-color: blue;
  color: #fff;
}
</style>
