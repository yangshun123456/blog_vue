<template>
  <div>
    <el-container>
      <el-header height="10px">
      </el-header>
      <el-main>
        <!-- 搜索框 -->
        <el-form :inline="true" :model="selectParam" class="demo-form-inline">
          <el-row>
            <el-col :span="4" :offset="1">
              <el-form-item label="用户名:">
                  <el-input v-model="selectParam.username" placeholder="请输入用户名" class="half" size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4" :offset="0">
              <el-form-item label="状态:" >
                  <el-select v-model="selectParam.statusOption" placeholder="请选择状态" class="half" size="small">
                      <el-option
                        v-for="item in statusOption"
                        :key="item.id"
                        :label="item.value"
                        :value="item.id">
                      </el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="1.2">
              <el-form-item >
                  <el-button size="medium" type="primary" @click="selectUser" plain>搜索</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-form-item >
                  <el-button size="medium">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!-- 用户数据 -->
        <div style="margin-bottom: 10px">
          <el-button type="primary" size="medium">+ 新增</el-button>
        </div>
        <el-table
            :data="userList"
            border
            style="width: 100%"
            v-loading = "false">
           <el-table-column
                fixed
                label="序号"
                width="150"
                type="index">
           </el-table-column>
           <el-table-column
                width="150"
                label="头像"
                >
                <template slot-scope="scope">{{ scope.row.url }}</template>
           </el-table-column>
           <el-table-column
                label="昵称"
                width="150">
                <template slot-scope="scope">{{ scope.row.nickname }}</template>
           </el-table-column>
           <el-table-column
                label="用户名"
                width="150">
                <template slot-scope="scope">{{ scope.row.username }}</template>
           </el-table-column>
           <el-table-column
                label="真实姓名"
                width="150">
                <template slot-scope="scope">{{ scope.row.relname }}</template>
           </el-table-column>
           <el-table-column
                label="身份证号"
                width="150">
                <template slot-scope="scope">{{ scope.row.idCard }}</template>
           </el-table-column>
           <el-table-column
                label="手机号"
                width="150">
                <template slot-scope="scope">{{ scope.row.phone }}</template>
           </el-table-column>
           <el-table-column
                label="邮箱"
                width="150">
                <template slot-scope="scope">{{ scope.row.email }}</template>
           </el-table-column>
           <el-table-column
                label="状态"
                width="150">
                 <template slot-scope="scope">{{ scope.row.status | statusFilter }}</template>
           </el-table-column>
           <el-table-column
                label="操作">
                 <template slot-scope="scope">
                   <el-button type="text" style="color:#4794F7" size="mini">详情</el-button>
                   <el-button type="text" style="color:#19D185" size="mini" >修改</el-button>
                   <el-button type="text" style="color:#F52222" size="mini" >删除</el-button>
                 </template>
           </el-table-column>
        </el-table>
      </el-main>
      <el-footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import { findAll } from '@/api/system/userManage.js'
  export default{
    data() {
      return{
        selectParam: {},
        statusOption: [
          { 'id': 1,value:'启动' },
          { 'id': 2,value:'停用' },
        ],
        userList: []
      }
    },
    created(){
      this.loading()
    },
    filters:{
      statusFilter(val) {
        return { 1: '正常', 2: '停用'}[val]
      }
    },
    methods: {
      loading(){
        findAll().then(res => {
          this.userList = res.data.data
        })
      },
      selectUser(){
        const param = {
          'username': selectParam.username,
          'status': selectParam.status
        }
        findAll(param).then(res => {
          this.userList = res.data.data
        })
      }
    }
  }
</script>

<style>
   .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      border-radius: 4px;
    }
    .bg-purple-dark {
      background: #99a9bf;
    }
    .bg-purple {
      background: #d3dce6;
    }
    .bg-purple-light {
      background: #e5e9f2;
    }
    .grid-content {
      border-radius: 4px;
      min-height: 36px;
    }
    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
    }
</style>
