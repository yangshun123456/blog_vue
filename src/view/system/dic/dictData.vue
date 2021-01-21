<template>
  <div>
    <el-container>
      <el-header height="10px">

      </el-header>
      <el-main>
        <!-- 搜索框 -->
        <el-form :inline="true" :model="selectParam" class="demo-form-inline">
          <el-row>
            <el-col :span="2">
              <el-button type="primary" plain size="mini" icon="el-icon-back" @click="back" style="position: relative; top: 5px;">返回</el-button>
            </el-col>
            <el-col :span="5" >
              <el-form-item label="字典类型:">
                <el-select v-model="selectParam.dictType" placeholder="请选择字典类型" @change="select">
                  <el-option
                    v-for="item in types"
                    :key="item.dictType"
                    :label="item.dictName"
                    :value="item.dictType">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4" :offset="1">
              <el-form-item label="字典名称:">
                  <el-input v-model="selectParam.dictName" placeholder="请输入字典类型" class="half" size="small"></el-input>
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
          <el-button type="primary" size="medium" @click="updateData(1)">+ 新增</el-button>
        </div>
        <el-table
            :data="dataList"
            border
            style="width: 100%"
            v-loading = "loadings">
           <el-table-column
                fixed
                label="序号"
                width="220"
                type="index"
								align="center">
           </el-table-column>
           <el-table-column
                label="字典标签"
                width="220"
								align="center">
                <template slot-scope="scope">{{ scope.row.dictLabel }}</template>
           </el-table-column>
           <el-table-column
                label="字典键值"
                width="220"
                align="center">
                <template slot-scope="scope">{{ scope.row.dictValue }}</template>
           </el-table-column>
           <el-table-column
                label="字典键值"
                width="220"
                align="center">
                <template slot-scope="scope">{{ scope.row.dictSort }}</template>
           </el-table-column>
           <el-table-column
                label="备注"
                width="220"
                align="center">
                <template slot-scope="scope">{{ scope.row.remark }}</template>
           </el-table-column>
           <el-table-column
                label="创建时间"
                width="220"
                align="center">
                <template slot-scope="scope">{{ scope.row.createTime }}</template>
           </el-table-column>
           <el-table-column
                label="操作"
								align="center">
                 <template slot-scope="scope">
                   <el-button type="text" style="color:#19D185" size="mini" @click="updateData(2,scope.row)">修改</el-button>
                   <el-button type="text" style="color:#F52222" size="mini" @click="deleteData(scope.row)">删除</el-button>
                 </template>
           </el-table-column>
        </el-table>
        <!-- 新增、修改 -->
        <el-dialog
          :title="this.type == 1 ? '新增数据' : '修改数据'"
          :visible.sync="isShow"
          width="30%"
          :before-close="handleClose"
          :close-on-click-modal="false">
          <div :loading="dialogLoading">
            <el-form ref="formData"
              :model="formData"
              label-width="80px">
              <el-form-item
                label="字典类型:"
                prop="dictType"
                :rules="{ required: true, message: '请输入字典类型', trigger: 'blur' }"
                label-width="90px">
                <el-select v-model="formData.dictType" placeholder="请选择字典类型" @change="select">
                  <el-option
                    v-for="item in types"
                    :key="item.dictType"
                    :label="item.dictName"
                    :value="item.dictType">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="数据名称:"
                prop="dictLabel"
                :rules="{ required: true, message: '请输入数据名称', trigger: 'blur' }"
                label-width="90px">
                <el-input v-model="formData.dictLabel" placeholder="请输入数据名称"/>
              </el-form-item>
              <el-form-item label="数据键值:"
                prop="dictValue"
                :rules="{ required: true, message: '请输入数据键值', trigger: 'blur' }"
                label-width="90px">
                <el-input v-model="formData.dictValue" placeholder="请输入数据键值"/>
              </el-form-item>
              <el-form-item label="显示顺序:" label-width="90px">
                <el-input-number v-model="formData.dictSort" :min="1" :max="50" size="small"/>
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
  import { listData, dataDetail, dataDelete, saveData, getDictType } from '@/api/system/dicManager.js'
  export default{
    data() {
      return {
        selectParam: {
					dictName: '',
          dictType: '',
          pageNum: 1,
          pageSize: 8
				},
        statusOption: [
          { 'id': 1,value:'启动' },
          { 'id': 2,value:'停用' },
        ],
        dataList: [],
        page_sizes: [8, 16, 30, 50],
        total: 0,
        loadings: true,
        types: [],
        buttonLoading: false,

        type: 1,
        isShow: false,
        formData: {
          status: 1,
          dictSort: 1
        },
        dialogLoading: false
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
        this.selectParam.dictType = this.$route.query.type
        this.formData.dictType = this.$route.query.type
        const param = this.selectParam
        listData(param).then(res => {
          this.dataList = res.data.data.list
          this.pageNum = res.data.data.pageNum
          this.total = res.data.data.total
          this.loadings = false
        })
        // 下拉栏初始化
        getDictType().then(res => {
          this.types = res.data.data
        })
      },
      dataDelete(row){
        const id = row.dictCode
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteDic({id: id}).then()
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
				this.selectParam.dictName = ''
        this.selectParam.dictType = ''
			},
      // 返回
      back(){
        this.$router.go(-1)
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
      //下拉框选择触发
      select(){
        this.loading()
        this.formData.dictType = this.selectParam.dictType
      },
      handleClose(){
        this.isShow = false
      },
      save(){
        const param = this.formData
        this.buttonLoading = true
        this.$refs['formData'].validate((res, valid) => {
          if(res){
            saveData(param).then(res => {
              this.buttonLoading = false
              this.isShow = false
              this.formData = {
                status: 1,
                dictSort: 1
              }
              this.loading()
            }).catch(err => {
              this.buttonLoading = false
            })
          }else{
            this.buttonLoading = false
            return false
          }
        })
      },
      // 新增/修改
      updateData(type, row){
        if(type === 2){
          this.dialogLoading = true
          dataDetail({id: row.dictCode}).then(res => {
            this.formData = res.data.data
            this.dialogLoading = false
          }).catch(err => {
            this.dialogLoading = false
          })
        }
        this.isShow = true
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
