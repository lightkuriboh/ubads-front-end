<template>
  <el-card class="main-div">
    <div slot="header">
      <b>Choose someone to fight!</b>
    </div>
    <el-card class="right-div">
      <el-select
        v-model="chosenGame"
        placeholder="Choose Game"
        @change="gameChoose"
      >
        <el-option
          v-for="gameName in games"
          :key="gameName"
          :value="gameName"
        ></el-option>
      </el-select>
      <el-button type="danger" plain @click="letsFight"><b>
        Fight!
      </b></el-button>
      <el-input placeholder="Choose your enemy" disabled v-model="enemy" style="margin-top: 20px"></el-input>
    </el-card>
    <el-card class="left-div">
      <el-table
        height="400"
        border
        :data="opponents"
        highlight-current-row
        @current-change="enemyChoose"
        style="color: #111214"
      >
        <el-table-column
          prop="name"
          label="name"
        ></el-table-column>
        <el-table-column
          prop="school"
          label="School"
        ></el-table-column>
        <el-table-column
          prop="generation"
          label="Generation"
        ></el-table-column>
        <el-table-column
          prop="class"
          label="Class"
        ></el-table-column>
        <el-table-column
          prop="identity"
          label="MSSV"
        ></el-table-column>
        <el-table-column
          prop="rating"
          label="Rating"
        ></el-table-column>
      </el-table>
    </el-card>
  </el-card>
</template>

<script>
import Axios from 'axios'
export default {
  name: 'Fight',
  data () {
    return {
      games: [
      ],
      chosenGame: '',
      enemy: '',
      opponents: [
        {
          username: 'ilovebaongoc',
          name: '',
          school: 'UET',
          generation: 'K62',
          class: 'CAC',
          identity: '17020035',
          rating: '312'
        },
        {
          username: 'lightkuriboh',
          name: '',
          school: 'UET',
          generation: 'K62',
          class: 'CAC',
          identity: '17020025',
          rating: '3145'
        },
        {
          username: 'hekl0',
          name: '',
          school: 'Harvard',
          generation: 'K55',
          class: 'WorstClass',
          identity: '17020041',
          rating: '2300'
        }
      ]
    }
  },
  created () {
    this.opponents = []
    let gameList = []
    Axios({
      url: 'http://localhost:3000/game', data: {}, method: 'GET'
    })
      .then((resp) => {
        let str = JSON.stringify(resp.data)
        gameList = JSON.parse(str)
        for (let i = 0; i < gameList.length; i++) {
          let value = gameList[i]
          this.games.push(value.name)
        }
      })
      .catch((err) => {
        this.notifyFailed('Failed', 'Network errors!')
        console.log(err)
      })
  },
  methods: {
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
    gameChoose: function () {
      this.notifySuccess('Game chosen successfully!', 'Game chosen: ' + this.chosenGame)
      this.opponents = []
      Axios({
        url: 'http://localhost:3000/achievement/game', data: {game: this.chosenGame}, method: 'POST'
      })
        .then((resp) => {
          let str = JSON.stringify(resp.data)
          let myOpponents = JSON.parse(str)
          for (let i = 0; i < myOpponents.length; i++) {
            this.opponents.push({
              username: myOpponents[i].userDetails.username,
              name: myOpponents[i].userDetails.metadata.name,
              school: myOpponents[i].userDetails.metadata.education.school,
              generation: myOpponents[i].userDetails.metadata.education.generation,
              class: myOpponents[i].userDetails.metadata.education.class,
              identity: myOpponents[i].userDetails.metadata.education.identity,
              rating: myOpponents[i].resultDetails.rating
            })
          }
        })
        .catch((err) => {
          this.notifyFailed('Failed', 'Network errors!')
          console.log(err)
        })
    },
    enemyChoose: function (row) {
      this.enemy = row.username
    },
    letsFight: function () {
      if (this.chosenGame.length === 0) {
        this.notifyFailed('Failed', 'Choose a game first!')
      } else
      if (this.enemy.length === 0) {
        this.notifyFailed('Failed', 'Choose a enemy!')
      } else {
        if (this.$store.getters.isLoggedIn) {
          this.notifySuccess('Success', 'Attacked ' + this.enemy + ' in the ' + this.chosenGame + ' game!')
          this.$router.push('/history')
        } else {
          this.notifyFailed('Failed', 'You haven\'t logged in!')
          this.$router.push('/login')
        }
      }
    }
  }
}
</script>

<style scoped>
.main-div {
  width: 90%;
  max-height: 500px;
  margin: 0 auto;
}
.left-div {
  width: 62%;
  height: 100%;
  float: left;
}
.right-div {
  width: 35%;
  height: 100%;
  float: right;
}
</style>
