<template>
    <el-card style="text-align: left; width: 60%; margin: 0 auto">
      <pre>
        {{this.content}}
      </pre>
    </el-card>
</template>

<script>
import Axios from 'axios'

export default {
  name: 'CodeViewer',
  data () {
    return {
      content: ''
    }
  },
  created () {
    Axios({
      url: 'http://localhost:3000/code', data: {id: this.$route.params.id}, method: 'POST'
    })
      .then((resp) => {
        console.log(JSON.stringify(resp.data))
        this.content = resp.data
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
