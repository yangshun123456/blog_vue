<template>
  <section class="main">
  	<div class="layer">
  		<div class="bottom-grid">
  			<div class="logo">
  				<h1> <a href="login1.jsp"><span class="fa fa-key"></span> Key</a></h1>
  			</div>
  			<div class="links">
  				<ul class="links-unordered-list">
  					<li class="active">
  						<a href="#" class="">login</a>
  					</li>
  					<li class="">
  						<a href="#" class="">about</a>
  					</li>
  					<li class="">
  						<a href="#" class="">register</a>
  					</li>
              <li class="">
  						<a href="#" class="">contact</a>
  					</li>
  				</ul>
  			</div>
  		</div>
  		<div class="content-w3ls">
  			<div class="text-center icon">
  				<span class="fa fa-html5"></span>
  			</div>
  			<div class="content-bottom">
  				<form action="admin/login" method="post">
  					<div class="field-group">
  						<span class="fa fa-user" aria-hidden="true"></span>
  						<div class="wthree-field">
  							<input name="acname" id="text1" type="text" value="" placeholder="Username" required="required" v-model="formData.username">
  						</div>
  					</div>
  					<div class="field-group">
  						<span class="fa fa-lock" aria-hidden="true"></span>
  						<div class="wthree-field">
  							<input name="apassword" id="myInput" type="Password" placeholder="Password" required="required" v-model="formData.password">
  						</div>
  					</div>
  					<div class="field-group" style="width: 150px;float: left">
  						<div class="wthree-field">
  							<input name="pic" id="pic" type="text" value="" placeholder="请输入验证码" v-model="formData.captcha" @keypress.enter="logins">
  						</div>
  					</div>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
  					<a href="javascript:;" @click="changePic"><img :src="captchas.relPath" alt="验证码" id="safecode" style="width: 130px;"></a>
  					<div class="wthree-field">
  						<button type="button" class="btn" @click="logins">submit</button>
  					</div>
  					<ul class="list-login">
  						<li class="switch-agileits">
  							<label class="switch">
  								<input type="checkbox">
  								<span class="slider round"></span>
  								remenber
  							</label>
  						</li>
  						<li>
  							<a href="#" class="text-right">forgot?</a>
  						</li>
  						<li class="clearfix"></li>
  					</ul>
  					<ul class="list-login-bottom">
  						<li class="">
  							<a href="#" class="">create</a>
  						</li>
  						<li class="">
  							<a href="#" class="text-right">help?</a>
  						</li>
  						<li class="clearfix"></li>
  					</ul>
  				</form>
  			</div>
  		</div>
  		<div class="bottom-grid1">
  			<div class="links">
  				<ul class="links-unordered-list">
  					<li class="">
  						<a href="#" class="">about</a>
  					</li>
  					<li class="">
  						<a href="#" class="">privacy_policy</a>
  					</li>
  					<li class="">
  						<a href="#" class="">use</a>
  					</li>
  				</ul>
  			</div>
  			<div class="copyright">
  				<p>language
  					<a href="?lang=zh_CN">language_ch</a>&nbsp&nbsp&nbsp
  					<a href="?lang=en_US">language_en</a>
  				</p>
  			</div>
  		</div>
      </div>
  </section>
</template>

<script>
  import { captcha } from '@/api/login.js'

  export default{
    data() {
      return{
        formData:{},
        captchas: {
           'path': '',
           'relPath': ''
        }
      }
    },
    methods:{
      logins(){
        //对当前loginForm进行验证，验证属性
        // debugger
        let formDatas = {
          "username": this.formData.username,
          "password": this.formData.password,
          "captcha": this.formData.captcha,
          "captchaKey": this.captchas.path
        }
        if(formDatas.username == null || formDatas.username == ''){
          this.$message({
            message: '用户名未填写',
            type: 'error'
          })
          return
        }
        if(formDatas.password == null || formDatas.password == ''){
          this.$message({
            message: '密码未填写',
            type: 'error'
          })
          return
        }
        if(formDatas.captcha == null || formDatas.captcha == ''){
          this.$message({
            message: '验证码未填写',
            type: 'error'
          })
          return
        }
        this.$store.dispatch('login', formDatas).then((res)=>{
          // setToken(res.data.data)
          this.$router.push("/")
        }).catch((error) => {
            if (error !== 'error') {
              this.$message({message: error, type: 'error', showClose: true});
            }
            this.changePic()
        })
      },
      changePic(){
        const params = {'key': this.captchas.path};
        captcha(params).then(res => {
          this.captchas = res.data.data
        })
      }
    },
    mounted() {
      captcha().then(res => {
        this.captchas = res.data.data
        console.log(this.captchas)
      })
    },
    created() {

    }
  }
</script>

<style>
  @import url("../assets/mydesign/css/font-awesome.min.css");
  @import url("../assets/mydesign/css/style.css");
</style>
