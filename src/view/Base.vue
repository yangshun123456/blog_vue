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
            <el-col :span="1.2">
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
          <el-button type="primary" size="medium" @click="addUser">+ 新增</el-button>
        </div>
        <el-table
            :data="userList"
            border
            style="width: 100%"
            v-loading = "loadings">
           <el-table-column
                fixed
                label="序号"
                width="100"
                type="index"
								align="center">
           </el-table-column>
           <el-table-column
                label="昵称"
                width="120"
								align="center">
                <template slot-scope="scope">{{ scope.row.nickname }}</template>
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
                label="操作"
								align="center">
                 <template slot-scope="scope">
                   <el-button type="text" style="color:#4794F7" size="mini" @click="detailUser(scope.row)">详情</el-button>
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
  import { findAll, status, deleteUser } from '@/api/system/userManage.js'
  export default{
    data() {
      return {
        selectParam: {
					username: '',
					status: '',
          pageNum: 1,
          pageSize: 8
				},
        statusOption: [
          { 'id': 1,value:'启动' },
          { 'id': 2,value:'停用' },
        ],
        userList: [],
        page_sizes: [8, 16, 30, 50],
        total: 0,
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
    methods: {
      loading(){
        const param = this.selectParam
        findAll(param).then(res => {
          this.userList = res.data.data.list
          this.pageNum = res.data.data.pageNum
          this.total = res.data.data.total
          this.loadings = false
        })
      },

      status_switch(row){
        const status_val = row.status
        status({'userId': row.id}).then(res => {
          if(status_val === 1){
            row.status = 1
          }else if(status_val === 2){
            row.status = 2
          }
          this.$notify({
            title: '成功',
            message: (status_val === 2 ? '禁用' : '启用') + '成功',
            type: 'success',
            duration: 3000
          });
        }).catch(err => {
          if(status_val === 1){
            row.status = 2
          }else if(status_val === 2){
            row.status = 1
          }
        })
      },
      deleteUser(row){
        const id = row.id
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteUser({id: id}).then()
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.loading()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
			reset(){
				this.selectParam.username = ''
				this.selectParam.status = ''
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
