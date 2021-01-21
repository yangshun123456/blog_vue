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
                  <el-input v-model="selectParam.typeName" placeholder="请输入字典名称" class="half" size="small"></el-input>
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
          <el-button type="primary" size="medium" @click="openDict(1)">+ 新增</el-button>
        </div>
        <el-table
            :data="dictList"
            border
            style="width: 100%"
            v-loading = "loadings">
           <el-table-column
                fixed
                label="编号"
                width="220"
                type="index"
								align="center">
           </el-table-column>
           <el-table-column
                fixed
                label="字典名称"
                width="220"
								align="center">
                <template slot-scope="scope">{{ scope.row.dictName }}</template>
           </el-table-column>
           <el-table-column
                fixed
                label="字典类型"
                width="220"
                align="center">
                <template slot-scope="scope">
                  <el-link type="primary"
                  :underline="false"
                  @click="detailDict(scope.row)">
                    {{ scope.row.dictType }}
                  </el-link>
                </template>
           </el-table-column>
           <el-table-column
                fixed
                label="备注"
                width="220"
           								align="center">
                <template slot-scope="scope">{{ scope.row.remark }}</template>
           </el-table-column>
           <el-table-column
                fixed
                label="创建时间"
                width="220"
           								align="center">
                <template slot-scope="scope">{{ scope.row.createTime }}</template>
           </el-table-column>
           <el-table-column
                label="状态"
                width="220"
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
                   <el-button type="text" style="color:#19D185" size="mini" @click="openDict(2,scope.row)">修改</el-button>
                   <el-button type="text" style="color:#F52222" size="mini" @click="deleteDic(scope.row)">删除</el-button>
                 </template>
           </el-table-column>
        </el-table>

        <!-- 新增、修改 -->
        <el-dialog
          :title="this.type == 1 ? '新增类型' : '修改类型'"
          :visible.sync="isShow"
          width="30%"
          :before-close="handleClose"
          :close-on-click-modal="false">
          <div :loading="dialogLoading">
            <el-form ref="formData"
              :model="formData"
              label-width="80px">
              <el-form-item label="字典名称:"
                prop="dictName"
                :rules="{ required: true, message: '请输入字典名称', trigger: 'blur' }"
                label-width="90px">
                <el-input v-model="formData.dictName" placeholder="请输入字典名称"/>
              </el-form-item>
              <el-form-item label="字典类型:"
                prop="dictType"
                :rules="{ required: true, message: '请输入字典类型', trigger: 'blur' }"
                label-width="90px">
                <el-input v-model="formData.dictType" placeholder="请输入字典类型"/>
              </el-form-item>
              <el-form-item label="状态:" label-width="90px">
                <el-radio-group v-model="formData.status" style="position: relative; top: 5px;">
                  <el-radio :label="1">启用</el-radio>
                  <el-radio :label="2">禁用</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="备注:" label-width="90px">
               <el-input v-model="formData.remark" placeholder="请输入备注"/>
              </el-form-item>
              <el-row>
                <el-col :span="12" :offset="14">
                  <el-button type="primary" size="medium" @click="save" :loading="buttonLoading" style="width: 100px;">保存</el-button>
                  <el-button type="primary" size="medium" @click="handleClose" style="width: 100px;">取消</el-button>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-dialog>
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
  import { findAll, status, deleteType, detail, save } from '@/api/system/dicManager.js'
  export default{
    data() {
      return {
        selectParam: {
					typeName: '',
					status: '',
          pageNum: 1,
          pageSize: 8
				},
        statusOption: [
          { 'id': 1,value:'启动' },
          { 'id': 2,value:'停用' },
        ],
        dictList: [],
        page_sizes: [8, 16, 30, 50],
        total: 0,
        loadings: true,
        dialogLoading: false,
        buttonLoading: false,

        isShow: false,
        formData: {
          status: 1
        },
        type: 1
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
          this.dictList = res.data.data.list
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
      deleteDic(row){
        const id = row.dictId
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteType({id: id}).then()
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
				this.selectParam.typeName = ''
				this.selectParam.status = ''
				this.loading()
			},
			detailDict(row) {
        this.$router.push({
          path: 'dictData',
          query: {
            type: row.dictType
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
      // 关闭dialog
      handleClose(){
        this.isShow = false
      },
      // 新增/修改类型，打开窗口
      openDict(type, row){
        this.type = type
        this.isShow = true
        if(type === 2){
          this.dialogLoading = true
          detail({id: row.dictId}).then(res => {
            this.formData = res.data.data
            this.dialogLoading = false
          }).catch(err => {
            this.dialogLoading = false
          })
        }
      },
      // 保存
      save(){
        this.$refs['formData'].validate((res, valid) => {
           if (res) {
              this.buttonLoading = true
              save(this.formData).then(res => {
                this.buttonLoading = false
                this.isShow = false
                this.loading()
              }).catch(err => {
                this.buttonLoading = false
              })
           } else {
              return false;
           }
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
