<template>
  <el-button type="danger" @click="logout">Logout</el-button>
</template>

<script>
export default {
  name: 'Logout',
  data () {
    return {
    }
  },
  methods: {
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
