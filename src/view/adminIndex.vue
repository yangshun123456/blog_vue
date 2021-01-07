<template>
  <div class="lyear-layout-web">
    <div class="lyear-layout-container">
      <!--左侧导航-->
      <aside class="lyear-layout-sidebar">

        <!-- logo -->
        <div id="logo" class="sidebar-header">
          <a href="index.html"><img src="../assets/images/logo-sidebar.png" title="LightYear" alt="LightYear" /></a>
        </div>
        <div class="lyear-layout-sidebar-info lyear-scroll">
          <nav class="sidebar-main">
						<!-- <el-menu
							default-active="2"
							class="el-menu-vertical-demo"
              :collapse="isCollapse">
							<span v-for="(item,index) in permissions" :index="item.menuId+''" :key="item.menuId">
                <span v-if="typeof(item.children) == 'undefined' || item.children.length === 0">
                  <router-link :to="item.routerName">
                    <el-menu-item  :index="item.menuId+''">
                        <svg-icon :icon-class="item.icoUrl" /> &nbsp;&nbsp;
                        <span slot="title">{{ item.menuName }}</span>
                    </el-menu-item>
                  </router-link>
                </span>
                <span v-else>
                  <router-link :to="item.routerName">
                    <el-submenu>
                      <template slot="title">
                        <svg-icon :icon-class="item.icoUrl"/> &nbsp;&nbsp;
                        <span slot="title">{{ item.menuName }}</span>
                      </template>
                      <span v-for="(item_ch,index_ch) in item.children" :key="item_ch.menuId">
                        <router-link :to="item_ch.routerName">
                          <el-menu-item :index="item_ch.menuId+''" >
                            <svg-icon :icon-class="item_ch.icoUrl" /> &nbsp;&nbsp;
                            <span slot="title" >{{ item_ch.menuName }}</span>
                          </el-menu-item>
                        </router-link>
                      </span>
                    </el-submenu>
                  </router-link>
                </span>
							</span>
						</el-menu> -->
            <ul class="nav-drawer" v-for="(item,index) in permissions" :index="item.menuId+''" :key="item.menuId">
              <li class="nav-item active" v-if="typeof(item.children) == 'undefined' || item.children.length === 0" >
                <router-link class="multitabs" :to="item.routerName" >
                  <i class="mdi"><svg-icon :icon-class="item.icoUrl" />&nbsp;</i>
                  <span>{{ item.menuName }}</span>
                </router-link>
              </li>
              <li v-else class="nav-item nav-item-has-subnav" >
                <router-link :to="item.routerName" class="multitabs">
                  <i class="mdi"><svg-icon :icon-class="item.icoUrl"/>&nbsp;</i>
                  <span>{{ item.menuName }}</span>
                </router-link>
                <ul class="nav nav-subnav">
                  <span v-for="(item_ch,index_ch) in item.children" :index="item_ch.menuId+''" :key="item_ch.menuId">
                    <li>
                      <router-link :to="item_ch.routerName" class="multitabs">
                        <i class="mdi"><svg-icon :icon-class="item_ch.icoUrl" />&nbsp;&nbsp;</i>
                        <span>{{ item_ch.menuName }}</span>
                      </router-link>
                    </li>
                  </span>
                </ul>
              </li>
            </ul>
            <!-- <ul class="nav-drawer">
              <li class="nav-item active"> <a class="multitabs" href="lyear_main.html"><i class="mdi mdi-home"></i> <span>后台首页</span></a> </li>
              <li class="nav-item nav-item-has-subnav">
                <a href="javascript:void(0)"><i class="mdi mdi-palette"></i> <span>系统管理</span></a>
                <ul class="nav nav-subnav">
                  <li> <router-link to="/adminIndex/system/user" class="multitabs" >用户管理</router-link> </li>
									<li> <router-link to="/adminIndex/system/menuManage" class="multitabs" >菜单管理</router-link> </li>
                  <li> <router-link to="/adminIndex/system/systemInfo" class="multitabs" >系统信息</router-link> </li>
                </ul>
              </li>
            </ul> -->
          </nav>

          <div class="sidebar-footer">
            <p class="copyright">Copyright &copy; 2019. <a target="_blank" href="http://lyear.itshubao.com">IT书包</a> All rights reserved.</p>
          </div>
        </div>

      </aside>
      <!--End 左侧导航-->

      <!--头部信息-->
      <header class="lyear-layout-header">

        <nav class="navbar">

          <div class="navbar-left align-items-center d-flex">
            <div class="lyear-aside-toggler" style="float: left;" @click="closeSide">
              <span class="lyear-toggler-bar"></span>
              <span class="lyear-toggler-bar"></span>
              <span class="lyear-toggler-bar"></span>
            </div>
            <!-- <el-button type="normal" icon="el-icon-s-fold" size="medium" style="border: none;" :plain="true" @click="closeSide"/> &nbsp;&nbsp; -->
            <div>
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item v-for="(item,index) in titleMessage" :key="index" :to="item.path">{{item.meta.title}}</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
          </div>

          <ul class="navbar-right d-flex align-items-center">
            <li class="dropdown dropdown-notice">
              <span data-toggle="dropdown" class="icon-item">
                <i class="mdi mdi-bell-outline"></i>
                <span class="badge badge-danger">10</span>
              </span>
              <div class="dropdown-menu dropdown-menu-right">
                <div class="lyear-notifications">

                  <div class="lyear-notifications-title clearfix"  data-stopPropagation="true"><a href="#!" class="float-right">查看全部</a>你有 10 条未读消息</div>
                  <div class="lyear-notifications-info lyear-scroll">
                    <a href="#!" class="dropdown-item" title="树莓派销量猛增，疫情期间居家工作学习、医疗领域都需要它">树莓派销量猛增，疫情期间居家工作学习、医疗领域都需要它</a>
                    <a href="#!" class="dropdown-item" title="GNOME 用户体验团队将为 GNOME Shell 提供更多改进">GNOME 用户体验团队将为 GNOME Shell 提供更多改进</a>
                    <a href="#!" class="dropdown-item" title="Linux On iPhone 即将面世，支持 iOS 的双启动">Linux On iPhone 即将面世，支持 iOS 的双启动</a>
                    <a href="#!" class="dropdown-item" title="GitHub 私有仓库完全免费面向团队提供">GitHub 私有仓库完全免费面向团队提供</a>
                    <a href="#!" class="dropdown-item" title="Wasmtime 为 WebAssembly 增加 Go 语言绑定">Wasmtime 为 WebAssembly 增加 Go 语言绑定</a>
                    <a href="#!" class="dropdown-item" title="红帽借“订阅”成开源一哥，首创者 Cormier 升任总裁">红帽借“订阅”成开源一哥，首创者 Cormier 升任总裁</a>
                    <a href="#!" class="dropdown-item" title="Zend 宣布推出两项 PHP 新产品">Zend 宣布推出两项 PHP 新产品</a>
                  </div>

                </div>
              </div>
            </li>
            <!--切换主题配色-->
  		  <li class="dropdown dropdown-skin">
  		    <span data-toggle="dropdown" class="icon-item"><i class="mdi mdi-palette"></i></span>
  			<ul class="dropdown-menu dropdown-menu-right" data-stopPropagation="true">
  			  <li class="drop-title"><p>LOGO</p></li>
  			  <li class="drop-skin-li clearfix">
                  <span class="inverse">
                    <input type="radio" name="logo_bg" value="default" id="logo_bg_1" checked>
                    <label for="logo_bg_1"></label>
                  </span>
                  <span>
                    <input type="radio" name="logo_bg" value="color_2" id="logo_bg_2">
                    <label for="logo_bg_2"></label>
                  </span>
                  <span>
                    <input type="radio" name="logo_bg" value="color_3" id="logo_bg_3">
                    <label for="logo_bg_3"></label>
                  </span>
                  <span>
                    <input type="radio" name="logo_bg" value="color_4" id="logo_bg_4">
                    <label for="logo_bg_4"></label>
                  </span>
                  <span>
                    <input type="radio" name="logo_bg" value="color_5" id="logo_bg_5">
                    <label for="logo_bg_5"></label>
                  </span>
                  <span>
                    <input type="radio" name="logo_bg" value="color_6" id="logo_bg_6">
                    <label for="logo_bg_6"></label>
                  </span>
                  <span>
                    <input type="radio" name="logo_bg" value="color_7" id="logo_bg_7">
                    <label for="logo_bg_7"></label>
                  </span>
                  <span>
                    <input type="radio" name="logo_bg" value="color_8" id="logo_bg_8">
                    <label for="logo_bg_8"></label>
                  </span>
  			  </li>
  			  <li class="drop-title"><p>头部</p></li>
  			  <li class="drop-skin-li clearfix">
                  <span class="inverse">
                    <input type="radio" name="header_bg" value="default" id="header_bg_1" checked>
                    <label for="header_bg_1"></label>
                  </span>
                  <span>
                    <input type="radio" name="header_bg" value="color_2" id="header_bg_2">
                    <label for="header_bg_2"></label>
                  </span>
                  <span>
                    <input type="radio" name="header_bg" value="color_3" id="header_bg_3">
                    <label for="header_bg_3"></label>
                  </span>
                  <span>
                    <input type="radio" name="header_bg" value="color_4" id="header_bg_4">
                    <label for="header_bg_4"></label>
                  </span>
                  <span>
                    <input type="radio" name="header_bg" value="color_5" id="header_bg_5">
                    <label for="header_bg_5"></label>
                  </span>
                  <span>
                    <input type="radio" name="header_bg" value="color_6" id="header_bg_6">
                    <label for="header_bg_6"></label>
                  </span>
                  <span>
                    <input type="radio" name="header_bg" value="color_7" id="header_bg_7">
                    <label for="header_bg_7"></label>
                  </span>
                  <span>
                    <input type="radio" name="header_bg" value="color_8" id="header_bg_8">
                    <label for="header_bg_8"></label>
                  </span>
  				</li>
  			  <li class="drop-title"><p>侧边栏</p></li>
  			  <li class="drop-skin-li clearfix">
                  <span class="inverse">
                    <input type="radio" name="sidebar_bg" value="default" id="sidebar_bg_1" checked>
                    <label for="sidebar_bg_1"></label>
                  </span>
                  <span>
                    <input type="radio" name="sidebar_bg" value="color_2" id="sidebar_bg_2">
                    <label for="sidebar_bg_2"></label>
                  </span>
                  <span>
                    <input type="radio" name="sidebar_bg" value="color_3" id="sidebar_bg_3">
                    <label for="sidebar_bg_3"></label>
                  </span>
                  <span>
                    <input type="radio" name="sidebar_bg" value="color_4" id="sidebar_bg_4">
                    <label for="sidebar_bg_4"></label>
                  </span>
                  <span>
                    <input type="radio" name="sidebar_bg" value="color_5" id="sidebar_bg_5">
                    <label for="sidebar_bg_5"></label>
                  </span>
                  <span>
                    <input type="radio" name="sidebar_bg" value="color_6" id="sidebar_bg_6">
                    <label for="sidebar_bg_6"></label>
                  </span>
                  <span>
                    <input type="radio" name="sidebar_bg" value="color_7" id="sidebar_bg_7">
                    <label for="sidebar_bg_7"></label>
                  </span>
                  <span>
                    <input type="radio" name="sidebar_bg" value="color_8" id="sidebar_bg_8">
                    <label for="sidebar_bg_8"></label>
                  </span>
  			  </li>
  		    </ul>
  		  </li>
            <!--切换主题配色-->
            <li class="dropdown dropdown-profile">
              <a href="javascript:void(0)" data-toggle="dropdown" class="dropdown-toggle">
                <img class="img-avatar img-avatar-48 m-r-10" src="../assets/images/users/avatar.jpg" alt="笔下光年" />
                <span>笔下光年</span>
              </a>
              <ul class="dropdown-menu dropdown-menu-right">
                <li>
                  <a class="multitabs dropdown-item" data-url="lyear_pages_profile.html" href="javascript:void(0)"><i class="mdi mdi-account"></i> 个人信息</a>
                </li>
                <li>
                  <a class="multitabs dropdown-item" data-url="lyear_pages_edit_pwd.html" href="javascript:void(0)"><i class="mdi mdi-lock-outline"></i> 修改密码</a>
                </li>
                <li>
                  <a class="dropdown-item" href="javascript:void(0)"><i class="mdi mdi-delete"></i> 清空缓存</a>
                </li>
                <li class="dropdown-divider"></li>
                <li>
                  <a class="dropdown-item" @click="logout"><i class="mdi mdi-logout-variant"></i> 退出登录</a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
      <!--End 头部信息-->
      <!--页面主要内容-->
      <main class="lyear-layout-content" style="background-color: white;">
        <router-view/>
      </main>
      <!--End 页面主要内容-->
    </div>
  </div>
</template>

<script>
	import { getPermission } from '@/api/system/menuManage.js'
	import { logout } from '@/api/system/userManage.js'

  export default{
    data() {
      return{
        titleMessage: [],
				permissions: [],
        isCollapse: false
      }
    },
    created(){
      this.getRouterInfo()
			this.getPermission()
    },
    watch: {
      //路由变化时调用方法
      $route(){
        this.getRouterInfo()
				this.getPermission()
      }
    },
    methods: {
      getRouterInfo(){
        //从此路由获取object并通过filter筛选出带name的路由参数
        let matched = this.$route.matched.filter(item => item.meta.title)
        this.titleMessage = matched
        // console.log(this.titleMessage)
      },
			getPermission(){
				//获取当前用户的菜单权限
				getPermission().then(res => {
					this.permissions = res.data.data
				}).catch(res => {})
			},
			logout(){
				this.$confirm('是否退出登录?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					logout().then(res => {
						this.$message({
							type: 'success',
							message: '退出成功!'
						});
					}).catch(err => {
						this.$message({
							type: 'info',
							message: '退出失败'
						});
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
      //关闭左侧栏
      closeSide(){
        if(this.isCollapse){
          this.isCollapse = false
        }else{
          this.isCollapse = true
        }
      }
    }
  }
</script>

<style>
   @import url("../assets/css/materialdesignicons.min.css");
   @import url("../assets/css/bootstrap.min.css");
   @import url("../assets/js/bootstrap-multitabs/multitabs.min.css");
   @import url("../assets/css/animate.min.css");
   @import url("../assets/css/style.min.css");
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
