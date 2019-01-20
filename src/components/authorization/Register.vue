<template>
  <div class="register-panel">
    <el-card class="box-card">
      <div slot="header"><b>
        REGISTER
      </b></div>
      <el-form :model="registerForm" :rules="rules" class="register-form">
        <el-form-item prop="username">
          <el-input placeholder="Username" v-model="registerForm.username">
            <template slot="prepend"><b>
              Username
            </b></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="Password" v-model="registerForm.password">
            <template slot="prepend"><b>
              Password
            </b></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input placeholder="Email" v-model="registerForm.email">
            <template slot="prepend"><b>
              Email
            </b></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-col :span="10">
            <el-form-item prop="birthday">
              <el-date-picker
                placeholder="BirthDay"
                v-model="registerForm.birthday"
                type="date"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="school">
              <el-select v-model="registerForm.school" placeholder="Your School">
                <el-option
                  v-for="school in schools"
                  :key="school.code"
                  :label="school.name"
                  :value="school.code"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item prop="identity">
          <el-input placeholder="Your Identity" v-model="registerForm.identity">
            <template slot="prepend"><b>
              MSSV
            </b></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="gen">
          <el-input placeholder="Your Generation" v-model="registerForm.generation">
            <template slot="prepend"><b>
              Generation
            </b></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="class">
          <el-input placeholder="Your Class" v-model="registerForm.class">
            <template slot="prepend"><b>
              Class
            </b></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="register"><b>
            Register
          </b></el-button>
          <router-link to="/login"><el-button type="primary"><b>
            Login
          </b></el-button></router-link>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      schools: [
        {
          code: 'UET',
          name: 'Đại học Công Nghệ - ĐHQGHN'
        },
        {
          code: 'CSP',
          name: 'THPT chuyên ĐHSPHN'
        }
      ],
      registerForm: {
        username: '',
        password: '',
        email: '',
        birthday: '',
        school: '',
        identity: '',
        class: '',
        generation: ''
      },
      rules: {
        username: [
          {required: true, message: 'Please input your username!', trigger: 'blur'},
          {min: 6, max: 15, messsage: 'Username\'s length should be 6 to 15', trigger: 'blur'}
        ],
        password: [
          {required: true, message: 'Please input your password!', trigger: 'blur'},
          {min: 6, max: 15, messsage: 'Password\'s length should be 6 to 15', trigger: 'blur'}
        ],
        email: [
          {required: true, message: 'Please input your email!', trigger: 'blur'}
        ],
        birthday: [
          {required: true, message: 'Please choose your birthday!', trigger: 'blur'}
        ],
        identity: [
          {required: true, message: 'Please input your identity!', trigger: 'blur'},
          {min: 6, max: 15, messsage: 'Identity\'s length should be 6 to 15', trigger: 'blur'}
        ],
        class: [
          {required: true, message: 'Please enter your class!', trigger: 'blur'}
        ],
        gen: [
          {required: true, message: 'Please enter for generation!', trigger: 'blur'}
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
    register: function () {
      let myData = {
        username: this.registerForm.username,
        password: this.registerForm.password,
        email: this.registerForm.email,
        birthday: this.registerForm.birthday,
        school: this.registerForm.school,
        identity: this.registerForm.identity,
        class: this.registerForm.class,
        generation: this.registerForm.generation
      }
      this.$store.dispatch('register', myData)
        .then(
          () => this.$router.push('/login')
        )
        .catch(
          err => console.log(err)
        )
    }
  }
}
</script>

<style scoped>
.register-form {
  width: 85%
}
.box-card {
  width: 100%
}
.register-panel {
  width: 50%;
  margin: 0 auto
}
</style>
