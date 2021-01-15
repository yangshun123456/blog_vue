<template>
  <div>
      <el-container>
        <el-header height="10px">
        </el-header>
        <el-main>
          <roleAdd :isShow="isShow" :id="roleId" :isUpdate="isUpdate" @closeIt="closeIt" @loading="loading"></roleAdd>
          <AddUser :isShow="userShow" @closeIt="closeUser" :id="roleId"></AddUser>
          <!-- 搜索框 -->
          <el-form :inline="true" :model="selectParam" class="demo-form-inline">
            <el-row>
              <el-col :span="4" :offset="1">
                <el-form-item label="角色名称:">
                    <el-input v-model="selectParam.roleName" placeholder="请输入用户名" class="half" size="small"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4" :offset="1">
                <el-form-item label="角色标识:">
                    <el-input v-model="selectParam.roleKey" placeholder="请输入用户名" class="half" size="small"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4" :offset="1">
                <el-form-item label="状态:" >
                  <el-select v-model="selectParam.status" placeholder="请选择状态" class="half" size="small" @change="loading">
                      <el-option
                        v-for="item in statusOption"
                        :key="item.id"
                        :label="item.value"
                        :value="item.id">
                      </el-option>
                    </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="1">
                <el-form-item label="创建时间:" >
                  <el-date-picker
                    v-model="chooseTime"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                    size="small">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="1.2" :offset="1">
                <el-form-item >
                    <el-button size="medium" type="primary" @click="loading" plain>搜索</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <el-form-item >
                    <el-button size="medium" @click="reset">重置</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <!-- 用户数据 -->
          <div style="margin-bottom: 10px">
            <el-button type="primary" size="medium" @click="addRole(0)">+ 新增</el-button>
          </div>
          <el-table
              :data="roleList"
              border
              style="width: 100%"
              v-loading = "loadings"
              @selection-change="handleSelectionChange">
              <el-table-column
                   fixed
                   width="100"
                   type="selection"
                  align="center">
              </el-table-column>
             <el-table-column
                  fixed
                  label="序号"
                  width="100"
                  type="index"
                  align="center">
             </el-table-column>
             <el-table-column
                  width="150"
                  label="角色名称"
  								align="center"
                  >
                  <template slot-scope="scope">{{ scope.row.roleName }}</template>
             </el-table-column>
             <el-table-column
                  label="角色标识"
                  width="120"
  								align="center">
                  <template slot-scope="scope">{{ scope.row.roleKey }}</template>
             </el-table-column>
  					 <el-table-column
  					      label="创建时间"
  					      width="180"
  								align="center">
  					      <template slot-scope="scope">{{ scope.row.createTime }}</template>
  					 </el-table-column>
             <el-table-column
                  label="状态"
                  width="100"
  								align="center">
                   <template slot-scope="scope">
                      <el-switch
                        v-model="scope.row.status"
                        :active-value="1"
                        :inactive-value="2"
                        active-color="#13ce66"
                        inactive-color=""
                        @change="status_switch(scope.row)">
                      </el-switch>
                   </template>
             </el-table-column>
             <el-table-column
                  label="备注"
                  width="180"
                  align="center">
                  <template slot-scope="scope">{{ scope.row.remark }}</template>
             </el-table-column>
             <el-table-column
                  label="操作"
  								align="center">
                   <template slot-scope="scope">
                     <el-button type="text" style="color:#4794F7" size="mini" @click="addUser(scope.row.id)">添加用户</el-button>
                     <el-button type="text" style="color:#19D185" size="mini" @click="addRole(scope.row.id)">修改</el-button>
                     <el-button type="text" style="color:#F52222" size="mini" @click="deleteRole(scope.row)">删除</el-button>
                   </template>
             </el-table-column>
          </el-table>
        </el-main>
        <el-footer>
           <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="selectParam.pageNum"
                :page-sizes="page_sizes"
                :page-size="selectParam.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
        </el-footer>
      </el-container>
    </div>
</template>

<script>
  import { isNotNull } from '@/utils/validate.js'
  import { findAll, deleteRole } from '@/api/system/roleManage.js'
  import RoleAdd  from '@/components/system/role/roleAdd.vue'
  import AddUser from '@/components/system/role/addUser.vue'

  export default{
    data() {
      return {
        selectParam: {
  				roleName: '',
          roleKey: '',
  				status: '',
          startTime: '',
          endTime: '',
          pageNum: 1,
          pageSize: 8
  			},
        chooseTime: [],
        statusOption: [
          { 'id': 1,value:'启动' },
          { 'id': 2,value:'停用' },
        ],
        roleList: [],
        page_sizes: [8, 16, 30, 50],
        total: 0,
        isShow : false,
        userShow: false,
        roleId: 0,
        isUpdate: false,
        loadings: true
      }
    },
    mounted() {
      this.loading()
    },
    filters:{
      statusFilter(val) {
        return { 1: '正常', 2: '停用'}[val]
      }
    },
    components:{
      RoleAdd, AddUser
    },
    methods: {
      loading(){
        if(isNotNull(this.chooseTime[0])){
          this.selectParam.startTime = this.chooseTime[0]
        }
        if(isNotNull(this.chooseTime[1])){
          this.selectParam.endTime = this.chooseTime[1]
        }
        const param = this.selectParam
        findAll(param).then(res => {
          this.roleList = res.data.data.list
          this.pageNum = res.data.data.pageNum
          this.total = res.data.data.total
          this.loadings = false
        })
      },
      addRole(id){
        this.isUpdate = false
        this.isShow = true
        this.roleId = id
      },
      //关闭弹窗
      closeIt(){
        this.isUpdate = false
        this.isShow = false
        this.roleId = 0
      },
      deleteRole(row){
        const id = row.id
        this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteRole({id: id}).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.loading()
          })
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: '已取消删除'
          });
        });
      },
  		reset(){
  			this.selectParam.roleName = ''
        this.selectParam.roleKey = ''
  			this.selectParam.status = ''
        this.chooseTime = []
  			this.loading()
  		},
  		detailUser(row) {
  			const type = 3
  			this.$router.push({
  			  name: 'userDetail',
  			  params: {
  			    type: type,
  			    id: row.id
  			  }
  			})
  		},
      //分页size改变时
      handleSizeChange(val){
        this.selectParam.pageSize = val
        this.loading()
      },
      //当前页改变触发
      handleCurrentChange(val){
        this.selectParam.pageNum = val
        this.loading()
      },
      handleSelectionChange(val){
        //获取选择对象中的id
        const ids = val.map(item => item.id)
      },
      //分配用户到角色
      addUser(id){
        this.roleId = id
        this.userShow = true
      },
      closeUser(){
        this.userShow = false
        this.roleId = 0
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
