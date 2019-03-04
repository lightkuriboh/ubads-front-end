<template>
    <div>
      <div id="container"></div>
      <el-button @click="test()" type="danger">
        Start Game
      </el-button>
    </div>
</template>

<script>
import constant from 'game_render/utils/Constant'

export default {
  name: 'GameRender',
  data () {
    return {
    }
  },
  created () {
    // let scripts = [
    //   'https://cdn.jsdelivr.net/npm/phaser@3.11.0/dist/phaser.js'
    // ]
    // for (let srcScript of scripts) {
    //   let script = document.createElement('script')
    //   script.setAttribute('src', srcScript)
    //   document.head.appendChild(script)
    // }
  },
  methods: {
    test: function () {
      console.log(constant)
    }
  }
}
</script>

<style scoped>

</style>
