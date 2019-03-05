<template>
    <div>
      <el-button @click="test()" type="danger">
        Start Game
      </el-button>
      <div id="container"></div>
    </div>
</template>

<script>
import constant from 'game_render/js/utils/Constant'
import Phaser from 'game_render/js/phaser'
import LoadingScene from 'game_render/js/scenes/LoadingScene'
import GameScene from 'game_render/js/scenes/GameScene'
import StartScene from 'game_render/js/scenes/StartScene'
import dataGame from 'game_render/data'

export default {
  name: 'GameRender',
  data () {
    return {
      game: {}
    }
  },
  created () {
    let config = {
      type: Phaser.AUTO,
      width: constant.MAP_WIDTH * constant.SCALE,
      height: constant.MAP_HEIGHT * constant.SCALE,
      parent: 'container',
      scene: [LoadingScene, StartScene, GameScene]
      // scene: {
      //   init: LoadingScene,
      //   preload: StartScene,
      //   create: GameScene
      // }
    }
    this.game = new Phaser.Game(config)
  },
  methods: {
    test: function () {
      console.log(dataGame)

      this.game.scene.stop('StartScene')
      this.game.scene.stop('GameScene')
      this.game.scene.run('StartScene', dataGame)
    }
  }
}
</script>

<style scoped>

</style>
