<template>
  <div id="app">
    <div class="menu" style="margin-bottom: 100px">
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        background-color ="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        id="menu-style"
        :router="true"
      >
        <el-menu-item index="/">
          Home
        </el-menu-item>
        <el-submenu index="submenu-1">
          <template slot="title">Fight</template>
          <el-menu-item index="/submit">
            Submit bot
          </el-menu-item>
          <el-menu-item index="/duel">
            Duel
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="/history">
          History
        </el-menu-item>
        <el-submenu v-if="!isLoggedIn" index="submenu-2">
          <template slot="title">Auth</template>
          <el-menu-item index="/login">
            Login
          </el-menu-item>
          <el-menu-item index="/register">
            Register
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-if="isLoggedIn">
          <Logout/>
        </el-menu-item>
      </el-menu>
    </div>
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
#menu-style {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
}
</style>
