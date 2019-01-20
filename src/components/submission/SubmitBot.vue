<template>
  <el-card class="main-div">
    <div slot="header"><b>
      Submit Your Bot Here
    </b></div>
    <div class="right-div">
      <el-select v-model="chosenGame" placeholder="Choose Game" @change="gameChoose">
        <el-option
          v-for="gameName in games"
          :key="gameName"
          :value="gameName"
        ></el-option>
      </el-select>
      <el-button plain type="success" @click="submit"><b>
        Submit
      </b></el-button>
      <el-card style="margin-top: 20px">
        <el-table
          :data="submitHistory"
          height="300"
          border
        >
          <el-table-column
            label="ID"
          >
            <template slot-scope="scope">
              <el-button plain size="small" @click="showCode(scope.row)">
                {{scope.row.id}}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="BestRating"
            prop="bestRating"
          ></el-table-column>
          <el-table-column
            label="BestScore"
            prop="bestScore"
          ></el-table-column>
        </el-table>
      </el-card>
    </div>
    <el-card class="left-div">
      <editor v-model="content" width="100%" height="400"></editor>
    </el-card>
  </el-card>
</template>

<script>
export default {
  name: 'SubmitBot',
  data () {
    return {
      content: '',
      games: [
        'Bomber',
        'Racing'
      ],
      chosenGame: '',
      submitHistory: [
        {
          id: '0',
          bestRating: '3400',
          bestScore: '10/10'
        },
        {
          id: '1',
          bestRating: '2200',
          bestScore: '10/10'
        },
        {
          id: '2',
          bestRating: '1200',
          bestScore: '8/10'
        },
        {
          id: '3',
          bestRating: '200',
          bestScore: '2/10'
        },
        {
          id: '4',
          bestRating: '800',
          bestScore: '5/10'
        },
        {
          id: '5',
          bestRating: '20',
          bestScore: '0/10'
        }
      ]
    }
  },
  created () {
    this.submitHistory = this.submitHistory.reverse()
  },
  components: {
    editor: require('vue2-ace-editor')
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
    submit: function () {
      if (this.chosenGame.length === 0) {
        this.notifyFailed('Failed', 'Choose a game first!')
      } else
      if (this.content.length === 0) {
        this.notifyFailed('Failed', 'Enter some code!')
      } else {
        this.notifySuccess('Success', 'Submitted bot for the ' + this.chosenGame + ' game!')
        this.notifySuccess('Let\'s Fight!', 'But wait a little for your Bot to be compiled!')
        this.$router.push('/fight')
      }
    },
    gameChoose: function () {
      this.notifySuccess('Game chosen successfully!', 'Game chosen: ' + this.chosenGame)
    },
    getCodeLink: function (row) {
      return '/code/' + row.id
    },
    showCode: function (row) {
      window.open(this.getCodeLink(row))
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
  width: 60%;
  height: 100%;
  float: left;
}
.right-div {
  width: 35%;
  height: 100%;
  float: right;
}
</style>
