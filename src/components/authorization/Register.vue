<template>
  <div class="register-panel">
    <el-card class="box-card">
      <div slot="header"><b>
        REGISTER
      </b></div>
      <el-form :model="registerForm" :rules="rules" ref="registerForm" class="register-form">
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
        <el-form-item prop="confirm.password">
          <el-input placeholder="Password" v-model="registerForm.confirm.password">
            <template slot="prepend"><b>
              Re.Password
            </b></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="metadata.email">
          <el-input placeholder="Email" v-model="registerForm.metadata.email">
            <template slot="prepend"><b>
              Email
            </b></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="metadata.name">
          <el-input placeholder="Real name" v-model="registerForm.metadata.name">
            <template slot="prepend"><b>
              Name
            </b></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-col :span="10">
            <el-form-item prop="metadata.birthday">
              <el-date-picker
                placeholder="BirthDay"
                v-model="registerForm.metadata.birthday"
                type="date"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="metadata.education.school">
              <el-select v-model="registerForm.metadata.education.school" placeholder="Your School">
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
        <el-form-item prop="metadata.education.identity">
          <el-input placeholder="Your Identity" v-model="registerForm.metadata.education.identity">
            <template slot="prepend"><b>
              MSSV
            </b></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="metadata.education.generation">
          <el-input placeholder="Your Generation" v-model="registerForm.metadata.education.generation">
            <template slot="prepend"><b>
              Generation
            </b></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="metadata.education.class">
          <el-input placeholder="Your Class" v-model="registerForm.metadata.education.class">
            <template slot="prepend"><b>
              Class
            </b></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="register('registerForm')"><b>
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
    let checkPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Enter the password again!'))
      } else {
        if (this.registerForm.confirm.password !== this.registerForm.password) {
          callback(new Error('Two passwords must be same!'))
        } else {
          callback()
        }
      }
    }
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
        confirm: {
          password: ''
        },
        metadata: {
          email: '',
          birthday: '',
          name: '',
          education: {
            school: '',
            identity: '',
            class: '',
            generation: ''
          }
        }
      },
      rules: {
        confirm: {
          password: [
            {validator: checkPassword, trigger: 'blur'}
          ]
        },
        username: [
          {required: true, message: 'Please enter your username!', trigger: 'blur'},
          {min: 6, max: 15, messsage: 'Username\'s length should be 6 to 15', trigger: 'blur'}
        ],
        password: [
          {required: true, message: 'Please enter your password!', trigger: 'blur'},
          {min: 6, max: 15, messsage: 'Password\'s length should be 6 to 15', trigger: 'blur'}
        ],
        metadata: {
          email: [
            {required: true, message: 'Please enter your email!', trigger: 'blur'},
            {type: 'email', message: 'Pease enter a valid email'}
          ],
          birthday: [
            {required: true, message: 'Please choose your birthday!', trigger: 'blur'}
          ],
          name: [
            {required: true, message: 'Please enter your real name!', trigger: 'blur'}
          ],
          education: {
            school: [
              {required: true, message: 'Please choose your school!', trigger: 'blur'}
            ],
            identity: [
              {required: true, message: 'Please input your identity!', trigger: 'blur'},
              {min: 8, max: 16, message: 'Identity\'s length should be 8 to 16', trigger: 'blur'}
            ],
            class: [
              {required: true, message: 'Please enter your class!', trigger: 'blur'}
            ],
            generation: [
              {required: true, message: 'Please enter your generation!', trigger: 'blur'}
            ]
          }
        }
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
    register: function (formName) {
      let passReference = false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
          passReference = true
        } else {
          console.log('error submit!!')
          return false
        }
      })
      if (passReference) {
        let myData = {
          username: this.registerForm.username,
          password: this.registerForm.password,
          metadata: {
            email: this.registerForm.metadata.email,
            birthday: this.registerForm.metadata.birthday,
            name: this.registerForm.metadata.name,
            education: {
              school: this.registerForm.metadata.education.school,
              identity: this.registerForm.metadata.education.identity,
              class: this.registerForm.metadata.education.class,
              generation: this.registerForm.metadata.education.generation
            }
          }
        }
        alert(myData)
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
