<template>
  <div class="login-panel">
    <el-card class="box-card">
      <div slot="header"><b>
        LOGIN
      </b></div>
      <el-form :model="loginForm" :rules="rules" class="login-form" ref="loginForm">
        <el-form-item prop="username">
          <el-input placeholder="Username" v-model="loginForm.username">
            <template slot="prepend"><b>
              Username
            </b></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="Password" v-model="loginForm.password" :type="this.showPass">
            <template slot="prepend"><b>
              Password
            </b></template>
            <el-button slot="append" icon="el-icon-view" @click="toggleShowPass"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login('loginForm')"><b>
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
      showPass: 'password',
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: 'Please input your username!', trigger: 'blur'},
          {min: 5, max: 15, messsage: 'Username\'s length should be 5 to 15', trigger: 'blur'}
        ],
        password: [
          {required: true, message: 'Please input your password!', trigger: 'blur'},
          {min: 6, max: 15, messsage: 'Password\'s length should be 6 to 15', trigger: 'blur'}
        ]
      }
    }
  },
  created () {
    /**
     * If enter this page while logged in,
     * redirect to home page
     */
    if (this.$store.getters.isLoggedIn) {
      this.$router.push('/')
      this.notifySuccess('Success', 'You logged in already!')
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
    /**
     * After using this function,
     * the password will show or hide
     * depend on its current state
     */
    toggleShowPass: function () {
      if (this.showPass.length > 0) {
        this.showPass = ''
      } else {
        this.showPass = 'password'
      }
    },
    login: function (formName) {
      let passReference = false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          passReference = true
        } else {
          return false
        }
      })
      if (passReference) {
        /**
         * Create data form to login
         * @type {{username: string, password: string}}
         */
        let myData = {
          username: this.loginForm.username,
          password: this.loginForm.password
        }
        /**
         * Call login action in store.js as this.$store.
         * If failed, tell user to do again
         */
        this.$store.dispatch('login', myData)
          .then(
            (result) => {
              // console.log(result)
              this.notifySuccess('Success', this.$store.getters.authStatus)
              this.$router.push('/')
            }
          )
          .catch((err) => {
            this.notifyFailed('Failed', this.$store.getters.authStatus)
            console.log(err)
          })
      } else {
        this.notifyFailed('Failed', 'Pealse input enough required information')
      }
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
