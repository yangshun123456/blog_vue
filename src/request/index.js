import axios from 'axios'
import store from '@/store/index'
import {getToken, removeToken} from '@/request/token'
import { Message, MessageBox } from 'element-ui'
import router from '../router/index.js'

const TokenKey = 'Admin-Token'

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 10000
})

//request拦截器
service.interceptors.request.use(config => {
  if (store.state.token) {
    // debugger;
    // 让每个请求携带token-- ['Token']为自定义key 请根据实际情况自行修改
    config.headers['Token'] = getToken()
  }
  return config
}, error => {
  Promise.reject(error)
})
// respone拦截器
service.interceptors.response.use(
  response =>{
    const res = response.data
     if (res.code !== 20000) {
      Message({
        message: res.data,
        type: 'error',
        duration: 3 * 1000
      })
      // 43000：登录过期
      if (res.code === 43000) {
        // debugger
        // 请自行在引入 MessageBox
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            removeToken(TokenKey);
            router.app.$router.push("/logins")
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        }).catch(() => {
             removeToken(TokenKey);
             router.app.$router.push("/logins")
             location.reload()
          })
      }
      return Promise.reject('error')
    } else {
      return response
    }
  },
  error =>{
   console.log('err' + error) // for debug
      Message({
        message: error.message,
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(error)
  }
)


export default service
