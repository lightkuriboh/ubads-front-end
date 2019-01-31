<template>
  <div>
    <el-table
      :data="filterMyFights"
      :row-class-name="tableRowClassName"
      style="width:100%; font-style: italic"
      border
    >
      <el-table-column
        prop="id"
        label="FightID"
      >
      </el-table-column>
      <el-table-column
        prop="game"
        label="Game"
      >
      </el-table-column>
      <el-table-column
        prop="attacker"
        label="Attacker"
      >
      </el-table-column>
      <el-table-column
        prop="defender"
        label="Defender"
      >
      </el-table-column>
      <el-table-column
        prop="result"
        label="Result"
      >
      </el-table-column>
      <el-table-column
        prop="time"
        label="Time"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="Details"
      >
        <template slot-scope="scope">
          <el-button @click="clickLog(scope.row)" size="small">Log</el-button>
          <el-button @click="clickView(scope.row)" size="small">View</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="this.historyData.length"
      :page-size="this.rowsEachPage"
      @current-change="pageChange"
      style="margin-top: 20px"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'HistoryTable',
  props: [
    'filter'
  ],
  data () {
    return {
      currentPage: 1,
      rowsEachPage: 5,
      numberOfRows: 0,
      historyData: [
        {
          id: '0',
          game: 'Bomber',
          attacker: 'lightkuriboh',
          defender: 'Hekl0',
          result: 200,
          time: '21/01/1999'
        },
        {
          id: '1',
          game: 'Bomber',
          attacker: 'Hekl0',
          defender: 'Computer',
          result: '8/10',
          time: '04/01/1999'
        },
        {
          id: '2',
          game: 'Bomber',
          attacker: 'ILoveBaoNgoc',
          defender: 'Kuribog',
          result: -200,
          time: '06/09/1999'
        },
        {
          id: '3',
          game: 'Bomber',
          attacker: 'lightkuriboh',
          defender: 'ILoveBaoNgoc',
          result: '!Bot error!',
          time: '06/09/1999'
        },
        {
          id: '4',
          game: 'Racing',
          attacker: 'lightkuriboh',
          defender: 'ILoveBaoNgoc',
          result: 312,
          time: '06/09/1999'
        }
      ]
    }
  },
  created () {
    this.numberOfRows = this.historyData.length
    this.historyData = this.historyData.reverse()
  },
  computed: {
    filterMyFights: function () {
      let finalData = this.historyData
      let that = this
      if (this.filter.isFiltered === '1') {
        finalData = finalData.filter(function (item) {
          let myName = that.$store.getters.getUsername
          // console.log(myName)
          return item.attacker === myName || item.defender === myName
        })
      }
      if (this.filter.game.length > 0) {
        finalData = finalData.filter(function (item) {
          let myGame = that.filter.game
          return item.game === myGame
        })
      }
      let startIndex = this.rowsEachPage * (this.currentPage - 1)
      let finishIndex = Math.min(finalData.length, startIndex + this.rowsEachPage)
      return finalData.slice(startIndex, finishIndex)
    }
  },
  methods: {
    pageChange: function (pageNumger) {
      this.currentPage = pageNumger
      // console.log(this.$store.getters.getUsername)
    },
    tableRowClassName: function ({row}) {
      if (typeof row.result === 'string') {
        if (row.result.length > 0 && row.result[0] === '!') {
          return 'warning-row'
        }
        return 'info-row'
      } else {
        if (row.result < 0) {
          return 'danger-row'
        } else {
          return 'success-row'
        }
      }
    },
    getLogLink: function (row) {
      return '/log/' + row.id
    },
    getViewLink: function (row) {
      return '/view/' + row.id
    },
    clickLog: function (row) {
      window.open(this.getLogLink(row))
    },
    clickView: function (row) {
      window.open(this.getViewLink(row))
    }
  }
}
</script>

<style>
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
