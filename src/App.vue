<template>
  <div id="app">
    <el-button type="primary">
      <router-link to="/">Home</router-link>
    </el-button>
    <el-button type="primary">
      <router-link to="/login">Login</router-link>
    </el-button>
    <Logout v-if="isLoggedIn"/>
    <router-view/>
  </div>
</template>

<script>
import Logout from './components/authorization/Logout'
export default {
  name: 'App',
  components: {
    Logout
  },
  data () {
    return {
    }
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
