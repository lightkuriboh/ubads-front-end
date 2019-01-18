import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/authorization/Login'
import Register from '@/components/authorization/Register'
import History from '@/components/history/History'
import SubmitBot from '@/components/submission/SubmitBot'
import Fight from '@/components/submission/Fight'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/history',
      name: 'History',
      component: History
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/submit',
      name: 'SubmitBot',
      component: SubmitBot
    },
    {
      path: '/fight',
      name: 'Fight',
      component: Fight
    }
  ]
})

export default router
