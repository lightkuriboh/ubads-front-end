<template>
  <div>
    <el-card class="history-card">
      <div slot="header"><b>History</b></div>
      <div style="margin-bottom: 20px">
        <el-radio v-model="filterOptions.isFiltered" label="1"><b>
          My Fights
        </b></el-radio>
        <el-radio v-model="filterOptions.isFiltered" label="2"><b>
          All Fights
        </b></el-radio>
        <el-select
          v-model="filterOptions.game"
          placeholder="Filter as a game"
          style="margin-left: 20px; margin-right: 20px"
        >
          <el-option
            v-for="game in games"
            :key="game.id"
            :label="game.name"
            :value="game.id"
          ></el-option>
        </el-select>
      </div>
      <HistoryTable :filter="filterOptions"/>
    </el-card>
  </div>
</template>

<script>
import Axios from 'axios'
import HistoryTable from './history_table/HistoryTable'
export default {
  name: 'History',
  components: {
    HistoryTable
  },
  data () {
    return {
      filterOptions: {
        isFiltered: '2',
        game: ''
      },
      games: [
        'Bomber',
        'Racing'
      ]
    }
  },
  created () {
    this.games = []
    Axios({
      url: 'http://localhost:3000/game', data: {}, method: 'GET'
    })
      .then((resp) => {
        let str = JSON.stringify(resp.data)
        let gameList = JSON.parse(str)
        for (let i = 0; i < gameList.length; i++) {
          let value = gameList[i]
          this.games.push(value)
        }
        this.games.splice(0, 0, '')
      })
      .catch((err) => {
        this.notifyFailed('Failed', 'Network errors!')
        console.log(err)
      })
  }
}
</script>

<style scoped>
.history-card {
  width: 85%;
  margin: 0 auto;
}
</style>
