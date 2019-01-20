<template>
  <div class="login-panel">
    <el-card class="box-card">
      <div slot="header"><b>
        LOGIN
      </b></div>
      <el-form :model="loginForm" :rules="rules" class="login-form">
        <el-form-item prop="username">
          <el-input placeholder="Username" v-model="loginForm.username">
            <template slot="prepend"><b>
              Username
            </b></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="Password" v-model="loginForm.password">
            <template slot="prepend"><b>Password
            </b></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login"><b>
            Login
          </b></el-button>
          <router-link to="/register"><el-button type="danger"><b>
            Register
          </b></el-button></router-link>
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
    login: function () {
      let myData = {
        username: this.loginForm.username,
        password: this.loginForm.password
      }
      this.$store.dispatch('login', myData)
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
  width: 85%
}
.box-card {
  width: 100%
}
.login-panel {
  width: 50%;
  margin: 0 auto
}
</style>
