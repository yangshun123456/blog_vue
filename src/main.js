// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routers from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'

import './assets/inco'

Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  router: routers,
  components: { App },
  template: '<App/>',
  store
})
