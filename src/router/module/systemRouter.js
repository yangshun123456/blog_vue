import System from '@/view/system/system.vue'

import UserManager from '@/view/system/userManage.vue'
import SystemInfo from '@/view/system/systemInfo.vue'
import UserAdd from '@/view/system/userManageAdd.vue'

export const userRouter = {
  path: 'system',
  component: System,
  name: 'system',
  meta: {
    title:'系统管理'
  },
  children: [
    {
      path: 'user',
      name: 'userManager',
      component: UserManager,
      meta: {
        title:'用户管理'
      },
    },
    {
      path: 'add',
      name: 'userAdd',
      component: UserAdd,
      meta: {
        title:'用户新增'
      }
    },
    {
      path: 'update/:id/:type',
      name: 'userUpdate',
      component: UserAdd,
      meta: {
        title:'用户修改'
      }
    },
    {
      path: 'systemInfo',
      name: 'systemInfo',
      component: SystemInfo,
      meta: {
        title:'系统信息'
      }
    }
  ]
}
