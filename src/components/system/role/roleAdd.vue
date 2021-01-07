<template>
  <div>
    <el-dialog
      title="菜单新增"
      :visible.sync="isShow"
      width="25%"
      :before-close="handleClose"
      class="dialog_title">
      <div ref="diva" v-loading="loading">
        <el-form :model="formData" label-width="80px" id="showForm" :rules="rules" ref="formAdd">
          <el-row>
            <el-col :span="24">
              <el-form-item label="角色名称:" prop="roleName" label-width="90px">
                <el-input v-model="formData.roleName" placeholder="请输入角色名称"/>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="角色标识:" prop="roleKey" label-width="90px">
                <el-input v-model="formData.roleKey" placeholder="请输入角色标识"/>
              </el-form-item>
            </el-col :span="24">
            <el-col>
              <el-form-item label="是否启用:" label-width="90px">
                <el-radio-group v-model="formData.status" style="position: relative;top: 3px;">
                  <el-radio :label="1">启用</el-radio>
                  <el-radio :label="2">禁用</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="24" >
              <el-form-item label="菜单权限:" label-width="90px">
                <!-- <el-checkbox v-model="menuExpand" @change="handleCheckedTreeExpand($event, 'menu')">展开/折叠</el-checkbox> -->
                  <el-tree
                    class="tree-border"
                    :data="menuOptions"
                    show-checkbox
                    ref="menu"
                    node-key="menuId"
                    empty-text="加载中，请稍后"
                    :props="defaultProps"
                  ></el-tree>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注:" prop="roleKey" label-width="90px">
                <el-input v-model="formData.remark" placeholder="请输入备注"/>
              </el-form-item>
            </el-col :span="24">
            <el-col :span="10" :offset="15">
              <el-button type="primary" @click="submit">确定</el-button>
              <el-button @click="handleClose">取消</el-button>
            </el-col>
          </el-row>
        </el-form>
        </div>
    </el-dialog>
  </div>
</template>

<script>
  import { findAllMenu, detail, save } from '@/api/system/roleManage.js'

  export default{
    data() {
      return {
  		 formData: {
         status: 1
  		 },
  		 rules:{
  			 menuName:[
  				  { required: true, message: '请输入菜单名称', trigger: 'blur' }
  			 ]
  		 },
       menuOptions: [],
       menus: [],
       defaultProps: {
         label: 'menuName',
         children: 'children'
       },
       menuExpand: false,
       loading: false
      }
    },
    props:{
      id: Number,
  		isShow: Boolean,
  		isUpdate: Boolean
    },
  	components:{

  	},
    mounted() {
  		this.getAllMenu()
    },
    watch:{
      isShow(val,newVal){
        if(this.id !== 0){
          this.loading = true
          const param = {
            id: this.id
          }
          detail(param).then(res => {
            this.formData = res.data.data
            const choose = []
            const menus = res.data.data.sysMenus
            this.getChooseKey(menus, choose)
            this.$refs.menu.setCheckedKeys(choose)
            this.loading = false
          }).catch(err => {
            this.loading = false
          })
        }
      }
    },
    methods:{
      //获取菜单权限
      getAllMenu(){
        findAllMenu().then(res => {
          this.menuOptions = res.data.data
          //保存一份完整数据
          this.menus = this.menuOptions
        })
      },
      //关闭窗口
      handleClose(){
        this.formData = {
         status: 1
  		 }
        this.$refs.menu.setCheckedKeys([])
        this.$emit('closeIt')
      },
      //递归获取选择的key
      getChooseKey(menus,choose){
        for(let i = 0; i<menus.length; i++) {
          if(typeof(menus[i].children) == 'undefined' || menus[i].children.length === 0){
            choose.push(menus[i].menuId)
          }
          if(typeof(menus[i].children) != 'undefined' && menus[i].children.length !== 0){
            this.getChooseKey(menus[i].children,choose)
          }
        }
      },
      //提交
      submit(){
        //获取选中菜单权限
        const menus = this.$refs.menu.getCheckedNodes()
        this.formData.sysMenus = menus
        save(this.formData).then(res => {
          this.handleClose()
          this.$emit('loading')
        })
      }
    }

  }
</script>

<style>
  .dialog_title {
    font-size: 9px;
    font-family: "microsoft yahei";
  }
</style>
