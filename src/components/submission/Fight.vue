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
      <el-button type="danger" plain @click="letsFight">Fight!</el-button>
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
          prop="username"
          label="Username"
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
export default {
  name: 'Fight',
  data () {
    return {
      games: [
        'Bomber',
        'Racing'
      ],
      chosenGame: '',
      enemy: '',
      opponents: [
        {
          username: 'ILoveBaoNgoc',
          school: 'UET',
          generation: 'K62',
          class: 'CAC',
          identity: '17020035',
          rating: '312'
        },
        {
          username: 'Kuriboh',
          school: 'UET',
          generation: 'K62',
          class: 'CAC',
          identity: '17020025',
          rating: '3145'
        },
        {
          username: 'Hekl0',
          school: 'Harvard',
          generation: 'K55',
          class: 'WorstClass',
          identity: '17020041',
          rating: '2300'
        }
      ]
    }
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
        this.notifySuccess('Success', 'Attacked ' + this.enemy + ' in the ' + this.chosenGame + ' game!')
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
