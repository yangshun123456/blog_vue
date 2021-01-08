<template>
  <div>
    <el-dialog
      title="菜单新增"
      :visible.sync="isShow"
      width="35%"
      :before-close="handleClose"
      class="dialog_title"
      :close-on-click-modal="false"
      >
      <el-form :model="formData" label-width="80px" id="showForm" :rules="rules">
        <el-row>
          <el-col :span="24">
						<el-form-item label="上级菜单:" label-width="90px">
							<treeselect
								v-model="formData.parentId"
								:options="menuData"
								:normalizer="normalizer"
								:show-count="true"
								placeholder="选择上级菜单"
							/>
						</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单类型:" label-width="90px">
              <el-radio-group v-model="formData.menuType" style="position: relative;top: 3px;">
                <el-radio label="M">目录</el-radio>
                <el-radio label="C">菜单</el-radio>
                <el-radio label="F">按钮</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="4">
            <el-form-item label="是否启用:">
              <el-switch
                v-model="formData.status"
                active-color="#13ce66"
                :active-value="1"
                :inactive-value="2">
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item v-if="formData.menuType != 'F'" label="菜单图标:" label-width="90px">
              <el-popover
                placement="bottom-start"
                width="460"
                trigger="click"
                @show="$refs['iconSelect'].reset()"
              >
                <IconSelect ref="iconSelect" @selected="selected" />
                <el-input slot="reference" v-model="formData.icoUrl" placeholder="点击选择图标" readonly>
                  <svg-icon
                    v-if="formData.icoUrl"
                    slot="prefix"
                    :icon-class="formData.icoUrl"
                    class="el-input__icon"
                    style="height: 32px;width: 16px;"
                  />
                  <i v-else slot="prefix" class="el-icon-search el-input__icon" />
                </el-input>
              </el-popover>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item label="菜单名称:" prop="menuName" label-width="90px">
              <el-input v-model="formData.menuName" placeholder="请输入菜单名称"/>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item label="显示顺序:">
              <el-input-number v-model="formData.orderNum" :min="1" :max="10" size="small"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
             <el-form-item label="路由地址:" label-width="90px">
               <el-input v-model="formData.routerName" placeholder="请输入路由地址"></el-input>
             </el-form-item>
          </el-col>
          <el-col :span="6" :offset="18">
            <el-button type="primary" @click="submit">确定</el-button>
            <el-button @click="handleClose">取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { getPermission, save, detail} from '@/api/system/menuManage.js'
  // import the component
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  import IconSelect from "@/components/IconSelect"
  import { Loading } from 'element-ui'


  export default{
    data() {
      return {
       menuData: [],
			 formData: {
				 menuType: 'M',
         icoUrl: '',
         orderNum: 1,
         status: 1,
				 parentId: 0
			 },
			 rules:{
				 menuName:[
					  { required: true, message: '请输入菜单名称', trigger: 'blur' }
				 ]
			 }
      }
    },
    props:{
      id: Number,
			isShow: Boolean,
			isUpdate: Boolean
    },
		components:{
			Treeselect,IconSelect
		},
    mounted() {
			// this.getMenu()
    },
    watch:{
      isShow(val,newVal){
				this.formData = {
				 menuType: 'M',
         icoUrl: '',
         orderNum: 1,
         status: 1,
				 parentId: 0
			 }
				this.menuData = []
				//如果是修改界面
				if(this.isUpdate){
					const param = {
						id: this.id
					}
					detail(param).then(res => {
						this.formData = res.data.data
						this.getMenu(this.formData.parentId)
					})
				}else{
					this.getMenu(this.id)
					this.formData.parentId = this.id
				}
      }
    },
    methods:{
      // 获取父级菜单
      getMenu(id){
        const param = {
          menuId: id
        }
        getPermission(param).then(res => {
          this.menuData = res.data.data
					const top = {
						menuId: 0,
						menuName: '顶部',
						parentId: 0,
						children: []
					}
					this.menuData.unshift(top)
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
      //关闭组件
			handleClose(){
        //触发父组件的方法，并向方法中传递数值
				this.formData = {}
				this.menuData = []
        this.$emit('closeIt')
      },
      selected(name) {
        this.formData.icoUrl = name
      },
      submit(){
        var param = this.formData
        save(param).then(res => {
					this.$message({
						type: 'success',
						message: this.isUpdate ? '修改成功':'新增成功'
					});
          this.$emit('closeIt')
        }).catch(err => {})
      }
    },

  }
</script>

<style>
  .dialog_title {
    font-size: 9px;
    font-family: "microsoft yahei";
  }
</style>
