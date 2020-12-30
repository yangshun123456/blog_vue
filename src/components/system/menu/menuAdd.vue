<template>
  <div>
    <el-dialog
      title="菜单新增"
      :visible.sync="isShow"
      width="35%"
      :before-close="handleClose">
      <el-form :model="formData" label-width="80px" >
        <el-row>
          <el-col :span="24">
						<el-form-item label="上级菜单:">
							<treeselect
								v-model="formData.parentId"
								:options="menuData"
								:normalizer="normalizer"
								:show-count="true"
								placeholder="选择上级菜单"
							/>
						</el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="菜单类型:">
              <el-radio-group v-model="formData.menuType">
                <el-radio label="M">目录</el-radio>
                <el-radio label="C">菜单</el-radio>
                <el-radio label="F">按钮</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12"></el-col>
        </el-row>
				<el-col :span="24">
				  <el-form-item v-if="formData.menuType != 'F'" label="菜单图标">
				    <el-popover
				      placement="bottom-start"
				      width="460"
				      trigger="click"
				      @show="$refs['iconSelect'].reset()"
				    >
				      
				    </el-popover>
				  </el-form-item>
				</el-col>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { getPermission } from '@/api/system/menuManage.js'
  // import the component
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'


  export default{
    data() {
      return {
       menuData: [],
			 formData: {
				 menuType: 'M'
			 }
      }
    },
    props:{
      id: Number,
			isShow: Boolean
    },
		components:{
			Treeselect,IconSelect
		},
    mounted() {
			this.getMenu()
    },
    methods:{
      getMenu(){
        getPermission().then(res => {
          this.menuData = res.data.data
        })
      },
      /** 转换菜单数据结构 */
      normalizer(node) {
        if (node.children && !node.children.length) {
          delete node.children;
        }
        return {
          id: node.menuId,
          label: node.menuName,
          children: node.children
        };
      },
			handleClose(){}
    },

  }
</script>

<style>
</style>
