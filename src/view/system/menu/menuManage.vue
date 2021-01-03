<template>
  <div>
    <el-container>
      <el-header height="10px">
      </el-header>
      <el-main>
				<menuAdd :isShow="isShow" @closeIt="closeIt" :id="menuId" :isUpdate="isUpdate"></menuAdd>
        <!-- 搜索框 -->
        <el-form :inline="true" :model="selectParam" class="demo-form-inline">
          <el-row>
            <el-col :span="4" :offset="1">
              <el-form-item label="菜单名称:">
                  <el-input v-model="selectParam.menuName" placeholder="请输入菜单名称" class="half" size="small"></el-input>
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
          <el-button type="primary" size="medium" @click="showIt(0)">+ 新增</el-button>
        </div>
          <el-table
            :data="tableData"
            style="width: 100%;margin-bottom: 20px;"
            row-key="menuId"
            border
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
						v-loading = "loadings">
						<el-table-column
						     width="200"
						     label="菜单名称"
								 align="center"
						     >
						     <template slot-scope="scope">{{scope.row.menuName}}</template>
						</el-table-column>
						<el-table-column
						     width="80"
						     label="图标"
								 align="center"
						     >
						     <template slot-scope="scope"><svg-icon :icon-class="scope.row.icoUrl" /></template>
						</el-table-column>
						<el-table-column
						     width="80"
						     label="排序"
								 align="center"
						     >
						     <template slot-scope="scope">{{scope.row.orderNum}}</template>
						</el-table-column>
						<el-table-column
						     width="100"
						     label="权限标识"
								 align="center"
						     >
						     <template slot-scope="scope">{{scope.row.menuType | permsFilter}}</template>
						</el-table-column>
						<el-table-column
						     width="300"
						     label="组件路径"
								 align="center"
						     >
						     <template slot-scope="scope">{{scope.row.routerName}}</template>
						</el-table-column>
						<el-table-column
						     width="300"
						     label="后台权限"
								 align="center"
						     >
						     <template slot-scope="scope">{{scope.row.perms}}</template>
						</el-table-column>
						<el-table-column
						     width="150"
						     label="状态"
								 align="center"
						     >
						     <template slot-scope="scope">
									 <el-switch
									   v-model="scope.row.status"
									   active-color="#13ce66"
									   :active-value="1"
									   :inactive-value="2"
										 @change="status(scope.row.menuId)">
									 </el-switch>
								 </template>
						</el-table-column>
						<el-table-column
						     width="200"
						     label="创建时间"
								 align="center"
						     >
						     <template slot-scope="scope">{{scope.row.createTime}}</template>
						</el-table-column>
						<el-table-column
						     label="操作"
								 align="center">
						      <template slot-scope="scope">
						        <el-button type="text" style="color:#4794F7" size="mini" @click="showIt(scope.row.menuId)">新增</el-button>
						        <el-button type="text" style="color:#19D185" size="mini" @click="update(scope.row.menuId)">修改</el-button>
						        <el-button type="text" style="color:#F52222" size="mini" @click="deleteMenu(scope.row)">删除</el-button>
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
	import { findAll, deleteMenu, status } from '@/api/system/menuManage.js'
  import menuAdd from '@/components/system/menu/menuAdd.vue'

  export default{
		data() {
		  return {
				selectParam: {},
        tableData: [],
        statusOption: [
          { 'id': 1,value:'启动' },
          { 'id': 2,value:'停用' },
        ],
				loadings: true,
        isShow : false,
        menuId: 0,
				isUpdate: false
		  }
		},
		mounted() {
			this.loading()
		},
		filters:{
		  statusFilter(val) {
		    return { 1: '正常', 2: '停用'}[val]
		  },
      permsFilter(val) {
        return { M: '目录','C': '菜单',F: '按钮' }[val]
      }
		},
		components:{
			menuAdd
		},
		methods: {
      loading(){
				const param = {
					menuName : this.selectParam.menuName,
					status : this.selectParam.status
				}
				findAll(param).then(res => {
					this.tableData = res.data.data
					this.loadings = false
				}).catch(err =>{
					this.loadings = false
				})
      },
      reset(){
      	this.selectParam.menuName = ''
      	this.selectParam.status = ''
      	this.loading()
      },
			//页面关闭
      closeIt(){
        this.isShow = false
				this.isUpdate = false
				this.loading()
      },
			//新增页面显示
      showIt(id){
        this.isShow = true
        this.menuId = id
				this.isUpdate = false
      },
			//删除菜单
			deleteMenu(row){
				this.$confirm('此操作将永久删除该菜单, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					const param = {
						id: row.menuId
					}
					deleteMenu(param).then(res => {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.loading()
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});          
				});
			},
			//修改界面显示
			update(id){
				this.isShow = true
				this.menuId = id
				this.isUpdate = true
			},
			//修改状态
			status(id){
				const param = {
					id: id
				}
				status(param).then(res => {
					this.$message({
						type: 'success',
						message: res.data.data === 1 ? '启用成功': '禁用成功'
					});
					this.loading()
				}).catch(err => {
					
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
