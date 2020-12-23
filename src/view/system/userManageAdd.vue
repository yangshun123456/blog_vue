<template>
	<el-container>
		<!-- 顶部容器 -->
		<el-header>
			<el-row :gutter="20">
			  <el-col :span="10"><el-button type="primary" plain size="mini" icon="el-icon-back" @click="back">返回</el-button></el-col>
			  <el-col :span="11"><div><p style="margin: auto;">用户新增</p></div></el-col>
			  <el-col :span="1"><el-button v-if="type != 3" type="primary" plain size="mini" @click="back" >取消</el-button></el-col>
			  <el-col :span="1"><el-button v-if="type != 3" type="primary" plain size="mini" @click="submit">确定</el-button></el-col>
        <el-col :span="1"></el-col>
			</el-row>
      <el-divider></el-divider>
		</el-header>
		<!-- 表格 -->
		<el-main>
      <el-form :inline="true" :model="formInline" label-width="250px" size="small" v-loading="loading" :rules="rules">
        <el-row :gutter="0">
          <el-col :span="12">
            <el-form-item label="头像: ">
                <el-upload
									:disabled="type == 3"
                  v-model="formInline.url"
                  class="avatar-uploader"
                  :action="upLoadUrl"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                  :limit="1">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户名: " style="position: absolute;bottom: 0;" prop="username">
                <el-input v-model="formInline.username" placeholder="请输入用户名" style="width: 300px;" :disabled="type == 3"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="12">
            <el-form-item label="密码: " prop="password">
                <el-input v-model="formInline.password" placeholder="请输入密码" style="width: 300px;" :disabled="type == 3"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="确认密码: " prop="password1" v-if="type != 3">
                  <el-input v-model="formInline.password1" placeholder="请再次输入密码" style="width: 300px;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="12">
            <el-form-item label="真实姓名: ">
                <el-input v-model="formInline.relname" placeholder="请输入姓名" style="width: 300px;" :disabled="type == 3"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="昵称: ">
                  <el-input v-model="formInline.nickname" placeholder="请输入昵称" style="width: 300px;" :disabled="type == 3"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="12">
            <el-form-item label="手机号: ">
                <el-input v-model="formInline.phone" placeholder="请输入手机号" style="width: 300px;" :disabled="type == 3"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱: ">
                  <el-input v-model="formInline.email" placeholder="请输入邮箱" style="width: 300px;" :disabled="type == 3"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="12">
            <el-form-item label="身份证号: " prop="idCard">
                <el-input v-model="formInline.idCard" placeholder="请输入手机号" style="width: 300px;" :disabled="type == 3"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱: ">
                  <el-input v-model="formInline.email" placeholder="请输入邮箱" style="width: 300px;" :disabled="type == 3"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="12">
            <el-form-item label="状态: ">
                <el-radio v-model="formInline.status" :label="1">启用</el-radio>
                <el-radio v-model="formInline.status" :label="2">禁用</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注: ">
              <el-input
							  :disabled="type == 3"
                type="textarea"
                :rows="3"
                placeholder="请输入内容"
                v-model="formInline.remark"
                style="width: 300px;">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
		</el-main>
		<!-- 末尾 -->
		<el-footer>

		</el-footer>
	</el-container>
</template>

<script>
  import { getToken } from '@/request/token.js'
  import { save, detail } from '@/api/system/userManage.js'
  export default{
    data() {
      return{
        type: this.$route.params.type,
        id: this.$route.params.id,
        imageUrl: '',
        upLoadUrl: process.env.BASE_API + '/public/upload?Token=' + getToken(),
        formInline: {
          status: 1
        },
        loading: false,
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          password1: [
            { required: true, message: '请再次输入密码', trigger: 'blur' }
          ],
          idCard: [
            { required: true, message: '请再次输入密码', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      this.initData()
    },
    methods: {
      back(){
        this.$router.go(-1)
      },
      initData(){
        if(this.type != 1) {
          detail({id: this.id}).then(res => {
            this.formInline = res.data.data
            this.formInline.password = null
						this.imageUrl = res.data.data.url
          })
        }
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = res.data.relPath
        this.formInline.url = res.data.relPath
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 5;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 图片 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 5MB!');
        }
        return isJPG && isLt2M;
      },
      submit(){
        this.loading = true
        save(this.formInline).then(res => {
          this.loading = false
          this.$router.go(-1)
        }).catch(err => {
          console.log(err)
          this.loading = false
        })
      }
    }
  }
</script>

<style>
   .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 60px;
      height: 60px;
      line-height: 60px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
</style>
