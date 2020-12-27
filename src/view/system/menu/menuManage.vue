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
          <el-button type="primary" size="medium" @click="addUser">+ 新增</el-button>
        </div>
          <el-table
            :data="tableData"
            style="width: 100%;margin-bottom: 20px;"
            row-key="id"
            border
            default-expand-all
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
						v-loading = "false">
						<el-table-column
						     width="150"
						     label="菜单名称"
						     >
						     <template slot-scope="scope">{{scope.row.menuName}}</template>
						</el-table-column>
						<el-table-column
						     width="150"
						     label="图标"
						     >
						     <template slot-scope="scope">{{scope.row.menuName}}</template>
						</el-table-column>
					</el-table>
      </el-main>  
      <el-footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
	import { findAll } from '@/api/system/menuManage.js'
	
  export default{
		data() {
		  return {
				selectParam: {}
		  }
		},
		mounted() {
		  
		},
		filters:{
		  statusFilter(val) {
		    return { 1: '正常', 2: '停用'}[val]
		  }
		},
		methods: {
		  
		},
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
