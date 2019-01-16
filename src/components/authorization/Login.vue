<template>
  <div class="login-panel">
    <el-card class="box-card">
      <div slot="header"><b>LOGIN</b></div>
      <el-form :model="loginForm" :rules="rules" class="login-form">
        <el-form-item prop="username">
          <el-input placeholder="Username" v-model="loginForm.username">
            <template slot="prepend">Username:</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="Password" v-model="loginForm.password">
            <template slot="prepend">Password:</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">Login</el-button>
          <el-button type="danger">Register</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: 'Please input your username!', trigger: 'blur'},
          {min: 6, max: 15, messsage: 'Username\'s length should be 6 to 15', trigger: 'blur'}
        ],
        password: [
          {required: true, message: 'Please input your password!', trigger: 'blur'},
          {min: 6, max: 15, messsage: 'Password\'s length should be 6 to 15', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    login: function () {
      let un = this.data.loginForm.username
      let pw = this.data.loginForm.password
      this.$store.dispatch('login', {un, pw})
        .then(
          () => this.$router.push('/')
        )
        .catch(
          err => console.log(err)
        )
    }
  }
}
</script>

<style scoped>
.login-form {
  width: 75%
}
.box-card {
  width: 100%
}
.login-panel {
  width: 50%;
  margin: 0 auto
}
</style>
