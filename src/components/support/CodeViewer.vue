<template>
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
</template>

<script>
import Axios from 'axios'

export default {
  name: 'CodeViewer',
  data () {
    return {
      id: '',
      content: ''
    }
  },
  created () {
    this.id = this.$route.params.id
    Axios({
      url: 'http://localhost:3000/code', data: {id: this.id}, method: 'POST'
    })
      .then((resp) => {
        console.log(JSON.stringify(resp.data))
        this.content = resp.data
        this.content = '\n' + this.content
        this.notifySuccess('Success', 'This code belongs to you!')
      })
      .catch((err) => {
        this.notifyFailed('Failed', 'This code doesn\'t belong to you!')
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
