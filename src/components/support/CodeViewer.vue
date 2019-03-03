<template>
  <div>
    <el-card style="width: 60%; margin: 0 auto">
      <div slot="header">
        Code's ID: {{this.id}}
      </div>
      <div style="text-align: left">
        <pre>
          {{this.content}}
        </pre>
      </div>
    </el-card>
    <el-card style="width: 60%; margin: 0 auto">
      <div slot="header">
        Compilation details
      </div>
      <div style="text-align: left; margin: 10px">
        Language: {{this.info.language}}
      </div>
      <div style="text-align: left; margin: 10px">
        Details: {{this.info.result}}
      </div>
    </el-card>
  </div>
</template>

<script>
import Axios from 'axios'

export default {
  name: 'CodeViewer',
  data () {
    return {
      id: '',
      content: '',
      info: {
        language: '',
        result: ''
      }
    }
  },
  created () {
    this.id = this.$route.params.id
    Axios({
      url: 'http://localhost:3000/code', data: {id: this.id}, method: 'POST'
    })
      .then((resp) => {
        if (resp.data) {
          let response = JSON.parse(JSON.stringify(resp.data))
          this.content = response.code
          this.content = '\n' + this.content
          this.info = response.compilation_info
          this.notifySuccess('Success', 'This code belongs to you!')
        } else {
          this.notifyFailed('Failed', 'This code doesn\'t belong to you!')
        }
      })
      .catch((err) => {
        this.notifyFailed('Failed', 'Network error!')
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
    }
  }
}
</script>

<style scoped>
</style>
