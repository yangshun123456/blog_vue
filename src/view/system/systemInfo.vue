<template>
  <el-container>
          <el-header>
              <el-button @click="_initSockJs" type="primary" :disabled="isConnected">手动连接</el-button>
              <el-button @click="_destroySockJs" type="danger" :disabled="!isConnected">断开连接</el-button>
          </el-header>
          <el-main>
              <el-row :gutter="20">
                  <el-col :span="12">
                      <el-card>
                          <div slot="header">
                              <span>CPU信息</span>
                          </div>
                          <el-table size="small" border :data="server.cpu" style="width: 100%">
                              <el-table-column prop="key" label="属性">
                              </el-table-column>
                              <el-table-column prop="value" label="值">
                              </el-table-column>
                          </el-table>
                      </el-card>
                  </el-col>
                  <el-col :span="12">
                      <el-card>
                          <div slot="header">
                              <span>内存信息</span>
                          </div>
                          <el-table size="small" border :data="server.mem" style="width: 100%">
                              <el-table-column prop="key" label="属性">
                              </el-table-column>
                              <el-table-column prop="value" label="值">
                              </el-table-column>
                          </el-table>
                      </el-card>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col :span="24">
                      <el-card>
                          <div slot="header">
                              <span>服务器信息</span>
                          </div>
                          <el-table size="small" border :data="server.sys" style="width: 100%">
                              <el-table-column prop="key" label="属性">
                              </el-table-column>
                              <el-table-column prop="value" label="值">
                              </el-table-column>
                          </el-table>
                      </el-card>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col :span="24">
                      <el-card>
                          <div slot="header">
                              <span>Java虚拟机信息</span>
                          </div>
                          <el-table size="small" border :data="server.jvm" style="width: 100%">
                              <el-table-column prop="key" label="属性">
                              </el-table-column>
                              <el-table-column prop="value" label="值">
                              </el-table-column>
                          </el-table>
                      </el-card>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col :span="24">
                      <el-card>
                          <div slot="header">
                              <span>磁盘状态</span>
                          </div>
                          <div class="sysFile" v-for="(item,index) in server.sysFile" :key="index">
                              <el-table size="small" border :data="item" style="width: 100%">
                                  <el-table-column prop="key" label="属性">
                                  </el-table-column>
                                  <el-table-column prop="value" label="值">
                                  </el-table-column>
                              </el-table>
                           </div>
                      </el-card>
                  </el-col>
              </el-row>
          </el-main>
      </el-container>
</template>


<script>
  import SockJS from "../../../static/socketJs/sockjs.min.js"
  import Stomp from "../../../static/socketJs/stomp.js"
  import { systemInfo } from "@/api/login.js"
  export default{
    data(){
      return {
        isConnected: false,
        stompClient: {},
        socket: {},
        server: {
            cpu: [],
            mem: [],
            jvm: [],
            sys: [],
            sysFile: []
        }
      }
    },
    methods:{
      initData(){
        systemInfo().then(res => {
          this.server = response.data.data
        })
      },
      initSoctJs(){

      }
    },
    mounted() {
      this.initData()
    },
    beforeDestroy() {

    }
  }
</script>

<style>
</style>
