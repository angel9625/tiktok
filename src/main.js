import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueWechatTitle from 'vue-wechat-title'
import { Toast } from 'vant'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(VueWechatTitle)
Vue.use(Toast)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
