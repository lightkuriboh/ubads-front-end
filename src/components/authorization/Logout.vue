<template>
  <el-button size="small" plain type="default" @click="logout"><b>
    Logout
  </b></el-button>
</template>

<script>
export default {
  name: 'Logout',
  data () {
    return {
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
    logout: function () {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
    }
  }
}
</script>

<style scoped>

</style>
