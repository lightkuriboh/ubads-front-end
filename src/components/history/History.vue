<template>
  <div>
    <el-card class="history-card">
      <div slot="header"><b>History</b></div>
      <div style="margin-bottom: 20px">
        <el-radio v-model="filterOptions.isFiltered" label="1">My Fights</el-radio>
        <el-radio v-model="filterOptions.isFiltered" label="2">All Fights</el-radio>
        <el-select
          v-model="filterOptions.game"
          placeholder="Filter as a game"
          style="margin-left: 20px; margin-right: 20px"
        >
          <el-option
            v-for="game in games"
            :key="game"
            :label="game"
            :value="game"
          ></el-option>
        </el-select>
      </div>
      <HistoryTable :filter="filterOptions"/>
    </el-card>
  </div>
</template>

<script>
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
    this.games.splice(0, 0, '')
  }
}
</script>

<style>
.history-card {
  width: 85%;
  margin: 0 auto;
}
.el-table .success-row {
  /*background-color: #f4ffef;*/
  color: #3da517;
}
.el-table .warning-row {
  /*background-color: #fffbef;*/
  color: #d66520;
}
.el-table .danger-row {
  /*background-color: #ffefef;*/
  color: #d62020;
}
.el-table .info-row {
  /*background-color: #faefff;*/
  color: #8420d6;
}
</style>
