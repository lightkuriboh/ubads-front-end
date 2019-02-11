<template>
  <el-card class="main-div">
    <div slot="header"><b>
      Submit Your Bot Here
    </b></div>
    <div class="right-div">
      <el-select v-model="chosenGame" placeholder="Choose Game" @change="gameChoose" style="margin: 10px">
        <el-option
          v-for="gameName in games"
          :key="gameName"
          :value="gameName"
        ></el-option>
      </el-select>
      <el-select v-model="chosenLanguage" placeholder="Choose A Language" @change="langChoose" style="margin: 10px">
        <el-option
          v-for="lang in languages"
          :key="lang.code"
          :value="lang.code"
          :label="lang.name"
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
      <editor v-model="content" @init="editorInit" lang="html" theme="chrome" width="100%" height="400"></editor>
    </el-card>
  </el-card>
</template>

<script>
import Axios from 'axios'

export default {
  name: 'SubmitBot',
  components: {
    editor: require('vue2-ace-editor')
  },
  data () {
    return {
      content: '',
      games: [
        'Bomber'
      ],
      languages: [
        {
          code: 'cpp',
          name: 'C++'
        }
      ],
      chosenGame: '',
      chosenLanguage: '',
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
    this.games = []
    this.languages = []
    Axios({
      url: 'http://localhost:3000/game', data: {}, method: 'GET'
    })
      .then((resp) => {
        let str = JSON.stringify(resp.data)
        let gameList = JSON.parse(str)
        for (let i = 0; i < gameList.length; i++) {
          let value = gameList[i]
          this.games.push(value.name)
        }
      })
      .catch((err) => {
        this.notifyFailed('Failed', 'Network errors!')
        console.log(err)
      })
    Axios({
      url: 'http://localhost:3000/lang', data: {}, method: 'GET'
    })
      .then((resp) => {
        let str = JSON.stringify(resp.data)
        let tmpStr = ''
        for (let i = 0; i < str.length; i++) {
          if (str[i] !== '\\') {
            tmpStr += str[i]
          }
        }
        str = tmpStr
        str = str.substring(1, str.length - 1)
        let langList = JSON.parse(str)
        for (let i = 0; i < langList.length; i++) {
          let langListElement = langList[i]
          this.languages.push(langListElement)
        }
      })
      .catch((err) => {
        this.notifyFailed('Failed', 'Network errors!')
        console.log(err)
      })
    this.submitHistory = []
    if (this.$store.getters.isLoggedIn) {
      Axios({
        url: 'http://localhost:3000/submission/mine', data: {username: this.$store.getters.getUsername}, method: 'POST'
      })
        .then((resp) => {
          let str = JSON.stringify(resp.data)
          let histories = JSON.parse(str)
          for (let i = 0; i < histories.length; i++) {
            this.submitHistory.push({
              id: histories[i].id,
              bestRating: histories[i].best_rating,
              bestScore: histories[i].best_score
            })
          }
        })
        .catch((err) => {
          this.notifyFailed('Failed', 'Network errors!')
          console.log(err)
        })
    }
  },
  methods: {
    editorInit: function () {
      require('brace/ext/language_tools')
      require('brace/mode/html')
      require('brace/mode/javascript')
      require('brace/mode/less')
      require('brace/theme/chrome')
      require('brace/snippets/javascript')
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
    submit: function () {
      if (this.chosenGame.length === 0) {
        this.notifyFailed('Failed', 'Choose a game first!')
      } else
      if (this.content.length === 0) {
        this.notifyFailed('Failed', 'Enter some code!')
      } else
      if (this.chosenLanguage.length === 0) {
        this.notifyFailed('Failed', 'Choose a language!')
      } else {
        if (this.$store.getters.isLoggedIn) {
          let myData = {
            submitData: {
              id: '',
              owner: this.$store.getters.getUsername,
              game: this.chosenGame,
              language: this.chosenLanguage,
              best_rating: 0,
              best_score: '0'
            },
            code: this.content
          }
          Axios({
            url: 'http://localhost:3000/submission/add', data: myData, method: 'POST'
          })
            .then((resp) => {
            })
            .catch((err) => {
              this.notifyFailed('Failed', 'Network errors!')
              console.log(err)
            })
          this.notifySuccess('Let\'s Fight!', 'But wait a little for your Bot to be compiled!')
          this.$router.push('/fight')
        } else {
          this.notifyFailed('Failed', 'Login first!')
          this.$router.push('/login')
        }
      }
    },
    gameChoose: function () {
      this.notifySuccess('Game chosen successfully!', 'Game chosen: ' + this.chosenGame)
    },
    langChoose: function () {
      this.notifySuccess('Language chosen successfully!', 'Language chosen: ' + this.chosenLanguage)
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
