<template>
  <div id="infodiv">
    <el-container>
        <el-header>
           <!-- <el-button @click="_initSockJs" type="primary" :disabled="isConnected">手动连接</el-button>
            <el-button @click="_destroySockJs" type="danger" :disabled="!isConnected">断开连接</el-button> -->
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
</div>
</template>


<script>
  import SockJSMin from "../../../static/socketJs/sockjs.min.js"
  import StompTamp from "../../../static/socketJs/stomp.js"
  import { systemInfo } from "@/api/login.js"
  import { getToken } from '@/request/token.js'
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
        },
        loading: true
      }
    },
    methods:{
      initData(){
        const loading = this.$loading({
          target: '#infodiv',
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.8)'
         });
        systemInfo().then(res => {
          this.server = res.data.data
          loading.close()
        })
      },
      initSoctJs(){
        const wsTopic = '/topic/server'
        const url = process.env.BASE_API + '/socketBlog'
        //建立socket连接
        this.socket = new SockJS(url);
        this.stompClient = Stomp.over(this.socket);
        this.stompClient.connect({'Token': getToken()}, (frame) => {
            // console.log('websocket连接成功:' + frame);
            this.isConnected = true;
            // this.$message('websocket服务器连接成功');
            // 另外再注册一下消息推送
            this.stompClient.subscribe(wsTopic, (response) => {
                this.server = JSON.parse(response.body);
            });
        });
      },
      _destroySockJs() {
          if (this.stompClient != null) {
              this.stompClient.disconnect();
              this.socket.onclose;
              this.socket.close();
              this.stompClient = {};
              this.socket = {};
              this.isConnected = false;
              this.server.cpu = [];
              this.server.mem = [];
              this.server.jvm = [];
              this.server.sys = [];
              this.server.sysFile = [];
          }
          // console.log('websocket断开成功！');
          // this.$message.error('websocket断开成功！');
      }
    },
    mounted() {
      //初始化数据
      this.initData()
      this.initSoctJs()
    },
    beforeDestroy() {
      this._destroySockJs();
    }
  }
</script>

<style>
</style>
