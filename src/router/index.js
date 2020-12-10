import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/view/index.vue'
import Login from '@/view/Login.vue'
import AdminIndex from '@/view/adminIndex.vue'
import userManager from '@/view/system/userManage.vue'
import SystemInfo from '@/view/system/systemInfo.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
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
      name: 'admin',
      component: AdminIndex,
      meta: {
        title:'后台首页'
      },
      children: [
        {
					path:"system",
          name: 'system',
          component: userManager,
          meta: {
            title:'系统管理'
          },
          children: [
            {
              path: '/',
              name: 'userManager',
              component: userManager,
              meta: {
                title:'用户管理'
              },
            },
            {
              path: '/systemInfo',
              name: 'SystemInfo',
              component: SystemInfo,
              meta: {
                title:'系统信息'
              },
            }
          ]
				}
      ]
    },
  ]
})
