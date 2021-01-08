<template>
  <div>
    <el-dialog
      title="添加用户"
      :visible.sync="isShow"
      width="35%"
      :before-close="handleClose"
      class="dialog_title"
      :close-on-click-modal="false"
      >
      <el-row>
        <el-col :span="24">
          <el-transfer
            :props="{
               key: 'id',
               label: 'username'
            }"
            v-model="value"
            :data="data"
            :titles="titles"
            :filterable="true"
            filter-placeholder="请输入用户名"
            >
          </el-transfer>
        </el-col>
        <el-col :span="24">&nbsp;</el-col>
        <el-col :span="10" :offset="17">
          <el-button type="primary" @click="submit" :loading="loading">确定</el-button>
          <el-button @click="handleClose">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
  import { getUsers, setUsers } from '@/api/system/roleManage.js'

  export default{
    data() {
      return {
        value: [],
        data: [],
        titles: ['未分配','已分配'],
        loading: false
      }
    },
    props:{
      isShow: Boolean,
      id: Number
    },
    watch:{
      isShow(val, newVal){
        this.getUser()
      }
    },
    methods:{
      //关闭dialog之前
      handleClose(){
        this.$emit('closeIt')
      },
      //提交
      submit(){
        this.loading = true
        const param = {
          roleId: this.id,
          ids: this.value
        }
        setUsers(param).then(res => {
          this.loading = false
          this.$emit('closeIt')
        }).catch(err => {
          this.loading = false
        })
      },
      //封装数据到穿梭框
      getUser(){
        if(this.id !== 0){
          getUsers({id: this.id}).then(res => {
            //完整数据封装
            const users = res.data.data.unUse
            const usedUser = res.data.data.used
            //返回数据
            const userData = users.concat(usedUser)
            this.data = userData
            //获取已分配用户数据
            const choose = []
            usedUser.forEach(item => {
              choose.push(item.id)
            })
            this.value = choose
          })
        }
      }
    }
  }
</script>

<style>
</style>
