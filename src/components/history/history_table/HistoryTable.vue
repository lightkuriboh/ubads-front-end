<template>
  <div>
    <el-table
      :data="filterMyFights"
      :row-class-name="tableRowClassName"
      style="width:100%; font-style: italic"
      border
    >
      <el-table-column
        prop="game.name"
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
          <el-button @click="clickLog(scope.row)" size="small">
            Log
          </el-button>
          <el-button @click="clickView(scope.row)" size="small">
            View
          </el-button>
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
import Axios from 'axios'
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
        }
      ]
    }
  },
  created () {
    /**
     * Create data for historyData
     * @type {Array}
     */
    this.historyData = []
    let myGameIDSet = new Set()
    /**
     * This API return the records of fights
     */
    Axios({url: 'http://localhost:3000/record', data: {}, method: 'GET'})
      .then((resp) => {
        let strData = JSON.stringify(resp.data)
        let tableData = JSON.parse(strData)
        for (let i = 0; i < tableData.length; i++) {
          myGameIDSet.add(tableData[i].game) // Add gameID to a unique-value queue
          this.historyData.push(tableData[i])
          let miliSecond = parseInt(tableData[i].id.toString()) // Parse ID into Data-Time
          let myDate = new Date()
          myDate.setTime(miliSecond - miliSecond % 1000)
          /**
           * Remove unnecessary information
           * @type {string}
           */
          let time = myDate.toString()
          for (let j = 0; j < time.length; j++) {
            if (time[j] === '(') {
              time = time.substring(0, j - 2)
              break
            }
          }
          this.historyData[i].time = time
          // if (typeof tableData !== 'object') {
          //   this.historyData[this.historyData.length - 1].result = tableData[i].result.got.toString() + tableData[i].result.maximum.toString()
          // }
        }
        this.numberOfRows = this.historyData.length
        this.historyData = this.historyData.reverse()
        /**
         * Map the gameID as a Name for showing
         * @type {{}}
         */
        let myGameNameMap = {}
        myGameIDSet = Array.from(myGameIDSet)
        for (let i = 0; i < myGameIDSet.length; i++) {
          let gameID = myGameIDSet[i]
          Axios({url: 'http://localhost:3000/game/id', data: {id: gameID}, method: 'POST'})
            .then(
              (resp) => {
                myGameNameMap[gameID] = resp.data[0]
                if (i === myGameIDSet.length - 1) { // Map all gameID already
                  this.mapTheGameName(myGameNameMap)
                }
              }
            )
            .catch(
              (err) => {
                console.log(err)
              }
            )
        }
      })
      .catch((err) => {
        this.notifyFailed('Error', 'Network error!')
        console.log(err)
      })
  },
  computed: {
    filterMyFights: function () {
      let finalData = this.historyData
      let that = this
      /**
       * Filter as current logged in user's username
       */
      if (this.filter.isFiltered === '1') {
        finalData = finalData.filter(function (item) {
          let myName = that.$store.getters.getUsername
          return item.attacker === myName || item.defender === myName
        })
      }
      /**
       * Filter as a specific game.name
       */
      if (this.filter.game && this.filter.game.length > 0) {
        finalData = finalData.filter(function (item) {
          let myGame = that.filter.game
          return item.game.id === myGame
        })
      }
      /**
       * Filter as page number
       * @type {number}
       */
      let startIndex = this.rowsEachPage * (this.currentPage - 1)
      let finishIndex = Math.min(finalData.length, startIndex + this.rowsEachPage)
      return finalData.slice(startIndex, finishIndex)
    }
  },
  methods: {
    /**
     * Replace game.id as game.name
     * @param map
     */
    mapTheGameName: function (map) {
      for (let i = 0; i < this.historyData.length; i++) {
        this.historyData[i].game = map[this.historyData[i].game]
      }
    },
    isNumber: function (n) {
      return /^-?[\d.]+(?:e-?\d+)?$/.test(n)
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
    },
    pageChange: function (pageNumger) {
      this.currentPage = pageNumger
    },
    tableRowClassName: function ({row}) {
      if (!(this.isNumber(row.result))) {
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
    /**
     * Open the /log/id to view the record's log
     * @param row
     */
    clickLog: function (row) {
      let routeData = this.$router.resolve({path: '/log', name: 'GameLogger', params: {id: row.id}})
      window.open(routeData.href, '_blank')
    },
    /**
     * Open the /view/id to view the record's visualized log
     * @param row
     */
    clickView: function (row) {
      let routeData = this.$router.resolve({path: '/view', name: 'GameRender', params: {id: row.id}})
      window.open(routeData.href, '_blank')
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
