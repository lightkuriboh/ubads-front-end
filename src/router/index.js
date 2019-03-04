import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/authorization/Login'
import Register from '@/components/authorization/Register'
import History from '@/components/history/History'
import SubmitBot from '@/components/submission/SubmitBot'
import Fight from '@/components/submission/Fight'
import CodeViewer from '@/components/support/code_viewer/CodeViewer'
import GameRender from '@/components/support/game_render/GameRender'
import GameLogger from '@/components/support/game_logger/GameLogger'

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
    },
    {
      path: '/code/:id',
      name: 'CodeViewer',
      component: CodeViewer
    },
    {
      path: '/view/:id',
      name: 'GameRender',
      component: GameRender
    },
    {
      path: '/log/:id',
      name: 'GameLogger',
      component: GameLogger
    }
  ]
})

export default router
