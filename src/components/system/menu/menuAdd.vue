<template>
  <div>
    <el-dialog
      title="菜单新增"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">
      <el-form :model="formData" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="24">
            <treeselect
              v-model="formData.parentId"
              :options="menuData"
              :normalizer="normalizer"
              :show-count="true"
              placeholder="选择上级菜单"
            />
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6"></el-col>
          <el-col :span="12"></el-col>
        </el-row>
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
      return:{
       menuData: []
      }
    },
    props:{
      id: Number
    },
    mounted() {

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
    },

  }
</script>

<style>
</style>
