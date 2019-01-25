<template>
  <el-menu
    class="el-menu-demo"
    mode="horizontal"
    background-color ="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    id="menu-style"
    :router="true"
  >
    <el-menu-item index="/"><b>
      Home
    </b></el-menu-item>
    <el-submenu index="submenu-1">
      <template slot="title"><b>Submit</b></template>
      <el-menu-item index="/submit"><b>
        Submit bot
      </b></el-menu-item>
      <el-menu-item index="/fight"><b>
        Fight
      </b></el-menu-item>
    </el-submenu>
    <el-menu-item index="/history"><b>
      History
    </b></el-menu-item>
    <el-submenu v-if="!isLoggedIn" index="submenu-2">
      <template slot="title"><b>Auth</b></template>
      <el-menu-item index="/login"><b>
        Login
      </b></el-menu-item>
      <el-menu-item index="/register"><b>
        Register
      </b></el-menu-item>
    </el-submenu>
    <el-menu-item index = '/login' v-if="isLoggedIn">
      <Logout/>
    </el-menu-item>
  </el-menu>
</template>

<script>
import Logout from './authorization/Logout'
export default {
  name: 'Menu',
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

<style scoped>
#menu-style {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
}
</style>
