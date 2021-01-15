import System from '@/view/system/system.vue'

import UserManager from '@/view/system/userManage.vue'
import SystemInfo from '@/view/system/systemInfo.vue'
import UserAdd from '@/view/system/userManageAdd.vue'

import MenuManage from '@/view/system/menu/menuManage.vue'

import RoleManage from '@/view/system/role/roleManage.vue'

import DicManager from '@/view/system/dic/dicManager.vue'
import DictData from '@/view/system/dic/dictData.vue'

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
      path: 'userAdd',
      name: 'userAdd',
      component: UserAdd,
      meta: {
        title:'用户新增'
      }
    },
    {
      path: 'userUpdate/:id/:type',
      name: 'userUpdate',
      component: UserAdd,
      meta: {
        title:'用户修改'
      }
    },
		{
		  path: 'userDetail/:id/:type',
		  name: 'userDetail',
		  component: UserAdd,
		  meta: {
		    title:'用户详情'
		  }
		},
    {
      path: 'systemInfo',
      name: 'systemInfo',
      component: SystemInfo,
      meta: {
        title:'系统信息'
      }
    },
		{
		  path: 'menuManage',
		  name: 'menuManage',
		  component: MenuManage,
		  meta: {
		    title:'菜单管理'
		  }
		},
    {
      path: 'roleManage',
      name: 'roleManage',
      component: RoleManage,
      meta: {
        title:'菜单管理'
      }
    },
    {
      path: 'dicManager',
      name: 'dicManager',
      component: DicManager,
      meta: {
        title:'数据字典'
      }
    },
    {
      path: 'dictData',
      name: 'dictData',
      component: DictData,
      meta: {
        title:'字典详情'
      }
    }
  ]
}
