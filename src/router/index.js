import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/view/index.vue'
import Login from '@/view/Login.vue'
import AdminIndex from '@/view/adminIndex.vue'
import System from '@/view/system/system.vue'

// router
import * as userRouter from './module/systemRouter.js'

Vue.use(Router)

export const defaultRouter = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/logins',
    name: 'Login',
    component: Login
  },
  {
    path: '/adminIndex',
    component: AdminIndex,
    meta: {
      title:'后台首页'
    },
    children: [
      userRouter.userRouter
    ]
  }
]


export default new Router({
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  base: process.env.BASE_URL,
  routes: defaultRouter
})
