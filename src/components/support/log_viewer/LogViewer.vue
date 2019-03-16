<template>
  <div>
    <el-card style="width: 60%; margin: 0 auto">
      <div slot="header">
        Log's ID: {{this.id}}
      </div>
      <div style="text-align: left">
        <pre>
          {{this.content}}
        </pre>
      </div>
    </el-card>
  </div>
</template>

<script>
import Axios from 'axios'

export default {
  name: 'LogViewer',
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
      url: 'http://localhost:3000/log', data: {id: this.id}, method: 'POST'
    })
      .then((resp) => {
        if (resp.data) {
          this.content = JSON.parse(JSON.stringify(resp.data))
          this.notifySuccess('Success', '')
        } else {
          this.notifyFailed('Failed', '')
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
