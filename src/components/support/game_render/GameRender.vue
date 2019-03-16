<template>
    <div>
      <el-button @click="test()" type="danger" :disabled="this.disabled">
        Start Game
      </el-button>
      <div id="container"></div>
    </div>
</template>

<script>
import Axios from 'axios'
import constant from 'game_render/js/utils/Constant'
import Phaser from 'game_render/js/phaser'
import LoadingScene from 'game_render/js/scenes/LoadingScene'
import GameScene from 'game_render/js/scenes/GameScene'
import StartScene from 'game_render/js/scenes/StartScene'

export default {
  name: 'GameRender',
  data () {
    return {
      dataGame: {},
      id: '',
      game: {},
      disabled: true
    }
  },
  created () {
    this.id = this.$route.params.id
    Axios({
      url: 'http://localhost:3000/log', data: {id: this.id}, method: 'POST'
    })
      .then((resp) => {
        if (resp.data) {
          this.dataGame = JSON.parse(JSON.stringify(resp.data))
          this.notifySuccess('Success', 'Data loaded!')
        } else {
          this.notifyFailed('Failed', 'Data not loaded!')
        }
        this.disabled = false
      })
      .catch((err) => {
        this.notifyFailed('Failed', 'Network error!')
        console.log(err)
      })
    require('../../../../node_modules/game_render/assets/scene/start.jpg')
    let config = {
      type: Phaser.AUTO,
      width: constant.MAP_WIDTH * constant.SCALE,
      height: constant.MAP_HEIGHT * constant.SCALE,
      parent: 'container',
      scene: [LoadingScene, StartScene, GameScene]
    }
    this.game = new Phaser.Game(config)
  },
  methods: {
    test: function () {
      this.game.scene.stop('StartScene')
      this.game.scene.stop('GameScene')
      this.game.scene.run('StartScene', this.dataGame)
    },
    notifySuccess: function (title, message) {
      this.$notify({
        title: title,
        message: message,
        type: 'success'
      })
    },
    notifyFailed: function (title, message) {
      this.$notify.error({
        title: title,
        message: message
      })
    }
  }
}
</script>

<style scoped>

</style>
